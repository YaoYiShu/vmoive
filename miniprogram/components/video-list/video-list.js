// components/video-list/video-list.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    lists:Object
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    navigateToPlay(e) {
      wx.navigateTo({
        url: '/pages/play/play?id=' + e.currentTarget.dataset.id,
      })
    }
  }
})
