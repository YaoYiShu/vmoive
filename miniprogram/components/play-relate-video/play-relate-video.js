// components/play-relate-video/play-relate-video.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    relateVideos: Object
  },

  /**
   * 组件的初始数据
   */
  data: {
    finishLoadFlag:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    navigateToPlay(e) {
      wx.navigateTo({
        url: '/pages/play/play?id=' + e.currentTarget.dataset.id,
      })
    },
    imageOnLoad(e) {
      // console.log(e);
      this.setData({
        finishLoadFlag:true
      })
    }
  }
})
