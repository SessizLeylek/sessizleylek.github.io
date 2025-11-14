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

const contentTemplate = `
<div>
    <h1 style="text-align: center; color: white;">Contact</h1>
    <div style="display:flex; flex-direction:row; justify-content:center; height: 15vh;">
    ${listButtons(contactButtons)}
    </div>

    <h2 style="text-align: center; color: white;">Other Accounts</h2>
    <div style="display:flex; flex-direction:row; justify-content:center; height: 15vh;">
    ${listButtons(otherAccounts)}
    </div>

    <h2 style="text-align: center; color: white;">Also Check Out This Game I Released</h2>    
    <div style="display:flex; flex-direction:row; justify-content:center; height: 15vh;">
    <iframe src="https://store.steampowered.com/widget/3277450/" 
        frameborder="0" width="646" height="190">
    </iframe>
    </div>
</div>
`;

function onContactHash(subQuery) {
    contentRef.innerHTML = contentTemplate;
    document.title = "Kürşat Kuyumcu - Contact";
}

pushHashFunctionsToMap("contact", new HashFunctions(onContactHash));