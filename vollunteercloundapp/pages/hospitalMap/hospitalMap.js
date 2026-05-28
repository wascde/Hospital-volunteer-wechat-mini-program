// pages/hospitalMap/hospitalMap.js
const app = getApp();

Page({
  data: {
    // 楼层数据
    floors: [],
    // 当前楼层
    currentFloor: 1,
    currentFloorData: null,
    // 当前楼层的房间列表（含计算后的样式）
    rooms: [],
    // 房间类型配色
    roomTypes: {},
    // 选中的房间
    selectedRoom: null,
    // 是否显示详情弹窗
    showDetail: false,
    // 屏幕宽度（用于计算 rpx 转换）
    screenWidth: 375
  },

  onLoad: function () {
    const mapData = app.globalData.hospitalMap;
    this.setData({
      floors: mapData.floors,
      roomTypes: mapData.roomTypes,
      screenWidth: wx.getSystemInfoSync().screenWidth
    });

    // 默认选择1楼
    this.switchFloor(1);
  },

  // 切换楼层
  switchFloor: function (floorId) {
    const floorData = this.data.floors.find(f => f.id === floorId);
    if (!floorData) return;

    // 为每个房间计算样式（百分比定位）
    const rooms = floorData.rooms.map(room => {
      const typeInfo = this.data.roomTypes[room.type] || { color: '#6B7280', bg: '#F3F4F6' };
      return {
        ...room,
        // 样式在 wxml 中用内联 style 实现更直接
        color: typeInfo.color,
        bgColor: typeInfo.bg,
        typeLabel: typeInfo.label
      };
    });

    this.setData({
      currentFloor: floorId,
      currentFloorData: floorData,
      rooms: rooms,
      selectedRoom: null,
      showDetail: false
    });
  },

  // 楼层选择器点击
  onFloorTap: function (e) {
    const floorId = parseInt(e.currentTarget.dataset.floorId);
    this.switchFloor(floorId);
  },

  // 点击房间
  onRoomTap: function (e) {
    const roomId = e.currentTarget.dataset.roomId;
    const room = this.data.rooms.find(r => r.id === roomId);
    if (!room) return;

    this.setData({
      selectedRoom: room,
      showDetail: true
    });
  },

  // 关闭详情弹窗
  closeDetail: function () {
    this.setData({
      showDetail: false
    });
  },

  // 阻止冒泡（防止点击详情内容时关闭）
  noop: function () {}
});
