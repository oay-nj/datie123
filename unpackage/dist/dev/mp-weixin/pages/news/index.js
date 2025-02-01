"use strict";
const common_vendor = require("../../common/vendor.js");
const model_entryModel = require("../../model/entryModel.js");
const common_assets = require("../../common/assets.js");
const horizontalScroller = () => "../../components/horizontal-scroller.js";
const _sfc_main = {
  components: {
    horizontalScroller
  },
  computed: {
    filterGameList() {
      let rank2Cur = this.gameRank2[this.gameRank2Index];
      let rank3Cur = this.gameRank3selected;
      let rank4Cur = this.gameRank4selected;
      const filteredData = this.gameList.filter((item) => {
        if (rank4Cur.length > 0) {
          return item.rank2 === rank2Cur && item.rank3 === rank3Cur && item.rank4 === rank4Cur;
        }
        return item.rank2 === rank2Cur && item.rank3 === rank3Cur;
      });
      return filteredData;
    },
    filterGearList() {
      let rank2Cur = this.gearRank2[this.gearRank2Index];
      let rank3Cur = this.gearRank3selected;
      let rank4Cur = this.gearRank4selected;
      const filteredData = this.gearList.filter((item) => {
        if (rank4Cur.length > 0) {
          return item.rank2 === rank2Cur && item.rank3 === rank3Cur && item.rank4 === rank4Cur;
        }
        return item.rank2 === rank2Cur && item.rank3 === rank3Cur;
      });
      return filteredData;
    },
    filterTeamList() {
      let rank3Cur = this.teamRank3selected;
      let rank4Cur = this.teamRank4selected;
      const filteredData = this.teamList.filter((item) => {
        var r3 = true;
        if (rank3Cur.length > 0) {
          r3 = item.rank3 === rank3Cur;
        }
        var r4 = true;
        if (rank4Cur.length > 0) {
          r4 = item.rank4 === rank4Cur;
        }
        return r3 && r4;
      });
      return filteredData;
    },
    filterBrandList() {
      let rank2Cur = this.brandRank2[this.brandRank2Index];
      let rank3Cur = this.brandRank3selected;
      let rank4Cur = this.brandRank4selected;
      const filteredData = this.brandList.filter((item) => {
        if (rank4Cur.length > 0) {
          return item.rank2 === rank2Cur && item.rank3 === rank3Cur && item.rank4 === rank4Cur;
        }
        if (rank3Cur.length > 0) {
          return item.rank2 === rank2Cur && item.rank3 === rank3Cur;
        }
        return item.rank2 === rank2Cur;
      });
      return filteredData;
    }
  },
  data() {
    return {
      array: [{
        type: "铁人三项"
      }],
      typeIndex: 0,
      hotInfoList: [],
      gameHierarchy: {},
      gameRank2: [],
      gameRank2Index: 0,
      gameRank3: [],
      gameRank3selected: "",
      gameRank4: [],
      gameRank4selected: "",
      gameList: [],
      gearHierarchy: {},
      gearRank2: [],
      gearRank2Index: 0,
      gearRank3: [],
      gearRank3selected: "",
      gearRank4: [],
      gearRank4selected: "",
      gearList: [],
      teamHierarchy: {},
      teamRank2: [],
      teamRank2Index: 0,
      teamRank3: [],
      teamRank3selected: "",
      teamRank4: [],
      teamRank4selected: "",
      teamList: [],
      brandHierarchy: {},
      brandRank2: [],
      brandRank2Index: 0,
      brandRank3: [],
      brandRank3selected: "",
      brandRank4: [],
      brandRank4selected: "",
      brandList: [],
      isWeChatEnvironment: false
      // 初始状态，默认不是微信环境
    };
  },
  onReady() {
    this.queryDicList();
    this.queryGearDicList();
    this.queryTeamDicList();
    this.queryBrandDicList();
    this.queryHotInfoList();
    this.checkWeChatEnvironment();
    this.loadWeChatSDK();
  },
  methods: {
    loadWeChatSDK() {
      if (this.isWeChatEnvironment) {
        const script = document.createElement("script");
        script.src = "https://res.wx.qq.com/open/js/jweixin-1.6.0.js";
        script.onload = () => {
          if (typeof common_vendor.wx$1 !== "undefined")
            ;
          else {
            common_vendor.index.__f__("error", "at pages/news/index.nvue:373", "微信JS-SDK加载失败");
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
              common_vendor.index.__f__("error", "at pages/news/index.nvue:391", "获取微信JS-SDK配置失败:", res);
            }
          },
          fail: (error) => {
            common_vendor.index.__f__("error", "at pages/news/index.nvue:395", "请求微信JS-SDK配置失败:", error);
          }
        });
      } else
        common_vendor.index.__f__("error", "at pages/news/index.nvue:399", "当前非微信环境");
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
        common_vendor.index.__f__("error", "at pages/news/index.nvue:418", "微信 JS SDK 配置失败:", res);
      });
    },
    initWeChatShare() {
      const shareData = {
        title: "打铁123-打铁从这里开始！",
        // 分享标题
        desc: "提供铁人三项相关的赛事、装备、团体、训练、营养等内容",
        // 分享描述
        link: "https://www.datie123.com",
        // 分享链接
        imgUrl: "https://www.datie123.com/images/share.jpg"
        // 分享图标		
      };
      common_vendor.wx$1.updateAppMessageShareData({
        ...shareData,
        success: () => {
          common_vendor.index.__f__("log", "at pages/news/index.nvue:431", "设置给朋友分享的数据成功");
        },
        fail: (err) => {
          common_vendor.index.__f__("error", "at pages/news/index.nvue:434", "设置给朋友分享的数据失败:", err);
        }
      });
      common_vendor.wx$1.updateTimelineShareData({
        ...shareData,
        success: () => {
          common_vendor.index.__f__("log", "at pages/news/index.nvue:442", "设置朋友圈分享的数据成功");
        },
        fail: (err) => {
          common_vendor.index.__f__("error", "at pages/news/index.nvue:445", "设置朋友圈分享的数据失败:", err);
        }
      });
    },
    checkWeChatEnvironment() {
      const userAgent = navigator.userAgent.toLowerCase();
      this.isWeChatEnvironment = /micromessenger/.test(userAgent);
    },
    showDrawer() {
      this.$refs.showLeft.open();
    },
    closeDrawer() {
      this.$refs.showLeft.close();
    },
    bindPickerChange: function(e) {
    },
    bindGameRank2PickerChange(index) {
      this.gameRank2Index = index;
      let rank2Cur = this.gameRank2[this.gameRank2Index];
      if (rank2Cur != void 0) {
        let rank22 = this.getRank2Sublist(this.gameHierarchy, "赛事", rank2Cur);
        this.gameRank3 = Object.keys(rank22);
        this.gameRank3selected = this.gameRank3[0] || "";
        let rank33 = this.getRank3Sublist(this.gearHierarchy, "赛事", rank2Cur, this.gameRank3selected);
        this.gameRank4 = rank33;
        this.gameRank4selected = rank33[0] || "";
      }
      this.queryGameData();
    },
    bindGearRank2PickerChange(index) {
      this.gearRank2Index = index;
      let rank2Cur = this.gearRank2[this.gearRank2Index];
      if (rank2Cur != void 0) {
        let rank22 = this.getRank2Sublist(this.gearHierarchy, "装备", rank2Cur);
        this.gearRank3 = Object.keys(rank22);
        this.gearRank3selected = this.gearRank3[0] || "";
        let rank33 = this.getRank3Sublist(this.gearHierarchy, "装备", rank2Cur, this.gearRank3selected);
        this.gearRank4 = rank33;
        this.gearRank4selected = rank33[0] || "";
      }
      this.queryGearData();
    },
    bindTeamRank2PickerChange(index) {
      this.teamRank2Index = index;
      let rank2Cur = this.teamRank2[this.teamRank2Index];
      if (rank2Cur != void 0) {
        let rank22 = this.getRank2Sublist(this.teamHierarchy, "团体", rank2Cur);
        this.teamRank3 = Object.keys(rank22);
        this.teamRank3selected = this.teamRank3[0] || "";
        let rank33 = this.getRank3Sublist(this.gearHierarchy, "团体", rank2Cur, this.teamRank3selected);
        this.teamRank4 = rank33;
        this.teamRank4selected = rank33[0] || "";
      }
      this.queryTeamData();
    },
    bindBrandRank2PickerChange(index) {
      this.brandRank2Index = index;
      let rank2Cur = this.brandRank2[this.brandRank2Index];
      if (rank2Cur != void 0) {
        let rank22 = this.getRank2Sublist(this.brandHierarchy, "品牌", rank2Cur);
        this.brandRank3 = Object.keys(rank22);
        this.brandRank3selected = this.brandRank3[0] || "";
        let rank33 = this.getRank3Sublist(this.gearHierarchy, "品牌", rank2Cur, this.brandRank3selected);
        this.brandRank4 = rank33;
        this.brandRank4selected = rank33[0] || "";
      }
      this.queryBrandData();
    },
    onSelectGameRank4(tab) {
      this.gameRank4selected = tab;
      this.queryGameData();
    },
    onSelectGearRank4(tab) {
      this.gearRank4selected = tab;
      this.queryGearData();
    },
    onSelectTeamRank4(tab) {
      this.teamRank4selected = tab;
      this.queryTeamData();
    },
    onSelectBrandRank4(tab) {
      this.brandRank4selected = tab;
    },
    handleGameRank3Selected(selectedTab) {
      this.gameRank3selected = selectedTab;
      let rank2Cur = this.gameRank2[this.gameRank2Index];
      let rank33 = this.getRank3Sublist(this.gameHierarchy, "赛事", rank2Cur, selectedTab);
      this.gameRank4 = rank33;
      this.gameRank4selected = rank33[0] || "";
      this.queryGameData();
    },
    handleGearRank3Selected(selectedTab) {
      this.gearRank3selected = selectedTab;
      let rank2Cur = this.gearRank2[this.gearRank2Index];
      let rank33 = this.getRank3Sublist(this.gearHierarchy, "装备", rank2Cur, selectedTab);
      this.gearRank4 = rank33;
      this.gearRank4selected = rank33[0] || "";
      this.queryGearData();
    },
    handleTeamRank3Selected(selectedTab) {
      this.teamRank3selected = selectedTab;
      let rank2Cur = this.teamRank2[this.teamRank2Index];
      let rank33 = this.getRank3Sublist(this.teamHierarchy, "团体", rank2Cur, selectedTab);
      this.teamRank4 = rank33;
      this.teamRank4selected = rank33[0] || "";
      this.queryTeamData();
    },
    handleBrandRank3Selected(selectedTab) {
      this.brandRank3selected = selectedTab;
      let rank2Cur = this.brandRank2[this.brandRank2Index];
      let rank33 = this.getRank3Sublist(this.brandHierarchy, "品牌", rank2Cur, selectedTab);
      this.brandRank4 = rank33;
      this.brandRank4selected = rank33[0] || "";
      this.queryBrandData();
    },
    onClickBanner(item) {
      common_vendor.index.__f__("error", "at pages/news/index.nvue:565", "123");
      this.addSingleStaticsDetail(item);
      let url = item.link_main;
      switch ("mp-weixin") {
        case "app-plus":
          common_vendor.index.__f__("log", "at pages/news/index.nvue:571", "当前环境是 App");
          plus.runtime.openURL(url);
          break;
        case "h5":
          common_vendor.index.__f__("log", "at pages/news/index.nvue:575", "当前环境是 H5");
          window.location.href = url;
          break;
        case "mp-weixin":
          common_vendor.index.__f__("log", "at pages/news/index.nvue:580", "当前环境是微信小程序");
          window.location.href = url;
          break;
        default:
          common_vendor.index.__f__("log", "at pages/news/index.nvue:585", "未知环境");
          common_vendor.index.navigateTo({
            url: "/pages/news/chinaraces"
          });
          break;
      }
    },
    onClickDetailItem(item) {
      item.link_main;
      this.addSingleStaticsDetail(item);
    },
    onClickGearDetailItem(item) {
      const mainUrl = item.link_main || "";
      const jdUrl = item.link_jd || "";
      const taobaoUrl = item.link_taobao || "";
      const urls = [mainUrl, jdUrl, taobaoUrl].filter((url) => url.length > 0);
      if (urls.length > 1) {
        const itemList = [];
        if (mainUrl)
          itemList.push("去官网购买");
        if (jdUrl)
          itemList.push("去京东购买");
        if (taobaoUrl)
          itemList.push("去淘宝购买");
        common_vendor.index.showActionSheet({
          itemList,
          success: (res) => {
            if (mainUrl && res.tapIndex === 0)
              ;
            else if (jdUrl && (mainUrl && res.tapIndex === 1 || !mainUrl && res.tapIndex === 0))
              ;
            else
              ;
          }
        });
      }
      this.addSingleStaticsDetail(item);
    },
    onClickTeamDetailItem(item) {
      const mainUrl = item.link_main || "";
      const wxUrl = item.wechat_public || "";
      if (mainUrl.length > 0 && wxUrl.length > 0) {
        const itemList = ["团体介绍", "微信公众号"];
        common_vendor.index.showActionSheet({
          itemList,
          success: (res) => {
            if (res.tapIndex === 0)
              ;
          }
        });
      }
      this.addSingleStaticsDetail(item);
    },
    onClickBrandDetailItem(item) {
      item.link_main;
      this.addSingleStaticsDetail(item);
    },
    queryHotInfoList() {
      let sportType = "铁人三项";
      common_vendor.index.request({
        url: "https://datie123.com/entry/getEntryList",
        method: "GET",
        data: {
          sport_type: sportType,
          rank1: "热门推荐"
        }
      }).then((result) => {
        common_vendor.index.__f__("log", "at pages/news/index.nvue:710", "EE", result);
        if (result.statusCode === 200) {
          let resList = [];
          let json = result.data;
          if (json.code == 0) {
            let res = json.entry_list;
            for (let obj of res) {
              let entry = model_entryModel.EntryModel.fromJSON(obj);
              resList.push(entry);
            }
          }
          this.hotInfoList = resList;
        }
      });
    },
    queryGameData() {
      let sportType = this.array[this.typeIndex].type;
      let rank2Cur = this.gameRank2[this.gameRank2Index];
      let rank3Cur = this.gameRank3selected || "";
      let rank4Cur = this.gameRank4selected || "";
      const fetchPage = (lastEntryId = "") => {
        return common_vendor.index.request({
          url: "https://datie123.com/entry/getEntryList",
          method: "GET",
          data: {
            sport_type: sportType,
            rank1: "赛事",
            rank2: rank2Cur,
            rank3: rank3Cur,
            rank4: rank4Cur,
            order_type: "1",
            entry_id: lastEntryId
            // Add entry_id parameter for pagination
          }
        });
      };
      common_vendor.index.showLoading({
        title: "加载中...",
        mask: true
      });
      fetchPage().then((result) => {
        common_vendor.index.hideLoading();
        if (result.statusCode === 200) {
          let resList = [];
          let json = result.data;
          if (json.code == 0) {
            let res = json.entry_list;
            for (let obj of res) {
              let entry = model_entryModel.EntryModel.fromJSON(obj);
              resList.push(entry);
            }
          }
          this.gameList = resList;
        }
      }).catch(() => {
        common_vendor.index.hideLoading();
      });
    },
    queryGearData() {
      let sportType = this.array[this.typeIndex].type;
      let rank2Cur = this.gearRank2[this.gearRank2Index];
      let rank3Cur = this.gearRank3selected || "";
      let rank4Cur = this.gearRank4selected || "";
      const fetchPage = (lastEntryId = "") => {
        return common_vendor.index.request({
          url: "https://datie123.com/entry/getEntryList",
          method: "GET",
          data: {
            sport_type: sportType,
            rank1: "装备",
            rank2: rank2Cur,
            rank3: rank3Cur,
            rank4: rank4Cur,
            order_type: "1",
            entry_id: lastEntryId
          }
        });
      };
      common_vendor.index.showLoading({
        title: "加载中...",
        mask: true
      });
      fetchPage().then((result) => {
        common_vendor.index.__f__("log", "at pages/news/index.nvue:795", "QQQ", result);
        common_vendor.index.hideLoading();
        if (result.statusCode === 200) {
          let resList = [];
          let json = result.data;
          if (json.code == 0) {
            let res = json.entry_list;
            for (let obj of res) {
              let entry = model_entryModel.EntryModel.fromJSON(obj);
              resList.push(entry);
            }
          }
          this.gearList = resList;
        }
      }).catch(() => {
        common_vendor.index.hideLoading();
      });
    },
    queryTeamData() {
      let sportType = this.array[this.typeIndex].type;
      let rank2Cur = this.teamRank2[this.teamRank2Index];
      let rank3Cur = this.teamRank3selected || "";
      const fetchPage = (lastEntryId = "") => {
        return common_vendor.index.request({
          url: "https://datie123.com/entry/getEntryList",
          method: "GET",
          data: {
            sport_type: sportType,
            rank1: "团体",
            rank2: rank2Cur,
            rank3: rank3Cur,
            order_type: "1",
            entry_id: lastEntryId
          }
        });
      };
      fetchPage().then((result) => {
        if (result.statusCode === 200) {
          let resList = [];
          let json = result.data;
          if (json.code == 0) {
            let res = json.entry_list;
            for (let obj of res) {
              let entry = model_entryModel.EntryModel.fromJSON(obj);
              resList.push(entry);
            }
          }
          this.teamList = resList;
        }
      });
    },
    queryTeamDicList() {
      common_vendor.index.request({
        url: "https://datie123.com/entry/getRankList",
        method: "GET",
        data: {
          rank1: "团体"
        }
      }).then((result) => {
        let json = result.data;
        if (json.code == 0) {
          let res = json.rank_list;
          let treeRes = this.buildHierarchy(res);
          this.teamHierarchy = treeRes;
          let rank2 = this.getRank1Sublist(treeRes, "团体");
          this.teamRank2 = Object.keys(rank2);
          let rank2Cur = this.teamRank2[this.teamRank2Index];
          if (rank2Cur != void 0) {
            let rank22 = this.getRank2Sublist(treeRes, "团体", rank2Cur);
            this.teamRank3 = Object.keys(rank22);
            if (this.teamRank3.length > 0) {
              let rank3Cur = this.teamRank3[0];
              this.teamRank3selected = rank3Cur;
              if (rank3Cur != void 0) {
                let rank33 = this.getRank3Sublist(treeRes, "团体", rank2Cur, rank3Cur);
                this.teamRank4 = rank33;
                this.teamRank4selected = this.teamRank4[0] || "";
              }
            }
          }
          this.queryTeamData();
        }
      });
    },
    queryGearDicList() {
      common_vendor.index.request({
        url: "https://datie123.com/entry/getRankList",
        method: "GET",
        data: {
          rank1: "装备"
        }
      }).then((result) => {
        let json = result.data;
        if (json.code == 0) {
          let res = json.rank_list;
          let treeRes = this.buildHierarchy(res);
          this.gearHierarchy = treeRes;
          let rank2 = this.getRank1Sublist(treeRes, "装备");
          this.gearRank2 = Object.keys(rank2);
          let rank2Cur = this.gearRank2[this.gearRank2Index];
          if (rank2Cur != void 0) {
            let rank22 = this.getRank2Sublist(treeRes, "装备", rank2Cur);
            this.gearRank3 = Object.keys(rank22);
            if (this.gearRank3.length > 0) {
              let rank3Cur = this.gearRank3[0];
              this.gearRank3selected = rank3Cur;
              if (rank3Cur != void 0) {
                let rank33 = this.getRank3Sublist(treeRes, "装备", rank2Cur, rank3Cur);
                this.gearRank4 = rank33;
                this.gearRank4selected = this.gearRank4[0] || "";
              }
            }
          }
          this.queryGearData();
        }
      });
    },
    queryDicList() {
      common_vendor.index.request({
        url: "https://datie123.com/entry/getRankList",
        method: "GET",
        data: {
          rank1: "赛事"
        }
      }).then((result) => {
        let json = result.data;
        if (json.code == 0) {
          let res = json.rank_list;
          let treeRes = this.buildHierarchy(res);
          this.gameHierarchy = treeRes;
          let rank2 = this.getRank1Sublist(treeRes, "赛事");
          this.gameRank2 = Object.keys(rank2);
          let rank2Cur = this.gameRank2[this.gameRank2Index];
          if (rank2Cur != void 0) {
            let rank22 = this.getRank2Sublist(treeRes, "赛事", rank2Cur);
            this.gameRank3 = Object.keys(rank22);
            if (this.gameRank3.length > 0) {
              let rank3Cur = this.gameRank3[0];
              this.gameRank3selected = rank3Cur;
              if (rank3Cur != void 0) {
                let rank33 = this.getRank3Sublist(treeRes, "赛事", rank2Cur, rank3Cur);
                this.gameRank4 = rank33;
                this.gameRank4selected = this.gameRank4[0] || "";
              }
            }
          }
          this.queryGameData();
        }
      });
    },
    buildHierarchy(data) {
      const hierarchy = {};
      data.forEach((item) => {
        if (!hierarchy[item.rank1]) {
          hierarchy[item.rank1] = {};
        }
        if (item.rank2 !== void 0) {
          if (!hierarchy[item.rank1][item.rank2]) {
            hierarchy[item.rank1][item.rank2] = {};
          }
          if (item.rank3 !== void 0) {
            if (!hierarchy[item.rank1][item.rank2][item.rank3]) {
              hierarchy[item.rank1][item.rank2][item.rank3] = [];
            }
            if (item.rank4 !== void 0) {
              hierarchy[item.rank1][item.rank2][item.rank3].push(item.rank4);
            }
          }
        }
      });
      return hierarchy;
    },
    getRank1Sublist(hierarchy, rank1Key) {
      return hierarchy[rank1Key] || {};
    },
    getRank2Sublist(hierarchy, rank1Key, rank2Key) {
      return hierarchy[rank1Key] && hierarchy[rank1Key][rank2Key] || [];
    },
    getRank3Sublist(hierarchy, rank1Key, rank2Key, rank3Key) {
      return hierarchy[rank1Key] && hierarchy[rank1Key][rank2Key] && hierarchy[rank1Key][rank2Key][rank3Key] || [];
    },
    openBeianLink() {
    },
    jumpToAboutUs() {
    },
    scrollToTop() {
      this.scrollToSection("top");
    },
    scrollToSection(sectionId) {
      this.closeDrawer();
    },
    queryBrandData() {
      let sportType = this.array[this.typeIndex].type;
      let rank2Cur = this.brandRank2[this.brandRank2Index];
      let rank3Cur = this.brandRank3selected || "";
      const fetchPage = (lastEntryId = "") => {
        return common_vendor.index.request({
          url: "https://datie123.com/entry/getEntryList",
          method: "GET",
          data: {
            sport_type: sportType,
            rank1: "品牌",
            rank2: rank2Cur,
            rank3: rank3Cur,
            order_type: "1",
            entry_id: lastEntryId
          }
        });
      };
      fetchPage().then((result) => {
        if (result.statusCode === 200) {
          let resList = [];
          let json = result.data;
          if (json.code == 0) {
            let res = json.entry_list;
            for (let obj of res) {
              let entry = model_entryModel.EntryModel.fromJSON(obj);
              resList.push(entry);
            }
          }
          this.brandList = resList;
        }
      });
    },
    queryBrandDicList() {
      common_vendor.index.request({
        url: "https://datie123.com/entry/getRankList",
        method: "GET",
        data: {
          rank1: "品牌"
        }
      }).then((result) => {
        let json = result.data;
        if (json.code == 0) {
          let res = json.rank_list;
          let treeRes = this.buildHierarchy(res);
          this.brandHierarchy = treeRes;
          let rank2 = this.getRank1Sublist(treeRes, "品牌");
          this.brandRank2 = Object.keys(rank2);
          let rank2Cur = this.brandRank2[this.brandRank2Index];
          if (rank2Cur != void 0) {
            let rank22 = this.getRank2Sublist(treeRes, "品牌", rank2Cur);
            this.brandRank3 = Object.keys(rank22);
            if (this.brandRank3.length > 0) {
              let rank3Cur = this.brandRank3[0];
              this.brandRank3selected = rank3Cur;
              if (rank3Cur != void 0) {
                let rank33 = this.getRank3Sublist(treeRes, "品牌", rank2Cur, rank3Cur);
                this.brandRank4 = rank33;
              }
            }
          }
          this.queryBrandData();
        }
      });
    },
    addSingleStaticsDetail(item) {
      const currentTime = (/* @__PURE__ */ new Date()).toLocaleString();
      let detailInfo = {
        entry_id: item.entry_id,
        element_id: item.id,
        click_time: currentTime
      };
      common_vendor.index.request({
        url: "https://datie123.com/entry/addSingleStaticsDetail",
        method: "POST",
        data: {
          statics_detail: detailInfo
        }
      }).then((result) => {
        common_vendor.index.__f__("log", "at pages/news/index.nvue:1133", "EEEE", result);
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_nav_bar2 = common_vendor.resolveComponent("uni-nav-bar");
  const _easycom_uni_drawer2 = common_vendor.resolveComponent("uni-drawer");
  const _easycom_uni_tag2 = common_vendor.resolveComponent("uni-tag");
  const _component_horizontalScroller = common_vendor.resolveComponent("horizontalScroller");
  const _easycom_uni_grid_item2 = common_vendor.resolveComponent("uni-grid-item");
  const _easycom_uni_grid2 = common_vendor.resolveComponent("uni-grid");
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  (_easycom_uni_nav_bar2 + _easycom_uni_drawer2 + _easycom_uni_tag2 + _component_horizontalScroller + _easycom_uni_grid_item2 + _easycom_uni_grid2 + _easycom_uni_card2)();
}
const _easycom_uni_nav_bar = () => "../../uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.js";
const _easycom_uni_drawer = () => "../../uni_modules/uni-drawer/components/uni-drawer/uni-drawer.js";
const _easycom_uni_tag = () => "../../uni_modules/uni-tag/components/uni-tag/uni-tag.js";
const _easycom_uni_grid_item = () => "../../uni_modules/uni-grid/components/uni-grid-item/uni-grid-item.js";
const _easycom_uni_grid = () => "../../uni_modules/uni-grid/components/uni-grid/uni-grid.js";
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
if (!Math) {
  (_easycom_uni_nav_bar + _easycom_uni_drawer + _easycom_uni_tag + _easycom_uni_grid_item + _easycom_uni_grid + _easycom_uni_card)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_assets._imports_0,
    b: common_vendor.o((...args) => $options.showDrawer && $options.showDrawer(...args)),
    c: common_assets._imports_1,
    d: common_vendor.t($data.array[$data.typeIndex].type),
    e: common_vendor.o((...args) => $options.bindPickerChange && $options.bindPickerChange(...args)),
    f: $data.typeIndex,
    g: $data.array,
    h: common_assets._imports_2,
    i: common_vendor.p({
      shadow: true,
      border: false,
      fixed: true
    }),
    j: common_assets._imports_1,
    k: common_assets._imports_3,
    l: common_vendor.o(($event) => $options.scrollToSection("article")),
    m: common_assets._imports_4,
    n: common_vendor.o(($event) => $options.scrollToSection("game")),
    o: common_assets._imports_5,
    p: common_vendor.o(($event) => $options.scrollToSection("gear")),
    q: common_assets._imports_6,
    r: common_vendor.o(($event) => $options.scrollToSection("team")),
    s: common_assets._imports_7,
    t: common_vendor.o(($event) => $options.scrollToSection("brand")),
    v: common_assets._imports_8,
    w: common_vendor.o((...args) => $options.jumpToAboutUs && $options.jumpToAboutUs(...args)),
    x: common_vendor.sr("showLeft", "06a930ca-1"),
    y: common_vendor.p({
      mode: "left",
      ["mask-click"]: true
    }),
    z: $data.hotInfoList.length > 0
  }, $data.hotInfoList.length > 0 ? {
    A: common_vendor.f($data.hotInfoList, (item, index, i0) => {
      return {
        a: item.bk_image,
        b: common_vendor.o(($event) => $options.onClickBanner(item), index),
        c: index
      };
    })
  } : {}, {
    B: common_assets._imports_4,
    C: common_vendor.f($data.gameRank2, (tag, index, i0) => {
      return {
        a: index,
        b: common_vendor.o(($event) => $options.bindGameRank2PickerChange(index), index),
        c: "06a930ca-3-" + i0 + ",06a930ca-2",
        d: common_vendor.p({
          text: tag,
          ["custom-style"]: index === $data.gameRank2Index ? "background-color: #FBE7E9; border: none; font-size:14px; color: #CE2C32" : "background-color: #EFEFEF; border: none; font-size:14px; color: #333333"
        })
      };
    }),
    D: common_vendor.o($options.handleGameRank3Selected),
    E: common_vendor.p({
      tabs: $data.gameRank3
    }),
    F: common_vendor.f($data.gameRank4, (tag, index, i0) => {
      return {
        a: index,
        b: common_vendor.o(($event) => $options.onSelectGameRank4(tag), index),
        c: "06a930ca-5-" + i0 + ",06a930ca-2",
        d: common_vendor.p({
          text: tag,
          ["custom-style"]: tag === $data.gameRank4selected ? "background-color: #FBE7E9; border: none; color: #CE2C32" : "background-color: #EFEFEF; border: none; color: #333333"
        })
      };
    }),
    G: common_vendor.f($options.filterGameList, (item, index, i0) => {
      return {
        a: item.icon,
        b: common_vendor.t(item.title),
        c: common_vendor.t(item.race_date + " " + item.area),
        d: index,
        e: common_vendor.o(($event) => $options.onClickDetailItem(item), index),
        f: "06a930ca-7-" + i0 + ",06a930ca-6"
      };
    }),
    H: common_vendor.p({
      column: 2,
      showBorder: false,
      square: false
    }),
    I: common_vendor.p({
      id: "game",
      title: "赛事"
    }),
    J: common_assets._imports_5,
    K: common_vendor.f($data.gearRank2, (tag, index, i0) => {
      return {
        a: index,
        b: common_vendor.o(($event) => $options.bindGearRank2PickerChange(index), index),
        c: "06a930ca-9-" + i0 + ",06a930ca-8",
        d: common_vendor.p({
          text: tag,
          ["custom-style"]: index === $data.gearRank2Index ? "background-color: #FBE7E9; border: none; font-size:14px; color: #CE2C32" : "background-color: #EFEFEF; border: none; font-size:14px; color: #333333"
        })
      };
    }),
    L: common_vendor.o($options.handleGearRank3Selected),
    M: common_vendor.p({
      tabs: $data.gearRank3
    }),
    N: common_vendor.f($data.gearRank4, (tag, index, i0) => {
      return {
        a: index,
        b: common_vendor.o(($event) => $options.onSelectGearRank4(tag), index),
        c: "06a930ca-11-" + i0 + ",06a930ca-8",
        d: common_vendor.p({
          text: tag,
          ["custom-style"]: tag === $data.gearRank4selected ? "background-color: #FBE7E9; border: none; color: #CE2C32" : "background-color: #EFEFEF; border: none; color: #333333"
        })
      };
    }),
    O: common_vendor.f($options.filterGearList, (item, index, i0) => {
      return common_vendor.e({
        a: item.icon,
        b: common_vendor.t(item.title),
        c: item.new_yn == 1
      }, item.new_yn == 1 ? {
        d: common_assets._imports_9
      } : {}, {
        e: common_vendor.t(item.brand),
        f: index,
        g: common_vendor.o(($event) => $options.onClickGearDetailItem(item), index),
        h: "06a930ca-13-" + i0 + ",06a930ca-12"
      });
    }),
    P: common_vendor.p({
      column: 2,
      showBorder: false,
      square: false
    }),
    Q: common_vendor.p({
      id: "gear",
      title: "装备"
    }),
    R: common_assets._imports_6,
    S: common_vendor.f($data.teamRank2, (tag, index, i0) => {
      return {
        a: index,
        b: common_vendor.o(($event) => $options.bindTeamRank2PickerChange(index), index),
        c: "06a930ca-15-" + i0 + ",06a930ca-14",
        d: common_vendor.p({
          text: tag,
          ["custom-style"]: index === $data.teamRank2Index ? "background-color: #FBE7E9; border: none; font-size:14px; color: #CE2C32" : "background-color: #EFEFEF; border: none; font-size:14px; color: #333333"
        })
      };
    }),
    T: $data.teamRank3.length > 0
  }, $data.teamRank3.length > 0 ? {
    U: common_vendor.o($options.handleTeamRank3Selected),
    V: common_vendor.p({
      tabs: $data.teamRank3
    })
  } : {}, {
    W: common_vendor.f($data.teamRank4, (tag, index, i0) => {
      return {
        a: index,
        b: common_vendor.o(($event) => $options.onSelectTeamRank4(tag), index),
        c: "06a930ca-17-" + i0 + ",06a930ca-14",
        d: common_vendor.p({
          text: tag,
          ["custom-style"]: tag === $data.teamRank4selected ? "background-color: #FBE7E9; border: none; color: #CE2C32" : "background-color: #EFEFEF; border: none; color: #333333"
        })
      };
    }),
    X: common_vendor.f($options.filterTeamList, (item, index, i0) => {
      return {
        a: item.icon,
        b: common_vendor.t(item.title),
        c: index,
        d: common_vendor.o(($event) => $options.onClickTeamDetailItem(item), index),
        e: "06a930ca-19-" + i0 + ",06a930ca-18"
      };
    }),
    Y: common_vendor.p({
      column: 2,
      showBorder: false,
      square: false
    }),
    Z: common_vendor.p({
      id: "team",
      title: "团体"
    }),
    aa: common_assets._imports_7,
    ab: common_vendor.f($data.brandRank2, (tag, index, i0) => {
      return {
        a: index,
        b: common_vendor.o(($event) => $options.bindBrandRank2PickerChange(index), index),
        c: "06a930ca-21-" + i0 + ",06a930ca-20",
        d: common_vendor.p({
          text: tag,
          ["custom-style"]: index === $data.brandRank2Index ? "background-color: #FBE7E9; border: none; font-size:14px; color: #CE2C32" : "background-color: #EFEFEF; border: none; font-size:14px; color: #333333"
        })
      };
    }),
    ac: common_vendor.o($options.handleBrandRank3Selected),
    ad: common_vendor.p({
      tabs: $data.brandRank3
    }),
    ae: common_vendor.f($data.brandRank4, (tag, index, i0) => {
      return {
        a: index,
        b: common_vendor.o(($event) => $options.onSelectBrandRank4(tag), index),
        c: "06a930ca-23-" + i0 + ",06a930ca-20",
        d: common_vendor.p({
          text: tag,
          ["custom-style"]: tag === $data.brandRank4selected ? "background-color: #FBE7E9; border: none; color: #CE2C32" : "background-color: #EFEFEF; border: none; color: #333333"
        })
      };
    }),
    af: common_vendor.f($options.filterBrandList, (item, index, i0) => {
      return {
        a: item.icon,
        b: common_vendor.t(item.title),
        c: index,
        d: common_vendor.o(($event) => $options.onClickBrandDetailItem(item), index),
        e: "06a930ca-25-" + i0 + ",06a930ca-24"
      };
    }),
    ag: common_vendor.p({
      column: 5,
      showBorder: false,
      square: false
    }),
    ah: common_vendor.p({
      id: "brand",
      title: "品牌"
    }),
    ai: common_vendor.o((...args) => $options.openBeianLink && $options.openBeianLink(...args)),
    aj: common_assets._imports_10,
    ak: common_vendor.o((...args) => $options.scrollToTop && $options.scrollToTop(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/news/index.js.map
