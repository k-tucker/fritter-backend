/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */

/**
 * Fields is an object mapping the names of the form inputs to the values typed in
 * e.g. for createUser, fields has properites 'username' and 'password'
 */

function viewAllFreets(fields) {
  fetch('/api/freets')
    .then(showResponse)
    .catch(showResponse);
}

function viewFreetsByAuthor(fields) {
  fetch(`/api/freets?author=${fields.author}`)
    .then(showResponse)
    .catch(showResponse);
}

function createFreet(fields) {
  fetch('/api/freets', {method: 'POST', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
    .then(showResponse)
    .catch(showResponse);
}

function editFreet(fields) {
  fetch(`/api/freets/${fields.id}`, {method: 'PUT', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
    .then(showResponse)
    .catch(showResponse);
}

function deleteFreet(fields) {
  fetch(`/api/freets/${fields.id}`, {method: 'DELETE'})
    .then(showResponse)
    .catch(showResponse);
}

function viewFreet(fields) {
  body = {...fields, views: true};
  fetch(`/api/freets/${fields.id}`, {method: 'PUT', body: JSON.stringify(body), headers: {'Content-Type': 'application/json'}})
    .then(showResponse)
    .catch(showResponse);
}

// Moved functions below to this file because the other files weren't working

function createFritForm(fields) {
  fetch('/api/fritforms', {method: 'POST', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
    .then(showResponse)
    .catch(showResponse);
}

function editFritForm(fields) {
  fetch(`/api/fritforms/${fields.id}`, {method: 'PUT', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
    .then(showResponse)
    .catch(showResponse);
}

function deleteFritForm(fields) {
  fetch('/api/fritforms', {method: 'DELETE'})
    .then(showResponse)
    .catch(showResponse);
}

function createLike(fields) {
  fetch(`/api/likes/${fields.postid}&${fields.posttype}`, {method: 'POST', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
    .then(showResponse)
    .catch(showResponse);
}

function deleteLike(fields) {
  fetch(`/api/likes/${fields.postid}&${fields.posttype}`, {method: 'DELETE'})
    .then(showResponse)
    .catch(showResponse);
}

function viewAllQuotes(fields) {
  fetch('/api/quotes')
    .then(showResponse)
    .catch(showResponse);
}

function viewQuotesByAuthor(fields) {
  fetch(`/api/quotes?author=${fields.author}`)
    .then(showResponse)
    .catch(showResponse);
}

function createQuote(fields) {
  fetch('/api/quotes', {method: 'POST', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
    .then(showResponse)
    .catch(showResponse);
}

function editQuote(fields) {
  fetch(`/api/quotes/${fields.id}`, {method: 'PUT', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
    .then(showResponse)
    .catch(showResponse);
}

function deleteQuote(fields) {
  fetch(`/api/quotes/${fields.id}`, {method: 'DELETE'})
    .then(showResponse)
    .catch(showResponse);
}

