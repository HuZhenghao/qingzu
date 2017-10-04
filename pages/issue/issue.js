// issue.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    image_src: [],
    cycle_day: ["天", "月"],
    index:0,
    date_start:' 2017-09-01',
    date_end: '2017-10-01',
    submit: 0,
    agree: false,
    price_focus: false,
    tel_focus: false,
    intro_focus:false,
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

  agree(e) {
    let agree = this.data.agree;
    if (agree) {
      this.setData({ agree: false });
    }
    else {
      this.setData({ agree: true });
    }
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
  },


  formSubmit(e) {
    console.log(e.detail.value);
    for (let key in e.detail.value) {
      if (e.detail.value[key] === "") {
        wx.showToast({
          title: '内容不能为空',
        });
        return false;
      }
    }
    if (this.data.image_src.length <= 0) {
      wx.showToast({
        title: '图片不能为空',
      });
      return false;
    }
    if (!this.data.agree) {
      wx.showToast({
        title: '同意使用协议',
      });
      return false;
    }
    let name = e.detail.value.title;
    let Preprice = e.detail.value.price;
    let des = e.detail.value.intro;
    let address = e.detail.value.addr;
    let phone = e.detail.value.tel;
    let imageSrc = this.data.image_src;
    let starttime = e.detail.value.starttime;
    let endtime = e.detail.value.endtime;
    let cicleTime = e.detail.value.cicleTime;
    let price = "";
    if(cicleTime === 0){
      price = Preprice + "元/天";
    }
    else if(cicleTime === 1){
      price = Preprice + "元/月";
    }
    console.log(price);
    app.rent.upload(name, price, des, address, phone, starttime, endtime, imageSrc, 0);
    this.setData({ submit: 1 });
  }
})