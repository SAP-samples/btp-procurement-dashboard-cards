sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/model/json/JSONModel","sap/m/MessageBox"],function(e,t,r){"use strict";return e.extend("sap.ariba.DiverseSupplierSearch.Main",{onInit:function(){var e=new t;var r=this.getOwnerComponent().card,i=r.getCombinedParameters().countries;e.setData({countries:JSON.parse(i)});this.getView().setModel(e,"codelist");this._initViewModel(r);var a=new t;this.getView().setModel(a,"viewData");a.refresh(true)},_initViewModel:function(e){var r=new t({busy:false,searchString:null,diversityTypeFilter:null,supplierSearchLink:"https://"+e.getCombinedParameters().datacenter+".ariba.com/Sourcing/Main/ad/dashboard/ariba.sourcing.appui.SMDirectAction?realm="+e.getCombinedParameters().realm,regionFilter:null});debugger;this.getView().setModel(r,"oViewModel")},onSearch:function(e){this.getView().getModel("oViewModel").setProperty("/busy",true);var t=this.getOwnerComponent().card,i=t.getCombinedParameters().searchResult;e.preventDefault();var a={sRealm:t.getCombinedParameters().realm,sFilter:this._getFilter(t),sTop:i?"$top="+i:"",sSelect:"$select=SupplierName,Country,State,City,SupplierId,MinorityOwned,WomanOwned,VeteranOwned,DiversityDVO,DiversityGreen,DiversityGLBTOwned,DiversitySDB,VietnamVO"};t.request({url:"{{destinations.wzcd}}/doSearchDiverseSuppliers",dataType:"json",method:"POST",parameters:a,withCredentials:true,headers:{"Content-Type":"application/json",withCredentials:true}}).then(function(e){var t=this.getView().getModel("viewData");t.setData(e);t.refresh(true);this.getView().getModel("oViewModel").setProperty("/busy",false)}.bind(this)).catch(function(e){this.getView().getModel("oViewModel").setProperty("/busy",false);r.error("There was an error in retrieving data: "+e)}.bind(this))},_getFilter:function(e){var t=e.getCombinedParameters().realm,r="$filter=Realm eq '"+t+"'",i=this.getView().getModel("oViewModel");if(i.getProperty("/searchString")){r+=" and contains(SupplierName,'"+i.getProperty("/searchString")+"')"}if(i.getProperty("/diversityTypeFilter")){r+=" and "+i.getProperty("/diversityTypeFilter")+" eq true"}if(i.getProperty("/countryFilter")){r+=" and Country eq '"+i.getProperty("/countryFilter")+"'"}return r},onClear:function(e){var r=this.getOwnerComponent().card;this._initViewModel(r);var i=new t;this.getView().setModel(i,"viewData")}})});