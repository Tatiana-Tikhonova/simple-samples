$(document).ready(function () {
    function showTestesult() {
        const steps = $('.test__step'),
            inputs = $('input[type="radio"]'),
            btn = $('.test__res-btn'),
            reset = $('.test__reset'),
            resTitle = $('.test__res-title'),
            resSum = $('.test__res-sum'),
            resText = $('.test__res-text');
        let sum = 0;
        let checkArr = [];
        btn.on('click', function (e) {
            checkArr = [];
            let isComplete = 0;
            steps.each(function () {
                checkArr.push(checkAnswers($(this)));

            });
            isComplete = !checkArr.includes(0);
            if (isComplete) {
                sum = getSum();
                getRes(sum);
            }

        });
        reset.on('click', resetTest);
        /**
         * @function getSum
         * @returns {number}
         */
        function getSum() {
            let vars = $('input[type="radio"]:checked');
            vars.each(function (i) {
                sum += +$(this).val();
            });
            return sum;
        }
        /**
         * @function checkAnswers
         * @param {obj} step  
         */
        function checkAnswers(step) {
            let isChecked = 0,
                answers = step.find('input[type="radio"]'),
                notice = step.find('.test__notice');
            answers.each(function (i) {
                if ($(this).prop('checked')) {
                    isChecked++;
                }
                if (0 == isChecked) {
                    notice.css('display', 'block');
                }
                else {
                    notice.css('display', 'none');
                }

            });
            return isChecked;
        }
        /**
         * @function getRes - получаем варианты результатов теста из файла и вызываем printRes
         * @param {number} points 
         */
        function getRes(points) {
            //подгрузка из json файла
            $.getJSON("res.json", function (res) {
                printRes(res.ranges, points);
            })
                .fail(function (e) { console.log(e.status, e.statusText); })
                .done();
        }
        /**
         * @function printRes -выводит на экран результат теста
         * @param {object} obj 
         * @param {number} points 
         */
        function printRes(obj, points) {
            btn.css('display', 'none');
            let answer = '';
            if (points >= 40 && points < 60) {
                answer = obj.a;
            }
            else if (points >= 60 && points < 80) {
                answer = obj.b;
            }
            else {
                answer = obj.c;
            }
            resSum.text(points);
            resText.text(answer);
            resTitle.css('display', 'block');
            resText.css('display', 'block');
            reset.css('display', 'block');
        }
        /**
         * @function resetTest - сбрасывает результаты теста и выбранные ответы
         */
        function resetTest() {
            inputs.each(function (i) {
                $(this).prop('checked', false);
            });
            sum = 0;
            checkArr = [];
            resTitle.css('display', 'none');
            resText.css('display', 'none');
            reset.css('display', 'none');
            btn.css('display', 'block');
            return sum;
        }
    }
    showTestesult();
});