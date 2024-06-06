sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/format/DateFormat",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
],
function (Controller, JSONModel, DateFormat, Filter, FilterOperator) {
    "use strict";

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

    return Controller.extend("poccsnov.controller.MainView", {
        
        onInit: function () {
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
                this.getView().byId("table-odv").clearSelection();
            }
            else { 
                oPanel.setVisible(false);
                oTable.setVisible(false);
                this.getView().byId("panel-riferimenti").setVisible(false);
            }
        },

        onSelectRow: function(oEvent) {
            const aIndices = oEvent.getSource().getSelectedIndices();
            const oSelectButton = this.getView().byId("table-odv-btn-seleziona");
            if (aIndices.length > 0)
                oSelectButton.setEnabled(true);
            else
            oSelectButton.setEnabled(false);
        },

        onSelectButtonPress: function() {
            const aRows = this.getView().byId("table-odv").getRows();
            let selectedData = [];
            let newRowCells;
            let newData = {};
            const aIndices = this.getView().byId("table-odv").getSelectedIndices();

            aIndices.forEach((index) => {
                newRowCells = aRows.at(index).getCells();
                newData.number = newRowCells[0].getProperty("text");
                newData.date = newRowCells[1].getProperty("text");
                newData.customerNumber = newRowCells[2].getProperty("text");
                newData.price = newRowCells[3].getProperty("text");
                newData.status = newRowCells[4].getProperty("text");
                selectedData.push(newData);
                newData = {};
            });

            sampleData.selectedData = selectedData;
            this.getView().getModel().setData(sampleData);

            this.getView().byId("table-riferimenti-row-mode").setRowCount(selectedData.length);
            this.getView().byId("panel-riferimenti").setVisible(true);

        },

        onDeleteRiferimentiPress: function(oEvent) {
            const oModel = this.getView().getModel();
            const initialData = oModel.getData();
            let newData = initialData.selectedData;
            const rowToRemove = oEvent.getSource().getParent().getCells()[0].getProperty("text");
            for (let i = 0; i < newData.length; ++i) {
                if (initialData.selectedData[i].number === rowToRemove)
                newData.splice(i, 1);
            }
            sampleData.selectedData = newData;
            oModel.setData(sampleData);
            this.getView().byId("table-riferimenti-row-mode").setRowCount(newData.length);
            if (newData.length === 0)
                this.getView().byId("panel-riferimenti").setVisible(false);
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
