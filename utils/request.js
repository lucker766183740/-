//  const appUrl = 'http://192.168.2.56:9080/listen/'
//  const appUrl2 = 'http://192.168.2.56:9080/' 
 const appUrl = 'https://jcxm.xahrhz.com/lis/listen/'
 const appUrl2 = 'https://jcxm.xahrhz.com/lis/' 
//  const appUrl = 'http://192.168.2.24:9080/listen/'
//  const appUrl2 = 'http://192.168.2.24:9080/' 
//  登录
 function request_n_post_token(url, data, cb) {
  let dataType = Object.assign(data)
  let token = wx.getStorageSync('token')
  wx.request({
    url: url,
    data: dataType,
    method: 'POST',
    header: {
      "content-type": "application/x-www-form-urlencoded",
      "Authorization": "Basic cmVucmVuaW86cmVucmVuaW8=",
    }, // 设置请求的 header
    success: function (res) {
      cb(res, null);
    },
    fail: function (res) {
      cb(null, res)
      // wx.hideLoading({  fail() {}});
    }
  })
};
 
 // POST请求无loding
 function request_n_post(url, data, cb) {
   let dataType = Object.assign(data)
   let token = wx.getStorageSync('token')
   wx.request({
     url: url,
     data: dataType,
     method: 'POST',
     header: {
       "Content-Type":"application/json",
       "Authorization": token.token
     }, // 设置请求的 header
     success: function (res) {
       cb(res, null);
     },
     fail: function (res) {
       cb(null, res)
      //  wx.hideLoading({  fail() {}});
     }
   })
 };
 // POST请求-jsonString
 function request_post_jsonString(url, data, cb) {
   let token = wx.getStorageSync('token')
   wx.request({
     url: url,
     data: data,
     method: 'POST',
     header: {
      'content-type': 'application/json',
       "Authorization": token.token
     }, // 设置请求的 header
     success: function (res) {
       cb(res, null);
     },
     fail: function (res) {
       cb(null, res)
      //  wx.hideLoading({  fail() {}});
     }
   })
 };
 //GET请求无loading
 function request_n_get(url, data, cb) {
   let dataType = Object.assign(data, {
     appType: 'wx'
   })
   let token = wx.getStorageSync('token')
   wx.request({
     url: url,
     data: dataType,
     method: 'GET',
     header: {
       'content-type': 'application/json',
       "Authorization": token.token
     },
     success(res) {
       cb(res, null);
     },
     fail(err) {
       cb(null, err);
      //  wx.hideLoading({  fail() {}}  );
     }
   })
 }
 //GET请求-application
 function request_application_get(url, data, cb) {
   let dataType = Object.assign(data, {
     appType: 'wx'
   })
   let token = wx.getStorageSync('token')
   wx.request({
     url: url,
     data: dataType,
     method: 'GET',
     header: {
       'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
       "Authorization": token.token
     },
     success(res) {
       cb(res, null);
     },
     fail(err) {
       cb(null, err);
      //  wx.hideLoading({  fail() {} });
     }
   })
 }


 // 登录等待
 const showLogin = (title) => {
   wx.showToast({
     title: title,
     mask: true,
     duration: 60000, //延迟时间
     icon: 'loading'
   })
 }
 // 参数未传
 const showParamsNot = (title) => {
   wx.showToast({
     title: title,
     mask: true,
     duration: 2000,
     icon: 'none'
   })
 }
 // 用户是否授权
 const isAuthFn = () => {
   let userInfo = wx.getStorageSync('userInfo')
   let token = wx.getStorageSync('token')
   let isAuth = (userInfo && token) ? true : false
   return isAuth
 }

 module.exports = {
   appUrl,
   appUrl2,
   request_n_post,
   request_n_post_token,
   request_post_jsonString,
   request_n_get,
   request_application_get,
   showLogin,
   showParamsNot,
   isAuthFn
 }


 // 使用案例
 // visit.request_n_get(url, {
 //   userId: wx.getStorageSync('sessionMsg').user_id,
 //   session_key: wx.getStorageSync('sessionMsg').session_key
 // }, (result) => {
 //   console.log( result )
 // })