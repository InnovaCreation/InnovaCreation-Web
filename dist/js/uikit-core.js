/*! UIkit 3.0.0-beta.35 | http://www.getuikit.com | (c) 2014 - 2017 YOOtheme | MIT License */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define('uikit', factory) :
	(global.UIkit = factory());
}(this, (function () { 'use strict';

function bind(fn, context) {
    return function (a) {
        var l = arguments.length;
        return l ? l > 1 ? fn.apply(context, arguments) : fn.call(context, a) : fn.call(context);
    };
}

var ref = Object.prototype;
var hasOwnProperty = ref.hasOwnProperty;

function hasOwn(obj, key) {
    return hasOwnProperty.call(obj, key);
}

var hyphenateRe = /([a-z\d])([A-Z])/g;

function hyphenate(str) {
    return str
        .replace(hyphenateRe, '$1-$2')
        .toLowerCase();
}

var camelizeRE = /-(\w)/g;

function camelize(str) {
    return str.replace(camelizeRE, toUpper);
}

function toUpper(_, c) {
    return c ? c.toUpperCase() : '';
}

function ucfirst(str) {
    return str.length ? toUpper(null, str.charAt(0)) + str.slice(1) : '';
}

var strPrototype = String.prototype;
var startsWithFn = strPrototype.startsWith || function (search) { return this.lastIndexOf(search, 0) === 0; };

function startsWith(str, search) {
    return startsWithFn.call(str, search);
}

var endsWithFn = strPrototype.endsWith || function (search) { return this.substr(-search.length) === search; };

function endsWith(str, search) {
    return endsWithFn.call(str, search);
}

var includesFn = function (search) { return ~this.indexOf(search); };
var includesStr = strPrototype.includes || includesFn;
var includesArray = Array.prototype.includes || includesFn;

function includes(obj, search) {
    return obj && (isString(obj) ? includesStr : includesArray).call(obj, search);
}

var isArray = Array.isArray;

function isFunction(obj) {
    return typeof obj === 'function';
}

function isObject(obj) {
    return obj !== null && typeof obj === 'object';
}

function isPlainObject(obj) {
    return isObject(obj) && Object.getPrototypeOf(obj) === Object.prototype;
}

function isWindow(obj) {
    return isObject(obj) && obj === obj.window;
}

function isDocument(obj) {
    return isObject(obj) && obj.nodeType === 9;
}

function isJQuery(obj) {
    return isObject(obj) && !!obj.jquery;
}

function isNode(element) {
    return element instanceof Node || isObject(element) && element.nodeType === 1;
}

function isNodeCollection(element) {
    return element instanceof NodeList || element instanceof HTMLCollection;
}

function isBoolean(value) {
    return typeof value === 'boolean';
}

function isString(value) {
    return typeof value === 'string';
}

function isNumber(value) {
    return typeof value === 'number';
}

function isNumeric(value) {
    return isNumber(value) || isString(value) && !isNaN(value - parseFloat(value));
}

function isUndefined(value) {
    return value === void 0;
}

function toBoolean(value) {
    return isBoolean(value)
        ? value
        : value === 'true' || value === '1' || value === ''
            ? true
            : value === 'false' || value === '0'
                ? false
                : value;
}

function toNumber(value) {
    var number = Number(value);
    return !isNaN(number) ? number : false;
}

function toFloat(value) {
    return parseFloat(value) || 0;
}

function toNode(element) {
    return isNode(element) || isWindow(element) || isDocument(element)
        ? element
        : isNodeCollection(element) || isJQuery(element)
            ? element[0]
            : isArray(element)
                ? toNode(element[0])
                : null;
}

var arrayProto = Array.prototype;
function toNodes(element) {
    return isNode(element)
        ? [element]
        : isNodeCollection(element)
            ? arrayProto.slice.call(element)
            : isArray(element)
                ? element.map(toNode).filter(Boolean)
                : isJQuery(element)
                    ? element.toArray()
                    : [];
}

function toList(value) {
    return isArray(value)
        ? value
        : isString(value)
            ? value.split(/,(?![^(]*\))/).map(function (value) { return isNumeric(value)
                ? toNumber(value)
                : toBoolean(value.trim()); })
            : [value];
}

function toMs(time) {
    return !time
        ? 0
        : endsWith(time, 'ms')
            ? toFloat(time)
            : toFloat(time) * 1000;
}

function swap(value, a, b) {
    return value.replace(new RegExp((a + "|" + b), 'mg'), function (match) {
        return match === a ? b : a;
    });
}

var assign = Object.assign || function (target) {
    var args = [], len = arguments.length - 1;
    while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

    target = Object(target);
    for (var i = 0; i < args.length; i++) {
        var source = args[i];
        if (source !== null) {
            for (var key in source) {
                if (hasOwn(source, key)) {
                    target[key] = source[key];
                }
            }
        }
    }
    return target;
};

function each(obj, cb) {
    for (var key in obj) {
        if (cb.call(obj[key], obj[key], key) === false) {
            break;
        }
    }
}

function sortBy(collection, prop) {
    return collection.sort(function (a, b) { return a[prop] > b[prop]
            ? 1
            : b[prop] > a[prop]
                ? -1
                : 0; }
    );
}

function clamp(number, min, max) {
    if ( min === void 0 ) min = 0;
    if ( max === void 0 ) max = 1;

    return Math.min(Math.max(number, min), max);
}

function noop() {}

function intersectRect(r1, r2) {
    return r1.left <= r2.right &&
        r2.left <= r1.right &&
        r1.top <= r2.bottom &&
        r2.top <= r1.bottom;
}

function pointInRect(point, rect) {
    return intersectRect({top: point.y, bottom: point.y, left: point.x, right: point.x}, rect);
}

var Dimensions = {

    ratio: function ratio(dimensions, prop, value) {

        var aProp = prop === 'width' ? 'height' : 'width';

        return ( obj = {}, obj[aProp] = Math.round(value * dimensions[aProp] / dimensions[prop]), obj[prop] = value, obj );
        var obj;
    },

    contain: function contain(dimensions, maxDimensions) {
        var this$1 = this;

        dimensions = assign({}, dimensions);

        each(dimensions, function (_, prop) { return dimensions = dimensions[prop] > maxDimensions[prop]
            ? this$1.ratio(dimensions, prop, maxDimensions[prop])
            : dimensions; }
        );

        return dimensions;
    },

    cover: function cover(dimensions, maxDimensions) {
        var this$1 = this;

        dimensions = this.contain(dimensions, maxDimensions);

        each(dimensions, function (_, prop) { return dimensions = dimensions[prop] < maxDimensions[prop]
            ? this$1.ratio(dimensions, prop, maxDimensions[prop])
            : dimensions; }
        );

        return dimensions;
    }

};

function attr(element, name, value) {

    if (isObject(name)) {
        for (var key in name) {
            attr(element, key, name[key]);
        }
        return;
    }

    if (isUndefined(value)) {
        element = toNode(element);
        return element && element.getAttribute(name);
    } else {
        toNodes(element).forEach(function (element) {

            if (isFunction(value)) {
                value = value.call(element, attr(element, name));
            }

            if (value === null) {
                removeAttr(element, name);
            } else {
                element.setAttribute(name, value);
            }
        });
    }

}

function hasAttr(element, name) {
    return toNodes(element).some(function (element) { return element.hasAttribute(name); });
}

function removeAttr(element, name) {
    element = toNodes(element);
    name.split(' ').forEach(function (name) { return element.forEach(function (element) { return element.removeAttribute(name); }
        ); }
    );
}

function filterAttr(element, attribute, pattern, replacement) {
    attr(element, attribute, function (value) { return value ? value.replace(pattern, replacement) : value; });
}

function data(element, attribute) {
    for (var i = 0, attrs = [attribute, ("data-" + attribute)]; i < attrs.length; i++) {
        if (hasAttr(element, attrs[i])) {
            return attr(element, attrs[i]);
        }
    }
}

/* global setImmediate */
var Promise = 'Promise' in window ? window.Promise : PromiseFn;

var Deferred = function Deferred() {
    var this$1 = this;

    this.promise = new Promise(function (resolve, reject) {
        this$1.reject = reject;
        this$1.resolve = resolve;
    });
};

/**
 * Promises/A+ polyfill v1.1.4 (https://github.com/bramstein/promis)
 */

var RESOLVED = 0;
var REJECTED = 1;
var PENDING = 2;

var async = 'setImmediate' in window ? setImmediate : setTimeout;

function PromiseFn(executor) {

    this.state = PENDING;
    this.value = undefined;
    this.deferred = [];

    var promise = this;

    try {
        executor(function (x) {
            promise.resolve(x);
        }, function (r) {
            promise.reject(r);
        });
    } catch (e) {
        promise.reject(e);
    }
}

PromiseFn.reject = function (r) {
    return new PromiseFn(function (resolve, reject) {
        reject(r);
    });
};

PromiseFn.resolve = function (x) {
    return new PromiseFn(function (resolve, reject) {
        resolve(x);
    });
};

PromiseFn.all = function all(iterable) {
    return new PromiseFn(function (resolve, reject) {
        var result = [];
        var count = 0;

        if (iterable.length === 0) {
            resolve(result);
        }

        function resolver(i) {
            return function (x) {
                result[i] = x;
                count += 1;

                if (count === iterable.length) {
                    resolve(result);
                }
            };
        }

        for (var i = 0; i < iterable.length; i += 1) {
            PromiseFn.resolve(iterable[i]).then(resolver(i), reject);
        }
    });
};

PromiseFn.race = function race(iterable) {
    return new PromiseFn(function (resolve, reject) {
        for (var i = 0; i < iterable.length; i += 1) {
            PromiseFn.resolve(iterable[i]).then(resolve, reject);
        }
    });
};

var p = PromiseFn.prototype;

p.resolve = function resolve(x) {
    var promise = this;

    if (promise.state === PENDING) {
        if (x === promise) {
            throw new TypeError('Promise settled with itself.');
        }

        var called = false;

        try {
            var then = x && x.then;

            if (x !== null && isObject(x) && isFunction(then)) {
                then.call(x, function (x) {
                    if (!called) {
                        promise.resolve(x);
                    }
                    called = true;

                }, function (r) {
                    if (!called) {
                        promise.reject(r);
                    }
                    called = true;
                });
                return;
            }
        } catch (e) {
            if (!called) {
                promise.reject(e);
            }
            return;
        }

        promise.state = RESOLVED;
        promise.value = x;
        promise.notify();
    }
};

p.reject = function reject(reason) {
    var promise = this;

    if (promise.state === PENDING) {
        if (reason === promise) {
            throw new TypeError('Promise settled with itself.');
        }

        promise.state = REJECTED;
        promise.value = reason;
        promise.notify();
    }
};

p.notify = function notify() {
    var this$1 = this;

    async(function () {
        if (this$1.state !== PENDING) {
            while (this$1.deferred.length) {
                var ref = this$1.deferred.shift();
                var onResolved = ref[0];
                var onRejected = ref[1];
                var resolve = ref[2];
                var reject = ref[3];

                try {
                    if (this$1.state === RESOLVED) {
                        if (isFunction(onResolved)) {
                            resolve(onResolved.call(undefined, this$1.value));
                        } else {
                            resolve(this$1.value);
                        }
                    } else if (this$1.state === REJECTED) {
                        if (isFunction(onRejected)) {
                            resolve(onRejected.call(undefined, this$1.value));
                        } else {
                            reject(this$1.value);
                        }
                    }
                } catch (e) {
                    reject(e);
                }
            }
        }
    });
};

p.then = function then(onResolved, onRejected) {
    var this$1 = this;

    return new PromiseFn(function (resolve, reject) {
        this$1.deferred.push([onResolved, onRejected, resolve, reject]);
        this$1.notify();
    });
};

p.catch = function (onRejected) {
    return this.then(undefined, onRejected);
};

/* global DocumentTouch */
var win = window;
var doc = document;
var docEl = doc.documentElement;

var isRtl = attr(docEl, 'dir') === 'rtl';

var Observer = win.MutationObserver;

var hasTouchEvents = 'ontouchstart' in win;
var hasPointerEvents = win.PointerEvent;
var hasTouch = hasTouchEvents
    || win.DocumentTouch && doc instanceof DocumentTouch
    || navigator.maxTouchPoints; // IE >=11

var pointerDown = !hasTouch ? 'mousedown' : ("mousedown " + (hasTouchEvents ? 'touchstart' : 'pointerdown'));
var pointerMove = !hasTouch ? 'mousemove' : ("mousemove " + (hasTouchEvents ? 'touchmove' : 'pointermove'));
var pointerUp = !hasTouch ? 'mouseup' : ("mouseup " + (hasTouchEvents ? 'touchend' : 'pointerup'));
var pointerEnter = hasTouch && hasPointerEvents ? 'pointerenter' : 'mouseenter';
var pointerLeave = hasTouch && hasPointerEvents ? 'pointerleave' : 'mouseleave';

function getImage(src) {

    return new Promise(function (resolve, reject) {
        var img = new Image();

        img.onerror = reject;
        img.onload = function () { return resolve(img); };

        img.src = src;
    });

}

var supports = {};

// IE 11
(function () {

    var list = doc.createElement('_').classList;
    if (list) {
        list.add('a', 'b');
        list.toggle('c', false);
        supports.Multiple = list.contains('b');
        supports.Force = !list.contains('c');
        supports.ClassList = true;
    }
    list = null;

})();

function query(selector, context) {
    return toNode(selector) || find(selector, isContextSelector(selector) ? context : doc);
}

function queryAll(selector, context) {
    var nodes = toNodes(selector);
    return nodes.length && nodes || findAll(selector, isContextSelector(selector) ? context : doc);
}

function find(selector, context) {
    return toNode(_query(selector, context, 'querySelector'));
}

function findAll(selector, context) {
    return toNodes(_query(selector, context, 'querySelectorAll'));
}

function _query(selector, context, queryFn) {
    if ( context === void 0 ) context = doc;


    if (!selector || !isString(selector)) {
        return null;
    }

    selector = selector.replace(contextSanitizeRe, '$1 *');

    var removes;

    if (isContextSelector(selector)) {

        removes = [];

        selector = selector.split(',').map(function (selector, i) {

            var ctx = context;

            selector = selector.trim();

            if (selector[0] === '!') {

                var selectors = selector.substr(1).trim().split(' ');
                ctx = closest(context.parentNode, selectors[0]);
                selector = selectors.slice(1).join(' ');

            }

            if (!ctx) {
                return null;
            }

            if (!ctx.id) {
                ctx.id = "uk-" + (Date.now()) + i;
                removes.push(function () { return removeAttr(ctx, 'id'); });
            }

            return ("#" + (escape(ctx.id)) + " " + selector);

        }).filter(Boolean).join(',');

        context = doc;

    }

    try {

        return context[queryFn](selector);

    } catch (e) {

        return null;

    } finally {

        removes && removes.forEach(function (remove) { return remove(); });

    }

}

var contextSelectorRe = /(^|,)\s*[!>+~]/;
var contextSanitizeRe = /([!>+~])(?=\s+[!>+~]|\s*$)/g;

function isContextSelector(selector) {
    return isString(selector) && selector.match(contextSelectorRe);
}

var elProto = Element.prototype;
var matchesFn = elProto.matches || elProto.webkitMatchesSelector || elProto.msMatchesSelector;

function matches(element, selector) {
    return toNodes(element).some(function (element) { return matchesFn.call(element, selector); });
}

var closestFn = elProto.closest || function (selector) {
    var ancestor = this;

    do {

        if (matches(ancestor, selector)) {
            return ancestor;
        }

        ancestor = ancestor.parentNode;

    } while (ancestor && ancestor.nodeType === 1);
};

function closest(element, selector) {

    if (startsWith(selector, '>')) {
        selector = selector.slice(1);
    }

    return isNode(element)
        ? element.parentNode && closestFn.call(element, selector)
        : toNodes(element).map(function (element) { return element.parentNode && closestFn.call(element, selector); }).filter(Boolean);
}

function parents(element, selector) {
    var elements = [];
    var parent = toNode(element).parentNode;

    while (parent && parent.nodeType === 1) {

        if (matches(parent, selector)) {
            elements.push(parent);
        }

        parent = parent.parentNode;
    }

    return elements;
}

var escapeFn = win.CSS && CSS.escape || function (css) { return css.replace(/([^\x7f-\uFFFF\w-])/g, function (match) { return ("\\" + match); }); };
function escape(css) {
    return isString(css) ? escapeFn.call(null, css) : '';
}

var voidElements = {
    area: true,
    base: true,
    br: true,
    col: true,
    embed: true,
    hr: true,
    img: true,
    input: true,
    keygen: true,
    link: true,
    menuitem: true,
    meta: true,
    param: true,
    source: true,
    track: true,
    wbr: true
};
function isVoidElement(element) {
    return toNodes(element).some(function (element) { return voidElements[element.tagName.toLowerCase()]; });
}

function isVisible(element) {
    return toNodes(element).some(function (element) { return element.offsetHeight || element.getBoundingClientRect().height; });
}

var selInput = 'input,select,textarea,button';
function isInput(element) {
    return toNodes(element).some(function (element) { return matches(element, selInput); });
}

function filter(element, selector) {
    return toNodes(element).filter(function (element) { return matches(element, selector); });
}

function within(element, selector) {
    return !isString(selector)
        ? element === selector || toNode(selector).contains(toNode(element))
        : matches(element, selector) || closest(element, selector);
}

function on() {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];


    var ref = getArgs(args);
    var target = ref[0];
    var type = ref[1];
    var selector = ref[2];
    var listener = ref[3];
    var useCapture = ref[4];

    target = toEventTarget(target);

    if (selector) {
        listener = delegate(target, selector, listener);
    }

    if (listener.length > 1) {
        listener = detail(listener);
    }

    type.split(' ').forEach(function (type) { return target && target.addEventListener(type, listener, useCapture); });
    return function () { return off(target, type, listener, useCapture); };
}

function off(target, type, listener, useCapture) {
    if ( useCapture === void 0 ) useCapture = false;

    target = toEventTarget(target);
    target && type.split(' ').forEach(function (type) { return target.removeEventListener(type, listener, useCapture); });
}

function once() {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];


    var ref = getArgs(args);
    var element = ref[0];
    var type = ref[1];
    var selector = ref[2];
    var listener = ref[3];
    var useCapture = ref[4];
    var condition = ref[5];
    var off = on(element, type, selector, function (e) {
        var result = !condition || condition(e);
        if (result) {
            off();
            listener(e, result);
        }
    }, useCapture);

    return off;
}

function trigger(target, event, detail) {
    return toEventTargets(target).reduce(function (notCanceled, target) { return notCanceled && target.dispatchEvent(createEvent(event, true, true, detail)); }
        , true);
}

function createEvent(e, bubbles, cancelable, detail) {
    if ( bubbles === void 0 ) bubbles = true;
    if ( cancelable === void 0 ) cancelable = false;

    if (isString(e)) {
        var event = document.createEvent('CustomEvent'); // IE 11
        event.initCustomEvent(e, bubbles, cancelable, detail);
        e = event;
    }

    return e;
}

function getArgs(args) {

    if (isString(args[0])) {
        args[0] = find(args[0]);
    }

    if (isFunction(args[2])) {
        args.splice(2, 0, false);
    }
    return args;
}

function delegate(element, selector, listener) {
    var this$1 = this;

    return function (e) {

        var target = e.target;
        var current = selector[0] === '>'
            ? findAll(selector, element).reverse().filter(function (element) { return within(target, element); })[0]
            : closest(target, selector);

        if (current) {
            e.delegate = element;
            e.current = current;

            listener.call(this$1, e);
        }
    };
}

function detail(listener) {
    return function (e) { return isArray(e.detail) ? listener.apply(listener, [e].concat(e.detail)) : listener(e); };
}

function isEventTarget(target) {
    return 'EventTarget' in window
        ? target instanceof EventTarget
        : target && 'addEventListener' in target;
}

function toEventTarget(target) {
    return isEventTarget(target) ? target : toNode(target);
}

function toEventTargets(target) {
    return isEventTarget(target)
        ? [target]
        : isArray(target)
            ? target.map(toEventTarget).filter(Boolean)
            : toNodes(target);
}

function preventClick() {

    var timer = setTimeout(once(document, 'click', function (e) {

        e.preventDefault();
        e.stopImmediatePropagation();

        clearTimeout(timer);

    }, true));

}

function ajax(url, options) {
    return new Promise(function (resolve, reject) {

        var env = assign({
            data: null,
            method: 'GET',
            headers: {},
            xhr: new XMLHttpRequest(),
            beforeSend: noop,
            responseType: ''
        }, options);

        env.beforeSend(env);

        var xhr = env.xhr;

        for (var prop in env) {
            if (prop in xhr) {
                try {

                    xhr[prop] = env[prop];

                } catch (e) {}
            }
        }

        xhr.open(env.method.toUpperCase(), url);

        for (var header in env.headers) {
            xhr.setRequestHeader(header, env.headers[header]);
        }

        on(xhr, 'load', function () {

            if (xhr.status === 0 || xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
                resolve(xhr);
            } else {
                reject(assign(Error(xhr.statusText), {
                    xhr: xhr,
                    status: xhr.status
                }));
            }

        });

        on(xhr, 'error', function () { return reject(assign(Error('Network Error'), {xhr: xhr})); });
        on(xhr, 'timeout', function () { return reject(assign(Error('Network Timeout'), {xhr: xhr})); });

        xhr.send(env.data);
    });
}

function isReady() {
    return doc.readyState === 'complete' || doc.readyState !== 'loading' && !docEl.doScroll;
}

function ready(fn) {

    if (isReady()) {
        fn();
        return;
    }

    var handle = function () {
        unbind1();
        unbind2();
        fn();
    };
    var unbind1 = on(doc, 'DOMContentLoaded', handle);
    var unbind2 = on(win, 'load', handle);
}

function index(element, ref) {
    return ref
        ? toNodes(element).indexOf(toNode(ref))
        : toNodes((element = toNode(element)) && element.parentNode.children).indexOf(element);
}

function getIndex(i, elements, current, finite) {
    if ( current === void 0 ) current = 0;
    if ( finite === void 0 ) finite = false;


    elements = toNodes(elements);

    var length = elements.length;

    i = isNumeric(i)
        ? toNumber(i)
        : i === 'next'
            ? current + 1
            : i === 'previous'
                ? current - 1
                : index(elements, i);

    if (finite) {
        return clamp(i, 0, length - 1);
    }

    i %= length;

    return i < 0 ? i + length : i;
}

function empty(element) {
    element = toNode(element);
    element.innerHTML = '';
    return element;
}

function html(parent, html) {
    parent = toNode(parent);
    return isUndefined(html)
        ? parent.innerHTML
        : append(parent.hasChildNodes() ? empty(parent) : parent, html);
}

function prepend(parent, element) {

    parent = toNode(parent);

    if (!parent.hasChildNodes()) {
        return append(parent, element);
    } else {
        return insertNodes(element, function (element) { return parent.insertBefore(element, parent.firstChild); });
    }
}

function append(parent, element) {
    parent = toNode(parent);
    return insertNodes(element, function (element) { return parent.appendChild(element); });
}

function before(ref, element) {
    ref = toNode(ref);
    return insertNodes(element, function (element) { return ref.parentNode.insertBefore(element, ref); });
}

function after(ref, element) {
    ref = toNode(ref);
    return insertNodes(element, function (element) { return ref.nextSibling
        ? before(ref.nextSibling, element)
        : append(ref.parentNode, element); }
    );
}

function insertNodes(element, fn) {
    element = isString(element) ? fragment(element) : element;
    return element
        ? 'length' in element
            ? toNodes(element).map(fn)
            : fn(element)
        : null;
}

function remove(element) {
    toNodes(element).map(function (element) { return element.parentNode && element.parentNode.removeChild(element); });
}

function wrapAll(element, structure) {

    structure = toNode(before(element, structure));

    while (structure.firstChild) {
        structure = structure.firstChild;
    }

    append(structure, element);

    return structure;
}

function wrapInner(element, structure) {
    return toNodes(toNodes(element).map(function (element) { return element.hasChildNodes ? wrapAll(toNodes(element.childNodes), structure) : append(element, structure); }
    ));
}

function unwrap(element) {
    toNodes(element)
        .map(function (element) { return element.parentNode; })
        .filter(function (value, index, self) { return self.indexOf(value) === index; })
        .forEach(function (parent) {
            before(parent, parent.childNodes);
            remove(parent);
        });
}

var fragmentRE = /^\s*<(\w+|!)[^>]*>/;
var singleTagRE = /^<(\w+)\s*\/?>(?:<\/\1>)?$/;

function fragment(html) {

    var matches = singleTagRE.exec(html);
    if (matches) {
        return doc.createElement(matches[1]);
    }

    var container = doc.createElement('div');
    if (fragmentRE.test(html)) {
        container.insertAdjacentHTML('beforeend', html.trim());
    } else {
        container.textContent = html;
    }

    return container.childNodes.length > 1 ? toNodes(container.childNodes) : container.firstChild;

}

function addClass(element) {
    var args = [], len = arguments.length - 1;
    while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

    apply(element, args, 'add');
}

function removeClass(element) {
    var args = [], len = arguments.length - 1;
    while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

    apply(element, args, 'remove');
}

function removeClasses(element, cls) {
    filterAttr(element, 'class', new RegExp(("(^|\\s)" + cls + "(?!\\S)"), 'g'), '');
}

function replaceClass(element) {
    var args = [], len = arguments.length - 1;
    while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

    args[0] && removeClass(element, args[0]);
    args[1] && addClass(element, args[1]);
}

function hasClass(element, cls) {
    return supports.ClassList && toNodes(element).some(function (element) { return element.classList.contains(cls); });
}

function toggleClass(element) {
    var args = [], len = arguments.length - 1;
    while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];


    if (!supports.ClassList || !args.length) {
        return;
    }

    args = getArgs$1(args);

    var force = !isString(args[args.length - 1]) ? args.pop() : []; // in iOS 9.3 force === undefined evaluates to false

    args = args.filter(Boolean);

    toNodes(element).forEach(function (ref) {
        var classList = ref.classList;

        for (var i = 0; i < args.length; i++) {
            supports.Force
                ? classList.toggle.apply(classList, [args[i]].concat(force))
                : (classList[(!isUndefined(force) ? force : !classList.contains(args[i])) ? 'add' : 'remove'](args[i]));
        }
    });

}

