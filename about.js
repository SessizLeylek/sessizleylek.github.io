class AboutPage extends HashPage {
    onEnter(subQueries) {
        this.createContent();
        this.localizePage();
        addLangChangeCallback(this.localizePage.bind(this));
    }

    onExit(subQueries) {
        removeLangChangeCallback(this.localizePage.bind(this));
    }

    createContent() {
        contentRef.innerHTML = `
        <div class="panel brighter" style="margin:1vw; display:flex; flex-direction:column; align-items:center; text-align:center; margin:2vw; padding:2vw; font-size:200%;">
            <div style="display:flex; flex-direction:row">
                <img src="res/about/photo.jpg" alt="Kursat Kuyumcu" style="margin:2vw 5vw; object-fit:cover; width:16vw; border-radius:16vw; border:0.2vw solid white;">
                <div>
                    <p style="font-size:2em; font-weight:bold;">Kürşat Kuyumcu</p>
                    <p id="abt-headline" style="font-size:1.2em; font-weight:bold;">Game Developer — Undergraduate Student</p>
                    <p id="abt-desc" style="text-align:justify;">About Description</p>
                </div>
            </div>
            <p id="abt-parg" style="text-align:justify;">About Paragraph</p>
        </div>
        `;

        this.headlineElement = contentRef.querySelector("#abt-headline");
        this.descriptionElement = contentRef.querySelector("#abt-desc");
        this.paragraphElement = contentRef.querySelector("#abt-parg");
    }

    localizePage() {
        document.title = `Kürşat Kuyumcu - ${translate("nav_about")}`;

        const age = (new Date(new Date() - new Date("2004-03-02"))).getFullYear() - 1970;

        this.headlineElement.textContent = translate("about_headline");
        this.descriptionElement.textContent = translate("about_description").replace("$age", age);
        this.paragraphElement.textContent = translate("about_paragraph");
    }
}

pushHashPageToMap("about", AboutPage);