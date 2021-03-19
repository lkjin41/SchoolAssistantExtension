class StepsView {
  static setup() {
    StepsView.#addAnswersButton();
  }

  static #addAnswersButton() {
    // var buttonPath = document.body;
    // var buttonStyle = `
    //   position: -webkit-sticky;
    //   position: sticky;
    //   top: 0;
    //   margin-left: 50%;
    //   width: 10em;
    //   height: 2em;
    //   z-index: 2147483647;`;
    // var buttonElement = '<button style="' + buttonStyle + '" id="answers-button">Ответ</button>';
    // document.body.innerHTML = buttonElement + document.body.innerHTML

    var oldButton = document.getElementsByTagName("edu-skysmart-button-link")[0];
    
    // trick to remove all listeners
    var newButton = oldButton.cloneNode(true);
    oldButton.parentNode.replaceChild(newButton, oldButton);

    newButton.addEventListener("click", StepsPresenter.onAnswersButtonClicked);

    var buttonTextSpan = document.querySelector("body > app-root > app-homework-page > app-homework-doing-page > app-homework-doing-page-view > app-homework-layout > div > div.header.ng-star-inserted > div.header-rest > lesson-step-issue > step-issue > edu-skysmart-button-link > ds-button > button > div.content > span");
    buttonTextSpan.innerText = "Ответ";
    buttonTextSpan.style.color = "red";
  }
}
