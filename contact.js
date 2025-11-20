class ContactHashPage extends HashPage {
    onEnter(subQueries) {
        this.createContent();
        this.localizeContact();
        addLangChangeCallback(this.localizeContact.bind(this));
    }

    onExit(subQueries) {
        removeLangChangeCallback(this.localizeContact.bind(this));
    }

    createContent() {
        const buttonTemplate = (name, link) => `<a href="${link}" class="growing-button" target="_blank" rel="noopener noreferrer"><img src="res/contact/${name}.png" alt="${name}" style="height:-webkit-fill-available;padding:1vw;"></a>`;
        const listButtons = (buttonsDict) => Object.entries(buttonsDict).map(([k, v]) => buttonTemplate(k, v)).join("");
        const contactButtons = {
            "linkedin": "https://linkedin.com/in/kursatkuyumcu",
            "mail": "mailto:kursatkymcu@gmail.com",
            "instagram": "https://www.instagram.com/kursat.kuyumcu/",
            "discord": "https://discord.com/users/sessizleylek",
        };
        const otherAccounts = {
            "github": "https://github.com/SessizLeylek",
            "itch": "https://sessizleylek.itch.io/",
            "steam": "https://steamcommunity.com/id/sessizleylek/",
            "youtube": "https://www.youtube.com/@kursatkuyumcu",
        };

        contentRef.innerHTML = `
        <div>
            <h1 id="cnt-h1-contact" style="text-align: center; color: white;">Contact</h1>
            <div style="display:flex; flex-direction:row; justify-content:center; height: 8vw;">
            ${listButtons(contactButtons)}
            </div>

            <h2 id="cnt-other-accounts" style="text-align: center; color: white;">Other Accounts</h2>
            <div style="display:flex; flex-direction:row; justify-content:center; height: 8vw;">
            ${listButtons(otherAccounts)}
            </div>

            <h2 id="cnt-check-out-game" style="text-align: center; color: white;">Check Out Game</h2>    
            <div style="display:flex; flex-direction:row; justify-content:center; height: 8vw;">
            <iframe id="cnt-iframe-steam" src="https://store.steampowered.com/widget/3277450" 
                frameborder="0" width="646" height="190">
            </iframe>
            </div>
        </div>
        `;

        this.contactHeader = contentRef.querySelector("#cnt-h1-contact");
        this.otherAccountsHeader = contentRef.querySelector("#cnt-other-accounts");
        this.checkOutGameHeader = contentRef.querySelector("#cnt-check-out-game");
        this.steamIframe = contentRef.querySelector("#cnt-iframe-steam");

        console.log("Contact content created.", this.contactHeader, this.otherAccountsHeader, this.checkOutGameHeader, this.steamIframe);
    }

    localizeContact() {
        document.title = `Kürşat Kuyumcu - ${translate("nav_contact")}`;

        this.contactHeader.textContent = translate("nav_contact");
        this.otherAccountsHeader.textContent = translate("other_accounts");
        this.checkOutGameHeader.textContent = translate("check_out_game");
        this.steamIframe.src = `https://store.steampowered.com/widget/3277450?l=${translate("l")}`;
    }
}

pushHashPageToMap("contact", ContactHashPage);
