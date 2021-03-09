// pages/register/register.js
const db = wx.cloud.database()
const users = db.collection('users');
// const md5 = require('../../utils/md5.js');
const Base64 = require('js-base64');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    password: '',
    // 测试
    phone: ''
  },

  commit() {
    let username = this.data.username
    let password = this.data.password
    let phone = this.data.phone

    // 加密，解密
    // console.log(Base64.encode(password),Base64.decode(Base64.encode(password)));

    if (username.length < 2) {
      wx.showToast({
        icon: 'none',
        title: '用户名至少为2位',
      })
      return
    }
    if (password.length < 6) {
      wx.showToast({
        icon: 'none',
        title: '密码至少为6位',
      })
    }
    const reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
    if (!reg.test(phone)) {
      wx.showToast({
        icon: 'none',
        title: '号码格式错误，请输入11位的号码',
      })
    }

    users.where({
      phone: phone,
    }).get().then(res => {
      if (res.data.length == 0) {
        users.add({
          data: {
            username: username,
            password: Base64.encode(password),
            phone: phone,
            like: ''
          },
          success(res) {
            // console.log('注册成功', res)
            wx.showToast({
              title: '注册成功',
            })
            .then(()=> {
              wx.navigateTo({
                url: '../login/login',
                success: function (res) {
                  // 通过eventChannel向被打开页面传送数据
                  res.eventChannel.emit('getCartDatalist', true)
                }
              })
            })
          }
        })
      }else {
        wx.showToast({
          icon: 'error',
          title: '号码已被注册',
        })
        this.setData({
          username: '',
          password: '',
          phone: ''
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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