const fromText = document.querySelector(".from-text"),
toText = document.querySelector(".to-text"),
selectTag = document.querySelectorAll("select"),
exchangeIcon = document.querySelector(".exchange"),

translateBtn = document.querySelector("button"),
icons = document.querySelectorAll(".row i");

selectTag.forEach((tag,id) => {
    for (const country_code in countries) {
        // Selecting English by default as FROM language and Indonesian as TO Language
        let selected;
        if(id == 1 && country_code == "en-GB") {
            selected = "selected";
        } else if (id == 1 && country_code == "id-ID") {
            selected = "selected";
        }
        let option = `<option value="${country_code}"${selected}>${countries[country_code]}</option>`;
        tag.insertAdjacentHTML("beforeend", option); // adding options tag inside select tag
    }
});

exchangeIcon.addEventListener("click", () => {
    // Changing textarea and select tag values
    let tempText = fromText.value;
    tempLang = selectTag[0].value;
    fromText.value = toText.value;
    selectTag[0].value = selectTag[1].value;
    toText.value = tempText;
    selectTag[1].value = tempLang;


})


translateBtn.addEventListener("click", () => {
    let text = fromText.value,
    translateFrom = selectTag[0].value, // getting fromSelect tag value
    translateTo = selectTag[1].value; // getting toSelect tag value 
    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
    // fetching api response and returning it with parsing into js obj
    //and in another then method receiving that obj
    fetch(apiUrl).then(res => res.json()).then(data => {
        console.log(data);
        toText.value = data.responseData.translatedText;
    });
});

icons.forEach(icons => {
    icons.addEventListener("click", ({target}) => {
        if(target.classList.contains("fa-copy")) {
            // if clicked icon is from id, copy the fromTextArea value else copy the toTextArea value 
            if(target.id == "from") {
                navigator.clipboard.writeText(fromText.value);

            } else {
                navigator.clipboard.writeText(toText.value);
            }
        } else {
            let utterance;
            // if clicked icon has from id, speak the fromTextarea value else speak the to toTextArea value
            if(target.id == "from") {
                utterance = new SpeechSynthesisUtterance(fromText.value);
                utterance.lang = selectTag[0].value; // setting utterance language to fromSelect tag value
            } else {
                utterance = new SpeechSynthesisUtterance(toText.value); 
                utterance.lang = selectTag[1].value; // setting utterance language to toSelect tag value
            }
            speechSynthesis.speak(utterance); // speak the passed utterance
        }
    });
});