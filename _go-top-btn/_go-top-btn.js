window.addEventListener('DOMContentLoaded', function () {
    // =================================================
    function goTopBtn() {
        let goTopBtn = document.querySelector('.go-top-btn-3');
        // let body = document.querySelector('body');

        document.addEventListener('scroll', (e) => {
            let scrollFromTop = window.scrollY;
            let vh = window.innerHeight + 10;
            if (scrollFromTop >= vh) {
                goTopBtn.classList.add('fade-in');
            } else if (scrollFromTop < vh) {
                goTopBtn.classList.remove('fade-in');
            }

        });
        goTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scroll({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
        });
    }

    goTopBtn();

    // =================================================
});

