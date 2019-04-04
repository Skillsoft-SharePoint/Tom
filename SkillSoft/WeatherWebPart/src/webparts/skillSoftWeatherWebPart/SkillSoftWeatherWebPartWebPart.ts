import { override } from '@microsoft/decorators';
import { Version } from '@microsoft/sp-core-library';

import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer, PlaceholderContent, PlaceholderName, PlaceholderProvider //og did not have "", PlaceholderContent, PlaceholderName, PlaceholderProvider"
} from '@microsoft/sp-application-base';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import { escape } from '@microsoft/sp-lodash-subset';
import { Dialog } from '@microsoft/sp-dialog';


import styles from './SkillSoftWeatherWebPartWebPart.module.scss';
import * as strings from 'SkillSoftWeatherWebPartWebPartStrings';

import * as $ from "jquery";

import { HttpClient, IHttpClientOptions, HttpClientResponse } from '@microsoft/sp-http';



export interface ISkillSoftWeatherWebPartWebPartProps {
  description: string;
}



export default class SkillSoftWeatherWebPartWebPart extends BaseClientSideWebPart<ISkillSoftWeatherWebPartWebPartProps> {
  
  public render(): void {
  
    var temperature = "";
    //var hiTemperature: string;
    //var minTemperature: string;
    var tableweather="";
    //Dialog.alert(`Test`);

    /************** Start Get Location and Weather API */
    if (window.navigator && window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
          position => {
              /************** Start Get current location using browser goelocation */
              //this.geolocationPosition = position,
              //    console.log(position)
              //show the current location in Log/Lat
              Dialog.alert(`Your Position : Lat: ${position.coords.latitude} Long : ${position.coords.longitude}`);
              //Dialog.alert(`Your Position ${ position}`);
              /************** End Get current location using browser goelocation */

              /************** Start Weather API Code */
              /************** Place weather API here, then render the results below
              /*Loading Weather Info*/
              /*
              /*************** OpenWeatherMap, returns city and country code */
                /*
                /*************** our appid:17856b691c65c32edf204203fcf9bf8a */
                /*************** url: https://api.openweathermap.org/data/2.5/weather?lat=42.7186746&lon=-71.4596085&appid=17856b691c65c32edf204203fcf9bf8a */
                /* */
                
                $.ajax({
                    url: "https://api.openweathermap.org/data/2.5/weather",
                    jsonp: "callback",
                    dataType: "jsonp",
                    data: {
                        //id: "2172797",
                        lat: "42.7186746",
                        lon: "-71.4596085", 
                        APPID: "17856b691c65c32edf204203fcf9bf8a"
                    },
                    success: function( response ) {
                        console.log( response ); // server response
                        //$('.current').html('<img src="http://openweathermap.org/img/w/' + response.weather[0].icon + '.png" /> ' + response.weather[0].main);
                        Dialog.alert(`${response.weather[0].icon + '.png'} Main: ${response.weather[0].main.temp}`)
                    }
                });

                
              /**************** End OpenWeatherMap */
              /**************** Start Dark Sky */
              /*
              $.ajax({
                //OLD - https://api.darksky.net/forecast/9ca71f8501030cefecfa79c9899b9b32/
                //New - https://api.darksky.net/forecast/2c3e48f41b883239098dd06d35bb8161/
                url: "https://api.darksky.net/forecast/2c3e48f41b883239098dd06d35bb8161/" + position.coords.latitude + "," + position.coords.longitude,
                dataType: "jsonp",
                success: function (data) {
      
                  temperature = (data.currently.temperature).toFixed(0);
                  var hiTemperature = ((data.daily.data[0].apparentTemperatureHigh - 32) * 5 / 9).toFixed(0);
                  var minTemperature = ((data.daily.data[0].apparentTemperatureMin - 32) * 5 / 9).toFixed(0);
                  /*
                  var temperature = ((data.currently.temperature - 32) * 5 / 9).toFixed(0);
                  var hiTemperature = ((data.daily.data[0].apparentTemperatureHigh - 32) * 5 / 9).toFixed(0);
                  var minTemperature = ((data.daily.data[0].apparentTemperatureMin - 32) * 5 / 9).toFixed(0);
                  */
                    //binding to  weather code to table;
              /*       tableweather = 'temp = ' + temperature;
                    
                    if (tableweather != ""){
                      
                      $('#actualweather').html(tableweather);
                      //Dialog.alert(`not null`);
                      $('#fromvar').html(temperature);
                      $('#currenttemp').html(temperature);
                      
                    }
                    /*
                    Dialog.alert(`${tableweather}`);
                    */
                    /*
                            '<table style="height:80%;display: inline-block;">' +
                                      '<tr>' +
                                        '<td style="font-size: 35px;font-weight:bold;padding-top: 5px;">' + temperature + '&#176;</td>' +
                                        '<td>' + 
                                            '<div style="font-size: 12px;font-weight:bold;padding-top:10px;">Hi ' + hiTemperature + '&#176;</div>' +
                                            '<div style="font-size: 12px;font-weight:bold;">Lo ' + minTemperature + '&#176;</div></td>' +
                                      '</tr>' + 
                                      '<tr>' + 
                                        '<td colspan="2" style="font-size: 14px;font-weight:bold;">' + 'City' + '</td>' + 
                                      '</tr>' + 
                              '</table>';
                    */
                    //binding to div tag
                    //$('.secondheaderweather').html(tableweather);
              /*    
                },
                error: function (data) {
                    console.log(data);
                }
                
            });
            /**************** End Dark Sky */

          },
          error => {
              switch (error.code) {
                  case 1:
                      console.log('Permission Denied');
                      break;
                  case 2:
                      console.log('Position Unavailable');
                      break;
                  case 3:
                      console.log('Timeout');
                      break;
              }
          });
          
      }else{Dialog.alert(`Error`)}

