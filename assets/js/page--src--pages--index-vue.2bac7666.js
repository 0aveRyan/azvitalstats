(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{160:function(e,t){},161:function(e,t,a){"use strict";var r=a(160),n=a.n(r);t.default=n.a},163:function(e,t,a){"use strict";a.r(t);a(25),a(69);var r={metaInfo:{title:"Arizona Vital Population Health Statistics"},methods:{stripPeriod:function(e){return e.replace("./static/","")}}},n=a(29),i=a(161),o=Object(n.a)(r,(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("Layout",[a("h1",[e._v("Arizona Population Health & Vital Statistics")]),a("p",[e._v("\n  Scrapes Arizona Department of Health Services "),a("strong",[a("a",{attrs:{href:"https://pub.azdhs.gov/health-stats/mu/index.php"}},[e._v("Population Health & Vital Statistics")])]),e._v(" spreadsheets once a day, normalizes data and creates JSON feeds.\n  ")]),a("g-link",{attrs:{to:"/about"}},[a("strong",[e._v("Learn More")])]),a("h2",[e._v("All Data")]),e._l(e.$page.all.edges,(function(t){var r=t.node;return a("span",{key:r.id},[a("a",{attrs:{href:e.stripPeriod(r.fileInfo.directory)+"/"+r.fileInfo.name+".json"}},[e._v("All available data")])])})),a("h2",[e._v("Combined")]),a("ul",e._l(e.$page.combined.edges,(function(t){var r=t.node;return a("li",{key:r.id},[a("a",{attrs:{href:e.stripPeriod(r.fileInfo.directory)+"/"+r.YEAR+".json"}},[e._v(e._s(r.YEAR))])])})),0),a("h2",[e._v("Births")]),a("ul",e._l(e.$page.births.edges,(function(t){var r=t.node;return a("li",{key:r.id},[a("a",{attrs:{href:e.stripPeriod(r.fileInfo.directory)+"/"+r.fileInfo.name+".json"}},[e._v(e._s(r.YEAR))])])})),0),a("h2",[e._v("Deaths")]),a("ul",e._l(e.$page.deaths.edges,(function(t){var r=t.node;return a("li",{key:r.id},[a("a",{attrs:{href:e.stripPeriod(r.fileInfo.directory)+"/"+r.fileInfo.name+".json"}},[e._v(e._s(r.YEAR))])])})),0),a("h2",[e._v("Marriages")]),a("ul",e._l(e.$page.mars.edges,(function(t){var r=t.node;return a("li",{key:r.id},[a("a",{attrs:{href:e.stripPeriod(r.fileInfo.directory)+"/"+r.fileInfo.name+".json"}},[e._v(e._s(r.YEAR))])])})),0),a("h2",[e._v("Divorces")]),a("ul",e._l(e.$page.divs.edges,(function(t){var r=t.node;return a("li",{key:r.id},[a("a",{attrs:{href:e.stripPeriod(r.fileInfo.directory)+"/"+r.fileInfo.name+".json"}},[e._v(e._s(r.YEAR))])])})),0)],2)}),[],!1,null,null,null);"function"==typeof i.default&&Object(i.default)(o);t.default=o.exports}}]);