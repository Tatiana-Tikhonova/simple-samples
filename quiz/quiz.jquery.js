$(document).ready(function () {
    const documentBody = $('body'),
        scrollbarWidth = window.innerWidth - document.documentElement.clientWidth,
        quizTrigger = $('[data-quiz="trigger"]'),
        quiz = $('[data-quiz="quiz"]'),
        overlay = quiz.first(),
        quizForm = quiz.find('[data-quiz="quiz-form"]'),
        container = quiz.find('.quiz__questions'),
        close = quiz.find('[data-quiz="quiz-close"]'),
        preloader = $('[data-quiz="quiz-preloader"]'),
        next = quiz.find('[data-quiz="next"]'),
        back = quiz.find('[data-quiz="back"]');
    function printQuiz(data, callback) {
        const questions = data.questions,
            questionsLength = data.questions.length;
        for (let i = 0; i < questions.length; i++) {
            printStep(questions[i], i);
        }
        callback();
    }
    function printStep(item, i) {
        // container.add('<div>').attr('data-quiz-step', i).addClass('quiz__step quiz-step');
        let step = $('<div>').attr('data-quiz-step', i).addClass('quiz__step quiz-step');
        step.append($('<h2>').addClass('quiz-step__question').text(item.question));
        step.append($('<div>').addClass('quiz__notice'));
        let options = $('<div>').addClass('quiz-step__options');
        for (let j = 0; j < item.options.length; j++) {
            let opt = item.options[j];
            let input = '', label = '';
            if ('radio' == opt.type || 'checkbox' == opt.type) {
                input = $('<input>').attr('type', opt.type).attr('name', opt.name).attr('id', opt.type + i + j).attr('value', opt.value);
                if (opt.req) {
                    input.attr('aria-required', opt.req);
                }
                options.append(input);
                label = $('<label>').attr('for', opt.type + i + j).addClass('quiz-step__option option option-' + opt.type);
                if (opt.image) {
                    label.addClass('option-image-' + opt.type);
                    label.append($('<img>').addClass('option__img').attr('src', opt.image));
                }
                label.append($('<span>').addClass('option__visible-' + opt.type));
                label.append($('<span>').addClass('option__text').html(opt.text));
                options.append(label);
            }
            else if ('input' == opt.type) {
                input = $('<input>').addClass('quiz-step__option option option-' + opt.type).attr('type', 'text').attr('name', opt.name).attr('id', opt.type + i + j).attr('placeholder', opt.placeholder);
                if (opt.req) {
                    input.attr('aria-required', opt.req);
                }
                options.append(input);
            }
            else if ('textarea' == opt.type) {
                input = $('<textarea>').addClass('quiz-step__option option option-' + opt.type).attr('name', opt.name).attr('id', opt.type + i + j).attr('placeholder', opt.placeholder);
                if (opt.req) {
                    input.attr('aria-required', opt.req);
                }
                options.append(input);
            }
            else if ('submit' == opt.type) {
                input = $('<input>').addClass('quiz__btn quiz__btn_submit button').attr('type', opt.type).attr('value', opt.value);
                options.append(input);
            }

        }
        step.append(options);
        container.append(step);
        if (0 === i) {
            step.addClass('quiz-step_current');
            step.css('display', 'block');
        }
    }
    function printError(curr, msg) {
        let notice = $(curr).find('.quiz__notice');
        notice.text(msg);
        if ('' != msg) {
            notice.css('display', 'block');
        }
        else {
            notice.css('display', 'none');
        }
    }
    function bindSteps() {
        next.on('click', function (e) {
            let current = container.find('.quiz-step_current'),
                nextStep = current.next('.quiz__step');
            if (nextStep.length > 0) {
                validateStep(current, nextStep);
            }
        });
        back.on('click', function (e) {
            let current = container.find('.quiz-step_current'),
                prevStep = current.prev('.quiz__step');
            navigateSteps(current, prevStep);
        });
        function navigateSteps(curr, target) {
            if (target.length > 0) {
                curr.removeClass('quiz-step_current');
                curr.css('display', 'none');
                target.addClass('quiz-step_current');
                target.css('display', 'block');
                target.addClass('fadeIn');
            }
        }
        function validateStep(curr, target) {
            let req = $(curr).find('[aria-required="true"]'),
                checkboxes = $(curr).find('input[type=checkbox]'),
                radios = $(curr).find('input[type=radio]');
            if (req.length > 0) {
                if ('' == req.val()) {
                    printError(curr, "Заполните все обязательные поля!");
                } else {
                    navigateSteps(curr, target);
                    updateProgress(curr, 'next');
                }
            }
            if (radios.length > 0) {
                let isChecked = 0;
                radios.each(function (index) {
                    if ($(this).prop('checked')) {
                        isChecked++;
                    }
                });
                if (0 == isChecked) {
                    printError(curr, "Выберите вариант!");
                }
                else {
                    radios.each(function (ind) {
                        let val = $(this).attr('value');
                        if ($(this).prop('checked') && 'other' == val) {
                            let from = $(curr).find('[name=other]');
                            if ('' == from.val()) {
                                printError(curr, "Напишите ваш вариант!");
                            }
                            else {
                                printError(curr, '');
                                $(this).val($(this).val() + ': ' + from.val());
                                navigateSteps(curr, target);
                                updateProgress(curr, 'next');
                            }
                        }
                        else if ($(this).prop('checked') && 'other' != val) {
                            printError(curr, '');
                            navigateSteps(curr, target);
                            updateProgress(curr, 'next');
                        }
                    });
                }
            }
            if (checkboxes.length > 0) {
                let isChecked = 0;
                checkboxes.each(function (index) {
                    if ($(this).prop('checked')) {
                        isChecked++;
                    }
                });
                if (0 == isChecked && 'agreement' != $(this).attr('name')) {
                    printError(curr, "Выберите варианты!");
                }
                else {
                    checkboxes.each(function (ind) {
                        let val = $(this).attr('value');
                        if ($(this).prop('checked') && 'other' == val) {
                            let from = $(curr).find('[name=other]');
                            if (from.length > 0) {
                                if ('' == from.val()) {
                                    printError(curr, "Напишите ваш вариант!");
                                }
                                else {
                                    printError(curr, '');
                                    $(this).val($(this).val() + ': ' + from.val());
                                    navigateSteps(curr, target);
                                    updateProgress(curr, 'next');
                                }
                            }

                        }
                        else if ($(this).prop('checked') && 'other' != val) {
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
        let stepsList = quiz.find('[data-quiz-step]'),
            steps = stepsList.length - 1,
            step = 100 / (stepsList.length - 1),
            ind = +curr.attr('data-quiz-step') + 1,
            progress = quiz.find('.progress__scale'),
            progressNums = quiz.find('.progress__steps'),
            progressPerc = quiz.find('.progress__percents');
        progressNums.text(ind + ' / ' + (stepsList.length - 1));
        progressPerc.text(parseInt(step * ind) + '%');
        progress.css('width', (step * ind) + '%');
        if ('100%' == progress.css('width')) {
            progress.css('background-image', 'none');
        }
    }
    function validateContacts(fm) {
        let isValid = false,
            nameField = fm.find('input[name=name]'),
            emailField = fm.find('input[name=email]'),
            agreement = fm.find('input[name=agreement]'),
            steps = $('[data-quiz-step]'),
            curr = steps[steps.length - 1];
        if (!agreement.prop('checked')) {
            printError(curr, 'Подтвердите согласие на обработку персональных данных!');
            agreement.addClass('invalid');
        }
        else {

            agreement.removeClass('invalid');
            agreement.addClass('validate');
        }
        if (nameField.attr('aria-required') && '' == nameField.val()) {
            printError(curr, 'Пожалуйста, заполните все поля!');
            nameField.addClass('invalid');
        }
        else if ('' != nameField.val() && nameField.val().length < 2) {
            printError(curr, 'Имя не менее 2-х букв!');
            nameField.addClass('invalid');
        }
        else {

            nameField.removeClass('invalid');
            nameField.addClass('validate');
        }
        if (emailField.attr('aria-required') && '' == emailField.val()) {
            printError(curr, 'Пожалуйста, заполните все поля!');
            emailField.addClass('invalid');
        }
        else if ('' != emailField.val() && !emailField.val().match(/@/)) {
            printError(curr, 'Введите адрес электронной почты!');
            emailField.addClass('invalid');
        }
        else {

            emailField.removeClass('invalid');
            emailField.addClass('validate');
        }

        if (nameField.hasClass('validate') &&
            emailField.hasClass('validate') &&
            agreement.hasClass('validate')) {
            printError(curr, '');
            isValid = true;
        }
        return isValid;
    }

    quizTrigger.on('click', function (e) {
        e.preventDefault();
        quiz.css('display', 'flex');
        //подгрузка из json файла
        $.getJSON("quiz.json", function (res) {
            const steps = $('[data-quiz-step]');
            if (steps.length == 0) {
                printQuiz(res, bindSteps);
            }
        })
            .fail(function (e) { console.log(e.status, e.statusText); })
            .done(function () {
                overlay.addClass('quiz__overlay_fadeIn');
                documentBody.addClass('lock');
                documentBody.css('padding-right', scrollbarWidth + 'px');
                setTimeout(function () {
                    preloader.removeClass('quiz__preloader_visible');
                    quizForm.css('display', 'flex');
                }, 2000);
            });
    });
    close.on('click', function (e) {
        e.stopPropagation();
        if (e.target == e.currentTarget) {
            overlay.removeClass('quiz__overlay_fadeIn');
            overlay.addClass('quiz__overlay_fadeOut');
            setTimeout(function () {
                overlay.removeClass('quiz__overlay_fadeOut');
                quiz.css('display', 'none');
                preloader.addClass('quiz__preloader_visible');
                documentBody.removeClass('lock');
                documentBody.css('padding-right', '');
            }, 300);
        }
    });
    function showThanks() {
        const footer = quiz.find('.quiz__footer'),
            thanks = quiz.find('[data-quiz="success"]');
        container.css('display', 'none');
        footer.css('display', 'none');
        thanks.css('display', 'block');
        thanks.addClass('fadeIn');
        setTimeout(function () {
            overlay.addClass('quiz__overlay_fadeOut');
            setTimeout(function () {
                overlay.removeClass('quiz__overlay_fadeOut');
                quiz.css('display', 'none');
                preloader.addClass('quiz__preloader_visible');
                documentBody.removeClass('lock');
                documentBody.css('padding-right', '');
            }, 300);
        }, 2000);
    }
    function sendQuiz(form, url) {
        form.on('submit', function (e) {
            e.preventDefault();
            let t = $(this),
                isValid = validateContacts(t); //до отправки нужно вставить функцию валидации
            // isValid = true; //это заглушка, ее убрать
            if (isValid) {
                let fd = new FormData(e.target);
                fd.append('formname', t.attr('name'));
                $.ajax({
                    url: url,
                    data: fd,
                    dataType: 'json',
                    processData: false,
                    contentType: false,
                    type: 'POST',

                })
                    .fail(function (e) { console.log(e.status, e.statusText); })
                    .done(function () {
                        showThanks();
                        t.trigger('reset');
                        // t.find('.form__filename').text('Файл не выбран');
                        // window.location.href = "/thanks/";
                    });
            }
        });
    }
    sendQuiz(quizForm, 'quiz-admin.php');
    sendQuiz(quizForm, 'quiz-client.php');
});
