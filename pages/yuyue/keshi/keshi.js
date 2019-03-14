Page({
  data: {
    keshi: [
      {
        title: "呼吸内科"
      },
      {
        title: "血液内科"
      },
      {
        title: "内分泌科"
      },
      {
        title: "风湿免疫科"
      },
      {
        title: "消化内科"
      },
      {
        title: "神经科"
      },
      {
        title: "普通内科"
      },
      {
        title: "肾内科"
      },
      {
        title: "感染内科"
      },
      {
        title: "心内科"
      },
      {
        title: "老年医学科"
      },
      {
        title: "急诊科"
      },
      {
        title: "乳腺外科"
      },
      {
        title: "骨科"
      },
      {
        title: "基本外科"
      },
      {
        title: "产科"
      },
      {
        title: "儿科"
      },
      {
        title: "中医科"
      },
    ],
    hospital: "",
  },

  onLoad: function (options) {
    this.setData({
      hospital: options.title,
    });
    //console.log(this.data.hospital);
  },

  yuyue: function (e) {
    //console.log(e.currentTarget.dataset.title);
    var Tmpkeshi;
    var TmphospitalName;
    Tmpkeshi = e.currentTarget.dataset.title;
    TmphospitalName = this.data.hospital;
    wx.navigateTo({
      url: '/pages/yuyue/getdate/getdate?Name=' + TmphospitalName + "&Keshi=" + Tmpkeshi,
    })
  },
})