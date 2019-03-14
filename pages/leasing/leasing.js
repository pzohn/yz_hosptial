// pages/leasing/leasing.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var ids = options.ids;
    this.initData(ids);
  },

  initData: function (ids) {
    var page = this;
    wx.request({
      url: 'https://www.yztcc.com/getLeasings',
      data: {
        leasing_ids: ids
      },
      method: 'POST',
      success: function (res) {
        var array = [];
        if (res.data.count > 1){
          for (var index in res.data.leasings) {
            var object = new Object();
            object.id = res.data.leasings[index].leasing.id;
            object.name = res.data.leasings[index].leasing.name;
            object.phone = res.data.leasings[index].leasing.phone;
            object.address = res.data.leasings[index].leasing.address;
            array[index] = object;
          }
        } else if (res.data.count == 1) {
          var object = new Object();
          object.id = res.data.leasings.id;
          object.name = res.data.leasings.name;
          object.phone = res.data.leasings.phone;
          object.address = res.data.leasings.address;
          array[0] = object;
        }
        page.setData({ array: array });
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

  seeDetail: function (e) {
    var app = getApp();
    app.globalData.backToLeasing = true; 
    app.globalData.leasing_id = this.data.array[e.currentTarget.id].id;
    wx.navigateBack({
      delta:1
    });
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