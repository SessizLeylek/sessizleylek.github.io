const contentRef = document.querySelector("section.content");

class HashFunctions {
    constructor(onEnterFunc, onExitFunc = null, onQueryChangeFunc = null) {
        this.onEnterFunc = onEnterFunc;
        this.onExitFunc = onExitFunc;
        this.onQueryChangeFunc = onQueryChangeFunc;
    }
}

const includedScripts = {};
const hashResponseMap = {};
var currentHashId = "undefined";

function onHashChange(id, subQueries) {
    const responseFunctions = hashResponseMap[id];
    if (!responseFunctions) {
        console.warn(`Hash Section ${id} Couldn't Found!`);
        return;
    }
    
    const prevResponseFunctions = hashResponseMap[currentHashId];
    if (prevResponseFunctions) {
        const fn = (currentHashId == id ? 
            prevResponseFunctions.onQueryChangeFunc : prevResponseFunctions.onExitFunc);
            fn?.(subQueries);
    }
    
        
    responseFunctions.onEnterFunc?.(subQueries);
    currentHashId = id;
}

function checkHashChange() {
    const id = location.hash.substring(1) || "";
    const hashParts = id.split("-")
    onHashChange(hashParts[0], hashParts.slice(1));
}

window.addEventListener("load", checkHashChange);
window.addEventListener("hashchange", checkHashChange);

function pushHashFunctionsToMap(id, hashFuncs) {
    if (!(id in hashResponseMap)) {
        hashResponseMap[id] = hashFuncs;
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

function localizeHome() {
    document.title = `Kürşat Kuyumcu - ${translate("homepage")}`;
}

function onHomeEnter(subQueries) {
    localizeHome();
    contentRef.style.visibility = "hidden";
    addLangChangeCallback(localizeHome);
}

function onHomeExit(subQueries) {
    contentRef.style.visibility = "visible";
    removeLangChangeCallback(localizeHome);
}

pushHashFunctionsToMap("", new HashFunctions(onHomeEnter, onHomeExit));

addScript("contact");
