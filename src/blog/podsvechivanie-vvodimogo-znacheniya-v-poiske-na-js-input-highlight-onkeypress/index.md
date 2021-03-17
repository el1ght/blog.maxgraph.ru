---
title: "Подсвечивание вводимого значения в поиске на js (input highlight onkeypress)"
date: "2019-04-19"
descr: ""
description: "Делаем подсвечивание вводимого значения через js-плагин"
cover: "img/cover.jpg"
cat: JS
---

Чтобы сделать подсвечивание вводимого значения в поиске - нужно сперва подключить Jquery и специальный скрипт - <a href="/assets/files/jcfilter.zip" download>jcfilter.js</a>. Как всегда, в конце статьи будет пен :)

## HTML

``` html
<div class="search">
  <input type="search" id="search" placeholder="Поиск по каталогу">
  <div class="search-result">
    <div class="jcorgFilterTextParent">
      <h3 class="name">Разделы каталога</h3>
      <div class="search-cont">
        <ul>
          <li><a href="#" class="jcorgFilterTextChild">Промышленные частотные преобразователи</a></li>
          <li><a href="#" class="jcorgFilterTextChild">Частотные преобразователи для насосов</a></li>
          <li><a href="#" class="jcorgFilterTextChild">Векторные частотные преобразователи</a></li>
          <li><a href="#" class="jcorgFilterTextChild">Частотные преобразователи Овен</a></li>
          <li><a href="#" class="jcorgFilterTextChild">Частотные преобразователи переменного тока</a></li>
          <li><a href="#" class="jcorgFilterTextChild">Частотные преобразователи 24 А</a></li>
          <li><a href="#" class="jcorgFilterTextChild">Частотные преобразователи 7,5 Квт</a></li>
        </ul>
      </div>
    </div>
    <div class="jcorgFilterTextParent">
      <h3 class="name">Товары</h3>
      <div class="search-cont">
        <ul>
          <li><a href="#" class="jcorgFilterTextChild">Промышленные частотные преобразователи</a></li>
          <li><a href="#" class="jcorgFilterTextChild">Частотные преобразователи для насосов</a></li>
          <li><a href="#" class="jcorgFilterTextChild">Векторные частотные преобразователи</a></li>
          <li><a href="#" class="jcorgFilterTextChild">Частотные преобразователи Овен</a></li>
          <li><a href="#" class="jcorgFilterTextChild">Частотные преобразователи переменного тока</a></li>
          <li><a href="#" class="jcorgFilterTextChild">Частотные преобразователи 24 А</a></li>
          <li><a href="#" class="jcorgFilterTextChild">Частотные преобразователи 7,5 Квт</a></li>
        </ul>
      </div>
    </div>
  </div>
</div>
```

Простая разметка, но в ней есть определенные мелочи — это специальные классы для работы скрипта — `jcorgFilterTextParent` и `jcorgFilterTextChild`. Они как раз и определяют подсветку.

## CSS

Все будет в пене. В целом здесь не очень важен css.

## JS

``` js
$('.search input').jcOnPageFilter({
  highlightColor: "yellow",
  textColorForHighlights: "#333333",
  hideNegatives: false,
});
```

По факту тут просто вызываем плагин и даем ему свои настройки. Сами настройки ниже:

## Настройки

1. animateHideNShow: true|false - можно скрывать контейнеры, которые не попадают под вводимое.
2. focusOnLoad: true|false - фокусирование на поле поиска при загрузке.
3. highlightColor - цвет подсветки текста (можно вводить hex и rgb).
4. textColorForHighlights - цвет самого текста.
5. parentLookupClass - класс родителя (по умолчанию `jcorgFilterTextParent`).
6. childBlockClass - класс потомка (по умолчанию `jcorgFilterTextChild`).
7. hideNegatives: true|false - скрывать родителей, у которых не совпадает текст, или нет.

## Пен

<iframe title="Input highlight" src="//codepen.io/MaxGraph/embed/zXEYdJ/?height=265&amp;theme-id=0&amp;default-tab=css,result" allowfullscreen></iframe>

Надеюсь, Вам помогла данная статья. Успехов в использовании!
