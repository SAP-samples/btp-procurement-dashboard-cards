//@ui5-bundle sap/ariba/CreateContractWorkspace/Component-preload.js
jQuery.sap.registerPreloadedModules({
"version":"2.0",
"modules":{
	"sap/ariba/CreateContractWorkspace/dt/configuration.js":function(){sap.ui.define(["sap/ui/integration/Designtime"],function(a){"use strict";return function(){return new a({form:{items:{username:{manifestpath:"/sap.card/configuration/parameters/username/value",type:"string",translatable:false},realm:{manifestpath:"/sap.card/configuration/parameters/realm/value",type:"string",translatable:false},currency:{manifestpath:"/sap.card/configuration/parameters/currency/value",type:"string",translatable:false},templateId:{manifestpath:"/sap.card/configuration/parameters/templateId/value",type:"string",translatable:false},datacenter:{manifestpath:"/sap.card/configuration/parameters/datacenter/value",type:"string",translatable:false},suppliers:{manifestpath:"/sap.card/configuration/parameters/suppliers/value",type:"string",translatable:false},commodities:{manifestpath:"/sap.card/configuration/parameters/commodities/value",type:"string",translatable:false}}},preview:{modes:"Abstract"}})}});
},
	"sap/ariba/CreateContractWorkspace/extension/CreateContractWorkspaceExtension.js":function(){sap.ui.define(["sap/ui/integration/Extension","sap/m/MessageBox"],function(e,t){"use strict";var r=e.extend("sap.ariba.CreateContractWorkspace");r.prototype.init=function(){e.prototype.init.apply(this,arguments);this.attachAction(this._handleAction.bind(this))};r.prototype.getData=function(){var e=this.getCard();var t=e.getCombinedParameters().suppliers;var r=e.getCombinedParameters().commodities;return new Promise(function(e,a){var n={suppliers:JSON.parse(t),commodities:JSON.parse(r)};e(n)})};r.prototype._handleAction=function(e){var r=this.getCard(),a=e.getParameter("type"),n=e.getParameter("parameters"),o=n.data;if(a!=="Submit"){return}var i=e.getSource().getParent().getBindingContext().getModel(),s=i.getProperty("/suppliers").find(function(e){return e.SupplierId===o.sSupplierId});if(!s){return}o.sSMVendorId=s.SMVendorId;o.sUser=r.getCombinedParameters().username;o.sRealm=r.getCombinedParameters().realm;o.sCurrency=r.getCombinedParameters().currency;o.sTemplateId=r.getCombinedParameters().templateId;e.preventDefault();r.request({url:"{{destinations.wzcd}}/doCreateContractWorkspace",dataType:"json",method:"POST",withCredentials:true,parameters:o,headers:{"Content-Type":"application/json"}}).then(function(e){r.showMessage("You did it! A new contract has been created!","Success");t.success("You did it! A new contract has been created!",{actions:["Goto Contract",t.Action.CLOSE],emphasizedAction:"Goto Contract",onClose:function(t){if(t==="Goto Contract"){sap.m.URLHelper.redirect("http://"+r.getCombinedParameters().datacenter+".ariba.com/Sourcing/Main/ad/viewDocument?realm="+r.getCombinedParameters().realm+"&ID="+e.value,true)}}})}).catch(function(e){r.showMessage(e,"Error")})};return r});
},
	"sap/ariba/CreateContractWorkspace/manifest.json":'{"_version":"1.17.0","sap.app":{"id":"sap.ariba.CreateContractWorkspace","type":"card","title":"Create Contract Workspace","subTitle":"SAP Ariba ","applicationVersion":{"version":"1.0.1"}},"sap.ui":{"technology":"UI5","deviceTypes":{"desktop":true,"phone":true,"tablet":true},"icons":{"icon":"sap-icon://product"}},"sap.card":{"extension":"./extension/CreateContractWorkspaceExtension","header":{"title":"Create Contract Workspace","subTitle":"Create Contract Workspace in Ariba","icon":{"src":"sap-icon://form"}},"type":"AdaptiveCard","designtime":"dt/configuration","data":{"extension":{"method":"getData"}},"configuration":{"parameters":{"username":{"value":"","type":"string","label":"Username","description":"The username to use in the API calls. Test purpose only."},"realm":{"value":"<realmName>","type":"string","label":"Realm","description":"The realm to use in the API calls."},"templateId":{"value":"CW2219870","type":"string","label":"Contract Workspace Template","description":"Contract Workspace Template to use in the API calls."},"currency":{"value":"EUR","type":"string","label":"Contract Workspace currency","description":"Contract Workspace currency to use in the API calls."},"datacenter":{"value":"s1","type":"string","label":"Base Url for the realm","description":"Base Url for the realm."},"suppliers":{"value":"[]","type":"string","label":"Code List Supplier for the realm","description":"Code List Supplier for the realm."},"commodities":{"value":"[]","type":"string","label":"Code List Commodity for the realm","description":"Code List Commodity for the realm."}},"destinations":{"wzcd":{"name":"Work-Zone-Cards-Data"}},"actionHandlers":{"submit":{"url":"{{destinations.wzcd}}/doCreateContractWorkspace","method":"POST"}}},"content":{"$schema":"http://adaptivecards.io/schemas/adaptive-card.json","type":"AdaptiveCard","version":"1.0","body":[{"type":"TextBlock","text":"Title","isSubtle":true,"size":"medium"},{"type":"Input.Text","placeholder":"Your Contract Title","style":"text","id":"sTitle"},{"type":"TextBlock","text":"Amount","isSubtle":true,"size":"medium"},{"type":"Input.Text","placeholder":"Your Contract Amount","style":"NumVal","id":"sAmount"},{"type":"TextBlock","text":"Supplier","isSubtle":true,"size":"medium"},{"type":"Input.ChoiceSet","style":"compact","isMultiSelect":false,"id":"sSupplierId","choices":[{"$data":"{suppliers}","title":"{SupplierName}","value":"{SupplierId}"}]},{"type":"TextBlock","text":"Commodity","isSubtle":true,"size":"medium"},{"type":"Input.ChoiceSet","style":"compact","isMultiSelect":false,"id":"sCommodity","choices":[{"$data":"{commodities}","title":"{CommodityName}","value":"{CommodityCode}"}]}],"actions":[{"type":"Action.Submit","title":"Create"}]}},"sap.platform.mobilecards":{"compatible":false}}'
}});