
var statelamp =false;
var statefan =false;
var statepump =false;
var valueLamp ="OFF";
var valueFan ="OFF";
var valuePump ="OFF";
var t_check = 0; 
var h_check = 0;
var l_check = 0; // khởi tạo giá trị ban đầu của biến check
var f_check = 0;
var p_check = 0;


function LoadForm()
{
 document.getElementById("dangnhap").style.display = "block";
 document.getElementById("dieukhien").style.display = "none";

}

// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyA5R3tSn0rVajaU30eF3fgkhfRGZqvmaGA",
    authDomain: "tt-iot-eeb9d.firebaseapp.com",
    databaseURL: "https://tt-iot-eeb9d-default-rtdb.firebaseio.com",
    projectId: "tt-iot-eeb9d",
    storageBucket: "tt-iot-eeb9d.appspot.com",
    messagingSenderId: "610709263766",
    appId: "1:610709263766:web:d674ce2b9525e9bbcfb9b7"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  
  //functions
  // make sure that the name in ' ' match with name of your database child
  var nhietDo = document.getElementById('nhietdo');
  var dbRef = firebase.database().ref().child('Nhiet do');
  var doAm = document.getElementById('doam');
  var dbRef2 = firebase.database().ref().child('Do am');
  dbRef.on('value', snap => nhietDo.innerText = snap.val());
  dbRef2.on('value', snap => doAm.innerText = snap.val());

//-------------------------------------------------------
  //var userName = document.getElementById('username');
  //var passWord = document.getElementById('password');
  var username =firebase.database().ref('users').child('username');
  var password =firebase.database().ref('users').child('password');
  //username.on('value', snap => userName.innerText = snap.val());
  //password.on('value', snap => passWord.innerText = snap.val());

  var usernameValue, passwordValue;
  username.on('value', snap => usernameValue = snap.val());
  password.on('value', snap => passwordValue = snap.val());
//-------------------------------------------------------
// // Get the references to the HTML input fields
// var userName = document.getElementById('username');
// var passWord = document.getElementById('password');

// // Get the references to the Firebase Realtime Database nodes
// var usersRef = firebase.database().ref('users');
// var usernameRef = usersRef.child('username');
// var passwordRef = usersRef.child('password');

// // Retrieve the data from Firebase Realtime Database and update the input fields
// usernameRef.on('value', function(snapshot) {
//   userName.value = snapshot.val();
// });
// passwordRef.on('value', function(snapshot) {
//   passWord.value = snapshot.val();
// });
//-------------------------------------------------------
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChartDoAm() {
  var data = new google.visualization.DataTable();
  data.addColumn('datetime', 'Thời gian');
  data.addColumn('number', 'Độ ẩm');

  var options = {
    title: 'Biểu đồ độ ẩm',
    curveType: 'function',
    legend: { position: 'bottom' }
  };

  var chart = new google.visualization.LineChart(document.getElementById('chart_div'));


  dbRef2.on('value', function(snapshot) {
    var values = snapshot.val();
    var dataChart = [];

    for (var key in values) {
      if (values.hasOwnProperty(key)) {
        var value = values[key];
        dataChart.push([new Date(key), value]);
      }
    }

    data.addRows(dataChart);
    chart.draw(data, options);
  });
}


  var lampp = document.getElementById('den');
  var dbRef3 = firebase.database().ref('DK').child('den');
  dbRef3.on('value', snap => lampp.innerText = snap.val());

  var fann = document.getElementById('quat');
  var dbRef4 = firebase.database().ref('DK').child('quat');
  dbRef4.on('value', snap => fann.innerText = snap.val());

  var pumpp = document.getElementById('maybom');
  var dbRef5 = firebase.database().ref('DK').child('maybom');
  dbRef5.on('value', snap => pumpp.innerText = snap.val());

      // Đăng ký sự kiện on thay đổi dữ liệu trên Firebase
      firebase.database().ref('temp_setup').on('value', function(snapshot) {
        var data = snapshot.val();
        document.getElementById("temp_min").value = data.temp_min;
        document.getElementById("temp_max").value = data.temp_max;
      });
      firebase.database().ref('hum_setup').on('value', function(snapshot) {
        var data = snapshot.val();
        document.getElementById("hum_min").value = data.hum_min;
        document.getElementById("hum_max").value = data.hum_max;
      });
    // Đăng ký sự kiện on thay đổi dữ liệu trên Firebase
    firebase.database().ref('lamp_timer').on('value', function(snapshot) {
      var data = snapshot.val();
      document.getElementById("l_s_hour").value = data.l_s_hour;
      document.getElementById("l_s_minute").value = data.l_s_minute;
      document.getElementById("l_s_day").value = data.l_s_day;
      document.getElementById("l_e_hour").value = data.l_e_hour;
      document.getElementById("l_e_minute").value = data.l_e_minute;
      document.getElementById("l_e_day").value = data.l_e_day;
    });

        // Đăng ký sự kiện on thay đổi dữ liệu trên Firebase
        firebase.database().ref('fan_timer').on('value', function(snapshot) {
          var data = snapshot.val();
          document.getElementById("f_s_hour").value = data.f_s_hour;
          document.getElementById("f_s_minute").value = data.f_s_minute;
          document.getElementById("f_s_day").value = data.f_s_day;
          document.getElementById("f_e_hour").value = data.f_e_hour;
          document.getElementById("f_e_minute").value = data.f_e_minute;
          document.getElementById("f_e_day").value = data.f_e_day;
        });
            // Đăng ký sự kiện on thay đổi dữ liệu trên Firebase
            firebase.database().ref('pump_timer').on('value', function(snapshot) {
              var data = snapshot.val();
              document.getElementById("p_s_hour").value = data.p_s_hour;
              document.getElementById("p_s_minute").value = data.p_s_minute;
              document.getElementById("p_s_day").value = data.p_s_day;
              document.getElementById("p_e_hour").value = data.p_e_hour;
              document.getElementById("p_e_minute").value = data.p_e_minute;
              document.getElementById("p_e_day").value = data.p_e_day;
            });


  function WriteDataTofb(lamp,fan,pump)
{
    firebase.database().ref("DK").set({
        den:lamp,
        quat:fan,
        maybom:pump
    });

}


