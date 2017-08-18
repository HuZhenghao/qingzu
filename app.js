//app.js
var service = "http://www.whtlkj.cn/rent/"
App({
  onLaunch: function() {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },

  getUserInfo: function(cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: false,
        success: function(res) {
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },

  globalData: {
    userInfo: null
  },
  rent: {
    //获取商品列表
    getProductByPage: function(pageCount, currentPage, flag, cb) {
      wx.request({
        url: `${service}product/getProductByPage?pageCount=${pageCount}&currentPage=${currentPage}&flag=${flag}`,
        success: function (res) {
            if (cb) { cb(res.data); }
        },
        fail: function () {
          wx.showToast
            (
            {
              title: "获取商品失败！",
              icon: 'success',
              duration: 2000
            }
            )
        }
      })
    },
  }
})
