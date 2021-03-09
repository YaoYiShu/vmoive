// components/my-history/my-history.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    lists: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleClear() {
      wx.setStorageSync('histroyVideo', [])
      this.setData({
        lists: wx.getStorageSync('histroyVideo').slice().reverse()
      })
    }
  },

  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
      this.setData({
        lists: wx.getStorageSync('histroyVideo').slice().reverse()
      })
    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
      this.setData({
        lists: wx.getStorageSync('histroyVideo').slice().reverse()
      })
    },
  },
  // 以下是旧式的定义方式，可以保持对 <2.2.3 版本基础库的兼容
  attached: function() {
    // 在组件实例进入页面节点树时执行
  },
  detached: function() {
    // 在组件实例被从页面节点树移除时执行
  },
})
