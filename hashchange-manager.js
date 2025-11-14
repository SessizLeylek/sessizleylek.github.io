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

function onHashChange(id, subQuery) {
    const responseFunctions = hashResponseMap[id];

    if (!responseFunctions) {
        console.warn(`Hash Section ${id} Couldn't Found!`);
        return;
    }

    const fn = currentHashId === id
        ? responseFunctions.onQueryChangeFunc
        : responseFunctions.onExitFunc;

    fn?.(subQuery);

    responseFunctions.onEnterFunc?.(subQuery);

    currentHashId = id;
}

function checkHashChange() {
    const id = location.hash.substring(1) || "";
    const sepIndex = id.indexOf("-");
    const hashParts = sepIndex > -1 ? [id.slice(0, sepIndex), id.slice(sepIndex + 1)] : [id, ""];
    onHashChange(hashParts[0], hashParts[1] || "");
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

function onReturnHomeHash(subQuery) {
    contentRef.innerHTML = "<p>Home under construction!</p>";
    document.title = "Kürşat Kuyumcu - Home";
}

pushHashFunctionsToMap("", new HashFunctions(onReturnHomeHash));

addScript("contact");
