import{_ as i,r as a,o as d,c as r,a as o,b as e,d as l,w as n,e as s}from"./app.d641dd0e.js";const F={},p=s('<h1 id="\u6307\u4EE4" tabindex="-1"><a class="header-anchor" href="#\u6307\u4EE4" aria-hidden="true">#</a> \u6307\u4EE4 (Command)</h1><p>\u6307\u4EE4\u7CFB\u7EDF\u662F Koishi \u7684\u6838\u5FC3\u529F\u80FD\u4E4B\u4E00\u3002\u901A\u8FC7 <code>ctx.command()</code> \u65B9\u6CD5\u83B7\u5F97\u7684\u662F\u6307\u4EE4\u7684\u5B9E\u4F8B\uFF0C\u5B83\u542B\u6709\u4E0B\u9762\u7684\u65B9\u6CD5\uFF1A</p><h2 id="argv-\u5BF9\u8C61" tabindex="-1"><a class="header-anchor" href="#argv-\u5BF9\u8C61" aria-hidden="true">#</a> Argv \u5BF9\u8C61</h2><p>Argv \u5BF9\u8C61\u4F1A\u4F5C\u4E3A <code>cmd.action()</code>, <code>cmd.userFields()</code> \u7B49\u65B9\u6CD5\u7684\u56DE\u8C03\u51FD\u6570\u4E2D\u7684\u7B2C\u4E00\u4E2A\u53C2\u6570\u3002\u5B83\u5177\u6709\u4EE5\u4E0B\u7684\u5C5E\u6027\uFF1A</p>',4),u=s("<li><strong>args:</strong> <code>any[]</code> \u53C2\u6570\u5217\u8868</li><li><strong>options:</strong> <code>{}</code> \u9009\u9879\u5217\u8868</li><li><strong>next:</strong> <code>Next</code> \u4E2D\u95F4\u4EF6\u7684 next \u56DE\u8C03\u51FD\u6570</li>",3),h=o("strong",null,"session:",-1),y=o("code",null,"Session",-1),g=o("h2",{id:"\u5B9E\u4F8B\u65B9\u6CD5",tabindex:"-1"},[o("a",{class:"header-anchor",href:"#\u5B9E\u4F8B\u65B9\u6CD5","aria-hidden":"true"},"#"),e(" \u5B9E\u4F8B\u65B9\u6CD5")],-1),m=o("h3",{id:"cmd-option",tabindex:"-1"},[o("a",{class:"header-anchor",href:"#cmd-option","aria-hidden":"true"},"#"),e(" cmd.option(name, desc?, config?)")],-1),E=o("li",null,[o("strong",null,"name:"),e(),o("code",null,"string"),e(" \u9009\u9879\u7684\u540D\u5B57")],-1),_=o("li",null,[o("strong",null,"desc:"),e(),o("code",null,"string"),e(" \u9009\u9879\u7684\u63CF\u8FF0")],-1),f=o("strong",null,"config:",-1),x=o("code",null,"OptionConfig",-1),A=o("strong",null,"config.fallback:",-1),B=o("code",null,"any",-1),b=o("strong",null,"config.value:",-1),D=o("code",null,"any",-1),v=o("strong",null,"config.type:",-1),C=o("code",null,"DomainType",-1),k=o("strong",null,"config.hidden:",-1),T=o("code",null,"boolean",-1),w=o("strong",null,"config.notUsage:",-1),N=o("code",null,"boolean",-1),R=o("strong",null,"config.authority:",-1),S=o("code",null,"number",-1),K=o("li",null,[e("\u8FD4\u56DE\u503C: "),o("code",null,"this")],-1),V=o("p",null,"\u4E3A\u6307\u4EE4\u6DFB\u52A0\u4E00\u4E2A\u9009\u9879\u3002",-1),O=o("pre",{class:"shiki",style:{"background-color":"#272822"}},[o("code",null,[o("span",{class:"line"},[o("span",{style:{color:"#66D9EF","font-style":"italic"}},"type"),o("span",{style:{color:"#F8F8F2"}}," "),o("span",{style:{color:"#A6E22E","text-decoration":"underline"}},"DomainType"),o("span",{style:{color:"#F8F8F2"}}," "),o("span",{style:{color:"#F92672"}},"="),o("span",{style:{color:"#F8F8F2"}}," "),o("span",{style:{color:"#66D9EF","font-style":"italic"}},"string"),o("span",{style:{color:"#F8F8F2"}}," "),o("span",{style:{color:"#F92672"}},"|"),o("span",{style:{color:"#F8F8F2"}}," "),o("span",{style:{color:"#A6E22E","text-decoration":"underline"}},"RegExp"),o("span",{style:{color:"#F8F8F2"}}," "),o("span",{style:{color:"#F92672"}},"|"),o("span",{style:{color:"#F8F8F2"}}," (("),o("span",{style:{color:"#FD971F","font-style":"italic"}},"source"),o("span",{style:{color:"#F92672"}},":"),o("span",{style:{color:"#F8F8F2"}}," "),o("span",{style:{color:"#66D9EF","font-style":"italic"}},"string"),o("span",{style:{color:"#F8F8F2"}},") "),o("span",{style:{color:"#66D9EF","font-style":"italic"}},"=>"),o("span",{style:{color:"#F8F8F2"}}," "),o("span",{style:{color:"#66D9EF","font-style":"italic"}},"any"),o("span",{style:{color:"#F8F8F2"}},")")])])],-1),P=s('<h3 id="cmd-removeoption" tabindex="-1"><a class="header-anchor" href="#cmd-removeoption" aria-hidden="true">#</a> cmd.removeOption(name)</h3><ul><li><strong>name:</strong> <code>string</code> \u6307\u4EE4\u7684\u540D\u79F0</li><li>\u8FD4\u56DE\u503C: <code>this</code></li></ul><p>\u5220\u9664\u4E00\u4E2A\u9009\u9879\u3002\u6CE8\u610F\uFF1A\u5982\u679C\u4F60\u4E3A\u4E00\u4E2A\u9009\u9879\u6CE8\u518C\u4E86\u591A\u4E2A\u522B\u540D\uFF0C\u5219\u5220\u9664\u4EFB\u4F55\u4E00\u4E2A\u522B\u540D\u90FD\u76F8\u5F53\u4E8E\u5220\u9664\u6574\u4E2A\u9009\u9879\u3002</p><h3 id="cmd-usage" tabindex="-1"><a class="header-anchor" href="#cmd-usage" aria-hidden="true">#</a> cmd.usage(text)</h3><ul><li><strong>text:</strong> <code>string</code> \u4F7F\u7528\u65B9\u6CD5\u8BF4\u660E</li><li>\u8FD4\u56DE\u503C: <code>this</code></li></ul><p>\u4E3A\u6307\u4EE4\u6DFB\u52A0\u4F7F\u7528\u65B9\u6CD5\u3002\u591A\u6B21\u8C03\u7528\u6B64\u65B9\u6CD5\u53EA\u4F1A\u4FDD\u7559\u6700\u540E\u4E00\u6B21\u7684\u5B9A\u4E49\u3002</p><h3 id="cmd-example" tabindex="-1"><a class="header-anchor" href="#cmd-example" aria-hidden="true">#</a> cmd.example(example)</h3><ul><li><strong>example:</strong> <code>text</code> \u4F7F\u7528\u793A\u4F8B</li><li>\u8FD4\u56DE\u503C: <code>this</code></li></ul><p>\u4E3A\u6307\u4EE4\u6DFB\u52A0\u4F7F\u7528\u793A\u4F8B\u3002\u591A\u6B21\u8C03\u7528\u6B64\u65B9\u6CD5\u4F1A\u4E00\u5E76\u4FDD\u7559\u5E76\u663E\u793A\u5728\u5E2E\u52A9\u7684\u6700\u540E\u9762\u3002</p><h3 id="cmd-action" tabindex="-1"><a class="header-anchor" href="#cmd-action" aria-hidden="true">#</a> cmd.action(action, prepend?)</h3><ul><li><strong>action:</strong> <code>CommandAction</code> \u6267\u884C\u51FD\u6570</li><li><strong>prepend:</strong> <code>boolean</code> \u662F\u5426\u524D\u7F6E</li><li>\u8FD4\u56DE\u503C: <code>this</code></li></ul><p>\u4E3A\u6307\u4EE4\u6DFB\u52A0\u6267\u884C\u51FD\u6570\u3002</p>',12),z=o("pre",{class:"shiki",style:{"background-color":"#272822"}},[o("code",null,[o("span",{class:"line"},[o("span",{style:{color:"#66D9EF","font-style":"italic"}},"type"),o("span",{style:{color:"#F8F8F2"}}," "),o("span",{style:{color:"#A6E22E","text-decoration":"underline"}},"Awaitable"),o("span",{style:{color:"#F8F8F2"}},"<"),o("span",{style:{color:"#A6E22E","text-decoration":"underline"}},"T"),o("span",{style:{color:"#F8F8F2"}},"> "),o("span",{style:{color:"#F92672"}},"="),o("span",{style:{color:"#F8F8F2"}}," ["),o("span",{style:{color:"#A6E22E","text-decoration":"underline"}},"T"),o("span",{style:{color:"#F8F8F2"}},"] "),o("span",{style:{color:"#F92672"}},"extends"),o("span",{style:{color:"#F8F8F2"}}," ["),o("span",{style:{color:"#A6E22E","text-decoration":"underline"}},"Promise"),o("span",{style:{color:"#F8F8F2"}},"<"),o("span",{style:{color:"#66D9EF","font-style":"italic"}},"unknown"),o("span",{style:{color:"#F8F8F2"}},">] "),o("span",{style:{color:"#F92672"}},"?"),o("span",{style:{color:"#F8F8F2"}}," "),o("span",{style:{color:"#A6E22E","text-decoration":"underline"}},"T"),o("span",{style:{color:"#F8F8F2"}}," "),o("span",{style:{color:"#F92672"}},":"),o("span",{style:{color:"#F8F8F2"}}," "),o("span",{style:{color:"#A6E22E","text-decoration":"underline"}},"T"),o("span",{style:{color:"#F8F8F2"}}," "),o("span",{style:{color:"#F92672"}},"|"),o("span",{style:{color:"#F8F8F2"}}," "),o("span",{style:{color:"#A6E22E","text-decoration":"underline"}},"Promise"),o("span",{style:{color:"#F8F8F2"}},"<"),o("span",{style:{color:"#A6E22E","text-decoration":"underline"}},"T"),o("span",{style:{color:"#F8F8F2"}},">")]),e(`
`),o("span",{class:"line"},[o("span",{style:{color:"#66D9EF","font-style":"italic"}},"type"),o("span",{style:{color:"#F8F8F2"}}," "),o("span",{style:{color:"#A6E22E","text-decoration":"underline"}},"CommandAction"),o("span",{style:{color:"#F8F8F2"}}," "),o("span",{style:{color:"#F92672"}},"="),o("span",{style:{color:"#F8F8F2"}}," ("),o("span",{style:{color:"#FD971F","font-style":"italic"}},"argv"),o("span",{style:{color:"#F92672"}},":"),o("span",{style:{color:"#F8F8F2"}}," "),o("span",{style:{color:"#A6E22E","text-decoration":"underline"}},"Argv"),o("span",{style:{color:"#F8F8F2"}},", "),o("span",{style:{color:"#F92672"}},"..."),o("span",{style:{color:"#FD971F","font-style":"italic"}},"args"),o("span",{style:{color:"#F92672"}},":"),o("span",{style:{color:"#F8F8F2"}}," "),o("span",{style:{color:"#66D9EF","font-style":"italic"}},"any"),o("span",{style:{color:"#F8F8F2"}},"[]) "),o("span",{style:{color:"#66D9EF","font-style":"italic"}},"=>"),o("span",{style:{color:"#F8F8F2"}}," "),o("span",{style:{color:"#A6E22E","text-decoration":"underline"}},"Awaitable"),o("span",{style:{color:"#F8F8F2"}},"<"),o("span",{style:{color:"#66D9EF","font-style":"italic"}},"string"),o("span",{style:{color:"#F8F8F2"}}," "),o("span",{style:{color:"#F92672"}},"|"),o("span",{style:{color:"#F8F8F2"}}," "),o("span",{style:{color:"#66D9EF","font-style":"italic"}},"void"),o("span",{style:{color:"#F8F8F2"}},">")])])],-1),L=s('<h3 id="cmd-before" tabindex="-1"><a class="header-anchor" href="#cmd-before" aria-hidden="true">#</a> cmd.before(action, append?)</h3><ul><li><strong>action:</strong> <code>CommandAction</code> \u6267\u884C\u51FD\u6570</li><li><strong>append:</strong> <code>boolean</code> \u662F\u5426\u540E\u7F6E</li><li>\u8FD4\u56DE\u503C: <code>this</code></li></ul><p>\u4E3A\u6307\u4EE4\u6DFB\u52A0\u68C0\u6D4B\u51FD\u6570\u3002</p><h3 id="cmd-userfields" tabindex="-1"><a class="header-anchor" href="#cmd-userfields" aria-hidden="true">#</a> cmd.userFields(fields)</h3><ul><li><strong>fields:</strong> <code>FieldCollector&lt;UserField&gt;</code> \u8981\u8BF7\u6C42\u7684\u7528\u6237\u5B57\u6BB5</li><li>\u8FD4\u56DE\u503C: <code>this</code></li></ul>',5),U=o("pre",{class:"shiki",style:{"background-color":"#272822"}},[o("code",null,[o("span",{class:"line"},[o("span",{style:{color:"#66D9EF","font-style":"italic"}},"type"),o("span",{style:{color:"#F8F8F2"}}," "),o("span",{style:{color:"#A6E22E","text-decoration":"underline"}},"FieldCollector"),o("span",{style:{color:"#F8F8F2"}},"<"),o("span",{style:{color:"#A6E22E","text-decoration":"underline"}},"K"),o("span",{style:{color:"#F8F8F2"}}," "),o("span",{style:{color:"#F92672"}},"extends"),o("span",{style:{color:"#F8F8F2"}}," "),o("span",{style:{color:"#66D9EF","font-style":"italic"}},"string"),o("span",{style:{color:"#F8F8F2"}},"> "),o("span",{style:{color:"#F92672"}},"=")]),e(`
`),o("span",{class:"line"},[o("span",{style:{color:"#F8F8F2"}},"  "),o("span",{style:{color:"#F92672"}},"|"),o("span",{style:{color:"#F8F8F2"}}," "),o("span",{style:{color:"#A6E22E","text-decoration":"underline"}},"Iterable"),o("span",{style:{color:"#F8F8F2"}},"<"),o("span",{style:{color:"#A6E22E","text-decoration":"underline"}},"K"),o("span",{style:{color:"#F8F8F2"}},">")]),e(`
`),o("span",{class:"line"},[o("span",{style:{color:"#F8F8F2"}},"  "),o("span",{style:{color:"#F92672"}},"|"),o("span",{style:{color:"#F8F8F2"}}," (("),o("span",{style:{color:"#FD971F","font-style":"italic"}},"argv"),o("span",{style:{color:"#F92672"}},":"),o("span",{style:{color:"#F8F8F2"}}," "),o("span",{style:{color:"#A6E22E","text-decoration":"underline"}},"Argv"),o("span",{style:{color:"#F8F8F2"}},", "),o("span",{style:{color:"#FD971F","font-style":"italic"}},"fields"),o("span",{style:{color:"#F92672"}},":"),o("span",{style:{color:"#F8F8F2"}}," "),o("span",{style:{color:"#A6E22E","text-decoration":"underline"}},"Set"),o("span",{style:{color:"#F8F8F2"}},"<"),o("span",{style:{color:"#A6E22E","text-decoration":"underline"}},"K"),o("span",{style:{color:"#F8F8F2"}},">) "),o("span",{style:{color:"#66D9EF","font-style":"italic"}},"=>"),o("span",{style:{color:"#F8F8F2"}}," "),o("span",{style:{color:"#66D9EF","font-style":"italic"}},"void"),o("span",{style:{color:"#F8F8F2"}},")")])])],-1),I=o("h3",{id:"cmd-channelfields",tabindex:"-1"},[o("a",{class:"header-anchor",href:"#cmd-channelfields","aria-hidden":"true"},"#"),e(" cmd.channelFields(fields)")],-1),j=o("ul",null,[o("li",null,[o("strong",null,"fields:"),e(),o("code",null,"FieldCollector<ChannelField>"),e(" \u8981\u8BF7\u6C42\u7684\u9891\u9053\u5B57\u6BB5")]),o("li",null,[e("\u8FD4\u56DE\u503C: "),o("code",null,"this")])],-1),q=s('<h3 id="cmd-alias" tabindex="-1"><a class="header-anchor" href="#cmd-alias" aria-hidden="true">#</a> cmd.alias(...names)</h3><ul><li><strong>names:</strong> <code>string[]</code> \u8981\u8BBE\u7F6E\u7684\u522B\u540D</li><li>\u8FD4\u56DE\u503C: <code>this</code></li></ul><p>\u8BBE\u7F6E\u6307\u4EE4\u522B\u540D\u3002</p><h3 id="cmd-shortcut" tabindex="-1"><a class="header-anchor" href="#cmd-shortcut" aria-hidden="true">#</a> cmd.shortcut(name, config?)</h3><ul><li><strong>name:</strong> <code>string | RegExp</code> \u5FEB\u6377\u65B9\u5F0F\u540D</li><li><strong>config:</strong> <code>ShortcutConfig</code><ul><li><strong>config.prefix:</strong> <code>boolean</code> \u8C03\u7528\u65F6\u8981\u6C42\u4FDD\u7559\u524D\u7F00</li><li><strong>config.fuzzy:</strong> <code>boolean</code> \u5141\u8BB8\u5728\u5FEB\u6377\u65B9\u5F0F\u540E\u5E26\u53C2\u6570</li><li><strong>config.greedy:</strong> <code>boolean</code> \u5C06\u6240\u6709\u540E\u9762\u7684\u5185\u5BB9\u89E3\u6790\u6210\u4E00\u4E2A\u53C2\u6570</li><li><strong>config.args:</strong> <code>any[]</code> \u8981\u5E26\u7684\u53C2\u6570\u5217\u8868\uFF0C\u5C06\u4E0E\u4F20\u5165\u7684\u53C2\u6570\u5408\u5E76</li><li><strong>config.options:</strong> <code>Record&lt;string, any&gt;</code> \u8981\u5E26\u7684\u9009\u9879\u5217\u8868\uFF0C\u5C06\u4E0E\u4F20\u5165\u7684\u9009\u9879\u5408\u5E76</li></ul></li><li>\u8FD4\u56DE\u503C: <code>this</code></li></ul><p>\u8BBE\u7F6E\u5FEB\u6377\u65B9\u5F0F\u3002</p><h3 id="cmd-subcommand" tabindex="-1"><a class="header-anchor" href="#cmd-subcommand" aria-hidden="true">#</a> cmd.subcommand(name, desc?, config?)</h3>',7),G=o("li",null,[o("strong",null,"name:"),e(),o("code",null,"string"),e(" \u6307\u4EE4\u540D\u4EE5\u53CA\u53EF\u80FD\u7684\u53C2\u6570")],-1),H=o("li",null,[o("strong",null,"desc:"),e(),o("code",null,"string"),e(" \u6307\u4EE4\u7684\u63CF\u8FF0")],-1),J=o("strong",null,"config:",-1),M=o("code",null,"CommandConfig",-1),Q=o("li",null,[e("\u8FD4\u56DE\u503C\uFF1A"),o("code",null,"Command"),e(" \u6CE8\u518C\u6216\u4FEE\u6539\u7684\u6307\u4EE4")],-1),W=s('<h3 id="cmd-parse" tabindex="-1"><a class="header-anchor" href="#cmd-parse" aria-hidden="true">#</a> cmd.parse(input)</h3><ul><li><strong>input:</strong> <code>Argv</code> \u4EE4\u724C\u5316\u7684\u8F93\u5165\uFF0C\u901A\u5E38\u662F <code>Argv.parse()</code> \u7684\u8FD4\u56DE\u503C</li><li>\u8FD4\u56DE\u503C: <code>Argv</code> \u89E3\u6790\u7ED3\u679C\uFF0C\u5305\u542B\u4E86 <code>args</code> \u548C <code>options</code> \u7B49\u5C5E\u6027</li></ul><p>\u89E3\u6790\u4E00\u6BB5\u6307\u4EE4\u8C03\u7528\u6587\u672C\u3002</p><h3 id="cmd-execute" tabindex="-1"><a class="header-anchor" href="#cmd-execute" aria-hidden="true">#</a> cmd.execute(argv, next?)</h3>',4),X=o("strong",null,"argv:",-1),Y=o("code",null,"Argv",-1),Z=o("li",null,[o("strong",null,"argv.args:"),e(),o("code",null,"any[]"),e(" \u6307\u4EE4\u7684\u53C2\u6570\u5217\u8868")],-1),$=o("li",null,[o("strong",null,"argv.options:"),e(),o("code",null,"Record<string, any>"),e(" \u6307\u4EE4\u7684\u9009\u9879")],-1),oo=o("strong",null,"argv.session:",-1),eo=o("code",null,"Session",-1),lo=o("strong",null,"next:",-1),no=o("code",null,"Next",-1),to=o("code",null,"next",-1),so=o("li",null,[e("\u8FD4\u56DE\u503C: "),o("code",null,"Promise<string>"),e(" \u6267\u884C\u51FD\u6570\u7684\u8FD4\u56DE\u7ED3\u679C\uFF0C\u53EF\u7528\u4E8E\u6307\u4EE4\u63D2\u503C")],-1),co=s('<p>\u6267\u884C\u5F53\u524D\u6307\u4EE4\u3002</p><h3 id="cmd-dispose" tabindex="-1"><a class="header-anchor" href="#cmd-dispose" aria-hidden="true">#</a> cmd.dispose()</h3><ul><li>\u8FD4\u56DE\u503C: <code>void</code></li></ul><p>\u79FB\u9664\u5F53\u524D\u6307\u4EE4\u53CA\u5176\u6240\u6709\u5B50\u6307\u4EE4\u3002</p><h2 id="\u9759\u6001\u5C5E\u6027\u548C\u65B9\u6CD5" tabindex="-1"><a class="header-anchor" href="#\u9759\u6001\u5C5E\u6027\u548C\u65B9\u6CD5" aria-hidden="true">#</a> \u9759\u6001\u5C5E\u6027\u548C\u65B9\u6CD5</h2><p>\u8FD9\u91CC\u5305\u542B\u4E86\u4E0E Command \u7C7B\u76F8\u5173\u7684\u9759\u6001\u5C5E\u6027\u548C\u65B9\u6CD5\u3002</p><h3 id="command-defaultconfig" tabindex="-1"><a class="header-anchor" href="#command-defaultconfig" aria-hidden="true">#</a> Command.defaultConfig</h3><p>\u9ED8\u8BA4\u7684\u6307\u4EE4\u914D\u7F6E\u3002</p><h3 id="command-defaultoptionconfig" tabindex="-1"><a class="header-anchor" href="#command-defaultoptionconfig" aria-hidden="true">#</a> Command.defaultOptionConfig</h3><p>\u9ED8\u8BA4\u7684\u9009\u9879\u914D\u7F6E\u3002</p>',10);function ao(io,ro){const t=a("RouterLink"),c=a("panel-view");return d(),r("div",null,[p,o("ul",null,[u,o("li",null,[h,e(),l(t,{to:"/api/core/session.html"},{default:n(()=>[y]),_:1}),e(" \u6240\u5728\u7684\u4F1A\u8BDD\u5BF9\u8C61")])]),g,m,o("ul",null,[E,_,o("li",null,[f,e(),x,o("ul",null,[o("li",null,[A,e(),B,e(" \u9009\u9879\u7684"),l(t,{to:"/guide/command.html#%E9%80%89%E9%A1%B9%E7%9A%84%E9%BB%98%E8%AE%A4%E5%80%BC"},{default:n(()=>[e("\u9ED8\u8BA4\u503C")]),_:1})]),o("li",null,[b,e(),D,e(" \u9009\u9879\u7684"),l(t,{to:"/guide/command.html#%E9%80%89%E9%A1%B9%E7%9A%84%E9%87%8D%E8%BD%BD"},{default:n(()=>[e("\u91CD\u8F7D\u503C")]),_:1})]),o("li",null,[v,e(),C,e(" \u9009\u9879\u7684"),l(t,{to:"/guide/command.html#%E9%80%89%E9%A1%B9%E7%9A%84%E4%B8%B4%E6%97%B6%E7%B1%BB%E5%9E%8B"},{default:n(()=>[e("\u7C7B\u578B\u5B9A\u4E49")]),_:1})]),o("li",null,[k,e(),T,e(" \u662F\u5426"),l(t,{to:"/guide/help.html#%E9%9A%90%E8%97%8F%E6%8C%87%E4%BB%A4%E5%92%8C%E9%80%89%E9%A1%B9"},{default:n(()=>[e("\u9690\u85CF\u9009\u9879")]),_:1})]),o("li",null,[w,e(),N,e(" \u662F\u5426"),l(t,{to:"/guide/manage.html#%E6%8C%87%E4%BB%A4%E8%B0%83%E7%94%A8%E7%AE%A1%E7%90%86"},{default:n(()=>[e("\u8BA1\u5165\u8C03\u7528")]),_:1})]),o("li",null,[R,e(),S,e(" \u9009\u9879\u7684"),l(t,{to:"/guide/manage.html#%E8%AE%BE%E7%BD%AE%E8%B0%83%E7%94%A8%E6%9D%83%E9%99%90"},{default:n(()=>[e("\u6743\u9650\u7B49\u7EA7")]),_:1})])])]),K]),V,l(c,{class:"code",title:"",style:{}},{default:n(()=>[O]),_:1}),P,l(c,{class:"code",title:"",style:{}},{default:n(()=>[z]),_:1}),L,o("p",null,[e("\u5982\u679C\u6307\u4EE4\u9700\u8981\u7528\u5230\u7528\u6237\u6570\u636E\uFF0C\u4F60\u53EF\u4EE5\u63D0\u524D\u58F0\u660E\uFF0C\u8FD9\u6837\u6709\u52A9\u4E8E\u5408\u5E76\u591A\u6B21\u8BF7\u6C42\uFF0C\u4ECE\u800C\u63D0\u9AD8\u6027\u80FD\u3002 \u53C2\u89C1"),l(t,{to:"/guide/manage.html#%E5%A3%B0%E6%98%8E%E6%89%80%E9%9C%80%E5%AD%97%E6%AE%B5"},{default:n(()=>[e("\u6309\u9700\u52A0\u8F7D")]),_:1}),e("\u7AE0\u8282\u3002")]),l(c,{class:"code",title:"",style:{}},{default:n(()=>[U]),_:1}),I,j,o("p",null,[e("\u5982\u679C\u6307\u4EE4\u9700\u8981\u7528\u5230\u9891\u9053\u6570\u636E\uFF0C\u4F60\u53EF\u4EE5\u63D0\u524D\u58F0\u660E\uFF0C\u8FD9\u6837\u6709\u52A9\u4E8E\u5408\u5E76\u591A\u6B21\u8BF7\u6C42\uFF0C\u4ECE\u800C\u63D0\u9AD8\u6027\u80FD\u3002 \u53C2\u89C1"),l(t,{to:"/guide/manage.html#%E5%A3%B0%E6%98%8E%E6%89%80%E9%9C%80%E5%AD%97%E6%AE%B5"},{default:n(()=>[e("\u6309\u9700\u52A0\u8F7D")]),_:1}),e("\u7AE0\u8282\u3002")]),q,o("ul",null,[G,H,o("li",null,[J,e(),l(t,{to:"/api/core/context.html#ctx-command"},{default:n(()=>[M]),_:1}),e(" \u6307\u4EE4\u7684\u914D\u7F6E")]),Q]),o("p",null,[e("\u6CE8\u518C\u6216\u4FEE\u6539\u5B50\u6307\u4EE4\u3002\u5B50\u6307\u4EE4\u4F1A\u7EE7\u627F\u5F53\u671F\u6307\u4EE4\u7684\u4E0A\u4E0B\u6587\u3002\u53C2\u89C1"),l(t,{to:"/guide/help.html#%E6%8C%87%E4%BB%A4%E7%9A%84%E5%A4%9A%E7%BA%A7%E7%BB%93%E6%9E%84"},{default:n(()=>[e("\u6307\u4EE4\u7684\u591A\u7EA7\u7ED3\u6784")]),_:1}),e("\u7AE0\u8282\u3002")]),W,o("ul",null,[o("li",null,[X,e(),Y,e(" \u6267\u884C\u914D\u7F6E "),o("ul",null,[Z,$,o("li",null,[oo,e(),l(t,{to:"/api/core/session.html"},{default:n(()=>[eo]),_:1}),e(" \u5F53\u524D\u7684\u4F1A\u8BDD\u5BF9\u8C61")])])]),o("li",null,[lo,e(),l(t,{to:"/guide/message.html#%E4%BD%BF%E7%94%A8%E4%B8%AD%E9%97%B4%E4%BB%B6"},{default:n(()=>[no]),_:1}),e(" \u6240\u5904\u7684\u4E2D\u95F4\u4EF6\u7684 "),to,e(" \u56DE\u8C03\u51FD\u6570")]),so]),co])}const po=i(F,[["render",ao],["__file","command.html.vue"]]);export{po as default};