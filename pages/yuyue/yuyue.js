//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    selectArray: [],

    searchArray: [],

    cityIndex: 0,
    typeIndex: 0,
    hospitalIndex: 0,      
    hospital: [],
    currentHospital:[],
  },

  getId: function (e) {
    var TmpCityIndex;
    var TmpTypeIndex;
    var Tmpcity;

    Tmpcity = this.data.selectArray[e.detail].text;
    this.getHospital(Tmpcity);
    TmpCityIndex = e.detail;
    TmpTypeIndex = 0;
    this.setData({
      cityIndex: TmpCityIndex,
      typeIndex: TmpTypeIndex,
    });
  },

  getSubId: function (e) {
    var TmpType;
    var Tmphospital;
    var flag = 0;
    var SearchHospital = new Array();
    var Index;
    Tmphospital = this.data.currentHospital;
    Index = e.detail;
    if (0 == e.detail) {
      SearchHospital = Tmphospital;
    }
    else
    {
      TmpType = this.data.searchArray[Index].text;
      flag = 1;
    }
    
    if (flag == 1) {
      for (var i = 0; i < Tmphospital.length; ++i) {
        if (TmpType == Tmphospital[i].type) {
          SearchHospital.push(Tmphospital[i]);
        }
      }
    }

    if (0 != SearchHospital.length) {
      this.setData({
        hospital: SearchHospital,
      });
    }
    else if (0 !=Index ){
      wx.showModal({
        title: '注意',
        content: '没有相关类型的医院',
        showCancel: false,
      })
    }
  },

  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },

  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false,
    });
  },
  getCity: function () {
    var _this = this;
    wx.request({
      url: 'https://www.yztcc.com/getHosptialCities',
      data: {
      
      },
      method: 'POST',
      success: function (res) {
        var i;
        var citys = new Array();
        
        for (i = 0; i < res.data.length; i++)
        {
          if ( i >= 1 )
          {
            citys.push(res.data[i].name);
          }
        }
        
        for (i = 0; i < citys.length; i++)
        {
          var index = "selectArray[" + i +"].text";
          var val = citys[i];
          _this.setData({
            [index]: val
          });
        }
      },
      fail: function (res) {
      }
    })
  },

  getType: function () {
    var _this = this;
    wx.request({
      url: 'https://www.yztcc.com/getHosptialTypes',
      data: {

      },
      method: 'POST',
      success: function (res) {
        var i;
        var types = new Array();

        for (i = 0; i < res.data.length; i++) {
          types.push(res.data[i].name);
        }

        for (i = 0; i < types.length; i++) {
          var index = "searchArray[" + i + "].text";
          var val = types[i];
          _this.setData({
            [index]: val
          });
        }
      },
      fail: function (res) {
      }
    })
  },

  getHospital: function (cityName) {
    var _this = this;
    var app = getApp();
    wx.request({
      url: 'https://www.yztcc.com/getHospitalsByCity',
      data: {
        city: cityName
      },
      method: 'POST',
      success: function (res) {
        var i;
        //console.log(res.data.hospitals[0]);
        for (i = 0; i < res.data.hospitals.length;i++)
        {
          var title = "currentHospital[" + i + "].title";
          var titleval = res.data.hospitals[i].title;
          var img = "currentHospital[" + i + "].img";
          var imgval = res.data.hospitals[i].img;
          var city = "currentHospital[" + i + "].city";
          var cityval = res.data.hospitals[i].city;
          var level = "currentHospital[" + i + "].level";
          var levelval = res.data.hospitals[i].level;
          var type = "currentHospital[" + i + "].type";
          var typeval = res.data.hospitals[i].type;
          var desc = "currentHospital[" + i + "].desc";
          var descval = res.data.hospitals[i].desc;
          _this.setData({
            [title]: titleval,
            [img]: imgval,
            [city]: cityval,
            [level]: levelval,
            [type]: typeval,
            [desc]: descval
          });
        }
        _this.setData({
          hospital: _this.data.currentHospital,
        })
      },
      fail: function (res) {
      }
    })
  },

  onLoad: function () {
    
    this.getCity();
    this.getType();
    this.getHospital("北京市");
  },
  bindSearch: function (e) {
    console.log(e.detail.value);
    inputVal: e.detail.value
  },

  clearInput: function (e) {
    this.setData({
      inputVal: ""
    });
  },

  keshiShow: function (e) {
    //console.log(e.currentTarget.dataset.title)
    var tmp = e.currentTarget.dataset.title;
    wx.navigateTo({
      url: '/pages/yuyue/keshi/keshi?title=' + tmp,
    })
  }
})
