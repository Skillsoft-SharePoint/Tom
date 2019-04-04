import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './SkillSoftMarketingTilesWebPart.module.scss';
import * as strings from 'SkillSoftMarketingTilesWebPartStrings';
/*
import { SPHttpClient, SPHttpClientResponse, ISPHttpClientOptions} from '@microsoft/sp-http';  
*/
/**************** START - Get the items count from the SharePoint list  *****************/
/*
let currentWebUrl = this.context.pageContext.web.absoluteUrl; 
*/
/**************** END - Get the items count from the SharePoint list  *****************/
/**************** START - Get ALL ITEMS from the SharePoint list  *****************/
/*
let requestUrl = currentWebUrl.concat(“/_api/web/Lists/GetByTitle('YourListTitle')/ItemCount”)   
  
this.context.spHttpClient.get(requestUrl, SPHttpClient.configurations.v1)  
    .then((response: SPHttpClientResponse) => {  
        if (response.ok) {  
            response.json().then((responseJSON) => {  
                if (responseJSON!=null && responseJSON.value!=null){  
        let itemCount:number = parseInt(responseJSON.value.toString());  
                }  
            });  
        }  
    });
*/  
/**************** END - Get ALL ITEMS from the SharePoint list  *****************/

export interface ISkillSoftMarketingTilesWebPartProps {
  description: string;
}

export default class SkillSoftMarketingTilesWebPart extends BaseClientSideWebPart<ISkillSoftMarketingTilesWebPartProps> {

  public render(): void {
    this.domElement.innerHTML = `
    <div>
    <table cellpadding='3' width='100%'>
      <tr>
        <td width='25%'>
          <a href='https://skillsoft.sharepoint.com/sites/accountbasedmarketing'>
            <img width='100%' src='https://skillsoft.sharepoint.com/sites/Marketing/SiteAssets/AccountBasedMarketing.png'>
            </img>
          </a>
        </td>
        <td width='25%'>
          <a href='https://skillsoft.sharepoint.com/sites/AnalystRelations?e=1%3aa9cb404917c848e5b5fe37adaf234047'>
            <img width='100%' src='https://skillsoft.sharepoint.com/sites/Marketing/SiteAssets/AnalystRelations.png'>
            </img>
          </a>
        </td>
        <td width='25%'>
          <a href='https://skillsoft.sharepoint.com/sites/Blogs?e=1%3aacf455e7da9a4400a757ae6c0795902b'>
            <img width='100%' src='https://skillsoft.sharepoint.com/sites/Marketing/SiteAssets/Blogs.png'>
            </img>
          </a>                
        </td>
        <td width='25%'>
          <a href='https://skillsoft.sharepoint.com/sites/brandingandmessaging/'>
            <img width='100%' src='https://skillsoft.sharepoint.com/sites/Marketing/SiteAssets/Branding-Messaging.png'>
            </img>
          </a>        
        </td>
      </tr>
      <!-- Row 2 -->
      <tr>
        <td width='25%'>
          <a href='https://main.calendar.smartsheetapps.com/'>
            <img width='100%' src='https://skillsoft.sharepoint.com/sites/Marketing/SiteAssets/Calendars.png'>
            </img>
          </a>
        </td>
        <td width='25%'>
          <a href='https://skillsoft.sharepoint.com/sites/contentgovernancepublic'>
            <img width='100%' src='https://skillsoft.sharepoint.com/sites/Marketing/SiteAssets/ContentGovernance.png'>
            </img>
          </a>
        </td>
        <td width='25%'>
          <a href='https://skillsoft.sharepoint.com/sites/creativeservices'>
            <img width='100%' src='https://skillsoft.sharepoint.com/sites/Marketing/SiteAssets/CreativeServices.png'>
            </img>
          </a>                
        </td>
        <td width='25%'>
          <a href='https://skillsoft.sharepoint.com/sites/CustomerReferences'>
            <img width='100%' src='https://skillsoft.sharepoint.com/sites/Marketing/SiteAssets/CustomerReference.png'>
            </img>
          </a>        
        </td>
      </tr>      
      <!-- Row 3 -->
      <tr>
        <td width='25%'>
          <a href='https://skillsoft.sharepoint.com/sites/demandgeneration'>
            <img width='100%' src='https://skillsoft.sharepoint.com/sites/Marketing/SiteAssets/DemandGeneration.png'>
            </img>
          </a>
        </td>
        <td width='25%'>
          <a href='https://skillsoft.sharepoint.com/sites/marketingevents'>
            <img width='100%' src='https://skillsoft.sharepoint.com/sites/Marketing/SiteAssets/Events.png'>
            </img>
          </a>
        </td>
        <td width='25%'>
          <a href='https://skillsoft.sharepoint.com/sites/marketingcollateral/'>
            <img width='100%' src='https://skillsoft.sharepoint.com/sites/Marketing/SiteAssets/MarketingCollateral.png'>
            </img>
          </a>                
        </td>
        <td width='25%'>
          <a href='https://skillsoft.sharepoint.com/sites/marketingopspublic'>
            <img width='100%' src='https://skillsoft.sharepoint.com/sites/Marketing/SiteAssets/MarketingOps.png'>
            </img>
          </a>        
        </td>
      </tr>
      <!-- Row 4 -->      
      <tr>
        <td width='25%'>
          <a href='https://skillsoft.sharepoint.com/sites/PublicRelations2?e=1%3a1a5af9a42450401d987115c7865daaee'>
            <img width='100%' src='https://skillsoft.sharepoint.com/sites/Marketing/SiteAssets/PublicRelations.png'>
            </img>
          </a>
        </td>
        <td width='25%'>
          <a href='https://skillsoft.sharepoint.com/sites/socialmedia'>
            <img width='100%' src='https://skillsoft.sharepoint.com/sites/Marketing/SiteAssets/SocialMedia.png'>
            </img>
          </a>
        </td>
        <td width='25%'>
                       
        </td>
        <td width='25%'>
              
        </td>
      </tr>      
    </table>
  </div>`;
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
