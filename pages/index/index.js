//index.js
Page({
  data: {
    imgUrls: [
      "http://www.yztcc.com/hospital/1.jpg",
      "http://www.yztcc.com/hospital/2.jpg",
      "http://www.yztcc.com/hospital/3.jpg",
      "http://www.yztcc.com/hospital/4.jpg",
    ],
    recommend: [],
    hotrec: [],
    circular: true,
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    duration: 1000,
    displayMultipleItems: 3,

    list:[]
  },

  bindViewTap:function(e)
  {
    var tmpTitle = e.currentTarget.dataset.title;
    var i;
    var tmpVar = new Array();

    for (i = 0; i < this.data.list.length; i++) {
      if (tmpTitle == this.data.list[i].title) {
        tmpVar = JSON.stringify(this.data.list[i]);
        break;
      }
    }
    wx.navigateTo({
      url: '/pages/taocan/taocan?list=' + tmpVar,
    })
  },

  yuyueguahao:function(e)
  {
    wx.switchTab({
      url: '../yuyue/yuyue',
    })
  },

  hushishangmen:function(e)
  {
    wx.navigateTo({
      url: '../hushishangmen/hushishangmen',
    })
  },

  shebeizhulin:function(e){
    wx.switchTab({
      url: '../shop/shop',
    })
  },

  yishengshangmen: function (e) {
    wx.navigateTo({
      url: '../yishengshangmen/yishengshangmen',
    })
  },

  getService: function (typeName) {
    var _this = this;
    var app = getApp();
    wx.request({
      url: 'https://www.yztcc.com/getHospitalservicesByType',
      data: {
        type: typeName
      },
      method: 'POST',
      success: function (res) {
        _this.setData({
          list: res.data.hospitalservices,
        })
      },
      fail: function (res) {
      }
    })
  },

  onLoad:function(e)
  {
    this.getService("hot");
  }
})
