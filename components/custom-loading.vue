<!-- components/custom-loading.vue -->
<template>
  <view class="loading-container">
    <image src="/static/车轮.svg" mode="widthFix" class="loading-icon"></image>
    <text class="loading-text">加载中...</text>
  </view>
</template>

<script>
export default {
  name: 'CustomLoading',
};
</script>

<style>
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8); /* 半透明背景 */
  z-index: 9999;
}

.loading-icon {
  width: 40px;
  height: 40px;
  animation: rotate 1s linear infinite; /* 旋转动画 */
}

.loading-text {
  margin-top: 10px;
  font-size: 14px;
  color: #333;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>