//app.js
var service = "http://www.whtlkj.cn/rent/"
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },

  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: false,
        success: function (res) {
          console.log(res);
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
    getProductByPage: function (pageCount, currentPage, flag, cb) {
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
    getProductById: function (id, cb) {
      wx.request({
        url: `${service}product/getProductById?id=${id}`,
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

    // 发布
    issue(name, price, des, addr, phone, unionid, nickname, starttime, endtime, imageSrc, flag) {
      const that = this;
      const unionid = wx.getStorageSync("uid");
      const nickname = wx.getStorageSync("userInfo").nickName;
      wx.request({
        url: `${service}product/addProduct`,
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          proName: name,
          proPrice: price,
          proDescription: des,
          proAddress: addr,
          proPhone: phone,
          proUnionid: unionid,
          proNickname: nickname,
          proStarttime: starttime,
          proEndtime: endtime,
          proFlag: flag
        },
        success(res) {
          console.log(res);
          wx.navigateBack({
            delta: 1
          });
          const id = res.data.id;
          that.upLoadImage(imageSrc, id);
        }
      })
    },

    contribution(name, des, phone, address, flag) {
      const that = this;
      wx.request({
        url: `${service}product/addProduct`,
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          proName: name,
          proDescription: des,
          proPhone: phone,
          proAddress: address,
          proFlag: flag,
        },
        success(res) {
          console.log(res);
          wx.navigateBack({
            delta: 1
          });
          const id = res.data.id;
          that.upLoadImage(imageSrc, id);
        }
      })
    },

    upLoadImage(imageSrc, id) {
      for (let i = 0; i < imageSrc.length; i++) {
        wx.uploadFile({
          url: `${service}product/addPhoto`,
          filePath: imageSrc[i],
          name: 'image',
          formData: {
            'id': id
          },
          success: function (res) {
            //do something
            wx.navigateBack({
              delta: 1
            });
          }
        })
      }
    }
  }
})
