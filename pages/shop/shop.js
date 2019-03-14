// pages/index/index.js
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
var demo = new QQMapWX({
  key: 'JSWBZ-2UC6K-ZCTJK-AMKZN-J7WEZ-6RBPZ'
});
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      'https://www.yztcc.com/swiper/1.jpg',
      'https://www.yztcc.com/swiper/2.jpg',
      'https://www.yztcc.com/swiper/3.jpg'
    ],
    recommend: [],
    hotrec: [],

    circular: true,
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    displayMultipleItems: 3,
    address: '',
    name: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var page = this;
    wx.getLocation({
      success: function (res) {
        var longitude = res.longitude
        var latitude = res.latitude

        demo.reverseGeocoder({
          location: {
            latitude: latitude,
            longitude: longitude
          },
          success: function (res) {
            var app = getApp();
            page.setData({
              address: res.result.address
            });
            app.globalData.city = res.result.address_component.city;
            app.globalData.province = res.result.address_component.province;
            app.globalData.district = res.result.address_component.district;
          },
          fail: function (res) {
            console.log("定位失败");
          },
          complete: function (res) {
          }
        });
      },
    });
    page.initData();
  },

  initData: function () {
    var page = this;
    wx.request({
      url: 'https://www.yztcc.com/getShows',
      method: 'GET',
      success: function (res) {
        var count = res.data.good_count;
        if (count) {
          var recommend = [];
          for (var index in res.data.good_shows) {
            if (index == 6) {
              break;
            }
            var object = new Object();
            object.url = 'https://www.yztcc.com/product_pic/' + res.data.good_shows[index].product_pic;
            object.title = res.data.good_shows[index].name;
            object.price = res.data.good_shows[index].price_day + '元/天';
            object.id = res.data.good_shows[index].id;
            recommend[index] = object;
          }
        }

        count = res.data.hot_count;
        if (count) {
          var hotrec = [];
          for (var index in res.data.hot_shows) {
            if (index == 6) {
              break;
            }
            var object = new Object();
            object.url = 'https://www.yztcc.com/product_pic/' + res.data.hot_shows[index].product_pic;
            object.title = res.data.hot_shows[index].name;
            object.price = res.data.hot_shows[index].price_day + '元/天';
            object.id = res.data.hot_shows[index].id;
            hotrec[index] = object;
          }
        }

        page.setData({
          recommend: recommend,
          hotrec: hotrec
        });
      },
      fail: function (res) {
        wx.showModal({
          title: '错误提示',
          content: '服务器无响应，请联系工作人员!',
          success: function (res) {
            if (res.confirm) {
            } else if (res.cancel) {
            }
          }
        })
      }
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
    var app = getApp();
    this.setData({
      address: app.globalData.city
    });
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

  accountInput: function (e) {
    var content = e.detail.value;
    this.setData({ name: content });
  },

  resetSearch: function () {
    var name = this.data.name;
    if (this.data.name == '') {
      wx.showModal({
        title: '搜索条件为空',
        content: '请输入关键字!',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
          }
        }
      });
      return;
    }
    var app = getApp();
    app.globalData.searchByname = true;
    wx.navigateTo({
      url: '../search/search?name=' + name
    });
  },

  select: function (e) {
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '../search/search?id=' + id
    });
  },

  recommendGood: function (e) {
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '../details/details?id=' + id
    });
  },

  hotrecGood: function (e) {
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '../details/details?id=' + id
    });
  },

  switchcity: function (e) {
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '../switchcity/switchcity'
    });
  }
})