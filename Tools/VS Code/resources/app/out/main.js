/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
"use strict";function onReady(){perf.mark("main:appReady"),Promise.all([nodeCachedDataDir.ensureExists(),userDefinedLocale]).then(([e,a])=>{a&&!nlsConfiguration&&(nlsConfiguration=lp.getNLSConfiguration(product.commit,userDataPath,metaDataFile,a)),nlsConfiguration||(nlsConfiguration=Promise.resolve(void 0)),nlsConfiguration.then(a=>{const r=a=>{a._languagePackSupport=!0,process.env.VSCODE_NLS_CONFIG=JSON.stringify(a),process.env.VSCODE_NODE_CACHED_DATA_DIR=e||"",perf.mark("willLoadMainBundle"),require("./bootstrap-amd").load("vs/code/electron-main/main",()=>{perf.mark("didLoadMainBundle")})};if(a)r(a);else{let e=app.getLocale();e?(e=e.toLowerCase(),lp.getNLSConfiguration(product.commit,userDataPath,metaDataFile,e).then(a=>{a||(a={locale:e,availableLanguages:{}}),r(a)})):r({locale:"en",availableLanguages:{}})}})},console.error)}function configureCommandlineSwitches(e,a){app.commandLine.appendSwitch("disable-color-correct-rendering");const r=resolveJSFlags(e,a.jsFlags())
;r&&app.commandLine.appendSwitch("--js-flags",r)}function resolveJSFlags(e,...a){return e["js-flags"]&&a.push(e["js-flags"]),e["max-memory"]&&!/max_old_space_size=(\d+)/g.exec(e["js-flags"])&&a.push(`--max_old_space_size=${e["max-memory"]}`),a.length>0?a.join(" "):null}function getUserDataPath(e){return portable.isPortable?path.join(portable.portableDataPath,"user-data"):path.resolve(e["user-data-dir"]||paths.getDefaultUserDataPath(process.platform))}function parseCLIArgs(){return require("minimist")(process.argv,{string:["user-data-dir","locale","js-flags","max-memory"]})}function setCurrentWorkingDirectory(){try{"win32"===process.platform?(process.env.VSCODE_CWD=process.cwd(),process.chdir(path.dirname(app.getPath("exe")))):process.env.VSCODE_CWD&&process.chdir(process.env.VSCODE_CWD)}catch(e){console.error(e)}}function registerListeners(){const e=[];global.macOpenFiles=e,app.on("open-file",function(a,r){e.push(r)});const a=[],r=function(e,r){e.preventDefault(),a.push(r)}
;app.on("will-finish-launching",function(){app.on("open-url",r)}),global.getOpenUrls=function(){return app.removeListener("open-url",r),a}}function getNodeCachedDir(){return new class{constructor(){this.value=this._compute()}jsFlags(){}ensureExists(){return bootstrap.mkdirp(this.value).then(()=>this.value,()=>{})}_compute(){if(process.argv.indexOf("--no-cached-data")>0)return;if(process.env.VSCODE_DEV)return;const e=product.commit;if(e)return path.join(userDataPath,"CachedData",e)}}}function stripComments(e){return e.replace(/("(?:[^\\"]*(?:\\.)?)*")|('(?:[^\\']*(?:\\.)?)*')|(\/\*(?:\r?\n|.)*?\*\/)|(\/{2,}.*?(?:(?:\r?\n)|$))/g,function(e,a,r,t,n){if(t)return"";if(n){const e=n.length;return e>2&&"\n"===n[e-1]?"\r"===n[e-2]?"\r\n":"\n":""}return e})}function getUserDefinedLocale(){const e=args.locale;if(e)return Promise.resolve(e.toLowerCase());const a=path.join(userDataPath,"User","locale.json");return bootstrap.readFile(a).then(e=>{e=stripComments(e);try{const a=JSON.parse(e).locale
;return a&&"string"==typeof a?a.toLowerCase():void 0}catch(e){return}},()=>{})}const perf=require("./vs/base/common/performance"),lp=require("./vs/base/node/languagePacks");perf.mark("main:started");const fs=require("fs"),path=require("path"),bootstrap=require("./bootstrap"),paths=require("./paths"),product=require("../product.json"),app=require("electron").app,portable=bootstrap.configurePortable();bootstrap.enableASARSupport();const args=parseCLIArgs(),userDataPath=getUserDataPath(args);try{const e=path.join(userDataPath,"User","globalStorage","state.vscdb"),a=path.join(userDataPath,"Local Storage"),r=path.join(a,"file__0.localstorage"),t=path.join(a,"file__0.vscmig");!fs.existsSync(e)&&fs.existsSync(r)&&fs.renameSync(r,t)}catch(e){console.error(e)}app.setPath("userData",userDataPath),setCurrentWorkingDirectory(),registerListeners();let nlsConfiguration=void 0;const userDefinedLocale=getUserDefinedLocale(),metaDataFile=path.join(__dirname,"nls.metadata.json");userDefinedLocale.then(e=>{
e&&!nlsConfiguration&&(nlsConfiguration=lp.getNLSConfiguration(product.commit,userDataPath,metaDataFile,e))});const nodeCachedDataDir=getNodeCachedDir();configureCommandlineSwitches(args,nodeCachedDataDir),app.once("ready",function(){if(args.trace){const e=require("electron").contentTracing,a={categoryFilter:args["trace-category-filter"]||"*",traceOptions:args["trace-options"]||"record-until-full,enable-sampling"};e.startRecording(a,()=>onReady())}else onReady()});
//# sourceMappingURL=https://ticino.blob.core.windows.net/sourcemaps/0dd516dd412d42323fc3464531b1c715d51c4c1a/core/main.js.map
