import { Version } from '@microsoft/sp-core-library';
import {  
  Environment,  
  EnvironmentType  
} from '@microsoft/sp-core-library';   
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './OnDemandCustomListPartWebPart.module.scss';
import * as strings from 'OnDemandCustomListPartWebPartStrings';

/*************** File Interface */
// create interface
export interface ISPLists {  
  value: ISPList[];  
}  
export interface ISPList {  
  "# of Credits for this Element": number;
  "# of Credits Purchased": number;  
  "Comments": string;
  "Credit Remaining": number;  
}    
// import classes
import MockHttpClient from './MockHTTPSClient'; 
import { SPHttpClient , SPHttpClientResponse } from '@microsoft/sp-http';

/*************** End File Interface */

export interface IOnDemandCustomListPartWebPartProps {
  description: string;
}

export default class OnDemandCustomListPartWebPart extends BaseClientSideWebPart<IOnDemandCustomListPartWebPartProps> {

  /********** Start open files, then render the items */

  //Set Up Test Data for Debugging//
      private _getMockListData(): Promise<ISPLists> {  
        return MockHttpClient.get(this.context.pageContext.web.absoluteUrl).then(() => {  
            const listData: ISPLists = {  
                value:  
                [  
                    { ["# of Credits Purchased"]: 8 , ["# of Credits for this Element"]: 4, Comments: 'Test One', ["Credit Remaining"]: 4 },  
                    { ["# of Credits Purchased"]: 10 , ["# of Credits for this Element"]: 5, Comments: 'Test Two', ["Credit Remaining"]: 5 },  
                    { ["# of Credits Purchased"]: 12 , ["# of Credits for this Element"]: 6, Comments: 'Test Three', ["Credit Remaining"]: 6 },  
                   
                ]  
                };  
            return listData;  
        }) as Promise<ISPLists>;  
      }   
  //End Test Data//

  // Get Actual Data from List //
      private _getListData(): Promise<ISPLists> {  
        return this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl + `/_api/web/lists/GetByTitle('TileList')/Items`, SPHttpClient.configurations.v1)  
          .then((response:SPHttpClientResponse) => {
            debugger;  
            return response.json();  
          });  
      }   
  // End Get Actual Data

  // Check to see if Debug or Live
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
  // Endcheck for Debug or Live //

  // Build HTML from data //
      private _renderList(items: ISPList[]): void {  
        // Start Table //
        let html: string = '<table class="TFtable" width=100% style="border-collapse: collapse;">';  
        // Table Header //
        html += `<!-- <th>Complete Tile</th><th>Tile Title</th><th>Link</th><th>Tile Color</th> -->`; 
        
        // Loop Variables // 
        let x=0; 
        // Start Loop //
        items.forEach((item: ISPList) => {  
          x += 1;
          let href: string = '';
          
          // Row Start
          html += `<tr>`;
          
          // Cell Start
          html += `  
                  <td width='25%'>
                      ${item["# of Credits Purchased"]}
                  </td> 
                  <td width='25%'>
                    ${item["# of Credits for this Element"]} iteration : ${x} 
                  </td>
                  <td width='25%'>
                    ${item.Comments}
                  </td>  
                  <td width='25%'>
                    ${item["Credit Remaining"]}
                  </td>  
              `;  
          // Cell End

          html += `<tr>`;  
          // Row End    
        });
        // End Loop //
          
       
        html += `</table>`;  
        const listContainer: Element = this.domElement.querySelector('#spListContainer');  
        listContainer.innerHTML = html;  
      }
  //End Build HTML from Data //   
 /********** End open files, then render the items */

// Render
  public render(): void {
    this.domElement.innerHTML = `
    <div >  
      <div class="${styles.container}">  

            <div id="spListContainer" />  
          </div>  
        </div>  
    </div>`;  
    this._renderListAsync();  
  }
  /*
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
  */

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
                PropertyPaneTextField('description', {
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