function apply(element, args, fn) {
    args = getArgs$1(args).filter(Boolean);

    supports.ClassList && args.length && toNodes(element).forEach(function (ref) {
        var classList = ref.classList;

        supports.Multiple
            ? classList[fn].apply(classList, args)
            : args.forEach(function (cls) { return classList[fn](cls); });
    });
}

function getArgs$1(args) {
    return args.reduce(function (args, arg) { return args.concat.call(args, isString(arg) && includes(arg, ' ') ? arg.trim().split(' ') : arg); }
        , []);
}

var cssNumber = {
    'animation-iteration-count': true,
    'column-count': true,
    'fill-opacity': true,
    'flex-grow': true,
    'flex-shrink': true,
    'font-weight': true,
    'line-height': true,
    'opacity': true,
    'order': true,
    'orphans': true,
    'widows': true,
    'z-index': true,
    'zoom': true
};

function css(element, property, value) {

    return toNodes(element).map(function (element) {

        if (isString(property)) {

            property = propName(property);

            if (isUndefined(value)) {
                return getStyle(element, property);
            } else if (!value && value !== 0) {
                element.style.removeProperty(property);
            } else {
                element.style[property] = isNumeric(value) && !cssNumber[property] ? (value + "px") : value;
            }

        } else if (isArray(property)) {

            var styles = getStyles(element);

            return property.reduce(function (props, property) {
                props[property] = styles[propName(property)];
                return props;
            }, {});

        } else if (isObject(property)) {
            each(property, function (value, property) { return css(element, property, value); });
        }

        return element;

    })[0];

}

function getStyles(element, pseudoElt) {
    element = toNode(element);
    return element.ownerDocument.defaultView.getComputedStyle(element, pseudoElt);
}

function getStyle(element, property, pseudoElt) {
    return getStyles(element, pseudoElt)[property];
}

var vars = {};

