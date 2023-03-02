sap.ui.define([
	"sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox"
], function (Controller, JSONModel, MessageBox) {
	"use strict";

	return Controller.extend("sap.ariba.InvoiceSearch.Main", {
		onInit: function () {

            var oStatusListModel = new JSONModel();
            var oCard = this.getOwnerComponent().card,
            aStatuses = oCard.getCombinedParameters().statuses;            
            oStatusListModel.setData({ statuses: JSON.parse(aStatuses)});
            this.getView().setModel(oStatusListModel, "statusList");


			this._initViewModel();

            var oModel = new JSONModel();
            this.getView().setModel(oModel, "invoices");

            oModel.refresh(true);
		},

        _initViewModel: function () {
            var oViewModel = new JSONModel({
                busy: false,
                invoiceIdFilter: null,
                invDateFilter: null,
                createdByMeFilter: null,
                statusFilter: null,
                supplierIdFilter: null
            });
            this.getView().setModel(oViewModel, "oViewModel");
        },

        _getFilter: function (oCard) {
            var sRealm = oCard.getCombinedParameters().realm,
                sFilter = "$filter=Realm eq '" + sRealm + "'",
                oViewModel = this.getView().getModel("oViewModel");

            // Constructing the Filter Query..
            if (oViewModel.getProperty("/invoiceIdFilter")) {
                sFilter += " and contains(InvoiceId,'" +oViewModel.getProperty("/invoiceIdFilter") +"')" ; 
            }

            if (oViewModel.getProperty("/invDateFilter")) {
                var sToday = new Date().toISOString();
                switch (oViewModel.getProperty("/invDateFilter")) {
                    case "30days":
                        var sIn30Days = this._getDateInXDays(30);
                        sFilter += " and (InvoiceDate_day ge " + sToday + " and InvoiceDate_day lt " + sIn30Days + ")";
                        break;
                    case "60days":
                        var sIn60Days = this._getDateInXDays(60);
                        sFilter += " and (InvoiceDate_day ge " + sToday + " and InvoiceDate_day lt " + sIn60Days + ")";
                        break;
                    case "90days":
                        var sIn90Days = this._getDateInXDays(90);
                        sFilter += " and (InvoiceDate_day ge " + sToday + " and InvoiceDate_day lt " + sIn90Days + ")";
                        break;
                    case "thisyear":
                        var sThisYear = "" + new Date().getFullYear() + "-12-31T23:59:59.999Z";
                        sFilter += " and (InvoiceDate_day ge " + sToday + " and InvoiceDate_day lt " + sThisYear + ")";
                        break;
                }
            }

            if (oViewModel.getProperty("/statusFilter")) {
                sFilter += " and ReconciliationStatus eq '" + oViewModel.getProperty("/statusFilter") + "'"; 
            }

            if (oViewModel.getProperty("/supplierIdFilter")) {
                sFilter += " and Supplier_SupplierId eq '" + oViewModel.getProperty("/supplierIdFilter") + "'"; 
            }

            return sFilter;
        },

        onSearch: function (oEvent) {
            this.getView().getModel("oViewModel").setProperty("/busy", true);

            var oCard = this.getOwnerComponent().card,
                iTop = oCard.getCombinedParameters().searchResult;

            oEvent.preventDefault();

            var oBody = {
                sRealm: oCard.getCombinedParameters().realm,
                sFilter: this._getFilter(oCard),
                sParamUser: oCard.getCombinedParameters().user,
                bFilterOnUser: !!this.getView().getModel("oViewModel").getProperty("/createdByMeFilter"),
                sTop: iTop ? "$top=" + iTop : "",               
                sOrderBy: "$orderby=InvoiceDate_day desc",
                sSelect: "$select=InvoiceId,Description,InvoiceDate_day,POId,Supplier_SupplierId,Commodity_CommodityId,ReconciliationStatus"
            };

            oCard.request({
                "url": "{{destinations.wzcd}}/doSearchInvoices",
                "dataType": "json",
                "method": "POST",
                "parameters": oBody,
                "withCredentials": true,
                "headers": {
                    "Content-Type": "application/json",
                    "withCredentials": true
                }
            }).then(function (oData) {
                var oModel = this.getView().getModel("invoices");
                oModel.setData(oData);
                oModel.refresh(true);
                this.getView().getModel("oViewModel").setProperty("/busy", false);
            }.bind(this)).catch(function(sErrorMessage) {
                this.getView().getModel("oViewModel").setProperty("/busy", false);
                MessageBox.error("There was an error in retrieving data: " + sErrorMessage);
            }.bind(this));
            
        },

        
        _getDateInXDays: function (iDays) {
            var oDate = new Date();
            return new Date(oDate.setDate(oDate.getDate() + iDays)).toISOString();
        },

        formatDate: function (sDate) {
            return sDate && sDate !== "1970-01-01T00:00:00Z" ? sDate && sDate.split("T")[0] : "";
        },

        onListItemPress: function(oEvent) {
            var sRealm = this.getOwnerComponent().card.getCombinedParameters().realm,
                sDataCenter = this.getOwnerComponent().card.getCombinedParameters().datacenter,
                sInvoiceId = oEvent.getSource().getBindingContext("invoices").getObject().InvoiceId;

            var sUrl = "https://" + sDataCenter + ".ariba.com/Buyer/Main/ad/webjumper?realm=" + sRealm + "&itemClassName=ariba.invoicing.core.InvoiceReconciliation&itemUniqueName=" + sInvoiceId;

            sap.m.URLHelper.redirect(sUrl, true);
        }
	});
});