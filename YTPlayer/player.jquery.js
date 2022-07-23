$(document).ready(function () {
    function addVideoPlayer() {
        const btns = $('.triggers__item'),
            overlay = $('.overlay'),
            close = overlay.find('.overlay__close-btn');
        let player;
        function createPlayer(id) {
            player = new YT.Player('player', {
                height: '100%',
                width: '100%',
                videoId: `${id}`
            });
            overlay.css('display', "flex");
            return player;
        }
        btns.each(function () {
            $(this).on('click', function (e) {
                if (player) {
                    player.destroy();
                }
                createPlayer($(this).attr('data-video-id'));
            });
        })
        close.on('click', function (event) {
            overlay.css('display', "none");
            player.pauseVideo();
        });
    }
    addVideoPlayer();
});