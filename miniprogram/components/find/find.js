const app = getApp()
// components/find/find.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    index: Object,
    historyPosts: Object
  },

  /**
   * 组件的初始数据
   */
  data: {
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    duration: 1000,
    bannerH: 300
  },

  /**
   * 组件的方法列表
   */
  methods: {
    navigateToPlay(e) {
      // console.log(e.currentTarget.dataset.id);
      wx.navigateTo({
        url: '/pages/play/play?id='+e.currentTarget.dataset.id,
      })
    }
  },
  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
      // console.log(app.globalData.systemInfo);
      this.setData({
        bannerH : 200 / 360 * app.globalData.systemInfo.screenWidth
      })
    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
    },
  }
})