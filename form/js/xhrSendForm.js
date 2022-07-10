window.addEventListener('DOMContentLoaded', function () {

    /**
     * отправка любой формы на странице с XMLHttpRequest
     */
    function sendForm() {
        let forms = document.querySelectorAll('.form');
        forms.forEach(function (form) {
            form.addEventListener('submit', function (e) {
                e.preventDefault();
                // let isValid = validateFields(form); //функция в файле validate
                let isValid = true; //заглушка, удалить
                let fname = form.getAttribute('name');
                if (true === isValid) {
                    const req = new XMLHttpRequest(),
                        fd = new FormData(form);
                    fd.append('fname', fname);
                    // прикрепление нескольких файлов к форме (необязательно, прикрепляются и без этого)
                    // let files = uploadFiles(form);
                    // if (files.length > 0) { fd.append('files', files); }
                    // прикрепление одного файла к форме (необязательно, прикрепляются и без этого)
                    // let file = uploadFiles(form);
                    // if (file.length > 0) { fd.append('file', file); }
                    req.open('POST', 'mailer.php', true);
                    req.onload = function () {
                        if (req.status >= 200 && req.status < 400) {
                            let json = JSON.parse(this.response);
                            if (json.result == "success") {
                                // showThanks();
                                form.reset();
                                // - если при загрузке файла отображается его имя - очищаем
                                // form.querySelector('.form__filename').textContent = 'Файл не выбран'; 
                                // window.location.href = "https://mysite.ru/thanks/";
                            } else {
                                console.log("Ошибка. Сообщение не отправлено");
                            }
                        } else { console.log("Ошибка сервера. Номер: " + req.status); }
                    };

                    // Если не удалось отправить запрос. Стоит блок на хостинге
                    req.onerror = function () { console.log("Ошибка отправки запроса"); };
                    req.send(fd);
                }
            });
        })
    }
    sendForm();




});