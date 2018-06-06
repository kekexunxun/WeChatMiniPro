// pages/signup/signup.js
var app = getApp();
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
    var goodsid=options.goodsid;
    console.log(goodsid);
    var that=this;
    wx.request({
      url: app.globalData.siteroot + '/index.php/wxprogram/signfirst',
      data: { goods_id:goodsid},
      dataType: 'json',
      method: 'POST',
      success: function (res) {
        console.log(res);
        if (res.data.code == 0) {
          var goodsInfo = res.data.data.detail;
           that.setData({
             goodsInfo:goodsInfo
           })
        }
      },
      fail: function () {
        console.log('failed');
      },
      complete: function (res) {
        console.log(res);
      }
    })  
  },

  submit: function (e) {
    console.log(e);
    var value = e.detail.value;
    var that = this;
    if (that.verifySubmit(value)) {
      wx.showLoading({
        title: '提交中',
      });
      wx.request({
        url: app.globalData.siteroot + '/index.php/wxprogram/signup',
        data: {
          goods_id: that.data.goodsInfo.goods_id,
          name: value.name,
          phone: parseInt(value.phone),
          email: value.mail,
          wchat: value.wechat,
          category: value.category,
          link: value.link
        },
        dataType: 'json',
        method: 'POST',
        success: function (res) {
          if (res.data.code == 0) {
            wx.hideLoading();
            wx.showToast({
              title: '提交成功',
              icon: 'success',
              duration: 2000
            });
            setTimeout(function () {
              wx.switchTab({
                url: '/pages/index/index',
              }), 3000
            })
          }
        },
        fail: function () {
          console.log('failed');
        },
        complete: function (res) {
          wx.hideLoading();
          // console.log('success'); 
        }
      })
    }
  },

  verifySubmit(value) {
    if (this.verifyPhone(value.phone) && this.verifyEmail(value.mail)) {
      if (!value.name) {
        wx.showToast({
          title: '姓名不能为空',
          icon: 'none'
        })
        return false;
      }
      if (!value.wechat) {
        wx.showToast({
          title: '微信不能为空',
          icon: 'none'
        })
        return false;
      }
      if (!value.category) {
        wx.showToast({
          title: '产品分类不能为空',
          icon: 'none'
        })
        return false;
      }
      if (!value.link) {
        wx.showToast({
          title: '店铺/产品链接不能为空',
          icon: 'none'
        })
        return false;
      }
    }
    else {
      return false;
    }
    return true;
  },

  verifyPhone(phone) {
    var phoneReg = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/;
    if (!phoneReg.test(phone)) {
      wx.showToast({
        title: '请输入有效的电话号码',
        icon: 'none',
      })
      return false;
    }
    return true;
  },

  verifyEmail(mail) {
    var emailReg = /(^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$)/;
    if (!emailReg.test(mail)) {
      wx.showToast({
        title: '请填写正确的邮箱格式',
        icon: 'none',
      })
      return false;
    }
    return true;
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

  }
})