class AnswersMarker {
  static mark(docString) {
    var doc = new DOMParser().parseFromString(docString, "text/html");

    doc = AnswersMarker.#tryDecodeBase64(doc);
    doc = AnswersMarker.#renderMath(doc);
    doc = AnswersMarker.#setStyles(doc);
    doc = AnswersMarker.#markAnswers(doc);
    doc = AnswersMarker.#matchGroupsAndElements(doc);
    doc = AnswersMarker.#joinElementsInGroup(doc);
    doc = AnswersMarker.#addBreakLines(doc);
    doc = AnswersMarker.#markCaptions(doc);
    doc = AnswersMarker.#fixTables(doc);
    doc = AnswersMarker.#strikeOutItems(doc);
    doc = AnswersMarker.#addImageTiles(doc);

    return doc;
  }

  static #tryDecodeBase64(doc) {
    try {
      function base64DecodeUnicode(str) {
          return decodeURIComponent(atob(str).split('').map(function(c) {
              return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          }).join(''));
      }

      var isBase64 = "^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$"
      doc.querySelectorAll('[text]').forEach(element => {
        if(element.attributes['text'].value.match(isBase64)) {
            element.innerText = base64DecodeUnicode(element.attributes['text'].value)
        }
      });
    } catch (e) {
      console.log("Cannot decode b64");
    }
    return doc;
  }

  static #renderMath(doc) {
    function containsNonLatinCodepoints(s) {
      return /[^\u0000-\u00ff]/.test(s);
    }

    function renderElement(element) {
      try {
        var expression = element.innerText;
        if(!containsNonLatinCodepoints(expression)) {
          element.innerHTML = katex.renderToString(expression);
        }
      } catch (e) {
        console.error(e);
      }
    }

    doc.querySelectorAll("vim-math, math-input-answer, vim-groups-item").forEach(element => {
      renderElement(element);
    });

    return doc;
  }

  static #setStyles(doc) {
    var styles = `
          <style>
            .correct {color: red; font-weight: bold; outline: 1px solid red; opacity:100%!important}
            .striked {color: red; font-weight: bold; outline: 1px solid red; opacity:100%!important; text-decoration: line-through}
            vim-input-answers {color: red; font-weight: bold; outline: 1px solid red; opacity:100%!important}
            math-input-answers {color: red; font-weight: bold; outline: 1px solid red; opacity:100%!important}
            math-input-answer {color: red; font-weight: bold; outline: 1px solid red; opacity:100%!important}
            vim-input-item {color: red; font-weight: bold; outline: 1px solid red; opacity:100%!important}
            vim-instruction {color: green; font-weight: 600;}
            substr {font-weight: 600;}
            workbook {font-weight: 600;}"
            module {font-weight: 600;}
            lesson {font-weight: 600;}
            step {font-weight: 600;}
            step-id {font-weight: 600;}
            vim-select-item{opacity:50%;}
            vim-strike-out-item{opacity:50%;}
            vim-test-item{opacity:50%;}
            tr{outline: 1px solid;}
            td{outline: 1px solid;}
            body {display: block; margin-left: auto; margin-right: auto; width: 760px;}
            ` + katexCSS + `
          </style>`;
    doc.head.innerHTML += styles;
    return doc;
  }

  static #markAnswers(doc) {
    doc.body.innerHTML = doc.body.outerHTML.replaceAll('correct=\"true\">', "correct=\"true\" class=\"correct\">");
    return doc;
  }

  static #matchGroupsAndElements(doc) {
    doc.querySelectorAll('[drag-ids]').forEach(drop => {
        drop.attributes['drag-ids'].value.split(",").forEach(dragId => {
            var randomColor = '#' + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1,6);
            drop.style = "outline: 2px " + randomColor + " solid; color: " + randomColor;
            drop.innerHTML += '<span style="color: ' + randomColor +  '; font-size: 10px">(' + randomColor + ')</span>'

            doc.querySelectorAll('[answer-id]').forEach(answer => {
                if(answer.attributes['answer-id'].value == dragId) {
                    answer.style = "outline: 2px " + randomColor + " solid; color: " + randomColor;
                    answer.innerHTML += '<span style="color: ' + randomColor +  '; font-size: 10px">(' + randomColor + ')</span>'
                    drop.innerHTML += answer.innerHTML;
                }
            });
        });
    });
    return doc;
  }

  static #joinElementsInGroup(doc) {
    doc.querySelectorAll("vim-groups-row").forEach(row => row.classList.add("correct"));
    return doc;
  }

  static #addBreakLines(doc) {
    doc.body.innerHTML = doc.body.outerHTML.replaceAll('</vim-dnd-image-drags>', '</vim-dnd-image-drags><br><br>');
    doc.body.innerHTML = doc.body.outerHTML.replaceAll('</vim-dnd-group-drags>', '</vim-dnd-group-drags><br><br>');
    doc.body.innerHTML = doc.body.outerHTML.replaceAll('</vim-input-item>', '</vim-input-item><br>');
    doc.body.innerHTML = doc.body.outerHTML.replaceAll('vim-dnd-image-set-images>', '<br><br><vim-dnd-image-set-images>');
    doc.body.innerHTML = doc.body.outerHTML.replaceAll('<vim-test', '<br><vim-test');
    doc.body.innerHTML = doc.body.outerHTML.replaceAll('<vim-groups ', '<br><vim-groups ');
    doc.body.innerHTML = doc.body.outerHTML.replaceAll('</vim-groups-row>', '</vim-groups-row><br>');
    doc.body.innerHTML = doc.body.outerHTML.replaceAll('</vim-instruction>', '</vim-instruction><br>');
    doc.body.innerHTML = doc.body.outerHTML.replaceAll('<vim-source-list>', '<br><br><vim-source-list>');
    return doc;
  }

  static #markCaptions(doc) {
    doc.body.innerHTML = doc.body.outerHTML.replaceAll('<vim-dnd-group-item-caption>', '<h3><vim-dnd-group-item-caption>');
    doc.body.innerHTML = doc.body.outerHTML.replaceAll('</vim-dnd-group-item-caption>', '</vim-dnd-group-item-caption></h3>');
    return doc;
  }

  static #fixTables(doc) {
    doc.querySelectorAll("vim-cell-container").forEach(cellContainer => {
      var result = "";
      var colsCount = cellContainer.attributes['cols'].value;
      var cells = cellContainer.children;
      result += '<table cols="'+colsCount+'">';
      for(var rowIndex = 0; rowIndex < cells.length / colsCount; rowIndex++) {
          result += "<tr>";
          for(var colIndex = 0; colIndex < colsCount; colIndex++) {
              result += "<td>";
              var cell = cells[colIndex + (rowIndex * colsCount)];
              result += cell.outerHTML;
              result += "</td>";
          }
          result += "</tr>";
      }
      result += "</table>";
      cellContainer.outerHTML = result;
    });
    return doc;
  }

  static #strikeOutItems(doc) {
    doc.querySelectorAll("vim-strike-out-item").forEach(item => {
      if(item.attributes['striked']) {
          item.classList.add('striked');
      }
    });
    return doc;
  }

  static #addImageTiles(doc) {
    var itemsWithImage = doc.getElementsByTagName("vim-test-image-item");
    for(var i = 0; i < itemsWithImage.length; i++) {
        itemsWithImage[i].innerText += "Изображение №" + (i + 1);
    }
    return doc;
  }
}