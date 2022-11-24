import{_ as n,r as i,o,c as l,a,b as e,d as r,w as c,e as t}from"./app.d641dd0e.js";const h={},g=t('<h1 id="\u5185\u7F6E\u6570\u636E\u7ED3\u6784" tabindex="-1"><a class="header-anchor" href="#\u5185\u7F6E\u6570\u636E\u7ED3\u6784" aria-hidden="true">#</a> \u5185\u7F6E\u6570\u636E\u7ED3\u6784</h1><p>Koishi \u7684\u6570\u636E\u5E93 API \u5B9E\u9645\u4E0A\u5206\u4E3A\u4E24\u90E8\u5206\uFF1A</p><ul><li>@koishijs/core \u4E2D\u5B9A\u4E49\u7684\u5185\u7F6E\u6570\u636E\u7ED3\u6784</li><li>minato \u4E2D\u63D0\u4F9B\u7684 ORM \u63A5\u53E3</li></ul><p>\u8FD9\u4E00\u9875\u4E2D\u5C06\u4EC5\u5C55\u793A\u7B2C\u4E00\u90E8\u5206\u7684\u5185\u5BB9\u3002</p><h2 id="\u5185\u7F6E\u8868" tabindex="-1"><a class="header-anchor" href="#\u5185\u7F6E\u8868" aria-hidden="true">#</a> \u5185\u7F6E\u8868</h2><h3 id="user" tabindex="-1"><a class="header-anchor" href="#user" aria-hidden="true">#</a> User</h3><ul><li><strong>id:</strong> <code>string</code> \u5185\u90E8\u7F16\u53F7</li><li><strong>name:</strong> <code>string</code> \u7528\u6237\u6635\u79F0</li><li><strong>flag:</strong> <code>number</code> \u72B6\u6001\u6807\u7B7E</li><li><strong>authority:</strong> <code>number</code> \u7528\u6237\u6743\u9650</li></ul><h3 id="channel" tabindex="-1"><a class="header-anchor" href="#channel" aria-hidden="true">#</a> Channel</h3><ul><li><strong>id:</strong> <code>string</code> \u9891\u9053\u6807\u8BC6\u7B26</li><li><strong>flag:</strong> <code>number</code> \u72B6\u6001\u6807\u7B7E</li><li><strong>assignee:</strong> <code>string</code> \u4EE3\u7406\u8005</li></ul><h2 id="\u5168\u5C40\u63A5\u53E3" tabindex="-1"><a class="header-anchor" href="#\u5168\u5C40\u63A5\u53E3" aria-hidden="true">#</a> \u5168\u5C40\u63A5\u53E3</h2><h3 id="user-flag-channel-flag" tabindex="-1"><a class="header-anchor" href="#user-flag-channel-flag" aria-hidden="true">#</a> User.Flag, Channel.Flag</h3>',11),u=t('<h2 id="\u5185\u7F6E\u5B9E\u4F8B\u65B9\u6CD5" tabindex="-1"><a class="header-anchor" href="#\u5185\u7F6E\u5B9E\u4F8B\u65B9\u6CD5" aria-hidden="true">#</a> \u5185\u7F6E\u5B9E\u4F8B\u65B9\u6CD5</h2><p>\u4E0B\u5217\u5B9E\u4F8B\u65B9\u6CD5\u76F4\u63A5\u7531 @koishijs/core \u63D0\u4F9B\u5B9E\u73B0\u3002</p><h3 id="database-getuser" tabindex="-1"><a class="header-anchor" href="#database-getuser" aria-hidden="true">#</a> database.getUser(platform, id, modifier?)</h3><ul><li><strong>platform:</strong> <code>string</code> \u5E73\u53F0\u540D</li><li><strong>id:</strong> <code>string | string[]</code> \u7528\u6237\u6807\u8BC6\u7B26</li><li><strong>modifier:</strong> <code>QueryModifier&lt;User.Field&gt;</code> \u8BF7\u6C42\u4FEE\u9970\u7B26</li><li>\u8FD4\u56DE\u503C: <code>Promise&lt;User | User[]&gt;</code> \u7528\u6237\u6570\u636E</li></ul><p>\u5411\u6570\u636E\u5E93\u8BF7\u6C42\u7528\u6237\u6570\u636E\u3002\u5982\u679C\u4F20\u5165\u7684 id \u662F\u4E00\u4E2A\u5217\u8868\uFF0C\u5219\u8FD4\u56DE\u503C\u4E5F\u5E94\u5F53\u662F\u4E00\u4E2A\u5217\u8868\u3002</p><h3 id="database-setuser" tabindex="-1"><a class="header-anchor" href="#database-setuser" aria-hidden="true">#</a> database.setUser(platform, id, data)</h3><ul><li><strong>platform:</strong> <code>string</code> \u5E73\u53F0\u540D</li><li><strong>id:</strong> <code>string</code> \u7528\u6237\u6807\u8BC6\u7B26</li><li><strong>data:</strong> <code>User</code> \u8981\u4FEE\u6539 / \u6DFB\u52A0\u7684\u6570\u636E</li><li>\u8FD4\u56DE\u503C: <code>Promise&lt;void&gt;</code></li></ul><p>\u5411\u6570\u636E\u5E93\u4FEE\u6539\u6216\u6DFB\u52A0\u7528\u6237\u6570\u636E\u3002</p><h3 id="database-getchannel" tabindex="-1"><a class="header-anchor" href="#database-getchannel" aria-hidden="true">#</a> database.getChannel(platform, id, fields?)</h3><ul><li><strong>platform:</strong> <code>string</code> \u5E73\u53F0\u540D</li><li><strong>id:</strong> <code>string | string[]</code> \u9891\u9053\u6807\u8BC6\u7B26</li><li><strong>fields:</strong> <code>QueryModifier&lt;User.Field&gt;</code> \u8BF7\u6C42\u4FEE\u9970\u7B26</li><li>\u8FD4\u56DE\u503C: <code>Promise&lt;Channel | Channel[]&gt;</code> \u9891\u9053\u6570\u636E</li></ul><p>\u5411\u6570\u636E\u5E93\u8BF7\u6C42\u9891\u9053\u6570\u636E\u3002\u5982\u679C\u4F20\u5165\u7684 id \u662F\u4E00\u4E2A\u5217\u8868\uFF0C\u5219\u8FD4\u56DE\u503C\u4E5F\u5E94\u5F53\u662F\u4E00\u4E2A\u5217\u8868\u3002</p>',11),f={id:"database-getassignedchannels",tabindex:"-1"},b=a("a",{class:"header-anchor",href:"#database-getassignedchannels","aria-hidden":"true"},"#",-1),p=t('<ul><li><strong>fields:</strong> <code>ChannelField[]</code> \u8BF7\u6C42\u7684\u5B57\u6BB5\uFF0C\u9ED8\u8BA4\u4E3A\u5168\u90E8\u5B57\u6BB5</li><li><strong>platform:</strong> <code>string</code> \u5E73\u53F0\u540D\uFF0C\u9ED8\u8BA4\u4E3A\u5168\u5E73\u53F0</li><li><strong>assignees:</strong> <code>string[]</code> \u4EE3\u7406\u8005\u5217\u8868\uFF0C\u9ED8\u8BA4\u4E3A\u5F53\u524D\u8FD0\u884C\u7684\u5168\u90E8\u673A\u5668\u4EBA</li><li>\u8FD4\u56DE\u503C: <code>Promise&lt;Channel[]&gt;</code> \u9891\u9053\u6570\u636E\u5217\u8868</li></ul><p>\u5411\u6570\u636E\u5E93\u8BF7\u6C42\u88AB\u7279\u5B9A\u673A\u5668\u4EBA\u7BA1\u7406\u7684\u6240\u6709\u9891\u9053\u6570\u636E\u3002\u8FD9\u91CC\u7684\u4E24\u4E2A\u53C2\u6570\u53EF\u4EE5\u5199\u4EFB\u610F\u4E00\u4E2A\uFF0C\u90FD\u53EF\u4EE5\u8BC6\u522B\u3002</p><h3 id="database-setchannel" tabindex="-1"><a class="header-anchor" href="#database-setchannel" aria-hidden="true">#</a> database.setChannel(platform, id, data)</h3><ul><li><strong>platform:</strong> <code>string</code> \u5E73\u53F0\u540D</li><li><strong>id:</strong> <code>number</code> \u9891\u9053\u6807\u8BC6\u7B26</li><li><strong>data:</strong> <code>Channel</code> \u8981\u4FEE\u6539 / \u6DFB\u52A0\u7684\u6570\u636E</li><li>\u8FD4\u56DE\u503C: <code>Promise&lt;void&gt;</code></li></ul><p>\u5411\u6570\u636E\u5E93\u4FEE\u6539\u6216\u6DFB\u52A0\u9891\u9053\u6570\u636E\u3002</p>',5);function m(_,x){const d=i("RouterLink"),s=i("Badge");return o(),l("div",null,[g,a("p",null,[e("\u6240\u6709\u7528\u6237 / \u9891\u9053\u72B6\u6001\u6807\u7B7E\u6784\u6210\u7684\u679A\u4E3E\u7C7B\u578B\u3002\u53C2\u89C1 "),r(d,{to:"/guide/database/builtin.html#%E7%8A%B6%E6%80%81%E6%A0%87%E7%AD%BE"},{default:c(()=>[e("\u72B6\u6001\u6807\u7B7E")]),_:1}),e("\u3002")]),u,a("h3",f,[b,e(" database.getAssignedChannels(fields?, platform?, assignees?) "),r(s,{type:"danger",text:"deprecated"})]),p])}const U=n(h,[["render",m],["__file","built-in.html.vue"]]);export{U as default};