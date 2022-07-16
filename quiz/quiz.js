window.addEventListener('DOMContentLoaded', function () {
    const documentBody = document.body,
        scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    function showQuiz() {
        const quizTrigger = document.querySelectorAll('[data-quiz="trigger"]'),
            quiz = document.querySelector('[data-quiz="quiz"]'),
            overlay = quiz.firstElementChild,
            quizContent = quiz.querySelector('[data-quiz="quiz-form"]'),
            container = quiz.querySelector('.quiz__questions'),
            close = quiz.querySelectorAll('[data-quiz="quiz-close"]'),
            preloader = document.querySelector('[data-quiz="quiz-preloader"]');
        function printQuiz(data) {
            const questions = data.questions,
                questionsLength = data.questions.length;
            questions.forEach(function (item, i) {
                printStep(item, i);

            });
        }
        function printStep(item, i) {
            let step = document.createElement('div');
            step.setAttribute('class', 'quiz__step quiz-step');
            let quest = document.createElement('h2');
            quest.setAttribute('class', 'quiz-step__question');
            step.appendChild(quest);
            for (let j = 0; j < item.options.length; j++) {
                let opt = item.options[j];

                if ('radio' == opt.type || 'checkbox' == opt.type) {
                    let option = document.createElement('label');
                    option.setAttribute('class', 'quiz-step__option option');
                    let inp = document.createElement('input');
                    inp.setAttribute('class', 'option__input');
                    inp.setAttribute('type', opt.type);
                    inp.setAttribute('name', opt.name);
                    inp.setAttribute('value', opt.value);
                    if (opt.req) {
                        inp.setAttribute('aria-require', true);
                    }
                    option.appendChild(inp);
                    let check = document.createElement('span');
                    check.setAttribute('class', 'option__' + opt.type);
                    option.appendChild(check);
                    let text = document.createElement('span');
                    text.setAttribute('class', 'option__text');
                    text.innerHTML = opt.text;
                    option.appendChild(text);
                    if (opt.image) {
                        let img = document.createElement('img');
                        inp.setAttribute('class', 'option__img');
                        img.setAttribute('src', opt.image);
                        option.appendChild(img);
                    }
                    step.appendChild(option);
                }
                else if ('textarea' == opt.type || 'text' == opt.type) {
                    let textField = document.createElement(opt.type);
                    textField.setAttribute('class', 'quiz-step__option quiz-step__' + opt.type);
                    textField.setAttribute('placeholder', opt.placeholder);
                    if (opt.req) {
                        textField.setAttribute('aria-require', true);
                    }
                    step.appendChild(textField);
                }
                else if ('submit' == opt.type) {
                    let sub = document.createElement('input');
                    sub.setAttribute('class', 'quiz__btn quiz__btn_submit button');
                    sub.setAttribute('type', opt.type);
                    sub.setAttribute('value', opt.value);
                    step.appendChild(sub);
                }
            }
            container.appendChild(step);
        }
        function printError(msg) {
            let step = document.createElement('div');
            step.setAttribute('class', 'quiz__step quiz-step');
            step.textContent = msg;
            container.appendChild(step);
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
                        printQuiz(res);

                    } else {
                        let msg = "Ошибка сервера. Номер: " + req.status;
                        printError(msg);
                    }
                };
                req.onerror = printError("Ошибка отправки запроса");
                req.send();
                overlay.classList.add('quiz__overlay_fadeIn');
                documentBody.classList.add('lock');
                documentBody.style.paddingRight = scrollbarWidth + 'px';
                setTimeout(function () {
                    preloader.classList.remove('quiz__preloader_visible');
                    quizContent.style.display = 'flex';
                }, 2000);


            });
        });
        close.forEach(function (item) {
            item.addEventListener('click', function (e) {
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
    }

    showQuiz();
});