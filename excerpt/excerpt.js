window.addEventListener('DOMContentLoaded', function () {
    function toggleText(blockSelector, triggerSelector, mode = 'par', num = 1) {
        const textBlocks = document.querySelectorAll(blockSelector),
            triggers = document.querySelectorAll(triggerSelector);
        textBlocks.forEach(function (block, i) {
            switch (mode) {
                case 'par':
                    hidePars(block, num);
                    break;
                case 'line':
                    hideLines(block, num);
                    break;
                case 'word':
                    hideWords(block, num);
                    break;
            }
        });
        triggers.forEach(function (btn, i) {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                let targetText = btn.previousElementSibling;
                if (btn.classList.contains('opened')) {
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
                    btn.classList.remove('opened');
                    btn.textContent = 'Read more';
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
                    btn.classList.add('opened');
                    btn.textContent = 'Close';
                }

            });
        });

        function hidePars(block, num) {
            let h = 0,
                paragraphs = block.querySelectorAll('p');
            paragraphs.forEach(function (par, i) {
                if (i < num) {
                    h += par.offsetHeight;
                    block.style.maxHeight = h + "px";
                }
            });
        }
        function showPars(block) {
            block.style.maxHeight = block.scrollHeight * 2 + "px";
        }
        function hideWords(block, num) {

            if (block.children.length > 0) {
                let clone = block.firstElementChild.cloneNode(),
                    cloneText = block.firstElementChild.textContent.replace(/\s+/g, ' ').split(' ').slice(0, num).join(' ') + '...';
                clone.textContent = cloneText;
                clone.classList.add('clone');
                block.prepend(clone);
                block.style.maxHeight = clone.offsetHeight + "px";

            }
            else {
                let clone = block.cloneNode(),
                    blockParent = block.parentElement,
                    text = block.textContent.replace(/\s+/g, ' ').split(' ').slice(0, num).join(' ') + '...';
                clone.textContent = text;
                clone.classList.add('clone');
                blockParent.insertBefore(clone, block);
                block.style.display = 'none';
            }
        }
        function showWords(block) {
            if (block.children.length > 0) {
                block.querySelector('.clone').remove();
                block.style.maxHeight = '';
            }
            else {
                if (block.previousElementSibling.classList.contains('clone')) {
                    block.previousElementSibling.remove();
                }

                block.style.display = 'block';
            }
        }
        function hideLines(block, num) {
            if (block.children.length > 0) {
                let first = block.firstElementChild,
                    newHeight = parseInt(window.getComputedStyle(first)['line-height']) * num;
                block.style.maxHeight = newHeight + "px";
                setTimeout(function () {
                    first.classList.add('truncated');
                    first.setAttribute('style', `-webkit-line-clamp: ${num};`);
                }, 600);/**та же продолжительность что у transition */

            } else {
                let newHeight = parseInt(window.getComputedStyle(block)['line-height']) * num;
                block.classList.add('truncated');
                block.style = `-webkit-line-clamp: ${num}; max-height: ${newHeight}px;`;
            }
        }
        function showLines(block) {
            if (block.children.length > 0) {
                if (block.firstElementChild.classList.contains('truncated')) {
                    block.firstElementChild.classList.remove('truncated');
                    block.firstElementChild.removeAttribute('style');
                    block.style.maxHeight = block.scrollHeight + "px";
                }
            } else {
                block.style.maxHeight = '';
                block.classList.remove('truncated');
                block.style = `-webkit-line-clamp: 9999; max-height: ${block.scrollHeight}px;`;

            }
        }
    }
    toggleText('.review__text', '.review__trigger', 'par', 1);
});
