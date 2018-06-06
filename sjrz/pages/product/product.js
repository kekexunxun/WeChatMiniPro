const app = getApp();
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
// pages/product/product.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    goodimg: '../../images/product/good1.png',
    tabs: [],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    hasRequest: [false, false,false,false,false,false,false,false,false,false,false,false,false]//用来标记接口tab有没有被请求过
  },
  /**
   * 选项卡
   */
  onLoad: function (e) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    }),
      wx.showLoading({
        title: '加载中',
      }),
      setTimeout(function () {
        wx.hideLoading()
      }, 1000),
      wx.request({
        url: app.globalData.siteroot + '/index.php/wxprogram/getcatindex',
        dataType: 'json',
        method: 'POST',
        success: function (res) {
          console.log(res);
          if (res.data.code == 0) {
            that.setData({
              list: res.data.data.list
            })
            var tabs = that.data.tabs;
            res.data.data.list.forEach(function (value, index) {
              tabs.push(value.name);
            })
            that.setData({
              tabs: tabs
            })
          }
        },
        fail: function () {
          console.log('failed');
        },
        complete: function () {
        }
      })
    that.categoryRequest(" ", 0);
  },

  tabClick: function (e) {
    var index = e.currentTarget.id;
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
    var list = this.data.list;
    if(!this.data.hasRequest[index]){
    this.categoryRequest(list[index].id, index);
    }
  },

  categoryRequest: function (id, index) {
    var that = this;
    wx.showLoading({
      title: '加载中',
    }),
      setTimeout(function () {
        wx.hideLoading();
        wx.request({
          url: app.globalData.siteroot + '/index.php/wxprogram/goods',
          data: { id: id, page: 1 },
          dataType: 'json',
          method: 'POST',
          success: function (res) {
            if (res.data.code == 0) {
              var modellist = res.data.data.list;
              that.categorySetData(index, modellist);
              var hasRequest = that.data.hasRequest;
              hasRequest[index]=true;
              that.setData({
                hasRequest: hasRequest
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
      }, 600)
  },
  categorySetData: function (id, list) {
    if (id == 0) {
        this.setData({
          modulelist1: list
        })
    }
    if (id == 1) {
        this.setData({
          modulelist2: list
        })
    }
    if (id == 2) {
        this.setData({
          modulelist3: list
        })
    }
    if (id == 3) {
        this.setData({
          modulelist4: list
        })
    }
    if (id == 4) {
        this.setData({
          modulelist5: list
        })
    }
    if (id == 5) {
        this.setData({
          modulelist6: list
        })
    }
    if (id == 6) {
        this.setData({
          modulelist7: list
        })
    }
    if (id == 7) {
      if (!this.data.modulelist8) {
        this.setData({
          modulelist8: list
        })
      }
    }
    if (id == 8) {
        this.setData({
          modulelist9: list
        })
    }
    if (id == 9) {
        this.setData({
          modulelist10: list
        })
    }
    if (id == 10) {
        this.setData({
          modulelist11: list
        })
    }
    if (id == 11) {
        this.setData({
          modulelist12: list
        })
    }
    if (id == 12) {
        this.setData({
          modulelist13: list
        })
    }
  },

  // 点击报名
  signup: function (e) {
    var that = this;
    var goodsid = e.currentTarget.dataset.goodsid;
    wx.navigateTo({
      url: '../signup/signup?goodsid=' + goodsid,
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

  }
})