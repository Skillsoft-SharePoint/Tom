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
}

// import classes
import MockHttpClient from './MockHTTPSClient';
/*
import {
  ISPList
} from '../../../lib/webparts/onDemandCreditList/OnDemandCreditListWebPart';
*/
/*
import {
    triggerCsvDownload
} from '../../../temp/workbench-packages/@microsoft_sp-loader/lib/DeveloperTools/Components/DeveloperModules/TraceDisplay/TraceList/CsvRenderer';
*/
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';

/*********************************************/
/************** End New Stuff      ***********/
/*********************************************/

export interface IOnDemandCreditListWebPartProps {
  description: string;
}
/*
//
Getting and updating a collection using filter
import pnp from "sp-pnp-js";

// you are getting back a collection here
pnp.sp.web.lists.getByTitle("MyList").items.top(1).filter("Title eq 'A Title'").get().then((items: any[]) => {
    // see if we got something
    if (items.length > 0) {
        pnp.sp.web.lists.getByTitle("MyList").items.getById(items[0].Id).update({
            Title: "Updated Title",
        }).then(result => {
            // here you will have updated the item
            console.log(JSON.stringify(result));
        });
    }
});

// Functional Array
  let fruits: Array<string>;
    fruits = ['Apple', 'Orange', 'Banana']; 
    fruits.push('test');
    let find = fruits.indexOf('Apple');

//Filter array of objects, which property matches value, returns array:
var jsObjects = [
   {a: 1, b: 2}, 
   {a: 3, b: 4}, 
   {a: 5, b: 6}, 
   {a: 7, b: 8}
];

var result = jsObjects.filter(obj => {
  return obj.b === 6
})
See the MDN Docs on Array.prototype.filter()

Show code snippet

Find the value of the first element/object in the array, otherwise undefined is returned.

var result = jsObjects.find(obj => {
  return obj.b === 6
})
*/

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
    return MockHttpClient.get(this.context.pageContext.web.absoluteUrl).then(() => {
      const listData: ISPLists = {
        value:
          [
            { ["Customer"]: 'Customer One', ["# of Credits Purchased"]: 8, ["# of Credits for this Element"]: 4, Comments: 'Test One', ["Credit Remaining"]: 4, ["L_x002d_Customer"]: 'Test', ["L_x002d_CreditsPurchased"]: '5', ["L_x002d_CreditsForElement"]: '3', ["L_x002d_CreditRemaining"]: '2', "Opportunity_x0020_ID": '1234' },
            { ["Customer"]: 'Customer Two', ["# of Credits Purchased"]: 10, ["# of Credits for this Element"]: 5, Comments: 'Test Two', ["Credit Remaining"]: 5, ["L_x002d_Customer"]: 'Test two', ["L_x002d_CreditsPurchased"]: '5', ["L_x002d_CreditsForElement"]: '3', ["L_x002d_CreditRemaining"]: '2', "Opportunity_x0020_ID": '1234' },
            { ["Customer"]: 'Customer Three', ["# of Credits Purchased"]: 12, ["# of Credits for this Element"]: 6, Comments: 'Test Three', ["Credit Remaining"]: 6, ["L_x002d_Customer"]: 'Test three', ["L_x002d_CreditsPurchased"]: '5', ["L_x002d_CreditsForElement"]: '3', ["L_x002d_CreditRemaining"]: '2', "Opportunity_x0020_ID": '1234' },
            { ["Customer"]: 'Customer Three', ["# of Credits Purchased"]: 12, ["# of Credits for this Element"]: 6, Comments: 'Test Three', ["Credit Remaining"]: 6, ["L_x002d_Customer"]: 'Test three', ["L_x002d_CreditsPurchased"]: '5', ["L_x002d_CreditsForElement"]: '3', ["L_x002d_CreditRemaining"]: '2', "Opportunity_x0020_ID": '4321' },
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
      // Start Table //
        let preHTML: string = '';
        let datatable: string = '';
        /*
        let postHTML: string = '';
        //let div: string = '';
        let curCustomner: string = '';
        let customerHeader: string = '';
        let customerDiv: string = '';
        let oppurtunityHeader: string = '';
        */
        let sameCustomer: boolean = false;
        let x: number = 0;
        let _totalOpsforCust: number = 0;
        let _ReadyForTotal: boolean = false;

        //Totals Vars
        let _totalCredits:number = 0;
        let _totalUsed:number = 0;
        let _totalRemaining:number = 0;
   
      //html += `<h3>Section 1</h3>`;
          //preHTML += `<div id='Start Custom List'>`;
  
       // Start Table
          datatable = this.tableHTML();
  
      // Start list div
          preHTML += `<div id='DIV to hold list data' class="accordion" style="height:auto !important;">`; //style="height:auto !important;"
 
      // Start Loop //
        items.forEach((item: ISPList) => {
          //preHTML += `<div> --->${item.L_x002d_Customer}<--- </div>`;

          var result = items.filter(obj => {
            return obj.L_x002d_Customer === item.L_x002d_Customer
          })

          //Dialog.alert(result.length.toString());

          if (result.length > 1){
            _totalOpsforCust=result.length;
            sameCustomer=true; 
            _totalCredits= Number(item["# of Credits Purchased"]);
            _totalUsed += Number(item["# of Credits for this Element"]);
            _totalRemaining += Number(item["Credit Remaining"]);

            x += 1;
            if (x==_totalOpsforCust){
              _ReadyForTotal=true;
            }

          }else{
            x=0;
            _ReadyForTotal=false;
          };
          /*
        
          sameCustomer = this.checkCustomer(curCustomner);
          */
          // Set Table start HTML
            if (sameCustomer == false) {
              preHTML += this.dataRow(item.L_x002d_Customer,item.Opportunity_x0020_ID,true);

            } else {
              //multi
              if (x=1){
                preHTML += `<h3 id='Header'> ${item.L_x002d_Customer} </h3>
                    <div id='DIVafterheader'>`;
              }
              preHTML += this.dataRow(item.L_x002d_Customer,item.Opportunity_x0020_ID,false);
              //Dialog.alert('ELSE');
            }
  
          // Set table data
            preHTML += this.fillDataRow(item.L_x002d_Customer,item.L_x002d_CreditsPurchased,item.L_x002d_CreditsForElement,item.L_x002d_CreditRemaining,false);
          // Set totals
            preHTML += this.fillDataRow(item.L_x002d_Customer,item.L_x002d_CreditsPurchased,item.L_x002d_CreditsForElement,item.L_x002d_CreditRemaining,true);
            if (_ReadyForTotal == true ){
              preHTML += this.dataRow('Totals','For All Oppurtunities',false);
              preHTML += this.fillDataRow('Totals',_totalCredits.toString(),_totalUsed.toString(),_totalRemaining.toString(),true);
            }
          // Table End
            preHTML += `</table>`;
  
          // set indiviual end </div> for each unique customer
            if (sameCustomer == false) {
              preHTML += `</div>`;
            }
  
          // Set Customer
          //curCustomner = item.L_x002d_Customer.toString();
            //let test = items.find((item[1]));
          });
  
      // End Loop //
      preHTML += `</div>`;
  
      this.domElement.innerHTML = preHTML;
      
  
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
    //End Build HTML from Data //   
    /********** End open files, then render the items */
  
    /*
    private checkCustomer(curCustomer: string) {
      let multi: boolean = false;
      let x: number = 0;
      this._getListData()
        .then((items) => items.value.forEach((item: ISPList) => {
          if (curCustomer == item.L_x002d_Customer) {
            multi = true;
            CustomerList.push(curCustomer);
          } else {
            multi = false;
          }
          x += 1;
        }))
      return multi;
    }
    */
  
    private dataRow (customer: string, Opportunity: string, singleCustomer: boolean){
      let dataHTML:string = '';
  
      //single
      if (singleCustomer==true){
        dataHTML += `<h3 id='Header'> ${customer} </h3>
                    <div id='DIVafterheader' height='auto' style='height:auto !important'>`;
        dataHTML += `<h4 id='Opportunity'>${Opportunity} </h4>`;
        dataHTML += this.tableHTML();
      }else{
        //Multi
        dataHTML += `Same Customer -- start`;
        dataHTML += `<h4 id='Opportunity'>${Opportunity} </h4>`;
        dataHTML += this.tableHTML();
      }
      return dataHTML;
    }
  
    private tableHTML(){
      // Start Table
      let tablehead:string = '';
      tablehead += `<table id='TAble Start' class="TFtable" width=100% style="border-collapse: collapse;">`;
      // Table Header //
      tablehead += ` <th  align="left">
                      Credits Purchased</th><th>Credits Used
                    </th>
                    <th  align="left">
                      Credit Remaining
                    </th>
                    <th  align="left">
                      Comemnts
                    </th>`;
        return tablehead;
    }
  
    private fillDataRow(curCstomer: string, curPurchased: string, curUsed: string, curRemaing: string, totals: boolean) {
      let TableHTML: string = '';
  
      if (totals == true) {
        // Data Row Start
        TableHTML += `<tr id='Table ROW'>`;
  
        // Cell Start
        TableHTML += `  
                      <td width='25%'>
                        ${curPurchased}
                      </td> 
                      <td width='25%'>
                        ${curUsed}
                      </td>
                      <td width='30%'>
                        ${curRemaing}
                      </td>  
                      <td width='20%'>
                        empty
                      </td>  
                  `;
        // Cell End L_x002d_CreditsForElement
  
        TableHTML += `</tr>`;
        // Data Row End   
        // Set </table> in calling function
      } else {
        // Totals Row
        TableHTML += `
              <tr id='Total ROW'>
                  <td>
                    Total Credits : ${curPurchased}
                  </td> 
                  <td>
                    Credits Used : ${curUsed}
                  </td>
                  <td>
                    Credits Remaining : ${curRemaing}
                  </td>
                  <td>
                    <!-- Empty -->
                  </td>
              </tr>`;
      }
  
      return TableHTML;
    }
  
  
  /*********************************************/


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
