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

function renderEntry(entry) {

  const $list = document.createElement('ul');
  const $row = document.createElement('li');
  const $columnPhoto = document.createElement('div');
  const $columnNotes = document.createElement('div');
  const $image = document.createElement('img');
  const $header = document.createElement('h2');
  const $notes = document.createElement('div');

  $row.className = 'row';
  $columnPhoto.className = 'column-full column-half';
  $image.className = 'photo-url';
  $image.setAttribute('alt', 'entry image');
  $columnNotes.className = 'column-full column-half';
  $header.className = 'title';
  $notes.className = 'notes';

  $list.appendChild($row);
  $row.appendChild($columnPhoto);
  $columnPhoto.appendChild($image);
  $row.appendChild($columnNotes);

  $image.setAttribute('src', entry.photoURL);
  $header.textContent = entry.title;
  $notes.textContent = entry.notes;

  return $list;
}

renderEntry();
