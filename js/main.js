const $inputImage = document.querySelector('.input-image');
const $entryImage = document.querySelector('.entry-image');

$inputImage.addEventListener('input', function (event) {
  $entryImage.setAttribute('src', $inputImage.value);
});

const $form = document.querySelector('#new-entry');

$form.addEventListener('submit', function (event) {
  event.preventDefault();
  const newEntry = {};
  newEntry.entryId = data.nextEntryId;
  data.nextEntryId++;
  data.entries.push(newEntry);
  $entryImage.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
});
