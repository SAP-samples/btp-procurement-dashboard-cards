sap.ui.define(["sap/m/MessageToast","sap/ui/core/mvc/Controller","sap/ui/model/json/JSONModel","sap/m/MessageBox"],function(e,t,r,a){"use strict";return t.extend("sap.ariba.ProcurementContractSearch.Main",{onInit:function(){this._initViewModel();var e=new r;this.getView().setModel(e,"contracts");var t=new r;var a=this.getOwnerComponent().card,i=a.getCombinedParameters().commodities,n=a.getCombinedParameters().departments;t.setData({departments:JSON.parse(n),commodities:JSON.parse(i)});this.getView().setModel(t,"codelist");e.refresh(true)},_initViewModel:function(){var e=new r({busy:false,searchString:null,expirationDateFilter:null,createdByMeFilter:null,statusFilter:null,amountFilter:null,regionFilter:null,departmentFilter:null,commodityFilter:null,termTypeFilter:null,hierarchicalTypeFilter:null});this.getView().setModel(e,"oViewModel")},_getDateInXDays:function(e){var t=new Date;return new Date(t.setDate(t.getDate()+e)).toISOString()},_getFilter:function(e){var t=e.getCombinedParameters().realm,r="$filter=Realm eq '"+t+"'",a=this.getView().getModel("oViewModel");if(a.getProperty("/searchString")){r+=" and Description eq '"+a.getProperty("/searchString")+"'"}if(a.getProperty("/expirationDateFilter")){var i=(new Date).toISOString();switch(a.getProperty("/expirationDateFilter")){case"30days":var n=this._getDateInXDays(30);r+=" and (ExpirationDate_day ge "+i+" and ExpirationDate_day lt "+n+")";break;case"60days":var o=this._getDateInXDays(60);r+=" and (ExpirationDate_day ge "+i+" and ExpirationDate_day lt "+o+")";break;case"90days":var s=this._getDateInXDays(90);r+=" and (ExpirationDate_day ge "+i+" and ExpirationDate_day lt "+s+")";break;case"thisyear":var d=""+(new Date).getFullYear()+"-12-31T23:59:59.999Z";r+=" and (ExpirationDate_day ge "+i+" and ExpirationDate_day lt "+d+")";break}}if(a.getProperty("/statusFilter")){r+=" and ContractStatus eq '"+a.getProperty("/statusFilter")+"'"}if(a.getProperty("/termTypeFilter")){r+=" and ExpirationTermType eq '"+a.getProperty("/termTypeFilter")+"'"}if(a.getProperty("/hierarchicalTypeFilter")){r+=" and HierarchyType eq '"+a.getProperty("/hierarchicalTypeFilter")+"'"}if(a.getProperty("/amountFilter")){switch(a.getProperty("/amountFilter")){case"lt50k":r+=" and Amount lt 50000";break;case"lt100k":r+=" and (Amount ge 50000 and Amount lt 100000)";break;case"lt250k":r+=" and (Amount ge 100000 and Amount lt 250000)";break;case"lt500k":r+=" and (Amount ge 250000 and Amount lt 500000)";break;case"lt1M":r+=" and (Amount ge 500000 and Amount lt 1000000)";break;case"gt1M":r+=" and Amount ge 1000000";break}}if(a.getProperty("/regionFilter")){r+=" and Region/any(d:d/Region_RegionId eq '"+a.getProperty("/regionFilter")+"')"}if(a.getProperty("/departmentFilter")){r+=" and Organization/any(d:d/Organization_OrganizationId eq '"+a.getProperty("/departmentFilter")+"')"}if(a.getProperty("/commodityFilter")){r+=" and Commodity/any(d:d/Commodity_CommodityId eq '"+a.getProperty("/commodityFilter")+"')"}return r},onSearch:function(e){this.getView().getModel("oViewModel").setProperty("/busy",true);var t=this.getOwnerComponent().card,r=t.getCombinedParameters().searchResult;e.preventDefault();var i={sRealm:t.getCombinedParameters().realm,sFilter:this._getFilter(t),sParamUser:t.getCombinedParameters().user,bFilterOnUser:!!this.getView().getModel("oViewModel").getProperty("/createdByMeFilter"),sTop:r?"$top="+r:"",sExpand:"$expand=AffectedParties",sOrderBy:"$orderby=ExpirationDate_day desc",sSelect:"$select=ProjectId,Description,ContractStatus,ExpirationDate_day,Owner_UserId"};t.request({url:"{{destinations.wzcd}}/doSearchContractWorkspaces",dataType:"json",method:"POST",parameters:i,withCredentials:true,headers:{"Content-Type":"application/json",withCredentials:true}}).then(function(e){var t=this.getView().getModel("contracts");t.setData(e);t.refresh(true);this.getView().getModel("oViewModel").setProperty("/busy",false)}.bind(this)).catch(function(e){this.getView().getModel("oViewModel").setProperty("/busy",false);a.error("There was an error in retrieving data: "+e)}.bind(this))},formatDate:function(e){return e&&e!=="1970-01-01T00:00:00Z"?e&&e.split("T")[0]:""},onListItemPress:function(e){var t=this.getOwnerComponent().card.getCombinedParameters().realm,r=this.getOwnerComponent().card.getCombinedParameters().datacenter,a=e.getSource().getBindingContext("contracts").getObject().ProjectId;var i="https://"+r+".ariba.com/Sourcing/Main/ad/viewDocument?realm="+t+"&ID="+a;sap.m.URLHelper.redirect(i,true)}})});