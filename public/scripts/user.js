/* eslint-disable @typescript-eslint/restrict-template-expressions */

/**
 * Fields is an object mapping the names of the form inputs to the values typed in
 * e.g. for createUser, fields has properites 'username' and 'password'
 */

// const { HighlightSpanKind } = require("typescript");

function createUser(fields) {
  fetch('/api/users', {method: 'POST', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
    .then(showResponse)
    .catch(showResponse);
}

function changeUsername(fields) {
  fetch('/api/users', {method: 'PUT', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
    .then(showResponse)
    .catch(showResponse);
}

function changePassword(fields) {
  fetch('/api/users', {method: 'PUT', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
    .then(showResponse)
    .catch(showResponse);
}

function deleteUser(fields) {
  fetch('/api/users', {method: 'DELETE'})
    .then(showResponse)
    .catch(showResponse);
}

function signIn(fields) {
  fetch('/api/users/session', {method: 'POST', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
    .then(showResponse)
    .catch(showResponse);
}

function signOut(fields) {
  fetch('/api/users/session', {method: 'DELETE'})
    .then(showResponse)
    .catch(showResponse);
}

function followUser(fields) {
  fetch(`/api/users/follow/${fields.username}`, {method: 'POST'})
    .then(showResponse)
    .catch(showResponse);
}

function unfollowUser(fields) {
  fetch(`/api/users/follow/${fields.username}`, {method: 'DELETE'})
    .then(showResponse)
    .catch(showResponse);
}

function viewAllHighlightsByAuthor(fields) {
  fetch(`/api/users/highlights?author=${fields.author}`)
    .then(showResponse)
    .catch(showResponse);
}

function createHighlight(fields) {
  fetch(`/api/users/highlights/${fields.id}`, {method: 'POST', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
    .then(showResponse)
    .catch(showResponse);
}

function deleteHighlight(fields) {
  fetch(`/api/users/highlights/${fields.id}`, {method: 'DELETE'})
    .then(showResponse)
    .catch(showResponse);
}
