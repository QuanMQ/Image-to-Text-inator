const axios = require("axios");
const file = document.getElementById("file");
const url = document.getElementById("url");
const imgPreview = document.getElementById("img-preview");
const form = document.getElementById("form");

file.addEventListener("change", (e) => {
  // *Reset text input
  url.value = "";

  // *Change img source
  imgPreview.src = URL.createObjectURL(e.target.files[0]);
  console.log(e.target.files[0]);

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
  e.preventDefault;
});
