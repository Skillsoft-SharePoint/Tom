import { Version } from '@microsoft/sp-core-library';
import {  
  Environment,  
  EnvironmentType  
} from '@microsoft/sp-core-library';   
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  IWebPartContext,
  PropertyPaneCheckbox,// Checkbox
  PropertyPaneLabel,// Label
  PropertyPaneLink,//Link
  PropertyPaneSlider,//Slider
  PropertyPaneToggle,//Toggle
  PropertyPaneDropdown //Dropdown
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './TilesWebPartWebPart.module.scss';
import * as strings from 'TilesWebPartWebPartStrings';


export interface ITilesWebPartWebPartProps {
  description: string;
}


/*************** File Interface */
// create interface
export interface ISPLists {  
  value: ISPList[];  
}  
export interface ISPList {  
  TileTitle: string;
  TileLink: string;  
  TileImage: string;
  TileColcor: string;  
}    
// import classes
import MockHttpClient from './MockHTTPSClient'; 
import { SPHttpClient , SPHttpClientResponse } from '@microsoft/sp-http';

/*************** End File Interface */

export default class TilesWebPartWebPart extends BaseClientSideWebPart<ITilesWebPartWebPartProps> {
// File Retival Code
  private _getMockListData(): Promise<ISPLists> {  
    return MockHttpClient.get(this.context.pageContext.web.absoluteUrl).then(() => {  
        const listData: ISPLists = {  
            value:  
            [  
                { TileTitle: 'Test One', TileLink: 'link one', TileImage: 'https://skillsoft.sharepoint.com/sites/Marketing/SiteAssets/AccountBasedMarketing.png', TileColcor: 'Green' },  
                { TileTitle: 'Test Two', TileLink: 'link two', TileImage: 'https://skillsoft.sharepoint.com/sites/Marketing/SiteAssets/AccountBasedMarketing.png', TileColcor: 'Red' },  
                { TileTitle: 'Test Three', TileLink: 'link three ', TileImage: 'https://skillsoft.sharepoint.com/sites/Marketing/SiteAssets/AccountBasedMarketing.png', TileColcor: 'Blue'  }  
            ]  
            };  
        return listData;  
    }) as Promise<ISPLists>;  
  }   

  private _getListData(): Promise<ISPLists> {  
    return this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl + `/_api/web/lists/GetByTitle('TileList')/Items`, SPHttpClient.configurations.v1)  
        .then((response:SPHttpClientResponse) => {
          debugger;  
          return response.json();  
        });  
    }   

  private _renderListAsync(): void {  
      
      if (Environment.type === EnvironmentType.Local) {  
        this._getMockListData().then((response) => {  
          this._renderList(response.value);  
        });  
      }  
       else {  
         this._getListData()  
        .then((response) => {  
          this._renderList(response.value);  
        });  
     }  
  }     

  private _renderList(items: ISPList[]): void {  
    let html: string = '<table class="TFtable" border=1 width=100% style="border-collapse: collapse;">';  
    html += `<!-- <th>Complete Tile</th><th>Tile Title</th><th>Link</th><th>Tile Color</th> -->`; 
    let x=0; 
    items.forEach((item: ISPList) => {  
      x += 1;
      /*html += `  
          <tr>  
              <td>${item.TileTitle}</td>
              <td>${item.TileLink}</td>  
              <td>${item.TileColcor}</td>  
          </tr>  
          `;*/

      //build tiles
      //<tr> -- </tr> every 4th <td> -- </td>
      if (x === 1) {html += `<tr>`};
      html += `  
           
              <td width='25%'>
                  <a href='${item.TileLink}'>
                    <img width='100%' src='${item.TileImage}'>
                    </img>
                  </a>
              </td> 
              <!--
                <td>${item.TileTitle} iteration : ${x} </td>
                <td>${item.TileLink}</td>  
                <td>${item.TileColcor}</td>  
              -->
          `;  
         
      if (x === 4){x=0};    
    });  
    if (x=1){html += `<tr>`};
    html += `</table>`;  
    const listContainer: Element = this.domElement.querySelector('#spListContainer');  
    listContainer.innerHTML = html;  
  }   
  // End File REtrival Code

  // Render
  public render(): void {
    this.domElement.innerHTML = `  
      <div >  
          <div class="${styles.container}">  
              <!-- 
              <div class="ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}">  
                <div class="ms-Grid-col ms-u-lg10 ms-u-xl8 ms-u-xlPush2 ms-u-lgPush1">  
                  <span class="ms-font-xl ms-fontColor-white" style="font-size:28px"></span>  
                
                  <p class="ms-font-l ms-fontColor-white" style="text-align: center"></p>  
                </div>  
              </div>  
              <div class="ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}">  
              <div style="background-color:Black;color:white;text-align: center;font-weight: bold;font-size:18px;"></div>  
              <br>  
              -->
            <div id="spListContainer" />  
          </div>  
        </div>  
      </div>`;  
    this._renderListAsync();  
  }
  //test

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('Description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
