/*! UIkit 3.0.0-beta.35 | http://www.getuikit.com | (c) 2014 - 2017 YOOtheme | MIT License */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define('uikittooltip', factory) :
	(global.UIkitTooltip = factory());
}(this, (function () { 'use strict';

function plugin(UIkit) {

    if (plugin.installed) {
        return;
    }

    var util = UIkit.util;
    var mixin = UIkit.mixin;
    var append = util.append;
    var attr = util.attr;
    var doc = util.doc;
    var fastdom = util.fastdom;
    var flipPosition = util.flipPosition;
    var includes = util.includes;
    var isTouch = util.isTouch;
    var isVisible = util.isVisible;
    var matches = util.matches;
    var on = util.on;
    var pointerDown = util.pointerDown;
    var pointerEnter = util.pointerEnter;
    var pointerLeave = util.pointerLeave;
    var remove = util.remove;
    var within = util.within;

    var actives = [];

    UIkit.component('tooltip', {

        attrs: true,

        mixins: [mixin.togglable, mixin.position],

        props: {
            delay: Number,
            title: String
        },

        defaults: {
            pos: 'top',
            title: '',
            delay: 0,
            animation: ['uk-animation-scale-up'],
            duration: 100,
            cls: 'uk-active',
            clsPos: 'uk-tooltip'
        },

        connected: function connected() {
            var this$1 = this;

            fastdom.write(function () { return attr(this$1.$el, {title: null, 'aria-expanded': false}); });
        },

        disconnected: function disconnected() {
            this.hide();
        },

        methods: {

            show: function show() {
                var this$1 = this;


                if (includes(actives, this)) {
                    return;
                }

                actives.forEach(function (active) { return active.hide(); });
                actives.push(this);

                this._unbind = on(doc, 'click', function (e) { return !within(e.target, this$1.$el) && this$1.hide(); });

                clearTimeout(this.showTimer);

                this.tooltip = append(UIkit.container, ("<div class=\"" + (this.clsPos) + "\" aria-hidden><div class=\"" + (this.clsPos) + "-inner\">" + (this.title) + "</div></div>"));

                attr(this.$el, 'aria-expanded', true);

                this.positionAt(this.tooltip, this.$el);

                this.origin = this.getAxis() === 'y' ? ((flipPosition(this.dir)) + "-" + (this.align)) : ((this.align) + "-" + (flipPosition(this.dir)));

                this.showTimer = setTimeout(function () {

                    this$1.toggleElement(this$1.tooltip, true);

                    this$1.hideTimer = setInterval(function () {

                        if (!isVisible(this$1.$el)) {
                            this$1.hide();
                        }

                    }, 150);

                }, this.delay);
            },

            hide: function hide() {

                var index = actives.indexOf(this);

                if (!~index || matches(this.$el, 'input') && this.$el === doc.activeElement) {
                    return;
                }

                actives.splice(index, 1);

                clearTimeout(this.showTimer);
                clearInterval(this.hideTimer);
                attr(this.$el, 'aria-expanded', false);
                this.toggleElement(this.tooltip, false);
                this.tooltip && remove(this.tooltip);
                this.tooltip = false;
                this._unbind();

            }

        },

        events: ( obj = {

            'blur': 'hide'

        }, obj[("focus " + pointerEnter + " " + pointerDown)] = function (e) {
                if (e.type !== pointerDown || !isTouch(e)) {
                    this.show();
                }
            }, obj[pointerLeave] = function (e) {
                if (!isTouch(e)) {
                    this.hide();
                }
            }, obj )

    });
    var obj;

}

if (!false && typeof window !== 'undefined' && window.UIkit) {
    window.UIkit.use(plugin);
}

return plugin;

})));
