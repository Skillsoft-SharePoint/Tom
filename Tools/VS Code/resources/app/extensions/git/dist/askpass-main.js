!function(e,n){for(var r in n)e[r]=n[r]}(exports,function(e){var n={};function r(o){if(n[o])return n[o].exports;var t=n[o]={i:o,l:!1,exports:{}};return e[o].call(t.exports,t,t.exports,r),t.l=!0,t.exports}return r.m=e,r.c=n,r.d=function(e,n,o){r.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:o})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,n){if(1&n&&(e=r(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(r.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var t in e)r.d(o,t,function(n){return e[n]}.bind(null,t));return o},r.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(n,"a",n),n},r.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},r.p="",r(r.s=176)}({1:function(e,n){e.exports=require("path")},13:function(e,n){e.exports=require("http")},176:function(e,n,r){"use strict";Object.defineProperty(n,"__esModule",{value:!0});const o=r(13),t=r(2),a=r(8).loadMessageBundle(r(1).join(__dirname,"askpass-main.ts"));function s(e){console.error(a(0,null)),console.error(e),process.exit(1)}!function(e){if(5!==e.length)return s("Wrong number of arguments");if(!process.env.VSCODE_GIT_ASKPASS_HANDLE)return s("Missing handle");if(!process.env.VSCODE_GIT_ASKPASS_PIPE)return s("Missing pipe");if("fetch"===process.env.VSCODE_GIT_COMMAND)return s("Skip fetch commands");const n=process.env.VSCODE_GIT_ASKPASS_PIPE,r=process.env.VSCODE_GIT_ASKPASS_HANDLE,a=e[2],i=e[4].substring(1,e[4].length-2),l={socketPath:r,path:"/",method:"POST"},u=o.request(l,e=>{if(200!==e.statusCode)return s(`Bad status code: ${e.statusCode}`);const r=[];e.setEncoding("utf8"),e.on("data",e=>r.push(e)),e.on("end",()=>{const e=r.join("");try{const r=JSON.parse(e);t.writeFileSync(n,r+"\n")}catch(e){return s("Error parsing response")}setTimeout(()=>process.exit(0),0)})});u.on("error",()=>s("Error in request")),u.write(JSON.stringify({request:a,host:i})),u.end()}(process.argv)},2:function(e,n){e.exports=require("fs")},8:function(e,n,r){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var o,t,a,s,i,l=r(1),u=r(2),c=Object.prototype.toString;function f(e){return void 0!==e}function d(e){return"[object String]"===c.call(e)}function g(e){return JSON.parse(u.readFileSync(e,"utf8"))}function p(e,n){return i&&(e="［"+e.replace(/[aouei]/g,"$&$&")+"］"),0===n.length?e:e.replace(/\{(\d+)\}/g,function(e,r){var o=r[0],t=n[o],a=e;return"string"==typeof t?a=t:"number"!=typeof t&&"boolean"!=typeof t&&void 0!==t&&null!==t||(a=String(t)),a})}function v(e){return function(n,r){for(var o=[],t=2;t<arguments.length;t++)o[t-2]=arguments[t];return function(e){return"[object Number]"===c.call(e)}(n)?n>=e.length?void console.error("Broken localize call found. Index out of bounds. Stacktrace is\n: "+new Error("").stack):p(e[n],o):d(r)?(console.warn("Message "+r+" didn't get externalized correctly."),p(r,o)):void console.error("Broken localize call found. Stacktrace is\n: "+new Error("").stack)}}function S(e,n){for(var r=[],o=2;o<arguments.length;o++)r[o-2]=arguments[o];return p(n,r)}function m(e,n){return a[e]=n,n}function b(e,n){var r,o=l.join(s.cacheRoot,e.id+"-"+e.hash+".json"),t=!1,a=!1;try{return r=JSON.parse(u.readFileSync(o,{encoding:"utf8",flag:"r"})),function(e){var n=new Date;u.utimes(e,n,n,function(){})}(o),r}catch(e){if("ENOENT"===e.code)a=!0;else{if(!(e instanceof SyntaxError))throw e;console.log("Syntax error parsing message bundle: "+e.message+"."),u.unlink(o,function(e){e&&console.error("Deleting corrupted bundle "+o+" failed.")}),t=!0}}if(!(r=function(e,n){var r=s.translationsConfig[e.id];if(r){var o=g(r).contents,t=g(l.join(n,"nls.metadata.json")),a=Object.create(null);for(var i in t){var u=t[i],c=o[e.outDir+"/"+i];if(c){for(var f=[],p=0;p<u.keys.length;p++){var v=u.keys[p],S=c[d(v)?v:v.key];void 0===S&&(S=u.messages[p]),f.push(S)}a[i]=f}else a[i]=u.messages}return a}}(e,n))||t)return r;if(a)try{u.writeFileSync(o,JSON.stringify(r),{encoding:"utf8",flag:"wx"})}catch(e){if("EEXIST"===e.code)return r;throw e}return r}function h(e){try{return function(e){var n=g(l.join(e,"nls.metadata.json")),r=Object.create(null);for(var o in n){var t=n[o];r[o]=t.messages}return r}(e)}catch(e){return void console.log("Generating default bundle from meta data failed.",e)}}function y(e,n){var r;if(!0===s.languagePackSupport&&void 0!==s.cacheRoot&&void 0!==s.languagePackId&&void 0!==s.translationsConfigFile&&void 0!==s.translationsConfig)try{r=b(e,n)}catch(e){console.log("Load or create bundle failed ",e)}if(!r){if(s.languagePackSupport)return h(n);var o=function(e){for(var n=s.locale;n;){var r=l.join(e,"nls.bundle."+n+".json");if(u.existsSync(r))return r;var o=n.lastIndexOf("-");n=o>0?n.substring(0,o):void 0}if(void 0===n&&(r=l.join(e,"nls.bundle.json"),u.existsSync(r)))return r}(n);if(o)try{return g(o)}catch(e){console.log("Loading in the box message bundle failed.",e)}r=h(n)}return r}function _(e){if(!e)return S;var n=l.extname(e);if(n&&(e=e.substr(0,e.length-n.length)),s.messageFormat===o.both||s.messageFormat===o.bundle){var r=function(e){for(var n,r=l.dirname(e);n=l.join(r,"nls.metadata.header.json"),!u.existsSync(n);){var o=l.dirname(r);if(o===r){n=void 0;break}r=o}return n}(e);if(r){var t=l.dirname(r),c=a[t];if(void 0===c)try{var d=JSON.parse(u.readFileSync(r,"utf8"));try{var p=y(d,t);c=m(t,p?{header:d,nlsBundle:p}:null)}catch(e){console.error("Failed to load nls bundle",e),c=m(t,null)}}catch(e){console.error("Failed to read header file",e),c=m(t,null)}if(c){var b=e.substr(t.length+1).replace(/\\/g,"/"),h=c.nlsBundle[b];return void 0===h?(console.error("Messages for file "+e+" not found. See console for details."),function(){return"Messages not found."}):v(h)}}}if(s.messageFormat===o.both||s.messageFormat===o.file)try{var _=g(function(e){var n;if(s.cacheLanguageResolution&&n)n=n;else{if(i||!s.locale)n=".nls.json";else for(var r=s.locale;r;){var o=".nls."+r+".json";if(u.existsSync(e+o)){n=o;break}var t=r.lastIndexOf("-");t>0?r=r.substring(0,t):(n=".nls.json",r=null)}s.cacheLanguageResolution&&(n=n)}return e+n}(e));return Array.isArray(_)?v(_):f(_.messages)&&f(_.keys)?v(_.messages):(console.error("String bundle '"+e+"' uses an unsupported format."),function(){return"File bundle has unsupported format. See console for details"})}catch(e){"ENOENT"!==e.code&&console.error("Failed to load single file bundle",e)}return console.error("Failed to load message bundle for file "+e),function(){return"Failed to load message bundle. See console for details."}}!function(e){e.file="file",e.bundle="bundle",e.both="both"}(o=n.MessageFormat||(n.MessageFormat={})),function(e){e.is=function(e){var n=e;return n&&f(n.key)&&f(n.comment)}}(t||(t={})),function(){if(s={locale:void 0,languagePackSupport:!1,cacheLanguageResolution:!0,messageFormat:o.bundle},d(process.env.VSCODE_NLS_CONFIG))try{var e=JSON.parse(process.env.VSCODE_NLS_CONFIG);if(d(e.locale)&&(s.locale=e.locale.toLowerCase()),function(e){return!0===e||!1===e}(e._languagePackSupport)&&(s.languagePackSupport=e._languagePackSupport),d(e._cacheRoot)&&(s.cacheRoot=e._cacheRoot),d(e._languagePackId)&&(s.languagePackId=e._languagePackId),d(e._translationsConfigFile)){s.translationsConfigFile=e._translationsConfigFile;try{s.translationsConfig=g(s.translationsConfigFile)}catch(n){e._corruptedFile&&u.writeFile(e._corruptedFile,"corrupted","utf8",function(e){console.error(e)})}}}catch(e){}i="pseudo"===s.locale,void 0,a=Object.create(null)}(),n.loadMessageBundle=_,n.config=function(e){return e&&(d(e.locale)&&(s.locale=e.locale.toLowerCase(),void 0,a=Object.create(null)),void 0!==e.messageFormat&&(s.messageFormat=e.messageFormat)),i="pseudo"===s.locale,_}}}));
//# sourceMappingURL=https://ticino.blob.core.windows.net/sourcemaps/0dd516dd412d42323fc3464531b1c715d51c4c1a/extensions/git/dist/askpass-main.js.map