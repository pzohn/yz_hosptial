//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    tapCurrent: 0,
    address: []
  },

  onLoad: function () {
    this.initData();
  },

  initData: function () {
    var page = this;
    var app = getApp();
    wx.request({
      url: 'https://www.yztcc.com/getAddresses',
      data: {
        login_id: app.globalData.login_id
      },
      method: 'POST',
      success: function (res) {
        var array = [];
        if (res.data != 0) {
          var count = res.data.count;
          var default_id = res.data.address_defult_id;
          if (count > 1) {
            for (var index in res.data.addresses) {
              var object = new Object();
              object.name = res.data.addresses[index].name;
              object.phone = res.data.addresses[index].phone;
              object.detail = res.data.addresses[index].detail;
              object.id = res.data.addresses[index].id;
              object.index = index;
              if (object.id == default_id) {
                object.default = true;
              } else {
                object.default = false;;
              }
              array[index] = object;
            }
          } else if (count == 1) {
            var object = new Object();
            object.name = res.data.addresses.name;
            object.phone = res.data.addresses.phone;
            object.detail = res.data.addresses.detail;
            object.id = res.data.addresses.id;
            object.index = 0;
            if (object.id == default_id) {
              object.default = true;
            } else {
              object.default = false;;
            }
            array[0] = object;
          }
        }
        page.setData({ address: array });
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

  pay:function(){
    var app = getApp();
    var array = this.data.address;
    for (var index in array) {
      var object = array[index];
      if (object.default == true) {
        app.globalData.address_id = object.id;
        wx.navigateBack({
          delta: 1
        });
      }
    }
  },

  setDefault: function (e) {
    var index = e.currentTarget.id;
    var object = this.data.address[index];
    var default_flag = !object.default;
    var default_id = object.id;
    var array = this.data.address;
    for (var index in array) {
      var object = array[index];
      if (object.id == default_id) {
        object.default = true;
      } else {
        object.default = false;;
      }
      array[index] = object;
    }
    this.setData({ address: array });
  }
})
