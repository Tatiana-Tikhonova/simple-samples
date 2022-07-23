$(document).ready(function () {
    function showTimer(elemId, endtime) {
        const timer = $(elemId);
        /**
         * получаем время до полуночи (00:00:00) конечной даты в сек
         * уточнять полночь надо чтобы не получить время по гринвичу
         */
        let time = parseInt((new Date(endtime + ' 00:00:00').getTime() - new Date().getTime()) / 1000);

        /**
         * @function getUnit - принимает число (секунды) и возвращает массив, который содержит значения часов, минут, секунд
         * @param {*} time 
         * @returns 
         */
        function getUnit(time) {
            let days = parseInt(time / 86400);
            if (days < 10) {
                days = '0' + days;
            }
            let hours = parseInt((time % 86400) / 3600);
            if (hours < 10) {
                hours = '0' + hours;
            }
            let minutes = parseInt(((time % 86400) % 3600) / 60);
            if (minutes < 10) {
                minutes = '0' + minutes;
            }

            let seconds = time % 60;
            if (seconds < 10) {
                seconds = '0' + seconds;
            }
            return [days, hours, minutes, seconds];
        }
        /**
         * @function addEndings - принимает единицу времени и варианты с окончаниями, возвращает правильный вариант
         * @param {*} t 
         * @param {*} variants 
         * @returns 
         */
        function addEndings(t, variants) {
            var t0 = t % 10;

            if (t > 4 && t < 21) {
                return variants[0];
            } else if (t0 == 1) {
                return variants[1];
            } else if (t0 > 1 && t0 < 5) {
                return variants[2];
            } else {
                return variants[0];
            }
        }
        setInterval(function () {
            let unit = getUnit(time);
            if (time >= 0) {
                $('[data-timer="day-num"]').text(unit[0]);
                $('[data-timer="day-text"]').text(addEndings(unit[0], ['дней', 'день', 'дня']));
                $('[data-timer="hour-num"]').text(unit[1]);
                $('[data-timer="hour-text"]').text(addEndings(unit[1], ['часов', 'час', 'часа']));
                $('[data-timer="min-num"]').text(unit[2]);
                $('[data-timer="min-text"]').text(addEndings(unit[2], ['минут', 'минута', 'минуты']));
                $('[data-timer="sec-num"]').text(unit[3]);
                $('[data-timer="sec-text"]').text(addEndings(unit[3], ['секунд', 'секунда', 'секунды']));

            }
            time--;
        }, 1000);
    }
    showTimer('#timer', '2022-07-24');
});