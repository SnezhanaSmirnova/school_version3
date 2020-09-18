"use strict";
let count = 1;
var multiItemSlider = (function () {
  return function (selector, config) {
    var _mainElement = document.querySelector(selector), // основный элемент блока
      _sliderWrapper = _mainElement.querySelector(".slider__wrapper"), // обертка для .slider-item
      _sliderItems = _mainElement.querySelectorAll(".slider__item"), // элементы (.slider-item)
      _sliderControls = document.querySelectorAll(".slider__control"), // элементы управления
      _sliderControlLeft = document.querySelector(".slider__control_left"), // кнопка "LEFT"
      _sliderControlRight = document.querySelector(".slider__control_right"), // кнопка "RIGHT"
      _wrapperWidth = parseFloat(getComputedStyle(_sliderWrapper).width), // ширина обёртки
      _itemWidth = parseFloat(getComputedStyle(_sliderItems[0]).width), // ширина одного элемента
      _positionLeftItem = 0, // позиция левого активного элемента
      _transform = 0, // значение транфсофрмации .slider_wrapper
      _step = (_itemWidth / _wrapperWidth) * 100, // величина шага (для трансформации)
      _items = []; // массив элементов

    // наполнение массива _items
    _sliderItems.forEach(function (item, index) {
      _items.push({ item: item, position: index, transform: 0 });
    });

    var position = {
      getItemMin: function () {
        var indexItem = 0;
        _items.forEach(function (item, index) {
          if (item.position < _items[indexItem].position) {
            indexItem = index;
          }
        });
        return indexItem;
      },
      getItemMax: function () {
        var indexItem = 0;
        _items.forEach(function (item, index) {
          if (item.position > _items[indexItem].position) {
            indexItem = index;
          }
        });
        return indexItem;
      },
      getMin: function () {
        return _items[position.getItemMin()].position;
      },
      getMax: function () {
        return _items[position.getItemMax()].position;
      },
    };
    let count = 1;
    var _transformItem = function (direction) {
      var nextItem;
      if (direction === "right") {
        if (count > document.querySelectorAll(".slider__img").length - 1) {
          count = 0;
        }
        if (count == document.querySelectorAll(".slider__img").length - 1) {
          count = -1;
        }
        _positionLeftItem++;
        if (_positionLeftItem + _wrapperWidth / _itemWidth - 1 > position.getMax()) {
          nextItem = position.getItemMin();
          _items[nextItem].position = position.getMax() + 1;
          _items[nextItem].transform += _items.length * 100;
          _items[nextItem].item.style.transform = "translateX(" + _items[nextItem].transform + "%)";
        }
        count++;
        document.querySelectorAll(".slider__img").forEach((elem) => elem.classList.remove("slide-active"));
        document.querySelectorAll(".slider__img")[count].classList.add("slide-active");
        _transform -= _step;
      }

      if (direction === "left") {
        if (count < 0) {
          count = document.querySelectorAll(".slider__img").length - 1;
        }
        if (count == 0) {
          count = document.querySelectorAll(".slider__img").length;
        }
        _positionLeftItem--;
        if (_positionLeftItem < position.getMin()) {
          nextItem = position.getItemMax();
          _items[nextItem].position = position.getMin() - 1;
          _items[nextItem].transform -= _items.length * 100;
          _items[nextItem].item.style.transform = "translateX(" + _items[nextItem].transform + "%)";
        }
        count--;
        document.querySelectorAll(".slider__img").forEach((elem) => elem.classList.remove("slide-active"));
        document.querySelectorAll(".slider__img")[count].classList.add("slide-active");
        _transform += _step;
      }
      _sliderWrapper.style.transform = "translateX(" + _transform + "%)";
    };

    // обработчик события click для кнопок "назад" и "вперед"
    var _controlClick = function (e) {
      if (e.target.classList.contains("slider__control")) {
        e.preventDefault();
        var direction = e.target.classList.contains("slider__control_right") ? "right" : "left";
        _transformItem(direction);
      }
    };

    var _setUpListeners = function () {
      // добавление к кнопкам "назад" и "вперед" обрботчика _controlClick для событя click
      _sliderControls.forEach(function (item) {
        item.addEventListener("click", _controlClick);
      });
    };

    // инициализация
    _setUpListeners();

    return {
      right: function () {
        // метод right
        _transformItem("right");
      },
      left: function () {
        // метод left
        _transformItem("left");
      },
    };
  };
})();

var slider = multiItemSlider(".slider");


// раздел с часто задаваемыми вопросами

