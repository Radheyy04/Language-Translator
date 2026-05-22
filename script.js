const countries={
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
}

const selectTag = document.querySelectorAll("select");
const translateBtn = document.querySelector("#transfer");
const fromText=document.querySelector("#fromText");
const toText=document.querySelector("#toText");

const copyIcons = document.querySelectorAll(".copy");
const exchange = document.querySelector("#exchange");

selectTag.forEach((tag, id)=>{
    for (const countriesCode in countries) {
        let selected ;
        if( id==0 && countriesCode== "en-GB"){
            selected = "selected";
        } else if(id==1 && countriesCode== "hi-IN"){
            selected="selected";
        }
        let option = `<option value="${countriesCode}" ${selected}>${countries[countriesCode]}</option>`;
        tag.insertAdjacentHTML("beforeend", option);
        }
});

translateBtn.addEventListener(("click"), () => {
    let Text = fromText.value;
    translateFrom = selectTag[0].value,
    translateTo = selectTag[1].value;
    let apiURL=`https://api.mymemory.translated.net/get?q=${Text}!&langpair=${translateFrom}|${translateTo}`;

    fetch(apiURL).then(res => res.json()).then(data => {
        toText.value = data.responseData.translatedText;

    })
});

copyIcons[0].addEventListener("click", () => {
    navigator.clipboard.writeText(fromText.value);
    alert("Text copied!");
});

copyIcons[1].addEventListener("click", () => {
    navigator.clipboard.writeText(toText.value);
    alert("Translation copied!");
});

exchange.addEventListener("click", () => {

    let tempText = fromText.value;
    fromText.value = toText.value;
    toText.value = tempText;

    let tempLang = selectTag[0].value;
    selectTag[0].value = selectTag[1].value;
    selectTag[1].value = tempLang;

});