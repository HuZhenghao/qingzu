// issue.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    image_src: [],
    cycle_day: ["天", "月"],
    index:0,
    date_start:' 2017-09-01',
    date_end: '2027-09-01'
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
  
  },

  // 上传图片
  addImage() {
    const that = this;
    wx.chooseImage({
      sizeType: ['compressed'],
      success: function(res) {
        let tempFilePaths = res.tempFilePaths;
        that.setData({image_src:tempFilePaths});
      },
    })
  },

  bindPickerChange(e) {
    this.setData({
      index: e.detail.value
    });
  },

  bindDateStartChange(e) {
    this.setData({
      date_start: e.detail.value
    });
  },
  bindDateEndChange(e) {
    this.setData({
      date_end: e.detail.value
    });
  }
})