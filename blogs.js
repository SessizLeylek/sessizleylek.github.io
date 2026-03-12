class BlogsHashPage extends HashPage {
    langChangeCallback = null;
    blogListElements = [];

    onEnter(subQueries) {
        this.createContent(subQueries);
    }

    onQueryChange(subQueries) {
        this.createContent(subQueries);
    }

    onExit(subQueries) {
        removeLangChangeCallback(this.langChangeCallback);
    }

    createContent(subQueries) {

        if (this.langChangeCallback != null) {
            removeLangChangeCallback(this.langChangeCallback);
            this.blogListElements.length = 0; // Clear the blog list elements for the new content
        }

        if (subQueries.length == 0) {
            // Show blog list
            this.createBlogList();
            this.localizeBlogList();
            this.langChangeCallback = this.localizeBlogList.bind(this);
        }
        else {
            // Show blog post with id subQueries[0]
            this.createBlogPost(subQueries[0]);
            this.localizeBlogPost(subQueries[0]);
            this.langChangeCallback = () => this.localizeBlogPost(subQueries[0]);
        }

        addLangChangeCallback(this.langChangeCallback);
    }

    renderBlogEntry(blogData, tags, address, date) {
        return `<div class="panel brighter" style="width:60vw; margin:1vw;">
        <div style="display:flex; flex-direction:row; align-items:center;">
        <h2 style="margin:0">${blogData["title"]}</h2>
        <p style="color: rgba(255, 255, 255, 0.5); font-size: 0.9em; margin-left: auto;">${date}</p>
        </div>
        <p>${blogData["description"]}</p>
        <div style="display:flex; flex-direction:row; gap:2vw; margin:0.5vw 0;">
        ${tags.map(element => `<p>${translate(element)}</p>`).join('')}
        <a href="#blogs-${address}" class="growing-button" style="margin-left:auto">${translate("read_more")}</a>
        </div>
        </div>`;
    }

    createBlogList() {
        contentRef.innerHTML = `
        <h1 id="blg-h1-blogs" style="text-align: center; color: white;">Blog Posts</h1>
        <div id="blg-blog-list" style="display:flex; flex-direction: column; align-items: center; font-size:150%">
        <input type="text" id="blg-input" placeholder="Search..." class="panel brighter" style="width:60vw; color: white; border: 0; padding: 0.5vw; font-family: inherit; font-size: larger; font-weight: bold;" />
        </div>`;

        this.blogListInput = contentRef.querySelector("#blg-input");

        this.blogsHeader = contentRef.querySelector("#blg-h1-blogs");
        this.blogListInput.addEventListener("input", this.filterBlogList.bind(this));
        const blogListContainer = contentRef.querySelector("#blg-blog-list");

        fetch("blogs/blogs.json")
            .then(response => response.json())
            .then(blogs => {
                Object.keys(blogs).forEach(key => {
                    const entry = blogs[key];
                    const selectedLang = entry.hasOwnProperty(lang) ? lang :
                        entry.hasOwnProperty("en") ? "en" :
                            Object.keys(entry).find(k => k !== "tags");
                    const blogData = entry[selectedLang];
                    const blogFile = `${entry["file"]}_${selectedLang}`;
                    const blogElement = document.createElement("div")
                    blogElement.innerHTML = this.renderBlogEntry(blogData, entry["tags"], blogFile, entry["date"]);
                    blogListContainer.appendChild(blogElement);

                    const localizedTags = entry["tags"].map(tag => translate(tag));
                    this.blogListElements.push({
                        id: key,
                        element: blogElement,
                        entry: entry,
                        file: blogFile,
                        keywords: localizedTags.concat([blogData["title"], blogData["description"]]).join(" ").toLowerCase()
                    });
                });
            });
    }

    localizeBlogList() {
        this.blogListElements.forEach(el => {
            const blogData = el.entry[lang] || el.entry["en"] || el.entry[Object.keys(el.entry).find(k => k !== "tags")];
            el.element.innerHTML = this.renderBlogEntry(blogData, el.entry.tags, el.file, el.entry.date); // Re-render with localized tags
        });

        this.blogListInput.placeholder = translate("search_placeholder");
        this.blogsHeader.textContent = translate("nav_blogs");
    }

    filterBlogList(event) {
        const query = event.target.value.toLowerCase().trim();
        const showAll = query === "";

        this.blogListElements.forEach(({ element, keywords }) => {
            if (showAll) {
                element.style.display = "block";
                return;
            }

            let matches = true;
            query.split(" ").forEach(word => {
                if (!keywords.includes(word)) {
                    matches = false;
                }
            });

            if (matches) {
                element.style.display = "block";
            }
            else {
                element.style.display = "none";
            }
        });
    }

    createBlogPost(blogId) {
        const blogAddress = `blogs/${blogId}.md`;

        fetch(blogAddress).then(response => {
            if (!response.ok) {
                alert(`Blog post not found: (${blogAddress})`);
                window.location.hash = "blogs";
                throw new Error("Blog post not found");
            }
            return response.text();
        })
            .then(text => {
                let title = '';
                if (text[0] === '#') {
                    // Remove the first line if it's a title, since we already use it as the header
                    title = text.split("\n")[0].replace(/^#\s/, '');
                    text = text.split("\n").slice(1).join("\n");
                }

                contentRef.innerHTML = `
                <div style="font-size:150%">
                <div class="panel brighter" style="display:flex">
                <h1 id="blg-h1-post-title" style="margin:0;">${title}</h1>
                <div style="display:flex; flex-direction:column; margin-left:auto">
                <a href="#blogs" id="blg-btn-back" class="growing-button" style="margin-left:auto;">${translate("blog_back")}</a>
                <p id="blg-lang-warning"></p>
                </div>
                </div>
                <div style="margin:1vw">
                ${this.renderPostFromMarkdown(text)}
                </div>
                </div>`;

                this.blogPostBackButton = contentRef.querySelector("#blg-btn-back");
                this.blogPostLangWarning = contentRef.querySelector("#blg-lang-warning");
            });
    }

    localizeBlogPost(blogId) {
        const lastIndex = blogId.lastIndexOf('_');
        if (lastIndex === -1) return;

        const newBlogId = blogId.substring(0, lastIndex) + "_" + lang;
        const blogAddress = `blogs/${newBlogId}.md`;

        if (this.blogPostLangWarning) this.blogPostLangWarning.textContent = "";

        fetch(blogAddress).then(response => {
            if (!response.ok) {
                //alert(translate("blog_no_lang_support"));
                if (this.blogPostLangWarning) this.blogPostLangWarning.textContent = translate("blog_no_lang_support");
                throw new Error("Localized blog post not found");
            }
            return response.text();
        })
            .then(text => {
                if (text) {
                    window.location.hash = `blogs-${newBlogId}`;
                }
            });

        if (this.blogPostBackButton) this.blogPostBackButton.textContent = translate("blog_back");
    }

    renderPostFromMarkdown(text) {
        const codeBlocks = [];

        // Hide code so other rules don't touch it
        text = text.replace(/```([\s\S]*?)```/g, (match, code) => {
            codeBlocks.push(`<pre><code>${code.trim()}</code></pre>`);
            return `PLACEHOLDER_${codeBlocks.length - 1}`;
        });

        // Run all existing rules
        text = text
            .replace(/!\[([^\]]+)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" />')
            .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
            .replace(/^###(.*$)/gm, '<h3>$1</h3>')
            .replace(/^##(.*$)/gm, '<h2>$1</h2>')
            .replace(/^#(?!#)(.*$)/gm, '<h1>$1</h1>')
            .replace(/^\* (.*$)/gm, '<ul><li>$1</li></ul>')
            .replace(/^\- (.*$)/gm, '<ul><li>$1</li></ul>')
            .replace(/<\/ul>\s*<ul>/g, '') // This cleans the list concatenation
            .replace(/^> (.*$)/gm, '<blockquote>$1</blockquote>')
            .replace(/^(?:---|\*\*\*)$/gm, '<hr />')
            .replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>')
            .replace(/\*([^*]+)\*/g, '<i>$1</i>')
            .replace(/~~([^~]+)~~/g, '<del>$1</del>')
            .replace(/`([^`]+)`/g, '<code>$1</code>')
            .replace(/\n\n/g, '<br />');

        // Put the untouched code back in
        return text.replace(/PLACEHOLDER_(\d+)/g, (match, index) => {
            return codeBlocks[index];
        });
    }
}

pushHashPageToMap("blogs", BlogsHashPage);
