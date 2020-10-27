// pages/user/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabNav: [{
        icon: "favor",
        color: 'orange',
        title: "诊断历史",
        path: "history"
      },
      {
        icon: "likefill",
        color: 'red',
        title: "我的收藏",
        path: ""
      },
      {
        icon: "comment",
        color: '#e3ba53',
        title: "我的问答",
        path: ""
      },
    ],
    listNav: [{
        cuIcon: 'album',
        color: '#abbe67',
        name: '示例图片',
        path: "showImg"
      },
      {
        cuIcon: 'picfill',
        color: '#57b7b1',
        name: '相册上传',
        path: ""
      },
      {
        cuIcon: 'infofill',
        color: '#5eb358',
        name: '关于我们',
        path: ""
      },
      {
        cuIcon: 'formfill',
        color: '#2777ea',
        name: '意见反馈',
        path: ""
      }
    ]
  },
  jump(e) {
    const {
      index
    } = e.currentTarget.dataset
    if (this.data.tabNav[index].path == '') {
      wx.showToast({
        icon: "none",
        title: '功能开发中',
      })
    } else {
      wx.navigateTo({
        url: "../" + this.data.tabNav[index].path + "/index",
      })
    }
  },
  jumpList(e) {
    const {
      index,
      icon
    } = e.currentTarget.dataset
    if (this.data.listNav[index].path && icon !== 'picfill') {
      wx.navigateTo({
        url: "../" + this.data.listNav[index].path + "/index",
      })
    } else {
      if (icon == 'picfill') {
        this.imgUpload()
      } else {
        wx.showToast({
          icon: "none",
          title: '功能开发中',
        })
      }
    }
  },
  imgUpload() {
    wx.chooseImage({
      count: 1,
      sourceType: ['album'],
      sizeType: ['original', 'compressed'],
      success: (res) => {
        wx.navigateTo({
          url: `../imgResult/index?uploadUrl=${res.tempFilePaths}`,
        })
      }
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