function clicklamp(){
  statelamp=!statelamp;
  if(statelamp){
      valueLamp="ON";
  }else{
      valueLamp="OFF"
  }
  WriteDataTofb(valueLamp,valueFan,valuePump);
}

function clickfan(){
  statefan=!statefan;
  if(statefan){
      valueFan="ON";
  }else{
      valueFan="OFF"
  }
  WriteDataTofb(valueLamp,valueFan,valuePump);
}

function clickpump(){
  statepump=!statepump;
  if(statepump){
      valuePump="ON";
  }else{
      valuePump="OFF"
  }
  WriteDataTofb(valueLamp,valueFan,valuePump);
}
function temp_save()
{
    // Lấy giá trị giờ, phút và ngày từ các trường nhập liệu
    var temp_min = document.getElementById("temp_min").value;
    var temp_max = document.getElementById("temp_max").value;

    // Ghi thông tin lên Firebase
  
  
      firebase.database().ref("temp_setup").set({
        temp_min: temp_min,
        temp_max: temp_max,
        t_check: ++t_check
      });
}
function hum_save()
{
      // Lấy giá trị giờ, phút và ngày từ các trường nhập liệu
      var hum_min = document.getElementById("hum_min").value;
      var hum_max = document.getElementById("hum_max").value;
  
      // Ghi thông tin lên Firebase
    
    
        firebase.database().ref("hum_setup").set({
          hum_min: hum_min,
          hum_max: hum_max,
          h_check: ++h_check
        });
}
function lamp_saveTimer() {
  // Lấy giá trị giờ, phút và ngày từ các trường nhập liệu
  var l_s_hour = document.getElementById("l_s_hour").value;
  var l_s_minute = document.getElementById("l_s_minute").value;
  var l_s_day = document.getElementById("l_s_day").value;
  var l_e_hour = document.getElementById("l_e_hour").value;
  var l_e_minute = document.getElementById("l_e_minute").value;
  var l_e_day = document.getElementById("l_e_day").value;
  // Ghi thông tin lên Firebase


    firebase.database().ref("lamp_timer").set({
      l_s_hour: l_s_hour,
      l_s_minute: l_s_minute,
      l_s_day: l_s_day,
      l_e_hour: l_e_hour,
      l_e_minute: l_e_minute,
      l_e_day: l_e_day,
      l_check: ++l_check
    });
    // database.ref('hengio/check').set(++check);
}
function fan_saveTimer() {
  // Lấy giá trị giờ, phút và ngày từ các trường nhập liệu
  var f_s_hour = document.getElementById("f_s_hour").value;
  var f_s_minute = document.getElementById("f_s_minute").value;
  var f_s_day = document.getElementById("f_s_day").value;
  var f_e_hour = document.getElementById("f_e_hour").value;
  var f_e_minute = document.getElementById("f_e_minute").value;
  var f_e_day = document.getElementById("f_e_day").value;
  
  // Ghi thông tin lên Firebase


    firebase.database().ref("fan_timer").set({
      f_s_hour: f_s_hour,
      f_s_minute: f_s_minute,
      f_s_day: f_s_day,
      f_e_hour: f_e_hour,
      f_e_minute: f_e_minute,
      f_e_day: f_e_day,
      f_check: ++f_check
    });
    // database.ref('hengio/check').set(++check);
}

