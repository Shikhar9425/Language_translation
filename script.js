// Function to fetch supported languages
async function fetchLanguages() {
    const response = await fetch('https://google-translate1.p.rapidapi.com/language/translate/v2/languages', {
        method: 'GET',
        headers: {
            'x-rapidapi-host': 'google-translate1.p.rapidapi.com',
            'x-rapidapi-key': 'api-key to be pasted here' // Replace with api key
        }
    });

    const data = await response.json();
    return data.data.languages;
}

// Function to translate text
async function translateText(text, sourceLang, targetLang) {
    const response = await fetch(`https://google-translate1.p.rapidapi.com/language/translate/v2`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'x-rapidapi-host': 'google-translate1.p.rapidapi.com',
            'x-rapidapi-key': 'api key  to be pasted' // Replace with your RapidAPI key
        },
        body: `q=${encodeURIComponent(text)}&source=${sourceLang}&target=${targetLang}`
    });

    const data = await response.json();
    return data.data.translations[0].translatedText;
}

// Function to populate language dropdowns
async function populateLanguages() {
    const languages = await fetchLanguages();
    const sourceLangSelect = document.getElementById('source-lang');
    const targetLangSelect = document.getElementById('target-lang');

    languages.forEach(lang => {
        const option = document.createElement('option');
        option.text = lang.language;
        option.value = lang.language;
        sourceLangSelect.add(option);
        targetLangSelect.add(option.cloneNode(true));
    });
}

// Function to handle translation
async function handleTranslation() {
    const inputText = document.getElementById('input-text').value;
    const sourceLang = document.getElementById('source-lang').value;
    const targetLang = document.getElementById('target-lang').value;

    const translatedText = await translateText(inputText, sourceLang, targetLang);
    document.getElementById('translated-text').textContent = translatedText;
}

// Populate language dropdowns when the page loads
window.addEventListener('DOMContentLoaded', async () => {
    await populateLanguages();
});

// Add event listener for input text and translate it in real-time
document.getElementById('input-text').addEventListener('input', handleTranslation);
