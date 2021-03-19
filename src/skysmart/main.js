function setupWhenFullyLoaded() {
  window.onload = function () {
    setTimeout(() => {
      let intervalId = setInterval(() =>  {
        if(document.querySelector("sky-ui-spinner") == null) {
          StepsView.setup();
          clearInterval(intervalId);
        }
      }, 500)
    }, 1000);
  };
}

setupWhenFullyLoaded();
