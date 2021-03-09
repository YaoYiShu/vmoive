// pages/login/login.js
// import { dbGet } from '../../utils/cloundfun';
const db = wx.cloud.database();
const users = db.collection('users');
const Base64 = require('js-base64');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    password: '',
  },

  login() {
    let phone = this.data.phone;
    let password = this.data.password

    users.where({
      phone: phone
    }).get().then(res => {
      // console.log(res.data);
      if (res.data.length == 0) {
        wx.showToast({
          icon: 'error',
          title: '未找到该用户',
        })
      }
      // 只能一个手机一个用户
      if (res.data.length == 1) {
        // console.log(res.data[0].password);
        if (password == Base64.decode(res.data[0].password)) {
          // console.log('密码正确');
          wx.showToast({
            title: '登录成功',
          })
          if (this.flag) {
            wx.navigateTo({
              url: '../home/home',
              success: function (res) {
                // 通过eventChannel向被打开页面传送数据
                res.eventChannel.emit('getCartDatalist', {
                  data: 2,
                  user_phone: phone
                })
                let decodePhone = Base64.encode(phone)
                wx.setStorageSync('userInfo', decodePhone)
              }
            })
          } else {
            wx.navigateBack({
              delta: 1,
            })
            let decodePhone = Base64.encode(phone)
            wx.setStorageSync('userInfo', decodePhone)
          }
        }
      }
    })
  },

  toRegister() {
    wx.navigateTo({
      url: '/pages/register/register',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    const eventChannel = this.getOpenerEventChannel()
    if (eventChannel.on) {
      // 接受数据
      // console.log('eventChannel',eventChannel);
      eventChannel.on("getCartDatalist", res => { //发布事件
        // console.log(res);
        this.flag = res || false
      });
    }
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