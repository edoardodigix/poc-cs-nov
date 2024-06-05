sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/format/DateFormat"
],
function (Controller, JSONModel, DateFormat) {
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
                        }
                    ]
            };
            const oJSONModel = new JSONModel(sampleData);

            this.getView().byId("table-odv-row-mode").setRowCount(oJSONModel.getData().data.length);

            this.getView().setModel(oJSONModel);
        },

        onSelectChange: function (oEvent) {
            const oPanel = this.getView().byId("panel-filtri");

            console.log("STOP");

            if (oEvent.getParameter("selectedItem").getProperty("text") == 'Ordine di vendita')
                oPanel.setVisible(true);
            else 
                oPanel.setVisible(false);
        }
    });
});
