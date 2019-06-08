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
export default class OnDemandCreditListWebPart extends BaseClientSideWebPart<IOnDemandCreditListWebPartProps> {

  public render(): void {

  

    let find = fruits.indexOf('Apple');
    
    Dialog.alert('hello');
    
    

    this.domElement.innerHTML = `
      <div class="${ styles.onDemandCreditList }">
        <div class="${ styles.container }">
          <div class="${ styles.row }">
            <div class="${ styles.column }">
              <span class="${ styles.title }">Welcome to SharePoint!</span>
              <p class="${ styles.subTitle }">Customize SharePoint experiences using Web Parts.</p>
              <p class="${ styles.description }">${escape(this.properties.description)}</p>
              <a href="https://aka.ms/spfx" class="${ styles.button }">
                <span class="${ styles.label }">Learn more</span>
              </a>
            </div>
          </div>
        </div>
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
