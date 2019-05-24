/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
!function(){"use strict";const e=function(){let e=!1;return()=>{e||(e=!0,require("electron").webFrame.registerURLSchemeAsPrivileged("vscode-resource",{secure:!0,bypassCSP:!1,allowServiceWorkers:!1,supportFetchAPI:!0,corsEnabled:!0}))}}(),r=require("electron").ipcRenderer;require("../../browser/pre/main")({postMessage:(e,s)=>{r.sendToHost(e,s)},onMessage:(e,s)=>{r.on(e,s)}}),document.addEventListener("DOMContentLoaded",()=>{e()})}();
//# sourceMappingURL=https://ticino.blob.core.windows.net/sourcemaps/a622c65b2c713c890fcf4fbf07cf34049d5fe758/core/vs\workbench\contrib\webview\electron-browser\pre\electron-index.js.map
