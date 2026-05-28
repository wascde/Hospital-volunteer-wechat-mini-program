// pages/volunteerGuide/volunteerGuide.js
Page({
  data: {
    currentTab: 'rules' // 默认显示服务规范
  },

  onLoad: function () {
    // 页面加载时的初始化操作
  },

  switchTab: function (e) {
    const tab = e.currentTarget.dataset.tab;
    this.setData({
      currentTab: tab
    });
  }
})