      Dialog.alert(`${tableweather}`);      
    /************** End Get Location and Weather API */

    /************** Actual Render of WebPart */
    //<div calss="secondheaderweather">${ tableweather }</div>
    /*
              <!--
              <p class="${ styles.subTitle }"><iframe src="https://www.meteoblue.com/en/weather/widget/daily?geoloc=detect&days=4&tempunit=FAHRENHEIT&windunit=MILE_PER_HOUR&precipunit=INCH&coloured=monochrome&pictoicon=0&pictoicon=1&maxtemperature=0&maxtemperature=1&mintemperature=0&mintemperature=1&windspeed=0&windgust=0&winddirection=0&uv=0&humidity=0&precipitation=0&precipitation=1&precipitationprobability=0&precipitationprobability=1&spot=0&pressure=0&layout=light"  frameborder="0" scrolling="NO" allowtransparency="true" sandbox="allow-same-origin allow-scripts allow-popups allow-popups-to-escape-sandbox" style="width: 216px;height: 263px">
              </iframe>
              <div><!-- DO NOT REMOVE THIS LINK -->
              <!--
                <a href="https://www.meteoblue.com/en/weather/forecast/week?utm_source=weather_widget&utm_medium=linkus&utm_content=daily&utm_campaign=Weather%2BWidget" target="_blank">meteoblue
                </a>
              </div>
              </p>
              --> 

    */
    this.domElement.innerHTML = `
      <div class="${ styles.skillSoftWeatherWebPart }">
        <div class="${ styles.container }">
          <div class="${ styles.row }">
            <div class="${ styles.column }">
              <span class="${ styles.title }">Weather</span>
              <div id="actualweather"> Actual Weather ${ tableweather} </div>
              <div id="fromvar"> from global var: ${ temperature } </div>
                <table style="height:80%;display: inline-block;">
                  <tr>
                    <td style="font-size: 35px;font-weight:bold;padding-top: 5px;">
                      <div id="currenttemp">Current Temp ${ temperature } &#176;</div>
                    </td>
                    <td>
                      <div style="font-size: 12px;font-weight:bold;padding-top:10px;">Hi &#176;</div>
                      <div style="font-size: 12px;font-weight:bold;">Lo &#176;</div>
                    </td>
                </tr>
                <tr>
                    <td colspan="2" style="font-size: 14px;font-weight:bold;">City</td>
                </tr>
              </table>
              <!-- 
              <p class="${ styles.subTitle }"><iframe src="https://www.meteoblue.com/en/weather/widget/daily?geoloc=detect&days=4&tempunit=FAHRENHEIT&windunit=MILE_PER_HOUR&precipunit=INCH&coloured=monochrome&pictoicon=0&pictoicon=1&maxtemperature=0&maxtemperature=1&mintemperature=0&mintemperature=1&windspeed=0&windgust=0&winddirection=0&uv=0&humidity=0&precipitation=0&precipitation=1&precipitationprobability=0&precipitationprobability=1&spot=0&pressure=0&layout=light"  frameborder="0" scrolling="NO" allowtransparency="true" sandbox="allow-same-origin allow-scripts allow-popups allow-popups-to-escape-sandbox" style="width: 216px;height: 263px">
              </iframe>
              <div>
                <a href="https://www.meteoblue.com/en/weather/forecast/week?utm_source=weather_widget&utm_medium=linkus&utm_content=daily&utm_campaign=Weather%2BWidget" target="_blank">meteoblue
                </a>
              </div>
              </p>              
              -->
              <p class="${ styles.description }">${escape(this.properties.description)}</p>
              <a href="https://aka.ms/spfx" class="${ styles.button }">
                <span class="${ styles.label }">Learn more</span>
              </a>
            </div>
          </div>
        </div>
      </div>`;
    /************** End Actual Render of WebPart */ 
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
