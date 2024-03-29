/**
 * Created by lwq11 on 2019/6/6.
 */
$(function () {
    var id='local';
    var xdata=['05-01','05-02','05-03','05-04','05-05','05-06','05-07'];
    var ydata=[24,33,15,26,34,18,17];
    var xname='时间';
    var yname='空气质量';
    var title='测试数据';
    drowEchart(id,xdata,ydata,xname,yname,title);
    $("button").click(function(){
        var city = $("input").val();
        $.get("./air.php?city="+city,function(data,status){
            var airData=JSON.parse(data);
            if (airData.resultcode!='200'){
                alert("不好意思，暂时无法查到该城市的空气质量，请核对正确后再查询！");
            }
            var cityNow=airData.result[0].citynow;
            var lastMonth=airData.result[0].lastTwoWeeks;
            var zone=airData.result[0].lastMoniData;
            // 绘制本城市近期的空气质量
            var aqi=[];
            var lastTowWeeks=[];
            for (var i in lastMonth) {
                aqi.push(lastMonth[i].AQI);
                var str=lastMonth[i].date;
                str=str.substr(5,5);
                lastTowWeeks.push(str);
            }
            drowEchart('local',lastTowWeeks,aqi,'时间','空气质量',cityNow.city+'近期的空气质量');

            // 绘制本城市各个地区的空气质量
            var areaAqi=[];
            var city=[];
            for (var j in zone) {
                var area= zone[j];
                areaAqi.push(zone[j].AQI);
                city.push(zone[j].city);
            }
            drowEchart('area',city,areaAqi,'地区','空气质量',cityNow.city+'部分地区的空气质量');

        });
    });

});
function drowEchart(id,xdata,ydata,xname,yname,title) {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById(id));
    // 指定图表的配置项和数据
    option = {
        title:{
            left:'center',
            text:title
        },
        xAxis: {
            type: 'category',
            data: xdata,
            name: xname,
            axisLine:{
                symbol:["none","arrow"]
            }
        },
        dataZoom: [
            {   // 这个dataZoom组件，默认控制x轴。
                type: 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
                start: 0,      // 左边在 10% 的位置。
                end: 100         // 右边在 60% 的位置。
            }
        ],
        yAxis: {
            type: 'value',
            name: yname,
            axisLine:{
                symbol:["none","arrow"]
            }
        },
        series: [{
            data:ydata,
            type: 'line'
        }]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
}