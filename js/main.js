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
  $list.prepend(renderEntry(newEntry));
  viewSwap('entries');
  if (data.entries !== null) {
    toggleNoEntries();
  } else {
    toggleNoEntries();
  }
});

function renderEntry(entry) {

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

  $row.appendChild($columnPhoto);
  $columnPhoto.appendChild($image);
  $row.appendChild($columnNotes);
  $columnNotes.appendChild($header);
  $columnNotes.appendChild($notes);

  $image.setAttribute('src', entry.photoURL);
  $header.textContent = entry.title;
  $notes.textContent = entry.notes;

  return $row;
}

const $list = document.querySelector('ul');

document.addEventListener('DOMContentLoaded', function () {
  for (let i = 0; i < data.entries.length; i++) {
    $list.appendChild(renderEntry(data.entries[i]));
  }
  const lastView = localStorage.getItem('currentView');
  if (lastView) {
    viewSwap(lastView);
  }
  if (data.entries !== null) {
    toggleNoEntries();
  } else {
    toggleNoEntries();
  }
});

function toggleNoEntries() {
  const $noEntry = document.querySelector('.no-entries');
  $noEntry.className = 'no-entries-hidden';
}

function viewSwap(view) {
  const $entriesView = document.querySelector('[data-view="entries"]');
  const $entryFormView = document.querySelector('[data-view="entry-form"]');

  if (view === 'entries') {
    $entriesView.classList.remove('hidden');
    $entryFormView.classList.add('hidden');
    localStorage.setItem('currentView', 'entries');
  } else if (view === 'entry-form') {
    $entryFormView.classList.remove('hidden');
    $entriesView.classList.add('hidden');
    localStorage.setItem('currentView', 'entry-form');
  }
}

const $header = document.querySelector('.header-wrapper');

$header.addEventListener('click', function (event) {
  if (event.target.matches('.entries')) {
    viewSwap('entries');
  }
});

const $subHeader = document.querySelector('.sub-header');

$subHeader.addEventListener('click', function (event) {
  if (event.target.matches('.entry-form')) {
    viewSwap('entry-form');
  }
});
