define(["../../src/kendo.ui.core"], function () {

    var SingleClickMultiSelect = window.kendo.ui.Selectable.extend({
        clear: function(all) {
            if(all) {
                window.kendo.ui.Selectable.fn.clear.call(this);
            }
        }
    });
   // (function ($) {
        var kendo = window.kendo,
            ui = kendo.ui,
            PanelBar = ui.PanelBar,
            SELECTED = 'k-state-selected',
            NS = ".kendoPanelBar",
            keys = kendo.keys,
            extend = $.extend,
            DROP = "drop",
            MultiSelectPanelBar = PanelBar.extend({
                // initialization code goes here
                init: function (element, options) {
                    PanelBar.fn.init.call(this, element, options);
                    this._fixedHeight();
                    this._makeSelectable();

                    this._makeDraggable();
                },

                events: [
                    DROP
                ],

                _fixedHeight: function () {
                    var height = (this.options.rows * parseInt($('.k-panel').css('font-size')) * 2.1).toString();

                    $('li.k-item.k-first').attr('id', 'item1');

                    $('ul.k-panel').height(height).css('overflow-y', 'scroll');
                    if ($('li.k-item.k-first ul').html()) {
                        this.expand($("#item1"));
                    }
                },

                options: {
                    name: "MultiSelectPanelBar"
                },
                _updateSelected: function(link) {
                    var that = this,
                        element = that.element,
                        item = link.parent(".k-item");

                    that._current(item);
                },

                _makeSelectable: function () {
                    var that = this;
                    this.selectable = new SingleClickMultiSelect(this.element, {
                        aria: true,
                        multiple: true,
                        filter: 'ul>li.k-item',
                        change: function () {
                           that._onSelect();
                        }
                    });
                },
                clearSelection: function() {
                    this.selectable.clear(true);
                },
                _makeDraggable: function () {
                    var that = this,
                        options = this.options;
                    that.element.kendoDraggable({
                        filter:'li.k-state-selected',
                        group: 'multi-panel-bar',
                       // distance: 50,
                        hint: function (element) {
                            return that.cloneOfSelected;
                        },
                        dragStart:function () {
                            that.selectable.cancelS
                        }
                    });
                    options.dropTarget || (options.dropTarget = "body");
                    $(options.dropTarget).kendoDropTarget({
                        group: 'multi-panel-bar',
                        drop: function (e) {
                            that.trigger(DROP, extend({}, e, {
                                selected : that.selectable.value()
                            }));
                        }
                    });
                },

                setDataSource: function (dataSource) {
                    var that = this,
                        multi = true;

                    this.options['dataSource'] = dataSource;
                    this._initData(this.options);
                    this._fixedHeight();
                    this._makeSelectable();
                },

                _onSelect: function () {
                    var that = this,
                        temp1 = "";
                    for (i = 0; i < that.selectable.value().length; i++) {
                        temp1 = temp1 + (that.selectable.value())[i].innerText;
                    }
                    this.cloneOfSelected = $("<li class='k-link k-state-selected'/>").text(temp1);
                }
            });
        ui.plugin(MultiSelectPanelBar);
   // })(jQuery);
});