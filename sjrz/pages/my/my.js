// pages/my/my.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  var that = this;
  wx.showLoading({
    title: '加载中',
  }),
    setTimeout(function () {
      wx.hideLoading()
    }, 1000),
    wx.request({
    url: app.globalData.siteroot + '/index.php/wxprogram/goods',
      data: { id: 0, page: 1 },
      dataType: 'json',
      method: 'POST',
      success: function (res) {
        // console.log(res);
        if (res.data.code == 0) {
          var goodslist = res.data.data.list;
          // console.log(goodslist);
          that.setData({
            goodslist: goodslist
          })
        }
      },
      fail: function () {
        console.log('failed');
      },
      complete: function () {
        // console.log('success'); 
      }
    })  
  },
  signup: function (e) {
    var that = this;
    var goodsid = e.currentTarget.dataset.goodsid;
    wx.navigateTo({
      url: '../signup/signup?goodsid='+goodsid,
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
  onShow: function () {
  
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
  
  },
  ruzhu:function(){
   wx.navigateTo({
     url: '/pages/merchant/merchant',
   })
  }
})