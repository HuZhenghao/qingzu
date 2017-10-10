// home.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      '../../images/home/banner.png',
      '../../images/home/banner.png',
      '../../images/home/banner.png'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 500,
    rent: "cur",
    donate: "nocur",
    rent_show: true,
    donate_show: false,
    rentList: [],
    donateList: [],
    rentPage: 0,
    donatePage: 0,
    mask: "hide",
    add: "add",
    donate_img: "../../images/home/donate.png",
    rent_isloadding: true,
    donate_isloadding: true,
    uid: 0,
    userInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
    wx.login({
      success: function (res) {
        wx.request({
          url: `https://api.weixin.qq.com/sns/jscode2session?appid=wx8a3c6a25c550566a&secret=474efe7f04d62a593205b6f0c4d1b306&js_code=${res.code}&grant_type=authorization_code`,
          success: function(res){
            that.setData({
              uid: res.data.openid
            })
            wx.setStorageSync("uid", that.data.uid);
            //请求后台登陆
            app.rent.login(that.data.uid, that.data.userInfo.nickName,function(res){
              console.log(res);
              wx.setStorageSync("flag",res.userFlag);
              wx.setStorageSync("userInfo", that.data.userInfo);
            })
          }
        })
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
    var that = this;
    //获取出租列表
    app.rent.getProductByPage(5, 1, 0, function (res) {
      for (let item of res.list) {
        var img = item.proImgurl.split("|")[0];
        item.proImgurl = img;
      }
      that.setData({
        rentList: res.list,
        rentPage: res.currentPage
      })
    })
    //获取捐赠列表

    app.rent.getProductByPage(5, 1, 1, function (res) {
      that.setData({
        donateList: res.list,
        donatePage: res.currentPage
      })
    })
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
    var that = this;
    if (that.data.rent_show) {
      if (!that.data.rent_isloadding) { return false }
      app.rent.getProductByPage(5, that.data.rentPage + 1, 0, function (res) {
        console.log(res.list.length);
        if (res.list.length < 5) {
          that.setData({
            rent_isloadding: false
          })
        }
        for (let item of res.list) {
          var img = item.proImgurl.split("|")[0];
          item.proImgurl = img;
        }
        var list = that.data.rentList;
        for (var num in res.list) {
          list.push(res.list[num])
        }
        that.setData({
          rentList: list,
          rentPage: res.currentPage
        })
      })
    }
    else {
      if (!that.data.donate_isloadding) { return false }
      app.rent.getProductByPage(5, that.data.donatePage + 1, 1, function (res) {
        console.log(res.list.length);
        if (res.list.length < 5) {
          that.setData({
            donate_isloadding: false
          })
        }
        var list = that.data.donateList;
        for (var num in res.list) {
          list.push(res.list[num])
        }
        that.setData({
          donateList: list,
          donatePage: res.currentPage
        })
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  rent: function () {
    this.setData({
      rent: "cur",
      donate: "nocur",
      rent_show: true,
      donate_show: false
    })
  },
  donate: function () {
    this.setData({
      rent: "nocur",
      donate: "cur",
      rent_show: false,
      donate_show: true
    })
  },
  change: function () {
    if (this.data.add === "add") {
      this.setData({
        add: "cancel",
        mask: "show"
      })
    }
    else {
      this.setData({
        add: "add",
        mask: "hide"
      })
    }
  },
  //跳转至详情页面
  toDetails: function (e) {
    // if(wx.getStorageSync("flag") == 0 ){
    //   wx.navigateTo({
    //     url: '../login/login',
    //   })
    //   return false;
    // }
    var index = e.currentTarget.dataset.index;
    var id = this.data.rentList[index].id;
    wx.navigateTo({
      url: '../details/details?id=' + id,
    })
  },
  //跳转至捐和租页面
  toRent: function () {
    this.change();
    if (wx.getStorageSync("flag") == 0) {
      wx.navigateTo({
        url: '../login/login',
      })
      return false;
    }
    wx.navigateTo({
      url: '../issue/issue',
    })
  },
  toDonate: function () {
    this.change();
    if (wx.getStorageSync("flag") == 0) {
      wx.navigateTo({
        url: '../login/login',
      })
      return false;
    }
    wx.navigateTo({
      url: '../contribution/contribution',
    })
  }
})