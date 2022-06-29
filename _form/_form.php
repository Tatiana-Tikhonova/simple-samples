<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="_form.css">
</head>

<body>
    <!-- start -->
    <form id="send-file-form" class="form" name="Заявка" action="mailer.php" method="POST" enctype="multipart/form-data">
        <!-- имя -->
        <input class="form__input" type="text" name="name" autocomplete="off" placeholder="Имя*" aria-required="true">
        <!-- полю email задаем type="text" чтобы браузеры не вмешивались в валидацию со своими сообщениями -->
        <input class="form__input" type="text" name="email" autocomplete="off" placeholder="Почта*" aria-required="true">
        <!-- телефон -->
        <input class="form__input" type="tel" name="phone" autocomplete="off" placeholder="Телефон*" aria-required="true">
        <!-- число -->
        <input class="form__input" type="number" name="number" min="1" max="10" step="1" value="1">
        <textarea class="form__textarea" name="message" autocomplete="off" maxlength="500" placeholder="Сообщение"></textarea>
        <!-- отправка файлов (multiple значит несколько) -->
        <div class="form__file">
            <label for="files">
                <input id="files" form="send-file-form" type="file" name="files" multiple accept="image/jpg,image/jpeg,image/png,image/svg">
                <span class="form__filebutton">Загрузить файл</span>
                <span class="form__filename">Файл не выбран</span>
            </label>
        </div>
        <fieldset>
            <legend>Выберите вариант</legend>
            <!-- если радиокнопок или чекбоксов несколько (группа) то нельзя давать им атрибут aria-required="true"
            это сделает одну из них или каждую из них обязательной -->
            <input id="radio-1" class="form__radio" type="radio" name="radio" value="radio-1" checked>
            <label for="radio-1" class="form__label">
                <span class="form__label-radio">
                    <svg viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="5" cy="5" r="5" />
                    </svg>
                </span>
                <span class="form__label-text">radio-1</span>
            </label>
            <input id="radio-2" class="form__radio" type="radio" name="radio" value="radio-2">
            <label for="radio-2" class="form__label">
                <span class="form__label-radio">
                    <svg viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="5" cy="5" r="5" />
                    </svg>
                </span>
                <span class="form__label-text">radio-2</span>
            </label>
        </fieldset>
        <fieldset>
            <legend>Выберите варианты</legend>
            <input id="check-1" class="form__checkbox" type="checkbox" name="check" value="check-1" checked>
            <label for="check-1" class="form__label">
                <span class="form__label-check">
                    <svg viewBox="0 0 9 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.97016 0.969986C7.11103 0.835875 7.29848 0.761733 7.49298 0.763205C7.68747 0.764677 7.87378 0.841647 8.0126 0.977874C8.15143 1.1141 8.2319 1.29893 8.23704 1.49336C8.24218 1.68779 8.17159 1.87661 8.04016 2.01999L4.05016 7.00999C3.98155 7.08389 3.89874 7.14319 3.80669 7.18435C3.71464 7.22552 3.61523 7.2477 3.51441 7.24956C3.41359 7.25143 3.31343 7.23295 3.21991 7.19522C3.1264 7.15749 3.04146 7.10129 2.97016 7.02999L0.324158 4.38399C0.250471 4.31532 0.191369 4.23252 0.150377 4.14052C0.109385 4.04853 0.0873427 3.94921 0.0855659 3.84851C0.0837892 3.74781 0.102314 3.64778 0.140035 3.55439C0.177756 3.461 0.233901 3.37617 0.305119 3.30495C0.376338 3.23373 0.461172 3.17758 0.55456 3.13986C0.647948 3.10214 0.747978 3.08362 0.84868 3.08539C0.949383 3.08717 1.0487 3.10921 1.1407 3.15021C1.2327 3.1912 1.3155 3.2503 1.38416 3.32399L3.47816 5.41699L6.95116 0.991987C6.95741 0.984288 6.96409 0.976943 6.97116 0.969986H6.97016Z" />
                    </svg>
                </span>
                <span class="form__label-text">check-1</span>
            </label>
            <input id="check-1" class="form__checkbox" type="checkbox" name="check" value="check-2">
            <label for="check-2" class="form__label">
                <span class="form__label-check">
                    <svg viewBox="0 0 9 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.97016 0.969986C7.11103 0.835875 7.29848 0.761733 7.49298 0.763205C7.68747 0.764677 7.87378 0.841647 8.0126 0.977874C8.15143 1.1141 8.2319 1.29893 8.23704 1.49336C8.24218 1.68779 8.17159 1.87661 8.04016 2.01999L4.05016 7.00999C3.98155 7.08389 3.89874 7.14319 3.80669 7.18435C3.71464 7.22552 3.61523 7.2477 3.51441 7.24956C3.41359 7.25143 3.31343 7.23295 3.21991 7.19522C3.1264 7.15749 3.04146 7.10129 2.97016 7.02999L0.324158 4.38399C0.250471 4.31532 0.191369 4.23252 0.150377 4.14052C0.109385 4.04853 0.0873427 3.94921 0.0855659 3.84851C0.0837892 3.74781 0.102314 3.64778 0.140035 3.55439C0.177756 3.461 0.233901 3.37617 0.305119 3.30495C0.376338 3.23373 0.461172 3.17758 0.55456 3.13986C0.647948 3.10214 0.747978 3.08362 0.84868 3.08539C0.949383 3.08717 1.0487 3.10921 1.1407 3.15021C1.2327 3.1912 1.3155 3.2503 1.38416 3.32399L3.47816 5.41699L6.95116 0.991987C6.95741 0.984288 6.96409 0.976943 6.97116 0.969986H6.97016Z" />
                    </svg>
                </span>
                <span class="form__label-text">check-2</span>
            </label>
        </fieldset>
        <!-- согласие -->
        <input id="agreement" class="form__checkbox agreement__input" type="checkbox" name="agreement" checked aria-required="true">
        <label for="agreement" class="form__label agreement">
            <span class="form__label-check agreement__check">
                <svg viewBox="0 0 9 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.97016 0.969986C7.11103 0.835875 7.29848 0.761733 7.49298 0.763205C7.68747 0.764677 7.87378 0.841647 8.0126 0.977874C8.15143 1.1141 8.2319 1.29893 8.23704 1.49336C8.24218 1.68779 8.17159 1.87661 8.04016 2.01999L4.05016 7.00999C3.98155 7.08389 3.89874 7.14319 3.80669 7.18435C3.71464 7.22552 3.61523 7.2477 3.51441 7.24956C3.41359 7.25143 3.31343 7.23295 3.21991 7.19522C3.1264 7.15749 3.04146 7.10129 2.97016 7.02999L0.324158 4.38399C0.250471 4.31532 0.191369 4.23252 0.150377 4.14052C0.109385 4.04853 0.0873427 3.94921 0.0855659 3.84851C0.0837892 3.74781 0.102314 3.64778 0.140035 3.55439C0.177756 3.461 0.233901 3.37617 0.305119 3.30495C0.376338 3.23373 0.461172 3.17758 0.55456 3.13986C0.647948 3.10214 0.747978 3.08362 0.84868 3.08539C0.949383 3.08717 1.0487 3.10921 1.1407 3.15021C1.2327 3.1912 1.3155 3.2503 1.38416 3.32399L3.47816 5.41699L6.95116 0.991987C6.95741 0.984288 6.96409 0.976943 6.97116 0.969986H6.97016Z" />
                </svg>
            </span>
            <span class="form__label-text agreement__text">
                Нажимая кнопку «Отправить», я даю согласие на <a href="/confidential" target="_blank">
                    обработку персональных данных</a>, в соответствии с Федеральным законом от 27.07.2006 года №152-ФЗ
                «О персональных данных»
            </span>
            <span class="clearfloat"></span>
        </label>
        <div class="form__btns">
            <input class="form__btn form__btn_submit button" type="submit" value="Отправить">
            <input class="form__btn form__btn_reset button" type="reset" value="Очистить">
        </div>
    </form>
    <!-- end -->
    <div style="margin: 50px;"></div>
    <!-- inputs -->
    <div class="form">
        <!-- пароль -->
        <input class="form__input" type="password" name="password" minlength="8" placeholder="Пароль" aria-required="true">
        <!-- IE 11 и Opera Mini не понимают -->
        <!-- колорпикер -->
        <input class="form__colorpicker" type="color" name="color" value="#ffffff">
        <!-- Firefox, Safari, Safari on iOS поддерживают частично -->
        <!-- выбор даты -->
        <input class="form__input" type="date" name="date">
        <!-- ползунок -->
        <input class="form__range" type="range" name="range" min="1" max="10" step="1" value="1">
        <!-- ползунок с метками - Firefox не поддерживает метки -->
        <input class="form__range" type="range" list="tickmarks">
        <datalist id="tickmarks">
            <option value="0">
            <option value="10">
            <option value="20">
            <option value="30">
            <option value="40">
            <option value="50">
            <option value="60">
            <option value="70">
            <option value="80">
            <option value="90">
            <option value="100">
        </datalist>
        <!-- чекбоксы -->
        <fieldset>
            <legend>Выберите варианты</legend>
            <label class="form__label">
                <input class="form__checkbox" type="checkbox" name="check" value="check-1" checked>
                <span class="form__label-check">
                    <svg viewBox="0 0 9 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.97016 0.969986C7.11103 0.835875 7.29848 0.761733 7.49298 0.763205C7.68747 0.764677 7.87378 0.841647 8.0126 0.977874C8.15143 1.1141 8.2319 1.29893 8.23704 1.49336C8.24218 1.68779 8.17159 1.87661 8.04016 2.01999L4.05016 7.00999C3.98155 7.08389 3.89874 7.14319 3.80669 7.18435C3.71464 7.22552 3.61523 7.2477 3.51441 7.24956C3.41359 7.25143 3.31343 7.23295 3.21991 7.19522C3.1264 7.15749 3.04146 7.10129 2.97016 7.02999L0.324158 4.38399C0.250471 4.31532 0.191369 4.23252 0.150377 4.14052C0.109385 4.04853 0.0873427 3.94921 0.0855659 3.84851C0.0837892 3.74781 0.102314 3.64778 0.140035 3.55439C0.177756 3.461 0.233901 3.37617 0.305119 3.30495C0.376338 3.23373 0.461172 3.17758 0.55456 3.13986C0.647948 3.10214 0.747978 3.08362 0.84868 3.08539C0.949383 3.08717 1.0487 3.10921 1.1407 3.15021C1.2327 3.1912 1.3155 3.2503 1.38416 3.32399L3.47816 5.41699L6.95116 0.991987C6.95741 0.984288 6.96409 0.976943 6.97116 0.969986H6.97016Z" />
                    </svg>
                </span>
                <span class="form__label-text">check-1</span>
            </label>
            <label class="form__label">
                <input class="form__checkbox" type="checkbox" name="check" value="check-2" checked>
                <span class="form__label-check">
                    <svg viewBox="0 0 9 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.97016 0.969986C7.11103 0.835875 7.29848 0.761733 7.49298 0.763205C7.68747 0.764677 7.87378 0.841647 8.0126 0.977874C8.15143 1.1141 8.2319 1.29893 8.23704 1.49336C8.24218 1.68779 8.17159 1.87661 8.04016 2.01999L4.05016 7.00999C3.98155 7.08389 3.89874 7.14319 3.80669 7.18435C3.71464 7.22552 3.61523 7.2477 3.51441 7.24956C3.41359 7.25143 3.31343 7.23295 3.21991 7.19522C3.1264 7.15749 3.04146 7.10129 2.97016 7.02999L0.324158 4.38399C0.250471 4.31532 0.191369 4.23252 0.150377 4.14052C0.109385 4.04853 0.0873427 3.94921 0.0855659 3.84851C0.0837892 3.74781 0.102314 3.64778 0.140035 3.55439C0.177756 3.461 0.233901 3.37617 0.305119 3.30495C0.376338 3.23373 0.461172 3.17758 0.55456 3.13986C0.647948 3.10214 0.747978 3.08362 0.84868 3.08539C0.949383 3.08717 1.0487 3.10921 1.1407 3.15021C1.2327 3.1912 1.3155 3.2503 1.38416 3.32399L3.47816 5.41699L6.95116 0.991987C6.95741 0.984288 6.96409 0.976943 6.97116 0.969986H6.97016Z" />
                    </svg>
                </span>
                <span class="form__label-text">check-2</span>
            </label>
        </fieldset>
        <!-- радиокнопки -->
        <fieldset>
            <legend>Выберите вариант</legend>
            <label class="form__label">
                <input class="form__radio" type="radio" name="radio" value="radio-1">
                <span class="form__label-radio">
                    <svg viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="5" cy="5" r="5" />
                    </svg>
                </span>
                <span class="form__label-text">radio-1</span>
            </label>
            <label class="form__label">
                <input class="form__radio" type="radio" name="radio" checked value="radio-2">
                <span class="form__label-radio">
                    <svg viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="5" cy="5" r="5" />
                    </svg>
                </span>
                <span class="form__label-text">radio-2</span>
            </label>
        </fieldset>
        <!-- селекты -->
        <!-- обычный -->
        <select class="form__select" name="day">
            <option class="form__option" value="mon">Понедельник</option>
            <option class="form__option" value="tue">Вторник</option>
            <option class="form__option" value="wed" selected>Среда</option>
            <option class="form__option" value="thu">Четверг</option>
            <option class="form__option" value="fri">Пятница</option>
            <option class="form__option" value="sat">Суббота</option>
            <option class="form__option" value="sun">Воскресенье</option>
        </select>
        <!-- множественный выбор -->
        <select class="form__select" size="3" multiple name="hero[]">
            <option class="form__option" disabled>Выберите героя</option>
            <option class="form__option" value="Чебурашка">Чебурашка</option>
            <option class="form__option" selected value="Крокодил Гена">Крокодил Гена</option>
            <option class="form__option" value="Шапокляк">Шапокляк</option>
            <option class="form__option" value="Крыса Лариса">Крыса Лариса</option>
        </select>
        <!-- сгруппированный -->
        <select class="form__select" name="color">
            <optgroup class="form__optgroup" label="Цвет">
                <option class="form__option" value="c1">Апельсиновый</option>
                <option class="form__option" value="c2">Лимонный</option>
                <option class="form__option" value="c3">Персиковый</option>
            </optgroup>
            <optgroup class="form__optgroup" label="Тон">
                <option class="form__option" value="s1">Светлый</option>
                <option class="form__option" value="s2">Нормальный</option>
                <option class="form__option" value="s3">Темный</option>
            </optgroup>
        </select>

        <!-- Скрытое поле с utm-меткой -->
        <input type="hidden" name="utm_source" value="<?php if (isset($_GET[" utm_source"])) {
                                                            echo $_GET["utm_source"];
                                                        } else if (isset($_COOKIE["utm_source"])) {
                                                            echo $_COOKIE["utm_source"];
                                                        } ?>">
    </div>
    <!-- end inputs -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
    <!-- <script src="_form.jquery.js"></script> -->
    <script src="_form.js"></script>
</body>

</html>