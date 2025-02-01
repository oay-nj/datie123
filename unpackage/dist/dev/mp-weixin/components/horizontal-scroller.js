"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {
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
          name: "",
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
      this.selectedTabIndex = index;
      this.$emit("tab-change", this.tabs[index]);
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
        if (newVal.length > 0) {
          this.selectedTabIndex = 0;
        } else {
          this.selectedTabIndex = -1;
        }
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($options.computedTabs, (computedTab, index, i0) => {
      return {
        a: common_vendor.t(computedTab.name),
        b: computedTab.isSelected ? 1 : "",
        c: index,
        d: common_vendor.o(($event) => $options.selectTab(index), index)
      };
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-903cd463"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/horizontal-scroller.js.map
