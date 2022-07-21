window.addEventListener('DOMContentLoaded', function () {
    function showTestesult() {
        const steps = document.querySelectorAll('.test__step'),
            inputs = document.querySelectorAll('input[type="radio"]'),
            btn = document.querySelector('.test__res-btn'),
            reset = document.querySelector('.test__reset'),
            resTitle = document.querySelector('.test__res-title'),
            resSum = document.querySelector('.test__res-sum'),
            resText = document.querySelector('.test__res-text');
        let sum = 0;
        let checkArr = [];
        btn.addEventListener('click', function (e) {
            checkArr = [];
            let isComplete = 0;
            steps.forEach(function (step, i) {
                checkArr.push(checkAnswers(step));
            });
            isComplete = !checkArr.includes(0);
            if (isComplete) {
                sum = getSum();
                getRes(sum);
            }
        });
        reset.addEventListener('click', function (e) {
            resetTest();
        });
        /**
         * @function getSum - считает очки
         * @returns {number}
         */
        function getSum() {
            let vars = document.querySelectorAll('input[type="radio"]:checked');
            vars.forEach(function (el, i) {
                sum += +el.value;
            });

            return sum;
        }
        /**
         * @function checkAnswers - проверяет, на все ли вопросы выбран ответ
         * @param {obj} step  
         */
        function checkAnswers(step) {
            let isChecked = 0,
                answers = step.querySelectorAll('input[type="radio"]'),
                notice = step.querySelector('.test__notice');
            answers.forEach(function (el, i) {
                if (el.checked) {
                    isChecked++;
                }
                if (0 == isChecked) {
                    notice.style.display = 'block'
                }
                else {
                    notice.style.display = 'none';
                }

            });
            return isChecked;
        }
        /**
         * @function getRes - получаем варианты результатов теста из файла и вызываем printRes
         * @param {number} points 
         */
        function getRes(points) {
            // получаем данные методом fetch
            // getDataFetch('res.json')
            //     .then(function (res) {printRes(res.ranges, points);})
            //     .catch(function (error) {console.log(error);});


            // получаем данные методом XMLHttpRequest
            const req = new XMLHttpRequest();
            req.open('GET', 'res.json', true);
            req.onload = function () {
                if (req.status >= 200 && req.status < 400) {
                    let res = JSON.parse(this.response);
                    printRes(res.ranges, points);
                } else {
                    console.log("Ошибка сервера. Номер: " + req.status);
                }
            };
            req.onerror = function (e) { console.log("Ошибка отправки запроса " + e); }
            req.send();
        }
        /**
         * @function printRes -выводит на экран результат теста
         * @param {object} obj 
         * @param {number} points 
         */
        function printRes(obj, points) {
            btn.style.display = 'none';
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

            resSum.textContent = points;
            resText.textContent = answer;
            resTitle.style.display = 'block';
            resText.style.display = 'block';
            reset.style.display = 'block';
        }
        /**
         * @function resetTest - сбрасывает результаты теста и выбранные ответы
         */
        function resetTest() {
            inputs.forEach(function (el, i) {
                el.checked = false;
            });
            sum = 0;
            checkArr = [];
            resTitle.style.display = 'none';
            resText.style.display = 'none';
            reset.style.display = 'none';
            btn.style.display = 'block';
            return sum;
        }
    }

    showTestesult();
});
