// Recovered from the user-selected interface. Account persistence is injected; no shared browser plan.
export function mountPlanner(element, customerStorage) {
  var Mv = Object.create;
  var Ts = Object.defineProperty;
  var Pv = Object.getOwnPropertyDescriptor;
  var Dv = Object.getOwnPropertyNames;
  var Rv = Object.getPrototypeOf,
    Uv = Object.prototype.hasOwnProperty;
  var Qa = (e, a) => () => (
      a || e((a = { exports: {} }).exports, a),
      a.exports
    ),
    Oa = (e, a) => {
      for (var t in a) Ts(e, t, { get: a[t], enumerable: !0 });
    },
    zv = (e, a, t, l) => {
      if ((a && typeof a == "object") || typeof a == "function")
        for (let n of Dv(a))
          !Uv.call(e, n) &&
            n !== t &&
            Ts(e, n, {
              get: () => a[n],
              enumerable: !(l = Pv(a, n)) || l.enumerable,
            });
      return e;
    };
  var it = (e, a, t) => (
    (t = e != null ? Mv(Rv(e)) : {}),
    zv(
      a || !e || !e.__esModule
        ? Ts(t, "default", { value: e, enumerable: !0 })
        : t,
      e,
    )
  );
  var qf = Qa((z) => {
    "use strict";
    var qs = Symbol.for("react.transitional.element"),
      Nv = Symbol.for("react.portal"),
      Hv = Symbol.for("react.fragment"),
      Ev = Symbol.for("react.strict_mode"),
      Kv = Symbol.for("react.profiler"),
      Gv = Symbol.for("react.consumer"),
      Fv = Symbol.for("react.context"),
      Qv = Symbol.for("react.forward_ref"),
      Vv = Symbol.for("react.suspense"),
      Zv = Symbol.for("react.memo"),
      Lf = Symbol.for("react.lazy"),
      jv = Symbol.for("react.activity"),
      Yv = Symbol.for("react.view_transition"),
      vf = Symbol.iterator;
    function Jv(e) {
      return e === null || typeof e != "object"
        ? null
        : ((e = (vf && e[vf]) || e["@@iterator"]),
          typeof e == "function" ? e : null);
    }
    var Sf = {
        isMounted: function () {
          return !1;
        },
        enqueueForceUpdate: function () {},
        enqueueReplaceState: function () {},
        enqueueSetState: function () {},
      },
      xf = Object.assign,
      If = {};
    function Gl(e, a, t) {
      ((this.props = e),
        (this.context = a),
        (this.refs = If),
        (this.updater = t || Sf));
    }
    Gl.prototype.isReactComponent = {};
    Gl.prototype.setState = function (e, a) {
      if (typeof e != "object" && typeof e != "function" && e != null)
        throw Error(
          "takes an object of state variables to update or a function which returns an object of state variables.",
        );
      this.updater.enqueueSetState(this, e, a, "setState");
    };
    Gl.prototype.forceUpdate = function (e) {
      this.updater.enqueueForceUpdate(this, e, "forceUpdate");
    };
    function kf() {}
    kf.prototype = Gl.prototype;
    function Os(e, a, t) {
      ((this.props = e),
        (this.context = a),
        (this.refs = If),
        (this.updater = t || Sf));
    }
    var Ms = (Os.prototype = new kf());
    Ms.constructor = Os;
    xf(Ms, Gl.prototype);
    Ms.isPureReactComponent = !0;
    var yf = Array.isArray;
    function Bs() {}
    var re = { H: null, A: null, T: null, S: null },
      Tf = Object.prototype.hasOwnProperty;
    function Ps(e, a, t) {
      var l = t.ref;
      return {
        $$typeof: qs,
        type: e,
        key: a,
        ref: l !== void 0 ? l : null,
        props: t,
      };
    }
    function Xv(e, a) {
      return Ps(e.type, a, e.props);
    }
    function Ds(e) {
      return typeof e == "object" && e !== null && e.$$typeof === qs;
    }
    function Wv(e) {
      var a = { "=": "=0", ":": "=2" };
      return (
        "$" +
        e.replace(/[=:]/g, function (t) {
          return a[t];
        })
      );
    }
    var Cf = /\/+/g;
    function ws(e, a) {
      return typeof e == "object" && e !== null && e.key != null
        ? Wv("" + e.key)
        : a.toString(36);
    }
    function _v(e) {
      switch (e.status) {
        case "fulfilled":
          return e.value;
        case "rejected":
          throw e.reason;
        default:
          switch (
            (typeof e.status == "string"
              ? e.then(Bs, Bs)
              : ((e.status = "pending"),
                e.then(
                  function (a) {
                    e.status === "pending" &&
                      ((e.status = "fulfilled"), (e.value = a));
                  },
                  function (a) {
                    e.status === "pending" &&
                      ((e.status = "rejected"), (e.reason = a));
                  },
                )),
            e.status)
          ) {
            case "fulfilled":
              return e.value;
            case "rejected":
              throw e.reason;
          }
      }
      throw e;
    }
    function Kl(e, a, t, l, n) {
      var u = typeof e;
      (u === "undefined" || u === "boolean") && (e = null);
      var r = !1;
      if (e === null) r = !0;
      else
        switch (u) {
          case "bigint":
          case "string":
          case "number":
            r = !0;
            break;
          case "object":
            switch (e.$$typeof) {
              case qs:
              case Nv:
                r = !0;
                break;
              case Lf:
                return ((r = e._init), Kl(r(e._payload), a, t, l, n));
            }
        }
      if (r)
        return (
          (n = n(e)),
          (r = l === "" ? "." + ws(e, 0) : l),
          yf(n)
            ? ((t = ""),
              r != null && (t = r.replace(Cf, "$&/") + "/"),
              Kl(n, a, t, "", function (d) {
                return d;
              }))
            : n != null &&
              (Ds(n) &&
                (n = Xv(
                  n,
                  t +
                    (n.key == null || (e && e.key === n.key)
                      ? ""
                      : ("" + n.key).replace(Cf, "$&/") + "/") +
                    r,
                )),
              a.push(n)),
          1
        );
      r = 0;
      var s = l === "" ? "." : l + ":";
      if (yf(e))
        for (var o = 0; o < e.length; o++)
          ((l = e[o]), (u = s + ws(l, o)), (r += Kl(l, a, t, u, n)));
      else if (((o = Jv(e)), typeof o == "function"))
        for (e = o.call(e), o = 0; !(l = e.next()).done; )
          ((l = l.value), (u = s + ws(l, o++)), (r += Kl(l, a, t, u, n)));
      else if (u === "object") {
        if (typeof e.then == "function") return Kl(_v(e), a, t, l, n);
        throw (
          (a = String(e)),
          Error(
            "Objects are not valid as a React child (found: " +
              (a === "[object Object]"
                ? "object with keys {" + Object.keys(e).join(", ") + "}"
                : a) +
              "). If you meant to render a collection of children, use an array instead.",
          )
        );
      }
      return r;
    }
    function Ar(e, a, t) {
      if (e == null) return e;
      var l = [],
        n = 0;
      return (
        Kl(e, l, "", "", function (u) {
          return a.call(t, u, n++);
        }),
        l
      );
    }
    function $v(e) {
      if (e._status === -1) {
        var a = e._result,
          t = a();
        (t.then(
          function (l) {
            (e._status === 0 || e._status === -1) &&
              ((e._status = 1),
              (e._result = l),
              t.status === void 0 && ((t.status = "fulfilled"), (t.value = l)));
          },
          function (l) {
            (e._status === 0 || e._status === -1) &&
              ((e._status = 2),
              (e._result = l),
              t.status === void 0 && ((t.status = "rejected"), (t.reason = l)));
          },
        ),
          e._status === -1 && ((e._status = 0), (e._result = t)));
      }
      if (e._status === 1) return e._result.default;
      throw e._result;
    }
    var Af =
      typeof reportError == "function"
        ? reportError
        : function (e) {
            if (
              typeof window == "object" &&
              typeof window.ErrorEvent == "function"
            ) {
              var a = new window.ErrorEvent("error", {
                bubbles: !0,
                cancelable: !0,
                message:
                  typeof e == "object" &&
                  e !== null &&
                  typeof e.message == "string"
                    ? String(e.message)
                    : String(e),
                error: e,
              });
              if (!window.dispatchEvent(a)) return;
            } else if (
              typeof process == "object" &&
              typeof process.emit == "function"
            ) {
              process.emit("uncaughtException", e);
              return;
            }
            console.error(e);
          };
    function wf(e) {
      var a = re.T,
        t = {};
      ((t.types = a !== null ? a.types : null), (re.T = t));
      try {
        var l = e(),
          n = re.S;
        (n !== null && n(t, l),
          typeof l == "object" &&
            l !== null &&
            typeof l.then == "function" &&
            l.then(Bs, Af));
      } catch (u) {
        Af(u);
      } finally {
        (a !== null && t.types !== null && (a.types = t.types), (re.T = a));
      }
    }
    function Bf(e) {
      var a = re.T;
      if (a !== null) {
        var t = a.types;
        t === null ? (a.types = [e]) : t.indexOf(e) === -1 && t.push(e);
      } else wf(Bf.bind(null, e));
    }
    var ey = {
      map: Ar,
      forEach: function (e, a, t) {
        Ar(
          e,
          function () {
            a.apply(this, arguments);
          },
          t,
        );
      },
      count: function (e) {
        var a = 0;
        return (
          Ar(e, function () {
            a++;
          }),
          a
        );
      },
      toArray: function (e) {
        return (
          Ar(e, function (a) {
            return a;
          }) || []
        );
      },
      only: function (e) {
        if (!Ds(e))
          throw Error(
            "React.Children.only expected to receive a single React element child.",
          );
        return e;
      },
    };
    z.Activity = jv;
    z.Children = ey;
    z.Component = Gl;
    z.Fragment = Hv;
    z.Profiler = Kv;
    z.PureComponent = Os;
    z.StrictMode = Ev;
    z.Suspense = Vv;
    z.ViewTransition = Yv;
    z.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = re;
    z.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function (e) {
        return re.H.useMemoCache(e);
      },
    };
    z.addTransitionType = Bf;
    z.cache = function (e) {
      return function () {
        return e.apply(null, arguments);
      };
    };
    z.cacheSignal = function () {
      return null;
    };
    z.cloneElement = function (e, a, t) {
      if (e == null)
        throw Error(
          "The argument must be a React element, but you passed " + e + ".",
        );
      var l = xf({}, e.props),
        n = e.key;
      if (a != null)
        for (u in (a.key !== void 0 && (n = "" + a.key), a))
          !Tf.call(a, u) ||
            u === "key" ||
            u === "__self" ||
            u === "__source" ||
            (u === "ref" && a.ref === void 0) ||
            (l[u] = a[u]);
      var u = arguments.length - 2;
      if (u === 1) l.children = t;
      else if (1 < u) {
        for (var r = Array(u), s = 0; s < u; s++) r[s] = arguments[s + 2];
        l.children = r;
      }
      return Ps(e.type, n, l);
    };
    z.createContext = function (e) {
      return (
        (e = {
          $$typeof: Fv,
          _currentValue: e,
          _currentValue2: e,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
        }),
        (e.Provider = e),
        (e.Consumer = { $$typeof: Gv, _context: e }),
        e
      );
    };
    z.createElement = function (e, a, t) {
      var l,
        n = {},
        u = null;
      if (a != null)
        for (l in (a.key !== void 0 && (u = "" + a.key), a))
          Tf.call(a, l) &&
            l !== "key" &&
            l !== "__self" &&
            l !== "__source" &&
            (n[l] = a[l]);
      var r = arguments.length - 2;
      if (r === 1) n.children = t;
      else if (1 < r) {
        for (var s = Array(r), o = 0; o < r; o++) s[o] = arguments[o + 2];
        n.children = s;
      }
      if (e && e.defaultProps)
        for (l in ((r = e.defaultProps), r)) n[l] === void 0 && (n[l] = r[l]);
      return Ps(e, u, n);
    };
    z.createRef = function () {
      return { current: null };
    };
    z.forwardRef = function (e) {
      return { $$typeof: Qv, render: e };
    };
    z.isValidElement = Ds;
    z.lazy = function (e) {
      return { $$typeof: Lf, _payload: { _status: -1, _result: e }, _init: $v };
    };
    z.memo = function (e, a) {
      return { $$typeof: Zv, type: e, compare: a === void 0 ? null : a };
    };
    z.startTransition = wf;
    z.unstable_useCacheRefresh = function () {
      return re.H.useCacheRefresh();
    };
    z.use = function (e) {
      return re.H.use(e);
    };
    z.useActionState = function (e, a, t) {
      return re.H.useActionState(e, a, t);
    };
    z.useCallback = function (e, a) {
      return re.H.useCallback(e, a);
    };
    z.useContext = function (e) {
      return re.H.useContext(e);
    };
    z.useDebugValue = function () {};
    z.useDeferredValue = function (e, a) {
      return re.H.useDeferredValue(e, a);
    };
    z.useEffect = function (e, a) {
      return re.H.useEffect(e, a);
    };
    z.useEffectEvent = function (e) {
      return re.H.useEffectEvent(e);
    };
    z.useId = function () {
      return re.H.useId();
    };
    z.useImperativeHandle = function (e, a, t) {
      return re.H.useImperativeHandle(e, a, t);
    };
    z.useInsertionEffect = function (e, a) {
      return re.H.useInsertionEffect(e, a);
    };
    z.useLayoutEffect = function (e, a) {
      return re.H.useLayoutEffect(e, a);
    };
    z.useMemo = function (e, a) {
      return re.H.useMemo(e, a);
    };
    z.useOptimistic = function (e, a) {
      return re.H.useOptimistic(e, a);
    };
    z.useReducer = function (e, a, t) {
      return re.H.useReducer(e, a, t);
    };
    z.useRef = function (e) {
      return re.H.useRef(e);
    };
    z.useState = function (e) {
      return re.H.useState(e);
    };
    z.useSyncExternalStore = function (e, a, t) {
      return re.H.useSyncExternalStore(e, a, t);
    };
    z.useTransition = function () {
      return re.H.useTransition();
    };
    z.version = "19.3.0";
  });
  var cl = Qa((_L, Of) => {
    "use strict";
    Of.exports = qf();
  });
  var Kf = Qa((de) => {
    "use strict";
    function Ns(e, a) {
      var t = e.length;
      e.push(a);
      e: for (; 0 < t; ) {
        var l = (t - 1) >>> 1,
          n = e[l];
        if (0 < Lr(n, a)) ((e[l] = a), (e[t] = n), (t = l));
        else break e;
      }
    }
    function Va(e) {
      return e.length === 0 ? null : e[0];
    }
    function xr(e) {
      if (e.length === 0) return null;
      var a = e[0],
        t = e.pop();
      if (t !== a) {
        e[0] = t;
        e: for (var l = 0, n = e.length, u = n >>> 1; l < u; ) {
          var r = 2 * (l + 1) - 1,
            s = e[r],
            o = r + 1,
            d = e[o];
          if (0 > Lr(s, t))
            o < n && 0 > Lr(d, s)
              ? ((e[l] = d), (e[o] = t), (l = o))
              : ((e[l] = s), (e[r] = t), (l = r));
          else if (o < n && 0 > Lr(d, t)) ((e[l] = d), (e[o] = t), (l = o));
          else break e;
        }
      }
      return a;
    }
    function Lr(e, a) {
      var t = e.sortIndex - a.sortIndex;
      return t !== 0 ? t : e.id - a.id;
    }
    de.unstable_now = void 0;
    typeof performance == "object" && typeof performance.now == "function"
      ? ((Mf = performance),
        (de.unstable_now = function () {
          return Mf.now();
        }))
      : ((Rs = Date),
        (Pf = Rs.now()),
        (de.unstable_now = function () {
          return Rs.now() - Pf;
        }));
    var Mf,
      Rs,
      Pf,
      st = [],
      Tt = [],
      ay = 1,
      va = null,
      Ee = 3,
      Hs = !1,
      eu = !1,
      au = !1,
      Es = !1,
      Uf = typeof setTimeout == "function" ? setTimeout : null,
      zf = typeof clearTimeout == "function" ? clearTimeout : null,
      Df = typeof setImmediate < "u" ? setImmediate : null;
    function Sr(e) {
      for (var a = Va(Tt); a !== null; ) {
        if (a.callback === null) xr(Tt);
        else if (a.startTime <= e)
          (xr(Tt), (a.sortIndex = a.expirationTime), Ns(st, a));
        else break;
        a = Va(Tt);
      }
    }
    function Ks(e) {
      if (((au = !1), Sr(e), !eu))
        if (Va(st) !== null) ((eu = !0), Ql || ((Ql = !0), Fl()));
        else {
          var a = Va(Tt);
          a !== null && Gs(Ks, a.startTime - e);
        }
    }
    var Ql = !1,
      tu = -1,
      Nf = 5,
      Hf = -1;
    function Ef() {
      return Es ? !0 : !(de.unstable_now() - Hf < Nf);
    }
    function Us() {
      if (((Es = !1), Ql)) {
        var e = de.unstable_now();
        Hf = e;
        var a = !0;
        try {
          e: {
            ((eu = !1), au && ((au = !1), zf(tu), (tu = -1)), (Hs = !0));
            var t = Ee;
            try {
              a: {
                for (
                  Sr(e), va = Va(st);
                  va !== null && !(va.expirationTime > e && Ef());

                ) {
                  var l = va.callback;
                  if (typeof l == "function") {
                    ((va.callback = null), (Ee = va.priorityLevel));
                    var n = l(va.expirationTime <= e);
                    if (((e = de.unstable_now()), typeof n == "function")) {
                      ((va.callback = n), Sr(e), (a = !0));
                      break a;
                    }
                    (va === Va(st) && xr(st), Sr(e));
                  } else xr(st);
                  va = Va(st);
                }
                if (va !== null) a = !0;
                else {
                  var u = Va(Tt);
                  (u !== null && Gs(Ks, u.startTime - e), (a = !1));
                }
              }
              break e;
            } finally {
              ((va = null), (Ee = t), (Hs = !1));
            }
            a = void 0;
          }
        } finally {
          a ? Fl() : (Ql = !1);
        }
      }
    }
    var Fl;
    typeof Df == "function"
      ? (Fl = function () {
          Df(Us);
        })
      : typeof MessageChannel < "u"
        ? ((zs = new MessageChannel()),
          (Rf = zs.port2),
          (zs.port1.onmessage = Us),
          (Fl = function () {
            Rf.postMessage(null);
          }))
        : (Fl = function () {
            Uf(Us, 0);
          });
    var zs, Rf;
    function Gs(e, a) {
      tu = Uf(function () {
        e(de.unstable_now());
      }, a);
    }
    de.unstable_IdlePriority = 5;
    de.unstable_ImmediatePriority = 1;
    de.unstable_LowPriority = 4;
    de.unstable_NormalPriority = 3;
    de.unstable_Profiling = null;
    de.unstable_UserBlockingPriority = 2;
    de.unstable_cancelCallback = function (e) {
      e.callback = null;
    };
    de.unstable_forceFrameRate = function (e) {
      0 > e || 125 < e
        ? console.error(
            "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported",
          )
        : (Nf = 0 < e ? Math.floor(1e3 / e) : 5);
    };
    de.unstable_getCurrentPriorityLevel = function () {
      return Ee;
    };
    de.unstable_next = function (e) {
      switch (Ee) {
        case 1:
        case 2:
        case 3:
          var a = 3;
          break;
        default:
          a = Ee;
      }
      var t = Ee;
      Ee = a;
      try {
        return e();
      } finally {
        Ee = t;
      }
    };
    de.unstable_requestPaint = function () {
      Es = !0;
    };
    de.unstable_runWithPriority = function (e, a) {
      switch (e) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          e = 3;
      }
      var t = Ee;
      Ee = e;
      try {
        return a();
      } finally {
        Ee = t;
      }
    };
    de.unstable_scheduleCallback = function (e, a, t) {
      var l = de.unstable_now();
      switch (
        (typeof t == "object" && t !== null
          ? ((t = t.delay), (t = typeof t == "number" && 0 < t ? l + t : l))
          : (t = l),
        e)
      ) {
        case 1:
          var n = -1;
          break;
        case 2:
          n = 250;
          break;
        case 5:
          n = 1073741823;
          break;
        case 4:
          n = 1e4;
          break;
        default:
          n = 5e3;
      }
      return (
        (n = t + n),
        (e = {
          id: ay++,
          callback: a,
          priorityLevel: e,
          startTime: t,
          expirationTime: n,
          sortIndex: -1,
        }),
        t > l
          ? ((e.sortIndex = t),
            Ns(Tt, e),
            Va(st) === null &&
              e === Va(Tt) &&
              (au ? (zf(tu), (tu = -1)) : (au = !0), Gs(Ks, t - l)))
          : ((e.sortIndex = n),
            Ns(st, e),
            eu || Hs || ((eu = !0), Ql || ((Ql = !0), Fl()))),
        e
      );
    };
    de.unstable_shouldYield = Ef;
    de.unstable_wrapCallback = function (e) {
      var a = Ee;
      return function () {
        var t = Ee;
        Ee = a;
        try {
          return e.apply(this, arguments);
        } finally {
          Ee = t;
        }
      };
    };
  });
  var Ff = Qa((eS, Gf) => {
    "use strict";
    Gf.exports = Kf();
  });
  var Zf = Qa((Ke) => {
    "use strict";
    var ty = cl();
    function Vf(e) {
      var a = "https://react.dev/errors/" + e;
      if (1 < arguments.length) {
        a += "?args[]=" + encodeURIComponent(arguments[1]);
        for (var t = 2; t < arguments.length; t++)
          a += "&args[]=" + encodeURIComponent(arguments[t]);
      }
      return (
        "Minified React error #" +
        e +
        "; visit " +
        a +
        " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
      );
    }
    function wt() {}
    var Qe = {
        d: {
          f: wt,
          r: function () {
            throw Error(Vf(522));
          },
          D: wt,
          C: wt,
          L: wt,
          m: wt,
          X: wt,
          S: wt,
          M: wt,
        },
        p: 0,
        findDOMNode: null,
      },
      ly = Symbol.for("react.portal"),
      ny = Symbol.for("react.recoverable"),
      Qf = Symbol.for("react.optimistic_key");
    function uy(e, a, t) {
      var l =
        3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
      return {
        $$typeof: ly,
        key: l == null ? null : l === Qf ? Qf : "" + l,
        children: e,
        containerInfo: a,
        implementation: t,
      };
    }
    var lu = ty.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
    function Ir(e, a) {
      if (e === "font") return "";
      if (typeof a == "string") return a === "use-credentials" ? a : "";
    }
    Ke.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = Qe;
    Ke.browser = function (e) {
      return { $$typeof: ny, _reason: e };
    };
    Ke.createPortal = function (e, a) {
      var t =
        2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!a || (a.nodeType !== 1 && a.nodeType !== 9 && a.nodeType !== 11))
        throw Error(Vf(299));
      return uy(e, a, null, t);
    };
    Ke.flushSync = function (e) {
      var a = lu.T,
        t = Qe.p;
      try {
        if (((lu.T = null), (Qe.p = 2), e)) return e();
      } finally {
        ((lu.T = a), (Qe.p = t), Qe.d.f());
      }
    };
    Ke.preconnect = function (e, a) {
      typeof e == "string" &&
        (a
          ? ((a = a.crossOrigin),
            (a =
              typeof a == "string"
                ? a === "use-credentials"
                  ? a
                  : ""
                : void 0))
          : (a = null),
        Qe.d.C(e, a));
    };
    Ke.prefetchDNS = function (e) {
      typeof e == "string" && Qe.d.D(e);
    };
    Ke.preinit = function (e, a) {
      if (typeof e == "string" && a && typeof a.as == "string") {
        var t = a.as,
          l = Ir(t, a.crossOrigin),
          n = typeof a.integrity == "string" ? a.integrity : void 0,
          u = typeof a.fetchPriority == "string" ? a.fetchPriority : void 0;
        t === "style"
          ? Qe.d.S(e, typeof a.precedence == "string" ? a.precedence : void 0, {
              crossOrigin: l,
              integrity: n,
              fetchPriority: u,
            })
          : t === "script" &&
            Qe.d.X(e, {
              crossOrigin: l,
              integrity: n,
              fetchPriority: u,
              nonce: typeof a.nonce == "string" ? a.nonce : void 0,
            });
      }
    };
    Ke.preinitModule = function (e, a) {
      if (typeof e == "string")
        if (typeof a == "object" && a !== null) {
          if (a.as == null || a.as === "script") {
            var t = Ir(a.as, a.crossOrigin);
            Qe.d.M(e, {
              crossOrigin: t,
              integrity: typeof a.integrity == "string" ? a.integrity : void 0,
              nonce: typeof a.nonce == "string" ? a.nonce : void 0,
              fetchPriority:
                typeof a.fetchPriority == "string" ? a.fetchPriority : void 0,
            });
          }
        } else a == null && Qe.d.M(e);
    };
    Ke.preload = function (e, a) {
      if (
        typeof e == "string" &&
        typeof a == "object" &&
        a !== null &&
        typeof a.as == "string"
      ) {
        var t = a.as,
          l = Ir(t, a.crossOrigin);
        Qe.d.L(e, t, {
          crossOrigin: l,
          integrity: typeof a.integrity == "string" ? a.integrity : void 0,
          nonce: typeof a.nonce == "string" ? a.nonce : void 0,
          type: typeof a.type == "string" ? a.type : void 0,
          fetchPriority:
            typeof a.fetchPriority == "string" ? a.fetchPriority : void 0,
          referrerPolicy:
            typeof a.referrerPolicy == "string" ? a.referrerPolicy : void 0,
          imageSrcSet:
            typeof a.imageSrcSet == "string" ? a.imageSrcSet : void 0,
          imageSizes: typeof a.imageSizes == "string" ? a.imageSizes : void 0,
          media: typeof a.media == "string" ? a.media : void 0,
        });
      }
    };
    Ke.preloadModule = function (e, a) {
      if (typeof e == "string")
        if (a) {
          var t = Ir(a.as, a.crossOrigin);
          Qe.d.m(e, {
            as: typeof a.as == "string" && a.as !== "script" ? a.as : void 0,
            crossOrigin: t,
            integrity: typeof a.integrity == "string" ? a.integrity : void 0,
            nonce: typeof a.nonce == "string" ? a.nonce : void 0,
            fetchPriority:
              typeof a.fetchPriority == "string" ? a.fetchPriority : void 0,
          });
        } else Qe.d.m(e);
    };
    Ke.requestFormReset = function (e) {
      Qe.d.r(e);
    };
    Ke.unstable_batchedUpdates = function (e, a) {
      return e(a);
    };
    Ke.useFormState = function (e, a, t) {
      return lu.H.useFormState(e, a, t);
    };
    Ke.useFormStatus = function () {
      return lu.H.useHostTransitionStatus();
    };
    Ke.version = "19.3.0";
  });
  var Jf = Qa((tS, Yf) => {
    "use strict";
    function jf() {
      if (
        !(
          typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
          typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
        )
      )
        try {
          __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(jf);
        } catch (e) {
          console.error(e);
        }
    }
    (jf(), (Yf.exports = Zf()));
  });
  var Rb = Qa((rs) => {
    "use strict";
    var Le = Ff(),
      Dm = cl(),
      ry = Jf();
    function S(e) {
      var a = "https://react.dev/errors/" + e;
      if (1 < arguments.length) {
        a += "?args[]=" + encodeURIComponent(arguments[1]);
        for (var t = 2; t < arguments.length; t++)
          a += "&args[]=" + encodeURIComponent(arguments[t]);
      }
      return (
        "Minified React error #" +
        e +
        "; visit " +
        a +
        " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
      );
    }
    function Rm(e) {
      return !(
        !e ||
        (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11)
      );
    }
    function Qu(e) {
      for (var a = e, t = a; t && !t.alternate; )
        ((a = t), (a.flags & 4098) !== 0 && (e = a.return), (t = a.return));
      for (; a.return; ) a = a.return;
      return a.tag === 3 ? e : null;
    }
    function Um(e) {
      if (e.tag === 13) {
        var a = e.memoizedState;
        if (
          (a === null &&
            ((e = e.alternate), e !== null && (a = e.memoizedState)),
          a !== null)
        )
          return a.dehydrated;
      }
      return null;
    }
    function zm(e) {
      if (e.tag === 31) {
        var a = e.memoizedState;
        if (
          (a === null &&
            ((e = e.alternate), e !== null && (a = e.memoizedState)),
          a !== null)
        )
          return a.dehydrated;
      }
      return null;
    }
    function Xf(e) {
      if (Qu(e) !== e) throw Error(S(188));
    }
    function iy(e) {
      var a = e.alternate;
      if (!a) {
        if (((a = Qu(e)), a === null)) throw Error(S(188));
        return a !== e ? null : e;
      }
      for (var t = e, l = a; ; ) {
        var n = t.return;
        if (n === null) break;
        var u = n.alternate;
        if (u === null) {
          if (((l = n.return), l !== null)) {
            t = l;
            continue;
          }
          break;
        }
        if (n.child === u.child) {
          for (u = n.child; u; ) {
            if (u === t) return (Xf(n), e);
            if (u === l) return (Xf(n), a);
            u = u.sibling;
          }
          throw Error(S(188));
        }
        if (t.return !== l.return) ((t = n), (l = u));
        else {
          for (var r = !1, s = n.child; s; ) {
            if (s === t) {
              ((r = !0), (t = n), (l = u));
              break;
            }
            if (s === l) {
              ((r = !0), (l = n), (t = u));
              break;
            }
            s = s.sibling;
          }
          if (!r) {
            for (s = u.child; s; ) {
              if (s === t) {
                ((r = !0), (t = u), (l = n));
                break;
              }
              if (s === l) {
                ((r = !0), (l = u), (t = n));
                break;
              }
              s = s.sibling;
            }
            if (!r) throw Error(S(189));
          }
        }
        if (t.alternate !== l) throw Error(S(190));
      }
      if (t.tag !== 3) throw Error(S(188));
      return t.stateNode.current === t ? e : a;
    }
    function Nm(e) {
      var a = e.tag;
      if (a === 5 || a === 26 || a === 27 || a === 6) return e;
      for (e = e.child; e !== null; ) {
        if (((a = Nm(e)), a !== null)) return a;
        e = e.sibling;
      }
      return null;
    }
    function aa(e, a, t, l, n, u) {
      for (; e !== null; ) {
        if (
          ((e.tag === 5 || e.tag === 27 || e.tag === 6) && t(e, l, n, u)) ||
          ((e.tag !== 22 || e.memoizedState === null) &&
            (a || (e.tag !== 5 && e.tag !== 27)) &&
            aa(e.child, a, t, l, n, u))
        )
          return !0;
        e = e.sibling;
      }
      return !1;
    }
    function Ml(e) {
      for (e = e.return; e !== null; ) {
        if (e.tag === 3 || e.tag === 5 || e.tag === 27) return e;
        e = e.return;
      }
      return null;
    }
    function Wf(e) {
      var a = !1;
      for (
        e = e.return;
        e !== null &&
        (e.tag === 4 && (a = !0),
        !(e.tag === 3 || e.tag === 5 || e.tag === 27));

      )
        e = e.return;
      return a;
    }
    function Hm(e) {
      var a = [null, null],
        t = Ml(e);
      return (t === null || Em(a, e, t.child, { foundSelf: !1 }), a);
    }
    function Em(e, a, t, l) {
      for (; t !== null; ) {
        if (t === a) l.foundSelf = !0;
        else if (t.tag === 5 || t.tag === 27 || t.tag === 6) {
          if (l.foundSelf) return ((e[1] = t), !0);
          e[0] = t;
        } else if (
          (t.tag !== 22 || t.memoizedState === null) &&
          Em(e, a, t.child, l)
        )
          return !0;
        t = t.sibling;
      }
      return !1;
    }
    function Ae(e) {
      switch (e.tag) {
        case 5:
        case 27:
        case 6:
          return e.stateNode;
        case 3:
          return e.stateNode.containerInfo;
        default:
          throw Error(S(559));
      }
    }
    var Wl = null,
      Ao = null;
    function sy(e, a, t) {
      return e === t ? !0 : e === a ? ((Wl = e), !0) : !1;
    }
    function oy(e, a, t) {
      return e === t
        ? ((Ao = e), !1)
        : e === a
          ? (Ao !== null && (Wl = e), !0)
          : !1;
    }
    function _f(e) {
      if (e === null) return null;
      do e = e === null ? null : e.return;
      while (e && e.tag !== 5 && e.tag !== 27 && e.tag !== 3);
      return e || null;
    }
    function Lo(e, a, t) {
      for (var l = 0, n = e; n; n = t(n)) l++;
      n = 0;
      for (var u = a; u; u = t(u)) n++;
      for (; 0 < l - n; ) ((e = t(e)), l--);
      for (; 0 < n - l; ) ((a = t(a)), n--);
      for (; l--; ) {
        if (e === a || (a !== null && e === a.alternate)) return e;
        ((e = t(e)), (a = t(a)));
      }
      return null;
    }
    var ue = Object.assign,
      dy = Symbol.for("react.element"),
      kr = Symbol.for("react.transitional.element"),
      du = Symbol.for("react.portal"),
      _l = Symbol.for("react.fragment"),
      Km = Symbol.for("react.strict_mode"),
      So = Symbol.for("react.profiler"),
      Gm = Symbol.for("react.consumer"),
      Wa = Symbol.for("react.context"),
      Md = Symbol.for("react.forward_ref"),
      xo = Symbol.for("react.suspense"),
      Io = Symbol.for("react.suspense_list"),
      Pd = Symbol.for("react.memo"),
      Mt = Symbol.for("react.lazy");
    Symbol.for("react.scope");
    var ko = Symbol.for("react.activity"),
      cy = Symbol.for("react.legacy_hidden");
    Symbol.for("react.tracing_marker");
    var fy = Symbol.for("react.memo_cache_sentinel"),
      To = Symbol.for("react.view_transition"),
      py = Symbol.for("react.recoverable"),
      $f = Symbol.iterator;
    function nu(e) {
      return e === null || typeof e != "object"
        ? null
        : ((e = ($f && e[$f]) || e["@@iterator"]),
          typeof e == "function" ? e : null);
    }
    var my = Symbol.for("react.client.reference");
    function wo(e) {
      if (e == null) return null;
      if (typeof e == "function")
        return e.$$typeof === my ? null : e.displayName || e.name || null;
      if (typeof e == "string") return e;
      switch (e) {
        case _l:
          return "Fragment";
        case So:
          return "Profiler";
        case Km:
          return "StrictMode";
        case xo:
          return "Suspense";
        case Io:
          return "SuspenseList";
        case ko:
          return "Activity";
        case To:
          return "ViewTransition";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case du:
            return "Portal";
          case Wa:
            return e.displayName || "Context";
          case Gm:
            return (e._context.displayName || "Context") + ".Consumer";
          case Md:
            var a = e.render;
            return (
              (e = e.displayName),
              e ||
                ((e = a.displayName || a.name || ""),
                (e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
              e
            );
          case Pd:
            return (
              (a = e.displayName || null),
              a !== null ? a : wo(e.type) || "Memo"
            );
          case Mt:
            ((a = e._payload), (e = e._init));
            try {
              return wo(e(a));
            } catch {}
        }
      return null;
    }
    var cu = Array.isArray,
      R = Dm.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
      Y = ry.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
      yl = { pending: !1, data: null, method: null, action: null },
      Bo = [],
      $l = -1;
    function nt(e) {
      return { current: e };
    }
    function Pe(e) {
      0 > $l || ((e.current = Bo[$l]), (Bo[$l] = null), $l--);
    }
    function oe(e, a) {
      ($l++, (Bo[$l] = e.current), (e.current = a));
    }
    var at = nt(null),
      wu = nt(null),
      Kt = nt(null),
      fi = nt(null);
    function pi(e, a) {
      switch ((oe(Kt, a), oe(wu, e), oe(at, null), a.nodeType)) {
        case 9:
        case 11:
          e = (e = a.documentElement) && (e = e.namespaceURI) ? pm(e) : 0;
          break;
        default:
          if (((e = a.tagName), (a = a.namespaceURI)))
            ((a = pm(a)), (e = db(a, e)));
          else
            switch (e) {
              case "svg":
                e = 1;
                break;
              case "math":
                e = 2;
                break;
              default:
                e = 0;
            }
      }
      (Pe(at), oe(at, e));
    }
    function Cn() {
      (Pe(at), Pe(wu), Pe(Kt));
    }
    function qo(e) {
      var a = e.memoizedState;
      (a !== null && ((qn._currentValue = a.memoizedState), oe(fi, e)),
        (a = at.current));
      var t = db(a, e.type);
      a !== t && (oe(wu, e), oe(at, t));
    }
    function mi(e) {
      (wu.current === e && (Pe(at), Pe(wu)),
        fi.current === e && (Pe(fi), (qn._currentValue = yl)));
    }
    var Fs, ep;
    function qt(e) {
      if (Fs === void 0)
        try {
          throw Error();
        } catch (t) {
          var a = t.stack.trim().match(/\n( *(at )?)/);
          ((Fs = (a && a[1]) || ""),
            (ep =
              -1 <
              t.stack.indexOf(`
    at`)
                ? " (<anonymous>)"
                : -1 < t.stack.indexOf("@")
                  ? "@unknown:0:0"
                  : ""));
        }
      return (
        `
` +
        Fs +
        e +
        ep
      );
    }
    var Qs = !1;
    function Vs(e, a) {
      if (!e || Qs) return "";
      Qs = !0;
      var t = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      try {
        var l = {
          DetermineComponentFrameRoot: function () {
            try {
              if (a) {
                var p = function () {
                  throw Error();
                };
                if (
                  (Object.defineProperty(p.prototype, "props", {
                    set: function () {
                      throw Error();
                    },
                  }),
                  typeof Reflect == "object" && Reflect.construct)
                ) {
                  try {
                    Reflect.construct(p, []);
                  } catch (v) {
                    var f = v;
                  }
                  Reflect.construct(e, [], p);
                } else {
                  try {
                    p.call();
                  } catch (v) {
                    f = v;
                  }
                  p = !1;
                  try {
                    var m = Object.getOwnPropertyDescriptor(
                      e.prototype,
                      "props",
                    );
                    (Object.defineProperty(e.prototype, "props", {
                      configurable: !0,
                      set: function () {
                        throw Error();
                      },
                    }),
                      (p = !0),
                      new e());
                  } finally {
                    p &&
                      (m !== void 0
                        ? Object.defineProperty(e.prototype, "props", m)
                        : delete e.prototype.props);
                  }
                }
              } else {
                try {
                  throw Error();
                } catch (v) {
                  f = v;
                }
                (p = e()) &&
                  typeof p.catch == "function" &&
                  p.catch(function () {});
              }
            } catch (v) {
              if (v && f && typeof v.stack == "string")
                return [v.stack, f.stack];
            }
            return [null, null];
          },
        };
        l.DetermineComponentFrameRoot.displayName =
          "DetermineComponentFrameRoot";
        var n = Object.getOwnPropertyDescriptor(
          l.DetermineComponentFrameRoot,
          "name",
        );
        n &&
          n.configurable &&
          Object.defineProperty(l.DetermineComponentFrameRoot, "name", {
            value: "DetermineComponentFrameRoot",
          });
        var u = l.DetermineComponentFrameRoot(),
          r = u[0],
          s = u[1];
        if (r && s) {
          var o = r.split(`
`),
            d = s.split(`
`);
          for (
            n = l = 0;
            l < o.length && !o[l].includes("DetermineComponentFrameRoot");

          )
            l++;
          for (
            ;
            n < d.length && !d[n].includes("DetermineComponentFrameRoot");

          )
            n++;
          if (l === o.length || n === d.length)
            for (
              l = o.length - 1, n = d.length - 1;
              1 <= l && 0 <= n && o[l] !== d[n];

            )
              n--;
          for (; 1 <= l && 0 <= n; l--, n--)
            if (o[l] !== d[n]) {
              if (l !== 1 || n !== 1)
                do
                  if ((l--, n--, 0 > n || o[l] !== d[n])) {
                    var c =
                      `
` + o[l].replace(" at new ", " at ");
                    return (
                      e.displayName &&
                        c.includes("<anonymous>") &&
                        (c = c.replace("<anonymous>", e.displayName)),
                      c
                    );
                  }
                while (1 <= l && 0 <= n);
              break;
            }
        }
      } finally {
        ((Qs = !1), (Error.prepareStackTrace = t));
      }
      return (t = e ? e.displayName || e.name : "") ? qt(t) : "";
    }
    function gy(e, a) {
      switch (e.tag) {
        case 26:
        case 27:
        case 5:
          return qt(e.type);
        case 16:
          return qt("Lazy");
        case 13:
          return e.child !== a && a !== null
            ? qt("Suspense Fallback")
            : qt("Suspense");
        case 19:
          return qt("SuspenseList");
        case 0:
        case 15:
          return Vs(e.type, !1);
        case 11:
          return Vs(e.type.render, !1);
        case 1:
          return Vs(e.type, !0);
        case 31:
          return qt("Activity");
        case 30:
          return qt("ViewTransition");
        default:
          return "";
      }
    }
    function ap(e) {
      try {
        var a = "",
          t = null;
        do ((a += gy(e, t)), (t = e), (e = e.return));
        while (e);
        return a;
      } catch (l) {
        return (
          `
Error generating stack: ` +
          l.message +
          `
` +
          l.stack
        );
      }
    }
    var Oo = Object.prototype.hasOwnProperty,
      Dd = Le.unstable_scheduleCallback,
      Zs = Le.unstable_cancelCallback,
      hy = Le.unstable_shouldYield,
      by = Le.unstable_requestPaint,
      da = Le.unstable_now,
      vy = Le.unstable_getCurrentPriorityLevel,
      Fm = Le.unstable_ImmediatePriority,
      Qm = Le.unstable_UserBlockingPriority,
      gi = Le.unstable_NormalPriority,
      yy = Le.unstable_LowPriority,
      Vm = Le.unstable_IdlePriority,
      Cy = Le.log,
      Ay = Le.unstable_setDisableYieldValue,
      Vu = null,
      ca = null;
    function Rt(e) {
      if (
        (typeof Cy == "function" && Ay(e),
        ca && typeof ca.setStrictMode == "function")
      )
        try {
          ca.setStrictMode(Vu, e);
        } catch {}
    }
    var fa = Math.clz32 ? Math.clz32 : xy,
      Ly = Math.log,
      Sy = Math.LN2;
    function xy(e) {
      return ((e >>>= 0), e === 0 ? 32 : (31 - ((Ly(e) / Sy) | 0)) | 0);
    }
    var Tr = 256,
      wr = 262144,
      Br = 4194304;
    function ml(e) {
      var a = e & 42;
      if (a !== 0) return a;
      switch (e & -e) {
        case 1:
          return 1;
        case 2:
          return 2;
        case 4:
          return 4;
        case 8:
          return 8;
        case 16:
          return 16;
        case 32:
          return 32;
        case 64:
          return 64;
        case 128:
          return 128;
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
          return e & -e;
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
          return e & 3932160;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
          return e & 62914560;
        case 67108864:
          return 67108864;
        case 134217728:
          return 134217728;
        case 268435456:
          return 268435456;
        case 536870912:
          return 536870912;
        case 1073741824:
          return 0;
        default:
          return e;
      }
    }
    function Ki(e, a, t) {
      var l = e.pendingLanes;
      if (l === 0) return 0;
      var n = 0,
        u = e.suspendedLanes,
        r = e.pingedLanes;
      e = e.warmLanes;
      var s = l & 134217727;
      return (
        s !== 0
          ? ((l = s & ~u),
            l !== 0
              ? (n = ml(l))
              : ((r &= s),
                r !== 0
                  ? (n = ml(r))
                  : t || ((t = s & ~e), t !== 0 && (n = ml(t)))))
          : ((s = l & ~u),
            s !== 0
              ? (n = ml(s))
              : r !== 0
                ? (n = ml(r))
                : t || ((t = l & ~e), t !== 0 && (n = ml(t)))),
        n === 0
          ? 0
          : a !== 0 &&
              a !== n &&
              (a & u) === 0 &&
              ((u = n & -n),
              (t = a & -a),
              u >= t || (u === 32 && (t & 4194048) !== 0))
            ? a
            : n
      );
    }
    function Zu(e, a) {
      return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & a) === 0;
    }
    function Zm(e, a) {
      (a & 8) !== 0 && (a |= a & 32);
      var t = e.entangledLanes;
      if (t !== 0)
        for (e = e.entanglements, t &= a; 0 < t; ) {
          var l = 31 - fa(t),
            n = 1 << l;
          ((a |= e[l]), (t &= ~n));
        }
      return a;
    }
    function Iy(e, a) {
      switch (e) {
        case 1:
        case 2:
        case 4:
        case 8:
        case 64:
          return a + 250;
        case 16:
        case 32:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
          return a + 5e3;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
          return -1;
        case 67108864:
        case 134217728:
        case 268435456:
        case 536870912:
        case 1073741824:
          return -1;
        default:
          return -1;
      }
    }
    function jm() {
      var e = Br;
      return ((Br <<= 1), (Br & 62914560) === 0 && (Br = 4194304), e);
    }
    function js(e) {
      for (var a = [], t = 0; 31 > t; t++) a.push(e);
      return a;
    }
    function ju(e, a) {
      ((e.pendingLanes |= a),
        a !== 268435456 &&
          ((e.suspendedLanes = 0), (e.pingedLanes = 0), (e.warmLanes = 0)));
    }
    function ky(e, a, t, l, n, u) {
      var r = e.pendingLanes;
      ((e.pendingLanes = t),
        (e.suspendedLanes = 0),
        (e.pingedLanes = 0),
        (e.warmLanes = 0),
        (e.expiredLanes &= t),
        (e.entangledLanes &= t),
        (e.errorRecoveryDisabledLanes &= t),
        (e.shellSuspendCounter = 0));
      var s = e.entanglements,
        o = e.expirationTimes,
        d = e.hiddenUpdates;
      for (t = r & ~t; 0 < t; ) {
        var c = 31 - fa(t),
          p = 1 << c;
        ((s[c] = 0), (o[c] = -1));
        var f = d[c];
        if (f !== null)
          for (d[c] = null, c = 0; c < f.length; c++) {
            var m = f[c];
            m !== null && (m.lane &= -536870913);
          }
        t &= ~p;
      }
      (l !== 0 && Ym(e, l, 0),
        u !== 0 &&
          n === 0 &&
          e.tag !== 0 &&
          (e.suspendedLanes |= u & ~(r & ~a)));
    }
    function Ym(e, a, t) {
      ((e.pendingLanes |= a), (e.suspendedLanes &= ~a));
      var l = 31 - fa(a);
      ((e.entangledLanes |= a),
        (e.entanglements[l] = e.entanglements[l] | 1073741824 | (t & 261930)));
    }
    function Jm(e, a) {
      var t = (e.entangledLanes |= a);
      for (e = e.entanglements; t; ) {
        var l = 31 - fa(t),
          n = 1 << l;
        ((n & a) | (e[l] & a) && (e[l] |= a), (t &= ~n));
      }
    }
    function Xm(e, a) {
      var t = a & -a;
      return (
        (t = (t & 42) !== 0 ? 1 : Rd(t)),
        (t & (e.suspendedLanes | a)) !== 0 ? 0 : t
      );
    }
    function Rd(e) {
      switch (e) {
        case 2:
          e = 1;
          break;
        case 8:
          e = 4;
          break;
        case 32:
          e = 16;
          break;
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
          e = 128;
          break;
        case 268435456:
          e = 134217728;
          break;
        default:
          e = 0;
      }
      return e;
    }
    function Ud(e) {
      return (
        (e &= -e),
        2 < e ? (8 < e ? ((e & 134217727) !== 0 ? 32 : 268435456) : 8) : 2
      );
    }
    function Wm() {
      var e = Y.p;
      return e !== 0 ? e : ((e = window.event), e === void 0 ? 32 : Mb(e.type));
    }
    function tp(e, a) {
      var t = Y.p;
      try {
        return ((Y.p = e), a());
      } finally {
        Y.p = t;
      }
    }
    var At = Math.random().toString(36).slice(2),
      Oe = "__reactFiber$" + At,
      ta = "__reactProps$" + At,
      Pn = "__reactContainer$" + At,
      lp = "__reactEvents$" + At,
      Ty = "__reactListeners$" + At,
      wy = "__reactHandles$" + At,
      np = "__reactResources$" + At,
      Yu = "__reactMarker$" + At,
      hi = "__reactLoad$" + At;
    function Gi(e) {
      (delete e[Oe], delete e[ta], delete e[Ty], delete e[wy]);
    }
    function bl(e) {
      var a;
      if ((a = e[Oe])) return a;
      for (var t = e.parentNode; t; ) {
        if ((a = t[Pn] || t[Oe])) {
          if (
            ((t = a.alternate),
            a.child !== null || (t !== null && t.child !== null))
          )
            for (e = Am(e); e !== null; ) {
              if ((t = e[Oe])) return t;
              e = Am(e);
            }
          return a;
        }
        ((e = t), (t = e.parentNode));
      }
      return null;
    }
    function Dn(e) {
      if ((e = e[Oe] || e[Pn])) {
        var a = e.tag;
        if (
          a === 5 ||
          a === 6 ||
          a === 13 ||
          a === 31 ||
          a === 26 ||
          a === 27 ||
          a === 3
        )
          return e;
      }
      return null;
    }
    function fu(e) {
      var a = e.tag;
      if (a === 5 || a === 26 || a === 27 || a === 6) return e.stateNode;
      throw Error(S(33));
    }
    function dn(e) {
      var a = e[np];
      return (
        a ||
          (a = e[np] =
            { hoistableStyles: new Map(), hoistableScripts: new Map() }),
        a
      );
    }
    function Te(e) {
      e[Yu] = !0;
    }
    function _m(e) {
      e[hi] = void 0;
    }
    var $m = new Set(),
      eg = {};
    function Pl(e, a) {
      (An(e, a), An(e + "Capture", a));
    }
    function An(e, a) {
      for (eg[e] = a, e = 0; e < a.length; e++) $m.add(a[e]);
    }
    var By = RegExp(
        "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$",
      ),
      up = {},
      rp = {};
    function qy(e) {
      return Oo.call(rp, e)
        ? !0
        : Oo.call(up, e)
          ? !1
          : By.test(e)
            ? (rp[e] = !0)
            : ((up[e] = !0), !1);
    }
    var Z = !1;
    function ip() {
      var e = Z;
      return ((Z = !1), e);
    }
    function jr(e, a, t) {
      if (qy(a))
        if (t === null) e.removeAttribute(a);
        else {
          switch (typeof t) {
            case "undefined":
            case "function":
            case "symbol":
              e.removeAttribute(a);
              return;
            case "boolean":
              var l = a.toLowerCase().slice(0, 5);
              if (l !== "data-" && l !== "aria-") {
                e.removeAttribute(a);
                return;
              }
          }
          e.setAttribute(a, t);
        }
    }
    function qr(e, a, t) {
      if (t === null) e.removeAttribute(a);
      else {
        switch (typeof t) {
          case "undefined":
          case "function":
          case "symbol":
          case "boolean":
            e.removeAttribute(a);
            return;
        }
        e.setAttribute(a, t);
      }
    }
    function ot(e, a, t, l) {
      if (l === null) e.removeAttribute(t);
      else {
        switch (typeof l) {
          case "undefined":
          case "function":
          case "symbol":
          case "boolean":
            e.removeAttribute(t);
            return;
        }
        e.setAttributeNS(a, t, l);
      }
    }
    function ra(e) {
      switch (typeof e) {
        case "bigint":
        case "boolean":
        case "number":
        case "string":
        case "undefined":
          return e;
        case "object":
          return e;
        default:
          return "";
      }
    }
    function ag(e) {
      var a = e.type;
      return (
        (e = e.nodeName) &&
        e.toLowerCase() === "input" &&
        (a === "checkbox" || a === "radio")
      );
    }
    function Oy(e, a, t) {
      var l = Object.getOwnPropertyDescriptor(e.constructor.prototype, a);
      if (
        !e.hasOwnProperty(a) &&
        typeof l < "u" &&
        typeof l.get == "function" &&
        typeof l.set == "function"
      ) {
        var n = l.get,
          u = l.set;
        return (
          Object.defineProperty(e, a, {
            configurable: !0,
            get: function () {
              return n.call(this);
            },
            set: function (r) {
              ((t = "" + r), u.call(this, r));
            },
          }),
          Object.defineProperty(e, a, { enumerable: l.enumerable }),
          {
            getValue: function () {
              return t;
            },
            setValue: function (r) {
              t = "" + r;
            },
            stopTracking: function () {
              ((e._valueTracker = null), delete e[a]);
            },
          }
        );
      }
    }
    function Mo(e) {
      if (!e._valueTracker) {
        var a = ag(e) ? "checked" : "value";
        e._valueTracker = Oy(e, a, "" + e[a]);
      }
    }
    function tg(e) {
      if (!e) return !1;
      var a = e._valueTracker;
      if (!a) return !0;
      var t = a.getValue(),
        l = "";
      return (
        e && (l = ag(e) ? (e.checked ? "true" : "false") : e.value),
        (e = l),
        e !== t ? (a.setValue(e), !0) : !1
      );
    }
    var My = /[\n"\\]/g;
    function Sa(e) {
      return e.replace(My, function (a) {
        return "\\" + a.charCodeAt(0).toString(16) + " ";
      });
    }
    function Po(e, a, t, l, n, u, r, s) {
      ((e.name = ""),
        r != null &&
        typeof r != "function" &&
        typeof r != "symbol" &&
        typeof r != "boolean"
          ? (e.type = r)
          : e.removeAttribute("type"),
        a != null
          ? r === "number"
            ? ((a === 0 && e.value === "") || e.value != a) &&
              (e.value = "" + ra(a))
            : e.value !== "" + ra(a) && (e.value = "" + ra(a))
          : (r !== "submit" && r !== "reset") || e.removeAttribute("value"),
        a != null
          ? r === "number" && e.value == a
            ? Ys(e, ra(e.value))
            : Ys(e, ra(a))
          : t != null
            ? Ys(e, ra(t))
            : l != null && e.removeAttribute("value"),
        n == null && u != null && (e.defaultChecked = !!u),
        n != null &&
          (e.checked = n && typeof n != "function" && typeof n != "symbol"),
        s != null &&
        typeof s != "function" &&
        typeof s != "symbol" &&
        typeof s != "boolean"
          ? (e.name = "" + ra(s))
          : e.removeAttribute("name"));
    }
    function lg(e, a, t, l, n, u, r, s) {
      if (
        (u != null &&
          typeof u != "function" &&
          typeof u != "symbol" &&
          typeof u != "boolean" &&
          (e.type = u),
        a != null || t != null)
      ) {
        if (!((u !== "submit" && u !== "reset") || a != null)) {
          Mo(e);
          return;
        }
        ((t = t != null ? "" + ra(t) : ""),
          (a = a != null ? "" + ra(a) : t),
          s || a === e.value || (e.value = a),
          (e.defaultValue = a));
      }
      ((l = l ?? n),
        (l = typeof l != "function" && typeof l != "symbol" && !!l),
        (e.checked = s ? e.checked : !!l),
        (e.defaultChecked = !!l),
        r != null &&
          typeof r != "function" &&
          typeof r != "symbol" &&
          typeof r != "boolean" &&
          (e.name = r),
        Mo(e));
    }
    function Ys(e, a) {
      e.defaultValue !== "" + a && (e.defaultValue = "" + a);
    }
    function cn(e, a, t, l) {
      if (((e = e.options), a)) {
        a = {};
        for (var n = 0; n < t.length; n++) a["$" + t[n]] = !0;
        for (t = 0; t < e.length; t++)
          ((n = a.hasOwnProperty("$" + e[t].value)),
            e[t].selected !== n && (e[t].selected = n),
            n && l && (e[t].defaultSelected = !0));
      } else {
        for (t = "" + ra(t), a = null, n = 0; n < e.length; n++) {
          if (e[n].value === t) {
            ((e[n].selected = !0), l && (e[n].defaultSelected = !0));
            return;
          }
          a !== null || e[n].disabled || (a = e[n]);
        }
        a !== null && (a.selected = !0);
      }
    }
    function ng(e, a, t) {
      if (
        a != null &&
        ((a = "" + ra(a)), a !== e.value && (e.value = a), t == null)
      ) {
        e.defaultValue !== a && (e.defaultValue = a);
        return;
      }
      e.defaultValue = t != null ? "" + ra(t) : "";
    }
    function ug(e, a, t, l) {
      if (a == null) {
        if (l != null) {
          if (t != null) throw Error(S(92));
          if (cu(l)) {
            if (1 < l.length) throw Error(S(93));
            l = l[0];
          }
          t = l;
        }
        (t == null && (t = ""), (a = t));
      }
      ((t = ra(a)),
        (e.defaultValue = t),
        (l = e.textContent),
        l === t && l !== "" && l !== null && (e.value = l),
        Mo(e));
    }
    function Ln(e, a) {
      if (a) {
        var t = e.firstChild;
        if (t && t === e.lastChild && t.nodeType === 3) {
          t.nodeValue = a;
          return;
        }
      }
      e.textContent = a;
    }
    var Py = new Set(
      "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
        " ",
      ),
    );
    function sp(e, a, t) {
      var l = a.indexOf("--") === 0;
      t == null || typeof t == "boolean" || t === ""
        ? l
          ? e.setProperty(a, "")
          : a === "float"
            ? (e.cssFloat = "")
            : (e[a] = "")
        : l
          ? e.setProperty(a, t)
          : typeof t != "number" || t === 0 || Py.has(a)
            ? a === "float"
              ? (e.cssFloat = t)
              : (e[a] = ("" + t).trim())
            : (e[a] = t + "px");
    }
    function rg(e, a, t) {
      if (a != null && typeof a != "object") throw Error(S(62));
      if (((e = e.style), t != null)) {
        for (var l in t)
          !t.hasOwnProperty(l) ||
            (a != null && a.hasOwnProperty(l)) ||
            (l.indexOf("--") === 0
              ? e.setProperty(l, "")
              : l === "float"
                ? (e.cssFloat = "")
                : (e[l] = ""),
            (Z = !0));
        for (var n in a)
          ((l = a[n]),
            a.hasOwnProperty(n) && t[n] !== l && (sp(e, n, l), (Z = !0)));
      } else for (var u in a) a.hasOwnProperty(u) && sp(e, u, a[u]);
    }
    function zd(e) {
      if (e.indexOf("-") === -1) return !1;
      switch (e) {
        case "annotation-xml":
        case "color-profile":
        case "font-face":
        case "font-face-src":
        case "font-face-uri":
        case "font-face-format":
        case "font-face-name":
        case "missing-glyph":
          return !1;
        default:
          return !0;
      }
    }
    var Dy = new Map([
        ["acceptCharset", "accept-charset"],
        ["htmlFor", "for"],
        ["httpEquiv", "http-equiv"],
        ["crossOrigin", "crossorigin"],
        ["accentHeight", "accent-height"],
        ["alignmentBaseline", "alignment-baseline"],
        ["arabicForm", "arabic-form"],
        ["baselineShift", "baseline-shift"],
        ["capHeight", "cap-height"],
        ["clipPath", "clip-path"],
        ["clipRule", "clip-rule"],
        ["colorInterpolation", "color-interpolation"],
        ["colorInterpolationFilters", "color-interpolation-filters"],
        ["colorProfile", "color-profile"],
        ["colorRendering", "color-rendering"],
        ["dominantBaseline", "dominant-baseline"],
        ["enableBackground", "enable-background"],
        ["fillOpacity", "fill-opacity"],
        ["fillRule", "fill-rule"],
        ["floodColor", "flood-color"],
        ["floodOpacity", "flood-opacity"],
        ["fontFamily", "font-family"],
        ["fontSize", "font-size"],
        ["fontSizeAdjust", "font-size-adjust"],
        ["fontStretch", "font-stretch"],
        ["fontStyle", "font-style"],
        ["fontVariant", "font-variant"],
        ["fontWeight", "font-weight"],
        ["glyphName", "glyph-name"],
        ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
        ["glyphOrientationVertical", "glyph-orientation-vertical"],
        ["horizAdvX", "horiz-adv-x"],
        ["horizOriginX", "horiz-origin-x"],
        ["imageRendering", "image-rendering"],
        ["letterSpacing", "letter-spacing"],
        ["lightingColor", "lighting-color"],
        ["markerEnd", "marker-end"],
        ["markerMid", "marker-mid"],
        ["markerStart", "marker-start"],
        ["maskType", "mask-type"],
        ["overlinePosition", "overline-position"],
        ["overlineThickness", "overline-thickness"],
        ["paintOrder", "paint-order"],
        ["panose-1", "panose-1"],
        ["pointerEvents", "pointer-events"],
        ["renderingIntent", "rendering-intent"],
        ["shapeRendering", "shape-rendering"],
        ["stopColor", "stop-color"],
        ["stopOpacity", "stop-opacity"],
        ["strikethroughPosition", "strikethrough-position"],
        ["strikethroughThickness", "strikethrough-thickness"],
        ["strokeDasharray", "stroke-dasharray"],
        ["strokeDashoffset", "stroke-dashoffset"],
        ["strokeLinecap", "stroke-linecap"],
        ["strokeLinejoin", "stroke-linejoin"],
        ["strokeMiterlimit", "stroke-miterlimit"],
        ["strokeOpacity", "stroke-opacity"],
        ["strokeWidth", "stroke-width"],
        ["textAnchor", "text-anchor"],
        ["textDecoration", "text-decoration"],
        ["textRendering", "text-rendering"],
        ["transformOrigin", "transform-origin"],
        ["underlinePosition", "underline-position"],
        ["underlineThickness", "underline-thickness"],
        ["unicodeBidi", "unicode-bidi"],
        ["unicodeRange", "unicode-range"],
        ["unitsPerEm", "units-per-em"],
        ["vAlphabetic", "v-alphabetic"],
        ["vHanging", "v-hanging"],
        ["vIdeographic", "v-ideographic"],
        ["vMathematical", "v-mathematical"],
        ["vectorEffect", "vector-effect"],
        ["vertAdvY", "vert-adv-y"],
        ["vertOriginX", "vert-origin-x"],
        ["vertOriginY", "vert-origin-y"],
        ["wordSpacing", "word-spacing"],
        ["writingMode", "writing-mode"],
        ["xmlnsXlink", "xmlns:xlink"],
        ["xHeight", "x-height"],
      ]),
      Ry =
        /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
    function Yr(e) {
      return Ry.test("" + e)
        ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
        : e;
    }
    function _a() {}
    var Do = null;
    function Nd(e) {
      return (
        (e = e.target || e.srcElement || window),
        e.correspondingUseElement && (e = e.correspondingUseElement),
        e.nodeType === 3 ? e.parentNode : e
      );
    }
    var en = null,
      fn = null;
    function op(e) {
      var a = Dn(e);
      if (a && (e = a.stateNode)) {
        var t = e[ta] || null;
        e: switch (((e = a.stateNode), a.type)) {
          case "input":
            if (
              (Po(
                e,
                t.value,
                t.defaultValue,
                t.defaultValue,
                t.checked,
                t.defaultChecked,
                t.type,
                t.name,
              ),
              (a = t.name),
              t.type === "radio" && a != null)
            ) {
              for (t = e; t.parentNode; ) t = t.parentNode;
              for (
                t = t.querySelectorAll(
                  'input[name="' + Sa("" + a) + '"][type="radio"]',
                ),
                  a = 0;
                a < t.length;
                a++
              ) {
                var l = t[a];
                if (l !== e && l.form === e.form) {
                  var n = l[ta] || null;
                  if (!n) throw Error(S(90));
                  Po(
                    l,
                    n.value,
                    n.defaultValue,
                    n.defaultValue,
                    n.checked,
                    n.defaultChecked,
                    n.type,
                    n.name,
                  );
                }
              }
              for (a = 0; a < t.length; a++)
                ((l = t[a]), l.form === e.form && tg(l));
            }
            break e;
          case "textarea":
            ng(e, t.value, t.defaultValue);
            break e;
          case "select":
            ((a = t.value), a != null && cn(e, !!t.multiple, a, !1));
        }
      }
    }
    var Js = !1;
    function ig(e, a, t) {
      if (Js) return e(a, t);
      Js = !0;
      try {
        var l = e(a);
        return l;
      } finally {
        if (
          ((Js = !1),
          (en !== null || fn !== null) &&
            (ts(), en && ((a = en), (e = fn), (fn = en = null), op(a), e)))
        )
          for (a = 0; a < e.length; a++) op(e[a]);
      }
    }
    function Bu(e, a) {
      var t = e.stateNode;
      if (t === null) return null;
      var l = t[ta] || null;
      if (l === null) return null;
      t = l[a];
      e: switch (a) {
        case "onClick":
        case "onClickCapture":
        case "onDoubleClick":
        case "onDoubleClickCapture":
        case "onMouseDown":
        case "onMouseDownCapture":
        case "onMouseMove":
        case "onMouseMoveCapture":
        case "onMouseUp":
        case "onMouseUpCapture":
        case "onMouseEnter":
          ((l = !l.disabled) ||
            ((e = e.type),
            (l = !(
              e === "button" ||
              e === "input" ||
              e === "select" ||
              e === "textarea"
            ))),
            (e = !l));
          break e;
        default:
          e = !1;
      }
      if (e) return null;
      if (t && typeof t != "function") throw Error(S(231, a, typeof t));
      return t;
    }
    var gt = !(
        typeof window > "u" ||
        typeof window.document > "u" ||
        typeof window.document.createElement > "u"
      ),
      Ro = !1;
    if (gt)
      try {
        ((Vl = {}),
          Object.defineProperty(Vl, "passive", {
            get: function () {
              Ro = !0;
            },
          }),
          window.addEventListener("test", Vl, Vl),
          window.removeEventListener("test", Vl, Vl));
      } catch {
        Ro = !1;
      }
    var Vl,
      Ut = null,
      Hd = null,
      Jr = null;
    function sg() {
      if (Jr) return Jr;
      var e,
        a = Hd,
        t = a.length,
        l,
        n = "value" in Ut ? Ut.value : Ut.textContent,
        u = n.length;
      for (e = 0; e < t && a[e] === n[e]; e++);
      var r = t - e;
      for (l = 1; l <= r && a[t - l] === n[u - l]; l++);
      return (Jr = n.slice(e, 1 < l ? 1 - l : void 0));
    }
    function Xr(e) {
      var a = e.keyCode;
      return (
        "charCode" in e
          ? ((e = e.charCode), e === 0 && a === 13 && (e = 13))
          : (e = a),
        e === 10 && (e = 13),
        32 <= e || e === 13 ? e : 0
      );
    }
    function Or() {
      return !0;
    }
    function dp() {
      return !1;
    }
    function Ye(e) {
      function a(t, l, n, u, r) {
        ((this._reactName = t),
          (this._targetInst = n),
          (this.type = l),
          (this.nativeEvent = u),
          (this.target = r),
          (this.currentTarget = null));
        for (var s in e)
          e.hasOwnProperty(s) && ((t = e[s]), (this[s] = t ? t(u) : u[s]));
        return (
          (this.isDefaultPrevented = (
            u.defaultPrevented != null
              ? u.defaultPrevented
              : u.returnValue === !1
          )
            ? Or
            : dp),
          (this.isPropagationStopped = dp),
          this
        );
      }
      return (
        ue(a.prototype, {
          preventDefault: function () {
            this.defaultPrevented = !0;
            var t = this.nativeEvent;
            t &&
              (t.preventDefault
                ? t.preventDefault()
                : typeof t.returnValue != "unknown" && (t.returnValue = !1),
              (this.isDefaultPrevented = Or));
          },
          stopPropagation: function () {
            var t = this.nativeEvent;
            t &&
              (t.stopPropagation
                ? t.stopPropagation()
                : typeof t.cancelBubble != "unknown" && (t.cancelBubble = !0),
              (this.isPropagationStopped = Or));
          },
          persist: function () {},
          isPersistent: Or,
        }),
        a
      );
    }
    var tl = {
        eventPhase: 0,
        bubbles: 0,
        cancelable: 0,
        timeStamp: function (e) {
          return e.timeStamp || Date.now();
        },
        defaultPrevented: 0,
        isTrusted: 0,
      },
      Fi = Ye(tl),
      Ju = ue({}, tl, { view: 0, detail: 0 }),
      Uy = Ye(Ju),
      Xs,
      Ws,
      uu,
      Qi = ue({}, Ju, {
        screenX: 0,
        screenY: 0,
        clientX: 0,
        clientY: 0,
        pageX: 0,
        pageY: 0,
        ctrlKey: 0,
        shiftKey: 0,
        altKey: 0,
        metaKey: 0,
        getModifierState: Ed,
        button: 0,
        buttons: 0,
        relatedTarget: function (e) {
          return e.relatedTarget === void 0
            ? e.fromElement === e.srcElement
              ? e.toElement
              : e.fromElement
            : e.relatedTarget;
        },
        movementX: function (e) {
          return "movementX" in e
            ? e.movementX
            : (e !== uu &&
                (uu && e.type === "mousemove"
                  ? ((Xs = e.screenX - uu.screenX),
                    (Ws = e.screenY - uu.screenY))
                  : (Ws = Xs = 0),
                (uu = e)),
              Xs);
        },
        movementY: function (e) {
          return "movementY" in e ? e.movementY : Ws;
        },
      }),
      cp = Ye(Qi),
      zy = ue({}, Qi, { dataTransfer: 0 }),
      Ny = Ye(zy),
      Hy = ue({}, Ju, { relatedTarget: 0 }),
      _s = Ye(Hy),
      Ey = ue({}, tl, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
      Ky = Ye(Ey),
      Gy = ue({}, tl, {
        clipboardData: function (e) {
          return "clipboardData" in e ? e.clipboardData : window.clipboardData;
        },
      }),
      Fy = Ye(Gy),
      Qy = ue({}, tl, { data: 0 }),
      fp = Ye(Qy),
      Vy = {
        Esc: "Escape",
        Spacebar: " ",
        Left: "ArrowLeft",
        Up: "ArrowUp",
        Right: "ArrowRight",
        Down: "ArrowDown",
        Del: "Delete",
        Win: "OS",
        Menu: "ContextMenu",
        Apps: "ContextMenu",
        Scroll: "ScrollLock",
        MozPrintableKey: "Unidentified",
      },
      Zy = {
        8: "Backspace",
        9: "Tab",
        12: "Clear",
        13: "Enter",
        16: "Shift",
        17: "Control",
        18: "Alt",
        19: "Pause",
        20: "CapsLock",
        27: "Escape",
        32: " ",
        33: "PageUp",
        34: "PageDown",
        35: "End",
        36: "Home",
        37: "ArrowLeft",
        38: "ArrowUp",
        39: "ArrowRight",
        40: "ArrowDown",
        45: "Insert",
        46: "Delete",
        112: "F1",
        113: "F2",
        114: "F3",
        115: "F4",
        116: "F5",
        117: "F6",
        118: "F7",
        119: "F8",
        120: "F9",
        121: "F10",
        122: "F11",
        123: "F12",
        144: "NumLock",
        145: "ScrollLock",
        224: "Meta",
      },
      jy = {
        Alt: "altKey",
        Control: "ctrlKey",
        Meta: "metaKey",
        Shift: "shiftKey",
      };
    function Yy(e) {
      var a = this.nativeEvent;
      return a.getModifierState
        ? a.getModifierState(e)
        : (e = jy[e])
          ? !!a[e]
          : !1;
    }
    function Ed() {
      return Yy;
    }
    var Jy = ue({}, Ju, {
        key: function (e) {
          if (e.key) {
            var a = Vy[e.key] || e.key;
            if (a !== "Unidentified") return a;
          }
          return e.type === "keypress"
            ? ((e = Xr(e)), e === 13 ? "Enter" : String.fromCharCode(e))
            : e.type === "keydown" || e.type === "keyup"
              ? Zy[e.keyCode] || "Unidentified"
              : "";
        },
        code: 0,
        location: 0,
        ctrlKey: 0,
        shiftKey: 0,
        altKey: 0,
        metaKey: 0,
        repeat: 0,
        locale: 0,
        getModifierState: Ed,
        charCode: function (e) {
          return e.type === "keypress" ? Xr(e) : 0;
        },
        keyCode: function (e) {
          return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
        },
        which: function (e) {
          return e.type === "keypress"
            ? Xr(e)
            : e.type === "keydown" || e.type === "keyup"
              ? e.keyCode
              : 0;
        },
      }),
      Xy = Ye(Jy),
      Wy = ue({}, Qi, {
        pointerId: 0,
        width: 0,
        height: 0,
        pressure: 0,
        tangentialPressure: 0,
        tiltX: 0,
        tiltY: 0,
        twist: 0,
        pointerType: 0,
        isPrimary: 0,
      }),
      pp = Ye(Wy),
      _y = ue({}, tl, { submitter: 0 }),
      $y = Ye(_y),
      e0 = ue({}, Ju, {
        touches: 0,
        targetTouches: 0,
        changedTouches: 0,
        altKey: 0,
        metaKey: 0,
        ctrlKey: 0,
        shiftKey: 0,
        getModifierState: Ed,
      }),
      a0 = Ye(e0),
      t0 = ue({}, tl, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
      l0 = Ye(t0),
      n0 = ue({}, Qi, {
        deltaX: function (e) {
          return "deltaX" in e
            ? e.deltaX
            : "wheelDeltaX" in e
              ? -e.wheelDeltaX
              : 0;
        },
        deltaY: function (e) {
          return "deltaY" in e
            ? e.deltaY
            : "wheelDeltaY" in e
              ? -e.wheelDeltaY
              : "wheelDelta" in e
                ? -e.wheelDelta
                : 0;
        },
        deltaZ: 0,
        deltaMode: 0,
      }),
      u0 = Ye(n0),
      r0 = ue({}, tl, { newState: 0, oldState: 0, source: 0 }),
      i0 = Ye(r0),
      s0 = [9, 13, 27, 32],
      Kd = gt && "CompositionEvent" in window,
      gu = null;
    gt && "documentMode" in document && (gu = document.documentMode);
    var o0 = gt && "TextEvent" in window && !gu,
      og = gt && (!Kd || (gu && 8 < gu && 11 >= gu)),
      mp = " ",
      gp = !1;
    function dg(e, a) {
      switch (e) {
        case "keyup":
          return s0.indexOf(a.keyCode) !== -1;
        case "keydown":
          return a.keyCode !== 229;
        case "keypress":
        case "mousedown":
        case "focusout":
          return !0;
        default:
          return !1;
      }
    }
    function cg(e) {
      return (
        (e = e.detail),
        typeof e == "object" && "data" in e ? e.data : null
      );
    }
    var an = !1;
    function d0(e, a) {
      switch (e) {
        case "compositionend":
          return cg(a);
        case "keypress":
          return a.which !== 32 ? null : ((gp = !0), mp);
        case "textInput":
          return ((e = a.data), e === mp && gp ? null : e);
        default:
          return null;
      }
    }
    function c0(e, a) {
      if (an)
        return e === "compositionend" || (!Kd && dg(e, a))
          ? ((e = sg()), (Jr = Hd = Ut = null), (an = !1), e)
          : null;
      switch (e) {
        case "paste":
          return null;
        case "keypress":
          if (
            !(a.ctrlKey || a.altKey || a.metaKey) ||
            (a.ctrlKey && a.altKey)
          ) {
            if (a.char && 1 < a.char.length) return a.char;
            if (a.which) return String.fromCharCode(a.which);
          }
          return null;
        case "compositionend":
          return og && a.locale !== "ko" ? null : a.data;
        default:
          return null;
      }
    }
    var f0 = {
      color: !0,
      date: !0,
      datetime: !0,
      "datetime-local": !0,
      email: !0,
      month: !0,
      number: !0,
      password: !0,
      range: !0,
      search: !0,
      tel: !0,
      text: !0,
      time: !0,
      url: !0,
      week: !0,
    };
    function hp(e) {
      var a = e && e.nodeName && e.nodeName.toLowerCase();
      return a === "input" ? !!f0[e.type] : a === "textarea";
    }
    function fg(e, a, t, l) {
      (en ? (fn ? fn.push(l) : (fn = [l])) : (en = l),
        (a = Ni(a, "onChange")),
        0 < a.length &&
          ((t = new Fi("onChange", "change", null, t, l)),
          e.push({ event: t, listeners: a })));
    }
    var hu = null,
      qu = null;
    function p0(e) {
      ib(e, 0);
    }
    function Vi(e) {
      var a = fu(e);
      if (tg(a)) return e;
    }
    function bp(e, a) {
      if (e === "change") return a;
    }
    var pg = !1;
    gt &&
      (gt
        ? ((Pr = "oninput" in document),
          Pr ||
            (($s = document.createElement("div")),
            $s.setAttribute("oninput", "return;"),
            (Pr = typeof $s.oninput == "function")),
          (Mr = Pr))
        : (Mr = !1),
      (pg = Mr && (!document.documentMode || 9 < document.documentMode)));
    var Mr, Pr, $s;
    function vp() {
      hu && (hu.detachEvent("onpropertychange", mg), (qu = hu = null));
    }
    function mg(e) {
      if (e.propertyName === "value" && Vi(qu)) {
        var a = [];
        (fg(a, qu, e, Nd(e)), ig(p0, a));
      }
    }
    function m0(e, a, t) {
      e === "focusin"
        ? (vp(), (hu = a), (qu = t), hu.attachEvent("onpropertychange", mg))
        : e === "focusout" && vp();
    }
    function g0(e) {
      if (e === "selectionchange" || e === "keyup" || e === "keydown")
        return Vi(qu);
    }
    function h0(e, a) {
      if (e === "click") return Vi(a);
    }
    function b0(e, a) {
      if (e === "input" || e === "change") return Vi(a);
    }
    function v0(e, a) {
      return (e === a && (e !== 0 || 1 / e === 1 / a)) || (e !== e && a !== a);
    }
    var ma = typeof Object.is == "function" ? Object.is : v0;
    function Ou(e, a) {
      if (ma(e, a)) return !0;
      if (
        typeof e != "object" ||
        e === null ||
        typeof a != "object" ||
        a === null
      )
        return !1;
      var t = Object.keys(e),
        l = Object.keys(a);
      if (t.length !== l.length) return !1;
      for (l = 0; l < t.length; l++) {
        var n = t[l];
        if (!Oo.call(a, n) || !ma(e[n], a[n])) return !1;
      }
      return !0;
    }
    function Uo(e) {
      if (
        ((e = e || (typeof document < "u" ? document : void 0)), typeof e > "u")
      )
        return null;
      try {
        return e.activeElement || e.body;
      } catch {
        return e.body;
      }
    }
    function yp(e) {
      for (; e && e.firstChild; ) e = e.firstChild;
      return e;
    }
    function Cp(e, a) {
      var t = yp(e);
      e = 0;
      for (var l; t; ) {
        if (t.nodeType === 3) {
          if (((l = e + t.textContent.length), e <= a && l >= a))
            return { node: t, offset: a - e };
          e = l;
        }
        e: {
          for (; t; ) {
            if (t.nextSibling) {
              t = t.nextSibling;
              break e;
            }
            t = t.parentNode;
          }
          t = void 0;
        }
        t = yp(t);
      }
    }
    function gg(e, a) {
      return e && a
        ? e === a
          ? !0
          : e && e.nodeType === 3
            ? !1
            : a && a.nodeType === 3
              ? gg(e, a.parentNode)
              : "contains" in e
                ? e.contains(a)
                : e.compareDocumentPosition
                  ? !!(e.compareDocumentPosition(a) & 16)
                  : !1
        : !1;
    }
    function hg(e) {
      e =
        e != null &&
        e.ownerDocument != null &&
        e.ownerDocument.defaultView != null
          ? e.ownerDocument.defaultView
          : window;
      for (var a = Uo(e.document); a instanceof e.HTMLIFrameElement; ) {
        try {
          var t = typeof a.contentWindow.location.href == "string";
        } catch {
          t = !1;
        }
        if (t) e = a.contentWindow;
        else break;
        a = Uo(e.document);
      }
      return a;
    }
    function Gd(e) {
      var a = e && e.nodeName && e.nodeName.toLowerCase();
      return (
        a &&
        ((a === "input" &&
          (e.type === "text" ||
            e.type === "search" ||
            e.type === "tel" ||
            e.type === "url" ||
            e.type === "password")) ||
          a === "textarea" ||
          e.contentEditable === "true")
      );
    }
    var y0 = gt && "documentMode" in document && 11 >= document.documentMode,
      tn = null,
      zo = null,
      bu = null,
      No = !1;
    function Ap(e, a, t) {
      var l =
        t.window === t ? t.document : t.nodeType === 9 ? t : t.ownerDocument;
      No ||
        tn == null ||
        tn !== Uo(l) ||
        ((l = tn),
        "selectionStart" in l && Gd(l)
          ? (l = { start: l.selectionStart, end: l.selectionEnd })
          : ((l = (
              (l.ownerDocument && l.ownerDocument.defaultView) ||
              window
            ).getSelection()),
            (l = {
              anchorNode: l.anchorNode,
              anchorOffset: l.anchorOffset,
              focusNode: l.focusNode,
              focusOffset: l.focusOffset,
            })),
        (bu && Ou(bu, l)) ||
          ((bu = l),
          (l = Ni(zo, "onSelect")),
          0 < l.length &&
            ((a = new Fi("onSelect", "select", null, a, t)),
            e.push({ event: a, listeners: l }),
            (a.target = tn))));
    }
    function fl(e, a) {
      var t = {};
      return (
        (t[e.toLowerCase()] = a.toLowerCase()),
        (t["Webkit" + e] = "webkit" + a),
        (t["Moz" + e] = "moz" + a),
        t
      );
    }
    var ln = {
        animationend: fl("Animation", "AnimationEnd"),
        animationiteration: fl("Animation", "AnimationIteration"),
        animationstart: fl("Animation", "AnimationStart"),
        transitionrun: fl("Transition", "TransitionRun"),
        transitionstart: fl("Transition", "TransitionStart"),
        transitioncancel: fl("Transition", "TransitionCancel"),
        transitionend: fl("Transition", "TransitionEnd"),
      },
      eo = {},
      bg = {};
    gt &&
      ((bg = document.createElement("div").style),
      "AnimationEvent" in window ||
        (delete ln.animationend.animation,
        delete ln.animationiteration.animation,
        delete ln.animationstart.animation),
      "TransitionEvent" in window || delete ln.transitionend.transition);
    function Dl(e) {
      if (eo[e]) return eo[e];
      if (!ln[e]) return e;
      var a = ln[e],
        t;
      for (t in a) if (a.hasOwnProperty(t) && t in bg) return (eo[e] = a[t]);
      return e;
    }
    var vg = Dl("animationend"),
      yg = Dl("animationiteration"),
      Cg = Dl("animationstart"),
      C0 = Dl("transitionrun"),
      A0 = Dl("transitionstart"),
      L0 = Dl("transitioncancel"),
      Ag = Dl("transitionend"),
      Lg = new Map(),
      Ho =
        "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
          " ",
        );
    Ho.push("scrollEnd");
    function za(e, a) {
      (Lg.set(e, a), Pl(a, [e]));
    }
    var S0 = 0;
    function ht(e, a) {
      if (e.name != null && e.name !== "auto") return e.name;
      if (a.autoName !== null) return a.autoName;
      e = Ua.identifierPrefix;
      var t = S0++;
      return ((e = "_" + e + "t_" + t.toString(32) + "_"), (a.autoName = e));
    }
    function Lp(e) {
      if (e == null || typeof e == "string") return e;
      var a = null,
        t = yn;
      if (t !== null)
        for (var l = 0; l < t.length; l++) {
          var n = e[t[l]];
          if (n != null) {
            if (n === "none") return "none";
            a = a == null ? n : a + (" " + n);
          }
        }
      return a ?? e.default;
    }
    function Lt(e, a) {
      return (
        (e = Lp(e)),
        (a = Lp(a)),
        a == null ? (e === "auto" ? null : e) : a === "auto" ? null : a
      );
    }
    var bi =
        typeof reportError == "function"
          ? reportError
          : function (e) {
              if (
                typeof window == "object" &&
                typeof window.ErrorEvent == "function"
              ) {
                var a = new window.ErrorEvent("error", {
                  bubbles: !0,
                  cancelable: !0,
                  message:
                    typeof e == "object" &&
                    e !== null &&
                    typeof e.message == "string"
                      ? String(e.message)
                      : String(e),
                  error: e,
                });
                if (!window.dispatchEvent(a)) return;
              } else if (
                typeof process == "object" &&
                typeof process.emit == "function"
              ) {
                process.emit("uncaughtException", e);
                return;
              }
              console.error(e);
            },
      Ca = [],
      nn = 0,
      Fd = 0;
    function Zi() {
      for (var e = nn, a = (Fd = nn = 0); a < e; ) {
        var t = Ca[a];
        Ca[a++] = null;
        var l = Ca[a];
        Ca[a++] = null;
        var n = Ca[a];
        Ca[a++] = null;
        var u = Ca[a];
        if (((Ca[a++] = null), l !== null && n !== null)) {
          var r = l.pending;
          (r === null ? (n.next = n) : ((n.next = r.next), (r.next = n)),
            (l.pending = n));
        }
        u !== 0 && Sg(t, n, u);
      }
    }
    function ji(e, a, t, l) {
      ((Ca[nn++] = e),
        (Ca[nn++] = a),
        (Ca[nn++] = t),
        (Ca[nn++] = l),
        (Fd |= l),
        (e.lanes |= l),
        (e = e.alternate),
        e !== null && (e.lanes |= l));
    }
    function Qd(e, a, t, l) {
      return (ji(e, a, t, l), vi(e));
    }
    function Rl(e, a) {
      return (ji(e, null, null, a), vi(e));
    }
    function Sg(e, a, t) {
      e.lanes |= t;
      var l = e.alternate;
      l !== null && (l.lanes |= t);
      for (var n = !1, u = e.return; u !== null; )
        ((u.childLanes |= t),
          (l = u.alternate),
          l !== null && (l.childLanes |= t),
          u.tag === 22 &&
            ((e = u.stateNode), e === null || e._visibility & 1 || (n = !0)),
          (e = u),
          (u = u.return));
      return e.tag === 3
        ? ((u = e.stateNode),
          n &&
            a !== null &&
            ((n = 31 - fa(t)),
            (e = u.hiddenUpdates),
            (l = e[n]),
            l === null ? (e[n] = [a]) : l.push(a),
            (a.lane = t | 536870912)),
          u)
        : null;
    }
    function vi(e) {
      if (50 < Tu) throw ((Tu = 0), (ri = null), Error(S(185)));
      for (var a = e.return; a !== null; ) ((e = a), (a = e.return));
      return e.tag === 3 ? e.stateNode : null;
    }
    var un = {};
    function x0(e, a, t, l) {
      ((this.tag = e),
        (this.key = t),
        (this.sibling =
          this.child =
          this.return =
          this.stateNode =
          this.type =
          this.elementType =
            null),
        (this.index = 0),
        (this.refCleanup = this.ref = null),
        (this.pendingProps = a),
        (this.dependencies =
          this.memoizedState =
          this.updateQueue =
          this.memoizedProps =
            null),
        (this.mode = l),
        (this.subtreeFlags = this.flags = 0),
        (this.deletions = null),
        (this.childLanes = this.lanes = 0),
        (this.alternate = null));
    }
    function $e(e, a, t, l) {
      return new x0(e, a, t, l);
    }
    function Vd(e) {
      return ((e = e.prototype), !(!e || !e.isReactComponent));
    }
    function pt(e, a) {
      var t = e.alternate;
      return (
        t === null
          ? ((t = $e(e.tag, a, e.key, e.mode)),
            (t.elementType = e.elementType),
            (t.type = e.type),
            (t.stateNode = e.stateNode),
            (t.alternate = e),
            (e.alternate = t))
          : ((t.pendingProps = a),
            (t.type = e.type),
            (t.flags = 0),
            (t.subtreeFlags = 0),
            (t.deletions = null)),
        (t.flags = e.flags & 1206910976),
        (t.childLanes = e.childLanes),
        (t.lanes = e.lanes),
        (t.child = e.child),
        (t.memoizedProps = e.memoizedProps),
        (t.memoizedState = e.memoizedState),
        (t.updateQueue = e.updateQueue),
        (a = e.dependencies),
        (t.dependencies =
          a === null ? null : { lanes: a.lanes, firstContext: a.firstContext }),
        (t.sibling = e.sibling),
        (t.index = e.index),
        (t.ref = e.ref),
        (t.refCleanup = e.refCleanup),
        t
      );
    }
    function xg(e, a) {
      e.flags &= 1206910978;
      var t = e.alternate;
      return (
        t === null
          ? ((e.childLanes = 0),
            (e.lanes = a),
            (e.child = null),
            (e.subtreeFlags = 0),
            (e.memoizedProps = null),
            (e.memoizedState = null),
            (e.updateQueue = null),
            (e.dependencies = null),
            (e.stateNode = null))
          : ((e.childLanes = t.childLanes),
            (e.lanes = t.lanes),
            (e.child = t.child),
            (e.subtreeFlags = 0),
            (e.deletions = null),
            (e.memoizedProps = t.memoizedProps),
            (e.memoizedState = t.memoizedState),
            (e.updateQueue = t.updateQueue),
            (e.type = t.type),
            (a = t.dependencies),
            (e.dependencies =
              a === null
                ? null
                : { lanes: a.lanes, firstContext: a.firstContext })),
        e
      );
    }
    function Wr(e, a, t, l, n, u) {
      var r = 0;
      if (((l = e), typeof l == "function")) Vd(l) && (r = 1);
      else if (typeof l == "string")
        r = XC(e, t, at.current)
          ? 26
          : e === "html" || e === "head" || e === "body"
            ? 27
            : 5;
      else
        e: switch (l) {
          case ko:
            return (
              (e = $e(31, t, a, n)),
              (e.elementType = ko),
              (e.lanes = u),
              e
            );
          case _l:
            return Cl(t.children, n, u, a);
          case Km:
            ((r = 8), (n |= 24));
            break;
          case So:
            return (
              (e = $e(12, t, a, n | 2)),
              (e.elementType = So),
              (e.lanes = u),
              e
            );
          case xo:
            return (
              (e = $e(13, t, a, n)),
              (e.elementType = xo),
              (e.lanes = u),
              e
            );
          case Io:
            return (
              (e = $e(19, t, a, n)),
              (e.elementType = Io),
              (e.lanes = u),
              e
            );
          case cy:
          case To:
            return (
              (e = n | 32),
              (e = $e(30, t, a, e)),
              (e.elementType = To),
              (e.lanes = u),
              (e.stateNode = {
                autoName: null,
                paired: null,
                clones: null,
                ref: null,
              }),
              e
            );
          default:
            if (typeof l == "object" && l !== null)
              switch (l.$$typeof) {
                case Wa:
                  r = 10;
                  break e;
                case Gm:
                  r = 9;
                  break e;
                case Md:
                  r = 11;
                  break e;
                case Pd:
                  r = 14;
                  break e;
                case Mt:
                  ((r = 16), (l = null));
                  break e;
              }
            ((r = 29),
              (t = Error(S(130, e === null ? "null" : typeof e, ""))),
              (l = null));
        }
      return (
        (a = $e(r, t, a, n)),
        (a.elementType = e),
        (a.type = l),
        (a.lanes = u),
        a
      );
    }
    function Cl(e, a, t, l) {
      return ((e = $e(7, e, l, a)), (e.lanes = t), e);
    }
    function ao(e, a, t) {
      return ((e = $e(6, e, null, a)), (e.lanes = t), e);
    }
    function Ig(e) {
      var a = $e(18, null, null, 0);
      return ((a.stateNode = e), a);
    }
    function to(e, a, t) {
      return (
        (a = $e(4, e.children !== null ? e.children : [], e.key, a)),
        (a.lanes = t),
        (a.stateNode = {
          containerInfo: e.containerInfo,
          pendingChildren: null,
          implementation: e.implementation,
        }),
        a
      );
    }
    var Sp = new WeakMap();
    function xa(e, a) {
      if (typeof e == "object" && e !== null) {
        var t = Sp.get(e);
        return t !== void 0
          ? t
          : ((a = { value: e, source: a, stack: ap(a) }), Sp.set(e, a), a);
      }
      return { value: e, source: a, stack: ap(a) };
    }
    var rn = [],
      sn = 0,
      yi = null,
      Mu = 0,
      Aa = [],
      La = 0,
      Wt = null,
      $a = 1,
      et = "";
    function ct(e, a) {
      ((rn[sn++] = Mu), (rn[sn++] = yi), (yi = e), (Mu = a));
    }
    function kg(e, a, t) {
      ((Aa[La++] = $a), (Aa[La++] = et), (Aa[La++] = Wt), (Wt = e));
      var l = $a;
      e = et;
      var n = 32 - fa(l) - 1;
      ((l &= ~(1 << n)), (t += 1));
      var u = 32 - fa(a) + n;
      if (30 < u) {
        var r = n - (n % 5);
        ((u = (l & ((1 << r) - 1)).toString(32)),
          (l >>= r),
          (n -= r),
          ($a = (1 << (32 - fa(a) + n)) | (t << n) | l),
          (et = u + e));
      } else (($a = (1 << u) | (t << n) | l), (et = e));
    }
    function Yi(e) {
      e.return !== null && (ct(e, 1), kg(e, 1, 0));
    }
    function Zd(e) {
      for (; e === yi; )
        ((yi = rn[--sn]), (rn[sn] = null), (Mu = rn[--sn]), (rn[sn] = null));
      for (; e === Wt; )
        ((Wt = Aa[--La]),
          (Aa[La] = null),
          (et = Aa[--La]),
          (Aa[La] = null),
          ($a = Aa[--La]),
          (Aa[La] = null));
    }
    function Tg(e, a) {
      ((Aa[La++] = $a),
        (Aa[La++] = et),
        (Aa[La++] = Wt),
        ($a = a.id),
        (et = a.overflow),
        (Wt = e));
    }
    var we = null,
      se = null,
      H = !1,
      Gt = null,
      Ia = !1,
      Eo = Error(S(519));
    function _t(e) {
      var a = Error(
        S(
          418,
          1 < arguments.length && arguments[1] !== void 0 && arguments[1]
            ? "text"
            : "HTML",
          "",
        ),
      );
      throw (Pu(xa(a, e)), Eo);
    }
    function xp(e) {
      var a = e.stateNode,
        t = e.type,
        l = e.memoizedProps;
      switch (((a[Oe] = e), (a[ta] = l), t)) {
        case "dialog":
          (K("cancel", a), K("close", a));
          break;
        case "iframe":
        case "object":
        case "embed":
          K("load", a);
          break;
        case "video":
        case "audio":
          for (t = 0; t < zu.length; t++) K(zu[t], a);
          break;
        case "source":
          K("error", a);
          break;
        case "img":
        case "image":
        case "link":
          (K("error", a), K("load", a));
          break;
        case "details":
          K("toggle", a);
          break;
        case "input":
          (K("invalid", a),
            lg(
              a,
              l.value,
              l.defaultValue,
              l.checked,
              l.defaultChecked,
              l.type,
              l.name,
              !0,
            ));
          break;
        case "select":
          K("invalid", a);
          break;
        case "textarea":
          (K("invalid", a), ug(a, l.value, l.defaultValue, l.children));
      }
      ((t = l.children),
        (typeof t != "string" &&
          typeof t != "number" &&
          typeof t != "bigint") ||
        a.textContent === "" + t ||
        l.suppressHydrationWarning === !0 ||
        ob(a.textContent, t)
          ? (l.popover != null && (K("beforetoggle", a), K("toggle", a)),
            l.onScroll != null && K("scroll", a),
            l.onScrollEnd != null && K("scrollend", a),
            l.onClick != null && (a.onclick = _a),
            (a = !0))
          : (a = !1),
        a || _t(e, !0));
    }
    function Ci(e) {
      for (we = e.return; we; )
        switch (we.tag) {
          case 5:
          case 31:
          case 13:
            Ia = !1;
            return;
          case 27:
          case 3:
            Ia = !0;
            return;
          default:
            we = we.return;
        }
    }
    function Zl(e) {
      if (e !== we) return !1;
      if (!H) return (Ci(e), (H = !0), !1);
      var a = e.tag,
        t;
      if (
        ((t = a !== 3 && a !== 27) &&
          ((t = a === 5) &&
            ((t = e.type),
            (t =
              !(t !== "form" && t !== "button") ||
              xd(e.type, e.memoizedProps))),
          (t = !t)),
        t && se && _t(e),
        Ci(e),
        a === 13)
      ) {
        if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
          throw Error(S(317));
        se = Cm(e);
      } else if (a === 31) {
        if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
          throw Error(S(317));
        se = Cm(e);
      } else
        a === 27
          ? ((a = se),
            ll(e.type) ? ((e = wd), (wd = null), (se = e)) : (se = a))
          : (se = we ? ka(e.stateNode.nextSibling) : null);
      return !0;
    }
    function xl() {
      ((se = we = null), (H = !1));
    }
    function lo() {
      var e = Gt;
      return (
        e !== null &&
          (We === null ? (We = e) : We.push.apply(We, e), (Gt = null)),
        e
      );
    }
    function Pu(e) {
      Gt === null ? (Gt = [e]) : Gt.push(e);
    }
    var Ko = nt(null),
      Ul = null,
      ft = null;
    function zt(e, a, t) {
      (oe(Ko, a._currentValue), (a._currentValue = t));
    }
    function mt(e) {
      ((e._currentValue = Ko.current), Pe(Ko));
    }
    function _r(e, a, t) {
      for (; e !== null; ) {
        var l = e.alternate;
        if (
          ((e.childLanes & a) !== a
            ? ((e.childLanes |= a), l !== null && (l.childLanes |= a))
            : l !== null && (l.childLanes & a) !== a && (l.childLanes |= a),
          e === t)
        )
          break;
        e = e.return;
      }
    }
    function Go(e, a, t, l) {
      var n = e.child;
      for (n !== null && (n.return = e); n !== null; ) {
        var u = n.dependencies;
        if (u !== null) {
          var r = n.child;
          u = u.firstContext;
          e: for (; u !== null; ) {
            var s = u;
            u = n;
            for (var o = 0; o < a.length; o++)
              if (s.context === a[o]) {
                ((u.lanes |= t),
                  (s = u.alternate),
                  s !== null && (s.lanes |= t),
                  _r(u.return, t, e),
                  l || (r = null));
                break e;
              }
            u = s.next;
          }
        } else if (n.tag === 18) {
          if (((r = n.return), r === null)) throw Error(S(341));
          ((r.lanes |= t),
            (u = r.alternate),
            u !== null && (u.lanes |= t),
            _r(r, t, e),
            (r = null));
        } else
          n.tag === 13 &&
          n.memoizedState !== null &&
          n.memoizedState.dehydrated === null
            ? ((n.lanes |= t),
              (r = n.alternate),
              r !== null && (r.lanes |= t),
              _r(n.return, t, e),
              (r = n.child),
              (r = r !== null ? r.sibling : null))
            : (r = n.child);
        if (r !== null) r.return = n;
        else
          for (r = n; r !== null; ) {
            if (r === e) {
              r = null;
              break;
            }
            if (((n = r.sibling), n !== null)) {
              ((n.return = r.return), (r = n));
              break;
            }
            r = r.return;
          }
        n = r;
      }
    }
    function Il(e, a, t, l) {
      e = null;
      for (var n = a, u = !1; n !== null; ) {
        if (!u) {
          if ((n.flags & 524288) !== 0) u = !0;
          else if ((n.flags & 262144) !== 0) break;
        }
        if (n.tag === 10) {
          var r = n.alternate;
          if (r === null) throw Error(S(387));
          if (((r = r.memoizedProps), r !== null)) {
            var s = n.type;
            ma(n.pendingProps.value, r.value) ||
              (e !== null ? e.push(s) : (e = [s]));
          }
        } else if (n === fi.current) {
          if (((r = n.alternate), r === null)) throw Error(S(387));
          r.memoizedState.memoizedState !== n.memoizedState.memoizedState &&
            (e !== null ? e.push(qn) : (e = [qn]));
        }
        n = n.return;
      }
      return (e !== null && Go(a, e, t, l), (a.flags |= 262144), e !== null);
    }
    function Ai(e) {
      for (e = e.firstContext; e !== null; ) {
        if (!ma(e.context._currentValue, e.memoizedValue)) return !0;
        e = e.next;
      }
      return !1;
    }
    function kl(e) {
      ((Ul = e),
        (ft = null),
        (e = e.dependencies),
        e !== null && (e.firstContext = null));
    }
    function Me(e) {
      return wg(Ul, e);
    }
    function Dr(e, a) {
      return (Ul === null && kl(e), wg(e, a));
    }
    function wg(e, a) {
      var t = a._currentValue;
      if (((a = { context: a, memoizedValue: t, next: null }), ft === null)) {
        if (e === null) throw Error(S(308));
        ((ft = a),
          (e.dependencies = { lanes: 0, firstContext: a }),
          (e.flags |= 524288));
      } else ft = ft.next = a;
      return t;
    }
    var I0 =
        typeof AbortController < "u"
          ? AbortController
          : function () {
              var e = [],
                a = (this.signal = {
                  aborted: !1,
                  addEventListener: function (t, l) {
                    e.push(l);
                  },
                });
              this.abort = function () {
                ((a.aborted = !0),
                  e.forEach(function (t) {
                    return t();
                  }));
              };
            },
      k0 = Le.unstable_scheduleCallback,
      T0 = Le.unstable_NormalPriority,
      be = {
        $$typeof: Wa,
        Consumer: null,
        Provider: null,
        _currentValue: null,
        _currentValue2: null,
        _threadCount: 0,
      };
    function jd() {
      return { controller: new I0(), data: new Map(), refCount: 0 };
    }
    function Xu(e) {
      (e.refCount--,
        e.refCount === 0 &&
          k0(T0, function () {
            e.controller.abort();
          }));
    }
    function Ip(e, a) {
      if ((e.pendingLanes & 4194048) !== 0) {
        var t = e.transitionTypes;
        for (
          t === null && (t = e.transitionTypes = []), e = 0;
          e < a.length;
          e++
        ) {
          var l = a[e];
          t.indexOf(l) === -1 && t.push(l);
        }
      }
    }
    var pu = null;
    function w0(e) {
      var a = e.transitionTypes;
      return ((e.transitionTypes = null), a);
    }
    var vu = null,
      Fo = 0,
      Tl = 0,
      pn = null;
    function B0(e, a) {
      if (vu === null) {
        var t = (vu = []);
        ((Fo = 0),
          (Tl = Ac()),
          (pn = {
            status: "pending",
            value: void 0,
            then: function (l) {
              t.push(l);
            },
          }));
      }
      return (Fo++, a.then(kp, kp), a);
    }
    function kp() {
      if (--Fo === 0 && ((pu = null), vu !== null)) {
        pn !== null && (pn.status = "fulfilled");
        var e = vu;
        ((vu = null), (Tl = 0), (pn = null));
        for (var a = 0; a < e.length; a++) (0, e[a])();
      }
    }
    function q0(e, a) {
      var t = [],
        l = {
          status: "pending",
          value: null,
          reason: null,
          then: function (n) {
            t.push(n);
          },
        };
      return (
        e.then(
          function () {
            ((l.status = "fulfilled"), (l.value = a));
            for (var n = 0; n < t.length; n++) (0, t[n])(a);
          },
          function (n) {
            for (l.status = "rejected", l.reason = n, n = 0; n < t.length; n++)
              (0, t[n])(void 0);
          },
        ),
        l
      );
    }
    var Tp = R.S;
    R.S = function (e, a) {
      if (
        ((Zh = da()),
        typeof a == "object" &&
          a !== null &&
          typeof a.then == "function" &&
          B0(e, a),
        pu !== null)
      )
        for (var t = Tn; t !== null; ) (Ip(t, pu), (t = t.next));
      if (((t = e.types), t !== null)) {
        for (var l = Tn; l !== null; ) (Ip(l, t), (l = l.next));
        if (Tl !== 0) {
          ((l = pu), l === null && (l = pu = []));
          for (var n = 0; n < t.length; n++) {
            var u = t[n];
            l.indexOf(u) === -1 && l.push(u);
          }
        }
      }
      Tp !== null && Tp(e, a);
    };
    var Al = nt(null);
    function Yd() {
      var e = Al.current;
      return e !== null ? e : ne.pooledCache;
    }
    function $r(e, a) {
      a === null ? oe(Al, Al.current) : oe(Al, a.pool);
    }
    function Bg() {
      var e = Yd();
      return e === null ? null : { parent: be._currentValue, pool: e };
    }
    var Rn = Error(S(460)),
      Jd = Error(S(474)),
      Ji = Error(S(542)),
      Li = { then: function () {} };
    function wp(e) {
      return ((e = e.status), e === "fulfilled" || e === "rejected");
    }
    function qg(e, a, t) {
      switch (
        ((t = e[t]),
        t === void 0 ? e.push(a) : t !== a && (a.then(_a, _a), (a = t)),
        a.status)
      ) {
        case "fulfilled":
          return a.value;
        case "rejected":
          throw (
            (e = a.reason),
            qp(e),
            e === void 0 && !("reason" in a) ? Error(S(600)) : e
          );
        default:
          if (typeof a.status == "string") a.then(_a, _a);
          else {
            if (((e = ne), e !== null && 100 < e.shellSuspendCounter))
              throw Error(S(482));
            ((e = a),
              (e.status = "pending"),
              e.then(
                function (l) {
                  if (a.status === "pending") {
                    var n = a;
                    ((n.status = "fulfilled"), (n.value = l));
                  }
                },
                function (l) {
                  if (a.status === "pending") {
                    var n = a;
                    ((n.status = "rejected"), (n.reason = l));
                  }
                },
              ));
          }
          switch (a.status) {
            case "fulfilled":
              return a.value;
            case "rejected":
              throw ((e = a.reason), qp(e), e);
          }
          throw ((Ll = a), Rn);
      }
    }
    function gl(e) {
      try {
        var a = e._init;
        return a(e._payload);
      } catch (t) {
        throw t !== null && typeof t == "object" && typeof t.then == "function"
          ? ((Ll = t), Rn)
          : t;
      }
    }
    var Ll = null;
    function Bp() {
      if (Ll === null) throw Error(S(459));
      var e = Ll;
      return ((Ll = null), e);
    }
    function qp(e) {
      if (e === Rn || e === Ji) throw Error(S(483));
    }
    var mn = null,
      Du = 0;
    function Rr(e) {
      var a = Du;
      return ((Du += 1), mn === null && (mn = []), qg(mn, e, a));
    }
    function Bt(e, a) {
      ((a = a.props.ref), (e.ref = a !== void 0 ? a : null));
    }
    function Ur(e, a) {
      throw a.$$typeof === dy
        ? Error(S(525))
        : ((e = Object.prototype.toString.call(a)),
          Error(
            S(
              31,
              e === "[object Object]"
                ? "object with keys {" + Object.keys(a).join(", ") + "}"
                : e,
            ),
          ));
    }
    function Og(e) {
      function a(h, g) {
        if (e) {
          var b = h.deletions;
          b === null ? ((h.deletions = [g]), (h.flags |= 16)) : b.push(g);
        }
      }
      function t(h, g) {
        if (!e) return null;
        for (; g !== null; ) (a(h, g), (g = g.sibling));
        return null;
      }
      function l(h) {
        for (var g = new Map(); h !== null; )
          (h.key === null ? g.set(h.index, h) : g.set(h.key, h),
            (h = h.sibling));
        return g;
      }
      function n(h, g) {
        return ((h = pt(h, g)), (h.index = 0), (h.sibling = null), h);
      }
      function u(h, g, b) {
        return (
          (h.index = b),
          e
            ? ((b = h.alternate),
              b !== null
                ? ((b = b.index), b < g ? ((h.flags |= 2), g) : b)
                : ((h.flags |= 134217730), g))
            : ((h.flags |= 1048576), g)
        );
      }
      function r(h) {
        return (e && h.alternate === null && (h.flags |= 134217730), h);
      }
      function s(h, g, b, y) {
        return g === null || g.tag !== 6
          ? ((g = ao(b, h.mode, y)), (g.return = h), g)
          : ((g = n(g, b)), (g.return = h), g);
      }
      function o(h, g, b, y) {
        var A = b.type;
        return A === _l
          ? ((h = c(h, g, b.props.children, y, b.key)), Bt(h, b), h)
          : g !== null &&
              (g.elementType === A ||
                (typeof A == "object" &&
                  A !== null &&
                  A.$$typeof === Mt &&
                  gl(A) === g.type))
            ? ((g = n(g, b.props)), Bt(g, b), (g.return = h), g)
            : ((g = Wr(b.type, b.key, b.props, null, h.mode, y)),
              Bt(g, b),
              (g.return = h),
              g);
      }
      function d(h, g, b, y) {
        return g === null ||
          g.tag !== 4 ||
          g.stateNode.containerInfo !== b.containerInfo ||
          g.stateNode.implementation !== b.implementation
          ? ((g = to(b, h.mode, y)), (g.return = h), g)
          : ((g = n(g, b.children || [])), (g.return = h), g);
      }
      function c(h, g, b, y, A) {
        return g === null || g.tag !== 7
          ? ((g = Cl(b, h.mode, y, A)), (g.return = h), g)
          : ((g = n(g, b)), (g.return = h), g);
      }
      function p(h, g, b) {
        if (
          (typeof g == "string" && g !== "") ||
          typeof g == "number" ||
          typeof g == "bigint"
        )
          return ((g = ao("" + g, h.mode, b)), (g.return = h), g);
        if (typeof g == "object" && g !== null) {
          switch (g.$$typeof) {
            case kr:
              return (
                (b = Wr(g.type, g.key, g.props, null, h.mode, b)),
                Bt(b, g),
                (b.return = h),
                b
              );
            case du:
              return ((g = to(g, h.mode, b)), (g.return = h), g);
            case Mt:
              return ((g = gl(g)), p(h, g, b));
          }
          if (cu(g) || nu(g))
            return ((g = Cl(g, h.mode, b, null)), (g.return = h), g);
          if (typeof g.then == "function") return p(h, Rr(g), b);
          if (g.$$typeof === Wa) return p(h, Dr(h, g), b);
          Ur(h, g);
        }
        return null;
      }
      function f(h, g, b, y) {
        var A = g !== null ? g.key : null;
        if (
          (typeof b == "string" && b !== "") ||
          typeof b == "number" ||
          typeof b == "bigint"
        )
          return A !== null ? null : s(h, g, "" + b, y);
        if (typeof b == "object" && b !== null) {
          switch (b.$$typeof) {
            case kr:
              return b.key === A ? o(h, g, b, y) : null;
            case du:
              return b.key === A ? d(h, g, b, y) : null;
            case Mt:
              return ((b = gl(b)), f(h, g, b, y));
          }
          if (cu(b) || nu(b)) return A !== null ? null : c(h, g, b, y, null);
          if (typeof b.then == "function") return f(h, g, Rr(b), y);
          if (b.$$typeof === Wa) return f(h, g, Dr(h, b), y);
          Ur(h, b);
        }
        return null;
      }
      function m(h, g, b, y, A) {
        if (
          (typeof y == "string" && y !== "") ||
          typeof y == "number" ||
          typeof y == "bigint"
        )
          return ((h = h.get(b) || null), s(g, h, "" + y, A));
        if (typeof y == "object" && y !== null) {
          switch (y.$$typeof) {
            case kr:
              return (
                (h = h.get(y.key === null ? b : y.key) || null),
                o(g, h, y, A)
              );
            case du:
              return (
                (h = h.get(y.key === null ? b : y.key) || null),
                d(g, h, y, A)
              );
            case Mt:
              return ((y = gl(y)), m(h, g, b, y, A));
          }
          if (cu(y) || nu(y))
            return ((h = h.get(b) || null), c(g, h, y, A, null));
          if (typeof y.then == "function") return m(h, g, b, Rr(y), A);
          if (y.$$typeof === Wa) return m(h, g, b, Dr(g, y), A);
          Ur(g, y);
        }
        return null;
      }
      function v(h, g, b, y) {
        for (
          var A = null, L = null, x = g, I = (g = 0), M = null;
          x !== null && I < b.length;
          I++
        ) {
          x.index > I ? ((M = x), (x = null)) : (M = x.sibling);
          var q = f(h, x, b[I], y);
          if (q === null) {
            x === null && (x = M);
            break;
          }
          (e && x && q.alternate === null && a(h, x),
            (g = u(q, g, I)),
            L === null ? (A = q) : (L.sibling = q),
            (L = q),
            (x = M));
        }
        if (I === b.length) return (t(h, x), H && ct(h, I), A);
        if (x === null) {
          for (; I < b.length; I++)
            ((x = p(h, b[I], y)),
              x !== null &&
                ((g = u(x, g, I)),
                L === null ? (A = x) : (L.sibling = x),
                (L = x)));
          return (H && ct(h, I), A);
        }
        for (x = l(x); I < b.length; I++)
          ((M = m(x, h, I, b[I], y)),
            M !== null &&
              (e &&
                ((q = M.alternate),
                q !== null && x.delete(q.key === null ? I : q.key)),
              (g = u(M, g, I)),
              L === null ? (A = M) : (L.sibling = M),
              (L = M)));
        return (
          e &&
            x.forEach(function (J) {
              return a(h, J);
            }),
          H && ct(h, I),
          A
        );
      }
      function C(h, g, b, y) {
        if (b == null) throw Error(S(151));
        for (
          var A = null, L = null, x = g, I = (g = 0), M = null, q = b.next();
          x !== null && !q.done;
          I++, q = b.next()
        ) {
          x.index > I ? ((M = x), (x = null)) : (M = x.sibling);
          var J = f(h, x, q.value, y);
          if (J === null) {
            x === null && (x = M);
            break;
          }
          (e && x && J.alternate === null && a(h, x),
            (g = u(J, g, I)),
            L === null ? (A = J) : (L.sibling = J),
            (L = J),
            (x = M));
        }
        if (q.done) return (t(h, x), H && ct(h, I), A);
        if (x === null) {
          for (; !q.done; I++, q = b.next())
            ((q = p(h, q.value, y)),
              q !== null &&
                ((g = u(q, g, I)),
                L === null ? (A = q) : (L.sibling = q),
                (L = q)));
          return (H && ct(h, I), A);
        }
        for (x = l(x); !q.done; I++, q = b.next())
          ((q = m(x, h, I, q.value, y)),
            q !== null &&
              (e &&
                ((M = q.alternate),
                M !== null && x.delete(M.key === null ? I : M.key)),
              (g = u(q, g, I)),
              L === null ? (A = q) : (L.sibling = q),
              (L = q)));
        return (
          e &&
            x.forEach(function (Be) {
              return a(h, Be);
            }),
          H && ct(h, I),
          A
        );
      }
      function k(h, g, b, y) {
        if (
          (typeof b == "object" &&
            b !== null &&
            b.type === _l &&
            b.key === null &&
            b.props.ref === void 0 &&
            (b = b.props.children),
          typeof b == "object" && b !== null)
        ) {
          switch (b.$$typeof) {
            case kr:
              e: {
                for (var A = b.key; g !== null; ) {
                  if (g.key === A) {
                    if (((A = b.type), A === _l)) {
                      if (g.tag === 7) {
                        (t(h, g.sibling),
                          (y = n(g, b.props.children)),
                          Bt(y, b),
                          (y.return = h),
                          (h = y));
                        break e;
                      }
                    } else if (
                      g.elementType === A ||
                      (typeof A == "object" &&
                        A !== null &&
                        A.$$typeof === Mt &&
                        gl(A) === g.type)
                    ) {
                      (t(h, g.sibling),
                        (y = n(g, b.props)),
                        Bt(y, b),
                        (y.return = h),
                        (h = y));
                      break e;
                    }
                    t(h, g);
                    break;
                  } else a(h, g);
                  g = g.sibling;
                }
                b.type === _l
                  ? ((y = Cl(b.props.children, h.mode, y, b.key)),
                    Bt(y, b),
                    (y.return = h),
                    (h = y))
                  : ((y = Wr(b.type, b.key, b.props, null, h.mode, y)),
                    Bt(y, b),
                    (y.return = h),
                    (h = y));
              }
              return r(h);
            case du:
              e: {
                for (A = b.key; g !== null; ) {
                  if (g.key === A)
                    if (
                      g.tag === 4 &&
                      g.stateNode.containerInfo === b.containerInfo &&
                      g.stateNode.implementation === b.implementation
                    ) {
                      (t(h, g.sibling),
                        (y = n(g, b.children || [])),
                        (y.return = h),
                        (h = y));
                      break e;
                    } else {
                      t(h, g);
                      break;
                    }
                  else a(h, g);
                  g = g.sibling;
                }
                ((y = to(b, h.mode, y)), (y.return = h), (h = y));
              }
              return r(h);
            case Mt:
              return ((b = gl(b)), k(h, g, b, y));
          }
          if (cu(b)) return v(h, g, b, y);
          if (nu(b)) {
            if (((A = nu(b)), typeof A != "function")) throw Error(S(150));
            return ((b = A.call(b)), C(h, g, b, y));
          }
          if (typeof b.then == "function") return k(h, g, Rr(b), y);
          if (b.$$typeof === Wa) return k(h, g, Dr(h, b), y);
          Ur(h, b);
        }
        return (typeof b == "string" && b !== "") ||
          typeof b == "number" ||
          typeof b == "bigint"
          ? ((b = "" + b),
            g !== null && g.tag === 6
              ? (t(h, g.sibling), (y = n(g, b)), (y.return = h), (h = y))
              : (t(h, g), (y = ao(b, h.mode, y)), (y.return = h), (h = y)),
            r(h))
          : t(h, g);
      }
      return function (h, g, b, y) {
        try {
          Du = 0;
          var A = k(h, g, b, y);
          return ((mn = null), A);
        } catch (x) {
          if (x === Rn || x === Ji) throw x;
          var L = $e(29, x, null, h.mode);
          return ((L.lanes = y), (L.return = h), L);
        } finally {
        }
      };
    }
    var wl = Og(!0),
      Mg = Og(!1),
      Pt = !1;
    function Xd(e) {
      e.updateQueue = {
        baseState: e.memoizedState,
        firstBaseUpdate: null,
        lastBaseUpdate: null,
        shared: { pending: null, lanes: 0, hiddenCallbacks: null },
        callbacks: null,
      };
    }
    function Qo(e, a) {
      ((e = e.updateQueue),
        a.updateQueue === e &&
          (a.updateQueue = {
            baseState: e.baseState,
            firstBaseUpdate: e.firstBaseUpdate,
            lastBaseUpdate: e.lastBaseUpdate,
            shared: e.shared,
            callbacks: null,
          }));
    }
    function Ft(e) {
      return { lane: e, tag: 0, payload: null, callback: null, next: null };
    }
    function Qt(e, a, t) {
      var l = e.updateQueue;
      if (l === null) return null;
      if (((l = l.shared), (j & 2) !== 0)) {
        var n = l.pending;
        return (
          n === null ? (a.next = a) : ((a.next = n.next), (n.next = a)),
          (l.pending = a),
          (a = vi(e)),
          Sg(e, null, t),
          a
        );
      }
      return (ji(e, l, a, t), vi(e));
    }
    function yu(e, a, t) {
      if (
        ((a = a.updateQueue),
        a !== null && ((a = a.shared), (t & 4194048) !== 0))
      ) {
        var l = a.lanes;
        ((l &= e.pendingLanes), (t |= l), (a.lanes = t), Jm(e, t));
      }
    }
    function no(e, a) {
      var t = e.updateQueue,
        l = e.alternate;
      if (l !== null && ((l = l.updateQueue), t === l)) {
        var n = null,
          u = null;
        if (((t = t.firstBaseUpdate), t !== null)) {
          do {
            var r = {
              lane: t.lane,
              tag: t.tag,
              payload: t.payload,
              callback: null,
              next: null,
            };
            (u === null ? (n = u = r) : (u = u.next = r), (t = t.next));
          } while (t !== null);
          u === null ? (n = u = a) : (u = u.next = a);
        } else n = u = a;
        ((t = {
          baseState: l.baseState,
          firstBaseUpdate: n,
          lastBaseUpdate: u,
          shared: l.shared,
          callbacks: l.callbacks,
        }),
          (e.updateQueue = t));
        return;
      }
      ((e = t.lastBaseUpdate),
        e === null ? (t.firstBaseUpdate = a) : (e.next = a),
        (t.lastBaseUpdate = a));
    }
    var Vo = !1;
    function Cu() {
      if (Vo) {
        var e = pn;
        if (e !== null) throw e;
      }
    }
    function Au(e, a, t, l) {
      Vo = !1;
      var n = e.updateQueue;
      Pt = !1;
      var u = n.firstBaseUpdate,
        r = n.lastBaseUpdate,
        s = n.shared.pending;
      if (s !== null) {
        n.shared.pending = null;
        var o = s,
          d = o.next;
        ((o.next = null), r === null ? (u = d) : (r.next = d), (r = o));
        var c = e.alternate;
        c !== null &&
          ((c = c.updateQueue),
          (s = c.lastBaseUpdate),
          s !== r &&
            (s === null ? (c.firstBaseUpdate = d) : (s.next = d),
            (c.lastBaseUpdate = o)));
      }
      if (u !== null) {
        var p = n.baseState;
        ((r = 0), (c = d = o = null), (s = u));
        do {
          var f = s.lane & -536870913,
            m = f !== s.lane;
          if (m ? (F & f) === f : (l & f) === f) {
            (f !== 0 && f === Tl && (Vo = !0),
              c !== null &&
                (c = c.next =
                  {
                    lane: 0,
                    tag: s.tag,
                    payload: s.payload,
                    callback: null,
                    next: null,
                  }));
            e: {
              var v = e,
                C = s;
              f = a;
              var k = t;
              switch (C.tag) {
                case 1:
                  if (((v = C.payload), typeof v == "function")) {
                    p = v.call(k, p, f);
                    break e;
                  }
                  p = v;
                  break e;
                case 3:
                  v.flags = (v.flags & -65537) | 128;
                case 0:
                  if (
                    ((v = C.payload),
                    (f = typeof v == "function" ? v.call(k, p, f) : v),
                    f == null)
                  )
                    break e;
                  p = ue({}, p, f);
                  break e;
                case 2:
                  Pt = !0;
              }
            }
            ((f = s.callback),
              f !== null &&
                ((e.flags |= 64),
                m && (e.flags |= 8192),
                (m = n.callbacks),
                m === null ? (n.callbacks = [f]) : m.push(f)));
          } else
            ((m = {
              lane: f,
              tag: s.tag,
              payload: s.payload,
              callback: s.callback,
              next: null,
            }),
              c === null ? ((d = c = m), (o = p)) : (c = c.next = m),
              (r |= f));
          if (((s = s.next), s === null)) {
            if (((s = n.shared.pending), s === null)) break;
            ((m = s),
              (s = m.next),
              (m.next = null),
              (n.lastBaseUpdate = m),
              (n.shared.pending = null));
          }
        } while (!0);
        (c === null && (o = p),
          (n.baseState = o),
          (n.firstBaseUpdate = d),
          (n.lastBaseUpdate = c),
          u === null && (n.shared.lanes = 0),
          (al |= r),
          (e.lanes = r),
          (e.memoizedState = p));
      }
    }
    function Pg(e, a) {
      if (typeof e != "function") throw Error(S(191, e));
      e.call(a);
    }
    function Dg(e, a) {
      var t = e.callbacks;
      if (t !== null)
        for (e.callbacks = null, e = 0; e < t.length; e++) Pg(t[e], a);
    }
    var $t = nt(null),
      Si = nt(0);
    function Op(e, a) {
      ((e = Ct), oe(Si, e), oe($t, a), (Ct = e | a.baseLanes));
    }
    function Zo() {
      (oe(Si, Ct), oe($t, $t.current));
    }
    function Wd() {
      ((Ct = Si.current), Pe($t), Pe(Si));
    }
    var Ue = nt(null),
      Ge = null;
    function Vt(e) {
      var a = e.alternate;
      (oe(De, De.current & 1),
        oe(Ue, e),
        Ge === null &&
          (a === null || $t.current !== null || a.memoizedState !== null) &&
          (Ge = e));
    }
    function jo(e) {
      (oe(De, De.current), oe(Ue, e), Ge === null && (Ge = e));
    }
    function Rg(e) {
      e.tag === 22
        ? (oe(De, De.current), oe(Ue, e), Ge === null && (Ge = e))
        : Zt();
    }
    function Zt() {
      (oe(De, De.current), oe(Ue, Ue.current));
    }
    function ia(e) {
      (Pe(Ue), Ge === e && (Ge = null), Pe(De));
    }
    var De = nt(0);
    function Ru(e, a) {
      (oe(Ue, Ue.current), oe(De, a));
    }
    function _d(e) {
      (Pe(De), Pe(Ue), Ge === e && (Ge = null));
    }
    function xi(e) {
      for (var a = e; a !== null; ) {
        if (a.tag === 13) {
          var t = a.memoizedState;
          if (t !== null && ((t = t.dehydrated), t === null || Td(t) || Ic(t)))
            return a;
        } else if (
          a.tag === 19 &&
          a.memoizedProps.revealOrder !== "independent"
        ) {
          if ((a.flags & 128) !== 0) return a;
        } else if (a.child !== null) {
          ((a.child.return = a), (a = a.child));
          continue;
        }
        if (a === e) break;
        for (; a.sibling === null; ) {
          if (a.return === null || a.return === e) return null;
          a = a.return;
        }
        ((a.sibling.return = a.return), (a = a.sibling));
      }
      return null;
    }
    var bt = 0,
      N = null,
      le = null,
      he = null,
      Ii = !1,
      gn = !1,
      Bl = !1,
      ki = 0,
      Uu = 0,
      hn = null,
      O0 = 0;
    function pe() {
      throw Error(S(321));
    }
    function $d(e, a) {
      if (a === null) return !1;
      for (var t = 0; t < a.length && t < e.length; t++)
        if (!ma(e[t], a[t])) return !1;
      return !0;
    }
    function ec(e, a, t, l, n, u) {
      return (
        (bt = u),
        (N = a),
        (a.memoizedState = null),
        (a.updateQueue = null),
        (a.lanes = 0),
        (R.H = e === null || e.memoizedState === null ? fh : ph),
        (Bl = !1),
        (u = t(l, n)),
        (Bl = !1),
        gn && (u = zg(a, t, l, n)),
        Ug(e),
        u
      );
    }
    function Ug(e) {
      R.H = Ti;
      var a = le !== null && le.next !== null;
      if (((bt = 0), (he = le = N = null), (Ii = !1), (Uu = 0), (hn = null), a))
        throw Error(S(300));
      e === null ||
        ve ||
        ((e = e.dependencies), e !== null && Ai(e) && (ve = !0));
    }
    function zg(e, a, t, l) {
      N = e;
      var n = 0;
      do {
        if ((gn && (hn = null), (Uu = 0), (gn = !1), 25 <= n))
          throw Error(S(301));
        if (((n += 1), (he = le = null), e.updateQueue != null)) {
          var u = e.updateQueue;
          ((u.lastEffect = null),
            (u.events = null),
            (u.stores = null),
            u.memoCache != null && (u.memoCache.index = 0));
        }
        ((R.H = H0), (u = a(t, l)));
      } while (gn);
      return u;
    }
    function M0() {
      var e = R.H,
        a = e.useState()[0];
      return (
        (a = typeof a.then == "function" ? Wu(a) : a),
        (e = e.useState()[0]),
        (le !== null ? le.memoizedState : null) !== e && (N.flags |= 1024),
        a
      );
    }
    function ac() {
      var e = ki !== 0;
      return ((ki = 0), e);
    }
    function tc(e, a, t) {
      ((a.updateQueue = e.updateQueue), (a.flags &= -2053), (e.lanes &= ~t));
    }
    function lc(e) {
      if (Ii) {
        for (e = e.memoizedState; e !== null; ) {
          var a = e.queue;
          (a !== null && (a.pending = null), (e = e.next));
        }
        Ii = !1;
      }
      ((bt = 0), (he = le = N = null), (gn = !1), (Uu = ki = 0), (hn = null));
    }
    function je() {
      var e = {
        memoizedState: null,
        baseState: null,
        baseQueue: null,
        queue: null,
        next: null,
      };
      return (
        he === null ? (N.memoizedState = he = e) : (he = he.next = e),
        he
      );
    }
    function ge() {
      if (le === null) {
        var e = N.alternate;
        e = e !== null ? e.memoizedState : null;
      } else e = le.next;
      var a = he === null ? N.memoizedState : he.next;
      if (a !== null) ((he = a), (le = e));
      else {
        if (e === null)
          throw N.alternate === null ? Error(S(467)) : Error(S(310));
        ((le = e),
          (e = {
            memoizedState: le.memoizedState,
            baseState: le.baseState,
            baseQueue: le.baseQueue,
            queue: le.queue,
            next: null,
          }),
          he === null ? (N.memoizedState = he = e) : (he = he.next = e));
      }
      return he;
    }
    function Xi() {
      return { lastEffect: null, events: null, stores: null, memoCache: null };
    }
    function Wu(e) {
      var a = Uu;
      return (
        (Uu += 1),
        hn === null && (hn = []),
        (e = qg(hn, e, a)),
        (a = N),
        (he === null ? a.memoizedState : he.next) === null &&
          ((a = a.alternate),
          (R.H = a === null || a.memoizedState === null ? fh : ph)),
        e
      );
    }
    function Wi(e) {
      if (e !== null && typeof e == "object") {
        if (typeof e.then == "function") return Wu(e);
        if (e.$$typeof === py) return;
        if (e.$$typeof === Wa) return Me(e);
      }
      throw Error(S(438, String(e)));
    }
    function nc(e) {
      var a = null,
        t = N.updateQueue;
      if ((t !== null && (a = t.memoCache), a == null)) {
        var l = N.alternate;
        l !== null &&
          ((l = l.updateQueue),
          l !== null &&
            ((l = l.memoCache),
            l != null &&
              (a = {
                data: l.data.map(function (n) {
                  return n.slice();
                }),
                index: 0,
              })));
      }
      if (
        (a == null && (a = { data: [], index: 0 }),
        t === null && ((t = Xi()), (N.updateQueue = t)),
        (t.memoCache = a),
        (t = a.data[a.index]),
        t === void 0)
      )
        for (t = a.data[a.index] = Array(e), l = 0; l < e; l++) t[l] = fy;
      return (a.index++, t);
    }
    function vt(e, a) {
      return typeof a == "function" ? a(e) : a;
    }
    function ei(e) {
      var a = ge();
      return uc(a, le, e);
    }
    function uc(e, a, t) {
      var l = e.queue;
      if (l === null) throw Error(S(311));
      l.lastRenderedReducer = t;
      var n = e.baseQueue,
        u = l.pending;
      if (u !== null) {
        if (n !== null) {
          var r = n.next;
          ((n.next = u.next), (u.next = r));
        }
        ((a.baseQueue = n = u), (l.pending = null));
      }
      if (((u = e.baseState), n === null)) e.memoizedState = u;
      else {
        a = n.next;
        var s = (r = null),
          o = null,
          d = a,
          c = !1;
        do {
          var p = d.lane & -536870913;
          if (p !== d.lane ? (F & p) === p : (bt & p) === p) {
            var f = d.revertLane;
            if (f === 0)
              (o !== null &&
                (o = o.next =
                  {
                    lane: 0,
                    revertLane: 0,
                    gesture: null,
                    action: d.action,
                    hasEagerState: d.hasEagerState,
                    eagerState: d.eagerState,
                    next: null,
                  }),
                p === Tl && (c = !0));
            else if ((bt & f) === f) {
              ((d = d.next), f === Tl && (c = !0));
              continue;
            } else
              ((p = {
                lane: 0,
                revertLane: d.revertLane,
                gesture: null,
                action: d.action,
                hasEagerState: d.hasEagerState,
                eagerState: d.eagerState,
                next: null,
              }),
                o === null ? ((s = o = p), (r = u)) : (o = o.next = p),
                (N.lanes |= f),
                (al |= f));
            ((p = d.action),
              Bl && t(u, p),
              (u = d.hasEagerState ? d.eagerState : t(u, p)));
          } else
            ((f = {
              lane: p,
              revertLane: d.revertLane,
              gesture: d.gesture,
              action: d.action,
              hasEagerState: d.hasEagerState,
              eagerState: d.eagerState,
              next: null,
            }),
              o === null ? ((s = o = f), (r = u)) : (o = o.next = f),
              (N.lanes |= p),
              (al |= p));
          d = d.next;
        } while (d !== null && d !== a);
        if (
          (o === null ? (r = u) : (o.next = s),
          !ma(u, e.memoizedState) && ((ve = !0), c && ((t = pn), t !== null)))
        )
          throw t;
        ((e.memoizedState = u),
          (e.baseState = r),
          (e.baseQueue = o),
          (l.lastRenderedState = u));
      }
      return (n === null && (l.lanes = 0), [e.memoizedState, l.dispatch]);
    }
    function uo(e) {
      var a = ge(),
        t = a.queue;
      if (t === null) throw Error(S(311));
      t.lastRenderedReducer = e;
      var l = t.dispatch,
        n = t.pending,
        u = a.memoizedState;
      if (n !== null) {
        t.pending = null;
        var r = (n = n.next);
        do ((u = e(u, r.action)), (r = r.next));
        while (r !== n);
        (ma(u, a.memoizedState) || (ve = !0),
          (a.memoizedState = u),
          a.baseQueue === null && (a.baseState = u),
          (t.lastRenderedState = u));
      }
      return [u, l];
    }
    function Ng(e, a, t) {
      var l = N,
        n = ge(),
        u = H;
      if (u) {
        if (t === void 0) throw Error(S(407));
        t = t();
      } else t = a();
      var r = !ma((le || n).memoizedState, t);
      if (
        (r && ((n.memoizedState = t), (ve = !0)),
        (n = n.queue),
        rc(Kg.bind(null, l, n, e), [e]),
        (e =
          n.getSnapshot !== a ||
          r ||
          (he !== null && (he.memoizedState.tag & 1) !== 0)),
        Sn(e ? 9 : 8, { destroy: void 0 }, Eg.bind(null, l, n, t, a), null),
        e)
      ) {
        if (((l.flags |= 2048), ne === null)) throw Error(S(349));
        u || (bt & 127) !== 0 || Hg(l, a, t);
      }
      return t;
    }
    function Hg(e, a, t) {
      ((e.flags |= 16384),
        (e = { getSnapshot: a, value: t }),
        (a = N.updateQueue),
        a === null
          ? ((a = Xi()), (N.updateQueue = a), (a.stores = [e]))
          : ((t = a.stores), t === null ? (a.stores = [e]) : t.push(e)));
    }
    function Eg(e, a, t, l) {
      ((a.value = t), (a.getSnapshot = l), Gg(a) && Fg(e));
    }
    function Kg(e, a, t) {
      return t(function () {
        Gg(a) && Fg(e);
      });
    }
    function Gg(e) {
      var a = e.getSnapshot;
      e = e.value;
      try {
        var t = a();
        return !ma(e, t);
      } catch {
        return !0;
      }
    }
    function Fg(e) {
      var a = Rl(e, 2);
      a !== null && ea(a, e, 2);
    }
    function Yo(e) {
      var a = je();
      if (typeof e == "function") {
        var t = e;
        if (((e = t()), Bl)) {
          Rt(!0);
          try {
            t();
          } finally {
            Rt(!1);
          }
        }
      }
      return (
        (a.memoizedState = a.baseState = e),
        (a.queue = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: vt,
          lastRenderedState: e,
        }),
        a
      );
    }
    function Qg(e, a, t, l) {
      return ((e.baseState = t), uc(e, le, typeof l == "function" ? l : vt));
    }
    function P0(e, a, t, l, n) {
      if ($i(e)) throw Error(S(485));
      if (((e = a.action), e !== null)) {
        var u = {
          payload: n,
          action: e,
          next: null,
          isTransition: !0,
          status: "pending",
          value: null,
          reason: null,
          listeners: [],
          then: function (r) {
            u.listeners.push(r);
          },
        };
        (R.T !== null ? t(!0) : (u.isTransition = !1),
          l(u),
          (t = a.pending),
          t === null
            ? ((u.next = a.pending = u), Vg(a, u))
            : ((u.next = t.next), (a.pending = t.next = u)));
      }
    }
    function Vg(e, a) {
      var t = a.action,
        l = a.payload,
        n = e.state;
      if (a.isTransition) {
        var u = R.T,
          r = {};
        ((r.types = u !== null ? u.types : null), (R.T = r));
        try {
          var s = t(n, l),
            o = R.S;
          (o !== null && o(r, s), Mp(e, a, s));
        } catch (d) {
          Jo(e, a, d);
        } finally {
          (u !== null && r.types !== null && (u.types = r.types), (R.T = u));
        }
      } else
        try {
          ((u = t(n, l)), Mp(e, a, u));
        } catch (d) {
          Jo(e, a, d);
        }
    }
    function Mp(e, a, t) {
      t !== null && typeof t == "object" && typeof t.then == "function"
        ? t.then(
            function (l) {
              Pp(e, a, l);
            },
            function (l) {
              return Jo(e, a, l);
            },
          )
        : Pp(e, a, t);
    }
    function Pp(e, a, t) {
      ((a.status = "fulfilled"),
        (a.value = t),
        Zg(a),
        (e.state = t),
        (a = e.pending),
        a !== null &&
          ((t = a.next),
          t === a
            ? (e.pending = null)
            : ((t = t.next), (a.next = t), Vg(e, t))));
    }
    function Jo(e, a, t) {
      var l = e.pending;
      if (((e.pending = null), l !== null)) {
        l = l.next;
        do ((a.status = "rejected"), (a.reason = t), Zg(a), (a = a.next));
        while (a !== l);
      }
      e.action = null;
    }
    function Zg(e) {
      e = e.listeners;
      for (var a = 0; a < e.length; a++) (0, e[a])();
    }
    function jg(e, a) {
      return a;
    }
    function Dp(e, a) {
      if (H) {
        var t = ne.formState;
        if (t !== null) {
          e: {
            var l = N;
            if (H) {
              if (se) {
                a: {
                  for (var n = se, u = Ia; n.nodeType !== 8; ) {
                    if (!u) {
                      n = null;
                      break a;
                    }
                    if (((n = ka(n.nextSibling)), n === null)) {
                      n = null;
                      break a;
                    }
                  }
                  ((u = n.data), (n = u === "F!" || u === "F" ? n : null));
                }
                if (n) {
                  ((se = ka(n.nextSibling)), (l = n.data === "F!"));
                  break e;
                }
              }
              _t(l);
            }
            l = !1;
          }
          l && (a = t[0]);
        }
      }
      return (
        (t = je()),
        (t.memoizedState = t.baseState = a),
        (l = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: jg,
          lastRenderedState: a,
        }),
        (t.queue = l),
        (t = oh.bind(null, N, l)),
        (l.dispatch = t),
        (l = Yo(!1)),
        (u = dc.bind(null, N, !1, l.queue)),
        (l = je()),
        (n = { state: a, dispatch: null, action: e, pending: null }),
        (l.queue = n),
        (t = P0.bind(null, N, n, u, t)),
        (n.dispatch = t),
        (l.memoizedState = e),
        [a, t, !1]
      );
    }
    function Rp(e) {
      var a = ge();
      return Yg(a, le, e);
    }
    function Yg(e, a, t) {
      if (
        ((a = uc(e, a, jg)[0]),
        (e = ei(vt)[0]),
        typeof a == "object" && a !== null && typeof a.then == "function")
      )
        try {
          var l = Wu(a);
        } catch (r) {
          throw r === Rn ? Ji : r;
        }
      else l = a;
      a = ge();
      var n = a.queue,
        u = n.dispatch;
      return (
        t !== a.memoizedState &&
          ((N.flags |= 2048),
          Sn(9, { destroy: void 0 }, D0.bind(null, n, t), null)),
        [l, u, e]
      );
    }
    function D0(e, a) {
      e.action = a;
    }
    function Up(e) {
      var a = ge(),
        t = le;
      if (t !== null) return Yg(a, t, e);
      (ge(), (a = a.memoizedState), (t = ge()));
      var l = t.queue.dispatch;
      return ((t.memoizedState = e), [a, l, !1]);
    }
    function Sn(e, a, t, l) {
      return (
        (e = { tag: e, create: t, deps: l, inst: a, next: null }),
        (a = N.updateQueue),
        a === null && ((a = Xi()), (N.updateQueue = a)),
        (t = a.lastEffect),
        t === null
          ? (a.lastEffect = e.next = e)
          : ((l = t.next), (t.next = e), (e.next = l), (a.lastEffect = e)),
        e
      );
    }
    function Jg() {
      return ge().memoizedState;
    }
    function ai(e, a, t, l) {
      var n = je();
      ((N.flags |= e),
        (n.memoizedState = Sn(
          1 | a,
          { destroy: void 0 },
          t,
          l === void 0 ? null : l,
        )));
    }
    function _i(e, a, t, l) {
      var n = ge();
      l = l === void 0 ? null : l;
      var u = n.memoizedState.inst;
      le !== null && l !== null && $d(l, le.memoizedState.deps)
        ? (n.memoizedState = Sn(a, u, t, l))
        : ((N.flags |= e), (n.memoizedState = Sn(1 | a, u, t, l)));
    }
    function zp(e, a) {
      ai(8390656, 8, e, a);
    }
    function rc(e, a) {
      _i(2048, 8, e, a);
    }
    function R0(e) {
      N.flags |= 4;
      var a = N.updateQueue;
      if (a === null) ((a = Xi()), (N.updateQueue = a), (a.events = [e]));
      else {
        var t = a.events;
        t === null ? (a.events = [e]) : t.push(e);
      }
    }
    function Xg(e) {
      var a = ge().memoizedState;
      return (
        R0({ ref: a, nextImpl: e }),
        function () {
          if ((j & 2) !== 0) throw Error(S(440));
          return a.impl.apply(void 0, arguments);
        }
      );
    }
    function Wg(e, a) {
      return _i(4, 2, e, a);
    }
    function _g(e, a) {
      return _i(4, 4, e, a);
    }
    function $g(e, a) {
      if (typeof a == "function") {
        e = e();
        var t = a(e);
        return function () {
          typeof t == "function" ? t() : a(null);
        };
      }
      if (a != null)
        return (
          (e = e()),
          (a.current = e),
          function () {
            a.current = null;
          }
        );
    }
    function eh(e, a, t) {
      ((t = t != null ? t.concat([e]) : null),
        _i(4, 4, $g.bind(null, a, e), t));
    }
    function ic() {}
    function ah(e, a) {
      var t = ge();
      a = a === void 0 ? null : a;
      var l = t.memoizedState;
      return a !== null && $d(a, l[1]) ? l[0] : ((t.memoizedState = [e, a]), e);
    }
    function th(e, a) {
      var t = ge();
      a = a === void 0 ? null : a;
      var l = t.memoizedState;
      if (a !== null && $d(a, l[1])) return l[0];
      if (((l = e()), Bl)) {
        Rt(!0);
        try {
          e();
        } finally {
          Rt(!1);
        }
      }
      return ((t.memoizedState = [l, a]), l);
    }
    function sc(e, a, t) {
      return t === void 0 || ((bt & 1073741824) !== 0 && (F & 261930) === 0)
        ? (e.memoizedState = a)
        : ((e.memoizedState = t), (e = Yh()), (N.lanes |= e), (al |= e), t);
    }
    function lh(e, a, t, l) {
      return ma(t, a)
        ? t
        : $t.current !== null
          ? ((e = sc(e, t, l)), ma(e, a) || (ve = !0), e)
          : (bt & 106) === 0 || ((bt & 1073741824) !== 0 && (F & 261930) === 0)
            ? ((ve = !0), (e.memoizedState = t))
            : ((e = Yh()), (N.lanes |= e), (al |= e), a);
    }
    function nh(e, a, t, l, n) {
      var u = Y.p;
      Y.p = u !== 0 && 8 > u ? u : 8;
      var r = R.T,
        s = {};
      ((s.types = r !== null ? r.types : null), (R.T = s), dc(e, !1, a, t));
      try {
        var o = n(),
          d = R.S;
        if (
          (d !== null && d(s, o),
          o !== null && typeof o == "object" && typeof o.then == "function")
        ) {
          var c = q0(o, l);
          Lu(e, a, c, pa(e));
        } else Lu(e, a, l, pa(e));
      } catch (p) {
        Lu(e, a, { then: function () {}, status: "rejected", reason: p }, pa());
      } finally {
        ((Y.p = u),
          r !== null && s.types !== null && (r.types = s.types),
          (R.T = r));
      }
    }
    function U0() {}
    function Xo(e, a, t, l) {
      if (e.tag !== 5) throw Error(S(476));
      var n = uh(e).queue;
      nh(
        e,
        n,
        a,
        yl,
        t === null
          ? U0
          : function () {
              return (rh(e), t(l));
            },
      );
    }
    function uh(e) {
      var a = e.memoizedState;
      if (a !== null) return a;
      a = {
        memoizedState: yl,
        baseState: yl,
        baseQueue: null,
        queue: {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: vt,
          lastRenderedState: yl,
        },
        next: null,
      };
      var t = {};
      return (
        (a.next = {
          memoizedState: t,
          baseState: t,
          baseQueue: null,
          queue: {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: vt,
            lastRenderedState: t,
          },
          next: null,
        }),
        (e.memoizedState = a),
        (e = e.alternate),
        e !== null && (e.memoizedState = a),
        a
      );
    }
    function rh(e) {
      var a = uh(e);
      (a.next === null && (a = e.alternate.memoizedState),
        Lu(e, a.next.queue, {}, pa()));
    }
    function oc() {
      return Me(qn);
    }
    function ih() {
      return ge().memoizedState;
    }
    function sh() {
      return ge().memoizedState;
    }
    function z0(e) {
      for (var a = e.return; a !== null; ) {
        switch (a.tag) {
          case 24:
          case 3:
            var t = pa();
            e = Ft(t);
            var l = Qt(a, e, t);
            (l !== null && (ea(l, a, t), yu(l, a, t)),
              (a = { cache: jd() }),
              (e.payload = a));
            return;
        }
        a = a.return;
      }
    }
    function N0(e, a, t) {
      var l = pa();
      ((t = {
        lane: l,
        revertLane: 0,
        gesture: null,
        action: t,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
        $i(e)
          ? dh(a, t)
          : ((t = Qd(e, a, t, l)), t !== null && (ea(t, e, l), ch(t, a, l))));
    }
    function oh(e, a, t) {
      var l = pa();
      Lu(e, a, t, l);
    }
    function Lu(e, a, t, l) {
      var n = {
        lane: l,
        revertLane: 0,
        gesture: null,
        action: t,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      };
      if ($i(e)) dh(a, n);
      else {
        var u = e.alternate;
        if (
          e.lanes === 0 &&
          (u === null || u.lanes === 0) &&
          ((u = a.lastRenderedReducer), u !== null)
        )
          try {
            var r = a.lastRenderedState,
              s = u(r, t);
            if (((n.hasEagerState = !0), (n.eagerState = s), ma(s, r)))
              return (ji(e, a, n, 0), ne === null && Zi(), !1);
          } catch {
          } finally {
          }
        if (((t = Qd(e, a, n, l)), t !== null))
          return (ea(t, e, l), ch(t, a, l), !0);
      }
      return !1;
    }
    function dc(e, a, t, l) {
      if (
        ((l = {
          lane: 2,
          revertLane: Ac(),
          gesture: null,
          action: l,
          hasEagerState: !1,
          eagerState: null,
          next: null,
        }),
        $i(e))
      ) {
        if (a) throw Error(S(479));
      } else ((a = Qd(e, t, l, 2)), a !== null && ea(a, e, 2));
    }
    function $i(e) {
      var a = e.alternate;
      return e === N || (a !== null && a === N);
    }
    function dh(e, a) {
      gn = Ii = !0;
      var t = e.pending;
      (t === null ? (a.next = a) : ((a.next = t.next), (t.next = a)),
        (e.pending = a));
    }
    function ch(e, a, t) {
      if ((t & 4194048) !== 0) {
        var l = a.lanes;
        ((l &= e.pendingLanes), (t |= l), (a.lanes = t), Jm(e, t));
      }
    }
    var Ti = {
        readContext: Me,
        use: Wi,
        useCallback: pe,
        useContext: pe,
        useEffect: pe,
        useImperativeHandle: pe,
        useLayoutEffect: pe,
        useInsertionEffect: pe,
        useMemo: pe,
        useReducer: pe,
        useRef: pe,
        useState: pe,
        useDebugValue: pe,
        useDeferredValue: pe,
        useTransition: pe,
        useSyncExternalStore: pe,
        useId: pe,
        useHostTransitionStatus: pe,
        useFormState: pe,
        useActionState: pe,
        useOptimistic: pe,
        useMemoCache: pe,
        useCacheRefresh: pe,
        useEffectEvent: pe,
      },
      fh = {
        readContext: Me,
        use: Wi,
        useCallback: function (e, a) {
          return ((je().memoizedState = [e, a === void 0 ? null : a]), e);
        },
        useContext: Me,
        useEffect: zp,
        useImperativeHandle: function (e, a, t) {
          ((t = t != null ? t.concat([e]) : null),
            ai(4194308, 4, $g.bind(null, a, e), t));
        },
        useLayoutEffect: function (e, a) {
          return ai(4194308, 4, e, a);
        },
        useInsertionEffect: function (e, a) {
          ai(4, 2, e, a);
        },
        useMemo: function (e, a) {
          var t = je();
          a = a === void 0 ? null : a;
          var l = e();
          if (Bl) {
            Rt(!0);
            try {
              e();
            } finally {
              Rt(!1);
            }
          }
          return ((t.memoizedState = [l, a]), l);
        },
        useReducer: function (e, a, t) {
          var l = je();
          if (t !== void 0) {
            var n = t(a);
            if (Bl) {
              Rt(!0);
              try {
                t(a);
              } finally {
                Rt(!1);
              }
            }
          } else n = a;
          return (
            (l.memoizedState = l.baseState = n),
            (e = {
              pending: null,
              lanes: 0,
              dispatch: null,
              lastRenderedReducer: e,
              lastRenderedState: n,
            }),
            (l.queue = e),
            (e = e.dispatch = N0.bind(null, N, e)),
            [l.memoizedState, e]
          );
        },
        useRef: function (e) {
          var a = je();
          return ((e = { current: e }), (a.memoizedState = e));
        },
        useState: function (e) {
          e = Yo(e);
          var a = e.queue,
            t = oh.bind(null, N, a);
          return ((a.dispatch = t), [e.memoizedState, t]);
        },
        useDebugValue: ic,
        useDeferredValue: function (e, a) {
          var t = je();
          return sc(t, e, a);
        },
        useTransition: function () {
          var e = Yo(!1);
          return (
            (e = nh.bind(null, N, e.queue, !0, !1)),
            (je().memoizedState = e),
            [!1, e]
          );
        },
        useSyncExternalStore: function (e, a, t) {
          var l = N,
            n = je();
          if (H) {
            if (t === void 0) throw Error(S(407));
            t = t();
          } else {
            if (((t = a()), ne === null)) throw Error(S(349));
            (F & 127) !== 0 || Hg(l, a, t);
          }
          n.memoizedState = t;
          var u = { value: t, getSnapshot: a };
          return (
            (n.queue = u),
            zp(Kg.bind(null, l, u, e), [e]),
            (l.flags |= 2048),
            Sn(9, { destroy: void 0 }, Eg.bind(null, l, u, t, a), null),
            t
          );
        },
        useId: function () {
          var e = je(),
            a = ne.identifierPrefix;
          if (H) {
            var t = et,
              l = $a;
            ((t = (l & ~(1 << (32 - fa(l) - 1))).toString(32) + t),
              (a = "_" + a + "R_" + t),
              (t = ki++),
              0 < t && (a += "H" + t.toString(32)),
              (a += "_"));
          } else ((t = O0++), (a = "_" + a + "r_" + t.toString(32) + "_"));
          return (e.memoizedState = a);
        },
        useHostTransitionStatus: oc,
        useFormState: Dp,
        useActionState: Dp,
        useOptimistic: function (e) {
          var a = je();
          a.memoizedState = a.baseState = e;
          var t = {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: null,
            lastRenderedState: null,
          };
          return (
            (a.queue = t),
            (a = dc.bind(null, N, !0, t)),
            (t.dispatch = a),
            [e, a]
          );
        },
        useMemoCache: nc,
        useCacheRefresh: function () {
          return (je().memoizedState = z0.bind(null, N));
        },
        useEffectEvent: function (e) {
          var a = je(),
            t = { impl: e };
          return (
            (a.memoizedState = t),
            function () {
              if ((j & 2) !== 0) throw Error(S(440));
              return t.impl.apply(void 0, arguments);
            }
          );
        },
      },
      ph = {
        readContext: Me,
        use: Wi,
        useCallback: ah,
        useContext: Me,
        useEffect: rc,
        useImperativeHandle: eh,
        useInsertionEffect: Wg,
        useLayoutEffect: _g,
        useMemo: th,
        useReducer: ei,
        useRef: Jg,
        useState: function () {
          return ei(vt);
        },
        useDebugValue: ic,
        useDeferredValue: function (e, a) {
          var t = ge();
          return lh(t, le.memoizedState, e, a);
        },
        useTransition: function () {
          var e = ei(vt)[0],
            a = ge().memoizedState;
          return [typeof e == "boolean" ? e : Wu(e), a];
        },
        useSyncExternalStore: Ng,
        useId: ih,
        useHostTransitionStatus: oc,
        useFormState: Rp,
        useActionState: Rp,
        useOptimistic: function (e, a) {
          var t = ge();
          return Qg(t, le, e, a);
        },
        useMemoCache: nc,
        useCacheRefresh: sh,
        useEffectEvent: Xg,
      },
      H0 = {
        readContext: Me,
        use: Wi,
        useCallback: ah,
        useContext: Me,
        useEffect: rc,
        useImperativeHandle: eh,
        useInsertionEffect: Wg,
        useLayoutEffect: _g,
        useMemo: th,
        useReducer: uo,
        useRef: Jg,
        useState: function () {
          return uo(vt);
        },
        useDebugValue: ic,
        useDeferredValue: function (e, a) {
          var t = ge();
          return le === null ? sc(t, e, a) : lh(t, le.memoizedState, e, a);
        },
        useTransition: function () {
          var e = uo(vt)[0],
            a = ge().memoizedState;
          return [typeof e == "boolean" ? e : Wu(e), a];
        },
        useSyncExternalStore: Ng,
        useId: ih,
        useHostTransitionStatus: oc,
        useFormState: Up,
        useActionState: Up,
        useOptimistic: function (e, a) {
          var t = ge();
          return le !== null
            ? Qg(t, le, e, a)
            : ((t.baseState = e), [e, t.queue.dispatch]);
        },
        useMemoCache: nc,
        useCacheRefresh: sh,
        useEffectEvent: Xg,
      };
    function ro(e, a, t, l) {
      ((a = e.memoizedState),
        (t = t(l, a)),
        (t = t == null ? a : ue({}, a, t)),
        (e.memoizedState = t),
        e.lanes === 0 && (e.updateQueue.baseState = t));
    }
    var Wo = {
      enqueueSetState: function (e, a, t) {
        e = e._reactInternals;
        var l = pa(),
          n = Ft(l);
        ((n.payload = a),
          t != null && (n.callback = t),
          (a = Qt(e, n, l)),
          a !== null && (ea(a, e, l), yu(a, e, l)));
      },
      enqueueReplaceState: function (e, a, t) {
        e = e._reactInternals;
        var l = pa(),
          n = Ft(l);
        ((n.tag = 1),
          (n.payload = a),
          t != null && (n.callback = t),
          (a = Qt(e, n, l)),
          a !== null && (ea(a, e, l), yu(a, e, l)));
      },
      enqueueForceUpdate: function (e, a) {
        e = e._reactInternals;
        var t = pa(),
          l = Ft(t);
        ((l.tag = 2),
          a != null && (l.callback = a),
          (a = Qt(e, l, t)),
          a !== null && (ea(a, e, t), yu(a, e, t)));
      },
    };
    function Np(e, a, t, l, n, u, r) {
      return (
        (e = e.stateNode),
        typeof e.shouldComponentUpdate == "function"
          ? e.shouldComponentUpdate(l, u, r)
          : a.prototype && a.prototype.isPureReactComponent
            ? !Ou(t, l) || !Ou(n, u)
            : !0
      );
    }
    function Hp(e, a, t, l) {
      ((e = a.state),
        typeof a.componentWillReceiveProps == "function" &&
          a.componentWillReceiveProps(t, l),
        typeof a.UNSAFE_componentWillReceiveProps == "function" &&
          a.UNSAFE_componentWillReceiveProps(t, l),
        a.state !== e && Wo.enqueueReplaceState(a, a.state, null));
    }
    function ql(e, a) {
      var t = a;
      if ("ref" in a) {
        t = {};
        for (var l in a) l !== "ref" && (t[l] = a[l]);
      }
      if ((e = e.defaultProps)) {
        t === a && (t = ue({}, t));
        for (var n in e) t[n] === void 0 && (t[n] = e[n]);
      }
      return t;
    }
    function mh(e) {
      bi(e);
    }
    function gh(e) {
      console.error(e);
    }
    function hh(e) {
      bi(e);
    }
    function wi(e, a) {
      try {
        var t = e.onUncaughtError;
        t(a.value, { componentStack: a.stack });
      } catch (l) {
        setTimeout(function () {
          throw l;
        });
      }
    }
    function Ep(e, a, t) {
      try {
        var l = e.onCaughtError;
        l(t.value, {
          componentStack: t.stack,
          errorBoundary: a.tag === 1 ? a.stateNode : null,
        });
      } catch (n) {
        setTimeout(function () {
          throw n;
        });
      }
    }
    function _o(e, a, t) {
      return (
        (t = Ft(t)),
        (t.tag = 3),
        (t.payload = { element: null }),
        (t.callback = function () {
          wi(e, a);
        }),
        t
      );
    }
    function bh(e) {
      return ((e = Ft(e)), (e.tag = 3), e);
    }
    function vh(e, a, t, l) {
      var n = t.type.getDerivedStateFromError;
      if (typeof n == "function") {
        var u = l.value;
        ((e.payload = function () {
          return n(u);
        }),
          (e.callback = function () {
            Ep(a, t, l);
          }));
      }
      var r = t.stateNode;
      r !== null &&
        typeof r.componentDidCatch == "function" &&
        (e.callback = function () {
          (Ep(a, t, l),
            typeof n != "function" &&
              (jt === null ? (jt = new Set([this])) : jt.add(this)));
          var s = l.stack;
          this.componentDidCatch(l.value, {
            componentStack: s !== null ? s : "",
          });
        });
    }
    function E0(e, a, t, l, n) {
      if (
        ((t.flags |= 32768),
        l !== null && typeof l == "object" && typeof l.then == "function")
      ) {
        if (
          ((a = t.alternate),
          a !== null && Il(a, t, n, !0),
          (t = Ue.current),
          t !== null)
        ) {
          switch (t.tag) {
            case 31:
            case 13:
            case 19:
              return (
                Ge === null
                  ? Ui()
                  : t.alternate === null && me === 0 && (me = 3),
                (t.flags &= -257),
                (t.flags |= 65536),
                (t.lanes = n),
                l === Li
                  ? (t.flags |= 16384)
                  : ((a = t.updateQueue),
                    a === null ? (t.updateQueue = new Set([l])) : a.add(l),
                    mo(e, l, n)),
                !1
              );
            case 22:
              return (
                (t.flags |= 65536),
                l === Li
                  ? (t.flags |= 16384)
                  : ((a = t.updateQueue),
                    a === null
                      ? ((a = {
                          transitions: null,
                          markerInstances: null,
                          retryQueue: new Set([l]),
                        }),
                        (t.updateQueue = a))
                      : ((t = a.retryQueue),
                        t === null ? (a.retryQueue = new Set([l])) : t.add(l)),
                    mo(e, l, n)),
                !1
              );
          }
          throw Error(S(435, t.tag));
        }
        return (mo(e, l, n), Ui(), !1);
      }
      if (H)
        return (
          (a = Ue.current),
          a !== null
            ? ((a.flags & 65536) === 0 && (a.flags |= 256),
              (a.flags |= 65536),
              (a.lanes = n),
              l !== Eo && ((e = Error(S(422), { cause: l })), Pu(xa(e, t))))
            : (l !== Eo && ((a = Error(S(423), { cause: l })), Pu(xa(a, t))),
              (e = e.current.alternate),
              (e.flags |= 65536),
              (n &= -n),
              (e.lanes |= n),
              (l = xa(l, t)),
              (n = _o(e.stateNode, l, n)),
              no(e, n),
              me !== 4 && (me = 2)),
          !1
        );
      var u = Error(S(520), { cause: l });
      if (
        ((u = xa(u, t)),
        ku === null ? (ku = [u]) : ku.push(u),
        me !== 4 && (me = 2),
        a === null)
      )
        return !0;
      ((l = xa(l, t)), (t = a));
      do {
        switch (t.tag) {
          case 3:
            return (
              (t.flags |= 65536),
              (e = n & -n),
              (t.lanes |= e),
              (e = _o(t.stateNode, l, e)),
              no(t, e),
              !1
            );
          case 1:
            if (
              ((a = t.type),
              (u = t.stateNode),
              (t.flags & 128) === 0 &&
                (typeof a.getDerivedStateFromError == "function" ||
                  (u !== null &&
                    typeof u.componentDidCatch == "function" &&
                    (jt === null || !jt.has(u)))))
            )
              return (
                (t.flags |= 65536),
                (n &= -n),
                (t.lanes |= n),
                (n = bh(n)),
                vh(n, e, t, l),
                no(t, n),
                !1
              );
            break;
          case 22:
            if (t.memoizedState !== null) return ((t.flags |= 65536), !1);
        }
        t = t.return;
      } while (t !== null);
      return !1;
    }
    var cc = Error(S(461)),
      ve = !1;
    function Ce(e, a, t, l) {
      a.child = e === null ? Mg(a, null, t, l) : wl(a, e.child, t, l);
    }
    function Kp(e, a, t, l, n) {
      t = t.render;
      var u = a.ref;
      if ("ref" in l) {
        var r = {};
        for (var s in l) s !== "ref" && (r[s] = l[s]);
      } else r = l;
      return (
        kl(a),
        (l = ec(e, a, t, r, u, n)),
        (s = ac()),
        e !== null && !ve
          ? (tc(e, a, n), yt(e, a, n))
          : (H && s && Yi(a), (a.flags |= 1), Ce(e, a, l, n), a.child)
      );
    }
    function Gp(e, a, t, l, n) {
      if (e === null) {
        var u = t.type;
        return typeof u == "function" &&
          !Vd(u) &&
          u.defaultProps === void 0 &&
          t.compare === null
          ? ((a.tag = 15), (a.type = u), yh(e, a, u, l, n))
          : ((e = Wr(t.type, null, l, a, a.mode, n)),
            (e.ref = a.ref),
            (e.return = a),
            (a.child = e));
      }
      if (((u = e.child), !pc(e, n))) {
        var r = u.memoizedProps;
        if (
          ((t = t.compare),
          (t = t !== null ? t : Ou),
          t(r, l) && e.ref === a.ref)
        )
          return yt(e, a, n);
      }
      return (
        (a.flags |= 1),
        (e = pt(u, l)),
        (e.ref = a.ref),
        (e.return = a),
        (a.child = e)
      );
    }
    function yh(e, a, t, l, n) {
      if (e !== null) {
        var u = e.memoizedProps;
        if (Ou(u, l) && e.ref === a.ref)
          if (((ve = !1), (a.pendingProps = l = u), pc(e, n)))
            (e.flags & 131072) !== 0 && (ve = !0);
          else return ((a.lanes = e.lanes), yt(e, a, n));
      }
      return $o(e, a, t, l, n);
    }
    function Ch(e, a, t, l) {
      var n = l.children,
        u = e !== null ? e.memoizedState : null;
      if (
        (e === null &&
          a.stateNode === null &&
          (a.stateNode = {
            _visibility: 1,
            _pendingMarkers: null,
            _retryCache: null,
            _transitions: null,
          }),
        l.mode === "hidden")
      ) {
        if ((a.flags & 128) !== 0) {
          if (((u = u !== null ? u.baseLanes | t : t), e !== null)) {
            for (l = a.child = e.child, n = 0; l !== null; )
              ((n = n | l.lanes | l.childLanes), (l = l.sibling));
            l = n & ~u;
          } else ((l = 0), (a.child = null));
          return Fp(e, a, u, t, l);
        }
        if ((t & 536870912) !== 0)
          ((a.memoizedState = { baseLanes: 0, cachePool: null }),
            e !== null && $r(a, u !== null ? u.cachePool : null),
            u !== null ? Op(a, u) : Zo(),
            Rg(a));
        else
          return (
            (l = a.lanes = 536870912),
            Fp(e, a, u !== null ? u.baseLanes | t : t, t, l)
          );
      } else
        u !== null
          ? ($r(a, u.cachePool), Op(a, u), Zt(), (a.memoizedState = null))
          : (e !== null && $r(a, null), Zo(), Zt());
      return (Ce(e, a, n, t), a.child);
    }
    function Su(e, a) {
      return (
        (e !== null && e.tag === 22) ||
          a.stateNode !== null ||
          (a.stateNode = {
            _visibility: 1,
            _pendingMarkers: null,
            _retryCache: null,
            _transitions: null,
          }),
        a.sibling
      );
    }
    function Fp(e, a, t, l, n) {
      var u = Yd();
      return (
        (u = u === null ? null : { parent: be._currentValue, pool: u }),
        (a.memoizedState = { baseLanes: t, cachePool: u }),
        e !== null && $r(a, null),
        Zo(),
        Rg(a),
        e !== null && Il(e, a, l, !0),
        (a.childLanes = n),
        null
      );
    }
    function ti(e, a) {
      return (
        (a = es({ mode: a.mode, children: a.children }, e.mode)),
        (a.ref = e.ref),
        (e.child = a),
        (a.return = e),
        a
      );
    }
    function Qp(e, a, t) {
      return (
        wl(a, e.child, null, t),
        (e = ti(a, a.pendingProps)),
        (e.flags |= 2),
        ia(a),
        (a.memoizedState = null),
        e
      );
    }
    function K0(e, a, t) {
      var l = a.pendingProps,
        n = (a.flags & 128) !== 0;
      if (((a.flags &= -129), e === null)) {
        if (H) {
          if (l.mode === "hidden")
            return (
              (e = ti(a, l)),
              (a.lanes = 536870912),
              (e.memoizedState = { baseLanes: 0, cachePool: null }),
              Su(null, e)
            );
          if (
            (jo(a),
            (e = se)
              ? ((e = Cb(e, Ia)),
                (e = e !== null && e.data === "&" ? e : null),
                e !== null &&
                  ((a.memoizedState = {
                    dehydrated: e,
                    treeContext: Wt !== null ? { id: $a, overflow: et } : null,
                    retryLane: 536870912,
                    hydrationErrors: null,
                  }),
                  (t = Ig(e)),
                  (t.return = a),
                  (a.child = t),
                  (we = a),
                  (se = null)))
              : (e = null),
            e === null)
          )
            throw _t(a);
          return ((a.lanes = 536870912), null);
        }
        return ti(a, l);
      }
      var u = e.memoizedState;
      if (u !== null) {
        var r = u.dehydrated;
        if ((jo(a), n))
          if (a.flags & 256) ((a.flags &= -257), (a = Qp(e, a, t)));
          else if (a.memoizedState !== null)
            ((a.child = e.child), (a.flags |= 128), (a = null));
          else throw Error(S(558));
        else if (
          (ve || Il(e, a, t, !1), (n = (t & e.childLanes) !== 0), ve || n)
        ) {
          if ($t.current === null) {
            if (
              ((l = ne),
              l !== null && ((r = Xm(l, t)), r !== 0 && r !== u.retryLane))
            )
              throw ((u.retryLane = r), Rl(e, r), ea(l, e, r), cc);
            Ui();
          }
          a = Qp(e, a, t);
        } else
          ((e = u.treeContext),
            (se = ka(r.nextSibling)),
            (we = a),
            (H = !0),
            (Gt = null),
            (Ia = !1),
            e !== null && Tg(a, e),
            (a = ti(a, l)),
            (a.flags |= 134221824));
        return a;
      }
      return (
        (e = pt(e.child, { mode: l.mode, children: l.children })),
        (e.ref = a.ref),
        (a.child = e),
        (e.return = a),
        e
      );
    }
    function Yl(e, a) {
      var t = a.ref;
      if (t === null) e !== null && e.ref !== null && (a.flags |= 4194816);
      else {
        if (typeof t != "function" && typeof t != "object") throw Error(S(284));
        (e === null || e.ref !== t) && (a.flags |= 4194816);
      }
    }
    function $o(e, a, t, l, n) {
      return (
        kl(a),
        (t = ec(e, a, t, l, void 0, n)),
        (l = ac()),
        e !== null && !ve
          ? (tc(e, a, n), yt(e, a, n))
          : (H && l && Yi(a), (a.flags |= 1), Ce(e, a, t, n), a.child)
      );
    }
    function Vp(e, a, t, l, n, u) {
      return (
        kl(a),
        (a.updateQueue = null),
        (t = zg(a, l, t, n)),
        Ug(e),
        (l = ac()),
        e !== null && !ve
          ? (tc(e, a, u), yt(e, a, u))
          : (H && l && Yi(a), (a.flags |= 1), Ce(e, a, t, u), a.child)
      );
    }
    function Zp(e, a, t, l, n) {
      if ((kl(a), a.stateNode === null)) {
        var u = un,
          r = t.contextType;
        (typeof r == "object" && r !== null && (u = Me(r)),
          (u = new t(l, u)),
          (a.memoizedState =
            u.state !== null && u.state !== void 0 ? u.state : null),
          (u.updater = Wo),
          (a.stateNode = u),
          (u._reactInternals = a),
          (u = a.stateNode),
          (u.props = l),
          (u.state = a.memoizedState),
          (u.refs = {}),
          Xd(a),
          (r = t.contextType),
          (u.context = typeof r == "object" && r !== null ? Me(r) : un),
          (u.state = a.memoizedState),
          (r = t.getDerivedStateFromProps),
          typeof r == "function" &&
            (ro(a, t, r, l), (u.state = a.memoizedState)),
          typeof t.getDerivedStateFromProps == "function" ||
            typeof u.getSnapshotBeforeUpdate == "function" ||
            (typeof u.UNSAFE_componentWillMount != "function" &&
              typeof u.componentWillMount != "function") ||
            ((r = u.state),
            typeof u.componentWillMount == "function" && u.componentWillMount(),
            typeof u.UNSAFE_componentWillMount == "function" &&
              u.UNSAFE_componentWillMount(),
            r !== u.state && Wo.enqueueReplaceState(u, u.state, null),
            Au(a, l, u, n),
            Cu(),
            (u.state = a.memoizedState)),
          typeof u.componentDidMount == "function" && (a.flags |= 4194308),
          (l = !0));
      } else if (e === null) {
        u = a.stateNode;
        var s = a.memoizedProps,
          o = ql(t, s);
        u.props = o;
        var d = u.context,
          c = t.contextType;
        ((r = un), typeof c == "object" && c !== null && (r = Me(c)));
        var p = t.getDerivedStateFromProps;
        ((c =
          typeof p == "function" ||
          typeof u.getSnapshotBeforeUpdate == "function"),
          (s = a.pendingProps !== s),
          c ||
            (typeof u.UNSAFE_componentWillReceiveProps != "function" &&
              typeof u.componentWillReceiveProps != "function") ||
            ((s || d !== r) && Hp(a, u, l, r)),
          (Pt = !1));
        var f = a.memoizedState;
        ((u.state = f),
          Au(a, l, u, n),
          Cu(),
          (d = a.memoizedState),
          s || f !== d || Pt
            ? (typeof p == "function" &&
                (ro(a, t, p, l), (d = a.memoizedState)),
              (o = Pt || Np(a, t, o, l, f, d, r))
                ? (c ||
                    (typeof u.UNSAFE_componentWillMount != "function" &&
                      typeof u.componentWillMount != "function") ||
                    (typeof u.componentWillMount == "function" &&
                      u.componentWillMount(),
                    typeof u.UNSAFE_componentWillMount == "function" &&
                      u.UNSAFE_componentWillMount()),
                  typeof u.componentDidMount == "function" &&
                    (a.flags |= 4194308))
                : (typeof u.componentDidMount == "function" &&
                    (a.flags |= 4194308),
                  (a.memoizedProps = l),
                  (a.memoizedState = d)),
              (u.props = l),
              (u.state = d),
              (u.context = r),
              (l = o))
            : (typeof u.componentDidMount == "function" && (a.flags |= 4194308),
              (l = !1)));
      } else {
        ((u = a.stateNode),
          Qo(e, a),
          (r = a.memoizedProps),
          (c = ql(t, r)),
          (u.props = c),
          (p = a.pendingProps),
          (f = u.context),
          (d = t.contextType),
          (o = un),
          typeof d == "object" && d !== null && (o = Me(d)),
          (s = t.getDerivedStateFromProps),
          (d =
            typeof s == "function" ||
            typeof u.getSnapshotBeforeUpdate == "function") ||
            (typeof u.UNSAFE_componentWillReceiveProps != "function" &&
              typeof u.componentWillReceiveProps != "function") ||
            ((r !== p || f !== o) && Hp(a, u, l, o)),
          (Pt = !1),
          (f = a.memoizedState),
          (u.state = f),
          Au(a, l, u, n),
          Cu());
        var m = a.memoizedState;
        r !== p ||
        f !== m ||
        Pt ||
        (e !== null && e.dependencies !== null && Ai(e.dependencies))
          ? (typeof s == "function" && (ro(a, t, s, l), (m = a.memoizedState)),
            (c =
              Pt ||
              Np(a, t, c, l, f, m, o) ||
              (e !== null && e.dependencies !== null && Ai(e.dependencies)))
              ? (d ||
                  (typeof u.UNSAFE_componentWillUpdate != "function" &&
                    typeof u.componentWillUpdate != "function") ||
                  (typeof u.componentWillUpdate == "function" &&
                    u.componentWillUpdate(l, m, o),
                  typeof u.UNSAFE_componentWillUpdate == "function" &&
                    u.UNSAFE_componentWillUpdate(l, m, o)),
                typeof u.componentDidUpdate == "function" && (a.flags |= 4),
                typeof u.getSnapshotBeforeUpdate == "function" &&
                  (a.flags |= 1024))
              : (typeof u.componentDidUpdate != "function" ||
                  (r === e.memoizedProps && f === e.memoizedState) ||
                  (a.flags |= 4),
                typeof u.getSnapshotBeforeUpdate != "function" ||
                  (r === e.memoizedProps && f === e.memoizedState) ||
                  (a.flags |= 1024),
                (a.memoizedProps = l),
                (a.memoizedState = m)),
            (u.props = l),
            (u.state = m),
            (u.context = o),
            (l = c))
          : (typeof u.componentDidUpdate != "function" ||
              (r === e.memoizedProps && f === e.memoizedState) ||
              (a.flags |= 4),
            typeof u.getSnapshotBeforeUpdate != "function" ||
              (r === e.memoizedProps && f === e.memoizedState) ||
              (a.flags |= 1024),
            (l = !1));
      }
      return (
        (u = l),
        Yl(e, a),
        (l = (a.flags & 128) !== 0),
        u || l
          ? ((u = a.stateNode),
            (t =
              l && typeof t.getDerivedStateFromError != "function"
                ? null
                : u.render()),
            (a.flags |= 1),
            e !== null && l
              ? ((a.child = wl(a, e.child, null, n)),
                (a.child = wl(a, null, t, n)))
              : Ce(e, a, t, n),
            (a.memoizedState = u.state),
            (e = a.child))
          : (e = yt(e, a, n)),
        e
      );
    }
    function jp(e, a, t, l) {
      return (xl(), (a.flags |= 256), Ce(e, a, t, l), a.child);
    }
    var ed = {
      dehydrated: null,
      treeContext: null,
      retryLane: 0,
      hydrationErrors: null,
    };
    function ad(e) {
      return { baseLanes: e, cachePool: Bg() };
    }
    function td(e, a, t) {
      return ((e = e !== null ? e.childLanes & ~t : 0), a && (e |= oa), e);
    }
    function Ah(e, a, t) {
      var l = a.pendingProps,
        n = !1,
        u = (a.flags & 128) !== 0,
        r;
      if (
        ((r = u) ||
          (r =
            e !== null && e.memoizedState === null
              ? !1
              : (De.current & 2) !== 0),
        r && ((n = !0), (a.flags &= -129)),
        (r = (a.flags & 32) !== 0),
        (a.flags &= -33),
        e === null)
      ) {
        if (H) {
          if (
            (n ? Vt(a) : Zt(),
            (e = se)
              ? ((e = Cb(e, Ia)),
                (e = e !== null && e.data !== "&" ? e : null),
                e !== null &&
                  ((a.memoizedState = {
                    dehydrated: e,
                    treeContext: Wt !== null ? { id: $a, overflow: et } : null,
                    retryLane: 536870912,
                    hydrationErrors: null,
                  }),
                  (t = Ig(e)),
                  (t.return = a),
                  (a.child = t),
                  (we = a),
                  (se = null)))
              : (e = null),
            e === null)
          )
            throw _t(a);
          return (Ic(e) ? (a.lanes = 32) : (a.lanes = 536870912), null);
        }
        return (
          (u = l.children),
          (l = l.fallback),
          n
            ? (Zt(),
              (n = a.mode),
              (u = es({ mode: "hidden", children: u }, n)),
              (l = Cl(l, n, t, null)),
              (u.return = a),
              (l.return = a),
              (u.sibling = l),
              (a.child = u),
              (l = a.child),
              (l.memoizedState = ad(t)),
              (l.childLanes = td(e, r, t)),
              (a.memoizedState = ed),
              Su(null, l))
            : (Vt(a), fc(a, u))
        );
      }
      var s = e.memoizedState;
      if (s !== null) {
        var o = s.dehydrated;
        if (o !== null) return G0(e, a, u, r, l, o, s, t);
      }
      return n
        ? (Zt(),
          (n = l.fallback),
          (u = a.mode),
          (s = e.child),
          (o = s.sibling),
          (l = pt(s, { mode: "hidden", children: l.children })),
          (l.subtreeFlags = s.subtreeFlags & 1206910976),
          o !== null
            ? (n = pt(o, n))
            : ((n = Cl(n, u, t, null)), (n.flags |= 2)),
          (n.return = a),
          (l.return = a),
          (l.sibling = n),
          (a.child = l),
          Su(null, l),
          (l = a.child),
          (n = e.child.memoizedState),
          n === null
            ? (n = ad(t))
            : ((u = n.cachePool),
              u !== null
                ? ((s = be._currentValue),
                  (u = u.parent !== s ? { parent: s, pool: s } : u))
                : (u = Bg()),
              (n = { baseLanes: n.baseLanes | t, cachePool: u })),
          (l.memoizedState = n),
          (l.childLanes = td(e, r, t)),
          (a.memoizedState = ed),
          Su(e.child, l))
        : (Vt(a),
          (t = e.child),
          (e = t.sibling),
          (t = pt(t, { mode: "visible", children: l.children })),
          (t.return = a),
          (t.sibling = null),
          e !== null &&
            ((r = a.deletions),
            r === null ? ((a.deletions = [e]), (a.flags |= 16)) : r.push(e)),
          (a.child = t),
          (a.memoizedState = null),
          t);
    }
    function fc(e, a) {
      return (
        (a = es({ mode: "visible", children: a }, e.mode)),
        (a.return = e),
        (e.child = a)
      );
    }
    function es(e, a) {
      return ((e = $e(22, e, null, a)), (e.lanes = 0), e);
    }
    function zr(e, a, t) {
      return (
        wl(a, e.child, null, t),
        (e = fc(a, a.pendingProps.children)),
        (e.flags |= 2),
        (a.memoizedState = null),
        e
      );
    }
    function G0(e, a, t, l, n, u, r, s) {
      if (t)
        return a.flags & 256
          ? (Vt(a), (a.flags &= -257), zr(e, a, s))
          : a.memoizedState !== null
            ? (Zt(), (a.child = e.child), (a.flags |= 128), null)
            : (Zt(),
              (u = n.fallback),
              (r = a.mode),
              (n = es({ mode: "visible", children: n.children }, r)),
              (u = Cl(u, r, s, null)),
              (u.flags |= 2),
              (n.return = a),
              (u.return = a),
              (n.sibling = u),
              (a.child = n),
              wl(a, e.child, null, s),
              (n = a.child),
              (n.memoizedState = ad(s)),
              (n.childLanes = td(e, l, s)),
              (a.memoizedState = ed),
              Su(null, n));
      if ((Vt(a), Ic(u))) {
        if (((l = u.nextSibling && u.nextSibling.dataset), l)) var o = l.dgst;
        return (
          (l = o),
          l !== "" &&
            ((n = Error(S(419))),
            (n.stack = ""),
            (n.digest = l),
            Pu({ value: n, source: null, stack: null })),
          zr(e, a, s)
        );
      }
      if ((ve || Il(e, a, s, !1), (l = (s & e.childLanes) !== 0), ve || l)) {
        if ($t.current !== null) return zr(e, a, s);
        if (
          ((l = ne),
          l !== null && ((n = Xm(l, s)), n !== 0 && n !== r.retryLane))
        )
          throw ((r.retryLane = n), Rl(e, n), ea(l, e, n), cc);
        return (Td(u) || Ui(), zr(e, a, s));
      }
      return Td(u)
        ? ((a.flags |= 192), (a.child = e.child), null)
        : ((e = r.treeContext),
          (se = ka(u.nextSibling)),
          (we = a),
          (H = !0),
          (Gt = null),
          (Ia = !1),
          e !== null && Tg(a, e),
          (a = fc(a, n.children)),
          (a.flags |= 134221824),
          a);
    }
    function Yp(e, a, t) {
      e.lanes |= a;
      var l = e.alternate;
      (l !== null && (l.lanes |= a), _r(e.return, a, t));
    }
    function Jp(e) {
      for (var a = null; e !== null; ) {
        var t = e.alternate;
        (t !== null && xi(t) === null && (a = e), (e = e.sibling));
      }
      return a;
    }
    function Nr(e, a, t, l, n, u) {
      var r = e.memoizedState;
      r === null
        ? (e.memoizedState = {
            isBackwards: a,
            rendering: null,
            renderingStartTime: 0,
            last: l,
            tail: t,
            tailMode: n,
            treeForkCount: u,
          })
        : ((r.isBackwards = a),
          (r.rendering = null),
          (r.renderingStartTime = 0),
          (r.last = l),
          (r.tail = t),
          (r.tailMode = n),
          (r.treeForkCount = u));
    }
    function io(e) {
      var a = e.child;
      for (e.child = null; a !== null; ) {
        var t = a.sibling;
        ((a.sibling = e.child), (e.child = a), (a = t));
      }
    }
    function ld(e, a, t) {
      var l = a.pendingProps,
        n = l.revealOrder,
        u = l.tail;
      l = l.children;
      var r = De.current;
      if (a.flags & 128) return (Ru(a, r), null);
      var s = (r & 2) !== 0;
      if (
        (s ? ((r = (r & 1) | 2), (a.flags |= 128)) : (r &= 1),
        Ru(a, r),
        n === "backwards" && e !== null
          ? (io(e), Ce(e, a, l, t), io(e))
          : Ce(e, a, l, t),
        (l = H ? Mu : 0),
        !s && e !== null && (e.flags & 128) !== 0)
      )
        e: for (e = a.child; e !== null; ) {
          if (e.tag === 13) e.memoizedState !== null && Yp(e, t, a);
          else if (e.tag === 19) Yp(e, t, a);
          else if (e.child !== null) {
            ((e.child.return = e), (e = e.child));
            continue;
          }
          if (e === a) break e;
          for (; e.sibling === null; ) {
            if (e.return === null || e.return === a) break e;
            e = e.return;
          }
          ((e.sibling.return = e.return), (e = e.sibling));
        }
      switch (n) {
        case "backwards":
          ((t = Jp(a.child)),
            t === null
              ? ((n = a.child), (a.child = null))
              : ((n = t.sibling), (t.sibling = null), io(a)),
            Nr(a, !0, n, null, u, l));
          break;
        case "unstable_legacy-backwards":
          for (t = null, n = a.child, a.child = null; n !== null; ) {
            if (((e = n.alternate), e !== null && xi(e) === null)) {
              a.child = n;
              break;
            }
            ((e = n.sibling), (n.sibling = t), (t = n), (n = e));
          }
          Nr(a, !0, t, null, u, l);
          break;
        case "together":
          Nr(a, !1, null, null, void 0, l);
          break;
        case "independent":
          a.memoizedState = null;
          break;
        default:
          ((t = Jp(a.child)),
            t === null
              ? ((n = a.child), (a.child = null))
              : ((n = t.sibling), (t.sibling = null)),
            Nr(a, !1, n, t, u, l));
      }
      return a.child;
    }
    function Xp(e, a, t) {
      var l = a.pendingProps;
      return (zt(a, a.type, l.value), Ce(e, a, l.children, t), a.child);
    }
    function yt(e, a, t) {
      if (
        (e !== null && (a.dependencies = e.dependencies),
        (al |= a.lanes),
        (t & a.childLanes) === 0)
      )
        if (e !== null) {
          if ((Il(e, a, t, !1), (t & a.childLanes) === 0)) return null;
        } else return null;
      if (e !== null && a.child !== e.child) throw Error(S(153));
      if (a.child !== null) {
        for (
          e = a.child, t = pt(e, e.pendingProps), a.child = t, t.return = a;
          e.sibling !== null;

        )
          ((e = e.sibling),
            (t = t.sibling = pt(e, e.pendingProps)),
            (t.return = a));
        t.sibling = null;
      }
      return a.child;
    }
    function pc(e, a) {
      return (e.lanes & a) !== 0
        ? !0
        : ((e = e.dependencies), !!(e !== null && Ai(e)));
    }
    function F0(e, a, t) {
      switch (a.tag) {
        case 3:
          (pi(a, a.stateNode.containerInfo),
            zt(a, be, e.memoizedState.cache),
            xl());
          break;
        case 27:
        case 5:
          qo(a);
          break;
        case 4:
          pi(a, a.stateNode.containerInfo);
          break;
        case 10:
          zt(a, a.type, a.memoizedProps.value);
          break;
        case 31:
          if (a.memoizedState !== null) return ((a.flags |= 128), jo(a), null);
          break;
        case 13:
          var l = a.memoizedState;
          if (l !== null) {
            if (l.dehydrated !== null) return (Vt(a), (a.flags |= 128), null);
            l = Il(e, a, t, !1);
            var n = a.child.childLanes;
            return l || (t & n) !== 0
              ? Ah(e, a, t)
              : (Vt(a), (e = yt(e, a, t)), e !== null ? e.sibling : null);
          }
          Vt(a);
          break;
        case 19:
          if (a.flags & 128) return ld(e, a, t);
          if (
            ((n = (e.flags & 128) !== 0),
            (l = (t & a.childLanes) !== 0),
            l || (Il(e, a, t, !1), (l = (t & a.childLanes) !== 0)),
            n)
          ) {
            if (l) return ld(e, a, t);
            a.flags |= 128;
          }
          if (
            ((n = a.memoizedState),
            n !== null &&
              ((n.rendering = null), (n.tail = null), (n.lastEffect = null)),
            Ru(a, De.current),
            l)
          )
            break;
          return null;
        case 22:
          return ((a.lanes = 0), Ch(e, a, t, a.pendingProps));
        case 24:
          zt(a, be, e.memoizedState.cache);
      }
      return yt(e, a, t);
    }
    function Lh(e, a, t) {
      if (e !== null)
        if (e.memoizedProps !== a.pendingProps) ve = !0;
        else {
          if (!pc(e, t) && (a.flags & 128) === 0)
            return ((ve = !1), F0(e, a, t));
          ve = (e.flags & 131072) !== 0;
        }
      else ((ve = !1), H && (a.flags & 1048576) !== 0 && kg(a, Mu, a.index));
      switch (((a.lanes = 0), a.tag)) {
        case 16:
          e: {
            var l = a.pendingProps;
            if (((e = gl(a.elementType)), (a.type = e), typeof e == "function"))
              Vd(e)
                ? ((l = ql(e, l)), (a.tag = 1), (a = Zp(null, a, e, l, t)))
                : ((a.tag = 0), (a = $o(null, a, e, l, t)));
            else {
              if (e != null) {
                var n = e.$$typeof;
                if (n === Md) {
                  ((a.tag = 11), (a = Kp(null, a, e, l, t)));
                  break e;
                } else if (n === Pd) {
                  ((a.tag = 14), (a = Gp(null, a, e, l, t)));
                  break e;
                } else if (n === Wa) {
                  ((a.tag = 10), (a.type = e), (a = Xp(null, a, t)));
                  break e;
                }
              }
              throw ((a = wo(e) || e), Error(S(306, a, "")));
            }
          }
          return a;
        case 0:
          return $o(e, a, a.type, a.pendingProps, t);
        case 1:
          return ((l = a.type), (n = ql(l, a.pendingProps)), Zp(e, a, l, n, t));
        case 3:
          e: {
            if ((pi(a, a.stateNode.containerInfo), e === null))
              throw Error(S(387));
            l = a.pendingProps;
            var u = a.memoizedState;
            ((n = u.element), Qo(e, a), Au(a, l, null, t));
            var r = a.memoizedState;
            if (
              ((l = r.cache),
              zt(a, be, l),
              l !== u.cache && Go(a, [be], t, !0),
              Cu(),
              (l = r.element),
              u.isDehydrated)
            )
              if (
                ((u = { element: l, isDehydrated: !1, cache: r.cache }),
                (a.updateQueue.baseState = u),
                (a.memoizedState = u),
                a.flags & 256)
              ) {
                a = jp(e, a, l, t);
                break e;
              } else if (l !== n) {
                ((n = xa(Error(S(424)), a)), Pu(n), (a = jp(e, a, l, t)));
                break e;
              } else {
                switch (((e = a.stateNode.containerInfo), e.nodeType)) {
                  case 9:
                    e = e.body;
                    break;
                  default:
                    e = e.nodeName === "HTML" ? e.ownerDocument.body : e;
                }
                for (
                  se = ka(e.firstChild),
                    we = a,
                    H = !0,
                    Gt = null,
                    Ia = !0,
                    t = Mg(a, null, l, t),
                    a.child = t;
                  t;

                )
                  ((t.flags = (t.flags & -3) | 134221824), (t = t.sibling));
              }
            else {
              if ((xl(), l === n)) {
                a = yt(e, a, t);
                break e;
              }
              Ce(e, a, l, t);
            }
            a = a.child;
          }
          return a;
        case 26:
          return (
            Yl(e, a),
            e === null
              ? (t = Sm(a.type, null, a.pendingProps, null))
                ? (a.memoizedState = t)
                : H || (a.stateNode = cb(a.type, a.pendingProps, Kt.current, a))
              : (a.memoizedState = Sm(
                  a.type,
                  e.memoizedProps,
                  a.pendingProps,
                  e.memoizedState,
                )),
            null
          );
        case 27:
          return (
            qo(a),
            e === null &&
              H &&
              ((l = a.stateNode = Ab(a.type, a.pendingProps, Kt.current)),
              (we = a),
              (Ia = !0),
              (n = se),
              ll(a.type) ? ((wd = n), (se = ka(l.firstChild))) : (se = n)),
            Ce(e, a, a.pendingProps.children, t),
            Yl(e, a),
            e === null && (a.flags |= 4194304),
            a.child
          );
        case 5:
          return (
            e === null &&
              H &&
              ((n = l = se) &&
                ((l = RC(l, a.type, a.pendingProps, Ia)),
                l !== null
                  ? ((a.stateNode = l),
                    (we = a),
                    (se = ka(l.firstChild)),
                    (Ia = !1),
                    (n = !0))
                  : (n = !1)),
              n || _t(a)),
            qo(a),
            (n = a.type),
            (u = a.pendingProps),
            (r = e !== null ? e.memoizedProps : null),
            (l = u.children),
            xd(n, u) ? (l = null) : r !== null && xd(n, r) && (a.flags |= 32),
            a.memoizedState !== null &&
              ((n = ec(e, a, M0, null, null, t)), (qn._currentValue = n)),
            Yl(e, a),
            Ce(e, a, l, t),
            a.child
          );
        case 6:
          return (
            e === null &&
              H &&
              ((e = t = se) &&
                ((t = UC(t, a.pendingProps, Ia)),
                t !== null
                  ? ((a.stateNode = t), (we = a), (se = null), (e = !0))
                  : (e = !1)),
              e || _t(a)),
            null
          );
        case 13:
          return Ah(e, a, t);
        case 4:
          return (
            pi(a, a.stateNode.containerInfo),
            (l = a.pendingProps),
            e === null ? (a.child = wl(a, null, l, t)) : Ce(e, a, l, t),
            a.child
          );
        case 11:
          return Kp(e, a, a.type, a.pendingProps, t);
        case 7:
          return ((l = a.pendingProps), Yl(e, a), Ce(e, a, l, t), a.child);
        case 8:
          return (Ce(e, a, a.pendingProps.children, t), a.child);
        case 12:
          return (Ce(e, a, a.pendingProps.children, t), a.child);
        case 10:
          return Xp(e, a, t);
        case 9:
          return (
            (n = a.type._context),
            (l = a.pendingProps.children),
            kl(a),
            (n = Me(n)),
            (l = l(n)),
            (a.flags |= 1),
            Ce(e, a, l, t),
            a.child
          );
        case 14:
          return Gp(e, a, a.type, a.pendingProps, t);
        case 15:
          return yh(e, a, a.type, a.pendingProps, t);
        case 19:
          return ld(e, a, t);
        case 31:
          return K0(e, a, t);
        case 22:
          return Ch(e, a, t, a.pendingProps);
        case 24:
          return (
            kl(a),
            (l = Me(be)),
            e === null
              ? ((n = Yd()),
                n === null &&
                  ((n = ne),
                  (u = jd()),
                  (n.pooledCache = u),
                  u.refCount++,
                  u !== null && (n.pooledCacheLanes |= t),
                  (n = u)),
                (a.memoizedState = { parent: l, cache: n }),
                Xd(a),
                zt(a, be, n))
              : ((e.lanes & t) !== 0 && (Qo(e, a), Au(a, null, null, t), Cu()),
                (n = e.memoizedState),
                (u = a.memoizedState),
                n.parent !== l
                  ? ((n = { parent: l, cache: l }),
                    (a.memoizedState = n),
                    a.lanes === 0 &&
                      (a.memoizedState = a.updateQueue.baseState = n),
                    zt(a, be, l))
                  : ((l = u.cache),
                    zt(a, be, l),
                    l !== n.cache && Go(a, [be], t, !0))),
            Ce(e, a, a.pendingProps.children, t),
            a.child
          );
        case 30:
          return (
            a.stateNode === null &&
              (a.stateNode = {
                autoName: null,
                paired: null,
                clones: null,
                ref: null,
              }),
            (l = a.pendingProps),
            l.name != null && l.name !== "auto"
              ? (a.flags |= e === null ? 18882560 : 18874368)
              : H && Yi(a),
            e !== null && e.memoizedProps.name !== l.name
              ? (a.flags |= 4194816)
              : Yl(e, a),
            Ce(e, a, l.children, t),
            a.child
          );
        case 29:
          throw a.pendingProps;
      }
      throw Error(S(156, a.tag));
    }
    function dt(e) {
      e.flags |= 4;
    }
    function so(e, a, t, l, n) {
      var u;
      if (
        ((u = (e.mode & 32) !== 0) &&
          (u =
            t === null
              ? km(a, l)
              : km(a, l) && (l.src !== t.src || l.srcSet !== t.srcSet)),
        u)
      ) {
        if (((e.flags |= 16777216), (n & 335544128) === n))
          if (e.stateNode.complete) e.flags |= 8192;
          else if (Wh()) e.flags |= 8192;
          else throw ((Ll = Li), Jd);
      } else e.flags &= -16777217;
    }
    function Wp(e, a) {
      if (a.type !== "stylesheet" || (a.state.loading & 4) !== 0)
        e.flags &= -16777217;
      else if (((e.flags |= 16777216), !Ib(a)))
        if (Wh()) e.flags |= 8192;
        else throw ((Ll = Li), Jd);
    }
    function Hr(e, a) {
      (a !== null && (e.flags |= 4),
        e.flags & 16384 &&
          ((a = e.tag !== 22 ? jm() : 536870912), (e.lanes |= a), (xn |= a)));
    }
    function ru(e, a) {
      if (!H)
        switch (e.tailMode) {
          case "visible":
            break;
          case "collapsed":
            for (var t = e.tail, l = null; t !== null; )
              (t.alternate !== null && (l = t), (t = t.sibling));
            l === null
              ? a || e.tail === null
                ? (e.tail = null)
                : (e.tail.sibling = null)
              : (l.sibling = null);
            break;
          default:
            for (a = e.tail, t = null; a !== null; )
              (a.alternate !== null && (t = a), (a = a.sibling));
            t === null ? (e.tail = null) : (t.sibling = null);
        }
    }
    function ie(e) {
      var a = e.alternate !== null && e.alternate.child === e.child,
        t = 0,
        l = 0;
      if (a)
        for (var n = e.child; n !== null; )
          ((t |= n.lanes | n.childLanes),
            (l |= n.subtreeFlags & 1206910976),
            (l |= n.flags & 1206910976),
            (n.return = e),
            (n = n.sibling));
      else
        for (n = e.child; n !== null; )
          ((t |= n.lanes | n.childLanes),
            (l |= n.subtreeFlags),
            (l |= n.flags),
            (n.return = e),
            (n = n.sibling));
      return ((e.subtreeFlags |= l), (e.childLanes = t), a);
    }
    function Q0(e, a, t) {
      var l = a.pendingProps;
      switch ((Zd(a), a.tag)) {
        case 16:
        case 15:
        case 0:
        case 11:
        case 7:
        case 8:
        case 12:
        case 9:
        case 14:
          return (ie(a), null);
        case 1:
          return (ie(a), null);
        case 3:
          return (
            (t = a.stateNode),
            (l = null),
            e !== null && (l = e.memoizedState.cache),
            a.memoizedState.cache !== l && (a.flags |= 2048),
            mt(be),
            Cn(),
            t.pendingContext &&
              ((t.context = t.pendingContext), (t.pendingContext = null)),
            (e === null || e.child === null) &&
              (Zl(a)
                ? dt(a)
                : e === null ||
                  (e.memoizedState.isDehydrated && (a.flags & 256) === 0) ||
                  ((a.flags |= 1024), lo())),
            ie(a),
            null
          );
        case 26:
          var n = a.type,
            u = a.memoizedState;
          return (
            e === null
              ? (dt(a),
                u !== null ? (ie(a), Wp(a, u)) : (ie(a), so(a, n, null, l, t)))
              : u
                ? u !== e.memoizedState
                  ? (dt(a), ie(a), Wp(a, u))
                  : (ie(a), (a.flags &= -16777217))
                : ((e = e.memoizedProps),
                  e !== l && dt(a),
                  ie(a),
                  so(a, n, e, l, t)),
            null
          );
        case 27:
          if (
            (mi(a),
            (t = Kt.current),
            (n = a.type),
            e !== null && a.stateNode != null)
          )
            e.memoizedProps !== l && dt(a);
          else {
            if (!l) {
              if (a.stateNode === null) throw Error(S(166));
              return (ie(a), (a.subtreeFlags &= -33554433), null);
            }
            ((e = at.current),
              Zl(a) ? xp(a, e) : ((e = Ab(n, l, t)), (a.stateNode = e), dt(a)));
          }
          return (ie(a), (a.subtreeFlags &= -33554433), null);
        case 5:
          if ((mi(a), (n = a.type), e !== null && a.stateNode != null))
            e.memoizedProps !== l && dt(a);
          else {
            if (!l) {
              if (a.stateNode === null) throw Error(S(166));
              return (ie(a), (a.subtreeFlags &= -33554433), null);
            }
            if (((u = at.current), Zl(a))) xp(a, u);
            else {
              var r = Hu(Kt.current);
              switch (u) {
                case 1:
                  u = r.createElementNS("http://www.w3.org/2000/svg", n);
                  break;
                case 2:
                  u = r.createElementNS(
                    "http://www.w3.org/1998/Math/MathML",
                    n,
                  );
                  break;
                default:
                  switch (n) {
                    case "svg":
                      u = r.createElementNS("http://www.w3.org/2000/svg", n);
                      break;
                    case "math":
                      u = r.createElementNS(
                        "http://www.w3.org/1998/Math/MathML",
                        n,
                      );
                      break;
                    case "script":
                      ((u = r.createElement("div")),
                        (u.innerHTML = "<script><\/script>"),
                        (u = u.removeChild(u.firstChild)));
                      break;
                    case "select":
                      ((u =
                        typeof l.is == "string"
                          ? r.createElement("select", { is: l.is })
                          : r.createElement("select")),
                        l.multiple
                          ? (u.multiple = !0)
                          : l.size && (u.size = l.size));
                      break;
                    default:
                      u =
                        typeof l.is == "string"
                          ? r.createElement(n, { is: l.is })
                          : r.createElement(n);
                  }
              }
              ((u[Oe] = a), (u[ta] = l));
              e: for (r = a.child; r !== null; ) {
                if (r.tag === 5 || r.tag === 6) u.appendChild(r.stateNode);
                else if (r.tag !== 4 && r.tag !== 27 && r.child !== null) {
                  ((r.child.return = r), (r = r.child));
                  continue;
                }
                if (r === a) break e;
                for (; r.sibling === null; ) {
                  if (r.return === null || r.return === a) break e;
                  r = r.return;
                }
                ((r.sibling.return = r.return), (r = r.sibling));
              }
              a.stateNode = u;
              e: switch ((Re(u, n, l), n)) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  l = !!l.autoFocus;
                  break e;
                case "img":
                  l = !0;
                  break e;
                default:
                  l = !1;
              }
              l && dt(a);
            }
          }
          return (
            ie(a),
            (a.subtreeFlags &= -33554433),
            so(
              a,
              a.type,
              e === null ? null : e.memoizedProps,
              a.pendingProps,
              t,
            ),
            null
          );
        case 6:
          if (e && a.stateNode != null) e.memoizedProps !== l && dt(a);
          else {
            if (typeof l != "string" && a.stateNode === null)
              throw Error(S(166));
            if (((e = Kt.current), Zl(a))) {
              if (
                ((e = a.stateNode),
                (t = a.memoizedProps),
                (l = null),
                (n = we),
                n !== null)
              )
                switch (n.tag) {
                  case 27:
                  case 5:
                    l = n.memoizedProps;
                }
              ((e[Oe] = a),
                (e = !!(
                  e.nodeValue === t ||
                  (l !== null && l.suppressHydrationWarning === !0) ||
                  ob(e.nodeValue, t)
                )),
                e || _t(a, !0));
            } else
              ((e = Hu(e).createTextNode(l)), (e[Oe] = a), (a.stateNode = e));
          }
          return (ie(a), null);
        case 31:
          if (((t = a.memoizedState), e === null || e.memoizedState !== null)) {
            if (((l = Zl(a)), t !== null)) {
              if (e === null) {
                if (!l) throw Error(S(318));
                if (
                  ((e = a.memoizedState),
                  (e = e !== null ? e.dehydrated : null),
                  !e)
                )
                  throw Error(S(557));
                e[Oe] = a;
              } else
                (xl(),
                  (a.flags & 128) === 0 && (a.memoizedState = null),
                  (a.flags |= 4));
              (ie(a), (e = !1));
            } else
              ((t = lo()),
                e !== null &&
                  e.memoizedState !== null &&
                  (e.memoizedState.hydrationErrors = t),
                (e = !0));
            if (!e) return a.flags & 256 ? (ia(a), a) : (ia(a), null);
            if ((a.flags & 128) !== 0) throw Error(S(558));
          }
          return (ie(a), null);
        case 13:
          if (
            ((l = a.memoizedState),
            e === null ||
              (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
          ) {
            if (((n = Zl(a)), l !== null && l.dehydrated !== null)) {
              if (e === null) {
                if (!n) throw Error(S(318));
                if (
                  ((n = a.memoizedState),
                  (n = n !== null ? n.dehydrated : null),
                  !n)
                )
                  throw Error(S(317));
                n[Oe] = a;
              } else
                (xl(),
                  (a.flags & 128) === 0 && (a.memoizedState = null),
                  (a.flags |= 4));
              (ie(a), (n = !1));
            } else
              ((n = lo()),
                e !== null &&
                  e.memoizedState !== null &&
                  (e.memoizedState.hydrationErrors = n),
                (n = !0));
            if (!n) return a.flags & 256 ? (ia(a), a) : (ia(a), null);
          }
          return (
            ia(a),
            (a.flags & 128) !== 0
              ? ((a.lanes = t), a)
              : ((t = l !== null),
                (e = e !== null && e.memoizedState !== null),
                t &&
                  ((l = a.child),
                  (n = null),
                  l.alternate !== null &&
                    l.alternate.memoizedState !== null &&
                    l.alternate.memoizedState.cachePool !== null &&
                    (n = l.alternate.memoizedState.cachePool.pool),
                  (u = null),
                  l.memoizedState !== null &&
                    l.memoizedState.cachePool !== null &&
                    (u = l.memoizedState.cachePool.pool),
                  u !== n && (l.flags |= 2048)),
                t !== e && t && (a.child.flags |= 8192),
                Hr(a, a.updateQueue),
                ie(a),
                null)
          );
        case 4:
          return (
            Cn(),
            e === null && Lc(a.stateNode.containerInfo),
            (a.flags |= 67108864),
            ie(a),
            null
          );
        case 10:
          return (mt(a.type), ie(a), null);
        case 19:
          if ((_d(a), (l = a.memoizedState), l === null)) return (ie(a), null);
          if (((n = (a.flags & 128) !== 0), (u = l.rendering), u === null))
            if (n) ru(l, !1);
            else {
              if (me !== 0 || (e !== null && (e.flags & 128) !== 0))
                for (e = a.child; e !== null; ) {
                  if (((u = xi(e)), u !== null)) {
                    for (
                      a.flags |= 128,
                        ru(l, !1),
                        e = u.updateQueue,
                        a.updateQueue = e,
                        Hr(a, e),
                        a.subtreeFlags = 0,
                        e = t,
                        t = a.child;
                      t !== null;

                    )
                      (xg(t, e), (t = t.sibling));
                    return (
                      Ru(a, (De.current & 1) | 2),
                      H && ct(a, l.treeForkCount),
                      a.child
                    );
                  }
                  e = e.sibling;
                }
              l.tail !== null &&
                da() > Di &&
                ((a.flags |= 128), (n = !0), ru(l, !1), (a.lanes = 4194304));
            }
          else {
            if (!n)
              if (((e = xi(u)), e !== null)) {
                if (
                  ((a.flags |= 128),
                  (n = !0),
                  (e = e.updateQueue),
                  (a.updateQueue = e),
                  Hr(a, e),
                  ru(l, !0),
                  l.tail === null &&
                    l.tailMode !== "collapsed" &&
                    l.tailMode !== "visible" &&
                    !u.alternate &&
                    !H)
                )
                  return (ie(a), null);
              } else
                2 * da() - l.renderingStartTime > Di &&
                  t !== 536870912 &&
                  ((a.flags |= 128), (n = !0), ru(l, !1), (a.lanes = 4194304));
            l.isBackwards
              ? ((u.sibling = a.child), (a.child = u))
              : ((e = l.last),
                e !== null ? (e.sibling = u) : (a.child = u),
                (l.last = u));
          }
          if (l.tail !== null) {
            e = l.tail;
            e: {
              for (t = e; t !== null; ) {
                if (t.alternate !== null) {
                  t = !1;
                  break e;
                }
                t = t.sibling;
              }
              t = !0;
            }
            return (
              (l.rendering = e),
              (l.tail = e.sibling),
              (l.renderingStartTime = da()),
              (e.sibling = null),
              (u = De.current),
              (u = n ? (u & 1) | 2 : u & 1),
              l.tailMode === "visible" || l.tailMode === "collapsed" || !t || H
                ? Ru(a, u)
                : ((t = u), oe(Ue, a), oe(De, t), Ge === null && (Ge = a)),
              H && ct(a, l.treeForkCount),
              e
            );
          }
          return (ie(a), null);
        case 22:
        case 23:
          return (
            ia(a),
            Wd(),
            (l = a.memoizedState !== null),
            e !== null
              ? (e.memoizedState !== null) !== l && (a.flags |= 8192)
              : l && (a.flags |= 8192),
            l
              ? (t & 536870912) !== 0 &&
                (a.flags & 128) === 0 &&
                (ie(a), a.subtreeFlags & 6 && (a.flags |= 8192))
              : ie(a),
            (t = a.updateQueue),
            t !== null && Hr(a, t.retryQueue),
            (t = null),
            e !== null &&
              e.memoizedState !== null &&
              e.memoizedState.cachePool !== null &&
              (t = e.memoizedState.cachePool.pool),
            (l = null),
            a.memoizedState !== null &&
              a.memoizedState.cachePool !== null &&
              (l = a.memoizedState.cachePool.pool),
            l !== t && (a.flags |= 2048),
            e !== null && Pe(Al),
            null
          );
        case 24:
          return (
            (t = null),
            e !== null && (t = e.memoizedState.cache),
            a.memoizedState.cache !== t && (a.flags |= 2048),
            mt(be),
            ie(a),
            null
          );
        case 25:
          return null;
        case 30:
          return ((a.flags |= 33554432), ie(a), null);
      }
      throw Error(S(156, a.tag));
    }
    function V0(e, a) {
      switch ((Zd(a), a.tag)) {
        case 1:
          return (
            (e = a.flags),
            e & 65536 ? ((a.flags = (e & -65537) | 128), a) : null
          );
        case 3:
          return (
            mt(be),
            Cn(),
            (e = a.flags),
            (e & 65536) !== 0 && (e & 128) === 0
              ? ((a.flags = (e & -65537) | 128), a)
              : null
          );
        case 26:
        case 27:
        case 5:
          return (mi(a), null);
        case 31:
          if (a.memoizedState !== null) {
            if ((ia(a), a.alternate === null)) throw Error(S(340));
            xl();
          }
          return (
            (e = a.flags),
            e & 65536 ? ((a.flags = (e & -65537) | 128), a) : null
          );
        case 13:
          if (
            (ia(a), (e = a.memoizedState), e !== null && e.dehydrated !== null)
          ) {
            if (a.alternate === null) throw Error(S(340));
            xl();
          }
          return (
            (e = a.flags),
            e & 65536 ? ((a.flags = (e & -65537) | 128), a) : null
          );
        case 19:
          return (
            _d(a),
            (e = a.flags),
            e & 65536
              ? ((a.flags = (e & -65537) | 128),
                (e = a.memoizedState),
                e !== null && ((e.rendering = null), (e.tail = null)),
                (a.flags |= 4),
                a)
              : null
          );
        case 4:
          return (Cn(), null);
        case 10:
          return (mt(a.type), null);
        case 22:
        case 23:
          return (
            ia(a),
            Wd(),
            e !== null && Pe(Al),
            (e = a.flags),
            e & 65536 ? ((a.flags = (e & -65537) | 128), a) : null
          );
        case 24:
          return (mt(be), null);
        case 25:
          return null;
        default:
          return null;
      }
    }
    function Sh(e, a) {
      switch ((Zd(a), a.tag)) {
        case 3:
          (mt(be), Cn());
          break;
        case 26:
        case 27:
        case 5:
          mi(a);
          break;
        case 4:
          Cn();
          break;
        case 31:
          a.memoizedState !== null && ia(a);
          break;
        case 13:
          ia(a);
          break;
        case 19:
          _d(a);
          break;
        case 10:
          mt(a.type);
          break;
        case 22:
        case 23:
          (ia(a), Wd(), e !== null && Pe(Al));
          break;
        case 24:
          mt(be);
      }
    }
    function _u(e, a) {
      try {
        var t = a.updateQueue,
          l = t !== null ? t.lastEffect : null;
        if (l !== null) {
          var n = l.next;
          t = n;
          do {
            if ((t.tag & e) === e) {
              l = void 0;
              var u = t.create,
                r = t.inst;
              ((l = u()), (r.destroy = l));
            }
            t = t.next;
          } while (t !== n);
        }
      } catch (s) {
        $(a, a.return, s);
      }
    }
    function el(e, a, t) {
      try {
        var l = a.updateQueue,
          n = l !== null ? l.lastEffect : null;
        if (n !== null) {
          var u = n.next;
          l = u;
          do {
            if ((l.tag & e) === e) {
              var r = l.inst,
                s = r.destroy;
              if (s !== void 0) {
                ((r.destroy = void 0), (n = a));
                var o = t,
                  d = s;
                try {
                  d();
                } catch (c) {
                  $(n, o, c);
                }
              }
            }
            l = l.next;
          } while (l !== u);
        }
      } catch (c) {
        $(a, a.return, c);
      }
    }
    function xh(e) {
      var a = e.updateQueue;
      if (a !== null) {
        var t = e.stateNode;
        try {
          Dg(a, t);
        } catch (l) {
          $(e, e.return, l);
        }
      }
    }
    function Ih(e, a, t) {
      ((t.props = ql(e.type, e.memoizedProps)), (t.state = e.memoizedState));
      try {
        t.componentWillUnmount();
      } catch (l) {
        $(e, a, l);
      }
    }
    function Ja(e, a) {
      try {
        var t = e.ref;
        if (t !== null) {
          switch (e.tag) {
            case 26:
            case 27:
            case 5:
              var l = e.stateNode;
              break;
            case 30:
              var n = e.stateNode,
                u = ht(e.memoizedProps, n);
              ((n.ref === null || n.ref.name !== u) && (n.ref = gb(u)),
                (l = n.ref));
              break;
            case 7:
              if (e.stateNode === null) {
                var r = new ga(e);
                (aa(e.child, !1, PC, r, void 0, void 0), (e.stateNode = r));
              }
              l = e.stateNode;
              break;
            default:
              l = e.stateNode;
          }
          typeof t == "function" ? (e.refCleanup = t(l)) : (t.current = l);
        }
      } catch (s) {
        $(e, a, s);
      }
    }
    function qe(e, a) {
      var t = e.ref,
        l = e.refCleanup;
      if (t !== null)
        if (typeof l == "function")
          try {
            l();
          } catch (n) {
            $(e, a, n);
          } finally {
            ((e.refCleanup = null),
              (e = e.alternate),
              e != null && (e.refCleanup = null));
          }
        else if (typeof t == "function")
          try {
            t(null);
          } catch (n) {
            $(e, a, n);
          }
        else t.current = null;
    }
    function Bi(e, a) {
      if (
        (e.tag === 5 || e.tag === 27 || e.tag === 6) &&
        e.alternate === null &&
        a !== null
      )
        for (var t = 0; t < a.length; t++) yb(e.stateNode, a[t]);
    }
    function _p(e) {
      for (
        var a = e.return;
        a !== null && (gc(a) && yb(e.stateNode, a.stateNode), !mc(a));

      )
        a = a.return;
    }
    function xu(e) {
      for (
        var a = e.return;
        a !== null && (gc(a) && DC(e.stateNode, a.stateNode), !mc(a));

      )
        a = a.return;
    }
    function mc(e) {
      return e.tag === 5 || e.tag === 3 || e.tag === 27;
    }
    function gc(e) {
      return e && e.tag === 7 && e.stateNode !== null;
    }
    function nd(e) {
      var a = e.type,
        t = e.memoizedProps,
        l = e.stateNode;
      try {
        e: switch (a) {
          case "button":
          case "input":
          case "select":
          case "textarea":
            t.autoFocus && l.focus();
            break e;
          case "img":
            t.src ? (l.src = t.src) : t.srcSet && (l.srcset = t.srcSet);
        }
      } catch (n) {
        $(e, e.return, n);
      }
    }
    function oo(e, a, t) {
      try {
        var l = e.stateNode;
        (gC(l, e.type, t, a), (l[ta] = a));
      } catch (n) {
        $(e, e.return, n);
      }
    }
    function kh(e) {
      return (
        e.tag === 5 ||
        e.tag === 3 ||
        e.tag === 26 ||
        (e.tag === 27 && ll(e.type)) ||
        e.tag === 4
      );
    }
    function co(e) {
      e: for (;;) {
        for (; e.sibling === null; ) {
          if (e.return === null || kh(e.return)) return null;
          e = e.return;
        }
        for (
          e.sibling.return = e.return, e = e.sibling;
          e.tag !== 5 && e.tag !== 6 && e.tag !== 18;

        ) {
          if (
            (e.tag === 27 && ll(e.type)) ||
            e.flags & 2 ||
            e.child === null ||
            e.tag === 4
          )
            continue e;
          ((e.child.return = e), (e = e.child));
        }
        if (!(e.flags & 2)) return e.stateNode;
      }
    }
    function ud(e, a, t, l) {
      var n = e.tag;
      if (n === 5 || n === 6)
        ((n = e.stateNode),
          a
            ? (t.nodeType === 9
                ? t.body
                : t.nodeName === "HTML"
                  ? t.ownerDocument.body
                  : t
              ).insertBefore(n, a)
            : ((a =
                t.nodeType === 9
                  ? t.body
                  : t.nodeName === "HTML"
                    ? t.ownerDocument.body
                    : t),
              a.appendChild(n),
              (t = t._reactRootContainer),
              t != null || a.onclick !== null || (a.onclick = _a)),
          Bi(e, l),
          (Z = !0));
      else if (
        n !== 4 &&
        (n === 27 &&
          (Bi(e, l), (l = null), ll(e.type) && ((t = e.stateNode), (a = null))),
        (e = e.child),
        e !== null)
      )
        for (ud(e, a, t, l), e = e.sibling; e !== null; )
          (ud(e, a, t, l), (e = e.sibling));
    }
    function qi(e, a, t, l) {
      var n = e.tag;
      if (n === 5 || n === 6)
        ((n = e.stateNode),
          a ? t.insertBefore(n, a) : t.appendChild(n),
          Bi(e, l),
          (Z = !0));
      else if (
        n !== 4 &&
        (n === 27 && (Bi(e, l), (l = null), ll(e.type) && (t = e.stateNode)),
        (e = e.child),
        e !== null)
      )
        for (qi(e, a, t, l), e = e.sibling; e !== null; )
          (qi(e, a, t, l), (e = e.sibling));
    }
    function Th(e) {
      var a = e.stateNode,
        t = e.memoizedProps;
      try {
        for (var l = e.type, n = a.attributes; n.length; )
          a.removeAttributeNode(n[0]);
        (Re(a, l, t), (a[Oe] = e), (a[ta] = t));
      } catch (u) {
        $(e, e.return, u);
      }
    }
    var Oi = !1,
      sa = null;
    function $p(e) {
      (e.tag === 30 || (e.subtreeFlags & 33554432) !== 0) && (Oi = !0);
    }
    var Xa = null;
    function em() {
      var e = Xa;
      return ((Xa = null), e);
    }
    var _e = 0;
    function Un(e, a, t, l, n) {
      return ((_e = 0), wh(e.child, a, t, l, n));
    }
    function wh(e, a, t, l, n) {
      for (var u = !1; e !== null; ) {
        if (e.tag === 5) {
          var r = e.stateNode;
          if (l !== null) {
            var s = Id(r);
            (l.push(s), s.view && (u = !0));
          } else u || (Id(r).view && (u = !0));
          ((Oi = !0), fb(r, _e === 0 ? a : a + "_" + _e, t), _e++);
        } else
          (e.tag !== 22 || e.memoizedState === null) &&
            ((e.tag === 30 && n) || (wh(e.child, a, t, l, n) && (u = !0)));
        e = e.sibling;
      }
      return u;
    }
    function lt(e, a) {
      for (; e !== null; )
        (e.tag === 5
          ? pb(e.stateNode, e.memoizedProps)
          : (e.tag !== 22 || e.memoizedState === null) &&
            ((e.tag === 30 && a) || lt(e.child, a)),
          (e = e.sibling));
    }
    function li(e) {
      if ((e.subtreeFlags & 18874368) !== 0)
        for (e = e.child; e !== null; ) {
          if (
            (e.tag !== 22 || e.memoizedState === null) &&
            (li(e),
            e.tag === 30 && (e.flags & 18874368) !== 0 && e.stateNode.paired)
          ) {
            var a = e.memoizedProps;
            if (a.name == null || a.name === "auto") throw Error(S(544));
            var t = a.name;
            ((a = Lt(a.default, a.share)),
              a !== "none" && (Un(e, t, a, null, !1) || lt(e.child, !1)));
          }
          e = e.sibling;
        }
    }
    function rd(e, a) {
      if (e.tag === 30) {
        var t = e.stateNode,
          l = e.memoizedProps,
          n = ht(l, t),
          u = Lt(l.default, t.paired ? l.share : l.enter);
        u !== "none"
          ? Un(e, n, u, null, !1)
            ? (li(e), t.paired || a || In(e, l.onEnter))
            : lt(e.child, !1)
          : li(e);
      } else if ((e.subtreeFlags & 33554432) !== 0)
        for (e = e.child; e !== null; ) (rd(e, a), (e = e.sibling));
      else li(e);
    }
    function id(e) {
      if (sa !== null && sa.size !== 0) {
        var a = sa;
        if ((e.subtreeFlags & 18874368) !== 0)
          for (e = e.child; e !== null; ) {
            if (e.tag !== 22 || e.memoizedState === null) {
              if (e.tag === 30 && (e.flags & 18874368) !== 0) {
                var t = e.memoizedProps,
                  l = t.name;
                if (l != null && l !== "auto") {
                  var n = a.get(l);
                  if (n !== void 0) {
                    var u = Lt(t.default, t.share);
                    if (
                      (u !== "none" &&
                        (Un(e, l, u, null, !1)
                          ? ((u = e.stateNode),
                            (n.paired = u),
                            (u.paired = n),
                            In(e, t.onShare))
                          : lt(e.child, !1)),
                      a.delete(l),
                      a.size === 0)
                    )
                      break;
                  }
                }
              }
              id(e);
            }
            e = e.sibling;
          }
      }
    }
    function sd(e) {
      if (e.tag === 30) {
        var a = e.memoizedProps,
          t = ht(a, e.stateNode),
          l = sa !== null ? sa.get(t) : void 0,
          n = Lt(a.default, l !== void 0 ? a.share : a.exit);
        (n !== "none" &&
          (Un(e, t, n, null, !1)
            ? l !== void 0
              ? ((n = e.stateNode),
                (l.paired = n),
                (n.paired = l),
                sa.delete(t),
                In(e, a.onShare))
              : In(e, a.onExit)
            : lt(e.child, !1)),
          sa !== null && id(e));
      } else if ((e.subtreeFlags & 33554432) !== 0)
        for (e = e.child; e !== null; ) (sd(e), (e = e.sibling));
      else sa !== null && id(e);
    }
    function Bh(e) {
      for (e = e.child; e !== null; ) {
        if (e.tag === 30) {
          var a = e.memoizedProps,
            t = ht(a, e.stateNode);
          ((a = Lt(a.default, a.update)),
            (e.flags &= -5),
            a !== "none" && Un(e, t, a, (e.memoizedState = []), !1));
        } else (e.subtreeFlags & 33554432) !== 0 && Bh(e);
        e = e.sibling;
      }
    }
    function od(e) {
      if ((e.subtreeFlags & 18874368) !== 0)
        for (e = e.child; e !== null; ) {
          if (e.tag !== 22 || e.memoizedState === null) {
            if (e.tag === 30 && (e.flags & 18874368) !== 0) {
              var a = e.stateNode;
              a.paired !== null && ((a.paired = null), lt(e.child, !1));
            }
            od(e);
          }
          e = e.sibling;
        }
    }
    function ni(e) {
      if (e.tag === 30) ((e.stateNode.paired = null), lt(e.child, !1), od(e));
      else if ((e.subtreeFlags & 33554432) !== 0)
        for (e = e.child; e !== null; ) (ni(e), (e = e.sibling));
      else od(e);
    }
    function qh(e) {
      for (e = e.child; e !== null; )
        (e.tag === 30
          ? lt(e.child, !1)
          : (e.subtreeFlags & 33554432) !== 0 && qh(e),
          (e = e.sibling));
    }
    function hc(e, a, t, l, n, u, r) {
      for (var s = !1; a !== null; ) {
        if (a.tag === 5) {
          var o = a.stateNode;
          if (u !== null && _e < u.length) {
            var d = u[_e],
              c = Id(o);
            (d.view || c.view) && (s = !0);
            var p;
            if ((p = (e.flags & 4) === 0))
              if (c.clip) p = !0;
              else {
                p = d.rect;
                var f = c.rect;
                p =
                  p.y !== f.y ||
                  p.x !== f.x ||
                  p.height !== f.height ||
                  p.width !== f.width;
              }
            (p && (e.flags |= 4),
              c.abs
                ? (c = !d.abs)
                : ((d = d.rect),
                  (c = c.rect),
                  (c = d.height !== c.height || d.width !== c.width)),
              c && (e.flags |= 32));
          } else e.flags |= 32;
          ((e.flags & 4) !== 0 && fb(o, _e === 0 ? t : t + "_" + _e, n),
            (s && (e.flags & 4) !== 0) ||
              (Xa === null && (Xa = []),
              Xa.push(o, _e === 0 ? l : l + "_" + _e, a.memoizedProps)),
            _e++);
        } else
          (a.tag !== 22 || a.memoizedState === null) &&
            (a.tag === 30 && r
              ? (e.flags |= a.flags & 32)
              : hc(e, a.child, t, l, n, u, r) && (s = !0));
        a = a.sibling;
      }
      return s;
    }
    function Oh(e, a) {
      for (e = e.child; e !== null; ) {
        if (e.tag === 30) {
          var t = e.memoizedProps,
            l = e.stateNode,
            n = ht(t, l),
            u = Lt(t.default, t.update);
          if (a) {
            l = l.clones;
            var r = l === null ? null : l.map(AC);
          } else ((r = e.memoizedState), (e.memoizedState = null));
          l = e;
          var s = e.child;
          ((_e = 0),
            (n = hc(l, s, n, n, u, r, !1)),
            (e.flags & 4) !== 0 && n && (a || In(e, t.onUpdate)));
        } else (e.subtreeFlags & 33554432) !== 0 && Oh(e, a);
        e = e.sibling;
      }
    }
    var Ie = !1,
      X = !1,
      Za = !1,
      fo = !1,
      am = typeof WeakSet == "function" ? WeakSet : Set,
      ke = null,
      ja = !1,
      mu = !1,
      Mi = !1,
      dd = !1;
    function Z0(e, a, t) {
      if (((e = e.containerInfo), (Ld = On), (e = hg(e)), Gd(e))) {
        if ("selectionStart" in e)
          var l = { start: e.selectionStart, end: e.selectionEnd };
        else
          e: {
            l = ((l = e.ownerDocument) && l.defaultView) || window;
            var n = l.getSelection && l.getSelection();
            if (n && n.rangeCount !== 0) {
              l = n.anchorNode;
              var u = n.anchorOffset,
                r = n.focusNode;
              n = n.focusOffset;
              try {
                (l.nodeType, r.nodeType);
              } catch {
                l = null;
                break e;
              }
              var s = 0,
                o = -1,
                d = -1,
                c = 0,
                p = 0,
                f = e,
                m = null;
              a: for (;;) {
                for (
                  var v;
                  f !== l || (u !== 0 && f.nodeType !== 3) || (o = s + u),
                    f !== r || (n !== 0 && f.nodeType !== 3) || (d = s + n),
                    f.nodeType === 3 && (s += f.nodeValue.length),
                    (v = f.firstChild) !== null;

                )
                  ((m = f), (f = v));
                for (;;) {
                  if (f === e) break a;
                  if (
                    (m === l && ++c === u && (o = s),
                    m === r && ++p === n && (d = s),
                    (v = f.nextSibling) !== null)
                  )
                    break;
                  ((f = m), (m = f.parentNode));
                }
                f = v;
              }
              l = o === -1 || d === -1 ? null : { start: o, end: d };
            } else l = null;
          }
        l = l || { start: 0, end: 0 };
      } else l = null;
      for (
        Sd = { focusedElem: e, selectionRange: l },
          On = !1,
          t = (t & 335544064) === t,
          ke = a,
          a = t ? 9270 : 1024;
        ke !== null;

      ) {
        if (((e = ke), t && ((l = e.deletions), l !== null)))
          for (u = 0; u < l.length; u++) t && sd(l[u]);
        if (e.alternate === null && (e.flags & 2) !== 0) (t && $p(e), Er(t));
        else {
          if (e.tag === 22) {
            if (((l = e.alternate), e.memoizedState !== null)) {
              (l !== null && l.memoizedState === null && t && sd(l), Er(t));
              continue;
            } else if (l !== null && l.memoizedState !== null) {
              (t && $p(e), Er(t));
              continue;
            }
          }
          ((l = e.child),
            (e.subtreeFlags & a) !== 0 && l !== null
              ? ((l.return = e), (ke = l))
              : (t && Bh(e), Er(t)));
        }
      }
      sa = null;
    }
    function Er(e) {
      for (; ke !== null; ) {
        var a = ke,
          t = e,
          l = a.alternate,
          n = a.flags;
        switch (a.tag) {
          case 0:
          case 11:
          case 15:
            break;
          case 1:
            if ((n & 1024) !== 0 && l !== null) {
              ((t = void 0), (n = l.memoizedProps), (l = l.memoizedState));
              var u = a.stateNode;
              try {
                var r = ql(a.type, n);
                ((t = u.getSnapshotBeforeUpdate(r, l)),
                  (u.__reactInternalSnapshotBeforeUpdate = t));
              } catch (s) {
                $(a, a.return, s);
              }
            }
            break;
          case 3:
            if ((n & 1024) !== 0) {
              if (((l = a.stateNode.containerInfo), (t = l.nodeType), t === 9))
                kd(l);
              else if (t === 1)
                switch (l.nodeName) {
                  case "HEAD":
                  case "HTML":
                  case "BODY":
                    kd(l);
                    break;
                  default:
                    l.textContent = "";
                }
            }
            break;
          case 5:
          case 26:
          case 27:
          case 6:
          case 4:
          case 17:
            break;
          case 30:
            t &&
              l !== null &&
              ((t = ht(l.memoizedProps, l.stateNode)),
              (n = a.memoizedProps),
              (n = Lt(n.default, n.update)),
              n !== "none" && Un(l, t, n, (l.memoizedState = []), !0));
            break;
          default:
            if ((n & 1024) !== 0) throw Error(S(163));
        }
        if (((l = a.sibling), l !== null)) {
          ((l.return = a.return), (ke = l));
          break;
        }
        ke = a.return;
      }
    }
    function Mh(e, a, t) {
      var l = t.flags;
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          (Ya(e, t), l & 4 && _u(5, t));
          break;
        case 1:
          if ((Ya(e, t), l & 4))
            if (((e = t.stateNode), a === null))
              try {
                e.componentDidMount();
              } catch (r) {
                $(t, t.return, r);
              }
            else {
              var n = ql(t.type, a.memoizedProps);
              a = a.memoizedState;
              try {
                e.componentDidUpdate(
                  n,
                  a,
                  e.__reactInternalSnapshotBeforeUpdate,
                );
              } catch (r) {
                $(t, t.return, r);
              }
            }
          (l & 64 && xh(t), l & 512 && Ja(t, t.return));
          break;
        case 3:
          if ((Ya(e, t), l & 64 && ((e = t.updateQueue), e !== null))) {
            if (((a = null), t.child !== null))
              switch (t.child.tag) {
                case 27:
                case 5:
                  a = t.child.stateNode;
                  break;
                case 1:
                  a = t.child.stateNode;
              }
            try {
              Dg(e, a);
            } catch (r) {
              $(t, t.return, r);
            }
          }
          break;
        case 27:
          a === null && l & 4 && Th(t);
        case 26:
        case 5:
          (Ya(e, t), a === null && l & 4 && nd(t), l & 512 && Ja(t, t.return));
          break;
        case 12:
          Ya(e, t);
          break;
        case 31:
          (Ya(e, t), l & 4 && Uh(e, t));
          break;
        case 13:
          (Ya(e, t),
            l & 4 && zh(e, t),
            l & 64 &&
              ((e = t.memoizedState),
              e !== null &&
                ((e = e.dehydrated),
                e !== null && ((t = nC.bind(null, t)), zC(e, t)))));
          break;
        case 22:
          if (((l = t.memoizedState !== null || Ie), !l)) {
            var u = (a !== null && a.memoizedState !== null) || X;
            ((a = Ie),
              (n = X),
              (Ie = l),
              (X = u) && !n
                ? ((l = 2),
                  (t.subtreeFlags & 8772) !== 0 && (l |= 1),
                  Pa(e, t, l))
                : Ya(e, t),
              (Ie = a),
              (X = n));
          }
          break;
        case 30:
          (Ya(e, t), l & 512 && Ja(t, t.return));
          break;
        case 7:
          l & 512 && Ja(t, t.return);
        default:
          Ya(e, t);
      }
    }
    function cd(e, a) {
      for (e = e.child; e !== null; ) (Ph(e, a), (e = e.sibling));
    }
    function Ph(e, a) {
      switch (e.tag) {
        case 5:
        case 26:
          try {
            var t = e.stateNode;
            if (a) {
              var l = t.style;
              typeof l.setProperty == "function"
                ? l.setProperty("display", "none", "important")
                : (l.display = "none");
            } else {
              var n = e.stateNode,
                u = e.memoizedProps.style,
                r = u != null && u.hasOwnProperty("display") ? u.display : null;
              n.style.display =
                r == null || typeof r == "boolean" ? "" : ("" + r).trim();
            }
          } catch (o) {
            $(e, e.return, o);
          }
          fd(e, a);
          break;
        case 6:
          try {
            ((e.stateNode.nodeValue = a ? "" : e.memoizedProps), (Z = !0));
          } catch (o) {
            $(e, e.return, o);
          }
          break;
        case 18:
          try {
            var s = e.stateNode;
            a ? bm(s, !0) : bm(e.stateNode, !1);
          } catch (o) {
            $(e, e.return, o);
          }
          break;
        case 22:
        case 23:
          e.memoizedState === null && cd(e, a);
          break;
        default:
          cd(e, a);
      }
    }
    function fd(e, a) {
      if (e.subtreeFlags & 67108864)
        for (e = e.child; e !== null; ) {
          e: {
            var t = e,
              l = a;
            switch (t.tag) {
              case 4:
                Ph(t, l);
                break e;
              case 22:
                t.memoizedState === null && fd(t, l);
                break e;
              default:
                fd(t, l);
            }
          }
          e = e.sibling;
        }
    }
    function Dh(e) {
      var a = e.alternate;
      (a !== null && ((e.alternate = null), Dh(a)),
        (e.child = null),
        (e.deletions = null),
        (e.sibling = null),
        e.tag === 5 && ((a = e.stateNode), a !== null && Gi(a)),
        (e.stateNode = null),
        (e.return = null),
        (e.dependencies = null),
        (e.memoizedProps = null),
        (e.memoizedState = null),
        (e.pendingProps = null),
        (e.stateNode = null),
        (e.updateQueue = null));
    }
    var ce = null,
      Xe = !1;
    function Ma(e, a, t) {
      for (t = t.child; t !== null; ) (Rh(e, a, t), (t = t.sibling));
    }
    function Rh(e, a, t) {
      if (ca && typeof ca.onCommitFiberUnmount == "function")
        try {
          ca.onCommitFiberUnmount(Vu, t);
        } catch {}
      switch (t.tag) {
        case 26:
          (X || qe(t, a),
            Ma(e, a, t),
            t.memoizedState
              ? t.memoizedState.count--
              : t.stateNode &&
                !X &&
                ((t = t.stateNode), t.parentNode.removeChild(t)));
          break;
        case 27:
          (X || qe(t, a), xu(t));
          var l = ce,
            n = Xe;
          (ll(t.type) && ((ce = t.stateNode), (Xe = !1)),
            Ma(e, a, t),
            Lb(t.stateNode, t.type, t.memoizedProps),
            (ce = l),
            (Xe = n));
          break;
        case 5:
          (X || qe(t, a), xu(t));
        case 6:
          if (
            (t.tag === 6 && xu(t),
            (l = ce),
            (n = Xe),
            (ce = null),
            Ma(e, a, t),
            (ce = l),
            (Xe = n),
            ce !== null)
          )
            if (Xe)
              try {
                ((ce.nodeType === 9
                  ? ce.body
                  : ce.nodeName === "HTML"
                    ? ce.ownerDocument.body
                    : ce
                ).removeChild(t.stateNode),
                  (Z = !0));
              } catch (u) {
                $(t, a, u);
              }
            else
              try {
                (ce.removeChild(t.stateNode), (Z = !0));
              } catch (u) {
                $(t, a, u);
              }
          break;
        case 18:
          ce !== null &&
            (Xe
              ? ((e = ce),
                hm(
                  e.nodeType === 9
                    ? e.body
                    : e.nodeName === "HTML"
                      ? e.ownerDocument.body
                      : e,
                  t.stateNode,
                ),
                Mn(e))
              : hm(ce, t.stateNode));
          break;
        case 4:
          ((l = ce),
            (n = Xe),
            (ce = t.stateNode.containerInfo),
            (Xe = !0),
            Ma(e, a, t),
            (ce = l),
            (Xe = n));
          break;
        case 0:
        case 11:
        case 14:
        case 15:
          (el(2, t, a), X || el(4, t, a), Ma(e, a, t));
          break;
        case 1:
          (X ||
            (qe(t, a),
            (l = t.stateNode),
            typeof l.componentWillUnmount == "function" && Ih(t, a, l)),
            Ma(e, a, t));
          break;
        case 21:
          Ma(e, a, t);
          break;
        case 22:
          ((X = (l = X) || t.memoizedState !== null), Ma(e, a, t), (X = l));
          break;
        case 30:
          (qe(t, a), Ma(e, a, t));
          break;
        case 7:
          (X || qe(t, a), Ma(e, a, t));
          break;
        default:
          Ma(e, a, t);
      }
    }
    function Uh(e, a) {
      if (
        a.memoizedState === null &&
        ((e = a.alternate), e !== null && ((e = e.memoizedState), e !== null))
      ) {
        e = e.dehydrated;
        try {
          Mn(e);
        } catch (t) {
          $(a, a.return, t);
        }
      }
    }
    function zh(e, a) {
      if (
        a.memoizedState === null &&
        ((e = a.alternate),
        e !== null &&
          ((e = e.memoizedState),
          e !== null && ((e = e.dehydrated), e !== null)))
      )
        try {
          Mn(e);
        } catch (t) {
          $(a, a.return, t);
        }
    }
    function j0(e) {
      switch (e.tag) {
        case 31:
        case 13:
        case 19:
          var a = e.stateNode;
          return (a === null && (a = e.stateNode = new am()), a);
        case 22:
          return (
            (e = e.stateNode),
            (a = e._retryCache),
            a === null && (a = e._retryCache = new am()),
            a
          );
        default:
          throw Error(S(435, e.tag));
      }
    }
    function Kr(e, a) {
      var t = j0(e);
      a.forEach(function (l) {
        if (!t.has(l)) {
          t.add(l);
          var n = uC.bind(null, e, l);
          l.then(n, n);
        }
      });
    }
    function Ve(e, a, t) {
      var l = a.deletions;
      if (l !== null)
        for (var n = 0; n < l.length; n++) {
          var u = l[n],
            r = e,
            s = a,
            o = s;
          e: for (; o !== null; ) {
            switch (o.tag) {
              case 27:
                if (ll(o.type)) {
                  ((ce = o.stateNode), (Xe = !1));
                  break e;
                }
                break;
              case 5:
                ((ce = o.stateNode), (Xe = !1));
                break e;
              case 3:
              case 4:
                ((ce = o.stateNode.containerInfo), (Xe = !0));
                break e;
            }
            o = o.return;
          }
          if (ce === null) throw Error(S(160));
          (Rh(r, s, u),
            (ce = null),
            (Xe = !1),
            (r = u.alternate),
            r !== null && (r.return = null),
            (u.return = null));
        }
      if (a.subtreeFlags & 13886)
        for (a = a.child; a !== null; ) (Nh(a, e, t), (a = a.sibling));
    }
    var Da = null;
    function Nh(e, a, t) {
      var l = e.alternate,
        n = e.flags;
      switch (e.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          if (
            n & 4 &&
            ((l = e.updateQueue),
            (l = l !== null ? l.events : null),
            l !== null)
          )
            for (var u = 0; u < l.length; u++) {
              var r = l[u];
              r.ref.impl = r.nextImpl;
            }
          (Ve(a, e, t),
            Ze(e),
            n & 4 && (el(3, e, e.return), _u(3, e), el(5, e, e.return)));
          break;
        case 1:
          (Ve(a, e, t),
            Ze(e),
            n & 512 && (X || l === null || qe(l, l.return)),
            n & 64 &&
              Ie &&
              ((e = e.updateQueue),
              e !== null &&
                ((a = e.callbacks),
                a !== null &&
                  ((t = e.shared.hiddenCallbacks),
                  (e.shared.hiddenCallbacks = t === null ? a : t.concat(a))))));
          break;
        case 26:
          if (
            ((u = Da),
            Ve(a, e, t),
            Ze(e),
            n & 512 && (X || l === null || qe(l, l.return)),
            n & 4)
          )
            if (
              ((n = l !== null ? l.memoizedState : null),
              (t = e.memoizedState),
              l === null)
            )
              if (t === null)
                if (e.stateNode === null)
                  if (Ie)
                    e.stateNode = cb(
                      e.type,
                      e.memoizedProps,
                      a.containerInfo,
                      e,
                    );
                  else {
                    e: {
                      ((a = e.type),
                        (t = e.memoizedProps),
                        (n = u.ownerDocument || u));
                      a: switch (a) {
                        case "title":
                          ((l = n.getElementsByTagName("title")[0]),
                            (!l ||
                              l[Yu] ||
                              l[Oe] ||
                              l.namespaceURI === "http://www.w3.org/2000/svg" ||
                              l.hasAttribute("itemprop")) &&
                              ((l = n.createElement(a)),
                              n.head.insertBefore(
                                l,
                                n.querySelector("head > title"),
                              )),
                            Re(l, a, t),
                            (l[Oe] = e),
                            Te(l),
                            (a = l));
                          break e;
                        case "link":
                          if (
                            (u = Im("link", "href", n).get(a + (t.href || "")))
                          ) {
                            for (r = 0; r < u.length; r++)
                              if (
                                ((l = u[r]),
                                l.getAttribute("href") ===
                                  (t.href == null || t.href === ""
                                    ? null
                                    : t.href) &&
                                  l.getAttribute("rel") ===
                                    (t.rel == null ? null : t.rel) &&
                                  l.getAttribute("title") ===
                                    (t.title == null ? null : t.title) &&
                                  l.getAttribute("crossorigin") ===
                                    (t.crossOrigin == null
                                      ? null
                                      : t.crossOrigin))
                              ) {
                                u.splice(r, 1);
                                break a;
                              }
                          }
                          ((l = n.createElement(a)),
                            Re(l, a, t),
                            n.head.appendChild(l));
                          break;
                        case "meta":
                          if (
                            (u = Im("meta", "content", n).get(
                              a + (t.content || ""),
                            ))
                          ) {
                            for (r = 0; r < u.length; r++)
                              if (
                                ((l = u[r]),
                                l.getAttribute("content") ===
                                  (t.content == null ? null : "" + t.content) &&
                                  l.getAttribute("name") ===
                                    (t.name == null ? null : t.name) &&
                                  l.getAttribute("property") ===
                                    (t.property == null ? null : t.property) &&
                                  l.getAttribute("http-equiv") ===
                                    (t.httpEquiv == null
                                      ? null
                                      : t.httpEquiv) &&
                                  l.getAttribute("charset") ===
                                    (t.charSet == null ? null : t.charSet))
                              ) {
                                u.splice(r, 1);
                                break a;
                              }
                          }
                          ((l = n.createElement(a)),
                            Re(l, a, t),
                            n.head.appendChild(l));
                          break;
                        default:
                          throw Error(S(468, a));
                      }
                      ((l[Oe] = e), Te(l), (a = l));
                    }
                    e.stateNode = a;
                  }
                else Ie || Bd(u, e.type, e.stateNode);
              else e.stateNode = xm(u, t, e.memoizedProps);
            else
              n !== t
                ? (n === null
                    ? ((a = l.stateNode),
                      a === null || X || a.parentNode.removeChild(a))
                    : n.count--,
                  t === null
                    ? Ie || Bd(u, e.type, e.stateNode)
                    : xm(u, t, e.memoizedProps))
                : t === null &&
                  e.stateNode !== null &&
                  oo(e, e.memoizedProps, l.memoizedProps);
          break;
        case 27:
          (Ve(a, e, t),
            Ze(e),
            n & 512 && (X || l === null || qe(l, l.return)),
            l !== null && n & 4 && oo(e, e.memoizedProps, l.memoizedProps));
          break;
        case 5:
          if (
            ((u = Za),
            (Za = !1),
            Ve(a, e, t),
            (Za = u),
            Ze(e),
            n & 512 && (X || l === null || qe(l, l.return)),
            e.flags & 32)
          ) {
            a = e.stateNode;
            try {
              (Ln(a, ""), (Z = !0));
            } catch (c) {
              $(e, e.return, c);
            }
          }
          (n & 4 &&
            e.stateNode != null &&
            ((a = e.memoizedProps), oo(e, a, l !== null ? l.memoizedProps : a)),
            n & 1024 && (fo = !0));
          break;
        case 6:
          if ((Ve(a, e, t), Ze(e), n & 4)) {
            if (e.stateNode === null) throw Error(S(162));
            ((a = e.memoizedProps), (t = e.stateNode));
            try {
              ((t.nodeValue = a), (Z = !0));
            } catch (c) {
              $(e, e.return, c);
            }
          }
          break;
        case 3:
          if (
            ((Z = !1),
            (si = null),
            (u = Da),
            (Da = Eu(a.containerInfo)),
            Ve(a, e, t),
            (Da = u),
            Ze(e),
            n & 4 && l !== null && l.memoizedState.isDehydrated)
          )
            try {
              Mn(a.containerInfo);
            } catch (c) {
              $(e, e.return, c);
            }
          (fo && ((fo = !1), Hh(e)), (Z = !1));
          break;
        case 4:
          ((n = Za),
            (Za = Ie),
            (l = ip()),
            (u = Da),
            (Da = Eu(e.stateNode.containerInfo)),
            Ve(a, e, t),
            Ze(e),
            (Da = u),
            Z && mu && (Mi = !0),
            (Z = l),
            (Za = n));
          break;
        case 12:
          (Ve(a, e, t), Ze(e));
          break;
        case 31:
          (Ve(a, e, t),
            Ze(e),
            n & 4 &&
              ((a = e.updateQueue),
              a !== null && ((e.updateQueue = null), Kr(e, a))));
          break;
        case 13:
          (Ve(a, e, t),
            Ze(e),
            e.child.flags & 8192 &&
              (e.memoizedState !== null) !=
                (l !== null && l.memoizedState !== null) &&
              (as = da()),
            n & 4 &&
              ((a = e.updateQueue),
              a !== null && ((e.updateQueue = null), Kr(e, a))));
          break;
        case 22:
          ((u = e.memoizedState !== null),
            (r = l !== null && l.memoizedState !== null));
          var s = Ie,
            o = X,
            d = Za;
          ((Ie = s || u),
            (Za = d || u),
            (X = o || r),
            Ve(a, e, t),
            (X = o),
            (Za = d),
            (Ie = s),
            Ze(e),
            n & 8192 &&
              ((a = e.stateNode),
              (a._visibility = u ? a._visibility & -2 : a._visibility | 1),
              !u ||
                l === null ||
                r ||
                Ie ||
                X ||
                ((a = r || X),
                (t = Ie),
                (l = X),
                (Ie = u || Ie),
                (X = a),
                Ot(e, 2),
                (Ie = t),
                (X = l)),
              (!u && Za) || cd(e, u)),
            n & 4 &&
              ((a = e.updateQueue),
              a !== null &&
                ((t = a.retryQueue),
                t !== null && ((a.retryQueue = null), Kr(e, t)))));
          break;
        case 19:
          (Ve(a, e, t),
            Ze(e),
            n & 4 &&
              ((a = e.updateQueue),
              a !== null && ((e.updateQueue = null), Kr(e, a))));
          break;
        case 30:
          (n & 512 && (X || l === null || qe(l, l.return)),
            (n = ip()),
            (u = mu),
            (r = (t & 335544064) === t),
            (s = e.memoizedProps),
            (mu = r && Lt(s.default, s.update) !== "none"),
            Ve(a, e, t),
            Ze(e),
            r && l !== null && Z && (e.flags |= 4),
            (mu = u),
            (Z = n));
          break;
        case 21:
          break;
        case 7:
          (n & 512 && (X || l === null || qe(l, l.return)),
            l && l.stateNode !== null && (l.stateNode._fragmentFiber = e));
        default:
          (Ve(a, e, t), Ze(e));
      }
    }
    function Ze(e) {
      var a = e.flags;
      if (a & 2) {
        try {
          for (var t, l = e.return; l !== null; ) {
            if (kh(l)) {
              t = l;
              break;
            }
            l = l.return;
          }
          l = null;
          for (var n = e.return; n !== null; ) {
            if (gc(n)) {
              var u = n.stateNode;
              l === null ? (l = [u]) : l.push(u);
            }
            if (mc(n)) break;
            n = n.return;
          }
          var r = l;
          if (t == null) throw Error(S(160));
          switch (t.tag) {
            case 27:
              var s = t.stateNode,
                o = co(e);
              qi(e, o, s, r);
              break;
            case 5:
              var d = t.stateNode;
              t.flags & 32 && (Ln(d, ""), (t.flags &= -33));
              var c = co(e);
              qi(e, c, d, r);
              break;
            case 3:
            case 4:
              var p = t.stateNode.containerInfo,
                f = co(e);
              ud(e, f, p, r);
              break;
            default:
              throw Error(S(161));
          }
        } catch (m) {
          $(e, e.return, m);
        }
        e.flags &= -3;
      }
      a & 4096 && (e.flags &= -4097);
    }
    function Hh(e) {
      if (e.subtreeFlags & 1024)
        for (e = e.child; e !== null; ) {
          var a = e;
          (Hh(a),
            a.tag === 5 &&
              a.flags & 1024 &&
              ((a = a.stateNode), (On = !0), a.reset(), (On = !1)),
            (e = e.sibling));
        }
    }
    function jl(e, a) {
      if (a.subtreeFlags & 9270)
        for (a = a.child; a !== null; ) (Eh(a, e), (a = a.sibling));
      else Oh(a, !1);
    }
    function Eh(e, a) {
      var t = e.alternate;
      if (t === null) rd(e, !1);
      else
        switch (e.tag) {
          case 3:
            if (((dd = ja = !1), em(), jl(a, e), !ja && !Mi)) {
              if (((e = Xa), e !== null))
                for (var l = 0; l < e.length; l += 3) {
                  t = e[l];
                  var n = e[l + 1];
                  (pb(t, e[l + 2]),
                    (t = t.ownerDocument.documentElement),
                    t !== null &&
                      t.animate(
                        { opacity: [0, 0], pointerEvents: ["none", "none"] },
                        {
                          duration: 0,
                          fill: "forwards",
                          pseudoElement: "::view-transition-group(" + n + ")",
                        },
                      ));
                }
              ((e = a.containerInfo),
                (e =
                  e.nodeType === 9
                    ? e.documentElement
                    : e.ownerDocument.documentElement),
                e !== null &&
                  e.style.viewTransitionName === "" &&
                  ((e.style.viewTransitionName = "none"),
                  e.animate(
                    { opacity: [0, 0], pointerEvents: ["none", "none"] },
                    {
                      duration: 0,
                      fill: "forwards",
                      pseudoElement: "::view-transition-group(root)",
                    },
                  ),
                  e.animate(
                    { width: [0, 0], height: [0, 0] },
                    {
                      duration: 0,
                      fill: "forwards",
                      pseudoElement: "::view-transition",
                    },
                  )),
                (dd = !0));
            }
            Xa = null;
            break;
          case 5:
            jl(a, e);
            break;
          case 4:
            ((l = ja), (ja = !1), jl(a, e), ja && (Mi = !0), (ja = l));
            break;
          case 22:
            e.memoizedState === null &&
              (t.memoizedState !== null ? rd(e, !1) : jl(a, e));
            break;
          case 30:
            ((l = ja), (n = em()), (ja = !1), jl(a, e), ja && (e.flags |= 4));
            var u = e.memoizedProps,
              r = e.stateNode;
            ((a = ht(u, r)), (r = ht(t.memoizedProps, r)));
            var s = Lt(u.default, u.update);
            (s === "none"
              ? (a = !1)
              : ((u = t.memoizedState),
                (t.memoizedState = null),
                (t = e.child),
                (_e = 0),
                (a = hc(e, t, a, r, s, u, !0)),
                _e !== (u === null ? 0 : u.length) && (e.flags |= 32)),
              (e.flags & 4) !== 0 && a
                ? (In(e, e.memoizedProps.onUpdate), (Xa = n))
                : n !== null && (n.push.apply(n, Xa), (Xa = n)),
              (ja = (e.flags & 32) !== 0 ? !0 : l));
            break;
          default:
            jl(a, e);
        }
    }
    function Ya(e, a) {
      if (a.subtreeFlags & 8772)
        for (a = a.child; a !== null; )
          (Mh(e, a.alternate, a), (a = a.sibling));
    }
    function Ot(e, a) {
      for (e = e.child; e !== null; ) {
        var t = e,
          l = a;
        switch (t.tag) {
          case 0:
          case 11:
          case 14:
          case 15:
            (el(4, t, t.return), Ot(t, l));
            break;
          case 1:
            qe(t, t.return);
            var n = t.stateNode;
            (typeof n.componentWillUnmount == "function" && Ih(t, t.return, n),
              Ot(t, l));
            break;
          case 27:
            (l & 2) !== 0 && Lb(t.stateNode, t.type, t.memoizedProps);
          case 5:
            (qe(t, t.return), (t.tag !== 5 && t.tag !== 27) || xu(t), Ot(t, l));
            break;
          case 6:
            xu(t);
            break;
          case 26:
            (qe(t, t.return),
              (n = t.stateNode),
              t.memoizedState !== null ||
                n === null ||
                X ||
                n.parentNode.removeChild(n),
              Ot(t, l));
            break;
          case 22:
            t.memoizedState === null && Ot(t, l);
            break;
          case 30:
            (qe(t, t.return), Ot(t, l));
            break;
          case 7:
            qe(t, t.return);
          default:
            Ot(t, l);
        }
        e = e.sibling;
      }
    }
    function Pa(e, a, t) {
      for (
        t = (a.subtreeFlags & 8772) !== 0 ? t : t & -2, a = a.child;
        a !== null;

      ) {
        var l = a.alternate,
          n = e,
          u = a,
          r = u.flags,
          s = (t & 1) !== 0;
        switch (u.tag) {
          case 0:
          case 11:
          case 15:
            (Pa(n, u, t), _u(4, u));
            break;
          case 1:
            if (
              (Pa(n, u, t),
              (l = u),
              (n = l.stateNode),
              typeof n.componentDidMount == "function")
            )
              try {
                n.componentDidMount();
              } catch (c) {
                $(l, l.return, c);
              }
            if (((l = u), (n = l.updateQueue), n !== null)) {
              var o = l.stateNode;
              try {
                var d = n.shared.hiddenCallbacks;
                if (d !== null)
                  for (
                    n.shared.hiddenCallbacks = null, n = 0;
                    n < d.length;
                    n++
                  )
                    Pg(d[n], o);
              } catch (c) {
                $(l, l.return, c);
              }
            }
            (s && r & 64 && xh(u), Ja(u, u.return));
            break;
          case 27:
            (t & 2) !== 0 && Th(u);
          case 5:
            ((u.tag !== 5 && u.tag !== 27) || _p(u),
              Pa(n, u, t),
              s && l === null && r & 4 && nd(u),
              Ja(u, u.return));
            break;
          case 6:
            _p(u);
            break;
          case 26:
            ((o = u.stateNode),
              u.memoizedState !== null ||
                o === null ||
                Ie ||
                Bd(Eu(o.ownerDocument), u.type, o),
              Pa(n, u, t),
              s && l === null && r & 4 && nd(u),
              Ja(u, u.return));
            break;
          case 12:
            Pa(n, u, t);
            break;
          case 31:
            (Pa(n, u, t), s && r & 4 && Uh(n, u));
            break;
          case 13:
            (Pa(n, u, t), s && r & 4 && zh(n, u));
            break;
          case 22:
            (u.memoizedState === null && Pa(n, u, t), Ja(u, u.return));
            break;
          case 30:
            (Pa(n, u, t), Ja(u, u.return));
            break;
          case 7:
            Ja(u, u.return);
          default:
            Pa(n, u, t);
        }
        a = a.sibling;
      }
    }
    function bc(e, a) {
      var t = null;
      (e !== null &&
        e.memoizedState !== null &&
        e.memoizedState.cachePool !== null &&
        (t = e.memoizedState.cachePool.pool),
        (e = null),
        a.memoizedState !== null &&
          a.memoizedState.cachePool !== null &&
          (e = a.memoizedState.cachePool.pool),
        e !== t && (e != null && e.refCount++, t != null && Xu(t)));
    }
    function vc(e, a) {
      ((e = null),
        a.alternate !== null && (e = a.alternate.memoizedState.cache),
        (a = a.memoizedState.cache),
        a !== e && (a.refCount++, e != null && Xu(e)));
    }
    function ya(e, a, t, l) {
      var n = (t & 335544064) === t;
      if (a.subtreeFlags & (n ? 10262 : 10256))
        for (a = a.child; a !== null; ) (Kh(e, a, t, l), (a = a.sibling));
      else n && qh(a);
    }
    function Kh(e, a, t, l) {
      var n = (t & 335544064) === t;
      n &&
        a.alternate === null &&
        a.return !== null &&
        a.return.alternate !== null &&
        ni(a);
      var u = a.flags;
      switch (a.tag) {
        case 0:
        case 11:
        case 15:
          (ya(e, a, t, l), u & 2048 && _u(9, a));
          break;
        case 1:
          ya(e, a, t, l);
          break;
        case 3:
          (ya(e, a, t, l),
            n &&
              dd &&
              ((e = e.containerInfo),
              (e =
                e.nodeType === 9
                  ? e.body
                  : e.nodeName === "HTML"
                    ? e.ownerDocument.body
                    : e),
              e.style.viewTransitionName === "root" &&
                (e.style.viewTransitionName = ""),
              (e = e.ownerDocument.documentElement),
              e !== null &&
                e.style.viewTransitionName === "none" &&
                (e.style.viewTransitionName = "")),
            u & 2048 &&
              ((u = null),
              a.alternate !== null && (u = a.alternate.memoizedState.cache),
              (a = a.memoizedState.cache),
              a !== u && (a.refCount++, u != null && Xu(u))));
          break;
        case 12:
          if (u & 2048) {
            (ya(e, a, t, l), (u = a.stateNode));
            try {
              var r = a.memoizedProps,
                s = r.id,
                o = r.onPostCommit;
              typeof o == "function" &&
                o(
                  s,
                  a.alternate === null ? "mount" : "update",
                  u.passiveEffectDuration,
                  -0,
                );
            } catch (d) {
              $(a, a.return, d);
            }
          } else ya(e, a, t, l);
          break;
        case 31:
          ya(e, a, t, l);
          break;
        case 13:
          ya(e, a, t, l);
          break;
        case 23:
          break;
        case 22:
          ((r = a.stateNode),
            (s = a.alternate),
            a.memoizedState !== null
              ? (n && s !== null && s.memoizedState === null && ni(s),
                r._visibility & 2 ? ya(e, a, t, l) : Iu(e, a))
              : (n && s !== null && s.memoizedState !== null && ni(a),
                r._visibility & 2
                  ? ya(e, a, t, l)
                  : ((r._visibility |= 2),
                    Jl(e, a, t, l, (a.subtreeFlags & 10256) !== 0 || !1))),
            u & 2048 && bc(s, a));
          break;
        case 24:
          (ya(e, a, t, l), u & 2048 && vc(a.alternate, a));
          break;
        case 30:
          (n &&
            ((u = a.alternate),
            u !== null && (lt(u.child, !0), lt(a.child, !0))),
            ya(e, a, t, l));
          break;
        default:
          ya(e, a, t, l);
      }
    }
    function Jl(e, a, t, l, n) {
      for (
        n = n && ((a.subtreeFlags & 10256) !== 0 || !1), a = a.child;
        a !== null;

      ) {
        var u = e,
          r = a,
          s = t,
          o = l,
          d = r.flags;
        switch (r.tag) {
          case 0:
          case 11:
          case 15:
            (Jl(u, r, s, o, n), _u(8, r));
            break;
          case 23:
            break;
          case 22:
            var c = r.stateNode;
            (r.memoizedState !== null
              ? c._visibility & 2
                ? Jl(u, r, s, o, n)
                : Iu(u, r)
              : ((c._visibility |= 2), Jl(u, r, s, o, n)),
              n && d & 2048 && bc(r.alternate, r));
            break;
          case 24:
            (Jl(u, r, s, o, n), n && d & 2048 && vc(r.alternate, r));
            break;
          default:
            Jl(u, r, s, o, n);
        }
        a = a.sibling;
      }
    }
    function Iu(e, a) {
      if (a.subtreeFlags & 10256)
        for (a = a.child; a !== null; ) {
          var t = e,
            l = a,
            n = l.flags;
          switch (l.tag) {
            case 22:
              (Iu(t, l), n & 2048 && bc(l.alternate, l));
              break;
            case 24:
              (Iu(t, l), n & 2048 && vc(l.alternate, l));
              break;
            default:
              Iu(t, l);
          }
          a = a.sibling;
        }
    }
    var hl = 8192;
    function pl(e, a, t) {
      if (e.subtreeFlags & hl)
        for (e = e.child; e !== null; ) (Gh(e, a, t), (e = e.sibling));
    }
    function Gh(e, a, t) {
      switch (e.tag) {
        case 26:
          (pl(e, a, t),
            e.flags & hl &&
              (e.memoizedState !== null
                ? WC(t, Da, e.memoizedState, e.memoizedProps)
                : ((e = e.stateNode), (a & 335544128) === a && Tm(t, e))));
          break;
        case 5:
          (pl(e, a, t),
            e.flags & hl &&
              ((e = e.stateNode), (a & 335544128) === a && Tm(t, e)));
          break;
        case 3:
        case 4:
          var l = Da;
          ((Da = Eu(e.stateNode.containerInfo)), pl(e, a, t), (Da = l));
          break;
        case 22:
          e.memoizedState === null &&
            ((l = e.alternate),
            l !== null && l.memoizedState !== null
              ? ((l = hl), (hl = 16777216), pl(e, a, t), (hl = l))
              : pl(e, a, t));
          break;
        case 30:
          if (
            (e.flags & hl) !== 0 &&
            ((l = e.memoizedProps.name), l != null && l !== "auto")
          ) {
            var n = e.stateNode;
            ((n.paired = null), sa === null && (sa = new Map()), sa.set(l, n));
          }
          pl(e, a, t);
          break;
        default:
          pl(e, a, t);
      }
    }
    function Fh(e) {
      var a = e.alternate;
      if (a !== null && ((e = a.child), e !== null)) {
        a.child = null;
        do ((a = e.sibling), (e.sibling = null), (e = a));
        while (e !== null);
      }
    }
    function iu(e) {
      var a = e.deletions;
      if ((e.flags & 16) !== 0) {
        if (a !== null)
          for (var t = 0; t < a.length; t++) {
            var l = a[t];
            ((ke = l), Vh(l, e));
          }
        Fh(e);
      }
      if (e.subtreeFlags & 10256)
        for (e = e.child; e !== null; ) (Qh(e), (e = e.sibling));
    }
    function Qh(e) {
      switch (e.tag) {
        case 0:
        case 11:
        case 15:
          (iu(e), e.flags & 2048 && el(9, e, e.return));
          break;
        case 3:
          iu(e);
          break;
        case 12:
          iu(e);
          break;
        case 22:
          var a = e.stateNode;
          e.memoizedState !== null &&
          a._visibility & 2 &&
          (e.return === null || e.return.tag !== 13)
            ? ((a._visibility &= -3), ui(e))
            : iu(e);
          break;
        default:
          iu(e);
      }
    }
    function ui(e) {
      var a = e.deletions;
      if ((e.flags & 16) !== 0) {
        if (a !== null)
          for (var t = 0; t < a.length; t++) {
            var l = a[t];
            ((ke = l), Vh(l, e));
          }
        Fh(e);
      }
      for (e = e.child; e !== null; ) {
        switch (((a = e), a.tag)) {
          case 0:
          case 11:
          case 15:
            (el(8, a, a.return), ui(a));
            break;
          case 22:
            ((t = a.stateNode),
              t._visibility & 2 && ((t._visibility &= -3), ui(a)));
            break;
          default:
            ui(a);
        }
        e = e.sibling;
      }
    }
    function Vh(e, a) {
      for (; ke !== null; ) {
        var t = ke;
        switch (t.tag) {
          case 0:
          case 11:
          case 15:
            el(8, t, a);
            break;
          case 23:
          case 22:
            if (
              t.memoizedState !== null &&
              t.memoizedState.cachePool !== null
            ) {
              var l = t.memoizedState.cachePool.pool;
              l != null && l.refCount++;
            }
            break;
          case 24:
            Xu(t.memoizedState.cache);
        }
        if (((l = t.child), l !== null)) ((l.return = t), (ke = l));
        else
          e: for (t = e; ke !== null; ) {
            l = ke;
            var n = l.sibling,
              u = l.return;
            if ((Dh(l), l === t)) {
              ke = null;
              break e;
            }
            if (n !== null) {
              ((n.return = u), (ke = n));
              break e;
            }
            ke = u;
          }
      }
    }
    var Y0 = {
        getCacheForType: function (e) {
          var a = Me(be),
            t = a.data.get(e);
          return (t === void 0 && ((t = e()), a.data.set(e, t)), t);
        },
        cacheSignal: function () {
          return Me(be).controller.signal;
        },
      },
      J0 = typeof WeakMap == "function" ? WeakMap : Map,
      j = 0,
      ne = null,
      G = null,
      F = 0,
      W = 0,
      ua = null,
      Nt = !1,
      zn = !1,
      yc = !1,
      Ct = 0,
      me = 0,
      al = 0,
      Sl = 0,
      Pi = 0,
      oa = 0,
      xn = 0,
      ku = null,
      We = null,
      pd = !1,
      as = 0,
      Zh = 0,
      Di = 1 / 0,
      Ri = null,
      jt = null,
      fe = 0,
      Ua = null,
      Ol = null,
      tt = 0,
      md = 0,
      gd = null,
      jh = null,
      bn = null,
      vn = null,
      yn = null,
      Tu = 0,
      ri = null;
    function pa() {
      return (j & 2) !== 0 && F !== 0 ? F & -F : R.T !== null ? Ac() : Wm();
    }
    function Yh() {
      if (oa === 0)
        if ((F & 536870912) === 0 || H) {
          var e = wr;
          ((wr <<= 1), (wr & 3932160) === 0 && (wr = 262144), (oa = e));
        } else oa = 536870912;
      return ((e = Ue.current), e !== null && (e.flags |= 32), oa);
    }
    function In(e, a) {
      if (a != null) {
        var t = e.stateNode,
          l = t.ref;
        (l === null && (l = t.ref = gb(ht(e.memoizedProps, t))),
          vn === null && (vn = []),
          vn.push(a.bind(null, l)));
      }
    }
    function ea(e, a, t) {
      (((e === ne && (W === 2 || W === 9)) || e.cancelPendingCommit !== null) &&
        (kn(e, 0), Ht(e, F, oa, !1)),
        ju(e, t),
        ((j & 2) === 0 || e !== ne) &&
          (e === ne &&
            ((j & 2) === 0 && (Sl |= t), me === 4 && Ht(e, F, oa, !1)),
          ut(e)));
    }
    function Jh(e, a, t) {
      if ((j & 6) !== 0) throw Error(S(327));
      var l = (!t && (a & 127) === 0 && (a & e.expiredLanes) === 0) || Zu(e, a),
        n = l ? _0(e, a) : po(e, a, !0),
        u = l;
      do {
        if (n === 0) {
          zn && !l && Ht(e, a, 0, !1);
          break;
        } else {
          if (((t = e.current.alternate), u && !X0(t))) {
            ((n = po(e, a, !1)), (u = !1));
            continue;
          }
          if (n === 2) {
            if (((u = a), e.errorRecoveryDisabledLanes & u)) var r = 0;
            else
              ((r = e.pendingLanes & -536870913),
                (r = r !== 0 ? r : r & 536870912 ? 536870912 : 0));
            if (r !== 0) {
              a = r;
              e: {
                var s = e;
                n = ku;
                var o = s.current.memoizedState.isDehydrated;
                if (
                  (o && (kn(s, r).flags |= 256),
                  (r = po(s, r, !1)),
                  r !== 2 && r !== 6)
                ) {
                  if (yc && !o) {
                    ((s.errorRecoveryDisabledLanes |= u), (Sl |= u), (n = 4));
                    break e;
                  }
                  ((u = We),
                    (We = n),
                    u !== null &&
                      (We === null ? (We = u) : We.push.apply(We, u)));
                }
                n = r;
              }
              if (((u = !1), n !== 2)) continue;
            }
          }
          if (n === 1) {
            (kn(e, 0), Ht(e, a, 0, !0));
            break;
          }
          e: {
            switch (((l = e), (u = n), u)) {
              case 0:
              case 1:
                throw Error(S(345));
              case 4:
                if ((a & 4194048) !== a && (a & 62914560) !== a) break;
              case 6:
                Ht(l, a, oa, !Nt);
                break e;
              case 2:
                We = null;
                break;
              case 3:
              case 5:
                break;
              default:
                throw Error(S(329));
            }
            if ((a & 62914560) === a && ((n = as + 300 - da()), 10 < n)) {
              if ((Ht(l, a, oa, !Nt), Ki(l, 0, !0) !== 0)) break e;
              ((tt = a),
                (l.timeoutHandle = Sc(
                  tm.bind(
                    null,
                    l,
                    t,
                    We,
                    Ri,
                    pd,
                    a,
                    oa,
                    Sl,
                    xn,
                    Nt,
                    u,
                    "Throttled",
                    -0,
                    0,
                  ),
                  n,
                )));
              break e;
            }
            tm(l, t, We, Ri, pd, a, oa, Sl, xn, Nt, u, null, -0, 0);
          }
        }
        break;
      } while (!0);
      ut(e);
    }
    function tm(e, a, t, l, n, u, r, s, o, d, c, p, f, m) {
      e.timeoutHandle = -1;
      var v = a.subtreeFlags,
        C = (u & 335544064) === u;
      if (
        ((p = null),
        (C || v & 8192 || (v & 16785408) === 16785408) &&
          ((p = {
            stylesheets: null,
            count: 0,
            imgCount: 0,
            imgBytes: 0,
            suspenseyImages: [],
            waitingForImages: !0,
            waitingForViewTransition: !1,
            unsuspend: _a,
          }),
          (sa = null),
          Gh(a, u, p),
          C &&
            ((v = p),
            (C = e.containerInfo),
            (C = (C.nodeType === 9 ? C : C.ownerDocument)
              .__reactViewTransition),
            C != null &&
              (v.count++,
              (v.waitingForViewTransition = !0),
              (v = Ku.bind(v)),
              C.finished.then(v, v))),
          (v =
            (u & 62914560) === u
              ? as - da()
              : (u & 4194048) === u
                ? Zh - da()
                : 0),
          (v = _C(p, v)),
          v !== null))
      ) {
        ((tt = u),
          (e.cancelPendingCommit = v(
            nm.bind(null, e, a, u, t, l, n, r, s, o, d, c, p, null, f, m),
          )),
          Ht(e, u, r, !d));
        return;
      }
      nm(e, a, u, t, l, n, r, s, o, d, c, p);
    }
    function X0(e) {
      for (var a = e; ; ) {
        var t = a.tag;
        if (
          (t === 0 || t === 11 || t === 15) &&
          a.flags & 16384 &&
          ((t = a.updateQueue), t !== null && ((t = t.stores), t !== null))
        )
          for (var l = 0; l < t.length; l++) {
            var n = t[l],
              u = n.getSnapshot;
            n = n.value;
            try {
              if (!ma(u(), n)) return !1;
            } catch {
              return !1;
            }
          }
        if (((t = a.child), a.subtreeFlags & 16384 && t !== null))
          ((t.return = a), (a = t));
        else {
          if (a === e) break;
          for (; a.sibling === null; ) {
            if (a.return === null || a.return === e) return !0;
            a = a.return;
          }
          ((a.sibling.return = a.return), (a = a.sibling));
        }
      }
      return !0;
    }
    function Ht(e, a, t, l) {
      ((a = Zm(e, a)),
        (a &= ~Pi),
        (a &= ~Sl),
        (e.suspendedLanes |= a),
        (e.pingedLanes &= ~a),
        l && (e.warmLanes |= a),
        (l = e.expirationTimes));
      for (var n = a; 0 < n; ) {
        var u = 31 - fa(n),
          r = 1 << u;
        ((l[u] = -1), (n &= ~r));
      }
      t !== 0 && Ym(e, t, a);
    }
    function ts() {
      return (j & 6) === 0 ? ($u(0, !1), !1) : !0;
    }
    function Cc() {
      if (G !== null) {
        if (W === 0) var e = G.return;
        else ((e = G), (ft = Ul = null), lc(e), (mn = null), (Du = 0), (e = G));
        for (; e !== null; ) (Sh(e.alternate, e), (e = e.return));
        G = null;
      }
    }
    function kn(e, a) {
      var t = e.timeoutHandle;
      return (
        t !== -1 && ((e.timeoutHandle = -1), vC(t)),
        (t = e.cancelPendingCommit),
        t !== null && ((e.cancelPendingCommit = null), t()),
        (tt = 0),
        Cc(),
        (ne = e),
        (G = t = pt(e.current, null)),
        (F = a),
        (W = 0),
        (ua = null),
        (Nt = !1),
        (zn = Zu(e, a)),
        (yc = !1),
        (xn = oa = Pi = Sl = al = me = 0),
        (We = ku = null),
        (pd = !1),
        (Ct = Zm(e, a)),
        Zi(),
        t
      );
    }
    function Xh(e, a) {
      ((N = null),
        (R.H = Ti),
        a === Rn || a === Ji
          ? ((a = Bp()), (W = 3))
          : a === Jd
            ? ((a = Bp()), (W = 4))
            : (W =
                a === cc
                  ? 8
                  : a !== null &&
                      typeof a == "object" &&
                      typeof a.then == "function"
                    ? 6
                    : 1),
        (ua = a),
        G === null && ((me = 1), wi(e, xa(a, e.current))));
    }
    function Wh() {
      var e = Ue.current;
      return e === null
        ? !0
        : (F & 4194048) === F
          ? Ge === null
          : (F & 62914560) === F || (F & 536870912) !== 0
            ? e === Ge
            : !1;
    }
    function _h() {
      var e = R.H;
      return ((R.H = Ti), e === null ? Ti : e);
    }
    function $h() {
      var e = R.A;
      return ((R.A = Y0), e);
    }
    function Ui() {
      ((me = 4),
        Nt || ((F & 4194048) !== F && Ue.current !== null) || (zn = !0),
        ((al & 134217727) === 0 && (Sl & 134217727) === 0) ||
          ne === null ||
          Ht(ne, F, oa, !1));
    }
    function po(e, a, t) {
      var l = j;
      j |= 2;
      var n = _h(),
        u = $h();
      ((ne !== e || F !== a) && ((Ri = null), kn(e, a)), (a = !1));
      var r = me;
      e: do
        try {
          if (W !== 0 && G !== null) {
            var s = G,
              o = ua;
            switch (W) {
              case 8:
                (Cc(), (r = 6));
                break e;
              case 3:
              case 2:
              case 9:
              case 6:
                Ue.current === null && (a = !0);
                var d = W;
                if (((W = 0), (ua = null), on(e, s, o, d), t && zn)) {
                  r = 0;
                  break e;
                }
                break;
              default:
                ((d = W), (W = 0), (ua = null), on(e, s, o, d));
            }
          }
          (W0(), (r = me));
          break;
        } catch (c) {
          Xh(e, c);
        }
      while (!0);
      return (
        a && e.shellSuspendCounter++,
        (ft = Ul = null),
        (j = l),
        (R.H = n),
        (R.A = u),
        G === null && ((ne = null), (F = 0), Zi()),
        r
      );
    }
    function W0() {
      for (; G !== null; ) eb(G);
    }
    function _0(e, a) {
      var t = j;
      j |= 2;
      var l = _h(),
        n = $h();
      ne !== e || F !== a
        ? ((Ri = null), (Di = da() + 500), kn(e, a))
        : (zn = Zu(e, a));
      e: do
        try {
          if (W !== 0 && G !== null) {
            a = G;
            var u = ua;
            a: switch (W) {
              case 1:
                ((W = 0), (ua = null), on(e, a, u, 1));
                break;
              case 2:
              case 9:
                if (wp(u)) {
                  ((W = 0), (ua = null), lm(a));
                  break;
                }
                ((a = function () {
                  ((W !== 2 && W !== 9) || ne !== e || (W = 7), ut(e));
                }),
                  u.then(a, a));
                break e;
              case 3:
                W = 7;
                break e;
              case 4:
                W = 5;
                break e;
              case 7:
                wp(u)
                  ? ((W = 0), (ua = null), lm(a))
                  : ((W = 0), (ua = null), on(e, a, u, 7));
                break;
              case 5:
                var r = null;
                switch (G.tag) {
                  case 26:
                    r = G.memoizedState;
                  case 5:
                  case 27:
                    var s = G;
                    if (r ? Ib(r) : s.stateNode.complete) {
                      ((W = 0), (ua = null));
                      var o = s.sibling;
                      if (o !== null) G = o;
                      else {
                        var d = s.return;
                        d !== null ? ((G = d), ls(d)) : (G = null);
                      }
                      break a;
                    }
                }
                ((W = 0), (ua = null), on(e, a, u, 5));
                break;
              case 6:
                ((W = 0), (ua = null), on(e, a, u, 6));
                break;
              case 8:
                (Cc(), (me = 6));
                break e;
              default:
                throw Error(S(462));
            }
          }
          $0();
          break;
        } catch (c) {
          Xh(e, c);
        }
      while (!0);
      return (
        (ft = Ul = null),
        (R.H = l),
        (R.A = n),
        (j = t),
        G !== null ? 0 : ((ne = null), (F = 0), Zi(), me)
      );
    }
    function $0() {
      for (; G !== null && !hy(); ) eb(G);
    }
    function eb(e) {
      var a = Lh(e.alternate, e, Ct);
      ((e.memoizedProps = e.pendingProps), a === null ? ls(e) : (G = a));
    }
    function lm(e) {
      var a = e,
        t = a.alternate;
      switch (a.tag) {
        case 15:
        case 0:
          a = Vp(t, a, a.pendingProps, a.type, void 0, F);
          break;
        case 11:
          a = Vp(t, a, a.pendingProps, a.type.render, a.ref, F);
          break;
        case 5:
          lc(a);
          var l = a;
          l === we &&
            (H
              ? (Ci(l),
                l.tag === 5 && l.stateNode != null && (se = l.stateNode))
              : (Ci(l), (H = !0)));
        default:
          (Sh(t, a), (a = G = xg(a, Ct)), (a = Lh(t, a, Ct)));
      }
      ((e.memoizedProps = e.pendingProps), a === null ? ls(e) : (G = a));
    }
    function on(e, a, t, l) {
      ((ft = Ul = null), lc(a), (mn = null), (Du = 0));
      var n = a.return;
      try {
        if (E0(e, n, a, t, F)) {
          ((me = 1), wi(e, xa(t, e.current)), (G = null));
          return;
        }
      } catch (u) {
        if (n !== null) throw ((G = n), u);
        ((me = 1), wi(e, xa(t, e.current)), (G = null));
        return;
      }
      a.flags & 32768
        ? (H || l === 1
            ? (e = !0)
            : zn || (F & 536870912) !== 0
              ? (e = !1)
              : ((Nt = e = !0),
                (l === 2 || l === 9 || l === 3 || l === 6) &&
                  ((l = Ue.current),
                  l !== null && l.tag === 13 && (l.flags |= 16384))),
          ab(a, e))
        : ls(a);
    }
    function ls(e) {
      var a = e;
      do {
        if ((a.flags & 32768) !== 0) {
          ab(a, Nt);
          return;
        }
        e = a.return;
        var t = Q0(a.alternate, a, Ct);
        if (t !== null) {
          G = t;
          return;
        }
        if (((a = a.sibling), a !== null)) {
          G = a;
          return;
        }
        G = a = e;
      } while (a !== null);
      me === 0 && (me = 5);
    }
    function ab(e, a) {
      do {
        var t = V0(e.alternate, e);
        if (t !== null) {
          ((t.flags &= 32767), (G = t));
          return;
        }
        if (
          ((t = e.return),
          t !== null &&
            ((t.flags |= 32768), (t.subtreeFlags = 0), (t.deletions = null)),
          !a && ((e = e.sibling), e !== null))
        ) {
          G = e;
          return;
        }
        G = e = t;
      } while (e !== null);
      ((me = 6), (G = null));
    }
    function nm(e, a, t, l, n, u, r, s, o, d, c, p) {
      e.cancelPendingCommit = null;
      do ns();
      while (fe !== 0);
      if ((j & 6) !== 0) throw Error(S(327));
      if (a !== null) {
        if (a === e.current) throw Error(S(177));
        (e === ne && ((G = ne = null), (F = 0)),
          (Ol = a),
          (Ua = e),
          (tt = t),
          (gd = n),
          (jh = l),
          eC(e, a, t, r, s, o, p));
      }
    }
    function eC(e, a, t, l, n, u, r) {
      var s = a.lanes | a.childLanes;
      if (
        ((md = s),
        (s |= Fd),
        ky(e, t, s, l, n, u),
        (vn = null),
        (t & 335544064) === t
          ? ((yn = w0(e)), (l = 10262))
          : ((yn = null), (l = 10256)),
        (a.subtreeFlags & l) !== 0 || (a.flags & l) !== 0
          ? ((e.callbackNode = null),
            (e.callbackPriority = 0),
            rC(gi, function () {
              return (yd(), null);
            }))
          : ((e.callbackNode = null), (e.callbackPriority = 0)),
        (Oi = !1),
        (l = (a.flags & 13878) !== 0),
        (a.subtreeFlags & 13878) !== 0 || l)
      ) {
        ((l = R.T), (R.T = null), (n = Y.p), (Y.p = 2), (u = j), (j |= 4));
        try {
          Z0(e, a, t);
        } finally {
          ((j = u), (Y.p = n), (R.T = l));
        }
      }
      ((fe = 1),
        Oi
          ? (bn = xC(
              r,
              e.containerInfo,
              yn,
              hd,
              bd,
              tC,
              vd,
              yd,
              aC,
              null,
              null,
            ))
          : (hd(), bd(), vd()));
    }
    function aC(e) {
      if (fe !== 0) {
        var a = Ua.onRecoverableError;
        a(e, { componentStack: null });
      }
    }
    function tC() {
      fe === 3 && ((fe = 0), Eh(Ol, Ua), (fe = 4));
    }
    function hd() {
      if (fe === 1) {
        fe = 0;
        var e = Ua,
          a = Ol,
          t = tt,
          l = (a.flags & 13878) !== 0;
        if ((a.subtreeFlags & 13878) !== 0 || l) {
          ((l = R.T), (R.T = null));
          var n = Y.p;
          Y.p = 2;
          var u = j;
          j |= 4;
          try {
            ((mu = Mi = !1), Nh(a, e, t), (t = Sd));
            var r = hg(e.containerInfo),
              s = t.focusedElem,
              o = t.selectionRange;
            if (
              r !== s &&
              s &&
              s.ownerDocument &&
              gg(s.ownerDocument.documentElement, s)
            ) {
              if (o !== null && Gd(s)) {
                var d = o.start,
                  c = o.end;
                if ((c === void 0 && (c = d), "selectionStart" in s))
                  ((s.selectionStart = d),
                    (s.selectionEnd = Math.min(c, s.value.length)));
                else {
                  var p = s.ownerDocument || document,
                    f = (p && p.defaultView) || window;
                  if (f.getSelection) {
                    var m = f.getSelection(),
                      v = s.textContent.length,
                      C = Math.min(o.start, v),
                      k = o.end === void 0 ? C : Math.min(o.end, v);
                    !m.extend && C > k && ((r = k), (k = C), (C = r));
                    var h = Cp(s, C),
                      g = Cp(s, k);
                    if (
                      h &&
                      g &&
                      (m.rangeCount !== 1 ||
                        m.anchorNode !== h.node ||
                        m.anchorOffset !== h.offset ||
                        m.focusNode !== g.node ||
                        m.focusOffset !== g.offset)
                    ) {
                      var b = p.createRange();
                      (b.setStart(h.node, h.offset),
                        m.removeAllRanges(),
                        C > k
                          ? (m.addRange(b), m.extend(g.node, g.offset))
                          : (b.setEnd(g.node, g.offset), m.addRange(b)));
                    }
                  }
                }
              }
              for (p = [], m = s; (m = m.parentNode); )
                m.nodeType === 1 &&
                  p.push({ element: m, left: m.scrollLeft, top: m.scrollTop });
              for (
                typeof s.focus == "function" && s.focus(), s = 0;
                s < p.length;
                s++
              ) {
                var y = p[s];
                ((y.element.scrollLeft = y.left),
                  (y.element.scrollTop = y.top));
              }
            }
            ((On = !!Ld), (Sd = Ld = null));
          } finally {
            ((j = u), (Y.p = n), (R.T = l));
          }
        }
        ((e.current = a), (fe = 2));
      }
    }
    function bd() {
      if (fe === 2) {
        fe = 0;
        var e = Ua,
          a = Ol,
          t = (a.flags & 8772) !== 0;
        if ((a.subtreeFlags & 8772) !== 0 || t) {
          ((t = R.T), (R.T = null));
          var l = Y.p;
          Y.p = 2;
          var n = j;
          j |= 4;
          try {
            Mh(e, a.alternate, a);
          } finally {
            ((j = n), (Y.p = l), (R.T = t));
          }
        }
        fe = 3;
      }
    }
    function vd() {
      if (fe === 4 || fe === 3) {
        fe = 0;
        var e = bn;
        ((bn = null), by());
        var a = Ua,
          t = Ol,
          l = tt,
          n = jh,
          u = (l & 335544064) === l ? 10262 : 10256;
        if (
          ((t.subtreeFlags & u) !== 0 || (t.flags & u) !== 0
            ? (fe = 5)
            : ((fe = 0), (Ol = Ua = null), tb(a, a.pendingLanes)),
          (u = a.pendingLanes),
          u === 0 && (jt = null),
          Ud(l),
          (t = t.stateNode),
          ca && typeof ca.onCommitFiberRoot == "function")
        )
          try {
            ca.onCommitFiberRoot(
              Vu,
              t,
              void 0,
              (t.current.flags & 128) === 128,
            );
          } catch {}
        if (n !== null) {
          ((t = R.T), (u = Y.p), (Y.p = 2), (R.T = null));
          try {
            for (var r = a.onRecoverableError, s = 0; s < n.length; s++) {
              var o = n[s];
              r(o.value, { componentStack: o.stack });
            }
          } finally {
            ((R.T = t), (Y.p = u));
          }
        }
        if (
          ((n = vn),
          (r = yn),
          (yn = null),
          n !== null && ((vn = null), r === null && (r = []), e !== null))
        )
          for (o = 0; o < n.length; o++)
            ((t = (0, n[o])(r)), t !== void 0 && e.finished.finally(t));
        ((tt & 3) !== 0 && ns(),
          ut(a),
          (u = a.pendingLanes),
          (l & 261930) !== 0 && (u & 42) !== 0
            ? a === ri
              ? Tu++
              : ((Tu = 0), (ri = a))
            : ((Tu = 0), (ri = null)),
          $u(0, !1));
      }
    }
    function tb(e, a) {
      (e.pooledCacheLanes &= a) === 0 &&
        ((a = e.pooledCache), a != null && ((e.pooledCache = null), Xu(a)));
    }
    function ns() {
      return (
        bn !== null && (bn.skipTransition(), (bn = null)),
        hd(),
        bd(),
        vd(),
        yd()
      );
    }
    function yd() {
      if (fe !== 5) return !1;
      var e = Ua,
        a = md;
      md = 0;
      var t = Ud(tt),
        l = R.T,
        n = Y.p;
      try {
        ((Y.p = 32 > t ? 32 : t), (R.T = null), (t = gd), (gd = null));
        var u = Ua,
          r = tt;
        if (((fe = 0), (Ol = Ua = null), (tt = 0), (j & 6) !== 0))
          throw Error(S(331));
        var s = j;
        if (
          ((j |= 4),
          Qh(u.current),
          Kh(u, u.current, r, t),
          (j = s),
          $u(0, !1),
          ca && typeof ca.onPostCommitFiberRoot == "function")
        )
          try {
            ca.onPostCommitFiberRoot(Vu, u);
          } catch {}
        return !0;
      } finally {
        ((Y.p = n), (R.T = l), tb(e, a));
      }
    }
    function um(e, a, t) {
      ((a = xa(t, a)),
        (a = _o(e.stateNode, a, 2)),
        (e = Qt(e, a, 2)),
        e !== null && (ju(e, 2), ut(e)));
    }
    function $(e, a, t) {
      if (e.tag === 3) um(e, e, t);
      else
        for (; a !== null; ) {
          if (a.tag === 3) {
            um(a, e, t);
            break;
          } else if (a.tag === 1) {
            var l = a.stateNode;
            if (
              typeof a.type.getDerivedStateFromError == "function" ||
              (typeof l.componentDidCatch == "function" &&
                (jt === null || !jt.has(l)))
            ) {
              ((e = xa(t, e)),
                (t = bh(2)),
                (l = Qt(a, t, 2)),
                l !== null && (vh(t, l, a, e), ju(l, 2), ut(l)));
              break;
            }
          }
          a = a.return;
        }
    }
    function mo(e, a, t) {
      var l = e.pingCache;
      if (l === null) {
        l = e.pingCache = new J0();
        var n = new Set();
        l.set(a, n);
      } else ((n = l.get(a)), n === void 0 && ((n = new Set()), l.set(a, n)));
      n.has(t) ||
        ((yc = !0), n.add(t), (e = lC.bind(null, e, a, t)), a.then(e, e));
    }
    function lC(e, a, t) {
      var l = e.pingCache;
      (l !== null && l.delete(a),
        (e.pingedLanes |= e.suspendedLanes & t),
        (e.warmLanes &= ~t),
        ne === e &&
          (F & t) === t &&
          ((me === 4 ||
            (me === 3 && (F & 62914560) === F && 300 > da() - as)) &&
          (j & 2) === 0
            ? kn(e, 0)
            : (Pi |= t),
          xn === F && (xn = 0)),
        ut(e));
    }
    function lb(e, a) {
      (a === 0 && (a = jm()), (e = Rl(e, a)), e !== null && (ju(e, a), ut(e)));
    }
    function nC(e) {
      var a = e.memoizedState,
        t = 0;
      (a !== null && (t = a.retryLane), lb(e, t));
    }
    function uC(e, a) {
      var t = 0;
      switch (e.tag) {
        case 31:
        case 13:
          var l = e.stateNode,
            n = e.memoizedState;
          n !== null && (t = n.retryLane);
          break;
        case 19:
          l = e.stateNode;
          break;
        case 22:
          l = e.stateNode._retryCache;
          break;
        default:
          throw Error(S(314));
      }
      (l !== null && l.delete(a), lb(e, t));
    }
    function rC(e, a) {
      return Dd(e, a);
    }
    var Tn = null,
      Xl = null,
      Cd = !1,
      zi = !1,
      go = !1,
      Et = 0;
    function ut(e) {
      (e !== Xl &&
        e.next === null &&
        (Xl === null ? (Tn = Xl = e) : (Xl = Xl.next = e)),
        (zi = !0),
        Cd || ((Cd = !0), sC()));
    }
    function $u(e, a) {
      if (!go && zi) {
        go = !0;
        do
          for (var t = !1, l = Tn; l !== null; ) {
            if (!a)
              if (e !== 0) {
                var n = l.pendingLanes;
                if (n === 0) var u = 0;
                else {
                  var r = l.suspendedLanes,
                    s = l.pingedLanes;
                  ((u = (1 << (31 - fa(42 | e) + 1)) - 1),
                    (u &= n & ~(r & ~s)),
                    (u = u & 201326741 ? (u & 201326741) | 1 : u ? u | 2 : 0));
                }
                u !== 0 && ((t = !0), rm(l, u));
              } else
                ((u = F),
                  (u = Ki(
                    l,
                    l === ne ? u : 0,
                    l.cancelPendingCommit !== null || l.timeoutHandle !== -1,
                  )),
                  (u & 3) === 0 || Zu(l, u) || ((t = !0), rm(l, u)));
            l = l.next;
          }
        while (t);
        go = !1;
      }
    }
    function iC() {
      nb();
    }
    function nb() {
      zi = Cd = !1;
      var e = 0;
      Et !== 0 && bC() && (e = Et);
      for (var a = da(), t = null, l = Tn; l !== null; ) {
        var n = l.next,
          u = ub(l, a);
        (u === 0
          ? ((l.next = null),
            t === null ? (Tn = n) : (t.next = n),
            n === null && (Xl = t))
          : ((t = l), (e !== 0 || (u & 3) !== 0) && (zi = !0)),
          (l = n));
      }
      ((fe !== 0 && fe !== 5) || $u(e, !1), Et !== 0 && (Et = 0));
    }
    function ub(e, a) {
      for (
        var t = e.suspendedLanes,
          l = e.pingedLanes,
          n = e.expirationTimes,
          u = e.pendingLanes & -62914561;
        0 < u;

      ) {
        var r = 31 - fa(u),
          s = 1 << r,
          o = n[r];
        (o === -1
          ? ((s & t) === 0 || (s & l) !== 0) && (n[r] = Iy(s, a))
          : o <= a && (e.expiredLanes |= s),
          (u &= ~s));
      }
      if (
        ((a = ne),
        (t = F),
        (t = Ki(
          e,
          e === a ? t : 0,
          e.cancelPendingCommit !== null || e.timeoutHandle !== -1,
        )),
        (l = e.callbackNode),
        t === 0 ||
          (e === a && (W === 2 || W === 9)) ||
          e.cancelPendingCommit !== null)
      )
        return (
          l !== null && l !== null && Zs(l),
          (e.callbackNode = null),
          (e.callbackPriority = 0)
        );
      if ((t & 3) === 0 || Zu(e, t)) {
        if (((a = t & -t), a === e.callbackPriority)) return a;
        switch ((l !== null && Zs(l), Ud(t))) {
          case 2:
          case 8:
            t = Qm;
            break;
          case 32:
            t = gi;
            break;
          case 268435456:
            t = Vm;
            break;
          default:
            t = gi;
        }
        return (
          (l = rb.bind(null, e)),
          (t = Dd(t, l)),
          (e.callbackPriority = a),
          (e.callbackNode = t),
          a
        );
      }
      return (
        l !== null && l !== null && Zs(l),
        (e.callbackPriority = 2),
        (e.callbackNode = null),
        2
      );
    }
    function rb(e, a) {
      if (fe !== 0 && fe !== 5)
        return ((e.callbackNode = null), (e.callbackPriority = 0), null);
      var t = e.callbackNode;
      if (ns() && e.callbackNode !== t) return null;
      var l = F;
      return (
        (l = Ki(
          e,
          e === ne ? l : 0,
          e.cancelPendingCommit !== null || e.timeoutHandle !== -1,
        )),
        l === 0
          ? null
          : (Jh(e, l, a),
            ub(e, da()),
            e.callbackNode != null && e.callbackNode === t
              ? rb.bind(null, e)
              : null)
      );
    }
    function rm(e, a) {
      if (ns()) return null;
      Jh(e, a, !0);
    }
    function sC() {
      yC(function () {
        (j & 6) !== 0 ? Dd(Fm, iC) : nb();
      });
    }
    function Ac() {
      if (Et === 0) {
        var e = Tl;
        (e === 0 && ((e = Tr), (Tr <<= 1), (Tr & 261888) === 0 && (Tr = 256)),
          (Et = e));
      }
      return Et;
    }
    function im(e) {
      return e == null || typeof e == "symbol" || typeof e == "boolean"
        ? null
        : typeof e == "function"
          ? e
          : Yr(e);
    }
    function oC(e, a, t, l, n) {
      if (a === "submit" && t && t.stateNode === n) {
        var u = im((n[ta] || null).action),
          r = l.submitter;
        r &&
          ((a = (a = r[ta] || null)
            ? im(a.formAction)
            : r.getAttribute("formAction")),
          a !== null && ((u = a), (r = null)));
        var s = new Fi("action", "action", null, l, n);
        e.push({
          event: s,
          listeners: [
            {
              instance: null,
              listener: function () {
                if (l.defaultPrevented) {
                  if (Et !== 0) {
                    var o = new FormData(n, r);
                    Xo(
                      t,
                      { pending: !0, data: o, method: n.method, action: u },
                      null,
                      o,
                    );
                  }
                } else
                  typeof u == "function" &&
                    (s.preventDefault(),
                    (o = new FormData(n, r)),
                    Xo(
                      t,
                      { pending: !0, data: o, method: n.method, action: u },
                      u,
                      o,
                    ));
              },
              currentTarget: n,
            },
          ],
        });
      }
    }
    for (Gr = 0; Gr < Ho.length; Gr++)
      ((Fr = Ho[Gr]),
        (sm = Fr.toLowerCase()),
        (om = Fr[0].toUpperCase() + Fr.slice(1)),
        za(sm, "on" + om));
    var Fr, sm, om, Gr;
    za(vg, "onAnimationEnd");
    za(yg, "onAnimationIteration");
    za(Cg, "onAnimationStart");
    za("dblclick", "onDoubleClick");
    za("focusin", "onFocus");
    za("focusout", "onBlur");
    za(C0, "onTransitionRun");
    za(A0, "onTransitionStart");
    za(L0, "onTransitionCancel");
    za(Ag, "onTransitionEnd");
    An("onMouseEnter", ["mouseout", "mouseover"]);
    An("onMouseLeave", ["mouseout", "mouseover"]);
    An("onPointerEnter", ["pointerout", "pointerover"]);
    An("onPointerLeave", ["pointerout", "pointerover"]);
    Pl(
      "onChange",
      "change click focusin focusout input keydown keyup selectionchange".split(
        " ",
      ),
    );
    Pl(
      "onSelect",
      "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
        " ",
      ),
    );
    Pl("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
    Pl(
      "onCompositionEnd",
      "compositionend focusout keydown keypress keyup mousedown".split(" "),
    );
    Pl(
      "onCompositionStart",
      "compositionstart focusout keydown keypress keyup mousedown".split(" "),
    );
    Pl(
      "onCompositionUpdate",
      "compositionupdate focusout keydown keypress keyup mousedown".split(" "),
    );
    var zu =
        "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
          " ",
        ),
      dC = new Set(
        "beforetoggle cancel close invalid load scroll scrollend toggle"
          .split(" ")
          .concat(zu),
      );
    function ib(e, a) {
      a = (a & 4) !== 0;
      for (var t = 0; t < e.length; t++) {
        var l = e[t],
          n = l.event;
        l = l.listeners;
        e: {
          var u = void 0;
          if (a)
            for (var r = l.length - 1; 0 <= r; r--) {
              var s = l[r],
                o = s.instance,
                d = s.currentTarget;
              if (((s = s.listener), o !== u && n.isPropagationStopped()))
                break e;
              ((u = s), (n.currentTarget = d));
              try {
                u(n);
              } catch (c) {
                bi(c);
              }
              ((n.currentTarget = null), (u = o));
            }
          else
            for (r = 0; r < l.length; r++) {
              if (
                ((s = l[r]),
                (o = s.instance),
                (d = s.currentTarget),
                (s = s.listener),
                o !== u && n.isPropagationStopped())
              )
                break e;
              ((u = s), (n.currentTarget = d));
              try {
                u(n);
              } catch (c) {
                bi(c);
              }
              ((n.currentTarget = null), (u = o));
            }
        }
      }
    }
    function K(e, a) {
      var t = a[lp];
      t === void 0 && (t = a[lp] = new Set());
      var l = e + "__bubble";
      t.has(l) || (sb(a, e, 2, !1), t.add(l));
    }
    function ho(e, a, t) {
      var l = 0;
      (a && (l |= 4), sb(t, e, l, a));
    }
    var Qr = "_reactListening" + Math.random().toString(36).slice(2);
    function Lc(e) {
      if (!e[Qr]) {
        ((e[Qr] = !0),
          $m.forEach(function (t) {
            t !== "selectionchange" &&
              (dC.has(t) || ho(t, !1, e), ho(t, !0, e));
          }));
        var a = e.nodeType === 9 ? e : e.ownerDocument;
        a === null || a[Qr] || ((a[Qr] = !0), ho("selectionchange", !1, a));
      }
    }
    function sb(e, a, t, l) {
      switch (Mb(a)) {
        case 2:
          var n = tA;
          break;
        case 8:
          n = lA;
          break;
        default:
          n = Bc;
      }
      ((t = n.bind(null, a, t, e)),
        (n = void 0),
        !Ro ||
          (a !== "touchstart" && a !== "touchmove" && a !== "wheel") ||
          (n = !0),
        l
          ? n !== void 0
            ? e.addEventListener(a, t, { capture: !0, passive: n })
            : e.addEventListener(a, t, !0)
          : n !== void 0
            ? e.addEventListener(a, t, { passive: n })
            : e.addEventListener(a, t, !1));
    }
    function bo(e, a, t, l, n) {
      var u = l;
      if ((a & 1) === 0 && (a & 2) === 0 && l !== null)
        e: for (;;) {
          if (l === null) return;
          var r = l.tag;
          if (r === 3 || r === 4) {
            var s = l.stateNode.containerInfo;
            if (s === n) break;
            if (r === 4)
              for (r = l.return; r !== null; ) {
                var o = r.tag;
                if ((o === 3 || o === 4) && r.stateNode.containerInfo === n)
                  return;
                r = r.return;
              }
            for (; s !== null; ) {
              if (((r = bl(s)), r === null)) return;
              if (((o = r.tag), o === 5 || o === 6 || o === 26 || o === 27)) {
                l = u = r;
                continue e;
              }
              s = s.parentNode;
            }
          }
          l = l.return;
        }
      ig(function () {
        var d = u,
          c = Nd(t),
          p = [];
        e: {
          var f = Lg.get(e);
          if (f !== void 0) {
            var m = Fi,
              v = e;
            switch (e) {
              case "keypress":
                if (Xr(t) === 0) break e;
              case "keydown":
              case "keyup":
                m = Xy;
                break;
              case "focusin":
                ((v = "focus"), (m = _s));
                break;
              case "focusout":
                ((v = "blur"), (m = _s));
                break;
              case "beforeblur":
              case "afterblur":
                m = _s;
                break;
              case "click":
                if (t.button === 2) break e;
              case "auxclick":
              case "dblclick":
              case "mousedown":
              case "mousemove":
              case "mouseup":
              case "mouseout":
              case "mouseover":
              case "contextmenu":
                m = cp;
                break;
              case "drag":
              case "dragend":
              case "dragenter":
              case "dragexit":
              case "dragleave":
              case "dragover":
              case "dragstart":
              case "drop":
                m = Ny;
                break;
              case "touchcancel":
              case "touchend":
              case "touchmove":
              case "touchstart":
                m = a0;
                break;
              case vg:
              case yg:
              case Cg:
                m = Ky;
                break;
              case Ag:
                m = l0;
                break;
              case "scroll":
              case "scrollend":
                m = Uy;
                break;
              case "wheel":
                m = u0;
                break;
              case "copy":
              case "cut":
              case "paste":
                m = Fy;
                break;
              case "gotpointercapture":
              case "lostpointercapture":
              case "pointercancel":
              case "pointerdown":
              case "pointermove":
              case "pointerout":
              case "pointerover":
              case "pointerup":
                m = pp;
                break;
              case "submit":
                m = $y;
                break;
              case "toggle":
              case "beforetoggle":
                m = i0;
            }
            var C = (a & 4) !== 0,
              k = !C && (e === "scroll" || e === "scrollend"),
              h = C ? (f !== null ? f + "Capture" : null) : f;
            C = [];
            for (var g = d, b; g !== null; ) {
              var y = g;
              if (
                ((b = y.stateNode),
                (y = y.tag),
                (y !== 5 && y !== 26 && y !== 27) ||
                  b === null ||
                  h === null ||
                  ((y = Bu(g, h)), y != null && C.push(Nu(g, y, b))),
                k)
              )
                break;
              g = g.return;
            }
            0 < C.length &&
              ((f = new m(f, v, null, t, c)),
              p.push({ event: f, listeners: C }));
          }
        }
        if ((a & 7) === 0) {
          e: {
            if (
              ((m = e === "mouseover" || e === "pointerover"),
              (f = e === "mouseout" || e === "pointerout"),
              m &&
                t !== Do &&
                (v = t.relatedTarget || t.fromElement) &&
                (bl(v) || v[Pn]))
            )
              break e;
            (f || m) &&
              ((v =
                c.window === c
                  ? c
                  : (m = c.ownerDocument)
                    ? m.defaultView || m.parentWindow
                    : window),
              f
                ? ((m = t.relatedTarget || t.toElement),
                  (f = d),
                  (m = m ? bl(m) : null),
                  m !== null &&
                    ((k = Qu(m)),
                    (C = m.tag),
                    m !== k || (C !== 5 && C !== 27 && C !== 6)) &&
                    (m = null))
                : ((f = null), (m = d)),
              f !== m &&
                ((C = cp),
                (y = "onMouseLeave"),
                (h = "onMouseEnter"),
                (g = "mouse"),
                (e === "pointerout" || e === "pointerover") &&
                  ((C = pp),
                  (y = "onPointerLeave"),
                  (h = "onPointerEnter"),
                  (g = "pointer")),
                (k = f == null ? v : fu(f)),
                (b = m == null ? v : fu(m)),
                (v = new C(y, g + "leave", f, t, c)),
                (v.target = k),
                (v.relatedTarget = b),
                (y = null),
                bl(c) === d &&
                  ((C = new C(h, g + "enter", m, t, c)),
                  (C.target = b),
                  (C.relatedTarget = k),
                  (y = C)),
                (k = y),
                (C = f && m ? Lo(f, m, cC) : null),
                f !== null && dm(p, v, f, C, !1),
                m !== null && k !== null && dm(p, k, m, C, !0)));
          }
          e: {
            if (
              ((f = d ? fu(d) : window),
              (m = f.nodeName && f.nodeName.toLowerCase()),
              m === "select" || (m === "input" && f.type === "file"))
            )
              var A = bp;
            else if (hp(f))
              if (pg) A = b0;
              else {
                A = g0;
                var L = m0;
              }
            else
              ((m = f.nodeName),
                !m ||
                m.toLowerCase() !== "input" ||
                (f.type !== "checkbox" && f.type !== "radio")
                  ? d && zd(d.elementType) && (A = bp)
                  : (A = h0));
            if (A && (A = A(e, d))) {
              fg(p, A, t, c);
              break e;
            }
            L && L(e, f, d);
          }
          switch (((L = d ? fu(d) : window), e)) {
            case "focusin":
              (hp(L) || L.contentEditable === "true") &&
                ((tn = L), (zo = d), (bu = null));
              break;
            case "focusout":
              bu = zo = tn = null;
              break;
            case "mousedown":
              No = !0;
              break;
            case "contextmenu":
            case "mouseup":
            case "dragend":
              ((No = !1), Ap(p, t, c));
              break;
            case "selectionchange":
              if (y0) break;
            case "keydown":
            case "keyup":
              Ap(p, t, c);
          }
          var x;
          if (Kd)
            e: {
              switch (e) {
                case "compositionstart":
                  var I = "onCompositionStart";
                  break e;
                case "compositionend":
                  I = "onCompositionEnd";
                  break e;
                case "compositionupdate":
                  I = "onCompositionUpdate";
                  break e;
              }
              I = void 0;
            }
          else
            an
              ? dg(e, t) && (I = "onCompositionEnd")
              : e === "keydown" &&
                t.keyCode === 229 &&
                (I = "onCompositionStart");
          (I &&
            (og &&
              t.locale !== "ko" &&
              (an || I !== "onCompositionStart"
                ? I === "onCompositionEnd" && an && (x = sg())
                : ((Ut = c),
                  (Hd = "value" in Ut ? Ut.value : Ut.textContent),
                  (an = !0))),
            (L = Ni(d, I)),
            0 < L.length &&
              ((I = new fp(I, e, null, t, c)),
              p.push({ event: I, listeners: L }),
              x ? (I.data = x) : ((x = cg(t)), x !== null && (I.data = x)))),
            (x = o0 ? d0(e, t) : c0(e, t)) &&
              ((I = Ni(d, "onBeforeInput")),
              0 < I.length &&
                ((L = new fp("onBeforeInput", "beforeinput", null, t, c)),
                p.push({ event: L, listeners: I }),
                (L.data = x))),
            oC(p, e, d, t, c));
        }
        ib(p, a);
      });
    }
    function Nu(e, a, t) {
      return { instance: e, listener: a, currentTarget: t };
    }
    function Ni(e, a) {
      for (var t = a + "Capture", l = []; e !== null; ) {
        var n = e,
          u = n.stateNode;
        if (
          ((n = n.tag),
          (n !== 5 && n !== 26 && n !== 27) ||
            u === null ||
            ((n = Bu(e, t)),
            n != null && l.unshift(Nu(e, n, u)),
            (n = Bu(e, a)),
            n != null && l.push(Nu(e, n, u))),
          e.tag === 3)
        )
          return l;
        e = e.return;
      }
      return [];
    }
    function cC(e) {
      if (e === null) return null;
      do e = e.return;
      while (e && e.tag !== 5 && e.tag !== 27);
      return e || null;
    }
    function dm(e, a, t, l, n) {
      for (var u = a._reactName, r = []; t !== null && t !== l; ) {
        var s = t,
          o = s.alternate,
          d = s.stateNode;
        if (((s = s.tag), o !== null && o === l)) break;
        ((s !== 5 && s !== 26 && s !== 27) ||
          d === null ||
          ((o = d),
          n
            ? ((d = Bu(t, u)), d != null && r.unshift(Nu(t, d, o)))
            : n || ((d = Bu(t, u)), d != null && r.push(Nu(t, d, o)))),
          (t = t.return));
      }
      r.length !== 0 && e.push({ event: a, listeners: r });
    }
    var fC = /\r\n?/g,
      pC = /\u0000|\uFFFD/g;
    function cm(e) {
      return (typeof e == "string" ? e : "" + e)
        .replace(
          fC,
          `
`,
        )
        .replace(pC, "");
    }
    function ob(e, a) {
      return ((a = cm(a)), cm(e) === a);
    }
    function _(e, a, t, l, n, u) {
      switch (t) {
        case "children":
          if (typeof l == "string")
            a === "body" || (a === "textarea" && l === "") || Ln(e, l);
          else if (typeof l == "number" || typeof l == "bigint")
            a !== "body" && Ln(e, "" + l);
          else return;
          break;
        case "className":
          qr(e, "class", l);
          break;
        case "tabIndex":
          qr(e, "tabindex", l);
          break;
        case "dir":
        case "role":
        case "viewBox":
        case "width":
        case "height":
          qr(e, t, l);
          break;
        case "style":
          rg(e, l, u);
          return;
        case "data":
          if (a !== "object") {
            qr(e, "data", l);
            break;
          }
        case "src":
        case "href":
          if (l === "" && (a !== "a" || t !== "href")) {
            e.removeAttribute(t);
            break;
          }
          if (
            l == null ||
            typeof l == "function" ||
            typeof l == "symbol" ||
            typeof l == "boolean"
          ) {
            e.removeAttribute(t);
            break;
          }
          ((l = Yr(l)), e.setAttribute(t, l));
          break;
        case "action":
        case "formAction":
          if (typeof l == "function") {
            e.setAttribute(
              t,
              "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')",
            );
            break;
          } else
            typeof u == "function" &&
              (t === "formAction"
                ? (a !== "input" && _(e, a, "name", n.name, n, null),
                  _(e, a, "formEncType", n.formEncType, n, null),
                  _(e, a, "formMethod", n.formMethod, n, null),
                  _(e, a, "formTarget", n.formTarget, n, null))
                : (_(e, a, "encType", n.encType, n, null),
                  _(e, a, "method", n.method, n, null),
                  _(e, a, "target", n.target, n, null)));
          if (l == null || typeof l == "symbol" || typeof l == "boolean") {
            e.removeAttribute(t);
            break;
          }
          ((l = Yr(l)), e.setAttribute(t, l));
          break;
        case "onClick":
          l != null && (e.onclick = _a);
          return;
        case "onScroll":
          l != null && K("scroll", e);
          return;
        case "onScrollEnd":
          l != null && K("scrollend", e);
          return;
        case "dangerouslySetInnerHTML":
          if (l != null) {
            if (typeof l != "object" || !("__html" in l)) throw Error(S(61));
            if (((t = l.__html), t != null)) {
              if (n.children != null) throw Error(S(60));
              u?.__html !== t && (e.innerHTML = t);
            }
          }
          break;
        case "multiple":
          e.multiple = l && typeof l != "function" && typeof l != "symbol";
          break;
        case "muted":
          e.muted = l && typeof l != "function" && typeof l != "symbol";
          break;
        case "suppressContentEditableWarning":
        case "suppressHydrationWarning":
        case "defaultValue":
        case "defaultChecked":
        case "innerHTML":
        case "ref":
          break;
        case "autoFocus":
          break;
        case "xlinkHref":
          if (
            l == null ||
            typeof l == "function" ||
            typeof l == "boolean" ||
            typeof l == "symbol"
          ) {
            e.removeAttribute("xlink:href");
            break;
          }
          ((t = Yr(l)),
            e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", t));
          break;
        case "contentEditable":
        case "spellCheck":
        case "draggable":
        case "value":
        case "autoReverse":
        case "externalResourcesRequired":
        case "focusable":
        case "preserveAlpha":
          l != null && typeof l != "function" && typeof l != "symbol"
            ? e.setAttribute(t, l)
            : e.removeAttribute(t);
          break;
        case "inert":
        case "allowFullScreen":
        case "async":
        case "autoPlay":
        case "controls":
        case "credentialless":
        case "default":
        case "defer":
        case "disabled":
        case "disablePictureInPicture":
        case "disableRemotePlayback":
        case "formNoValidate":
        case "hidden":
        case "loop":
        case "noModule":
        case "noValidate":
        case "open":
        case "playsInline":
        case "readOnly":
        case "required":
        case "reversed":
        case "scoped":
        case "seamless":
        case "itemScope":
          l && typeof l != "function" && typeof l != "symbol"
            ? e.setAttribute(t, "")
            : e.removeAttribute(t);
          break;
        case "capture":
        case "download":
          l === !0
            ? e.setAttribute(t, "")
            : l !== !1 &&
                l != null &&
                typeof l != "function" &&
                typeof l != "symbol"
              ? e.setAttribute(t, l)
              : e.removeAttribute(t);
          break;
        case "cols":
        case "rows":
        case "size":
        case "span":
          l != null &&
          typeof l != "function" &&
          typeof l != "symbol" &&
          !isNaN(l) &&
          1 <= l
            ? e.setAttribute(t, l)
            : e.removeAttribute(t);
          break;
        case "rowSpan":
        case "start":
          l == null ||
          typeof l == "function" ||
          typeof l == "symbol" ||
          isNaN(l)
            ? e.removeAttribute(t)
            : e.setAttribute(t, l);
          break;
        case "popover":
          (K("beforetoggle", e), K("toggle", e), jr(e, "popover", l));
          break;
        case "xlinkActuate":
          ot(e, "http://www.w3.org/1999/xlink", "xlink:actuate", l);
          break;
        case "xlinkArcrole":
          ot(e, "http://www.w3.org/1999/xlink", "xlink:arcrole", l);
          break;
        case "xlinkRole":
          ot(e, "http://www.w3.org/1999/xlink", "xlink:role", l);
          break;
        case "xlinkShow":
          ot(e, "http://www.w3.org/1999/xlink", "xlink:show", l);
          break;
        case "xlinkTitle":
          ot(e, "http://www.w3.org/1999/xlink", "xlink:title", l);
          break;
        case "xlinkType":
          ot(e, "http://www.w3.org/1999/xlink", "xlink:type", l);
          break;
        case "xmlBase":
          ot(e, "http://www.w3.org/XML/1998/namespace", "xml:base", l);
          break;
        case "xmlLang":
          ot(e, "http://www.w3.org/XML/1998/namespace", "xml:lang", l);
          break;
        case "xmlSpace":
          ot(e, "http://www.w3.org/XML/1998/namespace", "xml:space", l);
          break;
        case "is":
          jr(e, "is", l);
          break;
        case "innerText":
        case "textContent":
          return;
        default:
          if (
            !(2 < t.length) ||
            (t[0] !== "o" && t[0] !== "O") ||
            (t[1] !== "n" && t[1] !== "N")
          )
            ((t = Dy.get(t) || t), jr(e, t, l));
          else return;
      }
      Z = !0;
    }
    function Ad(e, a, t, l, n, u) {
      switch (t) {
        case "style":
          rg(e, l, u);
          return;
        case "dangerouslySetInnerHTML":
          if (l != null) {
            if (typeof l != "object" || !("__html" in l)) throw Error(S(61));
            if (((t = l.__html), t != null)) {
              if (n.children != null) throw Error(S(60));
              u?.__html !== t && (e.innerHTML = t);
            }
          }
          break;
        case "children":
          if (typeof l == "string") Ln(e, l);
          else if (typeof l == "number" || typeof l == "bigint") Ln(e, "" + l);
          else return;
          break;
        case "onScroll":
          l != null && K("scroll", e);
          return;
        case "onScrollEnd":
          l != null && K("scrollend", e);
          return;
        case "onClick":
          l != null && (e.onclick = _a);
          return;
        case "suppressContentEditableWarning":
        case "suppressHydrationWarning":
        case "innerHTML":
        case "ref":
          return;
        case "innerText":
        case "textContent":
          return;
        default:
          if (!eg.hasOwnProperty(t))
            e: {
              if (
                t[0] === "o" &&
                t[1] === "n" &&
                ((n = t.endsWith("Capture")),
                (u = t.slice(2, n ? t.length - 7 : void 0)),
                (a = e[ta] || null),
                (a = a != null ? a[t] : null),
                typeof a == "function" && e.removeEventListener(u, a, n),
                typeof l == "function")
              ) {
                (typeof a != "function" &&
                  a !== null &&
                  (t in e
                    ? (e[t] = null)
                    : e.hasAttribute(t) && e.removeAttribute(t)),
                  e.addEventListener(u, l, n));
                break e;
              }
              ((Z = !0),
                t in e
                  ? (e[t] = l)
                  : l === !0
                    ? e.setAttribute(t, "")
                    : jr(e, t, l));
            }
          return;
      }
      Z = !0;
    }
    function Re(e, a, t) {
      switch (a) {
        case "div":
        case "span":
        case "svg":
        case "path":
        case "a":
        case "g":
        case "p":
        case "li":
          break;
        case "img":
          (K("error", e), K("load", e));
          var l = !1,
            n = !1,
            u;
          for (u in t)
            if (t.hasOwnProperty(u)) {
              var r = t[u];
              if (r != null)
                switch (u) {
                  case "src":
                    l = !0;
                    break;
                  case "srcSet":
                    n = !0;
                    break;
                  case "children":
                  case "dangerouslySetInnerHTML":
                    throw Error(S(137, a));
                  default:
                    _(e, a, u, r, t, null);
                }
            }
          (n && _(e, a, "srcSet", t.srcSet, t, null),
            l && _(e, a, "src", t.src, t, null));
          return;
        case "input":
          K("invalid", e);
          var s = (u = r = n = null),
            o = null,
            d = null;
          for (l in t)
            if (t.hasOwnProperty(l)) {
              var c = t[l];
              if (c != null)
                switch (l) {
                  case "name":
                    n = c;
                    break;
                  case "type":
                    r = c;
                    break;
                  case "checked":
                    o = c;
                    break;
                  case "defaultChecked":
                    d = c;
                    break;
                  case "value":
                    u = c;
                    break;
                  case "defaultValue":
                    s = c;
                    break;
                  case "children":
                  case "dangerouslySetInnerHTML":
                    if (c != null) throw Error(S(137, a));
                    break;
                  default:
                    _(e, a, l, c, t, null);
                }
            }
          lg(e, u, s, o, d, r, n, !1);
          return;
        case "select":
          (K("invalid", e), (l = r = u = null));
          for (n in t)
            if (t.hasOwnProperty(n) && ((s = t[n]), s != null))
              switch (n) {
                case "value":
                  u = s;
                  break;
                case "defaultValue":
                  r = s;
                  break;
                case "multiple":
                  l = s;
                default:
                  _(e, a, n, s, t, null);
              }
          ((a = u),
            (t = r),
            (e.multiple = !!l),
            a != null ? cn(e, !!l, a, !1) : t != null && cn(e, !!l, t, !0));
          return;
        case "textarea":
          (K("invalid", e), (u = n = l = null));
          for (r in t)
            if (t.hasOwnProperty(r) && ((s = t[r]), s != null))
              switch (r) {
                case "value":
                  l = s;
                  break;
                case "defaultValue":
                  n = s;
                  break;
                case "children":
                  u = s;
                  break;
                case "dangerouslySetInnerHTML":
                  if (s != null) throw Error(S(91));
                  break;
                default:
                  _(e, a, r, s, t, null);
              }
          ug(e, l, n, u);
          return;
        case "option":
          for (o in t)
            if (t.hasOwnProperty(o) && ((l = t[o]), l != null))
              switch (o) {
                case "selected":
                  e.selected =
                    l && typeof l != "function" && typeof l != "symbol";
                  break;
                default:
                  _(e, a, o, l, t, null);
              }
          return;
        case "dialog":
          (K("beforetoggle", e), K("toggle", e), K("cancel", e), K("close", e));
          break;
        case "iframe":
        case "object":
          K("load", e);
          break;
        case "video":
        case "audio":
          for (l = 0; l < zu.length; l++) K(zu[l], e);
          break;
        case "image":
          (K("error", e), K("load", e));
          break;
        case "details":
          K("toggle", e);
          break;
        case "embed":
        case "source":
        case "link":
          (K("error", e), K("load", e));
        case "area":
        case "base":
        case "br":
        case "col":
        case "hr":
        case "keygen":
        case "meta":
        case "param":
        case "track":
        case "wbr":
        case "menuitem":
          for (d in t)
            if (t.hasOwnProperty(d) && ((l = t[d]), l != null))
              switch (d) {
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(S(137, a));
                default:
                  _(e, a, d, l, t, null);
              }
          return;
        default:
          if (zd(a)) {
            for (c in t)
              t.hasOwnProperty(c) &&
                ((l = t[c]), l !== void 0 && Ad(e, a, c, l, t, void 0));
            return;
          }
      }
      for (s in t)
        t.hasOwnProperty(s) &&
          ((l = t[s]), l != null && _(e, a, s, l, t, null));
    }
    var mC = {};
    function gC(e, a, t, l) {
      switch (a) {
        case "div":
        case "span":
        case "svg":
        case "path":
        case "a":
        case "g":
        case "p":
        case "li":
          break;
        case "input":
          var n = null,
            u = null,
            r = null,
            s = null,
            o = null,
            d = null,
            c = null;
          for (m in t) {
            var p = t[m];
            if (t.hasOwnProperty(m) && p != null)
              switch (m) {
                case "checked":
                  break;
                case "value":
                  break;
                case "defaultValue":
                  o = p;
                default:
                  l.hasOwnProperty(m) || _(e, a, m, null, l, p);
              }
          }
          for (var f in l) {
            var m = l[f];
            if (((p = t[f]), l.hasOwnProperty(f) && (m != null || p != null)))
              switch (f) {
                case "type":
                  (m !== p && (Z = !0), (u = m));
                  break;
                case "name":
                  (m !== p && (Z = !0), (n = m));
                  break;
                case "checked":
                  (m !== p && (Z = !0), (d = m));
                  break;
                case "defaultChecked":
                  (m !== p && (Z = !0), (c = m));
                  break;
                case "value":
                  (m !== p && (Z = !0), (r = m));
                  break;
                case "defaultValue":
                  (m !== p && (Z = !0), (s = m));
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (m != null) throw Error(S(137, a));
                  break;
                default:
                  m !== p && _(e, a, f, m, l, p);
              }
          }
          Po(e, r, s, o, d, c, u, n);
          return;
        case "select":
          m = r = s = f = null;
          for (u in t)
            if (((o = t[u]), t.hasOwnProperty(u) && o != null))
              switch (u) {
                case "value":
                  break;
                case "multiple":
                  m = o;
                default:
                  l.hasOwnProperty(u) || _(e, a, u, null, l, o);
              }
          for (n in l)
            if (
              ((u = l[n]),
              (o = t[n]),
              l.hasOwnProperty(n) && (u != null || o != null))
            )
              switch (n) {
                case "value":
                  (u !== o && (Z = !0), (f = u));
                  break;
                case "defaultValue":
                  (u !== o && (Z = !0), (s = u));
                  break;
                case "multiple":
                  (u !== o && (Z = !0), (r = u));
                default:
                  u !== o && _(e, a, n, u, l, o);
              }
          ((a = s),
            (t = r),
            (l = m),
            f != null
              ? cn(e, !!t, f, !1)
              : !!l != !!t &&
                (a != null ? cn(e, !!t, a, !0) : cn(e, !!t, t ? [] : "", !1)));
          return;
        case "textarea":
          m = f = null;
          for (s in t)
            if (
              ((n = t[s]),
              t.hasOwnProperty(s) && n != null && !l.hasOwnProperty(s))
            )
              switch (s) {
                case "value":
                  break;
                case "children":
                  break;
                default:
                  _(e, a, s, null, l, n);
              }
          for (r in l)
            if (
              ((n = l[r]),
              (u = t[r]),
              l.hasOwnProperty(r) && (n != null || u != null))
            )
              switch (r) {
                case "value":
                  (n !== u && (Z = !0), (f = n));
                  break;
                case "defaultValue":
                  (n !== u && (Z = !0), (m = n));
                  break;
                case "children":
                  break;
                case "dangerouslySetInnerHTML":
                  if (n != null) throw Error(S(91));
                  break;
                default:
                  n !== u && _(e, a, r, n, l, u);
              }
          ng(e, f, m);
          return;
        case "option":
          for (var v in t)
            if (
              ((f = t[v]),
              t.hasOwnProperty(v) && f != null && !l.hasOwnProperty(v))
            )
              switch (v) {
                case "selected":
                  e.selected = !1;
                  break;
                default:
                  _(e, a, v, null, l, f);
              }
          for (o in l)
            if (
              ((f = l[o]),
              (m = t[o]),
              l.hasOwnProperty(o) && f !== m && (f != null || m != null))
            )
              switch (o) {
                case "selected":
                  (f !== m && (Z = !0),
                    (e.selected =
                      f && typeof f != "function" && typeof f != "symbol"));
                  break;
                default:
                  _(e, a, o, f, l, m);
              }
          return;
        case "img":
        case "link":
        case "area":
        case "base":
        case "br":
        case "col":
        case "embed":
        case "hr":
        case "keygen":
        case "meta":
        case "param":
        case "source":
        case "track":
        case "wbr":
        case "menuitem":
          for (var C in t)
            ((f = t[C]),
              t.hasOwnProperty(C) &&
                f != null &&
                !l.hasOwnProperty(C) &&
                _(e, a, C, null, l, f));
          for (d in l)
            if (
              ((f = l[d]),
              (m = t[d]),
              l.hasOwnProperty(d) && f !== m && (f != null || m != null))
            )
              switch (d) {
                case "children":
                case "dangerouslySetInnerHTML":
                  if (f != null) throw Error(S(137, a));
                  break;
                default:
                  _(e, a, d, f, l, m);
              }
          return;
        default:
          if (zd(a)) {
            for (var k in t)
              ((f = t[k]),
                t.hasOwnProperty(k) &&
                  f !== void 0 &&
                  !l.hasOwnProperty(k) &&
                  Ad(e, a, k, void 0, l, f));
            for (c in l)
              ((f = l[c]),
                (m = t[c]),
                !l.hasOwnProperty(c) ||
                  f === m ||
                  (f === void 0 && m === void 0) ||
                  Ad(e, a, c, f, l, m));
            return;
          }
      }
      for (var h in t)
        ((f = t[h]),
          t.hasOwnProperty(h) &&
            f != null &&
            !l.hasOwnProperty(h) &&
            _(e, a, h, null, l, f));
      for (p in l)
        ((f = l[p]),
          (m = t[p]),
          !l.hasOwnProperty(p) ||
            f === m ||
            (f == null && m == null) ||
            _(e, a, p, f, l, m));
    }
    function fm(e) {
      switch (e) {
        case "css":
        case "script":
        case "font":
        case "img":
        case "image":
        case "input":
        case "link":
          return !0;
        default:
          return !1;
      }
    }
    function hC() {
      if (typeof performance.getEntriesByType == "function") {
        for (
          var e = 0, a = 0, t = performance.getEntriesByType("resource"), l = 0;
          l < t.length;
          l++
        ) {
          var n = t[l],
            u = n.transferSize,
            r = n.initiatorType,
            s = n.duration;
          if (u && s && fm(r)) {
            for (r = 0, s = n.responseEnd, l += 1; l < t.length; l++) {
              var o = t[l],
                d = o.startTime;
              if (d > s) break;
              var c = o.transferSize,
                p = o.initiatorType;
              c &&
                fm(p) &&
                ((o = o.responseEnd),
                (r += c * (o < s ? 1 : (s - d) / (o - d))));
            }
            if ((--l, (a += (8 * (u + r)) / (n.duration / 1e3)), e++, 10 < e))
              break;
          }
        }
        if (0 < e) return a / e / 1e6;
      }
      return navigator.connection &&
        ((e = navigator.connection.downlink), typeof e == "number")
        ? e
        : 5;
    }
    var Ld = null,
      Sd = null;
    function Hu(e) {
      return e.nodeType === 9 ? e : e.ownerDocument;
    }
    function pm(e) {
      switch (e) {
        case "http://www.w3.org/2000/svg":
          return 1;
        case "http://www.w3.org/1998/Math/MathML":
          return 2;
        default:
          return 0;
      }
    }
    function db(e, a) {
      if (e === 0)
        switch (a) {
          case "svg":
            return 1;
          case "math":
            return 2;
          default:
            return 0;
        }
      return e === 1 && a === "foreignObject" ? 0 : e;
    }
    function cb(e, a, t, l) {
      return (
        (t = Hu(t).createElement(e)),
        (t[Oe] = l),
        (t[ta] = a),
        Re(t, e, a),
        Te(t),
        t
      );
    }
    function xd(e, a) {
      return (
        e === "textarea" ||
        e === "noscript" ||
        typeof a.children == "string" ||
        typeof a.children == "number" ||
        typeof a.children == "bigint" ||
        (typeof a.dangerouslySetInnerHTML == "object" &&
          a.dangerouslySetInnerHTML !== null &&
          a.dangerouslySetInnerHTML.__html != null)
      );
    }
    var vo = null;
    function bC() {
      var e = window.event;
      return e && e.type === "popstate"
        ? e === vo
          ? !1
          : ((vo = e), !0)
        : ((vo = null), !1);
    }
    var Sc = typeof setTimeout == "function" ? setTimeout : void 0,
      vC = typeof clearTimeout == "function" ? clearTimeout : void 0,
      mm = typeof Promise == "function" ? Promise : void 0,
      gm =
        typeof requestAnimationFrame == "function" ? requestAnimationFrame : Sc,
      yC =
        typeof queueMicrotask == "function"
          ? queueMicrotask
          : typeof mm < "u"
            ? function (e) {
                return mm.resolve(null).then(e).catch(CC);
              }
            : Sc;
    function CC(e) {
      setTimeout(function () {
        throw e;
      });
    }
    function ll(e) {
      return e === "head";
    }
    function hm(e, a) {
      var t = a,
        l = 0;
      do {
        var n = t.nextSibling;
        if ((e.removeChild(t), n && n.nodeType === 8))
          if (((t = n.data), t === "/$" || t === "/&")) {
            if (l === 0) {
              (e.removeChild(n), Mn(a));
              return;
            }
            l--;
          } else if (
            t === "$" ||
            t === "$?" ||
            t === "$~" ||
            t === "$!" ||
            t === "&"
          )
            l++;
          else if (t === "html") Co(e.ownerDocument.documentElement);
          else if (t === "head") {
            ((t = e.ownerDocument.head), Co(t));
            for (var u = t.firstChild; u; ) {
              var r = u.nextSibling,
                s = u.nodeName;
              (u[Yu] ||
                s === "SCRIPT" ||
                s === "STYLE" ||
                (s === "LINK" && u.rel.toLowerCase() === "stylesheet") ||
                t.removeChild(u),
                (u = r));
            }
          } else t === "body" && Co(e.ownerDocument.body);
        t = n;
      } while (t);
      Mn(a);
    }
    function bm(e, a) {
      var t = e;
      e = 0;
      do {
        var l = t.nextSibling;
        if (
          (t.nodeType === 1
            ? a
              ? ((t._stashedDisplay = t.style.display),
                (t.style.display = "none"))
              : ((t.style.display = t._stashedDisplay || ""),
                t.getAttribute("style") === "" && t.removeAttribute("style"))
            : t.nodeType === 3 &&
              (a
                ? ((t._stashedText = t.nodeValue), (t.nodeValue = ""))
                : (t.nodeValue = t._stashedText || "")),
          l && l.nodeType === 8)
        )
          if (((t = l.data), t === "/$")) {
            if (e === 0) break;
            e--;
          } else (t !== "$" && t !== "$?" && t !== "$~" && t !== "$!") || e++;
        t = l;
      } while (t);
    }
    function fb(e, a, t) {
      if (
        ((a = CSS.escape(a) !== a ? "r-" + btoa(a).replace(/=/g, "") : a),
        (e.style.viewTransitionName = a),
        t != null && (e.style.viewTransitionClass = t),
        (t = getComputedStyle(e)),
        t.display === "inline")
      ) {
        if (((a = e.getClientRects()), a.length === 1)) var l = 1;
        else
          for (var n = (l = 0); n < a.length; n++) {
            var u = a[n];
            0 < u.width && 0 < u.height && l++;
          }
        l === 1 &&
          ((e = e.style),
          (e.display = a.length === 1 ? "inline-block" : "block"),
          (e.marginTop = "-" + t.paddingTop),
          (e.marginBottom = "-" + t.paddingBottom));
      }
    }
    function pb(e, a) {
      ((e = e.style), (a = a.style));
      var t =
        a != null
          ? a.hasOwnProperty("viewTransitionName")
            ? a.viewTransitionName
            : a.hasOwnProperty("view-transition-name")
              ? a["view-transition-name"]
              : null
          : null;
      ((e.viewTransitionName =
        t == null || typeof t == "boolean" ? "" : ("" + t).trim()),
        (t =
          a != null
            ? a.hasOwnProperty("viewTransitionClass")
              ? a.viewTransitionClass
              : a.hasOwnProperty("view-transition-class")
                ? a["view-transition-class"]
                : null
            : null),
        (e.viewTransitionClass =
          t == null || typeof t == "boolean" ? "" : ("" + t).trim()),
        e.display === "inline-block" &&
          (a == null
            ? (e.display = e.margin = "")
            : ((t = a.display),
              (e.display = t == null || typeof t == "boolean" ? "" : t),
              (t = a.margin),
              t != null
                ? (e.margin = t)
                : ((t = a.hasOwnProperty("marginTop")
                    ? a.marginTop
                    : a["margin-top"]),
                  (e.marginTop = t == null || typeof t == "boolean" ? "" : t),
                  (a = a.hasOwnProperty("marginBottom")
                    ? a.marginBottom
                    : a["margin-bottom"]),
                  (e.marginBottom =
                    a == null || typeof a == "boolean" ? "" : a)))));
    }
    function mb(e, a, t) {
      return (
        (t = t.ownerDocument.defaultView),
        {
          rect: e,
          abs: a.position === "absolute" || a.position === "fixed",
          clip:
            a.clipPath !== "none" ||
            a.overflow !== "visible" ||
            a.filter !== "none" ||
            a.mask !== "none" ||
            a.mask !== "none" ||
            a.borderRadius !== "0px",
          view:
            0 <= e.bottom &&
            0 <= e.right &&
            e.top <= t.innerHeight &&
            e.left <= t.innerWidth,
        }
      );
    }
    function Id(e) {
      var a = e.getBoundingClientRect(),
        t = getComputedStyle(e);
      return mb(a, t, e);
    }
    function AC(e) {
      var a = e.getBoundingClientRect();
      a = new DOMRect(a.x + 2e4, a.y + 2e4, a.width, a.height);
      var t = getComputedStyle(e);
      return mb(a, t, e);
    }
    function LC(e) {
      return e.documentElement.clientHeight;
    }
    function SC(e) {
      (this.addEventListener("load", e), this.addEventListener("error", e));
    }
    function xC(e, a, t, l, n, u, r, s, o) {
      var d = a.nodeType === 9 ? a : a.ownerDocument;
      try {
        var c = d.startViewTransition({
          update: function () {
            var f = d.defaultView,
              m = f.navigation && f.navigation.transition,
              v = d.fonts.status;
            l();
            var C = [];
            if (
              (v === "loaded" &&
                (LC(d), d.fonts.status === "loading" && C.push(d.fonts.ready)),
              (v = C.length),
              e !== null)
            )
              for (var k = e.suspenseyImages, h = 0, g = 0; g < k.length; g++) {
                var b = k[g];
                if (!b.complete) {
                  var y = b.getBoundingClientRect();
                  if (
                    0 < y.bottom &&
                    0 < y.right &&
                    y.top < f.innerHeight &&
                    y.left < f.innerWidth
                  ) {
                    if (((h += kb(b)), h > oi)) {
                      C.length = v;
                      break;
                    }
                    ((b = new Promise(SC.bind(b))), C.push(b));
                  }
                }
              }
            if (0 < C.length)
              return (
                (f = Promise.race([
                  Promise.all(C),
                  new Promise(function (A) {
                    return setTimeout(A, 500);
                  }),
                ]).then(n, n)),
                (m ? Promise.allSettled([m.finished, f]) : f).then(u, u)
              );
            if ((n(), m)) return m.finished.then(u, u);
            u();
          },
          types: t,
        });
        d.__reactViewTransition = c;
        var p = [];
        return (
          c.ready.then(
            function () {
              for (
                var f = d.documentElement.getAnimations({ subtree: !0 }), m = 0;
                m < f.length;
                m++
              ) {
                var v = f[m],
                  C = v.effect,
                  k = C.pseudoElement;
                if (k != null && k.startsWith("::view-transition")) {
                  (p.push(v), (v = C.getKeyframes()));
                  for (var h = (k = void 0), g = !0, b = 0; b < v.length; b++) {
                    var y = v[b],
                      A = y.width;
                    if (k === void 0) k = A;
                    else if (k !== A) {
                      g = !1;
                      break;
                    }
                    if (((A = y.height), h === void 0)) h = A;
                    else if (h !== A) {
                      g = !1;
                      break;
                    }
                    (delete y.width,
                      delete y.height,
                      y.transform === "none" && delete y.transform);
                  }
                  g &&
                    k !== void 0 &&
                    h !== void 0 &&
                    (C.setKeyframes(v),
                    (g = getComputedStyle(C.target, C.pseudoElement)),
                    g.width !== k || g.height !== h) &&
                    ((g = v[0]),
                    (g.width = k),
                    (g.height = h),
                    (g = v[v.length - 1]),
                    (g.width = k),
                    (g.height = h),
                    C.setKeyframes(v));
                }
              }
              r();
            },
            function (f) {
              d.__reactViewTransition === c && (d.__reactViewTransition = null);
              try {
                if (typeof f == "object" && f !== null)
                  switch (f.name) {
                    case "InvalidStateError":
                      (f.message ===
                        "View transition was skipped because document visibility state is hidden." ||
                        f.message ===
                          "Skipping view transition because document visibility state has become hidden." ||
                        f.message ===
                          "Skipping view transition because viewport size changed." ||
                        f.message ===
                          "Transition was aborted because of invalid state") &&
                        (f = null);
                  }
                f !== null && o(f);
              } finally {
                (l(), n(), r());
              }
            },
          ),
          c.finished.finally(function () {
            for (var f = 0; f < p.length; f++) p[f].cancel();
            (d.__reactViewTransition === c && (d.__reactViewTransition = null),
              s());
          }),
          c
        );
      } catch {
        return (l(), n(), r(), null);
      }
    }
    function vl(e, a) {
      ((this._scope = document.documentElement),
        (this._selector = "::view-transition-" + e + "(" + a + ")"));
    }
    vl.prototype.animate = function (e, a) {
      return (
        (a = typeof a == "number" ? { duration: a } : ue({}, a)),
        (a.pseudoElement = this._selector),
        this._scope.animate(e, a)
      );
    };
    vl.prototype.getAnimations = function () {
      for (
        var e = this._scope,
          a = this._selector,
          t = e.getAnimations({ subtree: !0 }),
          l = [],
          n = 0;
        n < t.length;
        n++
      ) {
        var u = t[n].effect;
        u !== null && u.target === e && u.pseudoElement === a && l.push(t[n]);
      }
      return l;
    };
    vl.prototype.getComputedStyle = function () {
      return getComputedStyle(this._scope, this._selector);
    };
    function gb(e) {
      return {
        name: e,
        group: new vl("group", e),
        imagePair: new vl("image-pair", e),
        old: new vl("old", e),
        new: new vl("new", e),
      };
    }
    function ga(e) {
      ((this._fragmentFiber = e),
        (this._observers = this._eventListeners = null));
    }
    ga.prototype.addEventListener = function (e, a, t) {
      var l = null,
        n = null;
      if (
        !(
          t != null &&
          typeof t != "boolean" &&
          ((l = t.signal || null), l !== null && l.aborted)
        )
      ) {
        this._eventListeners === null && (this._eventListeners = []);
        var u = this._eventListeners;
        if (hb(u, e, a, t) === -1) {
          var r = this,
            s = a;
          (t != null &&
            typeof t != "boolean" &&
            t.once === !0 &&
            (s = function (o) {
              (r.removeEventListener(e, a, t),
                typeof a == "function" ? a.call(this, o) : a.handleEvent(o));
            }),
            l !== null &&
              ((n = r.removeEventListener.bind(r, e, a, t)),
              l.addEventListener("abort", n, { once: !0 }),
              (n = l.removeEventListener.bind(l, "abort", n))),
            (l = wn(t)),
            u.push({
              type: e,
              listener: a,
              optionsOrUseCapture: t,
              attachedListener: s,
              cleanup: n,
            }),
            aa(this._fragmentFiber.child, !1, IC, e, s, l));
        }
        this._eventListeners = u;
      }
    };
    function IC(e, a, t, l) {
      return (Ae(e).addEventListener(a, t, l), !1);
    }
    ga.prototype.removeEventListener = function (e, a, t) {
      var l = this._eventListeners;
      if (l !== null && ((a = hb(l, e, a, t)), a !== -1)) {
        var n = l[a];
        t = n.attachedListener;
        var u = n.cleanup;
        ((n = wn(n.optionsOrUseCapture)),
          aa(this._fragmentFiber.child, !1, kC, e, t, n),
          l.splice(a, 1),
          u !== null && u());
      }
    };
    function kC(e, a, t, l) {
      return (Ae(e).removeEventListener(a, t, l), !1);
    }
    function wn(e) {
      return e != null &&
        typeof e != "boolean" &&
        (e.once === !0 || e.signal instanceof AbortSignal)
        ? { capture: e.capture, passive: e.passive }
        : e;
    }
    function vm(e) {
      return e == null
        ? "c=0"
        : typeof e == "boolean"
          ? "c=" + (e ? "1" : "0")
          : "c=" + (e.capture ? "1" : "0");
    }
    function hb(e, a, t, l) {
      if (e.length === 0) return -1;
      l = vm(l);
      for (var n = 0; n < e.length; n++) {
        var u = e[n];
        if (u.type === a && u.listener === t && vm(u.optionsOrUseCapture) === l)
          return n;
      }
      return -1;
    }
    ga.prototype.dispatchEvent = function (e) {
      var a = Ml(this._fragmentFiber);
      if (a === null) return !0;
      a = Ae(a);
      var t = this._eventListeners;
      if ((t !== null && 0 < t.length) || !e.bubbles) {
        var l =
          a.nodeType === 9 ? a.createComment("") : document.createTextNode("");
        if (t)
          for (var n = 0; n < t.length; n++) {
            var u = t[n];
            l.addEventListener(
              u.type,
              u.attachedListener,
              wn(u.optionsOrUseCapture),
            );
          }
        if ((a.appendChild(l), (e = l.dispatchEvent(e)), t))
          for (n = 0; n < t.length; n++)
            ((u = t[n]),
              l.removeEventListener(
                u.type,
                u.attachedListener,
                wn(u.optionsOrUseCapture),
              ));
        return (a.removeChild(l), e);
      }
      return a.dispatchEvent(e);
    };
    ga.prototype.focus = function (e) {
      aa(this._fragmentFiber.child, !0, bb, e, void 0, void 0);
    };
    function bb(e, a) {
      return e.tag === 6 ? !1 : ((e = Ae(e)), NC(e, a));
    }
    ga.prototype.focusLast = function (e) {
      var a = [];
      aa(this._fragmentFiber.child, !0, xc, a, void 0, void 0);
      for (var t = a.length - 1; 0 <= t && !bb(a[t], e); t--);
    };
    function xc(e, a) {
      return (a.push(e), !1);
    }
    ga.prototype.blur = function () {
      var e = Ml(this._fragmentFiber);
      e !== null &&
        ((e = Ae(e)),
        (e = Hu(e).activeElement),
        e !== null && aa(this._fragmentFiber.child, !1, TC, e, void 0, void 0));
    };
    function TC(e, a) {
      return e.tag === 6
        ? !1
        : ((e = Ae(e)), e === a || e.contains(a) ? (a.blur(), !0) : !1);
    }
    ga.prototype.observeUsing = function (e) {
      (this._observers === null && (this._observers = new Set()),
        this._observers.add(e),
        aa(this._fragmentFiber.child, !1, wC, e, void 0, void 0));
    };
    function wC(e, a) {
      return (e.tag === 6 || ((e = Ae(e)), a.observe(e)), !1);
    }
    ga.prototype.unobserveUsing = function (e) {
      var a = this._observers;
      if (a !== null && a.has(e)) {
        (a.delete(e), aa(this._fragmentFiber.child, !1, BC, e, void 0, void 0));
        for (var t = (a = 0); t < Ra.length; t++) {
          var l = Ra[t];
          l.fragmentInstance === this && l.observer === e
            ? e.unobserve(l.instance)
            : (Ra[a++] = l);
        }
        Ra.length = a;
      }
    };
    function BC(e, a) {
      return (e.tag === 6 || ((e = Ae(e)), a.unobserve(e)), !1);
    }
    var Ra = [],
      yo = !1;
    function qC(e, a, t) {
      (Ra.push({ fragmentInstance: e, observer: a, instance: t }),
        yo ||
          ((yo = !0),
          HC(function () {
            yo = !1;
            var l = Ra;
            Ra = [];
            for (var n = 0; n < l.length; n++) {
              var u = l[n];
              u.observer.unobserve(u.instance);
            }
          })));
    }
    ga.prototype.getClientRects = function () {
      var e = [];
      return (aa(this._fragmentFiber.child, !1, OC, e, void 0, void 0), e);
    };
    function OC(e, a) {
      if (e.tag === 6) {
        e = e.stateNode;
        var t = e.ownerDocument.createRange();
        (t.selectNodeContents(e), a.push.apply(a, t.getClientRects()));
      } else ((e = Ae(e)), a.push.apply(a, e.getClientRects()));
      return !1;
    }
    ga.prototype.getRootNode = function (e) {
      var a = Ml(this._fragmentFiber);
      return a === null ? this : Ae(a).getRootNode(e);
    };
    ga.prototype.compareDocumentPosition = function (e) {
      var a = Ml(this._fragmentFiber);
      if (a === null) return Node.DOCUMENT_POSITION_DISCONNECTED;
      var t = [];
      aa(this._fragmentFiber.child, !1, xc, t, void 0, void 0);
      var l = Ae(a);
      if (t.length === 0) {
        if (((t = l), Wf(this._fragmentFiber))) {
          e: {
            for (a = this._fragmentFiber.return; a !== null; ) {
              if (a.tag === 4) {
                a = a.stateNode.containerInfo;
                break e;
              }
              if (a.tag === 3 || a.tag === 5 || a.tag === 27) break;
              a = a.return;
            }
            a = null;
          }
          a != null && (t = a);
        }
        a = this._fragmentFiber;
        var n = (l = t.compareDocumentPosition(e));
        return (
          t === e
            ? (n = Node.DOCUMENT_POSITION_CONTAINS)
            : l & Node.DOCUMENT_POSITION_CONTAINED_BY &&
              ((t = Hm(a)[1]),
              t === null
                ? (n = Node.DOCUMENT_POSITION_PRECEDING)
                : ((e = Ae(t).compareDocumentPosition(e)),
                  (n =
                    e === 0 || e & Node.DOCUMENT_POSITION_FOLLOWING
                      ? Node.DOCUMENT_POSITION_FOLLOWING
                      : Node.DOCUMENT_POSITION_PRECEDING))),
          (n |= Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC)
        );
      }
      ((a = Ae(t[0])), (n = Ae(t[t.length - 1])));
      var u = Wf(this._fragmentFiber) ? a.parentElement : l;
      if (u == null) return Node.DOCUMENT_POSITION_DISCONNECTED;
      ((l = u.compareDocumentPosition(a) & Node.DOCUMENT_POSITION_CONTAINED_BY),
        (u =
          u.compareDocumentPosition(n) & Node.DOCUMENT_POSITION_CONTAINED_BY));
      var r = a.compareDocumentPosition(e),
        s = n.compareDocumentPosition(e),
        o =
          r & Node.DOCUMENT_POSITION_CONTAINED_BY ||
          s & Node.DOCUMENT_POSITION_CONTAINED_BY;
      return (
        (s =
          l &&
          u &&
          r & Node.DOCUMENT_POSITION_FOLLOWING &&
          s & Node.DOCUMENT_POSITION_PRECEDING),
        (a =
          (l && a === e) || (u && n === e) || o || s
            ? Node.DOCUMENT_POSITION_CONTAINED_BY
            : (!l && a === e) || (!u && n === e)
              ? Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC
              : r),
        a & Node.DOCUMENT_POSITION_DISCONNECTED ||
        a & Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC ||
        MC(a, this._fragmentFiber, t[0], t[t.length - 1], e)
          ? a
          : Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC
      );
    };
    function MC(e, a, t, l, n) {
      var u = bl(n);
      if (e & Node.DOCUMENT_POSITION_CONTAINED_BY) {
        if ((t = !!u))
          e: {
            for (; u !== null; ) {
              if (u.tag === 7 && (u === a || u.alternate === a)) {
                t = !0;
                break e;
              }
              u = u.return;
            }
            t = !1;
          }
        return t;
      }
      if (e & Node.DOCUMENT_POSITION_CONTAINS) {
        if (u === null)
          return (
            (u = n.ownerDocument),
            n === u || n === u.documentElement || n === u.body
          );
        e: {
          for (u = a, a = Ml(a); u !== null; ) {
            if (
              !(
                (u.tag !== 5 && u.tag !== 3 && u.tag !== 27) ||
                (u !== a && u.alternate !== a)
              )
            ) {
              u = !0;
              break e;
            }
            u = u.return;
          }
          u = !1;
        }
        return u;
      }
      return e & Node.DOCUMENT_POSITION_PRECEDING
        ? ((a = !!u) &&
            !(a = u === t) &&
            ((a = Lo(t, u, _f)),
            a === null
              ? (a = !1)
              : (aa(a, !0, sy, u, t), (u = Wl), (Wl = null), (a = u !== null))),
          a)
        : e & Node.DOCUMENT_POSITION_FOLLOWING
          ? ((a = !!u) &&
              !(a = u === l) &&
              ((a = Lo(l, u, _f)),
              a === null
                ? (a = !1)
                : (aa(a, !0, oy, u, l),
                  (u = Wl),
                  (Ao = Wl = null),
                  (a = u !== null))),
            a)
          : !1;
    }
    function ym(e, a) {
      var t = e.ownerDocument.createRange();
      (t.selectNodeContents(e),
        (e = t.getBoundingClientRect()),
        window.scrollTo(
          window.scrollX + e.left,
          a
            ? window.scrollY + e.top
            : window.scrollY + e.bottom - window.innerHeight,
        ));
    }
    ga.prototype.scrollIntoView = function (e) {
      if (typeof e == "object") throw Error(S(566));
      var a = [];
      aa(this._fragmentFiber.child, !1, xc, a, void 0, void 0);
      var t = e !== !1;
      if (a.length === 0) {
        var l = Hm(this._fragmentFiber);
        if (
          ((l = t ? l[1] || l[0] || Ml(this._fragmentFiber) : l[0] || l[1]),
          l === null)
        )
          return;
        if (l.tag === 6) {
          ((e = Ae(l)), ym(e, t));
          return;
        }
        if (((l = Ae(l)), l.nodeType !== 9)) {
          if (l.nodeType === 11) {
            ((t = "host" in l ? l.host : null),
              t !== null && t.scrollIntoView(e));
            return;
          }
          l.scrollIntoView(e);
        }
      }
      for (l = t ? a.length - 1 : 0; l !== (t ? -1 : a.length); ) {
        var n = a[l];
        (n.tag === 6 ? ((n = Ae(n)), ym(n, t)) : Ae(n).scrollIntoView(e),
          (l += t ? -1 : 1));
      }
    };
    function PC(e, a) {
      return ((e = Ae(e)), vb(e, a), !1);
    }
    function vb(e, a) {
      (e.reactFragments == null && (e.reactFragments = new Set()),
        e.reactFragments.add(a));
    }
    function yb(e, a) {
      var t = a._eventListeners;
      if (t !== null)
        for (var l = 0; l < t.length; l++) {
          var n = t[l];
          e.addEventListener(
            n.type,
            n.attachedListener,
            wn(n.optionsOrUseCapture),
          );
        }
      e.nodeType !== 3 &&
        ((t = a._observers),
        t !== null &&
          t.forEach(function (u) {
            for (var r = 0, s = 0; s < Ra.length; s++) {
              var o = Ra[s];
              (o.fragmentInstance !== a ||
                o.observer !== u ||
                o.instance !== e) &&
                (Ra[r++] = o);
            }
            ((Ra.length = r), u.observe(e));
          }),
        vb(e, a));
    }
    function DC(e, a) {
      var t = a._eventListeners;
      if (t !== null)
        for (var l = 0; l < t.length; l++) {
          var n = t[l];
          e.removeEventListener(
            n.type,
            n.attachedListener,
            wn(n.optionsOrUseCapture),
          );
        }
      e.nodeType !== 3 &&
        ((t = a._observers),
        t !== null &&
          t.forEach(function (u) {
            typeof u.rootMargin == "string" ? qC(a, u, e) : u.unobserve(e);
          }),
        e.reactFragments != null && e.reactFragments.delete(a));
    }
    function kd(e) {
      var a = e.firstChild;
      for (a && a.nodeType === 10 && (a = a.nextSibling); a; ) {
        var t = a;
        switch (((a = a.nextSibling), t.nodeName)) {
          case "HTML":
          case "HEAD":
          case "BODY":
            (kd(t), Gi(t));
            continue;
          case "SCRIPT":
          case "STYLE":
            continue;
          case "LINK":
            if (t.rel.toLowerCase() === "stylesheet") continue;
        }
        e.removeChild(t);
      }
    }
    function RC(e, a, t, l) {
      for (; e.nodeType === 1; ) {
        var n = t;
        if (e.nodeName.toLowerCase() !== a.toLowerCase()) {
          if (!l && (e.nodeName !== "INPUT" || e.type !== "hidden")) break;
        } else if (l) {
          if (!e[Yu])
            switch (a) {
              case "meta":
                if (!e.hasAttribute("itemprop")) break;
                return e;
              case "link":
                if (
                  ((u = e.getAttribute("rel")),
                  u === "stylesheet" && e.hasAttribute("data-precedence"))
                )
                  break;
                if (
                  u !== n.rel ||
                  e.getAttribute("href") !==
                    (n.href == null || n.href === "" ? null : n.href) ||
                  e.getAttribute("crossorigin") !==
                    (n.crossOrigin == null ? null : n.crossOrigin) ||
                  e.getAttribute("title") !== (n.title == null ? null : n.title)
                )
                  break;
                return e;
              case "style":
                if (e.hasAttribute("data-precedence")) break;
                return e;
              case "script":
                if (
                  ((u = e.getAttribute("src")),
                  (u !== (n.src == null ? null : n.src) ||
                    e.getAttribute("type") !==
                      (n.type == null ? null : n.type) ||
                    e.getAttribute("crossorigin") !==
                      (n.crossOrigin == null ? null : n.crossOrigin)) &&
                    u &&
                    e.hasAttribute("async") &&
                    !e.hasAttribute("itemprop"))
                )
                  break;
                return e;
              default:
                return e;
            }
        } else if (a === "input" && e.type === "hidden") {
          var u = n.name == null ? null : "" + n.name;
          if (n.type === "hidden" && e.getAttribute("name") === u) return e;
        } else return e;
        if (((e = ka(e.nextSibling)), e === null)) break;
      }
      return null;
    }
    function UC(e, a, t) {
      if (a === "") return null;
      for (; e.nodeType !== 3; )
        if (
          ((e.nodeType !== 1 ||
            e.nodeName !== "INPUT" ||
            e.type !== "hidden") &&
            !t) ||
          ((e = ka(e.nextSibling)), e === null)
        )
          return null;
      return e;
    }
    function Cb(e, a) {
      for (; e.nodeType !== 8; )
        if (
          ((e.nodeType !== 1 ||
            e.nodeName !== "INPUT" ||
            e.type !== "hidden") &&
            !a) ||
          ((e = ka(e.nextSibling)), e === null)
        )
          return null;
      return e;
    }
    function Td(e) {
      return e.data === "$?" || e.data === "$~";
    }
    function Ic(e) {
      return (
        e.data === "$!" ||
        (e.data === "$?" && e.ownerDocument.readyState !== "loading")
      );
    }
    function zC(e, a) {
      var t = e.ownerDocument;
      if (e.data === "$~") e._reactRetry = a;
      else if (e.data !== "$?" || t.readyState !== "loading") a();
      else {
        var l = function () {
          (a(), t.removeEventListener("DOMContentLoaded", l));
        };
        (t.addEventListener("DOMContentLoaded", l), (e._reactRetry = l));
      }
    }
    function ka(e) {
      for (; e != null; e = e.nextSibling) {
        var a = e.nodeType;
        if (a === 1 || a === 3) break;
        if (a === 8) {
          if (
            ((a = e.data),
            a === "$" ||
              a === "$!" ||
              a === "$?" ||
              a === "$~" ||
              a === "&" ||
              a === "F!" ||
              a === "F")
          )
            break;
          if (a === "/$" || a === "/&") return null;
        }
      }
      return e;
    }
    var wd = null;
    function Cm(e) {
      e = e.nextSibling;
      for (var a = 0; e; ) {
        if (e.nodeType === 8) {
          var t = e.data;
          if (t === "/$" || t === "/&") {
            if (a === 0) return ka(e.nextSibling);
            a--;
          } else
            (t !== "$" &&
              t !== "$!" &&
              t !== "$?" &&
              t !== "$~" &&
              t !== "&") ||
              a++;
        }
        e = e.nextSibling;
      }
      return null;
    }
    function Am(e) {
      e = e.previousSibling;
      for (var a = 0; e; ) {
        if (e.nodeType === 8) {
          var t = e.data;
          if (
            t === "$" ||
            t === "$!" ||
            t === "$?" ||
            t === "$~" ||
            t === "&"
          ) {
            if (a === 0) return e;
            a--;
          } else (t !== "/$" && t !== "/&") || a++;
        }
        e = e.previousSibling;
      }
      return null;
    }
    function NC(e, a) {
      function t() {
        l = !0;
      }
      if (e.ownerDocument.activeElement === e) return !0;
      var l = !1;
      try {
        (e.ownerDocument.addEventListener("focus", t, !0),
          (e.focus || HTMLElement.prototype.focus).call(e, a));
      } finally {
        e.ownerDocument.removeEventListener("focus", t, !0);
      }
      return l;
    }
    function HC(e) {
      gm(function () {
        gm(function (a) {
          return e(a);
        });
      });
    }
    function Ab(e, a, t) {
      switch (((a = Hu(t)), e)) {
        case "html":
          if (((e = a.documentElement), !e)) throw Error(S(452));
          return e;
        case "head":
          if (((e = a.head), !e)) throw Error(S(453));
          return e;
        case "body":
          if (((e = a.body), !e)) throw Error(S(454));
          return e;
        default:
          throw Error(S(451));
      }
    }
    function Lb(e, a, t) {
      for (var l in t) {
        var n = t[l];
        t.hasOwnProperty(l) && n != null && _(e, a, l, null, mC, n);
      }
      (t.dangerouslySetInnerHTML != null && (e.textContent = ""),
        e.onclick === _a && (e.onclick = null),
        Gi(e));
    }
    function Co(e) {
      for (var a = e.attributes; a.length; ) e.removeAttributeNode(a[0]);
      Gi(e);
    }
    var Ta = new Map(),
      Lm = new Set();
    function Eu(e) {
      if (typeof e.getRootNode == "function") {
        var a = e.getRootNode();
        if (a.nodeType === 9 || a.nodeType === 11) return a;
      }
      return e.nodeType === 9 ? e : e.ownerDocument;
    }
    var St = Y.d;
    Y.d = { f: EC, r: KC, D: GC, C: FC, L: QC, m: VC, X: jC, S: ZC, M: YC };
    function EC() {
      var e = St.f(),
        a = ts();
      return e || a;
    }
    function KC(e) {
      var a = Dn(e);
      a !== null && a.tag === 5 && a.type === "form" ? rh(a) : St.r(e);
    }
    var Nn = typeof document > "u" ? null : document;
    function Sb(e, a, t) {
      var l = Nn;
      if (l && typeof a == "string" && a) {
        var n = Sa(a);
        ((n = 'link[rel="' + e + '"][href="' + n + '"]'),
          typeof t == "string" && (n += '[crossorigin="' + t + '"]'),
          Lm.has(n) ||
            (Lm.add(n),
            (e = { rel: e, crossOrigin: t, href: a }),
            l.querySelector(n) === null &&
              ((a = l.createElement("link")),
              Re(a, "link", e),
              Te(a),
              l.head.appendChild(a))));
      }
    }
    function GC(e) {
      (St.D(e), Sb("dns-prefetch", e, null));
    }
    function FC(e, a) {
      (St.C(e, a), Sb("preconnect", e, a));
    }
    function QC(e, a, t) {
      St.L(e, a, t);
      var l = Nn;
      if (l && e && a) {
        var n = 'link[rel="preload"][as="' + Sa(a) + '"]';
        a === "image" && t && t.imageSrcSet
          ? ((n += '[imagesrcset="' + Sa(t.imageSrcSet) + '"]'),
            typeof t.imageSizes == "string" &&
              (n += '[imagesizes="' + Sa(t.imageSizes) + '"]'))
          : (n += '[href="' + Sa(e) + '"]');
        var u = n;
        switch (a) {
          case "style":
            u = Bn(e);
            break;
          case "script":
            u = Hn(e);
        }
        if (
          !(
            Ta.has(u) ||
            ((e = ue(
              {
                rel: "preload",
                href: a === "image" && t && t.imageSrcSet ? void 0 : e,
                as: a,
              },
              t,
            )),
            Ta.set(u, e),
            l.querySelector(n) !== null ||
              (a === "style" && l.querySelector(er(u))) ||
              (a === "script" && l.querySelector(ar(u))))
          )
        ) {
          var r = l.createElement("link");
          (Re(r, "link", e),
            a === "style" &&
              ((r[hi] = !0),
              (r.onload = r.onerror =
                function () {
                  _m(r);
                })),
            Te(r),
            l.head.appendChild(r));
        }
      }
    }
    function VC(e, a) {
      St.m(e, a);
      var t = Nn;
      if (t && e) {
        var l = a && typeof a.as == "string" ? a.as : "script",
          n =
            'link[rel="modulepreload"][as="' +
            Sa(l) +
            '"][href="' +
            Sa(e) +
            '"]',
          u = n;
        switch (l) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            u = Hn(e);
        }
        if (
          !Ta.has(u) &&
          ((e = ue({ rel: "modulepreload", href: e }, a)),
          Ta.set(u, e),
          t.querySelector(n) === null)
        ) {
          switch (l) {
            case "audioworklet":
            case "paintworklet":
            case "serviceworker":
            case "sharedworker":
            case "worker":
            case "script":
              if (t.querySelector(ar(u))) return;
          }
          ((l = t.createElement("link")),
            Re(l, "link", e),
            Te(l),
            t.head.appendChild(l));
        }
      }
    }
    function ZC(e, a, t) {
      St.S(e, a, t);
      var l = Nn;
      if (l && e) {
        var n = dn(l).hoistableStyles,
          u = Bn(e);
        a = a || "default";
        var r = n.get(u);
        if (!r) {
          var s = { loading: 0, preload: null };
          if ((r = l.querySelector(er(u)))) s.loading = 5;
          else {
            ((e = ue({ rel: "stylesheet", href: e, "data-precedence": a }, t)),
              (t = Ta.get(u)) && kc(e, t));
            var o = (r = l.createElement("link"));
            (Te(o),
              Re(o, "link", e),
              (o._p = new Promise(function (d, c) {
                ((o.onload = d), (o.onerror = c));
              })),
              o.addEventListener("load", function () {
                s.loading |= 1;
              }),
              o.addEventListener("error", function () {
                s.loading |= 2;
              }),
              (s.loading |= 4),
              ii(r, a, l));
          }
          ((r = { type: "stylesheet", instance: r, count: 1, state: s }),
            n.set(u, r));
        }
      }
    }
    function jC(e, a) {
      St.X(e, a);
      var t = Nn;
      if (t && e) {
        var l = dn(t).hoistableScripts,
          n = Hn(e),
          u = l.get(n);
        u ||
          ((u = t.querySelector(ar(n))),
          u ||
            ((e = ue({ src: e, async: !0 }, a)),
            (a = Ta.get(n)) && Tc(e, a),
            (u = t.createElement("script")),
            Te(u),
            Re(u, "link", e),
            t.head.appendChild(u)),
          (u = { type: "script", instance: u, count: 1, state: null }),
          l.set(n, u));
      }
    }
    function YC(e, a) {
      St.M(e, a);
      var t = Nn;
      if (t && e) {
        var l = dn(t).hoistableScripts,
          n = Hn(e),
          u = l.get(n);
        u ||
          ((u = t.querySelector(ar(n))),
          u ||
            ((e = ue({ src: e, async: !0, type: "module" }, a)),
            (a = Ta.get(n)) && Tc(e, a),
            (u = t.createElement("script")),
            Te(u),
            Re(u, "link", e),
            t.head.appendChild(u)),
          (u = { type: "script", instance: u, count: 1, state: null }),
          l.set(n, u));
      }
    }
    function Sm(e, a, t, l) {
      var n = (n = Kt.current) ? Eu(n) : null;
      if (!n) throw Error(S(446));
      switch (e) {
        case "meta":
        case "title":
          return null;
        case "style":
          return typeof t.precedence == "string" && typeof t.href == "string"
            ? ((t = Bn(t.href)),
              (a = dn(n).hoistableStyles),
              (l = a.get(t)),
              l ||
                ((l = { type: "style", instance: null, count: 0, state: null }),
                a.set(t, l)),
              l)
            : { type: "void", instance: null, count: 0, state: null };
        case "link":
          if (
            t.rel === "stylesheet" &&
            typeof t.href == "string" &&
            typeof t.precedence == "string"
          ) {
            e = Bn(t.href);
            var u = dn(n).hoistableStyles,
              r = u.get(e);
            if (
              (r ||
                ((n = n.ownerDocument || n),
                (r = {
                  type: "stylesheet",
                  instance: null,
                  count: 0,
                  state: { loading: 0, preload: null },
                }),
                u.set(e, r),
                (u = n.querySelector(er(e)))
                  ? u._p || ((r.instance = u), (r.state.loading = 5))
                  : ((u = Ta.get(e)),
                    u ||
                      ((u = {
                        rel: "preload",
                        as: "style",
                        href: t.href,
                        crossOrigin: t.crossOrigin,
                        integrity: t.integrity,
                        media: t.media,
                        hrefLang: t.hrefLang,
                        referrerPolicy: t.referrerPolicy,
                      }),
                      Ta.set(e, u)),
                    JC(n, e, u, r.state))),
              a && l === null)
            )
              throw Error(S(528, ""));
            return r;
          }
          if (a && l !== null) throw Error(S(529, ""));
          return null;
        case "script":
          return (
            (a = t.async),
            (t = t.src),
            typeof t == "string" &&
            a &&
            typeof a != "function" &&
            typeof a != "symbol"
              ? ((t = Hn(t)),
                (a = dn(n).hoistableScripts),
                (l = a.get(t)),
                l ||
                  ((l = {
                    type: "script",
                    instance: null,
                    count: 0,
                    state: null,
                  }),
                  a.set(t, l)),
                l)
              : { type: "void", instance: null, count: 0, state: null }
          );
        default:
          throw Error(S(444, e));
      }
    }
    function Bn(e) {
      return 'href="' + Sa(e) + '"';
    }
    function er(e) {
      return 'link[rel="stylesheet"][' + e + "]";
    }
    function xb(e) {
      return ue({}, e, { "data-precedence": e.precedence, precedence: null });
    }
    function JC(e, a, t, l) {
      if ((a = e.querySelector('link[rel="preload"][as="style"][' + a + "]"))) {
        if (a[hi] !== !0) {
          l.loading = 1;
          return;
        }
      } else
        ((a = e.createElement("link")),
          (a[hi] = !0),
          (a.onload = a.onerror = _m.bind(null, a)),
          Re(a, "link", t),
          Te(a),
          e.head.appendChild(a));
      ((l.preload = a),
        a.addEventListener("load", function () {
          return (l.loading |= 1);
        }),
        a.addEventListener("error", function () {
          return (l.loading |= 2);
        }));
    }
    function Hn(e) {
      return '[src="' + Sa(e) + '"]';
    }
    function ar(e) {
      return "script[async]" + e;
    }
    function xm(e, a, t) {
      if ((a.count++, a.instance === null))
        switch (a.type) {
          case "style":
            var l = e.querySelector('style[data-href~="' + Sa(t.href) + '"]');
            if (l) return ((a.instance = l), Te(l), l);
            var n = ue({}, t, {
              "data-href": t.href,
              "data-precedence": t.precedence,
              href: null,
              precedence: null,
            });
            return (
              (l = (e.ownerDocument || e).createElement("style")),
              Te(l),
              Re(l, "style", n),
              ii(l, t.precedence, e),
              (a.instance = l)
            );
          case "stylesheet":
            n = Bn(t.href);
            var u = e.querySelector(er(n));
            if (u) return ((a.state.loading |= 4), (a.instance = u), Te(u), u);
            ((l = xb(t)),
              (n = Ta.get(n)) && kc(l, n),
              (u = (e.ownerDocument || e).createElement("link")),
              Te(u));
            var r = u;
            return (
              (r._p = new Promise(function (s, o) {
                ((r.onload = s), (r.onerror = o));
              })),
              Re(u, "link", l),
              (a.state.loading |= 4),
              ii(u, t.precedence, e),
              (a.instance = u)
            );
          case "script":
            return (
              (u = Hn(t.src)),
              (n = e.querySelector(ar(u)))
                ? ((a.instance = n), Te(n), n)
                : ((l = t),
                  (n = Ta.get(u)) && ((l = ue({}, t)), Tc(l, n)),
                  (e = e.ownerDocument || e),
                  (n = e.createElement("script")),
                  Te(n),
                  Re(n, "link", l),
                  e.head.appendChild(n),
                  (a.instance = n))
            );
          case "void":
            return null;
          default:
            throw Error(S(443, a.type));
        }
      else
        a.type === "stylesheet" &&
          (a.state.loading & 4) === 0 &&
          ((l = a.instance), (a.state.loading |= 4), ii(l, t.precedence, e));
      return a.instance;
    }
    function ii(e, a, t) {
      for (
        var l = t.querySelectorAll(
            'link[rel="stylesheet"][data-precedence],style[data-precedence]',
          ),
          n = l.length ? l[l.length - 1] : null,
          u = n,
          r = 0;
        r < l.length;
        r++
      ) {
        var s = l[r];
        if (s.dataset.precedence === a) u = s;
        else if (u !== n) break;
      }
      u
        ? u.parentNode.insertBefore(e, u.nextSibling)
        : ((a = t.nodeType === 9 ? t.head : t),
          a.insertBefore(e, a.firstChild));
    }
    function kc(e, a) {
      (e.crossOrigin == null && (e.crossOrigin = a.crossOrigin),
        e.referrerPolicy == null && (e.referrerPolicy = a.referrerPolicy),
        e.title == null && (e.title = a.title));
    }
    function Tc(e, a) {
      (e.crossOrigin == null && (e.crossOrigin = a.crossOrigin),
        e.referrerPolicy == null && (e.referrerPolicy = a.referrerPolicy),
        e.integrity == null && (e.integrity = a.integrity));
    }
    var si = null;
    function Im(e, a, t) {
      if (si === null) {
        var l = new Map(),
          n = (si = new Map());
        n.set(t, l);
      } else ((n = si), (l = n.get(t)), l || ((l = new Map()), n.set(t, l)));
      if (l.has(e)) return l;
      for (
        l.set(e, null), t = t.getElementsByTagName(e), n = 0;
        n < t.length;
        n++
      ) {
        var u = t[n];
        if (
          !(
            u[Yu] ||
            u[Oe] ||
            (e === "link" && u.getAttribute("rel") === "stylesheet")
          ) &&
          u.namespaceURI !== "http://www.w3.org/2000/svg"
        ) {
          var r = u.getAttribute(a) || "";
          r = e + r;
          var s = l.get(r);
          s ? s.push(u) : l.set(r, [u]);
        }
      }
      return l;
    }
    function Bd(e, a, t) {
      ((e = e.ownerDocument || e),
        e.head.insertBefore(
          t,
          a === "title" ? e.querySelector("head > title") : null,
        ));
    }
    function XC(e, a, t) {
      if (t === 1 || a.itemProp != null) return !1;
      switch (e) {
        case "meta":
        case "title":
          return !0;
        case "style":
          if (
            typeof a.precedence != "string" ||
            typeof a.href != "string" ||
            a.href === ""
          )
            break;
          return !0;
        case "link":
          if (
            typeof a.rel != "string" ||
            typeof a.href != "string" ||
            a.href === "" ||
            a.onLoad ||
            a.onError
          )
            break;
          switch (a.rel) {
            case "stylesheet":
              return (
                (e = a.disabled),
                typeof a.precedence == "string" && e == null
              );
            default:
              return !0;
          }
        case "script":
          if (
            a.async &&
            typeof a.async != "function" &&
            typeof a.async != "symbol" &&
            !a.onLoad &&
            !a.onError &&
            a.src &&
            typeof a.src == "string"
          )
            return !0;
      }
      return !1;
    }
    function km(e, a) {
      return (
        e === "img" &&
        a.src != null &&
        a.src !== "" &&
        a.onLoad == null &&
        a.loading !== "lazy"
      );
    }
    function Ib(e) {
      return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
    }
    function kb(e) {
      return (
        (e.width || 100) *
        (e.height || 100) *
        (typeof devicePixelRatio == "number" ? devicePixelRatio : 1) *
        0.25
      );
    }
    function Tm(e, a) {
      typeof a.decode == "function" &&
        (e.imgCount++,
        a.complete || ((e.imgBytes += kb(a)), e.suspenseyImages.push(a)),
        (e = $C.bind(e)),
        a.decode().then(e, e));
    }
    function WC(e, a, t, l) {
      if (
        t.type === "stylesheet" &&
        (typeof l.media != "string" || matchMedia(l.media).matches !== !1) &&
        (t.state.loading & 4) === 0
      ) {
        if (t.instance === null) {
          var n = Bn(l.href),
            u = a.querySelector(er(n));
          if (u) {
            ((a = u._p),
              a !== null &&
                typeof a == "object" &&
                typeof a.then == "function" &&
                (e.count++, (e = Ku.bind(e)), a.then(e, e)),
              (t.state.loading |= 4),
              (t.instance = u),
              Te(u));
            return;
          }
          ((u = a.ownerDocument || a),
            (l = xb(l)),
            (n = Ta.get(n)) && kc(l, n),
            (u = u.createElement("link")),
            Te(u));
          var r = u;
          ((r._p = new Promise(function (s, o) {
            ((r.onload = s), (r.onerror = o));
          })),
            Re(u, "link", l),
            (t.instance = u));
        }
        (e.stylesheets === null && (e.stylesheets = new Map()),
          e.stylesheets.set(t, a),
          (a = t.state.preload) &&
            (t.state.loading & 3) === 0 &&
            (e.count++,
            (t = Ku.bind(e)),
            a.addEventListener("load", t),
            a.addEventListener("error", t)));
      }
    }
    var oi = 0;
    function _C(e, a) {
      return (
        e.stylesheets && e.count === 0 && di(e, e.stylesheets),
        0 < e.count || 0 < e.imgCount
          ? function (t) {
              var l = setTimeout(function () {
                if ((e.stylesheets && di(e, e.stylesheets), e.unsuspend)) {
                  var u = e.unsuspend;
                  ((e.unsuspend = null), u());
                }
              }, 6e4 + a);
              0 < e.imgBytes && oi === 0 && (oi = 62500 * hC());
              var n = setTimeout(
                function () {
                  if (
                    ((e.waitingForImages = !1),
                    e.count === 0 &&
                      (e.stylesheets && di(e, e.stylesheets), e.unsuspend))
                  ) {
                    var u = e.unsuspend;
                    ((e.unsuspend = null), u());
                  }
                },
                (e.imgBytes > oi ? 50 : 800) + a,
              );
              return (
                (e.unsuspend = t),
                function () {
                  ((e.unsuspend = null), clearTimeout(l), clearTimeout(n));
                }
              );
            }
          : null
      );
    }
    function Tb(e) {
      if (e.count === 0 && (e.imgCount === 0 || !e.waitingForImages)) {
        if (e.stylesheets) di(e, e.stylesheets);
        else if (e.unsuspend) {
          var a = e.unsuspend;
          ((e.unsuspend = null), a());
        }
      }
    }
    function Ku() {
      (this.count--, Tb(this));
    }
    function $C() {
      (this.imgCount--, Tb(this));
    }
    var Hi = null;
    function di(e, a) {
      ((e.stylesheets = null),
        e.unsuspend !== null &&
          (e.count++,
          (Hi = new Map()),
          a.forEach(eA, e),
          (Hi = null),
          Ku.call(e)));
    }
    function eA(e, a) {
      if (!(a.state.loading & 4)) {
        var t = Hi.get(e);
        if (t) var l = t.get(null);
        else {
          ((t = new Map()), Hi.set(e, t));
          for (
            var n = e.querySelectorAll(
                "link[data-precedence],style[data-precedence]",
              ),
              u = 0;
            u < n.length;
            u++
          ) {
            var r = n[u];
            (r.nodeName === "LINK" || r.getAttribute("media") !== "not all") &&
              (t.set(r.dataset.precedence, r), (l = r));
          }
          l && t.set(null, l);
        }
        ((n = a.instance),
          (r = n.getAttribute("data-precedence")),
          (u = t.get(r) || l),
          u === l && t.set(null, n),
          t.set(r, n),
          this.count++,
          (l = Ku.bind(this)),
          n.addEventListener("load", l),
          n.addEventListener("error", l),
          u
            ? u.parentNode.insertBefore(n, u.nextSibling)
            : ((e = e.nodeType === 9 ? e.head : e),
              e.insertBefore(n, e.firstChild)),
          (a.state.loading |= 4));
      }
    }
    var qn = {
      $$typeof: Wa,
      Provider: null,
      Consumer: null,
      _currentValue: yl,
      _currentValue2: yl,
      _threadCount: 0,
    };
    function aA(e, a, t, l, n, u, r, s, o) {
      ((this.tag = 1),
        (this.containerInfo = e),
        (this.pingCache = this.current = this.pendingChildren = null),
        (this.timeoutHandle = -1),
        (this.callbackNode =
          this.next =
          this.pendingContext =
          this.context =
          this.cancelPendingCommit =
            null),
        (this.callbackPriority = 0),
        (this.expirationTimes = js(-1)),
        (this.entangledLanes =
          this.shellSuspendCounter =
          this.errorRecoveryDisabledLanes =
          this.expiredLanes =
          this.warmLanes =
          this.pingedLanes =
          this.suspendedLanes =
          this.pendingLanes =
            0),
        (this.entanglements = js(0)),
        (this.hiddenUpdates = js(null)),
        (this.identifierPrefix = l),
        (this.onUncaughtError = n),
        (this.onCaughtError = u),
        (this.onRecoverableError = r),
        (this.pooledCache = null),
        (this.pooledCacheLanes = 0),
        (this.formState = o),
        (this.transitionTypes = null),
        (this.incompleteTransitions = new Map()));
    }
    function wb(e, a, t, l, n, u, r, s, o, d, c, p) {
      return (
        (e = new aA(e, a, t, r, o, d, c, p, s)),
        (a = 1),
        u === !0 && (a |= 24),
        (u = $e(3, null, null, a)),
        (e.current = u),
        (u.stateNode = e),
        (a = jd()),
        a.refCount++,
        (e.pooledCache = a),
        a.refCount++,
        (u.memoizedState = { element: l, isDehydrated: t, cache: a }),
        Xd(u),
        e
      );
    }
    function Bb(e) {
      return e ? ((e = un), e) : un;
    }
    function qb(e, a, t, l, n, u) {
      ((n = Bb(n)),
        l.context === null ? (l.context = n) : (l.pendingContext = n),
        (l = Ft(a)),
        (l.payload = { element: t }),
        (u = u === void 0 ? null : u),
        u !== null && (l.callback = u),
        (t = Qt(e, l, a)),
        t !== null && (ea(t, e, a), yu(t, e, a)));
    }
    function wm(e, a) {
      if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
        var t = e.retryLane;
        e.retryLane = t !== 0 && t < a ? t : a;
      }
    }
    function wc(e, a) {
      (wm(e, a), (e = e.alternate) && wm(e, a));
    }
    function Ob(e) {
      if (e.tag === 13 || e.tag === 31) {
        var a = Rl(e, 67108864);
        (a !== null && ea(a, e, 67108864), wc(e, 67108864));
      }
    }
    function Bm(e) {
      if (e.tag === 13 || e.tag === 31) {
        var a = pa();
        a = Rd(a);
        var t = Rl(e, a);
        (t !== null && ea(t, e, a), wc(e, a));
      }
    }
    var On = !0;
    function tA(e, a, t, l) {
      var n = R.T;
      R.T = null;
      var u = Y.p;
      try {
        ((Y.p = 2), Bc(e, a, t, l));
      } finally {
        ((Y.p = u), (R.T = n));
      }
    }
    function lA(e, a, t, l) {
      var n = R.T;
      R.T = null;
      var u = Y.p;
      try {
        ((Y.p = 8), Bc(e, a, t, l));
      } finally {
        ((Y.p = u), (R.T = n));
      }
    }
    function Bc(e, a, t, l) {
      if (On) {
        var n = qd(l);
        if (n === null) (bo(e, a, l, Ei, t), qm(e, l));
        else if (uA(n, e, a, t, l)) l.stopPropagation();
        else if ((qm(e, l), a & 4 && -1 < nA.indexOf(e))) {
          for (; n !== null; ) {
            var u = Dn(n);
            if (u !== null)
              switch (u.tag) {
                case 3:
                  if (
                    ((u = u.stateNode), u.current.memoizedState.isDehydrated)
                  ) {
                    var r = ml(u.pendingLanes);
                    if (r !== 0) {
                      var s = u;
                      for (s.pendingLanes |= 2, s.entangledLanes |= 2; r; ) {
                        var o = 1 << (31 - fa(r));
                        ((s.entanglements[1] |= o), (r &= ~o));
                      }
                      (ut(u), (j & 6) === 0 && ((Di = da() + 500), $u(0, !1)));
                    }
                  }
                  break;
                case 31:
                case 13:
                  ((s = Rl(u, 2)), s !== null && ea(s, u, 2), ts(), wc(u, 2));
              }
            if (((u = qd(l)), u === null && bo(e, a, l, Ei, t), u === n)) break;
            n = u;
          }
          n !== null && l.stopPropagation();
        } else bo(e, a, l, null, t);
      }
    }
    function qd(e) {
      return ((e = Nd(e)), qc(e));
    }
    var Ei = null;
    function qc(e) {
      if (((Ei = null), (e = bl(e)), e !== null)) {
        var a = Qu(e);
        if (a === null) e = null;
        else {
          var t = a.tag;
          if (t === 13) {
            if (((e = Um(a)), e !== null)) return e;
            e = null;
          } else if (t === 31) {
            if (((e = zm(a)), e !== null)) return e;
            e = null;
          } else if (t === 3) {
            if (a.stateNode.current.memoizedState.isDehydrated)
              return a.tag === 3 ? a.stateNode.containerInfo : null;
            e = null;
          } else a !== e && (e = null);
        }
      }
      return ((Ei = e), null);
    }
    function Mb(e) {
      switch (e) {
        case "beforetoggle":
        case "cancel":
        case "click":
        case "close":
        case "contextmenu":
        case "copy":
        case "cut":
        case "auxclick":
        case "dblclick":
        case "dragend":
        case "dragstart":
        case "drop":
        case "focusin":
        case "focusout":
        case "input":
        case "invalid":
        case "keydown":
        case "keypress":
        case "keyup":
        case "mousedown":
        case "mouseup":
        case "paste":
        case "pause":
        case "play":
        case "pointercancel":
        case "pointerdown":
        case "pointerup":
        case "ratechange":
        case "reset":
        case "seeked":
        case "submit":
        case "toggle":
        case "touchcancel":
        case "touchend":
        case "touchstart":
        case "volumechange":
        case "change":
        case "selectionchange":
        case "textInput":
        case "compositionstart":
        case "compositionend":
        case "compositionupdate":
        case "beforeblur":
        case "afterblur":
        case "beforeinput":
        case "blur":
        case "fullscreenchange":
        case "fullscreenerror":
        case "focus":
        case "hashchange":
        case "popstate":
        case "select":
        case "selectstart":
          return 2;
        case "drag":
        case "dragenter":
        case "dragexit":
        case "dragleave":
        case "dragover":
        case "mousemove":
        case "mouseout":
        case "mouseover":
        case "pointermove":
        case "pointerout":
        case "pointerover":
        case "resize":
        case "scroll":
        case "touchmove":
        case "wheel":
        case "mouseenter":
        case "mouseleave":
        case "pointerenter":
        case "pointerleave":
          return 8;
        case "message":
          switch (vy()) {
            case Fm:
              return 2;
            case Qm:
              return 8;
            case gi:
            case yy:
              return 32;
            case Vm:
              return 268435456;
            default:
              return 32;
          }
        default:
          return 32;
      }
    }
    var Od = !1,
      Yt = null,
      Jt = null,
      Xt = null,
      Gu = new Map(),
      Fu = new Map(),
      Dt = [],
      nA =
        "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
          " ",
        );
    function qm(e, a) {
      switch (e) {
        case "focusin":
        case "focusout":
          Yt = null;
          break;
        case "dragenter":
        case "dragleave":
          Jt = null;
          break;
        case "mouseover":
        case "mouseout":
          Xt = null;
          break;
        case "pointerover":
        case "pointerout":
          Gu.delete(a.pointerId);
          break;
        case "gotpointercapture":
        case "lostpointercapture":
          Fu.delete(a.pointerId);
      }
    }
    function su(e, a, t, l, n, u) {
      return e === null || e.nativeEvent !== u
        ? ((e = {
            blockedOn: a,
            domEventName: t,
            eventSystemFlags: l,
            nativeEvent: u,
            targetContainers: [n],
          }),
          a !== null && ((a = Dn(a)), a !== null && Ob(a)),
          e)
        : ((e.eventSystemFlags |= l),
          (a = e.targetContainers),
          n !== null && a.indexOf(n) === -1 && a.push(n),
          e);
    }
    function uA(e, a, t, l, n) {
      switch (a) {
        case "focusin":
          return ((Yt = su(Yt, e, a, t, l, n)), !0);
        case "dragenter":
          return ((Jt = su(Jt, e, a, t, l, n)), !0);
        case "mouseover":
          return ((Xt = su(Xt, e, a, t, l, n)), !0);
        case "pointerover":
          var u = n.pointerId;
          return (Gu.set(u, su(Gu.get(u) || null, e, a, t, l, n)), !0);
        case "gotpointercapture":
          return (
            (u = n.pointerId),
            Fu.set(u, su(Fu.get(u) || null, e, a, t, l, n)),
            !0
          );
      }
      return !1;
    }
    function Pb(e) {
      var a = bl(e.target);
      if (a !== null) {
        var t = Qu(a);
        if (t !== null) {
          if (((a = t.tag), a === 13)) {
            if (((a = Um(t)), a !== null)) {
              ((e.blockedOn = a),
                tp(e.priority, function () {
                  Bm(t);
                }));
              return;
            }
          } else if (a === 31) {
            if (((a = zm(t)), a !== null)) {
              ((e.blockedOn = a),
                tp(e.priority, function () {
                  Bm(t);
                }));
              return;
            }
          } else if (
            a === 3 &&
            t.stateNode.current.memoizedState.isDehydrated
          ) {
            e.blockedOn = t.tag === 3 ? t.stateNode.containerInfo : null;
            return;
          }
        }
      }
      e.blockedOn = null;
    }
    function ci(e) {
      if (e.blockedOn !== null) return !1;
      for (var a = e.targetContainers; 0 < a.length; ) {
        var t = qd(e.nativeEvent);
        if (t === null) {
          t = e.nativeEvent;
          var l = new t.constructor(t.type, t);
          ((Do = l), t.target.dispatchEvent(l), (Do = null));
        } else return ((a = Dn(t)), a !== null && Ob(a), (e.blockedOn = t), !1);
        a.shift();
      }
      return !0;
    }
    function Om(e, a, t) {
      ci(e) && t.delete(a);
    }
    function rA() {
      ((Od = !1),
        Yt !== null && ci(Yt) && (Yt = null),
        Jt !== null && ci(Jt) && (Jt = null),
        Xt !== null && ci(Xt) && (Xt = null),
        Gu.forEach(Om),
        Fu.forEach(Om));
    }
    function Vr(e, a) {
      e.blockedOn === a &&
        ((e.blockedOn = null),
        Od ||
          ((Od = !0),
          Le.unstable_scheduleCallback(Le.unstable_NormalPriority, rA)));
    }
    var Zr = null;
    function Mm(e) {
      Zr !== e &&
        ((Zr = e),
        Le.unstable_scheduleCallback(Le.unstable_NormalPriority, function () {
          Zr === e && (Zr = null);
          for (var a = 0; a < e.length; a += 3) {
            var t = e[a],
              l = e[a + 1],
              n = e[a + 2];
            if (typeof l != "function") {
              if (qc(l || t) === null) continue;
              break;
            }
            var u = Dn(t);
            u !== null &&
              (e.splice(a, 3),
              (a -= 3),
              Xo(
                u,
                { pending: !0, data: n, method: t.method, action: l },
                l,
                n,
              ));
          }
        }));
    }
    function Mn(e) {
      function a(o) {
        return Vr(o, e);
      }
      (Yt !== null && Vr(Yt, e),
        Jt !== null && Vr(Jt, e),
        Xt !== null && Vr(Xt, e),
        Gu.forEach(a),
        Fu.forEach(a));
      for (var t = 0; t < Dt.length; t++) {
        var l = Dt[t];
        l.blockedOn === e && (l.blockedOn = null);
      }
      for (; 0 < Dt.length && ((t = Dt[0]), t.blockedOn === null); )
        (Pb(t), t.blockedOn === null && Dt.shift());
      if (((t = (e.ownerDocument || e).$$reactFormReplay), t != null))
        for (l = 0; l < t.length; l += 3) {
          var n = t[l],
            u = t[l + 1],
            r = n[ta] || null;
          if (typeof u == "function") r || Mm(t);
          else if (r) {
            var s = null;
            if (u && u.hasAttribute("formAction")) {
              if (((n = u), (r = u[ta] || null))) s = r.formAction;
              else if (qc(n) !== null) continue;
            } else s = r.action;
            (typeof s == "function"
              ? (t[l + 1] = s)
              : (t.splice(l, 3), (l -= 3)),
              Mm(t));
          }
        }
    }
    function Db() {
      function e(u) {
        u.canIntercept &&
          u.info === "react-transition" &&
          u.intercept({
            handler: function () {
              return new Promise(function (r) {
                return (n = r);
              });
            },
            focusReset: "manual",
            scroll: "manual",
          });
      }
      function a() {
        (n !== null && (n(), (n = null)), l || setTimeout(t, 20));
      }
      function t() {
        if (!l && !navigation.transition) {
          var u = navigation.currentEntry;
          u &&
            u.url != null &&
            navigation.navigate(u.url, {
              state: u.getState(),
              info: "react-transition",
              history: "replace",
            });
        }
      }
      if (typeof navigation == "object") {
        var l = !1,
          n = null;
        return (
          navigation.addEventListener("navigate", e),
          navigation.addEventListener("navigatesuccess", a),
          navigation.addEventListener("navigateerror", a),
          setTimeout(t, 100),
          function () {
            ((l = !0),
              navigation.removeEventListener("navigate", e),
              navigation.removeEventListener("navigatesuccess", a),
              navigation.removeEventListener("navigateerror", a),
              n !== null && (n(), (n = null)));
          }
        );
      }
    }
    function Oc(e) {
      this._internalRoot = e;
    }
    us.prototype.render = Oc.prototype.render = function (e) {
      var a = this._internalRoot;
      if (a === null) throw Error(S(409));
      var t = a.current,
        l = pa();
      qb(t, l, e, a, null, null);
    };
    us.prototype.unmount = Oc.prototype.unmount = function () {
      var e = this._internalRoot;
      if (e !== null) {
        this._internalRoot = null;
        var a = e.containerInfo;
        (qb(e.current, 2, null, e, null, null), ts(), (a[Pn] = null));
      }
    };
    function us(e) {
      this._internalRoot = e;
    }
    us.prototype.unstable_scheduleHydration = function (e) {
      if (e) {
        var a = Wm();
        e = { blockedOn: null, target: e, priority: a };
        for (var t = 0; t < Dt.length && a !== 0 && a < Dt[t].priority; t++);
        (Dt.splice(t, 0, e), t === 0 && Pb(e));
      }
    };
    var Pm = Dm.version;
    if (Pm !== "19.3.0") throw Error(S(527, Pm, "19.3.0"));
    Y.findDOMNode = function (e) {
      var a = e._reactInternals;
      if (a === void 0)
        throw typeof e.render == "function"
          ? Error(S(188))
          : ((e = Object.keys(e).join(",")), Error(S(268, e)));
      return (
        (e = iy(a)),
        (e = e !== null ? Nm(e) : null),
        (e = e === null ? null : e.stateNode),
        e
      );
    };
    var iA = {
      bundleType: 0,
      version: "19.3.0",
      rendererPackageName: "react-dom",
      currentDispatcherRef: R,
      reconcilerVersion: "19.3.0",
    };
    if (
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" &&
      ((ou = __REACT_DEVTOOLS_GLOBAL_HOOK__),
      !ou.isDisabled && ou.supportsFiber)
    )
      try {
        ((Vu = ou.inject(iA)), (ca = ou));
      } catch {}
    var ou;
    rs.createRoot = function (e, a) {
      if (!Rm(e)) throw Error(S(299));
      var t = !1,
        l = "",
        n = mh,
        u = gh,
        r = hh;
      return (
        a != null &&
          (a.unstable_strictMode === !0 && (t = !0),
          a.identifierPrefix !== void 0 && (l = a.identifierPrefix),
          a.onUncaughtError !== void 0 && (n = a.onUncaughtError),
          a.onCaughtError !== void 0 && (u = a.onCaughtError),
          a.onRecoverableError !== void 0 && (r = a.onRecoverableError)),
        (a = wb(e, 1, !1, null, null, t, l, null, n, u, r, Db)),
        (e[Pn] = a.current),
        Lc(e),
        new Oc(a)
      );
    };
    rs.hydrateRoot = function (e, a, t) {
      if (!Rm(e)) throw Error(S(299));
      var l = !1,
        n = "",
        u = mh,
        r = gh,
        s = hh,
        o = null;
      return (
        t != null &&
          (t.unstable_strictMode === !0 && (l = !0),
          t.identifierPrefix !== void 0 && (n = t.identifierPrefix),
          t.onUncaughtError !== void 0 && (u = t.onUncaughtError),
          t.onCaughtError !== void 0 && (r = t.onCaughtError),
          t.onRecoverableError !== void 0 && (s = t.onRecoverableError),
          t.formState !== void 0 && (o = t.formState)),
        (a = wb(e, 1, !0, a, t ?? null, l, n, o, u, r, s, Db)),
        (a.context = Bb(null)),
        (t = a.current),
        (l = pa()),
        (l = Rd(l)),
        (n = Ft(l)),
        (n.callback = null),
        Qt(t, n, l),
        (t = l),
        (a.current.lanes = t),
        ju(a, t),
        ut(a),
        (e[Pn] = a.current),
        Lc(e),
        new us(a)
      );
    };
    rs.version = "19.3.0";
  });
  var Nb = Qa((nS, zb) => {
    "use strict";
    function Ub() {
      if (
        !(
          typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
          typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
        )
      )
        try {
          __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Ub);
        } catch (e) {
          console.error(e);
        }
    }
    (Ub(), (zb.exports = Rb()));
  });
  var Sv = Qa((Ss) => {
    "use strict";
    var TL = Symbol.for("react.transitional.element"),
      wL = Symbol.for("react.fragment");
    function Lv(e, a, t) {
      var l = null;
      if (
        (t !== void 0 && (l = "" + t),
        a.key !== void 0 && (l = "" + a.key),
        "key" in a)
      ) {
        t = {};
        for (var n in a) n !== "key" && (t[n] = a[n]);
      } else t = a;
      return (
        (a = t.ref),
        {
          $$typeof: TL,
          type: e,
          key: l,
          ref: a !== void 0 ? a : null,
          props: t,
        }
      );
    }
    Ss.Fragment = wL;
    Ss.jsx = Lv;
    Ss.jsxs = Lv;
  });
  var vr = Qa((bI, xv) => {
    "use strict";
    xv.exports = Sv();
  });
  var Bv = it(cl(), 1),
    qv = it(Nb(), 1);
  var Pc = {};
  Oa(Pc, {
    DEFAULT_ROLE_SERVING_TARGETS: () => Hb,
    SCHEMA_VERSION: () => tr,
    bumpRevision: () => sA,
    createPartyState: () => Mc,
  });
  var tr = 5,
    Hb = {
      main: 1,
      "secondary-main": 0.5,
      starch: 1,
      vegetable: 1,
      fresh: 0.5,
      bread: 0.75,
      "sauce-condiment": 0.25,
      appetizer: 0.75,
      dessert: 1,
      "non-alcoholic-drink": 1,
      alcohol: 1,
      coffee: 1,
    };
  function Mc(e = {}) {
    return Eb(
      {
        schemaVersion: 5,
        revision: 0,
        setupCompleted: !1,
        event: {
          name: "Thanksgiving",
          guests: 12,
          kids: 0,
          service: "family",
          budget: 0,
          burners: 4,
          ovens: 1,
          dinnerAt: null,
          arrivalAt: null,
          timeZone: null,
          cookingHelpers: 0,
        },
        planning: {
          mode: "estimated",
          estimatedHeadcount: 12,
          estimatedChildren: 0,
          estimatedAdultDrinkers: 0,
          estimatedHouseholds: 0,
          customHeadcount: 12,
          customChildren: 0,
          customAdultDrinkers: 0,
          customHouseholds: 0,
          foodBufferPercent: 0,
          placeSettingSparePercent: 5,
          roleServingTargets: Hb,
          requiredMenuRoles: ["main", "starch", "vegetable", "dessert"],
          dietaryRequiredRoles: ["main", "starch", "vegetable"],
        },
        guests: [],
        recipes: {},
        dishes: {},
        menuResponsibilities: {},
        shoppingLedger: {},
        pantry: {},
        manualShoppingItems: [],
        costCatalog: {},
        kitchenResources: { ovens: [], burners: [], hosts: [] },
        taskOverrides: {},
        manualTasks: [],
        turkeyPlan: {
          poundsPerPerson: 1.25,
          bufferPercent: 0,
          purchasedWeightLb: 0,
        },
        housePrep: { enabled: !0 },
        tables: [],
        seats: {},
        inventory: {},
        room: {},
        spaceZones: {},
        activities: {},
        selectedActivities: {},
        budgetEntries: [],
        actualSpendEntries: [],
        printableOverrides: {},
      },
      e,
    );
  }
  function sA(e) {
    return {
      ...e,
      schemaVersion: 5,
      revision: Math.max(0, Number(e.revision) || 0) + 1,
    };
  }
  function Eb(e, a) {
    if (!a || typeof a != "object") return structuredClone(e);
    let t = structuredClone(e);
    for (let [l, n] of Object.entries(a))
      n &&
      typeof n == "object" &&
      !Array.isArray(n) &&
      t[l] &&
      typeof t[l] == "object" &&
      !Array.isArray(t[l])
        ? (t[l] = Eb(t[l], n))
        : (t[l] = structuredClone(n));
    return t;
  }
  var Xc = {};
  Oa(Xc, { derivePlan: () => eL });
  function is(e = {}, a = null) {
    let t = e.type === "child" ? "child" : "adult",
      l = ["yes", "pending", "no"].includes(e.rsvp) ? e.rsvp : "pending",
      n = Math.max(0, Math.floor(Number(e.kids) || 0)),
      u = String(e.guestId || e.id || a || "guest");
    return {
      guestId: u,
      name: String(e.name || "Guest"),
      type: t,
      rsvp: l,
      plus: Number(e.plus) ? 1 : 0,
      kids: n,
      dietaryRestrictions: En(e.dietaryRestrictions),
      allergies: En(e.allergies),
      plusDietaryRestrictions: En(e.plusDietaryRestrictions),
      plusAllergies: En(e.plusAllergies),
      childDietaryRestrictions: Array.isArray(e.childDietaryRestrictions)
        ? e.childDietaryRestrictions.map(En)
        : [],
      childAllergies: Array.isArray(e.childAllergies)
        ? e.childAllergies.map(En)
        : [],
      appetite: Dc(e.appetite),
      plusAppetite: Dc(e.plusAppetite),
      childAppetites: Array.isArray(e.childAppetites)
        ? e.childAppetites.map(Dc)
        : [],
      alcohol: e.alcohol ?? null,
      plusAlcohol: e.plusAlcohol ?? null,
      highChairs: Math.max(0, Number(e.highChairs) || 0),
      householdId: String(e.householdId || u),
    };
  }
  var En = (e) =>
      Array.isArray(e)
        ? e.map((a) => String(a).trim().toLowerCase()).filter(Boolean)
        : [],
    Dc = (e) => (["light", "regular", "hearty"].includes(e) ? e : "regular");
  function oA(e, a = "expected") {
    let t = (r) => (a === "confirmed" ? r.rsvp === "yes" : r.rsvp !== "no"),
      l = 0,
      n = 0,
      u = 0;
    return (
      (e || [])
        .map((r, s) => is(r, `guest-${s + 1}`))
        .filter(t)
        .forEach((r) => {
          (r.type === "child"
            ? (n += 1)
            : ((l += 1), (r.alcohol === !0 || r.alcohol === "yes") && (u += 1)),
            r.plus &&
              ((l += 1),
              (r.plusAlcohol === !0 || r.plusAlcohol === "yes") && (u += 1)),
            (n += r.kids));
        }),
      { headcount: l + n, adults: l, children: n, drinkers: u }
    );
  }
  function la(e) {
    let a = e.planning.mode;
    if (a === "expected" || a === "confirmed") {
      let u = oA(e.guests, a);
      return {
        mode: a,
        planningHeadcount: u.headcount,
        planningAdults: u.adults,
        planningChildren: u.children,
        planningAdultDrinkers: u.drinkers,
      };
    }
    let t = a === "custom" ? "custom" : "estimated",
      l = Math.max(0, Number(e.planning[t + "Headcount"]) || 0),
      n = Math.min(l, Math.max(0, Number(e.planning[t + "Children"]) || 0));
    return {
      mode: a,
      planningHeadcount: l,
      planningAdults: l - n,
      planningChildren: n,
      planningAdultDrinkers: Math.max(
        0,
        Number(e.planning[t + "AdultDrinkers"]) || 0,
      ),
    };
  }
  function lr(e) {
    let a = e.planning.mode === "confirmed" ? "confirmed" : "expected",
      t = (n) => (a === "confirmed" ? n.rsvp === "yes" : n.rsvp !== "no"),
      l = [];
    for (let [n, u] of (e.guests || []).entries()) {
      let r = is(u, `guest-${n + 1}`);
      if (t(r)) {
        (l.push({
          personId: r.guestId,
          name: r.name,
          child: r.type === "child",
          dietaryRestrictions: r.dietaryRestrictions,
          allergies: r.allergies,
          appetite: r.appetite,
        }),
          r.plus &&
            l.push({
              personId: `${r.guestId}:plus`,
              name: `${r.name} +1`,
              child: !1,
              dietaryRestrictions: r.plusDietaryRestrictions,
              allergies: r.plusAllergies,
              appetite: r.plusAppetite,
              unconfirmedDietary:
                r.plusDietaryRestrictions.length === 0 &&
                r.plusAllergies.length === 0,
            }));
        for (let s = 0; s < r.kids; s++)
          l.push({
            personId: `${r.guestId}:child:${s}`,
            name: `${r.name} child ${s + 1}`,
            child: !0,
            dietaryRestrictions: r.childDietaryRestrictions[s] || [],
            allergies: r.childAllergies[s] || [],
            appetite: r.childAppetites[s] || "regular",
            unconfirmedDietary: !(
              r.childDietaryRestrictions[s]?.length ||
              r.childAllergies[s]?.length
            ),
          });
      }
    }
    return l;
  }
  var Gc = {};
  Oa(Gc, {
    aggregateIngredients: () => ur,
    ingredientIdentity: () => Kc,
    isWholeTurkeyIngredient: () => nr,
    scaledIngredientsForDish: () => Zb,
  });
  var Uc = {};
  Oa(Uc, {
    PREPARATION_MODES: () => Rc,
    dishRequirementMode: () => Na,
    hostOwnsDish: () => Kb,
    normalizeDishRecord: () => wa,
    setDishPreparationMode: () => dA,
  });
  var Rc = ["homemade", "purchased", "guest-provided"];
  function wa(e = {}) {
    let a = Rc.includes(e.preparationMode)
      ? e.preparationMode
      : e.easy
        ? "purchased"
        : "homemade";
    return { ...e, on: !!e.on, preparationMode: a };
  }
  function Kb(e, a) {
    let t = wa(a.dishes?.[e] || {}),
      l = a.menuResponsibilities?.[e];
    if (l?.ownerType === "host") return !0;
    if (
      l?.ownerType === "guest" &&
      ["confirmed", "arrived"].includes(l.status)
    ) {
      let n = (a.guests || []).find(
        (u) => String(u.guestId || u.id) === String(l.contributorGuestId),
      );
      return !n || n.rsvp !== "yes";
    }
    return (t.preparationMode === "guest-provided", !0);
  }
  function Na(e, a) {
    return Kb(e, a)
      ? wa(a.dishes?.[e] || {}).preparationMode === "purchased"
        ? "prepared-food"
        : "ingredients"
      : "none";
  }
  function dA(e, a, t) {
    if (!Rc.includes(t)) throw new Error("Invalid preparation mode");
    return {
      ...e,
      dishes: {
        ...e.dishes,
        [a]: { ...wa(e.dishes[a]), on: !0, preparationMode: t },
      },
    };
  }
  var Nc = {};
  Oa(Nc, {
    addRecipeToMenu: () => fA,
    deriveBatchPlanForDish: () => zc,
    normalizeIngredient: () => Gb,
    normalizeRecipe: () => ss,
    recipeForDish: () => ee,
    removeDishFromMenu: () => pA,
    requiredServingsForDish: () => Kn,
    upsertRecipe: () => Fb,
  });
  function Gb(e = {}) {
    let a = String(e.name || e.ingredient || "Ingredient").trim(),
      t = String(e.ingredientId || e.id || "").trim();
    return {
      ...e,
      name: a,
      ingredientId: t || void 0,
      quantity: Math.max(0, Number(e.quantity) || 0),
      unit: String(e.unit || "each"),
      variant: String(e.variant || "").trim(),
      optional: !!e.optional,
    };
  }
  function cA(e, a, t) {
    if (typeof e == "string")
      return {
        id: `${t}:prep:${a}`,
        title: e,
        durationMinutes: 0,
        phase: "prep",
        dependsOn: a ? [`${t}:prep:${a - 1}`] : [],
      };
    let l = String(e.id || `${t}:prep:${a}`),
      n = Array.isArray(e.dependsOn)
        ? e.dependsOn.map(String)
        : a
          ? [String(e.previousTaskId || `${t}:prep:${a - 1}`)]
          : [];
    return {
      ...e,
      id: l,
      title: String(e.title || e.name || `Prep ${a + 1}`),
      durationMinutes: Math.max(
        0,
        Number(e.durationMinutes ?? e.duration) || 0,
      ),
      phase: String(e.phase || "prep"),
      dependsOn: n,
      resourceRequirements: Array.isArray(e.resourceRequirements)
        ? e.resourceRequirements
        : Array.isArray(e.resources)
          ? e.resources
          : [],
    };
  }
  function ss(e = {}) {
    let a = String(e.id || e.recipeId || gA(e.title || e.name || "recipe")),
      t = String(e.title || e.name || a),
      l = Math.max(1, Number(e.baseServings || e.servings) || 1),
      n = Array.isArray(e.ingredients) ? e.ingredients.map(Gb) : [],
      u = Array.isArray(e.prepTasks)
        ? e.prepTasks.map((r, s) => cA(r, s, a))
        : [];
    return {
      ...e,
      id: a,
      title: t,
      baseServings: l,
      mealRole: String(e.mealRole || e.role || "").trim(),
      ingredients: n,
      prepTasks: u,
      equipment: Array.isArray(e.equipment) ? e.equipment : [],
      servingRequirements: Array.isArray(e.servingRequirements)
        ? e.servingRequirements
        : [],
      dietaryTags: Array.isArray(e.dietaryTags)
        ? e.dietaryTags.map((r) => String(r).toLowerCase())
        : [],
      allergens: Array.isArray(e.allergens)
        ? e.allergens.map((r) => String(r).toLowerCase())
        : [],
    };
  }
  function Fb(e, a) {
    let t = ss(a);
    return { ...e, recipes: { ...(e.recipes || {}), [t.id]: t } };
  }
  function fA(e, a, t = {}) {
    let l = e,
      n;
    if (typeof a == "string") n = a;
    else {
      let r = ss(a);
      ((n = r.id), (l = Fb(l, r)));
    }
    if (!l.recipes?.[n] && !t.allowMissingRecipe)
      throw new Error(`Unknown recipe: ${n}`);
    let u = wa(l.dishes?.[n] || {});
    return {
      ...l,
      dishes: {
        ...(l.dishes || {}),
        [n]: {
          ...u,
          ...t,
          on: !0,
          recipeId: n,
          preparationMode: t.preparationMode || u.preparationMode || "homemade",
        },
      },
    };
  }
  function pA(e, a) {
    let t = wa(e.dishes?.[a] || {});
    return { ...e, dishes: { ...(e.dishes || {}), [a]: { ...t, on: !1 } } };
  }
  function ee(e, a) {
    let t = wa(e.dishes?.[a] || {}),
      l = t.recipeId || a,
      n = e.recipes?.[l] || t.recipe;
    return n ? ss({ ...n, id: n.id || l }) : null;
  }
  function mA(e, a, t) {
    let l = wa(e.dishes?.[a] || {}),
      n = ee(e, a),
      u = Math.max(
        0,
        Number(l.roleShareWeight ?? n?.servingStrategy?.shareWeight) || 1,
      ),
      r = 0;
    for (let [s, o] of Object.entries(e.dishes || {})) {
      if (!o?.on) continue;
      let d = ee(e, s);
      !d ||
        d.mealRole !== t ||
        (d.servingStrategy?.basis || "headcount") !== "role-share" ||
        (r += Math.max(
          0,
          Number(o.roleShareWeight ?? d.servingStrategy?.shareWeight) || 1,
        ));
    }
    return r > 0 ? u / r : 1;
  }
  function Kn(e, a) {
    let t = wa(e.dishes?.[a] || {}),
      l = ee(e, a);
    if (!l) return 0;
    if (
      t.servingsOverride !== void 0 &&
      t.servingsOverride !== null &&
      Number.isFinite(Number(t.servingsOverride)) &&
      Number(t.servingsOverride) >= 0
    )
      return Number(t.servingsOverride);
    let n = la(e),
      u = l.servingStrategy || {},
      r = u.basis || "headcount",
      s =
        r === "adults"
          ? n.planningAdults
          : r === "adult-drinkers"
            ? n.planningAdultDrinkers
            : r === "children"
              ? n.planningChildren
              : r === "fixed"
                ? Math.max(0, Number(u.fixedServings) || l.baseServings)
                : n.planningHeadcount;
    if (r === "role-share") {
      let p = l.mealRole || "other",
        f = Math.max(
          0,
          Number(u.roleServingFactor ?? e.planning?.roleServingTargets?.[p]) ||
            1,
        );
      s = n.planningHeadcount * f * mA(e, a, p);
    } else s *= Math.max(0, Number(u.factor) || 1);
    let o = Number(u.bufferPercent),
      d = Number(e.planning?.foodBufferPercent) || 0,
      c = Number.isFinite(o) ? o : d;
    return s * (1 + Math.max(0, c) / 100);
  }
  function zc(e, a) {
    let t = ee(e, a);
    if (!t) return null;
    let l = Kn(e, a),
      n = Math.max(0, Number(t.batchCapacityServings) || 0);
    if (!n)
      return {
        dishId: a,
        requiredServings: l,
        batches: 1,
        parallelCapacity: 1,
        waves: 1,
        capacityKnown: !1,
      };
    let u = Math.max(1, Math.ceil(l / n)),
      r = Math.max(1, Math.floor(Number(t.parallelBatchCapacity) || 1));
    return {
      dishId: a,
      requiredServings: l,
      batches: u,
      parallelCapacity: r,
      waves: Math.ceil(u / r),
      capacityKnown: !0,
    };
  }
  function gA(e) {
    return (
      String(e)
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "") || "recipe"
    );
  }
  function Qb(e, a, t, l = {}) {
    let n = Math.max(0, Number(e) || 0),
      u = Math.max(1, Number(a) || 1),
      r = Math.max(0, Number(t) || 0),
      s = (n * r) / u,
      o = Number(l.increment) || 0;
    return o ? Math.ceil(s / o) * o : s;
  }
  function os(e, a) {
    let t = Math.max(0, Number(e) || 0),
      l = Math.max(1e-6, Number(a) || 1);
    return Math.ceil(t / l);
  }
  var Ec = {};
  Oa(Ec, {
    chooseDisplayUnit: () => Vb,
    compatibleUnits: () => bA,
    displayQuantity: () => ae,
    fromCanonical: () => ds,
    normalizeUnit: () => Je,
    toCanonical: () => ha,
  });
  var hA = new Map([
      ["tsp", "tsp"],
      ["teaspoon", "tsp"],
      ["teaspoons", "tsp"],
      ["tbsp", "tbsp"],
      ["tablespoon", "tbsp"],
      ["tablespoons", "tbsp"],
      ["cup", "cup"],
      ["cups", "cup"],
      ["fl oz", "floz"],
      ["fluid ounce", "floz"],
      ["fluid ounces", "floz"],
      ["floz", "floz"],
      ["ml", "ml"],
      ["milliliter", "ml"],
      ["milliliters", "ml"],
      ["millilitre", "ml"],
      ["millilitres", "ml"],
      ["l", "l"],
      ["liter", "l"],
      ["liters", "l"],
      ["litre", "l"],
      ["litres", "l"],
      ["oz", "oz"],
      ["ounce", "oz"],
      ["ounces", "oz"],
      ["lb", "lb"],
      ["lbs", "lb"],
      ["pound", "lb"],
      ["pounds", "lb"],
      ["g", "g"],
      ["gram", "g"],
      ["grams", "g"],
      ["kg", "kg"],
      ["kilogram", "kg"],
      ["kilograms", "kg"],
      ["each", "each"],
      ["ea", "each"],
      ["item", "each"],
      ["items", "each"],
      ["count", "each"],
      ["whole", "each"],
      ["serving", "serving"],
      ["servings", "serving"],
      ["package", "package"],
      ["packages", "package"],
      ["pack", "package"],
      ["packs", "package"],
    ]),
    Hc = {
      tsp: { dimension: "volume", toBase: 4.92892159375 },
      tbsp: { dimension: "volume", toBase: 14.78676478125 },
      cup: { dimension: "volume", toBase: 236.5882365 },
      floz: { dimension: "volume", toBase: 29.5735295625 },
      ml: { dimension: "volume", toBase: 1 },
      l: { dimension: "volume", toBase: 1e3 },
      oz: { dimension: "mass", toBase: 28.349523125 },
      lb: { dimension: "mass", toBase: 453.59237 },
      g: { dimension: "mass", toBase: 1 },
      kg: { dimension: "mass", toBase: 1e3 },
      each: { dimension: "count", toBase: 1 },
      serving: { dimension: "serving", toBase: 1 },
      package: { dimension: "package", toBase: 1 },
    };
  function Je(e = "each") {
    let a = String(e || "each")
        .trim()
        .toLowerCase()
        .replace(/\./g, "")
        .replace(/\s+/g, " "),
      t = hA.get(a) || a;
    return {
      id: t,
      dimension: Hc[t]?.dimension || `custom:${t}`,
      toBase: Hc[t]?.toBase ?? 1,
      known: !!Hc[t],
    };
  }
  function bA(e, a) {
    return Je(e).dimension === Je(a).dimension;
  }
  function ha(e, a) {
    let t = Number(e) || 0,
      l = Je(a);
    return { quantity: t * l.toBase, dimension: l.dimension, unit: l.id };
  }
  function ds(e, a, t) {
    let l = Je(t);
    return l.dimension !== a ? null : e / l.toBase;
  }
  function Vb(e, a) {
    let t = Math.abs(e);
    return a === "volume"
      ? t >= 59.147059125
        ? "cup"
        : t >= 14.78676478125
          ? "tbsp"
          : t >= 4.92892159375
            ? "tsp"
            : "ml"
      : a === "mass"
        ? t >= 453.59237
          ? "lb"
          : t >= 28.349523125
            ? "oz"
            : "g"
        : a === "count"
          ? "each"
          : a === "serving"
            ? "serving"
            : a === "package"
              ? "package"
              : a.startsWith("custom:")
                ? a.slice(7)
                : "each";
  }
  function ae(e, a, t) {
    let l = t && Je(t).dimension === a ? Je(t).id : Vb(e, a);
    return { quantity: ds(e, a, l) ?? e, unit: l };
  }
  function vA(e) {
    let a = e.shoppingLedger?.["turkey:whole-bird"];
    if (!a) return null;
    let t = Je(a.unit || "lb");
    return t.dimension !== "mass"
      ? null
      : ha(a.quantity || 0, t.id).quantity / 453.59237;
  }
  function yA(e) {
    let a = Math.max(0, Number(e) || 0);
    return a
      ? a <= 8
        ? 195
        : a <= 12
          ? 180
          : a <= 14
            ? 225
            : a <= 18
              ? 255
              : a <= 20
                ? 270
                : 300
      : 0;
  }
  function Ha(e) {
    let a =
        Object.entries(e.dishes || {}).find(
          ([M, q]) =>
            q?.on &&
            Na(M, e) === "ingredients" &&
            (ee(e, M)?.isTurkey || ee(e, M)?.turkeyRules),
        )?.[0] || null,
      t = a ? ee(e, a) : null,
      l = t?.turkeyRules || {},
      n = Math.max(
        0,
        Number(l.poundsPerPerson ?? e.turkeyPlan?.poundsPerPerson) || 1.25,
      ),
      u = Math.max(
        0,
        Number(l.bufferPercent ?? e.turkeyPlan?.bufferPercent) || 0,
      ),
      r = la(e).planningHeadcount,
      s = a ? r * n * (1 + u / 100) : 0,
      o = Math.min(20, Math.max(10, Number(l.preferredBirdWeightLb) || 14)),
      d = a && s > 0 ? Math.max(1, Math.ceil(s / o)) : 0,
      c = d ? s / d : 0,
      p = Math.min(24, Math.max(c, Number(l.maxBirdWeightLb) || 20)),
      f = Math.min(p, Math.max(c, 0)),
      m = Math.max(1, Math.floor(Number(e.event?.ovens) || 1)),
      v = Math.max(1, Math.floor(Number(l.birdsPerOven) || 1)),
      C = m * v,
      k = d ? Math.ceil(d / C) : 0,
      h = Math.max(0, Number(vA(e) ?? e.turkeyPlan?.purchasedWeightLb) || 0),
      g = Math.max(0, s - h),
      b = Math.max(0, h - s),
      y = a ? Math.ceil(f / 4) * 24 : null,
      A = a ? yA(f) : null,
      L = A == null ? null : A * Math.max(1, k),
      x = Math.max(20, Number(l.restMinutes) || 20),
      I = [];
    return (
      a && k > 1 && I.push("turkey-oven-capacity-review"),
      a && f > 24 && I.push("turkey-bird-weight-too-large"),
      {
        dishId: a,
        recipeTitle: t?.title || "Turkey",
        headcount: r,
        poundsPerPerson: n,
        bufferPercent: u,
        requiredWeightLb: s,
        purchasedWeightLb: h,
        stillNeedLb: g,
        surplusLb: b,
        birdCount: d,
        averageBirdWeightLb: c,
        roastBirdWeightLb: f,
        ovenCount: m,
        birdsPerOven: v,
        parallelBirdCapacity: C,
        ovenWaves: k,
        thawHours: y,
        perWaveCookMinutes: A,
        cookMinutes: L,
        restMinutes: x,
        ovenTemperatureF: 325,
        safeMinimumInternalTemperatureF: 165,
        issues: I,
      }
    );
  }
  function Kc(e = {}) {
    if (e.ingredientId) return String(e.ingredientId).trim().toLowerCase();
    let a = String(e.name || e.ingredient || "ingredient")
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, " ")
        .trim(),
      t = String(e.variant || "")
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, " ")
        .trim();
    return t ? `${a}::${t}` : a;
  }
  function nr(e) {
    return (
      Kc(e).split("|")[0] === "whole-turkey" ||
      /^whole turkey$/i.test(String(e.name || ""))
    );
  }
  function Zb(e, a) {
    if (!e.dishes?.[a]?.on || Na(a, e) !== "ingredients") return [];
    let l = ee(e, a);
    if (!l) return [];
    let n = Kn(e, a),
      u = l.isTurkey || l.turkeyRules ? Ha(e) : null;
    return l.ingredients
      .filter((r) => !r.optional || r.includeByDefault)
      .map((r, s) => {
        let o = Qb(r.quantity, l.baseServings, n, {
          increment: r.scaleIncrement,
        });
        u?.dishId === a &&
          nr(r) &&
          Je(r.unit).dimension === "mass" &&
          (o = ds(ha(u.requiredWeightLb, "lb").quantity, "mass", r.unit));
        let d = Je(r.unit),
          c = ha(o, d.id),
          p = r.packageUnit || r.unit,
          f = Math.max(0, Number(r.packageQuantity ?? r.packageSize) || 0),
          m = f ? ha(f, p) : null;
        return {
          key: Kc(r),
          name: r.name,
          variant: r.variant || "",
          category: r.category || null,
          packageQuantity: f || null,
          packageUnit: f ? p : null,
          packageCanonicalQuantity:
            m?.dimension === c.dimension ? m.quantity : null,
          estimatedPackagePrice: Number.isFinite(
            Number(r.estimatedPackagePrice),
          )
            ? Number(r.estimatedPackagePrice)
            : null,
          priceSource: r.priceSource || null,
          priceUpdatedAt: r.priceUpdatedAt || null,
          quantity: o,
          unit: d.id,
          dimension: c.dimension,
          canonicalQuantity: c.quantity,
          sourceDishId: a,
          sourceRecipeId: l.id,
          sourceRecipeTitle: l.title,
          sourceIngredientIndex: s,
        };
      });
  }
  function ur(e) {
    let a = new Map(),
      t = Ha(e);
    for (let [l, n] of Object.entries(e.dishes || {}))
      if (n?.on)
        for (let u of Zb(e, l)) {
          if (l === t.dishId && u.dimension === "mass" && nr(u)) continue;
          let r = `${u.key}|${u.dimension}`;
          a.has(r) ||
            a.set(r, {
              key: u.key,
              name: u.name,
              variant: u.variant,
              category: u.category,
              packageQuantity: u.packageQuantity,
              packageUnit: u.packageUnit,
              packageCanonicalQuantity: u.packageCanonicalQuantity,
              estimatedPackagePrice: u.estimatedPackagePrice,
              priceSource: u.priceSource,
              priceUpdatedAt: u.priceUpdatedAt,
              dimension: u.dimension,
              canonicalQuantity: 0,
              sources: [],
            });
          let s = a.get(r);
          ((s.canonicalQuantity += u.canonicalQuantity),
            s.category !== u.category && (s.category = null),
            (s.packageCanonicalQuantity !== u.packageCanonicalQuantity ||
              s.packageUnit !== u.packageUnit) &&
              ((s.packageQuantity = null),
              (s.packageUnit = null),
              (s.packageCanonicalQuantity = null)),
            s.estimatedPackagePrice !== u.estimatedPackagePrice &&
              (s.estimatedPackagePrice = null),
            s.sources.push({
              dishId: u.sourceDishId,
              recipeId: u.sourceRecipeId,
              recipeTitle: u.sourceRecipeTitle,
              quantity: u.quantity,
              unit: u.unit,
              canonicalQuantity: u.canonicalQuantity,
            }));
        }
    return [...a.values()].map((l) => ({
      ...l,
      ...ae(l.canonicalQuantity, l.dimension),
    }));
  }
  var jb = {
    family: {
      id: "family",
      label: "Family style",
      servingPlacement: "table",
      requiredZones: ["dining"],
    },
    buffet: {
      id: "buffet",
      label: "Buffet",
      servingPlacement: "buffet",
      requiredZones: ["dining", "buffet"],
    },
    plated: {
      id: "plated",
      label: "Plated",
      servingPlacement: "kitchen-staging",
      requiredZones: ["dining", "kitchen-staging"],
    },
    cocktail: {
      id: "cocktail",
      label: "Cocktail / grazing",
      servingPlacement: "grazing",
      requiredZones: ["dining", "grazing"],
    },
  };
  function CA(e) {
    return jb[e.event?.service] || jb.family;
  }
  function Gn(e) {
    let a = CA(e),
      t = new Set(a.requiredZones),
      l = [];
    for (let [r, s] of Object.entries(e.dishes || {})) {
      if (!s?.on) continue;
      let o = ee(e, r);
      o &&
        l.push({
          dishId: r,
          title: o.title,
          placement: a.servingPlacement,
          servingRequirements: o.servingRequirements || [],
        });
    }
    let n = new Set(Object.keys(e.spaceZones || {}));
    for (let r of e.tables || []) r?.use && n.add(String(r.use));
    let u = [...t].filter((r) => !n.has(r) && r !== "dining");
    return {
      style: a,
      requiredZones: [...t],
      missingZones: u,
      dishes: l,
      tasks: u.map((r) => ({
        id: `service-zone:${r}`,
        title: `Set up ${r.replace(/-/g, " ")} zone`,
        phase: "setup",
        durationMinutes: 0,
        needsDuration: !0,
        derived: !0,
        source: "service-style",
      })),
    };
  }
  function AA(e) {
    let a = e.planning?.mode === "confirmed" ? "confirmed" : "expected",
      t = new Set();
    for (let [n, u] of (e.guests || []).entries()) {
      let r = is(u, `guest-${n + 1}`);
      (a === "confirmed" && r.rsvp !== "yes") ||
        (a !== "confirmed" && r.rsvp === "no") ||
        t.add(r.householdId || r.guestId);
    }
    let l = Number(
      a === "custom"
        ? e.planning?.customHouseholds
        : e.planning?.estimatedHouseholds,
    );
    return Math.max(t.size, Number(l) || 0);
  }
  function Yb(e, a) {
    let t = e.selectedActivities?.[a];
    return t === !0 || !!t?.selected;
  }
  function rt(e) {
    let a = la(e),
      t = AA(e),
      l = new Map(),
      n = [],
      u = new Set(),
      r = [];
    for (let [s, o] of Object.entries(e.activities || {})) {
      if (!Yb(e, s)) continue;
      for (let c of o.supplies || []) {
        let p = String(c.key || c.id || c.name).toLowerCase(),
          f = Number(c.fixedQuantity) || 0;
        (c.quantityPerPerson != null &&
          (f += Number(c.quantityPerPerson) * a.planningHeadcount),
          c.quantityPerHousehold != null &&
            (f += Number(c.quantityPerHousehold) * t),
          l.has(p) ||
            l.set(p, {
              key: p,
              name: c.name || p,
              quantity: 0,
              unit: c.unit || "each",
              estimatedUnitCost: Number(c.estimatedUnitCost) || 0,
              sources: [],
            }));
        let m = l.get(p);
        ((m.quantity += f), m.sources.push({ activityId: s, quantity: f }));
      }
      let d = `activity:${s}:`;
      for (let [c, p] of (o.tasks || []).entries()) {
        let f = String(p.id || c),
          m = `${d}${f}`,
          v = (Array.isArray(p.dependsOn) ? p.dependsOn : []).map((C) =>
            String(C).startsWith(d) ? String(C) : `${d}${C}`,
          );
        n.push({
          ...p,
          id: m,
          taskId: m,
          derived: !0,
          source: "activity",
          activityId: s,
          durationMinutes: Math.max(0, Number(p.durationMinutes) || 0),
          dependsOn: v,
        });
      }
      o.zoneRequirement && u.add(o.zoneRequirement);
      for (let c of o.printables || [])
        r.push({
          activityId: s,
          type: c.type || c,
          id: c.id || `activity:${s}:${c.type || c}`,
        });
    }
    return {
      selectedCount: Object.keys(e.activities || {}).filter((s) => Yb(e, s))
        .length,
      households: t,
      supplies: [...l.values()],
      tasks: n,
      zones: [...u],
      printables: r,
    };
  }
  function Jb(e) {
    if (e.housePrep?.enabled === !1) return [];
    let a = la(e),
      t = a.planningHeadcount,
      l = [
        {
          id: "house:fridge",
          taskId: "house:fridge",
          title: "Clear refrigerator + freezer space",
          phase: "days-ahead",
          durationMinutes: 25,
          fixedStartOffsetMinutes: -5760,
          handsOn: !0,
          source: "house-prep",
          derived: !0,
        },
        {
          id: "house:serving-check",
          taskId: "house:serving-check",
          title: "Pull serving pieces + label what each dish uses",
          phase: "days-ahead",
          durationMinutes: 20,
          fixedStartOffsetMinutes: -4320,
          handsOn: !0,
          source: "house-prep",
          derived: !0,
        },
        {
          id: "house:bathroom",
          taskId: "house:bathroom",
          title: "Reset guest bathroom",
          phase: "day-before",
          durationMinutes: 25,
          fixedStartOffsetMinutes: -1440,
          handsOn: !0,
          source: "house-prep",
          derived: !0,
        },
        {
          id: "house:dishwasher",
          taskId: "house:dishwasher",
          title: "Empty dishwasher + clear sink",
          phase: "day-before",
          durationMinutes: 15,
          fixedStartOffsetMinutes: -1320,
          handsOn: !0,
          source: "house-prep",
          derived: !0,
        },
        {
          id: "house:trash",
          taskId: "house:trash",
          title: "Stage trash + recycling",
          phase: "day-before",
          durationMinutes: 10,
          fixedStartOffsetMinutes: -1260,
          handsOn: !0,
          source: "house-prep",
          derived: !0,
        },
        {
          id: "house:coat-zone",
          taskId: "house:coat-zone",
          title: "Set coat + bag drop area",
          phase: "morning",
          durationMinutes: 10,
          fixedStartOffsetMinutes: -420,
          handsOn: !0,
          source: "house-prep",
          derived: !0,
        },
        {
          id: "house:coffee",
          taskId: "house:coffee",
          title: "Stage coffee + tea station",
          phase: "morning",
          durationMinutes: 15,
          fixedStartOffsetMinutes: -360,
          handsOn: !0,
          source: "house-prep",
          derived: !0,
        },
        {
          id: "house:leftovers",
          taskId: "house:leftovers",
          title: "Stage leftover containers + labels",
          phase: "morning",
          durationMinutes: 10,
          fixedStartOffsetMinutes: -300,
          handsOn: !0,
          source: "house-prep",
          derived: !0,
        },
        {
          id: "house:welcome",
          taskId: "house:welcome",
          title: "Set welcome + drinks station",
          phase: "before-guests",
          durationMinutes: 20,
          fixedStartOffsetMinutes: -120,
          handsOn: !0,
          source: "house-prep",
          derived: !0,
        },
        {
          id: "house:final-reset",
          taskId: "house:final-reset",
          title: "Final bathroom, trash + surface reset",
          phase: "before-guests",
          durationMinutes: 15,
          fixedStartOffsetMinutes: -75,
          handsOn: !0,
          source: "house-prep",
          derived: !0,
        },
      ];
    return (
      t >= 20 &&
        l.push({
          id: "house:flow",
          taskId: "house:flow",
          title: "Walk guest flow: entry, drinks, dining + exits",
          phase: "days-ahead",
          durationMinutes: 15,
          fixedStartOffsetMinutes: -2880,
          handsOn: !0,
          source: "house-prep",
          derived: !0,
          detail: `${t} planned guests`,
        }),
      l
    );
  }
  var LA = new Set(["receive", "reheat", "finish", "serve", "hold"]);
  function SA(e, a) {
    return Array.isArray(e.appliesTo)
      ? e.appliesTo.includes(a) || e.appliesTo.includes("any")
      : a === "homemade"
        ? !0
        : LA.has(e.phase);
  }
  function rr(e, a = {}) {
    return {
      ...e,
      ...a,
      title: a.title ?? e.title,
      durationMinutes:
        a.durationMinutes == null
          ? e.durationMinutes
          : Math.max(0, Number(a.durationMinutes) || 0),
      completed: a.completed ?? e.completed,
    };
  }
  function cs(e) {
    let a = [],
      t = Ha(e);
    if (t.dishId && t.thawHours) {
      let l = `${t.dishId}:thaw-start`;
      a.push({
        id: l,
        taskId: l,
        title: `Move ${t.birdCount} turkey${t.birdCount === 1 ? "" : "s"} to refrigerator to thaw`,
        phase: "days-ahead",
        durationMinutes: 5,
        handsOn: !0,
        fixedStartOffsetMinutes: -Math.ceil(t.thawHours * 60 + 1800),
        dishId: t.dishId,
        recipeTitle: t.recipeTitle,
        derived: !0,
        source: "turkey-plan",
        detail: `${t.birdCount} bird${t.birdCount === 1 ? "" : "s"} \xB7 about ${t.averageBirdWeightLb.toFixed(1)} lb each`,
      });
    }
    for (let [l, n] of Object.entries(e.dishes || {})) {
      if (!n?.on) continue;
      let u = wa(n),
        r = ee(e, l);
      if (!r) continue;
      let s = Na(l, e),
        o =
          s === "ingredients"
            ? "homemade"
            : s === "prepared-food"
              ? "purchased"
              : "guest-provided",
        d = zc(e, l);
      for (let c of r.prepTasks) {
        if (!SA(c, o)) continue;
        let p = `${l}:${c.id}`,
          f = (c.dependsOn || []).map((C) =>
            C.startsWith(`${l}:`) ? C : `${l}:${C}`,
          ),
          m =
            c.dynamicDuration === "turkey-roast" && t.dishId === l
              ? t.cookMinutes
              : c.durationMinutes;
        c.phase === "cook" &&
          d?.waves > 1 &&
          c.batchable !== !1 &&
          (m *= d.waves);
        let v = {
          ...c,
          taskId: p,
          id: p,
          dependsOn: f,
          dishId: l,
          recipeId: r.id,
          recipeTitle: r.title,
          preparationMode: o,
          durationMinutes: m,
          derived: !0,
          batchWaves: (c.phase === "cook" && d?.waves) || 1,
        };
        a.push(rr(v, e.taskOverrides?.[p]));
      }
    }
    for (let l of Jb(e)) {
      let n = l.taskId || l.id;
      a.push(rr({ ...l, taskId: n }, e.taskOverrides?.[n]));
    }
    for (let l of Gn(e).tasks) {
      let n = l.taskId || l.id;
      a.push(rr({ ...l, taskId: n }, e.taskOverrides?.[n]));
    }
    for (let l of rt(e).tasks) {
      let n = l.taskId || l.id;
      a.push(rr({ ...l, taskId: n }, e.taskOverrides?.[n]));
    }
    for (let l of e.manualTasks || []) {
      let n = String(l.taskId || l.id);
      a.push(
        rr(
          {
            ...l,
            taskId: n,
            id: n,
            manual: !0,
            derived: !1,
            dependsOn: Array.isArray(l.dependsOn) ? l.dependsOn : [],
            durationMinutes: Math.max(0, Number(l.durationMinutes) || 0),
            resourceRequirements: Array.isArray(l.resourceRequirements)
              ? l.resourceRequirements
              : [],
          },
          e.taskOverrides?.[n],
        ),
      );
    }
    return a;
  }
  var Zc = {};
  Oa(Zc, {
    deriveShoppingList: () => Nl,
    recordPurchase: () => RA,
    setOwnedQuantity: () => DA,
    setPantryQuantity: () => _b,
  });
  var xA = (e) =>
      typeof e == "number"
        ? Math.max(0, e)
        : Math.max(0, Number(e?.quantity ?? e?.owned) || 0) +
          Math.max(0, Number(e?.confirmedBorrowed ?? e?.securedBorrowed) || 0),
    IA = (e, a) =>
      Math.max(0, Number(e.shoppingLedger?.[`equipment:${a}`]?.quantity) || 0);
  function Fn(e) {
    let a = new Map();
    for (let [t, l] of Object.entries(e.dishes || {})) {
      if (!l?.on) continue;
      let n = ee(e, t);
      if (!n) continue;
      let s = [
        ...(Na(t, e) === "ingredients" ? n.equipment : []),
        ...n.servingRequirements,
      ];
      for (let o of s) {
        let d = String(o.id || o.equipmentId || o.name || "equipment")
            .trim()
            .toLowerCase(),
          c = Math.max(0, Number(o.quantity) || 1);
        a.has(d) ||
          a.set(d, {
            key: d,
            name: String(o.name || o.id || d),
            kind: o.kind || "equipment",
            purchaseable: o.purchaseable !== !1,
            required: 0,
            sources: [],
          });
        let p = a.get(d);
        ((p.required += c),
          p.sources.push({
            dishId: t,
            recipeId: n.id,
            recipeTitle: n.title,
            quantity: c,
          }));
      }
    }
    return [...a.values()].map((t) => {
      let l = xA(e.inventory?.[t.key]),
        n = IA(e, t.key),
        u = l + n;
      return {
        ...t,
        owned: l,
        purchased: n,
        secured: u,
        missing: Math.max(0, t.required - u),
        surplus: Math.max(0, u - t.required),
      };
    });
  }
  function Fc(e) {
    return e == null
      ? 0
      : typeof e == "number"
        ? Math.max(0, e)
        : Math.max(0, Number(e.quantity ?? e.owned ?? 0) || 0) +
          Math.max(
            0,
            Number(e.confirmedBorrowed ?? e.securedBorrowed ?? 0) || 0,
          );
  }
  var fs = (e, a) =>
    Math.max(0, Number(e.shoppingLedger?.[`table:${a}`]?.quantity) || 0);
  function kA(e) {
    let a = e.planning?.mode === "confirmed" ? "confirmed" : "expected",
      t = 0;
    for (let l of e.guests || [])
      (a === "confirmed" && l.rsvp !== "yes") ||
        (a !== "confirmed" && l.rsvp === "no") ||
        (t += Math.max(0, Number(l.highChairs) || 0));
    return t;
  }
  function Qn(e = {}, a = 0) {
    let t = e.shape === "round" ? "round" : "rectangle";
    return {
      ...e,
      id: String(e.id || `table-${a + 1}`),
      shape: t,
      use: String(e.use || "dining"),
      seatCapacity: Math.max(0, Math.floor(Number(e.seatCapacity) || 0)),
      lengthIn: Math.max(0, Number(e.lengthIn) || 0),
      widthIn: Math.max(0, Number(e.widthIn) || 0),
      diameterIn: Math.max(0, Number(e.diameterIn) || 0),
      linenDropIn: Math.max(0, Number(e.linenDropIn ?? 12) || 0),
    };
  }
  function TA(e) {
    let a = Qn(e);
    return a.shape === "round"
      ? {
          shape: "round",
          diameterIn: a.diameterIn ? a.diameterIn + 2 * a.linenDropIn : 0,
          dropIn: a.linenDropIn,
        }
      : {
          shape: "rectangle",
          lengthIn: a.lengthIn ? a.lengthIn + 2 * a.linenDropIn : 0,
          widthIn: a.widthIn ? a.widthIn + 2 * a.linenDropIn : 0,
          dropIn: a.linenDropIn,
        };
  }
  function wA(e) {
    return (Array.isArray(e.inventory?.linens) ? e.inventory.linens : []).map(
      (a, t) => ({
        ...a,
        id: a.id || `linen-${t + 1}`,
        remaining: Math.max(0, Math.floor(Number(a.quantity ?? 1) || 0)),
      }),
    );
  }
  function Xb(e, a) {
    if (e.shape === "round")
      return a.shape === "round" && Number(a.diameterIn) >= e.diameterIn
        ? "normal"
        : null;
    if (a.shape === "round") return null;
    let t = Number(a.lengthIn) || 0,
      l = Number(a.widthIn) || 0;
    return t >= e.lengthIn && l >= e.widthIn
      ? "normal"
      : l >= e.lengthIn && t >= e.widthIn
        ? "rotated"
        : null;
  }
  function BA(e, a, t) {
    if (!a) return null;
    if (e.shape === "round")
      return Math.max(0, (Number(a.diameterIn) - e.diameterIn) / 2);
    let l = Number(t === "rotated" ? a.widthIn : a.lengthIn),
      n = Number(t === "rotated" ? a.lengthIn : a.widthIn);
    return Math.max(0, Math.min((l - e.lengthIn) / 2, (n - e.widthIn) / 2));
  }
  function qA(e, a) {
    let t = wA(e),
      l = [];
    for (let n of a) {
      let u = TA(n),
        s =
          t
            .filter((p) => p.remaining > 0 && Xb(u, p))
            .sort((p, f) =>
              u.shape === "round"
                ? Number(p.diameterIn) - Number(f.diameterIn)
                : Number(p.lengthIn) * Number(p.widthIn) -
                  Number(f.lengthIn) * Number(f.widthIn),
            )[0] || null,
        o = s ? Xb(u, s) : null;
      s && (s.remaining -= 1);
      let d = s ? 0 : fs(e, `linen:${n.id}`),
        c = !!s || d >= 1;
      l.push({
        tableId: n.id,
        requirement: u,
        matched: s ? { ...s, remaining: void 0 } : null,
        orientation: o,
        actualDropIn: s ? BA(n, s, o) : null,
        purchased: d,
        missing: c ? 0 : 1,
      });
    }
    return l;
  }
  function Qc(e) {
    let a = la(e),
      t = (e.tables || []).map(Qn),
      l = t.filter((h) => h.use === "dining"),
      n = l.reduce((h, g) => h + g.seatCapacity, 0),
      u = a.planningHeadcount,
      r = kA(e),
      s = Math.max(0, u - r),
      o = Fc(e.inventory?.chairs),
      d = fs(e, "chairs"),
      c = Fc(e.inventory?.["high-chairs"]),
      p = fs(e, "high-chairs"),
      f = Math.max(0, Number(e.planning?.placeSettingSparePercent) || 0),
      m = Math.ceil(u * (1 + f / 100)),
      C = [
        "dinner-plates",
        "dessert-plates",
        "forks",
        "knives",
        "glasses",
        "napkins",
      ].map((h) => {
        let g = Fc(e.inventory?.[h]),
          b = fs(e, h);
        return {
          key: h,
          name: h.replace(/-/g, " "),
          required: m,
          owned: g,
          purchased: b,
          missing: Math.max(0, m - g - b),
        };
      }),
      k = qA(e, l);
    return {
      tables: t,
      diningTables: l,
      requiredSeats: u,
      seatCapacity: n,
      seatShortage: Math.max(0, u - n),
      regularSeatNeed: s,
      highChairNeed: r,
      chairHave: o,
      chairPurchased: d,
      highChairHave: c,
      highChairPurchased: p,
      chairShortage: Math.max(0, s - o - d),
      highChairShortage: Math.max(0, r - c - p),
      placeSettingCount: m,
      placeSettings: C,
      linens: k,
    };
  }
  function Wb(e) {
    let a = Qc(e),
      t = [];
    ((a.regularSeatNeed > a.chairHave || e.shoppingLedger?.["table:chairs"]) &&
      t.push({
        key: "chairs",
        name: "Chairs",
        required: a.regularSeatNeed,
        owned: a.chairHave,
        missing: a.chairShortage,
      }),
      (a.highChairNeed > a.highChairHave ||
        e.shoppingLedger?.["table:high-chairs"]) &&
        t.push({
          key: "high-chairs",
          name: "High chairs",
          required: a.highChairNeed,
          owned: a.highChairHave,
          missing: a.highChairShortage,
        }));
    for (let l of a.placeSettings)
      (l.required > l.owned || e.shoppingLedger?.[`table:${l.key}`]) &&
        t.push({ ...l });
    for (let l of a.linens)
      (!l.matched || e.shoppingLedger?.[`table:linen:${l.tableId}`]) &&
        t.push({
          key: `linen:${l.tableId}`,
          name: `Linen for ${l.tableId}`,
          required: 1,
          owned: l.matched ? 1 : 0,
          missing: l.missing,
          requirement: l.requirement,
        });
    return t;
  }
  function nl(e, a) {
    let t = e?.[a];
    return t == null
      ? null
      : typeof t == "number"
        ? { quantity: t, unit: "each" }
        : t;
  }
  function zl(e, a) {
    if (!e) return { canonicalQuantity: 0, compatible: !0 };
    let t = Je(e.unit || "each");
    return t.dimension !== a
      ? { canonicalQuantity: 0, compatible: !1, record: e }
      : {
          canonicalQuantity: ha(e.quantity ?? e.purchasedQuantity ?? 0, t.id)
            .quantity,
          compatible: !0,
          record: e,
        };
  }
  function OA(e, a) {
    let t = e.inventory?.[a];
    return t == null
      ? 0
      : typeof t == "number"
        ? Math.max(0, t)
        : Math.max(0, Number(t.quantity ?? t.owned ?? 0) || 0) +
          Math.max(
            0,
            Number(t.confirmedBorrowed ?? t.securedBorrowed ?? 0) || 0,
          );
  }
  function ir(e) {
    let a = Math.max(0, Number(e?.actualCost) || 0);
    return {
      committedCost: Math.max(a, Math.max(0, Number(e?.committedCost) || 0)),
      actualCost: a,
    };
  }
  function MA(e) {
    let a = Math.max(0, e.remainingCanonical || 0);
    if (a <= 0)
      return {
        quantity: 0,
        unit: e.packageUnit || e.stillNeed?.unit || e.unit || "each",
        packages: 0,
        packageQuantity: e.packageQuantity || null,
        packageUnit: e.packageUnit || null,
        estimatedPackagePrice: e.estimatedPackagePrice ?? null,
      };
    let t = Math.max(0, Number(e.packageCanonicalQuantity) || 0);
    if (t > 0 && e.packageUnit && e.packageQuantity) {
      let u = os(a, t);
      return {
        quantity: u * Number(e.packageQuantity),
        unit: String(e.packageUnit),
        packages: u,
        packageQuantity: Number(e.packageQuantity),
        packageUnit: String(e.packageUnit),
        estimatedPackagePrice: Number.isFinite(Number(e.estimatedPackagePrice))
          ? Number(e.estimatedPackagePrice)
          : null,
        priceSource: e.priceSource || null,
        priceUpdatedAt: e.priceUpdatedAt || null,
      };
    }
    let l =
      e.dimension === "count"
        ? "each"
        : e.dimension?.startsWith("custom:")
          ? e.dimension.slice(7)
          : null;
    if (!l) return null;
    let n = 1;
    return {
      quantity: os(a, n) * n,
      unit: l,
      packages: os(a, n),
      packageQuantity: n,
      packageUnit: l,
      estimatedPackagePrice: Number.isFinite(Number(e.estimatedPackagePrice))
        ? Number(e.estimatedPackagePrice)
        : null,
    };
  }
  function Vc(
    e,
    {
      key: a,
      name: t,
      required: l,
      kind: n,
      sources: u = [],
      estimatedUnitCost: r = 0,
      owned: s = 0,
      ...o
    },
  ) {
    let d = "count",
      c = zl(nl(e.shoppingLedger, a), d),
      p = c.canonicalQuantity,
      f = Math.max(0, l - s - p),
      m = Math.max(0, s + p - l);
    return {
      key: a,
      name: t,
      kind: n,
      dimension: d,
      quantity: l,
      unit: "each",
      requiredCanonical: l,
      haveCanonical: s,
      purchasedCanonical: p,
      remainingCanonical: f,
      surplusCanonical: m,
      required: ae(l, d),
      alreadyHave: ae(s, d),
      purchased: ae(p, d),
      stillNeed: ae(f, d),
      surplus: ae(m, d),
      sources: u,
      estimatedUnitCost: r,
      ...ir(c.record),
      ...o,
    };
  }
  function PA(e, a, t) {
    let l = a.key || `manual:${a.id || a.name || t + 1}`,
      n = Je(a.unit || "each"),
      u = ha(Math.max(0, Number(a.quantity) || 0), n.id).quantity,
      r = zl(nl(e.pantry, l), n.dimension),
      s = zl(nl(e.shoppingLedger, l), n.dimension),
      o = Math.max(0, u - r.canonicalQuantity - s.canonicalQuantity),
      d = Math.max(0, r.canonicalQuantity + s.canonicalQuantity - u);
    return {
      ...a,
      key: l,
      name: a.name || "Manual item",
      kind: "manual",
      manual: !0,
      dimension: n.dimension,
      quantity: Number(a.quantity) || 0,
      unit: n.id,
      requiredCanonical: u,
      haveCanonical: r.canonicalQuantity,
      purchasedCanonical: s.canonicalQuantity,
      remainingCanonical: o,
      surplusCanonical: d,
      required: ae(u, n.dimension, n.id),
      alreadyHave: ae(r.canonicalQuantity, n.dimension, n.id),
      purchased: ae(s.canonicalQuantity, n.dimension, n.id),
      stillNeed: ae(o, n.dimension, n.id),
      surplus: ae(d, n.dimension, n.id),
      ...ir(s.record),
      allocationIssues: [
        !r.compatible && "pantry-unit-incompatible",
        !s.compatible && "purchase-unit-incompatible",
      ].filter(Boolean),
    };
  }
  function Nl(e) {
    let a = [];
    for (let l of ur(e)) {
      let n = zl(nl(e.pantry, l.key), l.dimension),
        u = zl(nl(e.shoppingLedger, l.key), l.dimension),
        r = l.canonicalQuantity,
        s = n.canonicalQuantity,
        o = u.canonicalQuantity,
        d = Math.max(0, r - s - o),
        c = Math.max(0, s + o - r),
        p = {
          ...l,
          kind: "ingredient",
          requiredCanonical: r,
          haveCanonical: s,
          purchasedCanonical: o,
          remainingCanonical: d,
          surplusCanonical: c,
          required: ae(r, l.dimension),
          alreadyHave: ae(s, l.dimension),
          purchased: ae(o, l.dimension),
          stillNeed: ae(d, l.dimension),
          surplus: ae(c, l.dimension),
          allocationIssues: [
            !n.compatible && "pantry-unit-incompatible",
            !u.compatible && "purchase-unit-incompatible",
          ].filter(Boolean),
          ...ir(u.record),
        };
      a.push({ ...p, purchaseRecommendation: MA(p) });
    }
    let t = Ha(e);
    if (t.dishId) {
      let l = "turkey:whole-bird",
        n = "mass",
        u = ha(t.requiredWeightLb, "lb").quantity,
        r = zl(nl(e.pantry, l), n),
        s = r.canonicalQuantity,
        o = ha(t.purchasedWeightLb, "lb").quantity,
        d = Math.max(0, u - s - o),
        c = Math.max(0, s + o - u),
        p = nl(e.shoppingLedger, l),
        f = (ee(e, t.dishId)?.ingredients || []).find(nr),
        m = Math.max(0, Number(f?.packageQuantity || f?.packageSize) || 0),
        v = f?.packageUnit || f?.unit,
        C = m ? ha(m, v) : null;
      a.push({
        key: l,
        name: "Whole turkey",
        kind: "turkey",
        dimension: n,
        quantity: t.requiredWeightLb,
        unit: "lb",
        requiredCanonical: u,
        haveCanonical: s,
        purchasedCanonical: o,
        remainingCanonical: d,
        surplusCanonical: c,
        required: ae(u, n, "lb"),
        alreadyHave: ae(s, n, "lb"),
        purchased: ae(o, n, "lb"),
        stillNeed: ae(d, n, "lb"),
        surplus: ae(c, n, "lb"),
        packageQuantity: m || null,
        packageUnit: v || null,
        packageCanonicalQuantity: C?.dimension === n ? C.quantity : null,
        estimatedPackagePrice: f?.estimatedPackagePrice ?? null,
        priceSource: f?.priceSource || null,
        priceUpdatedAt: f?.priceUpdatedAt || null,
        allocationIssues: r.compatible ? [] : ["pantry-unit-incompatible"],
        sources: [
          {
            dishId: t.dishId,
            recipeTitle: t.recipeTitle,
            quantity: t.requiredWeightLb,
            unit: "lb",
          },
        ],
        ...ir(p),
      });
    }
    for (let [l, n] of Object.entries(e.dishes || {})) {
      if (!n?.on || Na(l, e) !== "prepared-food") continue;
      let u = ee(e, l),
        r = Kn(e, l),
        s = `prepared:${l}`,
        o = "serving",
        d = zl(nl(e.shoppingLedger, s), o),
        c = r,
        p = d.canonicalQuantity,
        f = Math.max(0, c - p),
        m = Math.max(0, p - c),
        v = Number(u?.preparedPurchase?.estimatedUnitCost);
      a.push({
        key: s,
        name: u?.title || n.title || l,
        kind: "prepared-food",
        dimension: o,
        quantity: c,
        unit: "serving",
        requiredCanonical: c,
        haveCanonical: 0,
        purchasedCanonical: p,
        remainingCanonical: f,
        surplusCanonical: m,
        required: ae(c, o),
        alreadyHave: ae(0, o),
        purchased: ae(p, o),
        stillNeed: ae(f, o),
        surplus: ae(m, o),
        sources: [
          {
            dishId: l,
            recipeId: u?.id || l,
            recipeTitle: u?.title || n.title || l,
            quantity: r,
            unit: "serving",
            canonicalQuantity: r,
          },
        ],
        estimatedUnitCost: Number.isFinite(v) ? v : null,
        ...ir(d.record),
      });
    }
    for (let l of Fn(e)) {
      let n = `equipment:${l.key}`;
      !l.purchaseable ||
        (!(l.required > l.owned) && !e.shoppingLedger?.[n]) ||
        a.push(
          Vc(e, {
            key: n,
            name: l.name,
            required: l.required,
            owned: l.owned,
            kind: "hosting-supply",
            sources: l.sources,
          }),
        );
    }
    for (let l of Wb(e))
      a.push(
        Vc(e, {
          key: `table:${l.key}`,
          name: l.name,
          required: l.required,
          owned: l.owned,
          kind: "table-supply",
          sources: [{ source: "table" }],
          requirement: l.requirement,
        }),
      );
    for (let l of rt(e).supplies)
      a.push(
        Vc(e, {
          key: `activity:${l.key}`,
          name: l.name,
          required: l.quantity,
          owned: OA(e, l.key),
          kind: "activity-supply",
          sources: l.sources,
          estimatedUnitCost: l.estimatedUnitCost,
        }),
      );
    for (let [l, n] of (e.manualShoppingItems || []).entries())
      a.push(PA(e, n, l));
    return a;
  }
  function _b(e, a, t, l) {
    return {
      ...e,
      pantry: {
        ...(e.pantry || {}),
        [a]: {
          quantity: Math.max(0, Number(t) || 0),
          unit: String(l || "each"),
        },
      },
    };
  }
  function DA(e, a, t, l) {
    let n = String(a).split(":")[0];
    if (!["table", "equipment", "activity"].includes(n)) return _b(e, a, t, l);
    let u = String(a).slice(n.length + 1);
    if (n === "table" && u.startsWith("linen:"))
      throw new Error("Linen ownership requires dimensions");
    return {
      ...e,
      inventory: {
        ...(e.inventory || {}),
        [u]: {
          quantity: Math.max(0, Number(t) || 0),
          unit: String(l || "each"),
        },
      },
    };
  }
  function RA(e, a, t, l, n, u) {
    let r = e.shoppingLedger?.[a] || {},
      s =
        n == null
          ? Math.max(0, Number(r.actualCost) || 0)
          : Math.max(0, Number(n) || 0),
      o =
        u == null
          ? Math.max(0, Number(r.committedCost) || 0)
          : Math.max(0, Number(u) || 0),
      d = Math.max(s, o);
    return {
      ...e,
      shoppingLedger: {
        ...(e.shoppingLedger || {}),
        [a]: {
          ...r,
          quantity: Math.max(0, Number(t) || 0),
          unit: String(l || r.unit || "each"),
          committedCost: d,
          actualCost: s,
        },
      },
    };
  }
  function $b(e, a, t) {
    return Array.from(
      { length: Math.max(0, Math.floor(Number(e) || 0)) },
      (l, n) => ({ id: `${t}-${n + 1}`, type: a, capacitySlots: 1 }),
    );
  }
  function ev(e) {
    let a = [];
    for (let t of e.kitchenResources?.ovens || [])
      a.push({
        ...t,
        type: t.type || "oven",
        capacitySlots: Math.max(1, Number(t.capacitySlots || t.racks) || 1),
      });
    for (let t of e.kitchenResources?.burners || [])
      a.push({
        ...t,
        type: t.type || "burner",
        capacitySlots: Math.max(1, Number(t.capacitySlots) || 1),
      });
    for (let t of e.kitchenResources?.hosts || [])
      a.push({
        ...t,
        type: t.type || "host",
        capacitySlots: Math.max(1, Number(t.capacitySlots) || 1),
      });
    return (
      a.some((t) => t.type === "oven") ||
        a.push(...$b(e.event?.ovens, "oven", "oven")),
      a.some((t) => t.type === "burner") ||
        a.push(...$b(e.event?.burners, "burner", "burner")),
      a.some((t) => t.type === "host") ||
        a.push({
          id: "host-1",
          type: "host",
          capacitySlots: Math.max(
            1,
            1 + Math.floor(Number(e.event?.cookingHelpers) || 0),
          ),
        }),
      a
    );
  }
  var ps = 6e4,
    av = (e, a) => e.start < a.end && a.start < e.end;
  function UA(e) {
    let a = e.event?.dinnerAt,
      t = a ? Date.parse(a) : NaN;
    return Number.isFinite(t) ? t / ps : 0;
  }
  function zA(e) {
    let a = new Map(e.map((r) => [r.taskId, r])),
      t = new Map(e.map((r) => [r.taskId, 0])),
      l = new Map(e.map((r) => [r.taskId, []]));
    for (let r of e)
      for (let s of r.dependsOn || [])
        a.has(s) &&
          (t.set(r.taskId, (t.get(r.taskId) || 0) + 1),
          l.get(s).push(r.taskId));
    let n = [...t].filter(([, r]) => r === 0).map(([r]) => r),
      u = [];
    for (; n.length; ) {
      let r = n.shift();
      u.push(r);
      for (let s of l.get(r) || [])
        (t.set(s, t.get(s) - 1), t.get(s) === 0 && n.push(s));
    }
    return { order: u, cycle: u.length !== e.length, next: l, byId: a };
  }
  function NA(e) {
    let a = [...(e.resourceRequirements || [])];
    return (
      e.handsOn &&
        !a.some((t) => (t.type || t.resourceType) === "host") &&
        a.push({ type: "host", slots: 1 }),
      a
        .map((t) => ({
          ...t,
          type: t.type || t.resourceType,
          slots: Math.max(1, Number(t.slots) || 1),
        }))
        .filter((t) => t.type)
    );
  }
  function HA(e, a, t, l, n) {
    let u = n.filter(
      (s) => s.resourceId === e.id && av({ start: t, end: l }, s),
    );
    if (e.type === "oven" && a.temperatureF != null) {
      for (let s of u)
        if (
          s.temperatureF != null &&
          Number(s.temperatureF) !== Number(a.temperatureF)
        )
          return !1;
    }
    return (
      u.reduce((s, o) => s + (o.slots || 1), 0) + a.slots <= e.capacitySlots
    );
  }
  function EA(e, a, t, l, n, u) {
    if (!e.length) return { start: a, end: t, assignments: [] };
    let r = a,
      s = t;
    for (let o = 0; o < 500; o++) {
      let d = [],
        c = null,
        p = !0;
      for (let f of e) {
        let m = l.filter((C) => C.type === f.type),
          v = null;
        for (let C of m)
          if (HA(C, f, r, s, n)) {
            v = C;
            break;
          }
        if (!v) {
          p = !1;
          for (let C of m)
            for (let k of n.filter(
              (h) => h.resourceId === C.id && av({ start: r, end: s }, h),
            ))
              c = c == null ? k.start : Math.min(c, k.start);
          break;
        }
        d.push({ resourceId: v.id, ...f });
      }
      if (p) return { start: r, end: s, assignments: d };
      if (u || c == null) return null;
      ((s = c), (r = s - (t - a)));
    }
    return null;
  }
  function ms(e) {
    let a = cs(e).filter(
        (p) =>
          p.durationMinutes > 0 ||
          p.fixedStart ||
          p.fixedStartOffsetMinutes != null ||
          p.finishOffsetMinutes != null,
      ),
      t = zA(a),
      l = [],
      n = Ha(e);
    for (let p of n.issues || [])
      p === "turkey-oven-capacity-review"
        ? l.push({
            type: "capacity-review",
            resource: "oven",
            title: "Turkey plan needs multiple oven waves",
            explanation: `${n.birdCount} birds require ${n.ovenWaves} oven waves with ${n.ovenCount} oven${n.ovenCount === 1 ? "" : "s"}.`,
            recommendation:
              "Add oven capacity, use prepared turkey, reduce the bird count, or plan staggered roasting and safe holding.",
          })
        : l.push({ type: p, title: "Turkey plan needs review" });
    for (let [p, f] of Object.entries(e.dishes || {})) {
      if (!f?.on) continue;
      let m = ee(e, p);
      m?.recipeComplete === !1 &&
        l.push({
          type: "recipe-incomplete",
          dishId: p,
          title: m.title,
          reason:
            "Full method, dependencies and resource requirements have not been reviewed",
        });
    }
    t.cycle && l.push({ type: "dependency-cycle" });
    let u = UA(e),
      r = ev(e),
      s = [],
      o = new Map(),
      d = t.next;
    for (let p of [...t.order].reverse()) {
      let f = t.byId.get(p),
        m = Math.max(0, Number(f.durationMinutes) || 0),
        v = (d.get(p) || [])
          .map((M) => o.get(M)?.start)
          .filter(Number.isFinite),
        C = v.length ? Math.min(...v) : u;
      f.finishOffsetMinutes != null &&
        (C = Math.min(C, u + Number(f.finishOffsetMinutes)));
      let k = f.fixedStart ? Date.parse(f.fixedStart) / ps : NaN,
        h =
          f.fixedStartOffsetMinutes != null
            ? u + Number(f.fixedStartOffsetMinutes)
            : NaN,
        g = Number.isFinite(k) ? k : Number.isFinite(h) ? h : null,
        b = g ?? C - m,
        y = (g ?? C - m) + m,
        A = NA(f),
        L = EA(A, b, y, r, s, g != null || f.movableEarlier === !1);
      if (!L) {
        (o.set(p, { ...f, start: b, end: y, assignments: [], conflict: !0 }),
          l.push({ type: "resource-conflict", taskId: p, requirements: A }));
        continue;
      }
      ((b = L.start), (y = L.end));
      let x = v.length ? Math.min(...v) : 1 / 0;
      y > x &&
        l.push({ type: "dependency-conflict", taskId: p, latestAllowedEnd: x });
      let I = {
        ...f,
        start: b,
        end: y,
        assignments: L.assignments,
        conflict: !1,
      };
      o.set(p, I);
      for (let M of L.assignments)
        s.push({
          resourceId: M.resourceId,
          start: b,
          end: y,
          slots: M.slots,
          temperatureF: M.temperatureF,
          taskId: p,
        });
    }
    let c = [...o.values()]
      .sort((p, f) => p.start - f.start)
      .map((p) => ({
        ...p,
        startOffsetMinutes: p.start - u,
        endOffsetMinutes: p.end - u,
        startAt: e.event?.dinnerAt
          ? new Date(p.start * ps).toISOString()
          : null,
        endAt: e.event?.dinnerAt ? new Date(p.end * ps).toISOString() : null,
      }));
    return {
      anchorAt: e.event?.dinnerAt || null,
      tasks: c,
      issues: l,
      resources: r,
    };
  }
  function tv(e) {
    let a = new Set(),
      t = [];
    for (let [u, r] of Object.entries(e.dishes || {})) {
      if (!r?.on) continue;
      let s = ee(e, u);
      (s?.mealRole && a.add(s.mealRole),
        (!s || s.recipeComplete === !1) &&
          t.push({ dishId: u, title: s?.title || u }));
    }
    let l = e.planning?.requiredMenuRoles || [],
      n = l.filter((u) => !a.has(u));
    return {
      present: [...a],
      missing: n,
      structureComplete: n.length === 0,
      recipeReady: t.length === 0,
      incompleteRecipes: t,
      complete: n.length === 0 && t.length === 0,
    };
  }
  function KA(e, a) {
    if (e.metadataReviewed !== !0) return "unknown";
    let t = String(a).toLowerCase();
    return e.dietaryTags.includes(t) ? "safe" : "unsafe";
  }
  function GA(e, a) {
    if (e.metadataReviewed !== !0) return "unknown";
    let t = String(a).toLowerCase();
    return e.allergens.includes(t)
      ? "unsafe"
      : e.allergenReviewed === !0
        ? "safe"
        : "unknown";
  }
  function lv(e) {
    let a = lr(e),
      t = e.planning?.dietaryRequiredRoles || ["main"],
      l = Object.entries(e.dishes || {})
        .filter(([, u]) => u?.on)
        .map(([u]) => ({ dishId: u, recipe: ee(e, u) }))
        .filter((u) => u.recipe),
      n = [];
    for (let u of a)
      for (let r of t) {
        let s = l.filter((c) => c.recipe.mealRole === r);
        if (!s.length) {
          n.push({
            personId: u.personId,
            name: u.name,
            role: r,
            status: "missing",
            reason: "no-role-option",
          });
          continue;
        }
        let o = !1,
          d = !1;
        for (let { recipe: c } of s) {
          let p = "safe";
          for (let f of u.dietaryRestrictions) {
            let m = KA(c, f);
            if (m === "unsafe") {
              p = "unsafe";
              break;
            }
            m === "unknown" && (p = "unknown");
          }
          if (p !== "unsafe")
            for (let f of u.allergies) {
              let m = GA(c, f);
              if (m === "unsafe") {
                p = "unsafe";
                break;
              }
              m === "unknown" && (p = "unknown");
            }
          if (p === "safe") {
            o = !0;
            break;
          }
          p === "unknown" && (d = !0);
        }
        o ||
          n.push({
            personId: u.personId,
            name: u.name,
            role: r,
            status: d ? "unresolved" : "missing",
            reason: d ? "recipe-metadata-unreviewed" : "no-compatible-option",
          });
      }
    return { peopleEvaluated: a.length, gaps: n, covered: n.length === 0 };
  }
  var jc = {};
  Oa(jc, {
    assignSeat: () => FA,
    deriveSeatingPlan: () => sr,
    seatIds: () => gs,
    swapSeats: () => VA,
    unassignPerson: () => QA,
  });
  function gs(e) {
    let a = [];
    for (let [t, l] of (e.tables || []).entries()) {
      let n = Qn(l, t);
      if (n.use === "dining")
        for (let u = 1; u <= n.seatCapacity; u++) a.push(`${n.id}:seat:${u}`);
    }
    return a;
  }
  function sr(e) {
    let a = new Set(gs(e)),
      t = lr(e),
      l = new Set(t.map((d) => d.personId)),
      n = new Set(),
      u = {},
      r = [];
    for (let [d, c] of Object.entries(e.seats || {})) {
      if (!a.has(d) || !l.has(c) || n.has(c)) {
        l.has(c) && r.push(c);
        continue;
      }
      ((u[d] = c), n.add(c));
    }
    let s = t.filter((d) => !n.has(d.personId)),
      o = la(e);
    return {
      seatIds: [...a],
      assignments: u,
      unassigned: s,
      displaced: [...new Set(r)],
      namedPeople: t,
      placeholderCount: Math.max(0, o.planningHeadcount - t.length),
      availableSeatCount: a.size,
      openSeatCount: Math.max(0, a.size - Object.keys(u).length),
    };
  }
  function FA(e, a, t) {
    if (!gs(e).includes(t)) throw new Error("Unknown seat");
    if (!new Set(lr(e).map((r) => r.personId)).has(a))
      throw new Error("Unknown person");
    let u = { ...(e.seats || {}) };
    for (let [r, s] of Object.entries(u)) (s === a || r === t) && delete u[r];
    return ((u[t] = a), { ...e, seats: u });
  }
  function QA(e, a) {
    let t = { ...(e.seats || {}) };
    for (let [l, n] of Object.entries(t)) n === a && delete t[l];
    return { ...e, seats: t };
  }
  function VA(e, a, t) {
    let l = gs(e);
    if (!l.includes(a) || !l.includes(t)) throw new Error("Unknown seat");
    let n = { ...(e.seats || {}) },
      u = n[a],
      r = n[t];
    return (
      r ? (n[a] = r) : delete n[a],
      u ? (n[t] = u) : delete n[t],
      { ...e, seats: n }
    );
  }
  function ZA(e) {
    return e.shape === "round"
      ? { w: e.diameterIn, h: e.diameterIn }
      : { w: e.lengthIn, h: e.widthIn };
  }
  function jA(e) {
    let a = ZA(e);
    return !a.w ||
      !a.h ||
      !Number.isFinite(Number(e.xIn)) ||
      !Number.isFinite(Number(e.yIn))
      ? null
      : { id: e.id, x: Number(e.xIn), y: Number(e.yIn), w: a.w, h: a.h };
  }
  function nv(e) {
    let a = Gn(e),
      t = rt(e),
      l = (e.tables || []).map(Qn),
      n = { ...(e.spaceZones || {}) },
      u = new Set([...a.requiredZones, ...t.zones]);
    for (let m of u)
      n[m] ||
        (n[m] = {
          id: m,
          label: m.replace(/-/g, " "),
          status: m === "dining" ? "implicit" : "missing",
        });
    let r = new Set(Object.keys(e.spaceZones || {}));
    for (let m of l) m.use && r.add(m.use);
    let s = [...u].filter((m) => m !== "dining" && !r.has(m)),
      o = Math.max(0, Number(e.room?.widthIn) || 0),
      d = Math.max(0, Number(e.room?.lengthIn) || 0),
      c = o > 0 && d > 0,
      p = l.map(jA).filter(Boolean),
      f = [];
    if (c) {
      for (let m of p)
        (m.x < 0 || m.y < 0 || m.x + m.w > o || m.y + m.h > d) &&
          f.push({ type: "outside-room", id: m.id });
      for (let m = 0; m < p.length; m++)
        for (let v = m + 1; v < p.length; v++) {
          let C = p[m],
            k = p[v];
          C.x < k.x + k.w &&
            C.x + C.w > k.x &&
            C.y < k.y + k.h &&
            C.y + C.h > k.y &&
            f.push({ type: "table-overlap", ids: [C.id, k.id] });
        }
    }
    return {
      measurementStatus: c ? "measured" : "approximate",
      room: { widthIn: o, lengthIn: d },
      tables: l,
      zones: Object.values(n),
      missingZones: s,
      issues: f,
    };
  }
  function Fe(e) {
    return Math.max(0, Number(e) || 0);
  }
  function hs(e) {
    return e != null && e !== "" && Number.isFinite(Number(e))
      ? Number(e)
      : null;
  }
  function uv(e, a) {
    let t = hs(e.packageCanonicalQuantity),
      l = hs(e.estimatedPackagePrice);
    return t === null || t <= 0 || l === null
      ? null
      : Math.ceil(Math.max(0, a) / t) * l;
  }
  function rv(e) {
    let a = [],
      t = 0;
    for (let o of Nl(e)) {
      let d = e.costCatalog?.[o.key] || {},
        c = hs(d.unitCost ?? o.estimatedUnitCost),
        p = hs(d.estimatedTotal),
        f = Fe(o.actualCost),
        m = Math.max(f, Fe(o.committedCost)),
        v = Fe(o.requiredCanonical),
        C = Fe(o.haveCanonical),
        k = Fe(o.purchasedCanonical),
        h = Fe(o.remainingCanonical),
        g = Fe(o.required?.quantity ?? o.quantity),
        b = Fe(o.stillNeed?.quantity),
        y = Fe(o.purchased?.quantity),
        A = Math.max(0, v - C),
        L = uv(o, A),
        x = uv(o, h),
        I = p !== null || L !== null || c !== null,
        M = p !== null ? Fe(p) : L !== null ? Fe(L) : c !== null ? g * c : 0,
        q = f > 0 ? f : m > 0 ? m : c !== null ? y * c : 0,
        J = x !== null ? Fe(x) : c !== null ? b * c : Math.max(0, M - q),
        Be = h > 0 || (k > 0 && !m && !f),
        Ne = !I && Be;
      (Ne && t++,
        a.push({
          id: `shopping:${o.key}`,
          category: o.kind || "shopping",
          label: o.name || o.key,
          estimated: M,
          committed: m,
          actual: f,
          remainingEstimate: J,
          forecast: q + J,
          sourceKey: o.key,
          unknownPrice: Ne,
          priceSource: d.priceSource || o.priceSource || null,
          priceUpdatedAt: d.priceUpdatedAt || o.priceUpdatedAt || null,
        }));
    }
    for (let o of e.budgetEntries || []) {
      let d = Fe(o.estimated),
        c = Fe(o.actual),
        p = Math.max(c, Fe(o.committed)),
        f = Math.max(0, d - p),
        m = c > 0 ? Math.max(c, p) + f : p > 0 ? p + f : d;
      a.push({
        ...o,
        id: String(o.id || `manual:${a.length}`),
        category: o.category || "other",
        estimated: d,
        committed: p,
        actual: c,
        remainingEstimate: f,
        forecast: m,
        unknownPrice: !1,
      });
    }
    let l = a.reduce((o, d) => o + d.estimated, 0),
      n = a.reduce((o, d) => o + d.committed, 0),
      u = a.reduce((o, d) => o + d.actual, 0),
      r = a.reduce((o, d) => o + d.forecast, 0),
      s = Fe(e.event?.budget);
    return {
      target: s,
      totalEstimated: l,
      totalCommitted: n,
      totalActual: u,
      projectedFinal: r,
      projectedComplete: t === 0,
      remainingToTarget: s ? s - r : null,
      incompletePriceLines: t,
      lines: a,
    };
  }
  var Jc = {};
  Oa(Jc, {
    generatePrintableBundle: () => Yc,
    markPrintableGenerated: () => WA,
    printableStatus: () => XA,
    renderPrintableHtml: () => $A,
  });
  function V(e) {
    let a = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt",
      '"': "&quot;",
      "'": "&#39;",
    };
    return String(e ?? "").replace(/[&<>"']/g, (t) => a[t]);
  }
  function YA(e) {
    return Object.entries(e.dishes || {})
      .filter(([, a]) => a?.on)
      .map(([a]) => {
        let t = ee(e, a);
        return t
          ? {
              id: a,
              title: t.title,
              role: t.mealRole || "",
              dietaryTags: t.dietaryTags || [],
              allergens: t.allergens || [],
              metadataReviewed: t.metadataReviewed === !0,
              allergenReviewed: t.allergenReviewed === !0,
            }
          : null;
      })
      .filter(Boolean);
  }
  function JA(e) {
    return Object.entries(e.dishes || {})
      .filter(([, a]) => a?.on)
      .map(([a]) => {
        let t = ee(e, a);
        return !t || t.recipeComplete !== !0
          ? null
          : {
              dishId: a,
              title: t.title,
              servings: t.baseServings,
              ingredients: t.ingredients.map((l) => ({
                name: l.name,
                quantity: l.quantity,
                unit: l.unit,
              })),
              instructions: t.instructions || [],
              makeAhead: t.makeAhead || "",
              storage: t.storage || "",
              reheat: t.reheat || "",
            };
      })
      .filter(Boolean);
  }
  function Yc(e) {
    let a = sr(e),
      t = Nl(e),
      l = ms(e),
      n = rt(e),
      u = YA(e),
      r = Fn(e),
      s = new Map(Object.entries(a.assignments).map(([v, C]) => [C, v])),
      o = a.namedPeople.map((v) => ({
        seatId: s.get(v.personId) || null,
        personId: v.personId,
        name: v.name,
      })),
      d = o.filter((v) => v.seatId),
      c = u.filter((v) =>
        ["alcohol", "non-alcoholic-drink", "coffee"].includes(v.role),
      ),
      p = JA(e),
      f = u.map((v) => {
        let C = ee(e, v.id);
        return {
          dishId: v.id,
          title: v.title,
          vessels: (C?.servingRequirements || []).map((k) => k.name || k.id),
          equipment: (C?.equipment || []).map((k) => k.name || k.id),
          makeAhead: C?.makeAhead || "",
        };
      }),
      m = {
        menu: {
          type: "menu",
          title: "Thanksgiving Menu",
          rows: u.map((v) => ({ title: v.title, role: v.role })),
        },
        "place-cards": { type: "place-cards", title: "Place Cards", rows: o },
        "seating-chart": {
          type: "seating-chart",
          title: "Seating Chart",
          rows: d,
        },
        "food-labels": {
          type: "food-labels",
          title: "Food Labels",
          rows: u.map((v) => ({
            title: v.title,
            dietaryTags: v.metadataReviewed ? v.dietaryTags : [],
            allergens: v.allergenReviewed ? v.allergens : [],
            status:
              v.metadataReviewed && v.allergenReviewed
                ? "reviewed"
                : [
                    !v.metadataReviewed && "dietary review required",
                    !v.allergenReviewed && "allergen review required",
                  ]
                    .filter(Boolean)
                    .join("; "),
          })),
        },
        "shopping-checklist": {
          type: "shopping-checklist",
          title: "Shopping Checklist",
          rows: t
            .filter(
              (v) => (v.remainingCanonical ?? v.stillNeed?.quantity ?? 0) > 0,
            )
            .map((v) => ({
              name: v.name,
              quantity: v.purchaseRecommendation ||
                v.stillNeed || { quantity: v.quantity, unit: v.unit },
              kind: v.kind,
              category: v.category || null,
            })),
        },
        "kitchen-timeline": {
          type: "kitchen-timeline",
          title: "Kitchen Timeline",
          rows: l.tasks.map((v) => ({
            title: v.title,
            startAt: v.startAt,
            startOffsetMinutes: v.startOffsetMinutes,
            owner: v.owner || "host",
            conflict: !!v.conflict,
          })),
        },
        "recipe-cards": {
          type: "recipe-cards",
          title: "Recipe Cards",
          rows: p,
        },
        "kitchen-staging": {
          type: "kitchen-staging",
          title: "Kitchen Staging Sheet",
          rows: f,
        },
        "drinks-card": {
          type: "drinks-card",
          title: "Drinks + Bar Card",
          rows: c.map((v) => ({ title: v.title, role: v.role })),
        },
        "leftover-labels": {
          type: "leftover-labels",
          title: "Leftover Labels",
          rows: u
            .filter(
              (v) =>
                !["alcohol", "non-alcoholic-drink", "coffee"].includes(v.role),
            )
            .map((v) => ({
              title: v.title,
              packedAt: "Write packed time",
              refrigerate: "Refrigerate promptly",
            })),
        },
      };
    for (let v of n.printables) {
      let C = e.activities?.[v.activityId] || {};
      m[v.id] = {
        type: v.type,
        title: String(C.title || v.type).replace(/-/g, " "),
        rows: [
          {
            title: C.title || v.type,
            description: C.description || "",
            instructions: C.instructions || C.content || "",
          },
        ],
        activityId: v.activityId,
        ready: !!(C.title || C.description),
      };
    }
    return { revision: Math.max(0, Number(e.revision) || 0), printables: m };
  }
  function XA(e, a) {
    let t = e.printableOverrides?.[a];
    return {
      generated: !!t?.generatedAt,
      stale: !!(
        t?.generatedAt &&
        Number(t.generatedRevision) !== Number(e.revision || 0)
      ),
      generatedRevision: t?.generatedRevision ?? null,
      currentRevision: Number(e.revision) || 0,
    };
  }
  function WA(e, a) {
    return {
      ...e,
      printableOverrides: {
        ...(e.printableOverrides || {}),
        [a]: {
          ...(e.printableOverrides?.[a] || {}),
          generatedAt: new Date().toISOString(),
          generatedRevision: Number(e.revision) || 0,
        },
      },
    };
  }
  function _A(e, a) {
    if (e === "menu" || e === "drinks-card")
      return `<div class="row"><b>${V(a.title)}</b><span>${V(a.role || "")}</span></div>`;
    if (e === "place-cards" || e === "seating-chart")
      return `<div class="row"><b>${V(a.name)}</b><span>${V(a.seatId)}</span></div>`;
    if (e === "food-labels") {
      let t = (a.dietaryTags || []).join(", "),
        l = (a.allergens || []).join(", ");
      return `<div class="row"><b>${V(a.title)}</b><span>${V(a.status)}${t ? ` \xB7 ${V(t)}` : ""}${l ? ` \xB7 allergens: ${V(l)}` : ""}</span></div>`;
    }
    if (e === "shopping-checklist")
      return `<div class="row"><b>${V(a.name)}</b><span>${V(a.quantity?.quantity)} ${V(a.quantity?.unit || "")}</span></div>`;
    if (e === "kitchen-timeline") {
      let t = a.startAt
        ? new Date(a.startAt).toLocaleString()
        : `${a.startOffsetMinutes} min from dinner`;
      return `<div class="row ${a.conflict ? "warn" : ""}"><b>${V(a.title)}</b><span>${V(t)} \xB7 ${V(a.owner || "host")}</span></div>`;
    }
    return e === "recipe-cards"
      ? `<section class="recipe"><h2>${V(a.title)}</h2><p class="meta">Base yield: ${V(a.servings)}</p><h3>Ingredients</h3><ul>${(a.ingredients || []).map((t) => `<li>${V(t.quantity)} ${V(t.unit)} \xB7 ${V(t.name)}</li>`).join("")}</ul><h3>Method</h3><ol>${(a.instructions || []).map((t) => `<li>${V(t)}</li>`).join("")}</ol>${a.makeAhead ? `<p><b>Make ahead:</b> ${V(a.makeAhead)}</p>` : ""}${a.storage ? `<p><b>Storage:</b> ${V(a.storage)}</p>` : ""}${a.reheat ? `<p><b>Reheat:</b> ${V(a.reheat)}</p>` : ""}</section>`
      : e === "kitchen-staging"
        ? `<div class="stack"><b>${V(a.title)}</b><span>Serving: ${V((a.vessels || []).join(", ") || "review")}</span><span>Equipment: ${V((a.equipment || []).join(", ") || "none")}</span><small>${V(a.makeAhead || "")}</small></div>`
        : e === "leftover-labels"
          ? `<div class="label"><b>${V(a.title)}</b><span>${V(a.packedAt)}</span><small>${V(a.refrigerate)}</small></div>`
          : `<div class="row"><b>${V(a.name || a.title || "")}</b><span>${V(a.description || a.instructions || "")}</span></div>`;
  }
  function $A(e) {
    let a = (e.rows || []).map((t) => _A(e.type, t)).join("");
    return `<!doctype html><html><head><meta charset="utf-8"><title>${V(e.title)}</title><style>@page{margin:.55in}*{box-sizing:border-box}body{font-family:Arial,Helvetica,sans-serif;margin:0;color:#11110f;background:#fff;font-size:11pt}header{border-bottom:1px solid #111;padding-bottom:16px;margin-bottom:24px}.brand{font-size:9pt;letter-spacing:.24em}h1{font-size:28pt;font-weight:300;margin:10px 0 0}h2{font-size:17pt;font-weight:500}h3{font-size:9pt;text-transform:uppercase;letter-spacing:.12em}.row,.stack{display:flex;justify-content:space-between;gap:20px;padding:10px 0;border-bottom:1px solid #d7d7d2}.stack{flex-direction:column;gap:4px}.row span{color:#555;text-align:right}.warn{border-left:3px solid #111;padding-left:10px}.recipe{break-inside:avoid;border-top:1px solid #111;padding:18px 0;margin-bottom:20px}.recipe li{margin:0 0 6px}.meta,small{color:#666}.label{display:inline-flex;vertical-align:top;flex-direction:column;width:48%;min-height:120px;border:1px solid #111;padding:16px;margin:0 1% 12px 0}.label b{font-size:16pt;margin-bottom:18px}@media print{body{margin:0}}</style></head><body><header><div class="brand">CROW &amp; CROWN \xB7 THE THANKSGIVING EDIT</div><h1>${V(e.title)}</h1></header>${a || "<p>No live entries yet.</p>"}</body></html>`;
  }
  function eL(e) {
    let a = Yc(e);
    return {
      planning: la(e),
      service: Gn(e),
      menu: tv(e),
      dietaryCoverage: lv(e),
      turkey: Ha(e),
      ingredients: ur(e),
      shopping: Nl(e),
      equipment: Fn(e),
      prep: cs(e),
      timeline: ms(e),
      table: Qc(e),
      seating: sr(e),
      space: nv(e),
      experience: rt(e),
      budget: rv(e),
      printables: { revision: a.revision, types: Object.keys(a.printables) },
    };
  }
  var _c = {};
  Oa(_c, {
    DEFAULT_STORAGE_KEY: () => Wc,
    backupState: () => cL,
    browserStorage: () => pL,
    duplicateForNewEvent: () => gL,
    loadState: () => iv,
    memoryStorage: () => mL,
    migrateState: () => Zn,
    restoreBackup: () => fL,
    saveState: () => dL,
  });
  var Wc = "crow-crown-thanksgiving:event",
    aL = new Set(["estimated", "expected", "confirmed", "custom"]),
    tL = new Set(["yes", "no", "pending"]),
    Se = (e) => (e && typeof e == "object" && !Array.isArray(e) ? e : {}),
    Ea = (e) => (Array.isArray(e) ? e : []),
    Vn = (e, a = 0) => (Number.isFinite(Number(e)) ? Number(e) : a);
  function lL(e) {
    let a = { ...e };
    return (
      a.event?.guests != null &&
        !a.planning &&
        (a.planning = {
          mode: "estimated",
          estimatedHeadcount: Vn(a.event.guests, 12),
        }),
      { ...a, schemaVersion: 2 }
    );
  }
  function nL(e) {
    let a = { ...e };
    return (
      a.menu && !a.dishes && (a.dishes = a.menu),
      a.shopping && !a.shoppingLedger && (a.shoppingLedger = a.shopping),
      { ...a, schemaVersion: 3 }
    );
  }
  function uL(e) {
    let a = { ...e };
    return (
      a.event?.dinnerTime &&
        !a.event?.dinnerAt &&
        (a.event = { ...a.event, dinnerAt: a.event.dinnerTime }),
      { ...a, schemaVersion: 4 }
    );
  }
  function rL(e) {
    return { ...e, housePrep: Se(e.housePrep), schemaVersion: 5 };
  }
  var iL = { 1: lL, 2: nL, 3: uL, 4: rL };
  function sL(e, a) {
    let t = Se(e),
      l = tL.has(t.rsvp) ? t.rsvp : "pending";
    return {
      ...t,
      guestId: String(t.guestId || t.id || `guest-${a + 1}`),
      name: String(t.name || "Guest"),
      type: t.type === "child" ? "child" : "adult",
      rsvp: l,
      dietaryRestrictions: Ea(t.dietaryRestrictions),
      allergies: Ea(t.allergies),
      kids: Math.max(0, Math.floor(Vn(t.kids))),
      highChairs: Math.max(0, Math.floor(Vn(t.highChairs))),
    };
  }
  function oL(e) {
    let a = Mc(Se(e));
    ((a.planning = {
      ...a.planning,
      mode: aL.has(a.planning?.mode) ? a.planning.mode : "estimated",
    }),
      (a.guests = Ea(a.guests).map(sL)),
      (a.recipes = Se(a.recipes)),
      (a.dishes = Se(a.dishes)),
      (a.menuResponsibilities = Se(a.menuResponsibilities)),
      (a.shoppingLedger = Se(a.shoppingLedger)),
      (a.pantry = Se(a.pantry)),
      (a.costCatalog = Se(a.costCatalog)),
      (a.manualShoppingItems = Ea(a.manualShoppingItems)),
      (a.manualTasks = Ea(a.manualTasks)),
      (a.tables = Ea(a.tables)),
      (a.seats = Se(a.seats)),
      (a.inventory = Se(a.inventory)),
      (a.room = Se(a.room)),
      (a.spaceZones = Se(a.spaceZones)),
      (a.activities = Se(a.activities)),
      (a.selectedActivities = Se(a.selectedActivities)),
      (a.taskOverrides = Se(a.taskOverrides)),
      (a.budgetEntries = Ea(a.budgetEntries)),
      (a.actualSpendEntries = Ea(a.actualSpendEntries)),
      (a.printableOverrides = Se(a.printableOverrides)),
      (a.housePrep = { enabled: a.housePrep?.enabled !== !1 }),
      (a.kitchenResources = {
        ...Se(a.kitchenResources),
        ovens: Ea(a.kitchenResources?.ovens),
        burners: Ea(a.kitchenResources?.burners),
        hosts: Ea(a.kitchenResources?.hosts),
      }));
    for (let t of [
      "estimatedHeadcount",
      "estimatedChildren",
      "estimatedAdultDrinkers",
      "customHeadcount",
      "customChildren",
      "customAdultDrinkers",
    ])
      a.planning[t] = Math.max(0, Vn(a.planning[t]));
    return (
      (a.schemaVersion = 5),
      (a.revision = Math.max(0, Vn(e?.revision, a.revision))),
      a
    );
  }
  function Zn(e) {
    let a = e?.state && e.schemaVersion != null ? e.state : e || {},
      t = structuredClone(Se(a)),
      l = Math.max(1, Math.floor(Vn(e?.schemaVersion ?? t.schemaVersion, 1)));
    for (; l < 5; ) {
      let n = iL[l];
      ((t = n ? n(t) : { ...t, schemaVersion: l + 1 }), l++);
    }
    return oL(t);
  }
  function iv(e, a = Wc) {
    let t = e?.getItem?.(a);
    if (!t) return null;
    try {
      return Zn(JSON.parse(t));
    } catch {
      return null;
    }
  }
  function dL(
    e,
    a,
    { key: t = Wc, expectedRevision: l = null, bumpRevision: n = !0 } = {},
  ) {
    let u = iv(e, t);
    if (l != null && u && Number(u.revision) !== Number(l))
      return { ok: !1, conflict: !0, current: u };
    let r = n
        ? Math.max(Number(u?.revision) || 0, Number(a.revision) || 0) + 1
        : Math.max(Number(u?.revision) || 0, Number(a.revision) || 0),
      s = { ...Zn(a), revision: r, savedAt: new Date().toISOString() };
    return (e.setItem(t, JSON.stringify(s)), { ok: !0, state: s });
  }
  function cL(e) {
    return JSON.stringify(
      {
        format: "crow-crown-thanksgiving-backup",
        schemaVersion: 5,
        exportedAt: new Date().toISOString(),
        state: Zn(e),
      },
      null,
      2,
    );
  }
  function fL(e) {
    let a = typeof e == "string" ? JSON.parse(e) : e;
    if (a?.format !== "crow-crown-thanksgiving-backup" && !a?.state)
      throw new Error("Invalid backup");
    return Zn(a.state || a);
  }
  function pL() {
    return typeof localStorage < "u" ? localStorage : null;
  }
  function mL(e = {}) {
    let a = new Map(Object.entries(e));
    return {
      getItem: (t) => (a.has(t) ? a.get(t) : null),
      setItem: (t, l) => a.set(t, String(l)),
      removeItem: (t) => a.delete(t),
    };
  }
  function gL(
    e,
    { name: a = e.event?.name || "Thanksgiving", dinnerAt: t = null } = {},
  ) {
    let l = Zn(e);
    return {
      ...l,
      revision: 0,
      event: { ...l.event, name: a, dinnerAt: t },
      guests: (l.guests || []).map((n) => ({ ...n, rsvp: "pending" })),
      seats: {},
      shoppingLedger: {},
      taskOverrides: {},
      manualTasks: (l.manualTasks || []).map((n) => ({ ...n, completed: !1 })),
      actualSpendEntries: [],
      printableOverrides: {},
    };
  }
  var ef = {};
  Oa(ef, {
    ORIGINAL_CATALOG: () => dv,
    SIGNATURE_MENU: () => cv,
    SUPPORTED_SIGNATURE_IDS: () => ov,
    catalogRecipe: () => $c,
    withCatalog: () => fv,
    withSignatureMenu: () => LL,
  });
  var hL = "2026-09-29",
    bL = "2026-09-29",
    B = (e, a, t, l, n, u, r, s, o = {}) => ({
      ingredientId: e,
      name: a,
      quantity: t,
      unit: l,
      category: n,
      packageQuantity: u,
      packageUnit: r,
      estimatedPackagePrice: s,
      priceSource: "Crow & Crown planning estimate",
      priceUpdatedAt: bL,
      ...o,
    }),
    U = (e, a, t = 1, l = "equipment", n = {}) => ({
      id: e,
      name: a,
      quantity: t,
      kind: l,
      ...n,
    }),
    E = (e, a, t, l, n = {}) => ({
      id: e,
      title: a,
      phase: t,
      durationMinutes: l,
      ...n,
    }),
    ul = (e = {}) => ({
      metadataReviewed: !0,
      allergenReviewed: !0,
      reviewedAt: hL,
      recipeComplete: !0,
      provenance: {
        type: "publisher",
        publisher: "Bon App\xE9tit",
        label:
          "Bon App\xE9tit recipe selected for the Crow & Crown Thanksgiving menu",
      },
      ...e,
    }),
    sv = {
      "ba-dry-turkey": {
        id: "ba-dry-turkey",
        title: "Dry-Brined Turkey With Tangy Honey Glaze",
        mealRole: "main",
        baseServings: 9,
        servingStrategy: { basis: "headcount" },
        batchCapacityServings: 10,
        parallelBatchCapacity: 1,
        description:
          "Bon App\xE9tit dry-brined roast turkey finished with a tangy honey glaze.",
        ingredients: [
          B("kosher-salt", "Kosher salt", 0.5, "cup", "Pantry", 3, "cup", 6.49),
          B(
            "brown-sugar",
            "Light brown sugar",
            1,
            "tbsp",
            "Pantry",
            4,
            "cup",
            3.99,
          ),
          B("whole-turkey", "Whole turkey", 13, "lb", "Meat", 13, "lb", 32),
          B(
            "butter-unsalted",
            "Unsalted butter",
            12,
            "tbsp",
            "Dairy",
            1,
            "lb",
            5.99,
          ),
          B(
            "sherry-vinegar",
            "Sherry or red wine vinegar",
            0.25,
            "cup",
            "Pantry",
            16,
            "floz",
            6.99,
          ),
          B("honey", "Honey", 2, "tbsp", "Pantry", 12, "oz", 5.99),
          B(
            "worcestershire",
            "Worcestershire sauce",
            4,
            "tsp",
            "Pantry",
            10,
            "floz",
            4.49,
          ),
          B(
            "fresh-rosemary",
            "Fresh rosemary",
            3,
            "each",
            "Produce",
            1,
            "bunch",
            2.49,
          ),
          B("garlic", "Garlic cloves", 3, "each", "Produce", 3, "head", 2.49),
          B("orange", "Orange", 1, "each", "Produce", 4, "each", 5.49),
        ],
        instructions: [
          "Combine the salt and brown sugar and dry-brine the turkey all over; refrigerate uncovered for at least 12 hours and up to 2 days.",
          "Before roasting, let the turkey lose its refrigerator chill, then butter beneath and over the breast skin.",
          "Begin roasting at high heat to brown the skin, then lower the oven temperature for the remainder of the cook.",
          "Simmer vinegar, honey, Worcestershire, rosemary, garlic, orange zest and butter into the glaze.",
          "Brush with glaze during the lower-temperature roast and continue until the turkey reaches the recipe target temperature.",
          "Rest the turkey for at least 30 minutes before carving.",
        ],
        prepTasks: [
          E("dry-brine", "Dry-brine turkey", "days-ahead", 20, {
            handsOn: !0,
            fixedStartOffsetMinutes: -2880,
          }),
          E(
            "temper",
            "Bring turkey toward room temperature",
            "before-guests",
            150,
            { dependsOn: ["dry-brine"], handsOn: !1 },
          ),
          E("butter", "Butter and prepare turkey for roasting", "cook", 15, {
            dependsOn: ["temper"],
            handsOn: !0,
          }),
          E("high-roast", "Initial high-heat roast", "cook", 30, {
            dependsOn: ["butter"],
            resourceRequirements: [
              { type: "oven", temperatureF: 450, slots: 1 },
            ],
          }),
          E("glaze", "Make tangy honey glaze", "cook", 10, {
            dependsOn: ["butter"],
            handsOn: !0,
            resourceRequirements: [{ type: "burner", slots: 1 }],
          }),
          E("low-roast", "Lower-temperature roast + glaze", "cook", 85, {
            dependsOn: ["high-roast", "glaze"],
            resourceRequirements: [
              { type: "oven", temperatureF: 300, slots: 1 },
            ],
          }),
          E("rest", "Rest turkey", "hold", 30, {
            dependsOn: ["low-roast"],
            handsOn: !1,
          }),
          E("carve", "Carve turkey", "serve", 15, {
            dependsOn: ["rest"],
            handsOn: !0,
            finishOffsetMinutes: -5,
          }),
        ],
        makeAhead: "Dry-brine 12\u201348 hours ahead.",
        storage:
          "Keep raw turkey refrigerated until the tempering period; refrigerate leftovers promptly.",
        reheat: "Reheat carved leftovers until steaming hot.",
        equipment: [
          U("wire-rack", "Wire rack"),
          U("rimmed-sheet", "Rimmed baking sheet"),
          U("small-saucepan", "Small saucepan"),
          U("food-thermometer", "Instant-read thermometer"),
          U("carving-knife", "Carving knife"),
        ],
        servingRequirements: [
          U("turkey-platter", "Large turkey platter", 1, "serving"),
          U("carving-set", "Carving set", 1, "serving"),
        ],
        dietaryTags: ["nut-free", "egg-free", "sesame-free"],
        allergens: ["milk", "fish"],
        sourceUrl: "https://www.bonappetit.com/recipe/dry-rubbed-roast-turkey",
        sourceRating: "4.6 \xB7 135 ratings",
        preparedPurchase: { estimatedUnitCost: 12 },
        isTurkey: !0,
        turkeyRules: {
          poundsPerPerson: 1.35,
          thawHoursPerPound: 6,
          maxBirdWeightLb: 14,
          minBirdWeightLb: 12,
          restMinutes: 30,
          ovenTemperatureF: 300,
        },
        ...ul(),
      },
      "ba-simple-stuffing": {
        id: "ba-simple-stuffing",
        title: "Simple-Is-Best Stuffing",
        mealRole: "starch",
        baseServings: 9,
        servingStrategy: { basis: "headcount", factor: 0.85 },
        batchCapacityServings: 10,
        parallelBatchCapacity: 2,
        description:
          "Bon App\xE9tit classic herb stuffing with crisp top and tender center.",
        ingredients: [
          B(
            "butter-unsalted",
            "Unsalted butter",
            0.75,
            "cup",
            "Dairy",
            1,
            "lb",
            5.99,
          ),
          B(
            "white-bread",
            "Day-old white bread",
            1,
            "lb",
            "Bakery",
            1,
            "lb",
            5.99,
          ),
          B(
            "yellow-onion",
            "Yellow onions, chopped",
            2.5,
            "cup",
            "Produce",
            3,
            "each",
            4.99,
          ),
          B(
            "celery",
            "Celery, sliced",
            1.5,
            "cup",
            "Produce",
            1,
            "bunch",
            2.99,
          ),
          B(
            "fresh-parsley",
            "Flat-leaf parsley",
            0.5,
            "cup",
            "Produce",
            1,
            "bunch",
            1.99,
          ),
          B("fresh-sage", "Fresh sage", 2, "tbsp", "Produce", 1, "bunch", 2.49),
          B(
            "fresh-rosemary",
            "Fresh rosemary",
            1,
            "tbsp",
            "Produce",
            1,
            "bunch",
            2.49,
          ),
          B(
            "fresh-thyme",
            "Fresh thyme",
            1,
            "tbsp",
            "Produce",
            1,
            "bunch",
            2.49,
          ),
          B("kosher-salt", "Kosher salt", 2, "tsp", "Pantry", 3, "cup", 6.49),
          B(
            "black-pepper",
            "Black pepper",
            1,
            "tsp",
            "Pantry",
            12,
            "tbsp",
            5.49,
          ),
          B(
            "chicken-stock",
            "Low-sodium chicken broth",
            2.5,
            "cup",
            "Pantry",
            32,
            "floz",
            4.49,
          ),
          B(
            "eggs-large",
            "Large eggs",
            2,
            "each",
            "Dairy + Eggs",
            12,
            "each",
            4.99,
          ),
        ],
        instructions: [
          "Dry the torn bread in a low oven and cool.",
          "Cook onion and celery in butter until lightly browned; combine with bread and fresh herbs.",
          "Moisten with part of the broth and cool.",
          "Fold in beaten eggs and remaining broth, transfer to a buttered casserole, cover and bake.",
          "Uncover and continue baking until the top is deeply golden and crisp.",
        ],
        prepTasks: [
          E("dry-bread", "Dry bread", "day-before", 60, {
            resourceRequirements: [
              { type: "oven", temperatureF: 250, slots: 1 },
            ],
          }),
          E("aromatics", "Cook aromatics + herbs", "day-before", 15, {
            dependsOn: ["dry-bread"],
            resourceRequirements: [{ type: "burner", slots: 1 }],
          }),
          E("assemble", "Assemble stuffing", "day-before", 15, {
            dependsOn: ["aromatics"],
          }),
          E("covered-bake", "Covered bake", "cook", 40, {
            dependsOn: ["assemble"],
            resourceRequirements: [
              { type: "oven", temperatureF: 350, slots: 1 },
            ],
          }),
          E("crisp", "Uncover + crisp stuffing", "finish", 40, {
            dependsOn: ["covered-bake"],
            resourceRequirements: [
              { type: "oven", temperatureF: 350, slots: 1 },
            ],
          }),
        ],
        makeAhead:
          "Bake through the first stage up to 1 day ahead, then crisp before serving.",
        storage: "Cool and refrigerate covered.",
        reheat: "Finish uncovered at 350\xB0F until hot and crisp.",
        equipment: [
          U("baking-dish-13x9", "13\xD79 baking dish"),
          U("rimmed-sheet", "Rimmed baking sheet"),
          U("large-skillet", "Large skillet"),
          U("large-bowl", "Large mixing bowl"),
        ],
        servingRequirements: [
          U("stuffing-dish", "Serving casserole", 1, "serving"),
          U("serving-spoon", "Serving spoon", 1, "serving"),
        ],
        dietaryTags: ["nut-free"],
        allergens: ["milk", "wheat", "egg"],
        sourceUrl:
          "https://www.bonappetit.com/recipe/simple-is-best-stuffing-dressing",
        sourceRating: "4.6 \xB7 495 ratings",
        preparedPurchase: { estimatedUnitCost: 4 },
        ...ul(),
      },
      "ba-mashed": {
        id: "ba-mashed",
        title: "BA\u2019s Best Mashed Potatoes",
        mealRole: "starch",
        baseServings: 8,
        servingStrategy: { basis: "headcount", factor: 0.9 },
        batchCapacityServings: 16,
        parallelBatchCapacity: 1,
        description:
          "Bon App\xE9tit Yukon Gold mashed potatoes with garlic-rosemary dairy.",
        ingredients: [
          B(
            "yukon-potatoes",
            "Yukon Gold potatoes",
            4,
            "lb",
            "Produce",
            5,
            "lb",
            6.99,
          ),
          B("kosher-salt", "Kosher salt", 4, "tsp", "Pantry", 3, "cup", 6.49),
          B("whole-milk", "Whole milk", 1.5, "cup", "Dairy", 64, "floz", 3.99),
          B(
            "heavy-cream",
            "Heavy cream",
            0.5,
            "cup",
            "Dairy",
            16,
            "floz",
            5.49,
          ),
          B("garlic", "Garlic", 1, "head", "Produce", 3, "head", 2.49),
          B(
            "fresh-rosemary",
            "Fresh rosemary",
            3,
            "each",
            "Produce",
            1,
            "bunch",
            2.49,
          ),
          B(
            "butter-unsalted",
            "Unsalted butter",
            1,
            "cup",
            "Dairy",
            1,
            "lb",
            5.99,
          ),
          B(
            "black-pepper",
            "Black pepper",
            1,
            "tsp",
            "Pantry",
            12,
            "tbsp",
            5.49,
          ),
        ],
        instructions: [
          "Simmer whole scrubbed Yukon Gold potatoes in well-salted water until very tender; drain and dry briefly.",
          "Warm milk and cream with garlic and rosemary, then strain.",
          "Rice the hot potatoes and incorporate room-temperature butter and salt.",
          "Gradually fold in the warm infused dairy until silky; finish with black pepper.",
        ],
        prepTasks: [
          E("boil", "Boil potatoes", "cook", 35, {
            resourceRequirements: [{ type: "burner", slots: 1 }],
          }),
          E("infuse", "Infuse milk + cream", "cook", 8, {
            resourceRequirements: [{ type: "burner", slots: 1 }],
          }),
          E("rice", "Rice hot potatoes", "finish", 10, { dependsOn: ["boil"] }),
          E("finish", "Fold in butter + infused dairy", "finish", 10, {
            dependsOn: ["rice", "infuse"],
            finishOffsetMinutes: -15,
          }),
        ],
        makeAhead: "Can be made 1 day ahead.",
        storage: "Cover and chill.",
        reheat: "Reheat gently, loosening with milk or stock as needed.",
        equipment: [
          U("large-pot", "Large pot"),
          U("potato-ricer", "Potato ricer or food mill"),
          U("small-saucepan", "Small saucepan"),
          U("fine-sieve", "Fine-mesh sieve"),
        ],
        servingRequirements: [
          U("potato-bowl", "Low serving bowl", 1, "serving"),
          U("serving-spoon", "Large serving spoon", 1, "serving"),
        ],
        dietaryTags: ["vegetarian", "gluten-free", "nut-free"],
        allergens: ["milk"],
        sourceUrl: "https://www.bonappetit.com/recipe/best-mashed-potatoes",
        sourceRating: "4.6 \xB7 94 ratings",
        preparedPurchase: { estimatedUnitCost: 3 },
        ...ul(),
      },
      "ba-greenbeans": {
        id: "ba-greenbeans",
        title: "Green Beans and Mushrooms With Crispy Shallots",
        mealRole: "vegetable",
        baseServings: 8,
        servingStrategy: { basis: "headcount", factor: 0.8 },
        batchCapacityServings: 12,
        parallelBatchCapacity: 1,
        description:
          "Bon App\xE9tit stovetop green beans with browned mushrooms, butter and crisp shallots.",
        ingredients: [
          B("green-beans", "Green beans", 1.5, "lb", "Produce", 2, "lb", 6.99),
          B("kosher-salt", "Kosher salt", 1.5, "tsp", "Pantry", 3, "cup", 6.49),
          B(
            "vegetable-oil",
            "Vegetable oil",
            0.333,
            "cup",
            "Pantry",
            48,
            "floz",
            6.99,
          ),
          B(
            "shallots",
            "Large shallots",
            3,
            "each",
            "Produce",
            3,
            "each",
            3.99,
          ),
          B("mushrooms", "Mushrooms", 1, "lb", "Produce", 1, "lb", 7.99),
          B(
            "butter-unsalted",
            "Unsalted butter",
            4,
            "tbsp",
            "Dairy",
            1,
            "lb",
            5.99,
          ),
          B(
            "sherry-vinegar",
            "Sherry or red wine vinegar",
            2,
            "tbsp",
            "Pantry",
            16,
            "floz",
            6.99,
          ),
          B(
            "black-pepper",
            "Black pepper",
            1,
            "tsp",
            "Pantry",
            12,
            "tbsp",
            5.49,
          ),
          B("parmesan", "Parmesan", 2, "oz", "Dairy", 8, "oz", 6.99),
        ],
        instructions: [
          "Blanch green beans briefly in salted water, cool, and drain well.",
          "Fry sliced shallots until crisp; reserve them for the finish.",
          "Brown mushrooms in the same skillet, then add butter and the blanched beans.",
          "Finish with vinegar and pepper, transfer to a platter, and top with Parmesan and crispy shallots.",
        ],
        prepTasks: [
          E("blanch", "Blanch green beans", "day-before", 10, {
            resourceRequirements: [{ type: "burner", slots: 1 }],
          }),
          E("shallots", "Crisp shallots", "day-before", 10, {
            resourceRequirements: [{ type: "burner", slots: 1 }],
          }),
          E("mushrooms", "Brown mushrooms", "finish", 10, {
            resourceRequirements: [{ type: "burner", slots: 1 }],
          }),
          E("finish", "Finish beans + mushrooms", "finish", 8, {
            dependsOn: ["blanch", "shallots", "mushrooms"],
            resourceRequirements: [{ type: "burner", slots: 1 }],
            finishOffsetMinutes: -10,
          }),
        ],
        makeAhead:
          "Blanch beans 1 day ahead; crispy shallots can also be prepared ahead.",
        storage:
          "Chill blanched beans dry; keep crispy shallots loosely covered at room temperature.",
        reheat: "Finish on the stovetop shortly before dinner.",
        equipment: [
          U("medium-pot", "Medium pot"),
          U("colander", "Colander"),
          U("large-skillet", "Large skillet"),
          U("slotted-spoon", "Slotted spoon"),
        ],
        servingRequirements: [
          U("green-bean-platter", "Long platter", 1, "serving"),
          U("serving-tongs", "Serving tongs", 1, "serving"),
        ],
        dietaryTags: ["vegetarian", "gluten-free", "nut-free"],
        allergens: ["milk"],
        sourceUrl:
          "https://www.bonappetit.com/recipe/green-beans-and-mushrooms-with-crispy-shallots",
        sourceRating: "4.7 \xB7 51 ratings",
        preparedPurchase: { estimatedUnitCost: 4 },
        ...ul(),
      },
      "ba-honey-brussels": {
        id: "ba-honey-brussels",
        title: "Charred Brussels Sprouts With Warm Honey Glaze",
        mealRole: "vegetable",
        baseServings: 4,
        servingStrategy: { basis: "headcount", factor: 0.75 },
        batchCapacityServings: 8,
        parallelBatchCapacity: 1,
        description:
          "Bon App\xE9tit deeply charred Brussels sprouts with a warm sweet-tangy glaze.",
        ingredients: [
          B(
            "brussels-sprouts",
            "Brussels sprouts",
            1.5,
            "lb",
            "Produce",
            2,
            "lb",
            7.99,
          ),
          B(
            "olive-oil",
            "Extra-virgin olive oil",
            0.25,
            "cup",
            "Pantry",
            25.5,
            "floz",
            11.99,
          ),
          B("kosher-salt", "Kosher salt", 0.5, "tsp", "Pantry", 3, "cup", 6.49),
          B(
            "black-pepper",
            "Black pepper",
            0.5,
            "tsp",
            "Pantry",
            12,
            "tbsp",
            5.49,
          ),
          B("honey", "Honey", 0.25, "cup", "Pantry", 12, "oz", 5.99),
          B(
            "sherry-vinegar",
            "Sherry or red wine vinegar",
            0.333,
            "cup",
            "Pantry",
            16,
            "floz",
            6.99,
          ),
          B(
            "red-pepper-flakes",
            "Crushed red pepper",
            0.75,
            "tsp",
            "Pantry",
            2,
            "oz",
            3.99,
          ),
          B(
            "butter-unsalted",
            "Unsalted butter",
            3,
            "tbsp",
            "Dairy",
            1,
            "lb",
            5.99,
          ),
          B("scallions", "Scallions", 3, "each", "Produce", 1, "bunch", 1.49),
          B("lemon", "Lemon", 1, "each", "Produce", 4, "each", 4.49),
        ],
        instructions: [
          "Preheat a rimmed sheet pan in a hot oven and season the halved sprouts with oil, salt and pepper.",
          "Roast cut-side down until deeply browned and tender.",
          "Cook honey until amber, then carefully whisk in vinegar, chile, butter and salt to form the glaze.",
          "Toss the roasted sprouts with glaze and scallions; finish with lemon zest.",
        ],
        prepTasks: [
          E("prep", "Trim + halve Brussels sprouts", "before-guests", 15),
          E("roast", "Char Brussels sprouts", "cook", 25, {
            dependsOn: ["prep"],
            resourceRequirements: [
              { type: "oven", temperatureF: 450, slots: 1 },
            ],
          }),
          E("glaze", "Make warm honey glaze", "cook", 10, {
            resourceRequirements: [{ type: "burner", slots: 1 }],
          }),
          E("finish", "Glaze + finish sprouts", "finish", 5, {
            dependsOn: ["roast", "glaze"],
            finishOffsetMinutes: -10,
          }),
        ],
        makeAhead: "Trim sprouts ahead; roast and glaze close to service.",
        storage: "Refrigerate trimmed sprouts.",
        reheat: "Best finished immediately after roasting.",
        equipment: [
          U("rimmed-sheet", "Rimmed baking sheet"),
          U("small-saucepan", "Small saucepan"),
          U("tongs", "Tongs"),
          U("microplane", "Microplane"),
        ],
        servingRequirements: [
          U("brussels-platter", "Wide platter", 1, "serving"),
          U("serving-spoon", "Serving spoon", 1, "serving"),
        ],
        dietaryTags: ["vegetarian", "gluten-free", "nut-free"],
        allergens: ["milk"],
        sourceUrl:
          "https://www.bonappetit.com/recipe/roasted-brussels-sprouts-with-warm-honey-glaze",
        sourceRating: "4.7 \xB7 159 ratings",
        preparedPurchase: { estimatedUnitCost: 4 },
        ...ul(),
      },
      "ba-fancy-cranberry": {
        id: "ba-fancy-cranberry",
        title: "Fancy Jellied Cranberry Sauce",
        mealRole: "sauce-condiment",
        baseServings: 9,
        servingStrategy: { basis: "headcount", factor: 1 },
        batchCapacityServings: 18,
        parallelBatchCapacity: 1,
        description:
          "Bon App\xE9tit sliceable cranberry sauce with cardamom, bay and orange.",
        ingredients: [
          B(
            "gelatin",
            "Unflavored powdered gelatin",
            1.5,
            "tbsp",
            "Pantry",
            1,
            "oz",
            3.99,
          ),
          B(
            "cranberries",
            "Fresh or frozen cranberries",
            1.5,
            "lb",
            "Produce",
            12,
            "oz",
            3.49,
          ),
          B("cardamom", "Cardamom pods", 4, "each", "Pantry", 1, "oz", 5.99),
          B(
            "bay-leaves",
            "Fresh bay leaves",
            3,
            "each",
            "Produce",
            1,
            "bunch",
            2.99,
          ),
          B(
            "kosher-salt",
            "Kosher salt",
            0.25,
            "tsp",
            "Pantry",
            3,
            "cup",
            6.49,
          ),
          B(
            "cranberry-juice",
            "Unsweetened cranberry juice",
            1,
            "cup",
            "Beverages",
            32,
            "floz",
            4.99,
          ),
          B("granulated-sugar", "Sugar", 1.688, "cup", "Pantry", 4, "lb", 4.49),
          B("orange", "Orange", 1, "each", "Produce", 4, "each", 5.49),
        ],
        instructions: [
          "Bloom gelatin in warm water and lightly oil the mold.",
          "Cook cranberries with cardamom, bay, salt, juice and most of the sugar until burst and syrupy.",
          "Remove the whole spices and dissolve the bloomed gelatin into the hot cranberry mixture.",
          "Pour into the mold and chill until fully set.",
          "Unmold and finish with sugared orange zest and reserved cranberries.",
        ],
        prepTasks: [
          E("cook", "Cook cranberry base", "days-ahead", 20, {
            resourceRequirements: [{ type: "burner", slots: 1 }],
          }),
          E("chill", "Chill cranberry mold", "days-ahead", 720, {
            dependsOn: ["cook"],
            handsOn: !1,
          }),
          E("unmold", "Unmold + garnish cranberry sauce", "serve", 10, {
            dependsOn: ["chill"],
            finishOffsetMinutes: -20,
          }),
        ],
        makeAhead: "Make up to 2 days ahead and keep chilled.",
        storage: "Keep chilled in its mold until serving.",
        reheat: "Serve chilled; do not reheat.",
        equipment: [
          U("saucepan", "Large saucepan"),
          U("cranberry-mold", "4-cup mold or Bundt pan"),
        ],
        servingRequirements: [
          U("cranberry-platter", "Small platter", 1, "serving"),
          U("small-serving-spoon", "Small serving spoon", 1, "serving"),
        ],
        dietaryTags: ["gluten-free", "dairy-free", "nut-free", "egg-free"],
        allergens: [],
        sourceUrl: "https://www.bonappetit.com/recipe/fancy-cranberry-sauce",
        sourceRating: "4.7 \xB7 26 ratings",
        preparedPurchase: { estimatedUnitCost: 2 },
        ...ul(),
      },
      "ba-parker-rolls": {
        id: "ba-parker-rolls",
        title: "Parker House Rolls",
        mealRole: "bread",
        baseServings: 18,
        servingStrategy: { basis: "headcount", factor: 1.5 },
        batchCapacityServings: 36,
        parallelBatchCapacity: 1,
        description: "Bon App\xE9tit buttery folded Parker House rolls.",
        ingredients: [
          B(
            "active-dry-yeast",
            "Active dry yeast",
            2.25,
            "tsp",
            "Pantry",
            6.75,
            "tsp",
            2.49,
          ),
          B("whole-milk", "Whole milk", 1, "cup", "Dairy", 64, "floz", 3.99),
          B(
            "vegetable-shortening",
            "Vegetable shortening",
            0.25,
            "cup",
            "Pantry",
            16,
            "oz",
            5.49,
          ),
          B("granulated-sugar", "Sugar", 3, "tbsp", "Pantry", 4, "lb", 4.49),
          B("kosher-salt", "Kosher salt", 1.5, "tsp", "Pantry", 3, "cup", 6.49),
          B(
            "eggs-large",
            "Large egg",
            1,
            "each",
            "Dairy + Eggs",
            12,
            "each",
            4.99,
          ),
          B(
            "all-purpose-flour",
            "All-purpose flour",
            3.5,
            "cup",
            "Bakery",
            5,
            "lb",
            5.49,
          ),
          B(
            "butter-unsalted",
            "Unsalted butter",
            4,
            "tbsp",
            "Dairy",
            1,
            "lb",
            5.99,
          ),
          B("flaky-salt", "Flaky sea salt", 1, "tsp", "Pantry", 4, "oz", 5.99),
        ],
        instructions: [
          "Proof the yeast in warm water.",
          "Warm the milk and combine it with shortening, sugar and salt; add egg, yeast and flour to form a soft dough.",
          "Knead until smooth, let rise, then roll, cut and fold the pieces with melted butter.",
          "Arrange in a buttered 9\xD713 dish and chill for at least 30 minutes.",
          "Bake at 350\xB0F until puffed and golden; brush with butter and finish with flaky salt.",
        ],
        prepTasks: [
          E("mix", "Mix + knead roll dough", "day-before", 20),
          E("rise", "First rise", "day-before", 60, {
            dependsOn: ["mix"],
            handsOn: !1,
          }),
          E("shape", "Shape + butter rolls", "day-before", 25, {
            dependsOn: ["rise"],
          }),
          E("chill", "Chill shaped rolls", "before-guests", 30, {
            dependsOn: ["shape"],
            handsOn: !1,
          }),
          E("bake", "Bake Parker House rolls", "cook", 30, {
            dependsOn: ["chill"],
            resourceRequirements: [
              { type: "oven", temperatureF: 350, slots: 1 },
            ],
          }),
          E("finish", "Butter + salt rolls", "finish", 5, {
            dependsOn: ["bake"],
            finishOffsetMinutes: -20,
          }),
        ],
        makeAhead: "Shaped rolls can chill for several hours before baking.",
        storage:
          "Cover and refrigerate shaped rolls; store baked leftovers airtight.",
        reheat: "Warm briefly before serving.",
        equipment: [
          U("large-bowl", "Large mixing bowl"),
          U("small-saucepan", "Small saucepan"),
          U("baking-dish-13x9", "9\xD713 baking dish"),
        ],
        servingRequirements: [
          U("bread-basket", "Bread basket", 1, "serving"),
          U("bread-tongs", "Bread tongs", 1, "serving"),
        ],
        dietaryTags: ["vegetarian", "nut-free"],
        allergens: ["milk", "egg", "wheat"],
        sourceUrl:
          "https://www.bonappetit.com/bon-appetit/recipe/parker-house-rolls",
        sourceRating: "576 reader ratings",
        preparedPurchase: { estimatedUnitCost: 1.5 },
        ...ul(),
      },
      "ba-pumpkin-pie": {
        id: "ba-pumpkin-pie",
        title: "BA\u2019s Best Pumpkin Pie",
        mealRole: "dessert",
        baseServings: 8,
        servingStrategy: { basis: "headcount" },
        batchCapacityServings: 8,
        parallelBatchCapacity: 2,
        description:
          "Bon App\xE9tit pumpkin pie with condensed milk, maple and individual warm spices.",
        ingredients: [
          B(
            "pie-crust",
            "9-inch pie crust",
            1,
            "each",
            "Frozen",
            2,
            "each",
            5.99,
          ),
          B(
            "eggs-large",
            "Large eggs",
            3,
            "each",
            "Dairy + Eggs",
            12,
            "each",
            4.99,
          ),
          B(
            "egg-yolk",
            "Egg yolk",
            1,
            "each",
            "Dairy + Eggs",
            12,
            "each",
            4.99,
          ),
          B("granulated-sugar", "Sugar", 0.333, "cup", "Pantry", 4, "lb", 4.49),
          B("cinnamon", "Ground cinnamon", 1, "tsp", "Pantry", 2, "oz", 3.99),
          B(
            "kosher-salt",
            "Kosher salt",
            0.75,
            "tsp",
            "Pantry",
            3,
            "cup",
            6.49,
          ),
          B(
            "ground-ginger",
            "Ground ginger",
            0.5,
            "tsp",
            "Pantry",
            2,
            "oz",
            3.99,
          ),
          B(
            "ground-cloves",
            "Ground cloves",
            0.25,
            "tsp",
            "Pantry",
            2,
            "oz",
            3.99,
          ),
          B(
            "ground-nutmeg",
            "Ground nutmeg",
            0.25,
            "tsp",
            "Pantry",
            2,
            "oz",
            3.99,
          ),
          B(
            "pumpkin-puree",
            "Unsweetened pumpkin pur\xE9e",
            2,
            "cup",
            "Pantry",
            15,
            "oz",
            2.49,
          ),
          B(
            "condensed-milk",
            "Sweetened condensed milk",
            0.667,
            "cup",
            "Dairy",
            14,
            "oz",
            2.79,
          ),
          B(
            "heavy-cream",
            "Heavy cream",
            0.333,
            "cup",
            "Dairy",
            16,
            "floz",
            5.49,
          ),
          B(
            "maple-syrup",
            "Maple syrup",
            2,
            "tbsp",
            "Pantry",
            12,
            "floz",
            8.99,
          ),
          B("vanilla", "Vanilla extract", 2, "tsp", "Pantry", 4, "floz", 8.99),
        ],
        instructions: [
          "Shape and chill the pie crust, then blind-bake it until set and lightly browned.",
          "Whisk the eggs, yolk, sugar and spices, then combine with pumpkin, condensed milk, cream, maple and vanilla.",
          "Pour the filling into the cooled crust and bake at 325\xB0F until the edges are set and the center still has a gentle wobble.",
          "Cool completely before slicing; serve with whipped cream if desired.",
        ],
        prepTasks: [
          E("shape", "Shape + chill pie crust", "day-before", 30),
          E("blind-bake", "Blind-bake crust", "day-before", 45, {
            dependsOn: ["shape"],
            resourceRequirements: [
              { type: "oven", temperatureF: 425, slots: 1 },
            ],
          }),
          E("fill", "Mix pumpkin filling", "day-before", 15, {
            dependsOn: ["blind-bake"],
          }),
          E("bake", "Bake pumpkin pie", "day-before", 70, {
            dependsOn: ["fill"],
            resourceRequirements: [
              { type: "oven", temperatureF: 325, slots: 1 },
            ],
          }),
          E("cool", "Cool pie completely", "day-before", 180, {
            dependsOn: ["bake"],
            handsOn: !1,
          }),
        ],
        makeAhead: "Bake 1 day ahead.",
        storage: "Wrap and chill after cooling.",
        reheat: "Serve at room temperature or gently warmed.",
        equipment: [
          U("pie-dish", "9-inch pie dish"),
          U("mixing-bowl", "Large mixing bowl"),
          U("whisk", "Whisk"),
          U("wire-rack", "Wire cooling rack"),
        ],
        servingRequirements: [
          U("cake-stand", "Cake stand or pie plate", 1, "serving"),
          U("pie-server", "Pie server", 1, "serving"),
        ],
        dietaryTags: ["vegetarian", "nut-free"],
        allergens: ["milk", "egg", "wheat"],
        sourceUrl: "https://www.bonappetit.com/recipe/best-pumpkin-pie",
        sourceRating: "4.5 \xB7 64 ratings",
        preparedPurchase: { estimatedUnitCost: 3 },
        ...ul(),
      },
    };
  var ze = "2026-09-29",
    vL = "2026-09-29",
    w = (e, a, t, l, n, u, r, s, o = {}) => ({
      ingredientId: e,
      name: a,
      quantity: t,
      unit: l,
      category: n,
      packageQuantity: u,
      packageUnit: r,
      estimatedPackagePrice: s,
      priceSource: "Crow & Crown planning estimate",
      priceUpdatedAt: vL,
      ...o,
    }),
    O = (e, a, t = 1, l = "equipment", n = {}) => ({
      id: e,
      name: a,
      quantity: t,
      kind: l,
      ...n,
    }),
    P = (e, a, t, l, n = {}) => ({
      id: e,
      title: a,
      phase: t,
      durationMinutes: l,
      ...n,
    }),
    jn = {
      turkey: {
        id: "turkey",
        title: "Herb-roasted turkey",
        mealRole: "main",
        baseServings: 12,
        servingStrategy: { basis: "headcount" },
        batchCapacityServings: 16,
        parallelBatchCapacity: 1,
        description:
          "Whole roast turkey with herb butter, aromatics and pan juices.",
        ingredients: [
          w(
            "butter-unsalted",
            "Unsalted butter",
            0.5,
            "lb",
            "Dairy",
            1,
            "lb",
            5.99,
          ),
          w(
            "kosher-salt",
            "Kosher salt",
            3,
            "tbsp",
            "Pantry",
            96,
            "tbsp",
            6.49,
          ),
          w(
            "black-pepper",
            "Black pepper",
            1,
            "tbsp",
            "Pantry",
            12,
            "tbsp",
            5.49,
          ),
          w(
            "fresh-sage",
            "Fresh sage",
            0.5,
            "bunch",
            "Produce",
            1,
            "bunch",
            2.49,
          ),
          w(
            "fresh-thyme",
            "Fresh thyme",
            0.5,
            "bunch",
            "Produce",
            1,
            "bunch",
            2.49,
          ),
          w(
            "fresh-rosemary",
            "Fresh rosemary",
            0.5,
            "bunch",
            "Produce",
            1,
            "bunch",
            2.49,
          ),
          w(
            "yellow-onion",
            "Yellow onions",
            2,
            "each",
            "Produce",
            3,
            "each",
            4.99,
          ),
          w("lemon", "Lemons", 2, "each", "Produce", 4, "each", 4.49),
          w(
            "gluten-free-stock",
            "Gluten-free turkey or chicken stock",
            4,
            "cup",
            "Pantry",
            32,
            "floz",
            4.99,
          ),
        ],
        instructions: [
          "Thaw the turkey completely in the refrigerator and keep it at 40\xB0F or below.",
          "Pat dry. Season all over with kosher salt and pepper; refrigerate uncovered on a rack overnight.",
          "Before roasting, soften the butter with chopped herbs. Rub over and under the breast skin where accessible.",
          "Heat the oven to 325\xB0F. Put onion and lemon in the cavity, set the turkey on a rack in a shallow roasting pan, and add stock to the pan.",
          "Roast until a food thermometer reads at least 165\xB0F in the thickest breast and the innermost thigh and wing.",
          "Rest at least 20 minutes before carving. Use the pan juices for gravy if desired.",
          "Carve onto a warm platter and serve promptly.",
        ],
        prepTasks: [
          P("dry-brine", "Dry-brine the turkey", "day-before", 20, {
            handsOn: !0,
            fixedStartOffsetMinutes: -1800,
          }),
          P("season", "Butter + season the turkey", "before-guests", 20, {
            handsOn: !0,
            dependsOn: ["dry-brine"],
          }),
          P("roast", "Roast turkey at 325\xB0F", "cook", 210, {
            dependsOn: ["season"],
            finishOffsetMinutes: -45,
            batchable: !0,
            dynamicDuration: "turkey-roast",
            resourceRequirements: [
              { type: "oven", temperatureF: 325, slots: 1 },
            ],
          }),
          P("rest", "Rest turkey", "hold", 30, {
            dependsOn: ["roast"],
            handsOn: !1,
          }),
          P("carve", "Carve turkey", "serve", 15, {
            dependsOn: ["rest"],
            handsOn: !0,
            finishOffsetMinutes: -5,
          }),
        ],
        makeAhead:
          "Dry-brine 24\u201336 hours before dinner. Thawing must begin earlier based on bird weight.",
        storage:
          "Keep raw turkey refrigerated at 40\xB0F or below. Refrigerate cooked leftovers within 2 hours in shallow containers.",
        reheat:
          "Reheat carved leftovers to 165\xB0F. For party-day service, avoid long warm holding that dries the meat.",
        substitutions: [
          "Use olive oil instead of butter for a dairy-free version.",
          "Use verified gluten-free stock when serving gluten-free guests.",
        ],
        equipment: [
          O("roasting-pan", "Large roasting pan"),
          O("roasting-rack", "Roasting rack"),
          O("food-thermometer", "Food thermometer"),
          O("carving-board", "Carving board"),
          O("carving-knife", "Carving knife"),
        ],
        servingRequirements: [
          O("turkey-platter", "Large turkey platter", 1, "serving"),
          O("carving-set", "Carving fork + knife", 1, "serving"),
        ],
        dietaryTags: [
          "gluten-free",
          "nut-free",
          "egg-free",
          "sesame-free",
          "fish-free",
          "shellfish-free",
        ],
        allergens: ["milk"],
        metadataReviewed: !0,
        allergenReviewed: !0,
        reviewedAt: ze,
        recipeComplete: !0,
        provenance: {
          type: "original",
          label:
            "Crow & Crown original recipe; turkey safety timing informed by USDA/FSIS",
        },
        sourceUrl:
          "https://www.foodsafety.gov/food-safety-charts/meat-poultry-charts",
        preparedPurchase: { estimatedUnitCost: 12 },
        isTurkey: !0,
        turkeyRules: {
          poundsPerPerson: 1.25,
          thawHoursPerPound: 6,
          maxBirdWeightLb: 20,
          minBirdWeightLb: 10,
          restMinutes: 30,
          ovenTemperatureF: 325,
        },
      },
      stuffing: {
        id: "stuffing",
        title: "Sage + onion stuffing",
        mealRole: "starch",
        baseServings: 12,
        servingStrategy: { basis: "headcount", factor: 0.85 },
        batchCapacityServings: 12,
        parallelBatchCapacity: 2,
        description: "Crisp-edged herb stuffing with onion, celery and stock.",
        ingredients: [
          w(
            "country-bread",
            "Country bread",
            1.5,
            "lb",
            "Bakery",
            1,
            "lb",
            5.99,
          ),
          w(
            "butter-unsalted",
            "Unsalted butter",
            0.5,
            "lb",
            "Dairy",
            1,
            "lb",
            5.99,
          ),
          w(
            "yellow-onion",
            "Yellow onions",
            2,
            "each",
            "Produce",
            3,
            "each",
            4.99,
          ),
          w("celery", "Celery", 6, "each", "Produce", 8, "each", 2.99),
          w(
            "fresh-sage",
            "Fresh sage",
            0.5,
            "bunch",
            "Produce",
            1,
            "bunch",
            2.49,
          ),
          w(
            "fresh-parsley",
            "Flat-leaf parsley",
            0.5,
            "bunch",
            "Produce",
            1,
            "bunch",
            1.99,
          ),
          w(
            "eggs-large",
            "Large eggs",
            2,
            "each",
            "Dairy + Eggs",
            12,
            "each",
            4.99,
          ),
          w(
            "chicken-stock",
            "Chicken or vegetable stock",
            4,
            "cup",
            "Pantry",
            32,
            "floz",
            4.49,
          ),
          w("kosher-salt", "Kosher salt", 2, "tsp", "Pantry", 96, "tbsp", 6.49),
          w(
            "black-pepper",
            "Black pepper",
            1,
            "tsp",
            "Pantry",
            12,
            "tbsp",
            5.49,
          ),
        ],
        instructions: [
          "Cube the bread and dry it uncovered overnight, or toast it gently until dry but not deeply browned.",
          "Cook onion and celery in butter until soft. Stir in sage and parsley.",
          "Whisk eggs with stock, salt and pepper.",
          "Combine bread, vegetables and stock mixture until evenly moistened without crushing the bread.",
          "Transfer to a buttered casserole. Cover and refrigerate if assembling ahead.",
          "Bake at 350\xB0F until hot throughout and crisp on top; uncover for the final portion of baking.",
        ],
        prepTasks: [
          P("dry-bread", "Dry the bread cubes", "days-ahead", 10, {
            handsOn: !0,
            fixedStartOffsetMinutes: -2880,
          }),
          P(
            "assemble",
            "Cook aromatics + assemble stuffing",
            "day-before",
            30,
            {
              handsOn: !0,
              dependsOn: ["dry-bread"],
              fixedStartOffsetMinutes: -1500,
              resourceRequirements: [{ type: "burner", slots: 1 }],
            },
          ),
          P("bake", "Bake stuffing at 350\xB0F", "cook", 45, {
            dependsOn: ["assemble"],
            finishOffsetMinutes: -10,
            resourceRequirements: [
              { type: "oven", temperatureF: 350, slots: 1 },
            ],
          }),
        ],
        makeAhead:
          "Dry bread up to 2 days ahead. Assemble the casserole the day before and refrigerate.",
        storage:
          "Refrigerate assembled stuffing promptly. Keep cooked stuffing refrigerated within 2 hours.",
        reheat:
          "Reheat covered at 350\xB0F until hot; uncover briefly to re-crisp the top.",
        substitutions: [
          "Use vegetable stock for a vegetarian version.",
          "Use a tested gluten-free loaf for a gluten-free version.",
        ],
        equipment: [
          O("large-skillet", "Large skillet"),
          O("large-mixing-bowl", "Large mixing bowl"),
          O("casserole-9x13", "9\xD713 casserole dish"),
        ],
        servingRequirements: [
          O("stuffing-casserole", "Casserole or serving dish", 1, "serving"),
          O("serving-spoon", "Large serving spoon", 1, "serving"),
        ],
        dietaryTags: ["nut-free", "sesame-free", "fish-free", "shellfish-free"],
        allergens: ["milk", "egg", "wheat"],
        metadataReviewed: !0,
        allergenReviewed: !0,
        reviewedAt: ze,
        recipeComplete: !0,
        provenance: { type: "original", label: "Crow & Crown original recipe" },
        preparedPurchase: { estimatedUnitCost: 3.5 },
      },
      potatoes: {
        id: "potatoes",
        title: "Silky mashed potatoes",
        mealRole: "starch",
        baseServings: 12,
        servingStrategy: { basis: "headcount", factor: 0.9 },
        batchCapacityServings: 24,
        parallelBatchCapacity: 1,
        description: "Creamy mashed potatoes designed to hold and reheat well.",
        ingredients: [
          w(
            "yukon-potatoes",
            "Yukon Gold potatoes",
            6,
            "lb",
            "Produce",
            5,
            "lb",
            6.99,
          ),
          w(
            "butter-unsalted",
            "Unsalted butter",
            0.75,
            "lb",
            "Dairy",
            1,
            "lb",
            5.99,
          ),
          w("heavy-cream", "Heavy cream", 2, "cup", "Dairy", 16, "floz", 5.49),
          w("whole-milk", "Whole milk", 2, "cup", "Dairy", 64, "floz", 3.99),
          w(
            "kosher-salt",
            "Kosher salt",
            1,
            "tbsp",
            "Pantry",
            96,
            "tbsp",
            6.49,
          ),
        ],
        instructions: [
          "Peel if desired and cut potatoes into even chunks.",
          "Cover with cold salted water, bring to a gentle boil and cook until completely tender.",
          "Drain thoroughly and return to the warm pot briefly to steam off excess water.",
          "Warm butter, cream and milk separately.",
          "Rice or mash the potatoes, then fold in the warm dairy gradually. Season with salt.",
          "Hold covered over gentle heat or refrigerate for reheating.",
        ],
        prepTasks: [
          P("cut", "Peel + cut potatoes", "morning", 25, {
            handsOn: !0,
            fixedStartOffsetMinutes: -360,
          }),
          P("boil", "Boil potatoes", "cook", 30, {
            dependsOn: ["cut"],
            handsOn: !1,
            resourceRequirements: [{ type: "burner", slots: 1 }],
          }),
          P("mash", "Mash + enrich potatoes", "finish", 20, {
            dependsOn: ["boil"],
            handsOn: !0,
          }),
          P("hold", "Hold mashed potatoes warm", "hold", 20, {
            dependsOn: ["mash"],
            handsOn: !1,
            finishOffsetMinutes: -10,
          }),
        ],
        makeAhead: "Can be made the day before; cool promptly and refrigerate.",
        storage: "Refrigerate within 2 hours in a shallow covered container.",
        reheat:
          "Reheat gently on the stovetop or covered in the oven, adding a splash of milk or cream as needed.",
        substitutions: [
          "Use olive oil and unsweetened dairy-free milk for a dairy-free version.",
        ],
        equipment: [
          O("large-stockpot", "Large stockpot"),
          O("potato-ricer", "Potato ricer or masher"),
          O("small-saucepan", "Small saucepan"),
        ],
        servingRequirements: [
          O("potato-bowl", "Large serving bowl", 1, "serving"),
          O("serving-spoon", "Large serving spoon", 1, "serving"),
        ],
        dietaryTags: [
          "vegetarian",
          "gluten-free",
          "nut-free",
          "egg-free",
          "sesame-free",
          "fish-free",
          "shellfish-free",
        ],
        allergens: ["milk"],
        metadataReviewed: !0,
        allergenReviewed: !0,
        reviewedAt: ze,
        recipeComplete: !0,
        provenance: { type: "original", label: "Crow & Crown original recipe" },
        preparedPurchase: { estimatedUnitCost: 3 },
      },
      gravy: {
        id: "gravy",
        title: "Pan gravy",
        mealRole: "sauce-condiment",
        baseServings: 12,
        servingStrategy: { basis: "headcount", factor: 1 },
        batchCapacityServings: 24,
        parallelBatchCapacity: 1,
        description:
          "Classic stock-and-dripping gravy finished just before dinner.",
        ingredients: [
          w(
            "butter-unsalted",
            "Unsalted butter",
            0.25,
            "lb",
            "Dairy",
            1,
            "lb",
            5.99,
          ),
          w(
            "all-purpose-flour",
            "All-purpose flour",
            0.25,
            "lb",
            "Pantry",
            5,
            "lb",
            5.49,
          ),
          w(
            "chicken-stock",
            "Chicken or turkey stock",
            4,
            "cup",
            "Pantry",
            32,
            "floz",
            4.49,
          ),
          w("kosher-salt", "Kosher salt", 1, "tsp", "Pantry", 96, "tbsp", 6.49),
          w(
            "black-pepper",
            "Black pepper",
            0.5,
            "tsp",
            "Pantry",
            12,
            "tbsp",
            5.49,
          ),
        ],
        instructions: [
          "Melt butter in a saucepan and whisk in flour. Cook until the roux smells nutty but remains light brown.",
          "Whisk in warm stock gradually until smooth.",
          "Simmer until the gravy coats a spoon. Season lightly.",
          "If using turkey pan drippings, skim excess fat and whisk the drippings into the finished gravy.",
          "Hold warm and thin with stock if necessary before serving.",
        ],
        prepTasks: [
          P("base", "Make gravy base", "day-before", 25, {
            handsOn: !0,
            fixedStartOffsetMinutes: -1440,
            resourceRequirements: [{ type: "burner", slots: 1 }],
          }),
          P("finish", "Reheat + finish gravy", "finish", 20, {
            dependsOn: ["base"],
            handsOn: !0,
            finishOffsetMinutes: -5,
            resourceRequirements: [{ type: "burner", slots: 1 }],
          }),
        ],
        makeAhead:
          "Make the stock-based gravy one day ahead; finish with drippings on Thanksgiving if desired.",
        storage: "Cool quickly and refrigerate covered.",
        reheat: "Bring to a simmer on the stovetop, whisking until smooth.",
        substitutions: [
          "Use gluten-free flour blend or cornstarch slurry for a gluten-free version.",
          "Use olive oil for a dairy-free version.",
        ],
        equipment: [
          O("medium-saucepan", "Medium saucepan"),
          O("whisk", "Whisk"),
        ],
        servingRequirements: [
          O("gravy-boat", "Gravy boat", 1, "serving"),
          O("small-ladle", "Small ladle", 1, "serving"),
        ],
        dietaryTags: [
          "nut-free",
          "egg-free",
          "sesame-free",
          "fish-free",
          "shellfish-free",
        ],
        allergens: ["milk", "wheat"],
        metadataReviewed: !0,
        allergenReviewed: !0,
        reviewedAt: ze,
        recipeComplete: !0,
        provenance: { type: "original", label: "Crow & Crown original recipe" },
        preparedPurchase: { estimatedUnitCost: 1.5 },
      },
      greens: {
        id: "greens",
        title: "Garlicky green beans",
        mealRole: "vegetable",
        baseServings: 12,
        servingStrategy: { basis: "headcount", factor: 0.85 },
        batchCapacityServings: 18,
        parallelBatchCapacity: 1,
        description:
          "Blanched green beans finished with garlic, lemon and olive oil.",
        ingredients: [
          w("green-beans", "Green beans", 4, "lb", "Produce", 2, "lb", 6.99),
          w("garlic", "Garlic", 1, "head", "Produce", 3, "head", 2.49),
          w("lemon", "Lemons", 2, "each", "Produce", 4, "each", 4.49),
          w(
            "olive-oil",
            "Extra-virgin olive oil",
            0.5,
            "cup",
            "Pantry",
            25.5,
            "floz",
            11.99,
          ),
          w("kosher-salt", "Kosher salt", 2, "tsp", "Pantry", 96, "tbsp", 6.49),
        ],
        instructions: [
          "Trim the beans.",
          "Blanch in well-salted boiling water until bright green and just tender; shock in ice water and dry thoroughly.",
          "Slice the garlic thinly.",
          "Shortly before dinner, warm olive oil in a wide skillet and cook garlic gently until fragrant.",
          "Add beans and toss until hot. Finish with lemon zest, lemon juice and salt.",
        ],
        prepTasks: [
          P("trim", "Trim green beans", "day-before", 20, {
            handsOn: !0,
            fixedStartOffsetMinutes: -1500,
          }),
          P("blanch", "Blanch + chill green beans", "morning", 20, {
            dependsOn: ["trim"],
            handsOn: !0,
            fixedStartOffsetMinutes: -360,
            resourceRequirements: [{ type: "burner", slots: 1 }],
          }),
          P("finish", "Saut\xE9 beans with garlic + lemon", "finish", 15, {
            dependsOn: ["blanch"],
            handsOn: !0,
            finishOffsetMinutes: -10,
            resourceRequirements: [{ type: "burner", slots: 1 }],
          }),
        ],
        makeAhead:
          "Trim the day before. Blanch the morning of and refrigerate once dry.",
        storage: "Keep blanched beans refrigerated and dry until finishing.",
        reheat:
          "Finish in a hot skillet just before serving rather than reheating for a long period.",
        substitutions: ["Use shallot instead of garlic."],
        equipment: [
          O("large-pot", "Large pot"),
          O("ice-bath-bowl", "Large bowl for ice bath"),
          O("wide-skillet", "Wide skillet"),
        ],
        servingRequirements: [
          O("green-bean-platter", "Long serving platter", 1, "serving"),
          O("serving-tongs", "Serving tongs", 1, "serving"),
        ],
        dietaryTags: [
          "vegan",
          "vegetarian",
          "gluten-free",
          "dairy-free",
          "nut-free",
          "egg-free",
          "soy-free",
          "sesame-free",
          "fish-free",
          "shellfish-free",
        ],
        allergens: [],
        metadataReviewed: !0,
        allergenReviewed: !0,
        reviewedAt: ze,
        recipeComplete: !0,
        provenance: { type: "original", label: "Crow & Crown original recipe" },
        preparedPurchase: { estimatedUnitCost: 3 },
      },
      cranberry: {
        id: "cranberry",
        title: "Cranberry + orange",
        mealRole: "sauce-condiment",
        baseServings: 12,
        servingStrategy: { basis: "headcount", factor: 1 },
        batchCapacityServings: 36,
        parallelBatchCapacity: 1,
        description: "Bright cranberry sauce with fresh orange.",
        ingredients: [
          w(
            "cranberries",
            "Fresh cranberries",
            1.5,
            "lb",
            "Produce",
            12,
            "oz",
            3.49,
          ),
          w(
            "granulated-sugar",
            "Granulated sugar",
            1,
            "lb",
            "Pantry",
            4,
            "lb",
            4.49,
          ),
          w("orange", "Oranges", 2, "each", "Produce", 4, "each", 5.49),
        ],
        instructions: [
          "Zest and juice the oranges.",
          "Combine cranberries, sugar, orange juice and 1/2 cup water in a saucepan.",
          "Bring to a simmer and cook until most berries burst and the sauce thickens.",
          "Stir in the orange zest and cool completely.",
          "Chill until serving.",
        ],
        prepTasks: [
          P("cook", "Cook cranberry sauce", "days-ahead", 25, {
            handsOn: !0,
            fixedStartOffsetMinutes: -4320,
            resourceRequirements: [{ type: "burner", slots: 1 }],
          }),
          P("serve", "Transfer cranberry sauce to serving bowl", "serve", 5, {
            dependsOn: ["cook"],
            handsOn: !0,
            finishOffsetMinutes: -10,
          }),
        ],
        makeAhead: "Make up to 3 days ahead.",
        storage: "Refrigerate covered.",
        reheat:
          "Serve chilled or at cool room temperature; reheating is not required.",
        substitutions: [
          "Replace part of the orange juice with apple cider for a softer citrus note.",
        ],
        equipment: [O("medium-saucepan", "Medium saucepan")],
        servingRequirements: [
          O("cranberry-bowl", "Small serving bowl", 1, "serving"),
          O("small-serving-spoon", "Small serving spoon", 1, "serving"),
        ],
        dietaryTags: [
          "vegan",
          "vegetarian",
          "gluten-free",
          "dairy-free",
          "nut-free",
          "egg-free",
          "soy-free",
          "sesame-free",
          "fish-free",
          "shellfish-free",
        ],
        allergens: [],
        metadataReviewed: !0,
        allergenReviewed: !0,
        reviewedAt: ze,
        recipeComplete: !0,
        provenance: { type: "original", label: "Crow & Crown original recipe" },
        preparedPurchase: { estimatedUnitCost: 1.25 },
      },
      rolls: {
        id: "rolls",
        title: "Warm dinner rolls",
        mealRole: "bread",
        baseServings: 12,
        servingStrategy: { basis: "headcount", factor: 1 },
        batchCapacityServings: 24,
        parallelBatchCapacity: 2,
        description: "Soft, butter-brushed yeast rolls served warm.",
        ingredients: [
          w(
            "all-purpose-flour",
            "All-purpose flour",
            1.5,
            "lb",
            "Bakery",
            5,
            "lb",
            5.49,
          ),
          w("whole-milk", "Whole milk", 1.5, "cup", "Dairy", 64, "floz", 3.99),
          w(
            "butter-unsalted",
            "Unsalted butter",
            0.5,
            "lb",
            "Dairy",
            1,
            "lb",
            5.99,
          ),
          w(
            "instant-yeast",
            "Instant yeast",
            2.25,
            "tsp",
            "Pantry",
            6.75,
            "tsp",
            2.49,
          ),
          w(
            "granulated-sugar",
            "Granulated sugar",
            0.25,
            "cup",
            "Pantry",
            8,
            "cup",
            4.49,
          ),
          w("kosher-salt", "Kosher salt", 2, "tsp", "Pantry", 96, "tbsp", 6.49),
        ],
        instructions: [
          "Warm the milk until just warm, not hot.",
          "Mix flour, yeast, sugar and salt. Add milk and half the softened butter; knead until smooth and elastic.",
          "Let rise until doubled.",
          "Divide into 18 small rolls, arrange in a buttered baking dish and let rise again until puffy.",
          "Bake at 350\xB0F until deep golden.",
          "Brush with the remaining butter while warm.",
        ],
        prepTasks: [
          P("mix", "Mix + knead roll dough", "day-before", 20, {
            handsOn: !0,
            fixedStartOffsetMinutes: -1560,
          }),
          P("first-rise", "First rise", "day-before", 75, {
            dependsOn: ["mix"],
            handsOn: !1,
          }),
          P("shape", "Shape rolls", "day-before", 20, {
            dependsOn: ["first-rise"],
            handsOn: !0,
          }),
          P("proof", "Proof rolls", "before-guests", 60, {
            dependsOn: ["shape"],
            handsOn: !1,
            finishOffsetMinutes: -60,
          }),
          P("bake", "Bake rolls at 350\xB0F", "cook", 18, {
            dependsOn: ["proof"],
            finishOffsetMinutes: -35,
            resourceRequirements: [
              { type: "oven", temperatureF: 350, slots: 1 },
            ],
          }),
          P("brush", "Brush rolls with butter", "finish", 5, {
            dependsOn: ["bake"],
            handsOn: !0,
            finishOffsetMinutes: -25,
          }),
        ],
        makeAhead:
          "Shape the rolls the day before and refrigerate; let them finish proofing before baking.",
        storage:
          "Store baked rolls covered at room temperature for one day or freeze.",
        reheat: "Warm covered at 300\xB0F for 8\u201310 minutes.",
        substitutions: [
          "Use plant milk and vegan butter for a dairy-free version.",
        ],
        equipment: [
          O("stand-mixer", "Stand mixer or large mixing bowl"),
          O("baking-dish-rolls", "Large baking dish"),
        ],
        servingRequirements: [
          O("bread-basket", "Bread basket", 1, "serving"),
          O("bread-tongs", "Bread tongs", 1, "serving"),
        ],
        dietaryTags: [
          "vegetarian",
          "nut-free",
          "egg-free",
          "sesame-free",
          "fish-free",
          "shellfish-free",
        ],
        allergens: ["milk", "wheat"],
        metadataReviewed: !0,
        allergenReviewed: !0,
        reviewedAt: ze,
        recipeComplete: !0,
        provenance: { type: "original", label: "Crow & Crown original recipe" },
        preparedPurchase: { estimatedUnitCost: 1.5 },
      },
      pie: {
        id: "pie",
        title: "Pumpkin pie",
        mealRole: "dessert",
        baseServings: 8,
        servingStrategy: { basis: "headcount" },
        batchCapacityServings: 8,
        parallelBatchCapacity: 2,
        description:
          "Classic pumpkin pie with a crisp crust and spiced custard.",
        ingredients: [
          w(
            "pie-crust",
            "9-inch pie crusts",
            1,
            "each",
            "Frozen",
            2,
            "each",
            5.99,
          ),
          w(
            "pumpkin-puree",
            "Pumpkin pur\xE9e",
            15,
            "oz",
            "Pantry",
            15,
            "oz",
            2.49,
          ),
          w(
            "evaporated-milk",
            "Evaporated milk",
            12,
            "floz",
            "Dairy",
            12,
            "floz",
            2.19,
          ),
          w(
            "eggs-large",
            "Large eggs",
            2,
            "each",
            "Dairy + Eggs",
            12,
            "each",
            4.99,
          ),
          w(
            "brown-sugar",
            "Brown sugar",
            0.75,
            "cup",
            "Pantry",
            4,
            "cup",
            3.99,
          ),
          w(
            "pumpkin-spice",
            "Pumpkin pie spice",
            2,
            "tsp",
            "Pantry",
            28,
            "tsp",
            5.49,
          ),
          w(
            "kosher-salt",
            "Kosher salt",
            0.5,
            "tsp",
            "Pantry",
            96,
            "tbsp",
            6.49,
          ),
          w("heavy-cream", "Heavy cream", 1, "cup", "Dairy", 16, "floz", 5.49, {
            optional: !0,
            includeByDefault: !0,
          }),
        ],
        instructions: [
          "Heat the oven to 425\xB0F and fit the crust into a 9-inch pie plate.",
          "Whisk pumpkin, eggs, brown sugar, spice and salt until smooth; whisk in evaporated milk.",
          "Pour into the crust.",
          "Bake 15 minutes at 425\xB0F, then reduce to 350\xB0F and continue until the edges are set and the center still has a slight wobble.",
          "Cool completely on a rack before refrigerating.",
          "Whip the cream softly just before dessert, if using.",
        ],
        prepTasks: [
          P(
            "assemble",
            "Mix filling + assemble pumpkin pie",
            "day-before",
            20,
            { handsOn: !0, fixedStartOffsetMinutes: -1560 },
          ),
          P("hot-bake", "Start pie at 425\xB0F", "cook", 15, {
            dependsOn: ["assemble"],
            resourceRequirements: [
              { type: "oven", temperatureF: 425, slots: 1 },
            ],
          }),
          P("bake", "Finish pie at 350\xB0F", "cook", 40, {
            dependsOn: ["hot-bake"],
            resourceRequirements: [
              { type: "oven", temperatureF: 350, slots: 1 },
            ],
          }),
          P("cool", "Cool pie completely", "hold", 120, {
            dependsOn: ["bake"],
            handsOn: !1,
          }),
          P("serve", "Slice + serve pumpkin pie", "serve", 10, {
            dependsOn: ["cool"],
            handsOn: !0,
            fixedStartOffsetMinutes: 60,
          }),
        ],
        makeAhead:
          "Bake one day ahead and cool completely before refrigerating.",
        storage: "Refrigerate cooled custard pie.",
        reheat:
          "Serve cool or at room temperature; do not keep at room temperature for extended periods.",
        substitutions: [
          "Use a verified gluten-free crust for a gluten-free version.",
        ],
        equipment: [
          O("pie-plate", "9-inch pie plate"),
          O("mixing-bowl", "Mixing bowl"),
          O("wire-rack", "Wire cooling rack"),
        ],
        servingRequirements: [
          O("cake-stand", "Cake stand or pie plate", 1, "serving"),
          O("pie-server", "Pie server", 1, "serving"),
        ],
        dietaryTags: [
          "vegetarian",
          "nut-free",
          "sesame-free",
          "fish-free",
          "shellfish-free",
        ],
        allergens: ["milk", "egg", "wheat"],
        metadataReviewed: !0,
        allergenReviewed: !0,
        reviewedAt: ze,
        recipeComplete: !0,
        provenance: { type: "original", label: "Crow & Crown original recipe" },
        preparedPurchase: { estimatedUnitCost: 4.5 },
      },
      salad: {
        id: "salad",
        title: "Bitter greens + pear salad",
        mealRole: "fresh",
        baseServings: 12,
        servingStrategy: { basis: "headcount", factor: 0.8 },
        ingredients: [
          w(
            "bitter-greens",
            "Bitter greens",
            1.5,
            "lb",
            "Produce",
            10,
            "oz",
            5.99,
          ),
          w("pears", "Ripe pears", 3, "each", "Produce", 4, "each", 5.99),
          w("lemon", "Lemons", 2, "each", "Produce", 4, "each", 4.49),
          w(
            "olive-oil",
            "Extra-virgin olive oil",
            0.5,
            "cup",
            "Pantry",
            25.5,
            "floz",
            11.99,
          ),
          w("dijon", "Dijon mustard", 2, "tbsp", "Pantry", 12, "oz", 4.49),
        ],
        instructions: [
          "Wash and dry the greens thoroughly.",
          "Whisk lemon juice, olive oil, Dijon, salt and pepper into a sharp vinaigrette.",
          "Slice pears just before serving. Toss greens lightly with dressing, then fold in pears.",
        ],
        prepTasks: [
          P("wash", "Wash + dry salad greens", "day-before", 15, {
            handsOn: !0,
            fixedStartOffsetMinutes: -1440,
          }),
          P("dressing", "Make vinaigrette", "day-before", 10, {
            handsOn: !0,
            fixedStartOffsetMinutes: -1380,
          }),
          P("finish", "Slice pears + toss salad", "finish", 10, {
            handsOn: !0,
            finishOffsetMinutes: -5,
          }),
        ],
        makeAhead:
          "Wash greens and make dressing the day before; slice pears at the last moment.",
        storage: "Refrigerate greens, dressing and pears separately.",
        reheat: "Not applicable.",
        substitutions: ["Use apples instead of pears."],
        equipment: [
          O("salad-spinner", "Salad spinner"),
          O("mixing-bowl", "Large mixing bowl"),
        ],
        servingRequirements: [
          O("salad-bowl", "Wide salad bowl", 1, "serving"),
          O("salad-tongs", "Salad tongs", 1, "serving"),
        ],
        dietaryTags: [
          "vegan",
          "vegetarian",
          "gluten-free",
          "dairy-free",
          "nut-free",
          "egg-free",
          "soy-free",
          "sesame-free",
          "fish-free",
          "shellfish-free",
        ],
        allergens: [],
        metadataReviewed: !0,
        allergenReviewed: !0,
        reviewedAt: ze,
        recipeComplete: !0,
        provenance: { type: "original", label: "Crow & Crown original recipe" },
      },
      mac: {
        id: "mac",
        title: "Baked mac + cheese",
        mealRole: "starch",
        baseServings: 12,
        servingStrategy: { basis: "headcount", factor: 0.75 },
        batchCapacityServings: 18,
        parallelBatchCapacity: 1,
        ingredients: [
          w("elbow-pasta", "Elbow pasta", 2, "lb", "Pantry", 1, "lb", 2.49),
          w("cheddar-cheese", "Sharp cheddar", 2, "lb", "Dairy", 1, "lb", 6.99),
          w("whole-milk", "Whole milk", 4, "cup", "Dairy", 64, "floz", 3.99),
          w(
            "butter-unsalted",
            "Unsalted butter",
            0.5,
            "lb",
            "Dairy",
            1,
            "lb",
            5.99,
          ),
          w(
            "all-purpose-flour",
            "All-purpose flour",
            0.25,
            "lb",
            "Pantry",
            5,
            "lb",
            5.49,
          ),
          w("breadcrumbs", "Breadcrumbs", 0.5, "lb", "Bakery", 15, "oz", 3.99),
        ],
        instructions: [
          "Boil pasta in salted water until just shy of al dente; drain.",
          "Cook butter and flour together, then whisk in milk and simmer until thickened. Melt in most of the cheese.",
          "Fold pasta into sauce, transfer to a buttered casserole, top with remaining cheese and breadcrumbs, and bake until bubbling and browned.",
        ],
        prepTasks: [
          P("sauce", "Make cheese sauce + cook pasta", "day-before", 30, {
            handsOn: !0,
            fixedStartOffsetMinutes: -1440,
            resourceRequirements: [{ type: "burner", slots: 2 }],
          }),
          P("assemble", "Assemble mac + cheese", "day-before", 15, {
            handsOn: !0,
            dependsOn: ["sauce"],
          }),
          P("bake", "Bake mac + cheese at 375\xB0F", "cook", 35, {
            dependsOn: ["assemble"],
            finishOffsetMinutes: -15,
            resourceRequirements: [
              { type: "oven", temperatureF: 375, slots: 1 },
            ],
          }),
        ],
        makeAhead: "Assemble one day ahead; bake before dinner.",
        storage: "Refrigerate assembled or cooked casserole promptly.",
        reheat: "Reheat covered at 350\xB0F until hot, then uncover briefly.",
        substitutions: [
          "Use a tested gluten-free pasta and crumbs for a gluten-free version.",
        ],
        equipment: [
          O("large-pot", "Large pot"),
          O("medium-saucepan", "Medium saucepan"),
          O("casserole-9x13", "9\xD713 casserole"),
        ],
        servingRequirements: [
          O("mac-casserole", "Casserole dish", 1, "serving"),
          O("serving-spoon", "Large serving spoon", 1, "serving"),
        ],
        dietaryTags: [
          "vegetarian",
          "nut-free",
          "sesame-free",
          "fish-free",
          "shellfish-free",
        ],
        allergens: ["milk", "wheat"],
        metadataReviewed: !0,
        allergenReviewed: !0,
        reviewedAt: ze,
        recipeComplete: !0,
        provenance: { type: "original", label: "Crow & Crown original recipe" },
        preparedPurchase: { estimatedUnitCost: 3.5 },
      },
      sweet: {
        id: "sweet",
        title: "Roasted sweet potatoes",
        mealRole: "starch",
        baseServings: 12,
        servingStrategy: { basis: "headcount", factor: 0.75 },
        batchCapacityServings: 18,
        parallelBatchCapacity: 1,
        ingredients: [
          w(
            "sweet-potatoes",
            "Sweet potatoes",
            4,
            "lb",
            "Produce",
            3,
            "lb",
            4.99,
          ),
          w(
            "olive-oil",
            "Extra-virgin olive oil",
            0.33,
            "cup",
            "Pantry",
            25.5,
            "floz",
            11.99,
          ),
          w(
            "maple-syrup",
            "Maple syrup",
            0.25,
            "cup",
            "Pantry",
            12,
            "floz",
            8.99,
          ),
          w("kosher-salt", "Kosher salt", 2, "tsp", "Pantry", 96, "tbsp", 6.49),
        ],
        instructions: [
          "Cut sweet potatoes into even wedges or large cubes.",
          "Toss with olive oil and salt; spread on sheet pans without crowding.",
          "Roast at 425\xB0F until browned and tender. Drizzle lightly with maple syrup during the final minutes and return to the oven to glaze.",
        ],
        prepTasks: [
          P("cut", "Cut sweet potatoes", "day-before", 20, {
            handsOn: !0,
            fixedStartOffsetMinutes: -1440,
          }),
          P("roast", "Roast sweet potatoes at 425\xB0F", "cook", 40, {
            dependsOn: ["cut"],
            finishOffsetMinutes: -20,
            resourceRequirements: [
              { type: "oven", temperatureF: 425, slots: 1 },
            ],
          }),
        ],
        makeAhead:
          "Cut the day before and refrigerate submerged in cold water; drain and dry very well before roasting.",
        storage: "Refrigerate cooked leftovers promptly.",
        reheat: "Reheat uncovered at 400\xB0F to restore browned edges.",
        substitutions: [
          "Use honey instead of maple syrup if vegan service is not required.",
        ],
        equipment: [O("sheet-pans", "Rimmed sheet pans", 2)],
        servingRequirements: [
          O("sweet-potato-platter", "Low serving platter", 1, "serving"),
          O("serving-spoon", "Large serving spoon", 1, "serving"),
        ],
        dietaryTags: [
          "vegan",
          "vegetarian",
          "gluten-free",
          "dairy-free",
          "nut-free",
          "egg-free",
          "soy-free",
          "sesame-free",
          "fish-free",
          "shellfish-free",
        ],
        allergens: [],
        metadataReviewed: !0,
        allergenReviewed: !0,
        reviewedAt: ze,
        recipeComplete: !0,
        provenance: { type: "original", label: "Crow & Crown original recipe" },
        preparedPurchase: { estimatedUnitCost: 2.5 },
      },
      app: {
        id: "app",
        title: "Whipped ricotta + crostini",
        mealRole: "appetizer",
        baseServings: 12,
        servingStrategy: { basis: "headcount", factor: 0.65 },
        ingredients: [
          w(
            "ricotta",
            "Whole-milk ricotta",
            1.5,
            "lb",
            "Dairy",
            15,
            "oz",
            5.99,
          ),
          w("baguette", "Baguettes", 2, "each", "Bakery", 1, "each", 3.49),
          w(
            "olive-oil",
            "Extra-virgin olive oil",
            0.25,
            "cup",
            "Pantry",
            25.5,
            "floz",
            11.99,
          ),
          w("lemon", "Lemons", 1, "each", "Produce", 4, "each", 4.49),
          w("honey", "Honey", 0.25, "cup", "Pantry", 12, "oz", 7.99),
        ],
        instructions: [
          "Whip ricotta with olive oil, lemon zest and a pinch of salt until light.",
          "Slice baguettes, brush lightly with oil and toast until crisp.",
          "Spread ricotta in a shallow bowl, finish with honey and lemon, and serve with crostini on the side.",
        ],
        prepTasks: [
          P("whip", "Whip ricotta", "day-before", 10, {
            handsOn: !0,
            fixedStartOffsetMinutes: -1440,
          }),
          P("slice", "Slice baguettes", "morning", 10, {
            handsOn: !0,
            fixedStartOffsetMinutes: -360,
          }),
          P("toast", "Toast crostini at 375\xB0F", "before-guests", 12, {
            dependsOn: ["slice"],
            fixedStartOffsetMinutes: -90,
            resourceRequirements: [
              { type: "oven", temperatureF: 375, slots: 1 },
            ],
          }),
          P("plate", "Plate whipped ricotta", "before-guests", 8, {
            dependsOn: ["whip"],
            fixedStartOffsetMinutes: -45,
          }),
        ],
        makeAhead: "Whip ricotta the day before; toast crostini the day of.",
        storage:
          "Keep whipped ricotta refrigerated; keep crostini dry at room temperature.",
        reheat:
          "Crostini can be refreshed for 3\u20134 minutes in a warm oven.",
        substitutions: [
          "Use a dairy-free cultured spread for a dairy-free version.",
        ],
        equipment: [
          O("food-processor", "Food processor or mixer"),
          O("sheet-pan", "Sheet pan"),
        ],
        servingRequirements: [
          O("ricotta-bowl", "Shallow serving bowl", 1, "serving"),
          O("crostini-board", "Board or platter", 1, "serving"),
          O("spreader", "Spreader", 1, "serving"),
        ],
        dietaryTags: [
          "vegetarian",
          "nut-free",
          "egg-free",
          "sesame-free",
          "fish-free",
          "shellfish-free",
        ],
        allergens: ["milk", "wheat"],
        metadataReviewed: !0,
        allergenReviewed: !0,
        reviewedAt: ze,
        recipeComplete: !0,
        provenance: { type: "original", label: "Crow & Crown original recipe" },
        preparedPurchase: { estimatedUnitCost: 3 },
      },
      "sparkling-water": {
        id: "sparkling-water",
        title: "Still + sparkling water",
        mealRole: "non-alcoholic-drink",
        baseServings: 1,
        servingStrategy: { basis: "headcount" },
        ingredients: [
          w(
            "still-water",
            "Still water",
            20,
            "floz",
            "Beverages",
            33.8,
            "floz",
            2.49,
          ),
          w(
            "sparkling-water",
            "Sparkling water",
            12,
            "floz",
            "Beverages",
            33.8,
            "floz",
            2.99,
          ),
        ],
        instructions: [
          "Chill water thoroughly.",
          "Stage still and sparkling bottles or carafes where guests can self-serve.",
          "Replenish cold bottles in small batches so the station stays clean.",
        ],
        prepTasks: [
          P("chill", "Chill still + sparkling water", "day-before", 5, {
            handsOn: !0,
            fixedStartOffsetMinutes: -1440,
          }),
          P("stage", "Stage water station", "before-guests", 10, {
            handsOn: !0,
            fixedStartOffsetMinutes: -60,
          }),
        ],
        makeAhead: "Chill the day before.",
        storage: "Keep chilled until service.",
        reheat: "Not applicable.",
        substitutions: ["Use filtered tap water in carafes for still water."],
        equipment: [],
        servingRequirements: [
          O("water-carafes", "Water carafes or chilled bottles", 2, "serving"),
          O("water-glasses", "Water glasses", 1, "serving", { perPerson: !0 }),
        ],
        dietaryTags: [
          "vegan",
          "vegetarian",
          "gluten-free",
          "dairy-free",
          "nut-free",
          "egg-free",
          "soy-free",
          "sesame-free",
          "fish-free",
          "shellfish-free",
        ],
        allergens: [],
        metadataReviewed: !0,
        allergenReviewed: !0,
        reviewedAt: ze,
        recipeComplete: !0,
        provenance: {
          type: "original",
          label: "Crow & Crown original beverage plan",
        },
      },
      wine: {
        id: "wine",
        title: "Wine for dinner",
        mealRole: "alcohol",
        baseServings: 1,
        servingStrategy: { basis: "adult-drinkers" },
        ingredients: [
          w(
            "wine-bottles",
            "Wine bottles",
            0.4,
            "each",
            "Beverages",
            1,
            "each",
            18,
          ),
        ],
        instructions: [
          "Choose a mix that fits the menu and your guests.",
          "Chill white or sparkling wine in advance.",
          "Open bottles gradually and keep water available alongside alcohol.",
        ],
        prepTasks: [
          P("chill", "Chill white + sparkling wine", "day-before", 5, {
            handsOn: !0,
            fixedStartOffsetMinutes: -1440,
          }),
          P("stage", "Stage wine glasses + opener", "before-guests", 10, {
            handsOn: !0,
            fixedStartOffsetMinutes: -60,
          }),
        ],
        makeAhead: "Buy ahead and chill whites the day before.",
        storage:
          "Store unopened bottles according to label; refrigerate opened white wine.",
        reheat: "Not applicable.",
        substitutions: [
          "Replace with additional non-alcoholic sparkling beverages.",
        ],
        equipment: [O("wine-opener", "Wine opener")],
        servingRequirements: [
          O("wine-glasses", "Wine glasses", 1, "serving", { perPerson: !0 }),
        ],
        dietaryTags: [
          "vegetarian",
          "gluten-free",
          "dairy-free",
          "nut-free",
          "egg-free",
          "sesame-free",
          "fish-free",
          "shellfish-free",
        ],
        allergens: [],
        metadataReviewed: !0,
        allergenReviewed: !0,
        reviewedAt: ze,
        recipeComplete: !0,
        provenance: {
          type: "original",
          label: "Crow & Crown original beverage plan",
        },
      },
      "signature-cocktail": {
        id: "signature-cocktail",
        title: "Signature cocktail",
        mealRole: "alcohol",
        baseServings: 1,
        servingStrategy: { basis: "adult-drinkers" },
        ingredients: [
          w(
            "cocktail-spirit",
            "Cocktail spirit",
            3,
            "floz",
            "Beverages",
            25.36,
            "floz",
            29.99,
          ),
          w(
            "cocktail-mixer",
            "Cocktail mixer",
            6,
            "floz",
            "Beverages",
            33.8,
            "floz",
            4.99,
          ),
          w(
            "cocktail-ice",
            "Cocktail ice",
            0.75,
            "lb",
            "Beverages",
            5,
            "lb",
            4.99,
          ),
        ],
        instructions: [
          "Batch non-carbonated spirit and mixer components ahead.",
          "Chill the batch thoroughly.",
          "Add ice and any sparkling component only when serving.",
        ],
        prepTasks: [
          P("batch", "Batch signature cocktail base", "morning", 20, {
            handsOn: !0,
            fixedStartOffsetMinutes: -360,
          }),
          P("ice", "Stage cocktail ice + glassware", "before-guests", 10, {
            handsOn: !0,
            fixedStartOffsetMinutes: -45,
          }),
        ],
        makeAhead: "Batch the non-carbonated base the morning of.",
        storage: "Keep batched cocktail refrigerated until service.",
        reheat: "Not applicable.",
        substitutions: [
          "Make a zero-proof version with the same garnish and glassware.",
        ],
        equipment: [
          O("cocktail-pitcher", "Pitcher or drink dispenser"),
          O("jigger", "Jigger"),
        ],
        servingRequirements: [
          O("cocktail-glasses", "Cocktail glasses", 1, "serving", {
            perPerson: !0,
          }),
        ],
        dietaryTags: [
          "vegetarian",
          "gluten-free",
          "dairy-free",
          "nut-free",
          "egg-free",
          "sesame-free",
          "fish-free",
          "shellfish-free",
        ],
        allergens: [],
        metadataReviewed: !0,
        allergenReviewed: !0,
        reviewedAt: ze,
        recipeComplete: !0,
        provenance: {
          type: "original",
          label: "Crow & Crown original beverage plan",
        },
      },
      "kids-cider": {
        id: "kids-cider",
        title: "Kids\u2019 cider + juice",
        mealRole: "non-alcoholic-drink",
        baseServings: 1,
        servingStrategy: { basis: "children" },
        ingredients: [
          w(
            "apple-cider",
            "Apple cider or juice",
            16,
            "floz",
            "Beverages",
            64,
            "floz",
            4.99,
          ),
        ],
        instructions: [
          "Chill cider or juice.",
          "Pour into a small kid-safe pitcher or individual cups.",
          "Keep the kids\u2019 drink station separate from alcoholic drinks.",
        ],
        prepTasks: [
          P("chill", "Chill kids\u2019 cider + juice", "day-before", 5, {
            handsOn: !0,
            fixedStartOffsetMinutes: -1440,
          }),
          P("stage", "Stage kid-safe cups + pitcher", "before-guests", 10, {
            handsOn: !0,
            fixedStartOffsetMinutes: -45,
          }),
        ],
        makeAhead: "Chill the day before.",
        storage: "Keep refrigerated until service.",
        reheat: "Not applicable.",
        substitutions: [
          "Use diluted juice or water based on family preference.",
        ],
        equipment: [],
        servingRequirements: [
          O("kid-pitcher", "Kid-safe pitcher", 1, "serving"),
          O("kid-cups", "Kid-safe cups", 1, "serving", { perPerson: !0 }),
        ],
        dietaryTags: [
          "vegan",
          "vegetarian",
          "gluten-free",
          "dairy-free",
          "nut-free",
          "egg-free",
          "soy-free",
          "sesame-free",
          "fish-free",
          "shellfish-free",
        ],
        allergens: [],
        metadataReviewed: !0,
        allergenReviewed: !0,
        reviewedAt: ze,
        recipeComplete: !0,
        provenance: {
          type: "original",
          label: "Crow & Crown original beverage plan",
        },
      },
      "coffee-tea": {
        id: "coffee-tea",
        title: "Coffee + tea after dinner",
        mealRole: "coffee",
        baseServings: 1,
        servingStrategy: { basis: "adults", factor: 0.75 },
        ingredients: [
          w("coffee-beans", "Coffee", 0.06, "lb", "Beverages", 12, "oz", 12.99),
          w("tea-bags", "Tea bags", 0.5, "each", "Beverages", 20, "each", 5.99),
          w(
            "coffee-cream",
            "Coffee cream",
            2,
            "floz",
            "Dairy",
            16,
            "floz",
            4.99,
          ),
        ],
        instructions: [
          "Set mugs, tea, sugar and cream before dinner.",
          "Brew coffee as dessert is cleared or plated.",
          "Refresh hot water for tea and serve cream cold.",
        ],
        prepTasks: [
          P("stage", "Stage coffee + tea service", "morning", 15, {
            handsOn: !0,
            fixedStartOffsetMinutes: -360,
          }),
          P("brew", "Brew coffee + heat tea water", "serve", 15, {
            handsOn: !0,
            fixedStartOffsetMinutes: 45,
            resourceRequirements: [{ type: "burner", slots: 1 }],
          }),
        ],
        makeAhead: "Stage cups and shelf-stable items in the morning.",
        storage: "Keep dairy cream refrigerated until service.",
        reheat: "Brew fresh rather than reheating coffee.",
        substitutions: ["Offer decaf and dairy-free creamer if needed."],
        equipment: [
          O("coffee-maker", "Coffee maker"),
          O("tea-kettle", "Tea kettle"),
        ],
        servingRequirements: [
          O("coffee-mugs", "Coffee cups or mugs", 1, "serving", {
            perPerson: !0,
          }),
          O("teaspoons", "Teaspoons", 1, "serving", { perPerson: !0 }),
        ],
        dietaryTags: [
          "vegetarian",
          "gluten-free",
          "nut-free",
          "egg-free",
          "sesame-free",
          "fish-free",
          "shellfish-free",
        ],
        allergens: ["milk"],
        metadataReviewed: !0,
        allergenReviewed: !0,
        reviewedAt: ze,
        recipeComplete: !0,
        provenance: {
          type: "original",
          label: "Crow & Crown original beverage plan",
        },
      },
    };
  Object.assign(jn, sv);
  var ov = Object.freeze(Object.keys(jn));
  var dv = [
      {
        id: "turkey",
        name: "Herb-roasted turkey",
        group: "Main",
        style: "classic",
        minutes: 210,
        oven: 210,
        temp: 325,
        cost: 95,
        portion: "1\u20131\xBD lb raw bone-in turkey per guest",
        vessel: "Large platter + carving set",
        ingredients: [
          ["Turkey", 1.25, "lb", "Meat"],
          ["Butter", 0.08, "lb", "Dairy"],
          ["Fresh herbs", 0.08, "bunch", "Produce"],
        ],
        easier: "Prepared turkey breast",
        easyCost: 155,
        makeAhead: "Dry brine the day before",
        finish: "Carve onto a warmed platter; finish with restrained herbs.",
      },
      {
        id: "stuffing",
        name: "Sage + onion stuffing",
        group: "Starch",
        style: "classic",
        minutes: 55,
        oven: 45,
        temp: 350,
        cost: 38,
        portion: "\xBE cup prepared per guest",
        vessel: "Large shallow baking dish + spoon",
        ingredients: [
          ["Bread cubes", 0.19, "lb", "Bakery"],
          ["Onions", 0.15, "lb", "Produce"],
          ["Stock", 0.18, "cup", "Pantry"],
        ],
        easier: "Bakery stuffing",
        easyCost: 70,
        makeAhead: "Assemble the day before",
        finish: "Serve in its baking dish with a clean serving spoon.",
      },
      {
        id: "potatoes",
        name: "Silky mashed potatoes",
        group: "Starch",
        style: "classic",
        minutes: 45,
        oven: 0,
        temp: 0,
        cost: 32,
        portion: "\xBD lb potatoes per guest",
        vessel: "Low stoneware bowl + large spoon",
        ingredients: [
          ["Potatoes", 0.5, "lb", "Produce"],
          ["Butter", 0.08, "lb", "Dairy"],
          ["Cream", 0.08, "cup", "Dairy"],
        ],
        easier: "Prepared mashed potatoes",
        easyCost: 65,
        makeAhead: "Up to 1 day ahead; refrigerate",
        finish:
          "Use a low stoneware bowl; finish with butter and a little fresh herb.",
      },
      {
        id: "gravy",
        name: "Pan gravy",
        group: "Sauce",
        style: "classic",
        minutes: 25,
        oven: 0,
        temp: 0,
        cost: 18,
        portion: "\u2153 cup per guest",
        vessel: "Gravy boat + ladle",
        ingredients: [
          ["Stock", 0.34, "cup", "Pantry"],
          ["Flour", 0.03, "lb", "Pantry"],
        ],
        easier: "Upgraded prepared gravy",
        easyCost: 34,
        makeAhead: "Base can be made 2 days ahead",
        finish: "Transfer to a warmed gravy boat just before dinner.",
      },
      {
        id: "greens",
        name: "Garlicky green beans",
        group: "Fresh",
        style: "modern",
        minutes: 25,
        oven: 0,
        temp: 0,
        cost: 33,
        portion: "\u2153 lb per guest",
        vessel: "Long serving platter + tongs",
        ingredients: [
          ["Green beans", 0.33, "lb", "Produce"],
          ["Garlic", 0.05, "head", "Produce"],
        ],
        easier: "Trimmed ready-to-cook beans",
        easyCost: 48,
        makeAhead: "Trim and blanch the day before",
        finish: "Arrange loosely on a long platter; add lemon at the end.",
      },
      {
        id: "cranberry",
        name: "Cranberry + orange",
        group: "Fresh",
        style: "modern",
        minutes: 20,
        oven: 0,
        temp: 0,
        cost: 16,
        portion: "\xBC cup per guest",
        vessel: "Small bowl + spoon",
        ingredients: [
          ["Cranberries", 0.13, "lb", "Produce"],
          ["Oranges", 0.11, "each", "Produce"],
          ["Sugar", 0.03, "lb", "Pantry"],
        ],
        easier: "Prepared cranberry sauce",
        easyCost: 22,
        makeAhead: "Up to 3 days ahead",
        finish: "Serve chilled in a small bowl with orange zest.",
      },
      {
        id: "rolls",
        name: "Warm dinner rolls",
        group: "Starch",
        style: "classic",
        minutes: 15,
        oven: 12,
        temp: 350,
        cost: 20,
        portion: "1\xBD rolls per guest",
        vessel: "Linen-lined basket + tongs",
        ingredients: [
          ["Dinner rolls", 1.5, "each", "Bakery"],
          ["Butter", 0.03, "lb", "Dairy"],
        ],
        easier: "Bakery rolls, served at room temperature",
        easyCost: 28,
        makeAhead: "Buy 1\u20132 days before",
        finish: "Line a basket with a dark linen napkin.",
      },
      {
        id: "pie",
        name: "Pumpkin pie",
        group: "Dessert",
        style: "classic",
        minutes: 75,
        oven: 55,
        temp: 350,
        cost: 32,
        portion: "1 slice per guest",
        vessel: "Cake stand + pie server",
        ingredients: [
          ["Pumpkin pur\xE9e", 0.09, "can", "Pantry"],
          ["Pie crust", 0.13, "each", "Frozen"],
          ["Cream", 0.08, "cup", "Dairy"],
        ],
        easier: "Bakery pumpkin pie",
        easyCost: 58,
        makeAhead: "Bake 1\u20132 days ahead",
        finish: "Present whole on a simple stand; cut when ready to serve.",
      },
      {
        id: "salad",
        name: "Bitter greens + pear salad",
        group: "Fresh",
        style: "modern",
        minutes: 20,
        oven: 0,
        temp: 0,
        cost: 38,
        portion: "1 small plate per guest",
        vessel: "Wide shallow bowl + tongs",
        ingredients: [
          ["Salad greens", 0.15, "lb", "Produce"],
          ["Pears", 0.25, "each", "Produce"],
          ["Vinaigrette", 0.06, "cup", "Pantry"],
        ],
        easier: "Market salad kit",
        easyCost: 48,
        makeAhead: "Wash greens and make dressing the day before",
        finish: "Dress lightly at the last moment; keep the bowl wide and low.",
      },
      {
        id: "mac",
        name: "Baked mac + cheese",
        group: "Starch",
        style: "big",
        minutes: 65,
        oven: 35,
        temp: 375,
        cost: 48,
        portion: "\xBD cup per guest",
        vessel: "Baking dish + spoon",
        ingredients: [
          ["Pasta", 0.18, "lb", "Pantry"],
          ["Cheese", 0.15, "lb", "Dairy"],
          ["Milk", 0.12, "cup", "Dairy"],
        ],
        easier: "Prepared mac + cheese",
        easyCost: 75,
        makeAhead: "Assemble the day before",
        finish: "Serve directly in an attractive baking dish.",
      },
      {
        id: "sweet",
        name: "Roasted sweet potatoes",
        group: "Starch",
        style: "modern",
        minutes: 50,
        oven: 40,
        temp: 400,
        cost: 30,
        portion: "\u2153 lb per guest",
        vessel: "Low platter + spoon",
        ingredients: [
          ["Sweet potatoes", 0.35, "lb", "Produce"],
          ["Olive oil", 0.04, "cup", "Pantry"],
        ],
        easier: "Prepared sweet potatoes",
        easyCost: 55,
        makeAhead: "Peel and cut the day before",
        finish: "Keep the garnish spare; add flaky salt.",
      },
      {
        id: "app",
        name: "Whipped ricotta + crostini",
        group: "Appetizer",
        style: "modern",
        minutes: 25,
        oven: 10,
        temp: 350,
        cost: 28,
        portion: "2 pieces per guest",
        vessel: "Board + spreader",
        ingredients: [
          ["Ricotta", 0.12, "lb", "Dairy"],
          ["Baguette", 0.13, "each", "Bakery"],
        ],
        easier: "Assembled olives + cheese",
        easyCost: 32,
        makeAhead: "Whip ricotta the day before",
        finish: "Keep on the drinks station, clear of the dining table.",
      },
      {
        id: "ba-dry-turkey",
        name: "Dry-brined turkey + honey glaze",
        group: "Main",
        style: "editor-pick",
        minutes: 285,
        oven: 150,
        temp: 325,
        cost: 110,
        portion: "Plan about 1\u20131\xBD lb raw turkey per adult-size portion",
        vessel: "Large platter + carving set",
        ingredients: [
          ["Turkey", 1.25, "lb", "Meat"],
          ["Butter", 0.07, "lb", "Dairy"],
          ["Honey", 0.03, "cup", "Pantry"],
          ["Vinegar", 0.02, "cup", "Pantry"],
          ["Fresh rosemary", 0.04, "bunch", "Produce"],
        ],
        easier: "",
        easyCost: 110,
        makeAhead: "Dry-brine 1\u20132 days before",
        finish: "Rest well, carve, and glaze lightly before serving.",
        tags: [
          "Gluten-Free",
          "Nut-Free",
          "Egg-Free",
          "Sesame-Free",
          "Shellfish-Free",
        ],
        source: "Bon App\xE9tit",
        sourceUrl: "https://www.bonappetit.com/recipe/dry-rubbed-roast-turkey",
        rating: "4.6 \u2605 \xB7 135 ratings",
      },
      {
        id: "ba-simple-stuffing",
        name: "Simple-Is-Best stuffing",
        group: "Starch",
        style: "editor-pick",
        minutes: 105,
        oven: 80,
        temp: 350,
        cost: 42,
        portion: "About \xBE cup prepared per adult-size portion",
        vessel: "Large casserole + serving spoon",
        ingredients: [
          ["Day-old bread", 0.14, "lb", "Bakery"],
          ["Onions", 0.08, "lb", "Produce"],
          ["Celery", 0.06, "lb", "Produce"],
          ["Stock", 0.28, "cup", "Pantry"],
          ["Fresh herbs", 0.03, "bunch", "Produce"],
        ],
        easier: "",
        easyCost: 42,
        makeAhead: "Bake most of the way the day before; crisp before serving",
        finish: "Serve from the casserole so the crisp top stays intact.",
        tags: ["Nut-Free", "Sesame-Free", "Shellfish-Free"],
        source: "Bon App\xE9tit",
        sourceUrl:
          "https://www.bonappetit.com/recipe/simple-is-best-stuffing-dressing",
        rating: "4.6 \u2605 \xB7 495 ratings",
      },
      {
        id: "ba-mashed",
        name: "BA\u2019s Best mashed potatoes",
        group: "Starch",
        style: "editor-pick",
        minutes: 50,
        oven: 0,
        temp: 0,
        cost: 36,
        portion: "About \xBD lb potatoes per adult-size portion",
        vessel: "Low bowl + large spoon",
        ingredients: [
          ["Yukon Gold potatoes", 0.5, "lb", "Produce"],
          ["Butter", 0.08, "lb", "Dairy"],
          ["Milk", 0.08, "cup", "Dairy"],
          ["Cream", 0.06, "cup", "Dairy"],
        ],
        easier: "",
        easyCost: 36,
        makeAhead: "Can be made 1 day ahead and gently reheated",
        finish: "Keep the top loose and glossy, not overworked.",
        tags: [
          "Vegetarian",
          "Gluten-Free",
          "Nut-Free",
          "Egg-Free",
          "Soy-Free",
          "Sesame-Free",
          "Fish-Free",
          "Shellfish-Free",
        ],
        kidFriendly: !0,
        source: "Bon App\xE9tit",
        sourceUrl: "https://www.bonappetit.com/recipe/best-mashed-potatoes",
        rating: "4.6 \u2605 \xB7 94 ratings",
      },
      {
        id: "ba-honey-brussels",
        name: "Charred Brussels sprouts + warm honey glaze",
        group: "Fresh",
        style: "editor-pick",
        minutes: 40,
        oven: 30,
        temp: 450,
        cost: 34,
        portion: "About \xBC lb sprouts per adult-size portion",
        vessel: "Wide platter + serving spoon",
        ingredients: [
          ["Brussels sprouts", 0.25, "lb", "Produce"],
          ["Honey", 0.03, "cup", "Pantry"],
          ["Butter", 0.03, "lb", "Dairy"],
          ["Lemon", 0.08, "each", "Produce"],
        ],
        easier: "",
        easyCost: 34,
        makeAhead: "Trim sprouts and make glaze the day before",
        finish: "Glaze at the end so the edges stay charred.",
        tags: [
          "Vegetarian",
          "Gluten-Free",
          "Nut-Free",
          "Egg-Free",
          "Soy-Free",
          "Sesame-Free",
          "Fish-Free",
          "Shellfish-Free",
        ],
        source: "Bon App\xE9tit",
        sourceUrl:
          "https://www.bonappetit.com/recipe/roasted-brussels-sprouts-with-warm-honey-glaze",
        rating: "4.7 \u2605 \xB7 159 ratings",
      },
      {
        id: "ba-greenbeans",
        name: "Green beans + mushrooms + crispy shallots",
        group: "Fresh",
        style: "editor-pick",
        minutes: 45,
        oven: 0,
        temp: 0,
        cost: 38,
        portion: "About \xBC lb green beans per adult-size portion",
        vessel: "Long platter + tongs",
        ingredients: [
          ["Green beans", 0.25, "lb", "Produce"],
          ["Mushrooms", 0.08, "lb", "Produce"],
          ["Shallots", 0.04, "lb", "Produce"],
          ["Butter", 0.03, "lb", "Dairy"],
        ],
        easier: "",
        easyCost: 38,
        makeAhead: "Blanch beans and crisp shallots 1 day ahead",
        finish: "Rewarm on the stovetop and add shallots at the last moment.",
        tags: [
          "Vegetarian",
          "Gluten-Free",
          "Nut-Free",
          "Egg-Free",
          "Soy-Free",
          "Sesame-Free",
          "Fish-Free",
          "Shellfish-Free",
        ],
        source: "Bon App\xE9tit",
        sourceUrl:
          "https://www.bonappetit.com/recipe/green-beans-and-mushrooms-with-crispy-shallots",
        rating: "4.7 \u2605 \xB7 51 ratings",
      },
      {
        id: "ba-pumpkin-pie",
        name: "BA\u2019s Best pumpkin pie",
        group: "Dessert",
        style: "editor-pick",
        minutes: 105,
        oven: 60,
        temp: 350,
        cost: 38,
        portion: "1 slice per adult-size portion",
        vessel: "Cake stand + pie server",
        ingredients: [
          ["Pumpkin pur\xE9e", 0.09, "can", "Pantry"],
          ["Pie crust", 0.13, "each", "Frozen"],
          ["Sweetened condensed milk", 0.08, "can", "Dairy"],
          ["Warm spices", 0.02, "jar", "Pantry"],
        ],
        easier: "",
        easyCost: 38,
        makeAhead: "Bake 1 day ahead and cool completely",
        finish: "Serve whole and slice at dessert.",
        tags: [
          "Vegetarian",
          "Nut-Free",
          "Sesame-Free",
          "Fish-Free",
          "Shellfish-Free",
        ],
        kidFriendly: !0,
        source: "Bon App\xE9tit",
        sourceUrl: "https://www.bonappetit.com/recipe/best-pumpkin-pie",
        rating: "4.5 \u2605 \xB7 64 ratings",
      },
      {
        id: "ba-parker-rolls",
        name: "Parker House rolls",
        group: "Bread",
        style: "editor-pick",
        minutes: 55,
        oven: 30,
        temp: 350,
        cost: 26,
        portion: "1\u20132 rolls per guest",
        vessel: "Linen-lined bread basket",
        ingredients: [
          ["All-purpose flour", 0.12, "lb", "Bakery"],
          ["Milk", 0.06, "cup", "Dairy"],
          ["Butter", 0.03, "lb", "Dairy"],
          ["Yeast", 0.06, "packet", "Pantry"],
        ],
        easier: "",
        easyCost: 26,
        makeAhead: "Shape and chill several hours ahead or freeze baked rolls",
        finish: "Brush warm rolls lightly with butter before serving.",
        tags: [
          "Vegetarian",
          "Nut-Free",
          "Sesame-Free",
          "Fish-Free",
          "Shellfish-Free",
        ],
        kidFriendly: !0,
        source: "Bon App\xE9tit",
        sourceUrl:
          "https://www.bonappetit.com/bon-appetit/recipe/parker-house-rolls",
        rating: "576 reader ratings",
      },
      {
        id: "ba-roasted-sweet",
        name: "Roasted sweet potatoes",
        group: "Starch",
        style: "editor-pick",
        minutes: 50,
        oven: 45,
        temp: 450,
        cost: 28,
        portion: "About \xBD lb per adult-size portion",
        vessel: "Low platter + spoon",
        ingredients: [
          ["Sweet potatoes", 0.5, "lb", "Produce"],
          ["Olive oil", 0.03, "cup", "Pantry"],
        ],
        easier: "",
        easyCost: 28,
        makeAhead: "Can be roasted up to 3 days ahead",
        finish: "Reheat uncovered so the edges stay browned.",
        tags: [
          "Vegan",
          "Vegetarian",
          "Gluten-Free",
          "Dairy-Free",
          "Nut-Free",
          "Egg-Free",
          "Soy-Free",
          "Sesame-Free",
          "Fish-Free",
          "Shellfish-Free",
        ],
        kidFriendly: !0,
        source: "Bon App\xE9tit",
        sourceUrl: "https://www.bonappetit.com/recipe/roasted-sweet-potatoes",
        rating: "4.0 \u2605 \xB7 58 ratings",
      },
      {
        id: "ba-fancy-cranberry",
        name: "Fancy jellied cranberry sauce",
        group: "Sauce",
        style: "editor-pick",
        minutes: 30,
        oven: 0,
        temp: 0,
        cost: 22,
        portion: "About \xBC cup per adult-size portion",
        vessel: "Low plate or small serving bowl",
        ingredients: [
          ["Cranberries", 0.15, "lb", "Produce"],
          ["Sugar", 0.08, "lb", "Pantry"],
          ["Gelatin", 0.03, "packet", "Pantry"],
          ["Orange", 0.06, "each", "Produce"],
        ],
        easier: "",
        easyCost: 22,
        makeAhead: "Make and chill 2 days ahead",
        finish: "Unmold shortly before serving.",
        tags: [
          "Gluten-Free",
          "Dairy-Free",
          "Nut-Free",
          "Egg-Free",
          "Soy-Free",
          "Sesame-Free",
          "Fish-Free",
          "Shellfish-Free",
        ],
        source: "Bon App\xE9tit",
        sourceUrl: "https://www.bonappetit.com/recipe/fancy-cranberry-sauce",
        rating: "4.7 \u2605 \xB7 26 ratings",
      },
      {
        id: "allrecipes-corn",
        name: "Creamy corn casserole",
        group: "Starch",
        style: "community-favorite",
        minutes: 60,
        oven: 50,
        temp: 350,
        cost: 28,
        portion: "About \xBD cup per guest",
        vessel: "Casserole + serving spoon",
        ingredients: [
          ["Corn", 0.12, "can", "Pantry"],
          ["Creamed corn", 0.08, "can", "Pantry"],
          ["Corn muffin mix", 0.07, "box", "Bakery"],
          ["Sour cream", 0.05, "cup", "Dairy"],
          ["Butter", 0.03, "lb", "Dairy"],
        ],
        easier: "",
        easyCost: 28,
        makeAhead: "Assemble ahead and refrigerate before baking",
        finish: "Serve warm directly from the casserole.",
        tags: [
          "Vegetarian",
          "Nut-Free",
          "Sesame-Free",
          "Fish-Free",
          "Shellfish-Free",
        ],
        kidFriendly: !0,
        source: "Allrecipes",
        sourceUrl:
          "https://www.allrecipes.com/our-most-popular-casseroles-of-all-time-11786905",
        rating: "Allrecipes all-time popular",
      },
      {
        id: "allrecipes-broccoli-cheese",
        name: "Broccoli + cheese casserole",
        group: "Fresh",
        style: "community-favorite",
        minutes: 50,
        oven: 35,
        temp: 350,
        cost: 32,
        portion: "About \xBD cup per guest",
        vessel: "Casserole + serving spoon",
        ingredients: [
          ["Broccoli", 0.22, "lb", "Produce"],
          ["Cheddar cheese", 0.08, "lb", "Dairy"],
          ["Cream of mushroom soup", 0.06, "can", "Pantry"],
        ],
        easier: "",
        easyCost: 32,
        makeAhead: "Assemble earlier in the day",
        finish: "Bake until hot and browned at the edges.",
        tags: ["Vegetarian", "Sesame-Free", "Fish-Free", "Shellfish-Free"],
        kidFriendly: !0,
        source: "Allrecipes",
        sourceUrl:
          "https://www.allrecipes.com/our-most-popular-casseroles-of-all-time-11786905",
        rating: "Allrecipes kid-favorite",
      },
      {
        id: "fn-vegan-greenbean",
        name: "Vegan green bean casserole",
        group: "Fresh",
        style: "dietary",
        minutes: 55,
        oven: 30,
        temp: 375,
        cost: 34,
        portion: "About \xBD cup per adult-size portion",
        vessel: "Casserole + serving spoon",
        ingredients: [
          ["Green beans", 0.25, "lb", "Produce"],
          ["Mushrooms", 0.08, "lb", "Produce"],
          ["Plant milk", 0.08, "cup", "Dairy"],
          ["Crispy onions", 0.04, "cup", "Pantry"],
        ],
        easier: "",
        easyCost: 34,
        makeAhead: "Prep sauce and beans the day before",
        finish: "Bake close to dinner so the topping stays crisp.",
        tags: [
          "Vegan",
          "Vegetarian",
          "Dairy-Free",
          "Egg-Free",
          "Fish-Free",
          "Shellfish-Free",
        ],
        source: "Food Network Kitchen",
        sourceUrl:
          "https://www.foodnetwork.com/thanksgiving/photos/vegan-thanksgiving-recipes",
        rating: "Test-kitchen vegan pick",
      },
      {
        id: "fn-gf-cornbread",
        name: "Gluten-free skillet cornbread",
        group: "Bread",
        style: "dietary",
        minutes: 45,
        oven: 30,
        temp: 375,
        cost: 24,
        portion: "1 wedge per guest",
        vessel: "Skillet or bread basket",
        ingredients: [
          ["Cornmeal", 0.08, "lb", "Bakery"],
          ["Gluten-free flour", 0.05, "lb", "Bakery"],
          ["Plant milk", 0.06, "cup", "Dairy"],
          ["Winter squash", 0.06, "lb", "Produce"],
        ],
        easier: "",
        easyCost: 24,
        makeAhead: "Bake earlier in the day and rewarm",
        finish: "Cut into wedges and serve warm.",
        tags: [
          "Vegetarian",
          "Gluten-Free",
          "Dairy-Free",
          "Nut-Free",
          "Fish-Free",
          "Shellfish-Free",
        ],
        kidFriendly: !0,
        source: "Food Network Kitchen",
        sourceUrl:
          "https://www.foodnetwork.com/thanksgiving/photos/vegan-thanksgiving-recipes",
        rating: "Gluten- + dairy-free pick",
      },
      {
        id: "ew-stuffed-squash",
        name: "Wild rice\u2013stuffed acorn squash",
        group: "Main",
        style: "dietary",
        minutes: 80,
        oven: 55,
        temp: 400,
        cost: 46,
        portion: "\xBD\u20131 squash per adult-size portion",
        vessel: "Large platter",
        ingredients: [
          ["Acorn squash", 0.5, "each", "Produce"],
          ["Wild rice", 0.11, "lb", "Pantry"],
          ["Mushrooms", 0.08, "lb", "Produce"],
          ["Fresh herbs", 0.03, "bunch", "Produce"],
        ],
        easier: "",
        easyCost: 46,
        makeAhead: "Cook filling 1 day ahead; roast and fill before serving",
        finish: "Arrange cut-side up on a wide platter.",
        tags: [
          "Vegan",
          "Vegetarian",
          "Dairy-Free",
          "Egg-Free",
          "Fish-Free",
          "Shellfish-Free",
        ],
        source: "EatingWell",
        sourceUrl:
          "https://www.eatingwell.com/gallery/8077409/vegan-thanksgiving-recipes-youll-want-to-make-forever/",
        rating: "Top-rated vegan collection",
      },
      {
        id: "fn-citrus-cranberry",
        name: "Citrus cranberry sauce",
        group: "Sauce",
        style: "dietary",
        minutes: 30,
        oven: 0,
        temp: 0,
        cost: 20,
        portion: "About \xBC cup per adult-size portion",
        vessel: "Small serving bowl + spoon",
        ingredients: [
          ["Cranberries", 0.13, "lb", "Produce"],
          ["Oranges", 0.12, "each", "Produce"],
          ["Sugar", 0.05, "lb", "Pantry"],
        ],
        easier: "",
        easyCost: 20,
        makeAhead: "Make up to 3 days ahead and chill",
        finish: "Bring out just before dinner.",
        tags: [
          "Vegan",
          "Vegetarian",
          "Gluten-Free",
          "Dairy-Free",
          "Nut-Free",
          "Egg-Free",
          "Soy-Free",
          "Sesame-Free",
          "Fish-Free",
          "Shellfish-Free",
        ],
        kidFriendly: !0,
        source: "Food Network",
        sourceUrl:
          "https://www.foodnetwork.com/recipes/citrus-cranberry-sauce-recipe-1909012",
        rating: "Allergy-friendly classic",
      },
      {
        id: "sparkling-water",
        name: "Still + sparkling water",
        group: "Drink \xB7 Nonalcoholic",
        style: "drink",
        minutes: 5,
        oven: 0,
        temp: 0,
        cost: 24,
        portion: "2\u20133 drinks per guest through dinner",
        vessel: "Chilled bottles or carafes + water glasses",
        ingredients: [
          ["Still water", 1.25, "servings", "Beverages"],
          ["Sparkling water", 1, "servings", "Beverages"],
        ],
        easier: "",
        easyCost: 24,
        makeAhead: "Chill the day before",
        finish: "Set water where guests can serve themselves.",
        kidFriendly: !0,
        audience: "all",
      },
      {
        id: "wine",
        name: "Wine for dinner",
        group: "Drink \xB7 Alcoholic",
        style: "drink",
        minutes: 5,
        oven: 0,
        temp: 0,
        cost: 70,
        portion: "About 2 glasses per adult",
        vessel: "Wine glasses + opener",
        ingredients: [["Wine", 0.5, "bottles", "Beverages"]],
        easier: "",
        easyCost: 70,
        makeAhead: "Buy ahead; chill whites before guests arrive",
        finish: "Open one bottle at a time so the station stays clean.",
        audience: "adults",
      },
      {
        id: "signature-cocktail",
        name: "Signature cocktail",
        group: "Drink \xB7 Alcoholic",
        style: "drink",
        minutes: 20,
        oven: 0,
        temp: 0,
        cost: 85,
        portion: "1\xBD cocktails per adult",
        vessel: "Cocktail glasses + pitcher or shaker",
        ingredients: [
          ["Cocktail base / spirits", 0.11, "750 ml bottles", "Beverages"],
          ["Cocktail mixer", 0.18, "bottles", "Beverages"],
          ["Cocktail ice", 0.75, "lb", "Beverages"],
        ],
        easier: "",
        easyCost: 85,
        makeAhead: "Batch the non-carbonated base the morning of",
        finish: "Add ice and bubbles at serving time.",
        audience: "adults",
      },
      {
        id: "kids-cider",
        name: "Kids\u2019 cider + juice",
        group: "Drink \xB7 Kids",
        style: "drink",
        minutes: 5,
        oven: 0,
        temp: 0,
        cost: 18,
        portion: "2 drinks per child",
        vessel: "Kid-safe cups",
        ingredients: [["Apple cider / juice", 2, "servings", "Beverages"]],
        easier: "",
        easyCost: 18,
        makeAhead: "Chill the day before",
        finish: "Keep a small pitcher at the kids\u2019 table.",
        kidFriendly: !0,
        audience: "kids",
      },
      {
        id: "coffee-tea",
        name: "Coffee + tea after dinner",
        group: "Drink \xB7 After dinner",
        style: "drink",
        minutes: 10,
        oven: 0,
        temp: 0,
        cost: 22,
        portion: "1\xBD hot drinks per adult",
        vessel: "Coffee cups / mugs + teaspoons",
        ingredients: [
          ["Coffee", 0.08, "lb", "Beverages"],
          ["Tea bags", 0.5, "each", "Beverages"],
          ["Coffee cream", 0.08, "cup", "Dairy"],
        ],
        easier: "",
        easyCost: 22,
        makeAhead: "Stage cups, tea and sugar before dinner",
        finish: "Brew coffee when dessert comes out.",
        audience: "adults",
      },
    ],
    cv = [
      "ba-dry-turkey",
      "ba-simple-stuffing",
      "ba-mashed",
      "gravy",
      "ba-greenbeans",
      "ba-fancy-cranberry",
      "ba-parker-rolls",
      "ba-pumpkin-pie",
    ],
    yL = {
      Main: "main",
      Starch: "starch",
      Vegetable: "vegetable",
      Fresh: "vegetable",
      Bread: "bread",
      Sauce: "sauce-condiment",
      Dessert: "dessert",
      Appetizer: "appetizer",
    },
    CL = new Set(["cranberry", "ba-fancy-cranberry", "fn-citrus-cranberry"]);
  function AL(e) {
    return CL.has(e.id)
      ? "sauce-condiment"
      : e.group === "Drink \xB7 Alcoholic"
        ? "alcohol"
        : e.group === "Drink \xB7 After dinner"
          ? "coffee"
          : e.group.startsWith("Drink")
            ? "non-alcoholic-drink"
            : yL[e.group] || "other";
  }
  function $c(e) {
    if (jn[e.id]) return structuredClone(jn[e.id]);
    let a = AL(e),
      t = e.ingredients
        .map(([u, r, s, o]) => ({ name: u, quantity: r, unit: s, category: o }))
        .filter((u) => !(e.id === "turkey" && u.name === "Turkey")),
      l = [
        {
          id: "prepare",
          title: `Prepare ${e.name}`,
          phase: "prep",
          durationMinutes: Math.max(5, e.minutes - (e.oven || 0)),
          handsOn: !0,
        },
        {
          id: "finish",
          title: e.oven ? `Cook ${e.name}` : `Finish ${e.name}`,
          phase: e.oven ? "cook" : "finish",
          durationMinutes: Math.max(1, e.oven || 5),
          dependsOn: ["prepare"],
          resourceRequirements: e.oven
            ? [{ type: "oven", temperatureF: e.temp || void 0 }]
            : [],
        },
      ],
      n =
        e.audience === "kids"
          ? "children"
          : a === "alcohol"
            ? "adult-drinkers"
            : e.audience === "adults"
              ? "adults"
              : "headcount";
    return {
      id: e.id,
      title: e.name,
      mealRole: a,
      baseServings: 1,
      servingStrategy: { basis: n },
      ingredients: t,
      prepTasks: l,
      dietaryTags: [],
      allergens: [],
      metadataReviewed: !1,
      allergenReviewed: !1,
      recipeComplete: !1,
      unsupportedReason:
        "Recipe method, yield, equipment and safety metadata are not fully reviewed yet.",
      description: e.portion,
      makeAhead: e.makeAhead,
      finish: e.finish,
      sourceUrl: e.sourceUrl || null,
      estimatedCost: e.cost,
      imageKey: e.id,
    };
  }
  function fv(e) {
    let a = { ...e.recipes };
    for (let t of dv) {
      let l = jn[t.id],
        n = a[t.id];
      l
        ? (!n || n.recipeComplete === !1 || n.provenance?.type !== "user") &&
          (a[t.id] = $c(t))
        : n || (a[t.id] = $c(t));
    }
    return { ...e, recipes: a };
  }
  function LL(e) {
    let a = fv(e);
    return {
      ...a,
      dishes: {
        ...a.dishes,
        ...Object.fromEntries(
          cv
            .filter((t) => !a.dishes?.[t])
            .map((t) => [
              t,
              { on: !0, recipeId: t, preparationMode: "homemade" },
            ]),
        ),
      },
    };
  }
  var Q = it(cl(), 1);
  function bs(e, a) {
    let t = a.required?.unit || a.unit || "each",
      l = (n) => e.fromCanonical(Number(n) || 0, a.dimension, t) ?? 0;
    return {
      unit: t,
      required: l(a.requiredCanonical),
      have: l(a.haveCanonical),
      purchased: l(a.purchasedCanonical),
      remaining: l(a.remainingCanonical),
    };
  }
  function pv(e, a, t, l) {
    let n = bs(a, l);
    return e.recordPurchase(
      t,
      l.key,
      n.purchased + n.remaining,
      n.unit,
      l.actualCost,
      l.committedCost,
    );
  }
  var SL = [
      [1 / 8, "\u215B"],
      [1 / 4, "\xBC"],
      [1 / 3, "\u2153"],
      [3 / 8, "\u215C"],
      [1 / 2, "\xBD"],
      [5 / 8, "\u215D"],
      [2 / 3, "\u2154"],
      [3 / 4, "\xBE"],
      [7 / 8, "\u215E"],
    ],
    xL = {
      cup: ["cup", "cups"],
      serving: ["serving", "servings"],
      package: ["pack", "packs"],
      pack: ["pack", "packs"],
      bag: ["bag", "bags"],
      box: ["box", "boxes"],
      bottle: ["bottle", "bottles"],
      can: ["can", "cans"],
      roll: ["roll", "rolls"],
      set: ["set", "sets"],
    },
    IL = {
      floz: "fl oz",
      each: "each",
      lb: "lb",
      oz: "oz",
      tbsp: "tbsp",
      tsp: "tsp",
      ml: "ml",
      l: "L",
      g: "g",
      kg: "kg",
    };
  function Ba(e, a = "each") {
    let t = Math.max(0, Number(e) || 0),
      l = Math.floor(t + 1e-10),
      n = Math.max(0, t - l),
      u = SL.find(([p]) => Math.abs(n - p) < 1e-8),
      r =
        t > 0 && t < 0.01
          ? Math.min(12, Math.max(3, Math.ceil(-Math.log10(t)) + 1))
          : 2,
      s = t > 0 && t < 1e-10 ? Number(t.toPrecision(2)) : Number(t.toFixed(r)),
      o = !u && Math.abs(s - t) > Math.max(1, t) * 1e-9,
      d = u
        ? (l ? l + " " : "") + u[1]
        : t > 0 && t < 1e-10
          ? t.toLocaleString("en-US", {
              maximumSignificantDigits: 2,
              useGrouping: !1,
            })
          : t.toLocaleString("en-US", { maximumFractionDigits: r }),
      c = xL[a]?.[Math.abs(t - 1) < 1e-8 ? 0 : 1] || IL[a] || a;
    return {
      quantity: d,
      unit: c,
      approximate: o,
      text: (o ? "\u2248 " : "") + d + " " + c,
    };
  }
  function af(e) {
    let a = Object.fromEntries(
      Object.entries(e.recipes || {}).map(([t, l]) => {
        let n = (l.prepTasks || []).filter((s) => !s.crowCrownHandoff),
          u = ["purchased", "guest-provided"],
          r = (s) =>
            n.some(
              (o) =>
                o.phase === s &&
                (!o.appliesTo ||
                  o.appliesTo.includes("any") ||
                  u.every((d) => o.appliesTo.includes(d))),
            );
        return (
          r("receive") ||
            n.push({
              id: "cc-receive",
              title: "Receive or collect " + l.title,
              phase: "receive",
              durationMinutes: 5,
              handsOn: !0,
              appliesTo: u,
              fixedStartOffsetMinutes: -90,
              dependsOn: [],
              crowCrownHandoff: !0,
            }),
          r("serve") ||
            n.push({
              id: "cc-serve",
              title: "Stage + serve " + l.title,
              phase: "serve",
              durationMinutes: 5,
              handsOn: !0,
              appliesTo: u,
              finishOffsetMinutes: 0,
              dependsOn: [],
              crowCrownHandoff: !0,
            }),
          [t, { ...l, prepTasks: n }]
        );
      }),
    );
    return { ...e, recipes: a };
  }
  function or(e) {
    let a = String(e || "")
      .toLowerCase()
      .replace(/[_ ]/g, "-");
    return /ahead|week|days/.test(a)
      ? "ahead"
      : /day-before|previous|eve/.test(a)
        ? "day-before"
        : /morning|day-of/.test(a)
          ? "morning"
          : /before|arrival|stage|receive|setup/.test(a)
            ? "before-guests"
            : /serve|hold/.test(a)
              ? "serve"
              : "cook";
  }
  function tf(e, a, t) {
    let l = new Map();
    for (let s of Object.values(e.recipes || {}))
      for (let o of s.ingredients || []) {
        let d = o.crowCrownBaseKey || t.ingredientIdentity(o);
        (l.has(d) || l.set(d, new Set()),
          l.get(d).add(a.normalizeUnit(o.unit).dimension));
      }
    let n = new Set([...l].filter(([, s]) => s.size > 1).map(([s]) => s)),
      u = Object.fromEntries(
        Object.entries(e.recipes || {}).map(([s, o]) => [
          s,
          {
            ...o,
            ingredients: (o.ingredients || []).map((d) => {
              let c = d.crowCrownBaseKey || t.ingredientIdentity(d);
              if (!n.has(c)) return d;
              let p = a.normalizeUnit(d.unit).dimension;
              return { ...d, ingredientId: c + "|" + p, crowCrownBaseKey: c };
            }),
          },
        ]),
      ),
      r = (s) => {
        let o = { ...(s || {}) };
        for (let d of n) {
          let c = o[d];
          if (c == null) continue;
          let p = a.normalizeUnit(
              typeof c == "number" ? "each" : c.unit || "each",
            ).dimension,
            f = d + "|" + p;
          l.get(d).has(p) && o[f] == null && (o[f] = structuredClone(c));
        }
        return o;
      };
    return {
      ...e,
      recipes: u,
      pantry: r(e.pantry),
      shoppingLedger: r(e.shoppingLedger),
    };
  }
  function mv(e, a, t, l) {
    let n = Object.keys(e.dishes || {}).find((c) => {
      let p = t.recipeForDish(e, c);
      return (
        e.dishes[c]?.on &&
        a.dishRequirementMode(c, e) === "ingredients" &&
        (p?.isTurkey || p?.turkeyRules)
      );
    });
    if (!n) return e;
    let u = t
      .recipeForDish(e, n)
      ?.ingredients.find((c) => l.isWholeTurkeyIngredient(c));
    if (!u) return e;
    let r = l.ingredientIdentity(u);
    if (
      Object.keys(e.dishes || {}).some(
        (c) =>
          c !== n &&
          e.dishes[c]?.on &&
          a.dishRequirementMode(c, e) === "ingredients" &&
          t
            .recipeForDish(e, c)
            ?.ingredients.some((p) => l.ingredientIdentity(p) === r),
      )
    )
      return e;
    let o = "turkey:whole-bird",
      d = (c) =>
        c?.[o] == null && c?.[r] != null
          ? { ...c, [o]: structuredClone(c[r]) }
          : c;
    return {
      ...e,
      pantry: d(e.pantry),
      shoppingLedger: d(e.shoppingLedger),
      costCatalog: d(e.costCatalog),
    };
  }
  var vs = [
    ["ahead", "A few days ahead", "Start the longer lead tasks."],
    ["day-before", "The day before", "Finish the make-ahead steps."],
    ["morning", "Morning of", "Set up before cooking gets busy."],
    [
      "before-guests",
      "Before guests arrive",
      "Receive dishes and stage the room.",
    ],
    ["cook", "Cook + finish", "Follow the recipe and kitchen schedule."],
    ["serve", "Serve + host", "Bring the final pieces to the table."],
  ];
  function ys(e) {
    return e.durationMinutes
      ? e.durationMinutes +
          " min" +
          (e.handsOn === !0 ? " hands-on" : e.handsOn === !1 ? " elapsed" : "")
      : "Time flexible";
  }
  function Cs(e) {
    let t = (
      e.resourceRequirements?.length
        ? e.resourceRequirements
        : e.assignments || []
    )
      .map((l) => {
        let n = l.type || l.resourceType,
          u = { oven: "Oven", burner: "Stovetop", host: "Hands-on" }[n] || n;
        return u
          ? u +
              (l.slots > 1 ? " \xB7 " + l.slots + " slots" : "") +
              (l.temperatureF != null
                ? " \xB7 " + l.temperatureF + "\xB0F"
                : "")
          : null;
      })
      .filter(Boolean);
    return [...new Set(t)];
  }
  function lf(e, a) {
    let t = new Map(a.map((l) => [l.taskId, l]));
    return (e.dependsOn || []).map((l) => t.get(l)).filter(Boolean);
  }
  function gv(e, a) {
    let t = new Map((a?.tasks || []).map((u, r) => [u.taskId, r])),
      l = e.filter((u) => !u.completed),
      n = l.filter((u) => lf(u, e).every((r) => r.completed));
    return (
      [...(n.length ? n : l)].sort(
        (u, r) =>
          vs.findIndex(([s]) => s === or(u.phase)) -
            vs.findIndex(([s]) => s === or(r.phase)) ||
          (t.get(u.taskId) ?? 1 / 0) - (t.get(r.taskId) ?? 1 / 0),
      )[0] || null
    );
  }
  function kL(e) {
    let a = new Date(e);
    return !e || !Number.isFinite(a.getTime())
      ? "unscheduled"
      : a.getFullYear() +
          "-" +
          String(a.getMonth() + 1).padStart(2, "0") +
          "-" +
          String(a.getDate()).padStart(2, "0");
  }
  function hv(e) {
    let a = new Date(e);
    return e && Number.isFinite(a.getTime())
      ? new Date(a.getTime() - a.getTimezoneOffset() * 6e4)
          .toISOString()
          .slice(0, 16)
      : "";
  }
  function bv(e) {
    let a = new Map();
    for (let t of e) {
      let l = kL(t.startAt);
      (a.has(l) ||
        a.set(l, {
          key: l,
          label:
            l === "unscheduled"
              ? "Unscheduled"
              : new Date(t.startAt).toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "short",
                  day: "numeric",
                }),
          shortLabel:
            l === "unscheduled"
              ? "Unscheduled"
              : new Date(t.startAt).toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                }),
          tasks: [],
        }),
        a.get(l).tasks.push(t));
    }
    return [...a.values()];
  }
  function vv(e) {
    let a = new Map(e.tasks.map((t) => [t.taskId, t]));
    return e.issues.map((t) => {
      let l = a.get(t.taskId);
      return {
        ...t,
        title:
          t.title ||
          (l
            ? l.title + " needs a timing adjustment"
            : t.type === "dependency-cycle"
              ? "Some steps depend on each other"
              : "Schedule needs review"),
        explanation:
          t.explanation ||
          t.detail ||
          (t.type === "dependency-conflict"
            ? "This step finishes after a step that depends on it."
            : l
              ? "This step overlaps the available " + Cs(l).join(" / ") + "."
              : t.reason || "Review the current cooking sequence."),
        recommendation:
          t.recommendation ||
          t.suggestion ||
          "Adjust the start time or duration, then check the schedule again.",
      };
    });
  }
  var Ls = it(cl());
  var yv = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(),
    As = (...e) =>
      e
        .filter((a, t, l) => !!a && a.trim() !== "" && l.indexOf(a) === t)
        .join(" ")
        .trim();
  var dr = it(cl());
  var Cv = {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };
  var Av = (0, dr.forwardRef)(
    (
      {
        color: e = "currentColor",
        size: a = 24,
        strokeWidth: t = 2,
        absoluteStrokeWidth: l,
        className: n = "",
        children: u,
        iconNode: r,
        ...s
      },
      o,
    ) =>
      (0, dr.createElement)(
        "svg",
        {
          ref: o,
          ...Cv,
          width: a,
          height: a,
          stroke: e,
          strokeWidth: l ? (Number(t) * 24) / Number(a) : t,
          className: As("lucide", n),
          ...s,
        },
        [
          ...r.map(([d, c]) => (0, dr.createElement)(d, c)),
          ...(Array.isArray(u) ? u : [u]),
        ],
      ),
  );
  var D = (e, a) => {
    let t = (0, Ls.forwardRef)(({ className: l, ...n }, u) =>
      (0, Ls.createElement)(Av, {
        ref: u,
        iconNode: a,
        className: As(`lucide-${yv(e)}`, l),
        ...n,
      }),
    );
    return ((t.displayName = `${e}`), t);
  };
  var Yn = D("Armchair", [
    ["path", { d: "M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3", key: "irtipd" }],
    [
      "path",
      {
        d: "M3 16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V11a2 2 0 0 0-4 0z",
        key: "1qyhux",
      },
    ],
    ["path", { d: "M5 18v2", key: "ppbyun" }],
    ["path", { d: "M19 18v2", key: "gy7782" }],
  ]);
  var xe = D("ArrowUpRight", [
    ["path", { d: "M7 7h10v10", key: "1tivn9" }],
    ["path", { d: "M7 17 17 7", key: "1vkiza" }],
  ]);
  var Jn = D("CalendarDays", [
    ["path", { d: "M8 2v4", key: "1cmpym" }],
    ["path", { d: "M16 2v4", key: "4m81vk" }],
    [
      "rect",
      { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" },
    ],
    ["path", { d: "M3 10h18", key: "8toen8" }],
    ["path", { d: "M8 14h.01", key: "6423bh" }],
    ["path", { d: "M12 14h.01", key: "1etili" }],
    ["path", { d: "M16 14h.01", key: "1gbofw" }],
    ["path", { d: "M8 18h.01", key: "lrp35t" }],
    ["path", { d: "M12 18h.01", key: "mhygvu" }],
    ["path", { d: "M16 18h.01", key: "kzsmim" }],
  ]);
  var ba = D("Check", [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]]);
  var cr = D("ChefHat", [
    [
      "path",
      {
        d: "M17 21a1 1 0 0 0 1-1v-5.35c0-.457.316-.844.727-1.041a4 4 0 0 0-2.134-7.589 5 5 0 0 0-9.186 0 4 4 0 0 0-2.134 7.588c.411.198.727.585.727 1.041V20a1 1 0 0 0 1 1Z",
        key: "1qvrer",
      },
    ],
    ["path", { d: "M6 17h12", key: "1jwigz" }],
  ]);
  var rl = D("ChevronRight", [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]]);
  var qa = D("CircleAlert", [
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
    ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
    ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }],
  ]);
  var Hl = D("ClipboardList", [
    [
      "rect",
      {
        width: "8",
        height: "4",
        x: "8",
        y: "2",
        rx: "1",
        ry: "1",
        key: "tgr4d6",
      },
    ],
    [
      "path",
      {
        d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",
        key: "116196",
      },
    ],
    ["path", { d: "M12 11h4", key: "1jrz19" }],
    ["path", { d: "M12 16h4", key: "n85exb" }],
    ["path", { d: "M8 11h.01", key: "1dfujw" }],
    ["path", { d: "M8 16h.01", key: "18s6g9" }],
  ]);
  var il = D("Clock3", [
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
    ["polyline", { points: "12 6 12 12 16.5 12", key: "1aq6pp" }],
  ]);
  var fr = D("Download", [
    ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
    ["polyline", { points: "7 10 12 15 17 10", key: "2ggqvy" }],
    ["line", { x1: "12", x2: "12", y1: "15", y2: "3", key: "1vk2je" }],
  ]);
  var xt = D("Ellipsis", [
    ["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }],
    ["circle", { cx: "19", cy: "12", r: "1", key: "1wjl8i" }],
    ["circle", { cx: "5", cy: "12", r: "1", key: "1pcz8c" }],
  ]);
  var It = D("House", [
    [
      "path",
      { d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8", key: "5wwlr5" },
    ],
    [
      "path",
      {
        d: "M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
        key: "1d0kgt",
      },
    ],
  ]);
  var kt = D("Plus", [
    ["path", { d: "M5 12h14", key: "1ays0h" }],
    ["path", { d: "M12 5v14", key: "s699le" }],
  ]);
  var Xn = D("Printer", [
    [
      "path",
      {
        d: "M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2",
        key: "143wyd",
      },
    ],
    ["path", { d: "M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6", key: "1itne7" }],
    [
      "rect",
      { x: "6", y: "14", width: "12", height: "8", rx: "1", key: "1ue0tg" },
    ],
  ]);
  var pr = D("Search", [
    ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
    ["path", { d: "m21 21-4.3-4.3", key: "1qie3q" }],
  ]);
  var Wn = D("Settings2", [
    ["path", { d: "M20 7h-9", key: "3s1dr2" }],
    ["path", { d: "M14 17H5", key: "gfn3mx" }],
    ["circle", { cx: "17", cy: "17", r: "3", key: "18b49y" }],
    ["circle", { cx: "7", cy: "7", r: "3", key: "dfmy0x" }],
  ]);
  var El = D("ShoppingBag", [
    [
      "path",
      {
        d: "M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z",
        key: "hou9p0",
      },
    ],
    ["path", { d: "M3 6h18", key: "d0wm0j" }],
    ["path", { d: "M16 10a4 4 0 0 1-8 0", key: "1ltviw" }],
  ]);
  var _n = D("SlidersHorizontal", [
    ["line", { x1: "21", x2: "14", y1: "4", y2: "4", key: "obuewd" }],
    ["line", { x1: "10", x2: "3", y1: "4", y2: "4", key: "1q6298" }],
    ["line", { x1: "21", x2: "12", y1: "12", y2: "12", key: "1iu8h1" }],
    ["line", { x1: "8", x2: "3", y1: "12", y2: "12", key: "ntss68" }],
    ["line", { x1: "21", x2: "16", y1: "20", y2: "20", key: "14d8ph" }],
    ["line", { x1: "12", x2: "3", y1: "20", y2: "20", key: "m0wm8r" }],
    ["line", { x1: "14", x2: "14", y1: "2", y2: "6", key: "14e1ph" }],
    ["line", { x1: "8", x2: "8", y1: "10", y2: "14", key: "1i6ji0" }],
    ["line", { x1: "16", x2: "16", y1: "18", y2: "22", key: "1lctlv" }],
  ]);
  var sl = D("Sparkles", [
    [
      "path",
      {
        d: "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",
        key: "4pj2yx",
      },
    ],
    ["path", { d: "M20 3v4", key: "1olli1" }],
    ["path", { d: "M22 5h-4", key: "1gvqau" }],
    ["path", { d: "M4 17v2", key: "vumght" }],
    ["path", { d: "M5 18H3", key: "zchphs" }],
  ]);
  var mr = D("Trash2", [
    ["path", { d: "M3 6h18", key: "d0wm0j" }],
    ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" }],
    ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }],
    ["line", { x1: "10", x2: "10", y1: "11", y2: "17", key: "1uufr5" }],
    ["line", { x1: "14", x2: "14", y1: "11", y2: "17", key: "xtxkd" }],
  ]);
  var gr = D("Upload", [
    ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
    ["polyline", { points: "17 8 12 3 7 8", key: "t8dd8p" }],
    ["line", { x1: "12", x2: "12", y1: "3", y2: "15", key: "widbto" }],
  ]);
  var hr = D("Users", [
    ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
    ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
    ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87", key: "kshegd" }],
    ["path", { d: "M16 3.13a4 4 0 0 1 0 7.75", key: "1da9ce" }],
  ]);
  var Ka = D("Utensils", [
    ["path", { d: "M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2", key: "cjf0a3" }],
    ["path", { d: "M7 2v20", key: "1473qp" }],
    [
      "path",
      { d: "M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7", key: "j28e5" },
    ],
  ]);
  var br = D("WalletCards", [
    [
      "rect",
      { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" },
    ],
    ["path", { d: "M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2", key: "4125el" }],
    [
      "path",
      {
        d: "M3 11h3c.8 0 1.6.3 2.1.9l1.1.9c1.6 1.6 4.1 1.6 5.7 0l1.1-.9c.5-.5 1.3-.9 2.1-.9H21",
        key: "1dpki6",
      },
    ],
  ]);
  var Ga = D("X", [
    ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
    ["path", { d: "m6 6 12 12", key: "d8bk6v" }],
  ]);
  var i = it(vr(), 1),
    ol = {
      state: Pc,
      planning: Xc,
      persistence: _c,
      recipes: Nc,
      menu: Uc,
      shopping: Zc,
      seating: jc,
      printables: Jc,
      catalog: ef,
      ingredients: Gc,
      units: Ec,
    },
    Iv = {
      "butter-mash.webp": "/selected-interface/butter-mash.webp",
      "cranberry-jelly.webp": "/selected-interface/cranberry-jelly.webp",
      "editorial-recipes.webp": "/selected-interface/editorial-recipes.webp",
      "green-beans.webp": "/selected-interface/green-beans.webp",
      "honey-brussels.webp": "/selected-interface/honey-brussels.webp",
      "marble-kitchen.webp": "/selected-interface/marble-kitchen.webp",
      "natural-table.webp": "/selected-interface/natural-table.webp",
      "organic-editorial-hero.webp":
        "/selected-interface/organic-editorial-hero.webp",
      "organic-stuffing.webp": "/selected-interface/organic-stuffing.webp",
      "organic-turkey.webp": "/selected-interface/organic-turkey.webp",
      "parker-rolls.webp": "/selected-interface/parker-rolls.webp",
      "pumpkin-pie.webp": "/selected-interface/pumpkin-pie.webp",
      "recipe-photography.webp": "/selected-interface/recipe-photography.webp",
      "roasted-sweet.webp": "/selected-interface/roasted-sweet.webp",
    };
  function Cr(e) {
    if (!Iv[e]) throw new Error("Review resource missing: " + e);
    return Iv[e];
  }
  var xs;
  function df() {
    return customerStorage;
  }
  function BL() {
    const saved = ol.persistence.loadState(df(), cf);
    return saved
      ? of(saved, ol)
      : ol.catalog.withCatalog(ol.state.createPartyState());
  }
  var cf = "crow-crown:customer-plan",
    ks = Cr("marble-kitchen.webp"),
    ff = Cr("organic-editorial-hero.webp"),
    nf = [
      ["home", "Home", It],
      ["plan", "Plan", Hl],
      ["menu", "Menu", Ka],
      ["shopping", "Shopping", El],
    ],
    pf = [
      {
        title: "Plan",
        items: [
          ["guests", "Guests", hr],
          ["menu", "Menu", Ka],
          ["seating", "Table & seating", Yn],
          ["experience", "Experience", sl],
        ],
      },
      {
        title: "Prepare",
        items: [
          ["shopping", "Shopping", El],
          ["prep", "Prep checklist", cr],
          ["budget", "Budget", br],
        ],
      },
      {
        title: "On the day",
        items: [
          ["timeline", "Timeline", il],
          ["host", "Party day", Jn],
          ["printables", "Printables", Xn],
        ],
      },
    ],
    sf = Object.fromEntries([
      ["home", "Home"],
      ["plan", "Party plan"],
      ["party", "Event details"],
      ...pf.flatMap((e) => e.items.map(([a, t]) => [a, t])),
    ]);
  function mf(e) {
    if (e.key !== "Tab") return;
    let a = [
        ...e.currentTarget.querySelectorAll(
          "button, input, select, textarea, a[href], summary",
        ),
      ].filter((n) => !n.disabled && n.getClientRects().length),
      t = a[0],
      l = a[a.length - 1];
    e.shiftKey && document.activeElement === t
      ? (e.preventDefault(), l?.focus())
      : !e.shiftKey &&
        document.activeElement === l &&
        (e.preventDefault(), t?.focus());
  }
  function kv(e, a, t = 32) {
    let l = window.visualViewport;
    !l ||
      !e ||
      !a ||
      ((e.style.top = l.offsetTop + "px"),
      (e.style.height = l.height + "px"),
      (a.style.maxHeight = Math.max(160, l.height - t) + "px"));
  }
  var qL = {
      "gratitude-cards": {
        id: "gratitude-cards",
        title: "Gratitude cards",
        description: "A quiet card at each place setting.",
        supplies: [
          {
            key: "gratitude-cards",
            name: "Gratitude cards",
            quantityPerPerson: 1,
            unit: "each",
            estimatedUnitCost: 0.5,
          },
        ],
        tasks: [
          {
            id: "stage",
            title: "Place gratitude cards at each setting",
            phase: "finish",
            durationMinutes: 10,
          },
        ],
        zoneRequirement: "dining",
        printables: [{ type: "gratitude-cards" }],
      },
      "kids-table": {
        id: "kids-table",
        title: "Kids table activity",
        description: "A simple activity that can live at the table.",
        supplies: [
          {
            key: "kids-activity-kits",
            name: "Kids activity kits",
            quantityPerPerson: 0,
            fixedQuantity: 1,
            unit: "set",
            estimatedUnitCost: 12,
          },
        ],
        tasks: [
          {
            id: "stage",
            title: "Set the kids activity at the table",
            phase: "finish",
            durationMinutes: 10,
          },
        ],
        zoneRequirement: "kids",
        printables: [{ type: "kids-activity-cards" }],
      },
      "after-dinner": {
        id: "after-dinner",
        title: "After-dinner game",
        description: "One easy thing to pull out after dessert.",
        supplies: [],
        tasks: [
          {
            id: "stage",
            title: "Stage the after-dinner game",
            phase: "finish",
            durationMinutes: 5,
          },
        ],
        zoneRequirement: "lounge",
        printables: [{ type: "game-cards" }],
      },
    },
    OL = [
      ["house:ice", "Ice", 2, "bag"],
      ["house:trash-bags", "Trash bags", 1, "box"],
      ["house:foil", "Aluminum foil", 1, "roll"],
      ["house:wrap", "Food wrap", 1, "roll"],
      ["house:dish-soap", "Dish soap", 1, "each"],
      ["house:toilet-paper", "Toilet paper", 1, "pack"],
      ["house:paper-towels", "Paper towels", 1, "pack"],
      ["house:lighter", "Lighter / matches", 1, "each"],
    ],
    Is = (e, a = 0) =>
      Number(e || 0).toLocaleString(void 0, { maximumFractionDigits: a }),
    $n = (e) =>
      "$" + Number(e || 0).toLocaleString(void 0, { maximumFractionDigits: 0 }),
    uf = (e) =>
      String(e || "")
        .split(",")
        .map((a) => a.trim().toLowerCase())
        .filter(Boolean),
    gf = (e) =>
      e +
      "-" +
      Date.now().toString(36) +
      "-" +
      Math.random().toString(36).slice(2, 7);
  function yr(e) {
    let a = {
      "ba-dry-turkey": "organic-turkey",
      turkey: "organic-turkey",
      "ba-simple-stuffing": "organic-stuffing",
      stuffing: "organic-stuffing",
      "ba-mashed": "butter-mash",
      potatoes: "butter-mash",
      "ba-honey-brussels": "honey-brussels",
      "ba-greenbeans": "green-beans",
      "ba-parker-rolls": "parker-rolls",
      "ba-pumpkin-pie": "pumpkin-pie",
      pie: "pumpkin-pie",
      "ba-roasted-sweet": "roasted-sweet",
      sweet: "roasted-sweet",
      "ba-fancy-cranberry": "cranberry-jelly",
    };
    if (a[e?.id])
      return {
        backgroundImage: "url(" + Cr(a[e.id] + ".webp") + ")",
        backgroundSize: "cover",
        backgroundPosition: "center",
      };
    let l = {
      "ba-dry-turkey": [0, 0],
      "ba-simple-stuffing": [1, 0],
      "ba-mashed": [2, 0],
      "ba-honey-brussels": [0, 1],
      "ba-greenbeans": [1, 1],
      "ba-pumpkin-pie": [2, 1],
      "ba-parker-rolls": [0, 2],
      "ba-roasted-sweet": [1, 2],
      "ba-fancy-cranberry": [2, 2],
    }[e?.id];
    if (l)
      return {
        backgroundImage: "url(" + Cr("editorial-recipes.webp") + ")",
        backgroundSize: "400% 300%",
        backgroundPosition:
          [5.5556, 50, 94.4444][l[0]] + "% " + l[1] * 50 + "%",
      };
    let u = {
      turkey: [0, 0],
      stuffing: [1, 0],
      potatoes: [2, 0],
      gravy: [3, 0],
      greens: [4, 0],
      cranberry: [5, 0],
      rolls: [0, 1],
      pie: [1, 1],
      salad: [2, 1],
      mac: [3, 1],
      sweet: [4, 1],
      app: [5, 1],
      "sparkling-water": [0, 2],
      wine: [1, 2],
      "signature-cocktail": [2, 2],
      "kids-cider": [3, 2],
      "coffee-tea": [4, 2],
    }[e?.id];
    return u
      ? {
          backgroundImage: "url(" + Cr("recipe-photography.webp") + ")",
          backgroundSize: "600% 300%",
          backgroundPosition: u[0] * 20 + "% " + u[1] * 50 + "%",
        }
      : null;
  }
  function of(e, a) {
    let t = a.catalog.withCatalog(e),
      l = {
        turkey: "ba-dry-turkey",
        stuffing: "ba-simple-stuffing",
        potatoes: "ba-mashed",
        greens: "ba-greenbeans",
        cranberry: "ba-fancy-cranberry",
        rolls: "ba-parker-rolls",
        pie: "ba-pumpkin-pie",
      },
      n = { ...(t.dishes || {}) },
      u = !1;
    for (let [r, s] of Object.entries(l)) {
      let o = n[r];
      !o?.on ||
        n[s]?.on ||
        ((n[s] = { ...o, on: !0, recipeId: s }),
        (n[r] = { ...o, on: !1 }),
        (u = !0));
    }
    return (
      u && (t = { ...t, dishes: n }),
      (!t.activities || Object.keys(t.activities).length === 0) &&
        (t = { ...t, activities: qL }),
      (!t.manualShoppingItems || t.manualShoppingItems.length === 0) &&
        (t = {
          ...t,
          manualShoppingItems: OL.map(([r, s, o, d]) => ({
            key: r,
            name: s,
            quantity: o,
            unit: d,
          })),
        }),
      (!t.tables || t.tables.length === 0) &&
        (t = {
          ...t,
          tables: [
            {
              id: "dining-table-1",
              name: "Dining table",
              shape: "rectangle",
              use: "dining",
              seatCapacity: 12,
              lengthIn: 96,
              widthIn: 40,
              linenDropIn: 12,
            },
          ],
        }),
      (t = tf(af(t), a.units, a.ingredients)),
      mv(t, a.menu, a.recipes, a.ingredients)
    );
  }
  function ML() {
    let [e, a] = (0, Q.useState)(ol),
      [t, l] = (0, Q.useState)(BL),
      [n, u] = (0, Q.useState)("home"),
      [r, s] = (0, Q.useState)(null),
      [o, d] = (0, Q.useState)("selected"),
      [c, p] = (0, Q.useState)(""),
      [f, m] = (0, Q.useState)(""),
      [v, C] = (0, Q.useState)(""),
      [k, h] = (0, Q.useState)(!1),
      g = (0, Q.useRef)(df());
    (0, Q.useEffect)(() => {
      if (!k) return;
      let q = document.activeElement,
        J = window.setTimeout(
          () => document.querySelector(".nav-drawer button")?.focus(),
          0,
        ),
        Be = (na) => {
          na.key === "Escape" && h(!1);
        },
        Ne = document.body.style.overflow;
      return (
        (document.body.style.overflow = "hidden"),
        document.addEventListener("keydown", Be),
        () => {
          ((document.body.style.overflow = Ne),
            document.removeEventListener("keydown", Be),
            window.clearTimeout(J),
            q?.focus());
        }
      );
    }, [k]);
    let b = (q) => {
        if (!e || !t) return;
        let J = e.planning.derivePlan(t).planning.planningHeadcount,
          Be = Object.entries(t.dishes || {})
            .filter(([, ye]) => ye?.on)
            .map(([ye]) => ye)
            .sort()
            .join(","),
          Ne = structuredClone(t),
          na = tf(af(q(Ne) || Ne), e.units, e.ingredients),
          T = e.planning.derivePlan(na).planning.planningHeadcount,
          te = Object.entries(na.dishes || {})
            .filter(([, ye]) => ye?.on)
            .map(([ye]) => ye)
            .sort()
            .join(",");
        J !== T
          ? m(
              "HEADCOUNT UPDATED " +
                J +
                " \u2192 " +
                T +
                ". Shopping and prep recalculated; purchases preserved.",
            )
          : Be !== te &&
            m(
              "MENU UPDATED. Shopping and prep recalculated for " +
                T +
                " guests; purchases preserved.",
            );
        let He = g.current;
        if (He) {
          let ye = e.persistence.saveState(He, na, {
            key: cf,
            expectedRevision: t.revision,
          });
          if (
            (l(ye.ok ? ye.state : ye.current),
            C(
              ye.ok
                ? "Saving to your account…"
                : "A newer saved version was reloaded. Please try your change again.",
            ),
            !ye.ok)
          )
            return (m(""), window.setTimeout(() => C(""), 4e3), !1);
        } else (l(na), C("Saved for this session"));
        return (window.setTimeout(() => C(""), 2500), !0);
      },
      y = (0, Q.useMemo)(
        () => (e && t ? e.planning.derivePlan(t) : null),
        [e, t],
      ),
      A = (0, Q.useMemo)(
        () =>
          t
            ? Object.entries(t.dishes || {})
                .filter(([, q]) => q?.on)
                .map(([q]) => q)
            : [],
        [t],
      );
    if (!e || !t || !y)
      return (0, i.jsxs)("main", {
        className: "boot-screen",
        children: [
          (0, i.jsx)("div", {
            className: "brand-mark",
            children: "CROW & CROWN",
          }),
          (0, i.jsx)("p", { children: c || "BUILDING YOUR THANKSGIVING PLAN" }),
        ],
      });
    let L = (q) => {
      (s(null), h(!1), u(q), window.scrollTo({ top: 0, behavior: "smooth" }));
    };
    if (!t.setupCompleted)
      return (0, i.jsx)(PL, { engine: e, state: t, commit: b });
    let I = () => {
        switch (n) {
          case "plan":
            return (0, i.jsx)(RL, {
              state: t,
              plan: y,
              navigate: L,
              selectedCount: A.length,
            });
          case "guests":
            return (0, i.jsx)(zL, {
              state: t,
              plan: y,
              commit: b,
              sheet: r,
              setSheet: s,
            });
          case "menu":
            return (0, i.jsx)(NL, {
              engine: e,
              state: t,
              plan: y,
              commit: b,
              filter: o,
              setFilter: d,
              navigate: L,
            });
          case "shopping":
            return (0, i.jsx)(EL, {
              engine: e,
              state: t,
              plan: y,
              commit: b,
              sheet: r,
              setSheet: s,
            });
          case "prep":
            return (0, i.jsx)(KL, {
              engine: e,
              state: t,
              plan: y,
              commit: b,
              navigate: L,
            });
          case "timeline":
            return (0, i.jsx)(GL, {
              state: t,
              plan: y,
              commit: b,
              navigate: L,
            });
          case "seating":
            return (0, i.jsx)(FL, {
              engine: e,
              state: t,
              plan: y,
              commit: b,
              sheet: r,
              setSheet: s,
            });
          case "experience":
            return (0, i.jsx)(QL, { state: t, commit: b });
          case "budget":
            return (0, i.jsx)(VL, { state: t, plan: y, commit: b });
          case "printables":
            return (0, i.jsx)(ZL, { engine: e, state: t, commit: b });
          case "party":
            return (0, i.jsx)(jL, {
              engine: e,
              state: t,
              plan: y,
              commit: b,
              setState: l,
            });
          case "host":
            return (0, i.jsx)(YL, { state: t, plan: y, navigate: L });
          default:
            return (0, i.jsx)(UL, {
              engine: e,
              state: t,
              plan: y,
              navigate: L,
              selectedCount: A.length,
              changeNote: f,
            });
        }
      },
      M = (q) =>
        (0, i.jsxs)(i.Fragment, {
          children: [
            !q &&
              (0, i.jsxs)("button", {
                className: "sidebar-link " + (n === "home" ? "active" : ""),
                "aria-current": n === "home" ? "page" : void 0,
                onClick: () => L("home"),
                children: [
                  (0, i.jsx)(It, { size: 18, strokeWidth: 1.5 }),
                  (0, i.jsx)("span", { children: "Home" }),
                ],
              }),
            !q &&
              (0, i.jsxs)("button", {
                className: "sidebar-link " + (n === "plan" ? "active" : ""),
                "aria-current": n === "plan" ? "page" : void 0,
                onClick: () => L("plan"),
                children: [
                  (0, i.jsx)(Hl, { size: 18, strokeWidth: 1.5 }),
                  (0, i.jsx)("span", { children: "Party plan" }),
                ],
              }),
            pf.map((J) => {
              let Be = q
                ? J.items.filter(([Ne]) => !nf.some(([na]) => na === Ne))
                : J.items;
              return (0, i.jsxs)(
                "section",
                {
                  className: "navigation-group",
                  children: [
                    (0, i.jsx)("h2", { children: J.title }),
                    Be.map(([Ne, na, T]) =>
                      (0, i.jsxs)(
                        "button",
                        {
                          className:
                            "sidebar-link " + (n === Ne ? "active" : ""),
                          "aria-current": n === Ne ? "page" : void 0,
                          onClick: () => L(Ne),
                          children: [
                            (0, i.jsx)(T, { size: 18, strokeWidth: 1.5 }),
                            (0, i.jsx)("span", { children: na }),
                          ],
                        },
                        Ne,
                      ),
                    ),
                  ],
                },
                J.title,
              );
            }),
            (0, i.jsxs)("button", {
              className:
                "sidebar-link event-settings-link " +
                (n === "party" ? "active" : ""),
              "aria-current": n === "party" ? "page" : void 0,
              onClick: () => L("party"),
              children: [
                (0, i.jsx)(Wn, { size: 18, strokeWidth: 1.5 }),
                (0, i.jsx)("span", { children: "Event details" }),
              ],
            }),
          ],
        });
    return (0, i.jsxs)("div", {
      className: "app-shell screen-" + n,
      children: [
        (0, i.jsxs)("aside", {
          className: "app-sidebar",
          children: [
            (0, i.jsx)("button", {
              className: "sidebar-brand",
              onClick: () => L("home"),
              children: "CROW & CROWN",
            }),
            (0, i.jsxs)("div", {
              className: "sidebar-event",
              children: [
                (0, i.jsx)("span", { children: "YOUR PRIVATE PLAN" }),
                (0, i.jsx)("strong", { children: "Thanksgiving" }),
              ],
            }),
            (0, i.jsx)("nav", {
              "aria-label": "Main navigation",
              children: M(!1),
            }),
            (0, i.jsx)("p", {
              className: "sidebar-foot",
              children: "YOUR SHORTCUT TO CHIC.",
            }),
          ],
        }),
        (0, i.jsxs)("header", {
          className: "topbar",
          children: [
            (0, i.jsxs)("button", {
              className: "topbar-logo",
              onClick: () => L("home"),
              children: [
                "CROW & CROWN",
                (0, i.jsx)("small", {
                  className: "review-label",
                  children: "YOUR PLAN",
                }),
              ],
            }),
            (0, i.jsxs)("div", {
              className: "breadcrumb",
              children: [
                (0, i.jsx)("span", { children: "Your plan" }),
                (0, i.jsx)(rl, { size: 13 }),
                (0, i.jsx)("strong", { children: sf[n] }),
              ],
            }),
            (0, i.jsxs)("span", {
              className: "header-date",
              children: [
                t.event.dinnerAt
                  ? new Date(t.event.dinnerAt).toLocaleDateString(void 0, {
                      month: "short",
                      day: "numeric",
                    })
                  : "Your event",
                (0, i.jsxs)("span", {
                  children: [y.planning.planningHeadcount, " guests"],
                }),
              ],
            }),
            (0, i.jsx)("button", {
              className: "icon-button",
              onClick: () => L("party"),
              "aria-label": "Event details",
              children: (0, i.jsx)(Wn, { size: 18, strokeWidth: 1.5 }),
            }),
          ],
        }),
        k &&
          (0, i.jsxs)("div", {
            className: "nav-overlay",
            children: [
              (0, i.jsx)("button", {
                className: "nav-backdrop",
                onClick: () => h(!1),
                "aria-label": "Close navigation",
              }),
              (0, i.jsxs)("aside", {
                className: "nav-drawer",
                role: "dialog",
                "aria-modal": "true",
                "aria-label": "More sections",
                onKeyDown: mf,
                children: [
                  (0, i.jsxs)("div", {
                    className: "drawer-brand",
                    children: [
                      (0, i.jsx)("strong", { children: "All sections" }),
                      (0, i.jsx)("button", {
                        onClick: () => h(!1),
                        "aria-label": "Close navigation",
                        children: (0, i.jsx)(Ga, { size: 20 }),
                      }),
                    ],
                  }),
                  (0, i.jsx)("p", {
                    className: "drawer-description",
                    children: "Everything for your Thanksgiving.",
                  }),
                  (0, i.jsx)("nav", {
                    "aria-label": "More navigation",
                    children: M(!0),
                  }),
                ],
              }),
            ],
          }),
        v &&
          (0, i.jsx)("div", {
            className: "save-indicator",
            role: "status",
            children: v,
          }),
        (0, i.jsxs)("div", {
          className: "content",
          children: [
            n !== "home" &&
              n !== "plan" &&
              (0, i.jsxs)("div", {
                className: "section-context",
                children: [
                  (0, i.jsxs)("button", {
                    onClick: () => L("plan"),
                    children: [(0, i.jsx)(Hl, { size: 15 }), " Party plan"],
                  }),
                  (0, i.jsx)(rl, { size: 13 }),
                  (0, i.jsx)("span", { children: sf[n] }),
                ],
              }),
            I(),
            (0, i.jsx)(DL, { active: n, navigate: L }),
          ],
        }),
        (0, i.jsxs)("nav", {
          className: "mobile-nav",
          "aria-label": "Main navigation",
          children: [
            nf.map(([q, J, Be]) =>
              (0, i.jsxs)(
                "button",
                {
                  "aria-current": n === q ? "page" : void 0,
                  onClick: () => L(q),
                  children: [
                    (0, i.jsx)(Be, { size: 20, strokeWidth: 1.5 }),
                    (0, i.jsx)("span", { children: J }),
                  ],
                },
                q,
              ),
            ),
            (0, i.jsxs)("button", {
              "aria-expanded": k,
              "aria-current": nf.some(([q]) => q === n) ? void 0 : "page",
              onClick: () => h(!0),
              children: [
                (0, i.jsx)(xt, { size: 20 }),
                (0, i.jsx)("span", { children: "More" }),
              ],
            }),
          ],
        }),
      ],
    });
  }
  function PL({ engine: e, state: a, commit: t }) {
    let l = (u) => {
        u.preventDefault();
        let r = new FormData(u.currentTarget);
        t(
          (s) => (
            (s.setupCompleted = !0),
            (s.event.dinnerAt = String(r.get("dinnerAt") || "")),
            (s.event.service = String(r.get("service") || "family")),
            (s.planning.mode = "estimated"),
            (s.planning.estimatedHeadcount = Number(r.get("headcount") || 12)),
            (s.planning.estimatedChildren = Number(r.get("children") || 0)),
            (s = e.catalog.withSignatureMenu(s)),
            of(s, e)
          ),
        );
      },
      n = (() => {
        let u = new Date().getFullYear(),
          s = 1 + ((4 - new Date(u, 10, 1).getDay() + 7) % 7) + 21;
        return u + "-11-" + String(s).padStart(2, "0") + "T16:30";
      })();
    return (0, i.jsxs)("main", {
      className: "setup",
      children: [
        (0, i.jsx)("section", {
          className: "setup-photo",
          style: { backgroundImage: "url(" + ks + ")" },
          children: (0, i.jsxs)("div", {
            className: "setup-top",
            children: [
              (0, i.jsx)("span", { children: "CROW & CROWN" }),
              (0, i.jsx)("span", { children: "THE THANKSGIVING EDIT" }),
            ],
          }),
        }),
        (0, i.jsxs)("section", {
          className: "setup-sheet",
          children: [
            (0, i.jsx)("span", {
              className: "file-tab",
              children: "YOUR THANKSGIVING",
            }),
            (0, i.jsx)("p", {
              className: "eyebrow",
              children: "01 / THE DETAILS",
            }),
            (0, i.jsxs)("h1", {
              children: [
                "Thanksgiving,",
                (0, i.jsx)("br", {}),
                "already figured out.",
              ],
            }),
            (0, i.jsx)("p", {
              className: "setup-intro",
              children: "A few details. One connected plan.",
            }),
            (0, i.jsxs)("form", {
              onSubmit: l,
              className: "setup-form",
              children: [
                (0, i.jsxs)("label", {
                  children: [
                    (0, i.jsx)("span", { children: "Guests (total)" }),
                    (0, i.jsx)("input", {
                      name: "headcount",
                      type: "number",
                      min: "1",
                      defaultValue: a.planning.estimatedHeadcount || 12,
                    }),
                  ],
                }),
                (0, i.jsxs)("label", {
                  children: [
                    (0, i.jsx)("span", { children: "Children included" }),
                    (0, i.jsx)("input", {
                      name: "children",
                      type: "number",
                      min: "0",
                      defaultValue: a.planning.estimatedChildren || 0,
                    }),
                  ],
                }),
                (0, i.jsxs)("label", {
                  className: "wide",
                  children: [
                    (0, i.jsx)("span", { children: "Dinner time" }),
                    (0, i.jsx)("input", {
                      name: "dinnerAt",
                      type: "datetime-local",
                      defaultValue: a.event.dinnerAt?.slice(0, 16) || n,
                    }),
                  ],
                }),
                (0, i.jsxs)("label", {
                  children: [
                    (0, i.jsx)("span", { children: "Service" }),
                    (0, i.jsxs)("select", {
                      name: "service",
                      defaultValue: "family",
                      children: [
                        (0, i.jsx)("option", {
                          value: "family",
                          children: "Family style",
                        }),
                        (0, i.jsx)("option", {
                          value: "buffet",
                          children: "Buffet",
                        }),
                        (0, i.jsx)("option", {
                          value: "plated",
                          children: "Plated",
                        }),
                        (0, i.jsx)("option", {
                          value: "cocktail",
                          children: "Grazing",
                        }),
                      ],
                    }),
                  ],
                }),
                (0, i.jsx)("button", {
                  className: "primary wide",
                  type: "submit",
                  children: "Create my plan",
                }),
              ],
            }),
          ],
        }),
      ],
    });
  }
  function Fa({ kicker: e, title: a, detail: t, action: l }) {
    return (0, i.jsxs)("header", {
      className: "screen-head",
      children: [
        (0, i.jsxs)("div", {
          children: [
            (0, i.jsx)("p", { className: "eyebrow", children: e }),
            (0, i.jsx)("h1", { children: a }),
            t && (0, i.jsx)("p", { children: t }),
          ],
        }),
        l,
      ],
    });
  }
  var rf = [
    ["party", "Event details", "Set the date, headcount and service"],
    ["guests", "Guests", "Add names and dietary needs"],
    ["menu", "Menu", "Choose what you will serve"],
    ["seating", "Table & seating", "Check seats and assign guests"],
    ["experience", "Experience", "Choose the guest moments"],
    ["shopping", "Shopping", "Check what you have, then buy"],
    ["prep", "Prep checklist", "Work through the make-ahead tasks"],
    ["timeline", "Timeline", "Review your cooking schedule"],
    ["host", "Party day", "Keep the day on track"],
  ];
  function DL({ active: e, navigate: a }) {
    let t = rf.findIndex(([r]) => r === e);
    if (t < 0 || t === rf.length - 1) return null;
    let [l, n, u] = rf[t + 1];
    return (0, i.jsxs)("section", {
      className: "workflow-next",
      children: [
        (0, i.jsxs)("div", {
          children: [
            (0, i.jsx)("p", {
              className: "eyebrow",
              children: "CONTINUE YOUR PLAN",
            }),
            (0, i.jsx)("h2", { children: n }),
            (0, i.jsxs)("p", { children: [u, "."] }),
          ],
        }),
        (0, i.jsxs)("button", {
          onClick: () => a(l),
          children: [
            "Continue to ",
            n.toLowerCase(),
            " ",
            (0, i.jsx)(xe, { size: 18 }),
          ],
        }),
      ],
    });
  }
  function Tv({ state: e, plan: a, navigate: t }) {
    let l = e.event.dinnerAt ? new Date(e.event.dinnerAt) : null;
    return (0, i.jsxs)("div", {
      className: "editorial-event-line",
      children: [
        (0, i.jsxs)("span", {
          children: [
            (0, i.jsx)(Jn, { size: 14 }),
            l
              ? l.toLocaleDateString(void 0, {
                  weekday: "short",
                  month: "long",
                  day: "numeric",
                })
              : "Set your event date",
            l
              ? " \xB7 " +
                l.toLocaleTimeString(void 0, {
                  hour: "numeric",
                  minute: "2-digit",
                })
              : "",
          ],
        }),
        (0, i.jsxs)("button", {
          onClick: () => t("party"),
          children: [
            a.planning.planningHeadcount,
            " guests ",
            (0, i.jsx)("span", { children: "\xB7 Edit details" }),
            (0, i.jsx)(xe, { size: 14 }),
          ],
        }),
      ],
    });
  }
  function RL({ state: e, plan: a, navigate: t, selectedCount: l }) {
    let n = a.shopping.filter((d) => (d.remainingCanonical || 0) > 0).length,
      u = a.prep.filter((d) => !d.completed).length,
      r = Object.values(e.selectedActivities || {}).filter(
        (d) => d === !0 || d?.selected,
      ).length,
      s = {
        guests:
          (e.guests || []).length +
          " names \xB7 " +
          a.planning.planningHeadcount +
          " guests planned",
        menu:
          l +
          " dishes" +
          (a.menu.missing.length
            ? " \xB7 Needs " + a.menu.missing.join(", ")
            : " selected"),
        seating:
          a.table.seatShortage || a.table.chairShortage
            ? [
                a.table.seatShortage
                  ? a.table.seatShortage + " seats needed"
                  : "",
                a.table.chairShortage
                  ? a.table.chairShortage + " chairs needed"
                  : "",
              ]
                .filter(Boolean)
                .join(" \xB7 ")
            : a.table.seatCapacity + " seats available",
        experience: r + " moments selected",
        shopping: n + " items to buy",
        prep: u + " tasks remaining",
        budget: "Target, estimated and paid costs",
        timeline: a.timeline.issues.length
          ? a.timeline.issues.length + " timing conflicts to review"
          : "Schedule from your dinner time",
        host: "Your live day-of checklist",
        printables: "Menus, cards and checklists",
      },
      o = (d) =>
        d === "menu"
          ? a.menu.missing.length > 0
          : d === "seating"
            ? a.table.seatShortage > 0 || a.table.chairShortage > 0
            : d === "timeline"
              ? a.timeline.issues.length > 0
              : !1;
    return (0, i.jsxs)("main", {
      className: "page party-plan-page",
      children: [
        (0, i.jsxs)("header", {
          className: "plan-overview-header",
          children: [
            (0, i.jsxs)("div", {
              children: [
                (0, i.jsx)("p", {
                  className: "eyebrow",
                  children: "YOUR GATHERING, IN ONE PLACE",
                }),
                (0, i.jsx)("h1", { children: "Party plan." }),
                (0, i.jsx)("p", {
                  children: "Plan the gathering. Get ready. Enjoy the day.",
                }),
              ],
            }),
            (0, i.jsx)("img", {
              src: ff,
              alt: "An organic modern table with ivory linen and dark stoneware",
              loading: "lazy",
            }),
          ],
        }),
        (0, i.jsx)(Tv, { state: e, plan: a, navigate: t }),
        (0, i.jsx)("div", {
          className: "plan-stage-grid",
          children: pf.map((d, c) =>
            (0, i.jsxs)(
              "section",
              {
                className: "plan-stage",
                "aria-labelledby": "stage-" + c,
                children: [
                  (0, i.jsxs)("header", {
                    className: "plan-stage-heading",
                    children: [
                      (0, i.jsx)("span", {
                        className: "stage-index",
                        children: String(c + 1).padStart(2, "0"),
                      }),
                      (0, i.jsxs)("div", {
                        children: [
                          (0, i.jsx)("h2", {
                            id: "stage-" + c,
                            children: d.title,
                          }),
                          (0, i.jsx)("p", {
                            className: "eyebrow",
                            children: [
                              "SET THE GATHERING",
                              "GET A LITTLE AHEAD",
                              "BRING IT TOGETHER",
                            ][c],
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, i.jsx)("div", {
                    className: "plan-stage-links",
                    children: d.items.map(([p, f, m]) =>
                      (0, i.jsxs)(
                        "button",
                        {
                          onClick: () => t(p),
                          "aria-label": "Open " + f,
                          children: [
                            (0, i.jsx)(m, { size: 19, strokeWidth: 1.4 }),
                            (0, i.jsxs)("span", {
                              children: [
                                (0, i.jsx)("strong", { children: f }),
                                (0, i.jsx)("small", {
                                  className: o(p) ? "needs-review" : "",
                                  children: s[p],
                                }),
                              ],
                            }),
                            (0, i.jsx)(rl, { size: 16 }),
                          ],
                        },
                        p,
                      ),
                    ),
                  }),
                ],
              },
              d.title,
            ),
          ),
        }),
      ],
    });
  }
  function UL({
    engine: e,
    state: a,
    plan: t,
    navigate: l,
    changeNote: n,
    selectedCount: u,
  }) {
    let r = e.catalog.SIGNATURE_MENU || [],
      s = (e.catalog.ORIGINAL_CATALOG || [])
        .filter((m) => a.dishes?.[m.id]?.on)
        .sort(
          (m, v) =>
            (r.includes(m.id) ? r.indexOf(m.id) : 99) -
            (r.includes(v.id) ? r.indexOf(v.id) : 99),
        )
        .slice(0, 3),
      o = t.shopping.filter((m) => (m.remainingCanonical || 0) > 0).length,
      d = t.prep.filter((m) => !m.completed).length,
      c = t.planning.planningHeadcount,
      p = [];
    (t.menu.missing.length &&
      p.push({
        id: "menu",
        label: "Finish the menu",
        detail: "Needs " + t.menu.missing.join(", "),
        Icon: Ka,
      }),
      (t.table.seatShortage || t.table.chairShortage) &&
        p.push({
          id: "seating",
          label: "Check seats & chairs",
          detail: [
            t.table.seatShortage ? t.table.seatShortage + " seats needed" : "",
            t.table.chairShortage
              ? t.table.chairShortage + " chairs needed"
              : "",
          ]
            .filter(Boolean)
            .join(" \xB7 "),
          Icon: Yn,
        }),
      t.timeline.issues.length &&
        p.push({
          id: "timeline",
          label: "Review the timing",
          detail: t.timeline.issues.length + " schedule conflicts",
          Icon: il,
        }));
    let f =
      !u || t.menu.missing.length
        ? [
            "menu",
            "Start with the menu.",
            "Choose your dishes. Shopping and prep update automatically.",
          ]
        : o
          ? [
              "shopping",
              "Check what you have.",
              "Your ingredients are scaled. Check your pantry before you shop.",
            ]
          : d
            ? [
                "prep",
                "Get a little ahead.",
                "Follow your make-ahead checklist, one task at a time.",
              ]
            : [
                "timeline",
                "Review your timing.",
                "Check the cooking schedule before the day begins.",
              ];
    return (0, i.jsxs)("main", {
      className: "page overview",
      children: [
        (0, i.jsx)(Tv, { state: a, plan: t, navigate: l }),
        (0, i.jsxs)("section", {
          className: "overview-panel",
          "aria-label": "Your gathering overview",
          children: [
            (0, i.jsxs)("div", {
              className: "editorial-hero",
              children: [
                (0, i.jsxs)("div", {
                  className: "hero-visual",
                  children: [
                    (0, i.jsx)("img", {
                      src: ks,
                      alt: "A veined ivory marble island, olive branches and dark walnut cabinetry in an organic modern kitchen",
                      fetchPriority: "high",
                    }),
                    (0, i.jsx)("span", {
                      className: "photo-caption",
                      children: "THE ART OF GATHERING",
                    }),
                  ],
                }),
                (0, i.jsxs)("div", {
                  className: "editorial-hero-copy",
                  children: [
                    (0, i.jsx)("p", {
                      className: "eyebrow",
                      children: "THE THANKSGIVING EDIT",
                    }),
                    (0, i.jsxs)("h1", {
                      children: [
                        "Thanksgiving,",
                        (0, i.jsx)("br", {}),
                        "already figured out.",
                      ],
                    }),
                    (0, i.jsx)("p", {
                      children: "Good taste. A clear plan. Room to enjoy it.",
                    }),
                    (0, i.jsxs)("button", {
                      onClick: () => l("plan"),
                      children: [
                        "Open party plan ",
                        (0, i.jsx)(xe, { size: 18 }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            (0, i.jsx)("div", {
              className: "home-metrics",
              "aria-label": "Your plan at a glance",
              children: [
                ["guests", c, "Guests"],
                ["menu", u, "Dishes"],
                ["shopping", o, "To buy"],
                ["prep", d, "Prep tasks"],
              ].map(([m, v, C]) =>
                (0, i.jsxs)(
                  "button",
                  {
                    onClick: () => l(m),
                    children: [
                      (0, i.jsxs)("span", {
                        children: [C, (0, i.jsx)(xe, { size: 15 })],
                      }),
                      (0, i.jsx)("strong", { children: v }),
                    ],
                  },
                  m,
                ),
              ),
            }),
          ],
        }),
        (0, i.jsxs)("div", {
          className: "home-action-grid",
          children: [
            (0, i.jsxs)("section", {
              className: "next-action",
              children: [
                (0, i.jsx)("p", {
                  className: "eyebrow",
                  children: "01 / YOUR NEXT STEP",
                }),
                (0, i.jsx)("h2", { children: f[1] }),
                (0, i.jsx)("p", { children: f[2] }),
                (0, i.jsxs)("button", {
                  onClick: () => l(f[0]),
                  children: [
                    "Open ",
                    sf[f[0]].toLowerCase(),
                    " ",
                    (0, i.jsx)(xe, { size: 18 }),
                  ],
                }),
              ],
            }),
            (0, i.jsxs)("section", {
              className: "attention-panel",
              children: [
                (0, i.jsxs)("div", {
                  className: "panel-heading",
                  children: [
                    (0, i.jsx)("p", {
                      className: "eyebrow",
                      children: "NEEDS A LOOK",
                    }),
                    (0, i.jsx)("span", { children: p.length || "All clear" }),
                  ],
                }),
                (0, i.jsx)("div", {
                  className: "attention-list",
                  children: p.map(({ id: m, label: v, detail: C, Icon: k }) =>
                    (0, i.jsxs)(
                      "button",
                      {
                        onClick: () => l(m),
                        children: [
                          (0, i.jsx)(k, { size: 17, strokeWidth: 1.5 }),
                          (0, i.jsxs)("span", {
                            children: [
                              (0, i.jsx)("strong", { children: v }),
                              (0, i.jsx)("small", { children: C }),
                            ],
                          }),
                          (0, i.jsx)(rl, { size: 15 }),
                        ],
                      },
                      m,
                    ),
                  ),
                }),
                !p.length &&
                  (0, i.jsx)("p", {
                    className: "panel-description",
                    children: "No menu, seating or timing issues flagged.",
                  }),
                (0, i.jsxs)("button", {
                  className: "text-link",
                  onClick: () => l("plan"),
                  children: [
                    "See the whole plan ",
                    (0, i.jsx)(xe, { size: 15 }),
                  ],
                }),
              ],
            }),
          ],
        }),
        (0, i.jsxs)("section", {
          className: "menu-preview",
          children: [
            (0, i.jsxs)("div", {
              className: "panel-heading",
              children: [
                (0, i.jsxs)("div", {
                  children: [
                    (0, i.jsx)("p", {
                      className: "eyebrow",
                      children: "02 / ON THE TABLE",
                    }),
                    (0, i.jsx)("h2", { children: "Your menu." }),
                  ],
                }),
                (0, i.jsxs)("button", {
                  onClick: () => l("menu"),
                  children: ["View menu ", (0, i.jsx)(xe, { size: 16 })],
                }),
              ],
            }),
            (0, i.jsxs)("div", {
              className: "menu-preview-grid",
              children: [
                s.map((m) =>
                  (0, i.jsxs)(
                    "button",
                    {
                      onClick: () => l("menu"),
                      children: [
                        (0, i.jsx)("span", {
                          className: "preview-photo",
                          style: yr(m),
                          role: "img",
                          "aria-label": m.name,
                        }),
                        (0, i.jsx)("span", { children: m.name }),
                      ],
                    },
                    m.id,
                  ),
                ),
                !s.length &&
                  (0, i.jsx)("p", {
                    className: "menu-preview-empty",
                    children: "Choose dishes to start your menu.",
                  }),
              ],
            }),
            (0, i.jsxs)("p", {
              children: [
                u,
                " dishes \xB7 Ingredients planned for ",
                c,
                " guests",
              ],
            }),
          ],
        }),
        (0, i.jsxs)("div", {
          className: "home-editorial-links",
          children: [
            (0, i.jsxs)("button", {
              onClick: () => l("seating"),
              children: [
                (0, i.jsx)("img", {
                  src: ff,
                  alt: "Dark stoneware, ivory linen and olive branches at a modern table",
                  loading: "lazy",
                }),
                (0, i.jsxs)("span", {
                  children: [
                    (0, i.jsx)("small", { children: "03 / THE SETTING" }),
                    (0, i.jsx)("strong", { children: "A place for everyone." }),
                    (0, i.jsxs)("span", {
                      children: [
                        "Table & seating ",
                        (0, i.jsx)(xe, { size: 16 }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            (0, i.jsxs)("button", {
              onClick: () => l("experience"),
              children: [
                (0, i.jsx)("img", {
                  src: ks,
                  alt: "Natural olive branches and linen on a marble kitchen island",
                  loading: "lazy",
                }),
                (0, i.jsxs)("span", {
                  children: [
                    (0, i.jsx)("small", { children: "04 / THE EXPERIENCE" }),
                    (0, i.jsx)("strong", {
                      children: "Make it feel like you.",
                    }),
                    (0, i.jsxs)("span", {
                      children: [
                        "Guest moments ",
                        (0, i.jsx)(xe, { size: 16 }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
        n &&
          (0, i.jsx)("p", {
            className: "plan-update",
            role: "status",
            children: n,
          }),
      ],
    });
  }
  function zL({ state: e, plan: a, commit: t, sheet: l, setSheet: n }) {
    let u = [
        ["expected", "EXPECTED"],
        ["confirmed", "CONFIRMED"],
        ["custom", "CUSTOM"],
      ],
      r = (d) => {
        d.preventDefault();
        let c = new FormData(d.currentTarget);
        (t(
          (p) => (
            p.guests.push({
              guestId: gf("guest"),
              name: String(c.get("name") || "Guest"),
              type: String(c.get("type") || "adult"),
              rsvp: String(c.get("rsvp") || "pending"),
              dietaryRestrictions: uf(c.get("dietary")),
              allergies: uf(c.get("allergies")),
              alcohol: c.get("alcohol") === "yes",
              highChairs: Number(c.get("highChairs") || 0),
            }),
            p
          ),
        ),
          d.currentTarget.reset(),
          n(null));
      },
      s = (d, c) =>
        t((p) => {
          let f = p.guests.findIndex((m) => (m.guestId || m.id) === d);
          return (f >= 0 && (p.guests[f] = { ...p.guests[f], ...c }), p);
        }),
      o = (d) => {
        window.confirm("Remove this guest?") &&
          t((c) => ({
            ...c,
            guests: c.guests.filter((p) => (p.guestId || p.id) !== d),
          }));
      };
    return (0, i.jsxs)("main", {
      className: "page",
      children: [
        (0, i.jsx)(Fa, {
          kicker: "PLAN / GUESTS",
          title: "Guests",
          detail: "One guest list drives food, drinks, seating and printables.",
          action: (0, i.jsx)("button", {
            className: "round-action",
            "aria-label": "Add guest",
            onClick: () => n(l === "guest" ? null : "guest"),
            children: (0, i.jsx)(kt, { size: 18 }),
          }),
        }),
        (0, i.jsxs)("section", {
          className: "mode-panel glass",
          children: [
            (0, i.jsxs)("span", {
              children: [
                "PLAN QUANTITIES FOR \xB7 ",
                a.planning.planningHeadcount,
                " PLANNED",
              ],
            }),
            (0, i.jsx)("div", {
              children:
                e.guests.length === 0
                  ? (0, i.jsx)("p", {
                      className: "estimate-note",
                      children: "Using your estimate until guests are added.",
                    })
                  : u.map(([d, c]) =>
                      (0, i.jsx)(
                        "button",
                        {
                          className: e.planning.mode === d ? "selected" : "",
                          onClick: () => t((p) => ((p.planning.mode = d), p)),
                          children: c,
                        },
                        d,
                      ),
                    ),
            }),
            e.planning.mode === "custom" &&
              (0, i.jsxs)("label", {
                className: "custom-count",
                children: [
                  (0, i.jsx)("span", { children: "Custom headcount" }),
                  (0, i.jsx)("input", {
                    type: "number",
                    min: "0",
                    value: e.planning.customHeadcount,
                    onChange: (d) =>
                      t(
                        (c) => (
                          (c.planning.customHeadcount = Number(d.target.value)),
                          c
                        ),
                      ),
                  }),
                ],
              }),
          ],
        }),
        (0, i.jsxs)("div", {
          className: "metric-strip",
          children: [
            (0, i.jsxs)("div", {
              children: [
                (0, i.jsx)("span", { children: "EXPECTED" }),
                (0, i.jsx)("strong", {
                  children: e.guests.filter(
                    (d) => d.rsvp === "yes" || d.rsvp === "pending",
                  ).length,
                }),
              ],
            }),
            (0, i.jsxs)("div", {
              children: [
                (0, i.jsx)("span", { children: "CONFIRMED" }),
                (0, i.jsx)("strong", {
                  children: e.guests.filter((d) => d.rsvp === "yes").length,
                }),
              ],
            }),
            (0, i.jsxs)("div", {
              children: [
                (0, i.jsx)("span", { children: "PENDING" }),
                (0, i.jsx)("strong", {
                  children: e.guests.filter((d) => d.rsvp === "pending").length,
                }),
              ],
            }),
            (0, i.jsxs)("div", {
              children: [
                (0, i.jsx)("span", { children: "ADULTS" }),
                (0, i.jsx)("strong", { children: a.planning.planningAdults }),
              ],
            }),
            (0, i.jsxs)("div", {
              children: [
                (0, i.jsx)("span", { children: "CHILDREN" }),
                (0, i.jsx)("strong", { children: a.planning.planningChildren }),
              ],
            }),
            (0, i.jsxs)("div", {
              children: [
                (0, i.jsx)("span", { children: "DRINKERS" }),
                (0, i.jsx)("strong", {
                  children: a.planning.planningAdultDrinkers,
                }),
              ],
            }),
          ],
        }),
        l === "guest" &&
          (0, i.jsxs)("form", {
            className: "drawer-form glass",
            onSubmit: r,
            children: [
              (0, i.jsxs)("div", {
                className: "drawer-head",
                children: [
                  (0, i.jsx)("strong", { children: "ADD GUEST" }),
                  (0, i.jsx)("button", {
                    type: "button",
                    onClick: () => n(null),
                    children: (0, i.jsx)(Ga, { size: 18 }),
                  }),
                ],
              }),
              (0, i.jsxs)("label", {
                children: [
                  "Name",
                  (0, i.jsx)("input", { name: "name", required: !0 }),
                ],
              }),
              (0, i.jsxs)("div", {
                className: "two-col",
                children: [
                  (0, i.jsxs)("label", {
                    children: [
                      "Type",
                      (0, i.jsxs)("select", {
                        name: "type",
                        children: [
                          (0, i.jsx)("option", {
                            value: "adult",
                            children: "Adult",
                          }),
                          (0, i.jsx)("option", {
                            value: "child",
                            children: "Child",
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, i.jsxs)("label", {
                    children: [
                      "RSVP",
                      (0, i.jsxs)("select", {
                        name: "rsvp",
                        children: [
                          (0, i.jsx)("option", {
                            value: "pending",
                            children: "Pending",
                          }),
                          (0, i.jsx)("option", {
                            value: "yes",
                            children: "Attending",
                          }),
                          (0, i.jsx)("option", {
                            value: "no",
                            children: "Declined",
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              (0, i.jsxs)("label", {
                children: [
                  "Dietary needs",
                  (0, i.jsx)("input", {
                    name: "dietary",
                    placeholder: "vegetarian, gluten-free",
                  }),
                ],
              }),
              (0, i.jsxs)("label", {
                children: [
                  "Allergies",
                  (0, i.jsx)("input", {
                    name: "allergies",
                    placeholder: "dairy, peanut",
                  }),
                ],
              }),
              (0, i.jsxs)("div", {
                className: "two-col",
                children: [
                  (0, i.jsxs)("label", {
                    children: [
                      "Alcohol",
                      (0, i.jsxs)("select", {
                        name: "alcohol",
                        children: [
                          (0, i.jsx)("option", { value: "no", children: "No" }),
                          (0, i.jsx)("option", {
                            value: "yes",
                            children: "Yes",
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, i.jsxs)("label", {
                    children: [
                      "High chairs",
                      (0, i.jsx)("input", {
                        name: "highChairs",
                        type: "number",
                        min: "0",
                        defaultValue: "0",
                      }),
                    ],
                  }),
                ],
              }),
              (0, i.jsx)("button", {
                className: "primary",
                children: "ADD TO GUEST LIST",
              }),
            ],
          }),
        (0, i.jsxs)("div", {
          className: "guest-list",
          children: [
            e.guests.length === 0 &&
              (0, i.jsx)(JL, {
                title: "No named guests yet.",
                text: "You can still plan from an estimate. Add names when you are ready.",
              }),
            e.guests.map((d, c) => {
              let p = d.guestId || d.id || "guest-" + c;
              return (0, i.jsxs)(
                "article",
                {
                  className: "guest-card",
                  children: [
                    (0, i.jsx)("div", {
                      className: "avatar",
                      children: String(d.name || "G")
                        .slice(0, 1)
                        .toUpperCase(),
                    }),
                    (0, i.jsxs)("div", {
                      className: "guest-copy",
                      children: [
                        (0, i.jsx)("strong", { children: d.name || "Guest" }),
                        (0, i.jsxs)("span", {
                          children: [
                            d.type === "child" ? "Child" : "Adult",
                            " \xB7",
                            " ",
                            d.dietaryRestrictions?.join(", ") ||
                              "No dietary notes",
                          ],
                        }),
                      ],
                    }),
                    (0, i.jsxs)("select", {
                      "aria-label": "RSVP for " + (d.name || "Guest"),
                      value: d.rsvp || "pending",
                      onChange: (f) => s(p, { rsvp: f.target.value }),
                      children: [
                        (0, i.jsx)("option", {
                          value: "pending",
                          children: "Pending",
                        }),
                        (0, i.jsx)("option", {
                          value: "yes",
                          children: "Attending",
                        }),
                        (0, i.jsx)("option", {
                          value: "no",
                          children: "Declined",
                        }),
                      ],
                    }),
                    (0, i.jsxs)("details", {
                      className: "mini-details",
                      children: [
                        (0, i.jsx)("summary", {
                          "aria-label": "Edit guest " + (d.name || "Guest"),
                          children: (0, i.jsx)(xt, { size: 18 }),
                        }),
                        (0, i.jsxs)("div", {
                          children: [
                            (0, i.jsxs)("button", {
                              className: "popover-close",
                              onClick: (f) => {
                                f.currentTarget.closest("details").open = !1;
                              },
                              children: [
                                "Close guest details",
                                (0, i.jsx)(Ga, { size: 17 }),
                              ],
                            }),
                            (0, i.jsxs)("label", {
                              children: [
                                "Type",
                                (0, i.jsxs)("select", {
                                  value: d.type || "adult",
                                  onChange: (f) =>
                                    s(p, { type: f.target.value }),
                                  children: [
                                    (0, i.jsx)("option", {
                                      value: "adult",
                                      children: "Adult",
                                    }),
                                    (0, i.jsx)("option", {
                                      value: "child",
                                      children: "Child",
                                    }),
                                  ],
                                }),
                              ],
                            }),
                            (0, i.jsxs)("label", {
                              children: [
                                "Dietary",
                                (0, i.jsx)("input", {
                                  defaultValue: (
                                    d.dietaryRestrictions || []
                                  ).join(", "),
                                  onBlur: (f) =>
                                    s(p, {
                                      dietaryRestrictions: uf(f.target.value),
                                    }),
                                }),
                              ],
                            }),
                            (0, i.jsxs)("label", {
                              children: [
                                "Alcohol",
                                (0, i.jsxs)("select", {
                                  value: d.alcohol ? "yes" : "no",
                                  onChange: (f) =>
                                    s(p, { alcohol: f.target.value === "yes" }),
                                  children: [
                                    (0, i.jsx)("option", {
                                      value: "no",
                                      children: "No",
                                    }),
                                    (0, i.jsx)("option", {
                                      value: "yes",
                                      children: "Yes",
                                    }),
                                  ],
                                }),
                              ],
                            }),
                            (0, i.jsxs)("button", {
                              className: "danger-link",
                              onClick: () => o(p),
                              children: [
                                (0, i.jsx)(mr, { size: 15 }),
                                " Remove",
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                },
                p,
              );
            }),
          ],
        }),
      ],
    });
  }
  function NL({
    engine: e,
    state: a,
    plan: t,
    commit: l,
    filter: n,
    setFilter: u,
    navigate: r,
  }) {
    let [s, o] = (0, Q.useState)("all"),
      [d, c] = (0, Q.useState)(""),
      [p, f] = (0, Q.useState)(null),
      [m, v] = (0, Q.useState)(""),
      C = e.catalog.ORIGINAL_CATALOG || [],
      k = new Set(e.catalog.SUPPORTED_SIGNATURE_IDS || []),
      h = new Set(
        Object.entries(a.dishes || {})
          .filter(([, T]) => T?.on)
          .map(([T]) => T),
      ),
      g = C.filter((T) => k.has(T.id)).length,
      b = C.filter((T) => {
        let te = k.has(T.id);
        return (n === "reference" ? te : !te) ||
          (n === "selected" && !h.has(T.id)) ||
          (n === "available" && h.has(T.id)) ||
          (s === "main" && !/main/i.test(T.group)) ||
          (s === "side" && /main|dessert|drink|appetizer/i.test(T.group)) ||
          (s === "dessert" && !/dessert/i.test(T.group)) ||
          (s === "drink" && !/drink/i.test(T.group))
          ? !1
          : (T.name + " " + T.group)
              .toLowerCase()
              .includes(d.trim().toLowerCase());
      }),
      y = (T) => {
        let te = !h.has(T);
        if (
          !l((dl) =>
            te
              ? e.recipes.addRecipeToMenu(dl, T)
              : e.recipes.removeDishFromMenu(dl, T),
          )
        ) {
          v("A newer plan was reloaded. Please try your change again.");
          return;
        }
        let ye = C.find((dl) => dl.id === T);
        v(
          (ye?.name || "Dish") +
            (te
              ? " added. Shopping quantities and prep tasks updated."
              : " removed. Shopping and prep updated; purchase history kept."),
        );
      },
      A = (T) => {
        (u(T), o("all"), c(""));
      };
    (0, Q.useEffect)(() => {
      if (!p) return;
      let T = document.activeElement,
        te = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      let He = () =>
          kv(
            document.querySelector(".recipe-modal"),
            document.querySelector(".recipe-dialog"),
            24,
          ),
        ye = window.setTimeout(() => {
          (He(),
            document.querySelector(".recipe-dialog .dialog-close")?.focus());
        }, 0),
        dl = (Ov) => {
          Ov.key === "Escape" && f(null);
        };
      return (
        document.addEventListener("keydown", dl),
        window.visualViewport?.addEventListener("resize", He),
        window.visualViewport?.addEventListener("scroll", He),
        () => {
          ((document.body.style.overflow = te),
            window.clearTimeout(ye),
            document.removeEventListener("keydown", dl),
            window.visualViewport?.removeEventListener("resize", He),
            window.visualViewport?.removeEventListener("scroll", He),
            T?.focus());
        }
      );
    }, [p]);
    let L = C.find((T) => T.id === p),
      x = L ? a.recipes?.[L.id] || e.catalog.catalogRecipe(L) : null,
      I = L && k.has(L.id) && x?.recipeComplete === !0,
      M = L && h.has(L.id),
      q = M ? e.menu.dishRequirementMode(L.id, a) : null,
      J = M ? e.ingredients.scaledIngredientsForDish(a, L.id) : [],
      Be = M && q === "ingredients" ? J : x?.ingredients || [],
      Ne = L ? a.menuResponsibilities?.[L.id] : null,
      na = (a.guests || []).filter((T) => T.rsvp === "yes");
    return (0, i.jsxs)("main", {
      className: "page menu-page " + (n === "selected" ? "selected-menu" : ""),
      children: [
        (0, i.jsx)(Fa, {
          kicker: "PLAN / THE MENU",
          title: "Menu",
          detail:
            h.size +
            " dishes \xB7 Scaled for " +
            t.planning.planningHeadcount +
            " guests.",
        }),
        m &&
          (0, i.jsx)("p", {
            className: "menu-notice",
            role: "status",
            children: m,
          }),
        t.menu.missing.length > 0 &&
          (0, i.jsxs)("p", {
            className: "menu-coverage",
            children: [
              (0, i.jsx)(Ka, { size: 15 }),
              " Still needs ",
              t.menu.missing.join(", "),
            ],
          }),
        (0, i.jsx)("div", {
          className: "menu-tabs",
          role: "tablist",
          "aria-label": "Recipe collection",
          children: [
            ["selected", "Your menu", h.size],
            ["all", "All recipes", g],
            ["reference", "References", C.length - g],
          ].map(([T, te, He]) =>
            (0, i.jsxs)(
              "button",
              {
                role: "tab",
                "aria-selected": n === T,
                className: n === T ? "active" : "",
                onClick: () => A(T),
                children: [te, (0, i.jsx)("span", { children: He })],
              },
              T,
            ),
          ),
        }),
        (0, i.jsxs)("div", {
          className: "menu-toolbar",
          children: [
            (0, i.jsxs)("label", {
              className: "recipe-search",
              children: [
                (0, i.jsx)(pr, { size: 17 }),
                (0, i.jsx)("input", {
                  type: "search",
                  placeholder: "Search recipes",
                  "aria-label": "Search recipes",
                  value: d,
                  onChange: (T) => c(T.target.value),
                }),
              ],
            }),
            (0, i.jsx)("div", {
              className: "filter-row",
              "aria-label": "Recipe categories",
              children: [
                ["all", "All"],
                ["main", "Mains"],
                ["side", "Sides"],
                ["dessert", "Dessert"],
                ["drink", "Drinks"],
              ].map(([T, te]) =>
                (0, i.jsx)(
                  "button",
                  {
                    "aria-pressed": s === T,
                    className: s === T ? "selected" : "",
                    onClick: () => o(T),
                    children: te,
                  },
                  T,
                ),
              ),
            }),
          ],
        }),
        (0, i.jsxs)("p", {
          className: "recipe-result-count",
          children: [
            b.length,
            " ",
            b.length === 1 ? "recipe" : "recipes",
            n === "selected"
              ? " in your menu"
              : n === "reference"
                ? " for inspiration \xB7 Full planning data not yet available"
                : "",
          ],
        }),
        (0, i.jsx)("div", {
          className: "recipe-grid",
          children: b.map((T) => {
            let te = h.has(T.id),
              He = a.recipes?.[T.id] || e.catalog.catalogRecipe(T),
              ye = k.has(T.id) && He?.recipeComplete === !0;
            return (0, i.jsxs)(
              "article",
              {
                className: "recipe-card " + (te ? "in-plan" : ""),
                children: [
                  (0, i.jsxs)("button", {
                    className:
                      "recipe-photo" + (yr(T) ? "" : " reference-photo"),
                    style: yr(T) || void 0,
                    "aria-label": "View recipe: " + T.name,
                    onClick: () => f(T.id),
                    children: [
                      (0, i.jsx)("span", { children: T.group }),
                      te &&
                        (0, i.jsxs)("b", {
                          children: [(0, i.jsx)(ba, { size: 12 }), " In menu"],
                        }),
                      !yr(T) && (0, i.jsx)("em", { children: "Source recipe" }),
                    ],
                  }),
                  (0, i.jsxs)("div", {
                    className: "recipe-body",
                    children: [
                      (0, i.jsx)("button", {
                        className: "recipe-title",
                        onClick: () => f(T.id),
                        children: (0, i.jsx)("h3", { children: T.name }),
                      }),
                      (0, i.jsx)("p", {
                        children: te
                          ? Is(e.recipes.requiredServingsForDish(a, T.id), 1) +
                            " servings \xB7 " +
                            ({
                              homemade: "Homemade",
                              purchased: "Buy prepared",
                              "guest-provided": "Guest bringing",
                            }[a.dishes?.[T.id]?.preparationMode] || "Homemade")
                          : T.portion || T.makeAhead,
                      }),
                      (0, i.jsxs)("div", {
                        className: "recipe-action",
                        children: [
                          (0, i.jsxs)("button", {
                            className: "recipe-detail-link",
                            onClick: () => f(T.id),
                            children: [
                              "View recipe ",
                              (0, i.jsx)(xe, { size: 14 }),
                            ],
                          }),
                          te
                            ? (0, i.jsxs)("button", {
                                className: "remove-dish",
                                "aria-label": "Remove " + T.name + " from menu",
                                onClick: () => y(T.id),
                                children: [
                                  (0, i.jsx)(ba, { size: 14 }),
                                  " Added",
                                ],
                              })
                            : ye
                              ? (0, i.jsxs)("button", {
                                  className: "add-button",
                                  "aria-label": "Add " + T.name + " to menu",
                                  onClick: () => y(T.id),
                                  children: [
                                    (0, i.jsx)(kt, { size: 14 }),
                                    " Add",
                                  ],
                                })
                              : (0, i.jsx)("span", {
                                  className: "reference-badge",
                                  children: "Reference only",
                                }),
                        ],
                      }),
                    ],
                  }),
                ],
              },
              T.id,
            );
          }),
        }),
        !b.length &&
          (0, i.jsxs)("div", {
            className: "empty-state",
            children: [
              (0, i.jsx)("strong", {
                children:
                  n === "selected" && !d
                    ? "Your menu is ready to build."
                    : "No recipes found.",
              }),
              (0, i.jsx)("p", {
                children:
                  n === "selected"
                    ? "Choose from All recipes to add a dish."
                    : "Try another search or category.",
              }),
              (0, i.jsx)("button", {
                className: "small-primary",
                onClick: () => A("all"),
                children: "Browse all recipes",
              }),
            ],
          }),
        L &&
          (0, i.jsxs)("div", {
            className: "recipe-modal",
            children: [
              (0, i.jsx)("button", {
                className: "nav-backdrop",
                onClick: () => f(null),
                "aria-label": "Close recipe",
              }),
              (0, i.jsxs)("section", {
                className: "recipe-dialog",
                role: "dialog",
                "aria-modal": "true",
                "aria-labelledby": "recipe-dialog-title",
                onKeyDown: mf,
                children: [
                  (0, i.jsxs)("header", {
                    className: "recipe-dialog-head",
                    children: [
                      (0, i.jsx)("span", { children: L.group }),
                      (0, i.jsx)("button", {
                        className: "dialog-close",
                        "aria-label": "Close recipe",
                        onClick: () => f(null),
                        children: (0, i.jsx)(Ga, { size: 20 }),
                      }),
                    ],
                  }),
                  (0, i.jsx)("div", {
                    className: "recipe-dialog-photo",
                    style: yr(L) || void 0,
                    role: "img",
                    "aria-label": L.name,
                  }),
                  (0, i.jsxs)("div", {
                    className: "recipe-dialog-content",
                    children: [
                      (0, i.jsx)("h2", {
                        id: "recipe-dialog-title",
                        children: L.name,
                      }),
                      (0, i.jsxs)("p", {
                        className: "recipe-source",
                        children: [
                          x?.provenance?.publisher ||
                            L.source ||
                            "CROW & CROWN",
                          x?.sourceRating || L.rating
                            ? " \xB7 " + (x?.sourceRating || L.rating)
                            : "",
                        ],
                      }),
                      (0, i.jsxs)("div", {
                        className: "dialog-recipe-meta",
                        children: [
                          (0, i.jsx)("span", {
                            children: h.has(L.id)
                              ? Is(
                                  e.recipes.requiredServingsForDish(a, L.id),
                                  1,
                                ) + " servings planned"
                              : L.portion,
                          }),
                          (0, i.jsxs)("span", {
                            children: [L.minutes, " min"],
                          }),
                          (0, i.jsxs)("span", {
                            children: [$n(L.cost), " est."],
                          }),
                        ],
                      }),
                      (0, i.jsxs)("div", {
                        className: "dialog-menu-action",
                        children: [
                          I
                            ? (0, i.jsxs)("button", {
                                className: "primary",
                                onClick: () => y(L.id),
                                children: [
                                  h.has(L.id)
                                    ? (0, i.jsx)(ba, { size: 16 })
                                    : (0, i.jsx)(kt, { size: 16 }),
                                  " ",
                                  h.has(L.id)
                                    ? "Remove from menu"
                                    : "Add to menu",
                                ],
                              })
                            : (0, i.jsx)("span", {
                                className: "reference-badge",
                                children: "Reference only",
                              }),
                          h.has(L.id) &&
                            (0, i.jsxs)("label", {
                              children: [
                                "Preparation",
                                (0, i.jsxs)("select", {
                                  "aria-label": "Preparation for " + L.name,
                                  value:
                                    a.dishes?.[L.id]?.preparationMode ||
                                    "homemade",
                                  onChange: (T) =>
                                    l(
                                      (te) => (
                                        T.target.value !== "guest-provided" &&
                                          delete te.menuResponsibilities[L.id],
                                        e.menu.setDishPreparationMode(
                                          te,
                                          L.id,
                                          T.target.value,
                                        )
                                      ),
                                    ),
                                  children: [
                                    (0, i.jsx)("option", {
                                      value: "homemade",
                                      children: "Homemade",
                                    }),
                                    (0, i.jsx)("option", {
                                      value: "purchased",
                                      children: "Buy prepared",
                                    }),
                                    (0, i.jsx)("option", {
                                      value: "guest-provided",
                                      children: "Guest bringing",
                                    }),
                                  ],
                                }),
                              ],
                            }),
                        ],
                      }),
                      M &&
                        a.dishes?.[L.id]?.preparationMode ===
                          "guest-provided" &&
                        (0, i.jsxs)("section", {
                          className: "guest-contribution",
                          children: [
                            (0, i.jsxs)("label", {
                              children: [
                                "Guest bringing this dish",
                                (0, i.jsxs)("select", {
                                  "aria-label": "Guest bringing " + L.name,
                                  value: Ne?.contributorGuestId || "",
                                  onChange: (T) =>
                                    l((te) => {
                                      let He = T.target.value;
                                      return (
                                        (te.menuResponsibilities[L.id] = He
                                          ? {
                                              ownerType: "guest",
                                              contributorGuestId: He,
                                              status: "confirmed",
                                            }
                                          : {
                                              ownerType: "host",
                                              status: "unconfirmed",
                                            }),
                                        te
                                      );
                                    }),
                                  children: [
                                    (0, i.jsx)("option", {
                                      value: "",
                                      children: "Choose an attending guest",
                                    }),
                                    na.map((T) =>
                                      (0, i.jsx)(
                                        "option",
                                        {
                                          value: T.guestId || T.id,
                                          children:
                                            T.name || T.firstName || "Guest",
                                        },
                                        T.guestId || T.id,
                                      ),
                                    ),
                                  ],
                                }),
                              ],
                            }),
                            (0, i.jsx)("p", {
                              children:
                                q === "none"
                                  ? "Guest confirmed. Ingredient shopping is covered."
                                  : "Until an attending guest is assigned, shopping and cooking stay in your plan.",
                            }),
                            !na.length &&
                              (0, i.jsxs)("button", {
                                className: "recipe-detail-link",
                                onClick: () => r("guests"),
                                children: [
                                  "Add an attending guest ",
                                  (0, i.jsx)(xe, { size: 14 }),
                                ],
                              }),
                          ],
                        }),
                      M &&
                        (0, i.jsx)("p", {
                          className: "recipe-plan-status",
                          role: "status",
                          children:
                            m ||
                            "This dish is in your menu. Shopping and prep follow its preparation setting.",
                        }),
                      (0, i.jsxs)("section", {
                        className: "recipe-notes",
                        children: [
                          (0, i.jsx)("h3", { children: "Plan ahead" }),
                          (0, i.jsx)("p", {
                            children: x?.makeAhead || L.makeAhead,
                          }),
                          x?.storage &&
                            (0, i.jsxs)("p", {
                              children: [
                                (0, i.jsx)("strong", { children: "Storage" }),
                                " \xB7 ",
                                x.storage,
                              ],
                            }),
                          x?.reheat &&
                            (0, i.jsxs)("p", {
                              children: [
                                (0, i.jsx)("strong", { children: "Reheat" }),
                                " \xB7 ",
                                x.reheat,
                              ],
                            }),
                        ],
                      }),
                      I
                        ? (0, i.jsxs)(i.Fragment, {
                            children: [
                              (0, i.jsxs)("section", {
                                className: "recipe-ingredients",
                                children: [
                                  (0, i.jsx)("h3", {
                                    children:
                                      M && q === "ingredients"
                                        ? "Your scaled ingredients"
                                        : "Recipe ingredients",
                                  }),
                                  (0, i.jsx)("p", {
                                    children:
                                      M && q === "ingredients"
                                        ? "For " +
                                          Is(
                                            e.recipes.requiredServingsForDish(
                                              a,
                                              L.id,
                                            ),
                                            1,
                                          ) +
                                          " planned servings \xB7 These amounts feed your shopping list."
                                        : "Base recipe for " +
                                          x.baseServings +
                                          " servings.",
                                  }),
                                  q === "prepared-food" &&
                                    (0, i.jsxs)("p", {
                                      className: "recipe-allocation-note",
                                      children: [
                                        "Buy prepared: shopping contains ",
                                        Is(
                                          e.recipes.requiredServingsForDish(
                                            a,
                                            L.id,
                                          ),
                                          1,
                                        ),
                                        " servings of this dish. Receiving, finishing and serving tasks remain.",
                                      ],
                                    }),
                                  q === "none" &&
                                    (0, i.jsx)("p", {
                                      className: "recipe-allocation-note",
                                      children:
                                        "Confirmed guest contribution: ingredients are covered by your guest. Receiving, finishing and serving remain in your prep plan.",
                                    }),
                                  (0, i.jsx)("ul", {
                                    children: Be.map((T, te) =>
                                      (0, i.jsxs)(
                                        "li",
                                        {
                                          children: [
                                            (0, i.jsx)("span", {
                                              children: T.name,
                                            }),
                                            (0, i.jsx)("span", {
                                              children: Ba(T.quantity, T.unit)
                                                .text,
                                            }),
                                          ],
                                        },
                                        L.id + ":" + te,
                                      ),
                                    ),
                                  }),
                                ],
                              }),
                              (0, i.jsxs)("section", {
                                className: "recipe-method",
                                children: [
                                  (0, i.jsx)("h3", { children: "Method" }),
                                  (0, i.jsx)("ol", {
                                    children: (x.instructions || []).map(
                                      (T, te) =>
                                        (0, i.jsx)("li", { children: T }, te),
                                    ),
                                  }),
                                ],
                              }),
                            ],
                          })
                        : (0, i.jsx)("p", {
                            className: "notice",
                            children:
                              "This recipe is for inspiration. It can join the plan once its complete ingredients and method are available.",
                          }),
                    ],
                  }),
                ],
              }),
            ],
          }),
      ],
    });
  }
  function hf({ title: e, onClose: a, children: t, wide: l = !1 }) {
    let n = (0, Q.useId)(),
      u = (0, Q.useRef)(a);
    u.current = a;
    let r = (0, Q.useRef)(null),
      s = (0, Q.useRef)(null);
    return (
      (0, Q.useEffect)(() => {
        let o = document.activeElement,
          d = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        let c = () => kv(s.current, r.current),
          p = window.setTimeout(() => {
            (c(), r.current?.querySelector(".dialog-sheet-close")?.focus());
          }, 0),
          f = (m) => {
            m.key === "Escape" && u.current();
          };
        return (
          document.addEventListener("keydown", f),
          window.visualViewport?.addEventListener("resize", c),
          window.visualViewport?.addEventListener("scroll", c),
          () => {
            (window.clearTimeout(p),
              (document.body.style.overflow = d),
              document.removeEventListener("keydown", f),
              window.visualViewport?.removeEventListener("resize", c),
              window.visualViewport?.removeEventListener("scroll", c),
              o?.focus());
          }
        );
      }, []),
      (0, i.jsxs)("div", {
        ref: s,
        className: "dialog-sheet-overlay",
        children: [
          (0, i.jsx)("button", {
            className: "nav-backdrop",
            onClick: a,
            "aria-label": "Close dialog",
          }),
          (0, i.jsxs)("section", {
            ref: r,
            className: "dialog-sheet" + (l ? " wide-sheet" : ""),
            role: "dialog",
            "aria-modal": "true",
            "aria-labelledby": n,
            onKeyDown: mf,
            children: [
              (0, i.jsxs)("header", {
                className: "dialog-sheet-head",
                children: [
                  (0, i.jsx)("h2", { id: n, children: e }),
                  (0, i.jsx)("button", {
                    className: "dialog-sheet-close dialog-close",
                    onClick: a,
                    "aria-label": "Close dialog",
                    children: (0, i.jsx)(Ga, { size: 20 }),
                  }),
                ],
              }),
              (0, i.jsx)("div", {
                className: "dialog-sheet-body",
                children: t,
              }),
            ],
          }),
        ],
      })
    );
  }
  function HL({ engine: e, state: a, plan: t, recipeId: l, onClose: n }) {
    let u = a.recipes?.[l];
    if (!u) return null;
    let r = Object.keys(a.dishes || {}).find(
        (d) => a.dishes[d]?.on && (a.dishes[d].recipeId || d) === l,
      ),
      s = r ? e.menu.dishRequirementMode(r, a) : null,
      o =
        s === "ingredients" ? e.ingredients.scaledIngredientsForDish(a, r) : [];
    return (0, i.jsx)(hf, {
      title: u.title,
      onClose: n,
      wide: !0,
      children: (0, i.jsxs)("div", {
        className: "prep-recipe-guide",
        children: [
          (0, i.jsx)("p", {
            className: "recipe-guide-servings",
            children: r
              ? Ba(e.recipes.requiredServingsForDish(a, r), "serving").text +
                " planned"
              : "Host recipe",
          }),
          (u.makeAhead || u.storage || u.reheat) &&
            (0, i.jsxs)("section", {
              children: [
                (0, i.jsx)("h3", { children: "Plan ahead" }),
                u.makeAhead && (0, i.jsx)("p", { children: u.makeAhead }),
                u.storage &&
                  (0, i.jsxs)("p", {
                    children: [
                      (0, i.jsx)("strong", { children: "Storage" }),
                      " \xB7 ",
                      u.storage,
                    ],
                  }),
                u.reheat &&
                  (0, i.jsxs)("p", {
                    children: [
                      (0, i.jsx)("strong", { children: "Reheat" }),
                      " \xB7 ",
                      u.reheat,
                    ],
                  }),
              ],
            }),
          s === "ingredients"
            ? (0, i.jsxs)(i.Fragment, {
                children: [
                  (0, i.jsxs)("section", {
                    className: "recipe-ingredients",
                    children: [
                      (0, i.jsx)("h3", { children: "Your scaled ingredients" }),
                      (0, i.jsx)("ul", {
                        children: o.map((d, c) =>
                          (0, i.jsxs)(
                            "li",
                            {
                              children: [
                                (0, i.jsx)("span", { children: d.name }),
                                (0, i.jsx)("span", {
                                  children: Ba(d.quantity, d.unit).text,
                                }),
                              ],
                            },
                            c,
                          ),
                        ),
                      }),
                    ],
                  }),
                  (0, i.jsxs)("section", {
                    className: "recipe-method",
                    children: [
                      (0, i.jsx)("h3", { children: "Method" }),
                      u.instructions?.length
                        ? (0, i.jsx)("ol", {
                            children: u.instructions.map((d, c) =>
                              (0, i.jsx)("li", { children: d }, c),
                            ),
                          })
                        : (0, i.jsx)("p", {
                            children:
                              "Use your recipe's method with the scaled ingredients above.",
                          }),
                    ],
                  }),
                ],
              })
            : (0, i.jsx)("p", {
                className: "notice",
                children:
                  s === "prepared-food"
                    ? "Buy this dish prepared. Your checklist includes receiving, finishing and serving it."
                    : "Your guest is providing this dish. Your checklist keeps the receiving and serving steps.",
              }),
        ],
      }),
    });
  }
  function EL({
    engine: e,
    state: a,
    plan: t,
    commit: l,
    sheet: n,
    setSheet: u,
  }) {
    let r = t.shopping,
      [s, o] = (0, Q.useState)("needed"),
      [d, c] = (0, Q.useState)(null),
      p = r.filter((A) => A.remainingCanonical > 0),
      f = r.length - p.length,
      m = r.length ? Math.round((f / r.length) * 100) : 0,
      v = r.find((A) => A.key === d),
      C = v ? bs(e.units, v) : null,
      k = (A) => l((L) => pv(e.shopping, e.units, L, A)),
      h = (A) => {
        let L = String(A || "").toLowerCase();
        return /milk|cream|butter|cheese|egg|yogurt/.test(L)
          ? "Dairy + eggs"
          : /turkey|chicken|ham|sausage|bacon|beef/.test(L)
            ? "Meat + poultry"
            : /bread|roll|baguette|pastry/.test(L)
              ? "Bakery"
              : /apple|onion|celery|carrot|potato|green bean|herb|thyme|sage|rosemary|lemon|orange|garlic|brussels|cranberr|parsley/.test(
                    L,
                  )
                ? "Produce"
                : /wine|beer|juice|soda|water|cider|drink/.test(L)
                  ? "Drinks"
                  : /frozen/.test(L)
                    ? "Frozen"
                    : "Pantry";
      },
      g = r
        .filter(
          (A) =>
            s === "all" ||
            (s === "needed"
              ? A.remainingCanonical > 0
              : A.remainingCanonical <= 0),
        )
        .reduce((A, L) => {
          let x =
            L.kind === "ingredient" || L.kind === "turkey"
              ? h(L.name)
              : {
                  "prepared-food": "Prepared dishes",
                  "table-supply": "Table + serving",
                  "hosting-supply": "Equipment",
                  manual: "House + hosting",
                  "activity-supply": "Experience",
                }[L.kind] || "Other";
          return ((A[x] ||= []).push(L), A);
        }, {}),
      b = (A) => {
        A.preventDefault();
        let L = new FormData(A.currentTarget);
        l(
          (I) => (
            I.manualShoppingItems.push({
              key: gf("manual"),
              name: String(L.get("name")),
              quantity: Number(L.get("quantity") || 1),
              unit: String(L.get("unit") || "each"),
            }),
            I
          ),
        ) && u(null);
      },
      y = (A) => {
        A.preventDefault();
        let L = new FormData(A.currentTarget);
        l((I) => {
          let M = v.key.startsWith("table:linen:")
            ? I
            : e.shopping.setOwnedQuantity(
                I,
                v.key,
                Number(L.get("have") || 0),
                C.unit,
              );
          return e.shopping.recordPurchase(
            M,
            v.key,
            Number(L.get("purchased") || 0),
            C.unit,
            Number(L.get("actual") || 0),
            Number(L.get("committed") || 0),
          );
        }) && c(null);
      };
    return (0, i.jsxs)("main", {
      className: "page shopping-page",
      children: [
        (0, i.jsx)(Fa, {
          kicker: "PREPARE / SHOPPING",
          title: "Shopping",
          detail:
            "Scaled for " +
            t.planning.planningHeadcount +
            " guests. The amount to buy already deducts pantry stock and purchases.",
          action: (0, i.jsx)("button", {
            className: "round-action",
            "aria-label": "Add shopping item",
            onClick: () => u(n === "shopping" ? null : "shopping"),
            children: (0, i.jsx)(kt, { size: 18 }),
          }),
        }),
        (0, i.jsxs)("section", {
          className: "shopping-progress glass",
          children: [
            (0, i.jsxs)("div", {
              children: [
                (0, i.jsxs)("span", { children: [p.length, " TO BUY"] }),
                (0, i.jsxs)("strong", {
                  children: [
                    f,
                    (0, i.jsxs)("small", {
                      children: [" / ", r.length, " covered"],
                    }),
                  ],
                }),
              ],
            }),
            (0, i.jsx)("div", {
              className: "progress-track",
              "aria-hidden": "true",
              children: (0, i.jsx)("i", { style: { width: m + "%" } }),
            }),
            (0, i.jsx)("p", {
              children:
                "Edit quantities to record what you have. Mark Bought after shopping.",
            }),
          ],
        }),
        (0, i.jsx)("div", {
          className: "shopping-view",
          "aria-label": "Shopping view",
          children: [
            ["needed", "To buy", p.length],
            ["covered", "Covered", f],
            ["all", "All items", r.length],
          ].map(([A, L, x]) =>
            (0, i.jsxs)(
              "button",
              {
                "aria-pressed": s === A,
                className: s === A ? "selected" : "",
                onClick: () => o(A),
                children: [L, (0, i.jsx)("span", { children: x })],
              },
              A,
            ),
          ),
        }),
        Object.keys(g).length === 0 &&
          (0, i.jsx)("p", {
            className: "notice",
            children:
              s === "needed"
                ? "Everything on your list is covered. Continue to prep."
                : "No items in this view yet.",
          }),
        n === "shopping" &&
          (0, i.jsxs)("form", {
            className: "drawer-form glass",
            onSubmit: b,
            children: [
              (0, i.jsxs)("div", {
                className: "drawer-head",
                children: [
                  (0, i.jsx)("strong", { children: "Add shopping item" }),
                  (0, i.jsx)("button", {
                    type: "button",
                    "aria-label": "Close add shopping item",
                    onClick: () => u(null),
                    children: (0, i.jsx)(Ga, { size: 18 }),
                  }),
                ],
              }),
              (0, i.jsxs)("label", {
                children: [
                  "Item",
                  (0, i.jsx)("input", { name: "name", required: !0 }),
                ],
              }),
              (0, i.jsxs)("div", {
                className: "two-col",
                children: [
                  (0, i.jsxs)("label", {
                    children: [
                      "Quantity",
                      (0, i.jsx)("input", {
                        name: "quantity",
                        type: "number",
                        min: "0",
                        step: "any",
                        defaultValue: "1",
                      }),
                    ],
                  }),
                  (0, i.jsxs)("label", {
                    children: [
                      "Unit",
                      (0, i.jsx)("input", {
                        name: "unit",
                        defaultValue: "each",
                      }),
                    ],
                  }),
                ],
              }),
              (0, i.jsx)("button", {
                className: "primary",
                children: "Add item",
              }),
            ],
          }),
        Object.entries(g).map(([A, L]) =>
          (0, i.jsxs)(
            "section",
            {
              className: "shop-group",
              children: [
                (0, i.jsxs)("div", {
                  className: "section-line",
                  children: [
                    (0, i.jsx)("h2", { children: A }),
                    (0, i.jsxs)("strong", {
                      children: [
                        L.length,
                        " ",
                        L.length === 1 ? "item" : "items",
                      ],
                    }),
                  ],
                }),
                L.map((x) => {
                  let I = bs(e.units, x),
                    M = x.remainingCanonical <= 0,
                    q = Ba(I.remaining, I.unit),
                    J = [
                      ...new Set(
                        (x.sources || [])
                          .map((Be) => Be.recipeTitle || Be.source)
                          .filter(Boolean),
                      ),
                    ];
                  return (0, i.jsxs)(
                    "article",
                    {
                      className: "shopping-row" + (M ? " complete" : ""),
                      children: [
                        (0, i.jsx)("span", {
                          className: "shop-state" + (M ? " covered" : ""),
                          "aria-hidden": "true",
                          children: M
                            ? (0, i.jsx)(ba, { size: 17 })
                            : (0, i.jsx)(El, { size: 17 }),
                        }),
                        (0, i.jsxs)("div", {
                          className: "shopping-copy",
                          children: [
                            (0, i.jsx)("strong", { children: x.name || x.key }),
                            (0, i.jsxs)("p", {
                              className: "shopping-total",
                              children: [
                                "Total needed ",
                                (0, i.jsx)("b", {
                                  children: Ba(I.required, I.unit).text,
                                }),
                              ],
                            }),
                            (I.have > 0 || I.purchased > 0) &&
                              (0, i.jsxs)("p", {
                                className: "shopping-deductions",
                                children: [
                                  I.have > 0 &&
                                    (0, i.jsxs)("span", {
                                      children: [
                                        "At home ",
                                        Ba(I.have, I.unit).text,
                                      ],
                                    }),
                                  I.purchased > 0 &&
                                    (0, i.jsxs)("span", {
                                      children: [
                                        "Bought ",
                                        Ba(I.purchased, I.unit).text,
                                      ],
                                    }),
                                ],
                              }),
                            x.kind === "turkey" &&
                              (0, i.jsxs)("p", {
                                className: "shopping-bird-note",
                                children: [
                                  t.turkey.birdCount,
                                  " ",
                                  t.turkey.birdCount === 1 ? "bird" : "birds",
                                  " planned \xB7 about ",
                                  Ba(t.turkey.averageBirdWeightLb, "lb").text,
                                  " each",
                                ],
                              }),
                            J.length > 0 &&
                              (0, i.jsxs)("small", {
                                children: [
                                  J.slice(0, 2).join(" \xB7 "),
                                  J.length > 2
                                    ? " + " + (J.length - 2) + " more"
                                    : "",
                                ],
                              }),
                            x.allocationIssues?.length > 0 &&
                              (0, i.jsxs)("p", {
                                className: "quantity-warning",
                                children: [
                                  "Stored units need review. Edit this row to use ",
                                  I.unit,
                                  ".",
                                ],
                              }),
                          ],
                        }),
                        (0, i.jsxs)("div", {
                          className:
                            "shopping-amount" + (M ? " amount-covered" : ""),
                          "aria-label": M ? "Covered" : "To buy " + q.text,
                          children: [
                            (0, i.jsx)("span", {
                              children: M ? "Covered" : "To buy",
                            }),
                            (0, i.jsx)("strong", {
                              children: M
                                ? (0, i.jsx)(ba, { size: 23 })
                                : (0, i.jsxs)(i.Fragment, {
                                    children: [
                                      q.approximate &&
                                        (0, i.jsx)("small", {
                                          children: "\u2248 ",
                                        }),
                                      q.quantity,
                                    ],
                                  }),
                            }),
                            !M && (0, i.jsx)("span", { children: q.unit }),
                          ],
                        }),
                        (0, i.jsxs)("div", {
                          className: "shop-actions",
                          children: [
                            !M &&
                              (0, i.jsx)("button", {
                                className: "buy-button",
                                onClick: () => k(x),
                                "aria-label":
                                  "Mark remaining " +
                                  (x.name || x.key) +
                                  " (" +
                                  I.unit +
                                  ") bought",
                                children: "Bought",
                              }),
                            (0, i.jsx)("button", {
                              className: "quantity-edit round-action",
                              "aria-label":
                                "Edit quantities for " +
                                (x.name || x.key) +
                                " (" +
                                I.unit +
                                ")",
                              onClick: () => c(x.key),
                              children: (0, i.jsx)(_n, { size: 17 }),
                            }),
                          ],
                        }),
                      ],
                    },
                    x.key + ":" + x.dimension,
                  );
                }),
              ],
            },
            A,
          ),
        ),
        v &&
          (0, i.jsx)(hf, {
            title: v.name || v.key,
            onClose: () => c(null),
            children: (0, i.jsxs)(
              "form",
              {
                className: "quantity-form",
                onSubmit: y,
                children: [
                  (0, i.jsxs)("div", {
                    className: "quantity-summary",
                    children: [
                      (0, i.jsxs)("div", {
                        children: [
                          (0, i.jsx)("span", { children: "Total needed" }),
                          (0, i.jsx)("strong", {
                            children: Ba(C.required, C.unit).text,
                          }),
                        ],
                      }),
                      (0, i.jsxs)("div", {
                        children: [
                          (0, i.jsx)("span", { children: "Still to buy" }),
                          (0, i.jsx)("strong", {
                            children: Ba(C.remaining, C.unit).text,
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, i.jsxs)("p", {
                    className: "form-guidance",
                    children: [
                      "Enter amounts in ",
                      Ba(2, C.unit).unit,
                      ". Saving recalculates the amount to buy.",
                    ],
                  }),
                  (0, i.jsxs)("label", {
                    children: [
                      "Already have (",
                      C.unit,
                      ")",
                      (0, i.jsx)("input", {
                        name: "have",
                        type: "number",
                        min: "0",
                        step: "any",
                        disabled: v.key.startsWith("table:linen:"),
                        defaultValue: C.have,
                      }),
                    ],
                  }),
                  v.key.startsWith("table:linen:") &&
                    (0, i.jsx)("p", {
                      className: "form-guidance",
                      children:
                        "Owned linens are matched by size in Table & seating.",
                    }),
                  (0, i.jsxs)("label", {
                    children: [
                      "Purchased (",
                      C.unit,
                      ")",
                      (0, i.jsx)("input", {
                        name: "purchased",
                        type: "number",
                        min: "0",
                        step: "any",
                        defaultValue: C.purchased,
                      }),
                    ],
                  }),
                  (0, i.jsxs)("div", {
                    className: "two-col",
                    children: [
                      (0, i.jsxs)("label", {
                        children: [
                          "Committed $",
                          (0, i.jsx)("input", {
                            name: "committed",
                            type: "number",
                            min: "0",
                            step: ".01",
                            defaultValue: v.committedCost || "",
                          }),
                        ],
                      }),
                      (0, i.jsxs)("label", {
                        children: [
                          "Paid $",
                          (0, i.jsx)("input", {
                            name: "actual",
                            type: "number",
                            min: "0",
                            step: ".01",
                            defaultValue: v.actualCost || "",
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, i.jsx)("button", {
                    className: "primary",
                    children: "Save quantities",
                  }),
                ],
              },
              v.key +
                ":" +
                C.unit +
                ":" +
                v.requiredCanonical +
                ":" +
                v.haveCanonical +
                ":" +
                v.purchasedCanonical +
                ":" +
                v.actualCost +
                ":" +
                v.committedCost,
            ),
          }),
      ],
    });
  }
  function KL({ engine: e, state: a, plan: t, commit: l, navigate: n }) {
    let [u, r] = (0, Q.useState)("remaining"),
      [s, o] = (0, Q.useState)(null),
      d = t.prep,
      c = d.filter((C) => C.completed).length,
      p = gv(d, t.timeline),
      f = p
        ? t.timeline.tasks.find((C) => C.taskId === p.taskId)?.startAt
        : null,
      m = d.filter(
        (C) => u === "all" || (u === "remaining" ? !C.completed : C.completed),
      ),
      v = (C) =>
        l(
          (k) => (
            (k.taskOverrides[C.taskId] = {
              ...(k.taskOverrides[C.taskId] || {}),
              completed: !C.completed,
            }),
            k
          ),
        );
    return (0, i.jsxs)("main", {
      className: "page prep-page",
      children: [
        (0, i.jsx)(Fa, {
          kicker: "PREPARE / PREP",
          title: "Prep checklist",
          detail: "A practical sequence from make-ahead work to serving.",
          action: (0, i.jsxs)("button", {
            className: "prep-timeline-link",
            onClick: () => n("timeline"),
            children: [
              (0, i.jsx)(il, { size: 17 }),
              (0, i.jsx)("span", { children: "Timeline" }),
            ],
          }),
        }),
        (0, i.jsxs)("div", {
          className: "prep-summary",
          children: [
            (0, i.jsxs)("span", {
              children: [
                (0, i.jsx)("strong", { children: d.length - c }),
                " tasks left",
              ],
            }),
            (0, i.jsxs)("span", {
              children: [(0, i.jsx)("strong", { children: c }), " completed"],
            }),
          ],
        }),
        p
          ? (0, i.jsxs)("section", {
              className: "prep-focus",
              children: [
                (0, i.jsxs)("div", {
                  children: [
                    (0, i.jsx)("p", {
                      className: "eyebrow",
                      children: "Next in your plan",
                    }),
                    (0, i.jsx)("h2", { children: p.title }),
                    (0, i.jsxs)("p", {
                      children: [
                        p.recipeTitle || p.source || "Host task",
                        " \xB7 ",
                        ys(p),
                      ],
                    }),
                    f &&
                      (0, i.jsxs)("span", {
                        className: "prep-next-date",
                        children: [
                          "Planned ",
                          new Date(f).toLocaleString("en-US", {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                            hour: "numeric",
                            minute: "2-digit",
                          }),
                        ],
                      }),
                  ],
                }),
                (0, i.jsxs)("button", {
                  className: "primary",
                  onClick: () => (p.recipeId ? o(p.recipeId) : n("timeline")),
                  children: [
                    p.recipeId ? "View recipe" : "Open timeline",
                    (0, i.jsx)(xe, { size: 15 }),
                  ],
                }),
              ],
            })
          : (0, i.jsx)("p", {
              className: "notice",
              children:
                "Prep is complete. Your timeline keeps the serving sequence ready.",
            }),
        (0, i.jsx)("div", {
          className: "workflow-tabs",
          "aria-label": "Prep tasks",
          children: [
            ["remaining", "To do", d.length - c],
            ["completed", "Done", c],
            ["all", "All tasks", d.length],
          ].map(([C, k, h]) =>
            (0, i.jsxs)(
              "button",
              {
                className: u === C ? "selected" : "",
                "aria-pressed": u === C,
                onClick: () => r(C),
                children: [k, (0, i.jsx)("span", { children: h })],
              },
              C,
            ),
          ),
        }),
        !m.length &&
          (0, i.jsx)("p", {
            className: "notice",
            children:
              u === "completed"
                ? "No completed tasks yet. Check off a step as you finish it."
                : "No tasks in this view.",
          }),
        vs.map(([C, k, h]) => {
          let g = m.filter((b) => or(b.phase) === C);
          return g.length
            ? (0, i.jsxs)(
                "section",
                {
                  className: "prep-phase",
                  children: [
                    (0, i.jsxs)("header", {
                      className: "prep-phase-head",
                      children: [
                        (0, i.jsxs)("div", {
                          children: [
                            (0, i.jsx)("h2", { children: k }),
                            (0, i.jsx)("p", { children: h }),
                          ],
                        }),
                        (0, i.jsxs)("span", {
                          children: [
                            g.length,
                            " ",
                            g.length === 1 ? "task" : "tasks",
                          ],
                        }),
                      ],
                    }),
                    (0, i.jsx)("div", {
                      className: "task-list",
                      children: g.map((b) => {
                        let y = lf(b, d),
                          A = y.filter((I) => !I.completed),
                          L =
                            a.menuResponsibilities?.[b.dishId]
                              ?.contributorGuestId,
                          x =
                            b.preparationMode === "guest-provided"
                              ? a.guests.find(
                                  (I) =>
                                    String(I.guestId || I.id) === String(L),
                                )?.name
                              : null;
                        return (0, i.jsxs)(
                          "article",
                          {
                            className:
                              "task-row" + (b.completed ? " complete" : ""),
                            children: [
                              (0, i.jsx)("button", {
                                className: "task-check",
                                "aria-pressed": !!b.completed,
                                "aria-label":
                                  (b.completed
                                    ? "Mark incomplete: "
                                    : "Complete: ") + b.title,
                                onClick: () => v(b),
                                children:
                                  b.completed && (0, i.jsx)(ba, { size: 18 }),
                              }),
                              (0, i.jsxs)("div", {
                                className: "task-copy",
                                children: [
                                  (0, i.jsx)("strong", { children: b.title }),
                                  (0, i.jsxs)("p", {
                                    children: [
                                      b.recipeTitle || b.source || "Host task",
                                      " \xB7 ",
                                      ys(b),
                                      x ? " \xB7 " + x + " bringing" : "",
                                    ],
                                  }),
                                  (0, i.jsxs)("div", {
                                    className: "task-badges",
                                    children: [
                                      Cs(b).map((I) =>
                                        (0, i.jsx)("span", { children: I }, I),
                                      ),
                                      b.batchWaves > 1 &&
                                        (0, i.jsxs)("span", {
                                          children: [
                                            b.batchWaves,
                                            " cooking waves",
                                          ],
                                        }),
                                    ],
                                  }),
                                  (0, i.jsxs)("details", {
                                    className: "prep-task-details",
                                    children: [
                                      (0, i.jsx)("summary", {
                                        children: A.length
                                          ? "After " +
                                            A.length +
                                            " earlier " +
                                            (A.length === 1 ? "step" : "steps")
                                          : "Details",
                                      }),
                                      b.detail &&
                                        (0, i.jsx)("p", { children: b.detail }),
                                      y.length > 0
                                        ? (0, i.jsxs)("div", {
                                            className: "task-prerequisites",
                                            children: [
                                              (0, i.jsx)("span", {
                                                children: "First complete",
                                              }),
                                              (0, i.jsx)("ul", {
                                                children: y.map((I) =>
                                                  (0, i.jsxs)(
                                                    "li",
                                                    {
                                                      children: [
                                                        I.completed
                                                          ? (0, i.jsx)(ba, {
                                                              size: 14,
                                                            })
                                                          : (0, i.jsx)(il, {
                                                              size: 14,
                                                            }),
                                                        (0, i.jsx)("span", {
                                                          children: I.title,
                                                        }),
                                                      ],
                                                    },
                                                    I.taskId,
                                                  ),
                                                ),
                                              }),
                                            ],
                                          })
                                        : (0, i.jsx)("p", {
                                            children:
                                              "No earlier checklist step is required.",
                                          }),
                                      b.recipeId &&
                                        (0, i.jsxs)("button", {
                                          className: "recipe-detail-link",
                                          onClick: () => o(b.recipeId),
                                          children: [
                                            "Recipe + scaled ingredients ",
                                            (0, i.jsx)(xe, { size: 14 }),
                                          ],
                                        }),
                                    ],
                                  }),
                                ],
                              }),
                            ],
                          },
                          b.taskId,
                        );
                      }),
                    }),
                  ],
                },
                C,
              )
            : null;
        }),
        s &&
          (0, i.jsx)(HL, {
            engine: e,
            state: a,
            plan: t,
            recipeId: s,
            onClose: () => o(null),
          }),
      ],
    });
  }
  function GL({ state: e, plan: a, commit: t, navigate: l }) {
    let [n, u] = (0, Q.useState)("all"),
      [r, s] = (0, Q.useState)("all"),
      [o, d] = (0, Q.useState)(null),
      c = e.event.dinnerAt ? new Date(e.event.dinnerAt) : null,
      p = bv(a.timeline.tasks),
      f = vv(a.timeline),
      m = new Set(f.map((y) => y.taskId).filter(Boolean)),
      v = a.timeline.tasks.find((y) => y.taskId === o),
      C = a.timeline.tasks.filter((y) => !y.completed).length;
    (0, Q.useEffect)(() => {
      n !== "all" && !p.some((y) => y.key === n) && u("all");
    }, [n, p.map((y) => y.key).join("|")]);
    let k = (y) =>
        r === "all" ||
        (r === "review"
          ? y.conflict || m.has(y.taskId)
          : r === "hands-on"
            ? y.handsOn === !0 || y.assignments?.some((A) => A.type === "host")
            : (y.resourceRequirements || [])
                .concat(y.assignments || [])
                .some((A) => (A.type || A.resourceType) === "oven")),
      h = p
        .filter((y) => n === "all" || y.key === n)
        .map((y) => ({ ...y, tasks: y.tasks.filter(k) }))
        .filter((y) => y.tasks.length),
      g = (y) =>
        t(
          (A) => (
            (A.taskOverrides[y.taskId] = {
              ...(A.taskOverrides[y.taskId] || {}),
              completed: !y.completed,
            }),
            A
          ),
        ),
      b = (y) => {
        y.preventDefault();
        let A = new FormData(y.currentTarget);
        t(
          (x) => (
            (x.taskOverrides[v.taskId] = {
              ...(x.taskOverrides[v.taskId] || {}),
              durationMinutes: Number(A.get("duration")),
              fixedStart: String(A.get("fixedStart") || "") || null,
            }),
            x
          ),
        ) && d(null);
      };
    return (0, i.jsxs)("main", {
      className: "page timeline-page",
      children: [
        (0, i.jsx)(Fa, {
          kicker: "ON THE DAY / TIMELINE",
          title: "Your cooking sequence",
          detail:
            "One dinner time. A clear sequence, with equipment and timing checks.",
        }),
        (0, i.jsxs)("section", {
          className: "timeline-anchor",
          children: [
            (0, i.jsxs)("div", {
              children: [
                (0, i.jsx)("p", {
                  className: "eyebrow",
                  children: "Dinner time",
                }),
                (0, i.jsx)("strong", {
                  children: c
                    ? c.toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "2-digit",
                      })
                    : "Set a time",
                }),
                (0, i.jsx)("p", {
                  children: c
                    ? c.toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "short",
                        day: "numeric",
                      })
                    : "Add dinner time to schedule your steps.",
                }),
              ],
            }),
            (0, i.jsxs)("div", {
              className: "timeline-anchor-side",
              children: [
                (0, i.jsxs)("span", {
                  children: [
                    (0, i.jsx)("strong", { children: C }),
                    " steps left",
                  ],
                }),
                (0, i.jsxs)("span", {
                  className: f.length
                    ? "timing-status needs-review"
                    : "timing-status",
                  children: [
                    f.length
                      ? (0, i.jsx)(qa, { size: 15 })
                      : (0, i.jsx)(ba, { size: 15 }),
                    " ",
                    f.length
                      ? f.length + " timing checks"
                      : c
                        ? "Sequence clear"
                        : "Waiting for dinner time",
                  ],
                }),
                (0, i.jsxs)("button", {
                  className: "recipe-detail-link",
                  onClick: () => l("party"),
                  children: ["Edit dinner time ", (0, i.jsx)(xe, { size: 14 })],
                }),
              ],
            }),
          ],
        }),
        f.length > 0 &&
          (0, i.jsxs)("details", {
            className: "conflict-summary timeline-issues",
            open: !0,
            children: [
              (0, i.jsxs)("summary", {
                children: [
                  (0, i.jsx)(qa, { size: 17 }),
                  f.length,
                  " timing ",
                  f.length === 1 ? "check" : "checks",
                  " to review",
                ],
              }),
              (0, i.jsx)("div", {
                children: f.map((y, A) =>
                  (0, i.jsxs)(
                    "article",
                    {
                      children: [
                        (0, i.jsx)("strong", { children: y.title }),
                        (0, i.jsx)("p", { children: y.explanation }),
                        (0, i.jsx)("p", { children: y.recommendation }),
                        y.taskId &&
                          (0, i.jsxs)("button", {
                            className: "recipe-detail-link",
                            onClick: () => d(y.taskId),
                            children: [
                              "Adjust this step ",
                              (0, i.jsx)(xe, { size: 14 }),
                            ],
                          }),
                      ],
                    },
                    y.id || A,
                  ),
                ),
              }),
            ],
          }),
        (0, i.jsxs)("div", {
          className: "timeline-day-tabs",
          "aria-label": "Timeline days",
          children: [
            (0, i.jsx)("button", {
              className: n === "all" ? "selected" : "",
              "aria-pressed": n === "all",
              onClick: () => u("all"),
              children: "All days",
            }),
            p.map((y) =>
              (0, i.jsx)(
                "button",
                {
                  className: n === y.key ? "selected" : "",
                  "aria-pressed": n === y.key,
                  onClick: () => u(y.key),
                  children: y.shortLabel,
                },
                y.key,
              ),
            ),
          ],
        }),
        (0, i.jsx)("div", {
          className: "workflow-tabs timeline-resource-tabs",
          "aria-label": "Timeline steps",
          children: [
            ["all", "All steps"],
            ["oven", "Oven"],
            ["hands-on", "Hands-on"],
            ["review", "Needs review"],
          ].map(([y, A]) =>
            (0, i.jsx)(
              "button",
              {
                className: r === y ? "selected" : "",
                "aria-pressed": r === y,
                onClick: () => s(y),
                children: A,
              },
              y,
            ),
          ),
        }),
        (0, i.jsx)("div", {
          className: "timeline-groups",
          children: h.map((y) =>
            (0, i.jsxs)(
              "section",
              {
                className: "timeline-day",
                children: [
                  (0, i.jsxs)("header", {
                    className: "timeline-day-head",
                    children: [
                      (0, i.jsx)("h2", { children: y.label }),
                      (0, i.jsxs)("span", {
                        children: [
                          y.tasks.length,
                          " ",
                          y.tasks.length === 1 ? "step" : "steps",
                        ],
                      }),
                    ],
                  }),
                  (0, i.jsx)("div", {
                    className: "timeline-track",
                    children: y.tasks.map((A) => {
                      let L = A.conflict || m.has(A.taskId);
                      return (0, i.jsxs)(
                        "article",
                        {
                          className:
                            "timeline-step" +
                            (L ? " conflict" : "") +
                            (A.completed ? " complete" : ""),
                          children: [
                            (0, i.jsxs)("div", {
                              className: "timeline-time",
                              children: [
                                A.startAt
                                  ? (0, i.jsx)("time", {
                                      dateTime: A.startAt,
                                      children: new Date(
                                        A.startAt,
                                      ).toLocaleTimeString("en-US", {
                                        hour: "numeric",
                                        minute: "2-digit",
                                      }),
                                    })
                                  : (0, i.jsx)("span", { children: "\u2014" }),
                                A.endAt &&
                                  (0, i.jsxs)("span", {
                                    children: [
                                      "to ",
                                      new Date(A.endAt).toLocaleTimeString(
                                        "en-US",
                                        { hour: "numeric", minute: "2-digit" },
                                      ),
                                    ],
                                  }),
                              ],
                            }),
                            (0, i.jsxs)("div", {
                              className: "timeline-task-copy",
                              children: [
                                (0, i.jsx)("strong", { children: A.title }),
                                (0, i.jsxs)("p", {
                                  children: [
                                    A.recipeTitle || A.source || "Host task",
                                    " \xB7 ",
                                    ys(A),
                                  ],
                                }),
                                (0, i.jsxs)("div", {
                                  className: "task-badges",
                                  children: [
                                    Cs(A).map((x) =>
                                      (0, i.jsx)("span", { children: x }, x),
                                    ),
                                    A.fixedStart &&
                                      (0, i.jsx)("span", {
                                        children: "Pinned time",
                                      }),
                                    A.batchWaves > 1 &&
                                      (0, i.jsxs)("span", {
                                        children: [A.batchWaves, " waves"],
                                      }),
                                  ],
                                }),
                                L &&
                                  (0, i.jsxs)("span", {
                                    className: "conflict-label",
                                    children: [
                                      (0, i.jsx)(qa, { size: 13 }),
                                      " Timing needs review",
                                    ],
                                  }),
                              ],
                            }),
                            (0, i.jsxs)("div", {
                              className: "timeline-task-actions",
                              children: [
                                (0, i.jsx)("button", {
                                  className: "task-check",
                                  "aria-pressed": !!A.completed,
                                  "aria-label":
                                    (A.completed
                                      ? "Mark incomplete: "
                                      : "Complete: ") + A.title,
                                  onClick: () => g(A),
                                  children:
                                    A.completed && (0, i.jsx)(ba, { size: 18 }),
                                }),
                                (0, i.jsx)("button", {
                                  className: "round-action",
                                  "aria-label": "Edit timing for " + A.title,
                                  onClick: () => d(A.taskId),
                                  children: (0, i.jsx)(_n, { size: 17 }),
                                }),
                              ],
                            }),
                          ],
                        },
                        A.taskId,
                      );
                    }),
                  }),
                ],
              },
              y.key,
            ),
          ),
        }),
        !h.length &&
          (0, i.jsxs)("div", {
            className: "empty-state",
            children: [
              (0, i.jsx)("strong", { children: "No steps in this view." }),
              (0, i.jsx)("p", {
                children:
                  r === "review"
                    ? "Check the timing notes above for kitchen capacity guidance."
                    : "Choose another day or equipment filter.",
              }),
              (0, i.jsx)("button", {
                className: "small-primary",
                onClick: () => {
                  (u("all"), s("all"));
                },
                children: "Show all steps",
              }),
            ],
          }),
        v &&
          (0, i.jsx)(hf, {
            title: v.title,
            onClose: () => d(null),
            children: (0, i.jsxs)(
              "form",
              {
                className: "timing-form",
                onSubmit: b,
                children: [
                  (0, i.jsx)("p", {
                    className: "form-guidance",
                    children:
                      "Adjust this step. An empty pin field lets the schedule calculate its start time.",
                  }),
                  (0, i.jsxs)("label", {
                    children: [
                      "Duration (minutes)",
                      (0, i.jsx)("input", {
                        name: "duration",
                        type: "number",
                        min: "0",
                        step: "1",
                        required: !0,
                        defaultValue: v.durationMinutes,
                      }),
                    ],
                  }),
                  (0, i.jsxs)("label", {
                    children: [
                      "Pin start time",
                      (0, i.jsx)("input", {
                        name: "fixedStart",
                        type: "datetime-local",
                        defaultValue: hv(v.fixedStart),
                      }),
                    ],
                  }),
                  (0, i.jsx)("button", {
                    className: "primary",
                    children: "Save timing",
                  }),
                ],
              },
              v.taskId + ":" + v.durationMinutes + ":" + v.fixedStart,
            ),
          }),
      ],
    });
  }
  function FL({
    engine: e,
    state: a,
    plan: t,
    commit: l,
    sheet: n,
    setSheet: u,
  }) {
    let r = t.seating,
      s = r.namedPeople,
      o = Object.fromEntries(s.map((c) => [c.personId, c])),
      d = (c) => {
        c.preventDefault();
        let p = new FormData(c.currentTarget);
        (l(
          (f) => (
            f.tables.push({
              id: gf("table"),
              name: String(p.get("name") || "Dining table"),
              shape: String(p.get("shape") || "rectangle"),
              use: "dining",
              seatCapacity: Number(p.get("capacity") || 8),
              lengthIn: Number(p.get("length") || 72),
              widthIn: Number(p.get("width") || 36),
              linenDropIn: 12,
            }),
            f
          ),
        ),
          u(null));
      };
    return (0, i.jsxs)("main", {
      className: "page",
      children: [
        (0, i.jsx)(Fa, {
          kicker: "PLAN / TABLE + SEATING",
          title: "Table & seating",
          detail: "Real seats tied to the same guest list.",
          action: (0, i.jsx)("button", {
            className: "round-action",
            "aria-label": "Add table",
            onClick: () => u(n === "table" ? null : "table"),
            children: (0, i.jsx)(kt, { size: 18 }),
          }),
        }),
        (0, i.jsxs)("div", {
          className: "section-photo",
          children: [
            (0, i.jsx)("img", {
              src: ff,
              alt: "Organic modern Thanksgiving place settings with ivory linen and neutral dark stoneware",
              loading: "lazy",
            }),
            (0, i.jsx)("span", { children: "The setting" }),
          ],
        }),
        (0, i.jsxs)("div", {
          className: "metric-strip",
          children: [
            (0, i.jsxs)("div", {
              children: [
                (0, i.jsx)("span", { children: "NEEDED" }),
                (0, i.jsx)("strong", { children: t.table.requiredSeats }),
              ],
            }),
            (0, i.jsxs)("div", {
              children: [
                (0, i.jsx)("span", { children: "SEATS" }),
                (0, i.jsx)("strong", { children: t.table.seatCapacity }),
              ],
            }),
            (0, i.jsxs)("div", {
              children: [
                (0, i.jsx)("span", { children: "CHAIRS SHORT" }),
                (0, i.jsx)("strong", { children: t.table.chairShortage }),
              ],
            }),
            (0, i.jsxs)("div", {
              children: [
                (0, i.jsx)("span", { children: "OPEN" }),
                (0, i.jsx)("strong", { children: r.openSeatCount }),
              ],
            }),
          ],
        }),
        n === "table" &&
          (0, i.jsxs)("form", {
            className: "drawer-form glass",
            onSubmit: d,
            children: [
              (0, i.jsxs)("div", {
                className: "drawer-head",
                children: [
                  (0, i.jsx)("strong", { children: "ADD DINING TABLE" }),
                  (0, i.jsx)("button", {
                    type: "button",
                    onClick: () => u(null),
                    children: (0, i.jsx)(Ga, { size: 18 }),
                  }),
                ],
              }),
              (0, i.jsxs)("label", {
                children: [
                  "Name",
                  (0, i.jsx)("input", {
                    name: "name",
                    defaultValue: "Dining table",
                  }),
                ],
              }),
              (0, i.jsxs)("div", {
                className: "two-col",
                children: [
                  (0, i.jsxs)("label", {
                    children: [
                      "Seats",
                      (0, i.jsx)("input", {
                        name: "capacity",
                        type: "number",
                        min: "1",
                        defaultValue: "8",
                      }),
                    ],
                  }),
                  (0, i.jsxs)("label", {
                    children: [
                      "Shape",
                      (0, i.jsxs)("select", {
                        name: "shape",
                        children: [
                          (0, i.jsx)("option", {
                            value: "rectangle",
                            children: "Rectangle",
                          }),
                          (0, i.jsx)("option", {
                            value: "round",
                            children: "Round",
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              (0, i.jsxs)("div", {
                className: "two-col",
                children: [
                  (0, i.jsxs)("label", {
                    children: [
                      "Length in",
                      (0, i.jsx)("input", {
                        name: "length",
                        type: "number",
                        defaultValue: "72",
                      }),
                    ],
                  }),
                  (0, i.jsxs)("label", {
                    children: [
                      "Width in",
                      (0, i.jsx)("input", {
                        name: "width",
                        type: "number",
                        defaultValue: "36",
                      }),
                    ],
                  }),
                ],
              }),
              (0, i.jsx)("button", {
                className: "primary",
                children: "ADD TABLE",
              }),
            ],
          }),
        (0, i.jsx)("div", {
          className: "seat-grid",
          children: r.seatIds.map((c, p) => {
            let f = r.assignments[c];
            return (0, i.jsxs)(
              "label",
              {
                className: "seat-card",
                children: [
                  (0, i.jsxs)("span", { children: ["SEAT ", p + 1] }),
                  (0, i.jsxs)("select", {
                    value: f || "",
                    onChange: (m) =>
                      l((v) =>
                        m.target.value
                          ? e.seating.assignSeat(v, m.target.value, c)
                          : f
                            ? e.seating.unassignPerson(v, f)
                            : v,
                      ),
                    children: [
                      (0, i.jsx)("option", {
                        value: "",
                        children: "Open seat",
                      }),
                      s.map((m) =>
                        (0, i.jsx)(
                          "option",
                          { value: m.personId, children: m.name },
                          m.personId,
                        ),
                      ),
                    ],
                  }),
                  f &&
                    (0, i.jsx)("small", {
                      children: o[f]?.child ? "Child" : "Adult",
                    }),
                ],
              },
              c,
            );
          }),
        }),
        r.placeholderCount > 0 &&
          (0, i.jsxs)("div", {
            className: "notice",
            children: [
              (0, i.jsx)(qa, { size: 17 }),
              (0, i.jsxs)("span", {
                children: [
                  r.placeholderCount,
                  " planned guests do not have names yet, so they cannot be assigned to specific seats.",
                ],
              }),
            ],
          }),
      ],
    });
  }
  function QL({ state: e, commit: a }) {
    return (0, i.jsxs)("main", {
      className: "page",
      children: [
        (0, i.jsx)(Fa, {
          kicker: "PLAN / EXPERIENCE",
          title: "Experience",
          detail:
            "Choose the moments. Their supplies and tasks join your plan.",
        }),
        (0, i.jsxs)("div", {
          className: "section-photo",
          children: [
            (0, i.jsx)("img", {
              src: ks,
              alt: "A veined marble kitchen island with olive branches and natural linen",
              loading: "lazy",
            }),
            (0, i.jsx)("span", { children: "The gathering" }),
          ],
        }),
        (0, i.jsx)("div", {
          className: "experience-grid",
          children: Object.entries(e.activities || {}).map(([t, l]) => {
            let n =
              e.selectedActivities?.[t] === !0 ||
              e.selectedActivities?.[t]?.selected;
            return (0, i.jsxs)(
              "button",
              {
                className: "experience-card " + (n ? "selected" : ""),
                "aria-pressed": !!n,
                onClick: () => a((u) => ((u.selectedActivities[t] = !n), u)),
                children: [
                  (0, i.jsx)("span", { children: n ? "SELECTED" : "OPTIONAL" }),
                  (0, i.jsx)("strong", { children: l.title || t }),
                  (0, i.jsx)("p", {
                    children:
                      l.description || "Add this moment to the hosting plan.",
                  }),
                ],
              },
              t,
            );
          }),
        }),
      ],
    });
  }
  function VL({ state: e, plan: a, commit: t }) {
    return (0, i.jsxs)("main", {
      className: "page",
      children: [
        (0, i.jsx)(Fa, {
          kicker: "PREPARE / BUDGET",
          title: "Budget",
          detail: "Estimate, committed and paid stay separate.",
        }),
        (0, i.jsxs)("section", {
          className: "budget-hero glass",
          children: [
            (0, i.jsxs)("div", {
              children: [
                (0, i.jsx)("span", { children: "TARGET" }),
                (0, i.jsx)("strong", { children: $n(a.budget.target) }),
              ],
            }),
            (0, i.jsxs)("div", {
              children: [
                (0, i.jsx)("span", { children: "PROJECTED" }),
                (0, i.jsx)("strong", { children: $n(a.budget.projectedFinal) }),
              ],
            }),
            (0, i.jsxs)("div", {
              children: [
                (0, i.jsx)("span", { children: "COMMITTED" }),
                (0, i.jsx)("strong", { children: $n(a.budget.totalCommitted) }),
              ],
            }),
            (0, i.jsxs)("div", {
              children: [
                (0, i.jsx)("span", { children: "PAID" }),
                (0, i.jsx)("strong", { children: $n(a.budget.totalActual) }),
              ],
            }),
          ],
        }),
        (0, i.jsxs)("label", {
          className: "budget-target",
          children: [
            "Budget target",
            (0, i.jsx)("input", {
              type: "number",
              min: "0",
              value: e.event.budget || 0,
              onChange: (l) =>
                t((n) => ((n.event.budget = Number(l.target.value)), n)),
            }),
          ],
        }),
        (0, i.jsx)("div", {
          className: "budget-lines",
          children: a.budget.lines
            .filter((l) => l.estimated || l.committed || l.actual)
            .slice(0, 30)
            .map((l) =>
              (0, i.jsxs)(
                "div",
                {
                  children: [
                    (0, i.jsx)("span", { children: l.label }),
                    (0, i.jsx)("b", { children: $n(l.forecast) }),
                  ],
                },
                l.id,
              ),
            ),
        }),
        a.budget.incompletePriceLines > 0 &&
          (0, i.jsxs)("div", {
            className: "notice",
            children: [
              (0, i.jsx)(qa, { size: 17 }),
              (0, i.jsxs)("span", {
                children: [
                  a.budget.incompletePriceLines,
                  " lines do not have price data yet.",
                ],
              }),
            ],
          }),
      ],
    });
  }
  function ZL({ engine: e, state: a, commit: t }) {
    let l = e.printables.generatePrintableBundle(a),
      n = (u) => {
        let r = l.printables[u],
          s = window.open("", "_blank");
        s &&
          (s.document.write(e.printables.renderPrintableHtml(r)),
          s.document.close(),
          t((o) => e.printables.markPrintableGenerated(o, u)));
      };
    return (0, i.jsxs)("main", {
      className: "page",
      children: [
        (0, i.jsx)(Fa, {
          kicker: "ON THE DAY / PRINTABLES",
          title: "Printables",
          detail: "Names, menu, shopping and timing stay live until you print.",
        }),
        (0, i.jsx)("div", {
          className: "printable-grid",
          children: Object.entries(l.printables).map(([u, r]) => {
            let s = e.printables.printableStatus(a, u);
            return (0, i.jsxs)(
              "article",
              {
                className: "printable-card",
                children: [
                  (0, i.jsx)("span", {
                    children: s.stale
                      ? "UPDATED PLAN"
                      : s.generated
                        ? "GENERATED"
                        : "READY",
                  }),
                  (0, i.jsx)(Xn, { size: 22, strokeWidth: 1.3 }),
                  (0, i.jsx)("strong", { children: r.title }),
                  (0, i.jsxs)("p", {
                    children: [r.rows?.length || 0, " live entries"],
                  }),
                  (0, i.jsx)("button", {
                    onClick: () => n(u),
                    children: "PREVIEW + PRINT",
                  }),
                ],
              },
              u,
            );
          }),
        }),
      ],
    });
  }
  function jL({ engine: e, state: a, plan: t, commit: l, setState: n }) {
    let u = (d) => {
        d.preventDefault();
        let c = new FormData(d.currentTarget);
        l(
          (p) => (
            (p.event.dinnerAt = String(c.get("dinnerAt") || "")),
            (p.event.service = String(c.get("service") || "family")),
            (p.event.budget = Number(c.get("budget") || 0)),
            (p.event.ovens = Number(c.get("ovens") || 1)),
            (p.event.burners = Number(c.get("burners") || 4)),
            (p.planning.mode = String(c.get("mode") || "expected")),
            (p.planning.customHeadcount = Number(
              c.get("customHeadcount") || p.planning.customHeadcount || 0,
            )),
            (p.planning.estimatedHeadcount = Number(
              c.get("estimatedHeadcount") || p.planning.estimatedHeadcount || 0,
            )),
            (p.planning.foodBufferPercent = Number(c.get("foodBuffer") || 0)),
            p
          ),
        );
      },
      r = () => {
        let d = new Blob([e.persistence.backupState(a)], {
            type: "application/json",
          }),
          c = URL.createObjectURL(d),
          p = document.createElement("a");
        ((p.href = c),
          (p.download = "crow-crown-thanksgiving-backup.json"),
          p.click(),
          URL.revokeObjectURL(c));
      },
      s = async (d) => {
        let c = d.target.files?.[0];
        if (!c) return;
        let p = e.persistence.restoreBackup(await c.text()),
          f = o();
        (f && e.persistence.saveState(f, p, { key: cf, bumpRevision: !1 }),
          n(p));
      },
      o = () => df();
    return (0, i.jsxs)("main", {
      className: "page",
      children: [
        (0, i.jsx)(Fa, {
          kicker: "YOUR GATHERING / DETAILS",
          title: "Event details",
          detail: "Adjust dinner, guest quantities and kitchen capacity.",
        }),
        (0, i.jsxs)("form", {
          className: "settings-form glass",
          onSubmit: u,
          children: [
            (0, i.jsxs)("label", {
              children: [
                "Plan for",
                (0, i.jsxs)("select", {
                  name: "mode",
                  defaultValue: a.planning.mode,
                  children: [
                    (0, i.jsx)("option", {
                      value: "expected",
                      children: "Expected guests",
                    }),
                    (0, i.jsx)("option", {
                      value: "confirmed",
                      children: "Confirmed guests",
                    }),
                    (0, i.jsx)("option", {
                      value: "custom",
                      children: "Custom headcount",
                    }),
                    (0, i.jsx)("option", {
                      value: "estimated",
                      children: "Estimate",
                    }),
                  ],
                }),
              ],
            }),
            (0, i.jsxs)("label", {
              children: [
                "Estimated headcount",
                (0, i.jsx)("input", {
                  name: "estimatedHeadcount",
                  type: "number",
                  min: "0",
                  defaultValue: a.planning.estimatedHeadcount,
                }),
              ],
            }),
            (0, i.jsxs)("label", {
              children: [
                "Custom headcount",
                (0, i.jsx)("input", {
                  name: "customHeadcount",
                  type: "number",
                  min: "0",
                  defaultValue: a.planning.customHeadcount,
                }),
              ],
            }),
            (0, i.jsxs)("label", {
              children: [
                "Dinner time",
                (0, i.jsx)("input", {
                  name: "dinnerAt",
                  type: "datetime-local",
                  defaultValue: a.event.dinnerAt?.slice(0, 16) || "",
                }),
              ],
            }),
            (0, i.jsxs)("label", {
              children: [
                "Service",
                (0, i.jsxs)("select", {
                  name: "service",
                  defaultValue: a.event.service,
                  children: [
                    (0, i.jsx)("option", {
                      value: "family",
                      children: "Family style",
                    }),
                    (0, i.jsx)("option", {
                      value: "buffet",
                      children: "Buffet",
                    }),
                    (0, i.jsx)("option", {
                      value: "plated",
                      children: "Plated",
                    }),
                    (0, i.jsx)("option", {
                      value: "cocktail",
                      children: "Grazing",
                    }),
                  ],
                }),
              ],
            }),
            (0, i.jsxs)("label", {
              children: [
                "Budget",
                (0, i.jsx)("input", {
                  name: "budget",
                  type: "number",
                  min: "0",
                  defaultValue: a.event.budget || 0,
                }),
              ],
            }),
            (0, i.jsxs)("label", {
              children: [
                "Ovens",
                (0, i.jsx)("input", {
                  name: "ovens",
                  type: "number",
                  min: "0",
                  defaultValue: a.event.ovens || 1,
                }),
              ],
            }),
            (0, i.jsxs)("label", {
              children: [
                "Burners",
                (0, i.jsx)("input", {
                  name: "burners",
                  type: "number",
                  min: "0",
                  defaultValue: a.event.burners || 4,
                }),
              ],
            }),
            (0, i.jsxs)("label", {
              children: [
                "Food buffer %",
                (0, i.jsx)("input", {
                  name: "foodBuffer",
                  type: "number",
                  min: "0",
                  defaultValue: a.planning.foodBufferPercent || 0,
                }),
              ],
            }),
            (0, i.jsx)("button", {
              className: "primary span-all",
              children: "UPDATE THE PLAN",
            }),
          ],
        }),
        (0, i.jsxs)("section", {
          className: "data-tools",
          children: [
            (0, i.jsxs)("button", {
              onClick: r,
              children: [(0, i.jsx)(fr, { size: 17 }), " EXPORT BACKUP"],
            }),
            (0, i.jsxs)("label", {
              children: [
                (0, i.jsx)(gr, { size: 17 }),
                " IMPORT BACKUP",
                (0, i.jsx)("input", {
                  type: "file",
                  accept: "application/json",
                  onChange: s,
                  hidden: !0,
                }),
              ],
            }),
          ],
        }),
      ],
    });
  }
  function YL({ state: e, plan: a, navigate: t }) {
    let l = e.event.dinnerAt ? new Date(e.event.dinnerAt) : null,
      n = new Date(),
      u = l ? Math.max(0, Math.ceil((l.getTime() - n.getTime()) / 36e5)) : null,
      r =
        u === null
          ? "Set dinner time"
          : u >= 48
            ? Math.floor(u / 24) + " days \xB7 " + (u % 24) + " hours"
            : u
              ? u + " hours"
              : "Dinner time",
      s = [...a.timeline.tasks]
        .filter((f) => !a.prep.find((m) => m.taskId === f.taskId)?.completed)
        .sort((f, m) => new Date(f.startAt || 0) - new Date(m.startAt || 0)),
      o = s.find((f) => f.startAt && new Date(f.startAt) >= n) || s[0],
      d = o?.startAt && new Date(o.startAt).getTime() - n.getTime() <= 36e5,
      c = s.filter((f) => f.startAt && new Date(f.startAt) >= n).slice(1, 4),
      p = a.shopping.filter((f) => (f.remainingCanonical || 0) > 0);
    return (0, i.jsxs)("main", {
      className: "page host-page",
      children: [
        (0, i.jsx)(Fa, {
          kicker: "ON THE DAY",
          title: "Party day",
          detail: "What to do now, then what comes next.",
        }),
        (0, i.jsxs)("section", {
          className: "party-day-hero",
          children: [
            (0, i.jsx)("span", { children: "DINNER COUNTDOWN" }),
            (0, i.jsx)("strong", { children: r }),
            (0, i.jsx)("small", {
              children: l?.toLocaleString(void 0, {
                weekday: "long",
                hour: "numeric",
                minute: "2-digit",
              }),
            }),
          ],
        }),
        (0, i.jsxs)("section", {
          className: "day-block urgent",
          children: [
            (0, i.jsxs)("div", {
              className: "section-line",
              children: [
                (0, i.jsx)("span", { children: "NOW" }),
                (0, i.jsx)("strong", { children: "01" }),
              ],
            }),
            (0, i.jsx)("h2", {
              children: d ? o.title : "Your next step is scheduled.",
            }),
            (0, i.jsx)("p", {
              children: o?.startAt
                ? o.title +
                  " \xB7 " +
                  new Date(o.startAt).toLocaleString(void 0, {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                  })
                : "Keep an eye on the next steps.",
            }),
            (0, i.jsx)("button", {
              onClick: () => t("timeline"),
              children: "OPEN TIMELINE \u2192",
            }),
          ],
        }),
        (0, i.jsxs)("section", {
          className: "day-block",
          children: [
            (0, i.jsxs)("div", {
              className: "section-line",
              children: [
                (0, i.jsx)("span", { children: "NEXT" }),
                (0, i.jsx)("strong", { children: c.length }),
              ],
            }),
            c.map((f) =>
              (0, i.jsxs)(
                "p",
                {
                  children: [
                    new Date(f.startAt).toLocaleString([], {
                      month: "short",
                      day: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                    }),
                    " \xB7 ",
                    f.title,
                  ],
                },
                f.taskId,
              ),
            ),
            (0, i.jsx)("button", {
              onClick: () => t("prep"),
              children: "PREP CHECKLIST \u2192",
            }),
          ],
        }),
        (0, i.jsxs)("section", {
          className: "day-block",
          children: [
            (0, i.jsxs)("div", {
              className: "section-line",
              children: [
                (0, i.jsx)("span", { children: "LATER + REMINDERS" }),
                (0, i.jsxs)("strong", { children: [p.length, " TO GET"] }),
              ],
            }),
            (0, i.jsx)("p", {
              children: p.length
                ? p
                    .slice(0, 3)
                    .map((f) => f.name || f.key)
                    .join(" \xB7 ")
                : "Shopping is covered.",
            }),
            (0, i.jsx)("p", {
              children: a.timeline.issues.length
                ? a.timeline.issues.length + " timing conflicts need a review."
                : "Timing is clear.",
            }),
            (0, i.jsxs)("button", {
              onClick: () => t(p.length ? "shopping" : "timeline"),
              children: [
                p.length ? "LAST-MINUTE SHOPPING" : "FULL SCHEDULE",
                " \u2192",
              ],
            }),
          ],
        }),
        (0, i.jsxs)("div", {
          className: "home-tools",
          children: [
            (0, i.jsx)("span", { children: "HOSTING DETAILS" }),
            [
              ["experience", "Experience"],
              ["seating", "Seating"],
              ["printables", "Printables"],
              ["budget", "Budget"],
            ].map(([f, m]) =>
              (0, i.jsxs)(
                "button",
                { onClick: () => t(f), children: [m, " \u2192"] },
                f,
              ),
            ),
          ],
        }),
      ],
    });
  }
  function JL({ title: e, text: a }) {
    return (0, i.jsxs)("div", {
      className: "empty-state",
      children: [
        (0, i.jsx)("strong", { children: e }),
        (0, i.jsx)("p", { children: a }),
      ],
    });
  }
  var wv = ML;
  var bf = it(vr(), 1);
  const root = (0, qv.createRoot)(element);
  root.render((0, bf.jsx)(Bv.StrictMode, { children: (0, bf.jsx)(wv, {}) }));
  return () => root.unmount();
}
/*! Bundled license information:

react/cjs/react.production.js:
  (**
   * @license React
   * react.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

scheduler/cjs/scheduler.production.js:
  (**
   * @license React
   * scheduler.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-dom/cjs/react-dom.production.js:
  (**
   * @license React
   * react-dom.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-dom/cjs/react-dom-client.production.js:
  (**
   * @license React
   * react-dom-client.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react/cjs/react-jsx-runtime.production.js:
  (**
   * @license React
   * react-jsx-runtime.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/shared/src/utils.js:
lucide-react/dist/esm/defaultAttributes.js:
lucide-react/dist/esm/Icon.js:
lucide-react/dist/esm/createLucideIcon.js:
lucide-react/dist/esm/icons/armchair.js:
lucide-react/dist/esm/icons/arrow-up-right.js:
lucide-react/dist/esm/icons/calendar-days.js:
lucide-react/dist/esm/icons/check.js:
lucide-react/dist/esm/icons/chef-hat.js:
lucide-react/dist/esm/icons/chevron-right.js:
lucide-react/dist/esm/icons/circle-alert.js:
lucide-react/dist/esm/icons/clipboard-list.js:
lucide-react/dist/esm/icons/clock-3.js:
lucide-react/dist/esm/icons/download.js:
lucide-react/dist/esm/icons/ellipsis.js:
lucide-react/dist/esm/icons/house.js:
lucide-react/dist/esm/icons/plus.js:
lucide-react/dist/esm/icons/printer.js:
lucide-react/dist/esm/icons/search.js:
lucide-react/dist/esm/icons/settings-2.js:
lucide-react/dist/esm/icons/shopping-bag.js:
lucide-react/dist/esm/icons/sliders-horizontal.js:
lucide-react/dist/esm/icons/sparkles.js:
lucide-react/dist/esm/icons/trash-2.js:
lucide-react/dist/esm/icons/upload.js:
lucide-react/dist/esm/icons/users.js:
lucide-react/dist/esm/icons/utensils.js:
lucide-react/dist/esm/icons/wallet-cards.js:
lucide-react/dist/esm/icons/x.js:
lucide-react/dist/esm/lucide-react.js:
  (**
   * @license lucide-react v0.469.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)
*/
