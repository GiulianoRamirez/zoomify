/*
 Zoomify Image Viewer, version on line 16 below. Copyright Zoomify, Inc., 1999-2016. All rights reserved. You may
use this file on private and public websites, for personal and commercial purposes, so long as this notice is included. Redistribution
via other means is not permitted without prior permission. Additional terms apply. For complete license terms please see the
Zoomify License Agreement on the Zoomify website at www.zoomify.com/zoomifyLicenseAgreement.htm.
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
*/
(function() {
    (function() { return this }).call().Z = {} })();
Z.version = "4.1 FreeEdition";
Z.setCallback = function(a, b) { "undefined" === typeof Z.callbacks && (Z.callbacks = []); var d = Z.Utils.arrayIndexOfObjectTwoValues(Z.callbacks, "callbackEvent", a, null, "callbackFunction", b); - 1 == d && (d = Z.callbacks.length);
    Z.callbacks[d] = { callbackEvent: a, callbackFunction: b } };
Z.showImage = function(a, b, d) {
    Z.showImage.done || (Z.showImage.done = !0, Z.Utils.addCrossBrowserMethods(), Z.Utils.addCrossBrowserEvents(), Z.Utils.declareGlobals(), Z.pageContainerID = a, Z.clearCallback = function(a, b) { var d = Z.Utils.arrayIndexOfObjectTwoValues(Z.callbacks, "callbackEvent", a, null, "callbackFunction", b); - 1 != d && (Z.callbacks = Z.Utils.arraySplice(Z.callbacks, d, 1)) }, "undefined" !== typeof b && Z.Utils.stringValidate(b) ? Z.imagePath = Z.Utils.stringRemoveTrailingSlashCharacters(b) : Z.imagePath = null, "complete" !=
        document.readyState ? (Z.Utils.addEventListener(document, "DOMContentLoaded", Z.initialize), Z.Utils.addEventListener(window, "load", Z.initialize)) : Z.initialize())
};
Z.initialize = function() { Z.Utils.removeEventListener(document, "DOMContentLoaded", Z.initialize);
    Z.Utils.removeEventListener(window, "load", Z.initialize);
    Z.Utils.detectBrowserFeatures();
    Z.Utils.setParameters();
    Z.Viewer = new Z.ZoomifyImageViewer;
    Z.Viewer.configureViewer() };
