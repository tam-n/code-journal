const $inputImage = document.querySelector('#input-image');
const $entryImage = document.querySelector('#entry-image');
const $inputTitle = document.querySelector('#title');
const $inputNotes = document.querySelector('#notes');
const $form = document.querySelector('#new-entry');

$inputImage.addEventListener('input', function (event) {
  $entryImage.setAttribute('src', $inputImage.value);
});

$form.addEventListener('submit', function (event) {
  event.preventDefault();
  const newEntry = {
    title: $inputTitle.value,
    photoURL: $inputImage.value,
    notes: $inputNotes.value,
    entryId: data.nextEntryId
  };
  data.nextEntryId++;
  data.entries.unshift(newEntry);
  $entryImage.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
});
