const file = document.getElementById("file");
const url = document.getElementById("url");
const language = document.getElementById("language");
const receiptTable = document.getElementById("receipt-table");
const engines = Array.from(document.getElementsByClassName("engine"));
const imgPreview = document.getElementById("img-preview");
const textResult = document.getElementById("txt-result");
const form = document.getElementById("form");
const clipboard = document.getElementsByClassName("fa-clipboard")[0];
const copyrightDate = document.getElementById("date");

// *Preview image file
file.addEventListener("change", (e) => {
  // *Reset text input
  url.value = "";
  textResult.innerHTML = "";

  // *Change img source
  imgPreview.src = URL.createObjectURL(e.target.files[0]);

  // *Free memory
  imgPreview.onload = () => URL.revokeObjectURL(imgPreview.src);
});

// *Preview image URL
url.addEventListener("input", () => {
  // *Reset file input
  file.value = "";
  textResult.innerHTML = "";

  // *Change img source
  imgPreview.src = url.value;
});

// *POST request to API
form.addEventListener("submit", (e) => {
  // *Prevent form submission
  e.preventDefault();

  // *Collect form input
  const engine = engines.filter((engine) => engine.checked);

  const formData = new FormData();
  formData.append("language", language.value);
  formData.append("scale", "true");
  formData.append("isTable", receiptTable.checked ? "true" : "false");
  formData.append("OCREngine", engine.length == 0 ? "1" : engine[0].value);

  // *Check file or url input
  if (!file.value && !url.value) {
    alert("Please choose an image file or enter a URL to the image");
    return;
  } else if (file.value && !url.value) {
    formData.append("file", file.files[0]);
  } else {
    formData.append("url", url.value);
  }

  // *Make request
  const xhr = new XMLHttpRequest();

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      const text = JSON.parse(this.responseText).ParsedResults[0].ParsedText;
      if (!receiptTable.checked) {
        const regex1 = /\r\n/g;
        const regex2 = /- /g;
        textResult.innerHTML = text.replace(regex1, " ").replace(regex2, "");
      } else {
        textResult.innerHTML = text;
      }
    }
  });

  xhr.open("POST", "https://api.ocr.space/parse/image");
  xhr.setRequestHeader("apikey", "5784130d2688957");

  xhr.send(formData);

  // *Form reset after 2s
  setTimeout(() => {
    form.reset();
  }, 2000);
});

// *Copy text result
clipboard.addEventListener("click", () => {
  const textarea = document.createElement("textarea");
  textarea.value = textResult.innerHTML;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
  alert("Text copied to clipboard!");
});

// *Get copyright date
const year = new Date().getFullYear();
copyrightDate.innerText = year;
