sap.ui.define(["sap/ui/integration/Extension","sap/m/MessageBox"], function (Extension, MessageBox) {
	"use strict";

	var CreateContractWorkspaceExtension = Extension.extend("sap.ariba.CreateContractWorkspace");

	CreateContractWorkspaceExtension.prototype.init = function () {
		Extension.prototype.init.apply(this, arguments);
		this.attachAction(this._handleAction.bind(this));
    };
    
    // should return a promise
	CreateContractWorkspaceExtension.prototype.getData = function () {
        var oCard = this.getCard();
        var oCodeListSupplier = oCard.getCombinedParameters().suppliers;
        var oCodeListCommodity = oCard.getCombinedParameters().commodities;
        return new Promise(function (resolve, reject) {
            var oData = {
                    "suppliers": JSON.parse(oCodeListSupplier),
                    "commodities": JSON.parse(oCodeListCommodity)
            };
            resolve(oData);
        }); 
	};

	/* Custom event handler for the submit event.
	Intercepts submit action, performs validation and/or data modifications. */
	CreateContractWorkspaceExtension.prototype._handleAction = function (oEvent) {
		var oCard = this.getCard(),
			sActionType = oEvent.getParameter("type"),
			mParams = oEvent.getParameter("parameters"),
			mSubmitData = mParams.data;

		if (sActionType !== "Submit") {
			return;
        }
        var oModel = oEvent.getSource().getParent().getBindingContext().getModel(),
            oSupplier = oModel.getProperty("/suppliers").find(function (oSup) { return oSup.SupplierId === mSubmitData.sSupplierId; });

        if (!oSupplier) { 
            return; 
        }

        mSubmitData.sSMVendorId = oSupplier.SMVendorId;
        mSubmitData.sUser = oCard.getCombinedParameters().username;
        mSubmitData.sRealm = oCard.getCombinedParameters().realm;
        mSubmitData.sCurrency = oCard.getCombinedParameters().currency;
        mSubmitData.sTemplateId = oCard.getCombinedParameters().templateId;

        oEvent.preventDefault();
		oCard.request({
            "url": "{{destinations.wzcd}}/doCreateContractWorkspace",
            "dataType": "json",
            "method": "POST",
            "withCredentials": true,
            "parameters": mSubmitData,
            "headers": {
                "Content-Type": "application/json"
            }
		}).then(function (oData) {
            oCard.showMessage("You did it! A new contract has been created!", "Success");
            MessageBox.success("You did it! A new contract has been created!", {
				actions: ["Goto Contract", MessageBox.Action.CLOSE],
				emphasizedAction: "Goto Contract",
				onClose: function (sAction) {
                    if (sAction === "Goto Contract") {
                       sap.m.URLHelper.redirect("http://"+ oCard.getCombinedParameters().datacenter + ".ariba.com/Sourcing/Main/ad/viewDocument?realm=" + oCard.getCombinedParameters().realm + "&ID=" + oData.value, true);
                    }
				}
			});
		}).catch(function(sErrorMessage) {
            oCard.showMessage(sErrorMessage, "Error");
		});
	};

	return CreateContractWorkspaceExtension;
});