const countries = {
    "ar-SA": "Arabic",
    "bn-IN": "Bengali",
    "zh-CN": "Chinese",
    "en-GB": "English",
    "fr-FR": "French",
    "de-DE": "German",
    "gu-IN": "Gujarati",
    "hi-IN": "Hindi",
    "it-IT": "Italian",
    "ja-JP": "Japanese",
    "ko-KR": "Korean",
    "mr-IN": "Marathi",
    "pa-IN": "Punjabi",
    "pt-PT": "Portuguese",
    "ru-RU": "Russian",
    "es-ES": "Spanish",
    "ta-IN": "Tamil",
    "te-IN": "Telugu",
    "tr-TR": "Turkish",
    "ur-PK": "Urdu",
    "vi-VN": "Vietnamese"
};

const selectTag = document.querySelectorAll("select");
const translateBtn = document.querySelector("#transfer");
const fromText = document.querySelector("#fromText");
const toText = document.querySelector("#toText");
const copyIcons = document.querySelectorAll(".copy");
const speakerIcons = document.querySelectorAll(".speaker");
const exchange = document.querySelector("#exchange");
const mic = document.querySelector(".mic");

selectTag.forEach((tag, id) => {
    if(id == 0){
    tag.insertAdjacentHTML(
        "afterbegin",
        `<option value="auto">Auto Detect</option>`
    );
}
    for (const countryCode in countries) {
        let selected = "";
        if (id == 0 && countryCode == "en-GB") {
            selected = "selected";
        }
        else if (id == 1 && countryCode == "hi-IN") {
            selected = "selected";
        }
        let option =
            `<option value="${countryCode}" ${selected}>
                ${countries[countryCode]}
            </option>`;

        tag.insertAdjacentHTML(
            "beforeend",
            option
        );
    }
});

translateBtn.addEventListener("click", () => {
    let text = fromText.value.trim();
    if(text === ""){
        alert("Please enter text");
        return;
    }
    let fromLang;
    if(selectTag[0].value === "auto"){
        fromLang = "auto";
    }
    else{
        fromLang = selectTag[0].value.split("-")[0];
    }
    let toLang = selectTag[1].value.split("-")[0];
    let url =
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${fromLang}&tl=${toLang}&dt=t&q=${encodeURIComponent(text)}`;
    toText.value = "Translating...";
    fetch(url)
    .then(response => response.json())
    .then(json => {
        toText.value =
        json[0]
        .map(item => item[0])
        .join("");
    })
    .catch(error => {
        console.log(error);
        toText.value = "Translation Failed";
    });
});

copyIcons[0].addEventListener("click", () => {
    navigator.clipboard.writeText(fromText.value);
    alert("Text copied!");
});

copyIcons[1].addEventListener("click", () => {
    navigator.clipboard.writeText(toText.value);
    alert("Translation copied!");

});

speakerIcons[0].addEventListener("click", () => {
    if (fromText.value === "") return;
    let utterance = new SpeechSynthesisUtterance(fromText.value);
    utterance.lang = selectTag[0].value;
    speechSynthesis.speak(utterance);
});

speakerIcons[1].addEventListener("click", () => {
    if (toText.value === "") return;
    let utterance = new SpeechSynthesisUtterance(toText.value);
    utterance.lang = selectTag[1].value;
    speechSynthesis.speak(utterance);
});

mic.addEventListener("click", () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        alert(
            "Speech Recognition not supported"
        );
        return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = selectTag[0].value;
    recognition.start();
    recognition.onresult = (event) => {
        fromText.value = event.results[0][0].transcript;
        translateBtn.click();
    };
});

exchange.addEventListener("click", () => {
    let tempText = fromText.value;
    fromText.value = toText.value;
    toText.value = tempText;

    let tempLang = selectTag[0].value;
    selectTag[0].value = selectTag[1].value;
    selectTag[1].value = tempLang;
});
