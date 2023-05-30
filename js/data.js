/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

window.addEventListener('beforeunload', function (event) {
  const currentData = JSON.stringify(data);
  localStorage.setItem('data-storage', currentData);
});

const previousData = localStorage.getItem('data-storage');
if (previousData !== null) {
  data = JSON.parse(previousData);
}
