const { Base64 } = require("js-base64")

// pages/home/home.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    show: false,
    dayCover: null,
    historyPosts: [],
    lists: [],
    cartDataList: '',
    user_phone_id: Base64.decode(wx.getStorageSync('userInfo'))
  },

  // 跳转至搜索页
  navigateToSearch() {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },

  toggleShow() {
    // console.log('toggleShow');
    if (this.data.dayCover) {
      this.setData({
        show: !this.data.show
      })
    } else {
      // 左端图片（大图）获取
      wx.request({
        url: 'https://api.kele8.cn/agent/https://app.vmovier.com/apiv3/DayCover/getDayCover',
        success: (res) => {
          this.setData({
            show: !this.data.show,
            dayCover: res.data.data
          })
        },
      })
    }
    // console.log(this.data.dayCover);
  },
  onClose() {
    this.setData({
      show: false
    })
  },
  onChange(event) {
    // wx.showToast({
    //   title: `切换到标签 ${event.detail.name}`,
    //   icon: 'none',
    // });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    const eventChannel = this.getOpenerEventChannel()
    if (eventChannel.on) {
      // 接受数据
      // console.log('eventChannel',eventChannel);
      eventChannel.on("getCartDatalist", res => { //发布事件
          // console.log(res);
          that.setData({
            active: res.data,
            user_phone_id: res.user_phone
          });
      });
    }

    wx.request({
      url: 'https://api.kele8.cn/agent/https://app.vmovier.com/apiv3/index/index',
      success: (res) => {
        this.setData({
          index: res.data.data
        })
        // console.log(res.data.data);
      },
    })
    // 频道
    wx.request({
      url: 'https://api.kele8.cn/agent/https://app.vmovier.com/apiv3/cate/getList',
      success: (res) => {
        // console.log(res.data.data);
        this.setData({
          lists: res.data.data
        })
      }
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
    // console.log('划到底部~~');
    let moreUrl = this.data.historyPosts.length ?
      this.data.historyPosts[this.data.historyPosts.length - 1].next_page_url_full :
      this.data.index.posts.next_page_url_full

    wx.request({
      url: moreUrl,
      success: (res) => {
        this.setData({
          historyPosts: [...this.data.historyPosts, res.data.data]
        })
      }
    })

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})