//@ui5-bundle sap/ariba/DiverseSupplierSearch/Component-preload.js
jQuery.sap.registerPreloadedModules({
"version":"2.0",
"modules":{
	"sap/ariba/DiverseSupplierSearch/Component.js":function(){sap.ui.define(["sap/ui/core/UIComponent"],function(e){"use strict";var a=e.extend("sap.ariba.DiverseSupplierSearch.Component",{onCardReady:function(e){this.card=e;e.getCombinedParameters();e.getManifestEntry("/sap.card")}});return a});
},
	"sap/ariba/DiverseSupplierSearch/Main.controller.js":function(){sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/model/json/JSONModel","sap/m/MessageBox"],function(e,t,r){"use strict";return e.extend("sap.ariba.DiverseSupplierSearch.Main",{onInit:function(){var e=new t;var r=this.getOwnerComponent().card,i=r.getCombinedParameters().countries;e.setData({countries:JSON.parse(i)});this.getView().setModel(e,"codelist");this._initViewModel(r);var a=new t;this.getView().setModel(a,"viewData");a.refresh(true)},_initViewModel:function(e){var r=new t({busy:false,searchString:null,diversityTypeFilter:null,supplierSearchLink:"https://"+e.getCombinedParameters().datacenter+".ariba.com/Sourcing/Main/ad/dashboard/ariba.sourcing.appui.SMDirectAction?realm="+e.getCombinedParameters().realm,regionFilter:null});debugger;this.getView().setModel(r,"oViewModel")},onSearch:function(e){this.getView().getModel("oViewModel").setProperty("/busy",true);var t=this.getOwnerComponent().card,i=t.getCombinedParameters().searchResult;e.preventDefault();var a={sRealm:t.getCombinedParameters().realm,sFilter:this._getFilter(t),sTop:i?"$top="+i:"",sSelect:"$select=SupplierName,Country,State,City,SupplierId,MinorityOwned,WomanOwned,VeteranOwned,DiversityDVO,DiversityGreen,DiversityGLBTOwned,DiversitySDB,VietnamVO"};t.request({url:"{{destinations.wzcd}}/doSearchDiverseSuppliers",dataType:"json",method:"POST",parameters:a,withCredentials:true,headers:{"Content-Type":"application/json",withCredentials:true}}).then(function(e){var t=this.getView().getModel("viewData");t.setData(e);t.refresh(true);this.getView().getModel("oViewModel").setProperty("/busy",false)}.bind(this)).catch(function(e){this.getView().getModel("oViewModel").setProperty("/busy",false);r.error("There was an error in retrieving data: "+e)}.bind(this))},_getFilter:function(e){var t=e.getCombinedParameters().realm,r="$filter=Realm eq '"+t+"'",i=this.getView().getModel("oViewModel");if(i.getProperty("/searchString")){r+=" and contains(SupplierName,'"+i.getProperty("/searchString")+"')"}if(i.getProperty("/diversityTypeFilter")){r+=" and "+i.getProperty("/diversityTypeFilter")+" eq true"}if(i.getProperty("/countryFilter")){r+=" and Country eq '"+i.getProperty("/countryFilter")+"'"}return r},onClear:function(e){var r=this.getOwnerComponent().card;this._initViewModel(r);var i=new t;this.getView().setModel(i,"viewData")}})});
},
	"sap/ariba/DiverseSupplierSearch/View.view.xml":'<mvc:View xmlns:core="sap.ui.core"\n          xmlns:mvc="sap.ui.core.mvc"\n          xmlns="sap.m"\n          xmlns:html="http://www.w3.org/1999/xhtml"\n          width="100%"\n          displayBlock="true"\n          controllerName="sap.ariba.DiverseSupplierSearch.Main"><VBox class="sapUiSmallMargin"><core:Fragment fragmentName="sap.ariba.DiverseSupplierSearch.fragments.ObjectHeaderFragment" type="XML"/><core:Fragment fragmentName="sap.ariba.DiverseSupplierSearch.fragments.SearchResultFragment" type="XML"/></VBox></mvc:View>\n',
	"sap/ariba/DiverseSupplierSearch/dt/configuration.js":function(){sap.ui.define(["sap/ui/integration/Designtime"],function(a){"use strict";return function(){return new a({form:{items:{realm:{manifestpath:"/sap.card/configuration/parameters/realm/value",type:"string",translatable:false},datacenter:{manifestpath:"/sap.card/configuration/parameters/datacenter/value",type:"string",translatable:false},searchResult:{manifestpath:"/sap.card/configuration/parameters/searchResult/value",type:"integer",translatable:false},countries:{manifestpath:"/sap.card/configuration/parameters/countries/value",type:"string",translatable:false}}},preview:{modes:"Abstract"}})}});
},
	"sap/ariba/DiverseSupplierSearch/fragments/ObjectHeaderFragment.fragment.xml":'<core:FragmentDefinition\n        xmlns="sap.m"\n        xmlns:core="sap.ui.core"\n        xmlns:fb="sap.ui.comp.filterbar"\n><fb:FilterBar id="filterbar" reset="onReset" search="onSearch" useToolbar="false" clear="onClear"\n                                    showGoOnFB="true" showFilterConfiguration="false" showClearOnFB="true"><fb:filterGroupItems><fb:FilterGroupItem groupName="__$INTERNAL$" name="C" label="Supplier Name" partOfCurrentVariant="true" visibleInFilterBar="true"><fb:control><SearchField id="searchField" value="{oViewModel>/searchString}" search="onSearch"/></fb:control></fb:FilterGroupItem><fb:FilterGroupItem groupName="__$INTERNAL$" name="D" label="Diversity Type" partOfCurrentVariant="true" visibleInFilterBar="true"><fb:control><ComboBox id="slDType" selectedKey="{oViewModel>/diversityTypeFilter}"><core:Item key="" text=""/><core:Item key="DiversityDVO" text="Disabled Veteran Owned"/><core:Item key="DiversityGreen" text="Green Initiatives"/><core:Item key="DiversityGLBTOwned" text="LGBT Owned"/><core:Item key="MinorityOwned" text="Minority Owned"/><core:Item key="DiversitySDB" text="Small Disadvantaged"/><core:Item key="VeteranOwned" text="Veteran Owned"/><core:Item key="VietnamVO" text="Vietnam Veteran Owned"/><core:Item key="WomanOwned" text="Woman Owned"/></ComboBox></fb:control></fb:FilterGroupItem><fb:FilterGroupItem groupName="__$INTERNAL$" name="B" label="Country" partOfCurrentVariant="true" visibleInFilterBar="true"><fb:control><ComboBox id="slLocation" items="{codelist>/countries}" selectedKey="{oViewModel>/countryFilter}"><core:Item key="{codelist>Key}" text="{codelist>Name}"/></ComboBox></fb:control></fb:FilterGroupItem></fb:filterGroupItems></fb:FilterBar></core:FragmentDefinition>',
	"sap/ariba/DiverseSupplierSearch/fragments/SearchResultFragment.fragment.xml":'<core:FragmentDefinition\n        xmlns="sap.m"\n        xmlns:core="sap.ui.core"\n><List growing="true"\n\t\tgrowingThreshold="5"\n\t\tgrowingScrollToLoad="false" id="tblSuppliers" \n        headerText="Suppliers({=${viewData>/value}.length})" \n        items="{path: \'viewData>/value\'}"\n        busy="{oViewModel>/busy}"\n        ><CustomListItem><HBox justifyContent="SpaceBetween" wrap="Wrap"><HBox width="60%"><Avatar class="sapUiSmallMarginBegin sapUiSmallMarginTopBottom" \n                    backgroundColor="Random" \n                    initials="{=${viewData>SupplierName}.charAt(0)}" displaySize="S" displayShape="Circle"/><VBox class="sapUiSmallMarginBegin sapUiSmallMarginTopBottom"><Link text="{viewData>SupplierName}" href="{oViewModel>/supplierSearchLink}" target="_blank"/><Label text="{viewData>City},{viewData>State},{viewData>Country}"/></VBox></HBox><VBox width="20%" class="sapUiSmallMarginTopBottom"><Label text="Diversity Type"/><Text text="{viewData>DivCategory}"/></VBox><VBox width="20%"  class="sapUiSmallMarginTopBottom"><Label text="Vendor ID"/><Text text="{viewData>SupplierId}"/></VBox></HBox></CustomListItem></List></core:FragmentDefinition>',
	"sap/ariba/DiverseSupplierSearch/manifest.json":'{"_version":"1.15.0","sap.app":{"id":"sap.ariba.DiverseSupplierSearch","type":"card","title":"Diverse Supplier Search","subTitle":"Based on SAP Ariba Suppliers","applicationVersion":{"version":"1.0.0"}},"sap.ui":{"technology":"UI5","deviceTypes":{"desktop":true,"phone":true,"tablet":true},"icons":{"icon":"sap-icon://technical-object"}},"sap.ui5":{"rootView":{"viewName":"sap.ariba.DiverseSupplierSearch.View","type":"XML","async":true,"id":"app"},"dependencies":{"minUI5Version":"1.38","libs":{"sap.m":{}}}},"sap.card":{"type":"Component","designtime":"dt/configuration","configuration":{"parameters":{"realm":{"value":"<realmName>","type":"string","label":"The realm to connect to."},"datacenter":{"value":"s1","type":"string","label":"The datacenter the realm belongs to (ie: s1 for us, s1-eu for eu...)"},"searchResult":{"value":25,"type":"integer","label":"Amount of Records displayed as the Search Result"},"countries":{"value":"[{\\"Key\\":\\"CZ\\",\\"Name\\":\\"Czech Republic\\"},{\\"Key\\":\\"DE\\",\\"Name\\":\\"Germany\\"},{\\"Key\\":\\"US\\",\\"Name\\":\\"United States\\"}]","type":"string","label":"Code List Countries search filter","description":"Code List Countries search filter"}},"destinations":{"wzcd":{"name":"Work-Zone-Cards-Data"}}},"header":{"icon":{"src":"sap-icon://search"},"title":"Diverse Suppliers Search","subTitle":"Based on SAP Ariba Suppliers"}},"sap.platform.mobilecards":{"compatible":false}}'
}});