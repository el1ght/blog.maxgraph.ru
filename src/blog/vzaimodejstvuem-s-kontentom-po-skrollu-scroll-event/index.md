---
title: "Взаимодействуем с контентом по скроллу (scroll event)"
date: "2019-05-16"
descr: "Привет! Сегодня интересная темка. Расскажу, как сделать какие-либо действия для блоков по скроллу. Для примера просто взял цвет и по скроллу будем задавать цвет (когда блок начнет появляться в зоне видимости). Поехали!"
description: "Изменяем страницу по скроллу"
cover: "img/cover.jpg"
cat: JS
---

Итак, как&nbsp;же управлять скроллом? Да&nbsp;на&nbsp;самом деле все лежит в&nbsp;банальных математических вычислениях высоты (ширины). Разберемся детальнее:

## HTML

``` html
<div class="item" data-color="#CD5C5C"></div>
<div class="item" data-color="#98FB98"></div>
<div class="item" data-color="#FF1493"></div>
<div class="item" data-color="#FFFF00"></div>
<div class="item" data-color="#00CED1"></div>
<div class="item" data-color="#8A2BE2"></div>
<div class="item" data-color="#191970"></div>
<div class="item" data-color="#778899"></div>
<div class="item" data-color="#FFD700"></div>
<div class="item" data-color="#000000"></div>
```

Имеем 10&nbsp;блоков с&nbsp;классом `item` и `data-color`. Этот дата-атрибут нужен, чтобы задать нужный цвет блоку.

## CSS

``` css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: sans-serif;
}

body {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 100px;
}

.item {
  width: 500px;
  height: 500px;
  border: 1px solid #000;
  border-radius: 4px;
  margin-bottom: 100px;
  transition: all 0.3s ease-in-out;
}
```

Просто расставляем блоки по&nbsp;центру и&nbsp;даем им&nbsp;отступы. А&nbsp;так&nbsp;же даем бордер, чтобы их&nbsp;вообще было видно изначально.

## JS

``` js
let $item = $('.item');
let $window = $(window);

function viewedItem() {
  let scrollTop = $window.scrollTop();

  let scrollBottom = scrollTop + $window.height();

  $item.each((index, item) => {
    let $currentItem = $(item);

    let itemOffsetTop = $currentItem.offset().top;

    let itemOffsetBottom = itemOffsetTop + $currentItem.height();

    if (scrollTop < itemOffsetBottom && scrollBottom > itemOffsetTop && !$currentItem.attr('data-viewed')) {
      let color = $currentItem.attr('data-color');
      $currentItem.css('background-color', color);
      $currentItem.attr('data-viewed', true);
    }
  });
}

viewedItem();

$(window).scroll(() => {
  viewedItem();
});
```

Магия здесь! Поехали разбираться)

1. Создаем функцию `viewedItem`. Сразу получаем текущий скролл от&nbsp;начала документа в&nbsp;переменную `scrollTop`. И&nbsp;после этого получаем так&nbsp;же определение `scrollBottom`, сложив наш скролл и&nbsp;высоту окна браузера. Таким образом мы&nbsp;сможем ловить события не&nbsp;когда начало экрана туда попало, а&nbsp;еще и&nbsp;когда конец. Но&nbsp;об&nbsp;этом дальше.
2. Пробегаемся по&nbsp;всем нашим блокам с&nbsp;помощью `each`. Получаем в&nbsp;переменную `$currentItem` текущий блок и&nbsp;тут&nbsp;же рассчитываем для него расстояние от&nbsp;начала документа и&nbsp;расстояние + высоту. (_стоит сделать ремарку&nbsp;&mdash; для статичных блоков мы&nbsp;высчитываем это значение один раз, оно сохраняется и&nbsp;все. А&nbsp;вот переменная `scrollTop` постоянно меняется, т.к.&nbsp;мы&nbsp;использовали там `scrollTop`, а&nbsp;не `offset().top`_).
3. А&nbsp;дальше&nbsp;&mdash; простые сравнения. Смотрим, чтобы расстояние скролла окна было всегда меньше чем расстояние + высота блока, а&nbsp;так&nbsp;же расстояние + высота окна были больше чем расстояние блока от&nbsp;начала. Таким образом, как только блок попадает в&nbsp;поле видимости&nbsp;&mdash; с&nbsp;ним что-то происходит.
4. И&nbsp;да, там есть еще одно условие&nbsp;&mdash; проверяется `data-viewed` у&nbsp;блока. Напомню, что изначально его нет у&nbsp;блоков. По&nbsp;сути, это просто дата-атрибут&nbsp;&mdash; флаг, который позволяет скрипту понять, что над этим блоком уже действия произвелись, значит его трогать уже не&nbsp;надо.
5. Ну&nbsp;и&nbsp;в&nbsp;самом условии просто берем у&nbsp;текущего элемента его `data-color` и&nbsp;даем `background-color: текущий цвет`.
6. Вызываем функцию один раз чтобы при загрузке страницы уже сработало один раз наше действие. А&nbsp;затем вызываем ее&nbsp;на&nbsp;скролл, чтобы на&nbsp;каждый скролл проверялось наше условие. Вот и&nbsp;все)

И&nbsp;конечно, пен:

<iframe title="Scroll items events" src="//codepen.io/MaxGraph/embed/WBGqPd/?height=265&theme-id=0&default-tab=css,result" allowfullscreen></iframe>
