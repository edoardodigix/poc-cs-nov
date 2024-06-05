/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"poc-cs-nov/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
