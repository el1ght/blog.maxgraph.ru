---
title: "Установка reCaptcha на свой сайт"
date: "2017-12-20"
descr: "Привет! Сегодня расскажу, как установить капчу версии 3 на свой сайт"
description: "Как установить recaptcha v3 на сайт"
cover: "img/cover.jpg"
cat: PHP
video: "https://www.youtube.com/embed/qyvBFipJAbI"
sources: "https://github.com/maxdenaro/maxgraph-youtube-source/tree/master/PHP-%D1%84%D0%B8%D1%87%D0%B8%20%E2%84%962.%20%D0%A3%D1%81%D1%82%D0%B0%D0%BD%D0%BE%D0%B2%D0%BA%D0%B0%20Recaptcha3%20%D0%BD%D0%B0%20%D1%81%D0%B0%D0%B9%D1%82"
---

## Введение

Собственно, что такое рекапча, и&nbsp;для чего она нужна? Это специальная система, разработанная для защиты веб-сайтов от&nbsp;ботов. Суть системы в&nbsp;следующем&nbsp;&mdash; при отправке каких-либо данных с&nbsp;формы&nbsp;Вы должны поставить галочку (чего бот сделать не&nbsp;в&nbsp;состоянии), иначе и&nbsp;отправить не&nbsp;сможете. Именно это поведение кнопки мы&nbsp;сегодня опишем.

## Создаем рекапчу

Чтобы создать рекапчу, нужно перейти на сайт <a href="https://www.google.com/recaptcha/admin/create" target="_blank">google recaptcha</a>, войти под своим гугл-аккаунтом и сделать следующие действия (детально можете посмотреть в видео):

1. Ввести название капчи в поле _Ярлык_
2. Выбрать версию рекапчи _v3_
3. Ввести свой домен, например _test.site_
4. Согласиться с _условиями использования_
5. Нажать _отправить_

В результате вы получите _ключ сайта_ и _секретный ключ_, которые понадобятся нам позднее.

## Пишем код PHP

Итак, мы сделаем форму в файлике index.php, по клику на "отправить" она будет проверять, бот вы или нет

``` php
<form action="#" method="post">
  <input type="text" name="name" placeholder="Введите имя">
  <input type="email" name="email" placeholder="Введите email">
  <input type="hidden" id="token" name="token">
  <button type="submit" name="post">Отправить</button>
</form>

```

И здесь, помимо обычных полей есть скрытое поле - __token__, которое поможет нам в дальнейшей работе.

Далее идем в официальную <a href="https://developers.google.com/recaptcha/docs/v3" target="_blank">документацию</a> рекапчи и смотрим пример. Нам требуется подключить скрипт, передав туда наш _site-key_.

``` php
<script src="https://www.google.com/recaptcha/api.js?render=ВАШ_КЛЮЧ"></script>
```

Далее нам нужно создать файл send.php, он же обработчик отправки и капчи.

``` php

$captcha;
if(isset($_POST['token'])){
  $captcha=$_POST['token'];
}

$secretKey = "";
$ip = $_SERVER['REMOTE_ADDR'];

// post request to server

$url =  'https://www.google.com/recaptcha/api/siteverify?secret=' . $secretKey .  '&response=' . $_POST['token'];
$response = file_get_contents($url);
$responseKeys = json_decode($response,true);
header('Content-type: application/json');
if($responseKeys["success"] && $responseKeys["score"] >= 0.5) {
  echo json_encode(array('success' => 'true', 'om_score' => $responseKeys["score"], 'token' => $_POST['token']));
} else {
  echo json_encode(array('success' => 'false', 'om_score' => $responseKeys["score"], 'token' => $_POST['token']));
}

```

Код достаточно прост. Мы&nbsp;ищем токен из&nbsp;нашего скрытого инпута, записываем его в&nbsp;переменную `$captcha`. Далее делаем переменную под секретный ключ.

Ну&nbsp;а&nbsp;далее мы&nbsp;просто будет проверять по&nbsp;правилам капчи параметр `om_score`. Если он&nbsp;больше 0.5&nbsp;&mdash; вы&nbsp;не&nbsp;бот. Если менее&nbsp;&mdash; бот.
Более детально смотрите в&nbsp;видео.

Ну и следующий шаг - js-обработчик для формы в файле index.php

## Пишем JS-код

``` js
document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();
  let tk = '';
  grecaptcha.ready(function() {
    grecaptcha.execute('', {action: 'homepage'}).then(function(token) {
      tk = token;
      document.getElementById('token').value = token;
      const data = new URLSearchParams();
      for (const pair of new FormData(document.querySelector('form'))) {
          data.append(pair[0], pair[1]);
      }
      fetch('send.php', {
        method: 'post',
        body: data,
      })
      .then(response => response.json())
      .then(result => {
        if (result['om_score'] >= 0.5) {
          console.log('Человек')
          // отправка данных на почту
        } else {
          console.log('Бот')
        }
      });
    });
  });
});
```

По&nbsp;факту, это обычный fetch-запрос, который улетает на&nbsp;send.php и&nbsp;отдает обратно значение `om_score`, благодаря которому мы&nbsp;можем понять, бот нам пишет или нет. И&nbsp;если не&nbsp;бот&nbsp;&mdash; отправить форму.

Вот собственно и все. Для отправки формы можете использовать отдельный обработчик, тут уже не так важно.

Ну и конечно, исходники кода тоже есть, они ниже. Пользуйтесь!
