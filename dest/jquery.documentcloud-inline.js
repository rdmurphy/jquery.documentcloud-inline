/* jquery.documentcloud-inline - 0.0.1 2013-10-07 */
(function($, window, document, undefined) {
    var pluginName = "documentCloudInline";
    var version = "0.0.1";
    var defaults = {
        documentAttribute: "document",
        noteAttribute: "note",
        attachTo: "body"
    };
    function PopupContainer(options) {
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this._version = version;
        this.init();
    }
    function Popup(element, options, popupContainer) {
        this.el = element;
        this.$el = $(element);
        this.popupContainer = popupContainer;
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this._version = version;
        this.init();
    }
    PopupContainer.prototype = {
        init: function() {
            $(this.settings.attachTo).append('<div class="dc-note-popup" id="dc-note-popup">&nbsp;</div>');
            this.popupContainer = $("#dc-note-popup");
            this.setCloseEvent();
        },
        getContainer: function() {
            return this.popupContainer;
        },
        setCloseEvent: function() {
            var container = this.popupContainer;
            $(document).keyup(function(e) {
                if (e.which === 27) {
                    container.hide();
                }
            });
        }
    };
    Popup.prototype = {
        containerTemplate: function() {
            return '<div id="DC-note-' + this.note_id + '" class="DC-note-container">';
        },
        dcUrlTemplate: function() {
            return "http://www.documentcloud.org/documents/" + this.doc_id + "/annotations/" + this.note_id + ".js";
        },
        init: function() {
            this.doc_id = this.$el.data(this.settings.documentAttribute);
            this.note_id = this.$el.data(this.settings.noteAttribute);
            this.$el.on("click", $.proxy(this.load, this));
        },
        load: function(e) {
            e.preventDefault();
            this.popupContainer.html(this.containerTemplate());
            dc.embed.loadNote(this.dcUrlTemplate(), {
                afterLoad: $.proxy(this.postLoad, this)
            });
        },
        postLoad: function() {
            this.popupContainer.show();
            var topOffset = this.$el.offset().top - $(".DC-note-container").height() - 30;
            var bottomOffset = this.$el.offset().top;
            var leftOffset = this.$el.offset().left + this.$el.width() / 2 - this.popupContainer.width() / 2;
            this.popupContainer.offset({
                top: topOffset > 0 ? topOffset : bottomOffset,
                left: leftOffset > 0 ? leftOffset : 10
            });
            $(".DC-note").append('<div class="close-prompt">Close</div>');
            $(".DC-note-contents a").attr("target", "_blank");
            $("body, .close-prompt").on("click", $.proxy(this.close, this));
            this.scrollHandler();
        },
        close: function() {
            this.popupContainer.hide();
        },
        scrollHandler: function() {
            var top = $(document).scrollTop();
            var noteTop = this.popupContainer.offset().top - 10;
            if (top > noteTop) {
                $("html, body").animate({
                    scrollTop: noteTop
                }, 150);
            }
        }
    };
    $.fn[pluginName] = function(options) {
        var popupContainer = new PopupContainer(options);
        var container = popupContainer.getContainer();
        return this.each(function() {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Popup(this, options, container));
            }
        });
    };
})(jQuery, window, document);