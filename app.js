//app.js
var service = "https://www.whtlkj.cn/rent/"
// var service = "http://192.168.67.21:8080/rent/"
App({
  onLaunch: function () {
    var that = this;
    this.getUserInfo(function (userInfo) {
      //更新数据
      if (!wx.getStorageSync("uid")) {
        wx.login({
          success: function (res) {
            wx.request({
              url: `https://www.whtlkj.cn/rent/user/getInfo?appid=wxe27040be939f6364&secret=c0cb4ba401961f12a8ce4308b9001e76&js_code=${res.code}&grant_type=authorization_code`,
              success: function (res) {
                console.log(res);
                var uid = res.data.openid
                wx.setStorageSync("uid", uid);
                //请求后台登陆
                that.rent.login(uid, userInfo.nickName, function (res) {
                  wx.setStorageSync("flag", res.userFlag);
                  wx.setStorageSync("userInfo", userInfo);
                })
              }
            });
          }
        });
      }
    });
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
    //根据id获取商品
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
    //请求后台登陆
    login: function (id, userNickname, cb) {
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
    /* check: function (id, userNickname, username, password, cb) {
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
    }, */
    check(id, userNickname, username, password, cb){
      let res = {errCode: 0};
      cb(res)
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
    addCollect: function (colUserid, colProid, cb) {
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
          proFlag: flag,
          proImgurl: ""
        },
        success(res) {
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
          wx.navigateBack({
            delta: 1
          });
          const id = res.data.id;
          that.upLoadImage(imageSrc, id);
        }
      })
    },
    upLoadImage(imageSrc, id) {
      let imgComplete = 0;
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
          },
          complete: function (res) {
            imgComplete++;
            if (imgComplete === imageSrc.length) {
              setTimeout(function(){
                wx.navigateBack({
                  delta: 1,
                });
              },500);
            }
          }
        })
      }
    },

    // 留言
    giveMessage(proId, messageText, mesTo, cb){
      var uid = wx.getStorageSync("uid");
      console.log(uid);
      wx.request({
        url: `${service}message/addMessage`,
        data:{
          mesProid:proId,
          mesContent: messageText,
          mesFrom:uid,
          mesTo: mesTo
        },
        success(res){
          cb(res);
        }
      })
    },

    // 获取商品留言
    getMessage(productId, cb) {
      wx.request({
        url: `${service}message/getMessageByProduct`,
        data: {
          id: productId
        },
        success(res) {
          cb(res);
        }
      })
    },

    // 获取用户留言
    getUserMessage(cb) {
      var uid = wx.getStorageSync("uid");
      wx.request({
        url: `${service}message/getMessageByUser`,
        data: {
          id: uid
        },
        success(res) {
          cb(res);
        }
      })
    }
  }
})
