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
                        "report": {
                        "manifestpath": "/sap.card/configuration/parameters/report/value",
                        "type": "string",
                        "translatable": false
                    },
                }
            },
            preview: {
                modes: "Abstract"
            }
        });
    };
});