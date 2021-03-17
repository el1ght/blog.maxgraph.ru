---
title: "Игра Престолов. Верстаем макет по сериалу"
date: "2019-04-24"
descr: "Привет! Сегодня необычный выпуск, который возможно станет новой рубрикой (впоследствии обязательно видео-рубрикой). Мы верстаем макет, посвященный Игре Престолов"
description: "Верстка макета сайта Игры престолов с нуля"
cover: "img/cover.jpg"
cat: HTML/CSS
---

За макет огромное спасибо [Анне](https://www.instagram.com/olanaroza.web.designer/), вышло круто)

Собственно, пишите если эта рубрика будет интересна, в будущем будет на видео (ну и конечно с полным процессом, что понятное дело, интереснее). Сегодня же - код)

Обращаю внимание - я использую спец. сборку и верстаю так, как верстал бы реальный макет, со всеми технологиями. Так что можете смотреть)

## PUG

``` pug
.first__screen
  include header
  .container
    .first__screen-heading
      img(src="/images/main-logo.png" alt="")
    .first__screen-date
      | 14 April 2019
    .first__screen-buttons
      a.first__screen-tickets(href="#")
        | Get Ticket
      a.first__screen-play(href="#")
        | watch trailer
    .first__screen-descr
      | John Snow, Sansa and Arya walk along the Starck crypt. Along the walls are statues of various characters
      | in the series. When heroes pass by them, phrases
      | are heard, somehow related to the past.
    .first__screen-arrow
      +svg("arrow")
```

Комментировать тут конечно особо нечего - это код первого экрана на **pug**. Вообще макет я разделил на три компонента - `first-screen`, `header` и `social`.

## SCSS

``` scss
.first__screen {
  position: relative;
  padding-top: vw(170);
  height: vw(1080);
  background-image: url("../images/bg.jpg");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;

  &-heading {
    margin: 0 auto;
    width: vw(1589);
    height: vw(214);

    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }

  &-date {
    margin-top: vw(88);
    width: 100%;
    font-family: $font-family-reg;
    font-size: vw(30);
    color: $color-white;
  }

  &-buttons {
    display: flex;
    align-items: center;
    margin-top: vw(57);
    width: 100%;
  }

  &-tickets {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid $color-white;
    width: vw(300);
    height: vw(60);
    font-family: $font-family-reg;
    font-size: vw(20);
    text-transform: uppercase;
    color: $color-white;
    transition: all 0.15s;

    &:hover {
      color: $color-black;
      background-color: $color-white;
      transition: all 0.15s;
    }
  }

  &-play {
    display: inline-block;
    margin-left: vw(54);
    padding: vw(5) vw(46);
    padding-right: 0;
    font-family: $font-family-reg;
    font-size: vw(20);
    text-transform: uppercase;
    color: $color-white;
    background-image: url("../images/play.png");
    background-position: left center;
    background-size: vw(26) vw(26);
    background-repeat: no-repeat;
  }

  &-descr {
    margin-top: vw(140);
    max-width: vw(320);
    font-family: $font-family-reg;
    font-size: vw(13);
    line-height: vw(30);
    color: $color-white;
  }

  &-arrow {
    margin-top: vw(60);
    width: 100%;

    svg {
      display: block;
      width: vw(81);
      height: vw(10);
    }
  }
}
```

Здесь код, написанный на __scss__. В принципе, ничего серьезного. Дальше интереснее:)

``` js
import vars from '../vars';

if (vars.$window.width() >= 1025) {
  function showMain() {
    return new Promise((resolve) => {
      new TimelineMax({
        onStart() {
          window.scrollTo(0, 0);
          vars.$siteContainer.removeClass('is-outer');
        },
        onComplete: resolve,
      })
        .from(vars.$siteContainer, 0.7, {
          autoAlpha: 0,
          clearProps: 'all',
        })
        .from(vars.$header, 0.5, {
          autoAlpha: 0,
          y: -50,
          clearProps: 'all',
        })
        .from(vars.$heading, 0.5, {
          autoAlpha: 0,
          y: 50,
          clearProps: 'all',
        })
        .from(vars.$date, 0.5, {
          autoAlpha: 0,
          x: -50,
          clearProps: 'all',
        })
        .from(vars.$buttons, 0.5, {
          autoAlpha: 0,
          x: -50,
          clearProps: 'all',
        })
        .from(vars.$descr, 0.5, {
          autoAlpha: 0,
          x: -50,
          clearProps: 'all',
        })
        .from(vars.$arrow, 0.5, {
          autoAlpha: 0,
          x: -50,
          clearProps: 'all',
        });
    });
  }

  showMain();
}
```
Вот тут самое интересное. По факту, js на странице нет, зато есть стартовая анимация. И мы здесь используем <a href="https://greensock.com/gsap/" target="_blank">gsap</a>. Создаем функцию `showMain` и с помощью `TweenMax` делаем последовательные анимации.

## Ссылки

Не стал это заливать на codepen, зато залил на:

Свой хостинг: <a href="http://got.maxgraph.ru/" target="_blank">http://got.maxgraph.ru/</a>

Github: <a href="https://github.com/maxdenaro/gameofthrones-concept" target="_blank">https://github.com/maxdenaro/gameofthrones-concept</a>

Понимаю, что в текстовом формате не так интересно, но этот пост еще и служит как вопрос - а нужна ли такая рубрика? Просто берем какие-то макеты (на тематику фильмов, сериалов, комиксов, игр) и верстаем. Конечно, на видео.


Привет из 2021 - на моем ютуб канале начали выходить видео по тематике GreenSock. Если интересно - <a href="https://youtu.be/YSCHpnDdOrA?list=PLCMvV-acWe2BfJqeyGPOXvyoPScpANeLx" target="_blank">смотрите</a>.


Пишите свои отзывы)
