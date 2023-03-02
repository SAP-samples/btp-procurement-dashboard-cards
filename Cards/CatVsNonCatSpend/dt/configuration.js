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
                    "realm": {
                        "manifestpath": "/sap.card/configuration/parameters/realm/value",
                        "type": "string",
                        "translatable": false
                    },                    
                    "fromDate": {
                        "manifestpath": "/sap.card/configuration/parameters/fromDate/value",
                        "type": "string",
                        "translatable": false
                    },                    
                    "target": {
                        "manifestpath": "/sap.card/configuration/parameters/target/value",
                        "type": "string",
                        "translatable": false
                    },
                    "reportingCurrency": {
                        "manifestpath": "/sap.card/configuration/parameters/reportingCurrency/value",
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