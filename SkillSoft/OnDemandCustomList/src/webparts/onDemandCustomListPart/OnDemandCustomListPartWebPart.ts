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

/*************** Jquery interface */
import * as jQuery from 'jquery';
import 'jqueryui';
/*************** End jQuery interface */

/*************** Start CSS Interface */
import { SPComponentLoader } from '@microsoft/sp-loader';


/*************** File Interface */
// create interface
export interface ISPLists {  
  value: ISPList[];  
}  
export interface ISPList {  
  "Customer": string;
  "# of Credits for this Element": number;
  "# of Credits Purchased": number;  
  "Comments": string;
  "Credit Remaining": number;  
}    
// import classes
import MockHttpClient from './MockHTTPSClient'; 
import { SPHttpClient , SPHttpClientResponse } from '@microsoft/sp-http';
import { constructor } from 'jquery';
/*************** End File Interface */

export interface IOnDemandCustomListPartWebPartProps {
  description: string;
}

let finalhtml: string = '';

export default class OnDemandCustomListPartWebPart extends BaseClientSideWebPart<IOnDemandCustomListPartWebPartProps> {
  

  /********** Get Jquer css file */
  public constructor() {
    super();
  
    SPComponentLoader.loadCss('//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css');
  }
  /********** End get jQuery CSS */


  /********** Start open files, then render the items */
  //Set Up Debug Data for Debugging//
      private _getMockListData(): Promise<ISPLists> {  
        return MockHttpClient.get(this.context.pageContext.web.absoluteUrl).then(() => {  
            const listData: ISPLists = {  
                value:  
                [  
                    
                    { ["Customer"]: 'Customer One', ["# of Credits Purchased"]: 8 , ["# of Credits for this Element"]: 4, Comments: 'Test One', ["Credit Remaining"]: 4 },  
                    { ["Customer"]: 'Customer Two', ["# of Credits Purchased"]: 10 , ["# of Credits for this Element"]: 5, Comments: 'Test Two', ["Credit Remaining"]: 5 },  
                    { ["Customer"]: 'Customer Three', ["# of Credits Purchased"]: 12 , ["# of Credits for this Element"]: 6, Comments: 'Test Three', ["Credit Remaining"]: 6 },  
                   
                ]  
                };  
            return listData;  
        }) as Promise<ISPLists>;  
      }   
  //End Debug Data//

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
        let html: string = '';
        let div: string ='';
        let table: string = '';
        let customer: string = '';
        //html += `<h3>Section 1</h3>`;
        //html += `<div>`;
        // Start Table
        table += `<table class="TFtable" width=100% style="border-collapse: collapse;">`;  
        // Table Header //
        table += ` <th  align="left">
                    Credits Purchased</th><th>Credits Used
                  </th>
                  <th  align="left">
                    Credit Reaming
                  </th>
                  <th  align="left">
                    Comemnts
                  </th>`; 
        
        // Loop Variables // 
        let x: number = 0; 
        let divCount: number = 0;
        let tableCount: number = 0;

        html += `<div class="accordion">`
        // Start Loop //
        items.forEach((item: ISPList) => {  
          x += 1;
          //let href: string = '';
          //html += `<div class="accordion">`

          // Set Table start HTML
          if (customer !== item.Customer){
           
            html += `<h3> ${item.Customer} </h3><div>`
            html += table
          }
          //if (x===1 || ){html += table;};
          
          // Row Start
          html += `<tr>`;
          
          // Cell Start
          html += `  
                  <td width='25%'>
                      ${item["# of Credits Purchased"]}
                  </td> 
                  <td width='25%'>
                    ${item["# of Credits for this Element"]}
                  </td>
                  <td width='25%'>
                    ${item["Credit Remaining"]}
                  </td>  
                  <td width='25%'>
                    ${item.Comments}
                  </td>  
              `;  
          // Cell End

          html += `<tr>`;  
          // Row End   

          if (customer !== item.Customer){
            html += `</table></div>`
          }
          
          // Set Current Customer
          customer = item.Customer;

        });
        // End Loop //

        html += `</div>`;
          
       
        //html += `</table>`;  
        //const listContainer: Element = this.domElement.querySelector('#spListContainer');  
        //listContainer.innerHTML = html;  
        
        this.domElement.innerHTML = html;

        const accordionOptions: JQueryUI.AccordionOptions = {
          animate: true,
          collapsible: false,
          icons: {
            header: 'ui-icon-circle-arrow-e',
            activeHeader: 'ui-icon-circle-arrow-s'
          }
        };
    
        jQuery('.accordion', this.domElement).accordion(accordionOptions);

        
      }
  //End Build HTML from Data //   
 /********** End open files, then render the items */

// Render
  public render(): void {
    /*
    const accordionOptions: JQueryUI.AccordionOptions = {
      animate: true,
      collapsible: false,
      icons: {
        header: 'ui-icon-circle-arrow-e',
        activeHeader: 'ui-icon-circle-arrow-s'
      }
    };

    jQuery('.accordion', this.domElement).accordion(accordionOptions);
    */
    
    /*
    this.domElement.innerHTML = `
    <div >  
      <div class="${styles.container}">  
            <div id="spListContainer" />  
          </div>  
        </div>  
    </div>`;  
*/
    

    this._renderListAsync();  
  }


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
