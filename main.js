const file = document.getElementById("file");
const url = document.getElementById("url");
const language = document.getElementById("language");
const engines = Array.from(document.getElementsByClassName("engine"));
const imgPreview = document.getElementById("img-preview");
const form = document.getElementById("form");

file.addEventListener("change", (e) => {
  // *Reset text input
  url.value = "";

  // *Change img source
  imgPreview.src = URL.createObjectURL(e.target.files[0]);

  // *Free memory
  imgPreview.onload = () => URL.revokeObjectURL(imgPreview.src);
});

url.addEventListener("input", () => {
  // *Reset file input
  file.value = "";

  // *Change img source
  imgPreview.src = url.value;
});

form.addEventListener("submit", (e) => {
  // *Prevent form submission
  e.preventDefault();
  const engine = engines.filter((engine) => engine.checked);

  const formData = new FormData();
  formData.append("language", language.value);
  formData.append("scale", "true");
  formData.append("isTable", "true");
  formData.append("OCREngine", engine.length == 0 ? "1" : engine[0].value);

  // *Check file or url input
  if (!file.value && !url.value) {
    alert("Please choose an image file or enter a URL to the image");
    return;
  } else if (file.value && !url.value) {
    formData.append("file", file.files[0].name);
    console.log(file.files);
  } else {
    formData.append("url", url.value);
  }

  // *Make request
  const xhr = new XMLHttpRequest();

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      console.log(this.responseText);
    }
  });

  xhr.open("POST", "https://api.ocr.space/parse/image");
  xhr.setRequestHeader("apikey", "5784130d2688957");

  xhr.send(formData);
});
