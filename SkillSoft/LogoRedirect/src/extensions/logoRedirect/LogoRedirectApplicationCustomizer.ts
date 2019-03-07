import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer, PlaceholderContent, PlaceholderName, PlaceholderProvider //og did not have "", PlaceholderContent, PlaceholderName, PlaceholderProvider"
} from '@microsoft/sp-application-base';
import { Dialog } from '@microsoft/sp-dialog';
//import {ElementRef,Renderer2} from '@angular/core';

import * as strings from 'LogoRedirectApplicationCustomizerStrings';

import { escape } from '@microsoft/sp-lodash-subset';

//import * as javascript from './loc/changeLink';

const HEADER_TEXT: string = "This is the top zone";
const FOOTER_TEXT: string = "This is the bottom zone";
const LOG_SOURCE: string = 'LogoRedirectApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface ILogoRedirectApplicationCustomizerProperties {
  // This is an example; replace with your own property
  testMessage: string;
}



/** A Custom Action which can be run during execution of a Client Side Application */
export default class LogoRedirectApplicationCustomizer
  extends BaseApplicationCustomizer<ILogoRedirectApplicationCustomizerProperties> {
    //newer
    //private _externalJsUrl: string = "https://sharepointnutsandbolts.azurewebsites.net/scripts/SPFxGlobalScript.js";
    private _externalJsUrl: string = "https://skillsoft.sharepoint.com/sites/Marketing/SiteAssets/changeLink.js";


  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);

    //newer
    
    let scriptTag: HTMLScriptElement = document.createElement("script");
    scriptTag.src =this._externalJsUrl; // this._externalJsUrl;
    scriptTag.type = "text/javascript";
    scriptTag.id = "test";
    //scriptTag.innerHTML="alert('test');";
    //scriptTag.innerHTML='var LogoLink = document.querySelectorAll("[href=https://skillsoft.sharepoint.com/sites/Marketing]);LogoLink[1].setAttribute(&dquohref&dquo,&dquohttps://connect.int.skillsoft.com&dquo);';
    //scriptTag.innerHTML=this._externalJsUrl.toString();
    //Dialog.alert(`${scriptTag.innerHTML.toString()}`);
    document.getElementsByTagName("head")[0].appendChild(scriptTag);
    //Dialog.alert(`JS URL : ${this._externalJsUrl} :`);
    //Dialog.alert(` innerHTML= ${document.getElementsByTagName("head")[0].innerHTML.toString()}`);
    //let test =  document.getElementsByTagName("head");
    let JSscript = "";
    
    //Dialog.alert(`${test[0].innerHTML.toString()}`);
    // new function
    /*
    console.log("Available placeholders: ",
      this.context.placeholderProvider.placeholderNames.join(", "));

       // top placeholder..
    let topPlaceholder: PlaceholderContent = this.context.placeholderProvider.tryCreateContent(PlaceholderName.Top);
    if (topPlaceholder) {
      topPlaceholder.domElement.innerHTML = `<div id="new header">
                  <div id="new inner div">
                    <i aria-hidden="true"></i>&nbsp; ${escape(HEADER_TEXT)}
                  </div>
                </div>`;
    }
    */

    //Old function
    
    let message: string = this.properties.testMessage;
    if (!message) {
      message = '(No properties were provided.)';
    }
    
    //Dialog.alert(`Hello from ${strings.Title}:\n\n${message}`);
    
  
    return Promise.resolve<void>(); //org had no <void>
  }
}
