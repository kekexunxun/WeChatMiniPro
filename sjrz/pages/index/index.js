//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    count:'0天0小时0分0秒',
    ortherimg:'../../images/index/other1.png',
    logos: [
      {},{},{},{},{},{},{},{}
    ],

  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  onLoad: function () {
    var that = this;
    wx.showLoading({
      title: '加载中',
    }),
      setTimeout(function () {
        wx.hideLoading()
      }, 1000),    
    wx.request({
      url: app.globalData.siteroot + '/index.php/wxprogram/index',
      dataType: 'json',
      method:'POST',
      success:function(res){
        // console.log(res);
        if(res.statusCode==200){
        var tbk = res.data.data.tbk;
        var banner = res.data.data.banner;
        var brand = res.data.data.brand;
        var mrsj = res.data.data.plate['0'];
        var xrth = res.data.data.plate['1'];
        var xdbb = res.data.data.plate['2'];
        var xpsf = res.data.data.plate['3'];
          that.setData({
            tbk: tbk,
            banner:banner,
            brand:brand,
            mrsj:mrsj,
            xrth:xrth,
            xdbb:xdbb,
            xpsf:xpsf
          })
        }
        that.timeCountDown(res.data.data.tbk.surplus_time);
      },
      fail:function(){
        console.log('failed');
      },
      complete:function(){
        // console.log('success'); 
      }
    })
  },

  onReady:function(){
 
  },
  // 活动倒计时
  timeCountDown: function (totalSecond){
    var interval = setInterval(function () {
      // 秒数  
      var second = totalSecond;
      // 天位  
      var day = Math.floor(second / 3600 / 24);
      var dayStr = day.toString() + '天';
      if (dayStr.length == 1) 
      {
         dayStr = '0' + dayStr;
      }
      // 小时
      var hr = Math.floor((second - day * 3600 * 24) / 3600);
      var hrStr = hr.toString() + '时';
      if (hrStr.length == 1) 
      {
        hrStr = '0' + hrStr;
      }
      // 分钟
      var min = Math.floor((second - day * 3600 * 24 - hr * 3600) / 60);
      var minStr = min.toString() +'分';
      if (minStr.length == 1)
      { 
        minStr = '0' + minStr;
      }

      // 秒位  
      var sec = second - day * 3600 * 24 - hr * 3600 - min * 60;
      var secStr = sec.toString()+'秒';
      if (secStr.length == 1) 
      {
        secStr = '0' + secStr;
      }
      this.setData({
        count:dayStr+hrStr+minStr+secStr
      });
      totalSecond--;
      if (totalSecond < 0) {
        clearInterval(interval);//撤出更新
        this.setData({
          count:'活动已结束'
        });
      }
    }.bind(this), 1000); //每秒更新一次
  },

  xpsf:function(){
    wx.navigateTo({
      url: '/pages/xpsf/xpsf',
    })
  },
  
  xdbb:function(){
    wx.navigateTo({
      url: '/pages/xdbb/xdbb',
    })
  },

  mrsj:function(){
    wx.navigateTo({
      url: '/pages/mrsj/mrsj',
    })
  },

  xrth:function(){
    wx.navigateTo({
      url: '/pages/xrth/xrth',
    })
  }

});
