sap.ui.define([
	"sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox"
], function (Controller, JSONModel, MessageBox) {
	"use strict";

	return Controller.extend("sap.ariba.MyContractWorkspacesAPI.Main", {
        onInit: function () {
            this._initViewModel();

            var oModel = new JSONModel();
            this.getView().setModel(oModel, "contracts");
            oModel.refresh(true);

            this._getData();
        },
        
        _initViewModel: function () {
            var oViewModel = new JSONModel({
                busy: false
            });
            this.getView().setModel(oViewModel, "oViewModel");
        },


        _getDatePreviousXDays: function (iDays) {
            var oDate = new Date();
            return new Date(oDate.setDate(oDate.getDate() - iDays)).toISOString().split('T')[0];
        },

        _getFilter: function (iLastXDays) {
            var sFilter = "";
            if (iLastXDays) {
                // the API does not allow "GE/LE" operations, only "LT/GT", hence for including TODAY, we actually need to pass TOMORROW
                var sToday = this._getDatePreviousXDays(-1),
                    sInXDays = this._getDatePreviousXDays(iLastXDays);

                sFilter = "$filter=LastModified lt " + sToday + " and LastModified gt " + sInXDays;                
            }
            return sFilter;
        },

        handleRefreshButtonPressed: function () {
            this._getData();
        },

        _getData: function (oEvent) {
            this.getView().getModel("oViewModel").setProperty("/busy", true);

            var oCard = this.getOwnerComponent().card,
                oParameters = oCard.getCombinedParameters();

            var oPayload = {
                sRealm              : oParameters.realm,
                sFilter             : this._getFilter(oParameters.lastXDays),
                sUser               : oParameters.user,
                sPasswordAdapter    : oParameters.passwordAdapter,
                iTop                : oParameters.searchResult

            };

            oCard.request({
                "url": "{{destinations.wzcd}}/doGetMyRecentContractWorkspaces",
                "dataType": "json",
                "method": "POST",
                "withCredentials": true,
                "parameters": oPayload,
                "headers": {
                    "Content-Type": "application/json"
                }
            }).then(function (oData) {
                var oModel = this.getView().getModel("contracts");
                oModel.setData(oData);
                oModel.refresh(true);
                this.getView().getModel("oViewModel").setProperty("/busy", false);
            }.bind(this)).catch(function(sErrorMessage) {
                this.getView().getModel("oViewModel").setProperty("/busy", false);
                MessageBox.error("There was an error in retrieving data: " + sErrorMessage);
            }.bind(this));
            
        },

        formatDate: function (sDate) {
            return sDate && sDate !== "1970-01-01T00:00:00Z" ? sDate && sDate.split("T")[0] : "";
        },
        
        onListItemPress: function(oEvent) {
            var sRealm = this.getOwnerComponent().card.getCombinedParameters().realm,
                sDataCenter = this.getOwnerComponent().card.getCombinedParameters().datacenter,
                sProjectId = oEvent.getSource().getBindingContext("contracts").getObject().ContractId;

            var sUrl = "https://" + sDataCenter + ".ariba.com/Sourcing/Main/ad/viewDocument?realm=" + sRealm + "&ID=" + sProjectId;

            sap.m.URLHelper.redirect(sUrl, true);
        }
	});
});