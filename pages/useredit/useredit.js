// pages/edit/edit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sex: '男',
    phone: '',
    name:'',
    address:'',
    age:0
  },

  formSubmit: function (e) {
    var app = getApp();
    wx.request({
      url: 'https://www.yztcc.com/userSave',
      data: {
        name: e.detail.value.name,
        age: e.detail.value.age,
        address: e.detail.value.address,
        id: app.globalData.login_id
      },
      method: 'POST',
      success: function (res) {
        wx.showModal({
          title: '提示',
          content: '更新成功！',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
            }
          }
        })
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.initData();
  },

  initData: function () {
    var page = this;
    var app = getApp();
    wx.request({
      url: 'https://www.yztcc.com/onGetUser',
      data: {
        id: app.globalData.login_id
      },
      method: 'POST',
      success: function (res) {
        page.setData({
          name: res.data.name,
          phone: res.data.phone,
          address: res.data.address,
          age: res.data.age
        });
        if (res.data.sex == 0){
          page.setData({ sex: '女' });
        }
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