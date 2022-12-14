/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */

// const {createImmediatelyInvokedArrowFunction} = require('typescript');

// Show an object on the screen.
function showObject(obj) {
  const pre = document.getElementById('response');
  const preParent = pre.parentElement;
  pre.innerText = JSON.stringify(obj, null, 4);
  preParent.classList.add('flashing');
  setTimeout(() => {
    preParent.classList.remove('flashing');
  }, 300);
}

function showResponse(response) {
  response.json().then(data => {
    showObject({
      data,
      status: response.status,
      statusText: response.statusText
    });
  });
}

/**
 * IT IS UNLIKELY THAT YOU WILL WANT TO EDIT THE CODE ABOVE.
 * EDIT THE CODE BELOW TO SEND REQUESTS TO YOUR API.
 *
 * Native browser Fetch API documentation to fetch resources: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
 */

// Map form (by id) to the function that should be called on submit
const formsAndHandlers = {
  'create-user': createUser,
  'delete-user': deleteUser,
  'change-username': changeUsername,
  'change-password': changePassword,
  'sign-in': signIn,
  'sign-out': signOut,
  'follow-user': followUser,
  'unfollow-user': unfollowUser,
  'view-all-freets': viewAllFreets,
  // 'view-freet': viewFreet,
  'view-all-highlights-by-author': viewAllHighlightsByAuthor,
  'create-fritform': createFritForm,
  'edit-fritform': editFritForm,
  'delete-fritform': deleteFritForm,
  'view-freets-by-author': viewFreetsByAuthor,
  'create-freet': createFreet,
  'edit-freet': editFreet,
  'delete-freet': deleteFreet,
  'create-quote': createQuote,
  'edit-quote': editQuote,
  'delete-quote': deleteQuote,
  'view-all-quotes': viewAllQuotes,
  'view-quotes-by-author': viewQuotesByAuthor,
  'create-highlight': createHighlight,
  'delete-highlight': deleteHighlight,
  'create-like': createLike,
  'delete-like': deleteLike
};

// Attach handlers to forms
function init() {
  Object.entries(formsAndHandlers).forEach(([formID, handler]) => {
    const form = document.getElementById(formID);
    form.onsubmit = e => {
      e.preventDefault();
      const formData = new FormData(form);
      handler(Object.fromEntries(formData.entries()));
      return false; // Don't reload page
    };
  });
}

// Attach handlers once DOM is ready
window.onload = init;
