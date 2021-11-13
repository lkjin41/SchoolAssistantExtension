class StepsView {
  static setup() {
    StepsView.#addAnswersButton();
  }

  static #addAnswersButton() {
    var oldButton = document.querySelector("body > app-root > app-homework-page > app-homework-doing-page > app-homework-doing-page-view > app-homework-layout > div > div.header.ng-star-inserted > app-logo")
    
    // trick to remove all listeners
    var newButton = oldButton.cloneNode(true);
    oldButton.parentNode.replaceChild(newButton, oldButton);

    newButton.addEventListener("click", StepsPresenter.onAnswersButtonClicked);

    var buttonTextSpan = document.querySelector("body > app-root > app-homework-page > app-homework-doing-page > app-homework-doing-page-view > app-homework-layout > div > div.header.ng-star-inserted > app-logo")
    buttonTextSpan.innerText = "Ответ";
    buttonTextSpan.style.color = "red";
    buttonTextSpan.style="cursor: pointer;";
  }
}
