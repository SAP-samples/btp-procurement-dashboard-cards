sap.ui.define([
	"sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox"
], function (Controller,JSONModel,MessageBox) {
	"use strict";

	return Controller.extend("sap.ariba.DiverseSupplierSearch.Main", {
		onInit: function () {


            //Filter code model
            var oCodelistModel = new JSONModel();
            var oCard = this.getOwnerComponent().card,
            aCountries = oCard.getCombinedParameters().countries;            
            oCodelistModel.setData({ countries: JSON.parse(aCountries)});
            this.getView().setModel(oCodelistModel, "codelist");

            this._initViewModel(oCard);

            //Data model
            var oModel = new JSONModel();
            this.getView().setModel(oModel, "viewData");
            oModel.refresh(true);
            
		},

        _initViewModel: function (oCard) {
            var oViewModel = new JSONModel({
                busy: false,
                searchString: null,
                diversityTypeFilter: null,
                supplierSearchLink: "https://"+ oCard.getCombinedParameters().datacenter+".ariba.com/Sourcing/Main/ad/dashboard/ariba.sourcing.appui.SMDirectAction?realm="+oCard.getCombinedParameters().realm,
                regionFilter: null,
            });
            debugger;
            this.getView().setModel(oViewModel, "oViewModel");
        },

        onSearch: function (oEvent) {
            this.getView().getModel("oViewModel").setProperty("/busy", true);

            var oCard = this.getOwnerComponent().card,
                iTop = oCard.getCombinedParameters().searchResult;

            oEvent.preventDefault();

            var oBody = {
                sRealm: oCard.getCombinedParameters().realm,
                sFilter: this._getFilter(oCard),
                sTop: iTop ? "$top=" + iTop : "",
                sSelect: "$select=SupplierName,Country,State,City,SupplierId,MinorityOwned,WomanOwned,VeteranOwned,DiversityDVO,DiversityGreen,DiversityGLBTOwned,DiversitySDB,VietnamVO"
            };

            oCard.request({
                "url": "{{destinations.wzcd}}/doSearchDiverseSuppliers",
                "dataType": "json",
                "method": "POST",
                "parameters": oBody,
                "withCredentials": true,
                "headers": {
                    "Content-Type": "application/json",
                    "withCredentials": true
                }
            }).then(function (oData) {
                var oModel = this.getView().getModel("viewData");
                oModel.setData(oData);
                oModel.refresh(true);
                this.getView().getModel("oViewModel").setProperty("/busy", false);
            }.bind(this)).catch(function(sErrorMessage) {
                this.getView().getModel("oViewModel").setProperty("/busy", false);
                MessageBox.error("There was an error in retrieving data: " + sErrorMessage);
            }.bind(this));           
    
        },

        _getFilter: function (oCard) {

            //Building filter query
            var sRealm = oCard.getCombinedParameters().realm,
                sFilter = "$filter=Realm eq '" + sRealm + "'",
                oViewModel = this.getView().getModel("oViewModel");
            
            if (oViewModel.getProperty("/searchString")) {
                sFilter += " and contains(SupplierName,'" +oViewModel.getProperty("/searchString") +"')" ; 
            }
            
            if (oViewModel.getProperty("/diversityTypeFilter")) {
                sFilter += " and "+ oViewModel.getProperty("/diversityTypeFilter") + " eq true"; 
            }

            if (oViewModel.getProperty("/countryFilter")) {
                sFilter += " and Country eq '"+ oViewModel.getProperty("/countryFilter") + "'"; 
            }

           
            return sFilter;
        },

        onClear:function(oEvent){
            var oCard = this.getOwnerComponent().card;
            this._initViewModel(oCard);
            var oModel = new JSONModel();
            this.getView().setModel(oModel, "viewData");
        }

	});
});