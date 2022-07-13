<?php

/**
 * Загрузка файлов в папки по году и месяцу
 */
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $uploaddir = __DIR__ . '/images/' . date('Y') . '/' . date('m') . '/';
    if (!file_exists($uploaddir)) {
        mkdir($uploaddir);
    }

    if (isset($_FILES['file'])) {
        $file = $_FILES['file'];
    }
    $isUploaded = false;
    try {

        if (!empty($file['name'])) {
            $uploadfile = $uploaddir . basename($file['name']);
            $filename = $file['name'];
            if (move_uploaded_file($file['tmp_name'], $uploadfile)) {
                $isUploaded = true;
                $rfile[] = "Файл $filename загружен";
            } else {
                $isUploaded = false;
                $rfile[] = "Не удалось загрузить файл $filename";
            }
        }
        sleep(2);
        if ($isUploaded) {
            $result = "success";
        } else {
            $result = "error";
        }
    } catch (Exception $e) {
        $result = "error";
        $status = "Сообщение не было отправлено. Причина ошибки: {$e->getMessage()}";
    }


    // Отображение результата
    echo json_encode(["result" => $result, "resultfile" => $rfile, "status" => $status]);
} else {
    echo 'Просмотр этой страницы запрещен!';
    die;
}
