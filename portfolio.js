class PortfolioPage extends HashPage {
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
        <div class="panel brighter" style="margin:1vw; display:flex; flex-direction:row; align-items:center;">
            <img src="res/portfolio/photo.jpg" alt="Portfolio Image" style="margin:2vw 5vw; height:16vw; border-radius:16vw; border:0.2vw solid white;">
            <div style="margin:2vw; font-size:200%;">
            <p style="font-size:2em; font-weight:bold;">Kürşat Kuyumcu</p>
            <p id="prt-headline" style="font-size:1.2em; font-weight:bold;">Game Developer — Undergraduate Student</p>
            <p id="prt-desc" style="text-align:justify;">Portfolio Description</p>
            </div>
        </div>

        <div class="panel brighter" style="font-size:150%; margin:1vw; padding:1vw 5vw;">
            <p id="prt-h-about" style="font-size:1.2em; font-weight:bold; text-align:center;">About</p>
            <p id="prt-p-about" style="text-align:justify; text-align-last:center;">About myself</p>
        </div>
        `;

        this.headlineElement = contentRef.querySelector("#prt-headline");
        this.descriptionElement = contentRef.querySelector("#prt-desc");
        this.aboutHeader = contentRef.querySelector("#prt-h-about");
        this.aboutParagraph = contentRef.querySelector("#prt-p-about");
    }

    localizePage() {
        document.title = `Kürşat Kuyumcu - ${translate("nav_portfolio")}`;

        this.headlineElement.textContent = translate("portfolio_headline");
        this.descriptionElement.textContent = translate("portfolio_description");
        this.aboutHeader.textContent = translate("about");
        this.aboutParagraph.textContent = translate("about_paragraph");
    }
}

pushHashPageToMap("portfolio", PortfolioPage);