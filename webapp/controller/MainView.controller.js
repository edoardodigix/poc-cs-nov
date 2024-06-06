sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/format/DateFormat",
    "sap/m/MessageBox"
],
function (Controller, JSONModel, DateFormat, MessageBox) {
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
                this.getView().byId("table-odv").clearSelection();
            }
            else { 
                oPanel.setVisible(false);
                oTable.setVisible(false);
                this.getView().byId("panel-riferimenti").setVisible(false);
                this.getView().byId("filtri-btn").setEnabled(true);
            }
        },

        onReset: function () {
            this.getView().byId("filtri-input-n-odv").setValue('');
            this.getView().byId("filtri-input-n-oda").setValue('');
            this.getView().byId("filtri-date").setDateValue(null);
            this.getView().byId("filtri-date").setSecondDateValue(null);

            this.getView().byId("table-odv-vbox").setVisible(false);
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

            // sampleData.selectedData = selectedData;
            const beforeData = this.getView().getModel().getData().data;
            this.getView().getModel().setData({'data': beforeData, 'selectedData': selectedData});

            this.getView().byId("table-riferimenti-row-mode").setRowCount(selectedData.length);
            this.getView().byId("panel-riferimenti").setVisible(true);
            this.getView().byId("filtri-btn").setEnabled(false);

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
            const beforeData = this.getView().getModel().getData().selectedData;
            this.getView().getModel().setData({'data': initialData.data, 'selectedData': beforeData});
            this.getView().byId("table-riferimenti-row-mode").setRowCount(newData.length);
            if (newData.length === 0)
                this.getView().byId("panel-riferimenti").setVisible(false);
                this.getView().byId("filtri-btn").setEnabled(true);
        },

        onCerca: function() {
            const aFilters = {
                'number': this.getView().byId("filtri-input-n-odv").getProperty('value'),
                'customerNumber': this.getView().byId("filtri-input-n-oda").getProperty('value'),
                'date1': this.getView().byId("filtri-date").getProperty("dateValue"),
                'date2': this.getView().byId("filtri-date").getProperty("secondDateValue")
            };
            console.log("SS")
            if (aFilters.number.length == 0 && aFilters.customerNumber.length == 0 && aFilters.date1 == null && aFilters.date2 == null) {
                MessageBox.warning("Popola almeno un filtro!");
                return;
            }
            const initialData = sampleData.data;
            let myDate;
            let newData = [];
            let numberFilteredData, customerNumberFilteredData, dateFilteredData;
            if (!aFilters.number == false)
                numberFilteredData = initialData.filter((row) => row.number == aFilters.number);
            if (!aFilters.customerNumber == false)
                customerNumberFilteredData = initialData.filter((row) => row.customerNumber == aFilters.customerNumber);
            if (!aFilters.date1 == false) {
                dateFilteredData = initialData.filter((row) => {
                    myDate = (new Date(row.date.split('/')[2]+'-'+row.date.split('/')[1]+'-'+row.date.split('/')[0])).getTime();
                    return aFilters.date1.getTime() <= myDate && myDate <= aFilters.date2.getTime();
                });
            }
            if (!numberFilteredData == false && !customerNumberFilteredData == false && !dateFilteredData == false)
                newData = numberFilteredData.filter((row) => customerNumberFilteredData.includes(row) && dateFilteredData.includes(row));
            else if (!numberFilteredData == false && !customerNumberFilteredData == false)
                newData = numberFilteredData.filter((row) => customerNumberFilteredData.includes(row));
            else if (!numberFilteredData == false && !dateFilteredData == false)
                newData = numberFilteredData.filter((row) => dateFilteredData.includes(row));
            else if (!customerNumberFilteredData == false && !dateFilteredData == false)
                newData = customerNumberFilteredData.filter((row) => dateFilteredData.includes(row));
            else if (!numberFilteredData == false)
                newData = numberFilteredData;
            else if (!customerNumberFilteredData == false)
                newData = customerNumberFilteredData;
            else if (!dateFilteredData == false)
                newData = dateFilteredData;
            else
                newData = sampleData.data;
            this.getView().getModel().setData({'data': newData});
            this.getView().byId("table-odv-vbox").setVisible(true);
            this.getView().byId("table-odv").clearSelection();
            this.getView().byId("table-odv-row-mode").setRowCount(newData.length || 1);
        }
    });
});
