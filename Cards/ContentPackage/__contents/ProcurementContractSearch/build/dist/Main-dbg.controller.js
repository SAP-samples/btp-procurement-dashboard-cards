sap.ui.define([
	"sap/m/MessageToast",
	"sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox"
], function (MessageToast, Controller, JSONModel, MessageBox) {
	"use strict";

	return Controller.extend("sap.ariba.ProcurementContractSearch.Main", {
		onInit: function () {
            this._initViewModel();
            
            
            var oModel = new JSONModel();
            this.getView().setModel(oModel, "contracts");

            var oCodelistModel = new JSONModel();
            var oCard = this.getOwnerComponent().card,
                aCommodities = oCard.getCombinedParameters().commodities,
                aDepartments = oCard.getCombinedParameters().departments;
            oCodelistModel.setData({ departments: JSON.parse(aDepartments), commodities: JSON.parse(aCommodities) });
            this.getView().setModel(oCodelistModel, "codelist");
            oModel.refresh(true);
        },

        _initViewModel: function () {
            var oViewModel = new JSONModel({
                busy: false,
                searchString: null,
                expirationDateFilter: null,
                createdByMeFilter: null,
                statusFilter: null,
                amountFilter: null,
                regionFilter: null,
                departmentFilter: null,
                commodityFilter: null,
                termTypeFilter: null,
                hierarchicalTypeFilter: null
            });
            this.getView().setModel(oViewModel, "oViewModel");
        },

        _getDateInXDays: function (iDays) {
            var oDate = new Date();
            return new Date(oDate.setDate(oDate.getDate() + iDays)).toISOString();
        },

        _getFilter: function (oCard) {
            var sRealm = oCard.getCombinedParameters().realm,
                sFilter = "$filter=Realm eq '" + sRealm + "'",
                oViewModel = this.getView().getModel("oViewModel");

            // Constructing the Filter Query..
            if (oViewModel.getProperty("/searchString")) {
                sFilter += " and Description eq '" + oViewModel.getProperty("/searchString") + "'"; 
            }

            if (oViewModel.getProperty("/expirationDateFilter")) {
                var sToday = new Date().toISOString();
                switch (oViewModel.getProperty("/expirationDateFilter")) {
                    case "30days":
                        var sIn30Days = this._getDateInXDays(30);
                        sFilter += " and (ExpirationDate_day ge " + sToday + " and ExpirationDate_day lt " + sIn30Days + ")";
                        break;
                    case "60days":
                        var sIn60Days = this._getDateInXDays(60);
                        sFilter += " and (ExpirationDate_day ge " + sToday + " and ExpirationDate_day lt " + sIn60Days + ")";
                        break;
                    case "90days":
                        var sIn90Days = this._getDateInXDays(90);
                        sFilter += " and (ExpirationDate_day ge " + sToday + " and ExpirationDate_day lt " + sIn90Days + ")";
                        break;
                    case "thisyear":
                        var sThisYear = "" + new Date().getFullYear() + "-12-31T23:59:59.999Z";
                        sFilter += " and (ExpirationDate_day ge " + sToday + " and ExpirationDate_day lt " + sThisYear + ")";
                        break;
                }
            }

            if (oViewModel.getProperty("/statusFilter")) {
                sFilter += " and ContractStatus eq '" + oViewModel.getProperty("/statusFilter") + "'"; 
            }

            if (oViewModel.getProperty("/termTypeFilter")) {
                sFilter += " and ExpirationTermType eq '" + oViewModel.getProperty("/termTypeFilter") + "'"; 
            }

            if (oViewModel.getProperty("/hierarchicalTypeFilter")) {
                sFilter += " and HierarchyType eq '" + oViewModel.getProperty("/hierarchicalTypeFilter") + "'"; 
            }

            if (oViewModel.getProperty("/amountFilter")) {
                switch (oViewModel.getProperty("/amountFilter")) {
                    case "lt50k":
                        sFilter += " and Amount lt 50000";
                        break;
                    case "lt100k":
                        sFilter += " and (Amount ge 50000 and Amount lt 100000)";
                        break;
                    case "lt250k":
                        sFilter += " and (Amount ge 100000 and Amount lt 250000)";
                        break;
                    case "lt500k":
                        sFilter += " and (Amount ge 250000 and Amount lt 500000)";
                        break;
                    case "lt1M":
                        sFilter += " and (Amount ge 500000 and Amount lt 1000000)";
                        break;
                    case "gt1M":
                        sFilter += " and Amount ge 1000000";
                        break;
                }
            }

            if (oViewModel.getProperty("/regionFilter")) {
                sFilter += " and Region/any(d:d/Region_RegionId eq '" + oViewModel.getProperty("/regionFilter") + "')"; 
            }

            if (oViewModel.getProperty("/departmentFilter")) {
                sFilter += " and Organization/any(d:d/Organization_OrganizationId eq '" + oViewModel.getProperty("/departmentFilter") + "')"; 
            }

            if (oViewModel.getProperty("/commodityFilter")) {
                sFilter += " and Commodity/any(d:d/Commodity_CommodityId eq '" + oViewModel.getProperty("/commodityFilter") + "')"; 
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
                sExpand: "$expand=AffectedParties",
                sOrderBy: "$orderby=ExpirationDate_day desc",
                sSelect: "$select=ProjectId,Description,ContractStatus,ExpirationDate_day,Owner_UserId"
            };

            oCard.request({
                "url": "{{destinations.wzcd}}/doSearchContractWorkspaces",
                "dataType": "json",
                "method": "POST",
                "parameters": oBody,
                "withCredentials": true,
                "headers": {
                    "Content-Type": "application/json",
                    "withCredentials": true
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
                sProjectId = oEvent.getSource().getBindingContext("contracts").getObject().ProjectId;

            var sUrl = "https://" + sDataCenter + ".ariba.com/Sourcing/Main/ad/viewDocument?realm=" + sRealm + "&ID=" + sProjectId;

            sap.m.URLHelper.redirect(sUrl, true);
        }
	});
});