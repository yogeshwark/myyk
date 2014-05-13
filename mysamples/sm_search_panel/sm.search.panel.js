define(["../../src/kendo.ui.core"], function () {
    var templates = {
            filter: "<div><label>Filter: </label><input type='text' id='inputFilter'/></div>",
            connections: "<div><label>Connections: </label><input type='text' id='connections'/></div>",
            panelBar: "<div><div id='panelbar' /></div>",
            popup: "<div id='popup'><div id='list' class='js-dropdownbutton'/></div>"
        },
    //(function($) {
        kendo = window.kendo,
        ui = kendo.ui,
        Widget = ui.Widget,
        SMSearchPanel = Widget.extend({
            // initialization code goes here
            init: function (element, options) {
                Widget.fn.init.call(this, element, options);
                this._create();
            },
            _create: function () {
                var that = this,
                    options = this.options,
                    dataSource = options.dataSource;

                // create popup container and append that to document
                $('body').append($(templates.popup));

                // create a kendo button and add click listener to open drop down popup
                // TODO clear added event listeners
                $(this.element).kendoButton().click(function () {
                    popup.open();
                });

                // create drop down popup
                var popup = $("#popup").kendoPopup({
                    anchor: this.element,
                    close: function() {
                        that.kendoPanelBar.clearSelection();
                    }
                }).data("kendoPopup");

                // create content of drop down popup
                // TODO is it necessary to create list view
                this.listView = $("#list").kendoListView({
                    dataSource: [
                        {value: '1'}
                    ],
                    template: templates.filter + templates.connections + templates.panelBar
                }).data("kendoListView");

                // create panel bar === accordion containing list
                this._panelBar(options);

                // connections drop down list
                this._connectionList(options);

                // create filter listener
                this._filterDataSource(dataSource);
            },

            _panelBar: function (options) {
                var dataSource = options.dataSource,
                    rows = options.rows;
                this.kendoPanelBar = $("#panelbar").kendoMultiSelectPanelBar({
                    dataSource: dataSource,
                    rows: rows,
                    dropTarget: options.dropTarget,
                    drop: options.drop
                }).data('kendoMultiSelectPanelBar');
            },

            _connectionList: function (options) {
                var that = this,
                    connections = options.connections;
                $('#connections').kendoDropDownList({
                    dataTextField: 'text',
                    dataSource: connections,
                    change: function (e) {
                        var value = this.text();
                        dataSource = options.getUpdatedDS(value);
                        that.kendoPanelBar.setDataSource(dataSource);
                        if ($('#inputFilter').val().length > 2) {
                            that._filterData(dataSource);
                        }
                    }
                });
            },

            _filterDataSource: function (dataSource) {
                var dropDownOuterWidth = $('.k-dropdown').outerWidth(),
                    that = this;
                // TODO clear added listeners
                $('#inputFilter').css('margin-left', '40px').outerWidth(dropDownOuterWidth).keyup(function () {
                    if ($(this).val().length > 2) {
                        that._filterData(dataSource);
                    } else {
                        that.kendoPanelBar.setDataSource(dataSource);
                    }
                });
            },

            _filterData: function (newDataSource) {
                var that = this,
                // TODO is this required
                    new1 = JSON.parse(JSON.stringify(newDataSource)),
                    regexp = new RegExp($('#inputFilter').val(), 'i'),
                    filteredDataSource = new1,
                    filterIndex = 0;

                $.each(new1, function (index) {
                    var filteredItems = _.filter(new1[index].items, function (temp) {
                        return temp.text.search(regexp) !== -1
                    });
                    if (filteredItems.length > 0) {
                        filteredDataSource[filterIndex].text = new1[index].text;
                        filteredDataSource[filterIndex].items = filteredItems;
                        filterIndex++;
                    }
                });
                filteredDataSource.length = filterIndex;
                that.kendoPanelBar.setDataSource(filteredDataSource);
            },

            options: {
                name: "SMSearchPanel"
            }
        });
    ui.plugin(SMSearchPanel);
//    })(jQuery);
});
