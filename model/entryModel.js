export default class EntryModel {
  constructor(entry_id, sport_type, rank1, rank2, rank3, rank4, title, title_eng, brand, icon, link_main, description, add_date, add_author, link_taobao, link_jd, link_wechat, created_at, updated_at, deleted_at, link_redbook, wechat_public) {
    this.entry_id = entry_id;
    this.sport_type = sport_type;
    this.rank1 = rank1;
    this.rank2 = rank2;
    this.rank3 = rank3;
    this.rank4 = rank4;
    this.title = title;
	this.title_eng = title_eng;
	this.brand = brand;
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
	  json.title_eng,
	  json.brand,
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
