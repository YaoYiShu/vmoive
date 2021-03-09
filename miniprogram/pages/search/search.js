// pages/search/search.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    flag: true,
    search: [],
    history: [],
    reverseHistory: [],
    searchResult:[],
    text: []
  },
  // 清除历史
  clearhandle() {
    Dialog.confirm({
        // title: '标题',
        message: '清空搜素记录？',
      })
      .then(() => {
        // on confirm
        wx.setStorageSync('searchHistory', []);
        let searchHistory = wx.getStorageSync('searchHistory') || [];
        this.setData({
          history: searchHistory
        })
      })
      .catch(() => {
        // on cancel
      });
  },

  // 清空缓存
  handleClear() {
    wx.setStorageSync('searchHistory', []);
    this.savaStorage();
  },

  onChange(event) {
    // event.detail 为当前输入的值
    console.log(event.detail);
  },

  // 返回上一页
  navigateBack() {
    wx.navigateBack({
      delta: 1,
    })
  },

  // 子传父
  handleMessage(e) {
    this.setData({
      value: e.detail.value
    })
    this.handleConfirm(e)
  },

  handleInput(e) {
    // {item:100}
    // console.log(e.currentTarget.dataset)
    // 输入框的值
    // console.log(e.detail.value);
    if(e.detail.value.length == 0) {
      this.setData({
        flag: true
      })
    }
  },

  // 回车确定
  handleConfirm(e) {
    // console.log(e.detail.value);
    if (e.detail.value != '') {
      let searchHistory = wx.getStorageSync('searchHistory') || [];

      searchHistory = searchHistory.filter(item => {
        return item.message != e.detail.value;
      });

      searchHistory.push({
        message: e.detail.value,
        id: searchHistory.length ? searchHistory[searchHistory.length - 1].id + 1 : 1
      })
      wx.setStorageSync('searchHistory', searchHistory)
    }
    this.savaStorage();

    // 搜素获取数据
    if(e.detail.value != '') {
      wx.request({
        url: 'https://api.kele8.cn/agent/https://app.vmovier.com/apiv3/search?kw=' + e.detail.value,
        success: (res) => {
          // console.log('searchResult',res.data.data.result);
          this.setData({
            searchResult: res.data.data.result,
            flag: false
          })
        }
      })
    }
  },

  // 依照频道排序
  handleToggleCate(e) {
    // console.log(e.detail);
    if(e.detail != 'all'){
      wx.request({
        url: 'https://api.kele8.cn/agent/https://app.vmovier.com/apiv3/search?kw=' + this.data.value + '&cateid=' + e.detail,
        success: (res) => {
          // console.log(res);
          this.setData({
            searchResult: res.data.data.result,
          })
        }
      })
    }else {
      wx.request({
        url: 'https://api.kele8.cn/agent/https://app.vmovier.com/apiv3/search?kw=' + this.data.value,
        success: (res) => {
          // console.log('searchResult',res.data.data.result);
          this.setData({
            searchResult: res.data.data.result,
          })
        }
      })
    }
  },

  // 排序
  handleOrderByTime(res) {
    // console.log(e);
    // console.log('handleOrderByTime',res);
      //  最新
      wx.request({
        url: 'https://api.kele8.cn/agent/https://app.vmovier.com/apiv3/search?kw=' + this.data.value + '&order=addtime_desc',
        success: (res)=> {
          // console.log(res);
          this.setData({
            searchResult: res.data.data.result,
            // flag: false
          })
        }
      })
  },

  // 清除输入框内容
  clearValue(){
    this.setData({
      value: '',
      flag: true
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: 'https://api.kele8.cn/agent/https://app.vmovier.com/apiv3/search?kw=',
      success: (res) => {
        this.setData({
          search: res.data.data
        })
      }
    })
    this.savaStorage();
  },

  savaStorage() {
    let searchHistory = wx.getStorageSync('searchHistory') || [];
    this.setData({
      history: searchHistory,
      reverseHistory : searchHistory.slice().reverse()
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})