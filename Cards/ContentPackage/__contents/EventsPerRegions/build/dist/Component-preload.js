//@ui5-bundle sap/ariba/EventsPerRegions/Component-preload.js
jQuery.sap.registerPreloadedModules({
"version":"2.0",
"modules":{
	"sap/ariba/EventsPerRegions/dt/configuration.js":function(){sap.ui.define(["sap/ui/integration/Designtime"],function(e){"use strict";return function(){return new e({form:{items:{realm:{manifestpath:"/sap.card/configuration/parameters/realm/value",type:"string",translatable:false}}},preview:{modes:"Abstract"}})}});
},
	"sap/ariba/EventsPerRegions/manifest.json":'{"_version":"1.14.0","sap.app":{"id":"sap.ariba.EventsPerRegions","type":"card","title":"Sourcing Events per Regions","subTitle":"In SAP Ariba Sourcing Events","applicationVersion":{"version":"1.0.0"}},"sap.ui":{"technology":"UI5","deviceTypes":{"desktop":true,"phone":true,"tablet":true},"icons":{"icon":"sap-icon://donut-chart"}},"sap.card":{"type":"Analytical","designtime":"dt/configuration","header":{"title":"Events per Region","icon":{"src":"sap-icon://choropleth-chart"}},"data":{"request":{"method":"GET","url":"{{destinations.wzcd}}/getSourcingProjectsPerRegion()","withCredentials":true}},"configuration":{"parameters":{"realm":{"value":"<realmName>","type":"string","label":"Realm","description":"The realm to connect to."}},"destinations":{"wzcd":{"name":"Work-Zone-Cards-Data"}}},"content":{"chartType":"Donut","legend":{"visible":true,"position":"Top","alignment":"Center"},"plotArea":{"dataLabel":{"visible":true},"categoryAxisText":{"visible":false},"valueAxisText":{"visible":false}},"title":{"text":"Events per Region","visible":false,"alignment":"Left"},"measureAxis":"size","dimensionAxis":"color","data":{"path":"/value"},"dimensions":[{"label":"Region","value":"{Region_RegionId}"}],"measures":[{"label":"Count","value":"{Count}"}]}},"sap.platform.mobilecards":{"compatible":false}}'
}});
