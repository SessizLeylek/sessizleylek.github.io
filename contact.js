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

const contentTemplate = () => `
<div>
    <h1 style="text-align: center; color: white;">${translate("nav_contact")}</h1>
    <div style="display:flex; flex-direction:row; justify-content:center; height: 8vw;">
    ${listButtons(contactButtons)}
    </div>

    <h2 style="text-align: center; color: white;">${translate("other_accounts")}</h2>
    <div style="display:flex; flex-direction:row; justify-content:center; height: 8vw;">
    ${listButtons(otherAccounts)}
    </div>

    <h2 style="text-align: center; color: white;">${translate("check_out_game")}</h2>    
    <div style="display:flex; flex-direction:row; justify-content:center; height: 8vw;">
    <iframe src="https://store.steampowered.com/widget/3277450?l=${translate("l")}" 
        frameborder="0" width="646" height="190">
    </iframe>
    </div>
</div>
`;

function localizeContact() {
    contentRef.innerHTML = contentTemplate();
    document.title = `Kürşat Kuyumcu - ${translate("nav_contact")}`;
}

function onContactEnter(subQueries) {
    localizeContact();
    addLangChangeCallback(localizeContact);
}

function onContactExit(subQueries) {
    removeLangChangeCallback(localizeContact);
    console.log("contact exit");
}

pushHashFunctionsToMap("contact", new HashFunctions(onContactEnter, onContactExit));