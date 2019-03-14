//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    griddata:[],
    bn2bk1: 'red',
    bn2bk2: 'black',
    bn2line1: 'underline',
    bn2line2: '',
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
        console.log(res.data.hospitalservices);
        _this.setData({
          griddata: res.data.hospitalservices,
        })
      },
      fail: function (res) {
      }
    })
  },

  onLoad: function (options) {
    this.getService("nurse");
    this.setData({
      bn2bk1: 'red',
      bn2bk2: 'black',
      bn2line1: 'underline',
      bn2line2: '',
    })
  },

  hushishangmen: function (e) {
    this.getService("nurse");
    this.setData({
      bn2bk1: 'red',
      bn2bk2: 'black',
      bn2line1: 'underline',
      bn2line2: '',
    })
  },

  yishengshangmen: function (e) {
    this.getService("doctor");
    this.setData({
      bn2bk1: 'black',
      bn2bk2: 'red',
      bn2line1: '',
      bn2line2: 'underline',
    })
  },

  switch2taocan: function (e) {
    var tmpTitle = e.currentTarget.dataset.title;
    var i;
    var tmpVar = new Array();

    for (i = 0; i < this.data.griddata.length; i++) {
      if (tmpTitle == this.data.griddata[i].title) {
        tmpVar = JSON.stringify(this.data.griddata[i]);
        break;
      }
    }
    wx.navigateTo({
      url: '/pages/taocan/taocan?list=' + tmpVar,
    })
  }
})
