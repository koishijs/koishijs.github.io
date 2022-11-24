import{_,r as n,o as d,c,a as e,b as t,d as o,w as r}from"./app.d641dd0e.js";const i={},p=e("h1",{id:"\u5728\u670D\u52A1\u5668\u4E0A\u5B89\u88C5",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#\u5728\u670D\u52A1\u5668\u4E0A\u5B89\u88C5","aria-hidden":"true"},"#"),t(" \u5728\u670D\u52A1\u5668\u4E0A\u5B89\u88C5")],-1),l={class:"custom-container tip"},h=e("p",{class:"custom-container-title"},"TIP",-1),u=e("h2",{id:"\u4F7F\u7528-nginx",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#\u4F7F\u7528-nginx","aria-hidden":"true"},"#"),t(" \u4F7F\u7528 nginx")],-1),x=e("p",null,"\u4E0B\u9762\u7ED9\u51FA\u4E00\u6BB5 nginx \u914D\u7F6E\u4F5C\u4E3A\u53C2\u8003\uFF1A",-1),m=e("pre",null,[e("code",null,`# http://nginx.org/en/docs/http/websocket.html
map $http_upgrade $connection_upgrade {
  default upgrade;
  '' close;
}

server {
  # server_name, port, ssl \u7B49\u8BBE\u7F6E

  location / {
    # \u8FD9\u91CC\u7684 8080 \u5BF9\u5E94 Koishi \u5B9E\u4F8B\u7684\u7AEF\u53E3
    proxy_pass http://127.0.0.1:8080/;
    proxy_redirect off;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header Host $http_host;
    proxy_read_timeout 300s;
    proxy_send_timeout 300s;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection $connection_upgrade;
  }
}
`)],-1);function f(g,y){const s=n("RouterLink"),a=n("panel-view");return d(),c("div",null,[p,e("div",l,[h,e("p",null,[t("\u5982\u679C\u60F3\u4E86\u89E3\u5176\u4ED6\u5B89\u88C5\u65B9\u5F0F\uFF0C\u8BF7\u79FB\u6B65 "),o(s,{to:"/manual/starter/"},{default:r(()=>[t("\u9009\u62E9\u5B89\u88C5\u65B9\u5F0F")]),_:1}),t("\u3002")])]),u,x,o(a,{class:"code",title:"",style:{}},{default:r(()=>[m]),_:1})])}const w=_(i,[["render",f],["__file","server.html.vue"]]);export{w as default};
