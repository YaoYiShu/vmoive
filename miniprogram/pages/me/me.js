const {
  Base64
} = require("js-base64");

// pages/me/me.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_phone_id: ''
  },

  toMyLike() {
    // 获取到的openid
    // console.log(app.globalData.code);
    // console.log(this.data);
    let ui = Base64.decode(wx.getStorageSync("userInfo"));

    if (ui) {
      this.toWhere('/components/my-like/my-like')
    } else {
      this.toWhere('../login/login')
    }
  },

  toCache() {
    this.toWhere('../../components/my-cache/my-cache');
  },

  toHistory() {
    let ui = Base64.decode(wx.getStorageSync("userInfo"));
    if (ui) {
      this.toWhere('../../components/my-history/my-history');
    } else {
      this.toWhere('../login/login');
    }
  },

  handleMessage() {
    wx.showToast({
      icon: 'none',
      title: '暂无消息',
    })
  },

  handleSetting() {
    wx.showToast({
      icon: 'none',
      title: '暂无设置',
    })
  },

  handleFeedback() {
    wx.showToast({
      icon: 'none',
      title: '暂无反馈',
    })
  },

  // 定义公共方法
  toWhere(url) {
    wx.navigateTo({
      url: url,
    })
  },

  toLogin() {
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

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