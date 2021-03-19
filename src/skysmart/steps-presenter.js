class StepsPresenter {
  static onAnswersButtonClicked() {
    StepsPresenter.#showStepAnswers();
  }

  static #showStepAnswers() {
    StepsPresenter.#getCurrentStepId();
  }

  static #getCurrentStepId() {
    var data = JSON.stringify({"roomHash":document.URL.split("/")[5]});

		var xhr = new XMLHttpRequest();
		xhr.withCredentials = true;

		xhr.addEventListener("readystatechange", function() {
		  if(this.readyState === 4) {
        // sometimes stepuuids store in taskStudentMeta and sometimes in studentMeta so I made that. TODO: refactor
        let currentStepId = -1;
		    try {
          let steps = JSON.parse(this.responseText)['taskStudentMeta']['steps'];
  		    let currentStepLocalId = document.URL.split('/')[6] - 1;
  		    currentStepId = steps[currentStepLocalId]['stepUuid'];
        } catch (e) {
          try {
            let steps = JSON.parse(this.responseText)['taskMeta']['stepUuids'];
    		    let currentStepLocalId = document.URL.split('/')[6] - 1;
    		    currentStepId = steps[currentStepLocalId];
          } catch (e1) {
              let steps = JSON.parse(this.responseText)['taskStudentMeta']['steps'];
              let currentStepLocalId = document.URL.split('/')[6] - 1;
              currentStepId = steps[currentStepLocalId]['stepUuid'];
          }
        }
        StepsPresenter.#getStepContent(currentStepId);
		  }
		});

		xhr.open("POST", "https://api-edu.skysmart.ru/api/v1/lesson/join");
		xhr.setRequestHeader("Authorization", "Bearer " + TokenStorage.getToken());
		xhr.setRequestHeader("Content-Type", "application/json");

		xhr.send(data);
  }

  static #getStepContent(stepId) {
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function() {
      if(this.readyState === 4) {
        var stepContent = JSON.parse(this.responseText)['content'];
        StepsPresenter.#openStepAnswersPage(stepContent);
      }
    });

    xhr.open("GET", "https://api-edu.skysmart.ru/api/v1/content/step/load?stepUuid=" + stepId);
    xhr.setRequestHeader("Authorization", "Bearer " + TokenStorage.getToken());

    xhr.send();
  }

  static #openStepAnswersPage(content) {
    var doc = AnswersMarker.mark(content);

    var newWindow = window.open();
    newWindow.document.head.innerHTML = doc.head.innerHTML;
    newWindow.document.body.innerHTML = doc.body.innerHTML;
  }
}
