---
title: "Прибавка дней к дате на сайт"
date: "2018-09-12"
descr: "Привет! сегодня совсем короткая, но, возможно кому-то полезная, статья. Часто ли Вас заказчик просил о том, чтоб сделать скрипт для даты акции?
Если еще не поняли из заголовка - поясню. Передо мной стояла задача - сделать текст вида: 'Акция будет действовать до 15 сентября!'. Соответственно, здесь 15 сентября не просто текст, а скрипт, прибавляющий к текущей дате определенное кол-во дней. Как такое сделать - разбираем)"
description: "Рассказываю, как легко сделать таймер отсчета до даты"
cover: "img/cover.jpg"
cat: JS
---

## HTML

``` html
<div class="day"></div>
<div class="month"></div>
```

Обычные дивы, куда мы будем записывать значение.

## JS

``` js
const day = document.querySelector('.date');
const month = document.querySelector('.month');
let d = new Date();

d.setDate(d.getDate() + 1);
day.textContent = d.getDate();

let month = 2;
let arr = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'ноября',
  'декабря',
];
month.textContent = arr[month + 1];
```

Собственно говоря, в переменную `d` загоняем текущий день и выводим его в любой див с классом `date`. Затем создаем массив месяцев в родительном падеже и работаем с ними. `d.getDate() + 1`, где 1 - число дней, на которые увеличиваем текущую дату. Все довольно просто и универсально. Пользуйтесь)