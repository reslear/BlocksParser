/*!
    BlockParser v0.1 beta
    (c) 2016 Korchevskiy Evgeniy (aka ReSLeaR-)
    ---
    vk.com/reslear | upost.su | github.com/reslear
    @license Released under the MIT License.
*/


 // data-bc

;(function() {

    'user strict';

    // Constructor
    window.BlockParser = function(selector) {

        if( !selector ) {
            throw 'Unknown block selector';
        }

        this.SELECTOR = selector;
        this.BLOCK = document.querySelector( selector );

        render.init.call( this.BLOCK );
        events.init.call( this.SELECTOR );
    };

    // Public
    BlockParser.prototype.get = function(){

    };


    // Private

    var events = {

        list: {
            blur: function() {
                var el = this.parentNode.classList.contains('block-parser') ? this : this.parentNode;
                el.removeAttribute('bm-focus');

            },
            focus: function(){
                var el = this.parentNode.classList.contains('block-parser') ? this : this.parentNode;
                el.setAttribute('bm-focus','');

            },
            keydown: function( event ) {

                if( this.getAttribute('bm-tag') == 'code' ) {

                    if( event.keyCode == 9 ){
                        document.execCommand('insertHTML', false, '&#009');
                        event.preventDefault();
                    }
                }

            }
        },

        init: function( selector ) {

            var editable = document.querySelectorAll( selector + ' [contenteditable]');
            var eventsList = this.list;

            [].forEach.call(editable, function(item) {

                for(var key in eventsList ) {
                    item.addEventListener(key, eventsList[key]);
                }

            });


        }
    };


     // Функция парсинга элементов
    var render = {

        addEditable: function(){

        },

        recursive: function( item ){

            if( item.nodeType === 3 ) {

                if( !item.textContent.trim().length ) {
                    return false;
                }


                var child = document.createElement('div');
                child.innerHTML = item.textContent;
                setAttributes(child, {contenteditable: '', 'class': 'bm-child' });

                item.parentNode.replaceChild(child, item);
                console.log(item);

            }

            if( item.nodeType === 1 ) {

            // выходим, если уже прорисовали или узел игнорный
            if( item.getAttribute('bm_render') === '' || item.getAttribute('bm_ignore') === '' ){
                return;
            }

            if( item.children.length ) {

                render.init( item );

                setAttributes(item, { bm_parent : '' });

            } else {

                var child = document.createElement('div');

                child.innerHTML = item.innerHTML;

                setAttributes(child, {contenteditable: '', 'class': 'bm-child' });



                item.innerHTML = child.outerHTML;

            }

            setAttributes(item, { bm_render : '', bm_tag : item.tagName.toLowerCase()  });

            }

        },

        init: function( parent ){

            // начать перебор всех потомков
            [].forEach.call(parent.childNodes, render.recursive );
        }

    };


    // Private fx
    function setAttributes(el, attrs) {
        for(var key in attrs) {
            el.setAttribute(key, attrs[key]);
        }
    }

    function extend(obj1, obj2) {
        for(var key in obj2) {
            obj1[key] = obj2[key];
        }
        return obj1;
    }

})();
