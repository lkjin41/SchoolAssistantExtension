answer = "";
var dataIdTooltipStyle = "position: absolute; z-index: 222; transform: translateY(-15px); color: red;";
var correctAnswerStyle = "outline: red solid 5px; left: auto; background-color: rgba(255, 0, 0, 0.5);";

function getAllElementsWithAttribute(attribute, taskNum)
{
  var matchingElements = [];
  var allElements = document.getElementsByClassName("scene")[taskNum - 1].getElementsByTagName('*');
  for (var i = 0, n = allElements.length; i < n; i++)
  {
    if (allElements[i].getAttribute(attribute) !== null)
    {
      matchingElements.push(allElements[i]);
    }
  }
  return matchingElements;
}

function isCorrectValue(value) {
  json = JSON.parse(answer);
  values = []
  for (i in json) {
    for (j in json[i]) {
      values.push(json[i][j]['value']);
    }
  }
  return values.includes(value);
}

function getAllTaskElements(taskId, taskNum) {
  allElementsWithValue = getAllElementsWithAttribute("value", taskNum);
  allElementsWithValue.forEach(element => {
    if(isCorrectValue(element.value)) {
      element.style = correctAnswerStyle;
    }
  });
}

function hideAnswers() {
  document.querySelectorAll("*").forEach(element => {
    if(element.attributes['style'] != undefined) {
      if (element.attributes['style'].value == correctAnswerStyle) {
        element.attributes['style'].value = ""
      }
    }});
}

function getTask(taskNum, taskId) {
  getAnswer(taskNum, taskId);
}

function getAnswer(taskNum, taskId) {
  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.addEventListener("readystatechange", function() {
    if(this.readyState === 4) {
      console.log("taskNum: " + taskNum + " taskId: " + taskId);
      answer = JSON.stringify(JSON.parse(this.responseText), null, 4)
      console.log(answer);
      getAllTaskElements(taskId, taskNum);
    }
  });

  xhr.open("GET", "https://resh.edu.ru/tests/" + taskId + "/get-answers");
  xhr.setRequestHeader("X-Requested-With", " XMLHttpRequest");

  xhr.send();
}

function setOnClickListeners() {
  taskButtons = document.getElementsByClassName("test__task-nums")[1].getElementsByClassName("test__task-num");
  for (var i = 0; i < taskButtons.length; i++) {
     taskButtons[i].setAttribute('onclick', 'getTask(' + (i + 1) + ', document.getElementsByClassName("test__task-nums")[1].getElementsByClassName("test__task-num")["'+ i + '"].attributes["data-test-id"].value)');
  }
}

setOnClickListeners();


var areDataIdTooltipsShown = true;
var dataIdTooltipClassName = "data-id-tooltip";
function showDataIdTooltips() {
	var dataIdTooltipStyle = "position: absolute; z-index: 222; transform: translateY(-15px); color: red;";
	document.querySelectorAll(".item-outer-wrap").forEach(interactionElement => interactionElement.innerHTML = "<span class=\"" + dataIdTooltipClassName + "\">" + interactionElement.attributes['data-id'].value + "</span>" + interactionElement.innerHTML);
	document.querySelectorAll(".interaction-gap").forEach(interactionElement => interactionElement.innerHTML = "<span class=\"" + dataIdTooltipClassName + "\">" + interactionElement.attributes['data-id'].value + "</span>" + interactionElement.innerHTML);
	document.querySelectorAll(".sort__item").forEach(interactionElement => interactionElement.innerHTML = "<span class=\"" + dataIdTooltipClassName + "\">" + interactionElement.attributes['data-id'].value + "</span>" + interactionElement.innerHTML);
	document.querySelectorAll(".interaction-choice_gap-match-table").forEach(interactionElement => interactionElement.innerHTML = "<span class=\"" + dataIdTooltipClassName + "\">" + interactionElement.attributes['data-id'].value + "</span>" + interactionElement.innerHTML);
	document.querySelectorAll(".js-interaction-choice-container").forEach(interactionElement => interactionElement.innerHTML = "<span class=\"" + dataIdTooltipClassName + "\">" + interactionElement.attributes['data-identifier'].value + "</span>" + interactionElement.innerHTML);
	document.querySelectorAll("." + dataIdTooltipClassName).forEach(tooltip => tooltip.style = dataIdTooltipStyle);
}

function hideDataIdTooltips() {
	document.querySelectorAll("." + dataIdTooltipClassName).forEach(tooltip => tooltip.style = "display: none");
}


$('._help').each(function(i, item) {
    $(item).unbind()
    $(item).on("click", function(e) {
    	if(areDataIdTooltipsShown) {
    		hideDataIdTooltips();
        hideAnswers();
    		areDataIdTooltipsShown = false;
    	} else {
    		showDataIdTooltips();
    		areDataIdTooltipsShown = true;
    	}
    })
});

showDataIdTooltips();