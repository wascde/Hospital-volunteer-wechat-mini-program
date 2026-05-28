// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null,
    // 医院科室数据
    departments: [
      { id: 1, name: '内科', description: '主要诊治心血管疾病、呼吸系统疾病、消化系统疾病等' },
      { id: 2, name: '外科', description: '主要诊治各种需要手术治疗的疾病' },
      { id: 3, name: '儿科', description: '专门为儿童提供医疗服务的科室' },
      { id: 4, name: '妇产科', description: '主要诊治女性生殖系统疾病和提供产科服务' },
      { id: 5, name: '眼科', description: '主要诊治眼部疾病' },
      { id: 6, name: '耳鼻喉科', description: '主要诊治耳、鼻、咽喉等部位的疾病' },
      { id: 7, name: '口腔科', description: '主要诊治口腔及颌面部疾病' },
      { id: 8, name: '皮肤科', description: '主要诊治皮肤疾病' }
    ],
    // 症状与科室对应关系
    symptomDeptMap: {
      '头痛': '内科',
      '发热': '内科',
      '咳嗽': '内科',
      '腹痛': '内科',
      '骨折': '外科',
      '伤口': '外科',
      '儿童发烧': '儿科',
      '孕妇检查': '妇产科',
      '视力模糊': '眼科',
      '耳鸣': '耳鼻喉科',
      '牙痛': '口腔科',
      '皮疹': '皮肤科'
    },
    // 医院地图数据
    hospitalMap: {
      // 房间类型配色
      roomTypes: {
        service: { label: '服务窗口', color: '#F59E0B', bg: '#FEF3C7' },
        consultation: { label: '门诊科室', color: '#3B82F6', bg: '#DBEAFE' },
        specialist: { label: '专科门诊', color: '#10B981', bg: '#D1FAE5' },
        inpatient: { label: '住院/手术', color: '#EF4444', bg: '#FEE2E2' },
        facility: { label: '公共设施', color: '#8B5CF6', bg: '#EDE9FE' }
      },
      floors: [
        {
          id: 1, name: '1楼',
          description: '门诊大厅 — 挂号、缴费、基础门诊',
          rooms: [
            { id: '1-1', name: '挂号处', type: 'service', width: 28, height: 20, x: 8, y: 8, desc: '办理挂号、预约取号、号源查询' },
            { id: '1-2', name: '收费处', type: 'service', width: 28, height: 20, x: 64, y: 8, desc: '缴费、退费、发票打印' },
            { id: '1-3', name: '内科门诊', type: 'consultation', width: 25, height: 28, x: 8, y: 48, desc: '心血管、呼吸、消化、神经内科等' },
            { id: '1-4', name: '外科门诊', type: 'consultation', width: 25, height: 28, x: 67, y: 48, desc: '普外、骨外、泌尿外科等' },
            { id: '1-5', name: '药房', type: 'facility', width: 20, height: 16, x: 40, y: 8, desc: '凭处方取药，中药房在西侧' },
            { id: '1-6', name: '导诊台', type: 'facility', width: 16, height: 10, x: 42, y: 36, desc: '咨询服务、轮椅租借、失物招领' }
          ]
        },
        {
          id: 2, name: '2楼',
          description: '儿科与妇产科专区',
          rooms: [
            { id: '2-1', name: '儿科门诊', type: 'specialist', width: 28, height: 36, x: 6, y: 8, desc: '儿童常见病诊治、儿童保健、疫苗接种' },
            { id: '2-2', name: '儿科候诊区', type: 'facility', width: 28, height: 16, x: 6, y: 52, desc: '儿科专用候诊区，配备儿童游乐设施' },
            { id: '2-3', name: '妇产科门诊', type: 'specialist', width: 28, height: 36, x: 66, y: 8, desc: '妇科检查、产前检查、产后康复' },
            { id: '2-4', name: '妇产科B超', type: 'specialist', width: 28, height: 16, x: 66, y: 52, desc: '妇科B超、产科四维彩超' },
            { id: '2-5', name: '采血中心', type: 'service', width: 18, height: 20, x: 41, y: 18, desc: '静脉采血、指尖采血' },
            { id: '2-6', name: '洗手间', type: 'facility', width: 14, height: 12, x: 43, y: 54, desc: '无障碍卫生间位于北侧' }
          ]
        },
        {
          id: 3, name: '3楼',
          description: '五官科与皮肤科专区',
          rooms: [
            { id: '3-1', name: '眼科门诊', type: 'specialist', width: 22, height: 30, x: 5, y: 10, desc: '视力检查、眼病诊治、配镜服务' },
            { id: '3-2', name: '耳鼻喉科', type: 'specialist', width: 22, height: 30, x: 39, y: 10, desc: '耳部、鼻部、咽喉部疾病诊治' },
            { id: '3-3', name: '口腔科', type: 'specialist', width: 22, height: 30, x: 73, y: 10, desc: '牙体牙髓、口腔正畸、口腔修复' },
            { id: '3-4', name: '皮肤科', type: 'specialist', width: 22, height: 22, x: 39, y: 52, desc: '皮肤病诊治、皮肤美容、激光治疗' },
            { id: '3-5', name: '治疗室', type: 'facility', width: 22, height: 22, x: 73, y: 52, desc: '换药、雾化吸入、小手术' },
            { id: '3-6', name: '电梯厅', type: 'facility', width: 18, height: 12, x: 5, y: 56, desc: '1-4号电梯，5号为货梯' }
          ]
        },
        {
          id: 4, name: '4楼',
          description: '住院部与手术室',
          rooms: [
            { id: '4-1', name: '住院部', type: 'inpatient', width: 40, height: 44, x: 5, y: 6, desc: '住院病房、护士站、医生办公室' },
            { id: '4-2', name: '手术室', type: 'inpatient', width: 40, height: 44, x: 55, y: 6, desc: '无菌手术室、麻醉恢复室' },
            { id: '4-3', name: '家属等候区', type: 'facility', width: 28, height: 18, x: 36, y: 58, desc: '手术家属等候区，配备电子屏显示手术状态' },
            { id: '4-4', name: 'ICU', type: 'inpatient', width: 28, height: 18, x: 5, y: 58, desc: '重症监护室，探视时间请遵守规定' }
          ]
        }
      ]
    }
  }
})