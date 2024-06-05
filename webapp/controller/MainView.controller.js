sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
function (Controller) {
    "use strict";

    return Controller.extend("poccsnov.controller.MainView", {
        onInit: function () {

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
