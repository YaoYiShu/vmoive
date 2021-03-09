// pages/play/play.js
const db = wx.cloud.database();
const users = db.collection('users');
const Base64 = require('js-base64');

// console.log(ui);

Page({
  /**
   * 页面的初始数据
   */
  data: {
    videoInfo: [],
    relateVideos: [],
    comment: [],
    loading: true,
    isLiked: false,
    Icon: '../../assect/detail_bottom_navigation_bar_un_collect.png',
    likeIcon: '../../assect/my_stars_icon1.png',
    likedVideo: [],
    historyVideos: [],
  },

  setLike() {
    let videoInfo = this.data.videoInfo
    let history = wx.getStorageSync('histroyVideo') || []

    if (this.ui) {
      this.flag = this.data.isLiked;
      this.setData({
        isLiked: !this.flag
      })
      history.forEach(element => {
        if (element.postid == videoInfo.postid) {
          element.isLiked = !element.isLiked
        }
      })
      wx.setStorageSync('histroyVideo', history)

      let like = history.filter(item => {
        return item.isLiked == true;
      })

      wx.setStorageSync('likeVideos', like)
      // 数据库查询用户，并添加喜欢列表
      users.where({
        phone: this.ui,
      }).update({
        data: {
          like: like
        }
      })
    } else {
      // 没有用户，跳转登录
      wx.navigateTo({
        url: '../login/login',
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id,
    }, function () {
      // 视图更新 相当于vue updated
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.ui = Base64.decode(wx.getStorageSync("userInfo"));
    // console.log(this.data.id);
    let history = wx.getStorageSync('histroyVideo') || []
    // https://api.kele8.cn/agent/
    wx.request({
      url: 'https://api.kele8.cn/agent/https://app.vmovier.com/apiv3/post/view?postid=' + this.data.id,
      success: (res) => {
        // console.log('play', res.data.data);
        this.setData({
          videoInfo: res.data.data,
          relateVideos: res.data.data.relate_video,
          comment: res.data.data.comment,
          loading: false,
        })
        history = history.filter(item => {
          return item.postid != res.data.data.postid
        })

        history.push({
          user: Base64.encode(this.ui),
          postid: res.data.data.postid,
          title: res.data.data.title,
          durarion: res.data.data.durarion,
          image: res.data.data.image,
          rating: res.data.data.rating,
          count_share: res.data.data.count_share,
        })
        wx.setStorageSync('histroyVideo', history)

        // if (this.ui) {
        //   users.where({
        //     phone: this.ui,
        //   }).get().then(res => {
        //     res.data[0].like.forEach(item => {
        //       if (this.data.id == item.postid) {
        //         this.setData({
        //           isLiked: item.isLiked
        //         })
        //       }
        //     })
        //   })
        // }
        let likeArr = wx.getStorageSync('likeVideos') || []
        likeArr.forEach(item => {
          if (this.data.id == item.postid) {
            this.setData({
              isLiked: item.isLiked
            })
          }
        })
      }
    })



  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    // console.log('onHide');
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