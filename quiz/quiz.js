window.addEventListener('DOMContentLoaded', function () {
    const documentBody = document.body,
        scrollbarWidth = window.innerWidth - document.documentElement.clientWidth,
        quizTrigger = document.querySelectorAll('[data-quiz="trigger"]'),
        quiz = document.querySelector('[data-quiz="quiz"]'),
        overlay = quiz.firstElementChild,
        quizForm = quiz.querySelector('[data-quiz="quiz-form"]'),
        container = quiz.querySelector('.quiz__questions'),
        close = quiz.querySelectorAll('[data-quiz="quiz-close"]'),
        preloader = document.querySelector('[data-quiz="quiz-preloader"]'),
        next = quiz.querySelector('[data-quiz="next"]'),
        back = quiz.querySelector('[data-quiz="back"]');

    function printQuiz(data, callback) {
        const questions = data.questions,
            questionsLength = data.questions.length;
        questions.forEach(function (item, i) {
            printStep(item, i);
        });
        callback();
    }
    function printStep(item, i) {
        let step = document.createElement('div');
        step.setAttribute('class', 'quiz__step quiz-step');
        step.setAttribute('data-quiz-step', i);
        let quest = document.createElement('h2');
        quest.setAttribute('class', 'quiz-step__question');
        quest.textContent = item.question;
        step.appendChild(quest);
        let notice = document.createElement('div');
        notice.setAttribute('class', 'quiz__notice');
        step.appendChild(notice);
        let options = document.createElement('div');
        options.setAttribute('class', 'quiz-step__options');
        step.appendChild(options);
        for (let j = 0; j < item.options.length; j++) {
            let opt = item.options[j];

            if ('radio' == opt.type || 'checkbox' == opt.type) {
                let inp = document.createElement('input');
                inp.setAttribute('class', 'option__input');
                inp.setAttribute('type', opt.type);
                inp.setAttribute('name', opt.name);
                inp.setAttribute('id', opt.name + j);
                inp.setAttribute('value', opt.value);
                if (opt.req) {
                    inp.setAttribute('aria-required', true);
                }
                options.appendChild(inp);
                let option = document.createElement('label');
                option.setAttribute('class', 'quiz-step__option option option-' + opt.type);
                option.setAttribute('for', opt.name + j);
                if (opt.image) {
                    let img = document.createElement('img');
                    img.setAttribute('class', 'option__img');
                    img.setAttribute('src', opt.image);
                    option.classList.add('option-image-' + opt.type);
                    option.appendChild(img);
                }

                let check = document.createElement('span');
                check.setAttribute('class', 'option__visible-' + opt.type);
                option.appendChild(check);
                let text = document.createElement('span');
                text.setAttribute('class', 'option__text');
                text.innerHTML = opt.text;
                option.appendChild(text);

                options.appendChild(option);
            }
            else if ('textarea' == opt.type || 'input' == opt.type) {
                let textField = document.createElement(opt.type);
                textField.setAttribute('class', 'quiz-step__option option option-' + opt.type);
                textField.setAttribute('name', opt.name);
                // if ('other' == opt.name) {
                //     textField.setAttribute('name', opt.name + '-' + (j - 1));
                // } else {
                //     textField.setAttribute('name', opt.name);
                // }
                textField.setAttribute('placeholder', opt.placeholder);
                if ('input' == opt.type) {
                    textField.setAttribute('type', 'text');
                }
                if (opt.req) {
                    textField.setAttribute('aria-required', true);
                }
                options.appendChild(textField);
            }
            else if ('submit' == opt.type) {
                let sub = document.createElement('input');
                sub.setAttribute('class', 'quiz__btn quiz__btn_submit button');
                sub.setAttribute('type', opt.type);
                sub.setAttribute('value', opt.value);
                options.appendChild(sub);
            }
        }
        container.appendChild(step);
        if (0 === i) {
            step.classList.add('quiz-step_current');
            step.style.display = 'block';
        }
    }
    function printError(curr, msg) {
        let notice = curr.querySelector('.quiz__notice');
        notice.textContent = msg;
    }
    function bindSteps() {
        next.addEventListener('click', function (e) {
            let current = container.querySelector('.quiz-step_current'),
                nextStep = current.nextElementSibling;
            validateStep(current, nextStep);
        });
        back.addEventListener('click', function (e) {
            let current = container.querySelector('.quiz-step_current'),
                prevStep = current.previousElementSibling;
            navigateSteps(current, prevStep);
        });
        function navigateSteps(curr, target) {
            if (target) {
                curr.classList.remove('quiz-step_current');
                curr.style.display = 'none';
                target.classList.add('quiz-step_current');
                target.style.display = 'block';
                target.classList.add('fadeIn');
            }
        }
        function validateStep(curr, target) {
            let req = curr.querySelectorAll('[aria-required="true"]'),
                checkboxes = curr.querySelectorAll('input[type=checkbox]'),
                radios = curr.querySelectorAll('input[type=radio]');
            if (req.length > 0) {
                req.forEach(function (field, i) {
                    if ('' == field.value) {
                        printError(curr, "Заполните все обязательные поля!");
                    } else {
                        navigateSteps(curr, target);
                        updateProgress(curr, 'next');
                    }

                });
            }
            if (checkboxes.length > 0) {
                let isCheck = 0,
                    name = '';
                checkboxes.forEach(function (ch, i) {
                    if (ch.checked) isCheck++;
                    name = ch.getAttribute('name');
                });
                if (0 == isCheck && 'agreement' != name) {
                    printError(curr, "Выберите варианты!");
                } else {
                    printError(curr, '');
                    navigateSteps(curr, target);
                    updateProgress(curr, 'next');
                }
            }
            if (radios.length > 0) {
                let isChecked = 0;
                radios.forEach(function (r, i) {
                    if (r.checked) {
                        isChecked++;
                    };
                });
                if (0 == isChecked) {
                    printError(curr, "Выберите вариант!");
                }
                else {
                    radios.forEach(function (r, i) {
                        let val = r.getAttribute('value');
                        if (r.checked && 'other' == val) {
                            let from = curr.querySelector('[name=other]');
                            if ('' == from.value) {
                                printError(curr, "Напишите ваш вариант!");
                            }
                            else {
                                printError(curr, '');
                                r.value = r.value + ': ' + from.value;
                                navigateSteps(curr, target);
                                updateProgress(curr, 'next');
                            }
                        }
                        else if (r.checked && 'other' != val) {
                            printError(curr, '');
                            navigateSteps(curr, target);
                            updateProgress(curr, 'next');
                        }
                    });


                }
            }
        }
    }
    function updateProgress(curr) {
        let stepsList = quiz.querySelectorAll('[data-quiz-step]'),
            steps = stepsList.length - 1,
            step = 100 / steps,
            ind = +curr.getAttribute('data-quiz-step') + 1,
            progress = quiz.querySelector('.progress__scale'),
            progressNums = quiz.querySelector('.progress__steps'),
            progressPerc = quiz.querySelector('.progress__percents');
        progressNums.textContent = ind + '/' + (stepsList.length - 1);
        progressPerc.textContent = parseInt(step * ind) + '%';
        progress.style.width = (step * ind) + '%';
        if ('100%' == progress.style.width) {
            progress.style.backgroundImage = 'none';
        }
    }
    function validateContacts(fm) {
        let isValid = false,
            nameField = fm.querySelector('input[name=name]'),
            emailField = fm.querySelector('input[name=email]'),
            agreement = fm.querySelector('input[name=agreement]'),
            steps = document.querySelectorAll('[data-quiz-step]'),
            curr = steps[steps.length - 1];


        if (nameField.getAttribute('aria-required') && '' == nameField.value) {
            printError(curr, 'Пожалуйста, заполните все поля!');
            nameField.classList.add('invalid');
        }
        else if ('' != nameField.value && nameField.value.length < 2) {
            printError(curr, 'Имя не менее 2-х букв!');
            nameField.classList.add('invalid');
        }
        else {

            nameField.classList.remove('invalid');
            nameField.classList.add('validate');
        }

        if (emailField.getAttribute('aria-required') && '' == emailField.value) {
            printError(curr, 'Пожалуйста, заполните все поля!');
            emailField.classList.add('invalid');
        }
        else if ('' != emailField.value && !emailField.value.match(/@/)) {
            printError(curr, 'Введите адрес электронной почты!');
            emailField.classList.add('invalid');
        }
        else {

            emailField.classList.remove('invalid');
            emailField.classList.add('validate');
        }
        if (!agreement.checked) {
            printError(curr, 'Подтвердите согласие на обработку персональных данных!');
            agreement.classList.add('invalid');
        }
        else {

            agreement.classList.remove('invalid');
            agreement.classList.add('validate');
        }
        if (nameField.classList.contains('validate') &&
            emailField.classList.contains('validate') &&
            agreement.classList.contains('validate')) {
            printError(curr, '');
            isValid = true;
        }
        return isValid;
    }
    function showThanks() {
        const footer = quiz.querySelector('.quiz__footer'),
            thanks = quiz.querySelector('[data-quiz="success"]');
        container.style.display = 'none';
        footer.style.display = 'none';
        thanks.style.display = 'block';
        thanks.classList.add('fadeIn');
        setTimeout(function () {
            overlay.classList.add('quiz__overlay_fadeOut');
            setTimeout(function () {
                overlay.classList.remove('quiz__overlay_fadeOut');
                quiz.style.display = 'none';
                preloader.classList.add('quiz__preloader_visible');
                documentBody.classList.remove('lock');
                documentBody.style.paddingRight = '';
            }, 300);
        }, 2000);
    }
    quizTrigger.forEach(function (trigger) {
        trigger.addEventListener('click', function (e) {
            e.preventDefault();
            quiz.style.display = 'flex';
            // получаем данные методом fetch
            // getDataFetch('data.json')
            //     .then(function (res) { printQuiz(res); })
            //     .catch(function (error) { printError(error); });

            // получаем данные методом XMLHttpRequest
            const req = new XMLHttpRequest();
            req.open('GET', 'quiz.json', true);
            req.onload = function () {
                if (req.status >= 200 && req.status < 400) {
                    let res = JSON.parse(this.response);
                    const steps = document.querySelectorAll('[data-quiz-step]');
                    if (steps.length == 0) {
                        printQuiz(res, bindSteps);
                    }
                } else {
                    let msg = "Ошибка сервера. Номер: " + req.status;
                    printError(curr, msg);
                }
            };
            req.onerror = function (e) {
                console.log("Ошибка отправки запроса " + e);

            }
            req.send();
            overlay.classList.add('quiz__overlay_fadeIn');
            documentBody.classList.add('lock');
            documentBody.style.paddingRight = scrollbarWidth + 'px';
            setTimeout(function () {
                preloader.classList.remove('quiz__preloader_visible');
                quizForm.style.display = 'flex';
            }, 2000);


        });
    });
    close.forEach(function (cl) {
        cl.addEventListener('click', function (e) {
            e.stopPropagation();
            if (e.target == e.currentTarget) {
                overlay.classList.remove('quiz__overlay_fadeIn');
                overlay.classList.add('quiz__overlay_fadeOut');
                setTimeout(function () {
                    overlay.classList.remove('quiz__overlay_fadeOut');
                    quiz.style.display = 'none';
                    preloader.classList.add('quiz__preloader_visible');
                    documentBody.classList.remove('lock');
                    documentBody.style.paddingRight = '';
                }, 300);
            }
        });
    });
    function submitQuiz(form, url) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            let isValid = validateContacts(form),
                formname = form.getAttribute('name');
            if (isValid) {
                const req = new XMLHttpRequest(),
                    fd = new FormData(form);
                fd.append('formname', formname);
                req.open('POST', url, true);
                req.onload = function () {
                    if (req.status >= 200 && req.status < 400) {
                        let json = JSON.parse(this.response);
                        if (json.result == "success") {
                            showThanks();
                            form.reset();
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
    }
    submitQuiz(quizForm, 'quiz-admin.php');
    submitQuiz(quizForm, 'quiz-client.php');

});
