const countries = {
    "en-GB": "Inglês",
    "es-ES": "Espanhôl",
    "it-IT": "Italiano",
    "ja-JP": "Japonês",
    "pt-BR": "Português",
};

const textareaFrom = document.querySelector("#textFrom");
const textareaTo = document.querySelector("#textTo");
const btn = document.querySelector("#btnResult");
const selects = document.querySelectorAll("select");

function populateSelects(select, defaultLanguage) {
    for (let country in countries) {
        const isSelected = country === defaultLanguage ? "selected" : "";
        const option = `<option value="${country}" ${isSelected}>${countries[country]}</option>`;
        select.insertAdjacentHTML("beforeend", option);
    }
}

selects.forEach((select) => {
    const defaultLanguage = select.className.includes("selectFrom") ? "pt-BR" : "en-GB";
    populateSelects(select, defaultLanguage);
});

btn.addEventListener("click", async () => {
    if (textareaFrom.value) {
        await loadTranslation();
    } else {
        textareaTo.value = "";
    }
});

async function loadTranslation() {
    const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${textareaFrom.value}&langpair=${selects[0].value}|${selects[1].value}`
    );
    const data = await response.json();
    textareaTo.value = data.responseData.translatedText;
}
