/**
 * This module was created by the BASEditor
 */
sap.ui.define(["sap/ui/integration/Designtime"], function (
	Designtime
) {
	"use strict";
	return function () {
		return new Designtime({
            "form": {
                "items": {
                    "realm": {
                        "manifestpath": "/sap.card/configuration/parameters/realm/value",
                        "type": "string",
                        "translatable": false
                    },
                    "datacenter": {
                        "manifestpath": "/sap.card/configuration/parameters/datacenter/value",
                        "type": "string",
                        "translatable": false
                    },
                    "searchResult": {
                        "manifestpath": "/sap.card/configuration/parameters/searchResult/value",
                        "type": "integer",
                        "translatable": false
                    },
                    "user": {
                        "manifestpath": "/sap.card/configuration/parameters/user/value",
                        "type": "string",
                        "translatable": false
                    },
                    "statuses": {
                        "manifestpath": "/sap.card/configuration/parameters/statuses/value",
                        "type": "string",
                        "translatable": false
                    }
                }
            },
            "preview": {
                "modes": "Abstract"
            }
        });
	};
});
