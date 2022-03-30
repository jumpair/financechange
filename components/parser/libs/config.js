function makeMap(e) {
    for (var a = {}, t = e.split(","), r = t.length; r--; ) a[t[r]] = !0;
    return a;
}

var canIUse = wx.canIUse("editor");

module.exports = {
    filter: null,
    highlight: null,
    onText: null,
    blankChar: makeMap(" , ,\t,\r,\n,\f"),
    blockTags: makeMap("address,article,aside,body,center,cite,footer,header,html,nav,section" + (canIUse ? "" : ",caption,pre")),
    ignoreTags: makeMap("area,base,basefont,canvas,command,embed,frame,iframe,input,isindex,keygen,link,map,meta,param,script,source,style,svg,textarea,title,track,use,wbr" + (canIUse ? ",rp" : "")),
    richOnlyTags: makeMap("a,colgroup,fieldset,legend,picture,table,tbody,td,tfoot,th,thead,tr" + (canIUse ? ",bdi,bdo,caption,rt,ruby" : "")),
    selfClosingTags: makeMap("area,base,basefont,br,col,circle,ellipse,embed,frame,hr,img,input,isindex,keygen,line,link,meta,param,path,polygon,rect,source,track,use,wbr"),
    trustAttrs: makeMap("align,alt,app-id,author,autoplay,border,cellpadding,cellspacing,class,color,colspan,controls,data-src,dir,face,height,href,id,ignore,loop,media,muted,name,path,poster,rowspan,size,span,src,start,style,type,unit-id,unitId,width,xmlns"),
    boolAttrs: makeMap("autoplay,controls,ignore,loop,muted"),
    trustTags: makeMap("a,abbr,ad,audio,b,blockquote,br,code,col,colgroup,dd,del,dl,dt,div,em,fieldset,h1,h2,h3,h4,h5,h6,hr,i,img,ins,label,legend,li,ol,p,q,source,span,strong,sub,sup,table,tbody,td,tfoot,th,thead,tr,title,ul,video" + (canIUse ? ",bdi,bdo,caption,pre,rt,ruby" : "")),
    userAgentStyles: {
        a: "color:#366092;word-break:break-all;padding:1.5px 0 1.5px 0",
        address: "font-style:italic",
        big: "display:inline;font-size:1.2em",
        blockquote: "background-color:#f6f6f6;border-left:3px solid #dbdbdb;color:#6c6c6c;padding:5px 0 5px 10px",
        center: "text-align:center",
        cite: "font-style:italic",
        dd: "margin-left:40px",
        img: "max-width:100%",
        mark: "background-color:yellow",
        picture: "max-width:100%",
        pre: "font-family:monospace;white-space:pre;overflow:scroll",
        s: "text-decoration:line-through",
        small: "display:inline;font-size:0.8em",
        u: "text-decoration:underline"
    }
};