sap.ui.define([
	"sap/m/MessageToast",
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function (MessageToast, Controller, JSONModel) {
	"use strict";

	return Controller.extend("sap.ariba.MediaCustomCard.Card", {
		onInit: function () {
            var imageURL = this.getOwnerComponent().card.getCombinedParameters().imageURL;
            var oImgModel = new JSONModel({
                Image : imageURL
            });
            this.getView().setModel(oImgModel, "images");
        },
        
        onAction: function() {
            var redirectURL = this.getOwnerComponent().card.getCombinedParameters().redirectURL;
            sap.m.URLHelper.redirect(redirectURL, true);
        }
	});
});