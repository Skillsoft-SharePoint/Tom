import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './OnDemandCreditListWebPart.module.scss';
import * as strings from 'OnDemandCreditListWebPartStrings';

import { Dialog } from '@microsoft/sp-dialog';


/*********************************************/
/************** Start New Stuff    ***********/
/*********************************************/
import {
  Environment,
  EnvironmentType
} from '@microsoft/sp-core-library';

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
  "L_x002d_Customer": string;
  "L_x002d_CreditsForElement": string;
  "L_x002d_CreditsPurchased": string;
  "L_x002d_CreditRemaining": string;
  "Opportunity_x0020_ID": string;
  "Service_x0020_Type": string;
  "Element": string;
  "LOE": string;
}

// import classes
import MockHttpClient from './MockHTTPSClient';

import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';

/*********************************************/
/************** End New Stuff      ***********/
/*********************************************/

export interface IOnDemandCreditListWebPartProps {
  description: string;
}


/*********************************************/
/************** Start Web Part    ***********/
/*********************************************/


export default class OnDemandCreditListWebPart extends BaseClientSideWebPart<IOnDemandCreditListWebPartProps> {

  /********** Get Jquery css file */
  public constructor() {
    super();

    SPComponentLoader.loadCss('//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css');
  }
  /********** End get jQuery CSS */


  /*********************************************/
  /************** Start Render Part  ***********/
  /*********************************************/
  public render(): void {

    //Dialog.alert('hello');

    this._renderListAsync();


  }




  /*********************************************/
  /************** End Render Part    ***********/
  /*********************************************/

  /*********************************************/
  /********** Start open files, then render the items */
  //Set Up Debug Data for Debugging//
  private _getMockListData(): Promise<ISPLists> {
    /*
    return this.context.spHttpClient.get(`https://skillsoft.sharepoint.com/sites/ondemandrequests/_api/web/lists/GetByTitle('On Demand Tracking')/Items?&$orderby=L_x002d_Customer `, SPHttpClient.configurations.v1)
    
    .then((response: SPHttpClientResponse) => {
      debugger;
      console.log(this.context.pageContext.web.absoluteUrl);
      console.log('succes');
      return response.json();
    });
    */
  
    return MockHttpClient.get(this.context.pageContext.web.absoluteUrl).then(() => {
      const listData: ISPLists = {
        value:
          [
            { ["Customer"]: 'Customer One', ["# of Credits Purchased"]: 8, ["# of Credits for this Element"]: 4, Comments: 'Test One', ["Credit Remaining"]: 4, ["L_x002d_Customer"]: 'Test', ["L_x002d_CreditsPurchased"]: '5', ["L_x002d_CreditsForElement"]: '3', ["L_x002d_CreditRemaining"]: '2', "Opportunity_x0020_ID": '1234', "Service_x0020_Type": 'Test 1', "Element": 'Element', "LOE": 'LOE' },
            { ["Customer"]: 'Customer Two', ["# of Credits Purchased"]: 10, ["# of Credits for this Element"]: 5, Comments: 'Test Two', ["Credit Remaining"]: 5, ["L_x002d_Customer"]: 'Test two', ["L_x002d_CreditsPurchased"]: '5', ["L_x002d_CreditsForElement"]: '3', ["L_x002d_CreditRemaining"]: '2', "Opportunity_x0020_ID": '1234', "Service_x0020_Type": 'Test 2', "Element": 'Element', "LOE": 'LOE' },
            { ["Customer"]: 'Customer Three', ["# of Credits Purchased"]: 12, ["# of Credits for this Element"]: 6, Comments: 'Test Three', ["Credit Remaining"]: 6, ["L_x002d_Customer"]: 'Test three', ["L_x002d_CreditsPurchased"]: '5', ["L_x002d_CreditsForElement"]: '3', ["L_x002d_CreditRemaining"]: '2', "Opportunity_x0020_ID": '1234', "Service_x0020_Type": 'Test 3', "Element": 'Element', "LOE": 'LOE' },
            { ["Customer"]: 'Customer Three', ["# of Credits Purchased"]: 12, ["# of Credits for this Element"]: 6, Comments: 'Test Three', ["Credit Remaining"]: 6, ["L_x002d_Customer"]: 'Test three', ["L_x002d_CreditsPurchased"]: '5', ["L_x002d_CreditsForElement"]: '3', ["L_x002d_CreditRemaining"]: '2', "Opportunity_x0020_ID": '4321', "Service_x0020_Type": 'Test 4', "Element": 'Element', "LOE": 'LOE' },
          ]
      };
      return listData;
    }) as Promise<ISPLists>;
    
  }
  //End Debug Data//

