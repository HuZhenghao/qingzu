// pages/publish/publish.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

    rentList: [],
    donateList: [],
    donate_img: "../../images/home/donate.png",
    startX: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var uid = wx.getStorageSync("uid");
    var nickName = wx.getStorageSync("userInfo").nickName;
    let rentlist = [];
    let donatelist = [];
    this.setData({
      uid: uid,
      nickName: nickName
    });
    app.rent.getProductByUser(uid, nickName, function (res) {
      res.forEach(function (element) {
        if (element.proFlag === '0') {
          rentlist.push(element);
        }
        else if (element.proFlag == '1') {
          donatelist.push(element);
        }
      });
      that.setData({ rentList: rentlist, donateList: donatelist });
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
  //滑动删除
  touchStart: function (e) {
    //点击恢复
    var index = e.currentTarget.dataset.index;
    var that = this;
    for (var i = 0; i < this.data.rentList.length; i++) {
      if (i == index) {
        continue;
      }
      this.data.rentList[i].cur_right = 0;
      this.setData({
        rentList: that.data.rentList
      })
    }
    for (var i = 0; i < this.data.donateList.length; i++) {
      if (i == index) {
        continue;
      }
      this.data.donateList[i].cur_right = 0;
      this.setData({
        donateList: that.data.donateList
      })
    }
    var startX = e.touches[0].clientX;
    this.data.startX = startX;
  },
  touchMove: function (e) {
    var index = e.currentTarget.dataset.index;
    var flag = e.currentTarget.dataset.flag;
    var curX = e.touches[0].clientX;
    var move = this.data.startX - curX;
    if (move > 100) { move = 100 }
    if (move < 0) { move = 0 }
    if (flag == 0) {
      var list = this.data.rentList;
      if (list[index].cur_right == 100 && move > 0) {
        return false;
      }
      list[index].cur_right = move;
      this.setData({
        rentList: list
      })
    } else {
      var list = this.data.donateList;
      if (list[index].cur_right == 100 && move > 0) {
        return false;
      }
      list[index].cur_right = move;
      this.setData({
        donateList: list
      })
    }
  },
  touchEnd: function (e) {
    var index = e.currentTarget.dataset.index;
    var flag = e.currentTarget.dataset.flag;
    var end = e.changedTouches[0].clientX;
    if (((this.data.startX - end) > 50) || ((this.data.startX - end) == 50)) {
      if (flag == 0) {
        var list = this.data.rentList;
        list[index].cur_right = 100;
        this.setData({
          rentList: list
        })
      } else {
        var list = this.data.donateList;
        list[index].cur_right = 100;
        this.setData({
          donateList: list
        })
      }
    }
    if ((this.data.startX - end) < 50) {
      if (flag == 0) {
        var list = this.data.rentList;
        list[index].cur_right = 0;
        this.setData({
          rentList: list
        })
      } else {
        var list = this.data.donateList;
        list[index].cur_right = 0;
        this.setData({
          donateList: list
        })
      }
    }
  },
  //删除
  delete(e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var flag = e.currentTarget.dataset.flag;
    if (flag == 0) {
      app.rent.deleteProductByUser(that.data.rentList[index].id, function (res) {
        that.data.rentList.splice(index, 1);
        that.setData({
          rentList: that.data.rentList
        })
      })
    } else {
      app.rent.deleteProductByUser(that.data.donateList[index].id, function (res) {
        that.data.donateList.splice(index, 1);
        that.setData({
          donateList: that.data.donateList
        })
      })
    }
  },
})