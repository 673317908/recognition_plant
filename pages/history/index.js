// pages/history/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    historyData: []
  },
  formatTime(time) {
    let date = new Date(time)
    if (!time) {
      date = new Date()
    }
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
    const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
    const seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
    return `${year}年${month}月${day}日 ${hour}:${minutes}:${seconds}`
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let data = []
    console.log(wx.getStorageSync('history'))
    if (wx.getStorageSync('history')) {
      data = wx.getStorageSync('history')
      data.map(item => {
        item.time = this.formatTime(item.time)
        return item
      })
    }
    this.setData({
      historyData: data
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