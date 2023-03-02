sap.ui.define(["sap/ui/integration/Extension"], function (Extension) {
	"use strict";

	var GBCatalogSearchExtension = Extension.extend("sap.ariba.GBCatalogSearch");

	GBCatalogSearchExtension.prototype.init = function () {
		Extension.prototype.init.apply(this, arguments);
		this.attachAction(this._handleAction.bind(this));
	};

	/* Custom event handler for the submit event.
	Intercepts submit action, performs validation and/or data modifications. */
	GBCatalogSearchExtension.prototype._handleAction = function (oEvent) {
        var oCard = this.getCard(),
			mParams = oEvent.getParameter("parameters"),
            mSubmitData = mParams.data;
        var datacenter = oCard.getCombinedParameters().datacenter,
            realm = oCard.getCombinedParameters().realm;
        
        if(mSubmitData.CatSearch != undefined)  {
            window.open(`https://s1${datacenter}.ariba.com/gb/search-results/${mSubmitData.CatSearch}?facets=&realm=${realm}`);       
			
		}
	};

	return GBCatalogSearchExtension;
});