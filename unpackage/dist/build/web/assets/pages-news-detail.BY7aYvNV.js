import{H as e,D as t,c as a,w as n,b as r,o as s,f as i,j as l,t as c,l as o,i as d,I as u}from"./index-DHOxdnIc.js";import{_ as h}from"./_plugin-vue_export-helper.BCo6x5W8.js";var f=/^<([-A-Za-z0-9_]+)((?:\s+[a-zA-Z_:][-a-zA-Z0-9_:.]*(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/,p=/^<\/([-A-Za-z0-9_]+)[^>]*>/,m=/([a-zA-Z_:][-a-zA-Z0-9_:.]*)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g,b=A("area,base,basefont,br,col,frame,hr,img,input,link,meta,param,embed,command,keygen,source,track,wbr"),g=A("a,address,article,applet,aside,audio,blockquote,button,canvas,center,dd,del,dir,div,dl,dt,fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,iframe,isindex,li,map,menu,noframes,noscript,object,ol,output,p,pre,section,script,table,tbody,td,tfoot,th,thead,tr,ul,video"),v=A("abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,code,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var"),x=A("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr"),_=A("checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected"),y=A("script,style");function A(e){for(var t={},a=e.split(","),n=0;n<a.length;n++)t[a[n]]=!0;return t}function O(e){e=function(e){return e.replace(/<\?xml.*\?>\n/,"").replace(/<!doctype.*>\n/,"").replace(/<!DOCTYPE.*>\n/,"")}(e);var t=[],a={node:"root",children:[]};return function(e,t){var a,n,r,s=[],i=e;for(s.last=function(){return this[this.length-1]};e;){if(n=!0,s.last()&&y[s.last()])e=e.replace(new RegExp("([\\s\\S]*?)</"+s.last()+"[^>]*>"),(function(e,a){return a=a.replace(/<!--([\s\S]*?)-->|<!\[CDATA\[([\s\S]*?)]]>/g,"$1$2"),t.chars&&t.chars(a),""})),o("",s.last());else if(0==e.indexOf("\x3c!--")?(a=e.indexOf("--\x3e"))>=0&&(t.comment&&t.comment(e.substring(4,a)),e=e.substring(a+3),n=!1):0==e.indexOf("</")?(r=e.match(p))&&(e=e.substring(r[0].length),r[0].replace(p,o),n=!1):0==e.indexOf("<")&&(r=e.match(f))&&(e=e.substring(r[0].length),r[0].replace(f,c),n=!1),n){var l=(a=e.indexOf("<"))<0?e:e.substring(0,a);e=a<0?"":e.substring(a),t.chars&&t.chars(l)}if(e==i)throw"Parse Error: "+e;i=e}function c(e,a,n,r){if(a=a.toLowerCase(),g[a])for(;s.last()&&v[s.last()];)o("",s.last());if(x[a]&&s.last()==a&&o("",a),(r=b[a]||!!r)||s.push(a),t.start){var i=[];n.replace(m,(function(e,t){var a=arguments[2]?arguments[2]:arguments[3]?arguments[3]:arguments[4]?arguments[4]:_[t]?t:"";i.push({name:t,value:a,escaped:a.replace(/(^|[^\\])"/g,'$1\\"')})})),t.start&&t.start(a,i,r)}}function o(e,a){if(a)for(n=s.length-1;n>=0&&s[n]!=a;n--);else var n=0;if(n>=0){for(var r=s.length-1;r>=n;r--)t.end&&t.end(s[r]);s.length=n}}o()}(e,{start:function(e,n,r){var s={name:e};if(0!==n.length&&(s.attrs=function(e){return e.reduce((function(e,t){var a=t.value,n=t.name;return e[n]?e[n]=e[n]+" "+a:e[n]=a,e}),{})}(n)),r){var i=t[0]||a;i.children||(i.children=[]),i.children.push(s)}else t.unshift(s)},end:function(e){var n=t.shift();if(n.name!==e&&console.error("invalid state: mismatch end tag"),0===t.length)a.children.push(n);else{var r=t[0];r.children||(r.children=[]),r.children.push(n)}},chars:function(e){var n={type:"text",text:e};if(0===t.length)a.children.push(n);else{var r=t[0];r.children||(r.children=[]),r.children.push(n)}},comment:function(e){var a={node:"comment",text:e},n=t[0];n.children||(n.children=[]),n.children.push(a)}}),a.children}const k=h({data:()=>({banner:{},content:[]}),onShareAppMessage(){return{title:this.banner.title,path:"/pages/detail/detail?query="+JSON.stringify(this.banner)}},onLoad(e){this.load(e.query)},methods:{load(t){var a=decodeURIComponent(t);try{this.banner=JSON.parse(a)}catch(n){this.banner=JSON.parse(a)}e({title:this.banner.title}),this.getDetail()},getDetail(){t({url:"https://unidemo.dcloud.net.cn/api/news/36kr/"+this.banner.post_id,success:e=>{let t="<p>获取信息失败1</p>";200==e.statusCode&&(t=e.data.content);const a=O(t);this.content=a}})}}},[["render",function(e,t,h,f,p,m){const b=o,g=d,v=r,x=u;return s(),a(v,{class:"content"},{default:n((()=>[i(v,{class:"banner","auto-focus":""},{default:n((()=>[i(b,{class:"banner-img",src:p.banner.image_url},null,8,["src"]),i(v,{class:"title-area"},{default:n((()=>[i(g,{class:"title-text"},{default:n((()=>[l(c(p.banner.title),1)])),_:1})])),_:1})])),_:1}),i(v,{class:"article-meta"},{default:n((()=>[i(g,{class:"article-meta-text article-author"},{default:n((()=>[l(c(p.banner.source),1)])),_:1}),i(g,{class:"article-meta-text article-text"},{default:n((()=>[l("发表于")])),_:1}),i(g,{class:"article-meta-text article-time"},{default:n((()=>[l(c(p.banner.datetime),1)])),_:1})])),_:1}),i(v,{class:"article-content"},{default:n((()=>[i(x,{nodes:p.content,style:{"font-size":"14px"}},null,8,["nodes"])])),_:1}),i(v,{class:"comment-wrap"})])),_:1})}],["__scopeId","data-v-01751146"]]);export{k as default};
