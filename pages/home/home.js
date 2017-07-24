// home.js
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
    rentList: [{
      img: "../../images/home/good.png",
      title: "标题",
      intro: "由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。",
      price: "50/天"
    },
    {
      img: "../../images/home/good.png",
      title: "标题",
      intro: "由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。",
      price: "50/天"
    }
    ],
    donateList: [{
      img: "../../images/home/donate.png",
      title: "标题",
      intro: "由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。",
    },
    {
      img: "../../images/home/donate.png",
      title: "标题",
      intro: "由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。",
    }
    ],
    mask: "hide",
    add: "add"
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
  change: function() {
    if(this.data.add === "add"){
      this.setData({
        add: "cancel",
        mask: "show"
      })
    }
    else{
      this.setData({
        add: "add",
        mask: "hide"
      })
    }
  }
})