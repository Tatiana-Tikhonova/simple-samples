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
        let step = $('<div>').attr('data-quiz-step', i).addClass('quiz__step quiz-step');
        step.append($('<h2>').addClass('quiz-step__question').text(item.question));
        step.append($('<div>').addClass('quiz__notice'));
        step.append($('<div>').addClass('quiz-step__options'));
        for (let j = 0; j < item.options.length; j++) {
            let opt = item.options[j];
            if ('radio' == opt.type || 'checkbox' == opt.type) {
                $('quiz-step__options').append($('input').attr('type', opt.type).attr('name', opt.name).attr('id', opt.name + j).attr('value', opt.value)).attr('aria-required', opt.req);
                let label = $('<label>').attr('for', opt.name + j).addClass('quiz-step__option option option-' + opt.type);
                if (opt.image) {
                    label.append($('<img>').addClass('option__img').attr('src', opt.image));
                    label.addClass('option-image-' + opt.type);
                }
                $('quiz-step__options').append(label);

            }
        }

        console.log(step);


    }
    function bindSteps() {

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
});