Z.ZoomifyImageViewer = function() {
    function a() { document.getElementsByTagName("body") ? document.getElementsByTagName("body")[0].onorientationchange = b : window.setTimeout(a, 100) }

    function b(a) {}

    function d(a) {
        a = Z.Utils.event(a);
        18 == a.keyCode || a.altKey || Z.viewportCurrent.zoomAndPanAllStop(!0, !0);
        if (a) {
            var b = a.type;
            a = a.keyCode;
            if ("keydown" == b) switch (Z.keyIsDown = !0, a) {
                case 90:
                    Z.viewportCurrent.zoom("out");
                    break;
                case 17:
                    Z.viewportCurrent.zoom("out");
                    break;
                case 65:
                    Z.viewportCurrent.zoom("in");
                    break;
                case 16:
                    Z.viewportCurrent.zoom("in");
                    break;
                case 37:
                    Z.viewportCurrent.pan("left");
                    break;
                case 38:
                    Z.viewportCurrent.pan("up");
                    break;
                case 40:
                    Z.viewportCurrent.pan("down");
                    break;
                case 39:
                    Z.viewportCurrent.pan("right");
                    break;
                case 27:
                    Z.viewportCurrent.reset()
            } else if ("keyup" == b)
                if (Z.keyIsDown = !1, 90 == a || 17 == a || 65 == a || 16 == a) Z.viewportCurrent.zoom("stop");
                else if (37 == a || 39 == a || 38 == a || 40 == a) 37 == a || 39 == a ? Z.viewportCurrent.pan("horizontalStop") : 38 != a && 40 != a || Z.viewportCurrent.pan("verticalStop")
        }
    }

    function c(a) {
        a = Z.Utils.event(a);
        var b = a.type;
        if (a &&
            b) {
            var d = Z.Utils.isRightMouseButton(a),
                c = a.altKey;
            if (!("mouseover" != b && "mouseout" != b && !Z.interactive || "mousedown" == b && (!Z.interactive || Z.coordinatesVisible && c) || d)) {
                Z.touchSupport && "touchmove" != b && "gesturechange" != b && a.preventDefault();
                switch (b) {
                    case "mouseover":
                        Z.Viewer.initializeViewerKeyDefaultListeners(!0); break;
                    case "mouseout":
                        Z.Viewer.initializeViewerKeyDefaultListeners(!1) }
                var c = Z.Utils.event(a),
                    e = c.type;
                if (c && e) {
                    var h;
                    a = Z.Utils.target(c);
                    d = Z.Utils.relatedTarget(c);
                    "resize" != e && (h = Z.Utils.getMousePosition(c));
                    var m = c.altKey;
                    "DOMMouseScroll" == e && (e = "mousewheel");
                    switch (e) {
                        case "mouseover":
                            c = Z.Utils.nodeIsInViewer(a);
                            e = Z.Utils.nodeIsInViewer(d);
                            c && e || (Z.Toolbar.show(!0), Z.mouseOutDownPoint = null);
                            break;
                        case "mouseout":
                            c = Z.Utils.nodeIsInViewer(a);
                            e = Z.Utils.nodeIsInViewer(d);
                            c && e || "[object HTMLSelectElement]" == a || "[object HTMLOptionElement]" == a || "[object HTMLSelectElement]" == d || "[object HTMLOptionElement]" == d || (Z.mouseIsDown ? Z.mouseOutDownPoint = new Z.Utils.Point(h.x, h.y) : Z.Toolbar.show(!1));
                            break;
                        case "mousewheel":
                            0 <
                                Z.mouseWheel && Z.viewportCurrent.mouseWheelHandler(Math.max(-1, Math.min(1, c.wheelDelta || -c.detail)), m)
                    }
                }
                if ("mousedown" == b || "mousemove" == b) return !1
            }
        }
    }
    var e = this,
        h = [];
    Z.ViewerDisplay = Z.Utils.createContainerElement("div", "ViewerDisplay", "inline-block", "relative", "hidden", "100%", "100%", "0px", "0px", "none", "0px", "transparent none", "0px", "0px", "normal", "pointer");
    Z.pageContainer = document.getElementById(Z.pageContainerID);
    Z.Utils.getElementStyle(Z.pageContainer);
    Z.ViewerDisplay.style["-webkit-touch-callout"] =
        "none";
    Z.ViewerDisplay.style["-moz-user-select"] = "none";
    Z.ViewerDisplay.style["-khtml-user-select"] = "none";
    Z.ViewerDisplay.style["-webkit-user-select"] = "none";
    Z.ViewerDisplay.style["-ms-user-select"] = "none";
    Z.ViewerDisplay.style["-o-user-select"] = "none";
    Z.ViewerDisplay.style["user-select"] = "none";
    var r = Z.Utils.getContainerSize(Z.pageContainer, Z.ViewerDisplay);
    Z.viewerW = r.x;
    Z.viewerH = r.y;
    Z.pageContainer.innerHTML = "";
    Z.pageContainer.appendChild(Z.ViewerDisplay);
    Z.mouseWheelCompleteDuration = parseInt(Z.Utils.getResource("z165"),
        10);
    this.configureViewer = function() {
        if (!Z.Viewer.getStatus("configureCalled")) {
            var b = function() { Z.clearCallback(d, b);
                e.initializeViewerKeyEventListeners(!0);
                Z.Utils.addEventListener(Z.ViewerDisplay, "mouseover", c);
                Z.Utils.addEventListener(Z.ViewerDisplay, "mouseout", c);
                Z.Utils.addEventListener(Z.ViewerDisplay, "mousemove", Z.Utils.preventDefault);
                Z.Utils.addEventListener(Z.ViewerDisplay, "mousewheel", c);
                Z.Utils.addEventListener(Z.ViewerDisplay, "mousewheel", Z.Utils.preventDefault);
                a();
                Z.Toolbar = new Z.ZoomifyToolbar(Z.viewportCurrent) };
            Z.Viewer.setStatus("configureCalled", !0);
            var d = Z.imageSet ? "initializedViewer" : "initializedViewport";
            Z.setCallback(d, b);
            Z.Viewport = new Z.ZoomifyViewport;
            Z.viewportCurrent = Z.Viewport
        }
    };
    this.z759 = function(a, b, d, c, e) { Z.viewerW = a;
        Z.viewerH = b;
        Z.ViewerDisplay.style.width = a + "px";
        Z.ViewerDisplay.style.height = b + "px";
        Z.Viewport && Z.Viewport.getStatus("initializedViewport") && Z.Viewport.z759(a, b, d, c);
        b -= Z.toolbarH;
        Z.ToolbarDisplay && Z.Toolbar.z747() && (Z.Toolbar.z759(a, null, null, b), Z.Toolbar.show(!0));
        e && Z.Viewport.updateView(!0) };
    this.getStatus = function(a) { a = Z.Utils.arrayIndexOfObjectValue(h, "state", a); return -1 == a ? !1 : h[a].status };
    this.setStatus = function(a, b) { var d = !1,
            c = Z.Utils.arrayIndexOfObjectValue(h, "state", a); - 1 == c ? (d = b, h[h.length] = { state: a, status: b }) : (!h[c].status && b && (d = !0), h[c].status = b);
        d && (Z.Utils.validateCallback(a), e.validateViewerReady(a)) };
    this.validateViewerStatus = function(a) { var b = a.indexOf("Viewport"); - 1 != b && (a = a.substring(0, b));
        e.setStatus(a + "Viewer", !0) };
    this.validateViewerReady = function(a) {
        a = Z.Viewport &&
            Z.Viewport && Z.Viewport.getStatus("initializedViewport") && Z.Viewport.getStatus("precacheLoadedViewport") && Z.Viewport.getStatus("backfillLoadedViewport") && Z.Viewport.getStatus("backfillDrawnViewport") && Z.Viewport.getStatus("displayLoadedViewport") && Z.Viewport.getStatus("displayDrawnViewport");
        var b = 0 == Z.ToolbarVisible || Z.Toolbar && Z.Toolbar.z747();
        (a = a && b) && Z.Viewer.setStatus("readyViewer", !0);
        return a
    };
    this.initializeViewerKeyEventListeners = function(a) {
        a ? (Z.Utils.addEventListener(document, "keydown",
            d), Z.Utils.addEventListener(document, "keyup", d)) : (Z.Utils.removeEventListener(document, "keydown", d), Z.Utils.removeEventListener(document, "keyup", d))
    };
    this.initializeViewerKeyDefaultListeners = function(a) { a ? (Z.Utils.addEventListener(document, "keydown", Z.Utils.preventDefault), Z.Utils.addEventListener(document, "keyup", Z.Utils.preventDefault)) : (Z.Utils.removeEventListener(document, "keydown", Z.Utils.preventDefault), Z.Utils.removeEventListener(document, "keyup", Z.Utils.preventDefault)) };
    this.z586 = function(a) {
        Z.mouseWheelIsDown = !1;
        Z.mouseWheelCompleteTimer && (window.clearTimeout(Z.mouseWheelCompleteTimer), Z.mouseWheelCompleteTimer = null, Z.zooming = "stop", Z.viewportCurrent.updateView(!0))
    }
};
Z.ZoomifyViewport = function(a, b, d, c, e, h) {
    function r(a, b, g, f, d, c, e, U, m, h, l) {
        Z.useCanvas && (x && (Q = x.getContext("2d")), La = B.getContext("2d"), R = F.getContext("2d"), Ya = ca.getContext("2d"));
        Z.imageW = a;
        Z.imageH = b;
        Z.imageCtrX = Z.imageW / 2;
        Z.imageCtrY = Z.imageH / 2;
        Z.imageD = Math.round(Math.sqrt(a * a + b * b));
        vb = d;
        ya = g;
        za = f;
        a = Z.imageW;
        for (b = Z.imageH; a > ya || b > za;) a /= 2, b /= 2, ma++;
        a = Z.imageW;
        b = Z.imageH;
        g = 0;
        for (f = ma - 1; 0 <= f; f--) na[f] = a, Aa[f] = b, ia[f] = Math.ceil(na[f] / ya), oa[f] = Math.ceil(Aa[f] / za), Ua[f] = ia[f] * oa[f], a /= 2, b /= 2, g +=
            Ua[f];
        if (g != vb && ("ZoomifyImageFolder" == Z.tileSource || "ZoomifyImageFile" == Z.tileSource || "ZoomifyPFFFile" == Z.tileSource)) {
            na = [];
            Aa = [];
            ia = [];
            oa = [];
            ma = 1;
            a = Z.imageW;
            b = Z.imageH;
            for (g = 2; a > ya || b > za;) a = Math.floor(Z.imageW / g), b = Math.floor(Z.imageH / g), g *= 2, a % 2 && a++, b % 2 && b++, ma++;
            a = Z.imageW;
            b = Z.imageH;
            g = 2;
            tileCounter = 0;
            for (f = ma - 1; 0 <= f; f--) ia[f] = Math.floor(a / ya), a % ya && ia[f]++, oa[f] = Math.floor(b / za), b % za && oa[f]++, Ua[f] = ia[f] * oa[f], tileCounter += Ua[f], na[f] = a, Aa[f] = b, a = Math.floor(Z.imageW / g), b = Math.floor(Z.imageH /
                g), g *= 2, a % 2 && a++, b % 2 && b++;
            a = tileCounter;
            a != vb && Z.Utils.showMessage(Z.Utils.getResource("z254"), !1, Z.messageDurationStandard, "center")
        }
        z(C, A, Xb, Yb);
        k.validateXYZDefaults();
        ma > Zb ? (aa = pa(qa, Z.initialZ), x && Q.scale(aa, aa)) : Q = Za = x = null;
        Ba = pa(L, Z.initialZ);
        Ma = D = pa(v, Z.initialZ);
        if (Z.useCanvas) try { R.scale(D, D) } catch (p) { console.log("In function z751Continue scaling canvas:  " + p) }
        k.z619();
        g = Z.initialX;
        f = Z.initialY;
        a = Z.initialZ;
        b = Z.initialR;
        if ("undefined" === typeof g || null === g) g = Z.imageW / 2;
        if ("undefined" === typeof f ||
            null === f) f = Z.imageH / 2;
        "undefined" === typeof a || null === a ? a = Z.fitZ : 1 < a && a > Z.maxZ && (a /= 100);
        if ("undefined" === typeof b || null === b) b = Z.imageR;
        a = eb(a);
        g = Na(g, f, a, b, "image");
        Z.imageX = wb = g.x;
        Z.imageY = xb = g.y;
        Z.imageZ = a;
        b != Z.imageR && Z.Utils.rotateElement(n, b);
        Z.imageR = b;
        k.updateView(!0);
        Z.Utils.addEventListener(y, "mousedown", ja);
        Z.Utils.addEventListener(y, "mousemove", Z.Utils.preventDefault);
        Z.Utils.addEventListener(y, "touchstart", ja);
        Z.Utils.addEventListener(y, "touchmove", ja);
        Z.Utils.addEventListener(y, "touchend",
            ja);
        Z.Utils.addEventListener(y, "touchcancel", ja);
        Z.Utils.addEventListener(y, "gesturestart", ja);
        Z.Utils.addEventListener(y, "gesturechange", ja);
        Z.Utils.addEventListener(y, "gestureend", ja);
        Z.Utils.addEventListener(B, "contextmenu", Z.Utils.preventDefault);
        Z.Utils.addEventListener(F, "contextmenu", Z.Utils.preventDefault);
        k.setStatus("initializedViewport", !0)
    }

    function q() {
        ma = 1;
        L = v = 0;
        yb = zb = Ab = M = !1;
        "undefined" !== typeof na && Z.Utils.arrayClear(na);
        "undefined" !== typeof Aa && Z.Utils.arrayClear(Aa);
        "undefined" !==
        typeof ia && Z.Utils.arrayClear(ia);
        "undefined" !== typeof oa && Z.Utils.arrayClear(oa);
        "undefined" !== typeof Ua && Z.Utils.arrayClear(Ua)
    }

    function z(a, b, g, f) {
        if ("undefined" === typeof g || null === g) g = 0;
        if ("undefined" === typeof f || null === f) f = 0;
        Z.viewerW = C = a;
        Z.viewerH = A = b;
        G = C * $b;
        I = A * $b;
        a = rc;
        b = 2 * Z.imageW;
        var d = 2 * Z.imageH;
        G > a && (G = a);
        I > a && (I = a);
        G > b && (G = b);
        I > d && (I = d);
        G < C && (G = C);
        I < A && (I = A);
        Ca = Z.Utils.roundToFixed(G / 2, 4);
        Da = Z.Utils.roundToFixed(I / 2, 4);
        O = Z.Utils.roundToFixed(-((G - C) / 2) + g, 4);
        Z.Utils.roundToFixed((G - C) /
            2 + g, 4);
        P = Z.Utils.roundToFixed(-((I - A) / 2) + f, 4);
        Z.Utils.roundToFixed((I - A) / 2 + f, 4);
        x && (x.width = C, x.height = A, Za.width = C + "px", Za.height = A + "px", Za.left = "0px", Za.top = "0px");
        y.width = G;
        y.height = I;
        n.width = G + "px";
        n.height = I + "px";
        n.left = O + "px";
        n.top = P + "px";
        F.width = G;
        F.height = I;
        S.width = G + "px";
        S.height = I + "px";
        if (Z.useCanvas) { x && (Q.translate(C / 2, A / 2), Q.save()); try { R.translate(Ca, Da) } catch (c) { console.log("In function z759 scaling canvas:  " + c) }
            R.save() }
    }

    function u(a, b, g) {
        a = Z.Utils.cacheProofPath(a + "/ImageProperties.xml");
        b.loadXML(a, g)
    }

    function N(a, b) {
        q();
        if ("undefined" === typeof k.getStatus) window.setTimeout(function() { N(a, b) }, 100);
        else {
            var g = null,
                f = null,
                d = null,
                c = null,
                e = null,
                U = null,
                g = parseInt(a.documentElement.getAttribute("WIDTH"), 10),
                f = parseInt(a.documentElement.getAttribute("HEIGHT"), 10),
                e = parseInt(a.documentElement.getAttribute("NUMTILES"), 10);
            parseInt(a.documentElement.getAttribute("NUMIMAGES"), 10);
            U = parseInt(a.documentElement.getAttribute("VERSION"), 10);
            d = c = parseInt(a.documentElement.getAttribute("TILESIZE"),
                10);
            !isNaN(g) && 0 < g && !isNaN(f) && 0 < f && !isNaN(d) && 0 < d && !isNaN(c) && 0 < c && 0 < e ? k.getStatus("initializedViewport") || r(g, f, d, c, e, U, null, null, null, null, null, b) : Z.Utils.showMessage(Z.Utils.getResource("z252"), !1, Z.messageDurationStandard, "center")
        }
    }

    function l(a, b) { for (var g = ia[a] - 1, f = oa[a] - 1, d = 0; d <= g; d++)
            for (var c = 0; c <= f; c++) b[b.length] = a + "-" + d + "-" + c }

    function t(a) {
        if (a) {
            a = k.z542(L);
            Z.Utils.arrayClear(T);
            Z.Utils.arrayClear(Ea);
            b = a.l;
            for (g = a.r; b <= g; b++)
                for (f = a.t, d = a.b; f <= d; f++) c = L + "-" + b + "-" + f, Ea[Ea.length] = c,
                    T[T.length] = c;
            K(T, Va, "simple", "image-backfill")
        } else {
            Z.Utils.arrayClear(Fa);
            Z.Utils.arrayClear(Ga);
            Z.Utils.arrayClear(sa);
            Z.Utils.arrayClear(J);
            a = k.z542();
            for (var b = a.l, g = a.r; b <= g; b++)
                for (var f = a.t, d = a.b; f <= d; f++) { var c = v + "-" + b + "-" + f;
                    Fa[Fa.length] = c;
                    J[J.length] = c }
            if (k.getStatus("initializedViewport") && 0 < V.length && (v == ob || v == pb || v == fb))
                for (b = 0, g = V.length; b < g; b++)(f = V[b]) && f.t == v && f.c >= a.l && f.c <= a.r && f.r >= a.t && f.r <= a.b && (sa[sa.length] = f.name, Ga[Ga.length] = f, d = Z.Utils.arrayIndexOf(J, f.name), -1 != d && (J =
                    Z.Utils.arraySplice(J, d, 1)));
            b = 0;
            for (g = W.length; b < g; b++)(f = W[b]) && f.t == v && f.c >= a.l && f.c <= a.r && f.r >= a.t && f.r <= a.b && (d = Z.Utils.arrayIndexOf(sa, f.name), -1 == d && (sa[sa.length] = f.name, Ga[Ga.length] = f), f = Z.Utils.arrayIndexOf(J, f.name), -1 != f && (J = Z.Utils.arraySplice(J, f, 1)));
            if (0 != qb) { b = 0; for (g = ra.length; b < g; b++) f = ra[b], f.alpha = 1;
                Z.Utils.arrayClear(ra);
                Z.Utils.arrayClear(Oa) }
            k.traceDebugValues("tilesToDisplay", null, Fa.length, Fa);
            k.traceDebugValues("tilesInCache", null, sa.length, sa);
            k.traceDebugValues("tilesToLoad",
                null, J.length, J)
        }
    }

    function m(a, b, g, f, d, c) {
        d || Z.Utils.clearDisplay(a);
        if ("canvasCopy" == f) Z.Utils.clearDisplay(F), R.restore(), R.save(), R.scale(1, 1), R.drawImage(ca, -Ca, -Da), R.restore(), R.save(), R.scale(D, D);
        else {
            d = k.z542(b);
            c = [];
            if (null === g)
                for (var e = 0, U = Ga.length; e < U; e++) c[e] = Ga[e];
            else if (0 < g.length)
                for (e = 0, U = g.length; e < U; e++) { var m = g[e];
                    m && m.t == b && (b == L && !M || m.c >= d.l && m.c <= d.r && m.r >= d.t && m.r <= d.b) && (c[c.length] = g[e]) }
            if (0 < c.length)
                if (k.traceDebugValues("z622-" + a.id, null, null, c), "centerOut" == f)
                    for (e =
                        Math.floor(c.length / 2), U = c.length; e < U; e++) Y(a, b, c[e]), c.length - e - 1 != e && Y(a, b, c[c.length - e - 1]);
                else
                    for (e = 0, U = c.length; e < U; e++) Y(a, b, c[e]);
            else k.traceDebugValues("No cached tiles in view");
            k.traceDebugValues("blankLine")
        }
    }

    function H(a, b) { var g = k.z542();
        syncTransitionCanvas(); for (var f = 0, d = b.length; f < d; f++) { var c = b[f];
            c && c.t == a && (a == L || c.c >= g.l && c.c <= g.r && c.r >= g.t && c.r <= g.b) && Y(ca, a, c) } }

    function K(a, b, g, f) {
        var d = "undefined" !== typeof f && null !== f ? "-" + f : "";
        if (0 < a.length) {
            k.traceDebugValues("z577" + d, null,
                null, a);
            d = (new Date).getTime();
            if ("centerOut" == g && 4 < a.length) { var c = [],
                    e = 0,
                    U = 0,
                    m = 0,
                    h = 0; for (g = 0; g < a.length; g++) { var n = a[g];
                    n && (n = new p(n, f), c[c.length] = n, 0 == g ? (e = U = n.c, m = h = n.r) : (n.c < e ? e = n.c : n.c > U && (U = n.c), n.r < m ? m = n.r : n.r > h && (h = n.r))) }
                a = e + (U - e) / 2;
                f = m + (h - m) / 2; for (g = 0; g < c.length; g++) c[g].r -= f, c[g].c -= a;
                c.sort(function(a, b) { return a.r * a.r + a.c * a.c - (b.r * b.r + b.c * b.c) }); for (g = 0; g < c.length; g++) c[g].r += f, c[g].c += a, rb(c[g], d, b) } else
                for (g = 0, c = a.length; g < c; g++)
                    if (n = a[g]) n = new p(n, f), rb(n, d, b);
            k.traceDebugValues("blankLine")
        } else k.traceDebugValues("z577" +
            d, "No new tiles requested")
    }

    function p(a, b) { this.imagePath = Z.imagePath;
        this.name = a; var g = new X(a);
        this.t = g.t;
        this.c = g.c;
        this.r = g.r;
        this.x = Math.floor(this.c * ya);
        this.y = Math.floor(this.r * za);
        this.image = null;
        this.alpha = 0;
        this.url = k.formatTilePath(this.t, this.c, this.r, b);
        this.style = this.elmt = this.loadTime = null }

    function X(a) { this.t = parseInt(a.substring(0, a.indexOf("-")), 10);
        this.c = parseInt(a.substring(a.indexOf("-") + 1, a.lastIndexOf("-")), 10);
        this.r = parseInt(a.substring(a.lastIndexOf("-") + 1), 10) }

    function rb(a,
        b, g) { var f = a.name,
            c; if (g == gb) c = "image-display";
        else if (g == Va || g == z599ToSave) c = "image-backfill"; var d = a.t == ob && Ab || a.t == pb && zb || a.t == fb && yb; "image-display" == c && d || (a.loadTime = b, k.traceDebugValues("z581-" + c, f), sc.loadImage(a.url, Z.Utils.createCallback(null, g, a), c, a)) }

    function gb(a, b) {
        if (a && b && a.imagePath == Z.imagePath) {
            a.image = b;
            var g = a.name,
                f = Z.Utils.arrayIndexOf(J, g);
            if (-1 != f) {
                J = Z.Utils.arraySplice(J, f, 1);
                tc(a); - 1 == Z.Utils.arrayIndexOf(Oa, g) && (Oa[Oa.length] = g, ra[ra.length] = a);
                sb || (sb = window.setInterval(ta,
                    50));
                qb = J.length;
                if (0 == qb)
                    for (Z.useCanvas && 0 < $a && (Bb ? (H(v, W), m(F, v, W, "canvasCopy", !1, "4. Updating view: all new tiles loaded"), window.setTimeout(function() { Z.Utils.clearDisplay(ca) }, 200), Bb = !1) : m(F, v, W, "centerOut", !1, "4. Updating view: all new tiles loaded")); ua.length > $a && W.length > $a;) ua = Z.Utils.arraySplice(ua, 0, 1), W = Z.Utils.arraySplice(W, 0, 1);
                k.traceDebugValues("z755", a.name, a.loadTime)
            }
            Cb == Db + ab && k.setStatus("displayLoadedViewport", !0)
        } else "undefined" !== typeof b && null !== b || console.log(Z.Utils.getResource("z280") +
            a.name + ".jpg")
    }

    function Va(a, b) {
        if (a && b && a.imagePath == Z.imagePath) { a.image = b; var g = a.name;
            V[V.length] = a;
            g = Z.Utils.arrayIndexOf(T, g); - 1 != g && (T = Z.Utils.arraySplice(T, g, 1));
            a.alpha = 1;
            a.t == L && Y(B, L, a);
            k.traceDebugValues("onTileBackfillPrecache", a.name);
            ac == bc && k.setStatus("precacheLoadedViewport", !0);
            k.traceDebugValues("z599", a.name);
            Eb <= 0 + cc && k.setStatus("backfillLoadedViewport", !0);
            a.t == v && gb(a, b) } else if ("undefined" === typeof b || null === b) Z.mobileDevice ? console.log(Z.Utils.getResource("z280") + a.name +
            ".jpg") : Z.Utils.showMessage(Z.Utils.getResource("z280") + a.name + ".jpg")
    }

    function ta() { for (var a = 0, b = 0, g = ra.length; b < g; b++) { var f = ra[b];
            f.t == v ? (Z.fadeIn && 0 != Fb && 1 > f.alpha + Fb ? f.alpha += Fb : (f.alpha = 1, a++), Y(F, v, f), a >= g && (window.clearInterval(sb), sb = null, b = g)) : (ra = Z.Utils.arraySplice(ra, b, 1), Oa = Z.Utils.arraySplice(Oa, b, 1), f = Z.Utils.arrayIndexOf(J, f.name), -1 != f && (J = Z.Utils.arraySplice(J, f, 1)), g--) } }

    function Y(a, b, g) {
        if ("z647" != g.url.substr(0, 8) && 0 != g.image.width && 0 != g.image.height) {
            var f = g.x,
                c = g.y;
            b = da(b,
                1);
            aa = pa(qa, k.getZoom());
            var d = 8 < aa;
            Z.useCanvas && (a == F || a == ca || a == B && M ? (f -= Z.imageX * b, c -= Z.imageY * b) : a == x && (M || d) && (d = k.calculateCurrentCenterCoordinates(), f -= d.x * b, c -= d.y * b), b = a.getContext("2d"), Z.alphaSupported && 1 > g.alpha && "transitionCanvas" != a.id && -1 == a.id.indexOf("oversizeDisplay") && (b.globalAlpha = g.alpha), b.drawImage(g.image, f, c), Z.alphaSupported && 1 > g.alpha && "transitionCanvas" != a.id && -1 == a.id.indexOf("oversizeDisplay") && (b.globalAlpha = 1));
            a == F ? (k.traceDebugValues("z507", g.name), Cb == Gb && k.setStatus("displayDrawnViewport", !0)) : (k.traceDebugValues("displayBackfillTile", g.name), Eb <= dc && k.setStatus("backfillDrawnViewport", !0))
        }
    }

    function va(a, b) { var g = da(b, 1),
            f = Math.floor(a.l * g / ya),
            c = Math.floor(a.r * g / ya),
            d = Math.floor(a.t * g / za),
            g = Math.floor(a.b * g / za);
        0 > f && (f = 0);
        c > ia[b] - 1 && (c = ia[b] - 1);
        0 > d && (d = 0);
        g > oa[b] - 1 && (g = oa[b] - 1);
        this.l = f;
        this.r = c;
        this.t = d;
        this.b = g }

    function uc(a, b, g, f, c, d, e, k, m) {
        "undefined" === typeof k || null === k ? (this.l = a + g / e, this.r = a + f / e, this.t = b + c / e, this.b = b + d / e) : (e = C / na[k], k = A / Aa[k], this.l = a + g * e, this.r = a + f * e, this.t =
            b + c * k, this.b = b + d * k);
        m && (this.l -= 256 - this.l % 256, this.r += 256 - this.r % 256, this.t -= 256 - this.t % 256, this.b += 256 - this.b % 256)
    }

    function da(a, b) { return na[a] / Z.imageW * b }

    function pa(a, b) { return b / (na[a] / Z.imageW) }

    function Na(a, b, g, f, c) {
        if (Z.z744) {
            g = "undefined" !== typeof g && null !== g ? g : Z.imageZ;
            f = "undefined" !== typeof f && null !== f ? Math.round(f) : Math.round(Z.imageR);
            0 > f && (f += 360);
            var d = a,
                e = b;
            "image" == c && (b = k.convertImageCoordsToViewportEdgeCoords(a, b, g, f), a = b.x, b = b.y);
            var m = Math.round(Z.imageW * g),
                h = Math.round(Z.imageH *
                    g),
                n = C,
                l = A,
                p = Math.round(.5 * C),
                u = Math.round(.5 * A),
                q, H;
            q = p - O + (Z.imageCtrX - Z.imageX) * g + a;
            H = u - P + (Z.imageCtrY - Z.imageY) * g + b;
            var K = q - m / 2;
            q += m / 2;
            var t = H - h / 2;
            H += h / 2;
            a = q - K > n || !Z.z744Strict ? K > p ? a - (K - p) : q < p ? a - (q - p) : a : K > p - m / 2 ? a - (K - (p - m / 2)) : q < p + m / 2 ? a - (q - (p + m / 2)) : a;
            b = H - t > l || !Z.z744Strict ? t > u ? b - (t - u) : H < u ? b - (H - u) : b : t > u - h / 2 ? b - (t - (u - h / 2)) : H < u + h / 2 ? b - (H - (u + h / 2)) : b;
            "image" == c && (b = k.convertViewportEdgeCoordsToImageCoords(a, b, g, f), a = b.x, b = b.y);
            if (a != d || b != e) a = Math.round(a), b = Math.round(b), Z.Utils.validateCallback("panConstrained")
        }
        return new Z.Utils.Point(a,
            b)
    }

    function eb(a) { a > Z.maxZ ? (a = Z.maxZ, Z.Utils.validateCallback("zoomConstrainedMax")) : a < Z.minZ && (a = Z.minZ, Z.Utils.validateCallback("zoomConstrainedMin")); return a }

    function tc(a) { if (0 < $a) { var b = Z.Utils.arrayIndexOf(ua, a.name); - 1 != b && (ua = Z.Utils.arraySplice(ua, b, 1), W = Z.Utils.arraySplice(W, b, 1));
            ua[ua.length] = a.name;
            W[W.length] = a } }

    function ec() {
        window.clearTimeout(bb);
        bb = null;
        hb = ((new Date).getTime() - tilesTimeStart) / 1E3;
        var a = Hb * hb,
            a = ib && ab < a,
            b = ib && ab >= Ib;
        0 < ib ? Jb < vc ? a || b ? (Jb += 1, k.updateView(!0)) : bb = window.setTimeout(ec,
            fc) : console.log(Z.Utils.getResource("z727")) : (Jb = 0, Z.Utils.validateCallback("viewUpdateComplete"), Z.Utils.validateCallback("viewUpdateCompleteGetLabelIDs"))
    }

    function Kb() {
        if (Ha && (0 != ea || 0 != fa || 0 != ka))
            if (Z.tracking && 0 == ka) k.zoomAndPanToView(k.getX() + ea, k.getY() + fa);
            else {
                var a = ea,
                    b = fa,
                    g = ka,
                    f = k.getZoom();
                0 != g && (f = da(v, D * (1 + g)), f = eb(f), f != Z.imageZ && Lb(f));
                if (0 != a || 0 != b) a = parseFloat(n.left) + a, b = parseFloat(n.top) + b, f = Na(a, b, f, Z.imageR, "container"), n.left = Math.round(f.x) + "px", n.top = Math.round(f.y) + "px",
                    b = f.x - O, f = f.y - P, x && M && (Z.mobileDevice || Math.abs(b) > C / 2 || Math.abs(f) > A / 2) && m(x, qa, V, "simple", !1, "Updating backfill oversize display");
                gc++;
                Ha = window.setTimeout(Kb, Mb)
            }
    }

    function hc(a, b, g, f, c, d, e) {
        tb++;
        var h = c / d,
            p = tb * h,
            u = Z.Utils.easing(Z.imageX, a, p, c),
            l = Z.Utils.easing(Z.imageY, b, p, c),
            p = Z.Utils.easing(Z.imageZ, g, p, c),
            l = k.convertImageCoordsToViewportEdgeCoords(u, l, p),
            u = l.x,
            l = l.y;
        syncOversize = !1;
        if (parseFloat(n.left) != u || parseFloat(n.top) != l) n.left = u + "px", n.top = l + "px", x && M && (syncOversize = !0);
        p != Z.imageZ &&
            (Lb(p, !1), x && M && (Q.restore(), Q.save(), Q.scale(aa, aa), syncOversize = !0));
        syncOversize && m(x, qa, V, "simple", !1, "Updating backfill oversize display");
        tb < d + 1 ? Pa = window.setTimeout(function() { hc(a, b, g, f, c, d, e) }, h) : (Z.interactive = !0, Pa && (window.clearTimeout(Pa), Pa = null), k.updateView(), "function" === typeof e && e())
    }

    function ic() { gc = ka = fa = ea = 0;
        Ha && (window.clearTimeout(Ha), Ha = null) }

    function Lb(a, b) {
        var g = !1,
            f = pa(v, a);
        if (f != D) {
            D = f;
            var g = f / Ma,
                c = G * g,
                d = I * g,
                e = (G - c) / 2,
                h = (I - d) / 2;
            f < Ma && (f = Na(parseFloat(n.left), parseFloat(n.top),
                a, Z.imageR, "container"), n.left = f.x + "px", n.top = f.y + "px");
            if (Z.useCanvas)
                if (S.width = c + "px", S.height = d + "px", S.left = e + "px", S.top = h + "px", aa = pa(qa, k.getZoom()), f = 8 < aa, M || f) {
                    if (null !== Q && "undefined" === typeof b || null === b || b && x && ("in" != Z.zooming || c > Z.scaleThreshold || d > Z.scaleThreshold)) Q.restore(), Q.save(), Q.scale(aa, aa), Q.rotate(Z.imageR * Math.PI / 180), m(x, qa, V, "simple", !1, "Updating backfill oversize display");
                    Ba = g = pa(L, a);
                    c = g / tierBackfillScalePrior;
                    g = wa * c;
                    c *= xa;
                    d = ga + (wa - g) / 2;
                    f = ha + (xa - c) / 2;
                    w.width = g + "px";
                    w.height =
                        c + "px";
                    w.left = d + "px";
                    w.top = f + "px"
                } else x && Z.Utils.clearDisplay(x), c = wa * g, d = xa * g, e = ga + Z.imageX * (1 - g) * Z.imageZ, h = ha + Z.imageY * (1 - g) * Z.imageZ, w.width = c + "px", w.height = d + "px", w.left = e + "px", w.top = h + "px";
            else m(F, v, W, "centerOut", !1, "Scaling: non-canvas zoom"), M ? (g = jc, wa = G * g, xa = I * g, ga = -(G / g), ha = -(I / g), Nb = Ca * g, Ob = Da * g, B.width = wa, B.height = xa, w.width = B.width + "px", w.height = B.height + "px") : (g = Aa[L], B.width = na[L], B.height = g, g = Z.imageY * a, ga = Ca - Z.imageX * a, ha = Da - g), w.left = ga + "px", w.top = ha + "px", m(B, L, V, "simple", !1, "Scaling: non-canvas zoom - backfill");
            g = !0
        }
        return g
    }

    function ja(a) {
        a = Z.Utils.event(a);
        var b = a.type;
        if (a && b) {
            var g = Z.Utils.isRightMouseButton(a),
                f = a.altKey;
            if (!("mouseover" != b && "mouseout" != b && !Z.interactive || "mousedown" == b && (!Z.interactive || Z.coordinatesVisible && f) || g)) {
                ("mousedown" == b || "touchstart" == b || Z.tourPlaying && Z.tourStop) && k.zoomAndPanAllStop();
                Z.touchSupport && "touchmove" != b && "gesturechange" != b && a.preventDefault();
                if ("mousedown" == b) window.setTimeout(function() { k.zoomAndPanAllStop(!1, !0) }, 1);
                else if ("touchstart" == b || "gesturestart" ==
                    b) touch = Z.Utils.getFirstTouch(a), k.zoomAndPanAllStop(!1, !0);
                switch (b) {
                    case "mouseover":
                        Z.Viewer.initializeViewerKeyDefaultListeners(!0); break;
                    case "mousedown":
                        Z.Viewer.initializeViewerKeyEventListeners(!0);
                        Z.Utils.addEventListener(document, "mousemove", ja);
                        Z.Utils.addEventListener(document, "mouseup", ja); break;
                    case "mouseup":
                        Z.Utils.removeEventListener(document, "mousemove", ja), Z.Utils.removeEventListener(document, "mouseup", ja) }
                wc(a);
                if ("mousedown" == b || "mousemove" == b) return !1
            }
        }
    }

    function wc(a) {
        a = Z.Utils.event(a);
        var b = a.type;
        if (a && b) {
            var g, f;
            if ("touchstart" == b || "touchmove" == b || "touchend" == b || "touchcancel" == b) g = Z.Utils.getFirstTouch(a), "undefined" !== typeof g && (f = new Z.Utils.Point(g.pageX, g.pageY));
            else { Z.Utils.target(a);
                Z.Utils.relatedTarget(a);
                Z.Utils.isRightMouseButton(a); var c = a.altKey; "resize" != b && (f = Z.Utils.getMousePosition(a));
                Z.smoothPan && (Wa = f) }
            "DOMMouseScroll" == b && (b = "mousewheel");
            var d = k.getZoom(),
                e;
            "undefined" !== typeof f && null !== f && (e = k.getClickCoordsInImage(a, d, f));
            switch (b) {
                case "mousedown":
                    Z.mouseIsDown = !0;
                    ba = new Z.Utils.Point(f.x, f.y);
                    jb = (new Date).getTime();
                    y.mouseXPrior = f.x;
                    y.mouseYPrior = f.y;
                    Z.smoothPan && !c && Z.mousePan && 1 < Z.smoothPanEasing && (Pb(void 0), Qb = ba, null === kb && (kb = new Z.Utils.Point(parseFloat(n.left), parseFloat(n.top))), null === Qa && (Qa = window.setInterval(xc, 50)));
                    break;
                case "mousemove":
                    Ra = new Z.Utils.Point(f.x, f.y);
                    E && (clearTimeout(E), E = null, z604(a, e, isDblClick));
                    !c && Z.mousePan && (Qa ? Wa = f : Z.animation && k.getZoom() == Z.minZ ? (f.x > y.mouseXPrior ? Z.Viewer.viewportNext() : f.x < y.mouseXPrior && Z.Viewer.viewportPrior(),
                        y.mouseXPrior = f.x, y.mouseYPrior = f.y) : (a = f.x - y.mouseXPrior, c = f.y - y.mouseYPrior, isNaN(a) || isNaN(c) || (a = parseFloat(n.left) + a, c = parseFloat(n.top) + c, c = Na(a, c, Z.imageZ, Z.imageR, "container"), n.left = c.x + "px", n.top = c.y + "px", y.mouseXPrior = f.x, y.mouseYPrior = f.y, a = c.x - O, c = c.y - P, x && M && (Z.mobileDevice || Math.abs(a) > C / 2 || Math.abs(c) > A / 2) && m(x, qa, V, "simple", !1, "Updating backfill oversize display"))));
                    break;
                case "mouseup":
                    Z.mouseIsDown = !1;
                    document.mousemove = null;
                    document.mouseup = null;
                    b = (new Date).getTime();
                    Z.mouseOutDownPoint ?
                        (f = Z.mouseOutDownPoint, e = k.getClickCoordsInImage(a, d, Z.mouseOutDownPoint)) : f = new Z.Utils.Point(f.x, f.y);
                    f = Z.Utils.calculatePointsDistance(ba.x, ba.y, f.x, f.y);
                    d = b - jb;
                    if (f < yc && d < zc) {
                        if (Z.clickZoom || Z.clickPan) { f = E && Z.doubleClickZoom ? !0 : !1; var h = k.getClickZoomCoords3D(a, ba, v, D, f) }
                        Z.clickZoom ? Z.doubleClickZoom ? E ? (clearTimeout(E), E = null, k.zoomAndPanToView(h.x, h.y, h.z)) : E = setTimeout(function(a) { E = null;
                            k.zoomAndPanToView(h.x, h.y, h.z) }, Z.doubleClickDelay) : window.setTimeout(function() {
                            k.zoomAndPanToView(h.x,
                                h.y, h.z)
                        }, 1) : Z.clickPan && k.zoomAndPanToView(h.x, h.y, Z.imageZ)
                    }
                    Z.mouseOutDownPoint && Z.Toolbar.show(!1);
                    break;
                case "touchstart":
                    g && !Ia && (Z.mouseIsDown = !0, lb = !1, ba = new Z.Utils.Point(f.x, f.y), jb = (new Date).getTime(), y.mouseXPrior = f.x, y.mouseYPrior = f.y);
                    break;
                case "touchmove":
                    !g || Ia || lb || (Ra = new Z.Utils.Point(f.x, f.y), E && (clearTimeout(E), E = null, z604(a, e, isDblClick)), !c && Z.mousePan && (Qa ? Wa = f : (a = f.x - y.mouseXPrior, c = f.y - y.mouseYPrior, isNaN(a) || isNaN(c) || (a = parseFloat(n.left) + a, c = parseFloat(n.top) + c, c = Na(a,
                        c, Z.imageZ, Z.imageR, "container"), n.left = c.x + "px", n.top = c.y + "px", y.mouseXPrior = f.x, y.mouseYPrior = f.y, a = c.x - O, c = c.y - P, x && M && (Z.mobileDevice || Math.abs(a) > C / 2 || Math.abs(c) > A / 2) && m(x, qa, V, "simple", !1, "Updating backfill oversize display")))));
                    break;
                case "touchend":
                    if (!Ia && !lb) {
                        Z.mouseIsDown = !1;
                        document.mousemove = null;
                        document.mouseup = null;
                        b = (new Date).getTime();
                        Z.mouseOutDownPoint ? (f = Z.mouseOutDownPoint, e = k.getClickCoordsInImage(a, d, Z.mouseOutDownPoint)) : f = "undefined" !== typeof f && null !== f ? new Z.Utils.Point(f.x,
                            f.y) : "undefined" !== typeof Ra && null !== Ra ? Ra : ba;
                        f = Z.Utils.calculatePointsDistance(ba.x, ba.y, f.x, f.y);
                        d = b - jb;
                        if (f < kc && d < lc || !c && ("rectangle" == Z.labelMode || "freehand" == Z.labelMode)) Z.clickZoom ? (f = E && Z.doubleClickZoom ? !0 : !1, h = k.getClickZoomCoords3D(a, ba, v, D, f), Z.doubleClickZoom ? E ? (clearTimeout(E), E = null, k.zoomAndPanToView(h.x, h.y, h.z)) : E = setTimeout(function(a) { E = null;
                            k.zoomAndPanToView(h.x, h.y, h.z) }, Z.doubleClickDelay) : window.setTimeout(function() { k.zoomAndPanToView(h.x, h.y, h.z) }, 1)) : Z.clickPan && k.zoomAndPanToView(h.x,
                            h.y, Z.imageZ);
                        Z.mouseOutDownPoint && Z.Toolbar.show(!1)
                    }
                    break;
                case "touchcancel":
                    if (!Ia && !lb) {
                        Z.mouseIsDown = !1;
                        document.mousemove = null;
                        document.mouseup = null;
                        b = (new Date).getTime();
                        Z.mouseOutDownPoint ? (f = Z.mouseOutDownPoint, e = k.getClickCoordsInImage(a, d, Z.mouseOutDownPoint)) : f = "undefined" !== typeof f && null !== f ? new Z.Utils.Point(f.x, f.y) : "undefined" !== typeof Ra && null !== Ra ? Ra : ba;
                        f = Z.Utils.calculatePointsDistance(ba.x, ba.y, f.x, f.y);
                        d = b - jb;
                        if (f < kc && d < lc || !c && ("rectangle" == Z.labelMode || "freehand" == Z.labelMode)) Z.clickZoom ?
                            (f = E && Z.doubleClickZoom ? !0 : !1, h = k.getClickZoomCoords3D(a, ba, v, D, f), Z.doubleClickZoom ? E ? (clearTimeout(E), E = null, k.zoomAndPanToView(h.x, h.y, h.z)) : E = setTimeout(function(a) { E = null;
                                k.zoomAndPanToView(h.x, h.y, h.z) }, Z.doubleClickDelay) : window.setTimeout(function() { k.zoomAndPanToView(h.x, h.y, h.z) }, 1)) : Z.clickPan && k.zoomAndPanToView(h.x, h.y, Z.imageZ);
                        Z.mouseOutDownPoint && Z.Toolbar.show(!1)
                    }
                    break;
                case "gesturestart":
                    Ac(a);
                    Ia || (Ia = window.setInterval(Bc, Cc));
                    break;
                case "gesturechange":
                    Rb = Math.round(100 * a.scale) /
                        100;
                    break;
                case "gestureend":
                    Ia && (window.clearInterval(Ia), lb = !0, Ia = null), Z.mousePan && k.updateView()
            }
        }
    }

    function Pb(a) { null !== Qa && a && (window.clearInterval(Qa), Qa = null);
        kb = Sb = Tb = la = null;
        Ja = Ka = Sa = Ta = 0 }

    function xc() {
        var a = parseFloat(n.left),
            b = parseFloat(n.top);
        if (Z.mouseIsDown || la) {
            var g = (la ? Sb : Wa.x) - Qb.x,
                c = (la ? Tb : Wa.y) - Qb.y,
                d = a - kb.x,
                e = b - kb.y;
            if (!(isNaN(g) || isNaN(c) || isNaN(d) || isNaN(e) || 0 == g && 0 == c && 0 == d && 0 == e)) {
                var h = la ? Z.smoothPanGlide : 1,
                    p = la ? 1 : 100;
                Ja = Math.round((g - d) / (Z.smoothPanEasing * h) * p / p);
                Ka = Math.round((c -
                    e) / (Z.smoothPanEasing * h) * p / p);
                Z.mouseIsDown ? (Sa = Ja, Ta = Ka) : (Math.abs(Ja) > Math.abs(Sa) && (Ja = Sa), Math.abs(Ka) > Math.abs(Ta) && (Ka = Ta));
                a += Ja;
                b += Ka;
                g = Na(a, b, Z.imageZ, Z.imageR, "container");
                n.left = g.x + "px";
                n.top = g.y + "px";
                Ja -= a - g.x;
                Ka -= b - g.y;
                x && M && m(x, qa, V, "simple", !1, "Updating backfill oversize display");
                la && 0 == Math.round(Ja * p) / p && 0 == Math.round(Ka * p) / p && (la = !1)
            }
        } else if (Z.mouseIsDown || null !== la || 0 == Ja || 0 == Ka) Pb(!0), k.updateView();
        else if (g = Na(a + Sa, b + Ta, Z.imageZ, Z.imageR, "container"), Sa = g.x - a, Ta = g.y - b, 0 !=
            Sa || 0 != Ta) Sb = Wa.x + Sa, Tb = Wa.y + Ta, la = !0
    }

    function Ac(a) { a = Z.Utils.event(a);
        a.preventDefault();
        Rb = Math.round(100 * a.scale) / 100 }

    function Bc(a) { if (Z.mousePan) { a = da(v, Ma * Rb); var b = eb(a);
            a != Z.imageZ && k.z633(b) } }
    var wb = null,
        xb = null,
        mc = 0;
    "undefined" !== typeof a && null !== a && (mc = a);
    var nc = Z.imagePath,
        k = this,
        Xa = [],
        vb = 0,
        ya = parseInt(Z.Utils.getResource("z221"), 10),
        za = parseInt(Z.Utils.getResource("z219"), 10),
        Dc = parseFloat(Z.Utils.getResource("z218")),
        $a = parseInt(Z.Utils.getResource("z220"), 10),
        yc = parseInt(Z.Utils.getResource("z716"),
            10),
        zc = parseInt(Z.Utils.getResource("z715"), 10),
        kc = parseInt(Z.Utils.getResource("z723"), 10),
        lc = parseInt(Z.Utils.getResource("z722"), 10),
        Ub, x, Za, Q, cb, y, n, Vb, B, w, La, mb, F, S, R, Wb, ca, db, Ya;
    (function(a) {
        if ("undefined" === typeof a || null === a) a = 0;
        a = a.toString();
        Z.useCanvas && !x && (Ub = Z.Utils.createContainerElement("canvas", "oversizeDisplay" + a, "inline-block", "absolute", "visible", "1px", "1px", "0px", "0px", "none", "0px", "transparent none", "0px", "0px", "normal"), Z.ViewerDisplay.appendChild(Ub), x = Ub, Za = x.style);
        y || (cb =
            Z.Utils.createContainerElement("div", "viewportContainer" + a, "inline-block", "absolute", "visible", "1px", "1px", "0px", "0px", "none", "0px", "transparent none", "0px", "0px", "normal"), Z.ViewerDisplay.appendChild(cb), y = cb, n = y.style);
        B || (Vb = Z.Utils.createContainerElement(Z.useCanvas ? "canvas" : "div", "viewportBackfillDisplay" + a, "inline-block", "absolute", "visible", "1px", "1px", "0px", "0px", "none", "0px", "transparent none", "0px", "0px", "normal"), cb.appendChild(Vb), B = Vb, w = B.style);
        F || (mb = Z.Utils.createContainerElement(Z.useCanvas ?
            "canvas" : "div", "viewportDisplay" + a, "inline-block", "absolute", "visible", "1px", "1px", "0px", "0px", "none", "0px", "transparent none", "0px", "0px", "normal"), cb.appendChild(mb), F = mb, S = F.style);
        Z.useCanvas && !ca && (Wb = Z.Utils.createContainerElement("canvas", "transitionCanvas", "none", "absolute", "visible", "1px", "1px", "0px", "0px", "none", "0px", "transparent none", "0px", "0px", "normal"), cb.appendChild(Wb), ca = Wb, db = ca.style)
    })(mc);
    var ma = 1,
        v = 0,
        L = 0,
        M = !1,
        qa = 0,
        Bb = !1,
        D, Ma, Ba, aa, na = [],
        Aa = [],
        ia = [],
        oa = [],
        Ua = [],
        Ea = [],
        V = [],
        T = [],
        ra = [],
        Oa = [],
        qb = 0,
        ac = 0,
        bc = 0,
        Eb = 0,
        cc = 0,
        dc = 0,
        Cb = 0,
        Db = 0,
        Ib = 0,
        ab = 0,
        Gb = 0,
        ib = 0,
        hb = 0,
        Hb = 0,
        Fa = [],
        J = [],
        W = [],
        ua = [],
        Ga = [],
        sa = [],
        bb = null,
        Jb = 0,
        vc = parseInt(Z.Utils.getResource("z725"), 10),
        fc = parseInt(Z.Utils.getResource("z724"), 10),
        sc = new Z.NetConnector,
        Zb = parseInt(Z.Utils.getResource("z81"), 10),
        Ec = parseInt(Z.Utils.getResource("z78"), 10),
        oc = parseInt(Z.Utils.getResource("z80"), 10),
        fb = parseInt(Z.Utils.getResource("z77"), 10),
        qa = fb,
        pc = parseInt(Z.Utils.getResource("z79"), 10),
        pb = parseInt(Z.Utils.getResource("z76"),
            10),
        ob = parseInt(Z.Utils.getResource("z75"), 10),
        Ab = null,
        zb = null,
        yb = null,
        $b = parseFloat(Z.Utils.getResource("z173"), 10),
        jc = parseFloat(Z.Utils.getResource("z74"), 10),
        rc = parseFloat(Z.Utils.getResource("DEFAULT_z310SIZEMAXBROWSER"), 10),
        C, A, Xb, Yb, G, I, Ca, Da, O, P, wa, xa, Nb, Ob, ga, ha;
    C = Z.viewerW;
    A = Z.viewerH;
    Xb = Yb = 0;
    A -= 0;
    var E = null,
        ba, Ra, jb, Ia = null,
        Rb = null,
        lb = !1,
        Cc = parseInt(Z.Utils.getResource("z122"), 10),
        ub = Math.round(parseFloat(Z.Utils.getResource("z176")) * Z.panSpeed),
        ea = 0,
        fa = 0,
        Qa = null,
        Qb = null,
        kb = null,
        Wa = null,
        Ja = 0,
        Ka = 0,
        Sa = 0,
        Ta = 0,
        la = null,
        Sb = null,
        Tb = null,
        nb = parseFloat(Z.Utils.getResource("z242")) * Z.zoomSpeed;
    Z.mobileDevice && (nb /= 2);
    var ka = 0,
        Ha = null,
        gc = 0,
        Mb = parseInt(Z.Utils.getResource("z238"), 10),
        Fb = parseFloat(Z.Utils.getResource("z112")) * Z.fadeInSpeed,
        sb = null,
        Fc = parseFloat(Z.Utils.getResource("z239")),
        qc = parseFloat(Z.Utils.getResource("z240"));
    Z.mobileDevice && (qc /= 2);
    var Pa = null,
        tb = 0;
    if (null !== Z.imagePath && "null" != Z.imagePath)
        if (1 == Z.localUse && (Z.browser == Z.browsers.CHROME || Z.browser == Z.browsers.OPERA ||
                Z.browser == Z.browsers.IE && 11 == Z.browserVersion || Z.browser == Z.browsers.SAFARI && 7 <= Z.browserVersion)) Z.Utils.showMessage(Z.Utils.getResource("z288"), !1, Z.messageDurationStandard, "center");
        else if (-1 != Z.imagePath.indexOf("zComparisonPath") && -1 != Z.imagePath.indexOf("zSlidePath") && -1 != Z.imagePath.indexOf("zOverlayPath") && -1 != Z.imagePath.indexOf("zAnimationPath") && -1 != Z.imagePath.indexOf("zSlidestackPath")) Z.Utils.showMessage(Z.Utils.getResource("DEFAULT_MULTIIMAGESUPPORTDISABLEDALERT"), !1, Z.messageDurationStandard,
        "center");
    else { var Gc = new Z.NetConnector;
        u(nc, Gc, null) }
    this.clearAll = function(a, b, c, d) {
        a && (qb = 0, "undefined" !== typeof V && Z.Utils.arrayClear(V), "undefined" !== typeof T && Z.Utils.arrayClear(T), "undefined" !== typeof Ea && Z.Utils.arrayClear(Ea), "undefined" !== typeof Fa && Z.Utils.arrayClear(Fa), "undefined" !== typeof J && Z.Utils.arrayClear(J), "undefined" !== typeof W && Z.Utils.arrayClear(W), "undefined" !== typeof ua && Z.Utils.arrayClear(ua), "undefined" !== typeof Ga && Z.Utils.arrayClear(Ga), "undefined" !== typeof sa && Z.Utils.arrayClear(sa),
            "undefined" !== typeof ra && Z.Utils.arrayClear(ra), "undefined" !== typeof Oa && Z.Utils.arrayClear(Oa));
        b && q();
        d && (x && Z.Utils.clearDisplay(x), B && Z.Utils.clearDisplay(B), F && Z.Utils.clearDisplay(F), ca && Z.Utils.clearDisplay(ca))
    };
    this.z759 = function(a, b, c, d) { z(a, b, c, d) };
    this.z752 = function(a, b, c) { u(a, b, c) };
    this.z602 = function(a, b) { N(a, b) };
    this.validateXYZDefaults = function() {
        var a = parseFloat(Z.Utils.getResource("z143")),
            b = parseFloat(Z.Utils.getResource("z144")),
            c = parseFloat(Z.Utils.getResource("z145")),
            d = parseFloat(Z.Utils.getResource("DEFAULT_INITIALR")),
            e = parseFloat(Z.Utils.getResource("z163")),
            h = parseFloat(Z.Utils.getResource("z153")),
            a = isNaN(a) ? null : a,
            b = isNaN(b) ? null : b,
            c = isNaN(c) ? null : c,
            d = isNaN(d) ? null : d,
            e = isNaN(e) ? null : e,
            h = isNaN(h) ? null : h;
        Z.initialX = a;
        Z.initialY = b;
        Z.initialZ = c;
        Z.initialR = d;
        Z.minZ = e;
        Z.maxZ = h;
        null === Z.initialX && (Z.initialX = Z.imageW / 2);
        null === Z.initialY && (Z.initialY = Z.imageH / 2);
        Z.fitZ = k.z468(null, null, 0);
        Z.fillZ = k.calculateZoomToFill(null, null, 0);
        h = k.z468(null, null, 0);
        a = k.calculateZoomToFill(null, null, 0);
        1 < Z.fitZ && null !== Z.maxZ &&
            Z.fitZ > Z.maxZ && (Z.fitZ = Z.maxZ);
        1 < Z.fillZ && null !== Z.maxZ && Z.fillZ > Z.maxZ && (Z.fillZ = Z.maxZ);
        null === Z.minZ || -1 == Z.minZ ? Z.minZ = Z.fitZ : 0 == Z.minZ && (Z.minZ = Z.fillZ);
        if (null === Z.maxZ || -1 == Z.maxZ) Z.maxZ = 1;
        null === Z.initialZ || -1 == Z.initialZ ? Z.initialZ = h : 0 == Z.initialZ && (Z.initialZ = a);
        Z.initialZ < Z.minZ && (Z.initialZ = Z.minZ);
        Z.initialZ > Z.maxZ && (Z.initialZ = Z.maxZ)
    };
    this.getTierScale = function() { return D };
    this.getX = function(a) { var b = parseFloat(n.left) - O;
        a = k.getZoom(a); return wb - b / a };
    this.getY = function(a) {
        var b = parseFloat(n.top) -
            P;
        a = k.getZoom(a);
        return xb - b / a
    };
    this.getZoom = function(a) { var b = D;
        a && (b = D * parseFloat(S.width) / G); return da(v, b) };
    this.z619 = function(b) { b || (l(ob, T), Ab = !0);
        (!Z.imageSet || a == Z.imageSetStart || b) && ma > pc && (l(pb, T), zb = !0, ma > oc && (l(fb, T), yb = !0), k.setStatus("backfillPrecachedViewport", !0));
        T.sort();
        T = Z.Utils.arrayUnique(T);
        Ea = T.slice(0);
        k.traceDebugValues("tilesBackfillToPrecache", null, Ea.length);
        K(T, Va, "simple", "image-backfill") };
    this.updateView = function(b, c) {
        if ("undefined" === typeof a || null === a) a = 0;
        var g =
            Z.mouseIsDown || Z.buttonIsDown || Z.keyIsDown || Z.mouseWheelIsDown,
            d = D != Ma || k.getZoom() != Z.imageZ || Z.imageZ != Z.priorZ,
            e = parseFloat(n.left) != O || parseFloat(n.top) != P || k.getX() != Z.imageX || k.getY() != Z.imageY;
        if (d || e || "undefined" !== typeof b && b && !g) {
            if (!Z.Viewer.getStatus("readyViewer") || a == Z.viewportCurrentID) {
                var h = !1;
                if (b || parseFloat(S.width) != F.width) {
                    if (Z.useCanvas) {
                        S.width = F.width + "px";
                        S.height = F.height + "px";
                        S.left = "0px";
                        S.top = "0px";
                        R.restore();
                        R.save();
                        try { R.scale(D, D) } catch (p) {
                            console.log("In function z630 scaling canvas:  " +
                                p)
                        }
                        B && (M ? (w.width = B.width + "px", w.height = B.height + "px", w.left = ga + "px", w.top = ha + "px", La.restore(), La.save(), La.scale(Ba, Ba)) : (w.width = wa + "px", w.height = xa + "px", w.left = ga + "px", w.top = ha + "px"))
                    }
                    h = !0
                }
                if (b || parseFloat(n.left) != O || parseFloat(n.top) != P) {
                    h = parseFloat(n.left) - O;
                    g = parseFloat(n.top) - P;
                    0 != Z.imageR && (g = Z.Utils.rotatePoint(h, g, Z.imageR), h = g.x, g = g.y);
                    n.left = O + "px";
                    n.top = P + "px";
                    M || (ga = parseFloat(w.left) + h, ha = parseFloat(w.top) + g, w.left = ga + "px", w.top = ha + "px");
                    var l = k.getZoom();
                    Z.imageX = wb = Z.imageX - h /
                        l;
                    Z.imageY = xb = Z.imageY - g / l;
                    h = !0
                }
                h && (m(F, v, W, "centerOut", !1, "1a. Updating view: resetting display positions"), M && m(B, L, V, "simple", !1, "1b. Updating view: resetting backfill positions"));
                h = !1;
                if ("undefined" !== typeof b && b || D != Ma || k.getZoom() != Z.imageZ || !k.getStatus("initializedViewport") || c) {
                    D != Ma && (Z.imageZ = k.getZoom());
                    Z.imageZ < Z.minZ && (Z.imageZ = Z.minZ);
                    Z.imageZ > Z.maxZ && (Z.imageZ = Z.maxZ);
                    l = Dc;
                    for (g = ma; 0 < g && l / 2 >= Z.imageZ;) g--, l /= 2;
                    g = 0 > g - 1 ? 0 : g - 1;
                    l = pa(g, Z.imageZ);
                    if (g != v || l != D) Z.useCanvas && (R.restore(),
                        R.save(), R.scale(l, l)), v != g && (Bb = !0), v = g, D = l;
                    Ma = D;
                    M = !1;
                    v > Zb ? (L = v - Ec, M = !0) : L = v > oc ? fb : v > pc ? pb : ob;
                    tierBackfillScalePrior = Ba = pa(L, Z.imageZ);
                    var g = na[L],
                        l = Aa[L],
                        u = Z.imageX * Z.imageZ,
                        q = Z.imageY * Z.imageZ;
                    M ? (g = jc, wa = G * g, xa = I * g, ga = -(G / g), ha = -(I / g), Nb = Ca * g, Ob = Da * g, B.width = wa, B.height = xa, w.width = B.width + "px", w.height = B.height + "px", w.left = ga + "px", w.top = ha + "px", Z.useCanvas && (x && (aa = pa(qa, Z.imageZ), Q.restore(), Q.save(), Q.scale(aa, aa), 0 != Z.imageR && Q.rotate(Z.imageR * Math.PI / 180)), La.restore(), La.translate(Nb, Ob),
                        La.save(), La.scale(Ba, Ba))) : (wa = g * Ba, xa = l * Ba, ga = Ca - u, ha = Da - q, B.width = g, B.height = l, Z.useCanvas && (w.width = wa + "px", w.height = xa + "px"), w.left = ga + "px", w.top = ha + "px");
                    m(B, L, V, "simple", !1, "2. Updating view: changing tier - backfill");
                    !b && 0 < $a && (h = !0)
                } else k.traceDebugValues("updateView-noChange");
                M ? t(!0) : x && Z.Utils.clearDisplay(x)
            }
            a == Z.viewportCurrentID && (t(), m(F, v, null, "centerOut", h, "3. Updating view: prior to loading of any new tiles"), 0 < J.length && K(J, gb, "centerOut", "image-display"));
            e && Z.Utils.validateCallback("viewPanned");
            d && Z.Utils.validateCallback("viewZoomed");
            (e || d) && Z.Utils.validateCallback("viewChanged")
        }
    };
    syncTransitionCanvas = function() { ca && db && Ya && (ca.width = F.width, ca.height = F.height, db.width = S.width, db.height = S.height, db.left = S.left, db.top = S.top, Ya.restore(), Ya.save(), Ya.translate(Ca, Da), Ya.scale(D, D)) };
    this.formatTilePath = function(a, b, c, d) {
        d = c * ia[a] + b;
        for (var e = 0; e < a; e++) d += Ua[e];
        a = nc + "/TileGroup" + Math.floor(d / 256) + "/" + a + "-" + b + "-" + c + "." + Z.tileType;
        if (Z.browser == Z.browsers.IE && 9 > Z.browserVersion || 0 == $a) a =
            Z.Utils.cacheProofPath(a);
        return a
    };
    this.getClickCoordsAtZoom = function(a, b) { var c = this.getClickCoordsInImage(a, b); return new Z.Utils.Point(c.x * b, c.y * b) };
    this.getClickCoordsInImage = function(a, b, c) {
        a = Z.Utils.event(a);
        var d = null;
        if (a) {
            var e = a.type;
            if ("undefined" === typeof b || null == b) b = k.getZoom();
            if ("undefined" === typeof c || null === c) "touchstart" == e || "touchend" == e || "touchcancel" == e ? (touch = Z.Utils.getFirstTouch(a), "undefined" !== typeof touch && (target = touch.target, c = new Z.Utils.Point(touch.pageX, touch.pageY))) :
                (target = Z.Utils.target(a), relatedTarget = Z.Utils.relatedTarget(a), c = Z.Utils.getMousePosition(a));
            "undefined" !== typeof c && null !== c && (a = k.z479(c.x, c.y), d = k.z485(a.x, a.y, b))
        }
        return d
    };
    this.getClickZoomCoords3D = function(a, b, c, d, e) {
        var h = parseFloat(Z.Utils.getResource("z93TIERSKIPTHRESHOLD"));
        b = k.z479(b.x, b.y);
        b = k.z485(b.x, b.y, Z.imageZ);
        var m = da(c, d);
        a = a.altKey;
        e ? a ? m = Z.fitZ : (e = pa(c, Z.fitZ), d - e < h ? m = Z.fitZ : d > 1 + h ? m = da(c, 1) : 0 < c && (m = da(c - 1, 1))) : a ? m = Z.maxZ : d < 1 - h ? m = da(c, 1) : c < ma - 1 ? m = da(c + 1, 1) : 1 < Z.maxZ && (m = Z.maxZ);
        return new Z.Utils.Point3D(b.x, b.y, m)
    };
    this.calculateCurrentCenterCoordinates = function(a, b, c) { if ("undefined" === typeof a || null === a) a = new Z.Utils.Point(parseFloat(n.left), parseFloat(n.top)); if ("undefined" === typeof b || null === b) b = k.getZoom(); return new Z.Utils.Point(Math.round(Z.imageX - (a.x - O) / b), Math.round(Z.imageY - (a.y - P) / b)) };
    this.z542 = function(a, b, c, d) { if ("undefined" === typeof a || null === a) a = v; if ("undefined" === typeof b || null === b) b = !1; return new va(k.z541(b, c ? a : null, d), a) };
    this.z541 = function(a, b, c) {
        var d =
            parseFloat(n.left) - O,
            e = parseFloat(n.top) - P;
        if (Z.useCanvas) var h = parseFloat(n.width) / y.width,
            d = d / h,
            e = e / h;
        h = k.getZoom();
        0 != d && (d /= h);
        0 != e && (e /= h);
        var d = Z.imageX - d,
            e = Z.imageY - e,
            m, p, l;
        a ? (a = -(C / 2), p = C / 2, m = -(A / 2), l = A / 2) : (a = -(G / 2), p = G / 2, m = -(I / 2), l = I / 2);
        return new uc(d, e, a, p, m, l, h, b, c)
    };
    this.z480 = function(a, b) { var c = k.z479(a, b); return new Z.Utils.Point(c.x - O, c.y - P) };
    this.z479 = function(a, b) { var c = Z.Utils.getElementPosition(mb); return new Z.Utils.Point(a - c.x + O, b - c.y + P) };
    this.convertViewportCoordsToPageCoords =
        function(a, b) { var c = Z.Utils.getElementPosition(mb); return new Z.Utils.Point(a + c.x - O, b + c.y - P) };
    this.z485 = function(a, b, c, d) { if ("undefined" === typeof c || null === c) c = Z.imageZ; if ("undefined" === typeof d || null === d) d = Z.imageR;
        0 > d && (d += 360); var e = parseFloat(n.left) + Ca,
            h = parseFloat(n.top) + Da;
        a -= e;
        b -= h;
        0 != Z.imageR && (viewportClickPt = Z.Utils.rotatePoint(a, b, d), a = viewportClickPt.x, b = viewportClickPt.y); return new Z.Utils.Point(a / c + Z.imageX, b / c + Z.imageY) };
    this.convertImageCoordsToViewportEdgeCoords = function(a, b, c,
        d) { if ("undefined" === typeof c || null === c) c = Z.imageZ; if ("undefined" === typeof d || null === d) d = Z.imageR;
        0 > d && (d += 360);
        a = (Z.imageX - a) * c;
        b = (Z.imageY - b) * c;
        0 != Z.imageR && (viewportClickPt = Z.Utils.rotatePoint(a, b, -d), a = viewportClickPt.x, b = viewportClickPt.y); return new Z.Utils.Point(O + a, P + b) };
    this.convertViewportEdgeCoordsToImageCoords = function(a, b, c, d) {
        if ("undefined" === typeof c || null === c) c = Z.imageZ;
        if ("undefined" === typeof d || null === d) d = Z.imageR;
        0 > d && (d += 360);
        a -= O;
        b -= P;
        0 != Z.imageR && (viewportClickPt = Z.Utils.rotatePoint(a,
            b, -d), a = viewportClickPt.x, b = viewportClickPt.y);
        return new Z.Utils.Point(Z.imageX - a / c, Z.imageY - b / c)
    };
    this.z468 = function(a, b, c) { if ("undefined" === typeof a || null === a) a = Z.imageW; if ("undefined" === typeof b || null === b) b = Z.imageH; var d = a / b > C / A ? C / a : A / b; if (90 == c || 270 == c) d = a / b > C / A ? C / b : A / a; return d };
    this.calculateZoomToFill = function(a, b, c) { if ("undefined" === typeof a || null === a) a = Z.imageW; if ("undefined" === typeof b || null === b) b = Z.imageH; var d = a / b > C / A ? A / b : C / a; if (90 == c || 270 == c) d = a / b > C / A ? A / a : C / b; return d };
    this.z482 = function(a,
        b) { return da(a, b) };
    this.getStatus = function(a) { a = Z.Utils.arrayIndexOfObjectValue(Xa, "state", a); return -1 == a ? !1 : Xa[a].status };
    this.setStatus = function(a, b) { var c = !1,
            d = Z.Utils.arrayIndexOfObjectValue(Xa, "state", a); - 1 == d ? (c = b, Xa[Xa.length] = { state: a, status: b }) : (!Xa[d].status && b && (c = !0), Xa[d].status = b);
        c && (Z.Utils.validateCallback(a), Z.Viewer.validateViewerStatus(a)) };
    this.traceDebugValues = function(a, b, c, d) {
        c = "undefined" !== typeof c && null !== c ? c : null;
        b = null !== b ? b : "";
        switch (a) {
            case "tilesToDisplay":
                Cb = c;
                Gb =
                    ab = Ib = Db = 0;
                ib = c;
                hb = 0;
                tilesTimeStart = (new Date).getTime();
                Hb = 0;
                window.clearTimeout(bb);
                bb = null;
                bb = window.setTimeout(ec, fc);
                break;
            case "tilesInCache":
                Db = c;
                break;
            case "z581-image-display":
                Ib += 1;
                break;
            case "z755":
                ab += 1;
                hb = ((new Date).getTime() - c) / 1E3;
                Hb = ab / hb;
                break;
            case "z507":
                a = Z.Utils.arrayIndexOf(Fa, b); - 1 != a && (Fa.splice(a, 1), Gb += 1, --ib);
                break;
            case "tilesBackfillToPrecache":
                ac = c;
                break;
            case "onTileBackfillPrecache":
                bc += 1;
                break;
            case "tilesBackfillToDisplay":
                Eb = c;
                break;
            case "z599":
                cc += 1;
                break;
            case "displayBackfillTile":
                a =
                    Z.Utils.arrayIndexOf(Ea, b), -1 != a && (Ea.splice(a, 1), dc += 1)
        }
    };
    this.zoom = function(a) { if ("stop" != a || "stop" != Z.zooming) { switch (a) {
                case "out":
                    0 <= ka && (ka -= nb); break;
                case "in":
                    0 >= ka && (ka += nb); break;
                case "stop":
                    ka = 0 }
            Z.zooming = 0 == ka ? "stop" : 0 < ka ? "in" : "out";
            0 != ka ? Ha || (Ha = window.setTimeout(Kb, Mb)) : (ic(), k.updateView()) } };
    this.pan = function(a) {
        if ("horizontalStop" != a || "stop" != Z.panningX)
            if ("verticalStop" != a || "stop" != Z.panningY) {
                if (!Z.tracking) switch (a) {
                    case "left":
                        0 >= ea && (ea += ub);
                        break;
                    case "up":
                        0 >= fa && (fa += ub);
                        break;
                    case "down":
                        0 <= fa && (fa -= ub);
                        break;
                    case "right":
                        0 <= ea && (ea -= ub);
                        break;
                    case "horizontalStop":
                        ea = 0;
                        break;
                    case "verticalStop":
                        fa = 0;
                        break;
                    case "stop":
                        fa = ea = 0
                }
                Z.panningX = 0 == ea ? "stop" : 0 < ea ? "left" : "right";
                Z.panningY = 0 == fa ? "stop" : 0 < fa ? "up" : "down";
                da(v, 1);
                da(v, 1);
                0 != ea || 0 != fa ? Ha || (Ha = window.setTimeout(Kb, Mb)) : (ic(), k.updateView())
            }
    };
    this.zoomAndPanToView = function(a, b, c, d, e, h, m) {
        k.zoomAndPanAllStop();
        if ("undefined" === typeof a || null === a) a = Z.imageX;
        if ("undefined" === typeof b || null === b) b = Z.imageY;
        if ("undefined" ===
            typeof c || null === c) c = Z.imageZ;
        if ("undefined" === typeof d || null === d) d = Z.imageR;
        if ("undefined" === typeof e || null === e) e = Fc;
        if ("undefined" === typeof h || null === h) h = qc;
        if ("center" == a || isNaN(parseFloat(a))) a = Z.imageCtrX;
        if ("center" == b || isNaN(parseFloat(b))) b = Z.imageCtrY;
        if (-1 == c || isNaN(parseFloat(c))) c = Z.fitZ;
        if ("undefined" === typeof a || null === a) a = Z.initialX;
        if ("undefined" === typeof b || null === b) b = Z.initialY;
        if ("undefined" === typeof d || null === d) d = Z.imageR;
        "undefined" === typeof c || null === c ? c = Z.initialZ : 100 < c ? c /=
            100 : c > Z.maxZ ? c = Z.maxZ : c < Z.maxZ && c > Z.maxZ - .01 && (c = Z.maxZ);
        b = Na(a, b, c, d, "image");
        a = b.x;
        b = b.y;
        c = eb(c);
        if (Math.round(a) != Math.round(Z.imageX) || Math.round(b) != Math.round(Z.imageY) || Math.round(1E5 * c) != Math.round(1E5 * Z.imageZ) || Math.round(d) != Math.round(Z.imageR)) Z.interactive = !1, tb = 0, hc(a, b, c, d, e, h, m)
    };
    this.zoomAndPanAllStop = function(a, b) { Z.interactive && (Pa && Pa && (window.clearTimeout(Pa), Pa = null), Z.smoothPan && null !== Qa && (Z.mouseIsDown || Pb(!0), a = !0), a || k.updateView()) };
    this.z633 = function(a, b) { Lb(a, b) };
    this.reset =
        function() { k.zoomAndPanToView(Z.initialX, Z.initialY, Z.initialZ, Z.initialR) };
    this.getSmoothPanGliding = function() { return la };
    this.setSmoothPanGliding = function(a) { la = a };
    this.mouseWheelHandler = function(a, b) {
        Z.mouseWheelIsDown = !0;
        Z.mouseWheelCompleteTimer && window.clearTimeout(Z.mouseWheelCompleteTimer);
        Z.mouseWheelCompleteTimer = window.setTimeout(Z.Viewer.z586, Z.mouseWheelCompleteDuration);
        var c = k.z482(v, D * (1 + (0 < a ? nb : -nb)));
        constrainedZ = eb(c);
        constrainedZ != Z.imageZ && (Z.zooming = 0 < a ? "in" : 0 > a ? "out" : "stop",
            k.z633(constrainedZ))
    }
};
Z.ZoomifyToolbar = function(a) {
    function b(b) { if (b = Z.Utils.event(b)) { var d = b.type,
                l = Z.Utils.target(b); if (l) { c.background = z;
                e.background = z;
                h.background = z; var t = l.id;
                b = b.altKey; switch (d) {
                    case "mouseover":
                        l.style.background = r; break;
                    case "mousedown":
                        l.style.background = q; "buttonZoomInInternal" == t ? b || a.zoom("in") : "buttonZoomOutInternal" == t && (b || a.zoom("out")); break;
                    case "mouseup":
                        l.style.background = r, a.zoom("stop"), "buttonResetInternal" == t && a.reset() } } } }
    var d = !1,
        c, e, h, r = Z.Utils.getResource("z731"),
        q = Z.Utils.getResource("z730"),
        z = Z.Utils.getResource("z733");
    (function() {
        var a = parseFloat(Z.Utils.getResource("z728")),
            q = Z.Utils.getResource("z729"),
            l = Z.Utils.getResource("z733"),
            t = Math.round(25),
            m = Math.round(25 / 1.5),
            H = (100 - 3 * t) / 4,
            K = (25 - m) / 2;
        Z.ToolbarDisplay = Z.Utils.createContainerElement("div", "ToolbarDisplay", "inline-block", "absolute", "visible", "100px", "25px", Z.viewerW / 2 - 50 + "px", Z.viewerH - 25 - 10 + "px", "none", "0px", "transparent none", "0px", "0px", "normal");
        tbS = Z.ToolbarDisplay.style;
        var p = Z.Utils.createContainerElement("div", "toolbarBackgroundInternal",
            "inline-block", "absolute", "visible", "100px", "25px", "0px", "0px", "solid", "1px", q, "0px", "0px", "normal");
        Z.Utils.setOpacity(p, a, q);
        Z.ToolbarDisplay.appendChild(p);
        a = Z.Utils.createContainerElement("div", "buttonZoomOutInternal", "inline-block", "absolute", "visible", t + "px", m + "px", H + 1 + "px", K + 1 + "px", "none", "0px", l, "0px", "0px", "normal");
        Z.Utils.setOpacity(a, .4, q);
        a.setAttribute("title", Z.Utils.getResource("z400"));
        p = document.createTextNode(Z.Utils.getResource("z735"));
        a.appendChild(p);
        Z.ToolbarDisplay.appendChild(a);
        h = a.style;
        Z.Utils.setTextNodeStyle(p, "black", "verdana", "15px", "none", "normal", "normal", "normal", "bold", "1em", "center", "none");
        Z.Utils.disableTextInteraction(p);
        p = Z.Utils.createContainerElement("div", "buttonResetInternal", "inline-block", "absolute", "visible", t + "px", m + "px", 2 * H + t + 1 + "px", K + 1 + "px", "none", "0px", l, "0px", "0px", "normal");
        Z.Utils.setOpacity(p, .4, q);
        p.setAttribute("title", Z.Utils.getResource("z378"));
        var r = document.createTextNode(Z.Utils.getResource("z732"));
        p.appendChild(r);
        Z.ToolbarDisplay.appendChild(p);
        e = p.style;
        Z.Utils.setTextNodeStyle(r, "blue", "verdana", "15px", "none", "normal", "normal", "normal", "bold", "1em", "center", "none");
        Z.Utils.disableTextInteraction(r);
        l = Z.Utils.createContainerElement("div", "buttonZoomInInternal", "inline-block", "absolute", "visible", t + "px", m + "px", 3 * H + 2 * t + 1 + "px", K + 1 + "px", "none", "0px", l, "0px", "0px", "normal");
        Z.Utils.setOpacity(l, .4, q);
        l.setAttribute("title", Z.Utils.getResource("z399"));
        q = document.createTextNode(Z.Utils.getResource("z734"));
        l.appendChild(q);
        Z.ToolbarDisplay.appendChild(l);
        c = l.style;
        Z.Utils.setTextNodeStyle(q, "black", "verdana", "15px", "none", "normal", "normal", "normal", "bold", "1em", "center", "none");
        Z.Utils.disableTextInteraction(q);
        Z.Utils.addEventListener(a, "mouseover", b);
        Z.Utils.addEventListener(a, "mousedown", b);
        Z.Utils.addEventListener(a, "mouseup", b);
        Z.Utils.addEventListener(a, "mouseout", b);
        Z.Utils.addEventListener(p, "mouseover", b);
        Z.Utils.addEventListener(p, "mousedown", b);
        Z.Utils.addEventListener(p, "mouseup", b);
        Z.Utils.addEventListener(p, "mouseout", b);
        Z.Utils.addEventListener(l,
            "mouseover", b);
        Z.Utils.addEventListener(l, "mousedown", b);
        Z.Utils.addEventListener(l, "mouseup", b);
        Z.Utils.addEventListener(l, "mouseout", b);
        tbS.zIndex = (Z.baseZIndex + 2).toString();
        Z.ViewerDisplay.appendChild(Z.ToolbarDisplay);
        Z.Utils.addEventListener(Z.ToolbarDisplay, "mouseover", Z.Utils.stopPropagation);
        d || (d = !0, Z.Utils.validateCallback("toolbarInitialized"), Z.Viewer.validateViewerReady("toolbarInitialized"))
    })();
    this.z747 = function() { return d };
    this.show = function(a) {
        tbS && (tbS.display = a ? "inline-block" :
            "none")
    }
};
Z.NetConnector = function() {
    function a(a, c, e, h, l, q, t) { var r = b(); if (null === r) Z.Utils.showMessage(Z.Utils.getResource("z295"));
        else { if (e = "function" === typeof c) { var u = c;
                c = function() { window.setTimeout(Z.Utils.createCallback(null, u, r), 1) };
                r.onreadystatechange = function() { 4 == r.readyState && (r.onreadystatechange = new Function, c()) } } try { r.open("GET", a, e), r.send(null) } catch (z) { d(z, a, h), r = null, console.log(z) } } }

    function b() {
        var a = null;
        switch (Z.xmlHttpRequestSupport) {
            case "XMLHttpRequest":
                a = new XMLHttpRequest;
                break;
            case "Msxml2.XMLHTTP.6.0":
                a = new ActiveXObject("Msxml2.XMLHTTP.6.0");
                break;
            case "Msxml2.XMLHTTP.3.0":
                a = new ActiveXObject("Msxml2.XMLHTTP.3.0");
                break;
            case "Microsoft.XMLHTTP":
                a = new ActiveXObject("Microsoft.XMLHTTP")
        }
        return a
    }

    function d(a, b, c) {
        1 == Z.localUse && (Z.browser == Z.browsers.CHROME || Z.browser == Z.browsers.OPERA || Z.browser == Z.browsers.IE && 11 == Z.browserVersion || Z.browser == Z.browsers.SAFARI && 7 <= Z.browserVersion) ? Z.Utils.showMessage(Z.Utils.getResource("z288"), !1, Z.messageDurationStandard, "center") :
            -1 != b.indexOf("ImageProperties.xml") ? Z.Utils.showMessage(Z.Utils.getResource("z256-IMAGEXML"), !0, null, "left") : -1 != b.toLowerCase().indexOf("reply_data") ? Z.Utils.showMessage(Z.Utils.getResource("z256-IMAGEOFFSET"), !1, Z.messageDurationShort, "center") : Z.Utils.showMessage(Z.Utils.getResource("z256"), !1, Z.messageDurationShort, "center")
    }

    function c(a, b) {
        if (a)
            if (200 !== a.status && 0 !== a.status && 206 !== a.status) {
                var c = a.status,
                    d = 404 == c ? "Not Found" : a.statusText;
                Z.Utils.showMessage(Z.Utils.getResource("z273") + c +
                    " - " + d, !1, Z.messageDurationShort, "center")
            } else a.responseXML && a.responseXML.documentElement && ((c = a.responseXML) && c.documentElement ? "IMAGE_PROPERTIES" == c.documentElement.tagName ? Z.Viewport.z602(c) : Z.Utils.showMessage(Z.Utils.getResource("z296"), !0) : Z.Utils.showMessage(Z.Utils.getResource("z293"), !0));
        else Z.Utils.showMessage(Z.Utils.getResource("z272"), !1, Z.messageDurationShort, "center")
    }

    function e(a, b, c, d) {
        if (q < z) return q++, b = Z.Utils.createCallback(null, h, b), (new r(a, b, c)).start(), !0; - 1 == Z.Utils.arrayIndexOfObjectValue(t,
            "sc", a) && (t[t.length] = { sc: a, cb: b, ct: c, t: d }, l || (l = window.setInterval(function() { var a = t[0];
            e(a.sc, a.cb, a.ct, a.t) && (t = Z.Utils.arraySplice(t, 0, 1));
            0 == t.length && l && (window.clearInterval(l), l = null) }, N)));
        return !1
    }

    function h(a, b, c) { q--; if ("function" === typeof a) try { a(c) } catch (d) { Z.Utils.showMessage(d.name + Z.Utils.getResource("z245") + b + " " + d.message, !0) } }

    function r(a, b, c) {
        function d(c) { e.onload = null;
            e.onabort = null;
            e.onerror = null;
            h && window.clearTimeout(h);
            window.setTimeout(function() { b(a, c ? e : null) }, 1) }
        var e =
            null,
            h = null;
        this.start = function() { e = new Image; var b = function() { d(!1) };
            e.onload = function() { d(!0) };
            e.onabort = b;
            e.onerror = b;
            h = window.setTimeout(function() { console.log(Z.Utils.getResource("z253"));
                d(!1);
                Z.Viewport.traceDebugValues("imageRequestTimeout", c + " timeout: " + a) }, u);
            e.src = a }
    }
    var q = 0,
        z = parseInt(Z.Utils.getResource("z140"), 10),
        u = parseFloat(Z.Utils.getResource("z139")),
        N = Z.Utils.getResource("z708"),
        l, t = [];
    this.loadXML = function(b, d) {
        "undefined" === typeof d || null === d ? a(b, c, null) : a(b, function(a) {
            c(a,
                d)
        }, null)
    };
    this.loadImage = function(a, b, c, d) { e(a, b, c, d) }
};
Z.Utils = {
    addCrossBrowserMethods: function() {
        document.addEventListener ? (this.disableTextInteraction = function(a) { if (a) { var b = a.parentNode.style;
                b && (a.parentNode.unselectable = "on", b.userSelect = "none", b.MozUserSelect = "none", b.webkitUserSelect = "none", b.webkitTouchCallout = "none", b.webkitTapHighlightColor = "transparent") } }, this.renderQuality = function(a, b) { b && a.style.setProperty("image-rendering", "high" == b ? "optimizeQuality" : "optimizeSpeed", null) }, this.setOpacity = function(a, b, d) {
            Z.alphaSupported ? a.style.opacity =
                b : d && (a.style.backgroundColor = d)
        }) : document.attachEvent && (this.disableTextInteraction = function(a) { a && (a.parentNode.unselectable = "on", a.parentNode.onselectstart = function() { return !1 }) }, this.renderQuality = function(a, b) { b && (a.style.msInterpolationMode = "high" == b ? "bicubic" : "nearest-neighbor") }, this.setOpacity = function(a, b, d) {
            Z.alphaSupported ? (b *= 100, a.style.zoom = 1, a.style.filter = "progid:DXImageTransform.Microsoft.Alpha(Opacity=" + b + ")", a.style.filter = "alpha(opacity=" + b + ")", 100 == b && (a.style.filter = "")) : d &&
                (a.style.backgroundColor = d)
        })
    },
    addCrossBrowserEvents: function() {
        document.addEventListener ? (this.addEventListener = function(a, b, d) { a && ("mousewheel" == b && a.addEventListener("DOMMouseScroll", d, !1), a.addEventListener(b, d, !1)) }, this.removeEventListener = function(a, b, d) { a && ("mousewheel" == b && a.removeEventListener("DOMMouseScroll", d, !1), a.removeEventListener(b, d, !1)) }, this.event = function(a) { return a }, this.target = function(a) { return a.target }, this.relatedTarget = function(a) { return a.relatedTarget }, this.isRightMouseButton =
            function(a) { var b = !1; if (2 == a.which || 3 == a.which) b = !0; return b }, this.preventDefault = function(a) { a.preventDefault() }, this.stopPropagation = function(a) { a.stopPropagation() }) : document.attachEvent && (this.addEventListener = function(a, b, d) {
                if (-1 == this._findListener(a, b, d)) {
                    var c = function() { var b = window.event;
                        Function.prototype.call ? d.call(a, b) : (a._currentListener = d, a._currentListener(b), a._currentListener = null) };
                    a.attachEvent("on" + b, c);
                    b = { target: a, eventName: b, handler: d, handler2: c };
                    var c = (a.document || a).parentWindow,
                        e = "l" + this._listenerCounter++;
                    c._allListeners || (c._allListeners = {});
                    c._allListeners[e] = b;
                    a._listeners || (a._listeners = []);
                    a._listeners[a._listeners.length] = e;
                    c._unloadListenerAdded || (c._unloadListenerAdded = !0, c.attachEvent("onunload", this._removeAllListeners))
                }
            }, this.removeEventListener = function(a, b, d) { if (a && (d = this._findListener(a, b, d), -1 != d)) { var c = (a.document || a).parentWindow,
                        e = a._listeners[d];
                    a.detachEvent("on" + b, c._allListeners[e].handler2);
                    a._listeners = Z.Utils.arraySplice(a._listeners, d, 1);
                    delete c._allListeners[e] } },
            this.event = function(a) { return window.event }, this.target = function(a) { return a.srcElement }, this.relatedTarget = function(a) { var b = null; "mouseover" == a.type ? b = a.fromElement : "mouseout" == a.type && (b = a.toElement); return b }, this.isRightMouseButton = function(a) { var b = !1;
                2 == a.button && (b = !0); return b }, this.preventDefault = function(a) { a && (a.returnValue = !1) }, this.stopPropagation = function(a) { a.cancelBubble = !0 }, this._findListener = function(a, b, d) {
                var c = a._listeners;
                if (!c) return -1;
                a = (a.document || a).parentWindow;
                for (var e =
                        c.length - 1; 0 <= e; e--) { var h = a._allListeners[c[e]]; if (h && h.eventName == b && h.handler == d) return e }
                return -1
            }, this._removeAllListeners = function() { for (id in this._allListeners) { var a = this._allListeners[id];
                    a.target.detachEvent("on" + a.eventName, a.handler2);
                    delete this._allListeners[id] } }, this._listenerCounter = 0)
    },
    declareGlobals: function() {
        Z.pageContainerID = null;
        Z.imagePath = null;
        Z.cacheProofCounter = 0;
        Z.timerCounter = 0;
        Z.browsers = null;
        Z.browser = null;
        Z.browserVersion = null;
        Z.scaleThreshold = null;
        Z.canvasSupported =
            null;
        Z.cssTransformsSupported = null;
        Z.cssTransformProperty = null;
        Z.cssTransformNoUnits = null;
        Z.alphaSupported = null;
        Z.renderQuality = null;
        Z.xmlHttpRequestSupport = null;
        Z.touchSupport = null;
        Z.mobileDevice = null;
        Z.localUse = null;
        Z.initialX = null;
        Z.initialY = null;
        Z.initialZ = null;
        Z.initialZoom = null;
        Z.minZ = null;
        Z.minZoom = null;
        Z.maxZ = null;
        Z.maxZoom = null;
        Z.zoomSpeed = null;
        Z.panSpeed = null;
        Z.initialR = null;
        Z.smoothPan = null;
        Z.smoothPanEasing = null;
        Z.smoothZoom = null;
        Z.smoothZoomEasing = null;
        Z.smoothPanGlide = null;
        Z.fadeIn =
            null;
        Z.fadeInSpeed = null;
        Z.toolbarInternal = null;
        Z.toolbarAutoShowHide = null;
        Z.toolbarW = null;
        Z.toolbarH = null;
        Z.clickZoom = null;
        Z.doubleClickZoom = null;
        Z.doubleClickDelay = null;
        Z.clickPan = null;
        Z.mousePan = null;
        Z.keys = null;
        Z.z744 = null;
        Z.z744Limit = null;
        Z.z744Strict = null;
        Z.panBuffer = null;
        Z.tooltipsVisible = null;
        Z.minimizeVisible = null;
        Z.panButtonsVisible = null;
        Z.resetVisible = null;
        Z.messagesVisible = null;
        Z.canvas = null;
        Z.baseZIndex = null;
        Z.debug = null;
        Z.imageProperties = null;
        Z.tileW = null;
        Z.tileH = null;
        Z.tileType = "jpg";
        Z.tileSource = null;
        Z.xmlCallbackFunction = null;
        Z.mouseWheelParmeterProvided = null;
        Z.mouseWheel = null;
        Z.messageDurationLong = parseInt(Z.Utils.getResource("z709"), 10);
        Z.messageDurationStandard = parseInt(Z.Utils.getResource("z711"), 10);
        Z.messageDurationShort = parseInt(Z.Utils.getResource("z710"), 10);
        Z.messageDurationVeryShort = parseInt(Z.Utils.getResource("z712"), 10);
        Z.Viewer = null;
        Z.ViewerDisplay = null;
        Z.Viewport = null;
        Z.Toolbar = null;
        Z.ToolbarDisplay = null;
        Z.MessageDisplay = null;
        Z.messages = null;
        Z.messageDisplayList = [];
        Z.coordinates = null;
        Z.imageW = null;
        Z.imageH = null;
        Z.imageD = null;
        Z.imageCtrX = null;
        Z.imageCtrY = null;
        Z.imageX = 0;
        Z.imageY = 0;
        Z.imageZ = 0;
        Z.imageR = 0;
        Z.priorX = 0;
        Z.priorY = 0;
        Z.priorZ = 0;
        Z.priorR = 0;
        Z.preventDupCall = !1;
        Z.fitZ = null;
        Z.fillZ = null;
        Z.zooming = "stop";
        Z.panningX = "stop";
        Z.panningY = "stop";
        Z.interactive = !0;
        Z.useCanvas = !0;
        Z.mouseIsDown = !1;
        Z.buttonIsDown = !1;
        Z.keyIsDown = !1;
        Z.mouseWheelIsDown = !1;
        Z.mouseWheelCompleteDuration = null;
        Z.mouseWheelCompleteTimer = null;
        Z.mouseOutDownPoint = null;
        Z.viewportCurrentID = 0;
        Z.viewportCurrent =
            null;
        Z.viewportChangeTimeout = null
    },
    detectBrowserFeatures: function() {
        Z.browsers = { UNKNOWN: 0, IE: 1, FIREFOX: 2, SAFARI: 3, CHROME: 4, OPERA: 5, EDGE: 6 };
        var a = Z.browsers.UNKNOWN,
            b = 0,
            d = 1E4,
            c = navigator.appName,
            e = navigator.appVersion,
            h = !1,
            r = !1,
            q = navigator.userAgent.toLowerCase();
        if (-1 != q.indexOf("edge")) a = Z.browsers.EDGE, b = e;
        else if ("Microsoft Internet Explorer" == c && window.attachEvent && window.ActiveXObject) b = q.indexOf("msie"), a = Z.browsers.IE, b = parseFloat(q.substring(b + 5, q.indexOf(";", b))), h = "undefined" !== typeof document.documentMode;
        else if ("Netscape" == c && -1 != q.indexOf("trident")) a = Z.browsers.IE, b = 11;
        else if ("Netscape" == c && window.addEventListener) { var z = q.indexOf("firefox"),
                c = q.indexOf("safari"),
                e = q.indexOf("chrome");
            0 <= z ? (a = Z.browsers.FIREFOX, b = parseFloat(q.substring(z + 8)), d = 1E4) : 0 <= c && (d = q.substring(0, c).lastIndexOf("/"), a = 0 <= e ? Z.browsers.CHROME : Z.browsers.SAFARI, b = parseFloat(q.substring(d + 1, c)), d = 1E4);
            c = new Image;
            c.style.getPropertyValue && (r = c.style.getPropertyValue("image-rendering")) } else "Opera" == c && window.opera && "[object Opera]" ==
            Object.prototype.toString.call(window.opera) && (a = Z.browsers.OPERA, b = parseFloat(e));
        var u;
        if (window.XMLHttpRequest) netReq = new XMLHttpRequest, u = "XMLHttpRequest";
        else if (window.ActiveXObject)
            for (c = ["Msxml2.XMLHTTP.6.0", "Msxml2.XMLHTTP.3.0", "Microsoft.XMLHTTP"], e = 0, z = c.length; e < z; e++) try { netReq = new ActiveXObject(c[e]);
                u = c[e]; break } catch (H) {}
        for (var c = document.createElement("canvas"), c = !(!c.getContext || !c.getContext("2d")), e = !(a == Z.browsers.SAFARI && 4 > b || a == Z.browsers.CHROME && 2 > b), c = c && e, e = !(a == Z.browsers.CHROME &&
                2 > b), r = h || r ? "high" : null, N = (document.documentElement || {}).style || {}, h = !1, l = ["transform", "WebkitTransform", "MozTransform", "OTransform", "msTransform"], t; z = l.shift();)
            if ("undefined" !== typeof N[z]) { h = !0;
                t = /webkit/i.test(z); break }
        var N = "ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch || 0 < navigator.maxTouchPoints || 0 < navigator.msMaxTouchPoints,
            l = -1 < q.indexOf("iphone") || -1 < q.indexOf("ipad") || -1 < q.indexOf("ipod"),
            q = -1 < q.indexOf("android") || l,
            l = Array.prototype.splice,
            m;
        switch (window.location.protocol) {
            case "http:":
                m = !1;
                break;
            case "https:":
                m = !1;
                break;
            case "file:":
                m = !0;
                break;
            default:
                m = null
        }
        Z.browser = a;
        Z.browserVersion = b;
        Z.scaleThreshold = d;
        Z.xmlHttpRequestSupport = u;
        Z.canvasSupported = c;
        Z.useCanvas = Z.canvasSupported;
        Z.cssTransformsSupported = h;
        Z.cssTransformProperty = z;
        Z.cssTransformNoUnits = t;
        Z.alphaSupported = e;
        Z.renderQuality = r;
        Z.arraySpliceSupported = l;
        Z.touchSupport = N;
        Z.mobileDevice = q;
        Z.localUse = m
    },
    setParameters: function() {
        isNaN(parseFloat(this.getResource("z143"))) || (Z.initialX = parseFloat(this.getResource("z143")));
        isNaN(parseFloat(this.getResource("z144"))) || (Z.initialY = parseFloat(this.getResource("z144")));
        isNaN(parseFloat(this.getResource("z145"))) || (Z.initialZ = parseFloat(this.getResource("z145")));
        isNaN(parseFloat(this.getResource("z163"))) || (Z.minZ = parseFloat(this.getResource("z163")));
        isNaN(parseFloat(this.getResource("z153"))) || (Z.maxZ = parseFloat(this.getResource("z153")));
        isNaN(parseFloat(this.getResource("z241"))) || (Z.zoomSpeed = parseFloat(this.getResource("z241")));
        isNaN(parseFloat(this.getResource("z175"))) ||
            (Z.panSpeed = parseFloat(this.getResource("z175")));
        isNaN(parseFloat(this.getResource("z111"))) || (Z.fadeInSpeed = parseFloat(this.getResource("z111")));
        Z.fadeIn = 0 < Z.fadeInSpeed;
        Z.clickZoom = "0" != this.getResource("z93");
        Z.doubleClickZoom = "0" != this.getResource("z707");
        Z.doubleClickDelay = parseFloat(this.getResource("z706"));
        Z.clickPan = "0" != this.getResource("z92");
        Z.mousePan = "0" != this.getResource("z164");
        Z.z744 = "0" != this.getResource("z95");
        Z.z744Limit = parseInt(this.getResource("z95LIMIT"), 10);
        Z.z744Strict =
            "0" != this.getResource("z95STRICT");
        Z.panBuffer = parseFloat(this.getResource("z173"));
        Z.smoothPan = Z.useCanvas && "0" != this.getResource("DEFAULT_SMOOTHPAN");
        Z.smoothPanEasing = parseInt(this.getResource("z719"), 10);
        Z.smoothPanGlide = parseInt(this.getResource("z720"), 10);
        Z.smoothZoom = "0" != this.getResource("DEFAULT_SMOOTHZOOM");
        Z.smoothZoomEasing = parseInt(this.getResource("z721"), 10);
        Z.keys = "0" != this.getResource("z146");
        Z.canvas = "0" != this.getResource("z88");
        Z.baseZIndex = parseInt(this.getResource("z705"), 10);
        Z.mouseWheel = parseInt(this.getResource("DEFAULT_MOUSEWHEEL"), 10);
        Z.messagesVisible = "0" != this.getResource("z713");
        var a;
        (a = document.getElementById(Z.pageContainerID)) && Z.Utils.getElementStyle(a);
        Z.Utils.validateImagePath()
    },
    validateImagePath: function(a) { null !== ("undefined" !== typeof a && Z.Utils.stringValidate(a) ? a : Z.imagePath) && (Z.tileSource = "ZoomifyImageFolder") },
    validateImagePath: function(a) {
        null !== ("undefined" !== typeof a && Z.Utils.stringValidate(a) ? a : Z.imagePath) ? Z.Utils.stringValidate(Z.tileHandlerPath) ?
            alert(this.getResource("z213")) : Z.tileSource = "ZoomifyImageFolder" : (Z.imageSet || Z.slideshow) && alert(this.getResource("DEFAULT_MULTIIMAGESUPPORTDISABLEDALERT"))
    },
    clearImageParameters: function() {
        Z.imagePath = null;
        Z.initialX = null;
        Z.initialY = null;
        Z.initialZ = null;
        Z.minZ = null;
        Z.maxZ = null;
        Z.initialR = null;
        Z.mouseWheelParmeterProvided = null;
        Z.mouseWheel = null;
        Z.imageW = null;
        Z.imageH = null;
        Z.imageD = null;
        Z.imageCtrX = null;
        Z.imageCtrY = null;
        Z.imageX = 0;
        Z.imageY = 0;
        Z.imageZ = 0;
        Z.imageR = 0;
        Z.fitZ = null;
        Z.fillZ = null;
        Z.zooming =
            "stop";
        Z.panningX = "stop";
        Z.panningY = "stop"
    },
    getResource: function(a) {
        var b = "";
        switch (a) {
            case "z213":
                b = "Support for Zoomify Image File storage and other special storage options is enabled only in the Zoomify Image Viewer included in the Zoomify Express, Pro, and Enterprise products.";
                break;
            case "DEFAULT_MULTIIMAGESUPPORTDISABLEDALERT":
                b = "Support for multi-image display features is enabled only in the Zoomify Image Viewer included in the Zoomify Pro and Enterprise products.";
                break;
            case "z221":
                b = "256";
                break;
            case "z219":
                b = "256";
                break;
            case "z140":
                b = "300";
                break;
            case "z139":
                b = "60000";
                break;
            case "z708":
                b = "100";
                break;
            case "z218":
                b = "1.15";
                break;
            case "z220":
                b = "300";
                break;
            case "z81":
                b = "6";
                break;
            case "z78":
                b = "3";
                break;
            case "z80":
                b = "5";
                break;
            case "z77":
                b = "3";
                break;
            case "z79":
                b = "3";
                break;
            case "z76":
                b = "2";
                break;
            case "z75":
                b = "0";
                break;
            case "z173":
                b = Z.mobileDevice ? "1" : "1.5";
                break;
            case "DEFAULT_z310SIZEMAXBROWSER":
                b = "10000";
                break;
            case "z74":
                reTxt = Z.mobileDevice ? "1" : "2";
                break;
            case "z88":
                b = "1";
                break;
            case "z705":
                b =
                    "2000";
                break;
            case "z725":
                b = "2";
                break;
            case "z724":
                b = "1000";
                break;
            case "z716":
                b = 4;
                break;
            case "z715":
                b = 500;
                break;
            case "z714":
                b = 4;
                break;
            case "z723":
                b = Z.mobileDevice ? 6 : 4;
                break;
            case "z722":
                b = 500;
                break;
            case "z175":
                b = "5";
                break;
            case "z176":
                b = "10";
                break;
            case "z241":
                b = "5";
                break;
            case "z242":
                b = "0.02";
                break;
            case "z238":
                b = "30";
                break;
            case "z240":
                b = "20";
                break;
            case "z239":
                b = "800";
                break;
            case "z93TIERSKIPTHRESHOLD":
                b = "0.2";
                break;
            case "z122":
                b = "10";
                break;
            case "DEFAULT_MOUSEWHEEL":
                b = "1";
                break;
            case "z717":
                b = "1";
                break;
            case "z718":
                b =
                    "1";
                break;
            case "z165":
                b = "300";
                break;
            case "z111":
                b = "5";
                break;
            case "z112":
                b = "0.067";
                break;
            case "z146":
                b = "1";
                break;
            case "z164":
                b = "1";
                break;
            case "z92":
                b = "1";
                break;
            case "z93":
                b = "1";
                break;
            case "z707":
                b = "1";
                break;
            case "z706":
                b = "250";
                break;
            case "z95":
                b = "1";
                break;
            case "z95LIMIT":
                b = "2";
                break;
            case "z95STRICT":
                b = "0";
                break;
            case "DEFAULT_SMOOTHPAN":
                b = "1";
                break;
            case "z719":
                b = "2";
                break;
            case "z720":
                b = "2";
                break;
            case "DEFAULT_SMOOTHZOOM":
                b = "1";
                break;
            case "z721":
                b = "2";
                break;
            case "z143":
                b = null;
                break;
            case "z144":
                b = null;
                break;
            case "z145":
                b = null;
                break;
            case "z163":
                b = null;
                break;
            case "z153":
                b = "1";
                break;
            case "z83":
                b = "#FBFAFA";
                break;
            case "z83NOALPHA":
                b = "#FBFAFA";
                break;
            case "z83LIGHT":
                b = "#FEFEFE";
                break;
            case "z82":
                b = "0.75";
                break;
            case "z704":
                b = "0.75";
                break;
            case "z87":
                b = "#C0C0C0";
                break;
            case "z713":
                b = "1";
                break;
            case "z159":
                b = "lightgray";
                break;
            case "z158":
                b = "white";
                break;
            case "z709":
                b = "5000";
                break;
            case "z711":
                b = "3000";
                break;
            case "z710":
                b = "1500";
                break;
            case "z712":
                b = "750";
                break;
            case "z726":
                b = "error";
                break;
            case "z288":
                b = "Use Firefox for local viewing or see READ ME FIRST\nfile for optional settings for other browsers.";
                break;
            case "z249":
                b = "Image failed to load: possible invalid path, missing image, or network error.";
                break;
            case "z280":
                b = "Sorry!  Part of this view is not refreshing.  The network may be slow, or the website may be missing a file:  ";
                break;
            case "z727":
                b = "Sorry!  Part of this view is not refreshing. The network\nmay be slow, or the website may be missing a file.  ";
                break;
            case "z295":
                b = "Browser does not support XMLHttpRequest.";
                break;
            case "z256-IMAGEXML":
                b = "Error loading image: please make sure image path in web page matches image folder location on webserver.";
                break;
            case "z256":
                b = "Error making network request:\npossible invalid path or network error.";
                break;
            case "z272":
                b = "Error related to network security: ";
                break;
            case "z273":
                b = "Error related to network status: ";
                break;
            case "z294":
                b = "Browser does not support XML DOM.";
                break;
            case "z293":
                b = "XML Doc invalid.";
                break;
            case "z296":
                b = "XML invalid.";
                break;
            case "z255":
                b = "Image XML invalid.";
                break;
            case "z252":
                b = "Image properties XML invalid.";
                break;
            case "z250":
                b = "Image properties invalid.";
                break;
            case "z254":
                b = "Image tile count does not match value in image XML. If the count is invalid display problems can result.";
                break;
            case "z245":
                b = " while executing callback: ";
                break;
            case "z253":
                b = "\nImage tile request not fulfilled within time period expected";
                break;
            case "z283":
                b = "Unknown element style - no known method to identify.";
                break;
            case "z284":
                b = "Unknown mouse position - no known method to calculate.";
                break;
            case "z285":
                b = "Unknown mouse scroll - no known method to calculate.";
                break;
            case "z286":
                b = "Unknown window size - no known method to calculate.";
                break;
            case "z400":
                b = "Zoom Out";
                break;
            case "z378":
                b = "Reset Initial View";
                break;
            case "z399":
                b = "Zoom In";
                break;
            case "z362":
                b = "Accept And Close Message";
                break;
            case "z361":
                b = "Decline And Close Message";
                break;
            case "z427":
                b = "http://www.zoomify.com";
                break;
            case "z728":
                b = "0.75";
                break;
            case "z729":
                b = "lightgray";
                break;
            case "z733":
                b = "white";
                break;
            case "z731":
                b = "lightgray";
                break;
            case "z730":
                b = "darkgray";
                break;
            case "z734":
                b = "+";
                break;
            case "z732":
                b = "Z";
                break;
            case "z735":
                b = "-";
                break;
            case "z437":
                b = "430";
                break;
            case "z436":
                b = "84";
                break;
            case "z435":
                b = "Cancel";
                break;
            case "z438":
                b = "OK";
                break;
            default:
                b = "Unexpected resource request"
        }
        return b
    },
    clearDisplay: function(a) { if (a)
            if (Z.useCanvas && "CANVAS" == a.tagName) Z.Utils.clearCanvas(a);
            else
                for (; a.hasChildNodes();) a.removeChild(a.lastChild) },
    clearCanvas: function(a) { a = a.getContext("2d");
        a.save(); try { a.setTransform(1, 0, 0, 1, 0, 0) } catch (b) { console.log("In function clearCanvas setting transform on canvas:  " + b) }
        a.clearRect(0, 0, a.canvas.width, a.canvas.height);
        a.restore() },
    createCallback: function(a, b) {
        for (var d = [], c = 2, e = arguments.length; c < e; c++) d[d.length] =
            arguments[c];
        return function() { for (var c = d.concat([]), e = 0, q = arguments.length; e < q; e++) c[c.length] = arguments[e]; return b.apply(a, c) }
    },
    validateCallback: function(a) { "undefined" === typeof Z.callbacks && (Z.callbacks = []); var b = Z.callbacks.slice(0);
        Z.Utils.functionCallWithDelay(function() { Z.Utils.validateCallbackDelayed(a, b) }, 10) },
    validateCallbackDelayed: function(a, b) { for (var d = 0, c = b.length; d < c; d++) { var e = b[d];
            e && e.callbackEvent == a && "object" === typeof e && "function" === typeof e.callbackFunction && e.callbackFunction() }
        Z.Utils.arrayClear(b) },
    getContainerSize: function(a, b) {
        var d = Z.Utils.getElementStyle(a),
            c = parseFloat(d.width),
            e = parseFloat(d.height);
        Z.Utils.stringValidate(d.width) && -1 != d.width.indexOf("%") && (c = parseFloat(Z.Utils.getElementStyleProperty(a, "width")));
        Z.Utils.stringValidate(d.height) && -1 != d.height.indexOf("%") && (e = parseFloat(Z.Utils.getElementStyleProperty(a, "height")));
        isNaN(c) && (c = b.clientWidth);
        isNaN(e) && (e = b.clientHeight);
        if (0 == c || 0 == e) winDimensions = Z.Utils.getWindowSize(), 0 == c && (a.parentNode.style.width = winDimensions.x +
            "px", c = a.clientWidth), 0 == e && (a.parentNode.style.height = winDimensions.y + "px", e = a.clientHeight);
        if (isNaN(c) || 0 == c) c = 800;
        if (isNaN(e) || 0 == e) e = 400;
        return new Z.Utils.Point(c, e)
    },
    createContainerElement: function(a, b, d, c, e, h, r, q, z, u, N, l, t, m, H, K, p) {
        var X = document.createElement(a);
        this.stringValidate(b) && (X.id = b);
        b = X.style;
        b.display = this.stringValidate(d) ? d : "inline-block";
        b.position = this.stringValidate(c) ? c : "static";
        b.overflow = this.stringValidate(e) ? e : "hidden";
        "canvas" == a ? (this.stringValidate(h) && X.setAttribute("width",
            h), this.stringValidate(r) && X.setAttribute("height", r)) : (this.stringValidate(h) && (b.width = h), this.stringValidate(r) && (b.height = r));
        this.stringValidate(q) && (b.left = q);
        this.stringValidate(z) && (b.top = z);
        b.borderStyle = this.stringValidate(u) ? u : "none";
        b.borderWidth = this.stringValidate(N) ? N : "0px";
        b.borderColor = "#696969";
        b.background = this.stringValidate(l) ? l : "transparent none";
        b.margin = this.stringValidate(t) ? t : "0px";
        b.padding = this.stringValidate(m) ? m : "0px";
        b.whiteSpace = this.stringValidate(H) ? H : "normal";
        this.stringValidate(K) &&
            (b.cursor = K);
        "undefined" !== p && p && (Z.Utils.addEventListener(X, "touchstart", Z.Utils.preventDefault), Z.Utils.addEventListener(X, "mousedown", Z.Utils.preventDefault), Z.Utils.addEventListener(X, "contextmenu", Z.Utils.preventDefault));
        return X
    },
    createCenteredElement: function(a, b) {
        var d = this.createContainerElement("div"),
            c = [];
        c[c.length] = '<div style="#position:relative; display:table; height:100%; width:100%; border:none; margin:0px; padding:0px; overflow:hidden; text-align:left;">';
        c[c.length] = '<div style="#position:absolute; display:table-cell; #top:50%; width:100%; border:none; margin:0px; padding:0px; vertical-align:middle;">';
        c[c.length] = '<div id="' + b + '"; style="#position:relative; width:100%; #top:-50%; border:none; margin:0px; padding:0px; text-align:center;"></div></div></div>';
        d.innerHTML = c.join("");
        for (var c = d = d.firstChild, e = d.getElementsByTagName("div"); 0 < e.length;) c = e[0], e = c.getElementsByTagName("div");
        c.appendChild(a);
        return d
    },
    createTextElement: function(a, b, d, c, e, h, r, q, z, u, N, l, t, m, H, K, p, X) {
        d = Z.Utils.createContainerElement("div", "textBoxFor-" + a, "inline-block", "absolute", "hidden", d, c, e, h, q, z, "white", "0px", r, "normal");
        c = document.createElement("textarea");
        d.appendChild(c);
        e = c.style;
        c.id = a;
        c.value = b;
        c.readOnly = u;
        e.width = "100%";
        e.height = "100%";
        e.margin = "0";
        e.border = "0";
        this.stringValidate(N) && (e.fontFamily = N);
        this.stringValidate(l) && (e.fontSize = l);
        this.stringValidate(t) && (e.resize = t);
        this.stringValidate(m) && (c.columns = m);
        this.stringValidate(H) && (c.rows = H);
        this.stringValidate(K) && (e.overflowX = K);
        this.stringValidate(p) && (e.overflowY = p);
        this.stringValidate(X) && (c.wrap = X, "off" == X && (e.whiteSpace = "nowrap"));
        return d
    },
    getElementPosition: function(a) {
        for (var b =
                0, d = 0, c = "fixed" == this.getElementStyle(a).position, e = this.getOffsetParent(a, c); e;) b += a.offsetLeft, d += a.offsetTop, c && (a = this.getPageScroll(), b += a.x, d += a.y), a = e, c = "fixed" == this.getElementStyle(a).position, e = this.getOffsetParent(a, c);
        return new this.Point(b, d)
    },
    getOffsetParent: function(a, b) { return b && a != document.body ? document.body : a.offsetParent },
    getElementStyle: function(a) { if (a.currentStyle) return a.currentStyle; if (window.getComputedStyle) return window.getComputedStyle(a, "");
        this.showMessage(this.getResource("z283")) },
    getElementStyleProperty: function(a, b) { if (window.getComputedStyle) return window.getComputedStyle(a, null).getPropertyValue(b); if (a.currentStyle) return a.currentStyle[b];
        this.showMessage(this.getResource("z283")) },
    getEventTargetCoords: function(a) { return getElementPosition(Z.Utils.target(a)) },
    getFirstTouch: function(a) { var b = null,
            d = a.touches;
        a = a.changedTouches; "undefined" !== typeof d ? b = d[0] : "undefined" !== typeof a && (b = a[0]); return b },
    getMousePosition: function(a) {
        var b = 0,
            d = 0;
        "DOMMouseScroll" == a.type && Z.browser ==
            Z.browsers.FIREFOX && 3 > Z.browserVersion ? (b = a.screenX, d = a.screenY) : "number" === typeof a.pageX ? (b = a.pageX, d = a.pageY) : "number" === typeof a.clientX ? (b = a.clientX + document.body.scrollLeft + document.documentElement.scrollLeft, d = a.clientY + document.body.scrollTop + document.documentElement.scrollTop) : console.log(this.getResource("z284"));
        return new this.Point(b, d)
    },
    getMouseScroll: function(a) {
        var b = 0;
        "number" === typeof a.wheelDelta ? b = a.wheelDelta : "number" === typeof a.detail ? b = -1 * a.detail : this.showMessage(this.getResource("z285"));
        return b ? b / Math.abs(b) : 0
    },
    getPageScroll: function() { var a = 0,
            b = 0,
            d = document.documentElement || {},
            c = document.body || {}; if ("number" === typeof window.pageXOffset) a = window.pageXOffset, b = window.pageYOffset;
        else if (c.scrollLeft || c.scrollTop) a = c.scrollLeft, b = c.scrollTop;
        else if (d.scrollLeft || d.scrollTop) a = d.scrollLeft, b = d.scrollTop; return new this.Point(a, b) },
    getWindowSize: function() {
        var a = 0,
            b = 0,
            d = document.documentElement || {},
            c = document.body || {};
        "number" === typeof window.innerWidth ? (a = window.innerWidth, b = window.innerHeight) :
            d.clientWidth || d.clientHeight ? (a = d.clientWidth, b = d.clientHeight) : c.clientWidth || c.clientHeight ? (a = c.clientWidth, b = c.clientHeight) : this.showMessage(this.getResource("z286"));
        return new this.Point(a, b)
    },
    Button: function(a, b, d, c, e, h, r, q, z, u, N, l, t, m, H, K, p, X, rb, gb) {
        a = Z.Utils.createContainerElement("span", a, "inline-block", "absolute", "hidden", r, q, z, u, m, H, K, p, X, rb, gb);
        if (Z.Utils.stringValidate(b)) {
            var Va = document.createTextNode(b);
            a.appendChild(Z.Utils.createCenteredElement(Va));
            Z.Utils.setTextNodeStyle(Va,
                "black", "verdana", "13px", "none", "normal", "normal", "normal", "normal", "1em", "center", "none")
        } else {
            d = Z.Utils.stringRemoveTrailingSlashCharacters(d);
            var ta = Z.Utils.createGraphicElement(d + "/" + c),
                Y = Z.Utils.createGraphicElement(d + "/" + e),
                va = Z.Utils.createGraphicElement(d + "/" + h);
            ta.style.width = Y.style.width = va.style.width = r;
            ta.style.height = Y.style.height = va.style.height = q;
            ta.style.position = Y.style.position = va.style.position = "absolute";
            Z.browser == Z.browsers.FIREFOX && 3 > Z.browserVersion && (ta.style.top = Y.style.top =
                va.style.top = "");
            Y.style.visibility = va.style.visibility = "hidden";
            ta.alt = Y.alt = va.alt = "";
            "undefined" !== typeof t && Z.Utils.stringValidate(t) && (ta.alt = Z.Utils.getResource(t));
            a.appendChild(ta);
            a.appendChild(Y);
            a.appendChild(va)
        }
        Z.Utils.addEventListener(a, "mousedown", Z.Utils.preventDefault);
        Z.Utils.addEventListener(a, "mouseover", Z.Utils.stopPropagation);
        Z.Utils.addEventListener(a, "mousedown", Z.Utils.stopPropagation);
        Z.Utils.addEventListener(a, "mouseup", Z.Utils.stopPropagation);
        Z.Utils.addEventListener(a,
            "mouseout", Z.Utils.stopPropagation);
        "undefined" !== typeof imageUp && (Z.Utils.addEventListener(ta, "contextmenu", Z.Utils.preventDefault), Z.Utils.addEventListener(Y, "contextmenu", Z.Utils.preventDefault), Z.Utils.addEventListener(va, "contextmenu", Z.Utils.preventDefault));
        Z.Utils.addEventListener(a, "touchstart", Z.Utils.preventDefault);
        Z.Utils.addEventListener(a, "touchend", Z.Utils.preventDefault);
        Z.Utils.addEventListener(a, "touchcancel", Z.Utils.preventDefault);
        Z.Utils.stringValidate(b) || (Z.Utils.disableTextInteraction(Va),
            Z.Utils.addEventListener(a, "contextmenu", Z.Utils.preventDefault));
        Z.tooltipsVisible && Z.Utils.stringValidate(t) && (a.title = Z.Utils.getResource(t));
        Z.Utils.setButtonHandler(a, N, l);
        this.elmt = a
    },
    buttonSize: function(a, b, d) { var c = a.style;
        c.width = b + "px";
        c.height = d + "px";
        d = a.firstChild;
        c = a.childNodes[1];
        a = a.childNodes[2];
        d && c && a && (d.style.width = c.style.width = a.style.width = b + "px", d.style.height = c.style.height = a.style.height = b + "px") },
    setButtonDefaults: function(a) {
        Z.Utils.clearButtonSettings(a);
        Z.Utils.setButtonState(a,
            "up");
        Z.Utils.setButtonHandler(a, "mouseover", Z.Toolbar.z457)
    },
    clearButtonSettings: function(a) {
        var b = a.firstChild,
            d = a.childNodes[1],
            c = a.childNodes[2];
        b && d && c && (b.style.visibility = d.style.visibility = c.style.visibility = "hidden", Z.Utils.removeEventListener(b, "mouseover", Z.Toolbar.z457), Z.Utils.removeEventListener(d, "mousedown", Z.Toolbar.z457), Z.Utils.removeEventListener(d, "mouseout", Z.Toolbar.z457), Z.Utils.removeEventListener(c, "mouseup", Z.Toolbar.z457), Z.Utils.removeEventListener(a, "touchstart", Z.Toolbar.z457),
            Z.Utils.removeEventListener(a, "touchend", Z.Toolbar.z457), Z.Utils.removeEventListener(a, "touchcancel", Z.Toolbar.z457));
        Z.Utils.removeEventListener(a, "mouseover", Z.Toolbar.z457);
        Z.Utils.removeEventListener(a, "mousedown", Z.Toolbar.z457);
        Z.Utils.removeEventListener(a, "mouseout", Z.Toolbar.z457);
        Z.Utils.removeEventListener(a, "mouseup", Z.Toolbar.z457)
    },
    setButtonState: function(a, b) { var d = "up" == b ? a.firstChild : "down" == b ? a.childNodes[1] : a.childNodes[2];
        d && (d.style.visibility = "visible") },
    setButtonHandler: function(a,
        b, d) { d = "undefined" !== d ? d : Z.Toolbar.z457; var c = "undefined" !== b ? b : "mouseover"; if ("mouseover" == b && "undefined" !== typeof a.firstChild) a = a.firstChild;
        else if ("mousedown" != b || "undefined" === typeof a.childNodes[1]) "mouseup" == b && "undefined" !== typeof a.childNodes[2] ? a = a.childNodes[2] : "mouseout" == b && "undefined" !== typeof a.childNodes[1] && (a = a.childNodes[1]);
        Z.Utils.addEventListener(a, "mousedown" == b ? "touchstart" : "touchend", d);
        Z.Utils.addEventListener(a, c, d) },
    createGraphicElement: function(a) {
        var b = this.createContainerElement("img"),
            d = null;
        Z.browser == Z.browsers.IE && 7 > Z.browserVersion ? (d = this.createContainerElement("span", null, "inline-block"), b.onload = function() { d.style.width = d.style.width || b.width + "px";
            d.style.height = d.style.height || b.height + "px";
            b = b.onload = null }, d.style.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + a + '", sizingMethod="scale")') : (d = b, d.src = a);
        return d
    },
    Point: function(a, b) { this.x = "number" === typeof a ? a : 0;
        this.y = "number" === typeof b ? b : 0 },
    Point3D: function(a, b, d) {
        this.x = "number" === typeof a ? a : 0;
        this.y = "number" === typeof b ? b : 0;
        this.z = "number" === typeof d ? d : 0
    },
    stringValidate: function(a) { return "undefined" !== typeof a && null !== a && "" !== a && "null" !== a },
    stringRemoveTrailingSlashCharacters: function(a) { return "/" == a.slice(-1, a.length) ? a.slice(0, a.length - 1) : a },
    setTextNodeStyle: function(a, b, d, c, e, h, r, q, z, u, N, l) { a = a.parentNode.style;
        a.color = b;
        a.fontFamily = d;
        a.fontSize = c;
        a.fontSizeAdjust = e;
        a.fontStyle = h;
        a.fontStretch = r;
        a.fontVariant = q;
        a.fontWeight = z;
        a.lineHeight = u;
        a.textAlign = N;
        a.textDecoration = l },
    arrayClear: function(a) {
        if (a)
            for (; 0 <
                a.length;) a.pop()
    },
    arrayIndexOf: function(a, b, d) { d ? 0 > d && (d = Math.max(0, a.length + d)) : d = 0; for (var c = a.length; d < c; d++)
            if (a[d] === b) return d;
        return -1 },
    arrayIndexOfObjectValue: function(a, b, d, c) { if ("undefined" !== typeof a) { c ? 0 > c && (c = Math.max(0, a.length + c)) : c = 0; for (var e = a.length; c < e; c++)
                if (a[c][b] === d) return c } return -1 },
    arrayIndexOfObjectTwoValues: function(a, b, d, c, e, h) { if ("undefined" !== typeof a) { c ? 0 > c && (c = Math.max(0, a.length + c)) : c = 0; for (var r = a.length; c < r; c++)
                if (a[c][b] === d && a[c][e].toString() === h.toString()) return c } return -1 },
    arraySplice: function(a, b, d) { if (Z.arraySpliceSupported)
            if (3 < arguments.length)
                for (var c = 3, e = arguments.length; c < e; c++) a.splice(b, d, arguments[c]);
            else a.splice(b, d);
        else { 0 > d && (d = 0); var h = []; if (3 < arguments.length)
                for (c = 3, e = arguments.length; c < e; c++) h[h.length] = arguments[c]; for (var c = Z.Utils.arraySubarray(a, 0, b), r = Z.Utils.arraySubarrayLen(a, b, d), e = Z.Utils.arraySubarray(a, b + d), h = c.concat(h, e), c = a.length = 0, e = h.length; c < e; c++) a[a.length] = h[c];
            a = r } return a },
    arraySubarray: function(a, b, d) {
        0 > b && (b = 0);
        if (!d || d >
            a.length) d = a.length;
        if (b == d) return [];
        for (var c = []; b < d; b++) c[c.length] = a[b];
        return c
    },
    arraySubarrayLen: function(a, b, d) { if (b >= a.length || d && 0 >= d) return [];
        0 > b && (b = Math.abs(b) > a.length ? 0 : a.length + b); if (!d || d + b > a.length) d = a.length - b; for (var c = [], e = b; e < b + d; e++) c[c.length] = a[e]; return c },
    arrayUnique: function(a) { for (var b = 1; b < a.length;) a[b - 1] == a[b] ? a = Z.Utils.arraySplice(a, b, 1) : b++; return a },
    calculatePointsDistance: function(a, b, d, c) { return Math.sqrt((a -= d) * a + (b -= c) * b) },
    cacheProofPath: function(a) {
        a += "?t" + (new Date).getTime().toString() +
            "n" + Z.cacheProofCounter.toString();
        Z.cacheProofCounter += 1;
        return a
    },
    easing: function(a, b, d, c, e) { if ("undefined" === typeof e || null === e) e = Z.smoothZoomEasing; var h = b; if (Z.smoothZoom && 1 < e) switch (e) {
            case 2:
                d /= c, d--, h = (b - a) * (d * d * d * d * d + 1) + a }
        return h },
    functionCallWithDelay: function(a, b) { window.setTimeout(a, b) },
    nodeIsInViewer: function(a) { for (var b = !1; 0 == b;)
            if (a) a.id ? "ViewerDisplay" == a.id ? b = !0 : a = a.parentNode : a = a.parentNode;
            else break;
        return b },
    roundToFixed: function(a, b) {
        var d = b - Math.round(a).toString().length,
            d = Math.pow(10, 0 > d ? 0 : d);
        return a = Math.round(a * d) / d
    },
    configureMessageDisplay: function() {
        var a = parseInt(this.getResource("z437"), 10),
            b = parseInt(this.getResource("z436"), 10),
            d = Z.Utils.getMessageDisplayCoords("6", a, Z.viewerW, Z.viewerH),
            c = this.getResource("z159"),
            e = this.getResource("z158");
        Z.MessageDisplay = this.createContainerElement("div", "MessageDisplay", "inline-block", "absolute", "auto", a + "px", b + "px", d.x + "px", d.y + "px", "solid", "1px", c, "0px", "0px", "normal", null, !0);
        Z.ViewerDisplay.appendChild(Z.MessageDisplay);
        Z.MessageDisplay.style.zIndex = (Z.baseZIndex + 30).toString();
        d = Z.Utils.createTextElement("messageBox", "", a - 18 + "px", b - 40 + "px", "4px", "4px", "4px", "solid", "1px", !0, "verdana", "12px", "none", null, 1, "auto", "auto", null);
        Z.MessageDisplay.appendChild(d);
        Z.messages = document.getElementById("messageBox");
        b = b - 18 - 5;
        a -= 66;
        d = this.getResource("z438");
        e = new Z.Utils.Button("buttonMessageOk", d, null, null, null, null, "56px", "18px", a + "px", b + "px", "mousedown", this.messageOkButtonHandler, "z362", "solid", "1px", e, "0px", "0px");
        Z.MessageDisplay.appendChild(e.elmt)
    },
    getMessageDisplayCoords: function(a, b, d, c) { return new Z.Utils.Point(40, c - 120) },
    messageOkButtonHandler: function(a) { Z.Utils.hideMessage(); return !0 },
    messageCancelButtonHandler: function(a) { Z.Utils.hideMessage(); return !1 },
    showMessage: function(a, b, d, c, e, h) {
        if (Z.messagesVisible) {
            Z.MessageDisplay || Z.Utils.configureMessageDisplay();
            if ("undefined" === typeof h || null === h) h = "6";
            var r = parseInt(this.getResource("z437"), 10);
            h = Z.Utils.getMessageDisplayCoords(h, r, Z.viewerW, Z.viewerH);
            Z.MessageDisplay.style.left = h.x +
                "px";
            Z.MessageDisplay.style.top = h.y + "px";
            Z.MessageDisplay.messageTimer && window.clearTimeout(MessageDisplay.messageTimer);
            h = !0;
            e && (-1 != Z.Utils.arrayIndexOf(Z.messageDisplayList, a) ? h = !1 : Z.messageDisplayList[Z.messageDisplayList.length] = a);
            if (h && (Z.messages && (Z.messages.value = a), Z.MessageDisplay.style.display = "inline-block", "undefined" !== typeof c && null !== c && (a = document.getElementById("textBoxFor-messageBox")) && (a.firstChild.style.textAlign = c), c = document.getElementById("buttonMessageOk"), a = parseInt(this.getResource("z436"),
                    10), "undefined" !== typeof b && null !== b && b ? (c.style.display = "inline-block", Z.MessageDisplay.style.height = a + "px") : (c.style.display = "none", Z.MessageDisplay.style.height = a - 22 + "px"), "undefined" !== typeof d && null !== d && !isNaN(d))) { "undefined" !== typeof Z.MessageDisplay.messageTimer && null !== Z.MessageDisplay.messageTimer && window.clearTimeout(Z.MessageDisplay.messageTimer); if ("undefined" === typeof d || null === d) d = 3E3;
                Z.MessageDisplay.messageTimer = window.setTimeout(Z.Utils.hideMessageTimerHandler, d) }
        }
    },
    getMessage: function() {
        var a =
            "";
        Z.messages && Z.Utils.stringValidate(Z.messages.value) && (a = Z.messages.value);
        return a
    },
    hideMessage: function() { Z.MessageDisplay && (Z.MessageDisplay.style.display = "none") },
    hideMessageTimerHandler: function() { Z.MessageDisplay.messageTimer && (window.clearTimeout(Z.MessageDisplay.messageTimer), Z.MessageDisplay.messageTimer = null);
        Z.Utils.hideMessage() }
};