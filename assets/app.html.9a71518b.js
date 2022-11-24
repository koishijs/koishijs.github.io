import{_ as c,r as a,o as p,c as d,a as e,b as o,d as l,w as s,e as t}from"./app.d641dd0e.js";const h={},u=e("h1",{id:"\u5E94\u7528",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#\u5E94\u7528","aria-hidden":"true"},"#"),o(" \u5E94\u7528 (App)")],-1),F=e("strong",null,"\u5E94\u7528 (App)",-1),y=t('<h2 id="\u6784\u9020\u51FD\u6570\u9009\u9879" tabindex="-1"><a class="header-anchor" href="#\u6784\u9020\u51FD\u6570\u9009\u9879" aria-hidden="true">#</a> \u6784\u9020\u51FD\u6570\u9009\u9879</h2><p>\u901A\u8FC7 <code>new App(options)</code> \u521B\u5EFA\u4E00\u4E2A App \u5B9E\u4F8B\u3002</p><h3 id="options-host" tabindex="-1"><a class="header-anchor" href="#options-host" aria-hidden="true">#</a> options.host</h3><ul><li>\u7C7B\u578B\uFF1A<code>string</code></li><li>\u9ED8\u8BA4\u503C\uFF1A<code>&#39;localhost&#39;</code></li></ul><p>\u670D\u52A1\u5668\u76D1\u542C\u7684 IP \u5730\u5740\u3002\u5982\u679C\u5C06\u6B64\u8BBE\u7F6E\u4E3A <code>0.0.0.0</code> \u5C06\u76D1\u542C\u6240\u6709\u5730\u5740\uFF0C\u5305\u62EC\u5C40\u57DF\u7F51\u548C\u516C\u7F51\u5730\u5740\u3002</p><h3 id="options-port" tabindex="-1"><a class="header-anchor" href="#options-port" aria-hidden="true">#</a> options.port</h3><ul><li>\u7C7B\u578B\uFF1A<code>number</code></li></ul><p>\u670D\u52A1\u5668\u76D1\u542C\u7684\u7AEF\u53E3\u3002</p><h3 id="options-nickname" tabindex="-1"><a class="header-anchor" href="#options-nickname" aria-hidden="true">#</a> options.nickname</h3><ul><li>\u7C7B\u578B\uFF1A<code>string | string[]</code></li></ul>',10),_=e("code",null,"'\u604B\u604B'",-1),f=e("code",null,"\u604B\u604B\uFF0Chelp",-1),E=e("h3",{id:"options-prefix",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#options-prefix","aria-hidden":"true"},"#"),o(" options.prefix")],-1),g=e("ul",null,[e("li",null,[o("\u7C7B\u578B\uFF1A"),e("code",null,"string | string[]")])],-1),m=e("code",null,".",-1),x=e("code",null,".help",-1),b=e("h3",{id:"options-delay",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#options-delay","aria-hidden":"true"},"#"),o(" options.delay")],-1),A=e("ul",null,[e("li",null,[o("\u7C7B\u578B\uFF1A"),e("code",null,"DelayOptions")])],-1),B=e("pre",{class:"shiki",style:{"background-color":"#272822"}},[e("code",null,[e("span",{class:"line"},[e("span",{style:{color:"#88846F"}},"// \u6240\u6709\u914D\u7F6E\u9879\u7684\u5355\u4F4D\u5747\u4E3A\u6BEB\u79D2")]),o(`
`),e("span",{class:"line"},[e("span",{style:{color:"#66D9EF","font-style":"italic"}},"interface"),e("span",{style:{color:"#F8F8F2"}}," "),e("span",{style:{color:"#A6E22E","text-decoration":"underline"}},"DelayOptions"),e("span",{style:{color:"#F8F8F2"}}," {")]),o(`
`),e("span",{class:"line"},[e("span",{style:{color:"#F8F8F2"}},"  "),e("span",{style:{color:"#88846F"}},"// \u8C03\u7528 session.sendQueued() \u65F6\u6D88\u606F\u95F4\u53D1\u9001\u7684\u6700\u5C0F\u5EF6\u8FDF\uFF0C\u6309\u524D\u4E00\u6761\u6D88\u606F\u7684\u5B57\u6570\u8BA1\u7B97\uFF0C\u9ED8\u8BA4\u503C\u4E3A 0")]),o(`
`),e("span",{class:"line"},[e("span",{style:{color:"#F8F8F2"}},"  character"),e("span",{style:{color:"#F92672"}},"?:"),e("span",{style:{color:"#F8F8F2"}}," "),e("span",{style:{color:"#66D9EF","font-style":"italic"}},"number")]),o(`
`),e("span",{class:"line"},[e("span",{style:{color:"#F8F8F2"}},"  "),e("span",{style:{color:"#88846F"}},"// \u8C03\u7528 session.sendQueued() \u65F6\u6D88\u606F\u95F4\u53D1\u9001\u7684\u6700\u5C0F\u5EF6\u8FDF\uFF0C\u6309\u56FA\u5B9A\u503C\u8BA1\u7B97\uFF0C\u9ED8\u8BA4\u503C\u4E3A 100")]),o(`
`),e("span",{class:"line"},[e("span",{style:{color:"#F8F8F2"}},"  message"),e("span",{style:{color:"#F92672"}},"?:"),e("span",{style:{color:"#F8F8F2"}}," "),e("span",{style:{color:"#66D9EF","font-style":"italic"}},"number")]),o(`
`),e("span",{class:"line"},[e("span",{style:{color:"#F8F8F2"}},"  "),e("span",{style:{color:"#88846F"}},"// \u8C03\u7528 session.cancelQueued() \u65F6\u9ED8\u8BA4\u7684\u5EF6\u8FDF\uFF0C\u9ED8\u8BA4\u503C\u4E3A 0")]),o(`
`),e("span",{class:"line"},[e("span",{style:{color:"#F8F8F2"}},"  cancel"),e("span",{style:{color:"#F92672"}},"?:"),e("span",{style:{color:"#F8F8F2"}}," "),e("span",{style:{color:"#66D9EF","font-style":"italic"}},"number")]),o(`
`),e("span",{class:"line"},[e("span",{style:{color:"#F8F8F2"}},"  "),e("span",{style:{color:"#88846F"}},"// \u8C03\u7528 bot.broadcast() \u65F6\u9ED8\u8BA4\u7684\u5EF6\u8FDF\uFF0C\u9ED8\u8BA4\u503C\u4E3A 500")]),o(`
`),e("span",{class:"line"},[e("span",{style:{color:"#F8F8F2"}},"  broadcast"),e("span",{style:{color:"#F92672"}},"?:"),e("span",{style:{color:"#F8F8F2"}}," "),e("span",{style:{color:"#66D9EF","font-style":"italic"}},"number")]),o(`
`),e("span",{class:"line"},[e("span",{style:{color:"#F8F8F2"}},"  "),e("span",{style:{color:"#88846F"}},"// \u8C03\u7528 session.prompt() \u662F\u9ED8\u8BA4\u7684\u7B49\u5F85\u65F6\u95F4\uFF0C\u9ED8\u8BA4\u503C\u4E3A 60000")]),o(`
`),e("span",{class:"line"},[e("span",{style:{color:"#F8F8F2"}},"  prompt"),e("span",{style:{color:"#F92672"}},"?:"),e("span",{style:{color:"#F8F8F2"}}," "),e("span",{style:{color:"#66D9EF","font-style":"italic"}},"number")]),o(`
`),e("span",{class:"line"},[e("span",{style:{color:"#F8F8F2"}},"}")])])],-1),D=e("h3",{id:"options-selfurl",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#options-selfurl","aria-hidden":"true"},"#"),o(" options.selfUrl")],-1),k=e("ul",null,[e("li",null,[o("\u7C7B\u578B\uFF1A"),e("code",null,"string")])],-1),w=t('<h3 id="options-maxlisteners" tabindex="-1"><a class="header-anchor" href="#options-maxlisteners" aria-hidden="true">#</a> options.maxListeners</h3><ul><li>\u7C7B\u578B\uFF1A<code>number</code></li><li>\u9ED8\u8BA4\u503C\uFF1A<code>64</code></li></ul><p>\u6BCF\u79CD\u94A9\u5B50\u7684\u6700\u5927\u6570\u91CF\u3002\u5982\u679C\u8D85\u8FC7\u8FD9\u4E2A\u6570\u91CF\uFF0CKoishi \u4F1A\u8BA4\u5B9A\u4E3A\u53D1\u751F\u4E86\u5185\u5B58\u6CC4\u6F0F\uFF0C\u5C06\u4EA7\u751F\u4E00\u4E2A\u8B66\u544A\u3002</p><h3 id="options-autoauthorize" tabindex="-1"><a class="header-anchor" href="#options-autoauthorize" aria-hidden="true">#</a> options.autoAuthorize</h3><ul><li>\u7C7B\u578B\uFF1A<code>number | ((session: Session) =&gt; number)</code></li><li>\u9ED8\u8BA4\u503C\uFF1A<code>1</code></li></ul><p>\u5F53\u83B7\u53D6\u4E0D\u5230\u7528\u6237\u6570\u636E\u65F6\u9ED8\u8BA4\u4F7F\u7528\u7684\u6743\u9650\u7B49\u7EA7\u3002</p><h3 id="options-autoassign" tabindex="-1"><a class="header-anchor" href="#options-autoassign" aria-hidden="true">#</a> options.autoAssign</h3><ul><li>\u7C7B\u578B\uFF1A<code>boolean | ((session: Session) =&gt; boolean)</code></li><li>\u9ED8\u8BA4\u503C\uFF1A<code>true</code></li></ul><p>\u5F53\u83B7\u53D6\u4E0D\u5230\u9891\u9053\u6570\u636E\u65F6\uFF0C\u662F\u5426\u4F7F\u7528\u63A5\u53D7\u8005\u4F5C\u4E3A\u4EE3\u7406\u8005\u3002</p><h3 id="options-prettyerrors" tabindex="-1"><a class="header-anchor" href="#options-prettyerrors" aria-hidden="true">#</a> options.prettyErrors</h3><ul><li>\u7C7B\u578B\uFF1A<code>boolean</code></li></ul><p>\u542F\u7528\u62A5\u9519\u4F18\u5316\u6A21\u5F0F\u3002\u5728\u6B64\u6A21\u5F0F\u4E0B Koishi \u4F1A\u5BF9\u7A0B\u5E8F\u629B\u51FA\u7684\u5F02\u5E38\u8FDB\u884C\u6574\u7406\uFF0C\u8FC7\u6EE4\u6389\u6846\u67B6\u5185\u90E8\u7684\u8C03\u7528\u8BB0\u5F55\uFF0C\u8F93\u51FA\u66F4\u6613\u8BFB\u7684\u63D0\u793A\u4FE1\u606F\u3002\u9ED8\u8BA4\u503C\u4E3A <code>true</code>\u3002</p><h3 id="options-minsimilarity" tabindex="-1"><a class="header-anchor" href="#options-minsimilarity" aria-hidden="true">#</a> options.minSimilarity</h3><ul><li>\u7C7B\u578B\uFF1A<code>number</code></li></ul>',14),S=t('<h3 id="options-request-proxyagent" tabindex="-1"><a class="header-anchor" href="#options-request-proxyagent" aria-hidden="true">#</a> options.request.proxyAgent</h3><ul><li>\u7C7B\u578B: <code>string</code></li></ul><p>\u914D\u7F6E\u8BF7\u6C42\u65F6\u9ED8\u8BA4\u4F7F\u7528\u7684\u7F51\u7EDC\u4EE3\u7406\u3002</p><h2 id="\u914D\u7F6E\u6587\u4EF6\u9009\u9879" tabindex="-1"><a class="header-anchor" href="#\u914D\u7F6E\u6587\u4EF6\u9009\u9879" aria-hidden="true">#</a> \u914D\u7F6E\u6587\u4EF6\u9009\u9879</h2><p>\u4E0B\u9762\u7684\u914D\u7F6E\u9879\u6765\u81EA Koishi \u7684\u547D\u4EE4\u884C\u5DE5\u5177\uFF0C\u4EC5\u53EF\u7528\u4E8E\u914D\u7F6E\u6587\u4EF6\u3002</p><h3 id="options-plugins" tabindex="-1"><a class="header-anchor" href="#options-plugins" aria-hidden="true">#</a> options.plugins</h3><ul><li>\u7C7B\u578B\uFF1A<code>Record&lt;string, any&gt;</code></li></ul>',7),v=e("p",null,"\u6211\u4EEC\u8FD8\u652F\u6301\u914D\u7F6E\u63D2\u4EF6\u7684\u4E0A\u4E0B\u6587\u9009\u62E9\u5668\uFF1A",-1),V=e("pre",{class:"shiki",style:{"background-color":"#272822"}},[e("code",null,[e("span",{class:"line"},[e("span",{style:{color:"#66D9EF","font-style":"italic"}},"type"),e("span",{style:{color:"#F8F8F2"}}," "),e("span",{style:{color:"#A6E22E","text-decoration":"underline"}},"SelectorValue"),e("span",{style:{color:"#F8F8F2"}}," "),e("span",{style:{color:"#F92672"}},"="),e("span",{style:{color:"#F8F8F2"}}," "),e("span",{style:{color:"#66D9EF","font-style":"italic"}},"boolean"),e("span",{style:{color:"#F8F8F2"}}," "),e("span",{style:{color:"#F92672"}},"|"),e("span",{style:{color:"#F8F8F2"}}," "),e("span",{style:{color:"#66D9EF","font-style":"italic"}},"string"),e("span",{style:{color:"#F8F8F2"}}," "),e("span",{style:{color:"#F92672"}},"|"),e("span",{style:{color:"#F8F8F2"}}," "),e("span",{style:{color:"#66D9EF","font-style":"italic"}},"string"),e("span",{style:{color:"#F8F8F2"}},"[]")]),o(`
`),e("span",{class:"line"}),o(`
`),e("span",{class:"line"},[e("span",{style:{color:"#66D9EF","font-style":"italic"}},"interface"),e("span",{style:{color:"#F8F8F2"}}," "),e("span",{style:{color:"#A6E22E","text-decoration":"underline"}},"Selection"),e("span",{style:{color:"#F8F8F2"}}," {")]),o(`
`),e("span",{class:"line"},[e("span",{style:{color:"#F8F8F2"}},"  $user"),e("span",{style:{color:"#F92672"}},":"),e("span",{style:{color:"#F8F8F2"}}," "),e("span",{style:{color:"#A6E22E","text-decoration":"underline"}},"SelectorValue")]),o(`
`),e("span",{class:"line"},[e("span",{style:{color:"#F8F8F2"}},"  $channel"),e("span",{style:{color:"#F92672"}},":"),e("span",{style:{color:"#F8F8F2"}}," "),e("span",{style:{color:"#A6E22E","text-decoration":"underline"}},"SelectorValue")]),o(`
`),e("span",{class:"line"},[e("span",{style:{color:"#F8F8F2"}},"  $group"),e("span",{style:{color:"#F92672"}},":"),e("span",{style:{color:"#F8F8F2"}}," "),e("span",{style:{color:"#A6E22E","text-decoration":"underline"}},"SelectorValue")]),o(`
`),e("span",{class:"line"},[e("span",{style:{color:"#F8F8F2"}},"  $private"),e("span",{style:{color:"#F92672"}},":"),e("span",{style:{color:"#F8F8F2"}}," "),e("span",{style:{color:"#A6E22E","text-decoration":"underline"}},"SelectorValue")]),o(`
`),e("span",{class:"line"},[e("span",{style:{color:"#F8F8F2"}},"  $self"),e("span",{style:{color:"#F92672"}},":"),e("span",{style:{color:"#F8F8F2"}}," "),e("span",{style:{color:"#A6E22E","text-decoration":"underline"}},"SelectorValue")]),o(`
`),e("span",{class:"line"},[e("span",{style:{color:"#F8F8F2"}},"  $platform"),e("span",{style:{color:"#F92672"}},":"),e("span",{style:{color:"#F8F8F2"}}," "),e("span",{style:{color:"#A6E22E","text-decoration":"underline"}},"SelectorValue")]),o(`
`),e("span",{class:"line"},[e("span",{style:{color:"#F8F8F2"}},"  $union"),e("span",{style:{color:"#F92672"}},":"),e("span",{style:{color:"#F8F8F2"}}," "),e("span",{style:{color:"#A6E22E","text-decoration":"underline"}},"Selection"),e("span",{style:{color:"#F8F8F2"}},"[]")]),o(`
`),e("span",{class:"line"},[e("span",{style:{color:"#F8F8F2"}},"  $except"),e("span",{style:{color:"#F92672"}},":"),e("span",{style:{color:"#F8F8F2"}}," "),e("span",{style:{color:"#A6E22E","text-decoration":"underline"}},"Selection")]),o(`
`),e("span",{class:"line"},[e("span",{style:{color:"#F8F8F2"}},"}")])])],-1),C=e("h3",{id:"options-logger",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#options-logger","aria-hidden":"true"},"#"),o(" options.logger")],-1),$=e("h4",{id:"options-logger-levels",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#options-logger-levels","aria-hidden":"true"},"#"),o(" options.logger.levels")],-1),z=e("ul",null,[e("li",null,[o("\u7C7B\u578B\uFF1A"),e("code",null,"number | object")]),e("li",null,[o("\u9ED8\u8BA4\u503C\uFF1A"),e("code",null,"{}")])],-1),L=e("h4",{id:"options-logger-showtime",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#options-logger-showtime","aria-hidden":"true"},"#"),o(" options.logger.showTime")],-1),O=e("ul",null,[e("li",null,[o("\u7C7B\u578B\uFF1A"),e("code",null,"string | boolean")]),e("li",null,[o("\u9ED8\u8BA4\u503C\uFF1A"),e("code",null,"false")])],-1),K=e("h4",{id:"options-logger-showdiff",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#options-logger-showdiff","aria-hidden":"true"},"#"),o(" options.logger.showDiff")],-1),N=e("ul",null,[e("li",null,[o("\u7C7B\u578B\uFF1A"),e("code",null,"boolean")]),e("li",null,[o("\u9ED8\u8BA4\u503C\uFF1A\u521D\u59CB\u672A\u8BBE\u7F6E\uFF0C\u5728 ready \u4E8B\u4EF6\u89E6\u53D1\u540E\u4FEE\u6539\u4E3A "),e("code",null,"!options.logTime")])],-1),T=e("h3",{id:"options-watch",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#options-watch","aria-hidden":"true"},"#"),o(" options.watch")],-1),q={href:"https://github.com/paulmillr/chokidar#api",target:"_blank",rel:"noopener noreferrer"},I=e("code",null,"WatchOptions",-1),P=e("ul",null,[e("li",null,[e("strong",null,"watch.root:"),o(),e("code",null,"string"),o(" \u8981\u76D1\u542C\u7684\u6839\u76EE\u5F55\uFF0C\u76F8\u5BF9\u4E8E\u5DE5\u4F5C\u8DEF\u5F84")]),e("li",null,[e("strong",null,"watch.debounce:"),o(),e("code",null,"number"),o(" \u5EF6\u8FDF\u89E6\u53D1\u66F4\u65B0\u7684\u7B49\u5F85\u65F6\u95F4\uFF0C\u9ED8\u8BA4\u4E3A "),e("code",null,"100")])],-1),Q=t('<h3 id="options-timezoneoffset" tabindex="-1"><a class="header-anchor" href="#options-timezoneoffset" aria-hidden="true">#</a> options.timezoneOffset</h3><h3 id="options-stacktracelimit" tabindex="-1"><a class="header-anchor" href="#options-stacktracelimit" aria-hidden="true">#</a> options.stackTraceLimit</h3><h2 id="\u5B9E\u4F8B\u5C5E\u6027\u548C\u65B9\u6CD5" tabindex="-1"><a class="header-anchor" href="#\u5B9E\u4F8B\u5C5E\u6027\u548C\u65B9\u6CD5" aria-hidden="true">#</a> \u5B9E\u4F8B\u5C5E\u6027\u548C\u65B9\u6CD5</h2><h3 id="app-config" tabindex="-1"><a class="header-anchor" href="#app-config" aria-hidden="true">#</a> app.config</h3><ul><li>\u7C7B\u578B: <code>AppOptions</code></li></ul><p>\u5F53\u524D App \u521B\u5EFA\u65F6\u4F20\u5165\u7684\u914D\u7F6E\u3002</p><h3 id="app-start" tabindex="-1"><a class="header-anchor" href="#app-start" aria-hidden="true">#</a> app.start()</h3><ul><li>\u8FD4\u56DE\u503C: <code>Promise&lt;void&gt;</code></li></ul><p>\u542F\u52A8\u6B64\u5E94\u7528\u3002</p><h3 id="app-stop" tabindex="-1"><a class="header-anchor" href="#app-stop" aria-hidden="true">#</a> app.stop()</h3><ul><li>\u8FD4\u56DE\u503C: <code>Promise&lt;void&gt;</code></li></ul><p>\u505C\u6B62\u6B64\u5E94\u7528\u3002</p>',12);function R(j,U){const n=a("RouterLink"),i=a("panel-view"),r=a("ExternalLinkIcon");return p(),d("div",null,[u,e("p",null,[F,o(" \u662F "),l(n,{to:"/api/core/context.html"},{default:s(()=>[o("Context")]),_:1}),o(" \u7684\u4E00\u4E2A\u5B50\u7C7B\uFF0C\u5B83\u662F\u7A0B\u5E8F\u7684\u5165\u53E3\uFF0C\u7BA1\u7406\u7740\u5168\u90E8\u673A\u5668\u4EBA\u7684\u4FE1\u606F\u3002\u9664\u4E86 Context \u4E2D\u5DF2\u6709\u7684\u5C5E\u6027\u548C\u65B9\u6CD5\u4EE5\u5916\uFF0CApp \u8FD8\u63D0\u4F9B\u4E86\u4E0B\u9762\u7684\u5C5E\u6027\u548C\u65B9\u6CD5\uFF1A")]),y,e("p",null,[o("\u673A\u5668\u4EBA\u7684\u6635\u79F0\uFF0C\u53EF\u4EE5\u662F\u5B57\u7B26\u4E32\u6216\u5B57\u7B26\u4E32\u6570\u7EC4\u3002\u5C06\u7528\u4E8E\u6307\u4EE4\u524D\u7F00\u7684\u5339\u914D\u3002\u4F8B\u5982\uFF0C\u5982\u679C\u914D\u7F6E\u8BE5\u9009\u9879\u4E3A "),_,o("\uFF0C\u5219\u4F60\u53EF\u4EE5\u901A\u8FC7 "),f,o(" \u6765\u8FDB\u884C help \u6307\u4EE4\u7684\u8C03\u7528\u3002\u53C2\u89C1 "),l(n,{to:"/guide/command.html#%E6%8C%87%E4%BB%A4%E5%89%8D%E7%BC%80"},{default:s(()=>[o("\u6307\u4EE4\u524D\u7F00")]),_:1}),o(" \u4E00\u8282\u3002")]),E,g,e("p",null,[o("\u6307\u4EE4\u524D\u7F00\u5B57\u7B26\uFF0C\u53EF\u4EE5\u662F\u5B57\u7B26\u4E32\u6216\u5B57\u7B26\u4E32\u6570\u7EC4\u3002\u5C06\u7528\u4E8E\u6307\u4EE4\u524D\u7F00\u7684\u5339\u914D\u3002\u4F8B\u5982\uFF0C\u5982\u679C\u914D\u7F6E\u8BE5\u9009\u9879\u4E3A "),m,o("\uFF0C\u5219\u4F60\u53EF\u4EE5\u901A\u8FC7 "),x,o(" \u6765\u8FDB\u884C help \u6307\u4EE4\u7684\u8C03\u7528\u3002\u53C2\u89C1 "),l(n,{to:"/guide/command.html#%E6%8C%87%E4%BB%A4%E5%89%8D%E7%BC%80"},{default:s(()=>[o("\u6307\u4EE4\u524D\u7F00")]),_:1}),o(" \u4E00\u8282\u3002")]),b,A,l(i,{class:"code",title:"",style:{}},{default:s(()=>[B]),_:1}),D,k,e("p",null,[o("Koishi \u670D\u52A1\u66B4\u9732\u5728\u516C\u7F51\u7684\u5730\u5740\u3002\u90E8\u5206\u529F\u80FD\uFF08\u4F8B\u5982 "),l(n,{to:"/api/core/adapter/telegram.html"},{default:s(()=>[o("adapter-telegram")]),_:1}),o(" \u6216\u662F "),l(n,{to:"/plugins/other/assets.html"},{default:s(()=>[o("plugin-assets")]),_:1}),o("\uFF09\u9700\u8981\u7528\u5230\u3002")]),w,e("p",null,[o("\u7528\u4E8E\u6A21\u7CCA\u5339\u914D\u7684\u76F8\u4F3C\u7CFB\u6570\uFF0C\u5E94\u8BE5\u662F\u4E00\u4E2A 0 \u5230 1 \u4E4B\u95F4\u7684\u6570\u503C\u3002\u6570\u503C\u8D8A\u9AD8\uFF0C\u6A21\u7CCA\u5339\u914D\u8D8A\u4E25\u683C\u3002\u8BBE\u7F6E\u4E3A 1 \u53EF\u4EE5\u5B8C\u5168\u7981\u7528\u6A21\u7CCA\u5339\u914D\u3002\u53C2\u89C1 "),l(n,{to:"/guide/command.html#%E6%A8%A1%E7%B3%8A%E5%8C%B9%E9%85%8D"},{default:s(()=>[o("\u6A21\u7CCA\u5339\u914D")]),_:1}),o(" \u4E00\u8282\u3002")]),S,e("p",null,[o("\u8981\u5B89\u88C5\u7684\u63D2\u4EF6\u5217\u8868\u3002\u4EE5\u4F20\u5165\u7684\u5BF9\u8C61\u7684\u952E\u4E3A\u63D2\u4EF6\u540D\uFF0C\u503C\u4E3A\u63D2\u4EF6\u7684\u9009\u9879\u8FDB\u884C\u5B89\u88C5\u3002\u53C2\u89C1 "),l(n,{to:"/guide/plugin-and-context.html"},{default:s(()=>[o("\u63D2\u4EF6\u4E0E\u4E0A\u4E0B\u6587")]),_:1}),o(" \u4E00\u7AE0\u3002")]),v,l(i,{class:"code",title:"",style:{}},{default:s(()=>[V]),_:1}),e("p",null,[o("\u53C2\u89C1 "),l(n,{to:"/guide/context.html#%E5%9C%A8%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6%E4%B8%AD%E4%BD%BF%E7%94%A8%E9%80%89%E6%8B%A9%E5%99%A8"},{default:s(()=>[o("\u5728\u914D\u7F6E\u6587\u4EF6\u4E2D\u4F7F\u7528\u9009\u62E9\u5668")]),_:1}),o(" \u4E00\u8282\u3002")]),C,$,z,e("p",null,[o("\u9ED8\u8BA4\u7684\u8F93\u51FA\u7B49\u7EA7\u3002\u53C2\u89C1 "),l(n,{to:"/guide/logger.html#%E8%AE%BE%E7%BD%AE%E8%BE%93%E5%87%BA%E7%AD%89%E7%BA%A7"},{default:s(()=>[o("\u8BBE\u7F6E\u8F93\u51FA\u7B49\u7EA7")]),_:1}),o(" \u4E00\u8282\u3002")]),L,O,e("p",null,[o("\u8F93\u51FA\u65E5\u5FD7\u6240\u4F7F\u7528\u7684\u65F6\u95F4\u683C\u5F0F\u3002\u53C2\u89C1 "),l(n,{to:"/guide/logger.html#%E8%BE%93%E5%87%BA%E6%97%B6%E9%97%B4"},{default:s(()=>[o("\u8F93\u51FA\u65F6\u95F4")]),_:1}),o(" \u4E00\u8282\u3002")]),K,N,e("p",null,[o("\u662F\u5426\u6807\u6CE8\u76F8\u90BB\u4E24\u6B21\u8F93\u51FA\u7684\u65F6\u95F4\u5DEE\u3002\u53C2\u89C1 "),l(n,{to:"/guide/logger.html#%E8%BE%93%E5%87%BA%E6%97%B6%E9%97%B4"},{default:s(()=>[o("\u8F93\u51FA\u65F6\u95F4")]),_:1}),o(" \u4E00\u8282\u3002")]),T,e("ul",null,[e("li",null,[o("\u7C7B\u578B\uFF1A"),e("a",q,[I,l(r)]),o(" \u5916\u52A0\u4E0B\u9762\u7684\u5C5E\u6027\uFF1A "),P])]),e("p",null,[o("\u76D1\u542C\u6587\u4EF6\u53D8\u5316\u7684\u9009\u9879\u3002\u53C2\u89C1 "),l(n,{to:"/guide/cli.html#%E6%8F%92%E4%BB%B6%E7%83%AD%E9%87%8D%E8%BD%BD"},{default:s(()=>[o("\u63D2\u4EF6\u70ED\u91CD\u8F7D")]),_:1}),o(" \u4E00\u8282\u3002")]),Q])}const G=c(h,[["render",R],["__file","app.html.vue"]]);export{G as default};