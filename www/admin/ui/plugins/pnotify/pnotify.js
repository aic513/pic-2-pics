/*
PNotify 2.2.0 sciactive.com/pnotify/
(C) 2015 Hunter Perrin; Google, Inc.
license Apache-2.0
*/
(function(c,g){"function"===typeof define&&define.amd?(define("pnotify-root",function(){return c}),define("pnotify",["jquery","pnotify-root"],g)):"object"===typeof exports&&"undefined"!==typeof module?module.exports=g(require("jquery"),global||c):c.PNotify=g(c.jQuery,c)})(this,function(c,g){var q={dir1:"down",dir2:"left",push:"bottom",spacing1:36,spacing2:36,context:c("body")},h,k,m=c(g),p=function(){k=c("body");e.prototype.options.stack.context=k;m=c(g);m.bind("resize",function(){h&&clearTimeout(h);
h=setTimeout(function(){e.positionAll(!0)},10)})},e=function(b){this.parseOptions(b);this.init()};c.extend(e.prototype,{version:"2.2.0",options:{title:!1,title_escape:!1,text:!1,text_escape:!1,styling:"brighttheme",addclass:"",cornerclass:"",auto_display:!0,width:"300px",min_height:"16px",type:"notice",icon:!0,animation:"fade",animate_speed:"normal",shadow:!0,hide:!0,delay:8E3,mouse_reset:!0,remove:!0,insert_brs:!0,destroy:!0,stack:q},modules:{},runModules:function(b,a){var d,c;for(c in this.modules)d=
"object"===typeof a&&c in a?a[c]:a,"function"===typeof this.modules[c][b]&&(this.modules[c].notice=this,this.modules[c].options="object"===typeof this.options[c]?this.options[c]:{},this.modules[c][b](this,"object"===typeof this.options[c]?this.options[c]:{},d))},state:"initializing",timer:null,styles:null,elem:null,container:null,title_container:null,text_container:null,animating:!1,timerHide:!1,init:function(){var b=this;this.modules={};c.extend(!0,this.modules,e.prototype.modules);this.styles="object"===
typeof this.options.styling?this.options.styling:e.styling[this.options.styling];this.elem=c("<div />",{"class":"ui-pnotify "+this.options.addclass,css:{display:"none"},"aria-live":"assertive","aria-role":"alertdialog",mouseenter:function(a){if(b.options.mouse_reset&&"out"===b.animating){if(!b.timerHide)return;b.cancelRemove()}b.options.hide&&b.options.mouse_reset&&b.cancelRemove()},mouseleave:function(a){b.options.hide&&b.options.mouse_reset&&"out"!==b.animating&&b.queueRemove();e.positionAll()}});
"fade"===this.options.animation&&this.elem.addClass("ui-pnotify-fade-"+this.options.animate_speed);this.container=c("<div />",{"class":this.styles.container+" ui-pnotify-container "+("error"===this.options.type?this.styles.error:"info"===this.options.type?this.styles.info:"success"===this.options.type?this.styles.success:this.styles.notice),role:"alert"}).appendTo(this.elem);""!==this.options.cornerclass&&this.container.removeClass("ui-corner-all").addClass(this.options.cornerclass);this.options.shadow&&
this.container.addClass("ui-pnotify-shadow");!1!==this.options.icon&&c("<div />",{"class":"ui-pnotify-icon"}).append(c("<span />",{"class":!0===this.options.icon?"error"===this.options.type?this.styles.error_icon:"info"===this.options.type?this.styles.info_icon:"success"===this.options.type?this.styles.success_icon:this.styles.notice_icon:this.options.icon})).prependTo(this.container);this.title_container=c("<h4 />",{"class":"ui-pnotify-title"}).appendTo(this.container);!1===this.options.title?this.title_container.hide():
this.options.title_escape?this.title_container.text(this.options.title):this.title_container.html(this.options.title);this.text_container=c("<div />",{"class":"ui-pnotify-text","aria-role":"alert"}).appendTo(this.container);!1===this.options.text?this.text_container.hide():this.options.text_escape?this.text_container.text(this.options.text):this.text_container.html(this.options.insert_brs?String(this.options.text).replace(/\n/g,"<br />"):this.options.text);"string"===typeof this.options.width&&this.elem.css("width",
this.options.width);"string"===typeof this.options.min_height&&this.container.css("min-height",this.options.min_height);e.notices="top"===this.options.stack.push?c.merge([this],e.notices):c.merge(e.notices,[this]);"top"===this.options.stack.push&&this.queuePosition(!1,1);this.options.stack.animation=!1;this.runModules("init");this.options.auto_display&&this.open();return this},update:function(b){var a=this.options;this.parseOptions(a,b);this.elem.removeClass("ui-pnotify-fade-slow ui-pnotify-fade-normal ui-pnotify-fade-fast");
"fade"===this.options.animation&&this.elem.addClass("ui-pnotify-fade-"+this.options.animate_speed);this.options.cornerclass!==a.cornerclass&&this.container.removeClass("ui-corner-all "+a.cornerclass).addClass(this.options.cornerclass);this.options.shadow!==a.shadow&&(this.options.shadow?this.container.addClass("ui-pnotify-shadow"):this.container.removeClass("ui-pnotify-shadow"));!1===this.options.addclass?this.elem.removeClass(a.addclass):this.options.addclass!==a.addclass&&this.elem.removeClass(a.addclass).addClass(this.options.addclass);
!1===this.options.title?this.title_container.slideUp("fast"):this.options.title!==a.title&&(this.options.title_escape?this.title_container.text(this.options.title):this.title_container.html(this.options.title),!1===a.title&&this.title_container.slideDown(200));!1===this.options.text?this.text_container.slideUp("fast"):this.options.text!==a.text&&(this.options.text_escape?this.text_container.text(this.options.text):this.text_container.html(this.options.insert_brs?String(this.options.text).replace(/\n/g,
"<br />"):this.options.text),!1===a.text&&this.text_container.slideDown(200));this.options.type!==a.type&&this.container.removeClass(this.styles.error+" "+this.styles.notice+" "+this.styles.success+" "+this.styles.info).addClass("error"===this.options.type?this.styles.error:"info"===this.options.type?this.styles.info:"success"===this.options.type?this.styles.success:this.styles.notice);if(this.options.icon!==a.icon||!0===this.options.icon&&this.options.type!==a.type)this.container.find("div.ui-pnotify-icon").remove(),
!1!==this.options.icon&&c("<div />",{"class":"ui-pnotify-icon"}).append(c("<span />",{"class":!0===this.options.icon?"error"===this.options.type?this.styles.error_icon:"info"===this.options.type?this.styles.info_icon:"success"===this.options.type?this.styles.success_icon:this.styles.notice_icon:this.options.icon})).prependTo(this.container);this.options.width!==a.width&&this.elem.animate({width:this.options.width});this.options.min_height!==a.min_height&&this.container.animate({minHeight:this.options.min_height});
this.options.hide?a.hide||this.queueRemove():this.cancelRemove();this.queuePosition(!0);this.runModules("update",a);return this},open:function(){this.state="opening";this.runModules("beforeOpen");var b=this;this.elem.parent().length||this.elem.appendTo(this.options.stack.context?this.options.stack.context:k);"top"!==this.options.stack.push&&this.position(!0);this.animateIn(function(){b.queuePosition(!0);b.options.hide&&b.queueRemove();b.state="open";b.runModules("afterOpen")});return this},remove:function(b){this.state=
"closing";this.timerHide=!!b;this.runModules("beforeClose");var a=this;this.timer&&(g.clearTimeout(this.timer),this.timer=null);this.animateOut(function(){a.state="closed";a.runModules("afterClose");a.queuePosition(!0);a.options.remove&&a.elem.detach();a.runModules("beforeDestroy");if(a.options.destroy&&null!==e.notices){var b=c.inArray(a,e.notices);-1!==b&&e.notices.splice(b,1)}a.runModules("afterDestroy")});return this},get:function(){return this.elem},parseOptions:function(b,a){this.options=c.extend(!0,
{},e.prototype.options);this.options.stack=e.prototype.options.stack;for(var d=[b,a],l,n=0;n<d.length;n++){l=d[n];if("undefined"==typeof l)break;if("object"!==typeof l)this.options.text=l;else for(var f in l)this.modules[f]?c.extend(!0,this.options[f],l[f]):this.options[f]=l[f]}},animateIn:function(b){this.animating="in";var a=this,d;b=function(){d&&clearTimeout(d);a.elem.is(":visible")&&(this&&this.call(),a.animating=!1)}.bind(b);"fade"===this.options.animation?(this.elem.one("webkitTransitionEnd mozTransitionEnd MSTransitionEnd oTransitionEnd transitionend",
b).addClass("ui-pnotify-in"),this.elem.css("opacity"),this.elem.addClass("ui-pnotify-fade-in"),d=setTimeout(b,650)):(this.elem.addClass("ui-pnotify-in"),b())},animateOut:function(b){this.animating="out";var a=this,d;b=function(){d&&clearTimeout(d);"0"!=a.elem.css("opacity")&&a.elem.is(":visible")||(a.elem.removeClass("ui-pnotify-in"),this&&this.call(),a.animating=!1)}.bind(b);"fade"===this.options.animation?(this.elem.one("webkitTransitionEnd mozTransitionEnd MSTransitionEnd oTransitionEnd transitionend",
b).removeClass("ui-pnotify-fade-in"),d=setTimeout(b,650)):(this.elem.removeClass("ui-pnotify-in"),b())},position:function(b){var a=this.options.stack,d=this.elem;"undefined"===typeof a.context&&(a.context=k);if(a){"number"!==typeof a.nextpos1&&(a.nextpos1=a.firstpos1);"number"!==typeof a.nextpos2&&(a.nextpos2=a.firstpos2);"number"!==typeof a.addpos2&&(a.addpos2=0);var c=!d.hasClass("ui-pnotify-in");if(!c||b){d.addClass("ui-pnotify-move");var e;switch(a.dir1){case "down":e="top";break;case "up":e=
"bottom";break;case "left":e="right";break;case "right":e="left"}b=parseInt(d.css(e).replace(/(?:\..*|[^0-9.])/g,""));isNaN(b)&&(b=0);"undefined"!==typeof a.firstpos1||c||(a.firstpos1=b,a.nextpos1=a.firstpos1);var f;switch(a.dir2){case "down":f="top";break;case "up":f="bottom";break;case "left":f="right";break;case "right":f="left"}b=parseInt(d.css(f).replace(/(?:\..*|[^0-9.])/g,""));isNaN(b)&&(b=0);"undefined"!==typeof a.firstpos2||c||(a.firstpos2=b,a.nextpos2=a.firstpos2);if("down"===a.dir1&&a.nextpos1+
d.height()>(a.context.is(k)?m.height():a.context.prop("scrollHeight"))||"up"===a.dir1&&a.nextpos1+d.height()>(a.context.is(k)?m.height():a.context.prop("scrollHeight"))||"left"===a.dir1&&a.nextpos1+d.width()>(a.context.is(k)?m.width():a.context.prop("scrollWidth"))||"right"===a.dir1&&a.nextpos1+d.width()>(a.context.is(k)?m.width():a.context.prop("scrollWidth")))a.nextpos1=a.firstpos1,a.nextpos2+=a.addpos2+("undefined"===typeof a.spacing2?25:a.spacing2),a.addpos2=0;"number"===typeof a.nextpos2&&(a.animation?
d.css(f,a.nextpos2+"px"):(d.removeClass("ui-pnotify-move"),d.css(f,a.nextpos2+"px"),d.css(f),d.addClass("ui-pnotify-move")));switch(a.dir2){case "down":case "up":d.outerHeight(!0)>a.addpos2&&(a.addpos2=d.height());break;case "left":case "right":d.outerWidth(!0)>a.addpos2&&(a.addpos2=d.width())}"number"===typeof a.nextpos1&&(a.animation?d.css(e,a.nextpos1+"px"):(d.removeClass("ui-pnotify-move"),d.css(e,a.nextpos1+"px"),d.css(e),d.addClass("ui-pnotify-move")));switch(a.dir1){case "down":case "up":a.nextpos1+=
d.height()+("undefined"===typeof a.spacing1?25:a.spacing1);break;case "left":case "right":a.nextpos1+=d.width()+("undefined"===typeof a.spacing1?25:a.spacing1)}}return this}},queuePosition:function(b,a){h&&clearTimeout(h);a||(a=10);h=setTimeout(function(){e.positionAll(b)},a);return this},cancelRemove:function(){this.timer&&g.clearTimeout(this.timer);"closing"===this.state&&(this.state="open",this.animating=!1,this.elem.addClass("ui-pnotify-in"),"fade"===this.options.animation&&this.elem.addClass("ui-pnotify-fade-in"));
return this},queueRemove:function(){var b=this;this.cancelRemove();this.timer=g.setTimeout(function(){b.remove(!0)},isNaN(this.options.delay)?0:this.options.delay);return this}});c.extend(e,{notices:[],removeAll:function(){c.each(e.notices,function(){this.remove&&this.remove(!1)})},positionAll:function(b){h&&clearTimeout(h);h=null;if(e.notices&&e.notices.length)c.each(e.notices,function(){var a=this.options.stack;a&&(a.nextpos1=a.firstpos1,a.nextpos2=a.firstpos2,a.addpos2=0,a.animation=b)}),c.each(e.notices,
function(){this.position()});else{var a=e.prototype.options.stack;a&&(delete a.nextpos1,delete a.nextpos2)}},styling:{brighttheme:{container:"brighttheme",notice:"brighttheme-notice",notice_icon:"brighttheme-icon-notice",info:"brighttheme-info",info_icon:"brighttheme-icon-info",success:"brighttheme-success",success_icon:"brighttheme-icon-success",error:"brighttheme-error",error_icon:"brighttheme-icon-error"},jqueryui:{container:"ui-widget ui-widget-content ui-corner-all",notice:"ui-state-highlight",
notice_icon:"ui-icon ui-icon-info",info:"",info_icon:"ui-icon ui-icon-info",success:"ui-state-default",success_icon:"ui-icon ui-icon-circle-check",error:"ui-state-error",error_icon:"ui-icon ui-icon-alert"},bootstrap3:{container:"alert",notice:"alert-warning",notice_icon:"glyphicon glyphicon-exclamation-sign",info:"alert-info",info_icon:"glyphicon glyphicon-info-sign",success:"alert-success",success_icon:"glyphicon glyphicon-ok-sign",error:"alert-danger",error_icon:"glyphicon glyphicon-warning-sign"}}});
e.styling.fontawesome=c.extend({},e.styling.bootstrap3);c.extend(e.styling.fontawesome,{notice_icon:"fa fa-exclamation-circle",info_icon:"fa fa-info",success_icon:"fa fa-check",error_icon:"fa fa-warning"});g.document.body?p():c(p);return e});