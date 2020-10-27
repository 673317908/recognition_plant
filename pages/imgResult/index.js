// pages/imgResult/index.js
//获取应用实例
const grant_type = 'client_credentials'
const client_id = 'na7ZiKRvj3n1PvHdeOFSrbEh'
const client_secret = 'bMNEYK6717ebFl2hYzpuL9n0qx8waEl0'
var token = null
var base64 = null
var apiUrl = null
Page({

  /**
   * 页面的初始数据
   */
  data: {
    resultTitle: "检测结果"
  },
  get_Plant_image: function (res) {
    var that = this
    var tempFilePaths = that.data.options.uploadUrl
    apiUrl = 'https://aip.baidubce.com/rest/2.0/image-classify/v1/plant'
    that.setData({
      imageUrl: tempFilePaths,
    })
    wx.showLoading({
      title: '正在上传',
    })
    wx.getFileSystemManager().readFile({
      filePath: tempFilePaths,
      encoding: 'base64',
      complete: res => {
        console.log(res)
      },
      success: res => {
        that.setData({
          base64: res.data
        }, () => {
          that.recognition_image()
        })
      }
    })
  },
  recognition_image: function (res) {
    var that = this
    that.setData({
      resultTitle: "正在识别..."
    })
    wx.request({
      url: apiUrl + '?access_token=' + token,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        image: that.data.base64
      },
      success: res => {
        wx.hideLoading()
        wx.showToast({
          title: '识别成功',
          icon: "success"
        })
        var result = null
        var score = 0
        if (res.data.result == null) {
          result = res.data.error_msg
        } else {
          var data = []
          data = res.data.result.map(item => {
            item.score = parseInt(item.score * 100)
            return item
          })
          this.setData({
            resultData: data,
            resultTitle: "检测结果以下可能"
          })
        }
      }
    })
  },
  // 保存
  save() {
    wx.showLoading({
      title: '正在保存',
    })
    let data = {
      image: this.data.options.uploadUrl,
      time: new Date(),
      resultData: JSON.parse(JSON.stringify(this.data.resultData))
    }
    let historyData = wx.getStorageSync('history') || []
    historyData.push(data)
    wx.setStorageSync('history', historyData)
    wx.hideLoading()
    wx.showToast({
      mask: true,
      icon: 'none',
      title: '保存成功，请在诊断历史中查看！'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    that.setData({
      options
    })
    console.log(options)
    // return false
    wx.request({
      url: 'https://aip.baidubce.com/oauth/2.0/token?grant_type=' + grant_type + '&client_id=' + client_id + '&client_secret=' + client_secret,
      method: 'POST',
      success: function (res) {
        console.log('Request successful !')
        // console.log(res.data)
        token = res.data.access_token;
        console.log('My token is : ' + token);
        that.get_Plant_image()
      },
      fail: function (res) {
        console.log('Fail to request !')
        console.log(res)
      }
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