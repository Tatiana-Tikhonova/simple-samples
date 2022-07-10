window.addEventListener('DOMContentLoaded', function () {

    /**
     * отправка любой формы на странице с fetch
     */
    function fetchForm() {
        let forms = document.querySelectorAll('.form');
        forms.forEach(function (form) {
            form.addEventListener('submit', function (e) {
                e.preventDefault();
                // let isValid = validateFields(form); //функция в файле validate
                let isValid = true; //заглушка, удалить
                let fname = form.getAttribute('name');
                if (true === isValid) {
                    let fd = new FormData(form);
                    fd.append('fname', fname);
                    // прикрепление нескольких файлов к форме (необязательно, прикрепляются и без этого)
                    // let files = uploadFiles(form);
                    // if (files.length > 0) { fd.append('files', files); }
                    // прикрепление одного файла к форме (необязательно, прикрепляются и без этого)
                    // let file = uploadFiles(form);
                    // if (file.length > 0) { fd.append('file', file); }
                    fetch('mailer.php', {
                        method: 'POST',
                        body: fd,
                    }).then(function (response) {
                        if (response.status >= 200 && response.status < 400) {
                            return response.json();
                        }
                        else { console.log("Ошибка сервера. Номер: " + response.status); }

                    }).then(function (json) {
                        if (json.result == "success") {
                            // showThanks();
                            form.reset();
                            // - если при загрузке файла отображается его имя - очищаем
                            // form.querySelector('.form__filename').textContent = 'Файл не выбран';
                            // window.location.href = "https://mysite.ru/thanks/";
                        } else {
                            console.log("Ошибка. Сообщение не отправлено");
                        }
                    }).catch(function (json) {
                        if (!json) {
                            console.log("Ошибка сервера. Номер: " + response.status);

                        }
                    });
                }
            });
        });
    }
    fetchForm();



});