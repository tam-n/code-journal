const inputImage = document.querySelector('.input-image');
const entryImage = document.querySelector('.entry-image');

inputImage.addEventListener('input', function (event) {
  entryImage.setAttribute('src', inputImage.value);
});
