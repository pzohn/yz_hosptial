// pages/company/company.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    disabled: true,
    btnstate: "default",
    sex: 1
  },

  accountblur: function (e) {
    var content = e.detail.value.replace(/\s+/g, '');
    if (content != "") {
      this.setData({ disabled: false, btnstate: "primary" });
    } else {
      this.setData({ disabled: true, btnstate: "default" });
    }
  },

  radioChange: function (e) {
    var sex = e.detail.value;
    if (sex == "1") {
      this.setData({ sex: 1 });
    } else {
      this.setData({ sex: 0 });
    }
  },

  formSubmit: function (e) {
    if (e.detail.value.password != e.detail.value.repeatpwd) {
      wx.showModal({
        title: '错误提示',
        content: '密码输入的不一致，请重新输入！',
        showCancel: false
      });
      return;
    }
    wx.request({
      url: 'https://www.yztcc.com/registor',
      data: {
        phone: e.detail.value.phone,
        passwd: e.detail.value.password,
        name: e.detail.value.name,
        age: e.detail.value.age,
        sex: this.data.sex,
        address: e.detail.value.address
      },
      method: 'POST',
      success: function (res) {
        console.log(res);
        if (res.data == 0) {
          wx.showModal({
            title: '错误提示',
            content: '用户已注册，请更换用户名！',
            showCancel: false
          })
        }
        else {
          wx.showModal({
            title: '提示',
            content: '注册成功，请登录！',
            confirmText: '登录',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                wx.navigateBack({
                  delta: 1
                });
              }
            }
          })
        }
      },
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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