import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'CelendarFeedSummaryWebPartStrings';
import CelendarFeedSummary from './components/CelendarFeedSummary';
import { ICelendarFeedSummaryProps } from './components/ICelendarFeedSummaryProps';

import { ICelendarFeedSummaryWebPartProps } from './CalendarFeedSummaryWebPart.types';


export default class CelendarFeedSummaryWebPart extends BaseClientSideWebPart<ICelendarFeedSummaryWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ICelendarFeedSummaryProps > = React.createElement(
      CelendarFeedSummary,
      {
        description: this.properties.description
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
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
