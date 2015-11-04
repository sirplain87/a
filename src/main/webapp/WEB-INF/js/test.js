function SiNAh5STOCk(t, e) {
    "use strict";
    var i, s, n = false, r;
    var a = a || {istLL: "kke", isLocal: false};
    var l = false;
    for (var o = document.getElementsByTagName("script"), h, f, c = o.length; c--;) {
        h = o[c];
        f = h.src || "";
        if (/(fc|abigail)\.js/.test(f)) {
            for (var u, d = h.attributes.length; d--;) {
                u = h.attributes[d];
                if (u.name == "debug") {
                    l = u.value == "true"
                }
                if (u.name == "local") {
                    a.isLocal = u.value == "true"
                }
            }
            break
        }
    }
    var v = function (t) {
        return {
            log: function () {
                t && t.log && t.log.apply(t, arguments)
            }, error: function () {
                t && t.error && t.error.apply(t, arguments)
            }
        }
    }(l ? console : null);
    a.xh5_trace = v;
    function p(t, e, i) {
        var s = Array.prototype.slice.call(arguments, 2);
        return function (i) {
            return t.apply(e, s.concat(Array.prototype.slice.call(arguments)))
        }
    }

    a.fBind = p;
    window.xh5_reqAniFrame = function () {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (t) {
                window.setTimeout(t, 1e3 / 60)
            }
    }();
    function g(t, e, i) {
        e = e || document;
        return e.getElementById(t)
    }

    a.$DOM = g;
    function m(t) {
        return document.createElement(t)
    }

    a.$C = m;
    function N(t) {
        return document.createTextNode(t)
    }

    function b(t, e) {
        if (t.compareDocumentPosition)return t === e || !!(t.compareDocumentPosition(e) & 16);
        if (t.contains && e.nodeType === 1)return t.contains(e) && t !== e;
        while (e = e.parentNode)if (e === t)return true;
        return false
    }

    function _(t, e, i) {
        var s, n, r;
        var a = function () {
            t.style.position = "absolute";
            t.style.padding = "5px 9px";
            t.style.borderRadius = "3px";
            t.style.border = "1px solid #000";
            t.style.backgroundColor = "#ddd";
            t.style.color = "#000";
            t.style.zIndex = i || 99999;
            e && (t.innerHTML = e)
        }, l = function (e, i) {
            var s = isNaN(e) ? n || 0 : e, a = isNaN(i) ? r || 0 : i;
            n = s;
            r = a;
            t.style.left = (s - (t.offsetWidth || 50) >> 1) + "px";
            t.style.top = a + "px"
        };
        this.locate = l;
        this.show = function (e, i) {
            if (!t)return;
            clearTimeout(s);
            if (e && e != "") {
                t.innerHTML = e;
                t.style.display = "";
                l();
                if (!isNaN(i) && i > 0) {
                    s = setTimeout(function () {
                        t.style.display = "none"
                    }, i * 1e3)
                }
            } else {
                t.style.display != "none" && (t.style.display = "none")
            }
        };
        a()
    }

    function I(t, e) {
        if (!e)t = t.toLowerCase();
        var i = 1315423911;
        for (var s, n = t.length; n--;) {
            s = t.charCodeAt(n);
            i ^= (i << 5) + s + (i >> 2)
        }
        return i & 2147483647
    }

    function y(t, e, i, s) {
        var n = false, r = document.getElementsByTagName("script")[0], a = document.createElement("script");
        a.charset = s || "utf-8";
        a.src = t;
        a.async = true;
        a.onload = a.onreadystatechange = function () {
            if (!n && (!a.readyState || /loaded|complete/.test(a.readyState))) {
                n = true;
                a.onload = a.onreadystatechange = a.onerror = null;
                a.parentNode.removeChild(a);
                a = null;
                typeof e === "function" && e()
            }
        };
        a.onerror = function () {
            a.onload = a.onreadystatechange = a.onerror = null;
            a.parentNode.removeChild(a);
            a = null;
            typeof i === "function" && i()
        };
        r.parentNode.insertBefore(a, r)
    }

    var M = new function () {
        var t = a.queue || {};
        a.queue = t;
        var e = function (e, i) {
            var s = t[e][i ? "errCbArr" : "cbArr"];
            for (var n = s.length; n--;) {
                var r = s[n];
                T(r) && r()
            }
            t[e] = null;
            delete t[e]
        };
        this.load = function (i, s, n, r) {
            var a = "urlhash_" + I(i);
            for (var l in t) {
                if (l == a) {
                    t[l].cbArr.push(s);
                    t[l].errCbArr.push(n);
                    return
                }
            }
            t[a] = {url: i, cbArr: [s], errCbArr: [n]};
            y(i, p(e, this, a), p(e, this, a, true), r)
        }
    };

    function O(t) {
        return function (e) {
            return {}.toString.call(e) == "[object " + t + "]"
        }
    }

    var w = O("Object"), A = O("String"), T = O("Function"), D = O("Array");
    var S = function (t) {
        return /^#[0-9a-fA-F]{6}$/.test(t)
    }, E = function (t) {
        t = t.replace(/#|0x/i, "");
        var e, i, s;
        t.replace(/(\w{6})|(\w{3})/, function (n, r, a) {
            if (r) {
                e = t.slice(0, 2);
                i = t.slice(2, 4);
                s = t.slice(4)
            } else if (a) {
                var l = t.split("");
                e = l[0];
                e += String(e);
                i = l[1];
                i += String(i);
                s = l[2];
                s += String(s)
            } else return [0, 0, 0]
        });
        return [parseInt(e, 16), parseInt(i, 16), parseInt(s, 16)]
    };
    a.hex2dec = E;
    function L(t, e) {
        for (var i in e) {
            if (w(t[i]) && w(e[i]))t[i] = arguments.callee(t[i], e[i]); else t[i] = e[i]
        }
        return t
    }

    a.oc = L;
    var k = function () {
        return (new Date).getTime()
    };
    var x = function (t) {
        var e = 300;
        var i = t.container || m("div");
        t.cssFloat && (i.style.styleFloat = i.style.cssFloat = t.cssFloat);
        t.background && (i.style.background = t.background);
        t.border && (i.style.border = t.border);
        i.style.width = i.style.height = 0;
        i.style.margin = (t.h >> 1) + "px " + (t.w >> 1) + "px";
        var s = e / 1e3 + "s";
        i.style.transition = "width " + s + ",height " + s + ",margin " + s + ", ease-out";
        setTimeout(function () {
            i.style.width = t.w + "px";
            i.style.height = t.h + "px";
            i.style.margin = (t.m || 0) + "px";
            typeof t.cb === "function" && setTimeout(t.cb, e, i)
        }, e);
        return i
    };
    var R = function (t) {
    };
    var H = {
        T1_DATA_LOADED: "t1DataLoaded",
        T5Y_DATA_LOADED: "t5yDataLoaded",
        LASTFIVE_LOADED: "lastfiveLoaded",
        K_DATA_LOADED: "kDataLoaded",
        KMIN_DATA_LOADED: "kMinDataLoaded",
        UPDATE: "update",
        RANGE_RESET: "rangeReset"
    }, C = {ZOOM_IN: "zoomin", ZOOM_OUT: "zoomout", UPDATE: "update"}, P = {
        AUTO_H: "auto height is used",
        ERR_IHQ: "unexpected ihq"
    };
    var j = function () {
        var t = {
            istd: "ontouchstart"in window, xuan: "1.1.1", isls: function () {
                if ("localStorage"in window && window["localStorage"] !== null) {
                    var t = "storagetesting";
                    try {
                        window.localStorage.setItem(t, "devicelocalstoragetest");
                        window.localStorage.removeItem(t);
                        return true
                    } catch (e) {
                        return false
                    }
                } else return false
            }()
        };
        return t
    }();
    a.xh5_deviceUtil = j;
    var q = {
        escape: function (t) {
            return t.replace(/([.*+?^${}()|[\]\/\\])/g, "\\$1")
        }, get: function (t) {
            var e = document.cookie.match("(?:^|;)\\s*" + this.escape(t) + "=([^;]*)");
            return e ? e[1] || "" : ""
        }, set: function (t, e, i) {
            !i && (i = {});
            if (!e) {
                e = "";
                i.expires = -1
            }
            var s = "";
            if (i.expires && (Number(i.expires) || i.expires.toUTCString)) {
                var n;
                if (Number(i.expires)) {
                    n = new Date;
                    n.setTime(n.getTime() + i.expires * 1e3)
                } else {
                    n = i.expires
                }
                s = "; expires=" + n.toUTCString()
            }
            var r = i.path ? "; path=" + i.path : "";
            var a = i.domain ? "; domain=" + i.domain : "";
            var l = i.secure ? "; secure" : "";
            document.cookie = [t, "=", e, s, r, a, l].join("")
        }
    };
    var K = new function () {
        "use strict";
        var t = "sinaH5EtagStatus", e = {
            domain: "",
            path: "/",
            expires: 3600 * 1
        }, i = "n", s = "y", n = "http://hq.sinajs.cn/list=sys_hqEtagMode", r = 0;
        var a;
        this.isETag = function () {
            return a
        };
        var l = function () {
            y(n, function () {
                var n = window["hq_str_sys_hqEtagMode"];
                if (r == 0) {
                    r = n
                } else {
                    if (r == n) {
                        a = false;
                        q.set(t, i, e)
                    } else {
                        a = true;
                        q.set(t, s, e)
                    }
                    r = 0
                }
            })
        };
        var o = function () {
            var e = q.get(t);
            switch (e) {
                case i:
                    a = false;
                    break;
                case s:
                    a = true;
                    break;
                default:
                    a = false;
                    l();
                    break
            }
        };
        o();
        setInterval(o, 2e3)
    };

    function U() {
        this.evtObj = {}
    }

    U.prototype.al = function (t, e, i) {
        if (i && this.evtObj[t])return;
        !this.evtObj[t] && (this.evtObj[t] = []);
        this.evtObj[t].push(e)
    };
    U.prototype.rl = function (t, e) {
        var i = this.evtObj[t];
        if (D(i)) {
            for (var s = i.length; s--;) {
                i[s] == e && i.splice(s, 1)
            }
        }
    };
    U.prototype.re = function (t, e) {
        var i = this.evtObj[t];
        if (D(i)) {
            for (var s = 0, n = i.length; s < n; s++) {
                typeof i[s] === "function" && i[s](t, e)
            }
        }
    };
    var F = {
        addHandler: function (t, e, i) {
            if (!t)return;
            if (t.addEventListener)t.addEventListener(e, i, false); else if (t.attachEvent)t.attachEvent("on" + e, i); else t["on" + e] = i
        }, removeHandler: function (t, e, i) {
            if (!t)return;
            if (t.removeEventListener)t.removeEventListener(e, i, false); else if (t.detachEvent)t.detachEvent("on" + e, i); else t["on" + e] = null
        }, getEvent: function (t) {
            return t ? t : window.event
        }, getTarget: function (t) {
            !t && (t = this.getEvent());
            return t ? t.target || t.srcElement : null
        }, preventDefault: function (t) {
            !t && (t = this.getEvent());
            if (t)t.preventDefault ? t.preventDefault() : t.returnValue = false
        }, stopPropagation: function (t) {
            !t && (t = this.getEvent());
            if (t)t.stopPropagation ? t.stopPropagation() : t.cancelBubble = true
        }, getRelatedTarget: function (t) {
            !t && (t = this.getEvent());
            if (t.relatedTarget)return t.relatedTarget;
            if (t.toElement)return t.toElement;
            if (t.fromElement)return t.fromElement;
            return null
        }, getWheelDelta: function (t) {
            !t && (t = this.getEvent());
            if (!t)return 0;
            if (t.wheelDelta)return client.engine.opera && client.engine.opera < 9.5 ? -t.wheelDelta : t.wheelDelta;
            return -t.detail * 40
        }
    };
    a.xh5_EvtUtil = F;
    var V = {
        dd: function (t) {
            return new Date(t.getFullYear(), t.getMonth(), t.getDate())
        }, ddt: function (t) {
            return new Date(t.getTime())
        }, stbd: function (t, e) {
            if (!t || !e)return false;
            return t.getFullYear() == e.getFullYear() ? t.getMonth() == e.getMonth() ? t.getDate() == e.getDate() : false : false
        }, stbdt: function (t, e) {
            if (!t || !e)return false;
            return t.getTime() == e.getTime()
        }, stbs: function (t, e, i, s) {
            return t.getFullYear() == e ? t.getMonth() == i ? t.getDate() == s : false : false
        }, stbds: function (t, e, i) {
            !i && (i = "-");
            var s = e.split(i);
            return this.stbs(t, Number(s[0]), Number(s[1]) - 1, Number(s[2]))
        }, stbdst: function (t, e) {
            var i = e.split(" "), s = i[0].split("-"), n = i[1].split(":");
            var r = new Date(s[0], s[1] - 1, s[2], n[0], n[1], n[2]);
            return r.getTime() == t.getTime()
        }, ds: function (t, e, i) {
            typeof e === "undefined" && (e = "-");
            var s = [t.getFullYear()];
            var n = t.getMonth() + 1;
            s[s.length] = n < 10 ? "0" + n : n;
            var r = t.getDate();
            s[s.length] = r < 10 ? "0" + r : r;
            if (i) {
                var a = t.getHours();
                a = a < 10 ? "0" + a : a;
                var l = t.getMinutes();
                l = l < 10 ? "0" + l : l;
                var o = t.getSeconds();
                o = o < 10 ? "0" + o : o;
                return s.join(e) + " " + [a, l, o].join(":")
            } else return s.join(e)
        }, sd: function (t) {
            var e = t.split("-");
            var i = e[0], s = e[1] - 1, n = e[2];
            return new Date(i, s, n)
        }, sdt: function (t) {
            var e = t.split(" "), i = e[0].split("-"), s = e[1].split(":");
            return new Date(i[0], i[1] - 1, i[2], s[0], s[1], s[2])
        }, gw: function (t, e) {
            var i = 6048e5;
            var s = 2592e5;
            var n = (t.getTime() - s) / i, r = (e.getTime() - s) / i;
            return Math.floor(n) == Math.floor(r)
        }, gm: function (t, e) {
            return t.getFullYear() == e.getFullYear() ? t.getMonth() == e.getMonth() : false
        }, nw: function (t) {
            switch (t) {
                case 1:
                    return "一";
                case 2:
                    return "二";
                case 3:
                    return "三";
                case 4:
                    return "四";
                case 5:
                    return "五";
                case 6:
                    return "六";
                case 0:
                case 7:
                    return "日";
                default:
                    return ""
            }
        }
    };
    var X = {
        pageX: function (t) {
            return t.offsetParent ? t.offsetLeft + this.pageX(t.offsetParent) : t.offsetLeft
        }, pageY: function (t) {
            return t.offsetParent ? t.offsetTop + this.pageY(t.offsetParent) : t.offsetTop
        }, parentX: function (t) {
            return t.parentNode == t.offsetParent ? t.offsetLeft : this.pageX(t) - this.pageX(t.parentNode)
        }, parentY: function (t) {
            return t.parentNode == t.offsetParent ? t.offsetTop : this.pageY(t) - this.pageY(t.parentNode)
        }
    };
    a.xh5_HtmlPosUtil = X;
    var z = {
        getUrlParams: function () {
            var t = location.search.substring(1), e = t.split("&"), i = {};
            for (var s, n, r, a = 0, l = e.length; a < l; a++) {
                s = e[a].indexOf("=");
                if (s != -1) {
                    n = e[a].substring(0, s);
                    r = e[a].substring(s + 1);
                    i[n] = r
                }
            }
            return i
        }
    };
    var Y = {
        info: function () {
            var t = navigator.userAgent, e = navigator.appVersion;
            return {
                trident: t.indexOf("Trident") > -1,
                presto: t.indexOf("Presto") > -1,
                webKit: t.indexOf("AppleWebKit") > -1,
                gecko: t.indexOf("Gecko") > -1 && t.indexOf("KHTML") < 0,
                mobile: !!t.match(/AppleWebKit.*Mobile.*/) || !!t.match(/AppleWebKit/),
                ios: !!t.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
                android: t.indexOf("Android") > -1 || t.indexOf("Linux") > -1,
                iPhone: t.indexOf("iPhone") > -1 || t.indexOf("Mac") > -1,
                iPad: t.indexOf("iPad") > -1,
                webApp: t.indexOf("Safari") < 0
            }
        }(), language: (navigator.browserLanguage || navigator.language).toLowerCase(), hdpr: 1
    };
    a.xh5_BrowserUtil = Y;
    var B = {
        mt: {
            CN: "a",
            HK: "hk",
            US: "us",
            EF: "global",
            IF: "inner",
            GD: "gold",
            EX: "exchange",
            BD: "bond",
            BK: "bank",
            FD: "fund",
            FX: "forex"
        }, st: function (t) {
            if (/^s[hz]\d{6}$/.test(t))return this.mt.CN;
            if (/^(hk|rt_hk)\w+/.test(t))return this.mt.HK;
            if (/^gb_.+/.test(t))return this.mt.US;
            if (/^hf_\w+/.test(t)) {
                if (/(AUTD|AGTD)$/i.test(t))return this.mt.GD;
                if (/\d+$/.test(t))return this.mt.IF;
                return this.mt.EF
            }
            return "notsure"
        }
    };
    var W = {
        pp: function (t, e, i, s) {
            if (isNaN(t) || t <= e)return s;
            if (t >= i)return 1;
            return Math.max(s * (1 - (t - e) / (i - e)), 1)
        }, vp: function (t, e, i) {
            return isNaN(t) || t <= 0 ? i - 1 : i * (1 - t / e)
        }
    };
    var G = {
        pa: function (t, e, i, s) {
            var n = [], r = (e - t) / (s - 1);
            for (var a, l = 0; l < s; l++) {
                a = (e - r * l - i) / i;
                n[n.length] = a
            }
            return n
        }
    };
    var $ = {
        trim: function (t) {
            return t.replace(/^[\s\xA0]+/, "").replace(/[\s\xA0]+$/, "")
        }, ps: function (t, e) {
            t = Number(t);
            if (isNaN(t) || t <= 0)return "-"; else if (t < 1e5)return t.toFixed(e); else if (t < 1e6)return (t / 1e4).toFixed(e) + "万"; else if (t < 1e7)return (t / 1e6).toFixed(e) + "百万"; else if (t < 1e8)return (t / 1e7).toFixed(e) + "千万"; else return (t / 1e8).toFixed(e) + "亿"
        }, vs: function (t, e) {
            var i, s = "";
            if (t > 1e12) {
                i = (t / 1e12).toFixed(0);
                s = "万亿"
            } else if (t > 1e8) {
                i = (t / 1e8).toFixed(2);
                s = "亿"
            } else if (t > 1e5) {
                i = (t / 1e4).toFixed(2);
                s = "万"
            } else if (t >= 1)i = t.toFixed(0); else i = "-";
            return e ? i + s : i
        }, zp: function (t) {
            t = String(t);
            if (t.length < 2)return "0" + t;
            return t
        }
    };
    var Z = {
        s0: function (t) {
            t = parseInt(Number(t));
            if (t < 0)return "";
            if (t < 10)return "0" + String(t);
            return String(t)
        }, tIWS: function (t, e) {
            var i = [];
            for (var s = t; s <= e; s++) {
                i.push(this.s0(s / 60) + ":" + this.s0(s % 60))
            }
            return i
        }, gtr: function (t) {
            var e = [];
            for (var i, s, n, r, a, l, o, h = 0, f = t.length; h < f; h++) {
                n = t[h][0];
                r = t[h][1];
                a = Number(n.split(":")[0]) * 60 + Number(n.split(":")[1]);
                l = Number(r.split(":")[0]) * 60 + Number(r.split(":")[1]);
                o = this.tIWS(a, l);
                e = e.concat(o)
            }
            return e
        }, tradingA: [], gta: function () {
            if (!this.tradingA.length)this.tradingA = this.gtr([["9:30", "11:30"], ["13:00", "15:00"]]);
            return this.tradingA
        }, tradingUs: [], gtus: function () {
            if (!this.tradingUs.length)this.tradingUs = this.gtr([["9:30", "16:00"]]);
            return this.tradingUs
        }, tradingHk: [], gthk: function () {
            if (!this.tradingHk.length)this.tradingHk = this.gtr([["09:30", "12:00"], ["13:00", "16:00"]]);
            return this.tradingHk
        }, gata: function (t) {
            var e;
            switch (t) {
                case"US":
                    e = this.gtus();
                    break;
                case"HK":
                    e = this.gthk();
                    break;
                default:
                case"CN":
                    e = this.gta();
                    break
            }
            return e
        }, ist: function (t, e) {
            t = t.toUpperCase();
            var i = this.gata(t);
            var s = NaN;
            if (i.indexOf) {
                s = i.indexOf(e)
            } else {
                for (var n = i.length; n--;) {
                    if (i[n] == e) {
                        s = n;
                        break
                    }
                }
            }
            return s >= 0
        }, gltbt: function (t, e, i, s) {
            var n = [];
            var r = this.gata(s);
            var a = r.length;
            for (var l = 0, o = t * a; l < o; l++) {
                n.push({time: r[l % a], price: 0, percent: 0, avg_price: 0, volume: 0});
                if (!i)n[l].price = n[l].avg_price = e
            }
            n[0].price = n[0].avg_price = n[0].prevclose = e;
            n[0].volume = n[0].totalVolume = n[0].totalAmount = 0;
            return n
        }, azft: function (t, e) {
            if (!t)return t;
            var i = this.gata(e);
            for (var s = 0, n = t.length; s < n; s++)t[s].time = i[s];
            t[0].date.setHours(0);
            return t
        }, c2b: function (t) {
            t = t.replace(" ", "+");
            var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(t);
            return e >= 0 ? e : 0
        }, db: function (t) {
            if (!t)return [];
            var e = [];
            for (var i, s, n = 0, r = 0, a = 0, l = t.length; a < l; a++) {
                i = this.c2b(t.charAt(a));
                s = r & 6 ? r & 7 ^ 7 : 5;
                n |= i >> 5 - s << (r ^ 7) - s;
                n == 64767 && i == 63 && (n = 65535);
                if (r > 25) {
                    r -= 32;
                    e[e.length] = n;
                    n = 0
                }
                n |= (i & (1 << 5 - s) - 1) << (r | 7) + 4 + s;
                r += 6
            }
            return e
        }, fB: function (t, e, i) {
            var s = [];
            var n = this.gata(i), r = n.length * 3;
            var a = 0, l = 0, o;
            for (var h = 0, f = 0; f < r; f += 3) {
                h = Math.floor(f / 3);
                if (e) {
                    s[s.length] = {time: n[h], price: t[f + 1] / 1e3}
                } else {
                    s[s.length] = {time: n[h], avg_price: t[f] / 1e3, price: t[f + 1] / 1e3, volume: t[f + 2] / 100};
                    if (s[h].volume > 0)l += s[h].volume;
                    if (s[h].avg_price > 0)o = s[h].avg_price
                }
            }
            if (s[0].price < 0)s[0].price = s[0].avg_price = l = a = 0;
            if (!e) {
                s[0].totalVolume = l;
                s[0].totalAmount = l * o
            }
            return s
        }
    };
    var J = {
        mw: function (t, e, i, s, n, r) {
            if (typeof s !== "number")s = 0;
            var a = t.length, l = t[0];
            if (s > 0)l.volume /= s;
            var o = [], h = [];
            if (a == 1) {
                o[0] = {
                    open: e.open,
                    high: e.high,
                    low: e.low,
                    close: e.price,
                    volume: e.totalVolume,
                    date: V.dd(e.date)
                };
                h[0] = {
                    open: e.open,
                    high: e.high,
                    low: e.low,
                    close: e.price,
                    volume: e.totalVolume,
                    date: V.dd(e.date)
                }
            } else {
                var f = l.open, c = l.high, u = l.low, d = l.close, v = l.volume, p = l.date, g = l.open, m = l.high, N = l.low, b = l.close, _ = l.volume, I = l.date;
                for (var y = 1; y < a; y++) {
                    l = t[y];
                    if (s > 0)l.volume /= s;
                    if (V.gw(t[y - 1].date, l.date)) {
                        if (l.high > c)c = l.high;
                        if (l.low < u)u = l.low;
                        d = l.close;
                        v += l.volume;
                        p = l.date
                    } else {
                        o[o.length] = {open: f, high: c, low: u, close: d, volume: v, date: p};
                        f = l.open;
                        c = l.high;
                        u = l.low;
                        d = l.close;
                        v = l.volume;
                        p = l.date
                    }
                    if (V.gm(t[y - 1].date, l.date)) {
                        if (l.high > m)m = l.high;
                        if (l.low < N)N = l.low;
                        b = l.close;
                        _ += l.volume;
                        I = l.date
                    } else {
                        h[h.length] = {open: g, high: m, low: N, close: b, volume: _, date: I};
                        g = l.open;
                        m = l.high;
                        N = l.low;
                        b = l.close;
                        _ = l.volume;
                        I = l.date
                    }
                    if (y == a - 1) {
                        o[o.length] = {open: f, high: c, low: u, close: d, volume: v, date: p};
                        h[h.length] = {open: g, high: m, low: N, close: b, volume: _, date: I}
                    }
                }
            }
            o[0].prevclose = i;
            h[0].prevclose = i;
            return [o, h]
        }, nc: function (t, e, i, s) {
            if (!t || t.length < 1)return;
            var n = t[t.length - 1];
            if (isNaN(n.volume) || n.volume < 1)t.length--;
            switch (i) {
                case"d":
                    break;
                case"w":
                    if (V.gw(t[t.length - 1].date, e.date))return;
                    break;
                case"m":
                    if (V.gm(t[t.length - 1].date, e.date))return;
                    break;
                default:
                    return
            }
            t[t.length] = {
                open: s ? e.prevclose : e.open,
                high: s ? e.prevclose : e.high,
                low: s ? e.prevclose : e.low,
                close: s ? e.prevclose : e.price,
                volume: e.totalVolume,
                date: V.dd(e.date),
                day: String(e.today).split("-").join("/")
            }
        }, pd: function (t, e) {
            var i = t.length, s = t[0], n = s.prevclose;
            if (isNaN(n) || n <= 0)n = s.open;
            for (var r = 0; r < i; r++) {
                s = t[r];
                s.percent = (s.close - n) / n;
                n = s.close;
                if (e)continue;
                if (!s.day) {
                    var a = s.date;
                    var l = $.zp(a.getMonth() + 1), o = $.zp(a.getDate());
                    s.day = [a.getFullYear(), l, o].join("/")
                } else {
                    s.time = String(s.day).substr(11, 5);
                    s.day = String(s.day).substr(0, 10);
                    s.date = V.sd(s.day);
                    s.day = s.day.split("-").join("/")
                }
            }
        }, ms: function (t, e, i, s, n) {
            return Math.max(1, Math.ceil(((t - i) * 60 + e - s) / n))
        }, spk: function (t, e, i, s) {
            if (t == e)return true;
            var n = t.split(":");
            var r = Number(n[0]), a = Number(n[1]);
            n = e.split(":");
            var l = Number(n[0]), o = Number(n[1]);
            if (r > l || r == l && a >= o)return true;
            if (s == 60) {
                if ((t == "10:30" || t == "11:30" || t == "14:00" || t == "15:00") && o != a)return false; else return true
            } else {
                n = i.split(":");
                var h = Number(n[0]), f = Number(n[1]);
                var c = this.ms(r, a, h, f, s);
                var u = this.ms(l, o, h, f, s);
                return c == u
            }
        }, yd: function (t) {
            var e = [];
            var i = t[t.length - 1].date.getFullYear();
            for (var s = t.length; s--;) {
                if (t[s].date.getFullYear() != i)break;
                e[e.length] = t[s]
            }
            e.reverse();
            e[0].prevclose = t[s] ? t[s].close : e[0].close;
            return e
        }, rd: function (t, e) {
            var i = [];
            var s = V.dd(e);
            s.setFullYear(s.getFullYear() - 5);
            for (var n = t.length; n--;) {
                if (t[n].date < s)break;
                i[i.length] = t[n]
            }
            i.reverse();
            i[0].prevclose = t[n] ? t[n].close : i[0].close;
            return i
        }, ama: function (t, e) {
            if (!t || t.length < 1)return;
            var i = [], s = [];
            for (var n, r, a, l, o, h = t.length, f, c = 0, u = e.length; c < u; c++) {
                i[c] = 0;
                n = "ma_p" + c;
                a = e[c];
                for (f = 0; f < h; f++) {
                    l = t[f];
                    i[c] += Number(l.close);
                    if (f >= a - 1) {
                        l[n] = i[c] / a;
                        o = t[f - a + 1];
                        i[c] -= o.close
                    } else {
                        l[n] = i[c] / (f + 1)
                    }
                }
            }
        }, uma: function (t, e) {
            if (!t)return;
            var i = t.length, s = e.length;
            var n = [], r = [], a, l, o;
            for (l = 0; l < s; l++) {
                n[l] = 0;
                a = Math.max(0, i - e[l]);
                for (; a < i; a++) {
                    o = t[a];
                    n[l] += Number(o.close)
                }
            }
            o = t[i - 1];
            for (l = 0; l < s; l++) {
                a = Math.min(i, e[l]);
                o["ma_p" + l] = n[l] / a
            }
        }
    };
    var Q = {
        pctM: function (t, e, i, s, n, r) {
            var a = e.getElementsByTagName("span"), l = t.length, o;
            while (a.length < l) {
                o = m("span");
                o.style.display = "block";
                e.appendChild(o)
            }
            while (a.length > l)e.removeChild(a[0]);
            for (var h = i / (l - 1), f, c, u = 0; u < l; u++) {
                c = (t[u] * 100).toFixed(2) + "%";
                f = s;
                if (t[u] > -1e-6 && t[u] < 1e-6) {
                    f = n;
                    c = " 0"
                } else if (t[u] > 0) {
                    f = r;
                    c = " " + c
                }
                o = a[u];
                o.style.color = f;
                o.innerHTML = c;
                o.style.height = h + "px"
            }
        }, maT: function (t, e, i, s) {
            var n = e.getElementsByTagName("span"), r;
            var a = i[0], l = i[1], o = a.length;
            if (s)o--;
            while (n.length < o) {
                r = m("span");
                e.appendChild(r)
            }
            while (n.length > o)e.removeChild(n[0]);
            for (var h = 0; h < o; h++) {
                r = n[h];
                r.style.color = l[h];
                r.innerHTML = " MA" + a[h] + ":" + t[6][h]
            }
        }, pM: function (t, e, i, s, n, r) {
            var a = r.ctn, l = r.h;
            var o = a.getElementsByTagName("span"), h, f = n - 1;
            while (o.length < n) {
                h = m("span");
                h.style.display = "block";
                h.style.width = r.w - 3 + "px";
                a.appendChild(h)
            }
            while (o.length > n)a.removeChild(o[0]);
            var c, u, d, v, p = l / f;
            if (s) {
                v = r.cKS;
                for (c = 0; c < n; c++) {
                    u = e - c * (e - t) / f;
                    if (r.isCl) {
                        v = u == i ? r.cB : u > i ? r.cR : r.cF
                    }
                    h = o[c];
                    h.style.height = p + "px";
                    h.style.color = v;
                    h.innerHTML = u == 0 ? 0 : u.toFixed(2)
                }
            } else {
                p = Math.round(p);
                for (c = 0; c < n; c++) {
                    u = e - c * (e - t) / f;
                    d = u.toFixed(r.digits);
                    v = r.cR;
                    if (t == i) {
                        v = c == f ? r.cB : r.cR
                    } else if (e == i) {
                        v = c == 0 ? r.cB : r.cF
                    } else {
                        v = u == i ? r.cB : u > i ? r.cR : r.cF
                    }
                    h = o[c];
                    h.innerHTML = d;
                    h.style.height = (c == f ? r.fs : p) + "px";
                    h.style.color = v
                }
            }
        }, vM: function (t, e, i) {
            var s = 2;
            var n = e.getElementsByTagName("span"), r, a = s - 1;
            while (n.length < s) {
                r = m("span");
                r.style.display = "block";
                r.style.width = i.w - 3 + "px";
                e.appendChild(r)
            }
            while (n.length > s)e.removeChild(n[0]);
            for (var l = i.h / a, o, h, f, c = 0; c < s; c++) {
                h = t - c * t / a;
                if (t > 1e12) {
                    o = (h / 1e12).toFixed(0);
                    c == a && (o = "万亿")
                } else if (t > 1e9) {
                    o = (h / 1e8).toFixed(0);
                    c == a && (o = "亿")
                } else if (t > 1e7) {
                    o = (h / 1e6).toFixed(0);
                    c == a && (o = "百万")
                } else if (t > 1e5) {
                    o = (h / 1e4).toFixed(0);
                    c == a && (o = "万")
                } else if (t <= 1) {
                    o = h.toFixed(0);
                    c == a && (o = "0")
                } else {
                    o = h.toFixed(0);
                    c == a && (o = "0")
                }
                r = n[c];
                r.innerHTML = o;
                c < a && (r.style.height = l - i.fs / s + "px")
            }
        }
    };

    function te(t, e, i, s, n) {
        var r = function (t) {
            var e = parseInt(Math.round(t * 100));
            if (e % 100 != 0) {
                if (e % 10 == 0)e *= .1;
                if (e % 5 != 0 && e % 2 != 0)return true
            }
            return false
        };
        var a = function (t, e) {
            if (e) {
                while (t > 5) {
                    if (t % 2 == 0)t *= .5; else if (t % 3 == 0)t /= 3; else break
                }
            } else {
                if (t > 9) {
                    if (t % 3 == 0)t /= 3; else if (t % 4 == 0)t *= .25; else if (t % 2 == 0)t *= .5
                }
            }
            return t
        };
        var l = -1e-6, o = (e + t) * .5, h = s ? [4, 5, 6, 8, 9, 10, 12, 15, 16, 18, 20] : [4, 5, 6, 7, 8, 9, 10, 12, 14, 15, 16, 18, 20], f = [1, 2, 3, 4, 5, 6, 8], c, u, d = false;
        var v, p, g, m, N, b, _, I, y, M, O, w = f.length, A;
        for (var T = 0, D = h.length; T < D; T++) {
            d = false;
            O = h[T];
            v = (t - e) / O;
            b = Math.pow(10, 0 - i);
            while (!d) {
                for (A = 0; A < w; A++) {
                    p = b * f[A];
                    if (p - v > l) {
                        if (O & 1) {
                            g = Math.round((o + p * .5) / p) * p;
                            y = (g + (O - 1) * .5 * p).toFixed(5);
                            M = (g - (O + 1) * .5 * p).toFixed(5)
                        } else {
                            g = Math.round(o / p) * p;
                            y = (g + O * .5 * p).toFixed(5);
                            M = (g - O * .5 * p).toFixed(5)
                        }
                        m = Number(y);
                        N = Number(M);
                        if (m - t > l && N - e < l) {
                            d = true;
                            if (N < 0 && !n) {
                                m -= N;
                                N = 0
                            }
                            if (!_) {
                                _ = m - N;
                                c = m;
                                u = N;
                                I = O;
                                break
                            }
                            var S = (m - N) / a(O);
                            if (Math.round(S * 100) != 1 && Math.round(S * 10) != 1) {
                                if (r(S)) {
                                    break
                                }
                            }
                            if (m - N > _) {
                                break
                            } else if (m - N == _) {
                                var E = c - t;
                                var L = e - u;
                                var k = Math.abs(E - L);
                                E = m - t;
                                L = e - N;
                                var x = Math.abs(E - L);
                                if (x >= k) {
                                    break
                                } else if (x == k && I == 4) {
                                }
                            }
                            if (r(m)) {
                                break
                            }
                            if (r(N)) {
                                break
                            }
                            _ = m - N;
                            c = m;
                            u = N;
                            I = O;
                            break
                        }
                    }
                }
                b *= 10
            }
        }
        I = a(I, s);
        return [c, u, I]
    }

    function ee(t) {
        var e, i = arguments, s, n, r, a, l, o, h, f = 864e5, c = 7657, u = [], d = [], v = ~(3 << 30), p = 1 << 30, g = [0, 3, 5, 6, 9, 10, 12, 15, 17, 18, 20, 23, 24, 27, 29, 30], m = Math, N = function () {
            var i, a;
            for (i = 0; i < 64; i++) {
                d[i] = m.pow(2, i);
                if (i < 26) {
                    u[i] = b(i + 65);
                    u[i + 26] = b(i + 97);
                    if (i < 10) {
                        u[i + 52] = b(i + 48)
                    }
                }
            }
            u.push("+", "/");
            u = u.join("");
            s = t.split("");
            n = s.length;
            for (i = 0; i < n; i++) {
                s[i] = u.indexOf(s[i])
            }
            r = {};
            e = o = 0;
            l = {};
            a = M([12, 6]);
            h = 63 ^ a[1];
            return {_1479: T, _136: A, _200: w, _139: D, _197: S}["_" + a[0]] || function () {
                    return []
                }
        }, b = String.fromCharCode, _ = function (t) {
            return t === {}._
        }, I = function () {
            var t, e;
            t = y();
            e = 1;
            for (; ;) {
                if (y()) {
                    e++
                } else {
                    return e * (t * 2 - 1)
                }
            }
        }, y = function () {
            var t;
            if (e >= n) {
                return 0
            }
            t = s[e] & 1 << o;
            o++;
            if (o >= 6) {
                o -= 6;
                e++
            }
            return !!t
        }, M = function (t, i, r) {
            var a, l, h, f, c;
            l = [];
            h = 0;
            if (!i) {
                i = []
            }
            if (!r) {
                r = []
            }
            for (a = 0; a < t.length; a++) {
                f = t[a];
                h = 0;
                if (!f) {
                    l[a] = 0;
                    continue
                }
                if (e >= n) {
                    return l
                }
                if (t[a] <= 0) {
                    h = 0
                } else if (t[a] <= 30) {
                    for (; ;) {
                        c = 6 - o;
                        c = c < f ? c : f;
                        h |= (s[e] >> o & (1 << c) - 1) << t[a] - f;
                        o += c;
                        if (o >= 6) {
                            o -= 6;
                            e++
                        }
                        f -= c;
                        if (f <= 0) {
                            break
                        }
                    }
                    if (i[a] && h >= d[t[a] - 1]) {
                        h -= d[t[a]]
                    }
                } else {
                    h = M([30, t[a] - 30], [0, i[a]]);
                    if (!r[a]) {
                        h = h[0] + h[1] * d[30]
                    }
                }
                l[a] = h
            }
            return l
        }, O = function (t) {
            var e, i, s;
            if (t > 1) {
                e = 0
            }
            for (e = 0; e < t; e++) {
                r.d++;
                s = r.d % 7;
                if (s == 3 || s == 4) {
                    r.d += 5 - s
                }
            }
            i = new Date;
            i.setTime((c + r.d) * f);
            return i
        }, w = function () {
            var t, i, s, a, l, o;
            if (h >= 1) {
                return []
            }
            r.d = M([18], [1])[0] - 1;
            a = M([3, 3, 30, 6]);
            r.p = a[0];
            r.ld = a[1];
            r.cd = a[2];
            r.c = a[3];
            r.m = m.pow(10, r.p);
            r.pc = r.cd / r.m;
            s = [];
            for (t = 0; ; t++) {
                l = {d: 1};
                if (y()) {
                    a = M([3])[0];
                    if (a == 0) {
                        l.d = M([6])[0]
                    } else if (a == 1) {
                        r.d = M([18])[0];
                        l.d = 0
                    } else {
                        l.d = a
                    }
                }
                o = {date: O(l.d)};
                if (y()) {
                    r.ld += I()
                }
                a = M([r.ld * 3], [1]);
                r.cd += a[0];
                o.close = r.cd / r.m;
                s.push(o);
                if (e >= n || e == n - 1 && !((r.c ^ t + 1) & 63)) {
                    break
                }
            }
            s[0].prevclose = r.pc;
            return s
        }, A = function () {
            var t, i, s, a, l, o, f, c, u, d, v;
            if (h >= 2) {
                return []
            }
            f = [];
            u = {v: "volume", p: "price", a: "avg_price"};
            r.d = M([18], [1])[0] - 1;
            c = {date: O(1)};
            s = M(h < 1 ? [3, 3, 4, 1, 1, 1, 5] : [4, 4, 4, 1, 1, 1, 3]);
            for (t = 0; t < 7; t++) {
                r[["la", "lp", "lv", "tv", "rv", "zv", "pp"][t]] = s[t]
            }
            r.m = m.pow(10, r.pp);
            if (h >= 1) {
                s = M([3, 3]);
                r.c = s[0];
                s = s[1]
            } else {
                s = 5;
                r.c = 2
            }
            r.pc = M([s * 6])[0];
            c.pc = r.pc / r.m;
            r.cp = r.pc;
            r.da = 0;
            r.sa = r.sv = 0;
            for (t = 0; ; t++) {
                if (e >= n || e == n - 1 && !((r.c ^ t) & 7)) {
                    break
                }
                l = {};
                a = {};
                d = r.tv ? y() : 1;
                for (i = 0; i < 3; i++) {
                    v = ["v", "p", "a"][i];
                    if (d ? y() : 0) {
                        s = I();
                        r["l" + v] += s
                    }
                    o = v == "v" && r.rv ? y() : 1;
                    s = M([r["l" + v] * 3 + (v == "v" ? o * 7 : 0)], [!!i])[0] * (o ? 1 : 100);
                    a[v] = s;
                    if (v == "v") {
                        if (!(l[u[v]] = s) && t < 241 && (r.zv ? !y() : 1)) {
                            a["p"] = 0;
                            break
                        }
                    } else if (v == "a") {
                        r.da = (h < 1 ? 0 : r.da) + a["a"]
                    }
                }
                r.sv += a["v"];
                l[u["p"]] = (r.cp += a["p"]) / r.m;
                r.sa += a["v"] * r.cp;
                l[u["a"]] = _(a["a"]) ? t ? f[t - 1][u["a"]] : l[u["p"]] : r.sv ? ((m.floor((r.sa * (2e3 / r.m) + r.sv) / r.sv) >> 1) + r.da) / 1e3 : l[u["p"]] + r.da / 1e3;
                f.push(l)
            }
            f[0].date = c.date;
            f[0].prevclose = c.pc;
            return f
        }, T = function () {
            var t, e, i, s, n, a, l, o;
            if (h >= 1) {
                return []
            }
            r.lv = 0;
            r.ld = 0;
            r.cd = 0;
            r.cv = [0, 0];
            r.p = M([6])[0];
            r.d = M([18], [1])[0] - 1;
            r.m = m.pow(10, r.p);
            a = M([3, 3]);
            r.md = a[0];
            r.mv = a[1];
            t = [];
            for (; ;) {
                a = M([6]);
                if (!a.length) {
                    break
                }
                s = {c: a[0]};
                n = {};
                s.d = 1;
                if (s.c & 32) {
                    for (; ;) {
                        a = M([6])[0];
                        if ((a | 16) == 63) {
                            o = a & 16 ? "x" : "u";
                            a = M([3, 3]);
                            s[o + "_d"] = a[0] + r.md;
                            s[o + "_v"] = a[1] + r.mv;
                            break
                        } else if (a & 32) {
                            l = a & 8 ? "d" : "v";
                            o = a & 16 ? "x" : "u";
                            s[o + "_" + l] = (a & 7) + r["m" + l];
                            break
                        } else {
                            l = a & 15;
                            if (l == 0) {
                                s.d = M([6])[0]
                            } else if (l == 1) {
                                r.d = l = M([18])[0];
                                s.d = 0
                            } else {
                                s.d = l
                            }
                            if (!(a & 16)) {
                                break
                            }
                        }
                    }
                }
                n.date = O(s.d);
                for (l in{v: 0, d: 0}) {
                    if (!_(s["x_" + l])) {
                        r["l" + l] = s["x_" + l]
                    }
                    if (_(s["u_" + l])) {
                        s["u_" + l] = r["l" + l]
                    }
                }
                s.l_l = [s.u_d, s.u_d, s.u_d, s.u_d, s.u_v];
                o = g[s.c & 15];
                if (s.u_v & 1) {
                    o = 31 - o
                }
                if (s.c & 16) {
                    s.l_l[4] += 2
                }
                for (i = 0; i < 5; i++) {
                    if (o & 1 << 4 - i) {
                        s.l_l[i]++
                    }
                    s.l_l[i] *= 3
                }
                s.d_v = M(s.l_l, [1, 0, 0, 1, 1], [0, 0, 0, 0, 1]);
                l = r.cd + s.d_v[0];
                n.open = l / r.m;
                n.high = (l + s.d_v[1]) / r.m;
                n.low = (l - s.d_v[2]) / r.m;
                n.close = (l + s.d_v[3]) / r.m;
                a = s.d_v[4];
                if (typeof a == "number") {
                    a = [a, a >= 0 ? 0 : -1]
                }
                r.cd = l + s.d_v[3];
                o = r.cv[0] + a[0];
                r.cv = [o & v, r.cv[1] + a[1] + !!((r.cv[0] & v) + (a[0] & v) & p)];
                n.volume = (r.cv[0] & p - 1) + r.cv[1] * p;
                t.push(n)
            }
            return t
        }, D = function () {
            var t, e, i, s;
            if (h > 1) {
                return []
            }
            r.l = 0;
            s = -1;
            r.d = M([18])[0] - 1;
            i = M([18])[0];
            while (r.d < i) {
                e = O(1);
                if (s <= 0) {
                    if (y()) {
                        r.l += I()
                    }
                    s = M([r.l * 3], [0])[0] + 1;
                    if (!t) {
                        t = [e];
                        s--
                    }
                } else {
                    t.push(e)
                }
                s--
            }
            return t
        }, S = function () {
            var t, i, s, a, l, o;
            if (h >= 1) {
                return []
            }
            r.f = M([6])[0];
            r.c = M([6])[0];
            s = [];
            r.dv = [];
            r.dl = [];
            for (t = 0; t < r.f; t++) {
                r.dv[t] = 0;
                r.dl[t] = 0
            }
            for (t = 0; ; t++) {
                if (e >= n || e == n - 1 && !((r.c ^ t) & 7)) {
                    break
                }
                l = [];
                for (i = 0; i < r.f; i++) {
                    if (y()) {
                        r.dl[i] += I()
                    }
                    r.dv[i] += M([r.dl[i] * 3], [1])[0];
                    l[i] = r.dv[i]
                }
                s.push(l)
            }
            return s
        };
        return N()()
    }

    function ie(t, e) {
        if (!t || t.length < 9 || !e)return null;
        var i = ee(t);
        var s = V.dd(e);
        var n = new Date(s.getFullYear() - 3, s.getMonth(), s.getDate());
        var r = 0, a = 0;
        for (var l, o = 0, h = i.length; o < h; o++) {
            l = i[o];
            if (l.getTime() <= n.getTime() && i[o + 1].getTime() >= n.getTime())r = o;
            if (V.stbd(l, s))a = o + 1
        }
        return i.slice(r, a)
    }

    function se(t) {
        if (!t)v.error("no stage", this);
        this.gArr;
        this.iArr;
        this.stage = t
    }

    se.prototype.visible = function (t) {
        for (var e = 0, i = this.gArr.length; e < i; e++) {
            this.gArr[e].visible(t)
        }
    };
    ne.prototype = new se(1);
    function ne(t) {
        se.call(this, t);
        this.scfg;
        this.scaleCtn;
        this.titleCtn;
        this.t1;
        this.t2;
        this.t3
    }

    ne.prototype.ic = function (t) {
        var e = t.so || this.stage, i = t.sc || this.scfg.COLOR.T_S, s = t.bc || this.scfg.COLOR.GRID, n = t.i || this.scfg.PARAM.BG_Z_INDEX;
        this.scaleCtn = m("div");
        this.scaleCtn.style.position = "absolute";
        this.scaleCtn.style.zIndex = n;
        this.scaleCtn.style.fontSize = this.scfg.STYLE.FONT_SIZE + "px";
        this.scaleCtn.style.textAlign = "right";
        this.scaleCtn.style.color = i;
        e.appendChild(this.scaleCtn);
        this.titleCtn = m("div");
        this.titleCtn.style.position = "absolute";
        this.titleCtn.style.borderTop = this.titleCtn.style.borderBottom = "1px solid " + s;
        this.titleCtn.style.zIndex = n;
        e.appendChild(this.titleCtn);
        this.t1 = m("span");
        this.t2 = m("span");
        this.t3 = m("span");
        this.t1.style.display = this.t2.style.display = this.t3.style.display = "block";
        this.t1.style.width = this.t2.style.width = this.t3.style.width = "30%";
        this.t1.style.cssFloat = this.t1.style.styleFloat = this.t2.style.cssFloat = this.t2.style.styleFloat = this.t3.style.cssFloat = this.t3.style.styleFloat = "left";
        this.titleCtn.appendChild(this.t1);
        this.titleCtn.appendChild(this.t2);
        this.titleCtn.appendChild(this.t3)
    };
    ne.prototype.dr = function (t) {
        var e = this.scfg.DIMENSION.posY, i = this.scfg.DIMENSION.h_main, s = this.scfg.DIMENSION.H_TIME_PART, n = this.scfg.DIMENSION.h_vol, r = this.scfg.DIMENSION.H_T_TITLE, a = e + i + s + n, l = t ? this.scfg.DIMENSION.w_main : this.scfg.DIMENSION.w_k;
        this.scaleCtn.style.left = this.scfg.DIMENSION.lbX + "px";
        this.scaleCtn.style.top = a + r + "px";
        this.titleCtn.style.width = l + "px";
        this.titleCtn.style.height = r + "px";
        this.titleCtn.style.top = a + "px";
        this.titleCtn.style.left = this.scfg.DIMENSION.posX + "px"
    };
    ne.prototype.ca = function (t) {
        if (t)while (t.length > 0)t.length--
    };
    ne.prototype.v = function (t) {
        if (t) {
            !b(this.stage, this.scaleCtn) && this.stage.appendChild(this.scaleCtn);
            !b(this.stage, this.titleCtn) && this.stage.appendChild(this.titleCtn)
        } else {
            if (b(this.stage, this.scaleCtn)) {
                this.stage.removeChild(this.scaleCtn)
            }
            if (b(this.stage, this.titleCtn))this.stage.removeChild(this.titleCtn)
        }
        this.visible(t)
    };
    ne.prototype.t = function (t, e, i) {
        this.t1.innerHTML = t[0];
        t[1] && (this.t1.style.color = t[1]);
        this.t2.innerHTML = e[0];
        e[1] && (this.t2.style.color = e[1]);
        this.t3.innerHTML = i[0];
        i[1] && (this.t3.style.color = i[1])
    };
    ne.prototype.sm = function (t) {
        var e = t.min, i = t.max, s = this.scfg.DIMENSION.posX, n = this.scfg.DIMENSION.lbX, r = this.scfg.DIMENSION.h_t, a = this.scfg.STYLE.FONT_SIZE, l = t.p, o = r > this.scfg.DIMENSION.MIN_H_T ? t.n || 3 : 2;
        var h = this.scaleCtn.getElementsByTagName("span"), f, c = o - 1;
        while (h.length < o) {
            f = m("span");
            f.style.display = "block";
            f.style.width = s - n - 3 + "px";
            this.scaleCtn.appendChild(f)
        }
        while (h.length > o)this.scaleCtn.removeChild(h[0]);
        for (var u = r / c, d, v, p = 0; p < o; p++) {
            v = i - p * (i - e) / c;
            d = v.toFixed(l);
            if (i > 1e8 || e < -1e8) {
                d = (v / 1e8).toFixed(2);
                p == c && (d = "亿")
            } else if (i > 1e4 || e < -1e4) {
                d = (v / 1e4).toFixed(2);
                p == c && (d = "万")
            } else if (v < .001 && v > -.001) {
                d = 0..toFixed(l)
            }
            f = h[p];
            f.innerHTML = d;
            p < c && (f.style.height = u - a / o + "px")
        }
    };
    function re() {
        this.minPrice, this.maxPrice;
        this.labelMaxP, this.labelMinP;
        this.minPercent, this.maxPercent;
        this.maxVolume, this.labelMaxVol;
        this.labelPriceCount;
        this.poses, this.marks, this.dataLen = 0, this.datas, this.days, this.prevclose;
        this.oldLabelMaxP, this.oldLabelMinP, this.oldLabelMaxVol, this.oldDataLen = 0, this.dataLenOffset = 0, this.isTotalRedraw = true
    }

    re.prototype.initExtValues = function () {
        this.minPrice = Number.MAX_VALUE;
        this.maxPrice = 0;
        this.minPercent = 1;
        this.maxPercent = 0;
        this.maxVolume = 0
    };
    re.prototype.initCoors = function () {
        if (!this.poses || !this.marks) {
            this.poses = [];
            this.marks = []
        }
        var t = this.dataLen;
        this.poses.length > t && this.poses.splice(t);
        this.marks.length > t && this.marks.splice(t);
        for (var e = this.poses.length; e < t; e++) {
            this.poses.push([]);
            this.marks.push([])
        }
    };
    function ae(t) {
        "use strict";
        var e = m("canvas");
        typeof FlashCanvas != "undefined" && FlashCanvas.initElement(e);
        var i = e.getContext("2d");
        var s = 1;
        t && n(t);
        function n(t) {
            s = t.hd || s;
            var n = t.width || e.width || 0, r = t.height || e.height || 0, a = s;
            e.style.width = n + "px";
            e.style.height = r + "px";
            switch (a) {
                case 0:
                    break;
                case 1:
                    a = Y.hdpr;
                    n *= a;
                    r *= a;
                    break;
                default:
                    n *= a;
                    r *= a;
                    break
            }
            e.height != r && (e.height = r);
            e.width = n;
            a && a != 1 && i.scale(a, a)
        }

        this.canvas = e;
        this.g = i;
        this.resize = n
    }

    a.xh5_Canvas = ae;
    function le(t, e, i) {
        "use strict";
        if (!i)v.error("no stage", this);
        var s, n, r, a, l, o;
        var h = [];
        s = m("canvas");
        typeof FlashCanvas != "undefined" && FlashCanvas.initElement(s);
        s.style.position = "absolute";
        s.style.zIndex = t;
        n = s.getContext("2d");
        var f = function (t) {
            var e = t.pX, i = t.pY, n = t.w, r = t.h, a = t.r;
            s.style.width = n + "px";
            s.style.height = r + "px";
            switch (a) {
                case 0:
                    break;
                case 1:
                    a = Y.hdpr;
                    n *= a;
                    r *= a;
                    break;
                default:
                    n *= a;
                    r *= a;
                    break
            }
            s.width != n && (s.width = n);
            s.height != r && (s.height = r);
            s.style.top = i + "px";
            s.style.left = e + "px"
        };
        f(e);
        this.canvas = s;
        this.resize = f;
        this.visible = function (t) {
            if (t) {
                !b(i, s) && i.appendChild(s)
            } else {
                if (b(i, s)) {
                    i.removeChild(s)
                }
            }
        };
        this.scale = function (t) {
            switch (t) {
                case 0:
                    return;
                case 1:
                    t = Y.hdpr;
                    break
            }
            t && n.scale(t, t)
        };
        this.newStyle = function (t, e, i) {
            r = n.strokeStyle = t;
            e && n.beginPath();
            i && (n.lineWidth = i)
        };
        this.newFillStyle = function (t, e) {
            if (!t || t.length < 1)return;
            var i = t.length;
            if (i == 1) {
                n.fillStyle = t[0]
            } else if (i > 1) {
                var s = n.createLinearGradient(0, 0, 0, e);
                for (var r = 0; r < i; r++) {
                    s.addColorStop(1 / (i - 1) * r, t[r])
                }
                n.fillStyle = s
            }
        };
        this.clear = function (t, e) {
            s.width = s.width;
            if (t) {
                r && n.strokeStyle != r && (n.strokeStyle = r);
                n.beginPath()
            }
            this.scale(e);
            while (h.length)h.pop()
        };
        this.clearLimit = function (t, e) {
            n.clearRect(t, 0, e, s.height);
            n.beginPath()
        };
        this.beginPath = function () {
            n.beginPath()
        };
        this.closePath = function () {
            n.closePath()
        };
        this.fill = function () {
            n.fill()
        };
        this.stroke = function (t) {
            n.stroke()
        };
        this.save = function () {
            n.save()
        };
        this.translate = function (t, e) {
            n.translate(t, e)
        };
        this.restore = function () {
            n.restore()
        };
        this.moveTo = function (t, e, i) {
            n.moveTo(t, e)
        };
        this.lineTo = function (t, e, i) {
            n.lineTo(t, e)
        };
        this.drawDot = function (t, e, i) {
            n.arc(t, e, i, 0, Math.PI * 2)
        };
        this.arc = function (t, e, i, s, r, a) {
            n.arc(t, e, i, s, r, a)
        };
        this.drawiDot = function (t, e, i, s) {
            var n = new c(t, e, i, s);
            n.draw();
            h[h.length] = n
        };
        this.iDotInteract = function (t, e) {
            if (n.isPointInPath(t * Y.hdpr, e * Y.hdpr)) {
                for (var i = h.length; i--;) {
                    var s = h[i];
                    if (s.interact(t, e)) {
                        return s;
                        break
                    }
                }
            }
            return null
        };
        function c(t, e, i, s) {
            var r = this, a = i;
            this.x = t;
            this.y = e;
            this.data = s;
            var l = function (t, e) {
                return Math.sqrt(Math.pow(t - r.x, 2) + Math.pow(e - r.y, 2))
            };
            this.draw = function () {
                n.moveTo(t, e);
                n.arc(t, e, i, 0, Math.PI * 2)
            };
            this.interact = function (t, e) {
                return l(t, e) <= a
            }
        }

        this.drawCandleRect = function (t, e, i, s, r, a) {
            if (e == i)return;
            t += s[0] * .4;
            if (a) {
                n.fillStyle != r && (n.fillStyle = r);
                n.fillRect(t, e, s[1], i - e)
            } else {
                n.strokeStyle != r && (n.strokeStyle = r);
                n.strokeRect(t, e, s[1], i - e)
            }
        };
        this.drawCandleLineRect = function (t, e, i, s, r, a, l, o) {
            t += a[0];
            n.strokeStyle != l && (n.strokeStyle = l);
            n.lineWidth != 1 && (n.lineWidth = 1);
            if (i == s) {
                var h = a[1] * .5;
                n.moveTo(t - h, i);
                n.lineTo(t + h, i)
            }
            if (e != r) {
                n.moveTo(t, e);
                if (!o) {
                    n.lineTo(t, i);
                    n.moveTo(t, s)
                }
                n.lineTo(t, r)
            }
        };
        this.drawCandle = function (t, e, i, s, r, a, l) {
            t = t + a[0];
            n.strokeStyle != l && (n.strokeStyle = l);
            n.beginPath();
            if (i - s == 0) {
                n.lineWidth = 1;
                var o = a[1] * .5;
                n.moveTo(t - o, i);
                n.lineTo(t + o, i)
            } else {
                n.lineWidth != a[1] && (n.lineWidth = a[1]);
                n.moveTo(t, i);
                n.lineTo(t, s)
            }
            n.stroke();
            if (e - r != 0) {
                n.lineWidth = 1;
                n.moveTo(t, e);
                n.lineTo(t, r);
                n.stroke()
            }
        };
        this.drawCandleC = function (t, e, i, s, r) {
            if (e == i)return;
            t = t + s[0];
            n.strokeStyle != r && (n.strokeStyle = r);
            n.lineWidth != s[1] && (n.lineWidth = s[1]);
            n.moveTo(t, e);
            n.lineTo(t, i)
        };
        this.drawCandleLineC = function (t, e, i, s, r, a, l) {
            t = t + a[0];
            n.strokeStyle != l && (n.strokeStyle = l);
            n.lineWidth != 1 && (n.lineWidth = 1);
            if (i == s) {
                var o = a[1] * .5;
                n.moveTo(t - o, i);
                n.lineTo(t + o, i)
            }
            if (e != r) {
                n.moveTo(t, e);
                n.lineTo(t, r)
            }
        };
        this.drawVStickC = function (t, e, i, s, r) {
            t = t + i[0];
            n.strokeStyle != r && (n.strokeStyle = r);
            n.lineWidth != i[1] && (n.lineWidth = i[1]);
            n.moveTo(t, e);
            n.lineTo(t, e + s)
        }
    }

    var oe = [], he = function (t) {
        for (var e, i = oe.length; i--;) {
            e = g(oe[i]);
            e && (e.style.display = t ? "none" : "")
        }
    }, fe = [], ce = function (t) {
        for (var e, i = fe.length; i--;) {
            e = fe[i];
            e && (e.style.display = t ? "none" : "")
        }
    };

    function ue(t, e, i) {
        "use strict";
        if (!i)v.error("no stage", this);
        var s = t, n, r, a, l, o, h, f = 9, c = e.PARAM.K_CL_NUM + 1, u = e.DIMENSION.w_main, d = e.URLHASH.KCL, p, g = e.PARAM.minCandleNum, m = e.PARAM.K_TO_CL_LIMIT, N, b, _ = 0;
        var I;
        var y = {
            isTch: false, pX: null, sEh: function (t) {
                var e = j.istd ? ["touchmove", "touchend"] : ["mousemove", "mouseup", "mouseout"], s = e.length, n;
                for (n = 0; n < s; n++)F.removeHandler(i, e[n], this);
                if (t) {
                    for (n = 0; n < s; n++)F.addHandler(i, e[n], this)
                }
            }, onD: function (t) {
                if (!h || !N)return;
                y.pX = t;
                o = l - a;
                p = u / o;
                y.sEh(true)
            }, onM: function (t) {
                if (n)return;
                var e = t.changedTouches ? t.changedTouches[0].clientX : t.layerX;
                isNaN(e) && (e = t.offsetX);
                var i = e - this.pX;
                if (Math.abs(i) < p)return;
                this.pX = e;
                var s = Math.floor(i * o / u);
                a -= s;
                l -= s;
                if (l >= b) {
                    l = b;
                    a = l - o
                }
                if (a < 0) {
                    a = 0;
                    l = o
                }
                M()
            }, tE: function () {
                this.isT = false;
                this.sEh(false)
            }, tM: function (t) {
                this.isTch = true;
                this.onM(t)
            }, mE: function () {
                this.sEh(false)
            }, mM: function (t) {
                if (this.isTch)return;
                this.onM(t)
            }, handleEvent: function (t) {
                switch (t.type) {
                    case"touchend":
                        this.tE();
                        break;
                    case"touchmove":
                        this.tM(t);
                        break;
                    case"mouseout":
                    case"mouseup":
                        this.mE();
                        break;
                    case"mousemove":
                        this.mM(t);
                        break
                }
            }
        };
        this.is5T = false;
        this.setCtrlCbs = function (t) {
            I = t
        };
        this.setView = function (t, e, i) {
            n = t;
            r = e;
            if (n) {
                N = s.t().tState();
                if (this.is5T) {
                    a = 0;
                    l = 5
                } else if (r == 5) {
                    a = 4;
                    l = 5
                } else {
                    a = N["t" + r + "v"];
                    l = N["t" + r + "b"]
                }
            } else {
                N = s.k().kState();
                a = N.get("k" + r + "v");
                l = N.get("k" + r + "b");
                b = N.get("k" + r).length;
                l + f > b && (l = b)
            }
            h = n ? Boolean(r != 1) : Boolean(l - a >= g);
            M(true)
        };
        this.resize = function () {
            u = e.DIMENSION.w_main;
            p = u / o;
            M()
        };
        this.update = function (t) {
            var e = false;
            if (n) {
                e = true
            } else {
                if (t || ++_ % 2 == 0) {
                    _ = 0;
                    b = N.get("k" + r).length;
                    l + f > b && (l = b);
                    e = t || l >= b && l - a < c
                }
            }
            if (e) {
                M(false, true)
            }
        };
        this.zoomView = function (t) {
            if (n) {
            } else {
                if (r >= 900)return;
                var e = Math.ceil((l - a) * .1);
                if (t) {
                    if (r == d) {
                    } else {
                        if (l - a + e >= m)return
                    }
                    if (a > 0) {
                        (a -= e) < 0 && (a = 0)
                    } else if (l < b) {
                        (l += e) > b && (l = b)
                    } else return
                } else {
                    if (r == d) {
                    } else {
                        if (a + g >= l)return
                    }
                    (a += e) >= l - g && (a = l - g)
                }
                M()
            }
        };
        this.globalDrag = y.onD;
        function M(t, e) {
            if (n) {
                N["t" + r + "v"] = a;
                N["t" + r + "b"] = l
            } else {
                N.set("k" + r + "v", a);
                N.set("k" + r + "b", l)
            }
            I(a, l, t, e)
        }
    }

    de.prototype = new ne(1);
    function de(t, e) {
        var i = this, s = true, n = s ? t.DIMENSION.w_main : t.DIMENSION.w_k, r = t.DIMENSION.h_t;
        ne.call(this, e);
        this.scfg = t;
        this.ic({});
        this.dr(s);
        var a = [], l, o, h = function () {
            o = t.PARAM.getHd();
            return {
                pX: t.DIMENSION.posX,
                pY: t.DIMENSION.posY + t.DIMENSION.h_main + t.DIMENSION.H_TIME_PART + t.DIMENSION.h_vol + t.DIMENSION.H_T_TITLE,
                w: n,
                h: r + 1,
                r: o
            }
        }, f = function (e) {
            s = e;
            n = s ? t.DIMENSION.w_main : t.DIMENSION.w_k;
            r = t.DIMENSION.h_t;
            this.dr(s);
            var i = h();
            for (var a = 0, l = this.gArr.length; a < l; a++)this.gArr[a].resize(i)
        };
        this.resize = f;
        l = new le(t.PARAM.G_Z_INDEX, h(), e);
        this.gArr = this.iArr = [l];
        var c = t.datas.tDataLen;
        var u = [], d = t.COLOR.T_LB;
        this.curLen;
        this.linkData = function (t) {
            this.ca(u);
            this.ca(a);
            var e = 0, i, s;
            for (var n = 0, r = t.length; n < r; n++) {
                s = 0;
                i = 0;
                if (!isNaN(t[n][0].lastfive) && t[n][0].lastfive > 0)s = t[n][0].lastfive;
                for (var l = 0; l < c; l++) {
                    i += Number(t[n][l].volume);
                    e = s <= 0 ? 0 : i / s / (l + 1);
                    e < 0 && (e = 0);
                    u[u.length] = e
                }
            }
        };
        this.calc = function (t, e) {
            var i = (e - t) * c;
            while (a.length > i)a.length--;
            while (a.length < i)a[a.length] = {};
            var s, n = e * c, l = .1, o = 0, h = t * c, f = 0;
            for (s = h; s < n; s++) {
                f = s - h;
                a[f].lb = u[f];
                if (u[f] < o)o = u[f];
                if (u[f] > l)l = u[f]
            }
            var d = l - o;
            for (s = 0; s < i; s++) {
                a[s].lby = d == 0 || a[s].lb <= .001 ? r : r * (l - a[s].lb) / d
            }
            var v = {min: o, max: l, p: 3};
            this.sm(v)
        };
        this.draw = function () {
            l.clear(true, o);
            l.newStyle(d, false, 1);
            var t = a.length, e = n / t, i = e * .5;
            for (var s = 0; s < this.curLen; s++) {
                if (s % c == 0)l.moveTo(i, a[s].lby); else l.lineTo(i, a[s].lby);
                i += e
            }
            l.stroke()
        };
        this.iTo = function (t) {
            if (!a || !a.length)return;
            if (t >= a.length)t = a.length - 1;
            if (t > this.curLen)t = this.curLen;
            this.t(["", null], ["LB: " + Number(a[t].lb).toFixed(3), d], ["", null])
        }
    }

    ve.prototype = new ne(1);
    function ve(t, e) {
        var i = this, s = false, n = s ? t.DIMENSION.w_main : t.DIMENSION.w_k, r = t.DIMENSION.h_t;
        ne.call(this, e);
        this.scfg = t;
        this.ic({});
        this.dr(s);
        var a = [], l, o, h = function () {
            o = t.PARAM.getHd();
            return {
                pX: t.DIMENSION.posX,
                pY: t.DIMENSION.posY + t.DIMENSION.h_main + t.DIMENSION.H_TIME_PART + t.DIMENSION.h_vol + t.DIMENSION.H_T_TITLE,
                w: n,
                h: r + 1,
                r: o
            }
        }, f = function (e) {
            s = e;
            n = s ? t.DIMENSION.w_main : t.DIMENSION.w_k;
            r = t.DIMENSION.h_t;
            this.dr(s);
            var i = h();
            for (var a = 0, l = this.gArr.length; a < l; a++)this.gArr[a].resize(i)
        };
        this.resize = f;
        l = new le(t.PARAM.G_Z_INDEX, h(), e);
        this.gArr = this.iArr = [l];
        var c = [], u = [], d = 12, v = 26, p = 9, g, m, N = "#0000ff", b = "#ff00ff", _ = "#c00000", I = "#00c000", y = "#c00000", M = function (t, e, i) {
            return (i - 1) * t / (i + 1) + e * 2 / (i + 1)
        };
        this.linkData = function (t) {
            this.ca(a);
            this.ca(c);
            this.ca(u);
            var e = t.length, i = t[0], s = i.close, n = i.close, r = s - n, l = r * 2 / (p + 1);
            u[u.length] = r;
            c[c.length] = l;
            for (var o = 1; o < e; o++) {
                i = t[o];
                s = M(s, i.close, d);
                n = M(n, i.close, v);
                r = s - n;
                l = M(c[o - 1], r, p);
                u[u.length] = r;
                c[c.length] = l
            }
        };
        this.calc = function (t, e) {
            var i = e - t;
            while (a.length > i)a.length--;
            while (a.length < i)a[a.length] = {};
            g = Number.MIN_VALUE;
            m = Number.MAX_VALUE;
            var s;
            for (s = t; s < e; s++) {
                var n = a[s - t];
                n.dif = u[s];
                n.dea = c[s];
                n.bar = (n.dif - n.dea) * 2;
                m = Math.min(n.dif, n.dea, n.bar, m);
                g = Math.max(n.dif, n.dea, n.bar, g)
            }
            g = Math.max(Math.abs(g), Math.abs(m));
            m = -g;
            var l = g - m;
            for (s = 0; s < i; s++) {
                a[s].dify = r * (g - a[s].dif) / l;
                a[s].deay = r * (g - a[s].dea) / l;
                a[s].bary = r * (g - a[s].bar) / l
            }
            var o = g > 1e3 ? 1 : g > 10 ? 2 : 3;
            var h = {min: m, max: g, p: o};
            this.sm(h)
        };
        this.draw = function () {
            l.clear(true, o);
            var t = a.length, e = n / t, i;
            var s = e * .5;
            l.newStyle(N, true, 1);
            for (i = 0; i < t; i++) {
                if (i == 0) {
                    l.moveTo(s, a[i].dify)
                } else {
                    l.lineTo(s, a[i].dify)
                }
                s += e
            }
            l.stroke();
            s = e * .5;
            l.newStyle(b, true, 1);
            for (i = 0; i < t; i++) {
                if (i == 0) {
                    l.moveTo(s, a[i].deay)
                } else {
                    l.lineTo(s, a[i].deay)
                }
                s += e
            }
            l.stroke();
            var h = g / (g - m) * r, f;
            s = e * .5;
            l.newStyle(_, true, 1);
            for (i = 0; i < t; i++) {
                f = a[i].bary;
                if (f <= h) {
                    l.moveTo(s, h);
                    l.lineTo(s, f)
                }
                s += e
            }
            l.stroke();
            s = e * .5;
            l.newStyle(I, true, 1);
            for (i = 0; i < t; i++) {
                f = a[i].bary;
                if (f > h) {
                    l.moveTo(s, h);
                    l.lineTo(s, f)
                }
                s += e
            }
            l.stroke()
        };
        this.iTo = function (t) {
            if (!a || !a.length)return;
            if (t >= a.length)t = a.length - 1;
            var e = a[t], i = g > 1e3 ? 1 : g > 10 ? 2 : 3;
            this.t(["DIF: " + Number(e.dif).toFixed(i), N], ["DEA: " + Number(e.dea).toFixed(i), b], ["MACD: " + Number(e.bar).toFixed(i), y])
        }
    }

    pe.prototype = new ne(1);
    function pe(t, e) {
        var i = this, s = false, n = s ? t.DIMENSION.w_main : t.DIMENSION.w_k, r = t.DIMENSION.h_t;
        ne.call(this, e);
        this.scfg = t;
        this.ic({});
        this.dr(s);
        var a = [], l, o, h = function () {
            o = t.PARAM.getHd();
            return {
                pX: t.DIMENSION.posX,
                pY: t.DIMENSION.posY + t.DIMENSION.h_main + t.DIMENSION.H_TIME_PART + t.DIMENSION.h_vol + t.DIMENSION.H_T_TITLE,
                w: n,
                h: r + 1,
                r: o
            }
        }, f = function (e) {
            s = e;
            n = s ? t.DIMENSION.w_main : t.DIMENSION.w_k;
            r = t.DIMENSION.h_t;
            this.dr(s);
            var i = h();
            for (var a = 0, l = this.gArr.length; a < l; a++)this.gArr[a].resize(i)
        };
        this.resize = f;
        l = new le(t.PARAM.G_Z_INDEX, h(), e);
        this.gArr = this.iArr = [l];
        var c = 3, u = 3, d = 9, v = 17, p = "#0000ff", g = "#ff00ff", m = "#00ffff", N = [], b = [], _ = [], I, y, M = function (t, e) {
            I = Number.MAX_VALUE;
            y = .01;
            var i, s = 0;
            if (t >= d)s = t - d + 1;
            for (; s <= t; s++) {
                i = e[s];
                if (i.low < I)I = i.low;
                if (i.high > y)y = i.high
            }
        };
        this.linkData = function (t) {
            this.ca(a);
            this.ca(N);
            this.ca(b);
            this.ca(_);
            var e = t.length;
            var i, s, n, r, l = t[0];
            if (l.high == l.low)i = v; else i = (l.close - l.low) / (l.high - l.low) * 100 / c;
            s = i / u;
            n = 3 * i - 2 * s;
            N[N.length] = i;
            b[b.length] = s;
            _[_.length] = n;
            for (var o = 1; o < e; o++) {
                l = t[o];
                M(o, t);
                if (y == I)i = v; else {
                    r = (l.close - I) / (y - I) * 100;
                    i = (c - 1) * N[o - 1] / c + r / c
                }
                s = (u - 1) * b[o - 1] / u + i / u;
                n = 3 * i - 2 * s;
                N[N.length] = i;
                b[b.length] = s;
                _[_.length] = n
            }
        };
        this.calc = function (t, e) {
            var i = e - t;
            while (a.length > i)a.length--;
            while (a.length < i)a[a.length] = {};
            var s = Number.MAX_VALUE, n = Number.MIN_VALUE, l, o;
            for (l = t; l < e; l++) {
                o = a[l - t];
                o.k = N[l];
                o.d = b[l];
                o.j = _[l];
                s = Math.min(o.k, o.d, o.j, s);
                n = Math.max(o.k, o.d, o.j, n)
            }
            var h = n - s;
            for (l = 0; l < i; l++) {
                a[l].ky = r * (n - a[l].k) / h;
                a[l].dy = r * (n - a[l].d) / h;
                a[l].jy = r * (n - a[l].j) / h
            }
            var o = {min: s, max: n, p: 2};
            this.sm(o)
        };
        this.draw = function () {
            l.clear(true, o);
            var t = a.length, e = n / t, i;
            var s = e * .5;
            l.newStyle(p, true, 1);
            for (i = 0; i < t; i++) {
                if (i == 0)l.moveTo(s, a[i].ky); else l.lineTo(s, a[i].ky);
                s += e
            }
            l.stroke();
            s = e * .5;
            l.newStyle(g, true, 1);
            for (i = 0; i < t; i++) {
                if (i == 0)l.moveTo(s, a[i].dy); else l.lineTo(s, a[i].dy);
                s += e
            }
            l.stroke();
            s = e >> 1;
            l.newStyle(m, true, 1);
            for (i = 0; i < t; i++) {
                if (i == 0)l.moveTo(s, a[i].jy); else l.lineTo(s, a[i].jy);
                s += e
            }
            l.stroke()
        };
        this.iTo = function (t) {
            if (!a || !a.length)return;
            if (t >= a.length)t = a.length - 1;
            var e = a[t];
            this.t(["K: " + Number(e.k).toFixed(2), p], ["D: " + Number(e.d).toFixed(2), g], ["J: " + Number(e.j).toFixed(2), m])
        }
    }

    ge.prototype = new ne(1);
    function ge(t, e) {
        var i = this, s = false, n = s ? t.DIMENSION.w_main : t.DIMENSION.w_k, r = t.DIMENSION.h_t;
        ne.call(this, e);
        this.scfg = t;
        this.ic({});
        this.dr(s);
        var a = [], l, o, h = function () {
            o = t.PARAM.getHd();
            return {
                pX: t.DIMENSION.posX,
                pY: t.DIMENSION.posY + t.DIMENSION.h_main + t.DIMENSION.H_TIME_PART + t.DIMENSION.h_vol + t.DIMENSION.H_T_TITLE,
                w: n,
                h: r + 1,
                r: o
            }
        }, f = function (e) {
            s = e;
            n = s ? t.DIMENSION.w_main : t.DIMENSION.w_k;
            r = t.DIMENSION.h_t;
            this.dr(s);
            var i = h();
            for (var a = 0, l = this.gArr.length; a < l; a++)this.gArr[a].resize(i)
        };
        this.resize = f;
        l = new le(t.PARAM.G_Z_INDEX, h(), e);
        this.gArr = this.iArr = [l];
        var c = [], u = [], d = [], v = [], p = "#0000ff", g = "#ff00ff", m = "#00ffff", N = 20, b = function (t, e) {
            for (var i, s = 0, n = 0, r, a = [], l = 0, o = t.length; l < o; l++) {
                r = Number(t[l].close);
                s += r;
                if (l >= e - 1) {
                    i = s / e;
                    s -= t[l - e + 1].close
                } else i = s / (l + 1);
                c[c.length] = i;
                a[l] = Math.pow(r - i, 2);
                n += a[l];
                if (l > e - 1)n -= a[l - e];
                v[v.length] = n
            }
        };
        this.linkData = function (t) {
            this.ca(a);
            this.ca(c);
            this.ca(u);
            this.ca(d);
            this.ca(v);
            b(t, N);
            for (var e, i = 0, s = t.length; i < s; i++) {
                e = 2 * Math.sqrt(v[i] / Math.min(i + 1, N));
                u[u.length] = c[i] + e;
                d[d.length] = c[i] - e
            }
        };
        this.calc = function (t, e) {
            var i = e - t;
            while (a.length > i)a.length--;
            while (a.length < i)a[a.length] = {};
            var s = Number.MAX_VALUE, n = Number.MIN_VALUE, l;
            for (l = t; l < e; l++) {
                var o = a[l - t];
                o.boll = c[l];
                o.upper = u[l];
                o.lower = d[l];
                if (o.lower < s)s = o.lower;
                if (o.upper > n)n = o.upper
            }
            var h = n - s;
            for (l = 0; l < i; l++) {
                a[l].bolly = r * (n - a[l].boll) / h;
                a[l].uppery = r * (n - a[l].upper) / h;
                a[l].lowery = r * (n - a[l].lower) / h
            }
            var o = {min: s, max: n, p: 2};
            this.sm(o)
        };
        this.draw = function () {
            l.clear(true, o);
            var t = a.length, e = n / t, i;
            var s = e * .5;
            l.newStyle(p, true, 1);
            for (i = 0; i < t; i++) {
                if (i == 0)l.moveTo(s, a[i].bolly); else l.lineTo(s, a[i].bolly);
                s += e
            }
            l.stroke();
            s = e * .5;
            l.newStyle(g, true, 1);
            for (i = 0; i < t; i++) {
                if (i == 0)l.moveTo(s, a[i].uppery); else l.lineTo(s, a[i].uppery);
                s += e
            }
            l.stroke();
            s = e * .5;
            l.newStyle(m, true, 1);
            for (i = 0; i < t; i++) {
                if (i == 0)l.moveTo(s, a[i].lowery); else l.lineTo(s, a[i].lowery);
                s += e
            }
            l.stroke()
        };
        this.iTo = function (t) {
            if (!a || !a.length)return;
            if (t >= a.length)t = a.length - 1;
            var e = a[t], i = 2;
            this.t(["BOLL: " + Number(e.boll).toFixed(i), p], ["UPPER: " + Number(e.upper).toFixed(i), g], ["LOWER: " + Number(e.lower).toFixed(i), m])
        }
    }

    me.prototype = new ne(1);
    function me(t, e) {
        var i = this, s = false, n = s ? t.DIMENSION.w_main : t.DIMENSION.w_k, r = t.DIMENSION.h_t;
        ne.call(this, e);
        this.scfg = t;
        this.ic({});
        this.dr(s);
        var a = [], l, o, h = function () {
            o = t.PARAM.getHd();
            return {
                pX: t.DIMENSION.posX,
                pY: t.DIMENSION.posY + t.DIMENSION.h_main + t.DIMENSION.H_TIME_PART + t.DIMENSION.h_vol + t.DIMENSION.H_T_TITLE,
                w: n,
                h: r + 1,
                r: o
            }
        }, f = function (e) {
            s = e;
            n = s ? t.DIMENSION.w_main : t.DIMENSION.w_k;
            r = t.DIMENSION.h_t;
            this.dr(s);
            var i = h();
            for (var a = 0, l = this.gArr.length; a < l; a++)this.gArr[a].resize(i)
        };
        this.resize = f;
        l = new le(t.PARAM.G_Z_INDEX, h(), e);
        this.gArr = this.iArr = [l];
        var c = "#0000ff", u = "#ff00ff", d = 12, v = 6, p = [], g = [];
        this.linkData = function (t) {
            this.ca(a);
            this.ca(p);
            this.ca(g);
            var e = t[0], i = isNaN(e.prevclose) || e.prevclose < e.close ? 1 : 0, s = i, n = i / d * 100, r = n;
            p[p.length] = n;
            g[g.length] = n;
            var l = [i];
            for (var o = 1, h = t.length; o < h; o++) {
                i = t[o].close > t[o - 1].close ? 1 : 0;
                l[l.length] = i;
                s += i;
                if (o >= d)s -= l[o - d];
                n = s / d * 100;
                p[p.length] = n;
                r += n;
                if (o >= v) {
                    r -= p[o - v];
                    g[g.length] = r / v
                } else g[g.length] = r / (o + 1)
            }
        };
        this.calc = function (t, e) {
            var i = e - t;
            while (a.length > i)a.length--;
            while (a.length < i)a[a.length] = {};
            var s, n = 100, l = 1;
            for (s = t; s < e; s++) {
                var o = a[s - t];
                o.psy = p[s];
                o.psyma = g[s];
                n = Math.min(o.psy, o.psyma, n);
                l = Math.max(o.psy, o.psyma, l)
            }
            var h = l - n;
            for (s = 0; s < i; s++) {
                a[s].psyy = r * (l - a[s].psy) / h;
                a[s].psymay = r * (l - a[s].psyma) / h
            }
            var o = {min: n, max: l, p: 2};
            this.sm(o)
        };
        this.draw = function () {
            l.clear(true, o);
            var t = a.length, e = n / t, i, s;
            s = e * .5;
            l.newStyle(c, true, 1);
            for (i = 0; i < t; i++) {
                if (i == 0)l.moveTo(s, a[i].psyy); else l.lineTo(s, a[i].psyy);
                s += e
            }
            l.stroke();
            s = e * .5;
            l.newStyle(u, true, 1);
            for (i = 0; i < t; i++) {
                if (i == 0)l.moveTo(s, a[i].psymay); else l.lineTo(s, a[i].psymay);
                s += e
            }
            l.stroke()
        };
        this.iTo = function (t) {
            if (!a || !a.length)return;
            if (t >= a.length)t = a.length - 1;
            var e = a[t], i = 2;
            this.t(["PSY: " + Number(e.psy).toFixed(i), c], ["PSYMA: " + Number(e.psyma).toFixed(i), u], ["", null])
        }
    }

    Ne.prototype = new ne(1);
    function Ne(t, e) {
        var i = this, s = false, n = s ? t.DIMENSION.w_main : t.DIMENSION.w_k, r = t.DIMENSION.h_t;
        ne.call(this, e);
        this.scfg = t;
        this.ic({});
        this.dr(s);
        var a = [], l, o, h = function () {
            o = t.PARAM.getHd();
            return {
                pX: t.DIMENSION.posX,
                pY: t.DIMENSION.posY + t.DIMENSION.h_main + t.DIMENSION.H_TIME_PART + t.DIMENSION.h_vol + t.DIMENSION.H_T_TITLE,
                w: n,
                h: r + 1,
                r: o
            }
        }, f = function (e) {
            s = e;
            n = s ? t.DIMENSION.w_main : t.DIMENSION.w_k;
            r = t.DIMENSION.h_t;
            this.dr(s);
            var i = h();
            for (var a = 0, l = this.gArr.length; a < l; a++)this.gArr[a].resize(i)
        };
        this.resize = f;
        l = new le(t.PARAM.G_Z_INDEX, h(), e);
        this.gArr = this.iArr = [l];
        var c = "#0000ff", u = "#ff00ff", d = 30, v = [], p = [];
        this.linkData = function (t) {
            this.ca(a);
            this.ca(v);
            this.ca(p);
            var e = 0, i = 0, s, n = t[0];
            s = isNaN(n.prevclose) || n.close > n.prevclose ? n.volume : -n.volume;
            e = n.close == n.prevclose ? 0 : s;
            i = e;
            v[v.length] = e;
            p[p.length] = e;
            for (var r = 1, l = t.length; r < l; r++) {
                if (t[r].close > t[r - 1].close)s = Number(t[r].volume); else if (t[r].close == t[r - 1].close)s = 0; else s = -Number(t[r].volume);
                e = s + v[r - 1];
                v[v.length] = e;
                i += e;
                if (r >= d) {
                    i -= v[r - d];
                    p[p.length] = i / d
                } else p[p.length] = i / (r + 1)
            }
        };
        this.calc = function (t, e) {
            var i = e - t;
            while (a.length > i)a.length--;
            while (a.length < i)a[a.length] = {};
            var s, n = Number.MAX_VALUE, l = Number.MIN_VALUE;
            for (s = t; s < e; s++) {
                var o = a[s - t];
                o.obv = v[s];
                o.obvma = p[s];
                n = Math.min(o.obv, o.obvma, n);
                l = Math.max(o.obv, o.obvma, l)
            }
            var h = l - n;
            for (s = 0; s < i; s++) {
                a[s].obvy = r * (l - a[s].obv) / h;
                a[s].obvmay = r * (l - a[s].obvma) / h
            }
            var o = {min: n, max: l, p: 2};
            this.sm(o)
        };
        this.draw = function () {
            l.clear(true, o);
            var t = a.length, e = n / t, i, s;
            s = e * .5;
            l.newStyle(c, true, 1);
            for (i = 0; i < t; i++) {
                if (i == 0)l.moveTo(s, a[i].obvy); else l.lineTo(s, a[i].obvy);
                s += e
            }
            l.stroke();
            s = e * .5;
            l.newStyle(u, true, 1);
            for (i = 0; i < t; i++) {
                if (i == 0)l.moveTo(s, a[i].obvmay); else l.lineTo(s, a[i].obvmay);
                s += e
            }
            l.stroke()
        };
        this.iTo = function (t) {
            if (!a || !a.length)return;
            if (t >= a.length)t = a.length - 1;
            var e = a[t], i = 2;
            this.t(["OBV: " + g(Number(e.obv)), c], ["OBVMA30: " + g(Number(e.obvma)), u], ["", null])
        };
        function g(t) {
            if (Math.abs(t) > 1e9) {
                return (t / 1e8).toFixed(2) + "亿"
            } else if (Math.abs(t) > 1e5) {
                return (t / 1e4).toFixed(2) + "万"
            } else return t.toFixed(2)
        }
    }

    be.prototype = new ne(1);
    function be(t, e) {
        var i = this, s = false, n = s ? t.DIMENSION.w_main : t.DIMENSION.w_k, r = t.DIMENSION.h_t;
        ne.call(this, e);
        this.scfg = t;
        this.ic({});
        this.dr(s);
        var a = [], l, o, h = function () {
            o = t.PARAM.getHd();
            return {
                pX: t.DIMENSION.posX,
                pY: t.DIMENSION.posY + t.DIMENSION.h_main + t.DIMENSION.H_TIME_PART + t.DIMENSION.h_vol + t.DIMENSION.H_T_TITLE,
                w: n,
                h: r + 1,
                r: o
            }
        }, f = function (e) {
            s = e;
            n = s ? t.DIMENSION.w_main : t.DIMENSION.w_k;
            r = t.DIMENSION.h_t;
            this.dr(s);
            var i = h();
            for (var a = 0, l = this.gArr.length; a < l; a++)this.gArr[a].resize(i)
        };
        this.resize = f;
        l = new le(t.PARAM.G_Z_INDEX, h(), e);
        this.gArr = this.iArr = [l];
        var c = "#0000ff", u = "#ff00ff", d = "#00ffff", v = 6, p = 12, g = 24, m = [], N = [], b = [], _ = [], I = function (t) {
            var e, i, s, n, r, a;
            var l, o, h, f, c;
            var u = t[0];
            if (isNaN(u.prevclose) || u.prevlose < 0) {
                e = i = s = n = r = a = o = h = u.close * .1
            } else {
                l = u.close - u.prevclose;
                e = i = s = o = Math.max(l, 0);
                n = r = a = h = Math.abs(l)
            }
            f = [o];
            c = [h];
            _[_.length] = {ma1: o, ma2: o, ma3: o, ma4: h, ma5: h, ma6: h};
            for (var d = 1, m = t.length; d < m; d++) {
                l = t[d].close - t[d - 1].close;
                o = Math.max(l, 0);
                h = Math.abs(l);
                f[f.length] = o;
                c[c.length] = h;
                var N = {};
                e += o;
                if (d >= v) {
                    e = o + _[d - 1].ma1 * (v - 1);
                    N.ma1 = e / v
                } else N.ma1 = e / (d + 1);
                i += o;
                if (d >= p) {
                    i = o + _[d - 1].ma2 * (p - 1);
                    N.ma2 = i / p
                } else N.ma2 = i / (d + 1);
                s += o;
                if (d >= g) {
                    s = o + _[d - 1].ma3 * (g - 1);
                    N.ma3 = s / g
                } else N.ma3 = s / (d + 1);
                n += h;
                if (d >= v) {
                    n = h + _[d - 1].ma4 * (v - 1);
                    N.ma4 = n / v
                } else N.ma4 = n / (d + 1);
                r += h;
                if (d >= p) {
                    r = h + _[d - 1].ma5 * (p - 1);
                    N.ma5 = r / p
                } else N.ma5 = r / (d + 1);
                a += h;
                if (d >= g) {
                    a = h + _[d - 1].ma6 * (g - 1);
                    N.ma6 = a / g
                } else N.ma6 = a / (d + 1);
                _[_.length] = N
            }
        };
        this.linkData = function (t) {
            this.ca(a);
            this.ca(m);
            this.ca(N);
            this.ca(b);
            this.ca(_);
            I(t);
            var e = _[0];
            for (var i = 0, s = t.length; i < s; i++) {
                e = _[i];
                m[m.length] = e.ma4 > 0 ? e.ma1 / e.ma4 * 100 : m[i - 1];
                N[N.length] = e.ma5 > 0 ? e.ma2 / e.ma5 * 100 : N[i - 1];
                b[b.length] = e.ma6 > 0 ? e.ma3 / e.ma6 * 100 : b[i - 1]
            }
        };
        this.calc = function (t, e) {
            var i = e - t;
            while (a.length > i)a.length--;
            while (a.length < i)a[a.length] = {};
            var s, n = Number.MAX_VALUE, l = Number.MIN_VALUE;
            for (s = t; s < e; s++) {
                var o = a[s - t];
                o.rsi1 = m[s];
                o.rsi2 = N[s];
                o.rsi3 = b[s];
                n = Math.min(o.rsi1, o.rsi2, o.rsi3, n);
                l = Math.max(o.rsi1, o.rsi2, o.rsi3, l)
            }
            var h = l - n;
            for (s = 0; s < i; s++) {
                a[s].rsi1y = r * (l - a[s].rsi1) / h;
                a[s].rsi2y = r * (l - a[s].rsi2) / h;
                a[s].rsi3y = r * (l - a[s].rsi3) / h
            }
            var o = {min: n, max: l, p: 2};
            this.sm(o)
        };
        this.draw = function () {
            l.clear(true, o);
            var t = a.length, e = n / t, i, s;
            s = e * .5;
            l.newStyle(c, true, 1);
            for (i = 0; i < t; i++) {
                if (i == 0)l.moveTo(s, a[i].rsi1y); else l.lineTo(s, a[i].rsi1y);
                s += e
            }
            l.stroke();
            s = e * .5;
            l.newStyle(u, true, 1);
            for (i = 0; i < t; i++) {
                if (i == 0)l.moveTo(s, a[i].rsi2y); else l.lineTo(s, a[i].rsi2y);
                s += e
            }
            l.stroke();
            s = e * .5;
            l.newStyle(d, true, 1);
            for (i = 0; i < t; i++) {
                if (i == 0)l.moveTo(s, a[i].rsi3y); else l.lineTo(s, a[i].rsi3y);
                s += e
            }
            l.stroke()
        };
        this.iTo = function (t) {
            if (!a || !a.length)return;
            if (t >= a.length)t = a.length - 1;
            var e = a[t], i = 2;
            this.t(["RSI" + v + ": " + Number(e.rsi1).toFixed(i), c], ["RSI" + p + ": " + Number(e.rsi2).toFixed(i), u], ["RSI" + g + ": " + Number(e.rsi3).toFixed(i), d])
        }
    }

    _e.prototype = new ne(1);
    function _e(t, e) {
        var i = this, s = false, n = s ? t.DIMENSION.w_main : t.DIMENSION.w_k, r = t.DIMENSION.h_t;
        ne.call(this, e);
        this.scfg = t;
        this.ic({});
        this.dr(s);
        var a = [], l, o, h = function () {
            o = t.PARAM.getHd();
            return {
                pX: t.DIMENSION.posX,
                pY: t.DIMENSION.posY + t.DIMENSION.h_main + t.DIMENSION.H_TIME_PART + t.DIMENSION.h_vol + t.DIMENSION.H_T_TITLE,
                w: n,
                h: r + 1,
                r: o
            }
        }, f = function (e) {
            s = e;
            n = s ? t.DIMENSION.w_main : t.DIMENSION.w_k;
            r = t.DIMENSION.h_t;
            this.dr(s);
            var i = h();
            for (var a = 0, l = this.gArr.length; a < l; a++)this.gArr[a].resize(i)
        };
        this.resize = f;
        l = new le(t.PARAM.G_Z_INDEX, h(), e);
        this.gArr = this.iArr = [l];
        var c = "#0000ff", u = "#ff00ff", d = 24, v = 6, p = 1e4, g = [], m = [];
        this.linkData = function (t) {
            this.ca(a);
            this.ca(g);
            this.ca(m);
            for (var e, i = [], s = 0, n, r = 0, l, o = 0, h = t.length; o < h; o++) {
                l = t[o];
                e = l.high == l.low ? 0 : (l.close - l.open) / (l.high - l.low) * l.volume;
                i[i.length] = e;
                s += e;
                if (o >= d) {
                    s -= i[o - d];
                    n = s / p
                } else n = s / (o + 1) / p;
                g[g.length] = n;
                r += n;
                if (o >= v) {
                    r -= g[o - v];
                    m[m.length] = r / v
                } else m[m.length] = r / (o + 1)
            }
        };
        this.calc = function (t, e) {
            var i = e - t;
            while (a.length > i)a.length--;
            while (a.length < i)a[a.length] = {};
            var s, n = Number.MAX_VALUE, l = Number.MIN_VALUE;
            for (s = t; s < e; s++) {
                var o = a[s - t];
                o.wvad = g[s];
                o.wvadma = m[s];
                n = Math.min(o.wvad, o.wvadma, n);
                l = Math.max(o.wvad, o.wvadma, l)
            }
            var h = l - n;
            for (s = 0; s < i; s++) {
                a[s].wvady = r * (l - a[s].wvad) / h;
                a[s].wvadmay = r * (l - a[s].wvadma) / h
            }
            var o = {min: n, max: l, p: 2};
            this.sm(o)
        };
        this.draw = function () {
            l.clear(true, o);
            var t = a.length, e = n / t, i, s;
            s = e * .5;
            l.newStyle(c, true, 1);
            for (i = 0; i < t; i++) {
                if (i == 0)l.moveTo(s, a[i].wvady); else l.lineTo(s, a[i].wvady);
                s += e
            }
            l.stroke();
            s = e * .5;
            l.newStyle(u, true, 1);
            for (i = 0; i < t; i++) {
                if (i == 0)l.moveTo(s, a[i].wvadmay); else l.lineTo(s, a[i].wvadmay);
                s += e
            }
            l.stroke()
        };
        this.iTo = function (t) {
            if (!a || !a.length)return;
            if (t >= a.length)t = a.length - 1;
            var e = a[t], i = 2;
            this.t(["WVAD: " + Number(e.wvad).toFixed(i), c], ["WVADMA: " + Number(e.wvadma).toFixed(i), u], ["", null])
        }
    }

    Ie.prototype = new ne(1);
    function Ie(t, e) {
        var i = this, s = false, n = s ? t.DIMENSION.w_main : t.DIMENSION.w_k, r = t.DIMENSION.h_t;
        ne.call(this, e);
        this.scfg = t;
        this.ic({});
        this.dr(s);
        var a = [], l, o, h = function () {
            o = t.PARAM.getHd();
            return {
                pX: t.DIMENSION.posX,
                pY: t.DIMENSION.posY + t.DIMENSION.h_main + t.DIMENSION.H_TIME_PART + t.DIMENSION.h_vol + t.DIMENSION.H_T_TITLE,
                w: n,
                h: r + 1,
                r: o
            }
        }, f = function (e) {
            s = e;
            n = s ? t.DIMENSION.w_main : t.DIMENSION.w_k;
            r = t.DIMENSION.h_t;
            this.dr(s);
            var i = h();
            for (var a = 0, l = this.gArr.length; a < l; a++)this.gArr[a].resize(i)
        };
        this.resize = f;
        l = new le(t.PARAM.G_Z_INDEX, h(), e);
        this.gArr = this.iArr = [l];
        var c = "#007cc8", u = 14, d = [], v = function (t, e, i) {
            var s = t.length;
            i = i < u ? 0 : s - u;
            var n = 0;
            for (; i < s; i++) {
                n += Math.abs(e - t[i])
            }
            if (i >= u)return n / u;
            return n / (i + 1)
        };
        this.linkData = function (t) {
            this.ca(a);
            this.ca(d);
            for (var e, i, s, n = 0, r, l, o = [], h = [], f, c = 0, p = t.length; c < p; c++) {
                e = t[c];
                s = Number(e.close);
                i = (Number(e.high) + Number(e.low) + s) / 3 || s;
                o[o.length] = i;
                n += i;
                if (c >= u) {
                    n -= o[c - u];
                    r = n / u
                } else r = n / (c + 1);
                l = v(o, r, c);
                f = l == 0 ? 0 : (i - r) / l / .015;
                d[d.length] = f
            }
        };
        this.calc = function (t, e) {
            var i = e - t;
            while (a.length > i)a.length--;
            while (a.length < i)a[a.length] = {};
            var s, n = Number.MAX_VALUE, l = Number.MIN_VALUE;
            for (s = t; s < e; s++) {
                var o = a[s - t];
                o.cci = d[s];
                n = Math.min(o.cci, n);
                l = Math.max(o.cci, l)
            }
            n > 0 && (n = 0);
            l < 0 && (l = 0);
            var h = l - n;
            for (s = 0; s < i; s++) {
                a[s].cciy = r * (l - a[s].cci) / h
            }
            var o = {min: n, max: l, p: 2};
            this.sm(o)
        };
        this.draw = function () {
            l.clear(true, o);
            var t = a.length, e = n / t, i, s;
            s = e * .5;
            l.newStyle(c, true, 1);
            for (i = 0; i < t; i++) {
                if (i == 0)l.moveTo(s, a[i].cciy); else l.lineTo(s, a[i].cciy);
                s += e
            }
            l.stroke()
        };
        this.iTo = function (t) {
            if (!a || !a.length)return;
            if (t >= a.length)t = a.length - 1;
            var e = a[t], i = 2;
            this.t(["CCI: " + Number(e.cci).toFixed(i), c], ["", null], ["", null])
        }
    }

    function ye(t, e, i) {
        "use strict";
        if (!i)v.error("no stage", this);
        var s, n, r, a, l, o, h, f, c = 9, u = e.DIMENSION.w_k / c, d = {
            LB: "量比",
            MACD: "MACD",
            KDJ: "KDJ",
            BOLL: "BOLL",
            PSY: "PSY",
            OBV: "OBV",
            RSI: "RSI",
            WVAD: "WVAD",
            CCI: "CCI"
        }, p = d.MACD, g = p, N, _, I, y, M, O, w, A, T;
        var D, S, E = [];
        var L = new function () {
            this.showTTab = function () {
                b(i, S) && i.removeChild(S);
                !b(i, D) && i.appendChild(D)
            };
            this.showKTab = function () {
                b(i, D) && i.removeChild(D);
                !b(i, S) && i.appendChild(S)
            };
            this.init = function () {
                D = m("div");
                S = m("div");
                D.style.position = S.style.position = "absolute";
                D.style.top = S.style.top = e.DIMENSION.posY + e.DIMENSION.h_main + e.DIMENSION.H_TIME_PART + e.DIMENSION.h_vol + e.DIMENSION.h_t + e.DIMENSION.H_T_TITLE + "px";
                D.style.left = S.style.left = e.DIMENSION.posX + "px";
                D.style.marginTop = S.style.marginTop = e.DIMENSION.T_TAB_MARGINTOP + "px";
                var i = new t(d.LB, false, true);
                D.appendChild(i.tab);
                for (var s in d) {
                    if (s == "LB")continue;
                    var n = new t(d[s], true, d[s] == p);
                    E[E.length] = n;
                    S.appendChild(n.tab)
                }
            };
            function t(t, i, s) {
                var n = "#eff3fc", r = "#b6c7e3", a = "#001e7c";
                var l = m("span");
                l.style.display = "block";
                l.style.cssFloat = l.style.styleFloat = "left";
                l.style.height = l.style.lineHeight = e.DIMENSION.H_T_TAB + "px";
                l.style.width = u + "px";
                l.style.textAlign = "center";
                l.style.color = a;
                l.style.backgroundColor = n;
                l.style.marginLeft = "3px";
                l.style.cursor = "pointer";
                s && (l.style.backgroundColor = r);
                l.innerHTML = t;
                i && F.addHandler(l, "click", function () {
                    P(t);
                    for (var e = E.length; e--;) {
                        E[e].tab.style.backgroundColor = n
                    }
                    this.style.backgroundColor = r
                });
                this.tab = l;
                this.type = t
            }
        };
        var k = function () {
            u = e.DIMENSION.w_k / c;
            D.style.top = S.style.top = e.DIMENSION.posY + e.DIMENSION.h_main + e.DIMENSION.H_TIME_PART + e.DIMENSION.h_vol + e.DIMENSION.h_t + e.DIMENSION.H_T_TITLE + "px";
            D.style.left = S.style.left = e.DIMENSION.posX + "px";
            for (var t = 0, i = E.length; t < i; t++) {
                E[t].tab.style.width = u + "px"
            }
            s && s.resize(n || a || r)
        };
        var x = function () {
            s.curLen = t.t().tO().dataLen;
            if (l == e.URLHASH.TS) {
                s.linkData([t.t().td1()])
            } else if (l == e.URLHASH.T5) {
                s.linkData(t.t().td5() ? t.t().td5() : [t.t().td1()])
            }
        }, R = function (i) {
            var n = "k" + l;
            if (i || l != e.URLHASH.KD && l != e.URLHASH.KW)s.linkData(t.k().kState().get(n))
        }, H = function (t, e, i) {
            o = t;
            h = e;
            if (!s)return;
            n ? x() : R(i);
            s.calc(t, e);
            s.draw();
            s.v(true)
        };
        this.resize = k;
        this.setView = function (t, i, s) {
            n = t;
            l = i;
            a = l >= 900;
            r = l == e.URLHASH.KCL;
            t && !s && (l = e.URLHASH.TS);
            if (t) {
                C()
            } else {
                P(g);
                L.showKTab()
            }
        };
        this.work = H;
        this.iTo = function (t) {
            s.iTo(t)
        };
        function C() {
            s && s.v(false);
            !N && (N = new de(e, i));
            s = N;
            L.showTTab();
            s.resize(n || a || r)
        }

        function P(t) {
            s && s.v(false);
            switch (t) {
                default:
                    return;
                case d.MACD:
                    !_ && (_ = new ve(e, i));
                    s = _;
                    break;
                case d.KDJ:
                    !I && (I = new pe(e, i));
                    s = I;
                    break;
                case d.BOLL:
                    !y && (y = new ge(e, i));
                    s = y;
                    break;
                case d.PSY:
                    !M && (M = new me(e, i));
                    s = M;
                    break;
                case d.OBV:
                    !O && (O = new Ne(e, i));
                    s = O;
                    break;
                case d.RSI:
                    !w && (w = new be(e, i));
                    s = w;
                    break;
                case d.WVAD:
                    !A && (A = new _e(e, i));
                    s = A;
                    break;
                case d.CCI:
                    !T && (T = new Ie(e, i));
                    s = T;
                    break
            }
            g = t;
            s.resize(n || a || r);
            H(o, h, true);
            s.iTo(Number.MAX_VALUE)
        }

        L.init()
    }

    var Me = m("canvas");
    if (Me.getContext && Me.getContext("2d")) {
        var Oe = window.devicePixelRatio || 1, we = Me.getContext("2d").webkitBackingStorePixelRatio || 1;
        Y.hdpr = Oe / we
    } else {
        if (typeof FlashCanvas === "undefined" || e.fh5) {
            typeof t === "function" && t(e);
            return
        } else {
            n = true
        }
    }
    var Ae = {
        PARAM: {
            updateRate: 3e3,
            DESIGNATE_RATE: 3e3,
            SLOW_RATE: 1e4,
            NUM_T_P_L: 5,
            minCandleNum: 20,
            defaultCandleNum: 66,
            K_TO_CL_LIMIT: 257e4,
            K_CL_NUM: 260,
            TOUCH_THRESHOLD: 200,
            BG_Z_INDEX: 0,
            I_Z_INDEX: 8e3,
            G_Z_INDEX: 5e3,
            allowEtag: true,
            _hd: 1,
            setHd: function (t) {
                typeof t === "number" && (this._hd = t)
            },
            getHd: function () {
                return this._hd
            },
            allowV: true
        },
        URL: {
            oriHqUrl: "http://hq.sinajs.cn/?_=$rn&list=$symbol",
            etagHqUrl: "http://hq.sinajs.cn/etag.php?_=" + (Math.random() + Math.random()) + "&list=$symbol",
            getHqUrl: function (t) {
                if (!t && Ae.PARAM.allowEtag)return K.isETag() ? this.etagHqUrl : this.oriHqUrl.replace("$rn", Math.random());
                return this.oriHqUrl.replace("$rn", Math.random())
            },
            A_K_URL: "http://finance.sina.com.cn/realstock/company/$symbol/hisdata/klc_kl.js?day=$rn",
            A_T5Y_URL: "http://finance.sina.com.cn/realstock/company/$symbol/hisdata/klc_cm.js?day=$rn",
            A_MINK_URL: "http://money.finance.sina.com.cn/quotes_service/api/jsonp_v2.php/$cb/CN_MarketData.getKLineData?symbol=$symbol&scale=$scale&ma=no&datalen=1023",
            A_TRADING_DATES_URL: "http://finance.sina.com.cn/realstock/company/klc_td_sh.txt",
            A_LAST5_URL: "http://finance.sina.com.cn/realstock/lastfive/$symbol.js?_=$rn"
        },
        URLHASH: {
            TS: 1,
            T5: 5,
            FAKE_T5: 2,
            CL: 3,
            KCL: 365,
            KD: 24,
            KW: 168,
            KM: 720,
            K5: 5,
            K15: 15,
            K30: 30,
            K60: 60,
            NTS: "ts",
            NT5: "t5",
            NCL: "cl",
            TCL: "tcl",
            NKD: "kd",
            NKW: "kw",
            NKM: "km",
            NK5: "k5",
            NK15: "k15",
            NK30: "k30",
            NK60: "k60",
            YTD: 983,
            NYTD: "ytd",
            vi: function (t) {
                switch (t) {
                    default:
                        return this.TS;
                    case this.NT5:
                        return this.FAKE_T5;
                    case this.NCL:
                        return this.KCL;
                    case this.NKD:
                        return this.KD;
                    case this.NKW:
                        return this.KW;
                    case this.NKM:
                        return this.KM;
                    case this.NK5:
                        return this.K5;
                    case this.NK15:
                        return this.K15;
                    case this.NK30:
                        return this.K30;
                    case this.NK60:
                        return this.K60;
                    case this.NYTD:
                        return this.YTD
                }
            }
        },
        DIMENSION: {
            _w: 500,
            _h: 300,
            H_VS_W: .9,
            RIGHT_W: 45,
            w_main: 370,
            w_k: 500,
            lbX: 1,
            posX: 55,
            posY: 0,
            h_main: 200,
            h_k: 185,
            H_MA4K: 12,
            H_TIME_PART: 15,
            h_vol: 40,
            H_T_TITLE: 15,
            h_t: 60,
            T_TAB_MARGINTOP: 1,
            H_T_TAB: 17,
            MIN_H_T: 28,
            getTTabAllH: function () {
                return this.T_TAB_MARGINTOP + this.H_T_TAB
            },
            MIN_H: 22,
            setStageW: function (t) {
                if (t < 0)return;
                this._w = t;
                this.w_k = t - this.posX - 5;
                this.w_main = t - this.posX - this.RIGHT_W
            },
            setStageH: function (t, e) {
                if (t < 0)return;
                t < this.MIN_H && (t = this.MIN_H);
                this._h = t;
                this.h_main = e ? t * .75 : t * .55;
                this.h_k = this.h_main - this.H_MA4K;
                var i = t - this.h_main - this.H_TIME_PART;
                if (e) {
                    this.h_vol = i
                } else {
                    this.h_vol = i * .37;
                    this.h_t = i - this.h_vol - this.H_T_TITLE - this.H_T_TAB
                }
            },
            getStageW: function () {
                return this._w
            },
            getStageH: function () {
                return this._h
            },
            getLeftW: function () {
                return this.posX - this.lbX
            }
        },
        STYLE: {FONT_SIZE: 12, FONT_FAMILY: "helvetica,arial,sans-serif"},
        COLOR: {
            T_P: "#007cc8",
            T_AVG: "#000000",
            T_V: "#9b9b9b",
            T_PREV: "#9b9b9b",
            K_RISE: "#fc0404",
            K_FALL: "#00a800",
            K_N: "#000000",
            K_CL: "#0077cc",
            K_P: "#333333",
            K_EXT: "#777777",
            K_EXT_BG: "rgba(255,255,255,.7)",
            K_EXT_BD: "#aaaaaa",
            K_ZB: "#ddd",
            V_S: "#555555",
            V_F: "#444444",
            V_BG: null,
            TIME_F: "#333333",
            TIME_S: "#555555",
            F_BG: "#eeeeee",
            GRID: "#dddddd",
            IVH_LINE: "#999999",
            T_S: "#ff0000",
            T_LB: "#007cc8",
            newTheme: function (t) {
                for (var e in t) {
                    S(t[e]) && this.hasOwnProperty(e) && typeof this[e] != "function" && (this[e] = t[e])
                }
            }
        },
        MA: {
            DEFAULT_MADAYS_ARR: [5, 10, 20, 30],
            DEFAULT_MACOLOR_ARR: ["#00477D", "#12BDD9", "#EE2F72", "#8CBB0D"],
            dayArr: [5, 10, 20, 30],
            colorArr: ["#00477D", "#12BDD9", "#EE2F72", "#8CBB0D"],
            getWorkingMAArr: function () {
                var t = [], e = [];
                for (var i = 0, s = this.dayArr.length; i < s; i++) {
                    if (this.dayArr[i] > 0) {
                        t[t.length] = this.dayArr[i];
                        e[e.length] = this.colorArr[i]
                    }
                }
                return [t, e]
            }
        },
        TIP: {
            INIT: "初始化...",
            LOAD_DATA: "数据加载中",
            NO_RECORD: "您查询的内容无记录",
            NOT_LISTED: "您查询的股票未上市",
            DELISTED: "您查询的股票已退市",
            NO_T_DATA: "无分时数据",
            NO_K_DATA: "无K线数据",
            ERR: "数据加载失败",
            ERR_ASSIST: "辅助数据异常"
        },
        datas: {s: "sh000001", mode: "", tDataLen: 242, t: "", isOption: false},
        stat: {i: "init.txt?type=cni"}
    };
    if (n) {
        Ae.COLOR.K_EXT_BG = "#ffffff"
    }
    function Te(t) {
        "use strict";
        this.ihqObj = {};
        if (!t || t.length < 16) {
            return
        }
        var e = t.split(",");
        this.ihqObj.t = Ae.datas.t = String(e[0]).toLowerCase();
        this.ihqObj.l5 = Number(e[6]);
        this.ihqObj.fc = Number(e[8]);
        this.ihqObj.ip = Number(e[14]);
        this.ihqObj.st = e[15]
    }

    function De(t, e) {
        "use strict";
        var i = t, s = {
            "00": "",
            "01": "临时停牌",
            "02": "停牌",
            "03": "停牌",
            "04": "临时停牌",
            "05": "临时停牌",
            "07": "暂停"
        }, n = /^(sh000|sh580)\d+/.test(i), r, a = {}, l, o = false, h = Z.gta();
        var f, c, u, d, v = false;
        this.hqTotalAmount = function () {
            return f
        };
        this.isPreMkt = function () {
            return c
        };
        this.isUpdateTime = function () {
            return u
        };
        this.index = function () {
            return d
        };
        this.isTotalRe = function () {
            return v
        };
        this.hqObj = {};
        this.inited = false;
        this.tmpInited = false;
        var p = function (t) {
            o = this.hqObj.isDateChange = false;
            var e = t.split("-"), i = ~~Number(e[0]), s = ~~(Number(e[1]) - 1), n = ~~Number(e[2]);
            if (this.hqObj.date == null) {
                this.hqObj.date = new Date(i, s, n)
            } else {
                var r = V.stbs(this.hqObj.date, i, s, n);
                if (!r) {
                    var a = new Date(i, s, n);
                    this.hqObj.isDateChange = Boolean(a > this.hqObj.date);
                    if (this.hqObj.isDateChange)this.hqObj.date = V.dd(a); else o = true
                }
            }
        };
        var g = function (t) {
            var e = t.split(":"), i = Number(e[0]), s = Number(e[1]);
            c = Boolean(i == 9 && s < 30);
            u = true;
            var n = [$.zp(i), $.zp(s)].join(":");
            if (h.indexOf) {
                d = h.indexOf(n)
            } else {
                for (var r = h.length; r--;) {
                    if (h[r] == n) {
                        d = r;
                        break
                    }
                }
            }
            if (i == 9 && s < 30 && s >= 25)d = 0;
            if (d < 0)u = false;
            if (typeof l === "undefined") {
                v = false;
                l = d;
                return
            }
            v = d - l > 2;
            l = d
        };
        this.update = function (t) {
            m.call(this, t)
        };
        this.saveData = function (t) {
            t && (r = t)
        };
        (function () {
            this.hqObj.digits = Ae.datas.isOption ? 4 : /^(sh(90|58))|(sz20)|(sz1[56])\d+/.test(i) ? 3 : 2;
            this.update(e)
        }).call(this);
        function m(t) {
            if (!t)return;
            var e = t.split(",");
            if (!e || e.length < 33)return;
            if (Ae.datas.isOption) {
                this.hqObj.prevclose = Number(e[8]) || 1;
                this.hqObj.open = Number(e[9]) || this.hqObj.prevclose;
                this.hqObj.price = Number(e[2]) || this.hqObj.prevclose;
                this.hqObj.high = Number(e[2]) || this.hqObj.prevclose;
                this.hqObj.low = Number(e[2]) || this.hqObj.prevclose;
                this.hqObj.totalVolume = Number(e[5]) || 0;
                var i = String(e[32]).split(" ");
                this.hqObj.today = i[0];
                this.hqObj.time = i[1].substr(0, 5);
                this.hqObj.status = String(e[34])
            } else {
                this.hqObj.name = String(e[0]);
                this.hqObj.prevclose = Number(e[2]) || 1;
                this.hqObj.open = Number(e[1]) || this.hqObj.prevclose;
                this.hqObj.price = Number(e[3]) || this.hqObj.prevclose;
                this.hqObj.high = Number(e[4]) || this.hqObj.prevclose;
                this.hqObj.low = Number(e[5]) || this.hqObj.prevclose;
                this.hqObj.buy = Number(e[6]);
                this.hqObj.sell = Number(e[7]);
                this.hqObj.totalVolume = Number(e[8]) || 0;
                this.hqObj.totalAmount = f = Number(e[9]);
                this.hqObj.time = String(e[31]).substr(0, 5);
                this.hqObj.today = String(e[30]);
                this.hqObj.status = String(e[32]);
                this.hqObj.isStopDay = this.hqObj.status == "02" || this.hqObj.status == "03";
                this.hqObj.statusStr = s[this.hqObj.status] || "";
                !n && (this.hqObj.totalVolume *= .01)
            }
            if (t.charAt(0) == "N")Ae.datas.t = "n";
            p.call(this, this.hqObj.today);
            if (o)return;
            g.call(this, this.hqObj.time);
            if (r) {
                if (this.inited) {
                    this.hqObj.volume = this.hqObj.totalVolume - r.totalVolume || 0;
                    this.hqObj.amount = this.hqObj.volume * this.hqObj.price;
                    this.hqObj.totalAmount = this.hqObj.amount + r.totalAmount;
                    this.hqObj.avg_price = this.hqObj.totalAmount / this.hqObj.totalVolume || this.hqObj.price
                } else {
                    this.hqObj.volume = 0;
                    this.hqObj.avg_price = r.totalAmount / r.totalVolume || this.hqObj.price;
                    this.hqObj.totalAmount = this.hqObj.totalVolume * this.hqObj.avg_price;
                    this.inited = true
                }
                r.totalVolume = this.hqObj.totalVolume;
                r.totalAmount = this.hqObj.totalAmount
            } else {
                if (this.tmpInited) {
                    this.hqObj.volume = this.hqObj.totalVolume - a.totalVolume || 0
                } else {
                    this.hqObj.volume = 0;
                    this.tmpInited = true
                }
                a.totalVolume = this.hqObj.totalVolume
            }
        }
    }

    Se.prototype = new U;
    function Se(t, e, i, s, n) {
        "use strict";
        var a = this;
        U.call(this);
        var l, o = t, h = e, f = s, c = false, u = function (t) {
            r.show(t || Ae.TIP.ERR, 3)
        }, d, p, g, m, N;
        var b = function (t, e, i) {
            if (!e)return;
            var s, n;
            if (t == 1 && V.stbd(e, o.hqObj.date)) {
                s = d
            } else if (t <= 5) {
                for (n = 0; n < 5; n++) {
                    if (V.stbd(e, p[n][0].date))break
                }
                s = [];
                for (var r = n + t; n < r; n++)s = s.concat(p[n])
            } else if (t >= 365) {
                var a = m.length;
                for (n = 0; n < a; n++) {
                    if (V.stbd(e, m[n].date))break
                }
                if (n >= a)return;
                n != 0 && (m[n].prevclose = m[n - 1].price);
                if (t == 365)a = Math.ceil(m.length / 3); else if (t == 665)a = Math.ceil(m.length / 3 * 2);
                var l = a + n;
                l + 5 > m.length && (l = m.length);
                s = m.slice(n, l)
            }
            N.setData(s, t, i)
        };
        var _ = {
            createT1Data: function (t) {
                if (t) {
                    d = Z.gltbt(1, o.hqObj.price, !f);
                    !f && (d[0].volume = o.hqObj.totalVolume)
                } else {
                    var e = window["hq_str_ml_" + h];
                    window["hq_str_ml_" + h] = null;
                    d = e == "" ? Z.gltbt(1, o.hqObj.prevclose, true) : Z.fB(Z.db(e), false, "CN")
                }
                if (d[0].price <= 0)d[0].price = d[0].avg_price = o.hqObj.prevclose;
                if (d[0].volume > 0)d[0].price = o.hqObj.open;
                d[0].date = V.dd(o.hqObj.date);
                d[0].prevclose = o.hqObj.prevclose;
                d[0].lastfive = i;
                o.saveData(d[0]);
                a.re(H.T1_DATA_LOADED);
                c && w()
            }, createT5Data: function (t) {
                var e = [];
                for (var i = 0, s = t.length; i < s; i++) {
                    e[e.length] = i == 0 && t[0] == "" ? Z.gltbt(1, o.hqObj.prevclose) : ee(t[i]);
                    var n, r = 0;
                    for (var a = 0, h = Ae.datas.tDataLen; a < h; a++) {
                        n = e[i][a].volume *= .01;
                        r += n
                    }
                    e[i][0].totalVolume = r;
                    !e[i][0].lastfive && (e[i][0].lastfive = 0)
                }
                var c = e.length;
                c > 5 && e.splice(0, c - 5);
                g = [d];
                c = l.length;
                for (var i = c - 2; i > c - 6; i--) {
                    for (var a = 0, u = e.length; a < u; a++) {
                        if (V.stbd(e[a][0].date, l[i])) {
                            g.unshift(Z.azft(e[a], "CN"));
                            break
                        }
                        if (a == e.length - 1) {
                            var v = g[0][0].prevclose;
                            g.unshift(Z.gltbt(1, v));
                            g[0][0].date = f && e.length == 1 ? o.hqObj.date : V.dd(l[i]);
                            g[0][0].prevclose = v
                        }
                    }
                }
                p = g
            }, addLastfive: function (t) {
                if (!t)return;
                for (var e = t.length; e--;) {
                    var i = t[e].d;
                    for (var s = g.length - 1; s--;) {
                        if (V.stbds(g[s][0].date, i)) {
                            g[s][0].lastfive = Number(t[e].c);
                            break
                        }
                    }
                }
                a.re(H.LASTFIVE_LOADED)
            }, createClData: function (t) {
                !t && (t = []);
                if (t.length == 0) {
                    t.push({prevclose: o.hqObj.prevclose, close: o.hqObj.price, date: V.dd(o.hqObj.date)})
                }
                if (!V.stbd(t[t.length - 1].date, o.hqObj.date)) {
                    t.push({close: o.hqObj.price, date: V.dd(o.hqObj.date)})
                }
                if (!t[0].prevclose || t[0].prevclose <= 0)t[0].prevclose = t[0].price || o.hqObj.prevclose;
                m = [];
                for (var e = t.length, i = 0, s = 0, n = l.length; s < n; s++) {
                    for (var r = i; r < e; r++) {
                        if (V.stbd(t[r].date, l[s])) {
                            m.push({price: t[r].close, date: l[s]});
                            i = r + 1;
                            break
                        }
                        if (r == e - 1) {
                            if (i == 0) {
                                m.push({price: t[0].prevclose, prevclose: t[0].prevclose, date: l[s]})
                            } else {
                                m.push({price: t[i - 1].close, date: l[s]})
                            }
                        }
                    }
                }
            }
        };
        var I = new function () {
            var e = function () {
                y(Ae.URL.A_T5Y_URL.replace("$symbol", h).replace("$rn", o.hqObj.today), function () {
                    var t = window["KLC_ML_" + h];
                    window["KLC_ML_" + h] = null;
                    var e = t.split(",");
                    _.createT5Data(e);
                    I.loadLastfive();
                    a.re(H.T5Y_DATA_LOADED)
                }, u)
            };
            var i = function () {
                !N && (N = new Ee(o));
                if (f) {
                    _.createT1Data(true);
                    return
                }
                var e = h;
                t.isPreMkt() ? _.createT1Data(true) : y(Ae.URL.oriHqUrl.replace("$rn", Math.random()).replace("$symbol", "ml_" + e), _.createT1Data, u)
            }, s = function () {
                if (d) {
                    w()
                } else {
                    c = true;
                    i()
                }
            };
            var n = function () {
                var t = "lastfive" + h;
                y(Ae.URL.A_LAST5_URL.replace("$rn", (new Date).getHours()).replace("$symbol", h), function () {
                    var e = window[t];
                    window[t] = null;
                    if (!e || !e.lastfive) {
                        v.log("error lastfive");
                        u(Ae.TIP.ERR_ASSIST);
                        return
                    }
                    _.addLastfive(e.lastfive)
                }, u)
            };
            this.initT1 = i;
            this.initT5Y = s;
            this.loadT5Y = e;
            this.loadLastfive = n
        };
        this.symbol = function () {
            return h
        };
        this.td1 = function () {
            return d
        };
        this.tdy = function () {
            return m
        };
        this.td5 = function () {
            return p
        };
        this.latest5 = function () {
            return g
        };
        this.tO = function () {
            return N
        };
        var M = {t3v: 2, t3b: 3, t5v: 4, t5b: 5, t1v: 0, t1b: 1};
        this.tState = function () {
            return M
        };
        this.setRange = b;
        this.initT1 = I.initT1;
        this.initT5Y = I.initT5Y;
        this.update = function () {
            if (!d)return;
            var t = d[o.index()];
            if (!t)return;
            t.price = o.hqObj.price;
            t.avg_price = o.hqObj.avg_price || t.price;
            t.volume += o.hqObj.volume * 1;
            if (d[0].volume > 0)d[0].price = o.hqObj.open;
            if (!m)return;
            t = m[m.length - 1];
            t.close = o.hqObj.price;
            t.volume = o.hqObj.totalVolume;
            o.hqObj.price > t.high && (t.high = o.hqObj.price);
            o.hqObj.price < t.low && (t.low = o.hqObj.price)
        };
        this.reloadT1 = function () {
            y(Ae.URL.oriHqUrl.replace("$rn", Math.random()).replace("$symbol", "ml_" + h), function () {
                var t = Z.fB(Z.db(window["hq_str_ml_" + h]), false, "CN");
                if (t[0].price <= 0)t[0].price = t[0].avg_price = o.hqObj.prevclose;
                for (var e = 0, i = Ae.datas.tDataLen; e < i; e++) {
                    d[e].price = t[e].price;
                    d[e].avg_price = t[e].avg_price;
                    d[e].volume = t[e].volume
                }
                d[0].totalVolume = t[0].totalVolume;
                d[0].totalAmount = t[0].totalAmount;
                o.inited = o.tmpInited = false
            }, u)
        };
        this.newDayComes = function () {
            d = Z.gltbt(1, o.hqObj.price, true, "CN");
            d[0].date = V.dd(o.hqObj.date);
            d[0].prevclose = o.hqObj.prevclose;
            d[0].price = o.hqObj.price;
            d[0].volume = o.hqObj.totalVolume;
            if (g) {
                var t = 0, e = 0;
                for (var i = 0, s = g.length; i < s; i++) {
                    if (g[i][0].totalVolume) {
                        e += Number(g[i][0].totalVolume);
                        t++
                    }
                }
                d[0].lastfive = e / t / 240 || 0;
                g.shift();
                g.push(d)
            } else d[0].lastfive = 0;
            o.saveData(d[0]);
            o.inited = o.tmpInited = false;
            l && (l[l.length] = V.dd(o.hqObj.date));
            m && m.push({price: o.hqObj.price, date: V.dd(o.hqObj.date), volume: o.hqObj.totalVolume})
        };
        var O = 3;

        function w() {
            if (l && l.length > 3 * 200) {
                I.loadT5Y()
            } else {
                window["datelist"] = null;
                if (O-- > 0) {
                    y(Ae.URL.A_TRADING_DATES_URL, function () {
                        var t = window["datelist"];
                        window["datelist"] = null;
                        l = ie(t, o.hqObj.date);
                        w()
                    }, u)
                } else u()
            }
        }
    }

    Ee.prototype = new re;
    function Ee(t) {
        "use strict";
        re.call(this);
        var e = t, i = e.hqObj.digits, s, n = Ae.datas.tDataLen;
        var r = function (t) {
            for (var e, i, s = 0, n = this.datas.length; s < n; s++) {
                if (this.datas[s].price <= 0)continue;
                this.dataLen = s;
                e = !isNaN(this.datas[s].avg_price) && this.datas[s].avg_price > 0 ? Math.min(this.datas[s].price, this.datas[s].avg_price) : this.datas[s].price;
                i = !isNaN(this.datas[s].avg_price) && this.datas[s].avg_price > 0 ? Math.max(this.datas[s].price, this.datas[s].avg_price) : this.datas[s].price;
                if (this.minPrice > e)this.minPrice = e;
                if (this.maxPrice < i)this.maxPrice = i;
                if (this.maxVolume < this.datas[s].volume)this.maxVolume = this.datas[s].volume
            }
            this.dataLen++;
            var r = Math.max(Math.abs(this.prevclose - this.maxPrice), Math.abs(this.prevclose - this.minPrice));
            this.minPrice = this.prevclose * 1 - r * 1;
            this.maxPrice = this.prevclose * 1 + r * 1;
            this.maxPercent = Math.max((this.maxPrice - this.prevclose) / this.prevclose, 0);
            this.minPercent = Math.min((this.minPrice - this.prevclose) / this.prevclose, 0);
            this.labelMaxP = this.maxPrice;
            this.labelMinP = this.minPrice;
            this.labelMaxVol = this.maxVolume;
            this.isTotalRedraw = true
        };
        this.dates = function () {
            return s
        };
        this.setData = function (t, e, i) {
            this.days = e;
            this.datas = t;
            this.prevclose = t[0].prevclose;
            if (isNaN(this.prevclose) || this.prevclose < .01)this.prevclose = t[0].price;
            this.initExtValues();
            r.call(this, i);
            this.initCoors();
            a.call(this);
            s = [];
            var l, o, h = Ae.DIMENSION.w_main, f = h > 430 ? 9 : h > 320 ? 8 : h > 160 ? 7 : 6;
            if (this.days == 1) {
                s = f > 7 ? ["09:30", "10:30", "11:30/13:00", "14:00", "15:00"] : ["09:30", "", "11:30/13:00", "", "15:00"]
            } else if (this.days <= 5) {
                for (o = 0; o < this.days; o++) {
                    l = t[o * n].date;
                    s[s.length] = (f >= 9 ? l.getFullYear() + "/" : "") + (f > 6 ? l.getMonth() + 1 + "/" : "") + l.getDate() + (f >= 8 ? V.nw(l.getDay()) : "")
                }
            } else {
                var c;
                for (o = 0; o < 5; o++) {
                    c = Math.floor((this.datas.length - 1) * o * .25);
                    l = t[c].date;
                    s.push([l.getFullYear(), $.zp(l.getMonth() + 1), $.zp(l.getDate())].join("/"))
                }
            }
        };
        function a() {
            var t = Ae.DIMENSION.h_main, e = Ae.DIMENSION.h_vol, s = this.isTotalRedraw ? 0 : this.dataLen - this.dataLenOffset;
            for (var n, r, a, l, o, h, f = this.dataLen; s < f; s++) {
                n = this.poses[s];
                r = this.marks[s];
                a = this.datas[s];
                if (a.price > 0) {
                    l = (a.price - this.prevclose) / this.prevclose;
                    a.percent = l;
                    n[0] = W.pp(a.price, this.labelMinP, this.labelMaxP, t);
                    n[1] = W.pp(a.avg_price || this.datas[s == 0 ? 0 : s - 1].avg_price, this.labelMinP, this.labelMaxP, t);
                    n[2] = W.vp(a.volume, this.labelMaxVol, e);
                    r[0] = $.ps(a.price, i);
                    r[1] = $.ps(a.avg_price, i);
                    r[2] = $.vs(a.volume, true);
                    r[3] = (l * 100).toFixed(i) + "%"
                } else {
                    o = s == 0 ? 0 : s - 1;
                    h = this.datas[o];
                    a.percent = h.percent;
                    a.price = h.price;
                    a.avg_price = h.avg_price;
                    n[0] = this.poses[o][0];
                    n[1] = this.poses[o][1];
                    n[2] = this.poses[o][2];
                    r[0] = this.marks[o][0];
                    r[1] = this.marks[o][1];
                    r[2] = 0;
                    r[3] = this.marks[o][3]
                }
                if (this.days == 365 || this.days == 665 || this.days == 965)r[1] = "-"
            }
        }
    }

    Le.prototype = new U;
    function Le(t, e, i) {
        "use strict";
        var s = this;
        U.call(this);
        var n = t, a = e, l = i, o, h, f = "mink_", c = false;
        var u, d, v, p, g, m, N, b, _, I;
        var M = function () {
            r.show(Ae.TIP.ERR, 3)
        }, O = function () {
            M();
            c = false
        }, w = function () {
            E()
        };
        var A = function () {
            var t = Ae.MA.getWorkingMAArr()[0];
            J.ama(u, t);
            J.ama(v, t);
            J.ama(d, t);
            J.ama(g, t);
            J.ama(m, t);
            J.ama(N, t);
            J.ama(b, t)
        };
        this.datas_day = function () {
            return u
        };
        this.datas_week = function () {
            return d
        };
        this.datas_month = function () {
            return v
        };
        this.datas_ytd = function () {
            return p
        };
        this.datas_5min = function () {
            return g
        };
        this.datas_15min = function () {
            return m
        };
        this.datas_30min = function () {
            return N
        };
        this.datas_60min = function () {
            return b
        };
        this.kO = function () {
            return _
        };
        this.kState = function () {
            return I
        };
        this.init = function () {
            y(Ae.URL.A_K_URL.replace("$symbol", l).replace("$rn", n.hqObj.today ? n.hqObj.today : ""), function () {
                var t = window["KLC_KL_" + l];
                window["KLC_KL_" + l] = null;
                if (t) {
                    t = ee(t);
                    T(t);
                    s.re(H.K_DATA_LOADED)
                } else {
                    w()
                }
            }, w)
        };
        this.initMinK = function (t) {
            if (c)return;
            c = true;
            h = t;
            y(Ae.URL.A_MINK_URL.replace("$symbol", l).replace("$scale", t).replace("$cb", "var%20" + f + t + "="), function () {
                c = false;
                var t = window[f + h];
                window[f + h] = null;
                if (!t)return;
                for (var e = 0, i = t.length; e < i; e++) {
                    t[e].high *= 1;
                    t[e].open *= 1;
                    t[e].low *= 1;
                    t[e].close *= 1;
                    t[e].volume *= .01
                }
                J.pd(t);
                switch (h) {
                    case 5:
                        g = t;
                        break;
                    case 15:
                        m = t;
                        break;
                    case 30:
                        N = t;
                        break;
                    case 60:
                        b = t;
                        break
                }
                !I && (I = new xe(s));
                I.initState(h, t);
                J.ama(t, Ae.MA.getWorkingMAArr()[0]);
                s.re(H.KMIN_DATA_LOADED)
            }, O)
        };
        this.setRange = function (t, e, i, s, r) {
            var a = I ? I.get(t) : null;
            if (!a)return;
            !_ && (_ = new ke(n));
            var l = e > 1 ? a[e - 1].close : a[0].prevclose;
            if (isNaN(l))l = a[0].close;
            _.setData(a.slice(e, i), l, s, r)
        };
        this.calcAllMA = A;
        this.newDayComes = function () {
            J.nc(u, n.hqObj, "d");
            J.nc(d, n.hqObj, "w");
            J.nc(v, n.hqObj, "m");
            D(u);
            D(d);
            D(v)
        };
        this.update = function () {
            if (n.hqObj.totalVolume < 1)return;
            D(u);
            D(d);
            D(v);
            S(g, 5);
            S(m, 15);
            S(N, 30);
            S(b, 60)
        };
        function T(t) {
            var e = n.hqObj.date ? n.hqObj.date : t[t.length - 1].date;
            if (t.length == 0 || !V.stbd(t[t.length - 1].date, e)) {
                t[t.length] = {
                    open: n.hqObj.open,
                    high: n.hqObj.high,
                    low: n.hqObj.low,
                    close: n.hqObj.price,
                    volume: n.hqObj.totalVolume * 100,
                    date: V.dd(e)
                }
            }
            u = t;
            var i = a.ihqObj.ip;
            o = !isNaN(i) && i > 0 ? i : t[0].open;
            u[0].prevclose = o;
            var r = J.mw(u, n.hqObj, o, 100);
            d = r[0];
            v = r[1];
            A();
            J.pd(u);
            J.pd(d);
            J.pd(v);
            p = J.yd(u);
            I ? I.initDWMState() : I = new xe(s)
        }

        function D(t, e) {
            if (!t || t.length == 0)return;
            var i = t[t.length - 1];
            if (isNaN(i.volume))i.volume = n.hqObj.volume; else i.volume += n.hqObj.volume * 1;
            i.close = n.hqObj.price;
            if (t === u) {
                i.open = n.hqObj.open;
                i.high = n.hqObj.high;
                i.low = n.hqObj.low;
                i.volume = n.hqObj.totalVolume
            }
            if (t.length == 1) {
                if (t === u)i.percent = (n.hqObj.price - n.hqObj.prevclose) / n.hqObj.prevclose; else i.percent = (n.hqObj.price - i.open) / i.open
            } else i.percent = (n.hqObj.price - t[t.length - 2].close) / t[t.length - 2].close;
            if (n.hqObj.price > i.high)i.high = n.hqObj.price;
            if (n.hqObj.price < i.low)i.low = n.hqObj.price;
            e && (i.time = n.hqObj.time);
            J.uma(t, Ae.MA.getWorkingMAArr()[0])
        }

        function S(t, e) {
            if (!t)return;
            if (!Z.ist("CN", n.hqObj.time))return;
            if (V.stbd(t[t.length - 1].date, n.hqObj.date) && J.spk(t[t.length - 1].time, n.hqObj.time, "09:30", e)) {
                D(t, true)
            } else {
                if (n.hqObj.totalVolume < 1)return;
                var i = (n.hqObj.price - t[t.length - 1].close) / t[t.length - 1].close;
                t.push({
                    open: n.hqObj.price,
                    high: n.hqObj.price,
                    low: n.hqObj.price,
                    close: n.hqObj.price,
                    volume: n.hqObj.volume,
                    percent: i,
                    day: String(n.hqObj.today).split("-").join("/"),
                    date: n.hqObj.date,
                    time: n.hqObj.time
                });
                if (J.spk("09:35", n.hqObj.time, "09:30", e))t[t.length - 1].open = n.hqObj.open;
                J.uma(t, Ae.MA.getWorkingMAArr()[0])
            }
        }

        function E() {
            Ae.datas.t = "n";
            T([]);
            s.re(H.K_DATA_LOADED)
        }
    }

    ke.prototype = new re;
    function ke(t) {
        "use strict";
        re.call(this);
        var e = t, i = e.hqObj.digits, s, n = false;
        var r = function (t) {
            var e = 0, i, s = 0, r = Number.MAX_VALUE;
            for (var a = [], l, o = Ae.MA.getWorkingMAArr()[0].length, h = this.dataLen; e < h; e++) {
                i = this.datas[e];
                if (i.close <= 0)continue;
                if (i.high > s)s = i.high;
                if (i.low < r)r = i.low;
                for (l = 0; l < o; l++)a[l] = i["ma_p" + l];
                this.labelMaxP = this.maxPrice = Math.max.apply(Math, [this.maxPrice, i.close, 0, i.high].concat(a));
                this.labelMinP = this.minPrice = Math.min.apply(Math, [this.minPrice, i.close, i.low].concat(a));
                this.labelMaxVol = this.maxVolume = Math.max(this.maxVolume, 0, i.volume)
            }
            var f = false, c = false;
            for (e = this.datas.length; e--;) {
                i = this.datas[e];
                if (f) {
                    i.isH = false
                } else {
                    if (s == i.high) {
                        i.isH = true;
                        f = true
                    } else i.isH = false
                }
                if (c) {
                    i.isL = false
                } else {
                    if (r == i.low) {
                        i.isL = true;
                        c = true
                    } else i.isL = false
                }
            }
            var u = te(this.maxPrice, this.minPrice, 2, false, true);
            this.labelMaxP = u[0];
            this.labelMinP = u[1];
            this.labelPriceCount = u[2];
            u = te(this.maxVolume, 0, 0, true);
            this.labelMaxVol = u[0];
            if (n) {
                var d = Math.max(Math.abs(this.prevclose - this.maxPrice), Math.abs(this.prevclose - this.minPrice));
                this.minPrice = this.prevclose * 1 - d * 1;
                this.maxPrice = this.prevclose * 1 + d * 1
            }
            this.isTotalRedraw = true
        };
        var a = function () {
            var t = Ae.DIMENSION.h_k, e = Ae.DIMENSION.h_vol, s = Ae.MA.getWorkingMAArr()[0].length, r = Ae.COLOR.K_RISE, a = Ae.COLOR.K_FALL, l = Ae.COLOR.K_N;
            var o, h;
            if (n) {
                o = this.minPrice;
                h = this.maxPrice
            } else {
                o = this.labelMinP;
                h = this.labelMaxP
            }
            var f = this.labelMaxVol, c = this.prevclose, u = this.isTotalRedraw ? 0 : this.dataLen - this.dataLenOffset;
            for (var d, v, p, g, m, N, b = this.dataLen; u < b; u++) {
                d = this.datas[u];
                v = this.poses[u];
                p = this.marks[u];
                v[0] = W.pp(d.close, o, h, t);
                v[1] = W.pp(d.open, o, h, t);
                v[2] = W.vp(d.volume, f, e);
                v[3] = W.pp(d.high, o, h, t);
                v[4] = W.pp(d.low, o, h, t);
                v[5] ? v[5].splice(s) : v[5] = [];
                p[6] ? p[6].splice(s) : p[6] = [];
                for (m = 0; m < s; m++) {
                    g = d["ma_p" + m];
                    v[5][m] = W.pp(g, o, h, t);
                    p[6][m] = $.ps(g, i)
                }
                if (d.close > d.open) {
                    v[7] = v[0];
                    v[8] = v[1];
                    v[14] = v[9] = r
                } else if (d.open > d.close) {
                    v[7] = v[1];
                    v[8] = v[0];
                    v[14] = v[9] = a
                } else {
                    v[7] = v[8] = v[0] || v[1];
                    v[9] = l;
                    v[14] = u == 0 ? r : d.close < this.datas[u - 1].close ? a : r
                }
                N = (d.close - c) / c;
                v[13] = N;
                p[0] = $.ps(d.close, i);
                p[1] = $.ps(d.high, i);
                p[2] = $.vs(d.volume, true);
                p[3] = (d.percent * 100).toFixed(i) + "%";
                p[4] = $.ps(d.low, i);
                p[5] = $.ps(d.open, i);
                p[8] = (N * 100).toFixed(i) + "%"
            }
        };
        this.setData = function (t, e, i, l) {
            if (!t || t.length == 0)return;
            s = l;
            n = l == Ae.URLHASH.KCL;
            this.datas = t;
            this.dataLen = this.days = t.length;
            this.prevclose = e;
            this.initExtValues();
            r.call(this, i);
            this.initCoors();
            a.call(this)
        }
    }

    function xe(t) {
        "use strict";
        var e = t, i = {}, s = Ae.PARAM.defaultCandleNum, n = Ae.PARAM.K_CL_NUM;
        var r = function (t, e, r, a) {
            if (!e)return;
            var l = "k" + t;
            i[l] = e;
            var o = e.length, h = r ? n : s;
            i[l + "v"] = a ? 0 : o > h ? o - h : 0;
            i[l + "b"] = o
        };
        var a = function () {
            var t = e.datas_day();
            r(Ae.URLHASH.KD, t);
            r(Ae.URLHASH.KCL, t, true);
            r(Ae.URLHASH.YTD, e.datas_ytd(), false, true);
            r(Ae.URLHASH.KW, e.datas_week());
            r(Ae.URLHASH.KM, e.datas_month())
        };
        this.get = function (t) {
            return i[t]
        };
        this.set = function (t, e) {
            typeof i[t] !== "undefined" && (i[t] = e)
        };
        this.initState = r;
        this.initDWMState = a;
        a()
    }

    Re.prototype = new U;
    function Re(t, e) {
        "use strict";
        var i = this;
        U.call(this);
        var s = t, n = e, a = false, l, o, h = Ae.PARAM.DESIGNATE_RATE, f = Math.max(h, Ae.PARAM.SLOW_RATE), c = function () {
            r.show(Ae.TIP.ERR, 5)
        }, u = function (t) {
            p && p.rl(t, u);
            g && g.rl(t, u);
            i.re(t, n)
        };
        var d, v, p, g;
        this.hq = function () {
            return d
        };
        this.iHq = function () {
            return v
        };
        this.t = function () {
            return p
        };
        this.k = function () {
            return g
        };
        var m = new function () {
            var t = function () {
                !p && (p = new Se(d, s, v.ihqObj.l5, a, n))
            };
            var e = function (t) {
                p.rl(t, e);
                l()
            };
            this.initT1 = function () {
                if (a) {
                    r.show(Ae.TIP.NO_T_DATA, 2);
                    return
                }
                r.show(Ae.TIP.LOAD_DATA);
                t();
                p.al(H.T1_DATA_LOADED, u);
                p.initT1()
            };
            this.initT5Y = function () {
                if (a) {
                    r.show(Ae.TIP.NO_T_DATA, 2);
                    return
                }
                r.show(Ae.TIP.LOAD_DATA);
                t();
                p.al(H.T5Y_DATA_LOADED, u);
                p.al(H.LASTFIVE_LOADED, e);
                p.initT5Y()
            };
            this.init = function () {
                n == Ae.URLHASH.FAKE_T5 || n == Ae.URLHASH.CL ? this.initT5Y() : this.initT1()
            }
        };
        var N = new function () {
            var t = function () {
                !g && (g = new Le(d, v, s))
            };
            this.initDayK = function () {
                r.show(Ae.TIP.LOAD_DATA);
                t();
                g.al(H.K_DATA_LOADED, u);
                g.init()
            };
            this.initMinK = function (e) {
                r.show(Ae.TIP.LOAD_DATA);
                t();
                g.al(H.KMIN_DATA_LOADED, u);
                g.initMinK(e)
            };
            this.init = function () {
                /^(5|15|30|60)$/.test(n) ? this.initMinK(n) : this.initDayK()
            }
        };
        var b = function (t) {
            if (Ae.PARAM.updateRate <= 0 && !t)return;
            clearTimeout(o);
            o = setTimeout(b, Ae.PARAM.updateRate);
            y(Ae.URL.getHqUrl().replace("$symbol", s), function () {
                var t = window["hq_str_" + s];
                d.update(t);
                if (d.hqObj.isDateChange) {
                    p && p.newDayComes();
                    g && g.newDayComes();
                    l();
                    return
                }
                if (d.isTotalRe()) {
                    p && p.reloadT1();
                    return
                }
                if (d.isUpdateTime()) {
                    p && p.update();
                    g && g.update();
                    l();
                    Ae.PARAM.updateRate != h && (Ae.PARAM.updateRate = h)
                } else {
                    h > 0 && (Ae.PARAM.updateRate = f)
                }
            }, function () {
            })
        };
        this.setFs = function (t) {
            l = t
        };
        this.initT1 = m.initT1;
        this.initT5Y = m.initT5Y;
        this.initDayK = N.initDayK;
        this.initMinK = N.initMinK;
        this.manualUpdate = function () {
            b(true)
        };
        this.init = function () {
            y(Ae.URL.getHqUrl().replace("$symbol", s + "," + s + "_i"), function () {
                v = new Te(window["hq_str_" + s + "_i"]);
                var t = window["hq_str_" + s];
                d = new De(s, t);
                if (v.ihqObj.st != "1") {
                    var e, i = false;
                    switch (v.ihqObj.st) {
                        case"0":
                            e = Ae.TIP.NO_RECORD;
                            i = true;
                            break;
                        case"2":
                            e = Ae.TIP.NOT_LISTED;
                            i = true;
                            break;
                        case"3":
                            e = Ae.TIP.DELISTED;
                            break
                    }
                    r.show(e);
                    if (i)return
                }
                a = !t || t == "";
                if (n <= 3) {
                    if (a || !("price"in d.hqObj)) {
                        n = Ae.URLHASH.KD;
                        N.init()
                    } else {
                        m.init()
                    }
                } else {
                    N.init()
                }
                !a && b()
            }, c)
        }
    }

    function He(t) {
        "use strict";
        var e = t, i, s, n, r, a;
        this.setView = function (t, e, i) {
            n = e;
            r = t;
            this.resize()
        };
        this.draw = function () {
            if (r) {
                !a && s && s.visible(false);
                !i && (i = new Ce(e.t().tO()));
                i.visible(true);
                i.draw(n)
            } else {
                a && i && i.visible(false);
                !s && (s = new Pe(e.k().kO()));
                s.visible(true);
                s.draw(n)
            }
            a = r
        };
        this.resize = function () {
            r ? i && i.resize() : s && s.resize()
        };
        this.newSets = function () {
            s.setMaLines()
        }
    }

    Ce.prototype = new se(1);
    function Ce(t) {
        "use strict";
        se.call(this, i);
        var e = Ae.datas.tDataLen, s = function () {
            return 1
        }, n = t, r = Ae.COLOR.T_P, a = Ae.COLOR.T_AVG, l = Ae.COLOR.T_V, o = s(), h = Ae.PARAM.getHd();
        var f = function () {
            return {
                pX: Ae.DIMENSION.posX,
                pY: Ae.DIMENSION.posY,
                w: Ae.DIMENSION.w_main,
                h: Ae.DIMENSION.h_main + Ae.DIMENSION.H_TIME_PART + Ae.DIMENSION.h_vol,
                r: h
            }
        };
        var c = new le(Ae.PARAM.G_Z_INDEX, f(), i);
        this.gArr = this.iArr = [c];
        this.draw = function (t) {
            var i = n.datas, s = n.poses, f, u, d, v = i.length, p = Ae.DIMENSION.w_main / v, g = p * .5;
            v = n.dataLen;
            if (n.isTotalRedraw) {
                d = 0;
                c.clear(true, h)
            } else {
                d = v - 2;
                d < 0 && (d = 0);
                g += p * d;
                c.clearLimit(g, p)
            }
            c.newStyle(r, false, o);
            for (u = d; u < v; u++) {
                f = s[u];
                if (u == d || n.days <= 5 && u % e == 0) {
                    c.moveTo(g, f[0], true)
                } else {
                    c.lineTo(g, f[0], true)
                }
                f[12] = g;
                g += p
            }
            c.stroke();
            if (t != Ae.URLHASH.CL) {
                g = p * (.5 + d);
                c.newStyle(a, true, o);
                for (u = d; u < v; u++) {
                    f = s[u];
                    if (u == d || n.days <= 5 && u % e == 0) {
                        c.moveTo(g, f[1], true)
                    } else c.lineTo(g, f[1], true);
                    g += p
                }
                c.stroke()
            }
            g = p * (.5 + d);
            c.save();
            c.translate(0, Ae.DIMENSION.h_main + Ae.DIMENSION.H_TIME_PART);
            c.newStyle(l, true, 1);
            for (u = d; u < v; u++) {
                f = s[u];
                c.moveTo(g, Ae.DIMENSION.h_vol, false);
                c.lineTo(g, f[2], true);
                g += p
            }
            c.stroke();
            c.restore()
        };
        this.iTo = function (t) {
            t >= n.dataLen && (t = n.dataLen - 1);
            c.iTo(t)
        };
        this.resize = function () {
            var t = f();
            for (var e = 0, i = this.gArr.length; e < i; e++)this.gArr[e].resize(t);
            o = s()
        }
    }

    Pe.prototype = new se(1);
    function Pe(t) {
        "use strict";
        se.call(this, i);
        var e = t, s = Ae.PARAM.minCandleNum, n = Ae.PARAM.K_TO_CL_LIMIT, r = Ae.URLHASH.KCL, a = Ae.URLHASH.YTD, l = Ae.COLOR.K_CL, o = Ae.COLOR.K_RISE, h = Ae.COLOR.K_FALL, f = Ae.COLOR.K_N, c = o, u, d, v = Ae.PARAM.getHd();
        var p = function () {
            d = Ae.MA.getWorkingMAArr()[1];
            u = d.length
        };
        var g = function () {
            return {
                pX: Ae.DIMENSION.posX,
                pY: Ae.DIMENSION.posY + Ae.DIMENSION.H_MA4K,
                w: Ae.DIMENSION.w_k,
                h: Ae.DIMENSION.h_k + Ae.DIMENSION.H_TIME_PART + Ae.DIMENSION.h_vol,
                r: v
            }
        };
        var m = new le(Ae.PARAM.G_Z_INDEX, g(), i);
        this.gArr = this.iArr = [m];
        this.setMaLines = p;
        p();
        this.draw = function (t) {
            var i = e.poses, c = e.datas, p = c.length, g = Ae.DIMENSION.h_vol, N = Ae.DIMENSION[t == r || t == a ? "w_main" : "w_k"] / Math.max(p, s), b = N * .5, _ = N * .6, I = 0;
            var y = p > n || t == r || t == a;
            var M, O, w, A, T, D, S, E, L, k, x, R, H, C;
            if (e.isTotalRedraw) {
                L = 0;
                m.clear(y, v)
            } else {
                L = p - 2;
                L < 0 && (L = 0);
                I += N * L;
                m.clearLimit(I + b, N + b)
            }
            if (y) {
                var P;
                for (A = L; A < p; A++) {
                    M = i[A];
                    P = M[0];
                    if (A == L) {
                        m.newStyle(l, true, 1.5);
                        m.moveTo(I, P)
                    } else m.lineTo(I, P);
                    M[12] = I;
                    I += N
                }
                m.stroke()
            } else {
                for (S = 0; S < 3; S++) {
                    switch (S) {
                        case 0:
                            D = o;
                            break;
                        case 1:
                            D = h;
                            break;
                        case 2:
                            D = f;
                            break
                    }
                    I = N * L;
                    m.beginPath();
                    for (A = L; A < p; A++) {
                        M = i[A];
                        T = M[9];
                        k = ~~(I + .5);
                        x = ~~(M[7] + .5);
                        R = ~~(M[8] + .5);
                        T == D && m.drawCandleC(k, x, R, [b, _], T);
                        S == 0 && (M[12] = k + b);
                        I += N
                    }
                    m.stroke();
                    I = N * L;
                    m.beginPath();
                    for (A = L; A < p; A++) {
                        M = i[A];
                        T = M[9];
                        k = ~~(I + .5);
                        x = ~~(M[7] + .5);
                        R = ~~(M[8] + .5);
                        H = ~~(M[3] + .5);
                        C = ~~(M[4] + .5);
                        T == D && m.drawCandleLineC(k, H, x, R, C, [b, _], T);
                        I += N
                    }
                    m.stroke()
                }
            }
            if (!y) {
                for (w = 0; w < u; w++) {
                    I = b + N * L;
                    m.newStyle(d[w], true, 1);
                    for (A = L; A < p; A++) {
                        M = i[A];
                        m[A == L ? "moveTo" : "lineTo"](I, M[5][w], false);
                        I += N
                    }
                    m.stroke()
                }
            }
            m.save();
            m.translate(0, Ae.DIMENSION.h_k + Ae.DIMENSION.H_TIME_PART);
            if (false) {
                I = N * L;
                for (A = L; A < p; A++) {
                    M = i[A];
                    E = M[2];
                    if (A == L) {
                        m.newStyle(Ae.COLOR.T_V, true, 1.5);
                        m.moveTo(I, E)
                    } else m.lineTo(I, E);
                    I += N
                }
                m.stroke()
            } else {
                for (S = 0; S < 2; S++) {
                    switch (S) {
                        case 0:
                            D = o;
                            break;
                        case 1:
                            D = h;
                            break
                    }
                    I = N * L;
                    m.beginPath();
                    for (A = L; A < p; A++) {
                        M = i[A];
                        E = M[2];
                        T = M[14];
                        k = ~~(I + .5);
                        T == D && m.drawVStickC(k, E, [b, _], g - E, T);
                        I += N
                    }
                    m.stroke()
                }
            }
            m.restore()
        };
        this.resize = function () {
            var t = g();
            for (var e = 0, i = this.gArr.length; e < i; e++)this.gArr[e].resize(t)
        }
    }

    function je(t) {
        "use strict";
        var e = t, s, n, r, a, l, o, h, f, c, u, d, v, p, g, N, _, I, y, M, O, w = Ae.DIMENSION.H_MA4K, A, T = Ae.COLOR.GRID, D = Ae.COLOR.T_PREV, E = Ae.COLOR.TIME_S, L = 12, k = 22, x = 65, R = x >> 1, H = Ae.PARAM.NUM_T_P_L, C = Ae.PARAM.minCandleNum, P = Ae.URLHASH.KM, j = Ae.URLHASH.KCL, q = Ae.URLHASH.YTD, K = Ae.URLHASH.K5, U = Ae.URLHASH.K15, F = Ae.URLHASH.K30, V = Ae.URLHASH.K60;
        var X, z, Y, B;
        var W = function () {
            c.resize({width: p - 1, height: g - 1, hd: Ae.PARAM.getHd()});
            f.beginPath();
            f.font = L + "px " + Ae.STYLE.FONT_FAMILY;
            f.textBaseline = "top"
        };
        var G = function () {
            if (S(Ae.COLOR.V_BG)) {
                v = m("span");
                v.style.position = "absolute";
                v.style.backgroundColor = Ae.COLOR.V_BG;
                i.appendChild(v);
                v.style.zIndex = Ae.PARAM.BG_Z_INDEX
            }
            d = m("span");
            d.style.position = "absolute";
            d.style.border = "1px solid " + T;
            i.appendChild(d);
            c = new ae;
            h = c.canvas;
            h.style.position = "absolute";
            h.style.border = "1px solid " + T;
            f = h.getContext("2d");
            i.appendChild(h);
            d.style.zIndex = h.style.zIndex = Ae.PARAM.BG_Z_INDEX;
            X = m("span");
            z = m("span");
            X.style.position = z.style.position = "absolute";
            X.style.color = z.style.color = Ae.COLOR.K_EXT;
            X.style.border = z.style.border = "1px solid " + Ae.COLOR.K_EXT_BD;
            X.style.cursor = z.style.cursor = "default";
            X.style.zIndex = z.style.zIndex = Ae.PARAM.G_Z_INDEX + 1
        };
        var $ = function () {
            A = p / x;
            g = Ae.DIMENSION.getStageH() - Ae.DIMENSION.getTTabAllH();
            O = Ae.DIMENSION.h_t;
            N = g - O - Ae.DIMENSION.H_T_TITLE;
            _ = Ae.DIMENSION.h_main;
            I = Ae.DIMENSION.h_k;
            y = Ae.DIMENSION.H_TIME_PART;
            M = Ae.DIMENSION.h_vol;
            Y = Ae.DIMENSION.posX;
            B = Ae.DIMENSION.posY;
            p = Ae.DIMENSION[n || a || r ? "w_main" : "w_k"];
            if (h.width != p - 1 && h.height != g - 1) {
                c.resize({width: p - 1, height: g - 1})
            }
            d.style.width = p - 1 + "px";
            if (v) {
                v.style.width = p + "px";
                v.style.height = M + "px";
                v.style.top = B + _ + y + "px";
                v.style.left = Y + "px"
            }
            d.style.height = y - 1 + "px";
            d.style.top = B + _ + "px";
            h.style.top = B + "px";
            h.style.left = d.style.left = Y + "px";
            f.strokeStyle != T && (f.strokeStyle = T)
        };
        G();
        $();
        this.resize = $;
        this.setView = function (t, e, l) {
            s = e;
            n = t;
            r = s == q;
            a = s == j;
            $();
            if (Ae.datas.mode == "mini")return;
            t || r || a ? b(i, X) && (i.removeChild(X), i.removeChild(z)) : !b(i, X) && (i.appendChild(X), i.appendChild(z))
        };
        this.drawFrame = function (t, i) {
            W();
            var s;
            if (t) {
                var n = false;
                if (i >= 365) {
                    i = Math.round(i / 365);
                    n = true
                }
                var r = H - 1, a = r * .5 - 1;
                var h = _ / r;
                var c = h;
                for (s = 0; s < r - 1; s++) {
                    if (!n && s == a)f.strokeStyle = D; else if (f.strokeStyle != T)f.strokeStyle = T;
                    te(0, p, c, true);
                    c += h
                }
                o || (o = e.t().tO());
                if (!o)return;
                var u;
                if (i <= 2)u = 4; else if (i == 3)u = 6; else if (i >= 3 && i <= 5)u = i;
                for (var d = p / u, v = d, s = 1; s < u; s++) {
                    te(0, N, v, false, [_, y]);
                    v += d
                }
                if (Ae.datas.mode == "mini")return;
                Q(o.dates(), n ? false : o.days > 1)
            } else {
                l || (l = e.k().kO());
                if (!l)return;
                f.strokeStyle = T;
                var m = l.labelPriceCount;
                var b = I / m;
                for (s = 0; s < m; s++)te(0, p, s * b + w, true);
                if (Ae.datas.mode == "mini")return;
                J()
            }
            if (O > Ae.DIMENSION.MIN_H_T) {
                var M = g - O * .5 - 1;
                te(0, p, M, true)
            }
        };
        var Z = function (t, e) {
            if (t < R || u > 0 && t <= u + x || t > p - R)return;
            te(w, N, t, false, [_, y]);
            f.fillStyle != E && (f.fillStyle = E);
            var i = f.measureText(e).width;
            f.fillText(e, t - (i >> 1), _);
            u = t
        };

        function J() {
            u = -1;
            var t = l.datas, e = t.length;
            var i;
            if (s == P || s == j || e > 828) {
                i = "y"
            } else if (s == K || s == U || s == F || s == V) {
                i = s == V ? "w" : "d"
            } else {
                i = "m"
            }
            var n = l.poses;
            var o = p / Math.max(e, C), h = o >> 1, f, c;
            var d = p / (o * k), v = Math.ceil(d / A);
            var g, m = -1, N, b = 0, _, y, M, O = -1, T = 0, D, S;
            for (var E, L, x = 0; x < e; x++) {
                E = t[x];
                L = n[x];
                M = E.date;
                _ = M.getMonth();
                y = M.getFullYear();
                switch (i) {
                    case"d":
                        N = M.getDate();
                        if (N != b)Z(h, [y, _ + 1, N].join("/"));
                        b = N;
                        break;
                    case"w":
                        g = M.getDay();
                        if (g < m)Z(h, [y, _ + 1, M.getDate()].join("/"));
                        m = g;
                        break;
                    default:
                    case"m":
                        if (_ != O && !(_ % v))Z(h, [y, _ + 1].join("/"));
                        O = _;
                        break;
                    case"y":
                        if (y != T)Z(h, y);
                        T = y;
                        break
                }
                if (!r && !a) {
                    f = h + Y;
                    if (E.isH) {
                        X.innerHTML = E.high.toFixed(2);
                        c = X.offsetWidth;
                        h + c > p && (f -= c);
                        X.style.left = f + "px";
                        X.style.top = B + L[3] + w - 3 + "px"
                    }
                    if (E.isL) {
                        z.innerHTML = E.low.toFixed(2);
                        c = z.offsetWidth;
                        h + c > p && (f -= c);
                        z.style.left = f + "px";
                        D = B + L[4] + w;
                        S = I - D + B - w;
                        S < 0 && (D += S + 3);
                        z.style.top = D + "px"
                    }
                }
                h += o
            }
        }

        function Q(t, e) {
            f.fillStyle != E && (f.fillStyle = E);
            for (var i, s, n, r = 0, a = t.length; r < a; r++) {
                i = t[r];
                s = f.measureText(i).width;
                if (e)n = (r + .5) * p / a - s * .5; else {
                    n = r * p / (a - 1);
                    if (r == 0) {
                    } else if (r < a - 1)n -= s * .5; else n -= s
                }
                f.fillText(t[r], n, _)
            }
        }

        function te(t, e, i, s, n) {
            f.beginPath();
            if (s) {
                f.moveTo(t, i);
                f.lineTo(e, i)
            } else {
                f.moveTo(i, t);
                if (n) {
                    f.lineTo(i, n[0]);
                    f.moveTo(i, n[0] + n[1])
                }
                f.lineTo(i, e)
            }
            f.stroke()
        }

        function ee(t, e, i, s, n) {
            f.beginPath();
            var r = 2;
            if (s) {
                while (t < e) {
                    f.moveTo(t, i);
                    t += r;
                    f.lineTo(t, i);
                    t += r
                }
            } else {
                while (t < e) {
                    if (n && t >= n[0] && t < n[0] + n[1]) {
                        t += n[1];
                        continue
                    }
                    f.moveTo(i, t);
                    t += r;
                    f.lineTo(i, t);
                    t += r
                }
            }
            f.stroke()
        }
    }

    function qe(t, e, r, a) {
        "use strict";
        var l = Ae.datas.tDataLen, o = t, h = Ae.URLHASH.KCL, f = Ae.URLHASH.YTD, c = o.hq().hqObj.digits, u, d, v, p, g, N, b = Ae.PARAM.allowV, _, I, y, M, O, w, A, T, D, S, E, L, k, x = !n, R, H;
        var C, P, q, K, U, V, z, Y;
        var B = Ae.STYLE.FONT_SIZE, W = Ae.COLOR.K_N, Z = Ae.COLOR.K_RISE, J = Ae.COLOR.K_FALL, te = Ae.PARAM.TOUCH_THRESHOLD, ee = Ae.PARAM.minCandleNum, ie = Ae.PARAM.NUM_T_P_L;
        var se = function () {
            Y.style.display = v || p == h || p >= 900 ? "none" : ""
        };
        var ne = function () {
            g = v ? o.t().tO() : o.k().kO();
            d = g.datas.length;
            oe(true)
        };
        var re = false;
        var ae = {
            isM: false,
            isTch: false,
            isP: false,
            isGd: false,
            tCount: null,
            tXOff: -1,
            isPv: false,
            lastIy: null,
            vP: function (t) {
                var e, i;
                if (t.changedTouches) {
                    var s = F.getTarget(t), n = X.pageX(s), r = X.pageY(s);
                    e = t.changedTouches[0].pageX - n;
                    i = t.changedTouches[0].pageY - y - r
                } else {
                    e = t.layerX;
                    isNaN(e) && (e = t.offsetX);
                    i = t.layerY;
                    isNaN(i) && (i = t.offsetY)
                }
                le.setStuffVisibility(true);
                u = Math.floor(e * N / O);
                oe(false, e, i)
            },
            vH: function (t) {
                if (b && t.touches) {
                    var e = t.touches[0].clientY;
                    !this.lastIy && (this.lastIy = e);
                    var i = this.lastIy - e;
                    this.lastIy = e;
                    if (Math.abs(i) > 7) {
                        window.scrollBy(0, 7 * i / Math.abs(i));
                        return
                    }
                }
                if (this.isGd)return;
                this.isGd = true;
                le.setStuffVisibility(false);
                var s = t.changedTouches ? t.changedTouches[0].clientX : t.layerX;
                isNaN(s) && (s = t.offsetX);
                r(s)
            },
            tR: function () {
                clearTimeout(this.tCount);
                this.isGd = this.isPv = false;
                le.setStuffVisibility(false)
            },
            gR: function () {
                this.tR();
                this.tXOff = -1
            },
            tCheck: function (t) {
                this.tCount = setTimeout(function () {
                    ae.isPv = true;
                    ae.vP(t)
                }, te)
            },
            mU: function () {
                this.isM = this.isP = this.isGd = false
            },
            mD: function () {
                this.isM = this.isP = true
            },
            mO: function () {
                this.isM = this.isP = this.isGd = re = false;
                le.setStuffVisibility(false);
                oe(true)
            },
            mM: function (t) {
                if (this.isTch)return;
                re = true;
                this.isP ? this.vH(t) : this.vP(t)
            },
            tE: function (t) {
                this.tR();
                this.isTch = re = false;
                if (!t)return;
                t.touches.length == 2 && this.gR();
                oe(true)
            },
            tM: function (t) {
                if (t.touches.length == 1) {
                    clearTimeout(this.tCount);
                    this.isPv ? this.vP(t) : this.vH(t)
                } else if (t.touches.length == 2) {
                    var e = t.touches[0], i = t.touches[1];
                    if (this.tXOff >= 0) {
                        var s = Math.abs(e.clientX - i.clientX);
                        if (s != this.tXOff)a(s < this.tXOff)
                    }
                    this.tXOff = Math.abs(e.clientX - i.clientX)
                }
            },
            tS: function (t) {
                this.tR();
                F.preventDefault(t);
                this.isTch = re = true;
                this.lastIy = t.touches[0].clientY;
                switch (t.touches.length) {
                    case 1:
                        this.tCheck(t);
                        break;
                    case 2:
                        this.gR();
                        break
                }
            },
            kU: function (t) {
                re = false
            },
            kD: function (t) {
                var e = t.keyCode;
                if (e == 37) {
                    re = true;
                    u--
                } else if (e == 39) {
                    re = true;
                    u++
                } else if (e == 40) {
                    if (!v) {
                    }
                } else if (e == 38) {
                    if (!v) {
                    }
                } else return;
                oe()
            },
            handleEvent: function (t) {
                switch (t.type) {
                    case"mouseup":
                        this.mU();
                        break;
                    case"mousedown":
                        this.mD();
                        break;
                    case"mouseout":
                        this.mO();
                        break;
                    case"mousemove":
                        this.mM(t);
                        break;
                    case"touchend":
                        this.tE(t);
                        break;
                    case"touchmove":
                        this.tM(t);
                        break;
                    case"touchstart":
                        this.tS(t);
                        break;
                    case"keydown":
                        this.kD(t);
                        break;
                    case"keyup":
                        this.kU(t);
                        break
                }
            }
        };
        var le = new function () {
            var t = new function () {
                this.onmouseup = function (t) {
                };
                this.onmousedown = function () {
                };
                this.onmousemove = function (t) {
                    ae.vP(t)
                };
                this.onmouseout = function () {
                    le.setStuffVisibility(false);
                    oe(true)
                }
            };
            var e = function () {
                if (x) {
                    k = m("canvas")
                } else {
                    k = m("div");
                    k.style.backgroundColor = "#999";
                    k.style.opacity = 0;
                    k.style.filter = "alpha(opacity=0)"
                }
                k.style.position = "absolute";
                k.style.zIndex = Ae.PARAM.I_Z_INDEX;
                var e = j.istd ? ["touchend", "touchmove", "touchstart"] : ["mousedown", "mouseup", "mousemove", "mouseout"];
                for (var s = 0, n = e.length; s < n; s++) {
                    x ? F.addHandler(k, e[s], ae) : F.addHandler(k, e[s], t["on" + e[s]] || function () {
                    })
                }
                if (Ae.datas.mode != "mini")i.appendChild(k)
            }, s = function () {
                U = m("div");
                V = m("div");
                z = m("div");
                Y = m("div");
                if (Ae.datas.mode == "mini")return;
                U.style.position = V.style.position = z.style.position = Y.style.position = "absolute";
                U.style.zIndex = V.style.zIndex = z.style.zIndex = Y.style.zIndex = Ae.PARAM.BG_Z_INDEX;
                U.style.fontSize = V.style.fontSize = z.style.fontSize = Y.style.fontSize = B + "px";
                U.style.textAlign = V.style.textAlign = "right";
                V.style.color = Ae.COLOR.V_S;
                Y.style.lineHeight = B + 5 + "px";
                i.appendChild(U);
                i.appendChild(V);
                i.appendChild(z);
                i.appendChild(Y)
            }, n = function () {
                H = m("div");
                R = m("div");
                H.style.width = R.style.height = "1px";
                H.style.backgroundColor = R.style.backgroundColor = Ae.COLOR.IVH_LINE;
                H.style.position = R.style.position = "absolute";
                H.style.zIndex = R.style.zIndex = Ae.PARAM.G_Z_INDEX + 1;
                i.appendChild(H);
                i.appendChild(R)
            }, r = function () {
                C = m("span");
                K = m("span");
                P = m("span");
                q = m("span");
                K.style.textAlign = C.style.textAlign = P.style.textAlign = q.style.textAlign = "center";
                K.style.position = C.style.position = P.style.position = q.style.position = "absolute";
                K.style.fontSize = C.style.fontSize = P.style.fontSize = q.style.fontSize = B + "px";
                K.style.background = C.style.background = P.style.background = q.style.background = Ae.COLOR.F_BG;
                K.style.zIndex = C.style.zIndex = P.style.zIndex = Ae.PARAM.BG_Z_INDEX + 1;
                q.style.zIndex = Ae.PARAM.G_Z_INDEX + 2;
                q.style.minWidth = "110px";
                q.style.color = Ae.COLOR.TIME_F;
                K.style.color = Ae.COLOR.V_F;
                q.style.lineHeight = q.style.height = C.style.lineHeight = C.style.height = K.style.lineHeight = K.style.height = P.style.lineHeight = P.style.height = B + 5 + "px";
                i.appendChild(K);
                i.appendChild(q);
                i.appendChild(C);
                i.appendChild(P)
            };
            var a = function () {
                T = Ae.DIMENSION.getStageH();
                O = v || p == h || p >= 900 ? Ae.DIMENSION.w_main : Ae.DIMENSION.w_k;
                x && k.width != O && (k.width = O);
                k.style.width = O + "px";
                R.style.width = O + "px";
                z.style.left = _ + O + 1 + "px";
                P.style.left = _ + O + 1 + "px"
            }, l = function () {
                var t = y, e = T;
                e -= Ae.DIMENSION.getTTabAllH();
                !v && (t += M, e -= M);
                k.style.top = H.style.top = t + "px";
                x && k.height != e && (k.height = e);
                k.style.height = e + "px";
                H.style.height = e + "px";
                U.style.top = z.style.top = t - B + 5 + "px"
            }, o = function () {
                _ = Ae.DIMENSION.posX;
                y = Ae.DIMENSION.posY;
                I = Ae.DIMENSION.lbX;
                w = Ae.DIMENSION.getLeftW();
                A = Ae.DIMENSION.RIGHT_W;
                M = Ae.DIMENSION.H_MA4K;
                D = Ae.DIMENSION.h_main;
                S = Ae.DIMENSION.h_k;
                E = Ae.DIMENSION.H_TIME_PART;
                L = Ae.DIMENSION.h_vol;
                a();
                l();
                k.style.left = R.style.left = _ + "px";
                U.style.left = V.style.left = Ae.DIMENSION.lbX + "px";
                V.style.top = y + D + B + "px";
                Y.style.top = y + "px";
                C.style.width = K.style.width = Y.style.left = _ + "px";
                P.style.width = A + "px";
                q.style.top = y - E - 2 + "px"
            }, f = function (t) {
                C.style.display = K.style.display = R.style.display = H.style.display = q.style.display = P.style.display = t ? "" : "none"
            };
            this.init = function () {
                e();
                s();
                n();
                r();
                o();
                f(false)
            };
            this.resize = o;
            this.setStuffVisibility = f
        };
        le.init();
        this.resize = le.resize;
        this.setView = function (t, e, i) {
            v = t;
            p = e;
            le.resize();
            se()
        };
        this.rangeRenew = function (t, e) {
            var i = p >= 900, s = _ - I;
            t ? ne() : d = g.datas.length;
            N = Math.max(d, p == h || i ? 1 : ee);
            var n = g.prevclose, r = v ? ie : g.labelPriceCount + 1, a;
            var l = {
                isCl: p == h || p >= 900,
                ctn: U,
                h: v ? D : S,
                cKS: Ae.COLOR.K_P,
                cR: Z,
                cF: J,
                cB: W,
                fs: B,
                w: s,
                digits: c
            }, o = {h: L, w: s, fs: B};
            if (v || p == h) {
                a = G.pa(g.minPrice, g.maxPrice, n, r);
                Q.pM(g.minPrice, g.maxPrice, n, !v, r, l)
            } else {
                a = p == f ? G.pa(g.labelMinP, g.labelMaxP, n, r) : [];
                Q.pM(g.labelMinP, g.labelMaxP, n, !v, r, l)
            }
            Q.pctM(a, z, v ? D : S, J, Ae.COLOR.K_P, Z);
            Q.vM(g.labelMaxVol, V, o);
            e && oe(true)
        };
        function oe(t, i, n) {
            !re && t ? u = Number.MAX_VALUE : u < 0 && (u = 0);
            e(u);
            var r, a, o, c, m, N, b, I = W;
            if (v) {
                u >= g.dataLen && (u = g.dataLen - 1);
                r = g.marks[u];
                a = g.datas[u];
                o = g.poses[u];
                m = r[0];
                N = r[3];
                var w = p == Ae.URLHASH.CL ? a.date : g.datas[Math.floor(u / l) * l].date;
                b = w.getFullYear() + "/" + $.zp(w.getMonth() + 1) + "/" + $.zp(w.getDate()) + " " + (a.time || "");
                c = [b, "价:", m, "均:", r[1], "幅:", N, "量:", r[2]];
                if (a.percent > 0)I = Z; else if (a.percent < 0)I = J;
                P.style.color = C.style.color = I;
                C.innerHTML = m;
                P.innerHTML = N
            } else {
                u >= d && (u = d - 1);
                r = g.marks[u];
                a = g.datas[u];
                o = g.poses[u];
                N = o[13];
                b = a.day + " " + (a.time || "");
                switch (p) {
                    case f:
                        c = [b, "价:", r[0], "年涨幅:", r[8], "量", r[2]];
                        break;
                    case h:
                        c = [b, "价:", r[0], "区间涨幅:", r[8], "量:", r[2]];
                        break;
                    default:
                        c = [b, "开:", r[5], "高:", r[1], "低:", r[4], "收:", r[0], "幅:", r[3], "量:", r[2]];
                        break
                }
                C.innerHTML = a.close.toFixed(2);
                if (p == h || p >= 900) {
                    if (N > 0)I = Z; else if (N < 0)I = J;
                    P.style.color = C.style.color = I;
                    P.innerHTML = r[8]
                } else {
                    C.style.color = I;
                    Q.maT(r, Y, Ae.MA.getWorkingMAArr(), Ae.datas.mode == "wap");
                    P.style.display = "none"
                }
            }
            s.innerHTML = c.join("");
            var A = o[12], T = _ + A;
            q.innerHTML = b;
            var S = q.offsetWidth >> 1;
            var E = T - S;
            if (E < _)E = _; else {
                var L = A + S - O;
                L > 0 && (E -= L)
            }
            q.style.left = E + "px";
            H.style.left = T + "px";
            var k = y + o[0];
            !v && (k += M);
            R.style.top = k + "px";
            P.style.top = C.style.top = k - B + 3 + "px";
            K.style.top = y + D + o[2] + "px";
            K.innerHTML = r[2]
        }
    }

    function Ke(t) {
        "use strict";
        var e = t, s = [], n, a, l, o, h, f, c, u, d, v, p;
        var g = new function () {
            var r = function (t, e) {
                o && o.iTo(t)
            }, f = function (t) {
                !d && !p && h.globalDrag(t)
            };
            var c = function (t) {
                h.zoomView(t)
            };
            this.gestureHandler = c;
            var v = function (t, i, s, r) {
                var h = 0, f;
                if (d) {
                    h = i - t;
                    if (u == Ae.URLHASH.T5) {
                        e.t().td5() && (f = e.t().td5()[t][0].date);
                        !f && (f = e.hq().hqObj.date)
                    } else if (u == Ae.URLHASH.CL) {
                        switch (h) {
                            case 1:
                                h = 365;
                                break;
                            case 2:
                                h = 665;
                                break;
                            case 3:
                                h = 965;
                                break
                        }
                        if (!e.t().tdy())return;
                        f = e.t().tdy()[Math.floor(t * e.t().tdy().length / 3)].date
                    }
                    e.t().setRange(h, f, r)
                } else {
                    f = "k" + u;
                    e.k().setRange(f, t, i, r, u)
                }
                a.drawFrame(d, h);
                if (!s) {
                    n.draw();
                    l && l.rangeRenew(false, r)
                }
                o && o.work(t, i)
            };
            var g = function () {
                a = new je(t);
                s[s.length] = a
            }, m = function () {
                n = new He(e);
                s[s.length] = n
            }, N = function () {
                l = new qe(e, r, f, c);
                s[s.length] = l
            }, b = function () {
                o = new ye(e, Ae, i);
                s[s.length] = o
            }, _ = function () {
                h = new ue(e, Ae, i);
                s[s.length] = h;
                h.setCtrlCbs(v)
            };
            this.init = function () {
                g();
                m();
                switch (Ae.datas.mode) {
                    case"wap":
                        N();
                        break;
                    case"mini":
                        break;
                    default:
                        N();
                        b();
                        break
                }
                _()
            }
        };
        var m = new function () {
            var t = function () {
                h && h.update()
            };
            var i = function (t) {
                u = t == Ae.URLHASH.FAKE_T5 || t == Ae.URLHASH.TS ? Ae.URLHASH.T5 : t;
                d = t <= 3;
                v = t == Ae.URLHASH.FAKE_T5;
                p = u == Ae.URLHASH.YTD;
                he(d || p);
                ce(d || p)
            };
            var a = function () {
                for (var t = 0, e = s.length; t < e; t++)s[t].setView(d, u, v);
                n.draw();
                l && l.rangeRenew(true);
                r.show()
            };
            var o = function () {
                _(false, true);
                g.init();
                h.is5T = v;
                a()
            };
            var m = function (t, e) {
                i(e);
                o()
            }, N = function (t) {
                _(false);
                b()
            };

            function b() {
                var t = false;
                if (d) {
                    if (e.t() && e.t().tO()) {
                        if (u == Ae.URLHASH.CL)e.t().tdy() && (t = true); else if (v)e.t().td5() && (t = true); else t = true
                    }
                    if (!t) {
                        if (v || u == Ae.URLHASH.CL) {
                            e.al(H.T5Y_DATA_LOADED, N);
                            e.initT5Y()
                        } else {
                            e.al(H.T1_DATA_LOADED, N);
                            e.initT1()
                        }
                    }
                } else {
                    if (u == Ae.URLHASH.KD || u == Ae.URLHASH.KW || u == Ae.URLHASH.KM || u == Ae.URLHASH.KCL) {
                        c = !(f < 1)
                    } else c = false;
                    if (!c && e.k() && e.k().kState() && e.k().kState().get("k" + u)) {
                        t = true
                    } else {
                        if (c) {
                        } else {
                            if (u == Ae.URLHASH.K5 || u == Ae.URLHASH.K15 || u == Ae.URLHASH.K30 || u == Ae.URLHASH.K60) {
                                e.al(H.KMIN_DATA_LOADED, N);
                                e.initMinK(u)
                            } else {
                                e.al(H.K_DATA_LOADED, N);
                                e.initDayK()
                            }
                        }
                    }
                }
                t && a()
            }

            function _(t, i) {
                var s = i ? m : N;
                e[t ? "al" : "rl"](H.T1_DATA_LOADED, s);
                e[t ? "al" : "rl"](H.T5Y_DATA_LOADED, s);
                e[t ? "al" : "rl"](H.K_DATA_LOADED, s);
                e[t ? "al" : "rl"](H.KMIN_DATA_LOADED, s)
            }

            this.showViewOnData = b;
            this.init = function () {
                e.setFs(t);
                _(true, true)
            }
        };
        this.onTabSelected = function (t, e, i, s) {
            if (!h)return;
            u = t;
            d = e;
            v = h.is5T = i;
            p = u == Ae.URLHASH.YTD;
            f = s || 0;
            m.showViewOnData();
            he(d || p);
            ce(d || p)
        };
        this.zoom = g.gestureHandler;
        this.resize = function () {
            for (var t = 0, e = s.length; t < e; t++)s[t].resize()
        };
        this.newSets = function () {
            e.k().calcAllMA();
            n.newSets();
            h.update(true)
        };
        m.init()
    }

    return new function () {
        "use strict";
        var t = this, n, a, l, o;
        var h = e || {};
        var f = function (t) {
            if (!t || $.trim(t) == "")return;
            t = $.trim(t.toLowerCase());
            var e = Ae.URLHASH.vi(t), i = t.indexOf("t") == 0, s = e == Ae.URLHASH.FAKE_T5;
            i && e != Ae.URLHASH.CL && (e = Ae.URLHASH.T5);
            l && l.onTabSelected(e, i, s)
        };
        var c = new function () {
            var e = function (t, e, i, s, n) {
                var r = g(t);
                r && F.addHandler(r, "click", function (t) {
                    l.onTabSelected(e, i, s, n)
                })
            };
            var i = function (t, e) {
                oe[oe.length] = t;
                F.addHandler(g(t), "click", function (t) {
                    l.zoom(!e)
                })
            };
            this.init = function () {
                var s = true;
                if (h.btnids) {
                    var n;
                    for (var r in h.btnids) {
                        s = false;
                        n = h.btnids[r];
                        r = String(r).toLowerCase();
                        switch (r) {
                            case"t":
                                e(n, Ae.URLHASH.T5, true);
                                break;
                            case"t5":
                                e(n, Ae.URLHASH.T5, true, true);
                                break;
                            case"tcl":
                                e(n, Ae.URLHASH.CL, true);
                                break;
                            case"cl":
                                e(n, Ae.URLHASH.KCL);
                                break;
                            case"kd":
                                e(n, Ae.URLHASH.KD);
                                break;
                            case"kw":
                                e(n, Ae.URLHASH.KW);
                                break;
                            case"km":
                                e(n, Ae.URLHASH.KM);
                                break;
                            case"k5":
                                e(n, Ae.URLHASH.K5);
                                break;
                            case"k15":
                                e(n, Ae.URLHASH.K15);
                                break;
                            case"k30":
                                e(n, Ae.URLHASH.K30);
                                break;
                            case"k60":
                                e(n, Ae.URLHASH.K60);
                                break;
                            case"zoomin":
                                i(n, true);
                                break;
                            case"zoomout":
                                i(n, false);
                                break
                        }
                    }
                }
                if (s)t.showView = f
            }
        };
        var u = function () {
            var t = Ae.datas.mode = String(h.mode).toLowerCase() || "web";
            switch (t) {
                default:
                    break;
                case"wap":
                    M();
                    break;
                case"mini":
                    O();
                    break
            }
        };
        var d = function () {
            n = h.domid && g(h.domid) || null;
            if (!n) {
                n = m("div");
                document.body.appendChild(n)
            }
            n.style.position = "relative";
            n.style.fontSize = "12px";
            s = m("div");
            s.id = "sdafdsaf";
            s.style.height = "15px";
            s.style.clear = "both";
            if (Ae.datas.mode != "mini")n.appendChild(s);
            i = m("div");
            i.style.position = "relative";
            if (Ae.datas.mode != "mini")i.style.marginTop = "18px";
            n.appendChild(i);
            var t = m("div");
            n.appendChild(t);
            r = new _(t, Ae.TIP.INIT, Ae.PARAM.I_Z_INDEX - 1);
            if (typeof h.nozoombtn !== "boolean" || !h.nozoombtn) {
                o = m("div");
                n.appendChild(o);
                fe[fe.length] = o;
                o.style.fontSize = "28px";
                o.style.textAlign = "center";
                o.style.position = "absolute";
                o.style.opacity = .5;
                o.style.display = "none";
                o.style.zIndex = Ae.PARAM.I_Z_INDEX + 1;
                o.style.lineHeight = "40px";
                o.onselectstart = o.onmousedown = function () {
                    return false
                };
                var e = m("div"), a = m("div");
                e.innerHTML = "+";
                a.innerHTML = "-";
                a.style.styleFloat = e.style.styleFloat = a.style.cssFloat = e.style.cssFloat = "left";
                a.style.cursor = e.style.cursor = "pointer";
                a.style.width = e.style.width = "40px";
                e.style.marginRight = "25px";
                a.style.backgroundColor = e.style.backgroundColor = Ae.COLOR.K_ZB;
                o.appendChild(e);
                o.appendChild(a);
                F.addHandler(e, "click", function (t) {
                    l.zoom(false)
                });
                F.addHandler(a, "click", function (t) {
                    l.zoom(true)
                })
            }
        };
        var v = function (t, e) {
            if (!t || !e) {
                t = n.offsetWidth;
                e = n.offsetHeight;
                if (e < Ae.DIMENSION.MIN_H) {
                    e = document.documentElement.clientHeight
                }
                h.mh && (e -= h.mh);
                var i = Ae.DIMENSION.H_VS_W;
                e > t * i && (e = t * i)
            }
            Ae.DIMENSION.setStageW(t);
            Ae.DIMENSION.setStageH(e, Ae.datas.mode == "wap" || Ae.datas.mode == "mini");
            var a = Ae.DIMENSION.getStageW(), l = Ae.DIMENSION.getStageH(), f = Ae.DIMENSION.posY;
            s && (s.style.fontSize = (a < 370 ? 9 : 12) + "px");
            r.locate(a, f + (l >> 1));
            if (o) {
                o.style.left = a - 150 + "px";
                o.style.top = f + Ae.DIMENSION.h_main + Ae.DIMENSION.H_TIME_PART + 9 + "px"
            }
        };
        var p = function (t, e, i) {
            v(e, i);
            (t || e && i) && l && l.resize()
        };
        var N = function () {
            window.onresize = p;
            p()
        };
        var b = function () {
            var t = h.rate;
            if (typeof t === "number" && t >= 0)Ae.PARAM.updateRate = Ae.PARAM.DESIGNATE_RATE = t * 1e3;
            if (typeof h.allowetag === "boolean")Ae.PARAM.allowEtag = h.allowetag
        };
        var I = function () {
            typeof h.hd !== "undefined" && Ae.PARAM.setHd(h.hd);
            if (typeof h.allowv === "boolean")Ae.PARAM.allowV = h.allowv;
            h.theme && Ae.COLOR.newTheme(h.theme);
            u();
            d();
            c.init();
            h.w > 1 && h.h > 1 ? v(h.w, h.h) : N();
            b()
        };
        var y = function () {
            var t = h.symbol || Ae.datas.s;
            if (h.type == "option") {
                Ae.datas.isOption = true
            } else {
                t = String(t).toLowerCase()
            }
            var e, i;
            e = h.view || "";
            i = Ae.URLHASH.vi(e);
            a = new Re(t, i);
            l = new Ke(a);
            a.init();
            R(Ae.stat.i)
        };
        this.resizeH5 = function (t, e) {
            p(null, t, e)
        };
        this.callFunc = function (t) {
            switch (t) {
                case C.ZOOM_IN:
                    l && l.zoom(false);
                    break;
                case C.ZOOM_OUT:
                    l && l.zoom(true);
                    break;
                case C.UPDATE:
                    a && a.manualUpdate();
                    break
            }
        };
        I();
        y();
        function M() {
            Ae.DIMENSION.H_T_TITLE = 0;
            Ae.DIMENSION.h_t = 0;
            Ae.DIMENSION.H_T_TAB = 0;
            Ae.DIMENSION.MIN_H_T = 0;
            Ae.PARAM.defaultCandleNum = 50;
            Ae.PARAM.minCandleNum = 20
        }

        function O() {
            Ae.DIMENSION.H_T_TITLE = 0;
            Ae.DIMENSION.h_t = 0;
            Ae.DIMENSION.H_T_TAB = 0;
            Ae.DIMENSION.MIN_H_T = 0;
            Ae.PARAM.defaultCandleNum = 20;
            Ae.PARAM.minCandleNum = 10;
            Ae.DIMENSION.RIGHT_W = 0;
            Ae.DIMENSION.posX = 0;
            Ae.DIMENSION.H_MA4K = 0;
            Ae.DIMENSION.MIN_H = 1;
            Ae.DIMENSION.H_TIME_PART = 1
        }
    }
}