class CreativeWorksHashPage extends HashPage {
    langChangeCallback = null;
    workListElements = [];

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
            this.workListElements.length = 0; // Clear the creative work list elements for the new content
        }

        if (subQueries.length == 0) {
            // Show creative work list
            this.createCreativeWorkList();
            this.localizeCreativeWorkList();
            this.langChangeCallback = this.localizeCreativeWorkList.bind(this);
        }
        else {
            // Show creative work with id subQueries[0]
            this.createCreativeWork(subQueries[0]);
            this.localizeCreativeWork(subQueries[0]);
            this.langChangeCallback = () => this.localizeCreativeWork(subQueries[0]);
        }

        addLangChangeCallback(this.langChangeCallback);
    }

    renderCreativeWorkEntry(id, workData, address) {
        return `<div class="panel brighter growing-button" style="width:60vw; margin:1vw;">
        <a href="${address.relative ? `#works-${id}` : address.address}" target="${address.relative ? "_self" : "_blank"}" style="text-decoration: none; color: inherit;">
        <div style="display:flex; flex-direction:row; align-items:stretch;">
        <img src="works/${id}/cover.jpg" alt="Cover Image" style="height:auto; max-width:25vh; margin-right:1vw; border-radius:1vw; object-fit:cover;">
        <div>
        <h2 >${workData["title"]}</h2>
        <p style="height:auto;">${workData["description"]}</p>
        </div>
        </div>
        </a>
        </div>`;
    }

    createCreativeWorkList() {
        contentRef.innerHTML = `
        <h1 id="wrk-h1-works" style="text-align: center; color: white;">Creative Works</h1>
        <div id="wrk-work-list" style="display:flex; flex-direction: column; align-items: center; font-size:150%">
        <input type="text" id="wrk-input" placeholder="Search..." class="panel brighter" style="width:60vw; color: white; border: 0; padding: 0.5vw; font-family: inherit; font-size: larger; font-weight: bold;" />
        </div>`;

        this.workListInput = contentRef.querySelector("#wrk-input");

        this.worksHeader = contentRef.querySelector("#wrk-h1-works");
        this.workListInput.addEventListener("input", this.filterCreativeWorkList.bind(this));
        const workListContainer = contentRef.querySelector("#wrk-work-list");

        fetch("works/works.json")
            .then(response => response.json())
            .then(works => {
                Object.keys(works).forEach(key => {
                    const entry = works[key];
                    const selectedLang = entry.hasOwnProperty(lang) ? lang :
                        entry.hasOwnProperty("en") ? "en" :
                            Object.keys(entry).find(k => k !== "tags");
                    const workData = entry[selectedLang];
                    const workLink = entry.hasOwnProperty("link") ? {relative: false, address: entry["link"]} : {relative: true};
                    const workElement = document.createElement("div")
                    workElement.innerHTML = this.renderCreativeWorkEntry(key, workData, workLink);
                    workListContainer.appendChild(workElement);

                    this.workListElements.push({
                        id: key,
                        element: workElement,
                        entry: entry,
                        link: workLink,
                        keywords: [workData["title"], workData["description"]].join(" ").toLowerCase()
                    });
                });
            });
    }

    localizeCreativeWorkList() {
        this.workListElements.forEach(el => {
            const workData = el.entry[lang] || el.entry["en"] || el.entry[Object.keys(el.entry).find(k => k !== "tags")];
            el.element.innerHTML = this.renderCreativeWorkEntry(el.id, workData, el.link); // Re-render with localized tags
        });

        this.workListInput.placeholder = translate("search_placeholder");
        this.worksHeader.textContent = translate("nav_works");
    }

    filterCreativeWorkList(event) {
        const query = event.target.value.toLowerCase().trim();
        const showAll = query === "";

        this.workListElements.forEach(({ element, keywords }) => {
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

    createCreativeWork(id) {
        contentRef.innerHTML = ``;
    }

    localizeCreativeWork(id) {
    
    }

}

pushHashPageToMap("works", CreativeWorksHashPage);
