
//handle the share functionality
var share_button = document.querySelector('#share');
share_button.addEventListener('click',function(){
  var placeholder = document.createElement('input');
  var link = window.location.href;
  document.body.appendChild(placeholder);
  placeholder.value = link;
  placeholder.select();
  document.execCommand('copy');
  document.body.removeChild(placeholder);
  $('#success_alert').slideDown(400).delay(3000).slideUp(400);
});


window.onload = function() {
  var converter = new showdown.Converter();
  var pad = document.querySelector('#pad');
  var markdownArea = document.querySelector('#markdown');

  // make sure the tab is functional
  pad.addEventListener('keydown',function(e){
    if(e.keyCode === 9){
      // if tab is pressed
      // get caret position/selection
      var start = this.selectionStart;
      var end = this.selectionEnd;

      var target = e.target;
      var value = target.value;

      //set textarea value to: text before caret + tab + text after caret
      target.value = value.substring(0, start) + "\t" + value.substring(end);

      //put caret at the right position again (add one for the tab)
      this.selectionStart = this.selectionEnd = start + 1;

      //prevent the focus lose
      e.preventDefault();
    }
  })
  var previousMarkdownValue;

  var textToMarkdown = function(){
    var markdownText = pad.value;
    previousMarkdownValue = markdownText;
    html = converter.makeHtml(markdownText);
    markdownArea.innerHTML = html;
  };

  var didChangeOccur = function(){
    if (previousMarkdownValue != pad.value){
      return true;
    }
    return false;
  }

  setInterval(function(){
    if(didChangeOccur()){
      textToMarkdown();
    }
  }, 1000);

  pad.addEventListener('input', textToMarkdown);

  //ignore if on home page
  if (document.location.pathname.length > 1){
    // implement shareJS
  var documentName = document.location.pathname.substring(1);
  sharejs.open(documentName,'text',function(error, doc){
    doc.attach_textarea(pad);
    textToMarkdown();
  })
}

textToMarkdown();
};
