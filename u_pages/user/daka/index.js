var g, app = getApp(), request = app.util.request,  page = app.page;
var QQMapWX = require('../../../utils/qqmap-wx-jssdk.js');
var qqmapsdk;
var countTooGetLocation = 0;
var total_micro_second = 0;
var starRun = 0;
var totalSecond = 0;
var oriMeters = 0.0;
var pauseName = 0;
var settimeout;
var point = app.globalData.point;
var miscrodis = 0;
var totaldistance = 0;
var latfirst, lonfirst, latnow, lonnow;
var countdistance = 0;
var tempdistance = 0;
var initloc = true; //初始坐标marker
var startRuntime;
let tTime = false;
//设置地理位置
function settinglocation(status) {
  wx.showModal({
    title: '提示',
    content: '请在设置里选择"使用小程序期间和离开小程序后"，才能运行定位功能',
    showCancel: true, //是否显示取消按钮-----》false去掉取消按钮
    cancelText: "否", //默认是“取消”
    confirmText: "设置", //默认是“确定”
    success: function (res) {
      if (res.cancel) {
        console.log(res);
        //点击取消
        wx.showToast({ title: '定位失败，请重试', icon: 'none' });
        console.log("取消授权");
        settinglocation(status);
      } else if (res.confirm) {
        //点击确定
        wx.openSetting({
          success(data) {

            if (data.authSetting["scope.userLocation"] == true) {
              wx.showToast({
                title: '授权成功',
                icon: 'success',
                duration: 2000,
                success() {
                  status = true;
                }
              })

            }
          }
        })

      }
    }
  })
}
/* 毫秒级倒计时 */
function count_down(that) {
  if (starRun == 0) {
    return;
  } else {

    var time = date_format(total_micro_second);
    var latfirst = latnow;
    var lonfirst = lonnow;

    if (countTooGetLocation >= 2000) { //1000为1s
      that.getLocation(false);
      var templine = that.data.polyline;
      //console.log(that.data.polyline);

      var test = templine.map(function (item) {
        return item.points[0];
      });
      var lattemp = parseFloat(test[0].latitude);
      var lontemp = parseFloat(test[0].longitude);
      //console.log("经度" + latfirst + "纬度" + lonfirst + "纬度" + latnow + "经度" + lonnow);
      miscrodis = getDistance(latfirst, lonfirst, lattemp, lontemp);
      countdistance += miscrodis;
      // console.log(countdistance+"多点");
      if (countdistance >= 10) {//大于10米
        totaldistance = +countdistance;
        countdistance = 0;
        var meters = parseFloat((totaldistance / 1000).toFixed(2));
        //var showMeters = meters.toFixed(2);
        that.setData({
          meters: meters
        })
        console.log(countdistance + "总共" + meters);
      }

      countTooGetLocation = 0;
    }

    //毫秒计时器
    settimeout = setTimeout(function () {
      countTooGetLocation += 1000;
      total_micro_second += 1000;
      count_down(that);
      that.updateTime(time);
    }, 1000
    )
  }

}
// 时间格式化输出，如03:25:19 86。每10ms都会调用一次
function date_format(micro_second) {
  // 秒数
  var second = Math.floor(micro_second / 1000);
  // 小时位
  var hr = Math.floor(second / 3600);
  // 分钟位
  var min = fill_zero_prefix(Math.floor((second - hr * 3600) / 60));
  // 秒位
  var sec = fill_zero_prefix((second - hr * 3600 - min * 60));// equal to => var sec = second % 60;


  return hr + ":" + min + ":" + sec + " ";
}

