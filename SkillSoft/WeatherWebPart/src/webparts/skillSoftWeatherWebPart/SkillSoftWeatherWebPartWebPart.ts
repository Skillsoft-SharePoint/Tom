import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './SkillSoftWeatherWebPartWebPart.module.scss';
import * as strings from 'SkillSoftWeatherWebPartWebPartStrings';

export interface ISkillSoftWeatherWebPartWebPartProps {
  description: string;
}

export default class SkillSoftWeatherWebPartWebPart extends BaseClientSideWebPart<ISkillSoftWeatherWebPartWebPartProps> {

  public render(): void {
    this.domElement.innerHTML = `
      <div class="${ styles.skillSoftWeatherWebPart }">
        <div class="${ styles.container }">
          <div class="${ styles.row }">
            <div class="${ styles.column }">
              <span class="${ styles.title }">Weather</span>
              <p class="${ styles.subTitle }"><iframe src="https://www.meteoblue.com/en/weather/widget/daily?geoloc=detect&days=4&tempunit=FAHRENHEIT&windunit=MILE_PER_HOUR&precipunit=INCH&coloured=monochrome&pictoicon=0&pictoicon=1&maxtemperature=0&maxtemperature=1&mintemperature=0&mintemperature=1&windspeed=0&windgust=0&winddirection=0&uv=0&humidity=0&precipitation=0&precipitation=1&precipitationprobability=0&precipitationprobability=1&spot=0&pressure=0&layout=light"  frameborder="0" scrolling="NO" allowtransparency="true" sandbox="allow-same-origin allow-scripts allow-popups allow-popups-to-escape-sandbox" style="width: 216px;height: 263px">
              </iframe>
              <div><!-- DO NOT REMOVE THIS LINK -->
                <a href="https://www.meteoblue.com/en/weather/forecast/week?utm_source=weather_widget&utm_medium=linkus&utm_content=daily&utm_campaign=Weather%2BWidget" target="_blank">meteoblue
                </a>
              </div></p>
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
