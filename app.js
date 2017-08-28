//app.js
// var service = "http://www.whtlkj.cn/rent/"
var service = "http://192.168.67.21:8080/rent/"
App({
  onLaunch: function() {
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
    //根据id获取商品
    getProductById: function(id, cb) {
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
    //请求后台登陆
    login: function (id, userNickname,cb) {
      wx.request({
        url: `${service}user/login?id=${id}&userNickname=${userNickname}`,
        success: function (res) {
          if (cb) { cb(res.data); }
        },
        fail: function () {
          wx.showToast
            (
            {
              title: "登录失败！",
              icon: 'success',
              duration: 2000
            }
            )
        }
      })
    },
    //验证教务处
    check: function (id, userNickname, username, password, cb) {
      wx.request({
        url: `${service}user/check?id=${id}&userNickname=${userNickname}&username=${username}&password=${password}`,
        success: function (res) {
          if (cb) { cb(res.data); }
        },
        fail: function () {
          wx.showToast
            (
            {
              title: "验证失败！",
              icon: 'success',
              duration: 2000
            }
            )
        }
      })
    },
    //获取收藏状态
    getCollectState: function (colUserid, colProid, cb) {
      wx.request({
        url: `${service}collect/getCollectState?colUserid=${colUserid}&colProid=${colProid}`,
        success: function (res) {
          if (cb) { cb(res.data); }
        },
        fail: function () {
          wx.showToast
            (
            {
              title: "获取收藏失败！",
              icon: 'success',
              duration: 2000
            }
            )
        }
      })
    },
    //收藏物品
    addCollect: function (colUserid, colProid, cb){
      wx.request({
        url: `${service}collect/addCollectByUser?colUserid=${colUserid}&colProid=${colProid}`,
        success: function (res) {
          if (cb) { cb(res.data); }
        },
        fail: function () {
          wx.showToast
            (
            {
              title: "收藏失败！",
              icon: 'success',
              duration: 2000
            }
            )
        }
      })
    },
    //删除收藏物品
    delCollect: function (colUserid, colProid, cb) {
      wx.request({
        url: `${service}collect/deleteCollect?colUserid=${colUserid}&colProid=${colProid}`,
        success: function (res) {
          if (cb) { cb(res.data); }
        },
        fail: function () {
          wx.showToast
            (
            {
              title: "删除失败！",
              icon: 'success',
              duration: 2000
            }
            )
        }
      })
    },
    //获取收藏列表
    getAllCollect: function (id, userNickname, cb) {
      wx.request({
        url: `${service}collect/getAllCollect?id=${id}&userNickname=${userNickname}`,
        success: function (res) {
          if (cb) { cb(res.data); }
        },
        fail: function () {
          wx.showToast
            (
            {
              title: "获取失败！",
              icon: 'success',
              duration: 2000
            }
            )
        }
      })
    },

    upload(name, price, des, addr, phone, starttime, endtime, imageSrc, flag) {
      const that = this;
      var uid = wx.getStorageSync("uid");
      var nickname = wx.getStorageSync("userInfo").nickName;
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
          proUnionid: uid,
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
      var uid = wx.getStorageSync("uid");
      var nickname = wx.getStorageSync("userInfo").nickName;
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
          proUnionid: uid,
          proNickname: nickname
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
      console.log("开始",id);
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
            console.log("上传中" + i,res);
            wx.navigateBack({
              delta: 1
            });
          }
        })
      }
      console.log("结束");
    }
  },
  //获取用户发布列表
  getProductByUser: function (id, userNickname, cb) {
    wx.request({
      url: `${service}product/getProductByUser?id=${id}&userNickname=${userNickname}`,
      success: function (res) {
        if (cb) { cb(res.data); }
      },
      fail: function () {
        wx.showToast
          (
          {
            title: "获取失败！",
            icon: 'success',
            duration: 2000
          }
          )
      }
    })
  }
})
