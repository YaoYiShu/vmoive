// components/image-loader/image-loader.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //默认图片
    defaultImage: String,
    //原始图片
    originalImage: String,
    width: String,
    height: String,
    //图片剪裁mode，同Image组件的mode
    mode: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    finishLoadFlag: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    finishLoad: function (e) {
      this.setData({
        finishLoadFlag: true
      })
    }
  }
})
