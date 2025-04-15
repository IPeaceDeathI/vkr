import $ from "jquery";

// class Slider {
//     private slider: JQuery<HTMLElement>;
//     legend: JQuery<HTMLElement>;
//     component: JQuery<HTMLElement>;
//     input: JQuery<HTMLElement>;
//     startEdge: number;
//     isDouble: boolean;
//     endEdge: number;
//     range: number;
//     barWidth: number;
//     step: number;
//     steps: number;
//     value: JQuery<HTMLElement>;
//     endRunner: JQuery<HTMLElement>;
//     endRunnerTip: JQuery<HTMLElement>;
//     endRunnerValue: JQuery<HTMLElement>;
//     endRunnerWidth: number;
//     startRunner: JQuery<HTMLElement>;
//     startRunnerTip: JQuery<HTMLElement>;
//     startRunnerValue: JQuery<HTMLElement>;
//     startRunnerWidth: number;
//     constructor(slider: HTMLElement) {
//         this.slider = $(slider);
//         this.legend = this.slider.find(".range-legend");
//         this.component = this.slider.find(".range-outer");
//         this.input = this.slider.find("input");
//         this.startEdge = this.component.data("start");
//         this.isDouble = !!this.component.data("double");
//         this.endEdge = this.component.data("end");
//         this.range = this.endEdge - this.startEdge;
//         this.barWidth = this.component.width() ?? 1000;
//         this.step = this.component.data("step") || 1;
//         this.steps = Math.round(this.range / this.step);
//         this.value = $(".range-value", this.component);
//         this.endRunner = $(".range-runner-right", this.component);
//         this.endRunnerTip = $(".runner-tip", this.endRunner);
//         this.endRunnerValue = $(".value", this.endRunner);
//         this.endRunnerWidth = this.endRunner.width() ?? 10;
//         this.startRunner = $(".range-runner-left", this.component);
//         this.startRunnerValue = $(".value", this.startRunner);
//         this.startRunnerTip = $(".runner-tip", this.startRunner);
//         this.startRunnerWidth = this.startRunner.width() ?? 10;
//     }
// }
class Ot {
    constructor(t) {
        t = $(t);
        if (
            ((this.$legend = t.find(".range-legend")),
            (this.$component = t.find(".range-outer")),
            (this.$input = t.find("input")),
            (this.startEdge = this.$component.data("start")),
            (this.isDouble = !!this.$component.data("double")),
            (this.endEdge = this.$component.data("end")),
            (this.range = this.endEdge - this.startEdge),
            (this.barWidth = this.$component.width()),
            (this.step = this.$component.data("step") || 1),
            (this.steps = Math.round(this.range / this.step)),
            (this.legendType = this.$legend.data("type")),
            (this.legendText = 1 == +this.$legend.data("text")),
            (this.animated = !0),
            (this.duration = this.steps < 10 && (1 / this.steps) * 300),
            (this.fractExponent = Math.max(
                this.getFract(this.startEdge),
                this.getFract(this.endEdge),
                this.getFract(this.step)
            )),
            (this.fractDevider = 10 ** this.fractExponent),
            (this.$value = $(".range-value", this.$component)),
            (this.$endRunner = $(".range-runner-right", this.$component)),
            (this.$endRunnerTip = $(".runner-tip", this.$endRunner)),
            (this.$endRunnerValue = $(".value", this.$endRunner)),
            (this.endRunnerWidth = this.$endRunner.width()),
            (this.$startRunner = $(".range-runner-left", this.$component)),
            (this.$startRunnerValue = $(".value", this.$startRunner)),
            (this.$startRunnerTip = $(".runner-tip", this.$startRunner)),
            (this.startRunnerWidth = this.$startRunner.width()),
            (this.maxAllowedLeft = 20),
            (this.maxAllowedRight = document.documentElement.clientWidth - 20), //flexbe_cli
            (this.defaultShift = this.$endRunner.width() / 2),
            (this.activeRunner = !1),
            this.isDouble)
        ) {
            const t = this.$input.data("value").split(" — ");
            (this.startValue = +t[0]), (this.endValue = +t[1]);
        } else
            (this.endValue = +this.$input.data("value")),
                (this.startValue = +this.startEdge);
        (this.endParams = {}),
            this.drawLegend(),
            this.updateTooltip(this.$startRunnerTip),
            this.updateTooltip(this.$endRunnerTip),
            this.setEvents(),
            this.setRunnersValue();
    }
    formatN(t) {
        return t;
    }
    getFract(t) {
        const e = `${t}`.split(".");
        return (e[1] && e[1].length) || 0;
    }
    drawLegend() {
        if (this.legendText) return !1;
        const t = this.$legend.find(".from"),
            e = this.$legend.find(".to");
        if (
            (t.text(this.formatN(this.startEdge)),
            e.text(this.formatN(this.endEdge)),
            "complex" !== this.legendType)
        )
            return !1;
        this.$legend
            .find(".legend-point:not(.from, .to)")
            .off("click")
            .remove(),
            this.$legend.removeClass("complex").addClass("limits");
        const i = [
                `${this.formatN(this.startEdge)}`.length,
                `${this.formatN(this.endEdge)}`.length,
                `${this.formatN(this.step)}`.length,
            ],
            s = (i[0] + i[1] + i[2]) / 3,
            n = Math.max(this.startEdge, this.endEdge),
            o = [(5 * this.step * this.fractDevider) / this.fractDevider];
        for (let t = 1; t <= 12; t++) {
            const e = 10 ** t * this.step;
            e < n && p(o, e, this.fractDevider);
        }
        let a;
        const r = Math.ceil(
                this.$legend.find(i[0] > i[1] ? ".from" : ".to").width() /
                    Math.max(i[1], i[0])
            ),
            l = Math.round((0.83 * this.barWidth) / (r * s)),
            h = this.range > 0 ? 1 : -1;
        for (let t = Math.min(l, 10); t >= 3; t--) {
            const e = d(this.step, Math.abs(this.steps), t, o);
            if (
                e &&
                Number.isInteger(e / this.step) &&
                Number.isInteger(this.range / e)
            ) {
                a = e;
                break;
            }
        }
        if (
            !a ||
            !Number.isInteger(this.range / (a * h)) ||
            this.range / (a * h) < 3
        )
            for (
                let t = Math.min(Math.round(this.range / this.step), l, 10);
                t >= 2;
                t -= 1
            ) {
                const e = this.roundFraction(this.range / t);
                if (e % this.step == 0) {
                    a = e * h;
                    break;
                }
            }
        const c = this.roundFraction(this.range / (a * h));
        if (a && Number.isInteger(c)) {
            const t = [];
            for (let e = 1; e < c; e += 1) {
                const i =
                    Math.round(
                        (this.startEdge + a * e * h) * this.fractDevider
                    ) / this.fractDevider;
                t.push(
                    `<div class="legend-point" data-value="${i}">${this.formatN(
                        i
                    )}</div>`
                );
            }
            c > 2 &&
                (this.$legend.attr("data-count", c),
                this.$legend.removeClass("limits").addClass("complex"));
            const e = $(t.join(""));
            this.$legend.find(".from").after(e);
        } else this.$legend.removeClass("complex").addClass("limits");
        function d(t, e, i, s) {
            return s.includes((e / i) * t)
                ? (e / i) * t
                : s.includes(((e + 1) / i) * t)
                ? ((e + 1) / i) * t
                : s.includes(((e + 2) / i) * t)
                ? ((e + 2) / i) * t
                : s.includes(((e + 3) / i) * t)
                ? ((e + 3) / i) * t
                : s.includes(((e + 4) / i) * t)
                ? ((e + 4) / i) * t
                : s.includes(((e + 5) / i) * t)
                ? ((e + 5) / i) * t
                : s.includes(((e + 6) / i) * t)
                ? ((e + 6) / i) * t
                : s.includes(((e + 7) / i) * t)
                ? ((e + 7) / i) * t
                : s.includes(((e + 8) / i) * t)
                ? ((e + 8) / i) * t
                : !!s.includes(((e + 9) / i) * t) && ((e + 9) / i) * t;
        }
        function p(t, e, i) {
            for (let s = 1; s < 10; s += 1)
                t.push(Math.round(e * s * i) / i),
                    t.push(Math.round(e * s * i + e / 2) / i);
        }
        this.$legend
            .find(".legend-point:not(.to), .legend-point:not(.from)")
            .each((t, e) => {
                $(e).on("click", () => {
                    if ((this.updateBarWidth(), this.isDouble)) {
                        const t = (this.startValue + this.endValue) / 2,
                            i = +$(e).data("value"),
                            s = this.startEdge < this.endEdge ? 1 : -1;
                        i * s >= t * s
                            ? (this.endValue = i)
                            : (this.startValue = i);
                    } else this.endValue = $(e).data("value");
                    this.setRunnersValue();
                });
            });
    }
    roundFraction(t) {
        return Math.round(1e10 * t) / 1e10;
    }
    setRunnersValue(t = !1) {
        if (
            !Number.isFinite(this.endValue) ||
            !Number.isFinite(this.range) ||
            (this.isDouble && !Number.isFinite(this.startValue))
        )
            return !1;
        const e = this.startEdge < this.endEdge ? 1 : -1;
        "start" === this.activeRunner
            ? this.startValue * e <= this.startEdge * e
                ? (this.startValue = this.startEdge)
                : this.startValue * e >= this.endValue * e &&
                  (this.startValue = this.endValue)
            : this.endValue * e >= this.endEdge * e
            ? (this.endValue = this.endEdge)
            : this.endValue * e <= this.startValue * e &&
              (this.endValue = this.startValue);
        const i = this.isDouble ? this.startValue : this.startEdge,
            s = this.isDouble
                ? (this.startValue - this.startEdge) / (this.range / 100)
                : 0,
            n = (this.endValue - i) / (this.range / 100);
        (this.endValue =
            Math.round(this.endValue * this.fractDevider) / this.fractDevider),
            (this.startValue =
                Math.round(this.startValue * this.fractDevider) /
                this.fractDevider),
            requestAnimationFrame(() => {
                this.$endRunnerValue.text(this.formatN(this.endValue)),
                    this.$startRunnerValue.text(this.formatN(this.startValue));
            }),
            "end" === this.activeRunner
                ? this.updateTooltip(this.$endRunnerTip)
                : this.updateTooltip(this.$startRunnerTip),
            this.$value.css({
                width: `${n}%`,
                marginLeft: `${s}%`,
            }),
            t ||
                (this.isDouble
                    ? this.$input.val(`${this.startValue} — ${this.endValue}`)
                    : this.$input.val(this.endValue));
    }
    updateTooltip(t) {
        const e = t.closest(".range-runner");
        if (e && e.length) {
            const e = t.innerWidth(),
                i =
                    t.closest(".range-runner")[0].getBoundingClientRect().left +
                    this.startRunnerWidth / 2;
            let s;
            (s =
                e / 2 > i + this.maxAllowedLeft
                    ? e / 2 - (i - this.maxAllowedLeft)
                    : e / 2 + i > this.maxAllowedRight
                    ? this.maxAllowedRight - i - e / 2
                    : 0),
                t.css({
                    transform: `translateX(${s}px)`,
                });
        }
    }
    getValueFromLength(t) {
        const e = this.range / (this.barWidth / t);
        return (
            (Math.round(e / this.step) + this.startEdge / this.step) * this.step
        );
    }
    applyEndPosition(t) {
        return (
            (this["start" === this.activeRunner ? "startValue" : "endValue"] =
                this.getValueFromLength(t)),
            this.setRunnersValue(),
            !0
        );
    }
    touchHendler(t) {
        if (!this.endParams.active || 1 !== t.touches.length)
            return (
                $("body")[0].removeEventListener(
                    "touchmove",
                    this.touchHendler
                ),
                !1
            );
        this.toggleAnimation(!1), t.preventDefault(), t.stopPropagation();
        const e =
            t.touches[0].pageX - this.endParams.left - this.endParams.shift;
        this.applyEndPosition(e);
    }
    startWatchingEvents(t = this.defaultShift) {
        (this.endParams = {
            active: !0,
            left: this.$component.offset().left,
            shift: t,
        }),
            clearTimeout(this.calmRunnersTimeout),
            "end" === this.activeRunner
                ? this.$endRunner.addClass("active")
                : this.$startRunner.addClass("active");
    }
    toggleAnimation(t) {
        t
            ? Math.abs(this.barWidth / this.steps) < 15
                ? this.$component.addClass("animated")
                : (this.$component.removeClass("active-animation"),
                  this.duration &&
                      this.$component.removeClass(
                          "animation-speed-" +
                              (12 - Math.abs(Math.round(this.steps)))
                      ))
            : Math.abs(this.barWidth / this.steps) < 15
            ? this.$component.removeClass("animated")
            : (this.$component.addClass("active-animation"),
              this.duration &&
                  this.$component.addClass(
                      "animation-speed-" +
                          (12 - Math.abs(Math.round(this.steps)))
                  ));
    }
    afterRunnerReleased() {
        this.endParams.active &&
            ("start" === this.activeRunner
                ? this.$startRunner.focus()
                : this.$endRunner.focus()),
            (this.endParams.active = !1),
            this.debounceActive(),
            this.barWidth / this.steps < 15
                ? this.$component.addClass("animated")
                : this.$component.removeClass("active-animation"),
            this.toggleAnimation(!0);
    }
    updateBarWidth() {
        const t = this.$component.width();
        t !== this.barWidth &&
            ((this.barWidth = t),
            "complex" === this.legendType && this.drawLegend());
    }
    setEvents() {
        const t = $(window);

        const i = (i) => {
            if (!this.endParams.active) return t.off("mousemove.dragRange"), !1;
            this.toggleAnimation(!1);
            const s = i.pageX - this.endParams.left - this.endParams.shift;
            return this.applyEndPosition(s), !0;
        };
        this.$component.on("resize", () => {
            this.updateBarWidth();
        }),
            this.$component.on("touchstart", (e) => {
                if (1 !== e.touches.length) return !1;
                if (this.isDouble) {
                    const t =
                        (this.$endRunner.offset().left +
                            this.$startRunner.offset().left) /
                        2;
                    (this.activeRunner =
                        e.touches[0].pageX >= t ? "end" : "start"),
                        "start" === this.activeRunner
                            ? (this.$startRunner.addClass("upper-runner"),
                              this.$endRunner.removeClass("upper-runner"))
                            : (this.$endRunner.addClass("upper-runner"),
                              this.$startRunner.removeClass("upper-runner"));
                } else this.activeRunner = "end";
                e.stopPropagation(), this.updateBarWidth();
                const i = e.touches[0].pageX - this.$value.offset().left;
                this.startWatchingEvents(),
                    this.applyEndPosition(i - this.defaultShift),
                    t[0].addEventListener(
                        "touchmove",
                        this.touchHendler.bind(this),
                        {
                            passive: !1,
                        }
                    ),
                    t.on("touchend.range", () => {
                        this.afterRunnerReleased(),
                            t[0].removeEventListener(
                                "touchmove",
                                this.touchHendler
                            ),
                            t.off("touchend.range");
                    });
            }),
            this.$component.on("mousedown", (e) => {
                const s = e.pageX - this.$component.offset().left;
                if (this.isDouble) {
                    const t =
                        (this.$endRunner.offset().left +
                            this.$startRunner.offset().left) /
                        2;
                    (this.activeRunner = e.pageX >= t ? "end" : "start"),
                        "start" === this.activeRunner
                            ? (this.$startRunner.addClass("upper-runner"),
                              this.$endRunner.removeClass("upper-runner"))
                            : (this.$endRunner.addClass("upper-runner"),
                              this.$startRunner.removeClass("upper-runner"));
                }
                this.updateBarWidth(),
                    this.startWatchingEvents(),
                    this.applyEndPosition(s - this.defaultShift),
                    "start" === this.activeRunner
                        ? this.$startRunner.focus()
                        : this.$endRunner.focus(),
                    t.on("mousemove.dragRange", i),
                    t.on("mouseup.range", () => {
                        this.afterRunnerReleased(),
                            t.off("mousemove.dragRange"),
                            t.off("mouseup.range");
                    });
            }),
            this.$endRunner.on("touchstart", (e) => {
                if (1 !== e.touches.length) return !1;
                e.stopPropagation(),
                    this.updateBarWidth(),
                    (this.activeRunner = "end"),
                    this.$startRunner.removeClass("upper-runner"),
                    this.$endRunner.addClass("upper-runner"),
                    e.stopPropagation(),
                    this.startWatchingEvents(
                        e.touches[0].pageX - this.$endRunner.offset().left
                    ),
                    this.toggleAnimation(!1),
                    t[0].addEventListener(
                        "touchmove",
                        this.touchHendler.bind(this),
                        {
                            passive: !1,
                        }
                    ),
                    t.on("touchend.range", () => {
                        this.afterRunnerReleased(),
                            t[0].removeEventListener(
                                "touchmove",
                                this.touchHendler
                            ),
                            t.off("touchend.range");
                    });
            }),
            this.$startRunner.on("touchstart", (e) => {
                if (1 !== e.touches.length) return !1;
                e.stopPropagation(),
                    this.updateBarWidth(),
                    (this.activeRunner = "start"),
                    this.$startRunner.addClass("upper-runner"),
                    this.$endRunner.removeClass("upper-runner"),
                    e.stopPropagation(),
                    this.startWatchingEvents(
                        e.touches[0].pageX - this.$startRunner.offset().left
                    ),
                    this.toggleAnimation(!1),
                    t[0].addEventListener(
                        "touchmove",
                        this.touchHendler.bind(this),
                        {
                            passive: !1,
                        }
                    ),
                    t.on("touchend.range", () => {
                        this.afterRunnerReleased(),
                            t[0].removeEventListener(
                                "touchmove",
                                this.touchHendler
                            ),
                            t.off("touchend.range");
                    });
            }),
            this.$endRunner.on("mousedown", (e) => {
                e.stopPropagation(),
                    (this.activeRunner = "end"),
                    this.$startRunner.removeClass("upper-runner"),
                    this.$endRunner.addClass("upper-runner"),
                    this.updateBarWidth(),
                    this.$endRunner.focus(),
                    this.startWatchingEvents(
                        e.pageX - this.$endRunner.offset().left
                    ),
                    this.toggleAnimation(!1),
                    t.on("mousemove.dragRange", i),
                    t.on("mouseup.range", () => {
                        this.afterRunnerReleased(),
                            t.off("mousemove.dragRange"),
                            t.off("mouseup.range");
                    });
            }),
            this.$startRunner.on("mousedown", (e) => {
                e.stopPropagation(),
                    (this.activeRunner = "start"),
                    this.$startRunner.addClass("upper-runner"),
                    this.$endRunner.removeClass("upper-runner"),
                    this.updateBarWidth(),
                    this.$startRunner.focus(),
                    this.startWatchingEvents(
                        e.pageX - this.$startRunner.offset().left
                    ),
                    this.toggleAnimation(!1),
                    t.on("mousemove.dragRange", i),
                    t.on("mouseup.range", () => {
                        this.afterRunnerReleased(),
                            t.off("mousemove.dragRange"),
                            t.off("mouseup.range");
                    });
            }),
            this.$legend
                .find(".legend-point.to, .legend-point.from")
                .each((t, e) => {
                    $(e).on("click", () => {
                        if ((this.updateBarWidth(), this.isDouble)) {
                            const t = this.startEdge < this.endEdge ? 1 : -1,
                                i = (this.startValue + this.endValue) / 2,
                                s = +$(e).data("value");
                            s * t >= i * t
                                ? (this.endValue = s)
                                : (this.startValue = s);
                        } else this.endValue = $(e).data("value");
                        this.setRunnersValue();
                    });
                }),
            this.$input.on("change", () => {
                if (this.isDouble) {
                    const t = this.$input.val().split(" — ");
                    (this.startValue = +t[0]), (this.endValue = +t[1]);
                } else this.endValue = +this.$input.val();
                this.setRunnersValue(!0);
            }),
            this.$startRunner.on("keyup", (t) => {
                t.preventDefault(),
                    (this.activeRunner = "start"),
                    this.handleKeydown(t, this.$startRunner);
            }),
            this.$endRunner.on("keyup", (t) => {
                t.preventDefault(),
                    (this.activeRunner = "end"),
                    this.handleKeydown(t, this.$endRunner);
            }),
            this.$startRunner.on("keydown", (t) => {
                (this.activeRunner = "start"),
                    this.handleKeyup(t, this.$startRunner);
            }),
            this.$endRunner.on("keydown", (t) => {
                (this.activeRunner = "end"),
                    this.handleKeyup(t, this.$endRunner);
            }),
            this.$startRunner.on("blur", () => {
                this.handleBlur();
            });
    }
    handleBlur() {
        this.movingInterval &&
            (clearInterval(this.movingInterval), (this.movingInterval = !1)),
            this.movingDebounceTimeout &&
                (clearTimeout(this.movingDebounceTimeout),
                (this.movingDebounceTimeout = !1));
    }
    handleKeydown(t, e) {
        if (
            (this.movingInterval &&
                (clearInterval(this.movingInterval),
                (this.movingInterval = !1)),
            this.movingDebounceTimeout &&
                (clearTimeout(this.movingDebounceTimeout),
                (this.movingDebounceTimeout = !1)),
            [37, 38, 39, 40].includes(t.keyCode))
        ) {
            const i = t.shiftKey ? 10 : 1,
                s = "start" === this.activeRunner ? "startValue" : "endValue";
            38 === t.keyCode || 39 === t.keyCode
                ? (this[s] = (this[s] / this.step + i) * this.step)
                : (37 !== t.keyCode && 40 !== t.keyCode) ||
                  (this[s] = (this[s] / this.step - i) * this.step),
                e.addClass("active"),
                this.debounceActive(),
                this.setRunnersValue();
        }
    }
    handleKeyup(t, e) {
        9 !== t.keyCode &&
            [37, 38, 39, 40].includes(t.keyCode) &&
            (t.preventDefault(),
            e.addClass("active"),
            this.debounceActive(),
            this.startDebouncedMove(t));
    }
    startDebouncedMove(t) {
        this.movingDebounceTimeout &&
            (clearTimeout(this.movingDebounceTimeout),
            (this.movingDebounceTimeout = !1)),
            (this.movingDebounceTimeout = setTimeout(() => {
                this.movingInterval = setInterval(() => {
                    this.debounceActive();
                    const e = t.shiftKey ? 10 : 1,
                        i =
                            "start" === this.activeRunner
                                ? "startValue"
                                : "endValue";
                    38 === t.keyCode || 39 === t.keyCode
                        ? (this[i] =
                              (Math.round(this[i] / this.step) + e) * this.step)
                        : (37 !== t.keyCode && 40 !== t.keyCode) ||
                          (this[i] =
                              (Math.round(this[i] / this.step) - e) *
                              this.step),
                        this.setRunnersValue();
                }, 50);
            }, 300));
    }
    debounceActive() {
        this.calmRunnersTimeout && clearTimeout(this.calmRunnersTimeout),
            (this.calmRunnersTimeout = setTimeout(() => {
                this.$endRunner.removeClass("active"),
                    this.$startRunner.removeClass("active");
            }, 500));
    }
}
$(document)
    .find(".form-field-range")
    .each((index, el) => {
        new Ot(el);
    });
