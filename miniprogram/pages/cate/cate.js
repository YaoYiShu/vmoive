// pages/cate/cate.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    lists:[],
    series:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
    // console.log(options.id);

    if(/^[0-9]+$/.test(options.id)) {
      wx.request({
        url: 'https://app.vmovier.com/apiv3/post/getPostInCate?&cateid=' + options.id,
        success: (res)=> {
          // console.log(res);
          this.setData({
            lists:{
              list: res.data.data
            } 
          })
        }
      })
    }else if(options.id != 'Series'){
      // 热门，专题，自制
      wx.request({
        url: 'https://app.vmovier.com/apiv3/post/getPostByTab&tab=' + options.id,
        success: (res)=> {
          // console.log(res);
          this.setData({
            lists:{
              list: res.data.data
            } 
          })
        }
      })
    }else if(options.id == 'Series'){
      wx.request({
        url: 'https://app.vmovier.com/apiv3/series/getList',
        success: (res) => {
          // console.log(res);
          this.setData({
            series: res.data.data
          })
        }
      })
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