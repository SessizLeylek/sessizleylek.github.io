const contentRef = document.querySelector("section.content");

const includedScripts = {};
const hashResponseMap = { "": onReturnHomeHash };

function onHashChange(id, subQuery) {
    const responseFunction = hashResponseMap[id];

    if (!responseFunction) {
        console.warn(`Hash Section ${id} Couldn't Found!`);
        return;
    }

    responseFunction(subQuery);
}

function checkHashChange() {
    const id = location.hash.substring(1) || "";
    const hashParts = id.split("-");
    onHashChange(hashParts[0], hashParts[1] || "");
}

window.addEventListener("load", checkHashChange);
window.addEventListener("hashchange", checkHashChange);

function pushHashResponseToMap(id, hashResponse) {
    if (!(id in hashResponseMap)) {
        hashResponseMap[id] = hashResponse;
    } else {
        console.warn(`Hash Response ${id} is already in the map!`);
    }
}

function addScript(scriptName) {
    if (scriptName in includedScripts) {
        console.warn(`Script named ${scriptName} is already included!`);
        return;
    }

    const newScript = document.createElement("script");
    newScript.src = `${scriptName}.js`;
    document.body.appendChild(newScript);

    includedScripts[scriptName] = newScript;
}

function removeScript(scriptName) {
    if (!(scriptName in includedScripts)) {
        console.warn(`Script named ${scriptName} does not exists!`);
        return;
    }

    includedScripts[scriptName].remove();
    delete includedScripts[scriptName];
}

function onReturnHomeHash(subQuery) {
    contentRef.innerHTML = "<p>Home under construction!</p>";
    document.title = "Kürşat Kuyumcu - Home";
}

addScript("contact");
