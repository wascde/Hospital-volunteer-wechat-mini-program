// pages/deptSearch/deptSearch.js
const app = getApp();

Page({
  data: {
    searchText: '',
    searchResult: null,
    recentSearches: []
  },

  onLoad: function () {
    // 加载最近查询记录
    this.loadRecentSearches();
  },

  onInput: function (e) {
    this.setData({
      searchText: e.detail.value
    });
  },

  searchDept: function () {
    const keywords = this.data.searchText.trim();
    if (!keywords) {
      wx.showToast({
        title: '请输入症状或疾病名称',
        icon: 'none'
      });
      return;
    }

    // 搜索科室
    const deptName = app.globalData.symptomDeptMap[keywords] || '内科'; // 默认内科
    const deptInfo = app.globalData.departments.find(dept => dept.name === deptName);
    
    this.setData({
      searchResult: {
        deptName: deptInfo.name,
        deptDesc: deptInfo.description
      }
    });

    // 保存到最近查询
    this.saveToRecentSearches(keywords);
  },

  saveToRecentSearches: function (keywords) {
    let recentSearches = this.data.recentSearches;
    
    // 移除重复项
    recentSearches = recentSearches.filter(item => item !== keywords);
    
    // 添加到开头
    recentSearches.unshift(keywords);
    
    // 限制最多保存10条
    if (recentSearches.length > 10) {
      recentSearches = recentSearches.slice(0, 10);
    }
    
    this.setData({
      recentSearches: recentSearches
    });
    
    // 保存到本地存储
    wx.setStorageSync('recentSearches', recentSearches);
  },

  loadRecentSearches: function () {
    const recentSearches = wx.getStorageSync('recentSearches') || [];
    this.setData({
      recentSearches: recentSearches
    });
  },

  onHistoryTap: function (e) {
    const keywords = e.currentTarget.dataset.keywords;
    this.setData({
      searchText: keywords
    });
    this.searchDept();
  },

  deleteHistory: function (e) {
    const index = e.currentTarget.dataset.index;
    let recentSearches = this.data.recentSearches;
    recentSearches.splice(index, 1);
    
    this.setData({
      recentSearches: recentSearches
    });
    
    // 更新本地存储
    wx.setStorageSync('recentSearches', recentSearches);
  }
})