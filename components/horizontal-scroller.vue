<template>
	<scroll-view class="scroll-view-horizontal" scroll-x="true" :show-scrollbar="false">
		<view class="tab-item" :class="{ 'is-selected': computedTab.isSelected }"
			v-for="(computedTab, index) in computedTabs" :key="index" @click="selectTab(index)">
			{{ computedTab.name }}
		</view>
	</scroll-view>
</template>

<script>
	export default {
		props: {
			tabs: {
				type: Array,
				default: () => []
			}
		},
		data() {
			return {
				// 内部维护选中的tab索引，默认为0，即第一个标签
				selectedTabIndex: 0
			};
		},
		computed: {
			// 根据选中的索引计算每个tab的选中状态
			computedTabs() {
				if (this.tabs.length === 0) {
					return [{
						name: '',
						isSelected: false
					}];
				}
				return this.tabs.map((tab, index) => ({
					name: tab,
					isSelected: index === this.selectedTabIndex
				}));
			}
		},
		methods: {
			selectTab(index) {
				// 设置新的选中索引
				this.selectedTabIndex = index;
				// 触发一个事件，通知父组件哪个标签被选中
				this.$emit('tab-change', this.tabs[index]);
			},
			mounted() {
				this.selectTab(0);
			}
		},
		watch: {
			// 监听父组件传递的tabs变化，同步更新内部tabs状态
			tabs: {
				immediate: true,
				handler(newVal) {
					// 确保selectedTabIndex不会超出tabs的范围
					if (newVal.length > 0) {
						this.selectedTabIndex = 0; // 确保有标签时选中第一个
					} else {
						this.selectedTabIndex = -1; // 没有标签时设置为-1或其他逻辑
					}
				}
			}
		}
	};
</script>

<style scoped>
	.scroll-view-horizontal {
		display: flex;
		white-space: nowrap;
		overflow-x: auto;
	}

	.tab-item {
		display: inline-block;
		margin-right: 20px;
		cursor: pointer;
		position: relative;
		font-size: 14px;
		font-weight: bold;
		color: black;
	}

	.is-selected {
		color: #CE2C32;
		/* 选中标签的文本颜色 */
	}

	.is-selected::after {
		content: '';
		display: block;
		width: 100%;
		height: 2px;
		background-color: #CE2C32;
		position: absolute;
		bottom: 0;
		left: 0;
	}
</style>