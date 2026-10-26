enScroll = !1;
const e = localStorage,
    t = sessionStorage,
    o = document,
    s = document.documentElement,
    r = document.body,
    n = document.location,
    i = window,
    c = screen,
    l = navigator || {};

function d() {
    const s = () => Math.floor(1e9 * Math.random()) + 1,
        r = () => Math.floor(Date.now() / 1e3),
        d = e.getItem("cid_v4"),
        a = n.search,
        v = new URLSearchParams(a),
        u = ["q", "s", "search", "query", "keyword"],
        _ = u.some((e => a.includes("&" + e + "=") || a.includes("?" + e + "="))),
        g = () => 1 == _ ? "view_search_results" : 1 == enScroll ? "scroll" : "page_view",
        h = encodeURIComponent,
        p = "https://www.google-analytics.com/g/collect?" + (e => {
            let t = [];
            for (let o in e) e.hasOwnProperty(o) && void 0 !== e[o] && t.push(h(o) + "=" + h(e[o]));
            return t.join("&")
        })({
            v: "2",
            tid: "G-HM9ZQSJVNZ",
            _p: (t._p || (t._p = s()), t._p),
            sr: (c.width * i.devicePixelRatio + "x" + c.height * i.devicePixelRatio).toString(),
            ul: (l.language || void 0).toLowerCase(),
            cid: (e.cid_v4 || (e.cid_v4 = s() + "." + r()), e.cid_v4),
            _fv: d || 1 == enScroll ? void 0 : "1",
            _s: "1",
            dl: n.origin + n.pathname + a,
            dt: o.title || void 0,
            dr: o.referrer || void 0,
            sid: (t.sid || (t.sid = r()), t.sid),
            sct: (() => {
                if (t.sct) {
                    if (1 == enScroll) return t.sct;
                    x = +t.getItem("sct") + 1, t.sct = x
                } else t.sct = "1";
                return t.sct
            })(),
            seg: "1",
            en: g(),
            "epn.percent_scrolled": 1 == enScroll ? "90" : void 0,
            "ep.search_term": (() => {
                if ("view_search_results" == g())
                    for (let e of v)
                        if (u.includes(e[0])) return e[1]
            })(),
            _ss: (() => {
                if (!t._ss) return t._ss = "1", t._ss;
                t.getItem("_ss")
            })(),
            _dbg: void 0
        });
    if (l.sendBeacon) l.sendBeacon(p);
    else {
        (new XMLHttpRequest).open("POST", p, !0)
    }
}
d(), o.addEventListener("scroll", (function e() {
    if ((s.scrollTop || r.scrollTop) / ((s.scrollHeight || r.scrollHeight) - s.clientHeight) * 100 < 90) return;
    enScroll = !0, d(), o.removeEventListener("scroll", e, {
        passive: !0
    })
}), {
    passive: !0
});
