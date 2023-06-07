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
  if (data.editing === null) {
    const newEntry = {
      title: $inputTitle.value,
      photoURL: $inputImage.value,
      notes: $inputNotes.value,
      entryId: data.nextEntryId
    };
    data.nextEntryId++;
    data.entries.unshift(newEntry);
    $list.prepend(renderEntry(newEntry));
  } else {
    const newEntry = {
      title: $inputTitle.value,
      photoURL: $inputImage.value,
      notes: $inputNotes.value,
      entryId: data.editing.entryId
    };
    for (let i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === newEntry.entryId) {
        data.entries.splice(i, 1, newEntry);
      }
    }
    const $oldEntry = document.querySelector('[data-entry-id="' + newEntry.entryId + '"]');
    $list.replaceChild(renderEntry(newEntry), $oldEntry);
    $newFormTitle.textContent = 'New Entry';
    data.editing = null;
  }
  $entryImage.setAttribute('src', 'images/placeholder-image-square.jpg');
  toggleNoEntries();
  viewSwap('entries');
  $form.reset();
});

function renderEntry(entry) {

  const $row = document.createElement('li');
  const $columnPhoto = document.createElement('div');
  const $columnNotes = document.createElement('div');
  const $image = document.createElement('img');
  const $titleWrapper = document.createElement('div');
  const $pencil = document.createElement('i');
  const $header = document.createElement('h2');
  const $notes = document.createElement('div');

  $row.className = 'row';
  $row.setAttribute('data-entry-id', entry.entryId);
  $columnPhoto.className = 'column-full column-half';
  $image.className = 'photo-url';
  $image.setAttribute('alt', 'entry image');
  $columnNotes.className = 'column-full column-half';
  $titleWrapper.className = 'title-wrapper';
  $pencil.className = 'fa-solid fa-pencil fa-xl';
  $pencil.setAttribute('aria-hidden', 'true');
  $header.className = 'title';
  $notes.className = 'notes';

  $row.appendChild($columnPhoto);
  $columnPhoto.appendChild($image);
  $row.appendChild($columnNotes);
  $columnNotes.appendChild($titleWrapper);
  $titleWrapper.appendChild($header);
  $titleWrapper.appendChild($pencil);
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
  viewSwap(data.view);
  toggleNoEntries();
});

function toggleNoEntries() {
  const $noEntry = document.querySelector('#no-entries');
  if (data.entries.length === 0) {
    $noEntry.className = 'no-entries';
  } else {
    $noEntry.className = 'no-entries-hidden';
  }
}

const $entriesView = document.querySelector('[data-view="entries"]');
const $entryFormView = document.querySelector('[data-view="entry-form"]');

function viewSwap(view) {

  if (view === 'entries') {
    $entriesView.classList.remove('hidden');
    $entryFormView.classList.add('hidden');
    $entryImage.setAttribute('src', 'images/placeholder-image-square.jpg');
    $delete.className = 'delete-hidden';
    $form.reset();
    data.view = 'entries';
  } else if (view === 'entry-form') {
    $entryFormView.classList.remove('hidden');
    $entriesView.classList.add('hidden');
    data.view = 'entry-form';
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

const $newFormTitle = document.querySelector('.new-form-title');
const $delete = document.querySelector('.delete-hidden');

$list.addEventListener('click', function (event) {
  if (event.target.matches('.fa-solid')) {
    viewSwap('entry-form');
    $delete.className = 'delete';
    const stringNum = event.target.closest('.row').getAttribute('data-entry-id');
    const intNum = parseInt(stringNum);
    for (let i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === intNum) {
        data.editing = data.entries[i];
      }
    }

    const input = new Event('input');

    $inputTitle.value = data.editing.title;
    $inputImage.value = data.editing.photoURL;
    $inputNotes.value = data.editing.notes;
    $newFormTitle.textContent = 'Edit Entry';

    $inputImage.dispatchEvent(input);
  }
}
);

const $modal = document.querySelector('.modal');
const $overlay = document.querySelector('.overlay');

$delete.addEventListener('click', function (event) {
  $modal.classList.remove('hidden');
  $overlay.classList.remove('hidden');
});

const $cancel = document.querySelector('.cancel');
$cancel.addEventListener('click', function (event) {
  $modal.classList.add('hidden');
  $overlay.classList.add('hidden');
});

const $confirm = document.querySelector('.confirm');
$confirm.addEventListener('click', function (event) {
  for (let i = 0; i < data.entries.length; i++) {
    if (data.entries[i].entryId === data.editing.entryId) {
      const $child = document.querySelector('[data-entry-id="' + data.editing.entryId + '"]');
      $child.parentNode.removeChild($child);
      data.entries.splice(i, 1);
    }
  }
  toggleNoEntries();
  $modal.classList.add('hidden');
  $overlay.classList.add('hidden');
  viewSwap('entries');
  data.editing = null;
  $form.reset();
  $entryImage.setAttribute('src', 'images/placeholder-image-square.jpg');
});
