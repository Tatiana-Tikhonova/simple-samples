window.addEventListener('DOMContentLoaded', function () {
    function addVideoPlayer() {
        const btns = document.querySelectorAll('.triggers__item'),
            overlay = document.querySelector('.overlay'),
            close = overlay.querySelector('.overlay__close-btn');
        let player;
        function createPlayer(id) {
            player = new YT.Player('player', {
                height: '100%',
                width: '100%',
                videoId: `${id}`
            });
            overlay.style.display = "flex";
            return player;
        }

        btns.forEach(function (btn) {
            btn.addEventListener('click', function (e) {
                if (player) {
                    player.destroy();
                }
                createPlayer(btn.getAttribute('data-video-id'));
            });
        });
        close.addEventListener('click', function (e) {
            overlay.style.display = "none";
            player.pauseVideo();
        });

    }
    addVideoPlayer();
});