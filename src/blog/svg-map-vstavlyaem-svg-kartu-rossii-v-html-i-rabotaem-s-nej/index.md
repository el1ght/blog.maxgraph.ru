---
title: "SVG Map. Вставляем svg-карту России в HTML и работаем с ней"
date: "2019-04-26"
descr: "Привет! В свое время я немало попарился с этой темой, когда нужно было сделать svg-карту. Конечно, я покажу в статье чуть более простой вариант использования, но тем не менее вполне себе рабочий. Кстати, по этой теме я даже записал видео - смотрите выше)"
description: "Делаем интерактивную карту на SVG и JS"
cover: "img/cover.jpg"
cat: JS
video: "https://www.youtube.com/embed/eDwxnJ_u2LE"
sources: "https://github.com/maxdenaro/maxgraph-youtube-source/tree/master/JS-%D1%80%D0%B5%D1%88%D0%B5%D0%BD%D0%B8%D1%8F%20%E2%84%9610.%20%D0%98%D0%BD%D1%82%D0%B5%D1%80%D0%B0%D0%BA%D1%82%D0%B8%D0%B2%D0%BD%D0%B0%D1%8F%20svg%20%D0%BA%D0%B0%D1%80%D1%82%D0%B0%20%D0%BD%D0%B0%20%D1%87%D0%B8%D1%81%D1%82%D0%BE%D0%BC%20JS"
---

SVG Map - довольно часто используемая фича для сайтов. Необязательно это карта страны\\города. Есть еще сайты с использованием svg-дома, где можно выбирать этажи, и т.д. В моем случае это карта России. Посмотреть реальный пример можно тут: <a href="http://work.maxgraph.ru/2018/Rusmet/" target="_blank">Русский металл</a>.

Суть была такая - нужно было сделать целую структуру карт, т.е. при нажатии на какой-то регион перебрасывало дальше в след. регион и так далее. На все это были свои карты, естественно.

В моем же примере мы рассмотрим только карту России, и как из нее сделать ссылки, а так же красивый ховер эффект.

## HTML

``` html
<div class="content">
  <div class="left-menu">
    <ul>
      <li>
        <a href="#sevkav" data-id="1" class="map-tab-link" data-color="#ed9988">
          Северо-Кавказский федеральный округ
        </a>
      </li>
      <li>
        <a href="#ufo" data-id="2" class="map-tab-link" data-color="#ffd17f">
          Южный федеральный округ
        </a>
      </li>
      <li>
        <a href="#center" data-id="3" class="map-tab-link" data-color="#9ed765">
          Центральный федеральный округ
        </a>
      </li>
      <li>
        <a href="#privol" data-id="4" class="map-tab-link" data-color="#00d990">
          Приволжский федеральный округ
        </a>
      </li>
      <li>
        <a href="#sevzap" data-id="5" class="map-tab-link" data-color="#4d94db">
          Северо-Западный федеральный округ
        </a>
      </li>
      <li>
        <a href="#ural" data-id="6" class="map-tab-link" data-color="#5d77c7">
          Уральский федеральный округ
        </a>
      </li>
      <li>
        <a href="#sibir" data-id="7" class="map-tab-link" data-color="#6250b9">
          Сибирский федеральный округ
        </a>
      </li>
      <li>
        <a href="#daln" data-id="8" class="map-tab-link" data-color="#522e9a">
          Дальневосточный федеральный округ
        </a>
      </li>
    </ul>
  </div>
  <div class="map">
  </div>
  <div class="info">
    <h2>Название округа</h2>
    <p>Описание округа</p>
  </div>
```

Пожалуй, не буду вставлять огромную svg-карту сюда, займет немыслимо много места. Посмотрите в примере, а здесь расскажу лишь основное:

У нас имеется левое меню и ссылки в нем. У ссылок есть соответствующий `href` (хотя тут можно обойтись и дата-атрибутом, если Вам надо по ссылке куда-то отправлять человека) и `data-color` — это цвет, который будет при наведении у элементов карты.

У самих ссылок карты те же самые данные. Опять же, можно их сменить на ссылки, а вместо `href` перенести эти данные в `data-href` и изменить скрипт.

Как работать именно с самой картой, когда Вы ее получили и не имеете ссылок — вручную. Чистить, удалять ненужное, искать элементы и заворачивать их в ссылки. Никто не говорил что будет легко :) У меня для Вас как раз есть изначальная версия карты: <a href="/assets/files/map.zip" download>map</a>. Пользуйтесь)

Итак, css здесь довольно прост, но все же тоже покажу

## CSS