function pump_saveTimer() {
  // Lấy giá trị giờ, phút và ngày từ các trường nhập liệu
  var p_s_hour = document.getElementById("p_s_hour").value;
  var p_s_minute = document.getElementById("p_s_minute").value;
  var p_s_day = document.getElementById("p_s_day").value;
  var p_e_hour = document.getElementById("p_e_hour").value;
  var p_e_minute = document.getElementById("p_e_minute").value;
  var p_e_day = document.getElementById("p_e_day").value;
  // Ghi thông tin lên Firebase


    firebase.database().ref("pump_timer").set({
      p_s_hour: p_s_hour,
      p_s_minute: p_s_minute,
      p_s_day: p_s_day,
      p_e_hour: p_e_hour,
      p_e_minute: p_e_minute,
      p_e_day: p_e_day,
      p_check: ++p_check
    });
    // database.ref('hengio/check').set(++check);
}

function backHOME(){
 //window.onload();
   if (window.confirm('Bạn muốn quay lại???'))
   {
       document.getElementById("dangnhap").style.display = "block";
       document.getElementById("dieukhien").style.display = "none";
   }
   else
   {
       document.getElementById("dangnhap").style.display = "none";
       document.getElementById("dieukhien").style.display = "block";	
   }
}
//-----------------------------------------------------------------
//check login form
function login()
{
   var ssid = document.getElementById("ssid").value;
   var pass = document.getElementById("pass").value;
  //  var ssid1 = document.getElementById("username").value;
  //  var pass1 = document.getElementById("password").value;
   if(ssid == usernameValue && pass == passwordValue)
   {
       console.log("OK");
       document.getElementById("ssid").value = "";	
       document.getElementById("pass").value = "";
       document.getElementById("dangnhap").style.display = "none";
       document.getElementById("dieukhien").style.display = "block";	
       
   }
   else 
   {
       console.log("Error!!!");
       document.getElementById("ssid").value = "";	
       document.getElementById("pass").value = "";
       alert("Tên đăng nhập hoặc mật khẩu không đúng vui lòng kiểm tra lại!!!");
   }
}

//-----------------------------------------------------------------
// function login() {
//   const username = document.getElementById("ssid").value;
//   const password = document.getElementById("pass").value;

//   // Query data from Firebase Realtime Database
//   const usersRef = firebase.database().ref("users");
//   usersRef.orderByChild("username").equalTo(username).once("value")
//     .then((snapshot) => {
//       const user = snapshot.val();
//       if (user && user.password === password) {
//         // Login success, do something here
//       //  console.log(user.password);
//         console.log("Đăng nhập thành công!");
//       } else {
//       //  console.log(user.password);
//         alert(user.password);
//         alert("Tên đăng nhập hoặc mật khẩu không đúng!");
//       }
//     })
//     .catch((error) => {
//       console.error(error);
//       alert("Đã xảy ra lỗi khi đăng nhập!");
//     });
// }
//-----------------------------------------------------------------

google.charts.load('current', {'packages':['gauge']});
google.charts.setOnLoadCallback(drawChart);
function drawChart() 
{
   var data = google.visualization.arrayToDataTable([
 ['Label', 'Value'],
 ['Nhiệt độ', 80],
]);

var data1 = google.visualization.arrayToDataTable([
 ['Label', 'Value'],
 ['Độ ẩm', 80],

]);

var optionsnhietdo = {
 min: 0, max: 150,
 width: 400, height: 120,
 redFrom: 130, redTo: 150,
 yellowFrom:100, yellowTo: 140,
 minorTicks: 5
};

var optionsdoam = {
 min: 0, max: 100,
 width: 400, height: 120,
 redFrom: 80, redTo: 100,
 yellowFrom:70, yellowTo:80,
 minorTicks: 5
};

var chart = new google.visualization.Gauge(document.getElementById('chart_nhietdo'));		
var chart1 = new google.visualization.Gauge(document.getElementById('chart_doam'));
   
chart.draw(data, optionsnhietdo);

chart1.draw(data1, optionsdoam);


setInterval(function() {
 
 var datanhietdo = nhietDo.innerText;
 data.setValue(0, 1, datanhietdo);
 chart.draw(data, optionsnhietdo);
}, 300);

setInterval(function() {
var datadoam = doAm.innerText;
 data1.setValue(0, 1, datadoam);
 chart1.draw(data1, optionsdoam);
}, 300);	
}

function Start()
{
LoadForm();
myFunction();
//UpdateData();
}

function myFunction() {
 var x = document.getElementById("pass");
 if (x.type === "password") {
   x.type = "text";
 } else {
   x.type = "password";
 }
}

const apiKey = '2ea2cd000b72e7e30eb60d0ba194b960';
const lat = 40.712776;
const lon = -74.005974;
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=21.053512&lon=105.784442&appid=2ea2cd000b72e7e30eb60d0ba194b960`;

fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    const temperature = Math.round(data.main.temp - 273.15);
    const humidity = data.main.humidity;
    const weatherDescription = data.weather[0].description;
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`;

    document.getElementById('temperature').innerText = temperature + '°C';
    document.getElementById('humidity').innerText = humidity + '%';
    document.getElementById('description').innerText = weatherDescription;
    document.getElementById('icon').src = iconUrl;
  })
  .catch(error => console.log(error));
