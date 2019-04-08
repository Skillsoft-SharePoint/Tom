import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import {
  Environment,
  EnvironmentType
} from '@microsoft/sp-core-library';


import styles from './GetSpListItems.module.scss';
import * as strings from 'getSpListItemsStrings';
import { IGetSpListItemsWebPartProps } from './IGetSpListItemsWebPartProps';
import MockHttpClient from './MockHttpClient';

import {
  SPHttpClient
} from '@microsoft/sp-http';


	export interface ISPLists {
	  value: ISPList[];
	}
	export interface ISPList {
	  EmployeeId: string;
	  EmployeeName: string;
	  Experience: string;
	  Location: string;
	} 

export default class GetSpListItemsWebPart extends BaseClientSideWebPart<IGetSpListItemsWebPartProps> {

 private _getListData(): Promise<ISPLists> {
return this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl + `/_api/web/lists/GetByTitle('EmployeeList')/Items`, SPHttpClient.configurations.v1)
    .then((response: Response) => { 
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
  html += `<th>EmployeeId</th><th>EmployeeName</th><th>Experience</th><th>Location</th>`;
  items.forEach((item: ISPList) => {
    html += `
         <tr>
        <td>${item.EmployeeId}</td>
        <td>${item.EmployeeName}</td>
        <td>${item.Experience}</td>
        <td>${item.Location}</td>
        </tr>
        `;
  });
  html += `</table>`;
  const listContainer: Element = this.domElement.querySelector('#spListContainer');
  listContainer.innerHTML = html;
}

  public render(): void {
     this.domElement.innerHTML = `
     <div class="${styles.helloWorld}">
  <div class="${styles.container}">
    <div class="ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}">
      <div class="ms-Grid-col ms-u-lg10 ms-u-xl8 ms-u-xlPush2 ms-u-lgPush1">
        <span class="ms-font-xl ms-fontColor-white" style="font-size:28px">Welcome to SharePoint Framework Development</span>
        
        <p class="ms-font-l ms-fontColor-white" style="text-align: center">Demo : Retrieve Employee Data from SharePoint List</p>
      </div>
    </div>
    <div class="ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}">
    <div style="background-color:Black;color:white;text-align: center;font-weight: bold;font-size:18px;">Employee Details</div>
    <br>
<div id="spListContainer" />
    </div>
  </div>
</div>`;
this._renderListAsync();
  }

private _getMockListData(): Promise<ISPLists> {
    return MockHttpClient.get(this.context.pageContext.web.absoluteUrl).then(() => {
        const listData: ISPLists = {
            value:
            [
                { EmployeeId: 'E123', EmployeeName: 'John', Experience: 'SharePoint',Location: 'India' },
                 { EmployeeId: 'E567', EmployeeName: 'Martin', Experience: '.NET',Location: 'Qatar' },
                { EmployeeId: 'E367', EmployeeName: 'Luke', Experience: 'JAVA',Location: 'UK' }
            ]
            };
        return listData;
    }) as Promise<ISPLists>;
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
