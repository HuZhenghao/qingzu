// details.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    product: {},
    starImage: "no_collected",
    messageImage: "message",
    image:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    app.rent.getProductById(options.id, function (res) {
      console.log(res);
      that.setData({
        product: res
      })
      let imgArr = that.data.product.proImgurl.split("|");
      imgArr.pop();
      that.setData({image: imgArr});
      app.rent.getCollectState(wx.getStorageSync("uid"), that.data.product.id, function (res) {
        console.log(res)
        if (res.errCode == 0) {
          that.setData({
            starImage: "collected",
          })
        } else {
          that.setData({
            starImage: "no_collected",
          })
        }
      })
    });

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

  //收藏或取消收藏商品
  productCollected: function () {
    const that = this;
    if (that.data.starImage === "no_collected") {
      app.rent.addCollect(wx.getStorageSync("uid"), that.data.product.id, function (res) {
        console.log(res);
        that.setData({ starImage: "collected" });
      })
    }
    else if (that.data.starImage === "collected") {
      app.rent.delCollect(wx.getStorageSync("uid"), that.data.product.id, function (res) {
        console.log(res);
        that.setData({ starImage: "collected" });
      })
    }
  }
})