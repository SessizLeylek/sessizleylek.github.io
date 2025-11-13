const contentTemplate = `
<div>
    <h1 style="text-align: center; color: white;">Contact</h1>
    <p style="text-align: center; ">Contact under construction</p>
</div>
`;

function onContactHash(subQuery) {
    contentRef.innerHTML = contentTemplate;
    document.title = "Kürşat Kuyumcu - Contact";
}

pushHashResponseToMap("contact", onContactHash);