let answersArray = [
  "Каждое занятие является неотъемлемой частью курса, поэтому мы не видим необходимости в проведении пробных занятий. Если у вас есть сомнения, то наша команда поможет вам подобрать нужный курс. Пройдите наше тестирование.",
  "Такие вопросы решаются индивидуально с преподавателем. Мы можем предоставить запись занятия или преподаватель дает индивидуально материал для изучения.",
  "Мы начинаем занятия по мере формирования групп. Для получения актуальной информации, свяжитесь с нами по телефону или электронной почте.",
  "Вы можете узнать расписание по телефону. Обычно занятия на протяжении всего курса проходят в одно и тоже время.",
  "Да. Вы можете самостоятельно выбрать этот формат обучения.",
  "Продолжительность одного занятия составляет 3 часа.",
  "Оплата вносится ежемесячно, согласно договору."
]

let question1 = document.getElementById('question1');
let question2 = document.getElementById('question2');
let question3 = document.getElementById('question3');
let question4 = document.getElementById('question4');
let question5 = document.getElementById('question5');
let question6 = document.getElementById('question6');
let question7 = document.getElementById('question7');
let answer = document.getElementById('answer');


question1.addEventListener('click', showAnswer1);
question2.addEventListener('click', showAnswer2);
question3.addEventListener('click', showAnswer3);
question4.addEventListener('click', showAnswer4);
question5.addEventListener('click', showAnswer5);
question6.addEventListener('click', showAnswer6);
question7.addEventListener('click', showAnswer7);

function showAnswer1(){
  question1.classList.add('questions__container-questions_number-active');
  answer.innerHTML = answersArray[0];
  question2.classList.remove('questions__container-questions_number-active');
  question3.classList.remove('questions__container-questions_number-active');
  question4.classList.remove('questions__container-questions_number-active');
  question5.classList.remove('questions__container-questions_number-active');
  question6.classList.remove('questions__container-questions_number-active');
  question7.classList.remove('questions__container-questions_number-active');
}
function showAnswer2(){
  question2.classList.add('questions__container-questions_number-active');
  answer.innerHTML = answersArray[1];
  question1.classList.remove('questions__container-questions_number-active');
  question3.classList.remove('questions__container-questions_number-active');
  question4.classList.remove('questions__container-questions_number-active');
  question5.classList.remove('questions__container-questions_number-active');
  question6.classList.remove('questions__container-questions_number-active');
  question7.classList.remove('questions__container-questions_number-active');
}
function showAnswer3(){
  question3.classList.add('questions__container-questions_number-active');
  answer.innerHTML = answersArray[2];
  question1.classList.remove('questions__container-questions_number-active');
  question2.classList.remove('questions__container-questions_number-active');
  question4.classList.remove('questions__container-questions_number-active');
  question5.classList.remove('questions__container-questions_number-active');
  question6.classList.remove('questions__container-questions_number-active');
  question7.classList.remove('questions__container-questions_number-active');
}
function showAnswer4(){
  question4.classList.add('questions__container-questions_number-active');
  answer.innerHTML = answersArray[3];
  question1.classList.remove('questions__container-questions_number-active');
  question2.classList.remove('questions__container-questions_number-active');
  question3.classList.remove('questions__container-questions_number-active');
  question5.classList.remove('questions__container-questions_number-active');
  question6.classList.remove('questions__container-questions_number-active');
  question7.classList.remove('questions__container-questions_number-active');
}
function showAnswer5(){
  question5.classList.add('questions__container-questions_number-active');
  answer.innerHTML = answersArray[4];
  question1.classList.remove('questions__container-questions_number-active');
  question2.classList.remove('questions__container-questions_number-active');
  question3.classList.remove('questions__container-questions_number-active');
  question4.classList.remove('questions__container-questions_number-active');
  question6.classList.remove('questions__container-questions_number-active');
  question7.classList.remove('questions__container-questions_number-active');
}
function showAnswer6(){
  question6.classList.add('questions__container-questions_number-active');
  answer.innerHTML = answersArray[5];
  question1.classList.remove('questions__container-questions_number-active');
  question2.classList.remove('questions__container-questions_number-active');
  question3.classList.remove('questions__container-questions_number-active');
  question4.classList.remove('questions__container-questions_number-active');
  question5.classList.remove('questions__container-questions_number-active');
  question7.classList.remove('questions__container-questions_number-active');
}
function showAnswer7(){
  question7.classList.add('questions__container-questions_number-active');
  answer.innerHTML = answersArray[6];
  question1.classList.remove('questions__container-questions_number-active');
  question2.classList.remove('questions__container-questions_number-active');
  question3.classList.remove('questions__container-questions_number-active');
  question4.classList.remove('questions__container-questions_number-active');
  question5.classList.remove('questions__container-questions_number-active');
  question6.classList.remove('questions__container-questions_number-active');
}