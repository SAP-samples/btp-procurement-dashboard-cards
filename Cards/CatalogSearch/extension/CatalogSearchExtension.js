sap.ui.define(["sap/ui/integration/Extension"], function (Extension) {
	"use strict";

	var CatalogSearchExtension = Extension.extend("sap.ariba.CatalogSearch");

	CatalogSearchExtension.prototype.init = function () {
		Extension.prototype.init.apply(this, arguments);
		this.attachAction(this._handleAction.bind(this));
	};

	/* Custom event handler for the submit event.
	Intercepts submit action, performs validation and/or data modifications. */
	CatalogSearchExtension.prototype._handleAction = function (oEvent) {
        var oCard = this.getCard(),
			mParams = oEvent.getParameter("parameters"),
            mSubmitData = mParams.data;
        var datacenter = oCard.getCombinedParameters().datacenter,
            realm = oCard.getCombinedParameters().realm;
            
        if(mSubmitData.CatSearch != undefined)  {
            window.open(`http://${realm}.procurement${datacenter}.ariba.com/ad/catalogSearch/ariba.htmlui.procure.portlets.CatalogPortletDirectAction?Keywords=` + mSubmitData.CatSearch);
        }
	};

	return CatalogSearchExtension;
});