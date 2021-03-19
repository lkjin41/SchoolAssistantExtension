let answersButtonId = "i8dusadoSAI3";
let addAnswersButtonInterval;
var blob;
var actualDocument;
var headerText;

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
  if(actualDocument.getElementsByClassName("invisible")[0].style.visibility == "visible") {
    actualDocument.getElementById("headertext").innerHTML += "<button id=\"" + answersButtonId + "\" onclick=\"blob=new Blob([CourseConfig.contentTask],{type:&quot;text/xml&quot;}),url=window.URL.createObjectURL(blob);window.open(url),window.URL.revokeObjectURL(url);\">Ответ</button>"
    return true;
  }
  return false;
}

function tryAddAnswersButton() {
  let addAnswersButtonInterval = setInterval(function() {
    if(document.getElementById("courseframe").contentWindow.document != null) {
      actualDocument = document.getElementById("courseframe").contentWindow.document
      if(!actualDocument.getElementById(answersButtonId)) {
        headerText = actualDocument.querySelectorAll("#headertext")
        addAnswersButton();
      }
    }
  }, 500);
  console.log("intervalId = " + addAnswersButtonInterval);
}

tryAddAnswersButton();
