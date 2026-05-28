// pages/profile/profile.js
Page({
  data: {
    userInfo: {
      name: '志愿者',
      id: 'VOL123456',
      avatar: '/images/avatar.png'
    },
    stats: {
      serviceHours: 48,
      serviceCount: 126,
      rating: 5.0
    }
  },

  onLoad: function () {
    // 页面加载时的初始化操作
    // 可以从本地存储或服务器获取用户信息
  },

  onShow: function () {
    // 页面显示时的操作
  },

  logout: function () {
    wx.showModal({
      title: '退出登录',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          // 执行退出登录操作
          // 清除本地存储的用户信息
          wx.removeStorageSync('userInfo');
          
          // 返回登录页面
          wx.navigateTo({
            url: '/pages/login/login'
          });
        }
      }
    });
  }
})