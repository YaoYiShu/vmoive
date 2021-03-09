// components/series/series.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    series:Object
  },

  /**
   * 组件的初始数据
   */
  data: {
    Height: ''
  },
  /**
   * 组件的方法列表
   */
  methods: {
    imgHeight: function(e) {
      var winWid = wx.getSystemInfoSync().windowWidth; //获取当前屏幕的宽度
      var imgh=e.detail.height;//图片高度
      var imgw=e.detail.width;//图片宽度
      var BannerH=winWid*imgh/imgw + "px"
      this.setData({
        Height:BannerH
      })
    }
  }
})
