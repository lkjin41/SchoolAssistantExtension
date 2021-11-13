//TODO: big refactoring

window.onload = function() {
  var s = document.createElement('script');
  s.type = 'text/javascript';
  var code = `
  answer = "";

  var dataIdTooltipClassName = "data-id-tooltip";
  var correctAnswerClassName = "correct-answer";
  var dataIdTooltipStyle = ".data-id-tooltip { position: relative; z-index: 2222222!important; color: red; font-size: 12px; }";
  var correctAnswerStyle = ".correct-answer { outline: red solid 5px; left: auto!important; background-color: rgba(255, 0, 0, 0.5); }";

  var areDataIdTooltipsShown = false;

  styleElement = document.createElement('style');
  styleElement.innerHTML = dataIdTooltipStyle + correctAnswerStyle;
  document.getElementsByTagName("head")[0].appendChild(styleElement);

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
        element.classList.add(correctAnswerClassName);
      }
    });
  }

  function hideAnswers() {
    document.querySelectorAll("*").forEach(element => {
      if(element.attributes['style'] != undefined) {
        if (element.classList.contains(correctAnswerStyle)) {
          element.attributes['style'].value = ""
        }
      }});
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
       taskButtons[i].setAttribute('onclick', 'areDataIdTooltipsShown = true; getAnswer(' + (i + 1) + ', document.getElementsByClassName("test__task-nums")[1].getElementsByClassName("test__task-num")["'+ i + '"].attributes["data-test-id"].value)');
    }
  }

  function showDataIdTooltips() {
  	document.querySelectorAll(".item-outer-wrap").forEach(interactionElement => interactionElement.innerHTML = "<span class=\\"" + dataIdTooltipClassName + "\\">" + interactionElement.attributes['data-id'].value.substr(0, 15) + "</span>" + interactionElement.innerHTML);
  	document.querySelectorAll(".interaction-gap").forEach(interactionElement => interactionElement.innerHTML = "<span class=\\"" + dataIdTooltipClassName + "\\">" + interactionElement.attributes['data-id'].value.substr(0, 15) + "</span>" + interactionElement.innerHTML);
  	document.querySelectorAll(".sort__item").forEach(interactionElement => interactionElement.innerHTML = "<span class=\\"" + dataIdTooltipClassName + "\\">" + interactionElement.attributes['data-id'].value.substr(0, 15) + "</span>" + interactionElement.innerHTML);
  	document.querySelectorAll(".interaction-choice_gap-match-table").forEach(interactionElement => interactionElement.innerHTML = "<span class=\\"" + dataIdTooltipClassName + "\\">" + interactionElement.attributes['data-id'].value.substr(0, 15) + "</span>" + interactionElement.innerHTML);
  	document.querySelectorAll(".js-interaction-choice-container").forEach(interactionElement => interactionElement.innerHTML = "<span class=\\"" + dataIdTooltipClassName + "\\">" + interactionElement.attributes['data-identifier'].value.substr(0, 15) + "</span>" + interactionElement.innerHTML);
    document.querySelectorAll(".interaction-item").forEach(interactionElement => interactionElement.parentNode.innerHTML = "<span class=\\"" + dataIdTooltipClassName + "\\">" + interactionElement.attributes['data-interaction-identifier'].value.substr(0, 15) + "</span>" + interactionElement.innerHTML)
  }

  function hideDataIdTooltips() {
  	document.querySelectorAll("." + dataIdTooltipClassName).forEach(tooltip => {
      tooltip.style = "display: none";
    });
  }


  document.querySelectorAll("._help").forEach(oldButton => {
    // trick to remove all listeners
    var newButton = oldButton.cloneNode(true);
    oldButton.parentNode.replaceChild(newButton, oldButton);

    newButton.addEventListener("click", () => {
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

  setOnClickListeners();
  showDataIdTooltips();
  `;
  try {
    s.appendChild(document.createTextNode(code));
    document.head.appendChild(s);
  } catch (e) {
    s.text = code;
    document.head.appendChild(s);
  }
}
