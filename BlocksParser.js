/*!
    BlocksParser v0.1 beta
    (c) 2016 Korchevskiy Evgeniy (aka ReSLeaR-)
    ---
    vk.com/reslear | upost.su | github.com/reslear
    @license Released under the MIT License.
*/


// data-bc

;(function() {

    'user strict';

    // Constructor
    this.BlocksParser = function(selector) {

        this.SELECTOR = selector;
        this.BLOCK = null;

        this.init();
    };



    BlocksParser.prototype.init = function() {

        if (!this.SELECTOR) {return;}

        this.BLOCK = document.querySelector(this.SELECTOR);
        if (!this.BLOCK) {return;}

        render.init(this.BLOCK);
        initEvents.call(this);
        this.BLOCK.classList.add('blocks-parser');
    };

    BlocksParser.prototype.get = function() {

    };

    // Private
    var thisParent = function(el) {
        return el.parentNode.classList.contains('blocks-parser') ? el : el.parentNode;
    };

    var events = {
        blur: function() {
            thisParent(this).classList.remove('bm-focus');
        },
        focus: function() {
            thisParent(this).classList.add('bm-focus');
        },
        keydown: function(event) {

            var el = thisParent(this);

            if ( el.dataset.bmTag && el.dataset.bmTag === 'code' ) {

                if (event.keyCode === 9) {
                    document.execCommand('insertHTML', false, '&#009');
                    event.preventDefault();
                }
            }
        }
    };

    function initEvents() {

        var editable = this.BLOCK.querySelectorAll('[contenteditable]');

        [].forEach.call(editable, function(item) {

            for (var key in events) {
                item.addEventListener(key, events[key]);
            }

        });
    }


    // Функция парсинга элементов
    var render = {

        recursive: function(item) {

            var child = document.createElement('div');
                child.setAttribute('contenteditable', '');
                child.classList.add('bm-child');

            if (item.nodeType === 3) {

                if ( !item.textContent.trim().length ) {
                    return false;
                }

                child.dataset.bmText = '';

                child.innerHTML = item.textContent;
                item.parentNode.replaceChild(child, item);

            } else if (item.nodeType === 1) {

                // выходим, если уже прорисовали или узел игнорный
                if ( item.dataset.hasOwnProperty('bmRender') || item.dataset.hasOwnProperty('bmIgnore') ) {
                    return;
                }

                if (item.children.length) {

                    render.init(item);
                } else {

                    child.innerHTML = item.innerHTML;
                    item.innerHTML = child.outerHTML;
                }


                item.dataset.bmTag = item.tagName.toLowerCase();
                item.dataset.bmRender = '';
            }

        },

        init: function(parent) {

            // начать перебор всех потомков
            [].forEach.call(parent.childNodes, render.recursive);
        }

    };


    // Private fx
    function extend(obj1, obj2) {
        for (var key in obj2) {
            obj1[key] = obj2[key];
        }
        return obj1;
    }

})();
