sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/format/DateFormat",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
],
function (Controller, JSONModel, DateFormat, Filter, FilterOperator) {
    "use strict";

    return Controller.extend("poccsnov.controller.MainView", {
        onInit: function () {
            const oDateFormat = DateFormat.getDateInstance({pattern: "dd/MM/yyyy", UTC: true});
            const sampleData = {
                'data': 
                    [
                        {
                            'number': '1030065784',
                            'date': oDateFormat.format(new Date('2023-09-19T00:00:00.000Z')),
                            'customerNumber': '4500112408',
                            'price': '65.500',
                            'status': 'C' 
                        },
                        {
                            'number': '1030063114',
                            'date': oDateFormat.format(new Date('2023-04-18T00:00:00.000Z')),
                            'customerNumber': '4500117678',
                            'price': '80.000',
                            'status': 'C' 
                        },
                        {
                            'number': '1030066144',
                            'date': oDateFormat.format(new Date('2023-10-06T00:00:00.000Z')),
                            'customerNumber': '4500110017',
                            'price': '74.414',
                            'status': 'C' 
                        },
                        {
                            'number': '1030066277',
                            'date': oDateFormat.format(new Date('2023-10-12T00:00:00.000Z')),
                            'customerNumber': '4500110263',
                            'price': '73.476',
                            'status': 'C' 
                        }
                    ]
            };
            const oJSONModel = new JSONModel(sampleData);

            this.getView().byId("table-odv-row-mode").setRowCount(oJSONModel.getData().data.length);

            this.getView().setModel(oJSONModel);
        },

        onSelectChange: function (oEvent) {
            const oPanel = this.getView().byId("panel-filtri");
            const oTable = this.getView().byId("table-odv-vbox");

            if (oEvent.getParameter("selectedItem").getProperty("text") == 'Ordine di vendita') {
                oPanel.setVisible(true);
                oTable.setVisible(true);
            }
            else { 
                oPanel.setVisible(false);
                oTable.setVisible(false);
            }
        },

        onDateChange: function (oEvent) {
            // let sFrom = oEvent.getParameter("from").toJSON().split('T')[0];
            // let sTo = oEvent.getParameter("to").toJSON().split('T')[0];
            // this._oGlobalFilter = null;

            // console.log("STOP");

            // if (sFrom && sTo) {
            //     this._oGlobalFilter= new Filter({path: "date", operator: FilterOperator.BT, value1: sFrom, value2: sTo});
            // }

            // this._filter();
        },

        // FILTERS UTILITY FUNCTIONS

        _filter: function() {
            // let oFilter = null;

            // if (this._oGlobalFilter) {
            //     oFilter = this._oGlobalFilter;
            // }

            // this.byId("table-odv").getBinding().filter(oFilter, "Application")
        },
    });
});
