//@ui5-bundle sap/ariba/MySpendPerQuarter/Component-preload.js
jQuery.sap.registerPreloadedModules({
"version":"2.0",
"modules":{
	"sap/ariba/MySpendPerQuarter/dt/configuration.js":function(){sap.ui.define(["sap/ui/integration/Designtime"],function(a){"use strict";return function(){return new a({form:{items:{realm:{manifestpath:"/sap.card/configuration/parameters/realm/value",type:"string",translatable:false},reportingCurrency:{manifestpath:"/sap.card/configuration/parameters/reportingCurrency/value",type:"string",translatable:false},user:{manifestpath:"/sap.card/configuration/parameters/user/value",type:"string",translatable:false}}},preview:{modes:"Abstract"}})}});
},
	"sap/ariba/MySpendPerQuarter/manifest.json":'{"_version":"1.14.0","sap.app":{"id":"sap.ariba.MySpendPerQuarter","type":"card","title":"My Spend Per Quarter","subTitle":"Last 4 quarters","applicationVersion":{"version":"1.0.0"}},"sap.ui":{"technology":"UI5","deviceTypes":{"desktop":true,"phone":true,"tablet":true},"icons":{"icon":"sap-icon://line-chart"}},"sap.card":{"type":"Analytical","designtime":"dt/configuration","header":{"type":"Numeric","title":"My Spend Per Quarter","subTitle":"Last 4 quarters based on Purchase Requisitions","unitOfMeasurement":"{OverallCurrency}","icon":{"src":"sap-icon://line-chart"},"mainIndicator":{"number":"{OverallAmount}","trend":"{Trend}"},"sideIndicators":[{"title":"Total PRs","number":"{DataCount}"}],"details":"{Year}"},"data":{"request":{"url":"{{destinations.wzcd}}/getMySpendPerQuarter()?realm={{parameters.realm}}&reportingCurrency={{parameters.reportingCurrency}}&user={{parameters.user}}","withCredentials":true}},"configuration":{"parameters":{"realm":{"value":"<realmName>","type":"string","label":"Realm","description":"The realm to connect to."},"reportingCurrency":{"value":"EUR","type":"string","label":"Reporting Currency","description":"The realm default"},"user":{"value":"","type":"string","label":"User ID","description":"For Test purpose only"}},"destinations":{"wzcd":{"name":"Work-Zone-Cards-Data"}}},"content":{"chartType":"Line","legend":{"visible":true,"position":"Bottom","alignment":"TopLeft"},"plotArea":{"dataLabel":{"visible":true},"categoryAxisText":{"visible":false},"valueAxisText":{"visible":false}},"title":{"visible":false},"measureAxis":"valueAxis","dimensionAxis":"categoryAxis","data":{"path":"/QuarterAmount"},"dimensions":[{"label":"Quarter","value":"{Quarter}"}],"measures":[{"label":"My Spend","value":"{Amount}"}]}},"sap.platform.mobilecards":{"compatible":false}}'
}});
