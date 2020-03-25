!function(e){var r={};function n(t){if(r[t])return r[t].exports;var o=r[t]={i:t,l:!1,exports:{}};return e[t].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=r,n.d=function(e,r,t){n.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:t})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,r){if(1&r&&(e=n(e)),8&r)return e;if(4&r&&"object"==typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(n.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var o in e)n.d(t,o,function(r){return e[r]}.bind(null,o));return t},n.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(r,"a",r),r},n.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},n.p="",n(n.s=10)}([function(e,r){e.exports=require("body-parser")},function(e,r){e.exports=require("dotenv")},function(e){e.exports=JSON.parse('{"name":"siriodinar-registro-microservices","version":"1.0.0","description":"Registro de microservicios para siriodinar","scripts":{"build":"webpack -p","test":"echo \\"Error: no test specified\\" && exit 1","start":"node ./dist/main.js","dev:start":"nodemon --exec babel-node ./bin/www.js | bunyan"},"keywords":["registro","siriodinar"],"author":"Tac Etarip","license":"ISC","devDependencies":{"@babel/core":"^7.8.7","@babel/node":"^7.8.7","@babel/preset-env":"^7.8.7","babel-loader":"^8.0.6","web-cli":"^1.0.0-prealpha","webpack":"^4.42.0","webpack-cli":"^3.3.11","webpack-node-externals":"^1.7.2"},"dependencies":{"body-parser":"^1.19.0","bunyan":"^1.8.12","compression":"^1.7.4","cors":"^2.8.5","dotenv":"^8.2.0","express":"^4.17.1","helmet":"^3.21.3","semver":"^7.1.3","babel-polyfill":"^6.26.0"},"engines":{"node":"12.14.x"}}')},function(e,r){e.exports=require("cors")},function(e,r){e.exports=require("http")},function(e,r){e.exports=require("bunyan")},function(e,r){e.exports=require("express")},function(e,r){e.exports=require("compression")},function(e,r){e.exports=require("helmet")},function(e,r){e.exports=require("semver")},function(e,r,n){n(11),e.exports=n(12)},function(e,r){e.exports=require("babel-polyfill")},function(e,r,n){"use strict";n.r(r);var t=n(4),o=n.n(t),i=n(5),s=n.n(i),c=n(2),a=c.name,u=c.version,v=function(e,r,n){return s.a.createLogger({name:"".concat(e,":").concat(r),level:n})},l={development:{name:a,version:u,serviceTimeout:30,log:function(){return v(a,u,"debug")}},production:{name:a,version:u,serviceTimeout:30,log:function(){return v(a,u,"info")}}},d=n(6),p=n.n(d),f=n(0),m=n.n(f),b=n(7),g=n.n(b),h=n(8),y=n.n(h),x=n(3),j=n.n(x),w=n(9),k=n.n(w);function O(e,r){for(var n=0;n<r.length;n++){var t=r[n];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}n(1).config();var q=l.production,M=function(){function e(r){!function(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}(this,e),this.log=r,this.services={},this.timeout=q.serviceTimeout}var r,n,t;return r=e,(n=[{key:"putTimeout",value:function(e){this.timeout=e}},{key:"get",value:function(e,r){this.cleanup();var n=Object.values(this.services).filter((function(n){return n.name===e&&k.a.satisfies(n.version,r)}));return n[Math.floor(Math.random()*n.length)]}},{key:"register",value:function(e,r,n,t){this.cleanup();var o=e+r+n+t;return this.services[o]?(this.services[o].timestamp=Math.floor(new Date/1e3),this.log.debug("Updated services ".concat(e,", version ").concat(r," at ").concat(n,":").concat(t)),o):(this.services[o]={},this.services[o].timestamp=Math.floor(new Date/1e3),this.services[o].ip=n,this.services[o].port=t,this.services[o].name=e,this.services[o].version=r,this.log.debug("Added services ".concat(e,", version ").concat(r," at ").concat(n,":").concat(t)),o)}},{key:"unregister",value:function(e,r,n,t){var o=e+r+n+t;return delete this.services[o],this.log.debug("Unregistered services ".concat(e,", version ").concat(r," at ").concat(n,":").concat(t)),o}},{key:"cleanup",value:function(){var e=this,r=Math.floor(new Date/1e3);Object.keys(this.services).forEach((function(n){e.services[n].timestamp+e.timeout<r&&(delete e.services[n],e.log.debug("Removed service ".concat(n)))}))}}])&&O(r.prototype,n),t&&O(r,t),e}();n(1).config();var S=l.production.log(),T=p()(),A=new M(S);T.use(g()()),T.use(y()()),T.options("*",j()({credentials:!0,origin:!0})),T.use(j()({credentials:!0,origin:!0})),T.use(m.a.json()),T.use(m.a.text()),T.use(m.a.raw()),T.use(m.a.urlencoded({extended:!0})),"development"===T.get("env")&&T.use((function(e,r,n){return S.debug("".concat(e.method,": ").concat(e.url)),n()})),T.put("/register/:servicename/:serviceversion/:serviceport",(function(e,r){var n=e.params,t=n.servicename,o=n.serviceversion,i=n.serviceport,s=e.connection.remoteAddress.includes("::")?"[".concat(e.connection.remoteAddress,"]"):e.connection.remoteAddress,c=A.register(t,o,s,i);return r.json({result:c})})),T.delete("/register/:servicename/:serviceversion/:serviceport",(function(e,r){var n=e.params,t=n.servicename,o=n.serviceversion,i=n.serviceport,s=e.connection.remoteAddress.includes("::")?"[".concat(e.connection.remoteAddress,"]"):e.connection.remoteAddress,c=A.unregister(t,o,s,i);return r.json({result:c})})),T.get("/find/:servicename/:serviceversion",(function(e,r){var n=e.params,t=n.servicename,o=n.serviceversion,i=A.get(t,o);return i?r.json(i):r.status(404).json({result:"Service not found"})})),T.use((function(e,r,n,t){return n.status(e.status||500),S.error(e),n.json({error:{message:e.message}})}));var P=T;n(1).config();var _=l.production,D=process.env.PORT,E=_.log();P.set("port",D);var R=o.a.createServer(P);R.listen(D||9090),R.on("listening",(function(){E.info("Hi there! I'm listening on port ".concat(R.address().port," in ").concat(P.get("env")," mode."))}))}]);