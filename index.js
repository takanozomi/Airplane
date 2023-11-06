const express = require('express');
const request = require('request');
const xml2js = require('xml2js');
const app = express();
const port = 8080;
const apiKey = 'fU20vGzkaNwrPtq9F4kp%2BhKU6yfSG%2B%2FirmXLEsA9%2BFiHacXfVRiMQ%2F%2Bl8%2BR7osxF3msb0J4rIPQGq1sx%2FSf7Vg%3D%3D';


app.get('/getAirportSchedule', (req, res) => {
  const url = 'http://openapi.airport.co.kr/service/rest/FlightScheduleList/getIflightScheduleList';
  const queryParams = `?serviceKey=${apiKey}&schDate=${req.query.schDate}&schDeptCityCode=${req.query.schDeptCityCode}&schArrvCityCode=${req.query.schArrvCityCode}`;

  request({
    url: url + queryParams,
    method: 'GET',
  }, (error, response, body) => {
    if (error) {
      console.error('API 호출 중 오류 발생:', error);
      res.status(500).json({ error: 'API 호출 중 오류 발생' });
    } else {
      // XML 데이터를 JSON으로 변환
      xml2js.parseString(body, (err, result) => {
        if (err) {
          console.error('XML을 JSON으로 변환 중 오류 발생:', err);
          res.status(500).json({ error: 'XML을 JSON으로 변환 중 오류 발생' });
        } else {
          // JSON 형식으로 변환된 데이터를 클라이언트에게 응답
          res.set('Content-Type', 'application/json');
          res.send(result);
        }
      });
    }
  });
});


// 클라이언트에게 API 결과를 보내주는 엔드포인트
app.get('/getAirportData', (req, res) => {


  const url = 'http://openapi.airport.co.kr/service/rest/FlightStatusList/getFlightStatusList';
  const queryParams = `?serviceKey=${apiKey}`;

  request({
    url: url + queryParams,
    method: 'GET'
  }, (error, response, body) => {
    if (error) {
      console.error('API 호출 중 오류 발생:', error);
      res.status(500).json({ error: 'API 호출 중 오류 발생' });
    } else {
      // XML 데이터를 JSON으로 변환
      xml2js.parseString(body, (err, result) => {
        if (err) {
          console.error('XML을 JSON으로 변환 중 오류 발생:', err);
          res.status(500).json({ error: 'XML을 JSON으로 변환 중 오류 발생' });
        } else {
          // JSON 형식으로 변환된 데이터를 클라이언트에게 응답
          res.set('Content-Type', 'application/json');
          res.send(result);
        }
      });
    }
  });
});

app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/home.html');
});

app.get('/schedule', function(req,res){
  res.sendFile(__dirname + '/Schedule_Search.html');
})
app.get('/realtime', function(req,res){
  res.sendFile(__dirname + '/Realtime_Search.html');
})