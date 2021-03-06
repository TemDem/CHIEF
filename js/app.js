(() => {
  "use strict";
  const e = {};
  let t = (e, t = 500, r = 0) => {
      e.classList.contains("_slide") ||
        (e.classList.add("_slide"),
        (e.style.transitionProperty = "height, margin, padding"),
        (e.style.transitionDuration = t + "ms"),
        (e.style.height = `${e.offsetHeight}px`),
        e.offsetHeight,
        (e.style.overflow = "hidden"),
        (e.style.height = r ? `${r}px` : "0px"),
        (e.style.paddingTop = 0),
        (e.style.paddingBottom = 0),
        (e.style.marginTop = 0),
        (e.style.marginBottom = 0),
        window.setTimeout(() => {
          (e.hidden = !r),
            !r && e.style.removeProperty("height"),
            e.style.removeProperty("padding-top"),
            e.style.removeProperty("padding-bottom"),
            e.style.removeProperty("margin-top"),
            e.style.removeProperty("margin-bottom"),
            !r && e.style.removeProperty("overflow"),
            e.style.removeProperty("transition-duration"),
            e.style.removeProperty("transition-property"),
            e.classList.remove("_slide"),
            document.dispatchEvent(
              new CustomEvent("slideUpDone", { detail: { target: e } })
            );
        }, t));
    },
    r = (e, t = 500, r = 0) => {
      if (!e.classList.contains("_slide")) {
        e.classList.add("_slide"),
          (e.hidden = !e.hidden && null),
          r && e.style.removeProperty("height");
        let a = e.offsetHeight;
        (e.style.overflow = "hidden"),
          (e.style.height = r ? `${r}px` : "0px"),
          (e.style.paddingTop = 0),
          (e.style.paddingBottom = 0),
          (e.style.marginTop = 0),
          (e.style.marginBottom = 0),
          e.offsetHeight,
          (e.style.transitionProperty = "height, margin, padding"),
          (e.style.transitionDuration = t + "ms"),
          (e.style.height = a + "px"),
          e.style.removeProperty("padding-top"),
          e.style.removeProperty("padding-bottom"),
          e.style.removeProperty("margin-top"),
          e.style.removeProperty("margin-bottom"),
          window.setTimeout(() => {
            e.style.removeProperty("height"),
              e.style.removeProperty("overflow"),
              e.style.removeProperty("transition-duration"),
              e.style.removeProperty("transition-property"),
              e.classList.remove("_slide"),
              document.dispatchEvent(
                new CustomEvent("slideDownDone", { detail: { target: e } })
              );
          }, t);
      }
    };
  function a(e) {
    return e.filter(function (e, t, r) {
      return r.indexOf(e) === t;
    });
  }
  function o(e, t) {
    const r = Array.from(e).filter(function (e, r, a) {
      if (e.dataset[t]) return e.dataset[t].split(",")[0];
    });
    if (r.length) {
      const e = [];
      r.forEach((r) => {
        const a = {},
          o = r.dataset[t].split(",");
        (a.value = o[0]),
          (a.type = o[1] ? o[1].trim() : "max"),
          (a.item = r),
          e.push(a);
      });
      let o = e.map(function (e) {
        return (
          "(" + e.type + "-width: " + e.value + "px)," + e.value + "," + e.type
        );
      });
      o = a(o);
      const s = [];
      if (o.length)
        return (
          o.forEach((t) => {
            const r = t.split(","),
              a = r[1],
              o = r[2],
              i = window.matchMedia(r[0]),
              l = e.filter(function (e) {
                if (e.value === a && e.type === o) return !0;
              });
            s.push({ itemsArray: l, matchMedia: i });
          }),
          s
        );
    }
  }
  let s = {
    getErrors(e) {
      let t = 0,
        r = e.querySelectorAll("*[data-required]");
      return (
        r.length &&
          r.forEach((e) => {
            (null === e.offsetParent && "SELECT" !== e.tagName) ||
              e.disabled ||
              (t += this.validateInput(e));
          }),
        t
      );
    },
    validateInput(e) {
      let t = 0;
      return (
        "email" === e.dataset.required
          ? ((e.value = e.value.replace(" ", "")),
            this.emailTest(e) ? (this.addError(e), t++) : this.removeError(e))
          : ("checkbox" !== e.type || e.checked) && e.value
          ? this.removeError(e)
          : (this.addError(e), t++),
        t
      );
    },
    addError(e) {
      e.classList.add("_form-error"),
        e.parentElement.classList.add("_form-error");
      let t = e.parentElement.querySelector(".form__error");
      t && e.parentElement.removeChild(t),
        e.dataset.error &&
          e.parentElement.insertAdjacentHTML(
            "beforeend",
            `<div class="form__error">${e.dataset.error}</div>`
          );
    },
    removeError(e) {
      e.classList.remove("_form-error"),
        e.parentElement.classList.remove("_form-error"),
        e.parentElement.querySelector(".form__error") &&
          e.parentElement.removeChild(
            e.parentElement.querySelector(".form__error")
          );
    },
    formClean(t) {
      t.reset(),
        setTimeout(() => {
          let r = t.querySelectorAll("input,textarea");
          for (let e = 0; e < r.length; e++) {
            const t = r[e];
            t.parentElement.classList.remove("_form-focus"),
              t.classList.remove("_form-focus"),
              s.removeError(t);
          }
          let a = t.querySelectorAll(".checkbox__input");
          if (a.length > 0)
            for (let e = 0; e < a.length; e++) {
              a[e].checked = !1;
            }
          if (e.select) {
            let r = t.querySelectorAll(".select");
            if (r.length)
              for (let t = 0; t < r.length; t++) {
                const a = r[t].querySelector("select");
                e.select.selectBuild(a);
              }
          }
        }, 0);
    },
    emailTest: (e) =>
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(e.value),
  };
  e.watcher = new (class {
    constructor(e) {
      (this.config = Object.assign({ logging: !0 }, e)),
        this.observer,
        !document.documentElement.classList.contains("watcher") &&
          this.scrollWatcherRun();
    }
    scrollWatcherUpdate() {
      this.scrollWatcherRun();
    }
    scrollWatcherRun() {
      document.documentElement.classList.add("watcher"),
        this.scrollWatcherConstructor(
          document.querySelectorAll("[data-watch]")
        );
    }
    scrollWatcherConstructor(e) {
      if (e.length) {
        this.scrollWatcherLogging(
          `??????????????????, ?????????? ???? ?????????????????? (${e.length})...`
        ),
          a(
            Array.from(e).map(function (e) {
              return `${
                e.dataset.watchRoot ? e.dataset.watchRoot : null
              }|${e.dataset.watchMargin ? e.dataset.watchMargin : "0px"}|${e.dataset.watchThreshold ? e.dataset.watchThreshold : 0}`;
            })
          ).forEach((t) => {
            let r = t.split("|"),
              a = { root: r[0], margin: r[1], threshold: r[2] },
              o = Array.from(e).filter(function (e) {
                let t = e.dataset.watchRoot ? e.dataset.watchRoot : null,
                  r = e.dataset.watchMargin ? e.dataset.watchMargin : "0px",
                  o = e.dataset.watchThreshold ? e.dataset.watchThreshold : 0;
                if (
                  String(t) === a.root &&
                  String(r) === a.margin &&
                  String(o) === a.threshold
                )
                  return e;
              }),
              s = this.getScrollWatcherConfig(a);
            this.scrollWatcherInit(o, s);
          });
      } else
        this.scrollWatcherLogging("????????, ?????? ???????????????? ?????? ????????????????. ZzzZZzz");
    }
    getScrollWatcherConfig(e) {
      let t = {};
      if (
        (document.querySelector(e.root)
          ? (t.root = document.querySelector(e.root))
          : "null" !== e.root &&
            this.scrollWatcherLogging(
              `??????... ?????????????????????????? ?????????????? ${e.root} ?????? ???? ????????????????`
            ),
        (t.rootMargin = e.margin),
        !(e.margin.indexOf("px") < 0 && e.margin.indexOf("%") < 0))
      ) {
        if ("prx" === e.threshold) {
          e.threshold = [];
          for (let t = 0; t <= 1; t += 0.005) e.threshold.push(t);
        } else e.threshold = e.threshold.split(",");
        return (t.threshold = e.threshold), t;
      }
      this.scrollWatcherLogging(
        "???? ????, ?????????????????? data-watch-margin ?????????? ???????????????? ?? PX ?????? %"
      );
    }
    scrollWatcherCreate(e) {
      this.observer = new IntersectionObserver((e, t) => {
        e.forEach((e) => {
          this.scrollWatcherCallback(e, t);
        });
      }, e);
    }
    scrollWatcherInit(e, t) {
      this.scrollWatcherCreate(t), e.forEach((e) => this.observer.observe(e));
    }
    scrollWatcherIntersecting(e, t) {
      e.isIntersecting
        ? (!t.classList.contains("_watcher-view") &&
            t.classList.add("_watcher-view"),
          this.scrollWatcherLogging(
            `?? ???????? ${t.classList}, ?????????????? ?????????? _watcher-view`
          ))
        : (t.classList.contains("_watcher-view") &&
            t.classList.remove("_watcher-view"),
          this.scrollWatcherLogging(
            `?? ???? ???????? ${t.classList}, ?????????? ?????????? _watcher-view`
          ));
    }
    scrollWatcherOff(e, t) {
      t.unobserve(e),
        this.scrollWatcherLogging(`?? ???????????????? ?????????????? ???? ${e.classList}`);
    }
    scrollWatcherLogging(e) {
      this.config.logging &&
        (function (e) {
          setTimeout(() => {
            window.FLS && console.log(e);
          }, 0);
        })(`[??????????????????????]: ${e}`);
    }
    scrollWatcherCallback(e, t) {
      const r = e.target;
      this.scrollWatcherIntersecting(e, r),
        r.hasAttribute("data-watch-once") &&
          e.isIntersecting &&
          this.scrollWatcherOff(r, t),
        document.dispatchEvent(
          new CustomEvent("watcherCallback", { detail: { entry: e } })
        );
    }
  })({});
  let i = !1;
  function l(e) {
    this.type = e;
  }
  setTimeout(() => {
    if (i) {
      let e = new Event("windowScroll");
      window.addEventListener("scroll", function (t) {
        document.dispatchEvent(e);
      });
    }
  }, 0),
    (l.prototype.init = function () {
      const e = this;
      (this.??bjects = []),
        (this.daClassname = "_dynamic_adapt_"),
        (this.nodes = document.querySelectorAll("[data-da]"));
      for (let e = 0; e < this.nodes.length; e++) {
        const t = this.nodes[e],
          r = t.dataset.da.trim().split(","),
          a = {};
        (a.element = t),
          (a.parent = t.parentNode),
          (a.destination = document.querySelector(r[0].trim())),
          (a.breakpoint = r[1] ? r[1].trim() : "767"),
          (a.place = r[2] ? r[2].trim() : "last"),
          (a.index = this.indexInParent(a.parent, a.element)),
          this.??bjects.push(a);
      }
      this.arraySort(this.??bjects),
        (this.mediaQueries = Array.prototype.map.call(
          this.??bjects,
          function (e) {
            return (
              "(" +
              this.type +
              "-width: " +
              e.breakpoint +
              "px)," +
              e.breakpoint
            );
          },
          this
        )),
        (this.mediaQueries = Array.prototype.filter.call(
          this.mediaQueries,
          function (e, t, r) {
            return Array.prototype.indexOf.call(r, e) === t;
          }
        ));
      for (let t = 0; t < this.mediaQueries.length; t++) {
        const r = this.mediaQueries[t],
          a = String.prototype.split.call(r, ","),
          o = window.matchMedia(a[0]),
          s = a[1],
          i = Array.prototype.filter.call(this.??bjects, function (e) {
            return e.breakpoint === s;
          });
        o.addListener(function () {
          e.mediaHandler(o, i);
        }),
          this.mediaHandler(o, i);
      }
    }),
    (l.prototype.mediaHandler = function (e, t) {
      if (e.matches)
        for (let e = 0; e < t.length; e++) {
          const r = t[e];
          (r.index = this.indexInParent(r.parent, r.element)),
            this.moveTo(r.place, r.element, r.destination);
        }
      else
        for (let e = t.length - 1; e >= 0; e--) {
          const r = t[e];
          r.element.classList.contains(this.daClassname) &&
            this.moveBack(r.parent, r.element, r.index);
        }
    }),
    (l.prototype.moveTo = function (e, t, r) {
      t.classList.add(this.daClassname),
        "last" === e || e >= r.children.length
          ? r.insertAdjacentElement("beforeend", t)
          : "first" !== e
          ? r.children[e].insertAdjacentElement("beforebegin", t)
          : r.insertAdjacentElement("afterbegin", t);
    }),
    (l.prototype.moveBack = function (e, t, r) {
      t.classList.remove(this.daClassname),
        void 0 !== e.children[r]
          ? e.children[r].insertAdjacentElement("beforebegin", t)
          : e.insertAdjacentElement("beforeend", t);
    }),
    (l.prototype.indexInParent = function (e, t) {
      const r = Array.prototype.slice.call(e.children);
      return Array.prototype.indexOf.call(r, t);
    }),
    (l.prototype.arraySort = function (e) {
      "min" === this.type
        ? Array.prototype.sort.call(e, function (e, t) {
            return e.breakpoint === t.breakpoint
              ? e.place === t.place
                ? 0
                : "first" === e.place || "last" === t.place
                ? -1
                : "last" === e.place || "first" === t.place
                ? 1
                : e.place - t.place
              : e.breakpoint - t.breakpoint;
          })
        : Array.prototype.sort.call(e, function (e, t) {
            return e.breakpoint === t.breakpoint
              ? e.place === t.place
                ? 0
                : "first" === e.place || "last" === t.place
                ? 1
                : "last" === e.place || "first" === t.place
                ? -1
                : t.place - e.place
              : t.breakpoint - e.breakpoint;
          });
    });
  new l("max").init();
  const n = document.querySelectorAll(".header-navigation__link_button"),
    c = document.querySelectorAll(".pod-menu-header"),
    d = document.querySelector(".page"),
    h = document.querySelectorAll(".form-footer__input"),
    m = document.querySelector(".bottom-header"),
    u = document.querySelectorAll(".item-content"),
    p = document.querySelectorAll(".main-content-filter__link"),
    g = document.querySelectorAll(".tabs-filter__item"),
    f = document.querySelectorAll(".image");
  document.addEventListener("click", function (e) {
    if (n.length) {
      const t = e.target.closest(".header-navigation__link_button");
      if (t) {
        const e = document.getElementById(t.dataset.menu);
        e &&
          (c.forEach((t) => {
            t.classList.contains("_active") &&
              (t.classList.remove("_active"),
              t.id === e.id && e.classList.add("_active"));
          }),
          n.forEach((e) => {
            e.classList.contains("_active") &&
              (e.classList.remove("_active"),
              e.dataset.menu === t.dataset.menu && t.classList.add("_active"));
          }),
          e.classList.toggle("_active"),
          t.classList.toggle("_active"));
      }
      !t &&
        !e.target.closest(".pod-menu-header") &&
        document.querySelector(".pod-menu-header._active") &&
        document.querySelector(".header-navigation__link_button._active") &&
        (document
          .querySelector(".pod-menu-header._active")
          .classList.remove("_active"),
        document
          .querySelector(".header-navigation__link_button._active")
          .classList.remove("_active")),
        document.querySelector(".pod-menu-header._active") && d && m
          ? (d.classList.add("dark"),
            m.classList.add("dark"),
            f.length &&
              f.forEach((e) => {
                e.classList.add("dark");
              }))
          : (d.classList.remove("dark"),
            m.classList.remove("dark"),
            f.length &&
              f.forEach((e) => {
                e.classList.remove("dark");
              }));
    }
    if (e.target.closest(".tabs-filter__item") && u) {
      document.querySelector(".tabs-filter__item._active") ||
        u.forEach((e) => {
          e.classList.contains("_active") && e.classList.remove("_active");
        });
      const t = e.target.closest(".tabs-filter__item"),
        r = t.dataset.filter;
      if ("" !== r) {
        t.classList.toggle("_active");
        const e = document.querySelectorAll(r);
        e.length &&
          e.forEach((e) => {
            e.classList.toggle("_active");
          });
      }
      document.querySelector(".item-content._active") ||
        u.forEach((e) => {
          e.classList.add("_active");
        });
    }
    if (e.target.closest(".main-content-filter__link") && p.length) {
      const t = document.querySelector(".main-content-filter__link._active");
      t && t.classList.remove("_active"),
        e.target.closest(".main-content-filter__link").classList.add("_active");
    }
    e.target.closest(".spollers-content-page__clear") &&
      u.length &&
      g.length &&
      (g.forEach((e) => {
        e.classList.contains("_active") && e.classList.remove("_active");
      }),
      u.forEach((e) => {
        e.classList.contains("_active") || e.classList.add("_active");
      }));
  }),
    h.length &&
      h.forEach((e) => {
        e.addEventListener("input", (t) => {
          "" !== e.value && "" === e.placeholder
            ? e.previousSibling.previousSibling.classList.add("_active")
            : e.previousSibling.previousSibling.classList.remove("_active");
        });
      }),
    (window.FLS = !1),
    (function (e) {
      let t = new Image();
      (t.onload = t.onerror =
        function () {
          e(2 == t.height);
        }),
        (t.src =
          "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA");
    })(function (e) {
      let t = !0 === e ? "webp" : "no-webp";
      document.documentElement.classList.add(t);
    }),
    (function () {
      const e = document.querySelectorAll("[data-spollers]");
      if (e.length > 0) {
        const a = Array.from(e).filter(function (e, t, r) {
          return !e.dataset.spollers.split(",")[0];
        });
        a.length && i(a);
        let s = o(e, "spollers");
        function i(e, t = !1) {
          e.forEach((e) => {
            (e = t ? e.item : e),
              t.matches || !t
                ? (e.classList.add("_spoller-init"),
                  l(e),
                  e.addEventListener("click", n))
                : (e.classList.remove("_spoller-init"),
                  l(e, !1),
                  e.removeEventListener("click", n));
          });
        }
        function l(e, t = !0) {
          let r = e.querySelectorAll("[data-spoller]");
          r.length &&
            ((r = Array.from(r).filter(
              (t) => t.closest("[data-spollers]") === e
            )),
            r.forEach((e) => {
              t
                ? (e.removeAttribute("tabindex"),
                  e.classList.contains("_spoller-active") ||
                    (e.nextElementSibling.hidden = !0))
                : (e.setAttribute("tabindex", "-1"),
                  (e.nextElementSibling.hidden = !1));
            }));
        }
        function n(e) {
          const a = e.target;
          if (a.closest("[data-spoller]")) {
            const o = a.closest("[data-spoller]"),
              s = o.closest("[data-spollers]"),
              i = !!s.hasAttribute("data-one-spoller");
            s.querySelectorAll("._slide").length ||
              (i && !o.classList.contains("_spoller-active") && c(s),
              o.classList.toggle("_spoller-active"),
              ((e, a = 500) => {
                e.hidden ? r(e, a) : t(e, a);
              })(o.nextElementSibling, 500)),
              e.preventDefault();
          }
        }
        function c(e) {
          const r = e.querySelector("[data-spoller]._spoller-active");
          r &&
            (r.classList.remove("_spoller-active"),
            t(r.nextElementSibling, 500));
        }
        s &&
          s.length &&
          s.forEach((e) => {
            e.matchMedia.addEventListener("change", function () {
              i(e.itemsArray, e.matchMedia);
            }),
              i(e.itemsArray, e.matchMedia);
          });
      }
    })(),
    (function () {
      const e = document.querySelectorAll(
        "input[placeholder],textarea[placeholder]"
      );
      e.length &&
        e.forEach((e) => {
          e.dataset.placeholder = e.placeholder;
        }),
        document.body.addEventListener("focusin", function (e) {
          const t = e.target;
          ("INPUT" !== t.tagName && "TEXTAREA" !== t.tagName) ||
            (t.dataset.placeholder && (t.placeholder = ""),
            t.classList.add("_form-focus"),
            t.parentElement.classList.add("_form-focus"),
            s.removeError(t));
        }),
        document.body.addEventListener("focusout", function (e) {
          const t = e.target;
          ("INPUT" !== t.tagName && "TEXTAREA" !== t.tagName) ||
            (t.dataset.placeholder && (t.placeholder = t.dataset.placeholder),
            t.classList.remove("_form-focus"),
            t.parentElement.classList.remove("_form-focus"),
            t.hasAttribute("data-validate") && s.validateInput(t));
        });
    })();
})();
