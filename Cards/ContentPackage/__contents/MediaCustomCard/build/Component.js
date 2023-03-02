sap.ui.define(['sap/ui/core/UIComponent'],
	function(UIComponent) {
	"use strict";

	var Component = UIComponent.extend("sap.ariba.MediaCustomCard", {

		metadata : {
			manifest: "json"
        },
         onCardReady: function (oCard) {
            // Holds the card for use inside the controller
			this.card = oCard;
        }
	});

	return Component;

});
