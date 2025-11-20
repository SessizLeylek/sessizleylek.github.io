const contentRef = document.querySelector("section.content");

class HashPage {
    hashId = "";

    onEnter(subQueries) {}
    onExit(subQueries) {}
    onQueryChange(subQueries) {}
}

const includedScripts = {};
const hashPageMap = {};
var currentHashPage = null;

function onHashChange(id, subQueries) {
    if (!(id in hashPageMap)) {
        console.warn(`Hash Section ${id} Couldn't Found!`);
        return;
    }

    if (currentHashPage != null) {
        if (currentHashPage.hashId == id) {
            currentHashPage.onQueryChange(subQueries);
            return;
        }
        else {
            currentHashPage.onExit(subQueries);
        }
    }

    const newHashPage = new hashPageMap[id]();
    newHashPage.hashId = id;
    newHashPage.onEnter?.(subQueries);
    currentHashPage = newHashPage;
}

function checkHashChange() {
    const id = location.hash.substring(1) || "";
    const hashParts = id.split("-")
    onHashChange(hashParts[0], hashParts.slice(1));
}

window.addEventListener("load", checkHashChange);
window.addEventListener("hashchange", checkHashChange);

function pushHashPageToMap(id, hashPageClass) {
    if (!(id in hashPageMap)) {
        hashPageMap[id] = hashPageClass;
    } else {
        console.warn(`Hash Page ${id} is already in the map!`);
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

addScript("home");
addScript("contact");
