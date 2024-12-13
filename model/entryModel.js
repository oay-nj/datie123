export default class EntryModel {
  constructor(entry_id, sport_type, rank1, rank2, rank3, rank4, title, icon, link_main, description, add_date, add_author, link_taobao, link_jd, link_wechat, created_at, updated_at, deleted_at, link_redbook, wechat_public) {
    this.entry_id = entry_id;
    this.sport_type = sport_type;
    this.rank1 = rank1;
    this.rank2 = rank2;
    this.rank3 = rank3;
    this.rank4 = rank4;
    this.title = title;
    this.icon = icon;
    this.link_main = link_main;
    this.description = description;
    this.add_date = add_date;
    this.add_author = add_author;
    this.link_taobao = link_taobao;
    this.link_jd = link_jd;
    this.link_wechat = link_wechat;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.deleted_at = deleted_at;
    this.link_redbook = link_redbook;
    this.wechat_public = wechat_public;
  }

  // 静态方法，从JSON对象创建Entry实例
  static fromJSON(json) {
    return new EntryModel(
      json.entry_id,
      json.sport_type,
      json.rank1,
      json.rank2,
      json.rank3,
      json.rank4,
      json.title,
      json.icon,
      json.link_main,
      json.description,
      json.add_date,
      json.add_author,
      json.link_taobao,
      json.link_jd,
      json.link_wechat,
      json.created_at,
      json.updated_at,
      json.deleted_at,
      json.link_redbook,
      json.wechat_public
    );
  }
}

// 假设这是从接口获取的JSON数据
let jsonData = {
  "entry_id": "CT2412062120534074",
  "sport_type": "铁人三项",
  "rank1": "装备",
  "rank2": "运动配件",
  "rank3": "铁三服",
  "rank4": null,
  "title": "2XU",
  "icon": null,
  "link_main": null,
  "description": null,
  "add_date": "2024-12-06 21:20:53",
  "add_author": null,
  "link_taobao": null,
  "link_jd": null,
  "link_wechat": null,
  "created_at": "2024-12-06 21:20:53",
  "updated_at": "2024-12-06 21:20:53",
  "deleted_at": null,
  "link_redbook": null,
  "wechat_public": null
};

// 使用静态方法从JSON数据创建Entry对象
let entry = EntryModel.fromJSON(jsonData);

// 访问对象的属性
console.log(entry.title); // 输出: 2XU