let answersButtonId = "i8dusadoSAI3";
let addAnswersButtonInterval;
var blob;
var actualDocument;
var rightBlock;

function showAnswers() {
  try {
    var jsBody = "blob=new Blob([CourseConfig.contentTask],{type:&quot;text\/xml&quot;}),url=URL.createObjectURL(blob);window.open(url),URL.revokeObjectURL(url);\r\n";
    var scriptTag = actualDocument.createElement("script");
    scriptTag.innerHTML = jsBody;
    actualDocument.head.appendChild(scriptTag);
  } catch (e) {
    console.log(e);
  }
}

function addAnswersButton() {
  if(actualDocument.readyState == 'complete') {
    actualDocument.getElementsByClassName("right-block")[0].innerHTML += "<button id=\"" + answersButtonId + "\" onclick=\"blob=new Blob([CourseConfig.contentTask],{type:&quot;text/xml&quot;}),url=window.URL.createObjectURL(blob);window.open(url),window.URL.revokeObjectURL(url);\">Ответ</button>"
    return true;
  }
  return false;
}

function tryAddAnswersButton() {
  let addAnswersButtonInterval = setInterval(function() {
    if(document.getElementsByClassName('fullsize')[0] != null) {
      var actualIframe = document.getElementsByClassName('fullsize')[0];
      actualDocument = actualIframe.contentWindow.document || actualIframe.contentDocument;
      if(!actualDocument.getElementById(answersButtonId)) {
        rightBlock = actualDocument.querySelector('right-block')
        addAnswersButton();
      }
    }
  }, 1000);
  console.log("intervalId = " + addAnswersButtonInterval);
}

tryAddAnswersButton();
