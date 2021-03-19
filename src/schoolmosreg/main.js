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
  "Англ. язык": {
    "Учебник": "https://gdz.ru/class-9/english/reshebnik-spotlight-9-vaulina-yu-e/",
    "Рабочая тетрадь": "https://gdz.ru/class-9/english/spotlight-workbook/"
  },
  "Геометрия": {
    "Учебник": "https://gdz.ru/class-7/geometria/atanasyan-7-9/"
  },
  "Алгебра": {
    "Учебник": "https://gdz.ru/class-9/algebra/mordkovich-10"
  },
  "Физика": {
    "Учебник": "https://www.euroki.org/gdz/ru/fizika/9_klass/a_v_peryshkin_e_m_gutnik"
  },
  "Химия": {
    "Учебник": "https://gomolog.ru/reshebniki/9-klass/kuznecova-2019.html"
  },
  "Информатика": {
    "Учебник": "https://5urokov.ru/gdz/bosova_9_uch"
  },
  "ОБЖ": {
    "Учебник": "https://gdzznaniya.ru/obzh-9/smirnov/"
  },
  "Ист.России.Всеоб.ист": {
    "Учебник": "https://megaresheba.ru/gdz/istorija/9-klass/arsentjev"
  },
  "География": {
    "Учебник": "https://resheba.me/gdz/geografija/9-klass/alekseev-bolysov",
    "Контурные карты": "https://www.euroki.org/gdz/ru/geografiya/9_klass/konturnye-karty-po-geografii-9-klass-fgos-673"
  },
  "Рус. язык": {
    "Учебник": "https://gdz.ru/class-9/russkii_yazik/barhudarov-kruchkov-9/"
  },
  "Родной язык": {
    "Учебник": "https://gdz.ru/class-9/russkii_yazik/barhudarov-kruchkov-9/"
  },
  "Литература": {
    "Учебник": "https://gdz.ru/class-9/literatura/korovina/"
  },
  "Родная литература": {
    "Учебник": "https://gdz.ru/class-9/literatura/korovina/"
  },
  "Биология": {
    "Учебник": "https://gdz.ru/class-9/biologiya/ponomareva/"
  },
  "Обществознание": {
    "Учебник": "https://gdz.ru/class-9/obshhestvoznanie/bogolyubov/"
  }
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
    if(gdzBySubjects[subject] != undefined) {
      for (var gdzName in gdzBySubjects[subject]) {
        let gdzURL = gdzBySubjects[subject][gdzName];
        underLessonTitleElement.innerHTML += "<a target=\"_blank\" rel=\"noopener noreferrer\" href=\"" + gdzURL + "\" style=\"color: white; background-color: #49b1dc; display: flex; padding: 5px 6px;\">ГДЗ " + gdzName + "</a>";
      }
    }
  }

  let days = document.getElementsByClassName("grid vam marks");
  for (let day of days) {
    let underLessonTitleElements = day.getElementsByClassName("light");
    for(let i = 0; i < underLessonTitleElements.length; i++) {
      let underLessonTitleElement = underLessonTitleElements[i];
      underLessonTitleElement.style = "white-space: nowrap; display: table-caption; margin-top: 5px;";
      replaceLessonNumberTitleHTML(underLessonTitleElement);
      insertSchedule(underLessonTitleElement, i);
      insertGdzButton(underLessonTitleElement);
    }
  }
}


start();
