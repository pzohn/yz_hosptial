//index.js
var util = require('../../../utils/util.js');

Page({
  data: {
    dates: "",
    startDate: "",
    objectArray: ['上午', '下午'],
    index: 0,
    doctors: ['默认', '张医生 主任医师', '李医生 副主任医师'],
    doctorindex: 0,
  },

  onLoad: function (options) {
    var time = util.formatTime(new Date());
    var arr = time.split(" ");
    //console.log(options.Name);
    //console.log(options.Keshi);
    this.setData({
      startDate: arr[0],
    })
  },

  bindDateChange: function (e) {
    //console.log(e.detail.value)
    this.setData({
      dates: e.detail.value
    })
  },

  bindPickerChange: function (e) {
    //console.log(e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

  bindDoctorChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      doctorindex: e.detail.value
    })
  },
})
