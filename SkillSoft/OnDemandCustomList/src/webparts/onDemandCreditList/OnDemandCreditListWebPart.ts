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
    return MockHttpClient.get(this.context.pageContext.web.absoluteUrl).then(() => {
      const listData: ISPLists = {
        value:
          [
            { ["Customer"]: 'Customer One', ["# of Credits Purchased"]: 8, ["# of Credits for this Element"]: 4, Comments: 'Test One', ["Credit Remaining"]: 4, ["L_x002d_Customer"]: 'Test', ["L_x002d_CreditsPurchased"]: '5', ["L_x002d_CreditsForElement"]: '3', ["L_x002d_CreditRemaining"]: '2', "Opportunity_x0020_ID": '1234', "Service_x0020_Type":'Test 1' ,"Element": 'Element', "LOE": 'LOE'},
            { ["Customer"]: 'Customer Two', ["# of Credits Purchased"]: 10, ["# of Credits for this Element"]: 5, Comments: 'Test Two', ["Credit Remaining"]: 5, ["L_x002d_Customer"]: 'Test two', ["L_x002d_CreditsPurchased"]: '5', ["L_x002d_CreditsForElement"]: '3', ["L_x002d_CreditRemaining"]: '2', "Opportunity_x0020_ID": '1234',"Service_x0020_Type":'Test 2',"Element": 'Element', "LOE": 'LOE'},
            { ["Customer"]: 'Customer Three', ["# of Credits Purchased"]: 12, ["# of Credits for this Element"]: 6, Comments: 'Test Three', ["Credit Remaining"]: 6, ["L_x002d_Customer"]: 'Test three', ["L_x002d_CreditsPurchased"]: '5', ["L_x002d_CreditsForElement"]: '3', ["L_x002d_CreditRemaining"]: '2', "Opportunity_x0020_ID": '1234' ,"Service_x0020_Type":'Test 3',"Element": 'Element', "LOE": 'LOE'},
            { ["Customer"]: 'Customer Three', ["# of Credits Purchased"]: 12, ["# of Credits for this Element"]: 6, Comments: 'Test Three', ["Credit Remaining"]: 6, ["L_x002d_Customer"]: 'Test three', ["L_x002d_CreditsPurchased"]: '5', ["L_x002d_CreditsForElement"]: '3', ["L_x002d_CreditRemaining"]: '2', "Opportunity_x0020_ID": '4321' ,"Service_x0020_Type":'Test 4',"Element": 'Element', "LOE": 'LOE'},
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

//Totals Vars
        let _totalCredits:number = 0;
        let _totalUsed:number = 0;
        let _totalRemaining:number = 0;
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
          if (result.length > 1){
            x ++
            if (x==1){
              preHTML += `<div id='Header'>`
              // customer header
              preHTML +=`<div id='CustomerHeader'> ${item.L_x002d_Customer} </div>`

              // Create details for each oppurtunity
                  result.forEach((sameCus: ISPList) =>{
                    // Op Header
                    preHTML += `<div id='OpportunityHeader'>${sameCus.Opportunity_x0020_ID} </div>`
                    preHTML += this.fillDataRow(sameCus.L_x002d_CreditsPurchased,sameCus.L_x002d_CreditRemaining,sameCus.L_x002d_CreditRemaining,false,sameCus.Service_x0020_Type,sameCus.Element,sameCus.LOE)
                    /*`
                    <div id='details'>
                      Details
                    </div>
                    `*/
                  })
                preHTML +=`
                <div id='Total'>
                  Total
                </div>
                `
                preHTML += `</div`
              }
              
// Single Customer              
          }else{
              //call
              //  customerHeader
              //  oppurtunityHeader
              //  details  
              preHTML += `
              <div>
              <div id='customerHeader'>
                  Single - Customer
              </div>
              <div id='oppurtunityHeader'>
                  Op Header
              </div>
              <div id='details'>
                  Details
              </div>
          </div>
              `          
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
 
// Data Row Function  
      private dataRow (customer: string, Opportunity: string, singleCustomer: boolean){
        let dataHTML:string = '';
    
        //single
        if (singleCustomer==true){
          dataHTML += `<h3 id='Header'> ${customer} </h3>`
                      //<div id='DIVafterheader' height='auto' style='height:auto !important'>`;
          dataHTML += `<h4 id='Opportunity'>${Opportunity} </h4>`;
          dataHTML += this.tableHeaderHTML();
        }else{
          //Multi
          //dataHTML += `Same Customer -- start`;
          dataHTML += `<h4 id='Opportunity'>${Opportunity} </h4>`;
          dataHTML += this.tableHeaderHTML();
        }
        return dataHTML;
      }
// tableHeaderHTML Function
      private tableHeaderHTML(){
        // Start Table
        let tablehead:string = '';
        //tablehead += ``;
        // Table Header //
        tablehead += `
                      <table id='ColumnHeaders' class="TFtable" width=100% style="border-collapse: collapse;">
                        <th  align="left">
                          Credits Purchased
                        </th>
                        <th>Credits Used
                        </th>
                        <th  align="left">
                          Credit Remaining
                        </th>
                        <th  align="left">
                          Comemnts
                        </th>
                        <th align="left">
                          Service Type
                        </th>
                        <th>
                          Element
                        </th>
                        <th>
                          LOE
                        </th>
                      </table>`;
                      
          return tablehead;
      }
// fillDataRow function  
      private fillDataRow(curPurchased: string, curUsed: string, curRemaing: string, totals: boolean, ServiceType: string,Element: string,LOE: string) {
        let TableHTML: string = '';
    
        //if (totals != true) {
          // Data Row Start
          TableHTML += `<table>
                        <tr id='Table ROW'>`;
    
          // Cell Start
          TableHTML += `  
                        <td width='15%'>
                          ${curPurchased}
                        </td> 
                        <td width='15%'>
                          ${curUsed}
                        </td>
                        <td width='15%'>
                          ${curRemaing}
                        </td> 
                        <td width='40%'>
                          comments
                        </td> 
                        <td width='15%'>
                          ${ServiceType}
                        </td>  
                        <td>
                          ${Element}
                        </td>
                        <td>
                          ${LOE}
                        </td>
                    `;
          // Cell End L_x002d_CreditsForElement
    
          TableHTML += `</tr>
                    </table>`;
          // Data Row End   
          // Set </table> in calling function
        //} else {
          /*
          // Totals Row
          TableHTML += `
                <tr>
                  <td colspan="2"> Totals </td>
                </tr>
                <tr id='Total ROW'>
                        <td width='15%'>
                          ${curPurchased}
                        </td> 
                        <td width='15%'>
                          ${curUsed}
                        </td>
                        <td width='15%'>
                          ${curRemaing}
                        </td> 
                        <td width='40%'>
                          comments
                        </td> 
                        <td width='15%'>
                          ${ServiceType}
                        </td>  
                        <td>
                          ${Element}
                        </td>
                        <td>
                          ${LOE}
                        </td>
                </tr>`;
        }*/
    
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

/************** ORiginal Loop ****************/
/*
       // Start Table
       datatable = this.tableHTML();
  
       // Start list div
           preHTML += `<div id="DIV to hold list data" class="accordion" style="height:auto !important;">`; //class="accordion" style="height:auto !important;"
  
       // Start Loop //
         items.forEach((item: ISPList) => {
           //preHTML += `<div> --->${item.L_x002d_Customer}<--- </div>`;
 
           var result = items.filter(obj => {
             return obj.L_x002d_Customer === item.L_x002d_Customer;
           });
 
           //Dialog.alert(result.length.toString());
 
           if (result.length > 1){
             _totalOpsforCust=result.length;
             sameCustomer=true; 
             _totalCredits = Number(item["# of Credits Purchased"]);
             _totalUsed += Number(item["# of Credits for this Element"]);
             _totalRemaining += Number(item["Credit Remaining"]);
 
             x += 1;
             if (x==_totalOpsforCust){
               _ReadyForTotal=true;
             }
 
           }else{
 
               _totalCredits = 0;
               _totalUsed = 0;
               _totalRemaining = 0;
 
             
               _totalCredits = Number(item["# of Credits Purchased"]);
               _totalUsed = Number(item["# of Credits for this Element"]);
               _totalRemaining = Number(item["Credit Remaining"]);
               x=0;
               _ReadyForTotal=true;
             
           }
           
         
           //sameCustomer = this.checkCustomer(curCustomner);
           
           // Set Table start HTML
             if (sameCustomer == false) {
               preHTML += this.dataRow(item.L_x002d_Customer,item.Opportunity_x0020_ID,true);
 
             } else {
               //multi
               if (x==1){
                 preHTML += `<h3 id='Header'> multi pass numer=${x}, ${item.L_x002d_Customer} </h3>
                     <div id='DIVafterheader'>`;
               }
               else{
                 preHTML +=`<div id='DIVafterheader'>`;
               }
               preHTML += this.dataRow(item.L_x002d_Customer,item.Opportunity_x0020_ID,false);
               //Dialog.alert('ELSE');
             }
   
           // Set table data
             preHTML += this.fillDataRow(item.L_x002d_Customer,_totalCredits.toString(),_totalUsed.toString(),_totalRemaining.toString(),false,item.Service_x0020_Type,item.Element,item.LOE);
           // Set totals
             //preHTML += this.fillDataRow(item.L_x002d_Customer,item.L_x002d_CreditsPurchased,item.L_x002d_CreditsForElement,item.L_x002d_CreditRemaining,true, item.Service_x0020_Type);
             if (_ReadyForTotal == true ){
               //preHTML += this.dataRow('Totals','For All Oppurtunities',false);
               preHTML += this.fillDataRow('Totals',_totalCredits.toString(),_totalUsed.toString(),_totalRemaining.toString(),true,item.Service_x0020_Type,item.Element,item.LOE);
               //preHTML += this.fillDataRow(item.L_x002d_Customer,item.L_x002d_CreditsPurchased,item.L_x002d_CreditsForElement,item.L_x002d_CreditRemaining,true,item.Service_x0020_Type,item.Element,item.LOE);
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
 
       */
