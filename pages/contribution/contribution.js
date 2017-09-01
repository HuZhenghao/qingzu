// contribution.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    image_src: [],
    index: 0,
    agree: false,
    disableTap: false
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

  addImage() {
    const that = this;
    wx.chooseImage({
      sizeType: ['compressed'],
      success: function (res) {
        let tempFilePaths = res.tempFilePaths;
        that.setData({ image_src: tempFilePaths });
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

  agree(e) {
    let agree = this.data.agree;
    if(agree){
      this.setData({ agree: false });
    }
    else{
      this.setData({ agree: true });
    }
  },
  formSubmit(e){
    for(let key in e.detail.value){
       if(e.detail.value[key] === ""){
         wx.showToast({
          title: '内容不能为空',
        }); 
        return false;
      } 
    }
    if(this.data.image_src.length <= 0){
      wx.showToast({
        title: '图片不能为空',
      });
      return false;
    }
    if(!this.data.agree){
      wx.showToast({
        title: '同意使用协议',
      }); 
      return false;
    }
    let name = e.detail.value.title;
    let des = e.detail.value.intro;
    let phone = e.detail.value.tel;
    let address = e.detail.value.addr;
    let imageSrc = this.data.image_src;
    app.rent.contribution(name, des, phone, address, 1);
    this.setData({disableTap: true});
  }
})