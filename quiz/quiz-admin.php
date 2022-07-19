<?php

// Файлы phpmailer
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $fname = trim($_POST['formname']);
    $name = strip_tags(trim($_POST['name']));
    $email = strip_tags(trim($_POST['email']));
    $user_ip = $_SERVER['REMOTE_ADDR'];
    $utm_source = $_POST['utm_source'] ?? 'нет';
    $title = 'Результаты теста';
    $body = "
    <table style=\"border-collapse:collapse;font-size:16px;line-height:1.5;width:100%;\"width=\"100%\" cellspacing=\"0\";cellpadding=\"0\";border=\"0\">
    <tbody>
    <tr style=\"border-color:transparent\">
	<td cellpadding=\"0\"; cellspacing=\"0\"style=\"border-collapse:collapse;border-color:transparent;padding:5px;\">
	<b>Ip-адрес отправителя:</b> $user_ip<br>
	<b>Рекламная система:</b> $utm_source<br>
	<b>Имя отправителя:</b> $name<br>
	<b>Email отправителя:</b> $email<br>
	</td>
	</tr>
    ";
    unset($_POST['formname']);
    unset($_POST['email']);
    unset($_POST['name']);
    unset($_POST['agreement']);
    unset($_POST['utm_source']);
    unset($_POST['other']);
    foreach ($_POST as $key => $value) {
        if ($value) {
            $key = str_replace('_', ' ', $key);
            if (is_array($value)) {
                $str = implode('<br>', $value);
                $body .= "<tr style=\"border-color:transparent\">
                <td cellpadding=\"0\"; cellspacing=\"0\"style=\"border-collapse:collapse;border-color:transparent;padding:5px;\">
                <b>$key</b>
                </td>
                </tr>
                <tr style=\"border-color:transparent\">
                <td cellpadding=\"0\"; cellspacing=\"0\"style=\"border-collapse:collapse;border-color:transparent;padding:5px;\">
                $str
                </td>
                </tr>";
            } else {
                $body .= "<tr style=\"border-color:transparent\">
                <td cellpadding=\"0\"; cellspacing=\"0\"style=\"border-collapse:collapse;border-color:transparent;padding:5px;\">
                <b>$key</b>
                </td>
                </tr><tr style=\"border-color:transparent\">
                <td cellpadding=\"0\"; cellspacing=\"0\"style=\"border-collapse:collapse;border-color:transparent;padding:5px;\">
                $value
                </td>
                </tr>";
            }
        }
    }
    $body .= "</tbody></table>";
    // несколько файлов
    if (isset($_FILES['files'])) {
        $files = $_FILES['files'];
    }
    // один файл
    if (isset($_FILES['file'])) {
        $file = $_FILES['file'];
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
        $mail->Password   = 'pjyqwujrqpewurfm'; // Пароль
        $mail->SMTPSecure = 'ssl';
        $mail->Port       = 465;
        $mail->setFrom('tantikh2020@yandex.ru', 'Tanya'); // Адрес и имя отправителя

        // Получатель письма
        $mail->addAddress('tantikh2020@gmail.com');

        // Прикрепление нескольких файлов к письму
        if (!empty($files['name'][0])) {
            for ($i = 0; $i < count($files['tmp_name']); $i++) {
                $uploadfile = tempnam(sys_get_temp_dir(), sha1($files['name'][$i]));
                $filename = $files['name'][$i];
                if (move_uploaded_file($files['tmp_name'][$i], $uploadfile)) {
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
