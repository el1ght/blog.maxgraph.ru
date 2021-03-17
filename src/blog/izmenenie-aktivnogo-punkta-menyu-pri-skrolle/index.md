---
title: "Изменение активного пункта меню при скролле"
date: "2018-01-23"
descr: "Привет! В этой статье расскажу, как можно своими руками написать скрипт, который будет давать активному меню элемента класс"
description: "КИзменение активного пункта меню при скролле на чистом JS"
cover: "img/cover.jpg"
cat: JS
sources: "https://github.com/maxdenaro/maxgraph-youtube-source/tree/master/JS-%D1%80%D0%B5%D1%88%D0%B5%D0%BD%D0%B8%D1%8F%20%E2%84%965.%20%D0%90%D0%BA%D1%82%D0%B8%D0%B2%D0%BD%D1%8B%D0%B9%20%D0%BA%D0%BB%D0%B0%D1%81%D1%81%20%D0%B2%20%D0%BC%D0%B5%D0%BD%D1%8E%20%D0%BF%D1%80%D0%B8%20%D1%81%D0%BA%D1%80%D0%BE%D0%BB%D0%BB%D0%B5"
video: "https://www.youtube.com/embed/PV7gQVoqc9A"
---

Итак, давайте разбираться. Напишем простейший html.

## HTML

``` html
<nav class="nav">
  <ul>
    <li><a href="#" class="active">One</a></li>
    <li><a href="#">Two</a></li>
    <li><a href="#">Three</a></li>
    <li><a href="#">Four</a></li>
    <li><a href="#">Five</a></li>
  </ul>
</nav>

<section class="section"></section>
<section class="section"></section>
<section class="section"></section>
<section class="section"></section>
<section class="section"></section>
<script src="script.js"></script>
```

Просто секции и сопоставимые с ним элементы навигации - ссылки.

## CSS

``` css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.nav {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  background-color: #131313;
  padding: 20px;
}

ul {
  display: flex;
  list-style-type: none;
}

a {
  text-decoration: none;
  color: #fff;
  font-family: sans-serif;
  display: inline-block;
  margin-right: 25px;
}

a.active {
  color: red;
}

.section {
  height: 100vh;
  border: 1px solid #000;
}
```

Немного CSS, чтоб было не скучно, а также чтоб создать класс `active` и задать секциям размеры.

## JS

``` js
window.addEventListener('scroll', () => {
  let scrollDistance = window.scrollY;

  if (window.innerWidth > 768) {
    document.querySelectorAll('.section').forEach((el, i) => {
      if (el.offsetTop - document.querySelector('.nav').clientHeight <= scrollDistance) {
        document.querySelectorAll('.nav a').forEach((el) => {
          if (el.classList.contains('active')) {
            el.classList.remove('active');
          }
        });

        document.querySelectorAll('.nav li')[i].querySelector('a').classList.add('active');
      }
    });
  }
});
```

Ну&nbsp;и&nbsp;относительно несложный JS:

1. Проходим по&nbsp;всем секциям на&nbsp;сайте
2. Смотрим, если отступ сверху у&nbsp;секции меньше или равен показателю скролла&nbsp;&mdash; тогда пробегаемся по&nbsp;ссылкам и&nbsp;нужной ссылке (через index) задаем класс

В&nbsp;общем-то и&nbsp;все, очень простой код. Надеюсь, поможет вам. Исходники внизу, а&nbsp;видео&nbsp;&mdash; в&nbsp;начале поста)

Удачи!
