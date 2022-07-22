$(document).ready(function () {
    function toggleText(blockSelector, triggerSelector, mode = 'par', num = 1) {
        const textBlocks = $(blockSelector),
            triggers = $(triggerSelector);
        textBlocks.each(function (i) {
            switch (mode) {
                case 'par':
                    hidePars($(this), num);
                    break;
                case 'line':
                    hideLines($(this), num);
                    break;
                case 'word':
                    hideWords($(this), num);
                    break;
            }
        });

        triggers.each(function (i) {
            let btn = $(this);
            btn.on('click', function (e) {
                e.preventDefault();
                let targetText = btn.prev();
                if (btn.hasClass('opened')) {
                    switch (mode) {
                        case 'par':
                            hidePars(targetText, num);
                            break;
                        case 'line':
                            hideLines(targetText, num);
                            break;
                        case 'word':
                            hideWords(targetText, num);
                            break;
                    }
                    btn.removeClass('opened');
                    btn.text('Read more');
                }
                else {
                    switch (mode) {
                        case 'par':
                            showPars(targetText);
                            break;
                        case 'line':
                            showLines(targetText, i);
                            break;
                        case 'word':
                            showWords(targetText, i);
                            break;
                    }
                    btn.addClass('opened');
                    btn.text('Close');
                }
            });
        });

        function hidePars(block, num) {
            let h = 0,
                paragraphs = block.find('p');
            paragraphs.each(function (i) {
                if (i >= num) {
                    $(this).css('display', 'none');
                }

            });
        }
        function showPars(block) {
            block.find('p').css('display', 'block');
        }
        function hideWords(block, num) {
            if (block.children().length > 0) {
                console.log(block.children().first());
                let cloneText = '';
                if (block.children().first().hasClass('clone')) {
                    cloneText = block.children().first().text();
                }
                else {
                    cloneText = block.children().first().text().replace(/\s+/g, ' ').split(' ').slice(0, num).join(' ') + '...';
                    let clone = block.children().first().clone();
                    clone.text(cloneText);
                    clone.addClass('clone');
                    block.prepend(clone);
                }
                block.children().each(function (i) {
                    if (0 < i) {
                        $(this).css('display', 'none');
                    }
                });

            }
            else {
                let clone = block.clone();
                cloneText = block.text().replace(/\s+/g, ' ').split(' ').slice(0, num).join(' ') + '...';
                clone.text(cloneText);
                clone.addClass('clone');
                block.before(clone);
                if (!block.hasClass('clone')) {
                    block.css('display', 'none');
                }
            }
        }
        function showWords(block, i) {
            if (block.children().length > 0) {
                if (block.children().first().hasClass('clone')) {
                    block.children().first().remove();
                }
                block.children().each(function (i) {
                    $(this).css('display', 'block');
                });
            }
            else {
                if (block.prev('clone')) {
                    block.prev().remove();
                }
                block.css('display', 'block');
            }
        }
        function hideLines(block, num) {
            let first = block.children().first();
            if (block.children().length > 0) {
                let newHeight = parseInt(first.css('line-height')) * num;
                block.css('max-height', newHeight + 'px');
                setTimeout(function () {
                    first.addClass('truncated');
                    first.attr('style', `-webkit-line-clamp: ${num};`);
                }, 600);/**та же продолжительность что у transition */
            }
            else {
                let newHeight = parseInt(block.css('line-height')) * num;
                block.addClass('truncated');
                block.attr('style', `-webkit-line-clamp: ${num}; max-height:${newHeight}px`);
            }
        }
        function showLines(block, i) {
            if (block.children().length > 0) {
                if (block.children().first().hasClass('truncated')) {
                    block.children().first().removeClass('truncated');
                    block.children().first().removeAttr('style');
                    block.css('max-height', '');
                }
            }
            else {
                block.removeClass('truncated');
                block.attr('style', `-webkit-line-clamp: 9999; max-height: none`);
            }
        }
    }
    toggleText('.review__text', '.review__trigger', 'line', 3);
});