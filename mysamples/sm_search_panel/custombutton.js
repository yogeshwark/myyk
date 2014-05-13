$.widget("custom.custombutton", $.ui.button, {
    options: {
        text: true,
        orientation: 'horizontal'
    },
    _create: function () {
        this._super();
        this.originalCss = {
            width: this.element[0].style.width,
            height: this.element[0].style.height
        };
    },

    _resetButton: function () {
        this._super();
        var options = this.options,
            icons = options.icons,
            elem = this.element,
            icon1;
        if (options.width)
            elem.width(options.width).find(".ui-button-text").addClass("ui-custom-button-text");

        if ((icons.primary || icons.secondary) && options.orientation === "vertical") {
            var iconOnly = !this.options.text;
            elem.removeClass("ui-button-text-icons");
            if (icons.primary) {
                icon1 = elem.find("span:first-child").addClass("center-block");
                if (iconOnly) {
                    icon1.css("margin-top", icon1.height() / 10 + "px");
                    icon1.css("margin-bottom", icon1.height() / 10 + "px");
                    this.element.width(icon1.css('width'));
                    elem.find(".ui-button-text").css('padding', '0px');
                }
            }
            if (icons.secondary) {
                var icon2 = elem.find("span:last-child").addClass("center-block");
                if (iconOnly) {

                    if (icon2.css('width') > icon1.css('width'))
                        this.element.width(icon2.css('width'));
                    elem.find(".ui-button-text").css('padding', '0px');
                }
            }
            elem.find(".ui-button-text").addClass("ui-button-vertical-icons");//.width(options.width);
        } else if ((icons.primary || icons.secondary) && options.orientation !== "vertical") {

            var iconOnly = !this.options.text;
            if (icons.primary) {
                var icon = elem.children("span:first");
                if (!iconOnly) {
                    icon.css("margin-top", "-" + icon.height() / 2 + "px");
                    icon.next().css({"padding-left": icon.width() + 10 + "px"});
                }
            }

            if (icons.secondary) {
                var icon = elem.find("span:last-child");
                if (!iconOnly) {
                    var marginTop = "-" + icon.height() / 2 + "px";
                    icon.css("margin-top", marginTop);
                    elem.find(".ui-button-text").css({"padding-right": icon.width() + 10 + "px"});
                }
            }
        }

        var a = options.width;
        if (((options.label.length) * 10) > a) {
            console.log("in");
            this.element.attr("title", options.label);
            this.element.tooltip({
                position: {
                    my: "right top",
                    at: "right bottom"
                },
                show: {
                    duration: "fast"
                },
                hide: {
                    effect: "hide"
                }
            });
        }
    },
    _destroy: function () {
        //destroys everything that is created , binded or added
        this._super();
        this.element.css(this.originalCss);
    }

});