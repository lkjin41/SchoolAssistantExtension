let schedule = [
  "8:15 - 8:55",
  "9:05 - 9:45",
  "9:55 - 10:35",
  "10:50 - 11:30",
  "11:45 - 12:25",
  "12:40 - 13:20",
  "13:40 - 14:20"
];

let gdzBySubjects = {
  "Англ. язык": "http://google.ru",
  "Алгебра": "http://yandex.ru"
}

function start() {
  function replaceLessonNumberTitleHTML(underLessonTitleElement) {
    lessonNumberTitle = underLessonTitleElement.innerText;
    underLessonTitleElement.innerHTML = " <span style=\"color: white; background-color: #49b1dc; padding: 1px 6px\">" + lessonNumberTitle + "</span>";
  }

  function insertSchedule(underLessonTitleElement, lessonNumber) {
    underLessonTitleElement.innerHTML += "<span style=\"color: white; background-color: #32a1ce; padding: 1px 6px\">" + schedule[lessonNumber] + "</span>";
  }

  function insertGdzButton(underLessonTitleElement) {
    let subject = underLessonTitleElement.parentElement.getElementsByClassName("strong")[0].title;
    let gdzURL = gdzBySubjects[subject];
    underLessonTitleElement.innerHTML += "<a target=\"_blank\" rel=\"noopener noreferrer\" href=\"" + gdzURL + "\" style=\"color: white; background-color: #49b1dc; padding: 1px 6px;\">ГДЗ</a>";
  }

  let days = document.getElementsByClassName("grid vam marks");
  for (let day of days) {
    let underLessonTitleElements = day.getElementsByClassName("light");
    for(let i = 0; i < underLessonTitleElements.length; i++) {
      let underLessonTitleElement = underLessonTitleElements[i];
      underLessonTitleElement.style = "white-space: nowrap;";
      replaceLessonNumberTitleHTML(underLessonTitleElement);
      insertSchedule(underLessonTitleElement, i);
      insertGdzButton(underLessonTitleElement);
    }
  }
}


start();
