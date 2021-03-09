// components/search-history/search-history.js
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    search: Object,
    reverseHistory: Object
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
    // 发送
    handleSearch(e) {
      // this.setData({
      //   value: e.target.dataset.kw
      // })
      this.triggerEvent('send', {value: e.target.dataset.kw})
      // console.log(e.target.dataset.kw);
    },
    // 清除
    clearhandle() {
      Dialog.confirm({
          context: this,
          // title: '标题',
          message: '清空搜素记录？',
        })
        .then(() => {
          // on confirm
          this.triggerEvent('clear');
        })
        .catch(() => {
          // on cancel
        });
    },
  },
  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
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