  // Get Actual Data from List //
  private _getListData(): Promise<ISPLists> {
    return this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl + `/_api/web/lists/GetByTitle('On Demand Tracking')/Items?&$orderby=L_x002d_Customer `, SPHttpClient.configurations.v1)
      // &$orderby=Created 
      // ?$select=customer,_x0023__x0020_of_x0020_Credits_x0020_Purchased,_x0023__x0020_of_x0020_Credits_x0020_for_x0020_this_x0020_Element,Credit_x0020_Remaining 
      //return this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl + `/_api/web/lists/GetByTitle('On Demand Tracking')/Items?$select=customer,*&$expand=customer,# of credits Purchased,# of Credits for this Element,Credit Remaining`, SPHttpClient.configurations.v1)  
      // /_api/web/lists/getbytitle('GoGreenReport')/items?$select=EncodedAbsUrl,FileRef&$filter=Project_x0020_Name eq '"+$("#ddnProjectName").val()+"'&$orderby=Created desc

      .then((response: SPHttpClientResponse) => {
        debugger;
        console.log(this.context.pageContext.web.absoluteUrl);
        console.log('succes');
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
          console.log('response');
        });
    }
  }
  // Endcheck for Debug or Live //

  // Build HTML from data //
  private _renderList(items: ISPList[]): void {
    // Vars //
    let preHTML: string = '';
    let datatable: string = '';

    let sameCustomer: boolean = false;
    let x: number = 0;
    let _totalOpsforCust: number = 0;
    let _ReadyForTotal: boolean = false;

    // Start Loop //
    items.forEach((item: ISPList) => {
      //call
      //  customerHeader ONCE
      //  oppurtunityHeader EACH
      //  details EACH
      //  Totals ONCE            

      var result = items.filter(obj => {
        return obj.L_x002d_Customer === item.L_x002d_Customer;
      });
      //Multiple Customer
      //x=0;
      if (result.length > 1) {
        x++;
        if (x == 1) {
          //preHTML +=`<div><button id='test' type="submit" onClick=${this.btnTest} >Test</button></div>`
          preHTML += `<div id='Header' class='SS_Header' style='border-bottom-style:solid; border-bottom-width:1px;color: inherit !important;'>`; //class="accordion"
          // customer header
          preHTML += `<div id='CustomerHeader' class='SS_CustomerHeader' style='font-size: large;font-weight: 500;color: inherit !important;'> ${item.L_x002d_Customer} </div>`;

          // Totals Vars
          let _totalCredits: number = 0;
          let _totalUsed: number = 0;
          let _totalRemaining: number = 0;
          
          // Create details for each oppurtunity
          result.forEach((sameCus: ISPList) => {

            // Add up Totals
            _totalCredits = Number(sameCus["L_x002d_CreditsPurchased"]);
            _totalUsed += Number(sameCus["L_x002d_CreditRemaining"]);
            _totalRemaining += Number(sameCus["L_x002d_CreditRemaining"]);

            // Op Header
            var OPresult = items.filter(obj => {
              return obj.Opportunity_x0020_ID === item.Service_x0020_Type;
            });
            if (OPresult.length > 1){
              OPresult.forEach((sameOP: ISPList) => {

              })
            }
            preHTML += `<div id='OpportunityHeader' class='SS_OpportunityHeader' style='padding-left:10px;color: inherit !important;'>Oppurtunity ID: ${sameCus.Opportunity_x0020_ID} </div>`;
           
            // Details
            preHTML += `<div id='Details' class='SS_Details' style='padding-left:20px;color: inherit !important;'>`;
            preHTML += this.fillDataRow(sameCus.L_x002d_CreditsPurchased, sameCus.L_x002d_CreditRemaining, sameCus.L_x002d_CreditRemaining, false, sameCus.Comments, sameCus.Service_x0020_Type, sameCus.Element, sameCus.LOE);
            preHTML += `</div>`;

          });
          preHTML += `
                        <div id='Total' class='SS_Total' style='padding-left:10px;    color: inherit !important;'>
                            Totals </div>`;
          preHTML += `<div id='Details' class='SS_Details' style='padding-left:20px;    color: inherit !important;'>`;
          preHTML += this.fillDataRowTotals(_totalCredits.toString(), _totalUsed.toString(), _totalRemaining.toString());
          preHTML += `</div>
                    </div
                  </div>`;
        }

        // Single Customer              
      } else {
        x=0;
        //call
        //  customerHeader
        preHTML += `<div id='Header' class='SS_Header' style='border-bottom-style:solid; border-bottom-width:1px;    color: inherit !important;'>`; //class="accordion"
        // customer header
        preHTML += `<div id='CustomerHeader' class='SS_CustomerHeader' style='font-size: large;font-weight: 500;    color: inherit !important;'> ${item.L_x002d_Customer} </div>`;
        //  oppurtunityHeader
        preHTML += `<div id='OpportunityHeader' class='SS_OpportunityHeader' style='padding-left:10px;    color: inherit !important;'>Oppurtunity ID: ${item.Opportunity_x0020_ID} </div>`;
        //preHTML += `<div id='OppurtunityColumns' class='SS_OppurtunityColumns'>`;
        //preHTML += this.tableHeaderHTML();
        //preHTML += `</div>`;
        //  details  
        preHTML += `<div id='Details' class='SS_Details' style='padding-left:20px;    color: inherit !important;'>`;
        preHTML += this.fillDataRow(item.L_x002d_CreditsPurchased, item.L_x002d_CreditRemaining, item.L_x002d_CreditRemaining, false, item.Comments, item.Service_x0020_Type, item.Element, item.LOE);
        preHTML += `</div>
                      </div>`;
      }
      //preHTML = ``
    });

    // End Loop //

    // Write HTML  
    this.domElement.innerHTML = preHTML;


    // Add Accordian
    const accordionOptions: JQueryUI.AccordionOptions = {
      animate: true,
      collapsible: true,
      icons: {
        header: 'ui-icon-circle-arrow-e',
        activeHeader: 'ui-icon-circle-arrow-s'
      }
    };

    jQuery('.accordion', this.domElement).accordion(accordionOptions);
  }

  // fillDataRow function  
  private fillDataRow(curPurchased: string, curUsed: string, curRemaing: string, totals: boolean, Comments: string, ServiceType: string, Element: string, LOE: string) {
    let TableHTML: string = '';

    //if (totals != true) {
    // Data Row Start
    TableHTML += `
          <table id='ColumnHeaders' class="TFtable" width=100% style="border-collapse: collapse;">
            <tr>
              <td  align="left">
                Credits Purchased
              </td>
              <td align="left">
                Credits Used
              </td>
              <td  align="left">
                Credit Remaining
              </td>
              
              <td  align="left">
                Comemnts
              </td>
              <td align="left">
                Service Type
              </td>
              <td align="left">
                Element
              </td>
              <td align="left">
                LOE
              </td>
              
            </tr>

            <tr id='Table ROW'> 
              <td >
                ${curPurchased}
              </td> 
              <td >
                ${curUsed}
              </td>
              <td >
                ${curRemaing}
              </td>
              
              <td >
                ${Comments}
              </td> 
              <td >
                 ${ServiceType}
              </td>  
              <td >
                ${Element}
              </td>
              <td >
                ${LOE}
              </td>
              
            </tr>
          </table>`;

    return TableHTML;
  }

  private fillDataRowTotals(curPurchased: string, curUsed: string, curRemaing: string, ) {
    let TableHTML: string = '';

    //if (totals != true) {
    // Data Row Start

    TableHTML += ` 
                    <table id='ColumnHeaders' class="TFtable" width=100% style="border-collapse: collapse;">
                      <tr>
                        <td  align="left">
                          Credits Purchased
                        </td>
                        <td align="left">
                          Credits Used
                        </td>
                        <td  align="left">
                          Credit Remaining
                        </td>
                      </tr>
                      <tr id='Total ROW'> 
                        <td >
                          ${curPurchased}
                        </td> 
                        <td>
                          ${curUsed}
                        </td>
                        <td>
                          ${curRemaing}
                        </td> 
                      </tr>
                    </table>`;

    return TableHTML;
  }
  /*********************************************/

  // DataVersion
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

/*********************************************/
/************** End Web Part       ***********/
/*********************************************/