function getCssVar(name) {

    if (!(name in vars)) {

        /* usage in css: .var-name:before { content:"xyz" } */

        var element = append(docEl, doc.createElement('div'));

        addClass(element, ("var-" + name));

        try {

            vars[name] = getStyle(element, 'content', ':before').replace(/^["'](.*)["']$/, '$1');
            vars[name] = JSON.parse(vars[name]);

        } catch (e) {}

        docEl.removeChild(element);

    }

    return vars[name];

}

var cssProps = {};

function propName(name) {

    var ret = cssProps[name];
    if (!ret) {
        ret = cssProps[name] = vendorPropName(name) || name;
    }
    return ret;
}

var cssPrefixes = ['webkit', 'moz', 'ms'];
var ref$1 = doc.createElement('_');
var style = ref$1.style;

function vendorPropName(name) {

    name = hyphenate(name);

    if (name in style) {
        return name;
    }

    var i = cssPrefixes.length, prefixedName;

    while (i--) {
        prefixedName = "-" + (cssPrefixes[i]) + "-" + name;
        if (prefixedName in style) {
            return prefixedName;
        }
    }
}

function transition(element, props, duration, timing) {
    if ( duration === void 0 ) duration = 400;
    if ( timing === void 0 ) timing = 'linear';


    return Promise.all(toNodes(element).map(function (element) { return new Promise(function (resolve, reject) {

            for (var name in props) {
                var value = css(element, name);
                if (value === '') {
                    css(element, name, value);
                }
            }

            var timer = setTimeout(function () { return trigger(element, 'transitionend'); }, duration);

            once(element, 'transitionend transitioncanceled', function (ref) {
                var type = ref.type;

                clearTimeout(timer);
                removeClass(element, 'uk-transition');
                css(element, {
                    'transition-property': '',
                    'transition-duration': '',
                    'transition-timing-function': ''
                });
                type === 'transitioncanceled' ? reject() : resolve();
            }, false, function (ref) {
                var target = ref.target;

                return element === target;
            });

            addClass(element, 'uk-transition');
            css(element, assign({
                'transition-property': Object.keys(props).map(propName).join(','),
                'transition-duration': (duration + "ms"),
                'transition-timing-function': timing
            }, props));

        }); }
    ));

}

var Transition = {

    start: transition,

    stop: function stop(element) {
        trigger(element, 'transitionend');
        return Promise.resolve();
    },

    cancel: function cancel(element) {
        trigger(element, 'transitioncanceled');
    },

    inProgress: function inProgress(element) {
        return hasClass(element, 'uk-transition');
    }

};

var animationPrefix = 'uk-animation-';
var clsCancelAnimation = 'uk-cancel-animation';

function animate(element, animation, duration, origin, out) {
    var arguments$1 = arguments;
    if ( duration === void 0 ) duration = 200;


    return Promise.all(toNodes(element).map(function (element) { return new Promise(function (resolve, reject) {

            if (hasClass(element, clsCancelAnimation)) {
                requestAnimationFrame(function () { return Promise.resolve().then(function () { return animate.apply(void 0, arguments$1).then(resolve, reject); }
                    ); }
                );
                return;
            }

            var cls = animation + " " + animationPrefix + (out ? 'leave' : 'enter');

            if (startsWith(animation, animationPrefix)) {

                if (origin) {
                    cls += " uk-transform-origin-" + origin;
                }

                if (out) {
                    cls += " " + animationPrefix + "reverse";
                }

            }

            reset();

            once(element, 'animationend animationcancel', function (ref) {
                var type = ref.type;


                var hasReset = false;

                if (type === 'animationcancel') {
                    reject();
                    reset();
                } else {
                    resolve();
                    Promise.resolve().then(function () {
                        hasReset = true;
                        reset();
                    });
                }

                requestAnimationFrame(function () {
                    if (!hasReset) {
                        addClass(element, clsCancelAnimation);

                        requestAnimationFrame(function () { return removeClass(element, clsCancelAnimation); });
                    }
                });

            }, false, function (ref) {
                var target = ref.target;

                return element === target;
            });

            css(element, 'animationDuration', (duration + "ms"));
            addClass(element, cls);

            function reset() {
                css(element, 'animationDuration', '');
                removeClasses(element, (animationPrefix + "\\S*"));
            }

        }); }
    ));

}

var inProgress = new RegExp((animationPrefix + "(enter|leave)"));
var Animation = {

    in: function in$1(element, animation, duration, origin) {
        return animate(element, animation, duration, origin, false);
    },

    out: function out(element, animation, duration, origin) {
        return animate(element, animation, duration, origin, true);
    },

    inProgress: function inProgress$1(element) {
        return inProgress.test(attr(element, 'class'));
    },

    cancel: function cancel(element) {
        trigger(element, 'animationcancel');
    }

};

function $(selector, context) {
    return !isString(selector)
        ? toNode(selector)
        : isHtml(selector)
            ? toNode(fragment(selector))
            : find(selector, context);
}

function $$(selector, context) {
    return !isString(selector)
        ? toNodes(selector)
        : isHtml(selector)
            ? toNodes(fragment(selector))
            : findAll(selector, context);
}

function isHtml(str) {
    return str[0] === '<' || str.match(/^\s*</);
}

var dirs = {
    width: ['x', 'left', 'right'],
    height: ['y', 'top', 'bottom']
};

function positionAt(element, target, elAttach, targetAttach, elOffset, targetOffset, flip, boundary) {

    elAttach = getPos(elAttach);
    targetAttach = getPos(targetAttach);

    var flipped = {element: elAttach, target: targetAttach};

    if (!element || !target) {
        return flipped;
    }

    var dim = getDimensions(element);
    var targetDim = getDimensions(target);
    var position = targetDim;

    moveTo(position, elAttach, dim, -1);
    moveTo(position, targetAttach, targetDim, 1);

    elOffset = getOffsets(elOffset, dim.width, dim.height);
    targetOffset = getOffsets(targetOffset, targetDim.width, targetDim.height);

    elOffset['x'] += targetOffset['x'];
    elOffset['y'] += targetOffset['y'];

    position.left += elOffset['x'];
    position.top += elOffset['y'];

    boundary = getDimensions(boundary || window$1(element));

    if (flip) {
        each(dirs, function (ref, prop) {
            var dir = ref[0];
            var align = ref[1];
            var alignFlip = ref[2];


            if (!(flip === true || includes(flip, dir))) {
                return;
            }

            var elemOffset = elAttach[dir] === align
                ? -dim[prop]
                : elAttach[dir] === alignFlip
                    ? dim[prop]
                    : 0;

            var targetOffset = targetAttach[dir] === align
                ? targetDim[prop]
                : targetAttach[dir] === alignFlip
                    ? -targetDim[prop]
                    : 0;

            if (position[align] < boundary[align] || position[align] + dim[prop] > boundary[alignFlip]) {

                var centerOffset = dim[prop] / 2;
                var centerTargetOffset = targetAttach[dir] === 'center' ? -targetDim[prop] / 2 : 0;

                elAttach[dir] === 'center' && (
                    apply(centerOffset, centerTargetOffset)
                    || apply(-centerOffset, -centerTargetOffset)
                ) || apply(elemOffset, targetOffset);

            }

            function apply(elemOffset, targetOffset) {

                var newVal = position[align] + elemOffset + targetOffset - elOffset[dir] * 2;

                if (newVal >= boundary[align] && newVal + dim[prop] <= boundary[alignFlip]) {
                    position[align] = newVal;

                    ['element', 'target'].forEach(function (el) {
                        flipped[el][dir] = !elemOffset
                            ? flipped[el][dir]
                            : flipped[el][dir] === dirs[prop][1]
                                ? dirs[prop][2]
                                : dirs[prop][1];
                    });

                    return true;
                }

            }

        });
    }

    offset(element, position);

    return flipped;
}

function offset(element, coordinates) {

    element = toNode(element);

    if (coordinates) {

        var currentOffset = offset(element);
        var pos = css(element, 'position');

        ['left', 'top'].forEach(function (prop) {
            if (prop in coordinates) {
                var value = css(element, prop);
                element.style[prop] = ((coordinates[prop] - currentOffset[prop])
                + toFloat(pos === 'absolute' && value === 'auto' ? position(element)[prop] : value)) + "px";
            }
        });

        return;
    }

    return getDimensions(element);
}

function getDimensions(element) {

    element = toNode(element);

    var ref = window$1(element);
    var top = ref.pageYOffset;
    var left = ref.pageXOffset;

    if (isWindow(element)) {

        var height = element.innerHeight;
        var width = element.innerWidth;

        return {
            top: top,
            left: left,
            height: height,
            width: width,
            bottom: top + height,
            right: left + width,
        };
    }

    var display = false;
    if (!isVisible(element)) {
        display = element.style.display;
        element.style.display = 'block';
    }

    var rect = element.getBoundingClientRect();

    if (display !== false) {
        element.style.display = display;
    }

    return {
        height: rect.height,
        width: rect.width,
        top: rect.top + top,
        left: rect.left + left,
        bottom: rect.bottom + top,
        right: rect.right + left,
    };
}

function position(element) {
    element = toNode(element);

    var parent = offsetParent(element);
    var parentOffset = parent === docEl$1(element) ? {top: 0, left: 0} : offset(parent);
    var ref = ['top', 'left'].reduce(function (props, prop) {
        var propName$$1 = ucfirst(prop);
        props[prop] -= parentOffset[prop]
            + (toFloat(css(element, ("margin" + propName$$1))) || 0)
            + (toFloat(css(parent, ("border" + propName$$1 + "Width"))) || 0);
        return props;
    }, offset(element));
    var top = ref.top;
    var left = ref.left;

    return {top: top, left: left};
}

function offsetParent(element) {

    var parent = toNode(element).offsetParent;

    while (parent && css(parent, 'position') === 'static') {
        parent = parent.offsetParent;
    }

    return parent || docEl$1(element);
}

var height = dimension('height');
var width = dimension('width');

function dimension(prop) {
    var propName$$1 = ucfirst(prop);
    return function (element, value) {

        element = toNode(element);

        if (isUndefined(value)) {

            if (isWindow(element)) {
                return element[("inner" + propName$$1)];
            }

            if (isDocument(element)) {
                var doc = element.documentElement;
                return Math.max(doc.offsetHeight, doc.scrollHeight);
            }

            value = css(element, prop);
            value = value === 'auto' ? element[("offset" + propName$$1)] : toFloat(value) || 0;

            return getContentSize(prop, element, value);

        } else {

            css(element, prop, !value && value !== 0
                ? ''
                : getContentSize(prop, element, value) + 'px'
            );

        }

    };
}

function getContentSize(prop, element, value) {
    return css(element, 'boxSizing') === 'border-box' ? dirs[prop].slice(1).map(ucfirst).reduce(function (value, prop) { return value
        - toFloat(css(element, ("padding" + prop)))
        - toFloat(css(element, ("border" + prop + "Width"))); }
        , value) : value;
}

function moveTo(position, attach, dim, factor) {
    each(dirs, function (ref, prop) {
        var dir = ref[0];
        var align = ref[1];
        var alignFlip = ref[2];

        if (attach[dir] === alignFlip) {
            position[align] += dim[prop] * factor;
        } else if (attach[dir] === 'center') {
            position[align] += dim[prop] * factor / 2;
        }
    });
}

function getPos(pos) {

    var x = /left|center|right/;
    var y = /top|center|bottom/;

    pos = (pos || '').split(' ');

    if (pos.length === 1) {
        pos = x.test(pos[0])
            ? pos.concat(['center'])
            : y.test(pos[0])
                ? ['center'].concat(pos)
                : ['center', 'center'];
    }

    return {
        x: x.test(pos[0]) ? pos[0] : 'center',
        y: y.test(pos[1]) ? pos[1] : 'center'
    };
}

function getOffsets(offsets, width, height) {

    var ref = (offsets || '').split(' ');
    var x = ref[0];
    var y = ref[1];

    return {
        x: x ? toFloat(x) * (endsWith(x, '%') ? width / 100 : 1) : 0,
        y: y ? toFloat(y) * (endsWith(y, '%') ? height / 100 : 1) : 0
    };
}

function flipPosition(pos) {
    switch (pos) {
        case 'left':
            return 'right';
        case 'right':
            return 'left';
        case 'top':
            return 'bottom';
        case 'bottom':
            return 'top';
        default:
            return pos;
    }
}

function isInView(element, top, left) {
    if ( top === void 0 ) top = 0;
    if ( left === void 0 ) left = 0;


    element = toNode(element);

    var win = window$1(element);
    return intersectRect(element.getBoundingClientRect(), {
        top: top,
        left: left,
        bottom: top + height(win),
        right: left + width(win)
    });
}

function scrolledOver(element) {

    element = toNode(element);

    var win = window$1(element);
    var doc = document$1(element);
    var elHeight = element.offsetHeight;
    var top = positionTop(element);
    var vp = height(win);
    var vh = vp + Math.min(0, top - vp);
    var diff = Math.max(0, vp - (height(doc) - (top + elHeight)));

    return clamp(((vh + win.pageYOffset - top) / ((vh + (elHeight - (diff < vp ? diff : 0))) / 100)) / 100);
}

function positionTop(element) {
    var top = 0;

    do {

        top += element.offsetTop;

    } while ((element = element.offsetParent));

    return top;
}

function window$1(element) {
    return isWindow(element) ? element : document$1(element).defaultView;
}

function document$1(element) {
    return toNode(element).ownerDocument;
}

function docEl$1(element) {
    return document$1(element).documentElement;
}

/*
    Based on:
    Copyright (c) 2016 Wilson Page wilsonpage@me.com
    https://github.com/wilsonpage/fastdom
*/

var fastdom = {

    reads: [],
    writes: [],

    read: function read(task) {
        this.reads.push(task);
        scheduleFlush();
        return task;
    },

    write: function write(task) {
        this.writes.push(task);
        scheduleFlush();
        return task;
    },

    clear: function clear(task) {
        return remove$1(this.reads, task) || remove$1(this.writes, task);
    },

    flush: function flush() {

        runTasks(this.reads);
        runTasks(this.writes.splice(0, this.writes.length));

        this.scheduled = false;

        if (this.reads.length || this.writes.length) {
            scheduleFlush();
        }

    }

};

function scheduleFlush() {
    if (!fastdom.scheduled) {
        fastdom.scheduled = true;
        requestAnimationFrame(fastdom.flush.bind(fastdom));
    }
}

function runTasks(tasks) {
    var task;
    while ((task = tasks.shift())) {
        task();
    }
}

function remove$1(array, item) {
    var index = array.indexOf(item);
    return !!~index && !!array.splice(index, 1);
}

function MouseTracker() {}

MouseTracker.prototype = {

    positions: [],
    position: null,

    init: function init() {
        var this$1 = this;


        this.positions = [];
        this.position = null;

        var ticking = false;
        this.unbind = on(doc, 'mousemove', function (e) {

            if (ticking) {
                return;
            }

            setTimeout(function () {

                var time = Date.now();
                var ref = this$1.positions;
                var length = ref.length;

                if (length && (time - this$1.positions[length - 1].time > 100)) {
                    this$1.positions.splice(0, length);
                }

                this$1.positions.push({time: time, x: e.pageX, y: e.pageY});

                if (this$1.positions.length > 5) {
                    this$1.positions.shift();
                }

                ticking = false;
            }, 5);

            ticking = true;
        });

    },

    cancel: function cancel() {
        if (this.unbind) {
            this.unbind();
        }
    },

    movesTo: function movesTo(target) {

        if (this.positions.length < 2) {
            return false;
        }

        var p = offset(target);
        var position$$1 = this.positions[this.positions.length - 1];
        var ref = this.positions;
        var prevPos = ref[0];

        if (p.left <= position$$1.x && position$$1.x <= p.right && p.top <= position$$1.y && position$$1.y <= p.bottom) {
            return false;
        }

        var points = [
            [{x: p.left, y: p.top}, {x: p.right, y: p.bottom}],
            [{x: p.right, y: p.top}, {x: p.left, y: p.bottom}]
        ];

        if (p.right <= position$$1.x) {
            // empty
        } else if (p.left >= position$$1.x) {
            points[0].reverse();
            points[1].reverse();
        } else if (p.bottom <= position$$1.y) {
            points[0].reverse();
        } else if (p.top >= position$$1.y) {
            points[1].reverse();
        }

        return !!points.reduce(function (result, point) {
            return result + (slope(prevPos, point[0]) < slope(position$$1, point[0]) && slope(prevPos, point[1]) > slope(position$$1, point[1]));
        }, 0);
    }

};

function slope(a, b) {
    return (b.y - a.y) / (b.x - a.x);
}

var strats = {};

// concat strategy
strats.args =
strats.events =
strats.init =
strats.created =
strats.beforeConnect =
strats.connected =
strats.ready =
strats.beforeDisconnect =
strats.disconnected =
strats.destroy = function (parentVal, childVal) {

    parentVal = parentVal && !isArray(parentVal) ? [parentVal] : parentVal;

    return childVal
        ? parentVal
            ? parentVal.concat(childVal)
            : isArray(childVal)
                ? childVal
                : [childVal]
        : parentVal;
};

// update strategy
strats.update = function (parentVal, childVal) {
    return strats.args(parentVal, isFunction(childVal) ? {read: childVal} : childVal);
};

// property strategy
strats.props = function (parentVal, childVal) {

    if (isArray(childVal)) {
        childVal = childVal.reduce(function (value, key) {
            value[key] = String;
            return value;
        }, {});
    }

    return strats.methods(parentVal, childVal);
};

// extend strategy
strats.computed =
strats.defaults =
strats.methods = function (parentVal, childVal) {
    return childVal
        ? parentVal
            ? assign({}, parentVal, childVal)
            : childVal
        : parentVal;
};

// default strategy
var defaultStrat = function (parentVal, childVal) {
    return isUndefined(childVal) ? parentVal : childVal;
};

function mergeOptions(parent, child) {

    var options = {};

    if (child.mixins) {
        for (var i = 0, l = child.mixins.length; i < l; i++) {
            parent = mergeOptions(parent, child.mixins[i]);
        }
    }

    for (var key in parent) {
        mergeKey(key);
    }

    for (var key$1 in child) {
        if (!hasOwn(parent, key$1)) {
            mergeKey(key$1);
        }
    }

    function mergeKey(key) {
        options[key] = (strats[key] || defaultStrat)(parent[key], child[key]);
    }

    return options;
}

var id = 0;

var Player = function Player(el) {
    this.id = ++id;
    this.el = toNode(el);
};

Player.prototype.isVideo = function isVideo () {
    return this.isYoutube() || this.isVimeo() || this.isHTML5();
};

Player.prototype.isHTML5 = function isHTML5 () {
    return this.el.tagName === 'VIDEO';
};

Player.prototype.isIFrame = function isIFrame () {
    return this.el.tagName === 'IFRAME';
};

Player.prototype.isYoutube = function isYoutube () {
    return this.isIFrame() && !!this.el.src.match(/\/\/.*?youtube(-nocookie)?\.[a-z]+\/(watch\?v=[^&\s]+|embed)|youtu\.be\/.*/);
};

Player.prototype.isVimeo = function isVimeo () {
    return this.isIFrame() && !!this.el.src.match(/vimeo\.com\/video\/.*/);
};

Player.prototype.enableApi = function enableApi () {
        var this$1 = this;


    if (this.ready) {
        return this.ready;
    }

    var youtube = this.isYoutube();
    var vimeo = this.isVimeo();

    var poller;

    if (youtube || vimeo) {

        return this.ready = new Promise(function (resolve) {

            once(this$1.el, 'load', function () {
                if (youtube) {
                    var listener = function () { return post(this$1.el, {event: 'listening', id: this$1.id}); };
                    poller = setInterval(listener, 100);
                    listener();
                }
            });

            listen(function (data$$1) { return youtube && data$$1.id === this$1.id && data$$1.event === 'onReady' || vimeo && Number(data$$1.player_id) === this$1.id; })
                .then(function () {
                    resolve();
                    poller && clearInterval(poller);
                });

            attr(this$1.el, 'src', ("" + (this$1.el.src) + (includes(this$1.el.src, '?') ? '&' : '?') + (youtube ? 'enablejsapi=1' : ("api=1&player_id=" + id))));

        });

    }

    return Promise.resolve();

};

Player.prototype.play = function play () {
        var this$1 = this;


    if (!this.isVideo()) {
        return;
    }

    if (this.isIFrame()) {
        this.enableApi().then(function () { return post(this$1.el, {func: 'playVideo', method: 'play'}); });
    } else if (this.isHTML5()) {
        try {
            this.el.play();
        } catch (e) {}
    }
};

Player.prototype.pause = function pause () {
        var this$1 = this;


    if (!this.isVideo()) {
        return;
    }

    if (this.isIFrame()) {
        this.enableApi().then(function () { return post(this$1.el, {func: 'pauseVideo', method: 'pause'}); });
    } else if (this.isHTML5()) {
        this.el.pause();
    }
};

Player.prototype.mute = function mute () {
        var this$1 = this;


    if (!this.isVideo()) {
        return;
    }

    if (this.isIFrame()) {
        this.enableApi().then(function () { return post(this$1.el, {func: 'mute', method: 'setVolume', value: 0}); });
    } else if (this.isHTML5()) {
        this.el.muted = true;
        attr(this.el, 'muted', '');
    }

};

function post(el, cmd) {
    try {
        el.contentWindow.postMessage(JSON.stringify(assign({event: 'command'}, cmd)), '*');
    } catch (e) {}
}

function listen(cb) {

    return new Promise(function (resolve) {

        once(win, 'message', function (_, data$$1) { return resolve(data$$1); }, false, function (ref) {
            var data$$1 = ref.data;


            if (!data$$1 || !isString(data$$1)) {
                return;
            }

            try {
                data$$1 = JSON.parse(data$$1);
            } catch (e) {
                return;
            }

            return data$$1 && cb(data$$1);

        });

    });

}

/*
    Based on:
    Copyright (c) 2010-2016 Thomas Fuchs
    http://zeptojs.com/
*/
var touch = {};
var clickTimeout;
var swipeTimeout;
var tapTimeout;
var clicked;

function swipeDirection(ref) {
    var x1 = ref.x1;
    var x2 = ref.x2;
    var y1 = ref.y1;
    var y2 = ref.y2;

    return Math.abs(x1 - x2) >= Math.abs(y1 - y2) ? (x1 - x2 > 0 ? 'Left' : 'Right') : (y1 - y2 > 0 ? 'Up' : 'Down');
}

function cancelAll() {
    clickTimeout && clearTimeout(clickTimeout);
    swipeTimeout && clearTimeout(swipeTimeout);
    tapTimeout && clearTimeout(tapTimeout);
    clickTimeout = swipeTimeout = tapTimeout = null;
    touch = {};
}

ready(function () {

    on(doc, 'click', function () { return clicked = true; }, true);

    on(doc, pointerDown, function (e) {

        var target = e.target;
        var ref = getPos$1(e);
        var x = ref.x;
        var y = ref.y;
        var now = Date.now();
        var type = getType(e.type);

        if (touch.type && touch.type !== type) {
            return;
        }

        touch.el = 'tagName' in target ? target : target.parentNode;

        clickTimeout && clearTimeout(clickTimeout);

        touch.x1 = x;
        touch.y1 = y;

        if (touch.last && now - touch.last <= 250) {
            touch = {};
        }

        touch.type = type;
        touch.last = now;

        clicked = e.button > 0;

    });

    on(doc, pointerMove, function (e) {

        if (e.defaultPrevented) {
            return;
        }

        var ref = getPos$1(e);
        var x = ref.x;
        var y = ref.y;

        touch.x2 = x;
        touch.y2 = y;

    });

    on(doc, pointerUp, function (ref) {
        var type = ref.type;
        var target = ref.target;


        if (touch.type !== getType(type)) {
            return;
        }

        // swipe
        if (touch.x2 && Math.abs(touch.x1 - touch.x2) > 30 || touch.y2 && Math.abs(touch.y1 - touch.y2) > 30) {

            swipeTimeout = setTimeout(function () {
                if (touch.el) {
                    trigger(touch.el, 'swipe');
                    trigger(touch.el, ("swipe" + (swipeDirection(touch))));
                }
                touch = {};
            });

        // normal tap
        } else if ('last' in touch) {

            tapTimeout = setTimeout(function () { return trigger(touch.el, 'tap'); });

            // trigger single click after 350ms of inactivity
            if (touch.el && type !== 'mouseup' && within(target, touch.el)) {
                clickTimeout = setTimeout(function () {
                    clickTimeout = null;
                    if (touch.el && !clicked) {
                        trigger(touch.el, 'click');
                    }
                    touch = {};
                }, 350);
            }

        } else {
            touch = {};
        }

    });

    on(doc, 'touchcancel', cancelAll);
    on(win, 'scroll', cancelAll);

});

var touching = false;
on(doc, 'touchstart', function () { return touching = true; }, true);
on(doc, 'click', function () {touching = false;});
on(doc, 'touchcancel', function () { return touching = false; }, true);

function isTouch(e) {
    return touching || e.pointerType === 'touch';
}

function getPos$1(e) {
    var touches = e.touches;
    var changedTouches = e.changedTouches;
    var ref = touches && touches[0] || changedTouches && changedTouches[0] || e;
    var x = ref.pageX;
    var y = ref.pageY;

    return {x: x, y: y};
}

function getType(type) {
    return type.slice(0, 5);
}



var util = Object.freeze({
	ajax: ajax,
	transition: transition,
	Transition: Transition,
	animate: animate,
	Animation: Animation,
	attr: attr,
	hasAttr: hasAttr,
	removeAttr: removeAttr,
	filterAttr: filterAttr,
	data: data,
	addClass: addClass,
	removeClass: removeClass,
	removeClasses: removeClasses,
	replaceClass: replaceClass,
	hasClass: hasClass,
	toggleClass: toggleClass,
	$: $,
	$$: $$,
	positionAt: positionAt,
	offset: offset,
	position: position,
	height: height,
	width: width,
	flipPosition: flipPosition,
	isInView: isInView,
	scrolledOver: scrolledOver,
	isReady: isReady,
	ready: ready,
	index: index,
	getIndex: getIndex,
	empty: empty,
	html: html,
	prepend: prepend,
	append: append,
	before: before,
	after: after,
	remove: remove,
	wrapAll: wrapAll,
	wrapInner: wrapInner,
	unwrap: unwrap,
	fragment: fragment,
	win: win,
	doc: doc,
	docEl: docEl,
	isRtl: isRtl,
	Observer: Observer,
	hasTouch: hasTouch,
	pointerDown: pointerDown,
	pointerMove: pointerMove,
	pointerUp: pointerUp,
	pointerEnter: pointerEnter,
	pointerLeave: pointerLeave,
	getImage: getImage,
	supports: supports,
	on: on,
	off: off,
	once: once,
	trigger: trigger,
	createEvent: createEvent,
	toEventTargets: toEventTargets,
	preventClick: preventClick,
	fastdom: fastdom,
	isVoidElement: isVoidElement,
	isVisible: isVisible,
	selInput: selInput,
	isInput: isInput,
	filter: filter,
	within: within,
	bind: bind,
	hasOwn: hasOwn,
	hyphenate: hyphenate,
	camelize: camelize,
	ucfirst: ucfirst,
	startsWith: startsWith,
	endsWith: endsWith,
	includes: includes,
	isArray: isArray,
	isFunction: isFunction,
	isObject: isObject,
	isPlainObject: isPlainObject,
	isWindow: isWindow,
	isDocument: isDocument,
	isJQuery: isJQuery,
	isNode: isNode,
	isNodeCollection: isNodeCollection,
	isBoolean: isBoolean,
	isString: isString,
	isNumber: isNumber,
	isNumeric: isNumeric,
	isUndefined: isUndefined,
	toBoolean: toBoolean,
	toNumber: toNumber,
	toFloat: toFloat,
	toNode: toNode,
	toNodes: toNodes,
	toList: toList,
	toMs: toMs,
	swap: swap,
	assign: assign,
	each: each,
	sortBy: sortBy,
	clamp: clamp,
	noop: noop,
	intersectRect: intersectRect,
	pointInRect: pointInRect,
	Dimensions: Dimensions,
	MouseTracker: MouseTracker,
	mergeOptions: mergeOptions,
	Player: Player,
	Promise: Promise,
	Deferred: Deferred,
	query: query,
	queryAll: queryAll,
	find: find,
	findAll: findAll,
	matches: matches,
	closest: closest,
	parents: parents,
	escape: escape,
	css: css,
	getStyles: getStyles,
	getStyle: getStyle,
	getCssVar: getCssVar,
	propName: propName,
	isTouch: isTouch,
	getPos: getPos$1
});

var globalAPI = function (UIkit) {

    var DATA = UIkit.data;

    UIkit.use = function (plugin) {

        if (plugin.installed) {
            return;
        }

        plugin.call(null, this);
        plugin.installed = true;

        return this;
    };

    UIkit.mixin = function (mixin, component) {
        component = (isString(component) ? UIkit.components[component] : component) || this;
        mixin = mergeOptions({}, mixin);
        mixin.mixins = component.options.mixins;
        delete component.options.mixins;
        component.options = mergeOptions(mixin, component.options);
    };

    UIkit.extend = function (options) {

        options = options || {};

        var Super = this;
        var Sub = function UIkitComponent (options) {
            this._init(options);
        };

        Sub.prototype = Object.create(Super.prototype);
        Sub.prototype.constructor = Sub;
        Sub.options = mergeOptions(Super.options, options);

        Sub['super'] = Super;
        Sub.extend = Super.extend;

        return Sub;
    };

    UIkit.update = function (e, element, parents) {
        if ( parents === void 0 ) parents = false;


        e = createEvent(e || 'update');

        if (!element) {

            update(UIkit.instances, e);
            return;

        }

        element = toNode(element);

        if (parents) {

            do {

                update(element[DATA], e);
                element = element.parentNode;

            } while (element);

        } else {

            apply(element, function (element) { return update(element[DATA], e); });

        }

    };

    var container;
    Object.defineProperty(UIkit, 'container', {

        get: function get() {
            return container || doc.body;
        },

        set: function set(element) {
            container = $(element);
        }

    });

    function apply(node, fn) {

        if (node.nodeType !== 1) {
            return;
        }

        fn(node);
        node = node.firstElementChild;
        while (node) {
            apply(node, fn);
            node = node.nextElementSibling;
        }
    }

    function update(data, e) {

        if (!data) {
            return;
        }

        for (var name in data) {
            if (data[name]._isReady) {
                data[name]._callUpdate(e);
            }
        }

    }

};

var hooksAPI = function (UIkit) {

    UIkit.prototype._callHook = function (hook) {
        var this$1 = this;


        var handlers = this.$options[hook];

        if (handlers) {
            handlers.forEach(function (handler) { return handler.call(this$1); });
        }
    };

    UIkit.prototype._callConnected = function () {
        var this$1 = this;


        if (this._connected) {
            return;
        }

        if (!includes(UIkit.elements, this.$options.el)) {
            UIkit.elements.push(this.$options.el);
        }

        UIkit.instances[this._uid] = this;

        this._data = {};

        this._callHook('beforeConnect');
        this._connected = true;

        this._initEvents();
        this._initObserver();

        this._callHook('connected');

        if (!this._isReady) {
            ready(function () { return this$1._callReady(); });
        }

        this._callUpdate();
    };

    UIkit.prototype._callDisconnected = function () {

        if (!this._connected) {
            return;
        }

        this._callHook('beforeDisconnect');

        if (this._observer) {
            this._observer.disconnect();
            this._observer = null;
        }

        var index = UIkit.elements.indexOf(this.$options.el);

        if (~index) {
            UIkit.elements.splice(index, 1);
        }

        delete UIkit.instances[this._uid];

        this._unbindEvents();
        this._callHook('disconnected');

        this._connected = false;

    };

    UIkit.prototype._callReady = function () {

        if (this._isReady) {
            return;
        }

        this._isReady = true;
        this._callHook('ready');
        this._resetComputeds();
        this._callUpdate();
    };

    UIkit.prototype._callUpdate = function (e) {
        var this$1 = this;


        e = createEvent(e || 'update');

        var type = e.type;

        if (includes(['update', 'load', 'resize'], type)) {
            this._resetComputeds();
        }

        var updates = this.$options.update;
        var ref = this._frames;
        var reads = ref.reads;
        var writes = ref.writes;

        if (!updates) {
            return;
        }

        updates.forEach(function (ref, i) {
            var read = ref.read;
            var write = ref.write;
            var events = ref.events;


            if (type !== 'update' && !includes(events, type)) {
                return;
            }

            if (read && !includes(fastdom.reads, reads[i])) {
                reads[i] = fastdom.read(function () {

                    var result = read.call(this$1, this$1._data, e);

                    if (result === false && write) {
                        fastdom.clear(writes[i]);
                        delete writes[i];
                    } else if (isPlainObject(result)) {
                        assign(this$1._data, result);
                    }
                    delete reads[i];
                });
            }

            if (write && !includes(fastdom.writes, writes[i])) {
                writes[i] = fastdom.write(function () {
                    write.call(this$1, this$1._data, e);
                    delete writes[i];
                });
            }

        });

    };

};

var stateAPI = function (UIkit) {

    var uid = 0;

    UIkit.prototype.props = {};

    UIkit.prototype._init = function (options) {

        options = options || {};
        options = this.$options = mergeOptions(this.constructor.options, options, this);

        this.$el = null;
        this.$name = UIkit.prefix + hyphenate(this.$options.name);
        this.$props = {};

        this._frames = {reads: {}, writes: {}};
        this._events = [];

        this._uid = uid++;
        this._initData();
        this._initMethods();
        this._initComputeds();
        this._callHook('created');

        if (options.el) {
            this.$mount(options.el);
        }
    };

    UIkit.prototype._initData = function () {
        var this$1 = this;


        var ref = this.$options;
        var defaults = ref.defaults;
        var data$$1 = ref.data; if ( data$$1 === void 0 ) data$$1 = {};
        var args = ref.args; if ( args === void 0 ) args = [];
        var props = ref.props; if ( props === void 0 ) props = {};
        var el = ref.el;

        if (args.length && isArray(data$$1)) {
            data$$1 = data$$1.slice(0, args.length).reduce(function (data$$1, value, index) {
                if (isPlainObject(value)) {
                    assign(data$$1, value);
                } else {
                    data$$1[args[index]] = value;
                }
                return data$$1;
            }, {});
        }

        for (var key in assign({}, defaults, props)) {
            this$1.$props[key] = this$1[key] = hasOwn(data$$1, key) && !isUndefined(data$$1[key])
                ? coerce(props[key], data$$1[key], el)
                : defaults
                    ? defaults[key] && isArray(defaults[key])
                        ? defaults[key].concat()
                        : defaults[key]
                    : null;
        }
    };

    UIkit.prototype._initMethods = function () {
        var this$1 = this;


        var ref = this.$options;
        var methods = ref.methods;

        if (methods) {
            for (var key in methods) {
                this$1[key] = bind(methods[key], this$1);
            }
        }
    };

    UIkit.prototype._initComputeds = function () {
        var this$1 = this;


        var ref = this.$options;
        var computed = ref.computed;

        this._resetComputeds();

        if (computed) {
            for (var key in computed) {
                registerComputed(this$1, key, computed[key]);
            }
        }
    };

    UIkit.prototype._resetComputeds = function () {
        this._computeds = {};
    };

    UIkit.prototype._initProps = function (props) {
        var this$1 = this;


        var key;

        this._resetComputeds();

        props = props || getProps(this.$options, this.$name);

        for (key in props) {
            if (!isUndefined(props[key])) {
                this$1.$props[key] = props[key];
            }
        }

        var exclude = [this.$options.computed, this.$options.methods];
        for (key in this$1.$props) {
            if (key in props && notIn(exclude, key)) {
                this$1[key] = this$1.$props[key];
            }
        }
    };

    UIkit.prototype._initEvents = function () {
        var this$1 = this;


        var ref = this.$options;
        var events = ref.events;

        if (events) {

            events.forEach(function (event) {

                if (!hasOwn(event, 'handler')) {
                    for (var key in event) {
                        registerEvent(this$1, event[key], key);
                    }
                } else {
                    registerEvent(this$1, event);
                }

            });
        }
    };

    UIkit.prototype._unbindEvents = function () {
        this._events.forEach(function (unbind) { return unbind(); });
        this._events = [];
    };

    UIkit.prototype._initObserver = function () {
        var this$1 = this;


        var ref = this.$options;
        var attrs = ref.attrs;
        var props = ref.props;
        var el = ref.el;
        if (this._observer || !props || !attrs || !Observer) {
            return;
        }

        attrs = isArray(attrs) ? attrs : Object.keys(props).map(function (key) { return hyphenate(key); });

        this._observer = new Observer(function () {

            var data$$1 = getProps(this$1.$options, this$1.$name);
            if (attrs.some(function (key) { return !isUndefined(data$$1[key]) && data$$1[key] !== this$1.$props[key]; })) {
                this$1.$reset(data$$1);
            }

        });

        this._observer.observe(el, {attributes: true, attributeFilter: attrs.concat([this.$name, ("data-" + (this.$name))])});
    };

    function getProps(opts, name) {

        var data$$1 = {};
        var args = opts.args; if ( args === void 0 ) args = [];
        var props = opts.props; if ( props === void 0 ) props = {};
        var el = opts.el;

        if (!props) {
            return data$$1;
        }

        for (var key in props) {
            var prop = hyphenate(key);
            if (hasAttr(el, prop)) {

                var value = coerce(props[key], attr(el, prop), el);

                if (prop === 'target' && (!value || startsWith(value, '_'))) {
                    continue;
                }

                data$$1[key] = value;
            }
        }

        var options = parseOptions(data(el, name), args);

        for (var key$1 in options) {
            var prop$1 = camelize(key$1);
            if (props[prop$1] !== undefined) {
                data$$1[prop$1] = coerce(props[prop$1], options[key$1], el);
            }
        }

        return data$$1;
    }

    function parseOptions(options, args) {
        if ( args === void 0 ) args = [];


        try {

            return !options
                ? {}
                : startsWith(options, '{')
                    ? JSON.parse(options)
                    : args.length && !includes(options, ':')
                        ? (( obj = {}, obj[args[0]] = options, obj ))
                        : options.split(';').reduce(function (options, option) {
                            var ref = option.split(/:(.+)/);
                            var key = ref[0];
                            var value = ref[1];
                            if (key && value) {
                                options[key.trim()] = value.trim();
                            }
                            return options;
                        }, {});
            var obj;

        } catch (e) {
            return {};
        }

    }

    function registerComputed(component, key, cb) {
        Object.defineProperty(component, key, {

            enumerable: true,

            get: function get() {

                var _computeds = component._computeds;
                var $props = component.$props;
                var $el = component.$el;

                if (!hasOwn(_computeds, key)) {
                    _computeds[key] = cb.call(component, $props, $el);
                }

                return _computeds[key];
            },

            set: function set(value) {
                component._computeds[key] = value;
            }

        });
    }

    function registerEvent(component, event, key) {

        if (!isPlainObject(event)) {
            event = ({name: key, handler: event});
        }

        var name = event.name;
        var el = event.el;
        var handler = event.handler;
        var capture = event.capture;
        var delegate = event.delegate;
        var filter = event.filter;
        var self = event.self;
        el = isFunction(el)
            ? el.call(component)
            : el || component.$el;

        if (isArray(el)) {
            el.forEach(function (el) { return registerEvent(component, assign({}, event, {el: el}), key); });
            return;
        }

        if (!el || filter && !filter.call(component)) {
            return;
        }

        handler = detail(isString(handler) ? component[handler] : bind(handler, component));

        if (self) {
            handler = selfFilter(handler);
        }

        component._events.push(
            on(
                el,
                name,
                !delegate
                    ? null
                    : isString(delegate)
                        ? delegate
                        : delegate.call(component),
                handler,
                capture
            )
        );

    }

    function selfFilter(handler) {
        return function selfHandler(e) {
            if (e.target === e.currentTarget || e.target === e.current) {
                return handler.call(null, e);
            }
        };
    }

    function notIn(options, key) {
        return options.every(function (arr) { return !arr || !hasOwn(arr, key); });
    }

    function detail(listener) {
        return function (e) { return isArray(e.detail) ? listener.apply(void 0, [e].concat(e.detail)) : listener(e); };
    }

    function coerce(type, value, context) {

        if (type === Boolean) {
            return toBoolean(value);
        } else if (type === Number) {
            return toNumber(value);
        } else if (type === 'query') {
            return query(value, context);
        } else if (type === 'list') {
            return toList(value);
        } else if (type === 'media') {
            return toMedia(value);
        }

        return type ? type(value) : value;
    }

    function toMedia(value) {

        if (isString(value)) {
            if (value[0] === '@') {
                var name = "media-" + (value.substr(1));
                value = toFloat(getCssVar(name));
            } else if (isNaN(value)) {
                return value;
            }
        }

        return value && !isNaN(value) ? ("(min-width: " + value + "px)") : false;
    }

};

var instanceAPI = function (UIkit) {

    var DATA = UIkit.data;

    UIkit.prototype.$mount = function (el) {

        var ref = this.$options;
        var name = ref.name;

        if (!el[DATA]) {
            el[DATA] = {};
        }

        if (el[DATA][name]) {
            return;
        }

        el[DATA][name] = this;

        this.$el = this.$options.el = this.$options.el || el;

        this._initProps();

        this._callHook('init');

        if (within(el, docEl)) {
            this._callConnected();
        }
    };

    UIkit.prototype.$emit = function (e) {
        this._callUpdate(e);
    };

    UIkit.prototype.$update = function (e, parents) {
        UIkit.update(e, this.$options.el, parents);
    };

    UIkit.prototype.$reset = function (data) {
        this._callDisconnected();
        this._initProps(data);
        this._callConnected();
    };

    UIkit.prototype.$destroy = function (removeEl) {
        if ( removeEl === void 0 ) removeEl = false;


        var ref = this.$options;
        var el = ref.el;
        var name = ref.name;

        if (el) {
            this._callDisconnected();
        }

        this._callHook('destroy');

        if (!el || !el[DATA]) {
            return;
        }

        delete el[DATA][name];

        if (!Object.keys(el[DATA]).length) {
            delete el[DATA];
        }

        if (removeEl) {
            remove(this.$el);
        }
    };

};

var componentAPI = function (UIkit) {

    var DATA = UIkit.data;

    UIkit.components = {};

    UIkit.component = function (id, options) {

        var name = camelize(id);

        if (isPlainObject(options)) {
            options.name = name;
            options = UIkit.extend(options);
        } else if (isUndefined(options)) {
            return UIkit.components[name];
        } else {
            options.options.name = name;
        }

        UIkit.components[name] = options;

        UIkit[name] = function (element, data) {
            var i = arguments.length, argsArray = Array(i);
            while ( i-- ) argsArray[i] = arguments[i];


            if (isPlainObject(element)) {
                return new UIkit.components[name]({data: element});
            }

            if (UIkit.components[name].options.functional) {
                return new UIkit.components[name]({data: [].concat( argsArray )});
            }

            return element && element.nodeType ? init(element) : $$(element).map(init)[0];

            function init(element) {

                var cmp = UIkit.getComponent(element, name);

                if (cmp && data) {
                    cmp.$reset(data);
                }

                return cmp || new UIkit.components[name]({el: element, data: data || {}});
            }

        };

        if (UIkit._initialized && !options.options.functional) {
            fastdom.read(function () { return UIkit[name](("[uk-" + id + "],[data-uk-" + id + "]")); });
        }

        return UIkit.components[name];
    };

    UIkit.getComponents = function (element) { return element && (element = isJQuery(element) ? element[0] : element) && element[DATA] || {}; };
    UIkit.getComponent = function (element, name) { return UIkit.getComponents(element)[name]; };

    UIkit.connect = function (node) {

        if (node[DATA]) {
            for (var name in node[DATA]) {
                node[DATA][name]._callConnected();
            }
        }

        for (var i = 0; i < node.attributes.length; i++) {

            var name$1 = getComponentName(node.attributes[i].name);

            if (name$1 && name$1 in UIkit.components) {
                UIkit[name$1](node);
            }

        }

    };

    UIkit.disconnect = function (node) {
        for (var name in node[DATA]) {
            node[DATA][name]._callDisconnected();
        }
    };

};

function getComponentName(attribute) {
    return startsWith(attribute, 'uk-') || startsWith(attribute, 'data-uk-')
        ? camelize(attribute.replace('data-uk-', '').replace('uk-', ''))
        : false;
}

var UIkit$1 = function (options) {
    this._init(options);
};

UIkit$1.util = util;
UIkit$1.data = '__uikit__';
UIkit$1.prefix = 'uk-';
UIkit$1.options = {};
UIkit$1.instances = {};
UIkit$1.elements = [];

globalAPI(UIkit$1);
hooksAPI(UIkit$1);
stateAPI(UIkit$1);
instanceAPI(UIkit$1);
componentAPI(UIkit$1);

var Class = {

    init: function init() {
        addClass(this.$el, this.$name);
    }

};

var Container = {

    props: {
        container: Boolean
    },

    defaults: {
        container: true
    },

    computed: {

        container: function container(ref) {
            var container = ref.container;

            return container === true && UIkit$1.container || container && $(container);
        }

    }

};

var Togglable = {

    props: {
        cls: Boolean,
        animation: 'list',
        duration: Number,
        origin: String,
        transition: String,
        queued: Boolean
    },

    defaults: {
        cls: false,
        animation: [false],
        duration: 200,
        origin: false,
        transition: 'linear',
        queued: false,

        initProps: {
            overflow: '',
            height: '',
            paddingTop: '',
            paddingBottom: '',
            marginTop: '',
            marginBottom: ''
        },

        hideProps: {
            overflow: 'hidden',
            height: 0,
            paddingTop: 0,
            paddingBottom: 0,
            marginTop: 0,
            marginBottom: 0
        }

    },

    computed: {

        hasAnimation: function hasAnimation(ref) {
            var animation = ref.animation;

            return !!animation[0];
        },

        hasTransition: function hasTransition(ref) {
            var animation = ref.animation;

            return this.hasAnimation && animation[0] === true;
        }

    },

    methods: {

        toggleElement: function toggleElement(targets, show, animate) {
            var this$1 = this;

            return new Promise(function (resolve) {

                targets = toNodes(targets);

                var all = function (targets) { return Promise.all(targets.map(function (el) { return this$1._toggleElement(el, show, animate); })); };
                var toggled = targets.filter(function (el) { return this$1.isToggled(el); });
                var untoggled = targets.filter(function (el) { return !includes(toggled, el); });

                var p;

                if (!this$1.queued || !isUndefined(animate) || !isUndefined(show) || !this$1.hasAnimation || targets.length < 2) {

                    p = all(untoggled.concat(toggled));

                } else {

                    var body = doc.body;
                    var scroll = body.scrollTop;
                    var el = toggled[0];
                    var inProgress = Animation.inProgress(el) && hasClass(el, 'uk-animation-leave')
                            || Transition.inProgress(el) && el.style.height === '0px';

                    p = all(toggled);

                    if (!inProgress) {
                        p = p.then(function () {
                            var p = all(untoggled);
                            body.scrollTop = scroll;
                            return p;
                        });
                    }

                }

                p.then(resolve, noop);

            });
        },

        toggleNow: function toggleNow(targets, show) {
            var this$1 = this;

            return new Promise(function (resolve) { return Promise.all(toNodes(targets).map(function (el) { return this$1._toggleElement(el, show, false); })).then(resolve, noop); });
        },

        isToggled: function isToggled(el) {
            var nodes = toNodes(el || this.$el);
            return this.cls
                ? hasClass(nodes, this.cls.split(' ')[0])
                : !hasAttr(nodes, 'hidden');
        },

        updateAria: function updateAria(el) {
            if (this.cls === false) {
                attr(el, 'aria-hidden', !this.isToggled(el));
            }
        },

        _toggleElement: function _toggleElement(el, show, animate) {
            var this$1 = this;


            show = isBoolean(show)
                ? show
                : Animation.inProgress(el)
                    ? hasClass(el, 'uk-animation-leave')
                    : Transition.inProgress(el)
                        ? el.style.height === '0px'
                        : !this.isToggled(el);

            if (!trigger(el, ("before" + (show ? 'show' : 'hide')), [this])) {
                return Promise.reject();
            }

            var promise = (animate === false || !this.hasAnimation
                ? this._toggleImmediate
                : this.hasTransition
                    ? this._toggleHeight
                    : this._toggleAnimation
            )(el, show);

            trigger(el, show ? 'show' : 'hide', [this]);

            return promise.then(function () {
                trigger(el, show ? 'shown' : 'hidden', [this$1]);
                UIkit$1.update(null, el);
            });
        },

        _toggle: function _toggle(el, toggled) {

            if (!el) {
                return;
            }

            if (this.cls) {
                toggleClass(el, this.cls, includes(this.cls, ' ') ? undefined : toggled);
            } else {
                attr(el, 'hidden', !toggled ? '' : null);
            }

            $$('[autofocus]', el).some(function (el) { return isVisible(el) && (el.focus() || true); });

            this.updateAria(el);
            UIkit$1.update(null, el);
        },

        _toggleImmediate: function _toggleImmediate(el, show) {
            this._toggle(el, show);
            return Promise.resolve();
        },

        _toggleHeight: function _toggleHeight(el, show) {
            var this$1 = this;


            var inProgress = Transition.inProgress(el);
            var inner = el.hasChildNodes ? toFloat(css(el.firstElementChild, 'marginTop')) + toFloat(css(el.lastElementChild, 'marginBottom')) : 0;
            var currentHeight = isVisible(el) ? height(el) + (inProgress ? 0 : inner) : 0;

            Transition.cancel(el);

            if (!this.isToggled(el)) {
                this._toggle(el, true);
            }

            height(el, '');

            // Update child components first
            fastdom.flush();

            var endHeight = height(el) + (inProgress ? 0 : inner);
            height(el, currentHeight);

            return (show
                ? Transition.start(el, assign({}, this.initProps, {overflow: 'hidden', height: endHeight}), Math.round(this.duration * (1 - currentHeight / endHeight)), this.transition)
                : Transition.start(el, this.hideProps, Math.round(this.duration * (currentHeight / endHeight)), this.transition).then(function () { return this$1._toggle(el, false); })
            ).then(function () { return css(el, this$1.initProps); });

        },

        _toggleAnimation: function _toggleAnimation(el, show) {
            var this$1 = this;


            Animation.cancel(el);

            if (show) {
                this._toggle(el, true);
                return Animation.in(el, this.animation[0], this.duration, this.origin);
            }

            return Animation.out(el, this.animation[1] || this.animation[0], this.duration, this.origin).then(function () { return this$1._toggle(el, false); });
        }

    }

};

var active;

var Modal = {

    mixins: [Class, Container, Togglable],

    props: {
        clsPanel: String,
        selClose: String,
        escClose: Boolean,
        bgClose: Boolean,
        stack: Boolean
    },

    defaults: {
        cls: 'uk-open',
        escClose: true,
        bgClose: true,
        overlay: true,
        stack: false
    },

    computed: {

        panel: function panel(ref, $el) {
            var clsPanel = ref.clsPanel;

            return $(("." + clsPanel), $el);
        },

        transitionElement: function transitionElement() {
            return this.panel;
        },

        transitionDuration: function transitionDuration() {
            return toMs(css(this.transitionElement, 'transitionDuration'));
        }

    },

    events: [

        {

            name: 'click',

            delegate: function delegate() {
                return this.selClose;
            },

            handler: function handler(e) {
                e.preventDefault();
                this.hide();
            }

        },

        {

            name: 'toggle',

            self: true,

            handler: function handler(e) {

                if (e.defaultPrevented) {
                    return;
                }

                e.preventDefault();
                this.toggle();
            }

        },

        {
            name: 'beforeshow',

            self: true,

            handler: function handler(e) {

                var prev = active && active !== this && active;

                active = this;

                if (prev) {
                    if (this.stack) {
                        this.prev = prev;
                    } else {
                        prev.hide().then(this.show);
                        e.preventDefault();
                        return;
                    }
                }

                registerEvents();

            }

        },

        {
            name: 'beforehide',

            self: true,

            handler: function handler() {

                active = active && active !== this && active || this.prev;

                if (!active) {
                    deregisterEvents();
                }

            }

        },

        {

            name: 'show',

            self: true,

            handler: function handler() {

                if (!hasClass(docEl, this.clsPage)) {
                    this.scrollbarWidth = width(win) - docEl.offsetWidth;
                    css(doc.body, 'overflowY', this.scrollbarWidth && this.overlay ? 'scroll' : '');
                }

                addClass(docEl, this.clsPage);

            }

        },

        {

            name: 'hidden',

            self: true,

            handler: function handler() {
                var this$1 = this;


                var found;
                var ref = this;
                var prev = ref.prev;

                while (prev) {

                    if (prev.clsPage === this$1.clsPage) {
                        found = true;
                        break;
                    }

                    prev = prev.prev;

                }

                if (!found) {
                    removeClass(docEl, this.clsPage);

                }

                !this.prev && css(doc.body, 'overflowY', '');
            }

        }

    ],

    methods: {

        toggle: function toggle() {
            return this.isToggled() ? this.hide() : this.show();
        },

        show: function show() {

            if (this.isToggled()) {
                return;
            }

            if (this.container && this.$el.parentNode !== this.container) {
                append(this.container, this.$el);
                this._callConnected();
            }

            return this.toggleNow(this.$el, true);
        },

        hide: function hide() {
            if (this.isToggled()) {
                return this.toggleNow(this.$el, false);
            }
        },

        getActive: function getActive() {
            return active;
        },

        _toggleImmediate: function _toggleImmediate(el, show) {
            var this$1 = this;

            return new Promise(function (resolve) { return requestAnimationFrame(function () {
                    this$1._toggle(el, show);

                    if (this$1.transitionDuration) {
                        once(this$1.transitionElement, 'transitionend', resolve, false, function (e) { return e.target === this$1.transitionElement; });
                    } else {
                        resolve();
                    }
                }); }
            );
        }

    }

};

var events;

function registerEvents() {

    if (events) {
        return;
    }

    events = [
        on(docEl, 'click', function (ref) {
            var target = ref.target;
            var defaultPrevented = ref.defaultPrevented;

            if (active && active.bgClose && !defaultPrevented && !within(target, (active.panel || active.$el))) {
                active.hide();
            }
        }),
        on(doc, 'keydown', function (e) {
            if (e.keyCode === 27 && active && active.escClose) {
                e.preventDefault();
                active.hide();
            }
        })
    ];
}

function deregisterEvents() {
    events && events.forEach(function (unbind) { return unbind(); });
    events = null;
}

var Position = {

    props: {
        pos: String,
        offset: null,
        flip: Boolean,
        clsPos: String
    },

    defaults: {
        pos: ("bottom-" + (!isRtl ? 'left' : 'right')),
        flip: true,
        offset: false,
        clsPos: ''
    },

    computed: {

        pos: function pos(ref) {
            var pos = ref.pos;

            return (pos + (!includes(pos, '-') ? '-center' : '')).split('-');
        },

        dir: function dir() {
            return this.pos[0];
        },

        align: function align() {
            return this.pos[1];
        }

    },

    methods: {

        positionAt: function positionAt$1(element, target, boundary) {

            removeClasses(element, ((this.clsPos) + "-(top|bottom|left|right)(-[a-z]+)?"));
            css(element, {top: '', left: ''});

            var node;
            var ref = this;
            var offset$$1 = ref.offset;

            offset$$1 = isNumeric(offset$$1)
                ? offset$$1
                : (node = $(offset$$1))
                    ? offset(node)[axis === 'x' ? 'left' : 'top'] - offset(target)[axis === 'x' ? 'right' : 'bottom']
                    : 0;

            var axis = this.getAxis();
            var ref$1 = positionAt(
                element,
                target,
                axis === 'x' ? ((flipPosition(this.dir)) + " " + (this.align)) : ((this.align) + " " + (flipPosition(this.dir))),
                axis === 'x' ? ((this.dir) + " " + (this.align)) : ((this.align) + " " + (this.dir)),
                axis === 'x' ? ("" + (this.dir === 'left' ? -offset$$1 : offset$$1)) : (" " + (this.dir === 'top' ? -offset$$1 : offset$$1)),
                null,
                this.flip,
                boundary
            ).target;
            var x = ref$1.x;
            var y = ref$1.y;

            this.dir = axis === 'x' ? x : y;
            this.align = axis === 'x' ? y : x;

            toggleClass(element, ((this.clsPos) + "-" + (this.dir) + "-" + (this.align)), this.offset === false);

        },

        getAxis: function getAxis() {
            return this.dir === 'top' || this.dir === 'bottom' ? 'y' : 'x';
        }

    }

};

var mixin = function (UIkit) {

    UIkit.mixin.class = Class;
    UIkit.mixin.container = Container;
    UIkit.mixin.modal = Modal;
    UIkit.mixin.position = Position;
    UIkit.mixin.togglable = Togglable;

};

var Accordion = function (UIkit) {

    UIkit.component('accordion', {

        mixins: [Class, Togglable],

        props: {
            targets: String,
            active: null,
            collapsible: Boolean,
            multiple: Boolean,
            toggle: String,
            content: String,
            transition: String
        },

        defaults: {
            targets: '> *',
            active: false,
            animation: [true],
            collapsible: true,
            multiple: false,
            clsOpen: 'uk-open',
            toggle: '> .uk-accordion-title',
            content: '> .uk-accordion-content',
            transition: 'ease'
        },

        computed: {

            items: function items(ref, $el) {
                var targets = ref.targets;

                return $$(targets, $el);
            }

        },

        events: [

            {

                name: 'click',

                delegate: function delegate() {
                    return ((this.targets) + " " + (this.$props.toggle));
                },

                handler: function handler(e) {
                    e.preventDefault();
                    this.toggle(index($$(((this.targets) + " " + (this.$props.toggle)), this.$el), e.current));
                }

            }

        ],

        connected: function connected() {

            if (this.active === false) {
                return;
            }

            var active = this.items[Number(this.active)];
            if (active && !hasClass(active, this.clsOpen)) {
                this.toggle(active, false);
            }
        },

        update: function update() {
            var this$1 = this;


            this.items.forEach(function (el) { return this$1._toggleImmediate($(this$1.content, el), hasClass(el, this$1.clsOpen)); });

            var active = !this.collapsible && !hasClass(this.items, this.clsOpen) && this.items[0];
            if (active) {
                this.toggle(active, false);
            }
        },

        methods: {

            toggle: function toggle(item, animate) {
                var this$1 = this;


                var index = getIndex(item, this.items);
                var active = filter(this.items, ("." + (this.clsOpen)));

                item = this.items[index];

                item && [item]
                    .concat(!this.multiple && !includes(active, item) && active || [])
                    .forEach(function (el) {

                        var isItem = el === item;
                        var state = isItem && !hasClass(el, this$1.clsOpen);

                        if (!state && isItem && !this$1.collapsible && active.length < 2) {
                            return;
                        }

                        toggleClass(el, this$1.clsOpen, state);

                        var content = el._wrapper ? el._wrapper.firstElementChild : $(this$1.content, el);

                        if (!el._wrapper) {
                            el._wrapper = wrapAll(content, '<div>');
                            attr(el._wrapper, 'hidden', state ? '' : null);
                        }

                        this$1._toggleImmediate(content, true);
                        this$1.toggleElement(el._wrapper, state, animate).then(function () {
                            if (hasClass(el, this$1.clsOpen) === state) {

                                if (!state) {
                                    this$1._toggleImmediate(content, false);
                                }

                                el._wrapper = null;
                                unwrap(content);
                            }
                        });

                    });
            }

        }

    });

};

var Alert = function (UIkit) {

    UIkit.component('alert', {

        attrs: true,

        mixins: [Class, Togglable],

        args: 'animation',

        props: {
            close: String
        },

        defaults: {
            animation: [true],
            selClose: '.uk-alert-close',
            duration: 150,
            hideProps: assign({opacity: 0}, Togglable.defaults.hideProps)
        },

        events: [

            {

                name: 'click',

                delegate: function delegate() {
                    return this.selClose;
                },

                handler: function handler(e) {
                    e.preventDefault();
                    this.close();
                }

            }

        ],

        methods: {

            close: function close() {
                var this$1 = this;

                this.toggleElement(this.$el).then(function () { return this$1.$destroy(true); });
            }

        }

    });

};

var Core = function (UIkit) {

    ready(function () {

        var scroll = 0;
        var started = 0;

        on(win, 'load resize', UIkit.update);
        on(win, 'scroll', function (e) {
            e.dir = scroll <= win.pageYOffset ? 'down' : 'up';
            e.scrollY = scroll = win.pageYOffset;
            UIkit.update(e);
        });

        on(doc, 'animationstart', function (ref) {
            var target = ref.target;

            if ((css(target, 'animationName') || '').match(/^uk-.*(left|right)/)) {
                started++;
                doc.body.style.overflowX = 'hidden';
                setTimeout(function () {
                    if (!--started) {
                        doc.body.style.overflowX = '';
                    }
                }, toMs(css(target, 'animationDuration')) + 100);
            }
        }, true);

        if (!hasTouch) {
            return;
        }

        var cls = 'uk-hover';

        on(doc, 'tap', function (ref) {
                var target = ref.target;

                return $$(("." + cls)).forEach(function (el) { return !within(target, el) && removeClass(el, cls); }
            );
        }
        );

        Object.defineProperty(UIkit, 'hoverSelector', {

            set: function set(selector) {
                on(doc, 'tap', selector, function (ref) {
                    var current = ref.current;

                    return addClass(current, cls);
                });
            }

        });

        UIkit.hoverSelector = '.uk-animation-toggle, .uk-transition-toggle, [uk-hover]';

    });

};

var Cover = function (UIkit) {

    UIkit.component('cover', {

        mixins: [Class, UIkit.components.video.options],

        props: {
            width: Number,
            height: Number
        },

        defaults: {
            automute: true
        },

        update: {

            write: function write() {

                var el = this.$el;

                if (!isVisible(el)) {
                    return;
                }

                var ref = el.parentNode;
                var height = ref.offsetHeight;
                var width = ref.offsetWidth;

                css(
                    css(el, {width: '', height: ''}),
                    Dimensions.cover(
                        {
                            width: this.width || el.clientWidth,
                            height: this.height || el.clientHeight
                        },
                        {
                            width: width + (width % 2 ? 1 : 0),
                            height: height + (height % 2 ? 1 : 0)
                        }
                    )
                );

            },

            events: ['load', 'resize']

        },

        events: {

            loadedmetadata: function loadedmetadata() {
                this.$emit();
            }

        }

    });

};

var Drop = function (UIkit) {

    var active;

    UIkit.component('drop', {

        mixins: [Position, Togglable],

        args: 'pos',

        props: {
            mode: 'list',
            toggle: Boolean,
            boundary: 'query',
            boundaryAlign: Boolean,
            delayShow: Number,
            delayHide: Number,
            clsDrop: String
        },

        defaults: {
            mode: ['click', 'hover'],
            toggle: true,
            boundary: win,
            boundaryAlign: false,
            delayShow: 0,
            delayHide: 800,
            clsDrop: false,
            hoverIdle: 200,
            animation: ['uk-animation-fade'],
            cls: 'uk-open'
        },

        computed: {

            clsDrop: function clsDrop(ref) {
                var clsDrop = ref.clsDrop;

                return clsDrop || ("uk-" + (this.$options.name));
            },

            clsPos: function clsPos() {
                return this.clsDrop;
            }

        },

        init: function init() {
            this.tracker = new MouseTracker();
            addClass(this.$el, this.clsDrop);
        },

        connected: function connected() {

            var ref = this.$props;
            var toggle = ref.toggle;
            this.toggle = toggle && UIkit.toggle(isString(toggle) ? query(toggle, this.$el) : this.$el.previousElementSibling, {
                target: this.$el,
                mode: this.mode
            });

            this.updateAria(this.$el);

        },

        events: [

            {

                name: 'click',

                delegate: function delegate() {
                    return ("." + (this.clsDrop) + "-close");
                },

                handler: function handler(e) {
                    e.preventDefault();
                    this.hide(false);
                }

            },

            {

                name: 'click',

                delegate: function delegate() {
                    return 'a[href^="#"]';
                },

                handler: function handler(e) {

                    if (e.defaultPrevented) {
                        return;
                    }

                    var id = e.target.hash;

                    if (!id) {
                        e.preventDefault();
                    }

                    if (!id || !within(id, this.$el)) {
                        this.hide(false);
                    }
                }

            },

            {

                name: 'beforescroll',

                handler: function handler() {
                    this.hide(false);
                }

            },

            {

                name: 'toggle',

                self: true,

                handler: function handler(e, toggle) {

                    e.preventDefault();

                    if (this.isToggled()) {
                        this.hide(false);
                    } else {
                        this.show(toggle, false);
                    }
                }

            },

            {

                name: pointerEnter,

                filter: function filter() {
                    return includes(this.mode, 'hover');
                },

                handler: function handler(e) {

                    if (isTouch(e)) {
                        return;
                    }

                    if (active
                        && active !== this
                        && active.toggle
                        && includes(active.toggle.mode, 'hover')
                        && !within(e.target, active.toggle.$el)
                        && !pointInRect({x: e.pageX, y: e.pageY}, offset(active.$el))
                    ) {
                        active.hide(false);
                    }

                    e.preventDefault();
                    this.show(this.toggle);
                }

            },

            {

                name: 'toggleshow',

                handler: function handler(e, toggle) {

                    if (toggle && !includes(toggle.target, this.$el)) {
                        return;
                    }

                    e.preventDefault();
                    this.show(toggle || this.toggle);
                }

            },

            {

                name: ("togglehide " + pointerLeave),

                handler: function handler(e, toggle) {

                    if (isTouch(e) || toggle && !includes(toggle.target, this.$el)) {
                        return;
                    }

                    e.preventDefault();

                    if (this.toggle && includes(this.toggle.mode, 'hover')) {
                        this.hide();
                    }
                }

            },

            {

                name: 'beforeshow',

                self: true,

                handler: function handler() {
                    this.clearTimers();
                    this.position();
                }

            },

            {

                name: 'show',

                self: true,

                handler: function handler() {
                    this.tracker.init();
                    addClass(this.toggle.$el, this.cls);
                    attr(this.toggle.$el, 'aria-expanded', 'true');
                    registerEvent();
                }

            },

            {

                name: 'beforehide',

                self: true,

                handler: function handler() {
                    this.clearTimers();
                }

            },

            {

                name: 'hide',

                handler: function handler(ref) {
                    var target = ref.target;


                    if (this.$el !== target) {
                        active = active === null && within(target, this.$el) && this.isToggled() ? this : active;
                        return;
                    }

                    active = this.isActive() ? null : active;
                    removeClass(this.toggle.$el, this.cls);
                    attr(this.toggle.$el, 'aria-expanded', 'false');
                    this.toggle.$el.blur();
                    $$('a, button', this.toggle.$el).forEach(function (el) { return el.blur(); });
                    this.tracker.cancel();
                }

            }

        ],

        update: {

            write: function write() {

                if (this.isToggled() && !Animation.inProgress(this.$el)) {
                    this.position();
                }

            },

            events: ['resize']

        },

        methods: {

            show: function show(toggle, delay) {
                var this$1 = this;
                if ( delay === void 0 ) delay = true;


                var show = function () { return !this$1.isToggled() && this$1.toggleElement(this$1.$el, true); };
                var tryShow = function () {

                    this$1.toggle = toggle || this$1.toggle;

                    this$1.clearTimers();

                    if (this$1.isActive()) {
                        return;
                    } else if (delay && active && active !== this$1 && active.isDelaying) {
                        this$1.showTimer = setTimeout(this$1.show, 10);
                        return;
                    } else if (this$1.isParentOf(active)) {

                        if (active.hideTimer) {
                            active.hide(false);
                        } else {
                            return;
                        }

                    } else if (active && !this$1.isChildOf(active) && !this$1.isParentOf(active)) {

                        var prev;
                        while (active && active !== prev && !this$1.isChildOf(active)) {
                            prev = active;
                            active.hide(false);
                        }

                    }

                    if (delay && this$1.delayShow) {
                        this$1.showTimer = setTimeout(show, this$1.delayShow);
                    } else {
                        show();
                    }

                    active = this$1;
                };

                if (toggle && this.toggle && toggle.$el !== this.toggle.$el) {

                    once(this.$el, 'hide', tryShow);
                    this.hide(false);

                } else {
                    tryShow();
                }
            },

            hide: function hide(delay) {
                var this$1 = this;
                if ( delay === void 0 ) delay = true;


                var hide = function () { return this$1.toggleNow(this$1.$el, false); };

                this.clearTimers();

                this.isDelaying = this.tracker.movesTo(this.$el);

                if (delay && this.isDelaying) {
                    this.hideTimer = setTimeout(this.hide, this.hoverIdle);
                } else if (delay && this.delayHide) {
                    this.hideTimer = setTimeout(hide, this.delayHide);
                } else {
                    hide();
                }
            },

            clearTimers: function clearTimers() {
                clearTimeout(this.showTimer);
                clearTimeout(this.hideTimer);
                this.showTimer = null;
                this.hideTimer = null;
                this.isDelaying = false;
            },

            isActive: function isActive() {
                return active === this;
            },

            isChildOf: function isChildOf(drop) {
                return drop && drop !== this && within(this.$el, drop.$el);
            },

            isParentOf: function isParentOf(drop) {
                return drop && drop !== this && within(drop.$el, this.$el);
            },

            position: function position() {

                removeClasses(this.$el, ((this.clsDrop) + "-(stack|boundary)"));
                css(this.$el, {top: '', left: '', display: 'block'});
                toggleClass(this.$el, ((this.clsDrop) + "-boundary"), this.boundaryAlign);

                var boundary = offset(this.boundary);
                var alignTo = this.boundaryAlign ? boundary : offset(this.toggle.$el);

                if (this.align === 'justify') {
                    var prop = this.getAxis() === 'y' ? 'width' : 'height';
                    css(this.$el, prop, alignTo[prop]);
                } else if (this.$el.offsetWidth > Math.max(boundary.right - alignTo.left, alignTo.right - boundary.left)) {
                    addClass(this.$el, ((this.clsDrop) + "-stack"));
                }

                this.positionAt(this.$el, this.boundaryAlign ? this.boundary : this.toggle.$el, this.boundary);

                css(this.$el, 'display', '');

            }

        }

    });

    UIkit.drop.getActive = function () { return active; };

    var registered;

    function registerEvent() {

        if (registered) {
            return;
        }

        registered = true;
        on(docEl, 'click', function (ref) {
            var target = ref.target;
            var defaultPrevented = ref.defaultPrevented;

            var prev;

            if (defaultPrevented) {
                return;
            }

            while (active && active !== prev && !within(target, active.$el) && !(active.toggle && within(target, active.toggle.$el))) {
                prev = active;
                active.hide(false);
            }
        });
    }

};

var Dropdown = function (UIkit) {

    UIkit.component('dropdown', UIkit.components.drop.extend({name: 'dropdown'}));

};

var FormCustom = function (UIkit) {

    UIkit.component('form-custom', {

        mixins: [Class],

        args: 'target',

        props: {
            target: Boolean
        },

        defaults: {
            target: false
        },

        computed: {

            input: function input(_, $el) {
                return $(selInput, $el);
            },

            state: function state() {
                return this.input.nextElementSibling;
            },

            target: function target(ref, $el) {
                var target = ref.target;

                return target && (target === true
                    && this.input.parentNode === $el
                    && this.input.nextElementSibling
                    || query(target, $el));
            }

        },

        update: function update() {

            var ref = this;
            var target = ref.target;
            var input = ref.input;

            if (!target) {
                return;
            }

            var option;

            target[isInput(target) ? 'value' : 'textContent'] = input.files && input.files[0]
                ? input.files[0].name
                : matches(input, 'select') && (option = $$('option', input).filter(function (el) { return el.selected; })[0])
                    ? option.textContent
                    : input.value;

        },

        events: [

            {

                name: 'focusin focusout mouseenter mouseleave',

                delegate: selInput,

                handler: function handler(ref) {
                    var type = ref.type;
                    var current = ref.current;

                    if (current === this.input) {
                        toggleClass(
                            this.state,
                            ("uk-" + (includes(type, 'focus') ? 'focus' : 'hover')),
                            includes(['focusin', 'mouseenter'], type)
                        );
                    }
                }

            },

            {

                name: 'change',

                handler: function handler() {
                    this.$emit();
                }

            }

        ]

    });

};

var Gif = function (UIkit) {

    // Deprecated
    UIkit.component('gif', {

        update: {

            read: function read(data) {

                var inview = isInView(this.$el);

                if (!inview || data.isInView === inview) {
                    return false;
                }

                data.isInView = inview;
            },

            write: function write() {
                this.$el.src = this.$el.src;
            },

            events: ['scroll', 'load', 'resize']
        }

    });

};

var Grid = function (UIkit) {

    UIkit.component('grid', UIkit.components.margin.extend({

        mixins: [Class],

        name: 'grid',

        defaults: {
            margin: 'uk-grid-margin',
            clsStack: 'uk-grid-stack'
        },

        update: {

            write: function write(ref) {
                var stacks = ref.stacks;


                toggleClass(this.$el, this.clsStack, stacks);

            },

            events: ['load', 'resize']

        }

    }));

};

var HeightMatch = function (UIkit) {

    UIkit.component('height-match', {

        args: 'target',

        props: {
            target: String,
            row: Boolean
        },

        defaults: {
            target: '> *',
            row: true
        },

        computed: {

            elements: function elements(ref, $el) {
                var target = ref.target;

                return $$(target, $el);
            }

        },

        update: {

            read: function read() {
                var this$1 = this;


                var lastOffset = false;

                css(this.elements, 'minHeight', '');

                return {
                    rows: !this.row
                        ? [this.match(this.elements)]
                        : this.elements.reduce(function (rows, el) {

                            if (lastOffset !== el.offsetTop) {
                                rows.push([el]);
                            } else {
                                rows[rows.length - 1].push(el);
                            }

                            lastOffset = el.offsetTop;

                            return rows;

                        }, []).map(function (elements) { return this$1.match(elements); })
                };
            },

            write: function write(ref) {
                var rows = ref.rows;


                rows.forEach(function (ref) {
                    var height = ref.height;
                    var elements = ref.elements;

                    return css(elements, 'minHeight', height);
                });

            },

            events: ['load', 'resize']

        },

        methods: {

            match: function match(elements) {

                if (elements.length < 2) {
                    return {};
                }

                var heights = [];
                var max = 0;

                elements
                    .forEach(function (el) {

                        var style, hidden;

                        if (!isVisible(el)) {
                            style = attr(el, 'style');
                            hidden = attr(el, 'hidden');

                            attr(el, {
                                style: ((style || '') + ";display:block !important;"),
                                hidden: null
                            });
                        }

                        max = Math.max(max, el.offsetHeight);
                        heights.push(el.offsetHeight);

                        if (!isUndefined(style)) {
                            attr(el, {style: style, hidden: hidden});
                        }

                    });

                elements = elements.filter(function (el, i) { return heights[i] < max; });

                return {height: max, elements: elements};
            }
        }

    });

};

var HeightViewport = function (UIkit) {

    UIkit.component('height-viewport', {

        props: {
            expand: Boolean,
            offsetTop: Boolean,
            offsetBottom: Boolean,
            minHeight: Number
        },

        defaults: {
            expand: false,
            offsetTop: false,
            offsetBottom: false,
            minHeight: 0
        },

        update: {

            write: function write() {

                css(this.$el, 'boxSizing', 'border-box');

                var viewport = height(win);
                var minHeight, offsetTop = 0;

                if (this.expand) {

                    css(this.$el, {height: '', minHeight: ''});

                    var diff = viewport - offsetHeight(docEl);

                    if (diff > 0) {
                        minHeight = offsetHeight(this.$el) + diff;
                    }

                } else {

                    var ref = offset(this.$el);
                    var top = ref.top;

                    if (top < viewport / 2 && this.offsetTop) {
                        offsetTop += top;
                    }

                    if (this.offsetBottom === true) {

                        offsetTop += offsetHeight(this.$el.nextElementSibling);

                    } else if (isNumeric(this.offsetBottom)) {

                        offsetTop += (viewport / 100) * this.offsetBottom;

                    } else if (this.offsetBottom && endsWith(this.offsetBottom, 'px')) {

                        offsetTop += toFloat(this.offsetBottom);

                    } else if (isString(this.offsetBottom)) {

                        offsetTop += offsetHeight(query(this.offsetBottom, this.$el));

                    }

                    // on mobile devices (iOS and Android) window.innerHeight !== 100vh
                    minHeight = offsetTop ? ("calc(100vh - " + offsetTop + "px)") : '100vh';

                }

                if (!minHeight) {
                    return;
                }

                css(this.$el, {height: '', minHeight: minHeight});

                var elHeight = this.$el.offsetHeight;
                if (this.minHeight && this.minHeight > elHeight) {
                    css(this.$el, 'minHeight', this.minHeight);
                }

                // IE 11 fix (min-height on a flex container won't apply to its flex items)
                if (viewport - offsetTop >= elHeight) {
                    css(this.$el, 'height', minHeight);
                }

            },

            events: ['load', 'resize']

        }

    });

    function offsetHeight(el) {
        return el && el.offsetHeight || 0;
    }

};

var closeIcon = "<svg width=\"14\" height=\"14\" viewBox=\"0 0 14 14\" xmlns=\"http://www.w3.org/2000/svg\"><line fill=\"none\" stroke=\"#000\" stroke-width=\"1.1\" x1=\"1\" y1=\"1\" x2=\"13\" y2=\"13\"/><line fill=\"none\" stroke=\"#000\" stroke-width=\"1.1\" x1=\"13\" y1=\"1\" x2=\"1\" y2=\"13\"/></svg>";

var closeLarge = "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><line fill=\"none\" stroke=\"#000\" stroke-width=\"1.4\" x1=\"1\" y1=\"1\" x2=\"19\" y2=\"19\"/><line fill=\"none\" stroke=\"#000\" stroke-width=\"1.4\" x1=\"19\" y1=\"1\" x2=\"1\" y2=\"19\"/></svg>";

var marker = "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"9\" y=\"4\" width=\"1\" height=\"11\"/><rect x=\"4\" y=\"9\" width=\"11\" height=\"1\"/></svg>";

var navbarToggleIcon = "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><rect y=\"9\" width=\"20\" height=\"2\"/><rect y=\"3\" width=\"20\" height=\"2\"/><rect y=\"15\" width=\"20\" height=\"2\"/></svg>";

var overlayIcon = "<svg width=\"40\" height=\"40\" viewBox=\"0 0 40 40\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"19\" y=\"0\" width=\"1\" height=\"40\"/><rect x=\"0\" y=\"19\" width=\"40\" height=\"1\"/></svg>";

var paginationNext = "<svg width=\"7\" height=\"12\" viewBox=\"0 0 7 12\" xmlns=\"http://www.w3.org/2000/svg\"><polyline fill=\"none\" stroke=\"#000\" stroke-width=\"1.2\" points=\"1 1 6 6 1 11\"/></svg>";

var paginationPrevious = "<svg width=\"7\" height=\"12\" viewBox=\"0 0 7 12\" xmlns=\"http://www.w3.org/2000/svg\"><polyline fill=\"none\" stroke=\"#000\" stroke-width=\"1.2\" points=\"6 1 1 6 6 11\"/></svg>";

var searchIcon = "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><circle fill=\"none\" stroke=\"#000\" stroke-width=\"1.1\" cx=\"9\" cy=\"9\" r=\"7\"/><path fill=\"none\" stroke=\"#000\" stroke-width=\"1.1\" d=\"M14,14 L18,18 L14,14 Z\"/></svg>";

var searchLarge = "<svg width=\"40\" height=\"40\" viewBox=\"0 0 40 40\" xmlns=\"http://www.w3.org/2000/svg\"><circle fill=\"none\" stroke=\"#000\" stroke-width=\"1.8\" cx=\"17.5\" cy=\"17.5\" r=\"16.5\"/><line fill=\"none\" stroke=\"#000\" stroke-width=\"1.8\" x1=\"38\" y1=\"39\" x2=\"29\" y2=\"30\"/></svg>";

var searchNavbar = "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><circle fill=\"none\" stroke=\"#000\" stroke-width=\"1.1\" cx=\"10.5\" cy=\"10.5\" r=\"9.5\"/><line fill=\"none\" stroke=\"#000\" stroke-width=\"1.1\" x1=\"23\" y1=\"23\" x2=\"17\" y2=\"17\"/></svg>";

var slidenavNext = "<svg width=\"14px\" height=\"24px\" viewBox=\"0 0 14 24\" xmlns=\"http://www.w3.org/2000/svg\"><polyline fill=\"none\" stroke=\"#000\" stroke-width=\"1.4\" points=\"1.225,23 12.775,12 1.225,1 \"/></svg>";

var slidenavNextLarge = "<svg width=\"25px\" height=\"40px\" viewBox=\"0 0 25 40\" xmlns=\"http://www.w3.org/2000/svg\"><polyline fill=\"none\" stroke=\"#000\" stroke-width=\"2\" points=\"4.002,38.547 22.527,20.024 4,1.5 \"/></svg>";

var slidenavPrevious = "<svg width=\"14px\" height=\"24px\" viewBox=\"0 0 14 24\" xmlns=\"http://www.w3.org/2000/svg\"><polyline fill=\"none\" stroke=\"#000\" stroke-width=\"1.4\" points=\"12.775,1 1.225,12 12.775,23 \"/></svg>";

var slidenavPreviousLarge = "<svg width=\"25px\" height=\"40px\" viewBox=\"0 0 25 40\" xmlns=\"http://www.w3.org/2000/svg\"><polyline fill=\"none\" stroke=\"#000\" stroke-width=\"2\" points=\"20.527,1.5 2,20.024 20.525,38.547 \"/></svg>";

var spinner = "<svg width=\"30\" height=\"30\" viewBox=\"0 0 30 30\" xmlns=\"http://www.w3.org/2000/svg\"><circle fill=\"none\" stroke=\"#000\" cx=\"15\" cy=\"15\" r=\"14\"/></svg>";

var totop = "<svg width=\"18\" height=\"10\" viewBox=\"0 0 18 10\" xmlns=\"http://www.w3.org/2000/svg\"><polyline fill=\"none\" stroke=\"#000\" stroke-width=\"1.2\" points=\"1 9 9 1 17 9 \"/></svg>";

var Icon = function (UIkit) {

    var parsed = {};
    var icons = {
        spinner: spinner,
        totop: totop,
        marker: marker,
        'close-icon': closeIcon,
        'close-large': closeLarge,
        'navbar-toggle-icon': navbarToggleIcon,
        'overlay-icon': overlayIcon,
        'pagination-next': paginationNext,
        'pagination-previous': paginationPrevious,
        'search-icon': searchIcon,
        'search-large': searchLarge,
        'search-navbar': searchNavbar,
        'slidenav-next': slidenavNext,
        'slidenav-next-large': slidenavNextLarge,
        'slidenav-previous': slidenavPrevious,
        'slidenav-previous-large': slidenavPreviousLarge
    };

    UIkit.component('icon', UIkit.components.svg.extend({

        attrs: ['icon', 'ratio'],

        mixins: [Class],

        name: 'icon',

        args: 'icon',

        props: ['icon'],

        defaults: {exclude: ['id', 'style', 'class', 'src', 'icon']},

        init: function init() {
            addClass(this.$el, 'uk-icon');

            if (isRtl) {
                this.icon = swap(swap(this.icon, 'left', 'right'), 'previous', 'next');
            }
        },

        methods: {

            getSvg: function getSvg() {

                var icon = getIcon(this.icon);

                if (!icon) {
                    return Promise.reject('Icon not found.');
                }

                return Promise.resolve(icon);
            }

        }

    }));

    [
        'marker',
        'navbar-toggle-icon',
        'overlay-icon',
        'pagination-previous',
        'pagination-next',
        'totop'
    ].forEach(function (name) { return registerComponent(name); });

    [
        'slidenav-previous',
        'slidenav-next'
    ].forEach(function (name) { return registerComponent(name, {

        init: function init() {
            addClass(this.$el, 'uk-slidenav');

            if (hasClass(this.$el, 'uk-slidenav-large')) {
                this.icon += '-large';
            }
        }

    }); });

    registerComponent('search-icon', {

        init: function init() {
            if (hasClass(this.$el, 'uk-search-icon') && parents(this.$el, '.uk-search-large').length) {
                this.icon = 'search-large';
            } else if (parents(this.$el, '.uk-search-navbar').length) {
                this.icon = 'search-navbar';
            }
        }

    });

    registerComponent('close', {

        init: function init() {
            this.icon = "close-" + (hasClass(this.$el, 'uk-close-large') ? 'large' : 'icon');
        }

    });

    registerComponent('spinner', {

        connected: function connected() {
            var this$1 = this;

            this.svg.then(function (svg) { return this$1.ratio !== 1 && css($('circle', svg), 'stroke-width', 1 / this$1.ratio); }, noop);
        }

    });

    UIkit.icon.add = function (added) {
        Object.keys(added).forEach(function (name) {
            icons[name] = added[name];
            delete parsed[name];
        });

        if (UIkit._initialized) {
            each(UIkit.instances, function (component) {
                if (component.$options.name === 'icon') {
                    component.$reset();
                }
            });
        }
    };

    function registerComponent(name, mixin$$1) {

        UIkit.component(name, UIkit.components.icon.extend({

            name: name,

            mixins: mixin$$1 ? [mixin$$1] : [],

            defaults: {
                icon: name
            }

        }));
    }

    function getIcon(icon) {

        if (!icons[icon]) {
            return null;
        }

        if (!parsed[icon]) {
            parsed[icon] = $(icons[icon].trim());
        }

        return parsed[icon];
    }

};

var Leader = function (UIkit) {

    UIkit.component('leader', {

        mixins: [Class],

        props: {
            fill: String,
            media: 'media'
        },

        defaults: {
            fill: '',
            media: false,
            clsWrapper: 'uk-leader-fill',
            clsHide: 'uk-leader-hide',
            attrFill: 'data-fill'
        },

        computed: {

            fill: function fill(ref) {
                var fill = ref.fill;

                return fill || getCssVar('leader-fill');
            }

        },

        connected: function connected() {
            var assign;
            (assign = wrapInner(this.$el, ("<span class=\"" + (this.clsWrapper) + "\">")), this.wrapper = assign[0]);
        },

        disconnected: function disconnected() {
            unwrap(this.wrapper.childNodes);
        },

        update: [

            {

                read: function read(ref) {
                    var changed = ref.changed;
                    var width = ref.width;


                    var prev = width;

                    width = Math.floor(this.$el.offsetWidth / 2);

                    return {
                        width: width,
                        changed: changed || prev !== width,
                        hide: this.media && !win.matchMedia(this.media).matches
                    };
                },

                write: function write(data) {

                    toggleClass(this.wrapper, this.clsHide, data.hide);

                    if (data.changed) {
                        data.changed = false;
                        attr(this.wrapper, this.attrFill, new Array(data.width).join(this.fill));
                    }

                },

                events: ['load', 'resize']

            }
        ]
    });

};

var Margin = function (UIkit) {

    UIkit.component('margin', {

        props: {
            margin: String,
            firstColumn: Boolean
        },

        defaults: {
            margin: 'uk-margin-small-top',
            firstColumn: 'uk-first-column'
        },

        update: {

            read: function read(data) {

                var items = this.$el.children;

                if (!items.length || !isVisible(this.$el)) {
                    return data.rows = false;
                }

                data.stacks = true;

                var rows = [[]];

                for (var i = 0; i < items.length; i++) {

                    var el = items[i];
                    var dim = el.getBoundingClientRect();

                    if (!dim.height) {
                        continue;
                    }

                    for (var j = rows.length - 1; j >= 0; j--) {

                        var row = rows[j];

                        if (!row[0]) {
                            row.push(el);
                            break;
                        }

                        var leftDim = row[0].getBoundingClientRect();

                        if (dim.top >= Math.floor(leftDim.bottom)) {
                            rows.push([el]);
                            break;
                        }

                        if (Math.floor(dim.bottom) > leftDim.top) {

                            data.stacks = false;

                            if (dim.left < leftDim.left && !isRtl) {
                                row.unshift(el);
                                break;
                            }

                            row.push(el);
                            break;
                        }

                        if (j === 0) {
                            rows.unshift([el]);
                            break;
                        }

                    }

                }

                data.rows = rows;

            },

            write: function write(ref) {
                var this$1 = this;
                var rows = ref.rows;


                rows.forEach(function (row, i) { return row.forEach(function (el, j) {
                        toggleClass(el, this$1.margin, i !== 0);
                        toggleClass(el, this$1.firstColumn, j === 0);
                    }); }
                );

            },

            events: ['load', 'resize']

        }

    });

};

var Modal$1 = function (UIkit) {

    UIkit.component('modal', {

        mixins: [Modal],

        defaults: {
            clsPage: 'uk-modal-page',
            clsPanel: 'uk-modal-dialog',
            selClose: '.uk-modal-close, .uk-modal-close-default, .uk-modal-close-outside, .uk-modal-close-full'
        },

        events: [

            {
                name: 'show',

                self: true,

                handler: function handler() {

                    if (hasClass(this.panel, 'uk-margin-auto-vertical')) {
                        addClass(this.$el, 'uk-flex');
                    } else {
                        css(this.$el, 'display', 'block');
                    }

                    height(this.$el); // force reflow
                }
            },

            {
                name: 'hidden',

                self: true,

                handler: function handler() {

                    css(this.$el, 'display', '');
                    removeClass(this.$el, 'uk-flex');

                }
            }

        ]

    });

    UIkit.component('overflow-auto', {

        mixins: [Class],

        computed: {

            modal: function modal(_, $el) {
                return closest($el, '.uk-modal');
            },

            panel: function panel(_, $el) {
                return closest($el, '.uk-modal-dialog');
            }

        },

        connected: function connected() {
            css(this.$el, 'minHeight', 150);
        },

        update: {

            write: function write() {

                if (!this.panel || !this.modal) {
                    return;
                }

                var current = css(this.$el, 'maxHeight');

                css(css(this.$el, 'maxHeight', 150), 'maxHeight', Math.max(150, 150 + height(this.modal) - this.panel.offsetHeight));
                if (current !== css(this.$el, 'maxHeight')) {
                    trigger(this.$el, 'resize');
                }
            },

            events: ['load', 'resize']

        }

    });

    UIkit.modal.dialog = function (content, options) {

        var dialog = UIkit.modal((" <div class=\"uk-modal\"> <div class=\"uk-modal-dialog\">" + content + "</div> </div> "), options);

        dialog.show();

        on(dialog.$el, 'hidden', function (ref) {
            var target = ref.target;
            var currentTarget = ref.currentTarget;

            if (target === currentTarget) {
                dialog.$destroy(true);
            }
        });

        return dialog;
    };

    UIkit.modal.alert = function (message, options) {

        options = assign({bgClose: false, escClose: false, labels: UIkit.modal.labels}, options);

        return new Promise(
            function (resolve) { return on(UIkit.modal.dialog((" <div class=\"uk-modal-body\">" + (isString(message) ? message : html(message)) + "</div> <div class=\"uk-modal-footer uk-text-right\"> <button class=\"uk-button uk-button-primary uk-modal-close\" autofocus>" + (options.labels.ok) + "</button> </div> "), options).$el, 'hide', resolve); }
        );
    };

    UIkit.modal.confirm = function (message, options) {

        options = assign({bgClose: false, escClose: true, labels: UIkit.modal.labels}, options);

        return new Promise(function (resolve, reject) {

            var confirm = UIkit.modal.dialog((" <form> <div class=\"uk-modal-body\">" + (isString(message) ? message : html(message)) + "</div> <div class=\"uk-modal-footer uk-text-right\"> <button class=\"uk-button uk-button-default uk-modal-close\" type=\"button\">" + (options.labels.cancel) + "</button> <button class=\"uk-button uk-button-primary\" autofocus>" + (options.labels.ok) + "</button> </div> </form> "), options);

            var resolved = false;

            on(confirm.$el, 'submit', 'form', function (e) {
                e.preventDefault();
                resolve();
                resolved = true;
                confirm.hide();
            });
            on(confirm.$el, 'hide', function () {
                if (!resolved) {
                    reject();
                }
            });

        });
    };

    UIkit.modal.prompt = function (message, value, options) {

        options = assign({bgClose: false, escClose: true, labels: UIkit.modal.labels}, options);

        return new Promise(function (resolve) {

            var prompt = UIkit.modal.dialog((" <form class=\"uk-form-stacked\"> <div class=\"uk-modal-body\"> <label>" + (isString(message) ? message : html(message)) + "</label> <input class=\"uk-input\" autofocus> </div> <div class=\"uk-modal-footer uk-text-right\"> <button class=\"uk-button uk-button-default uk-modal-close\" type=\"button\">" + (options.labels.cancel) + "</button> <button class=\"uk-button uk-button-primary\">" + (options.labels.ok) + "</button> </div> </form> "), options),
                input = $('input', prompt.$el);

            input.value = value;

            var resolved = false;

            on(prompt.$el, 'submit', 'form', function (e) {
                e.preventDefault();
                resolve(input.value);
                resolved = true;
                prompt.hide();
            });
            on(prompt.$el, 'hide', function () {
                if (!resolved) {
                    resolve(null);
                }
            });

        });
    };

    UIkit.modal.labels = {
        ok: 'Ok',
        cancel: 'Cancel'
    };

};

var Nav = function (UIkit) {

    UIkit.component('nav', UIkit.components.accordion.extend({

        name: 'nav',

        defaults: {
            targets: '> .uk-parent',
            toggle: '> a',
            content: '> ul'
        }

    }));

};

var Navbar = function (UIkit) {

    UIkit.component('navbar', {

        mixins: [Class],

        props: {
            dropdown: String,
            mode: 'list',
            align: String,
            offset: Number,
            boundary: Boolean,
            boundaryAlign: Boolean,
            clsDrop: String,
            delayShow: Number,
            delayHide: Number,
            dropbar: Boolean,
            dropbarMode: String,
            dropbarAnchor: 'query',
            duration: Number
        },

        defaults: {
            dropdown: '.uk-navbar-nav > li',
            align: !isRtl ? 'left' : 'right',
            clsDrop: 'uk-navbar-dropdown',
            mode: undefined,
            offset: undefined,
            delayShow: undefined,
            delayHide: undefined,
            boundaryAlign: undefined,
            flip: 'x',
            boundary: true,
            dropbar: false,
            dropbarMode: 'slide',
            dropbarAnchor: false,
            duration: 200,
        },

        computed: {

            boundary: function boundary(ref, $el) {
                var boundary = ref.boundary;
                var boundaryAlign = ref.boundaryAlign;

                return (boundary === true || boundaryAlign) ? $el : boundary;
            },

            pos: function pos(ref) {
                var align = ref.align;

                return ("bottom-" + align);
            }

        },

        beforeConnect: function beforeConnect() {

            var ref = this.$props;
            var dropbar = ref.dropbar;

            this.dropbar = dropbar && (isString(dropbar) && query(dropbar, this.$el) || $('<div></div>'));

            if (this.dropbar) {

                addClass(this.dropbar, 'uk-navbar-dropbar');

                if (this.dropbarMode === 'slide') {
                    addClass(this.dropbar, 'uk-navbar-dropbar-slide');
                }
            }

        },

        disconnected: function disconnected() {
            this.dropbar && remove(this.dropbar);
        },

        update: function update() {

            UIkit.drop(
                $$(((this.dropdown) + " ." + (this.clsDrop)), this.$el).filter(function (el) { return !UIkit.getComponent(el, 'drop') && !UIkit.getComponent(el, 'dropdown'); }),
                assign({}, this.$props, {boundary: this.boundary, pos: this.pos, offset: this.dropbar || this.offset})
            );

        },

        events: [

            {
                name: 'mouseover',

                delegate: function delegate() {
                    return this.dropdown;
                },

                handler: function handler(ref) {
                    var current = ref.current;

                    var active = this.getActive();
                    if (active && active.toggle && !within(active.toggle.$el, current) && !active.tracker.movesTo(active.$el)) {
                        active.hide(false);
                    }
                }

            },

            {
                name: 'mouseleave',

                el: function el() {
                    return this.dropbar;
                },

                handler: function handler() {
                    var active = this.getActive();

                    if (active && !matches(this.dropbar, ':hover')) {
                        active.hide();
                    }
                }
            },

            {
                name: 'beforeshow',

                capture: true,

                filter: function filter() {
                    return this.dropbar;
                },

                handler: function handler() {

                    if (!this.dropbar.parentNode) {
                        after(this.dropbarAnchor || this.$el, this.dropbar);
                    }

                }
            },

            {
                name: 'show',

                capture: true,

                filter: function filter() {
                    return this.dropbar;
                },

                handler: function handler(_, drop) {

                    var $el = drop.$el;

                    this.clsDrop && addClass($el, ((this.clsDrop) + "-dropbar"));

                    this.transitionTo($el.offsetHeight + toFloat(css($el, 'margin-top')) + toFloat(css($el, 'margin-bottom')), $el);
                }
            },

            {
                name: 'beforehide',

                filter: function filter() {
                    return this.dropbar;
                },

                handler: function handler(e, ref) {
                    var $el = ref.$el;


                    var active = this.getActive();

                    if (matches(this.dropbar, ':hover') && active && active.$el === $el) {
                        e.preventDefault();
                    }
                }
            },

            {
                name: 'hide',

                filter: function filter() {
                    return this.dropbar;
                },

                handler: function handler(_, ref) {
                    var $el = ref.$el;


                    var active = this.getActive();

                    if (!active || active && active.$el === $el) {
                        this.transitionTo(0);
                    }
                }
            }

        ],

        methods: {

            getActive: function getActive() {
                var active = UIkit.drop.getActive();
                return active && includes(active.mode, 'hover') && within(active.toggle.$el, this.$el) && active;
            },

            transitionTo: function transitionTo(newHeight, el) {

                var ref = this;
                var dropbar = ref.dropbar;
                var oldHeight = isVisible(dropbar) ? height(dropbar) : 0;

                el = oldHeight < newHeight && el;

                css(el, {height: oldHeight, overflow: 'hidden'});
                height(dropbar, oldHeight);

                Transition.cancel([el, dropbar]);
                return Transition
                    .start([el, dropbar], {height: newHeight}, this.duration)
                    .catch(noop)
                    .finally(function () { return css(el, {height: '', overflow: ''}); });
            }

        }

    });

};

var scroll;

var Offcanvas = function (UIkit) {

    UIkit.component('offcanvas', {

        mixins: [Modal],

        args: 'mode',

        props: {
            content: String,
            mode: String,
            flip: Boolean,
            overlay: Boolean
        },

        defaults: {
            content: '.uk-offcanvas-content',
            mode: 'slide',
            flip: false,
            overlay: false,
            clsPage: 'uk-offcanvas-page',
            clsContainer: 'uk-offcanvas-container',
            clsPanel: 'uk-offcanvas-bar',
            clsFlip: 'uk-offcanvas-flip',
            clsContent: 'uk-offcanvas-content',
            clsContentAnimation: 'uk-offcanvas-content-animation',
            clsSidebarAnimation: 'uk-offcanvas-bar-animation',
            clsMode: 'uk-offcanvas',
            clsOverlay: 'uk-offcanvas-overlay',
            selClose: '.uk-offcanvas-close'
        },

        computed: {

            content: function content(ref) {
                var content = ref.content;

                return $(content) || doc.body;
            },

            clsFlip: function clsFlip(ref) {
                var flip = ref.flip;
                var clsFlip = ref.clsFlip;

                return flip ? clsFlip : '';
            },

            clsOverlay: function clsOverlay(ref) {
                var overlay = ref.overlay;
                var clsOverlay = ref.clsOverlay;

                return overlay ? clsOverlay : '';
            },

            clsMode: function clsMode(ref) {
                var mode = ref.mode;
                var clsMode = ref.clsMode;

                return (clsMode + "-" + mode);
            },

            clsSidebarAnimation: function clsSidebarAnimation(ref) {
                var mode = ref.mode;
                var clsSidebarAnimation = ref.clsSidebarAnimation;

                return mode === 'none' || mode === 'reveal' ? '' : clsSidebarAnimation;
            },

            clsContentAnimation: function clsContentAnimation(ref) {
                var mode = ref.mode;
                var clsContentAnimation = ref.clsContentAnimation;

                return mode !== 'push' && mode !== 'reveal' ? '' : clsContentAnimation;
            },

            transitionElement: function transitionElement(ref) {
                var mode = ref.mode;

                return mode === 'reveal' ? this.panel.parentNode : this.panel;
            }

        },

        update: {

            write: function write() {

                if (this.getActive() === this) {

                    if (this.overlay || this.clsContentAnimation) {
                        width(this.content, width(win) - this.scrollbarWidth);
                    }

                    if (this.overlay) {
                        height(this.content, height(win));
                        if (scroll) {
                            this.content.scrollTop = scroll.y;
                        }
                    }

                }

            },

            events: ['resize']

        },

        events: [

            {

                name: 'click',

                delegate: function delegate() {
                    return 'a[href^="#"]';
                },

                handler: function handler(ref) {
                    var current = ref.current;

                    if (current.hash && $(current.hash, this.content)) {
                        scroll = null;
                        this.hide();
                    }
                }

            },

            {

                name: 'beforescroll',

                filter: function filter() {
                    return this.overlay;
                },

                handler: function handler(e, scroll, target) {
                    if (scroll && target && this.isToggled() && $(target, this.content)) {
                        once(this.$el, 'hidden', function () { return scroll.scrollTo(target); });
                        e.preventDefault();
                    }
                }

            },

            {
                name: 'show',

                self: true,

                handler: function handler() {

                    scroll = scroll || {x: win.pageXOffset, y: win.pageYOffset};

                    if (this.mode === 'reveal' && !hasClass(this.panel, this.clsMode)) {
                        wrapAll(this.panel, '<div>');
                        addClass(this.panel.parentNode, this.clsMode);
                    }

                    css(docEl, 'overflowY', (!this.clsContentAnimation || this.flip) && this.scrollbarWidth && this.overlay ? 'scroll' : '');
                    addClass(doc.body, this.clsContainer, this.clsFlip, this.clsOverlay);
                    height(doc.body); // force reflow
                    addClass(this.content, this.clsContentAnimation);
                    addClass(this.panel, ((this.clsSidebarAnimation) + " " + (this.mode !== 'reveal' ? this.clsMode : '')));
                    addClass(this.$el, this.clsOverlay);
                    css(this.$el, 'display', 'block');
                    height(this.$el); // force reflow

                }
            },

            {
                name: 'hide',

                self: true,

                handler: function handler() {
                    removeClass(this.content, this.clsContentAnimation);

                    var active = this.getActive();
                    if (this.mode === 'none' || active && active !== this && active !== this.prev) {
                        trigger(this.panel, 'transitionend');
                    }
                }
            },

            {
                name: 'hidden',

                self: true,

                handler: function handler() {

                    if (this.mode === 'reveal') {
                        unwrap(this.panel);
                    }

                    if (!this.overlay) {
                        scroll = {x: win.pageXOffset, y: win.pageYOffset};
                    } else if (!scroll) {
                        var ref = this.content;
                        var x = ref.scrollLeft;
                        var y = ref.scrollTop;
                        scroll = {x: x, y: y};
                    }

                    removeClass(this.panel, this.clsSidebarAnimation, this.clsMode);
                    removeClass(this.$el, this.clsOverlay);
                    css(this.$el, 'display', '');
                    removeClass(doc.body, this.clsContainer, this.clsFlip, this.clsOverlay);
                    doc.body.scrollTop = scroll.y;

                    css(docEl, 'overflow-y', '');

                    width(this.content, '');
                    height(this.content, '');

                    win.scrollTo(scroll.x, scroll.y);

                    scroll = null;

                }
            },

            {
                name: 'swipeLeft swipeRight',

                handler: function handler(e) {

                    if (this.isToggled() && isTouch(e) && (e.type === 'swipeLeft' && !this.flip || e.type === 'swipeRight' && this.flip)) {
                        this.hide();
                    }

                }
            }

        ]

    });

};

var Responsive = function (UIkit) {

    UIkit.component('responsive', {

        props: ['width', 'height'],

        init: function init() {
            addClass(this.$el, 'uk-responsive-width');
        },

        update: {

            read: function read() {
                return isVisible(this.$el) && this.width && this.height
                    ? {width: width(this.$el.parentNode), height: this.height}
                    : false;
            },

            write: function write(dim) {
                height(this.$el, Dimensions.contain({height: this.height, width: this.width}, dim).height);
            },

            events: ['load', 'resize']

        }

    });

};

var Scroll = function (UIkit) {

    UIkit.component('scroll', {

        props: {
            duration: Number,
            offset: Number
        },

        defaults: {
            duration: 1000,
            offset: 0
        },

        methods: {

            scrollTo: function scrollTo(el) {
                var this$1 = this;


                el = el && $(el) || doc.body;

                var docHeight = height(doc);
                var winHeight = height(win);

                var target = offset(el).top - this.offset;
                if (target + winHeight > docHeight) {
                    target = docHeight - winHeight;
                }

                if (!trigger(this.$el, 'beforescroll', [this, el])) {
                    return;
                }

                var start = Date.now();
                var startY = win.pageYOffset;
                var step = function () {

                    var currentY = startY + (target - startY) * ease(clamp((Date.now() - start) / this$1.duration));

                    win.scrollTo(win.pageXOffset, currentY);

                    // scroll more if we have not reached our destination
                    if (currentY !== target) {
                        requestAnimationFrame(step);
                    } else {
                        trigger(this$1.$el, 'scrolled', [this$1, el]);
                    }

                };

                step();

            }

        },

        events: {

            click: function click(e) {

                if (e.defaultPrevented) {
                    return;
                }

                e.preventDefault();
                this.scrollTo(escape(this.$el.hash).substr(1));
            }

        }

    });

    function ease(k) {
        return 0.5 * (1 - Math.cos(Math.PI * k));
    }

};

var Scrollspy = function (UIkit) {

    UIkit.component('scrollspy', {

        args: 'cls',

        props: {
            cls: 'list',
            target: String,
            hidden: Boolean,
            offsetTop: Number,
            offsetLeft: Number,
            repeat: Boolean,
            delay: Number
        },

        defaults: {
            cls: [],
            target: false,
            hidden: true,
            offsetTop: 0,
            offsetLeft: 0,
            repeat: false,
            delay: 0,
            inViewClass: 'uk-scrollspy-inview'
        },

        computed: {

            elements: function elements(ref, $el) {
                var target = ref.target;

                return target ? $$(target, $el) : [$el];
            }

        },

        update: [

            {

                write: function write() {
                    if (this.hidden) {
                        css(filter(this.elements, (":not(." + (this.inViewClass) + ")")), 'visibility', 'hidden');
                    }
                }

            },

            {

                read: function read(els) {
                    var this$1 = this;


                    // Let child components be applied at least once first
                    if (!UIkit._initialized) {

                        if (doc.readyState === 'complete') {
                            requestAnimationFrame(function () { return this$1.$emit(); });
                        }

                        return false;
                    }

                    this.elements.forEach(function (el, i) {

                        var elData = els[i];

                        if (!elData || elData.el !== el) {
                            var cls = data(el, 'uk-scrollspy-class');
                            elData = {el: el, toggles: cls && cls.split(',') || this$1.cls};
                        }

                        elData.show = isInView(el, this$1.offsetTop, this$1.offsetLeft);
                        els[i] = elData;

                    });
                },

                write: function write(els) {
                    var this$1 = this;


                    var index = this.elements.length === 1 ? 1 : 0;

                    this.elements.forEach(function (el, i) {

                        var elData = els[i];
                        var cls = elData.toggles[i] || elData.toggles[0];

                        if (elData.show && !elData.inview && !elData.timer) {

                            var show = function () {
                                css(el, 'visibility', '');
                                addClass(el, this$1.inViewClass);
                                toggleClass(el, cls);

                                trigger(el, 'inview');

                                UIkit.update(null, el);

                                elData.inview = true;
                                delete elData.timer;
                            };

                            if (this$1.delay && index) {
                                elData.timer = setTimeout(show, this$1.delay * index);
                            } else {
                                show();
                            }

                            index++;

                        } else if (!elData.show && elData.inview && this$1.repeat) {

                            if (elData.timer) {
                                clearTimeout(elData.timer);
                                delete elData.timer;
                            }

                            css(el, 'visibility', this$1.hidden ? 'hidden' : '');
                            removeClass(el, this$1.inViewClass);
                            toggleClass(el, cls);

                            trigger(el, 'outview');

                            UIkit.update(null, el);

                            elData.inview = false;

                        }


                    });

                },

                events: ['scroll', 'load', 'resize']

            }

        ]

    });

};

var ScrollspyNav = function (UIkit) {

    UIkit.component('scrollspy-nav', {

        props: {
            cls: String,
            closest: String,
            scroll: Boolean,
            overflow: Boolean,
            offset: Number
        },

        defaults: {
            cls: 'uk-active',
            closest: false,
            scroll: false,
            overflow: true,
            offset: 0
        },

        computed: {

            links: function links(_, $el) {
                return $$('a[href^="#"]', $el).filter(function (el) { return el.hash; });
            },

            elements: function elements() {
                return this.closest ? closest(this.links, this.closest) : this.links;
            },

            targets: function targets() {
                return $$(this.links.map(function (el) { return el.hash; }).join(','));
            }

        },

        update: [

            {

                read: function read() {
                    if (this.scroll) {
                        UIkit.scroll(this.links, {offset: this.offset || 0});
                    }
                }

            },

            {

                read: function read(data) {
                    var this$1 = this;


                    var scroll = win.pageYOffset + this.offset + 1;
                    var max = height(doc) - height(win) + this.offset;

                    data.active = false;

                    this.targets.every(function (el, i) {

                        var ref = offset(el);
                        var top = ref.top;
                        var last = i + 1 === this$1.targets.length;

                        if (!this$1.overflow && (i === 0 && top > scroll || last && top + el.offsetTop < scroll)) {
                            return false;
                        }

                        if (!last && offset(this$1.targets[i + 1]).top <= scroll) {
                            return true;
                        }

                        if (scroll >= max) {
                            for (var j = this$1.targets.length - 1; j > i; j--) {
                                if (isInView(this$1.targets[j])) {
                                    el = this$1.targets[j];
                                    break;
                                }
                            }
                        }

                        return !(data.active = $(filter(this$1.links, ("[href=\"#" + (el.id) + "\"]"))));

                    });

                },

                write: function write(ref) {
                    var active = ref.active;


                    this.links.forEach(function (el) { return el.blur(); });
                    removeClass(this.elements, this.cls);

                    if (active) {
                        trigger(this.$el, 'active', [active, addClass(this.closest ? closest(active, this.closest) : active, this.cls)]);
                    }

                },

                events: ['scroll', 'load', 'resize']

            }

        ]

    });

};

var Sticky = function (UIkit) {

    UIkit.component('sticky', {

        mixins: [Class],

        attrs: true,

        props: {
            top: null,
            bottom: Boolean,
            offset: Number,
            animation: String,
            clsActive: String,
            clsInactive: String,
            clsFixed: String,
            clsBelow: String,
            selTarget: String,
            widthElement: 'query',
            showOnUp: Boolean,
            media: 'media',
            target: Number
        },

        defaults: {
            top: 0,
            bottom: false,
            offset: 0,
            animation: '',
            clsActive: 'uk-active',
            clsInactive: '',
            clsFixed: 'uk-sticky-fixed',
            clsBelow: 'uk-sticky-below',
            selTarget: '',
            widthElement: false,
            showOnUp: false,
            media: false,
            target: false
        },

        computed: {

            selTarget: function selTarget(ref, $el) {
                var selTarget = ref.selTarget;

                return selTarget && $(selTarget, $el) || $el;
            }

        },

        connected: function connected() {

            this.placeholder = $('<div class="uk-sticky-placeholder"></div>');
            this.widthElement = this.$props.widthElement || this.placeholder;

            if (!this.isActive) {
                this.hide();
            }
        },

        disconnected: function disconnected() {

            if (this.isActive) {
                this.isActive = false;
                this.hide();
                removeClass(this.selTarget, this.clsInactive);
            }

            remove(this.placeholder);
            this.placeholder = null;
            this.widthElement = null;
        },

        ready: function ready() {
            var this$1 = this;


            if (!(this.target && location.hash && win.pageYOffset > 0)) {
                return;
            }

            var target = $(location.hash);

            if (target) {
                fastdom.read(function () {

                    var ref = offset(target);
                    var top = ref.top;
                    var elTop = offset(this$1.$el).top;
                    var elHeight = this$1.$el.offsetHeight;

                    if (elTop + elHeight >= top && elTop <= top + target.offsetHeight) {
                        win.scrollTo(0, top - elHeight - this$1.target - this$1.offset);
                    }

                });
            }

        },

        events: [

            {
                name: 'active',

                self: true,

                handler: function handler() {
                    replaceClass(this.selTarget, this.clsInactive, this.clsActive);
                }

            },

            {
                name: 'inactive',

                self: true,

                handler: function handler() {
                    replaceClass(this.selTarget, this.clsActive, this.clsInactive);
                }

            }

        ],

        update: [

            {

                write: function write() {

                    var ref = this;
                    var placeholder = ref.placeholder;
                    var outerHeight = (this.isActive ? placeholder : this.$el).offsetHeight;

                    css(placeholder, assign(
                        {height: css(this.$el, 'position') !== 'absolute' ? outerHeight : ''},
                        css(this.$el, ['marginTop', 'marginBottom', 'marginLeft', 'marginRight'])
                    ));

                    if (!within(placeholder, docEl)) {
                        after(this.$el, placeholder);
                        attr(placeholder, 'hidden', '');
                    }

                    attr(this.widthElement, 'hidden', null);
                    this.width = this.widthElement.offsetWidth;
                    attr(this.widthElement, 'hidden', this.isActive ? null : '');

                    this.topOffset = offset(this.isActive ? placeholder : this.$el).top;
                    this.bottomOffset = this.topOffset + outerHeight;

                    var bottom = parseProp('bottom', this);

                    this.top = Math.max(toFloat(parseProp('top', this)), this.topOffset) - this.offset;
                    this.bottom = bottom && bottom - outerHeight;
                    this.inactive = this.media && !win.matchMedia(this.media).matches;

                    if (this.isActive) {
                        this.update();
                    }
                },

                events: ['load', 'resize']

            },

            {

                read: function read(_, ref) {
                    var scrollY = ref.scrollY; if ( scrollY === void 0 ) scrollY = win.pageYOffset;

                    return {
                        scroll: this.scroll = scrollY,
                        visible: isVisible(this.$el)
                    };
                },

                write: function write(ref, ref$1) {
                    var this$1 = this;
                    var visible = ref.visible;
                    var scroll = ref.scroll;
                    if ( ref$1 === void 0 ) ref$1 = {};
                    var dir = ref$1.dir;


                    if (scroll < 0 || !visible || this.disabled || this.showOnUp && !dir) {
                        return;
                    }

                    if (this.inactive
                        || scroll < this.top
                        || this.showOnUp && (scroll <= this.top || dir === 'down' || dir === 'up' && !this.isActive && scroll <= this.bottomOffset)
                    ) {

                        if (!this.isActive) {
                            return;
                        }

                        this.isActive = false;

                        if (this.animation && scroll > this.topOffset) {
                            Animation.cancel(this.$el);
                            Animation.out(this.$el, this.animation).then(function () { return this$1.hide(); }, noop);
                        } else {
                            this.hide();
                        }

                    } else if (this.isActive) {

                        this.update();

                    } else if (this.animation) {

                        Animation.cancel(this.$el);
                        this.show();
                        Animation.in(this.$el, this.animation).catch(noop);

                    } else {
                        this.show();
                    }

                },

                events: ['scroll']

            } ],

        methods: {

            show: function show() {

                this.isActive = true;
                this.update();
                attr(this.placeholder, 'hidden', null);

            },

            hide: function hide() {

                if (!this.isActive || hasClass(this.selTarget, this.clsActive)) {
                    trigger(this.$el, 'inactive');
                }

                removeClass(this.$el, this.clsFixed, this.clsBelow);
                css(this.$el, {position: '', top: '', width: ''});
                attr(this.placeholder, 'hidden', '');

            },

            update: function update() {

                var active = this.top !== 0 || this.scroll > this.top;
                var top = Math.max(0, this.offset);

                if (this.bottom && this.scroll > this.bottom - this.offset) {
                    top = this.bottom - this.scroll;
                }

                css(this.$el, {
                    position: 'fixed',
                    top: (top + "px"),
                    width: this.width
                });

                if (hasClass(this.selTarget, this.clsActive)) {

                    if (!active) {
                        trigger(this.$el, 'inactive');
                    }

                } else if (active) {
                    trigger(this.$el, 'active');
                }

                toggleClass(this.$el, this.clsBelow, this.scroll > this.bottomOffset);
                addClass(this.$el, this.clsFixed);

            }

        }

    });

    function parseProp(prop, ref) {
        var $props = ref.$props;
        var $el = ref.$el;
        var propOffset = ref[(prop + "Offset")];


        var value = $props[prop];

        if (!value) {
            return;
        }

        if (isNumeric(value)) {

            return propOffset + toFloat(value);

        } else if (isString(value) && value.match(/^-?\d+vh$/)) {

            return height(win) * toFloat(value) / 100;

        } else {

            var el = value === true ? $el.parentNode : query(value, $el);

            if (el) {
                return offset(el).top + el.offsetHeight;
            }

        }
    }

};

var svgs = {};

var Svg = function (UIkit) {

    UIkit.component('svg', {

        attrs: true,

        props: {
            id: String,
            icon: String,
            src: String,
            style: String,
            width: Number,
            height: Number,
            ratio: Number,
            'class': String
        },

        defaults: {
            ratio: 1,
            id: false,
            exclude: ['src'],
            'class': ''
        },

        init: function init() {
            this.class += ' uk-svg';
        },

        connected: function connected() {
            var this$1 = this;


            if (!this.icon && includes(this.src, '#')) {

                var parts = this.src.split('#');

                if (parts.length > 1) {
                    var assign;
                    (assign = parts, this.src = assign[0], this.icon = assign[1]);
                }
            }

            this.svg = this.getSvg().then(function (svg) {

                var el;

                if (isString(svg)) {

                    if (this$1.icon && includes(svg, '<symbol')) {
                        svg = parseSymbols(svg, this$1.icon) || svg;
                    }

                    el = $(svg.substr(svg.indexOf('<svg')));

                } else {
                    el = svg.cloneNode(true);
                }

                if (!el) {
                    return Promise.reject('SVG not found.');
                }

                var dimensions = attr(el, 'viewBox');

                if (dimensions) {
                    dimensions = dimensions.split(' ');
                    this$1.width = this$1.$props.width || dimensions[2];
                    this$1.height = this$1.$props.height || dimensions[3];
                }

                this$1.width *= this$1.ratio;
                this$1.height *= this$1.ratio;

                for (var prop in this$1.$options.props) {
                    if (this$1[prop] && !includes(this$1.exclude, prop)) {
                        attr(el, prop, this$1[prop]);
                    }
                }

                if (!this$1.id) {
                    removeAttr(el, 'id');
                }

                if (this$1.width && !this$1.height) {
                    removeAttr(el, 'height');
                }

                if (this$1.height && !this$1.width) {
                    removeAttr(el, 'width');
                }

                var root = this$1.$el;
                if (isVoidElement(root) || root.tagName === 'CANVAS') {

                    attr(root, {hidden: true, id: null});

                    var next = root.nextElementSibling;
                    if (next && el.isEqualNode(next)) {
                        el = next;
                    } else {
                        after(root, el);
                    }

                } else {

                    var last = root.lastElementChild;
                    if (last && el.isEqualNode(last)) {
                        el = last;
                    } else {
                        append(root, el);
                    }

                }

                this$1.svgEl = el;

                return el;

            }, noop);

        },

        disconnected: function disconnected() {
            var this$1 = this;


            if (isVoidElement(this.$el)) {
                attr(this.$el, {hidden: null, id: this.id || null});
            }

            if (this.svg) {
                this.svg.then(function (svg) { return (!this$1._connected || svg !== this$1.svgEl) && remove(svg); }, noop);
            }

            this.svg = this.svgEl = null;

        },

        methods: {

            getSvg: function getSvg() {
                var this$1 = this;


                if (!this.src) {
                    return Promise.reject();
                }

                if (svgs[this.src]) {
                    return svgs[this.src];
                }

                svgs[this.src] = new Promise(function (resolve, reject) {

                    if (startsWith(this$1.src, 'data:')) {
                        resolve(decodeURIComponent(this$1.src.split(',')[1]));
                    } else {

                        ajax(this$1.src).then(
                            function (xhr) { return resolve(xhr.response); },
                            function () { return reject('SVG not found.'); }
                        );

                    }

                });

                return svgs[this.src];

            }

        }

    });

    var symbolRe = /<symbol(.*?id=(['"])(.*?)\2[^]*?<\/)symbol>/g;
    var symbols = {};

    function parseSymbols(svg, icon) {

        if (!symbols[svg]) {

            symbols[svg] = {};

            var match;
            while ((match = symbolRe.exec(svg))) {
                symbols[svg][match[3]] = "<svg xmlns=\"http://www.w3.org/2000/svg\"" + (match[1]) + "svg>";
            }

        }

        return symbols[svg][icon];
    }

};

var Switcher = function (UIkit) {

    UIkit.component('switcher', {

        mixins: [Togglable],

        args: 'connect',

        props: {
            connect: String,
            toggle: String,
            active: Number,
            swiping: Boolean
        },

        defaults: {
            connect: '~.uk-switcher',
            toggle: '> *',
            active: 0,
            swiping: true,
            cls: 'uk-active',
            clsContainer: 'uk-switcher',
            attrItem: 'uk-switcher-item',
            queued: true
        },

        computed: {

            connects: function connects(ref, $el) {
                var connect = ref.connect;

                return queryAll(connect, $el);
            },

            toggles: function toggles(ref, $el) {
                var toggle = ref.toggle;

                return $$(toggle, $el);
            }

        },

        events: [

            {

                name: 'click',

                delegate: function delegate() {
                    return ((this.toggle) + ":not(.uk-disabled)");
                },

                handler: function handler(e) {
                    e.preventDefault();
                    this.show(e.current);
                }

            },

            {
                name: 'click',

                el: function el() {
                    return this.connects;
                },

                delegate: function delegate() {
                    return ("[" + (this.attrItem) + "],[data-" + (this.attrItem) + "]");
                },

                handler: function handler(e) {
                    e.preventDefault();
                    this.show(data(e.current, this.attrItem));
                }
            },

            {
                name: 'swipeRight swipeLeft',

                filter: function filter() {
                    return this.swiping;
                },

                el: function el() {
                    return this.connects;
                },

                handler: function handler(e) {
                    if (!isTouch(e)) {
                        return;
                    }

                    e.preventDefault();
                    if (!win.getSelection().toString()) {
                        this.show(e.type === 'swipeLeft' ? 'next' : 'previous');
                    }
                }
            }

        ],

        update: function update() {
            var this$1 = this;


            this.connects.forEach(function (list) { return this$1.updateAria(list.children); });
            this.show(filter(this.toggles, ("." + (this.cls)))[0] || this.toggles[this.active] || this.toggles[0]);

        },

        methods: {

            show: function show(item) {
                var this$1 = this;


                var ref = this.toggles;
                var length = ref.length;
                var prev = !!this.connects.length && index(filter(this.connects[0].children, ("." + (this.cls)))[0]);
                var hasPrev = prev >= 0;
                var dir = item === 'previous' ? -1 : 1;

                var toggle, next = getIndex(item, this.toggles, prev);

                for (var i = 0; i < length; i++, next = (next + dir + length) % length) {
                    if (!matches(this$1.toggles[next], '.uk-disabled, [disabled]')) {
                        toggle = this$1.toggles[next];
                        break;
                    }
                }

                if (!toggle || prev >= 0 && hasClass(toggle, this.cls) || prev === next) {
                    return;
                }

                removeClass(this.toggles, this.cls);
                attr(this.toggles, 'aria-expanded', false);
                addClass(toggle, this.cls);
                attr(toggle, 'aria-expanded', true);

                this.connects.forEach(function (list) {
                    if (!hasPrev) {
                        this$1.toggleNow(list.children[next]);
                    } else {
                        this$1.toggleElement([list.children[prev], list.children[next]]);
                    }
                });

            }

        }

    });

};

var Tab = function (UIkit) {

    UIkit.component('tab', UIkit.components.switcher.extend({

        mixins: [Class],

        name: 'tab',

        props: {
            media: 'media'
        },

        defaults: {
            media: 960,
            attrItem: 'uk-tab-item'
        },

        init: function init() {

            var cls = hasClass(this.$el, 'uk-tab-left')
                ? 'uk-tab-left'
                : hasClass(this.$el, 'uk-tab-right')
                    ? 'uk-tab-right'
                    : false;

            if (cls) {
                UIkit.toggle(this.$el, {cls: cls, mode: 'media', media: this.media});
            }
        }

    }));

};

var Toggle = function (UIkit) {

    UIkit.component('toggle', {

        mixins: [UIkit.mixin.togglable],

        args: 'target',

        props: {
            href: String,
            target: null,
            mode: 'list',
            media: 'media'
        },

        defaults: {
            href: false,
            target: false,
            mode: 'click',
            queued: true,
            media: false
        },

        computed: {

            target: function target(ref, $el) {
                var href = ref.href;
                var target = ref.target;

                target = queryAll(target || href, $el);
                return target.length && target || [$el];
            }

        },

        events: [

            {

                name: (pointerEnter + " " + pointerLeave),

                filter: function filter() {
                    return includes(this.mode, 'hover');
                },

                handler: function handler(e) {
                    if (!isTouch(e)) {
                        this.toggle(("toggle" + (e.type === pointerEnter ? 'show' : 'hide')));
                    }
                }

            },

            {

                name: 'click',

                filter: function filter() {
                    return includes(this.mode, 'click') || hasTouch;
                },

                handler: function handler(e) {

                    if (!isTouch(e) && !includes(this.mode, 'click')) {
                        return;
                    }

                    // TODO better isToggled handling
                    var link;
                    if (closest(e.target, 'a[href="#"], button')
                        || (link = closest(e.target, 'a[href]')) && (
                            this.cls
                            || !isVisible(this.target)
                            || link.hash && matches(this.target, link.hash)
                        )
                    ) {
                        once(doc, 'click', function (e) { return e.preventDefault(); });
                    }

                    this.toggle();
                }

            }
        ],

        update: {

            write: function write() {

                if (!includes(this.mode, 'media') || !this.media) {
                    return;
                }

                var toggled = this.isToggled(this.target);
                if (win.matchMedia(this.media).matches ? !toggled : toggled) {
                    this.toggle();
                }

            },

            events: ['load', 'resize']

        },

        methods: {

            toggle: function toggle(type) {
                if (trigger(this.target, type || 'toggle', [this])) {
                    this.toggleElement(this.target);
                }
            }

        }

    });

};

var Video = function (UIkit) {

    UIkit.component('video', {

        props: {
            automute: Boolean,
            autoplay: Boolean,
        },

        defaults: {
            automute: false,
            autoplay: true
        },

        computed: {

            inView: function inView(ref) {
                var autoplay = ref.autoplay;

                return autoplay === 'inview';
            }

        },

        ready: function ready() {

            this.player = new Player(this.$el);

            if (this.automute) {
                this.player.mute();
            }

        },

        update: [

            {

                read: function read(_, ref) {
                    var type = ref.type;


                    return !this.player || (type === 'scroll' || type === 'resize') && !this.inView
                        ? false
                        : {
                            visible: isVisible(this.$el) && css(this.$el, 'visibility') !== 'hidden',
                            inView: this.inView && isInView(this.$el)
                        };
                },

                write: function write(ref) {
                    var visible = ref.visible;
                    var inView = ref.inView;


                    if (!visible || this.inView && !inView) {
                        this.player.pause();
                    } else if (this.autoplay === true || this.inView && inView) {
                        this.player.play();
                    }

                },

                events: ['load', 'resize', 'scroll']

            }

        ],

    });

};

var core = function (UIkit) {

    // core components
    UIkit.use(Toggle);
    UIkit.use(Accordion);
    UIkit.use(Alert);
    UIkit.use(Video);
    UIkit.use(Cover);
    UIkit.use(Drop);
    UIkit.use(Dropdown);
    UIkit.use(FormCustom);
    UIkit.use(HeightMatch);
    UIkit.use(HeightViewport);
    UIkit.use(Margin);
    UIkit.use(Gif);
    UIkit.use(Grid);
    UIkit.use(Leader);
    UIkit.use(Modal$1);
    UIkit.use(Nav);
    UIkit.use(Navbar);
    UIkit.use(Offcanvas);
    UIkit.use(Responsive);
    UIkit.use(Scroll);
    UIkit.use(Scrollspy);
    UIkit.use(ScrollspyNav);
    UIkit.use(Sticky);
    UIkit.use(Svg);
    UIkit.use(Icon);
    UIkit.use(Switcher);
    UIkit.use(Tab);

    // core functionality
    UIkit.use(Core);

};

var boot = function (UIkit) {

    var connect = UIkit.connect;
    var disconnect = UIkit.disconnect;

    if (!Observer) {
        return;
    }

    if (doc.body) {

        init();

    } else {

        (new Observer(function () {

            if (doc.body) {
                this.disconnect();
                init();
            }

        })).observe(docEl, {childList: true, subtree: true});

    }

    function init() {

        apply(doc.body, connect);

        fastdom.flush();

        (new Observer(function (mutations) { return mutations.forEach(applyMutation); })).observe(docEl, {
            childList: true,
            subtree: true,
            characterData: true,
            attributes: true
        });

        UIkit._initialized = true;
    }

    function applyMutation(mutation) {

        var target = mutation.target;
        var type = mutation.type;

        var update = type !== 'attributes'
            ? applyChildList(mutation)
            : applyAttribute(mutation);

        update && UIkit.update('update', target, true);

    }

    function applyAttribute(ref) {
        var target = ref.target;
        var attributeName = ref.attributeName;


        if (attributeName === 'href') {
            return true;
        }

        var name = getComponentName(attributeName);

        if (!name || !(name in UIkit.components)) {
            return;
        }

        if (hasAttr(target, attributeName)) {
            UIkit[name](target);
            return true;
        }

        var component = UIkit.getComponent(target, name);

        if (component) {
            component.$destroy();
            return true;
        }

    }

    function applyChildList(ref) {
        var addedNodes = ref.addedNodes;
        var removedNodes = ref.removedNodes;


        for (var i = 0; i < addedNodes.length; i++) {
            apply(addedNodes[i], connect);
        }

        for (var i$1 = 0; i$1 < removedNodes.length; i$1++) {
            apply(removedNodes[i$1], disconnect);
        }

        return true;
    }
    function apply(node, fn) {

        if (node.nodeType !== 1 || hasAttr(node, 'uk-no-boot')) {
            return;
        }

        fn(node);
        node = node.firstElementChild;
        while (node) {
            var next = node.nextElementSibling;
            apply(node, fn);
            node = next;
        }
    }

};

UIkit$1.version = '3.0.0-beta.35';

mixin(UIkit$1);
core(UIkit$1);

{
    boot(UIkit$1);
}

return UIkit$1;

})));
