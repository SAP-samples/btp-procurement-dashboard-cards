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
                    "cardTitle": {
                        "manifestpath": "/sap.card/configuration/parameters/cardTitle/value",
                        "type": "string",
                        "translatable": false
                    },
                    "redirectURL": {
                        "manifestpath": "/sap.card/configuration/parameters/redirectURL/value",
                        "type": "string",
                        "translatable": false
                    },
                    "imageURL": {
                        "manifestpath": "/sap.card/configuration/parameters/imageURL/value",
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