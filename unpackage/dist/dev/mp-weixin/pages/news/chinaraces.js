"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      regions: [],
      // 主办方
      statuses: [],
      // 赛事状态
      months: this.generateMonths(),
      distances: ["全部", "25.75km", "51.5km", "100km", "113km", "226km", "其他距离"],
      // 距离
      selectedRegion: "",
      // 保存选中的主办方
      selectedStatus: "",
      // 保存选中的赛事状态
      selectedMonth: "",
      // 保存选中的月份
      selectedDistance: "",
      // 保存选中的距离
      races: [],
      // 存储赛事数据，
      isWeChat: false,
      // 标记是否为微信环境
      // 微信分享的配置
      appId: "",
      // 从后端获取的 appId
      timestamp: "",
      // 从后端获取的 timestamp
      nonceStr: "",
      // 从后端获取的 nonceStr
      signature: "",
      // 从后端获取的 signature
      shareTitle: "打铁123",
      shareDesc: "打铁从这里开始",
      shareLink: "https://www.datie123.com",
      // shareImage: "https://www.datie123.com/share-image.jpg"
      loading: false,
      // 加载状态
      isWeChatEnvironment: false,
      // 初始状态，默认不是微信环境
      showPickerRegion: false,
      showPickerStatus: false,
      showPickerMonth: false,
      showPickerDistance: false
    };
  },
  onPullDownRefresh() {
    common_vendor.index.__f__("log", "at pages/news/chinaraces.nvue:189", "页面级下拉刷新被触发");
    this.handlePullDownRefresh();
  },
  methods: {
    togglePicker(type) {
      if (type === "Region") {
        this.showPickerRegion = !this.showPickerRegion;
      }
    },
    // 切换下拉菜单显示/隐藏
    toggleDropdown(type) {
      switch (type) {
        case "Region":
          this.showPickerRegion = !this.showPickerRegion;
          this.showPickerStatus = false;
          this.showPickerMonth = false;
          this.showPickerDistance = false;
          break;
        case "Status":
          this.showPickerStatus = !this.showPickerStatus;
          this.showPickerRegion = false;
          this.showPickerMonth = false;
          this.showPickerDistance = false;
          break;
        case "Month":
          this.showPickerMonth = !this.showPickerMonth;
          this.showPickerRegion = false;
          this.showPickerStatus = false;
          this.showPickerDistance = false;
          break;
        case "Distance":
          this.showPickerDistance = !this.showPickerDistance;
          this.showPickerRegion = false;
          this.showPickerStatus = false;
          this.showPickerMonth = false;
          break;
      }
    },
    hideDropdown(type) {
      if (type === "Region") {
        this.showPickerRegion = false;
      } else if (type === "Status") {
        this.showPickerStatus = false;
      } else if (type === "Month") {
        this.showPickerMonth = false;
      } else if (type === "Distance") {
        this.showPickerDistance = false;
      }
    },
    keepDropdown(type) {
      if (type === "Region") {
        this.showPickerRegion = true;
      } else if (type === "Status") {
        this.showPickerStatus = true;
      } else if (type === "Month") {
        this.showPickerMonth = true;
      } else if (type === "Distance") {
        this.showPickerDistance = true;
      }
    },
    selectOptionRegion(option) {
      if (option === "全部") {
        this.selectedRegion = "";
      } else {
        this.selectedRegion = option;
      }
      this.showPickerRegion = false;
      this.fetchRaceData();
    },
    selectOptionStatus(option) {
      if (option === "全部") {
        this.selectedStatus = "";
      } else {
        this.selectedStatus = option;
      }
      this.showPickerStatus = false;
      this.fetchRaceData();
    },
    selectOptionMonth(option) {
      if (option === "全部") {
        this.selectedMonth = "";
      } else {
        this.selectedMonth = option;
      }
      this.showPickerMonth = false;
      this.fetchRaceData();
    },
    selectOptionDistance(option) {
      if (option === "全部") {
        this.selectedDistance = "";
      } else {
        this.selectedDistance = option;
      }
      this.showPickerDistance = false;
      this.fetchRaceData();
    },
    handlePullDownRefresh() {
      try {
        this.fetchRaceData();
        common_vendor.index.stopPullDownRefresh();
        common_vendor.index.showToast({
          title: "刷新成功",
          icon: "success"
        });
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/news/chinaraces.nvue:300", "刷新时发生错误:", error);
        common_vendor.index.stopPullDownRefresh();
        common_vendor.index.showToast({
          title: "刷新失败",
          icon: "none"
        });
      } finally {
        common_vendor.index.stopPullDownRefresh();
      }
    },
    generateMonths() {
      const months = ["全部"];
      const now = /* @__PURE__ */ new Date();
      for (let i = 0; i < 12; i++) {
        const date = new Date(now.getFullYear(), now.getMonth() + i, 1);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        months.push(`${year}-${month}`);
      }
      return months;
    },
    openBeianLink() {
    },
    goHome() {
      this.$router.push({ path: "/" });
    },
    openBeianLink() {
    },
    // onRegionChange(e) {
    //   this.selectedRegion = this.regions[e.detail.value];
    //   this.selectedRegion = e.detail.value === 0 ? '' : this.regions[e.detail.value - 1];
    //   // uni.__f__('error','at pages/news/chinaraces.nvue:351',this.selectedRegion)
    //   this.fetchRaceData();
    // },
    // onStatusChange(e) {
    //   this.selectedStatus = this.statuses[e.detail.value];
    //   this.selectedStatus = e.detail.value === 0 ? '' : this.statuses[e.detail.value - 1];
    //   this.fetchRaceData();
    // },
    // onMonthChange(e) {
    //   this.selectedMonth = this.months[e.detail.value];
    //   this.selectedMonth = e.detail.value === 0 ? '' : this.months[e.detail.value - 1];
    //   this.fetchRaceData();
    // },
    // onDistanceChange(e) {
    //   this.selectedDistance = this.distances[e.detail.value];
    //   this.selectedDistance = e.detail.value === 0 ? '' : this.distances[e.detail.value - 1];
    //   this.fetchRaceData();
    // },
    fetchRaceData() {
      common_vendor.index.request({
        url: "https://www.datie123.com/entry/getRaces",
        // API URL
        method: "GET",
        data: {
          area: this.selectedRegion,
          race_status: this.selectedStatus,
          month: this.selectedMonth,
          rank4: this.selectedDistance
        },
        success: (res) => {
          if (res.statusCode === 200 && res.data) {
            const { areas, race_statuses, monthes, ranks4, races } = res.data;
            this.races = races;
          } else {
            common_vendor.index.__f__("error", "at pages/news/chinaraces.nvue:386", "API request failed:", res);
          }
        },
        fail: (err) => {
          common_vendor.index.__f__("error", "at pages/news/chinaraces.nvue:390", "Failed to fetch race data:", err);
        }
      });
    },
    fetchRaceDatanit() {
      common_vendor.index.request({
        url: "https://www.datie123.com/entry/getRaces",
        // API URL
        method: "GET",
        data: {
          area: this.selectedRegion,
          // race_status: '报名中',
          month: this.selectedMonth,
          rank4: this.selectedDistance
        },
        success: (res) => {
          if (res.statusCode === 200 && res.data) {
            const { areas, race_statuses, monthes, ranks4, races } = res.data;
            this.races = races;
            this.regions = ["全部", ...areas];
            this.statuses = ["全部", ...race_statuses];
          } else {
            common_vendor.index.__f__("error", "at pages/news/chinaraces.nvue:415", "API request failed:", res);
          }
        },
        fail: (err) => {
          common_vendor.index.__f__("error", "at pages/news/chinaraces.nvue:419", "Failed to fetch race data:", err);
        }
      });
    },
    loadWeChatSDK() {
      if (this.isWeChatEnvironment) {
        const script = document.createElement("script");
        script.src = "https://res.wx.qq.com/open/js/jweixin-1.6.0.js";
        script.onload = () => {
          if (typeof common_vendor.wx$1 !== "undefined")
            ;
          else {
            common_vendor.index.__f__("error", "at pages/news/chinaraces.nvue:432", "微信JS-SDK加载失败");
          }
        };
        document.head.appendChild(script);
        const url1 = encodeURIComponent(window.location.href.split("#")[0]);
        common_vendor.index.request({
          url: "https://www.datie123.com/entry/getShareConfig?url=" + url1,
          // 替换为你的后端API地址
          method: "GET",
          success: (res) => {
            if (res.statusCode === 200 && res.data) {
              this.configData = res.data;
              this.initWeChatSDK();
            } else {
              common_vendor.index.__f__("error", "at pages/news/chinaraces.nvue:450", "获取微信JS-SDK配置失败:", res);
            }
          },
          fail: (error) => {
            common_vendor.index.__f__("error", "at pages/news/chinaraces.nvue:454", "请求微信JS-SDK配置失败:", error);
          }
        });
      } else
        common_vendor.index.__f__("error", "at pages/news/chinaraces.nvue:458", "当前非微信环境");
    },
    initWeChatSDK() {
      common_vendor.wx$1.config({
        debug: false,
        // 开启调试模式
        appId: this.configData.appId,
        // 必填，公众号的唯一标识
        timestamp: this.configData.timestamp,
        // 必填，生成签名的时间戳
        nonceStr: this.configData.nonceStr,
        // 必填，生成签名的随机串
        signature: this.configData.signature,
        // 必填，签名
        jsApiList: ["updateAppMessageShareData", "updateTimelineShareData"]
        // 必填，需要使用的JS接口列表
      });
      common_vendor.wx$1.ready(() => {
        this.initWeChatShare();
      });
      common_vendor.wx$1.error((res) => {
        common_vendor.index.__f__("error", "at pages/news/chinaraces.nvue:477", "微信 JS SDK 配置失败:", res);
      });
    },
    initWeChatShare() {
      const shareData = {
        title: "2025国内铁三赛事",
        // 分享标题
        desc: "提供最新国内铁人三项赛事信息",
        // 分享描述
        link: "https://www.datie123.com/#/pages/news/chinaraces",
        // 分享链接
        imgUrl: "https://www.datie123.com/images/share.jpg"
        // 分享图标		
      };
      common_vendor.wx$1.updateAppMessageShareData({
        ...shareData,
        success: () => {
          common_vendor.index.__f__("log", "at pages/news/chinaraces.nvue:490", "设置给朋友分享的数据成功");
        },
        fail: (err) => {
          common_vendor.index.__f__("error", "at pages/news/chinaraces.nvue:493", "设置给朋友分享的数据失败:", err);
        }
      });
      common_vendor.wx$1.updateTimelineShareData({
        ...shareData,
        success: () => {
          common_vendor.index.__f__("log", "at pages/news/chinaraces.nvue:501", "设置朋友圈分享的数据成功");
        },
        fail: (err) => {
          common_vendor.index.__f__("error", "at pages/news/chinaraces.nvue:504", "设置朋友圈分享的数据失败:", err);
        }
      });
    },
    handleShare() {
      const ua = navigator.userAgent.toLowerCase();
      this.addSingleStaticsDetailShare();
      this.isWeChat = /micromessenger/.test(ua);
      if (this.isWeChat) {
        window.location.href = "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzU4NDgxNTY1MA==&scene=110#wechat_redirect";
      }
    },
    openUrlWithPlus(url) {
      setTimeout(() => {
        if (typeof plus !== "undefined" && plus.runtime) {
          plus.runtime.openURL(url);
        } else {
          common_vendor.index.__f__("warn", "at pages/news/chinaraces.nvue:542", "plus 还未定义，回退到 window.location.href");
          window.location.href = url;
        }
      }, 0);
    },
    openRaceLink(race) {
      this.addSingleStaticsDetail(race);
    },
    checkWeChatEnvironment() {
      const userAgent = navigator.userAgent.toLowerCase();
      this.isWeChatEnvironment = /micromessenger/.test(userAgent);
    },
    async addSingleStaticsDetail(item) {
      const currentTime = (/* @__PURE__ */ new Date()).toLocaleString();
      let detailInfo = {
        entry_id: item.entry_id,
        element_id: "赛事详情",
        click_time: currentTime
      };
      try {
        const result = await common_vendor.index.request({
          url: "https://datie123.com/entry/addSingleStaticsDetail",
          method: "POST",
          data: {
            statics_detail: detailInfo
          }
        });
        common_vendor.index.__f__("log", "at pages/news/chinaraces.nvue:572", "请求结果", result);
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/news/chinaraces.nvue:574", "请求失败", error);
      }
      const url = item.link_main;
      switch ("mp-weixin") {
        case "app-plus":
          common_vendor.index.__f__("log", "at pages/news/chinaraces.nvue:580", "当前环境是 App");
          plus.runtime.openURL(url);
          break;
        case "h5":
          common_vendor.index.__f__("log", "at pages/news/chinaraces.nvue:584", "当前环境是 H5");
          window.location.href = url;
          break;
        case "mp-weixin":
          common_vendor.index.__f__("log", "at pages/news/chinaraces.nvue:588", "当前环境是微信小程序");
          common_vendor.index.navigateTo({
            url
          });
          break;
        default:
          common_vendor.index.__f__("log", "at pages/news/chinaraces.nvue:594", "未知环境");
          common_vendor.index.navigateTo({
            url: "/pages/news/chinaraces"
          });
          break;
      }
    },
    addSingleStaticsDetailShare() {
      const currentTime = (/* @__PURE__ */ new Date()).toLocaleString();
      let detailInfo = {
        // entry_id: item.entry_id,
        element_id: "跳转ironcat",
        click_time: currentTime
      };
      common_vendor.index.request({
        url: "https://datie123.com/entry/addSingleStaticsDetail",
        method: "POST",
        data: {
          statics_detail: detailInfo
        }
      }).then((result) => {
        common_vendor.index.__f__("log", "at pages/news/chinaraces.nvue:616", "EEEE", result);
      });
    },
    addSingleStaticsDetailInit() {
      const currentTime = /* @__PURE__ */ new Date();
      let detailInfo = {
        page_id: "2025国内铁人三项赛事",
        click_time: currentTime.toLocaleString()
      };
      common_vendor.index.request({
        url: "https://datie123.com/entry/addSingleStaticsDetail",
        method: "POST",
        data: {
          statics_detail: detailInfo
        }
      }).then((result) => {
        common_vendor.index.__f__("log", "at pages/news/chinaraces.nvue:632", "EEEE", result);
      });
    }
  },
  onReady() {
    this.fetchRaceDatanit();
    this.checkWeChatEnvironment();
    this.loadWeChatSDK();
    this.addSingleStaticsDetailInit();
  }
};
if (!Array) {
  const _easycom_uni_nav_bar2 = common_vendor.resolveComponent("uni-nav-bar");
  _easycom_uni_nav_bar2();
}
const _easycom_uni_nav_bar = () => "../../uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.js";
if (!Math) {
  _easycom_uni_nav_bar();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_assets._imports_0$1,
    b: common_assets._imports_1$1,
    c: common_vendor.o((...args) => $options.handleShare && $options.handleShare(...args)),
    d: common_vendor.p({
      shadow: true,
      border: false,
      fixed: true
    }),
    e: common_vendor.t($data.selectedRegion || "主办方"),
    f: common_vendor.o(($event) => $options.toggleDropdown("Region")),
    g: $data.showPickerRegion
  }, $data.showPickerRegion ? {
    h: common_vendor.f($data.regions, (option, index, i0) => {
      return {
        a: common_vendor.t(option),
        b: index,
        c: common_vendor.o(($event) => $options.selectOptionRegion(option), index),
        d: option === $data.selectedRegion ? "blue" : ""
      };
    }),
    i: common_vendor.o(($event) => $options.keepDropdown("Region")),
    j: common_vendor.o(($event) => $options.hideDropdown("Region"))
  } : {}, {
    k: common_vendor.t($data.selectedStatus || "赛事状态"),
    l: common_vendor.o(($event) => $options.toggleDropdown("Status")),
    m: $data.showPickerStatus
  }, $data.showPickerStatus ? {
    n: common_vendor.f($data.statuses, (option, index, i0) => {
      return {
        a: common_vendor.t(option),
        b: index,
        c: common_vendor.o(($event) => $options.selectOptionStatus(option), index),
        d: option === $data.selectedStatus ? "blue" : ""
      };
    }),
    o: common_vendor.o(($event) => $options.keepDropdown("Status")),
    p: common_vendor.o(($event) => $options.hideDropdown("Status"))
  } : {}, {
    q: common_vendor.t($data.selectedMonth || "赛事月份"),
    r: common_vendor.o(($event) => $options.toggleDropdown("Month")),
    s: $data.showPickerMonth
  }, $data.showPickerMonth ? {
    t: common_vendor.f($data.months, (option, index, i0) => {
      return {
        a: common_vendor.t(option),
        b: index,
        c: common_vendor.o(($event) => $options.selectOptionMonth(option), index),
        d: option === $data.selectedMonth ? "blue" : ""
      };
    }),
    v: common_vendor.o(($event) => $options.keepDropdown("Month")),
    w: common_vendor.o(($event) => $options.hideDropdown("Month"))
  } : {}, {
    x: common_vendor.t($data.selectedDistance || "赛事距离"),
    y: common_vendor.o(($event) => $options.toggleDropdown("Distance")),
    z: $data.showPickerDistance
  }, $data.showPickerDistance ? {
    A: common_vendor.f($data.distances, (option, index, i0) => {
      return {
        a: common_vendor.t(option),
        b: index,
        c: common_vendor.o(($event) => $options.selectOptionDistance(option), index),
        d: option === $data.selectedDistance ? "blue" : ""
      };
    }),
    B: common_vendor.o(($event) => $options.keepDropdown("Distance")),
    C: common_vendor.o(($event) => $options.hideDropdown("Distance"))
  } : {}, {
    D: common_vendor.f($data.races, (race, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(race.title),
        b: common_vendor.t(race.area),
        c: common_vendor.t(race.race_distance),
        d: race.icon
      }, race.icon ? {
        e: race.icon
      } : {}, {
        f: common_vendor.t(race.race_date ? race.race_date : "敬请期待"),
        g: common_vendor.t(race.race_status),
        h: race.race_level !== null && race.race_level !== ""
      }, race.race_level !== null && race.race_level !== "" ? {
        i: common_vendor.t(race.race_level)
      } : {}, {
        j: race.link_main !== null && race.link_main !== ""
      }, race.link_main !== null && race.link_main !== "" ? {
        k: common_vendor.o(($event) => $options.openRaceLink(race), index)
      } : {}, {
        l: index,
        m: `url(${race.bk_image})`
      });
    }),
    E: common_assets._imports_2$1,
    F: common_assets._imports_3$1,
    G: common_vendor.o((...args) => $options.handlePullDownRefresh && $options.handlePullDownRefresh(...args)),
    H: common_vendor.o((...args) => $options.openBeianLink && $options.openBeianLink(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/news/chinaraces.js.map
