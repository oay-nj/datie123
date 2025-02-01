"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      url: "about:blank",
      pageTitle: "",
      statusBarHeight: 20
    };
  },
  onLoad(event) {
    this.statusBarHeight = common_vendor.index.getSystemInfoSync().statusBarHeight;
    if (event.query) {
      try {
        this.url = decodeURIComponent(event.query);
        common_vendor.index.__f__("log", "at pages/news/detail.nvue:41", "Loading URL:", this.url);
        if (!this.url.startsWith("http://") && !this.url.startsWith("https://")) {
          this.url = "https://" + this.url;
        }
      } catch (e) {
        common_vendor.index.__f__("error", "at pages/news/detail.nvue:47", "URL decode error:", e);
        common_vendor.index.showToast({
          title: "URL格式错误",
          icon: "none"
        });
      }
    } else {
      common_vendor.index.__f__("error", "at pages/news/detail.nvue:54", "No URL provided");
      common_vendor.index.showToast({
        title: "未提供URL",
        icon: "none"
      });
    }
    if (event.title) {
      this.pageTitle = decodeURIComponent(event.title);
    }
  },
  methods: {
    navigateBack() {
      common_vendor.index.navigateBack();
    },
    handlePostMessage(event) {
      common_vendor.index.__f__("log", "at pages/news/detail.nvue:70", "PostMessage received:", event.detail);
      if (event.detail.data && event.detail.data.title) {
        if (event.detail.data.title) {
          this.pageTitle = event.detail.data.title;
        } else {
          const webview = this.$refs.webview;
          if (webview) {
            webview.evaluate("document.title", (result) => {
              if (result) {
                this.pageTitle = result;
              }
            });
          }
        }
      }
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      type: "back",
      size: "24",
      color: "#000000"
    }),
    b: common_vendor.o((...args) => $options.navigateBack && $options.navigateBack(...args)),
    c: common_vendor.t($data.pageTitle),
    d: $data.statusBarHeight + "px",
    e: $data.url,
    f: common_vendor.o((...args) => $options.handlePostMessage && $options.handlePostMessage(...args)),
    g: $data.statusBarHeight + 44 + "px"
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/news/detail.js.map
