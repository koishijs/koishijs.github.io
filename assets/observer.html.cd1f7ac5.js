import{_ as e,o as r,c as d,e as a}from"./app.d641dd0e.js";const o={},t=a('<h1 id="\u89C2\u5BDF\u8005" tabindex="-1"><a class="header-anchor" href="#\u89C2\u5BDF\u8005" aria-hidden="true">#</a> \u89C2\u5BDF\u8005 (Observer)</h1><h2 id="observe" tabindex="-1"><a class="header-anchor" href="#observe" aria-hidden="true">#</a> observe(target, update?, label?)</h2><ul><li><strong>target:</strong> <code>T extends object</code> \u8981\u89C2\u6D4B\u7684\u5BF9\u8C61</li><li><strong>update:</strong> <code>(diff: Partial&lt;T&gt;) =&gt; R</code> \u66F4\u65B0\u56DE\u8C03\u51FD\u6570</li><li><strong>label:</strong> <code>string</code> \u5BF9\u8C61\u7684\u6807\u7B7E\uFF0C\u7528\u4E8E\u6807\u8BC6</li><li>\u8FD4\u56DE\u503C: <code>Observed&lt;T&gt;</code></li></ul><p>\u521B\u5EFA\u4E00\u4E2A\u89C2\u5BDF\u8005\u5BF9\u8C61\u3002\u76EE\u524D\u53EA\u652F\u6301\u4ECE\u666E\u901A\u5BF9\u8C61\u521B\u5EFA\uFF08\u4E0D\u652F\u6301 Array / Set / Map\uFF09\u3002</p><h2 id="observed-diff" tabindex="-1"><a class="header-anchor" href="#observed-diff" aria-hidden="true">#</a> observed.$diff</h2><p>\u89C2\u5BDF\u8005\u5F53\u524D\u7684\u5BF9\u8C61\u53D8\u5316\u3002</p><h2 id="observed-merge" tabindex="-1"><a class="header-anchor" href="#observed-merge" aria-hidden="true">#</a> observed.$merge(source)</h2><ul><li><strong>source:</strong> <code>object</code> \u8981\u5408\u5E76\u7684\u5BF9\u8C61</li><li>\u8FD4\u56DE\u503C: <code>this</code></li></ul><p>\u5C06\u67D0\u4E9B\u5C5E\u6027\u5408\u5E76\u5165\u5F53\u524D\u89C2\u5BDF\u8005\uFF0C\u4E0D\u4F1A\u89E6\u53D1 diff \u66F4\u65B0\u3002</p><h2 id="observed-update" tabindex="-1"><a class="header-anchor" href="#observed-update" aria-hidden="true">#</a> observed.$update()</h2><ul><li>\u8FD4\u56DE\u503C: <code>R</code></li></ul><p>\u66F4\u65B0\u89C2\u5BDF\u8005\u5BF9\u8C61\uFF0C\u540C\u65F6\u6E05\u9664 diff\u3002</p>',12),s=[t];function i(c,l){return r(),d("div",null,s)}const h=e(o,[["render",i],["__file","observer.html.vue"]]);export{h as default};
