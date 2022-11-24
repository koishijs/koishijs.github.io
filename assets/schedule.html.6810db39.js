import{_ as t,r as d,o as n,c as s,d as i,w as c,b as l,a as e,e as h}from"./app.d641dd0e.js";const r={},u=e("h1",{id:"\u8BA1\u5212\u4EFB\u52A1",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#\u8BA1\u5212\u4EFB\u52A1","aria-hidden":"true"},"#"),l(" \u8BA1\u5212\u4EFB\u52A1 (Schedule)")],-1),_=e("div",{class:"custom-container tip"},[e("p",{class:"custom-container-title"},"TIP"),e("p",null,"\u8981\u4F7F\u7528\u672C\u63D2\u4EF6\uFF0C\u4F60\u9700\u8981\u5B89\u88C5\u6570\u636E\u5E93\u652F\u6301\u3002")],-1),m=e("p",null,"@koishijs/plugin-schedule \u7528\u4E8E\u8BBE\u7F6E\u548C\u89E6\u53D1\u8BA1\u5212\u4EFB\u52A1\u3002",-1),p=e("p",null,"\u2014\u2014\u2014 1 \u5206\u949F\u540E \u2014\u2014\u2014",-1),f=h('<h2 id="\u6307\u4EE4\uFF1Aschedule" tabindex="-1"><a class="header-anchor" href="#\u6307\u4EE4\uFF1Aschedule" aria-hidden="true">#</a> \u6307\u4EE4\uFF1Aschedule</h2><p>\u6DFB\u52A0\u6216\u67E5\u627E\u8BA1\u5212\u4EFB\u52A1\u3002</p><ul><li>\u57FA\u672C\u8BED\u6CD5\uFF1A<code>schedule [time] -- [command]</code></li><li>\u9009\u9879\u5217\u8868\uFF1A <ul><li><code>/ &lt;interval&gt;</code> \u8BBE\u7F6E\u89E6\u53D1\u7684\u95F4\u9694\u79D2\u6570</li><li><code>-l, --list</code> \u67E5\u770B\u5DF2\u7ECF\u8BBE\u7F6E\u7684\u65E5\u7A0B</li><li><code>-e, --ensure</code> \u9519\u8FC7\u65F6\u95F4\u4E5F\u786E\u4FDD\u6267\u884C</li><li><code>-f, --full</code> \u67E5\u627E\u5168\u90E8\u4E0A\u4E0B\u6587</li><li><code>-d, --delete &lt;id&gt;</code> \u5220\u9664\u5DF2\u7ECF\u8BBE\u7F6E\u7684\u65E5\u7A0B</li></ul></li></ul><h3 id="\u5B9A\u65F6\u5668\u8BED\u6CD5" tabindex="-1"><a class="header-anchor" href="#\u5B9A\u65F6\u5668\u8BED\u6CD5" aria-hidden="true">#</a> \u5B9A\u65F6\u5668\u8BED\u6CD5</h3><ul><li><code>1m</code>: 1 \u5206\u949F\u540E\u89E6\u53D1</li><li><code>2h30m</code>: 2 \u5C0F\u65F6 30 \u5206\u949F\u540E\u89E6\u53D1</li><li><code>10:00</code>: \u4ECA\u5929 10 \u70B9\u89E6\u53D1</li><li><code>1m / 10s</code>: 1 \u5206\u949F\u540E\u6BCF\u9694 10 \u79D2\u89E6\u53D1</li><li><code>10:00 / 1d</code>: \u4ECE\u4ECA\u5929\u8D77\u6BCF\u5929 10 \u70B9\u89E6\u53D1</li></ul><h2 id="\u914D\u7F6E\u9879" tabindex="-1"><a class="header-anchor" href="#\u914D\u7F6E\u9879" aria-hidden="true">#</a> \u914D\u7F6E\u9879</h2><h3 id="mininterval" tabindex="-1"><a class="header-anchor" href="#mininterval" aria-hidden="true">#</a> minInterval</h3><ul><li>\u7C7B\u578B: <code>number</code></li><li>\u9ED8\u8BA4\u503C: <code>60000</code></li></ul><p>\u5141\u8BB8\u7684\u6700\u77ED\u65F6\u95F4\u95F4\u9694\uFF0C\u5355\u4F4D\u4E3A\u6BEB\u79D2\u3002\u5982\u679C\u4F20\u5165\u7684 interval \u53C2\u6570\u5C0F\u4E8E\u8FD9\u4E2A\u503C\uFF0C\u5C06\u4F1A\u63D0\u793A\u201C\u65F6\u95F4\u95F4\u9694\u8FC7\u77ED\u201D\u3002</p>',9);function v(k,x){const a=d("chat-message"),o=d("panel-view");return n(),s("div",null,[u,_,m,i(o,{title:"\u804A\u5929\u8BB0\u5F55"},{default:c(()=>[i(a,{nickname:"Alice",color:"#cc0066"},{default:c(()=>[l("schedule 1m -- echo 233")]),_:1}),i(a,{nickname:"Koishi",avatar:"/koishi.png"},{default:c(()=>[l("\u65E5\u7A0B\u5DF2\u521B\u5EFA\uFF0C\u7F16\u53F7\u4E3A 1\u3002")]),_:1}),i(a,{nickname:"Alice",color:"#cc0066"},{default:c(()=>[l("schedule -l")]),_:1}),i(a,{nickname:"Koishi",avatar:"/koishi.png"},{default:c(()=>[l("1. \u4ECA\u5929 10:01\uFF1Aecho 233")]),_:1}),p,i(a,{nickname:"Koishi",avatar:"/koishi.png"},{default:c(()=>[l("233")]),_:1})]),_:1}),f])}const b=t(r,[["render",v],["__file","schedule.html.vue"]]);export{b as default};
