sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/format/DateFormat"
],
function (Controller, JSONModel, DateFormat) {
    "use strict";

    return Controller.extend("poccsnov.controller.MainView", {
        
        onInit: function () {

        },

        onSelectChange: function (oEvent) {
            const requestedView = oEvent.getSource().getSelectedItem().getText();
            if (requestedView === 'Ordine di vendita') {
                this.getView().byId("odv-view").setVisible(true);
                this.getView().byId("doccon-view").setVisible(false);
            }
            else {
                this.getView().byId("doccon-view").setVisible(true);
                this.getView().byId("odv-view").setVisible(false);
            }
        },

    });
});
