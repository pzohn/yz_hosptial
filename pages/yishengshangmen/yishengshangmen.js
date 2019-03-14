//index.js
Page({
  data: {
    griddata: []
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
          griddata: res.data.hospitalservices,
        })
      },
      fail: function (res) {
      }
    })
  },

  onLoad: function (e) {
    this.getService("doctor")
  },
})
