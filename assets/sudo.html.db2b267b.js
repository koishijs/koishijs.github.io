import{_ as c,r as n,o as t,c as d,d as l,w as a,e as r,a as s,b as e}from"./app.d641dd0e.js";const i={},u=r('<h1 id="\u6A21\u62DF\u8C03\u7528" tabindex="-1"><a class="header-anchor" href="#\u6A21\u62DF\u8C03\u7528" aria-hidden="true">#</a> \u6A21\u62DF\u8C03\u7528 (Sudo)</h1><h2 id="\u6307\u4EE4\uFF1Asudo" tabindex="-1"><a class="header-anchor" href="#\u6307\u4EE4\uFF1Asudo" aria-hidden="true">#</a> \u6307\u4EE4\uFF1Asudo</h2><ul><li>\u57FA\u672C\u8BED\u6CD5\uFF1A<code>sudo &lt;command&gt;</code></li><li>\u6700\u4F4E\u6743\u9650\uFF1A3</li><li>\u9009\u9879\uFF1A <ul><li><code>-u, --user [@user]</code> \u76EE\u6807\u7528\u6237\uFF08\u79C1\u804A\uFF09</li><li><code>-m, --member [@user]</code> \u76EE\u6807\u7528\u6237\uFF08\u7FA4\u804A\uFF09</li><li><code>-c, --channel [#channel]</code> \u76EE\u6807\u9891\u9053</li></ul></li></ul><p>sudo \u6307\u4EE4\u5141\u8BB8\u4F60\u6A21\u62DF\u5176\u4ED6\u7528\u6237\u8C03\u7528\u6307\u4EE4\u3002\u4F8B\u5982\u5F53\u4F60\u5728\u79C1\u804A\u4E0A\u4E0B\u6587\u65F6\uFF1A</p>',4),p=s("pre",{class:"shiki",style:{"background-color":"#272822"}},[s("code",null,[s("span",{class:"line"},[s("span",{style:{color:"#F8F8F2"}},"teach foo bar                       "),s("span",{style:{color:"#88846F"}},"# \u65E0\u6548\uFF0C\u56E0\u4E3A teach \u6307\u4EE4\u53EA\u5BF9\u7FA4\u4E0A\u4E0B\u6587\u751F\u6548")]),e(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F8F8F2"}},"sudo -g "),s("span",{style:{color:"#88846F"}},"#456 teach foo bar          # \u6709\u6548\uFF0C\u76F8\u5F53\u4E8E\u5728\u7FA4 456 \u8C03\u7528 teach foo bar")])])],-1),F=s("p",null,"\u9664\u6B64\u4EE5\u5916\uFF0C\u4F60\u8FD8\u53EF\u4EE5\u6A21\u62DF\u5728\u5176\u4ED6\u9891\u9053\u4E2D\u8C03\u7528\uFF08\u5047\u8BBE\u4F60\u73B0\u5728\u5728\u9891\u9053 123 \u4E2D\u8C03\u7528\u6307\u4EE4\uFF09\uFF1A",-1),h=s("pre",{class:"shiki",style:{"background-color":"#272822"}},[s("code",null,[s("span",{class:"line"},[s("span",{style:{color:"#F8F8F2"}},"sudo -g "),s("span",{style:{color:"#88846F"}},"#456 command                # \u6A21\u62DF\u4F60\u5728\u7FA4 456 \u7684\u4E0A\u4E0B\u6587")]),e(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F8F8F2"}},"sudo -u @789 "),s("span",{style:{color:"#66D9EF"}},"command"),s("span",{style:{color:"#F8F8F2"}},"                "),s("span",{style:{color:"#88846F"}},"# \u6A21\u62DF\u7528\u6237 789 \u7684\u79C1\u804A\u4E0A\u4E0B\u6587")]),e(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F8F8F2"}},"sudo -m @789 "),s("span",{style:{color:"#66D9EF"}},"command"),s("span",{style:{color:"#F8F8F2"}},"                "),s("span",{style:{color:"#88846F"}},"# \u6A21\u62DF\u7528\u6237 789 \u5728\u5F53\u524D\u9891\u9053\u7684\u4E0A\u4E0B\u6587")]),e(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F8F8F2"}},"sudo -u @789 -g "),s("span",{style:{color:"#88846F"}},"#456 command        # \u6A21\u62DF\u7528\u6237 789 \u5728\u9891\u9053 456 \u7684\u4E0A\u4E0B\u6587")])])],-1),_=s("p",null,"\u5C3D\u7BA1\u5207\u6362\u4E86\u8C03\u7528\u4E0A\u4E0B\u6587\uFF0C\u4F46 sudo \u6307\u4EE4\u7684\u8F93\u51FA\u4ECD\u7136\u4EA7\u751F\u5728\u539F\u4E0A\u4E0B\u6587\u4E2D\u3002\u8FD9\u5728\u4F60\u60F3\u8C03\u7528\u7FA4\u6307\u4EE4\u7684\u65F6\u5019\u662F\u5F88\u6709\u7528\u7684\u3002",-1),m=s("div",{class:"custom-container tip"},[s("p",{class:"custom-container-title"},"\u63D0\u793A"),s("p",null,"\u4E3A\u4E86\u5B89\u5168\u6027\u8003\u8651\uFF0Csudo \u547D\u4EE4\u8BBE\u8BA1\u7684\u6700\u4F4E\u4F7F\u7528\u6743\u9650\u4E3A 3 \u7EA7\uFF0C\u540C\u65F6\u5207\u6362\u7684\u7528\u6237\u7B49\u7EA7\u4E0D\u80FD\u9AD8\u4E8E\u6216\u7B49\u4E8E\u8C03\u7528\u8005\u81EA\u8EAB\u3002")],-1);function y(f,b){const o=n("panel-view");return t(),d("div",null,[u,l(o,{class:"code",title:"",style:{}},{default:a(()=>[p]),_:1}),F,l(o,{class:"code",title:"",style:{}},{default:a(()=>[h]),_:1}),_,m])}const g=c(i,[["render",y],["__file","sudo.html.vue"]]);export{g as default};