function timeTosecond(params) {
  var timestr = params.split(":");
  var hr = Math.floor(parseInt(timestr[0]) * 3600);//时转秒
  var min = Math.floor(parseInt(timestr[1]) * 60);//分转秒
  var sec = Math.floor(parseInt(timestr[2]));
  var timesecond = hr + min + sec;
  return timesecond * 1000;
}
function getDistance(latFrom, lngFrom, latTo, lngTo) {
  var rad = function (d) {//计算角度
    return parseFloat(d * Math.PI / 180.0);
  }
  // var radLatFrom = rad(parseFloat());
  var EARTH_RADIUS = 6378136.49;
  var radLatFrom = rad(latFrom);
  var radLatTo = rad(latTo);
  // console.log(radLatFrom + "经度" + radLatTo);
  var a = Math.abs(radLatFrom - radLatTo);
  var b = Math.abs(rad(lngFrom) - rad(lngTo));
  // console.log(a + "运算后" + b);
  var distance = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLatFrom) * Math.cos(radLatTo) * Math.pow(Math.sin(b / 2), 2)));
  distance = distance * EARTH_RADIUS;
  distance = Math.round(distance * 10000) / 10000;
  console.log(distance + "两点之间距离");
  return parseFloat(distance.toFixed(2));
}
function fill_zero_prefix(num) {
  return num < 10 ? "0" + num : num
}
//构建数据格式
function creatdatalist(startTime, endTime, aimmeters, finishedmeter, time, username) {//分别为运动开始时间，结束时间，里程，花费时间，用户名
  var weekday = endTime.getDay();
  //startTime= new Date(startTime).format("yyyy-MM-dd hh:mm:ss");
  //endTime=new Date(endTime).format("yyyy-MM-dd hh:mm:ss");
  console.log(time+"time")
  var week=[
    {id:1,name:"一"},
    {id:2,name:"二"},
    {id:3,name:"三"},
    {id:4,name:"四"},
    {id:5,name:"五"},
    {id:6,name:"六"},
    {id:7,name:"七"},
  ]
  var weekname="";
    week.map(function(item,index,week){
      if(item.id===weekday){
        weekname=item.name
      }
    })
//转化周
  var  arr=time.split(":")//持续时间
  time=parseInt(arr[0])*3600+parseInt(arr[1])*60+parseInt(arr[2]);
  if(time<60){
    time=time+"s"
  }else{
    time=parseInt(time/60)+"min"
  }
  var rundatalist = {
    startTime: startTime,
    endTime: endTime,
    aimmeters: aimmeters,
    finishedmeter: finishedmeter,
    time: time,
    weekday: weekname,
    username: username
  }
  return rundatalist;
};
Page({

    /**
     * 页面的初始数据
     */
    data: {
        iconPath: "../../../assets/images/dingwei.svg",
        latitude: 37.3,
        longitude: 121.4,
        width: 20,
        height: 25,
        starttime: app.globalData.starttime,
        polyline: [],
        markers:[],
        clicklocation:app.globalData.jntm,
        
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
     
      var that = this;
      if(initloc == false){
        wx.startLocationUpdateBackground({
          success(res) {
           console.log('开启后台定位', res)
          },
          fail(res) {
           console.log('开启后台定位失败', res)
          }
         })
      }
    
     this.setData({
      clicklocation:app.globalData.jntm,
      starttime: app.globalData.starttime,
     })
     console.log(app.globalData.point);
     console.log(point);
     if(app.globalData.jntm == 0){
      point = [];
     }
    
      var addressname = 'address';
      this.myaddress(addressname);
      this.getLocation(initloc);
      request({
        url: "Peoplename",
        data: {
            user_id: wx.getStorageSync("userInfo").id,
        },
        showLoading: !1,
        success: function(res) {
          console.log(res)
         
          if(res.errno == -1){
            wx.showModal({
              title: '提示',
              content:res.msg,
              showCancel: false
            })
            return;
          }else{
            that.setData({
              peoplename:res.peoplename,
          })
          }
         
        }
    });
    },
    myaddress:function(addressname){
      var that = this;
      wx.getLocation({
        type: 'wgs84',
        success: function(res) {
          console.log(res.latitude)
        var latitude = res.latitude;
        var longitude = res.longitude;
        // wx.setStorageSync('latitude', latitude) //纬度
        // wx.setStorageSync('longitude', longitude) //经度
        var qqMapApi = "https://apis.map.qq.com/ws/geocoder/v1/" + "?location=" + latitude + ',' +
        longitude + "&key=" + '6K7BZ-HUJLX-6Z64X-ZFXXL-H4FM7-J4FE2' + "&get_poi=1";
        console.log(qqMapApi)
        wx.request({
        url: qqMapApi,
        data: {},
        method: 'GET',
        success: (res) => {
        
        if (res.statusCode == 200 && res.data.status == 0) {
          console.log(res.data.result.address);
          if(addressname == 'address'){
            that.setData({
              address:res.data.result.address
            })
          }else{
            that.setData({
              endaddress:res.data.result.address
            })
          }
          
        }
        }
        })
        }
        })
    },
    starRun: function () {
      //查看是否打开了地理位置
      var that = this;
      that.data.clickcard = 1;
      var startime = new Date();
      var nowtime = startime.toTimeString();
      startRuntime = Date.parse(new Date())/1000;
      that.setData({
        stime: Date.parse(new Date())/1000,
      })
      wx.startLocationUpdateBackground({
        success(res) {
         console.log('开启后台定位', res)
        },
        fail(res) {
         console.log('开启后台定位失败', res)
        }
       })

      function openrun(status) {
        if (status) {
          that.setData({
            starttime:nowtime.substring(0,8),
            clicklocation: 1
          })
          starRun = 1;
          if (starRun == 0) {
            return;
          }
          console.log(count_down(that));
          count_down(that);
        }
      }
      wx.setStorageSync('starttime', nowtime.substring(0,8));
      
      wx.getSetting({
        success(res) {// 查看所有权限
          let status = res.authSetting['scope.userLocation']// 查看位置权限的状态，此处为初次请求，所以值为undefined
          if (!status) {// 如果是首次授权(undefined)或者之前拒绝授权(false)
            wx.authorize({ // 发起请求用户授权
              scope: 'scope.userLocation',
              success() {// 用户允许了授权
                status = true;
                console.log("授权成功");
                settinglocation(status);
                openrun(status);
              },
              fail() {
                console.log("授权失败");
                wx.showToast({ title: '定位失败2，请重试', icon: 'none' });
                status = true;
                settinglocation(status);
              }
            })
          } else {
            status = true;
            openrun(status);
          }
        },
      },
      )
      // this.timer = setInterval(repeat, 1000);
      //     function repeat() {
      //         that.getLocation();
      //         //that.drawline();
      //         console.log('re');
      //     }
  
    },
    endRun: function (e) {
      
      if(!tTime){
        tTime = true;
      }else{
        return
      }
      var that = this;
      var startime = startRuntime;//按钮点击得标准时间
      var endtime = new Date();
      var nowtime = endtime.toTimeString();
      var addressname = 'endaddress';
      starRun = 0;
      this.myaddress(addressname);

      that.setData({
          endtime:nowtime.substring(0,8),
      });
      wx.getUserInfo({
        success: function (res) {
          
          var useinfo = res.userInfo.nickName;
          if (res.userInfo.nickName) { 
            wx.showModal({
              title: '提示',
              content: '是否保存此次记录',
              showCancel: true, //是否显示取消按钮-----》false去掉取消按钮
              cancelText: "否", //默认是“取消”
              confirmText: "确定", //默认是“确定”
              success: function (res) {
                tTime = false;
                // startime= new Date(startime).format("yyyy-MM-dd hh:mm:ss");
                // endtime=new Date(endtime).format("yyyy-MM-dd hh:mm:ss");
                var temp={
                  iconPath: "../../../assets/images/location.png" , 
                  longitude:  wx.getStorageSync('lon'), 
                  latitude:  wx.getStorageSync('lat'),
                  width: 30, 
                  height: 30,
                  title:'结束点'
                }
                that.data.markers.push(temp);
                that.setData({
                  markers:that.data.markers,
                })
 
                request({
                  url: "visit",
                  method: 'post',
                  data: {
                      user_id: wx.getStorageSync("userInfo").id,
                      polyline:JSON.stringify(that.data.polyline), //线路
                      markers:JSON.stringify(that.data.markers),//标点
                      starttime:app.globalData.currenttime,//开始时间
                      endtime:Date.parse(new Date())/1000, //结束时间
                      startaddress:that.data.address,
                      endaddress:that.data.endaddress,
                      lat:wx.getStorageSync('lat'),
                      lon:wx.getStorageSync('lon'),
                  },
                  showLoading: !1,
                  success: function(res) {
                      console.log(res);
                  }
                });
                wx.stopLocationUpdate();
                app.globalData.currenttime = '';
                app.globalData.markers =[];
                app.globalData.point = '';
                app.globalData.jntm = 0;
                var page = getCurrentPages().pop();  
                if (page == undefined || page == null) return;  
                page.onLoad();  
            
              }
            })
          }
        }
      })
  
    },
    
    setlocation:function(){

        var that = this;
        console.log(app.globalData.jntm);
        if(app.globalData.jntm == 1 || that.data.clicklocation == 1){
          var temp={
            iconPath: "../../../assets/images/marks.png" , 
            longitude:  wx.getStorageSync('lon'), 
            latitude:  wx.getStorageSync('lat'),
            width: 30, 
            height: 30,
            title:'客户点'
          }
          that.data.markers.push(temp);
          console.log(that.data.markers);
          that.setData({
            markers:that.data.markers,
          })
        }else{
          wx.showModal({
            title: '提示',
            content:'请开始打卡后标记',
            showCancel: false
          })
        }
        
    },
    getLocation: function (initloc) {
      var that = this;

      var lat, lon;
      //var key = config.Config.key;
      // var myAmapFun = new amapFile.AMapWX({key: '963cf3142b8f650d6b1a53f6a30e6480'});
      wx.getLocation({
        type: 'gcj02',
        isHighAccuracy:'true',
        success: (data) => {
          console.log(data)
          lat = data.latitude;
          lon = data.longitude;
          wx.setStorageSync('lat', lat);
          wx.setStorageSync('lon', lon);
          that.setData({
            latitude: lat,
            longitude: lon,
          });
          console.log(initloc);
          if (initloc) {
            that.setData({
              latitude: lat,
              longitude: lon,
              markers: [{
                iconPath: "../../../assets/images/location.png" , 
                longitude: lon, 
                latitude: lat,
                width: 30, 
                height: 30,
                title:'初始点'
              }]
            });
            app.globalData.jntm = 0;
           
          }else{
           
            app.globalData.jntm = 1;
          }
          if(app.globalData.markers != ''){
            that.setData({
              latitude: lat,
              longitude: lon,
              markers:app.globalData.markers,
            });
          }
          point.push({ latitude: lat, longitude: lon });
          
          latnow = lat;
          lonnow = lon;

            that.setData({
              polyline: [{
                points: point,
                color:"#3eace5",//线条的颜色
                width: 6,//宽度
                arrowLine: true,//是否带箭头
                dottedLine: false
              }]
            });


          app.globalData.currenttime = that.data.stime;
          app.globalData.markers = that.data.markers;
          app.globalData.point = that.data.point;
          app.globalData.starttime = that.data.starttime;
        },
        
        fail(res) {
          wx.showToast({ title: '持续定位中', icon: 'none' })
        }
      })

    },
  //****************************
  updateTime: function (time) {
    this.setData({
      time: time,
    })

  },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },
   
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function (options) {
      var that = this;
      //app.globalData.livelocation=false;
      wx.getSetting({
        success(res) {// 查看所有权限
          let status = res.authSetting['scope.userLocation'];
          if (!status) {
            //弹出设置location
            settinglocation();
          }
        }
      })
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
  
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
    
})