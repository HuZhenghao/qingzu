// pages/collect/collect.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rentList: [{
      img: "../../images/home/good.png",
      proName: "标题1",
      proPrice: "50元/天",
      proDescription: "物品介绍",
      cur_right: 0
    }, {
      img: "../../images/home/good.png",
      proName: "标题2",
      proPrice: "50元/天",
      proDescription: "物品介绍",
      cur_right: 0
    }],
    startX: 0
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
    var startX = e.touches[0].clientX;
    this.data.startX = startX;
  },
  touchMove: function (e) {
    var index = e.currentTarget.dataset.index;
    var flag = e.currentTarget.dataset.flag;
    var curX = e.touches[0].clientX;
    var move = this.data.startX - curX;
    if (move > 80) { move = 80 }
    if (move < 0) { move = 0 }
    if (flag == 0) {
      var list = this.data.rentList;
      if (list[index].cur_right == 80 && move > 0) {
        return false;
      }
      list[index].cur_right = move;
      this.setData({
        rentList: list
      })
    } else {
      var list = this.data.donateList;
      if (list[index].cur_right == 80 && move > 0) {
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
    if (((this.data.startX - end) > 40) || ((this.data.startX - end) == 40)) {
      if (flag == 0) {
        var list = this.data.rentList;
        list[index].cur_right = 80;
        this.setData({
          rentList: list
        })
      } else {
        var list = this.data.donateList;
        list[index].cur_right = 80;
        this.setData({
          donateList: list
        })
      }
    }
    if ((this.data.startX - end) < 40) {
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
      this.data.rentList.splice(index, 1);
      this.setData({
        rentList: that.data.rentList
      })
    } else {
      this.data.donateList.splice(index, 1);
      this.setData({
        donateList: that.data.donateList
      })
    }
  },
})