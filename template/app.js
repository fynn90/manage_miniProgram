import {
  ENV
} from './common.js';
import{shop_id} from './config.js'
App({
  onLaunch: function () {},
  onShow({
      scene, query
  }) {},
  onHide() {
    // wx.removeStorageSync('shop_id');
  },
  getUserInfo: function (callback) {

  },
  //get locationInfo
  getLocationInfo: function (callback) {

  },
  /**
   * 比较数组中的最大值 
   **/
  getMax: function (arr) {
    var max = arr[0];
    arr.forEach(function (ele, index) {
      if (ele > max) {
        max = ele;
      }
    })
    return max;
  },
  /**
   * 比较数组中的最小值 
   **/
  getMin: function (arr) {
    var min = arr[0];
    arr.forEach(function (ele, index) {
      if (ele < min) {
        min = ele;
      }
    })
    return min;
  },
  /**
   * 格式化相加的价格
   **/
  priceAddFormat: function (arr) {
    return arr.reduce(function (partial, value) {
      return parseFloat(((partial * 10000 + value * 10000) / 10000).toFixed(2));
    });
  },
  /**
   * 格式化相减的价格
   **/
  priceReduceFormat: function (arr) {
    return arr.reduce(function (partial, value) {
      return parseFloat(((partial * 10000 - value * 10000) / 10000).toFixed(2));
    });
  },
  /**
   * 格式化单品价格
   **/
  formatPrice: function (arr) {
    return parseFloat(arr.toFixed(2));
  },
  /**
   * 格式化时间
   **/
  dateformat: function (total) {
    // 小时
    var s = (total % 60) < 10 ? ('0' + total % 60) : total % 60;
    // 分钟
    var h = total / 3600 < 10 ? ('0' + parseInt(total / 3600)) : parseInt(total / 3600);
    // 秒位
    var m = (total - h * 3600) / 60 < 10 ? ('0' + parseInt((total - h * 3600) / 60)) : parseInt((total - h * 3600) / 60);
    // return h + ' : ' + m + ' : ' + s;
    return m + ' : ' + s;
  },
  /**
   * 获取剩余时间数
   **/
  getRestTime: function (orderTime) {
    orderTime = orderTime.replace(new RegExp("-", "gm"), "/");
    var ordertimeFormate = (new Date(orderTime)).getTime(); //得到毫秒数
    var overtimeFormate = ordertimeFormate + 3600000; //获得超时时间的毫秒数
    var currTime = new Date().getTime(); //获取当前时间的毫秒数
    var restTime = overtimeFormate - currTime;
    if (restTime > 0) {
      restTime = restTime;
    } else {
      restTime = 0;
    }
    var total = parseInt(restTime / 1000);
    return total;
  },
  globalData: {
    userInfo: null,
    locationInfo: {
      latitude: 0,
      longitude: 0,
    },
    qqMapKey: 'SWLBZ-WKWCJ-SKLFP-FBAGY-2M3WE-SBFAI',
    shop_id: shop_id
  },
  windowHeight: "",
  windowWidth: "",
});
