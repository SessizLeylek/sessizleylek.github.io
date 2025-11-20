class HomeHashPage extends HashPage {    
    onEnter(subQueries) {
        this.localizeHome();
        contentRef.style.visibility = "hidden";
        addLangChangeCallback(this.localizeHome.bind(this));
    }
    
    onExit(subQueries) {
        contentRef.style.visibility = "visible";
        removeLangChangeCallback(this.localizeHome.bind(this));
    }

    localizeHome() {
        document.title = `Kürşat Kuyumcu - ${translate("homepage")}`;
    }
}

pushHashPageToMap("", HomeHashPage);