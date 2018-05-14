'use strict';

function enable() {
  // add the button to any code portion
  $('pre > code').not('.injected').addClass('injected')
    .before($('<span class="copy-button">copy</span>'))
    .parent().wrap('<div class="precontainer"></div>');
  // do the magic with clipboard.js
  new ClipboardJS('.copy-button', {
    text: function (trigger) {
      return $(trigger.nextElementSibling).text();
    }
  })
    .on('success', function (e) {
      $(e.trigger).html('copied')
    })
    .on('error', function (e) {
      $(e.trigger).html('error')
    });
}
enable();

var observer = new MutationObserver(function (mutations) {
  enable()
});

var config = {subtree: true, childList: true};
observer.observe(document, config);

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.greeting === 'hello')
      enable();
    sendResponse({farewell: 'copy code re-enabled.'});
  });