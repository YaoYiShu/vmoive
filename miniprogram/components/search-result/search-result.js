// components/search-result/search-result.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    searchResult: Object,
    search: Object
  },

  /**
   * 组件的初始数据
   */
  data: {
    option1: [],
    option2: [],
    option3: [],
    current: 0,
    value1: 0,
    value2: 0,
    value3: 0,
    itemTitle: '全部频道'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 影片、 默认排序
    setMenu(arr) {
      let res = arr.map((item, index) => {
        return {
          text: item.key,
          value: index
        };
      })
      return res;
    },
    // 全部频道
    setCate(arr) {
      let res = arr.map((item, index) => {
        return {
          text: item.catename,
          value: index
        };
      })
      return res;
    },
    // change
    onNew(e) {
      // console.log(e.detail);
      if(e.detail == 1){
        // console.log('成功');
        this.triggerEvent('orderByTime',e.detail)
      }

    },
    // 设置频道
    setActive(e){
      // console.log(e.target.dataset);
      this.setData({
        current: e.target.dataset.current,
        itemTitle: e.target.dataset.kw
      }),
      this.selectComponent('#item').toggle();

      // 本来是想判断第一个
      // if(e.target.dataset.cateid) {
        this.triggerEvent('toggleCate',e.target.dataset.cateid)
      // } 
    },
},

  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行
      // var that = this
      // console.log(this.data.search.filter.cate);
      // console.log(this.setMenu);
    
      var option1 = this.setMenu(this.data.search.filter.type)
      var option2 = this.setMenu(this.data.search.order)
      var option3 = [{cateid: 'all',catename: '全部频道'},...this.data.search.filter.cate]
      // console.log('75',option3);
      // var option1 = this.data.search.filter.type.map( (item,index) => {
      //   return {text: item.key, value: index};
      // })
      // console.log(option1);
      // console.log(option2);
      this.setData({
        option1: option1,
        option2: option2,
        option3: option3
      })
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  // 以下是旧式的定义方式，可以保持对 <2.2.3 版本基础库的兼容
  attached: function () {
    // 在组件实例进入页面节点树时执行
  },
  detached: function () {
    // 在组件实例被从页面节点树移除时执行
  },
})