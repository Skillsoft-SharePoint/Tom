/*<!-- Weather script start here-->*/
<script type="text/javascript">

    /*Loading Weather Info*/
    window.__geoJSONPCallback = function (loc) {

        $.ajax({
            url: "https://api.darksky.net/forecast/9ca71f8501030cefecfa79c9899b9b32/" + loc.latitude + "," + loc.longitude,
            dataType: "jsonp",
            success: function (data) {

                var temperature = ((data.currently.temperature - 32) * 5 / 9).toFixed(0);
                var hiTemperature = ((data.daily.data[0].apparentTemperatureHigh - 32) * 5 / 9).toFixed(0);
                var minTemperature = ((data.daily.data[0].apparentTemperatureMin - 32) * 5 / 9).toFixed(0);

                //binding to  weather code to table;
                var tableweather = '<table style="height:80%;display: inline-block;"><tr><td style="font-size: 35px;font-weight:bold;padding-top: 5px;">' + temperature + '&#176;</td>' +
                    '<td><div style="font-size: 12px;font-weight:bold;padding-top:10px;">Hi ' + hiTemperature + '&#176;</div>' +
                    '<div style="font-size: 12px;font-weight:bold;">Lo ' + minTemperature + '&#176;</div></td>' +
                    '</tr><tr><td colspan="2" style="font-size: 14px;font-weight:bold;">' + loc.city + '</td></tr></table>';

                //binding to div tag
                $('.secondheaderweather').html(tableweather);

            },
            error: function (data) {
                console.log(data);
            }
        })
    };
</script>
/*<!-- Weather __geoJSONPCallback function-->*/
<script src="https://geo.weatherfor.us/json/?callback=__geoJSONPCallback" type="text/javascript"></script>
