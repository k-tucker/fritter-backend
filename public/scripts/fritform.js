
/**
 * Fields is an object mapping the names of the form inputs to the values typed in
 * e.g. for createUser, fields has properites 'username' and 'password'
 */

function createFritForm(fields) {
  fetch('/api/fritforms', {method: 'POST', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
    .then(showResponse)
    .catch(showResponse);
}

function editFritForm(fields) {
  fetch('/api/fritforms', {method: 'PUT', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
    .then(showResponse)
    .catch(showResponse);
}

function deleteFritForm(fields) {
  fetch('/api/fritforms', {method: 'DELETE'})
    .then(showResponse)
    .catch(showResponse);
}
