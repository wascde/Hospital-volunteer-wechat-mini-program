// pages/faq/faq.js
Page({
  data: {
    searchText: '',
    categories: [
      { id: 0, name: '全部' },
      { id: 1, name: '挂号缴费' },
      { id: 2, name: '就诊流程' },
      { id: 3, name: '医院设施' },
      { id: 4, name: '其他问题' }
    ],
    currentCategory: 0,
    faqs: [
      {
        id: 1,
        categoryId: 1,
        question: '如何进行网上挂号？',
        answer: '您可以通过医院官方微信公众号、官方网站或自助挂号机进行网上挂号。挂号时需要提供患者身份证信息和联系电话。'
      },
      {
        id: 2,
        categoryId: 1,
        question: '可以使用哪些方式缴费？',
        answer: '医院支持现金、银行卡、微信支付、支付宝等多种缴费方式。门诊楼各层都设有缴费窗口和自助缴费机。'
      },
      {
        id: 3,
        categoryId: 2,
        question: '就诊的流程是什么？',
        answer: '就诊流程一般为：挂号→候诊→就诊→检查→缴费→取药。您可以根据挂号单上的信息到相应科室候诊。'
      },
      {
        id: 4,
        categoryId: 2,
        question: '如何查询检查结果？',
        answer: '检查结果出来后，您可以通过医院官方微信公众号、自助打印机或到相应科室的服务台查询和打印结果。'
      },
      {
        id: 5,
        categoryId: 3,
        question: '医院的停车场在哪里？',
        answer: '医院设有地下停车场和地面停车场，入口位于医院大门右侧。停车收费标准为每小时5元，每天最高30元。'
      },
      {
        id: 6,
        categoryId: 3,
        question: '医院有没有餐厅？',
        answer: '医院食堂位于门诊楼地下一层，提供早餐、午餐和晚餐。此外，医院周边也有多家餐厅可供选择。'
      },
      {
        id: 7,
        categoryId: 4,
        question: '如何申请病历复印？',
        answer: '您可以携带患者身份证到医院病案室申请病历复印。如果是代办，还需要提供代办人身份证和患者授权委托书。'
      },
      {
        id: 8,
        categoryId: 4,
        question: '医院的工作时间是多少？',
        answer: '门诊工作时间为周一至周五8:00-17:00，周六周日8:00-12:00。急诊24小时开放。'
      }
    ],
    filteredFaqs: [],
    expandedFaqs: {}
  },

  onLoad: function () {
    // 初始加载所有问题
    this.setData({
      filteredFaqs: this.data.faqs
    });
  },

  onInput: function (e) {
    this.setData({
      searchText: e.detail.value
    });
  },

  searchFaq: function () {
    const keywords = this.data.searchText.trim();
    let filtered = this.data.faqs;
    
    // 按关键词过滤
    if (keywords) {
      filtered = filtered.filter(faq => 
        faq.question.includes(keywords) || faq.answer.includes(keywords)
      );
    }
    
    // 按分类过滤
    if (this.data.currentCategory !== 0) {
      filtered = filtered.filter(faq => 
        faq.categoryId === this.data.currentCategory
      );
    }
    
    this.setData({
      filteredFaqs: filtered
    });
  },

  selectCategory: function (e) {
    const categoryId = parseInt(e.currentTarget.dataset.categoryId);
    this.setData({
      currentCategory: categoryId
    });
    this.searchFaq();
  },

  toggleFaq: function (e) {
    const faqId = e.currentTarget.dataset.faqId;
    const expandedFaqs = {...this.data.expandedFaqs};
    expandedFaqs[faqId] = !expandedFaqs[faqId];
    
    this.setData({
      expandedFaqs: expandedFaqs
    });
  }
})