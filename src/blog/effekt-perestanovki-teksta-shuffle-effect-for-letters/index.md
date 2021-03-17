---
title: "Эффект «перестановки» текста. Shuffle effect for letters"
date: "2019-05-02"
descr: "Привет! Сегодня shuffle effect для текста"
description: "Делаем эффект перестановки текста на jQuery"
cover: "img/cover.jpg"
cat: JS
---

Нам понадобится плагин _shuffle letters_. Плюс я конечно покажу как сделать этот эффект вечно крутящимся, т.е. чтобы он всегда менял слова. Ссылка на файл: <a href="/assets/files/jquery.shuffleLetters.js.zip" download>jquery.shuffleLetters.js</a>. Конечно, для работы с ним нужен jquery, как видно из его названия)

## HTML

``` html
<ul>
  <li></li>
  <li></li>
  <li></li>
</ul>
```

Разметка в коде простая — просто делаем список. Да-да, с пустыми li.

## CSS

Он здесь неважен, посмотрите в кодпене)

## JS (простой пример)

``` js
let containerLeft = $("ul li:nth-child(1)");
containerLeft.shuffleLetters({
  "text": "Блог"
});
```

## JS (повторения)

``` js
const setShuffle = function(){
  let containerLeft = $("ul li:nth-child(1)");
  let containerCenter = $("ul li:nth-child(2)");
  let containerRight = $("ul li:nth-child(3)");
  let counter = 0;

  function shuffleWords(swich){
    switch (swich) {

      case 0: {
        setTimeout(function(){

          containerLeft.shuffleLetters({
            "text": "Блог"
          });

        },2500);

        setTimeout(function(){

          containerCenter.shuffleLetters({
            "text": "веб-разработчика"
          });

        },3000);

        setTimeout(function(){

          containerRight.shuffleLetters({
            "text": "MaxGraph"
          });

        },3500);

        break;
      }

      case 1: {
        setTimeout(function(){

          containerLeft.shuffleLetters({
            "text": "о"
          });

        },2500);

        setTimeout(function(){

          containerCenter.shuffleLetters({
            "text": "верстке"
          });

        },3000);

        setTimeout(function(){

          containerRight.shuffleLetters({
            "text": "и js"
          });

        },3500);
        break;
      }

    }

    counter++;
  }

  if (counter === 101){
    counter = 0;
  }
  shuffleWords( counter % 2);

  setInterval(function(){
    if (counter === 101){
      counter = 0;
    }
    shuffleWords( counter % 2);

  },6000);
};

setShuffle();
```

Здесь мы заводим переменную `counter`, изначально равную нулю. Она нам будет нужна для переключения «режимов». Затем делаем внутри простой `switch` (если не знаете что это — вам <a href="https://learn.javascript.ru/switch" target="_blank">сюда</a>). где делаем два кейса — при нуле и при единице. Далее внутри кейсов Вы видите `setTimeout`. Это чтобы каждый из символов появлялся когда надо, по очереди.

Ну и собственно внизу мы вызываем функцию `shuffleWords` с параметром `counter % 2`, то есть передаем в функцию остаток от деления. либо 0, либо 1. Это как раз и будут наши значения в `case`.

А чтобы это все повторялось — создаем еще и setInterval, который каждые 6 секунд будет крутить это.

Ну и конечно, пен:

<iframe title="Shuffle letters" src="//codepen.io/MaxGraph/embed/jRjapv/?height=265&amp;theme-id=0&amp;default-tab=css,result" allowfullscreen></iframe>

Надеюсь, что Вам было это полезно) до скорых встреч.
