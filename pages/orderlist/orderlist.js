// pages/shoporder/shoporder.js
Page({
  data: {
    orderShopList: []
  },

  initData: function (id) {
    var page = this;
    var app = getApp();
    wx.request({
      url: 'https://www.yztcc.com/getTrades',
      data: {
        phone: app.globalData.phone,
        type: id
      },
      method: 'POST',
      success: function (res) {
        var array = [];
        var count = res.data.count;
        if (count) {
          for (var index in res.data.trades) {
            var object = new Object();
            object.BillDate = res.data.trades[index].date;
            object.BillNo = res.data.trades[index].out_trade_no;
            object.Address = res.data.trades[index].leasing_name;
            object.EmpFullName = res.data.trades[index].body;
            object.TotalTaxAmount = res.data.trades[index].total_fee;
            object.Status = page.getStatus(res.data.trades[index].status);
            object.id = res.data.trades[index].id;
            array[index] = object;
          }
        }
        page.setData({ orderShopList: array });
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

  getStatus: function (status) {
    if (status == 2) {
      return '配送中';
    }
    else if (status == 3) {
      return '未归还';
    }
    else if (status == 4) {
      return '已完成';
    }
    else {
      return '无状态';
    }
  },

  onItemClick: function (e) {
    var index = e.currentTarget.dataset.itemIndex;
    var id = this.data.orderShopList[index].id;
    wx.navigateTo({
      url: '../info/info?id=' + id
    })
  },

  onShareAppMessage: function () {

  },

  onLoad: function (options) {
    var id = options.type;
    if (id != 0 && id != undefined) {
      this.initData(id);
    }
  }
})