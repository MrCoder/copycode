'use strict';

function enable() {
  // add the button to any code portion
  $('pre').not('.injected').addClass('injected')
    .prepend($('<span class="copy-button">copy</span>')).parent().wrap('<div class="precontainer"></div>');
  // do the magic with clipboard.js
  new ClipboardJS('.copy-button', {
    text: function text(trigger) {
      return $(trigger.parentElement).text().slice(6);
    }
  }).on('success', function (e) {
    $(e.trigger).html('copied');
  }).on('error', function (e) {
    $(e.trigger).html('error');
  });
}
enable();

var observer = new MutationObserver(function (mutations) {
  enable();
});

var config = { subtree: true, childList: true };
observer.observe(document, config);

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.greeting === 'hello') enable();
  sendResponse({ farewell: 'copy code re-enabled.' });
});