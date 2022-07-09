<?php

// Файлы phpmailer
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $fname = trim($_POST['fname']);
    $name = strip_tags(trim($_POST['name']));
    $phone = strip_tags(trim($_POST['phone']));
    $email = strip_tags(trim($_POST['email']));
    $message = strip_tags(trim($_POST['message']));
    // несколько файлов
    if (isset($_FILES['files'])) {
        $files = $_FILES['files'];
    }
    // один файл
    if (isset($_FILES['file'])) {
        $file = $_FILES['file'];
    }

    $title = "Новая заявка с сайта";
    $body = "
    <h2>Форма: $fname</h2><br>
    <b>Имя:</b> $name<br>
    <b>Телефон:</b> $phone<br>
    <b>Email:</b> $email<br><br>
    ";

    if ($_POST['message'] != '') {
        $body .= "<b>Сообщение:</b>$message<br>";
    }
    // Настройки PHPMailer
    $mail = new PHPMailer\PHPMailer\PHPMailer();
    try {
        $mail->isSMTP();
        $mail->CharSet = "UTF-8";
        $mail->SMTPAuth   = true;
        $mail->SMTPDebug = 2;
        $mail->Debugoutput = function ($str, $level) {
            $GLOBALS['status'][] = $str;
        };

        // Настройки почты
        $mail->Host       = 'ssl://smtp.yandex.ru'; // SMTP сервера
        $mail->Username   = 'tantikh2020@yandex.ru'; // Логин
        $mail->Password   = 'pgabtbnprgfnznuv'; // Пароль
        $mail->SMTPSecure = 'ssl';
        $mail->Port       = 465;
        $mail->setFrom('tantikh2020@yandex.ru', 'Tanya'); // Адрес и имя отправителя

        // Получатель письма
        $mail->addAddress('tantikh2020@gmail.com');

        // Прикрепление нескольких файлов к письму
        if (!empty($files['name'][0])) {
            for ($ct = 0; $ct < count($files['tmp_name']); $ct++) {
                $uploadfile = tempnam(sys_get_temp_dir(), sha1($files['name'][$ct]));
                $filename = $files['name'][$ct];
                if (move_uploaded_file($files['tmp_name'][$ct], $uploadfile)) {
                    $mail->addAttachment($uploadfile, $filename);
                    $rfile[] = "Файл $filename прикреплён";
                } else {
                    $rfile[] = "Не удалось прикрепить файл $filename";
                }
            }
        }
        // прикрепление одного файла
        if (!empty($file['name'])) {
            $uploadfile = tempnam(sys_get_temp_dir(), sha1($file['name']));
            $filename = $file['name'];
            if (move_uploaded_file($file['tmp_name'], $uploadfile)) {
                $mail->addAttachment($uploadfile, $filename);
                $rfile[] = "Файл $filename прикреплён";
            } else {
                $rfile[] = "Не удалось прикрепить файл $filename";
            }
        }
        // Отправка сообщения
        if ($fname && $name && $email) {
            $mail->isHTML(true);
            $mail->Subject = $title;
            $mail->Body = $body;
        }
        $result = "";
        if ($mail->send()) {
            $result = "success";
        } else {
            $result = "error";
        }
    } catch (Exception $e) {
        $result = "error";
        $status = "Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}";
    }

    // Отображение результата
    echo json_encode(["result" => $result, "resultfile" => $rfile, "status" => $status]);
}
