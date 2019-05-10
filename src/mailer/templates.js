export default {
  confirmationMessageHtml(name, url) {
    return `<h4>Hi ${name}.</h4> <p>Thank you for ordering, want to go back to our website visit this : ${url} </p>`;
  },

  confirmationMessageText(name, url) {
    return `Hi ${name}. Thank you for ordering, want to go back to our website visit this : ${url}`;
  }
};
