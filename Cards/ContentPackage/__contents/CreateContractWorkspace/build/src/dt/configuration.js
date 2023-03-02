/**
 * This module was created by the BASEditor
 */
sap.ui.define(["sap/ui/integration/Designtime"], function (
    Designtime
) {
    "use strict";
    return function () {
        return new Designtime({
            form: {
                items: {
                    "username": {
                        "manifestpath": "/sap.card/configuration/parameters/username/value",
                        "type": "string",
                        "translatable": false
                    },
                    "realm": {
                        "manifestpath": "/sap.card/configuration/parameters/realm/value",
                        "type": "string",
                        "translatable": false
                    },
                    "currency": {
                        "manifestpath": "/sap.card/configuration/parameters/currency/value",
                        "type": "string",
                        "translatable": false
                    },
                    "templateId": {
                        "manifestpath": "/sap.card/configuration/parameters/templateId/value",
                        "type": "string",
                        "translatable": false
                    },
                    "datacenter": {
                        "manifestpath": "/sap.card/configuration/parameters/datacenter/value",
                        "type": "string",
                        "translatable": false
                    },
                    "suppliers": {
                        "manifestpath": "/sap.card/configuration/parameters/suppliers/value",
                        "type": "string",
                        "translatable": false
                    },
                    "commodities": {
                        "manifestpath": "/sap.card/configuration/parameters/commodities/value",
                        "type": "string",
                        "translatable": false
                    }
                
                }
            },
            preview: {
                modes: "Abstract"
            }
        });
    };
});