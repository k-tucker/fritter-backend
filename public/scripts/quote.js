
/* eslint-disable @typescript-eslint/restrict-template-expressions */

/**
 * Fields is an object mapping the names of the form inputs to the values typed in
 * e.g. for createUser, fields has properites 'username' and 'password'
 */

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

