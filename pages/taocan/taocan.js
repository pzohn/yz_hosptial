//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    bn2bk1: 'red',
    bn2bk2: 'black',
    bn2bk3: 'black',
    bn2line1: 'underline',
    bn2line2: '',
    bn2line3: '',
    taocaninfo:[],
    bk:[],
    imgurl: "http://www.yztcc.com/hospital/chanpinxiangqing.png",
    topImgUrl:'',
    youhuiItemLen:0,
    bk1:'',
  },

  onLoad: function (options)
  {
    var tmpArray = new Array();
    var colorArray1 = [{color:'bisque'}];
    var colorArray2 = [{color:'white'}];
    var tmp = "http://www.yztcc.com/hospital/";
    var len = 0;
    var i;

    tmpArray = JSON.parse(options.list);
    if (undefined == tmpArray.youhuiItem.length )
    {
      len = 1;
    }
    else
    {
      len = tmpArray.youhuiItem.length;
    }
    tmp += tmpArray.image;
    this.setData({
      taocaninfo: tmpArray,
      topImgUrl: tmp,
      youhuiItemLen: len
    })
    if ( len > 1 )
    {
      for (i = 0; i < tmpArray.youhuiItem.length; i++) {
        if (i == 0) {
          this.setData({
            bk: this.data.bk.concat(colorArray1),
          })
        }
        else {
          this.setData({
            bk: this.data.bk.concat(colorArray2),
          })
        }
      }
    }
  },

  yuyue1: function (e) {
    //console.log(e.currentTarget.dataset.index);
    var tmpIndex = e.currentTarget.dataset.index;
    var i;
    var colorTmp = new Array();

    for (i = 0; i < this.data.taocaninfo.youhuiItem.length; i++) {
      if (i == tmpIndex) {
        colorTmp.push({ color: 'bisque' })
      }
      else {
        colorTmp.push({ color: 'white' })
      }
    }
    this.setData({
      bk: colorTmp,
    })
  },

  yuyue2: function (e) {
    this.setData({
      bk1: 'bisque',
    })
  },

  chanPin: function (e) {
    var tmp = "http://www.yztcc.com/hospital/";
    tmp += this.data.taocaninfo.chanPinDescUrl;
    
    this.setData({
      bn2bk1: 'red',
      bn2bk2: 'black',
      bn2bk3: 'black',
      bn2line1: 'underline',
      bn2line2: '',
      bn2line3: '',
      imgurl: tmp,
    })
  },

  fuWu: function (e) {
    var tmp = "http://www.yztcc.com/hospital/";
    tmp += this.data.taocaninfo.serverDescUrl;
    
    this.setData({
      bn2bk1: 'black',
      bn2bk2: 'red',
      bn2bk3: 'black',
      bn2line1: '',
      bn2line2: 'underline',
      bn2line3: '',
      imgurl: tmp,
    })
  },

  zhuYi: function (e) {
    var tmp = "http://www.yztcc.com/hospital/";
    tmp += this.data.taocaninfo.attentionUrl;
    this.setData({
      bn2bk1: 'black',
      bn2bk2: 'black',
      bn2bk3: 'red',
      bn2line1: '',
      bn2line2: '',
      bn2line3: 'underline',
      imgurl: tmp,
    })
  },
})