``` css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: sans-serif;
}

.content {
  display: flex;
  align-items: center;
  padding: 10px 100px;
}

.left-menu ul {
  list-style-type: none;
  border: 1px solid #bfbfbf;
}

.left-menu li:not(:last-child) {
  border-bottom: 1px solid #bfbfbf;
}

.left-menu a {
  display: block;
  padding: 10px;
  color: #333;
}

a {
  text-decoration: none;
}

.left-menu {
  flex-shrink: 0;
}

.map {
  width: 100%;
  height: 100vh;
}

.map svg {
  display: block;
  width: 100%;
  height: 100%;
  transition: all 0.15s;
}

.map a {
  transition: all 0.15s;
}

.active {
  background-color: #bfbfbf;
  transition: all 0.15s;
}

.info {
  padding: 30px 100px;
  padding-bottom: 50px;
  max-width: 50%;
}

.info h2 {
  margin-bottom: 20px;
}
```

И сама магия — JS.

## JS

``` js
const $leftLinks = document.querySelectorAll('.left-menu a'),
      $mapLinks = document.querySelectorAll('.map a'),
      $info = document.querySelector('.info');

const requestData = (id = 1) => {
  fetch('data.json')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    $info.innerHTML = `
      <h2>${data[id - 1].district}</h2>
      <p>${data[id - 1].info}</p>
    `;
  });
};

requestData();

$leftLinks.forEach(el => {
  el.addEventListener('mouseenter', (e) => {
    let self = e.currentTarget;
    let selfClass = self.getAttribute('href');
    let color = self.dataset.color;
    let currentElement = document.querySelector(`.map a[href="${selfClass}"]`);
    let currentPolygon = currentElement.querySelectorAll('polygon');
    let currentPath = currentElement.querySelectorAll('path');
    if (currentPolygon) currentPolygon.forEach(el => el.style.cssText = `fill: ${color}; stroke-width: 2px;`);
    if (currentPath) currentPath.forEach(el => el.style.cssText = `fill: ${color}; stroke-width: 2px;`);
    self.classList.add('active');
  });

  el.addEventListener('mouseleave', (e) => {
    let self = e.currentTarget;
    let selfClass = self.getAttribute('href');
    let currentElement = document.querySelector(`.map a[href="${selfClass}"]`);
    let currentPolygon = currentElement.querySelectorAll('polygon');
    let currentPath = currentElement.querySelectorAll('path');
    if (currentPolygon) currentPolygon.forEach(el => el.style.cssText = ``);
    if (currentPath) currentPath.forEach(el => el.style.cssText = ``);
    self.classList.remove('active');
  });
});

$mapLinks.forEach(el => {
  el.addEventListener('mouseenter', (e) => {
    let self = e.currentTarget;
    let selfClass = self.getAttribute('href');
    let color = self.dataset.color;
    let currentElement = document.querySelector(`.left-menu a[href="${selfClass}"]`);
    let currentPolygon = self.querySelectorAll('polygon');
    let currentPath = self.querySelectorAll('path');
    if (currentPolygon) currentPolygon.forEach(el => el.style.cssText = `fill: ${color}; stroke-width: 2px;`);
    if (currentPath) currentPath.forEach(el => el.style.cssText = `fill: ${color}; stroke-width: 2px;`);
    currentElement.classList.add('active');
  });

  el.addEventListener('mouseleave', (e) => {
    let self = e.currentTarget;
    let selfClass = self.getAttribute('href');
    let currentElement = document.querySelector(`.left-menu a[href="${selfClass}"]`);
    let currentPolygon = self.querySelectorAll('polygon');
    let currentPath = self.querySelectorAll('path');
    if (currentPolygon) currentPolygon.forEach(el => el.style.cssText = ``);
    if (currentPath) currentPath.forEach(el => el.style.cssText = ``);
    currentElement.classList.remove('active');
  });

  el.addEventListener('click', (e) => {
    e.preventDefault();
    let self = e.currentTarget;
    let selfClass = self.getAttribute('href');
    let currentElement = document.querySelector(`.left-menu a[href="${selfClass}"]`);
    let id = parseInt(currentElement.dataset.id);
    requestData(id);
  });
});
```

На самом деле код донельзя простой. Рассказываю:

Сперва создаем две переменных для элементов карты и элементов меню.

Затем через `mouseenter` делаем наведение. Получаем в переменные нужные значения, `href` и цвет соответственно. `href` нужен, чтобы создать связь между разными DOM-элементами и позволить при наведении на пункт меню подсвечивать карту и наоборот.

Небольшое пояснение по поводу использования метода css и почему он там дважды: К сожалению, так пришлось сделать. На самом деле, я не хотел использовать метод css, но svg элементы не реагируют на `classList.add()`. Пришлось работать так. И да, если Вы думаете, что можно при уводе мышки просто сбросить тег `style` — ie скажет вам ни-ни :)

Ну а так, я по сути нахожу все polygon и path, даю им новую заливку (`fill`) и увеличиваю на пиксель ширину обводки, чтобы смотрелось интереснее. Вот и все)

## Дополнительная реализация

В коде выше вы еще могли заметить какой-то запрос к data.json через `fetch()`. Это дополнительный функционал, который делает рабочим переключение блоков по клику. Логика простая - у нас есть массив округов, по клику просто их переключаем. Подробнее в видео)

Надеюсь, Вам было полезно. Как обычно, если у Вас есть вопросы — прошу в личные сообщения или комментарии. Пока!
