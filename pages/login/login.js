// pages/login/login.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num: "",
    key: "",
    uid: 0,
    nickName: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var uid = wx.getStorageSync("uid");
    var nickName = wx.getStorageSync("userInfo").nickName;
    this.setData({
      uid: uid,
      nickName: nickName
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
  
  },
  numInput: function (e) {
    this.data.num = e.detail.value;
  },
  keyInput: function (e) {
    this.data.key = e.detail.value;
  },
  rec: function () {
    var that = this;
    if(this.data.num.length == 0 || this.data.key.length == 0){
      wx.showModal({
        title: '提示',
        content: '学号或密码不能为空',
      })
    }
    app.rent.check(that.data.uid,that.data.nickName, that.data.num, that.data.key, function(res){
      if(res.errCode == 0){
        wx.setStorageSync("flag", 1);
        wx.navigateBack({});
      }else{
        wx.showModal({
          title: '提示',
          content: '学号或密码错误',
        })
      }
    })
  }
})