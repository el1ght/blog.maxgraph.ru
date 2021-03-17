---
title: "Как вывести данные из формы в word?"
date: "2018-01-03"
descr: "Привет! Сегодня расскажу, как можно выводить данные из формы прямо в документ docx. Ну и если вам удобно видео - посмотрите его выше)"
description: "Как вывести данные из формы в word? Рассказываю в статье"
cover: "img/cover.jpg"
cat: PHP
video: "https://www.youtube.com/embed/lO56E5bCHkE"
sources: "https://github.com/maxdenaro/maxgraph-youtube-source/tree/master/PHP-%D1%84%D0%B8%D1%87%D0%B8%20%E2%84%961.%20%D0%92%D1%8B%D0%B2%D0%BE%D0%B4%20%D0%B4%D0%B0%D0%BD%D0%BD%D1%8B%D1%85%20%D0%B8%D0%B7%20%D1%84%D0%BE%D1%80%D0%BC%D1%8B%20%D0%B2%20Word"
---

## Начало

Давайте начинать. Первое, что нам нужно будет сделать&nbsp;&mdash; это настройка локального сервера Open Server (или аналоги). Ну&nbsp;либо вы&nbsp;можете сразу на&nbsp;хостинг выполнять данные действия, тут уж&nbsp;как удобно.

Создаем в&nbsp;папке _domains_ папку проекта, убеждаемся что версия PHP 7.1 или выше, и&nbsp;все будет хорошо.

Создаем в&nbsp;папке два файла&nbsp;&mdash; index.html, word.php и&nbsp;добавляем файлик-шаблон в&nbsp;формате docx (его можно найти по&nbsp;ссылке на&nbsp;гитхаб внизу поста).

## Устанавливаем библиотеку

Мы&nbsp;будем использовать библиотеку <a href="https://github.com/PHPOffice/PHPWord" target="_blank">PHPWord</a> для нашей реализации. Скачать ее&nbsp;просто кнопкой download нельзя, нужно будет ставить специальную утилиту <a href="https://getcomposer.org/" target="_blank">composer</a>. По&nbsp;факту, это тоже самое что npm, но&nbsp;только для PHP.

При установке _composer_ вас попросят выбрать специальный файлик php, который соответствует выбранной версии языка. Идем в _OSPanel/modules/php/ваша_версия_ и&nbsp;находим там файлик php.exe, его и&nbsp;выбираем.

Ну&nbsp;и&nbsp;после установки _composer_ вы&nbsp;можете использовать консоль OSPanel для установки этой утилиты. Все происходит также, как при npm&nbsp;&mdash; `composer require phpoffice/phpword`. Не&nbsp;забудьте через консоль перейти в&nbsp;нужную папку.

Более детально и&nbsp;наглядно процесс установки показан на&nbsp;видео в&nbsp;начале поста.

## Пишем HTML

``` html
<form action="word.php" method="POST" enctype="multipart/form-data">
  <input type="date" name="birth">
  <input type="text" name="name" placeholder="Введите ФИО">
  <input type="tel" name="tel" placeholder="Введите телефон" required>
  <input type="text" name="city" placeholder="Введите город">
  <input type="text" name="purpose" placeholder="Введите цель">
  <input type="number" name="startYear" placeholder="Введите начальный год обучения">
  <input type="number" name="lastYear" placeholder="Введите конечный год обучения">
  <input type="text" name="university" placeholder="Введите университет">
  <input type="file" name="file">
  <textarea name="about" id="" cols="30" rows="10" placeholder="О себе"></textarea>
  <button type="submit">Отправить</button>
</form>
```

Просто форма, у которой несколько полей, у каждого есть name, который и свяжет нашу разметку и php-код.

## Настройка шаблона

Этот процесс лучше посмотреть на видео, чем описать словами.

## PHP-обработчик

``` php
require_once 'vendor/autoload.php';

$document = new \PhpOffice\PhpWord\TemplateProcessor('./review.docx');

$uploadDir =  __DIR__;
$outputFile = 'review_full.docx';

$uploadFile = $uploadDir . '\\' . basename($_FILES['file']['name']);
move_uploaded_file($_FILES['file']['tmp_name'], $uploadFile);

$birthdate = $_POST['birth'];
$name = $_POST['name'];
$tel = $_POST['tel'];
$city = $_POST['city'];
$purpose = $_POST['purpose'];
$startYear = $_POST['startYear'];
$lastYear = $_POST['lastYear'];
$university = $_POST['university'];
$file = $_POST['file'];
$about = $_POST['about'];

$document->setValue('name', $name);
$document->setValue('birthdate', $birth);
$document->setValue('tel', $tel);
$document->setValue('city', $city);
$document->setValue('purpose', $purpose);
$document->setValue('startYear', $startYear);
$document->setValue('lastYear', $lastYear);
$document->setValue('university', $university);
$document->setValue('about', $about);
$document->setImageValue('image', array('path' => $uploadFile, 'width' => 120, 'height' => 120, 'ratio' => false));

$document->saveAs($outputFile);


// Имя скачиваемого файла
$downloadFile = $outputFile;

// Контент-тип означающий скачивание
header("Content-Type: application/octet-stream");

// Размер в байтах
header("Accept-Ranges: bytes");

// Размер файла
header("Content-Length: ".filesize($downloadFile));

// Расположение скачиваемого файла
header("Content-Disposition: attachment; filename=".$downloadFile);

// Прочитать файл
readfile($downloadFile);


unlink($uploadFile);
unlink($outputFile);
```

Может показаться, что кода много, но&nbsp;по&nbsp;сути он&nbsp;очень простой.

1. Сперва мы&nbsp;используем `TemplateProcessor`, чтобы начать работу с&nbsp;шаблоном
2. Затем создаем переменные, в&nbsp;которых получаем данные из&nbsp;супермассива `$_POST` - то&nbsp;есть как раз наши данные формы
3. Далее, с&nbsp;помощью метода `setValue` сопоставляем наши переменные и&nbsp;данные из&nbsp;шаблона. То&nbsp;есть мы&nbsp;просто используем шаблон и&nbsp;в&nbsp;него подставляем данные
4. Следующий шаг&nbsp;&mdash; сохранить все через команду `saveAs`.
5. А&nbsp;далее&nbsp;&mdash; скачивание файла через `readfile` и&nbsp;удаление его&nbsp;же через `unlink`.

Надеюсь, вам поможет эта статья. Если&nbsp;же нет&nbsp;&mdash; посмотрите видео, все&nbsp;же видео-формат более нагляден.

Удачи!
