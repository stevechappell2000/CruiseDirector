webpackJsonp(["main"],{

/***/ "../../../../../../node_modules/rxjs/_esm5/InnerSubscriber.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InnerSubscriber; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Subscriber__ = __webpack_require__("../../../../../../node_modules/rxjs/_esm5/Subscriber.js");
/** PURE_IMPORTS_START ._Subscriber PURE_IMPORTS_END */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b)
        if (b.hasOwnProperty(p))
            d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var InnerSubscriber = /*@__PURE__*/ (/*@__PURE__*/ function (_super) {
    __extends(InnerSubscriber, _super);
    function InnerSubscriber(parent, outerValue, outerIndex) {
        _super.call(this);
        this.parent = parent;
        this.outerValue = outerValue;
        this.outerIndex = outerIndex;
        this.index = 0;
    }
    InnerSubscriber.prototype._next = function (value) {
        this.parent.notifyNext(this.outerValue, value, this.outerIndex, this.index++, this);
    };
    InnerSubscriber.prototype._error = function (error) {
        this.parent.notifyError(error, this);
        this.unsubscribe();
    };
    InnerSubscriber.prototype._complete = function () {
        this.parent.notifyComplete(this);
        this.unsubscribe();
    };
    return InnerSubscriber;
}(__WEBPACK_IMPORTED_MODULE_0__Subscriber__["a" /* Subscriber */]));
//# sourceMappingURL=InnerSubscriber.js.map 


/***/ }),

/***/ "../../../../../../node_modules/rxjs/_esm5/Observable.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Observable; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_root__ = __webpack_require__("../../../../../../node_modules/rxjs/_esm5/util/root.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_toSubscriber__ = __webpack_require__("../../../../../../node_modules/rxjs/_esm5/util/toSubscriber.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__symbol_observable__ = __webpack_require__("../../../../../../node_modules/rxjs/_esm5/symbol/observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util_pipe__ = __webpack_require__("../../../../../../node_modules/rxjs/_esm5/util/pipe.js");
/** PURE_IMPORTS_START ._util_root,._util_toSubscriber,._symbol_observable,._util_pipe PURE_IMPORTS_END */




/**
 * A representation of any set of values over any amount of time. This is the most basic building block
 * of RxJS.
 *
 * @class Observable<T>
 */
var Observable = /*@__PURE__*/ (/*@__PURE__*/ function () {
    /**
     * @constructor
     * @param {Function} subscribe the function that is called when the Observable is
     * initially subscribed to. This function is given a Subscriber, to which new values
     * can be `next`ed, or an `error` method can be called to raise an error, or
     * `complete` can be called to notify of a successful completion.
     */
    function Observable(subscribe) {
        this._isScalar = false;
        if (subscribe) {
            this._subscribe = subscribe;
        }
    }
    /**
     * Creates a new Observable, with this Observable as the source, and the passed
     * operator defined as the new observable's operator.
     * @method lift
     * @param {Operator} operator the operator defining the operation to take on the observable
     * @return {Observable} a new observable with the Operator applied
     */
    Observable.prototype.lift = function (operator) {
        var observable = new Observable();
        observable.source = this;
        observable.operator = operator;
        return observable;
    };
    /**
     * Invokes an execution of an Observable and registers Observer handlers for notifications it will emit.
     *
     * <span class="informal">Use it when you have all these Observables, but still nothing is happening.</span>
     *
     * `subscribe` is not a regular operator, but a method that calls Observable's internal `subscribe` function. It
     * might be for example a function that you passed to a {@link create} static factory, but most of the time it is
     * a library implementation, which defines what and when will be emitted by an Observable. This means that calling
     * `subscribe` is actually the moment when Observable starts its work, not when it is created, as it is often
     * thought.
     *
     * Apart from starting the execution of an Observable, this method allows you to listen for values
     * that an Observable emits, as well as for when it completes or errors. You can achieve this in two
     * following ways.
     *
     * The first way is creating an object that implements {@link Observer} interface. It should have methods
     * defined by that interface, but note that it should be just a regular JavaScript object, which you can create
     * yourself in any way you want (ES6 class, classic function constructor, object literal etc.). In particular do
     * not attempt to use any RxJS implementation details to create Observers - you don't need them. Remember also
     * that your object does not have to implement all methods. If you find yourself creating a method that doesn't
     * do anything, you can simply omit it. Note however, that if `error` method is not provided, all errors will
     * be left uncaught.
     *
     * The second way is to give up on Observer object altogether and simply provide callback functions in place of its methods.
     * This means you can provide three functions as arguments to `subscribe`, where first function is equivalent
     * of a `next` method, second of an `error` method and third of a `complete` method. Just as in case of Observer,
     * if you do not need to listen for something, you can omit a function, preferably by passing `undefined` or `null`,
     * since `subscribe` recognizes these functions by where they were placed in function call. When it comes
     * to `error` function, just as before, if not provided, errors emitted by an Observable will be thrown.
     *
     * Whatever style of calling `subscribe` you use, in both cases it returns a Subscription object.
     * This object allows you to call `unsubscribe` on it, which in turn will stop work that an Observable does and will clean
     * up all resources that an Observable used. Note that cancelling a subscription will not call `complete` callback
     * provided to `subscribe` function, which is reserved for a regular completion signal that comes from an Observable.
     *
     * Remember that callbacks provided to `subscribe` are not guaranteed to be called asynchronously.
     * It is an Observable itself that decides when these functions will be called. For example {@link of}
     * by default emits all its values synchronously. Always check documentation for how given Observable
     * will behave when subscribed and if its default behavior can be modified with a {@link Scheduler}.
     *
     * @example <caption>Subscribe with an Observer</caption>
     * const sumObserver = {
     *   sum: 0,
     *   next(value) {
     *     console.log('Adding: ' + value);
     *     this.sum = this.sum + value;
     *   },
     *   error() { // We actually could just remove this method,
     *   },        // since we do not really care about errors right now.
     *   complete() {
     *     console.log('Sum equals: ' + this.sum);
     *   }
     * };
     *
     * Rx.Observable.of(1, 2, 3) // Synchronously emits 1, 2, 3 and then completes.
     * .subscribe(sumObserver);
     *
     * // Logs:
     * // "Adding: 1"
     * // "Adding: 2"
     * // "Adding: 3"
     * // "Sum equals: 6"
     *
     *
     * @example <caption>Subscribe with functions</caption>
     * let sum = 0;
     *
     * Rx.Observable.of(1, 2, 3)
     * .subscribe(
     *   function(value) {
     *     console.log('Adding: ' + value);
     *     sum = sum + value;
     *   },
     *   undefined,
     *   function() {
     *     console.log('Sum equals: ' + sum);
     *   }
     * );
     *
     * // Logs:
     * // "Adding: 1"
     * // "Adding: 2"
     * // "Adding: 3"
     * // "Sum equals: 6"
     *
     *
     * @example <caption>Cancel a subscription</caption>
     * const subscription = Rx.Observable.interval(1000).subscribe(
     *   num => console.log(num),
     *   undefined,
     *   () => console.log('completed!') // Will not be called, even
     * );                                // when cancelling subscription
     *
     *
     * setTimeout(() => {
     *   subscription.unsubscribe();
     *   console.log('unsubscribed!');
     * }, 2500);
     *
     * // Logs:
     * // 0 after 1s
     * // 1 after 2s
     * // "unsubscribed!" after 2.5s
     *
     *
     * @param {Observer|Function} observerOrNext (optional) Either an observer with methods to be called,
     *  or the first of three possible handlers, which is the handler for each value emitted from the subscribed
     *  Observable.
     * @param {Function} error (optional) A handler for a terminal event resulting from an error. If no error handler is provided,
     *  the error will be thrown as unhandled.
     * @param {Function} complete (optional) A handler for a terminal event resulting from successful completion.
     * @return {ISubscription} a subscription reference to the registered handlers
     * @method subscribe
     */
    Observable.prototype.subscribe = function (observerOrNext, error, complete) {
        var operator = this.operator;
        var sink = Object(__WEBPACK_IMPORTED_MODULE_1__util_toSubscriber__["a" /* toSubscriber */])(observerOrNext, error, complete);
        if (operator) {
            operator.call(sink, this.source);
        }
        else {
            sink.add(this.source ? this._subscribe(sink) : this._trySubscribe(sink));
        }
        if (sink.syncErrorThrowable) {
            sink.syncErrorThrowable = false;
            if (sink.syncErrorThrown) {
                throw sink.syncErrorValue;
            }
        }
        return sink;
    };
    Observable.prototype._trySubscribe = function (sink) {
        try {
            return this._subscribe(sink);
        }
        catch (err) {
            sink.syncErrorThrown = true;
            sink.syncErrorValue = err;
            sink.error(err);
        }
    };
    /**
     * @method forEach
     * @param {Function} next a handler for each value emitted by the observable
     * @param {PromiseConstructor} [PromiseCtor] a constructor function used to instantiate the Promise
     * @return {Promise} a promise that either resolves on observable completion or
     *  rejects with the handled error
     */
    Observable.prototype.forEach = function (next, PromiseCtor) {
        var _this = this;
        if (!PromiseCtor) {
            if (__WEBPACK_IMPORTED_MODULE_0__util_root__["a" /* root */].Rx && __WEBPACK_IMPORTED_MODULE_0__util_root__["a" /* root */].Rx.config && __WEBPACK_IMPORTED_MODULE_0__util_root__["a" /* root */].Rx.config.Promise) {
                PromiseCtor = __WEBPACK_IMPORTED_MODULE_0__util_root__["a" /* root */].Rx.config.Promise;
            }
            else if (__WEBPACK_IMPORTED_MODULE_0__util_root__["a" /* root */].Promise) {
                PromiseCtor = __WEBPACK_IMPORTED_MODULE_0__util_root__["a" /* root */].Promise;
            }
        }
        if (!PromiseCtor) {
            throw new Error('no Promise impl found');
        }
        return new PromiseCtor(function (resolve, reject) {
            // Must be declared in a separate statement to avoid a RefernceError when
            // accessing subscription below in the closure due to Temporal Dead Zone.
            var subscription;
            subscription = _this.subscribe(function (value) {
                if (subscription) {
                    // if there is a subscription, then we can surmise
                    // the next handling is asynchronous. Any errors thrown
                    // need to be rejected explicitly and unsubscribe must be
                    // called manually
                    try {
                        next(value);
                    }
                    catch (err) {
                        reject(err);
                        subscription.unsubscribe();
                    }
                }
                else {
                    // if there is NO subscription, then we're getting a nexted
                    // value synchronously during subscription. We can just call it.
                    // If it errors, Observable's `subscribe` will ensure the
                    // unsubscription logic is called, then synchronously rethrow the error.
                    // After that, Promise will trap the error and send it
                    // down the rejection path.
                    next(value);
                }
            }, reject, resolve);
        });
    };
    Observable.prototype._subscribe = function (subscriber) {
        return this.source.subscribe(subscriber);
    };
    /**
     * An interop point defined by the es7-observable spec https://github.com/zenparsing/es-observable
     * @method Symbol.observable
     * @return {Observable} this instance of the observable
     */
    Observable.prototype[__WEBPACK_IMPORTED_MODULE_2__symbol_observable__["a" /* observable */]] = function () {
        return this;
    };
    /* tslint:enable:max-line-length */
    /**
     * Used to stitch together functional operators into a chain.
     * @method pipe
     * @return {Observable} the Observable result of all of the operators having
     * been called in the order they were passed in.
     *
     * @example
     *
     * import { map, filter, scan } from 'rxjs/operators';
     *
     * Rx.Observable.interval(1000)
     *   .pipe(
     *     filter(x => x % 2 === 0),
     *     map(x => x + x),
     *     scan((acc, x) => acc + x)
     *   )
     *   .subscribe(x => console.log(x))
     */
    Observable.prototype.pipe = function () {
        var operations = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            operations[_i - 0] = arguments[_i];
        }
        if (operations.length === 0) {
            return this;
        }
        return Object(__WEBPACK_IMPORTED_MODULE_3__util_pipe__["a" /* pipeFromArray */])(operations)(this);
    };
    /* tslint:enable:max-line-length */
    Observable.prototype.toPromise = function (PromiseCtor) {
        var _this = this;
        if (!PromiseCtor) {
            if (__WEBPACK_IMPORTED_MODULE_0__util_root__["a" /* root */].Rx && __WEBPACK_IMPORTED_MODULE_0__util_root__["a" /* root */].Rx.config && __WEBPACK_IMPORTED_MODULE_0__util_root__["a" /* root */].Rx.config.Promise) {
                PromiseCtor = __WEBPACK_IMPORTED_MODULE_0__util_root__["a" /* root */].Rx.config.Promise;
            }
            else if (__WEBPACK_IMPORTED_MODULE_0__util_root__["a" /* root */].Promise) {
                PromiseCtor = __WEBPACK_IMPORTED_MODULE_0__util_root__["a" /* root */].Promise;
            }
        }
        if (!PromiseCtor) {
            throw new Error('no Promise impl found');
        }
        return new PromiseCtor(function (resolve, reject) {
            var value;
            _this.subscribe(function (x) { return value = x; }, function (err) { return reject(err); }, function () { return resolve(value); });
        });
    };
    // HACK: Since TypeScript inherits static properties too, we have to
    // fight against TypeScript here so Subject can have a different static create signature
    /**
     * Creates a new cold Observable by calling the Observable constructor
     * @static true
     * @owner Observable
     * @method create
     * @param {Function} subscribe? the subscriber function to be passed to the Observable constructor
     * @return {Observable} a new cold observable
     */
    Observable.create = function (subscribe) {
        return new Observable(subscribe);
    };
    return Observable;
}());
//# sourceMappingURL=Observable.js.map 


/***/ }),

/***/ "../../../../../../node_modules/rxjs/_esm5/Observer.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return empty; });
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
var empty = {
    closed: true,
    next: function (value) { },
    error: function (err) { throw err; },
    complete: function () { }
};
//# sourceMappingURL=Observer.js.map 


/***/ }),

/***/ "../../../../../../node_modules/rxjs/_esm5/OuterSubscriber.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OuterSubscriber; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Subscriber__ = __webpack_require__("../../../../../../node_modules/rxjs/_esm5/Subscriber.js");
/** PURE_IMPORTS_START ._Subscriber PURE_IMPORTS_END */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b)
        if (b.hasOwnProperty(p))
            d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var OuterSubscriber = /*@__PURE__*/ (/*@__PURE__*/ function (_super) {
    __extends(OuterSubscriber, _super);
    function OuterSubscriber() {
        _super.apply(this, arguments);
    }
    OuterSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.destination.next(innerValue);
    };
    OuterSubscriber.prototype.notifyError = function (error, innerSub) {
        this.destination.error(error);
    };
    OuterSubscriber.prototype.notifyComplete = function (innerSub) {
        this.destination.complete();
    };
    return OuterSubscriber;
}(__WEBPACK_IMPORTED_MODULE_0__Subscriber__["a" /* Subscriber */]));
//# sourceMappingURL=OuterSubscriber.js.map 


/***/ }),

/***/ "../../../../../../node_modules/rxjs/_esm5/Subject.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return SubjectSubscriber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Subject; });
/* unused harmony export AnonymousSubject */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Observable__ = __webpack_require__("../../../../../../node_modules/rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Subscriber__ = __webpack_require__("../../../../../../node_modules/rxjs/_esm5/Subscriber.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Subscription__ = __webpack_require__("../../../../../../node_modules/rxjs/_esm5/Subscription.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util_ObjectUnsubscribedError__ = __webpack_require__("../../../../../../node_modules/rxjs/_esm5/util/ObjectUnsubscribedError.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__SubjectSubscription__ = __webpack_require__("../../../../../../node_modules/rxjs/_esm5/SubjectSubscription.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__symbol_rxSubscriber__ = __webpack_require__("../../../../../../node_modules/rxjs/_esm5/symbol/rxSubscriber.js");
/** PURE_IMPORTS_START ._Observable,._Subscriber,._Subscription,._util_ObjectUnsubscribedError,._SubjectSubscription,._symbol_rxSubscriber PURE_IMPORTS_END */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b)
        if (b.hasOwnProperty(p))
            d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};






/**
 * @class SubjectSubscriber<T>
 */
var SubjectSubscriber = /*@__PURE__*/ (/*@__PURE__*/ function (_super) {
    __extends(SubjectSubscriber, _super);
    function SubjectSubscriber(destination) {
        _super.call(this, destination);
        this.destination = destination;
    }
    return SubjectSubscriber;
}(__WEBPACK_IMPORTED_MODULE_1__Subscriber__["a" /* Subscriber */]));
/**
 * @class Subject<T>
 */
var Subject = /*@__PURE__*/ (/*@__PURE__*/ function (_super) {
    __extends(Subject, _super);
    function Subject() {
        _super.call(this);
        this.observers = [];
        this.closed = false;
        this.isStopped = false;
        this.hasError = false;
        this.thrownError = null;
    }
    Subject.prototype[__WEBPACK_IMPORTED_MODULE_5__symbol_rxSubscriber__["a" /* rxSubscriber */]] = function () {
        return new SubjectSubscriber(this);
    };
    Subject.prototype.lift = function (operator) {
        var subject = new AnonymousSubject(this, this);
        subject.operator = operator;
        return subject;
    };
    Subject.prototype.next = function (value) {
        if (this.closed) {
            throw new __WEBPACK_IMPORTED_MODULE_3__util_ObjectUnsubscribedError__["a" /* ObjectUnsubscribedError */]();
        }
        if (!this.isStopped) {
            var observers = this.observers;
            var len = observers.length;
            var copy = observers.slice();
            for (var i = 0; i < len; i++) {
                copy[i].next(value);
            }
        }
    };
    Subject.prototype.error = function (err) {
        if (this.closed) {
            throw new __WEBPACK_IMPORTED_MODULE_3__util_ObjectUnsubscribedError__["a" /* ObjectUnsubscribedError */]();
        }
        this.hasError = true;
        this.thrownError = err;
        this.isStopped = true;
        var observers = this.observers;
        var len = observers.length;
        var copy = observers.slice();
        for (var i = 0; i < len; i++) {
            copy[i].error(err);
        }
        this.observers.length = 0;
    };
    Subject.prototype.complete = function () {
        if (this.closed) {
            throw new __WEBPACK_IMPORTED_MODULE_3__util_ObjectUnsubscribedError__["a" /* ObjectUnsubscribedError */]();
        }
        this.isStopped = true;
        var observers = this.observers;
        var len = observers.length;
        var copy = observers.slice();
        for (var i = 0; i < len; i++) {
            copy[i].complete();
        }
        this.observers.length = 0;
    };
    Subject.prototype.unsubscribe = function () {
        this.isStopped = true;
        this.closed = true;
        this.observers = null;
    };
    Subject.prototype._trySubscribe = function (subscriber) {
        if (this.closed) {
            throw new __WEBPACK_IMPORTED_MODULE_3__util_ObjectUnsubscribedError__["a" /* ObjectUnsubscribedError */]();
        }
        else {
            return _super.prototype._trySubscribe.call(this, subscriber);
        }
    };
    Subject.prototype._subscribe = function (subscriber) {
        if (this.closed) {
            throw new __WEBPACK_IMPORTED_MODULE_3__util_ObjectUnsubscribedError__["a" /* ObjectUnsubscribedError */]();
        }
        else if (this.hasError) {
            subscriber.error(this.thrownError);
            return __WEBPACK_IMPORTED_MODULE_2__Subscription__["a" /* Subscription */].EMPTY;
        }
        else if (this.isStopped) {
            subscriber.complete();
            return __WEBPACK_IMPORTED_MODULE_2__Subscription__["a" /* Subscription */].EMPTY;
        }
        else {
            this.observers.push(subscriber);
            return new __WEBPACK_IMPORTED_MODULE_4__SubjectSubscription__["a" /* SubjectSubscription */](this, subscriber);
        }
    };
    Subject.prototype.asObservable = function () {
        var observable = new __WEBPACK_IMPORTED_MODULE_0__Observable__["a" /* Observable */]();
        observable.source = this;
        return observable;
    };
    Subject.create = function (destination, source) {
        return new AnonymousSubject(destination, source);
    };
    return Subject;
}(__WEBPACK_IMPORTED_MODULE_0__Observable__["a" /* Observable */]));
/**
 * @class AnonymousSubject<T>
 */
var AnonymousSubject = /*@__PURE__*/ (/*@__PURE__*/ function (_super) {
    __extends(AnonymousSubject, _super);
    function AnonymousSubject(destination, source) {
        _super.call(this);
        this.destination = destination;
        this.source = source;
    }
    AnonymousSubject.prototype.next = function (value) {
        var destination = this.destination;
        if (destination && destination.next) {
            destination.next(value);
        }
    };
    AnonymousSubject.prototype.error = function (err) {
        var destination = this.destination;
        if (destination && destination.error) {
            this.destination.error(err);
        }
    };
    AnonymousSubject.prototype.complete = function () {
        var destination = this.destination;
        if (destination && destination.complete) {
            this.destination.complete();
        }
    };
    AnonymousSubject.prototype._subscribe = function (subscriber) {
        var source = this.source;
        if (source) {
            return this.source.subscribe(subscriber);
        }
        else {
            return __WEBPACK_IMPORTED_MODULE_2__Subscription__["a" /* Subscription */].EMPTY;
        }
    };
    return AnonymousSubject;
}(Subject));
//# sourceMappingURL=Subject.js.map 


/***/ }),

/***/ "../../../../../../node_modules/rxjs/_esm5/SubjectSubscription.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SubjectSubscription; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Subscription__ = __webpack_require__("../../../../../../node_modules/rxjs/_esm5/Subscription.js");
/** PURE_IMPORTS_START ._Subscription PURE_IMPORTS_END */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b)
        if (b.hasOwnProperty(p))
            d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var SubjectSubscription = /*@__PURE__*/ (/*@__PURE__*/ function (_super) {
    __extends(SubjectSubscription, _super);
    function SubjectSubscription(subject, subscriber) {
        _super.call(this);
        this.subject = subject;
        this.subscriber = subscriber;
        this.closed = false;
    }
    SubjectSubscription.prototype.unsubscribe = function () {
        if (this.closed) {
            return;
        }
        this.closed = true;
        var subject = this.subject;
        var observers = subject.observers;
        this.subject = null;
        if (!observers || observers.length === 0 || subject.isStopped || subject.closed) {
            return;
        }
        var subscriberIndex = observers.indexOf(this.subscriber);
        if (subscriberIndex !== -1) {
            observers.splice(subscriberIndex, 1);
        }
    };
    return SubjectSubscription;
}(__WEBPACK_IMPORTED_MODULE_0__Subscription__["a" /* Subscription */]));
//# sourceMappingURL=SubjectSubscription.js.map 


/***/ }),

/***/ "../../../../../../node_modules/rxjs/_esm5/Subscriber.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Subscriber; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_isFunction__ = __webpack_require__("../../../../../../node_modules/rxjs/_esm5/util/isFunction.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Subscription__ = __webpack_require__("../../../../../../node_modules/rxjs/_esm5/Subscription.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Observer__ = __webpack_require__("../../../../../../node_modules/rxjs/_esm5/Observer.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__symbol_rxSubscriber__ = __webpack_require__("../../../../../../node_modules/rxjs/_esm5/symbol/rxSubscriber.js");
/** PURE_IMPORTS_START ._util_isFunction,._Subscription,._Observer,._symbol_rxSubscriber PURE_IMPORTS_END */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b)
        if (b.hasOwnProperty(p))
            d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};




/**
 * Implements the {@link Observer} interface and extends the
 * {@link Subscription} class. While the {@link Observer} is the public API for
 * consuming the values of an {@link Observable}, all Observers get converted to
 * a Subscriber, in order to provide Subscription-like capabilities such as
 * `unsubscribe`. Subscriber is a common type in RxJS, and crucial for
 * implementing operators, but it is rarely used as a public API.
 *
 * @class Subscriber<T>
 */
var Subscriber = /*@__PURE__*/ (/*@__PURE__*/ function (_super) {
    __extends(Subscriber, _super);
    /**
     * @param {Observer|function(value: T): void} [destinationOrNext] A partially
     * defined Observer or a `next` callback function.
     * @param {function(e: ?any): void} [error] The `error` callback of an
     * Observer.
     * @param {function(): void} [complete] The `complete` callback of an
     * Observer.
     */
    function Subscriber(destinationOrNext, error, complete) {
        _super.call(this);
        this.syncErrorValue = null;
        this.syncErrorThrown = false;
        this.syncErrorThrowable = false;
        this.isStopped = false;
        switch (arguments.length) {
            case 0:
                this.destination = __WEBPACK_IMPORTED_MODULE_2__Observer__["a" /* empty */];
                break;
            case 1:
                if (!destinationOrNext) {
                    this.destination = __WEBPACK_IMPORTED_MODULE_2__Observer__["a" /* empty */];
                    break;
                }
                if (typeof destinationOrNext === 'object') {
                    if (destinationOrNext instanceof Subscriber) {
                        this.destination = destinationOrNext;
                        this.destination.add(this);
                    }
                    else {
                        this.syncErrorThrowable = true;
                        this.destination = new SafeSubscriber(this, destinationOrNext);
                    }
                    break;
                }
            default:
                this.syncErrorThrowable = true;
                this.destination = new SafeSubscriber(this, destinationOrNext, error, complete);
                break;
        }
    }
    Subscriber.prototype[__WEBPACK_IMPORTED_MODULE_3__symbol_rxSubscriber__["a" /* rxSubscriber */]] = function () { return this; };
    /**
     * A static factory for a Subscriber, given a (potentially partial) definition
     * of an Observer.
     * @param {function(x: ?T): void} [next] The `next` callback of an Observer.
     * @param {function(e: ?any): void} [error] The `error` callback of an
     * Observer.
     * @param {function(): void} [complete] The `complete` callback of an
     * Observer.
     * @return {Subscriber<T>} A Subscriber wrapping the (partially defined)
     * Observer represented by the given arguments.
     */
    Subscriber.create = function (next, error, complete) {
        var subscriber = new Subscriber(next, error, complete);
        subscriber.syncErrorThrowable = false;
        return subscriber;
    };
    /**
     * The {@link Observer} callback to receive notifications of type `next` from
     * the Observable, with a value. The Observable may call this method 0 or more
     * times.
     * @param {T} [value] The `next` value.
     * @return {void}
     */
    Subscriber.prototype.next = function (value) {
        if (!this.isStopped) {
            this._next(value);
        }
    };
    /**
     * The {@link Observer} callback to receive notifications of type `error` from
     * the Observable, with an attached {@link Error}. Notifies the Observer that
     * the Observable has experienced an error condition.
     * @param {any} [err] The `error` exception.
     * @return {void}
     */
    Subscriber.prototype.error = function (err) {
        if (!this.isStopped) {
            this.isStopped = true;
            this._error(err);
        }
    };
    /**
     * The {@link Observer} callback to receive a valueless notification of type
     * `complete` from the Observable. Notifies the Observer that the Observable
     * has finished sending push-based notifications.
     * @return {void}
     */
    Subscriber.prototype.complete = function () {
        if (!this.isStopped) {
            this.isStopped = true;
            this._complete();
        }
    };
    Subscriber.prototype.unsubscribe = function () {
        if (this.closed) {
            return;
        }
        this.isStopped = true;
        _super.prototype.unsubscribe.call(this);
    };
    Subscriber.prototype._next = function (value) {
        this.destination.next(value);
    };
    Subscriber.prototype._error = function (err) {
        this.destination.error(err);
        this.unsubscribe();
    };
    Subscriber.prototype._complete = function () {
        this.destination.complete();
        this.unsubscribe();
    };
    Subscriber.prototype._unsubscribeAndRecycle = function () {
        var _a = this, _parent = _a._parent, _parents = _a._parents;
        this._parent = null;
        this._parents = null;
        this.unsubscribe();
        this.closed = false;
        this.isStopped = false;
        this._parent = _parent;
        this._parents = _parents;
        return this;
    };
    return Subscriber;
}(__WEBPACK_IMPORTED_MODULE_1__Subscription__["a" /* Subscription */]));
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var SafeSubscriber = /*@__PURE__*/ (/*@__PURE__*/ function (_super) {
    __extends(SafeSubscriber, _super);
    function SafeSubscriber(_parentSubscriber, observerOrNext, error, complete) {
        _super.call(this);
        this._parentSubscriber = _parentSubscriber;
        var next;
        var context = this;
        if (Object(__WEBPACK_IMPORTED_MODULE_0__util_isFunction__["a" /* isFunction */])(observerOrNext)) {
            next = observerOrNext;
        }
        else if (observerOrNext) {
            next = observerOrNext.next;
            error = observerOrNext.error;
            complete = observerOrNext.complete;
            if (observerOrNext !== __WEBPACK_IMPORTED_MODULE_2__Observer__["a" /* empty */]) {
                context = Object.create(observerOrNext);
                if (Object(__WEBPACK_IMPORTED_MODULE_0__util_isFunction__["a" /* isFunction */])(context.unsubscribe)) {
                    this.add(context.unsubscribe.bind(context));
                }
                context.unsubscribe = this.unsubscribe.bind(this);
            }
        }
        this._context = context;
        this._next = next;
        this._error = error;
        this._complete = complete;
    }
    SafeSubscriber.prototype.next = function (value) {
        if (!this.isStopped && this._next) {
            var _parentSubscriber = this._parentSubscriber;
            if (!_parentSubscriber.syncErrorThrowable) {
                this.__tryOrUnsub(this._next, value);
            }
            else if (this.__tryOrSetError(_parentSubscriber, this._next, value)) {
                this.unsubscribe();
            }
        }
    };
    SafeSubscriber.prototype.error = function (err) {
        if (!this.isStopped) {
            var _parentSubscriber = this._parentSubscriber;
            if (this._error) {
                if (!_parentSubscriber.syncErrorThrowable) {
                    this.__tryOrUnsub(this._error, err);
                    this.unsubscribe();
                }
                else {
                    this.__tryOrSetError(_parentSubscriber, this._error, err);
                    this.unsubscribe();
                }
            }
            else if (!_parentSubscriber.syncErrorThrowable) {
                this.unsubscribe();
                throw err;
            }
            else {
                _parentSubscriber.syncErrorValue = err;
                _parentSubscriber.syncErrorThrown = true;
                this.unsubscribe();
            }
        }
    };
    SafeSubscriber.prototype.complete = function () {
        var _this = this;
        if (!this.isStopped) {
            var _parentSubscriber = this._parentSubscriber;
            if (this._complete) {
                var wrappedComplete = function () { return _this._complete.call(_this._context); };
                if (!_parentSubscriber.syncErrorThrowable) {
                    this.__tryOrUnsub(wrappedComplete);
                    this.unsubscribe();
                }
                else {
                    this.__tryOrSetError(_parentSubscriber, wrappedComplete);
                    this.unsubscribe();
                }
            }
            else {
                this.unsubscribe();
            }
        }
    };
    SafeSubscriber.prototype.__tryOrUnsub = function (fn, value) {
        try {
            fn.call(this._context, value);
        }
        catch (err) {
            this.unsubscribe();
            throw err;
        }
    };
    SafeSubscriber.prototype.__tryOrSetError = function (parent, fn, value) {
        try {
            fn.call(this._context, value);
        }
        catch (err) {
            parent.syncErrorValue = err;
            parent.syncErrorThrown = true;
            return true;
        }
        return false;
    };
    SafeSubscriber.prototype._unsubscribe = function () {
        var _parentSubscriber = this._parentSubscriber;
        this._context = null;
        this._parentSubscriber = null;
        _parentSubscriber.unsubscribe();
    };
    return SafeSubscriber;
}(Subscriber));
//# sourceMappingURL=Subscriber.js.map 


/***/ }),

/***/ "../../../../../../node_modules/rxjs/_esm5/Subscription.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Subscription; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_isArray__ = __webpack_require__("../../../../../../node_modules/rxjs/_esm5/util/isArray.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_isObject__ = __webpack_require__("../../../../../../node_modules/rxjs/_esm5/util/isObject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_isFunction__ = __webpack_require__("../../../../../../node_modules/rxjs/_esm5/util/isFunction.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util_tryCatch__ = __webpack_require__("../../../../../../node_modules/rxjs/_esm5/util/tryCatch.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__util_errorObject__ = __webpack_require__("../../../../../../node_modules/rxjs/_esm5/util/errorObject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__util_UnsubscriptionError__ = __webpack_require__("../../../../../../node_modules/rxjs/_esm5/util/UnsubscriptionError.js");
/** PURE_IMPORTS_START ._util_isArray,._util_isObject,._util_isFunction,._util_tryCatch,._util_errorObject,._util_UnsubscriptionError PURE_IMPORTS_END */






/**
 * Represents a disposable resource, such as the execution of an Observable. A
 * Subscription has one important method, `unsubscribe`, that takes no argument
 * and just disposes the resource held by the subscription.
 *
 * Additionally, subscriptions may be grouped together through the `add()`
 * method, which will attach a child Subscription to the current Subscription.
 * When a Subscription is unsubscribed, all its children (and its grandchildren)
 * will be unsubscribed as well.
 *
 * @class Subscription
 */
var Subscription = /*@__PURE__*/ (/*@__PURE__*/ function () {
    /**
     * @param {function(): void} [unsubscribe] A function describing how to
     * perform the disposal of resources when the `unsubscribe` method is called.
     */
    function Subscription(unsubscribe) {
        /**
         * A flag to indicate whether this Subscription has already been unsubscribed.
         * @type {boolean}
         */
        this.closed = false;
        this._parent = null;
        this._parents = null;
        this._subscriptions = null;
        if (unsubscribe) {
            this._unsubscribe = unsubscribe;
        }
    }
    /**
     * Disposes the resources held by the subscription. May, for instance, cancel
     * an ongoing Observable execution or cancel any other type of work that
     * started when the Subscription was created.
     * @return {void}
     */
    Subscription.prototype.unsubscribe = function () {
        var hasErrors = false;
        var errors;
        if (this.closed) {
            return;
        }
        var _a = this, _parent = _a._parent, _parents = _a._parents, _unsubscribe = _a._unsubscribe, _subscriptions = _a._subscriptions;
        this.closed = true;
        this._parent = null;
        this._parents = null;
        // null out _subscriptions first so any child subscriptions that attempt
        // to remove themselves from this subscription will noop
        this._subscriptions = null;
        var index = -1;
        var len = _parents ? _parents.length : 0;
        // if this._parent is null, then so is this._parents, and we
        // don't have to remove ourselves from any parent subscriptions.
        while (_parent) {
            _parent.remove(this);
            // if this._parents is null or index >= len,
            // then _parent is set to null, and the loop exits
            _parent = ++index < len && _parents[index] || null;
        }
        if (Object(__WEBPACK_IMPORTED_MODULE_2__util_isFunction__["a" /* isFunction */])(_unsubscribe)) {
            var trial = Object(__WEBPACK_IMPORTED_MODULE_3__util_tryCatch__["a" /* tryCatch */])(_unsubscribe).call(this);
            if (trial === __WEBPACK_IMPORTED_MODULE_4__util_errorObject__["a" /* errorObject */]) {
                hasErrors = true;
                errors = errors || (__WEBPACK_IMPORTED_MODULE_4__util_errorObject__["a" /* errorObject */].e instanceof __WEBPACK_IMPORTED_MODULE_5__util_UnsubscriptionError__["a" /* UnsubscriptionError */] ?
                    flattenUnsubscriptionErrors(__WEBPACK_IMPORTED_MODULE_4__util_errorObject__["a" /* errorObject */].e.errors) : [__WEBPACK_IMPORTED_MODULE_4__util_errorObject__["a" /* errorObject */].e]);
            }
        }
        if (Object(__WEBPACK_IMPORTED_MODULE_0__util_isArray__["a" /* isArray */])(_subscriptions)) {
            index = -1;
            len = _subscriptions.length;
            while (++index < len) {
                var sub = _subscriptions[index];
                if (Object(__WEBPACK_IMPORTED_MODULE_1__util_isObject__["a" /* isObject */])(sub)) {
                    var trial = Object(__WEBPACK_IMPORTED_MODULE_3__util_tryCatch__["a" /* tryCatch */])(sub.unsubscribe).call(sub);
                    if (trial === __WEBPACK_IMPORTED_MODULE_4__util_errorObject__["a" /* errorObject */]) {
                        hasErrors = true;
                        errors = errors || [];
                        var err = __WEBPACK_IMPORTED_MODULE_4__util_errorObject__["a" /* errorObject */].e;
                        if (err instanceof __WEBPACK_IMPORTED_MODULE_5__util_UnsubscriptionError__["a" /* UnsubscriptionError */]) {
                            errors = errors.concat(flattenUnsubscriptionErrors(err.errors));
                        }
                        else {
                            errors.push(err);
                        }
                    }
                }
            }
        }
        if (hasErrors) {
            throw new __WEBPACK_IMPORTED_MODULE_5__util_UnsubscriptionError__["a" /* UnsubscriptionError */](errors);
        }
    };
    /**
     * Adds a tear down to be called during the unsubscribe() of this
     * Subscription.
     *
     * If the tear down being added is a subscription that is already
     * unsubscribed, is the same reference `add` is being called on, or is
     * `Subscription.EMPTY`, it will not be added.
     *
     * If this subscription is already in an `closed` state, the passed
     * tear down logic will be executed immediately.
     *
     * @param {TeardownLogic} teardown The additional logic to execute on
     * teardown.
     * @return {Subscription} Returns the Subscription used or created to be
     * added to the inner subscriptions list. This Subscription can be used with
     * `remove()` to remove the passed teardown logic from the inner subscriptions
     * list.
     */
    Subscription.prototype.add = function (teardown) {
        if (!teardown || (teardown === Subscription.EMPTY)) {
            return Subscription.EMPTY;
        }
        if (teardown === this) {
            return this;
        }
        var subscription = teardown;
        switch (typeof teardown) {
            case 'function':
                subscription = new Subscription(teardown);
            case 'object':
                if (subscription.closed || typeof subscription.unsubscribe !== 'function') {
                    return subscription;
                }
                else if (this.closed) {
                    subscription.unsubscribe();
                    return subscription;
                }
                else if (typeof subscription._addParent !== 'function' /* quack quack */) {
                    var tmp = subscription;
                    subscription = new Subscription();
                    subscription._subscriptions = [tmp];
                }
                break;
            default:
                throw new Error('unrecognized teardown ' + teardown + ' added to Subscription.');
        }
        var subscriptions = this._subscriptions || (this._subscriptions = []);
        subscriptions.push(subscription);
        subscription._addParent(this);
        return subscription;
    };
    /**
     * Removes a Subscription from the internal list of subscriptions that will
     * unsubscribe during the unsubscribe process of this Subscription.
     * @param {Subscription} subscription The subscription to remove.
     * @return {void}
     */
    Subscription.prototype.remove = function (subscription) {
        var subscriptions = this._subscriptions;
        if (subscriptions) {
            var subscriptionIndex = subscriptions.indexOf(subscription);
            if (subscriptionIndex !== -1) {
                subscriptions.splice(subscriptionIndex, 1);
            }
        }
    };
    Subscription.prototype._addParent = function (parent) {
        var _a = this, _parent = _a._parent, _parents = _a._parents;
        if (!_parent || _parent === parent) {
            // If we don't have a parent, or the new parent is the same as the
            // current parent, then set this._parent to the new parent.
            this._parent = parent;
        }
        else if (!_parents) {
            // If there's already one parent, but not multiple, allocate an Array to
            // store the rest of the parent Subscriptions.
            this._parents = [parent];
        }
        else if (_parents.indexOf(parent) === -1) {
            // Only add the new parent to the _parents list if it's not already there.
            _parents.push(parent);
        }
    };
    Subscription.EMPTY = (function (empty) {
        empty.closed = true;
        return empty;
    }(new Subscription()));
    return Subscription;
}());
function flattenUnsubscriptionErrors(errors) {
    return errors.reduce(function (errs, err) { return errs.concat((err instanceof __WEBPACK_IMPORTED_MODULE_5__util_UnsubscriptionError__["a" /* UnsubscriptionError */]) ? err.errors : err); }, []);
}
//# sourceMappingURL=Subscription.js.map 


/***/ }),

/***/ "../../../../../../node_modules/rxjs/_esm5/observable/ArrayObservable.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ArrayObservable; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Observable__ = __webpack_require__("../../../../../../node_modules/rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ScalarObservable__ = __webpack_require__("../../../../../../node_modules/rxjs/_esm5/observable/ScalarObservable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__EmptyObservable__ = __webpack_require__("../../../../../../node_modules/rxjs/_esm5/observable/EmptyObservable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util_isScheduler__ = __webpack_require__("../../../../../../node_modules/rxjs/_esm5/util/isScheduler.js");
/** PURE_IMPORTS_START .._Observable,._ScalarObservable,._EmptyObservable,.._util_isScheduler PURE_IMPORTS_END */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b)
        if (b.hasOwnProperty(p))
            d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};




/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var ArrayObservable = /*@__PURE__*/ (/*@__PURE__*/ function (_super) {
    __extends(ArrayObservable, _super);
    function ArrayObservable(array, scheduler) {
        _super.call(this);
        this.array = array;
        this.scheduler = scheduler;
        if (!scheduler && array.length === 1) {
            this._isScalar = true;
            this.value = array[0];
        }
    }
    ArrayObservable.create = function (array, scheduler) {
        return new ArrayObservable(array, scheduler);
    };
    /**
     * Creates an Observable that emits some values you specify as arguments,
     * immediately one after the other, and then emits a complete notification.
     *
     * <span class="informal">Emits the arguments you provide, then completes.
     * </span>
     *
     * <img src="./img/of.png" width="100%">
     *
     * This static operator is useful for creating a simple Observable that only
     * emits the arguments given, and the complete notification thereafter. It can
     * be used for composing with other Observables, such as with {@link concat}.
     * By default, it uses a `null` IScheduler, which means the `next`
     * notifications are sent synchronously, although with a different IScheduler
     * it is possible to determine when those notifications will be delivered.
     *
     * @example <caption>Emit 10, 20, 30, then 'a', 'b', 'c', then start ticking every second.</caption>
     * var numbers = Rx.Observable.of(10, 20, 30);
     * var letters = Rx.Observable.of('a', 'b', 'c');
     * var interval = Rx.Observable.interval(1000);
     * var result = numbers.concat(letters).concat(interval);
     * result.subscribe(x => console.log(x));
     *
     * @see {@link create}
     * @see {@link empty}
     * @see {@link never}
     * @see {@link throw}
     *
     * @param {...T} values Arguments that represent `next` values to be emitted.
     * @param {Scheduler} [scheduler] A {@link IScheduler} to use for scheduling
     * the emissions of the `next` notifications.
     * @return {Observable<T>} An Observable that emits each given input value.
     * @static true
     * @name of
     * @owner Observable
     */
    ArrayObservable.of = function () {
        var array = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            array[_i - 0] = arguments[_i];
        }
        var scheduler = array[array.length - 1];
        if (Object(__WEBPACK_IMPORTED_MODULE_3__util_isScheduler__["a" /* isScheduler */])(scheduler)) {
            array.pop();
        }
        else {
            scheduler = null;
        }
        var len = array.length;
        if (len > 1) {
            return new ArrayObservable(array, scheduler);
        }
        else if (len === 1) {
            return new __WEBPACK_IMPORTED_MODULE_1__ScalarObservable__["a" /* ScalarObservable */](array[0], scheduler);
        }
        else {
            return new __WEBPACK_IMPORTED_MODULE_2__EmptyObservable__["a" /* EmptyObservable */](scheduler);
        }
    };
    ArrayObservable.dispatch = function (state) {
        var array = state.array, index = state.index, count = state.count, subscriber = state.subscriber;
        if (index >= count) {
            subscriber.complete();
            return;
        }
        subscriber.next(array[index]);
        if (subscriber.closed) {
            return;
        }
        state.index = index + 1;
        this.schedule(state);
    };
    ArrayObservable.prototype._subscribe = function (subscriber) {
        var index = 0;
        var array = this.array;
        var count = array.length;
        var scheduler = this.scheduler;
        if (scheduler) {
            return scheduler.schedule(ArrayObservable.dispatch, 0, {
                array: array, index: index, count: count, subscriber: subscriber
            });
        }
        else {
            for (var i = 0; i < count && !subscriber.closed; i++) {
                subscriber.next(array[i]);
            }
            subscriber.complete();
        }
    };
    return ArrayObservable;
}(__WEBPACK_IMPORTED_MODULE_0__Observable__["a" /* Observable */]));
//# sourceMappingURL=ArrayObservable.js.map 


/***/ }),

/***/ "../../../../../../node_modules/rxjs/_esm5/observable/ConnectableObservable.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export ConnectableObservable */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return connectableObservableDescriptor; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Subject__ = __webpack_require__("../../../../../../node_modules/rxjs/_esm5/Subject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Observable__ = __webpack_require__("../../../../../../node_modules/rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Subscriber__ = __webpack_require__("../../../../../../node_modules/rxjs/_esm5/Subscriber.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Subscription__ = __webpack_require__("../../../../../../node_modules/rxjs/_esm5/Subscription.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__operators_refCount__ = __webpack_require__("../../../../../../node_modules/rxjs/_esm5/operators/refCount.js");
/** PURE_IMPORTS_START .._Subject,.._Observable,.._Subscriber,.._Subscription,.._operators_refCount PURE_IMPORTS_END */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b)
        if (b.hasOwnProperty(p))
            d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};





/**
 * @class ConnectableObservable<T>
 */
var ConnectableObservable = /*@__PURE__*/ (/*@__PURE__*/ function (_super) {
    __extends(ConnectableObservable, _super);
    function ConnectableObservable(source, subjectFactory) {
        _super.call(this);
        this.source = source;
        this.subjectFactory = subjectFactory;
        this._refCount = 0;
        this._isComplete = false;
    }
    ConnectableObservable.prototype._subscribe = function (subscriber) {
        return this.getSubject().subscribe(subscriber);
    };
    ConnectableObservable.prototype.getSubject = function () {
        var subject = this._subject;
        if (!subject || subject.isStopped) {
            this._subject = this.subjectFactory();
        }
        return this._subject;
    };
    ConnectableObservable.prototype.connect = function () {
        var connection = this._connection;
        if (!connection) {
            this._isComplete = false;
            connection = this._connection = new __WEBPACK_IMPORTED_MODULE_3__Subscription__["a" /* Subscription */]();
            connection.add(this.source
                .subscribe(new ConnectableSubscriber(this.getSubject(), this)));
            if (connection.closed) {
                this._connection = null;
                connection = __WEBPACK_IMPORTED_MODULE_3__Subscription__["a" /* Subscription */].EMPTY;
            }
            else {
                this._connection = connection;
            }
        }
        return connection;
    };
    ConnectableObservable.prototype.refCount = function () {
        return Object(__WEBPACK_IMPORTED_MODULE_4__operators_refCount__["a" /* refCount */])()(this);
    };
    return ConnectableObservable;
}(__WEBPACK_IMPORTED_MODULE_1__Observable__["a" /* Observable */]));
var connectableProto = ConnectableObservable.prototype;
var connectableObservableDescriptor = {
    operator: { value: null },
    _refCount: { value: 0, writable: true },
    _subject: { value: null, writable: true },
    _connection: { value: null, writable: true },
    _subscribe: { value: connectableProto._subscribe },
    _isComplete: { value: connectableProto._isComplete, writable: true },
    getSubject: { value: connectableProto.getSubject },
    connect: { value: connectableProto.connect },
    refCount: { value: connectableProto.refCount }
};
var ConnectableSubscriber = /*@__PURE__*/ (/*@__PURE__*/ function (_super) {
    __extends(ConnectableSubscriber, _super);
    function ConnectableSubscriber(destination, connectable) {
        _super.call(this, destination);
        this.connectable = connectable;
    }
    ConnectableSubscriber.prototype._error = function (err) {
        this._unsubscribe();
        _super.prototype._error.call(this, err);
    };
    ConnectableSubscriber.prototype._complete = function () {
        this.connectable._isComplete = true;
        this._unsubscribe();
        _super.prototype._complete.call(this);
    };
    ConnectableSubscriber.prototype._unsubscribe = function () {
        var connectable = this.connectable;
        if (connectable) {
            this.connectable = null;
            var connection = connectable._connection;
            connectable._refCount = 0;
            connectable._subject = null;
            connectable._connection = null;
            if (connection) {
                connection.unsubscribe();
            }
        }
    };
    return ConnectableSubscriber;
}(__WEBPACK_IMPORTED_MODULE_0__Subject__["b" /* SubjectSubscriber */]));
var RefCountOperator = /*@__PURE__*/ (/*@__PURE__*/ function () {
    function RefCountOperator(connectable) {
        this.connectable = connectable;
    }
    RefCountOperator.prototype.call = function (subscriber, source) {
        var connectable = this.connectable;
        connectable._refCount++;
        var refCounter = new RefCountSubscriber(subscriber, connectable);
        var subscription = source.subscribe(refCounter);
        if (!refCounter.closed) {
            refCounter.connection = connectable.connect();
        }
        return subscription;
    };
    return RefCountOperator;
}());
var RefCountSubscriber = /*@__PURE__*/ (/*@__PURE__*/ function (_super) {
    __extends(RefCountSubscriber, _super);
    function RefCountSubscriber(destination, connectable) {
        _super.call(this, destination);
        this.connectable = connectable;
    }
    RefCountSubscriber.prototype._unsubscribe = function () {
        var connectable = this.connectable;
        if (!connectable) {
            this.connection = null;
            return;
        }
        this.connectable = null;
        var refCount = connectable._refCount;
        if (refCount <= 0) {
            this.connection = null;
            return;
        }
        connectable._refCount = refCount - 1;
        if (refCount > 1) {
            this.connection = null;
            return;
        }
        ///
        // Compare the local RefCountSubscriber's connection Subscription to the
        // connection Subscription on the shared ConnectableObservable. In cases
        // where the ConnectableObservable source synchronously emits values, and
        // the RefCountSubscriber's downstream Observers synchronously unsubscribe,
        // execution continues to here before the RefCountOperator has a chance to
        // supply the RefCountSubscriber with the shared connection Subscription.
        // For example:
        // ```
        // Observable.range(0, 10)
        //   .publish()
        //   .refCount()
        //   .take(5)
        //   .subscribe();
        // ```
        // In order to account for this case, RefCountSubscriber should only dispose
        // the ConnectableObservable's shared connection Subscription if the
        // connection Subscription exists, *and* either:
        //   a. RefCountSubscriber doesn't have a reference to the shared connection
        //      Subscription yet, or,
        //   b. RefCountSubscriber's connection Subscription reference is identical
        //      to the shared connection Subscription
        ///
        var connection = this.connection;
        var sharedConnection = connectable._connection;
        this.connection = null;
        if (sharedConnection && (!connection || sharedConnection === connection)) {
            sharedConnection.unsubscribe();
        }
    };
    return RefCountSubscriber;
}(__WEBPACK_IMPORTED_MODULE_2__Subscriber__["a" /* Subscriber */]));
//# sourceMappingURL=ConnectableObservable.js.map 


/***/ }),

/***/ "../../../../../../node_modules/rxjs/_esm5/observable/EmptyObservable.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EmptyObservable; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Observable__ = __webpack_require__("../../../../../../node_modules/rxjs/_esm5/Observable.js");
/** PURE_IMPORTS_START .._Observable PURE_IMPORTS_END */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b)
        if (b.hasOwnProperty(p))
            d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var EmptyObservable = /*@__PURE__*/ (/*@__PURE__*/ function (_super) {
    __extends(EmptyObservable, _super);
    function EmptyObservable(scheduler) {
        _super.call(this);
        this.scheduler = scheduler;
    }
    /**
     * Creates an Observable that emits no items to the Observer and immediately
     * emits a complete notification.
     *
     * <span class="informal">Just emits 'complete', and nothing else.
     * </span>
     *
     * <img src="./img/empty.png" width="100%">
     *
     * This static operator is useful for creating a simple Observable that only
     * emits the complete notification. It can be used for composing with other
     * Observables, such as in a {@link mergeMap}.
     *
     * @example <caption>Emit the number 7, then complete.</caption>
     * var result = Rx.Observable.empty().startWith(7);
     * result.subscribe(x => console.log(x));
     *
     * @example <caption>Map and flatten only odd numbers to the sequence 'a', 'b', 'c'</caption>
     * var interval = Rx.Observable.interval(1000);
     * var result = interval.mergeMap(x =>
     *   x % 2 === 1 ? Rx.Observable.of('a', 'b', 'c') : Rx.Observable.empty()
     * );
     * result.subscribe(x => console.log(x));
     *
     * // Results in the following to the console:
     * // x is equal to the count on the interval eg(0,1,2,3,...)
     * // x will occur every 1000ms
     * // if x % 2 is equal to 1 print abc
     * // if x % 2 is not equal to 1 nothing will be output
     *
     * @see {@link create}
     * @see {@link never}
     * @see {@link of}
     * @see {@link throw}
     *
     * @param {Scheduler} [scheduler] A {@link IScheduler} to use for scheduling
     * the emission of the complete notification.
     * @return {Observable} An "empty" Observable: emits only the complete
     * notification.
     * @static true
     * @name empty
     * @owner Observable
     */
    EmptyObservable.create = function (scheduler) {
        return new EmptyObservable(scheduler);
    };
    EmptyObservable.dispatch = function (arg) {
        var subscriber = arg.subscriber;
        subscriber.complete();
    };
    EmptyObservable.prototype._subscribe = function (subscriber) {
        var scheduler = this.scheduler;
        if (scheduler) {
            return scheduler.schedule(EmptyObservable.dispatch, 0, { subscriber: subscriber });
        }
        else {
            subscriber.complete();
        }
    };
    return EmptyObservable;
}(__WEBPACK_IMPORTED_MODULE_0__Observable__["a" /* Observable */]));
//# sourceMappingURL=EmptyObservable.js.map 


/***/ }),

/***/ "../../../../../../node_modules/rxjs/_esm5/observable/ForkJoinObservable.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ForkJoinObservable; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Observable__ = __webpack_require__("../../../../../../node_modules/rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__EmptyObservable__ = __webpack_require__("../../../../../../node_modules/rxjs/_esm5/observable/EmptyObservable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_isArray__ = __webpack_require__("../../../../../../node_modules/rxjs/_esm5/util/isArray.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util_subscribeToResult__ = __webpack_require__("../../../../../../node_modules/rxjs/_esm5/util/subscribeToResult.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__OuterSubscriber__ = __webpack_require__("../../../../../../node_modules/rxjs/_esm5/OuterSubscriber.js");
/** PURE_IMPORTS_START .._Observable,._EmptyObservable,.._util_isArray,.._util_subscribeToResult,.._OuterSubscriber PURE_IMPORTS_END */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b)
        if (b.hasOwnProperty(p))
            d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};





/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var ForkJoinObservable = /*@__PURE__*/ (/*@__PURE__*/ function (_super) {
    __extends(ForkJoinObservable, _super);
    function ForkJoinObservable(sources, resultSelector) {
        _super.call(this);
        this.sources = sources;
        this.resultSelector = resultSelector;
    }
    /* tslint:enable:max-line-length */
    /**
     * Joins last values emitted by passed Observables.
     *
     * <span class="informal">Wait for Observables to complete and then combine last values they emitted.</span>
     *
     * <img src="./img/forkJoin.png" width="100%">
     *
     * `forkJoin` is an operator that takes any number of Observables which can be passed either as an array
     * or directly as arguments. If no input Observables are provided, resulting stream will complete
     * immediately.
     *
     * `forkJoin` will wait for all passed Observables to complete and then it will emit an array with last
     * values from corresponding Observables. So if you pass `n` Observables to the operator, resulting
     * array will have `n` values, where first value is the last thing emitted by the first Observable,
     * second value is the last thing emitted by the second Observable and so on. That means `forkJoin` will
     * not emit more than once and it will complete after that. If you need to emit combined values not only
     * at the end of lifecycle of passed Observables, but also throughout it, try out {@link combineLatest}
     * or {@link zip} instead.
     *
     * In order for resulting array to have the same length as the number of input Observables, whenever any of
     * that Observables completes without emitting any value, `forkJoin` will complete at that moment as well
     * and it will not emit anything either, even if it already has some last values from other Observables.
     * Conversely, if there is an Observable that never completes, `forkJoin` will never complete as well,
     * unless at any point some other Observable completes without emitting value, which brings us back to
     * the previous case. Overall, in order for `forkJoin` to emit a value, all Observables passed as arguments
     * have to emit something at least once and complete.
     *
     * If any input Observable errors at some point, `forkJoin` will error as well and all other Observables
     * will be immediately unsubscribed.
     *
     * Optionally `forkJoin` accepts project function, that will be called with values which normally
     * would land in emitted array. Whatever is returned by project function, will appear in output
     * Observable instead. This means that default project can be thought of as a function that takes
     * all its arguments and puts them into an array. Note that project function will be called only
     * when output Observable is supposed to emit a result.
     *
     * @example <caption>Use forkJoin with operator emitting immediately</caption>
     * const observable = Rx.Observable.forkJoin(
     *   Rx.Observable.of(1, 2, 3, 4),
     *   Rx.Observable.of(5, 6, 7, 8)
     * );
     * observable.subscribe(
     *   value => console.log(value),
     *   err => {},
     *   () => console.log('This is how it ends!')
     * );
     *
     * // Logs:
     * // [4, 8]
     * // "This is how it ends!"
     *
     *
     * @example <caption>Use forkJoin with operator emitting after some time</caption>
     * const observable = Rx.Observable.forkJoin(
     *   Rx.Observable.interval(1000).take(3), // emit 0, 1, 2 every second and complete
     *   Rx.Observable.interval(500).take(4) // emit 0, 1, 2, 3 every half a second and complete
     * );
     * observable.subscribe(
     *   value => console.log(value),
     *   err => {},
     *   () => console.log('This is how it ends!')
     * );
     *
     * // Logs:
     * // [2, 3] after 3 seconds
     * // "This is how it ends!" immediately after
     *
     *
     * @example <caption>Use forkJoin with project function</caption>
     * const observable = Rx.Observable.forkJoin(
     *   Rx.Observable.interval(1000).take(3), // emit 0, 1, 2 every second and complete
     *   Rx.Observable.interval(500).take(4), // emit 0, 1, 2, 3 every half a second and complete
     *   (n, m) => n + m
     * );
     * observable.subscribe(
     *   value => console.log(value),
     *   err => {},
     *   () => console.log('This is how it ends!')
     * );
     *
     * // Logs:
     * // 5 after 3 seconds
     * // "This is how it ends!" immediately after
     *
     * @see {@link combineLatest}
     * @see {@link zip}
     *
     * @param {...SubscribableOrPromise} sources Any number of Observables provided either as an array or as an arguments
     * passed directly to the operator.
     * @param {function} [project] Function that takes values emitted by input Observables and returns value
     * that will appear in resulting Observable instead of default array.
     * @return {Observable} Observable emitting either an array of last values emitted by passed Observables
     * or value from project function.
     * @static true
     * @name forkJoin
     * @owner Observable
     */
    ForkJoinObservable.create = function () {
        var sources = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            sources[_i - 0] = arguments[_i];
        }
        if (sources === null || arguments.length === 0) {
            return new __WEBPACK_IMPORTED_MODULE_1__EmptyObservable__["a" /* EmptyObservable */]();
        }
        var resultSelector = null;
        if (typeof sources[sources.length - 1] === 'function') {
            resultSelector = sources.pop();
        }
        // if the first and only other argument besides the resultSelector is an array
        // assume it's been called with `forkJoin([obs1, obs2, obs3], resultSelector)`
        if (sources.length === 1 && Object(__WEBPACK_IMPORTED_MODULE_2__util_isArray__["a" /* isArray */])(sources[0])) {
            sources = sources[0];
        }
        if (sources.length === 0) {
            return new __WEBPACK_IMPORTED_MODULE_1__EmptyObservable__["a" /* EmptyObservable */]();
        }
        return new ForkJoinObservable(sources, resultSelector);
    };
    ForkJoinObservable.prototype._subscribe = function (subscriber) {
        return new ForkJoinSubscriber(subscriber, this.sources, this.resultSelector);
    };
    return ForkJoinObservable;
}(__WEBPACK_IMPORTED_MODULE_0__Observable__["a" /* Observable */]));
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var ForkJoinSubscriber = /*@__PURE__*/ (/*@__PURE__*/ function (_super) {
    __extends(ForkJoinSubscriber, _super);
    function ForkJoinSubscriber(destination, sources, resultSelector) {
        _super.call(this, destination);
        this.sources = sources;
        this.resultSelector = resultSelector;
        this.completed = 0;
        this.haveValues = 0;
        var len = sources.length;
        this.total = len;
        this.values = new Array(len);
        for (var i = 0; i < len; i++) {
            var source = sources[i];
            var innerSubscription = Object(__WEBPACK_IMPORTED_MODULE_3__util_subscribeToResult__["a" /* subscribeToResult */])(this, source, null, i);
            if (innerSubscription) {
                innerSubscription.outerIndex = i;
                this.add(innerSubscription);
            }
        }
    }
    ForkJoinSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.values[outerIndex] = innerValue;
        if (!innerSub._hasValue) {
            innerSub._hasValue = true;
            this.haveValues++;
        }
    };
    ForkJoinSubscriber.prototype.notifyComplete = function (innerSub) {
        var destination = this.destination;
        var _a = this, haveValues = _a.haveValues, resultSelector = _a.resultSelector, values = _a.values;
        var len = values.length;
        if (!innerSub._hasValue) {
            destination.complete();
            return;
        }
        this.completed++;
        if (this.completed !== len) {
            return;
        }
        if (haveValues === len) {
            var value = resultSelector ? resultSelector.apply(this, values) : values;
            destination.next(value);
        }
        destination.complete();
    };
    return ForkJoinSubscriber;
}(__WEBPACK_IMPORTED_MODULE_4__OuterSubscriber__["a" /* OuterSubscriber */]));
//# sourceMappingURL=ForkJoinObservable.js.map 


/***/ }),

/***/ "../../../../../../node_modules/rxjs/_esm5/observable/PromiseObservable.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PromiseObservable; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_root__ = __webpack_require__("../../../../../../node_modules/rxjs/_esm5/util/root.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Observable__ = __webpack_require__("../../../../../../node_modules/rxjs/_esm5/Observable.js");
/** PURE_IMPORTS_START .._util_root,.._Observable PURE_IMPORTS_END */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b)
        if (b.hasOwnProperty(p))
            d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};


/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var PromiseObservable = /*@__PURE__*/ (/*@__PURE__*/ function (_super) {
    __extends(PromiseObservable, _super);
    function PromiseObservable(promise, scheduler) {
        _super.call(this);
        this.promise = promise;
        this.scheduler = scheduler;
    }
    /**
     * Converts a Promise to an Observable.
     *
     * <span class="informal">Returns an Observable that just emits the Promise's
     * resolved value, then completes.</span>
     *
     * Converts an ES2015 Promise or a Promises/A+ spec compliant Promise to an
     * Observable. If the Promise resolves with a value, the output Observable
     * emits that resolved value as a `next`, and then completes. If the Promise
     * is rejected, then the output Observable emits the corresponding Error.
     *
     * @example <caption>Convert the Promise returned by Fetch to an Observable</caption>
     * var result = Rx.Observable.fromPromise(fetch('http://myserver.com/'));
     * result.subscribe(x => console.log(x), e => console.error(e));
     *
     * @see {@link bindCallback}
     * @see {@link from}
     *
     * @param {PromiseLike<T>} promise The promise to be converted.
     * @param {Scheduler} [scheduler] An optional IScheduler to use for scheduling
     * the delivery of the resolved value (or the rejection).
     * @return {Observable<T>} An Observable which wraps the Promise.
     * @static true
     * @name fromPromise
     * @owner Observable
     */
    PromiseObservable.create = function (promise, scheduler) {
        return new PromiseObservable(promise, scheduler);
    };
    PromiseObservable.prototype._subscribe = function (subscriber) {
        var _this = this;
        var promise = this.promise;
        var scheduler = this.scheduler;
        if (scheduler == null) {
            if (this._isScalar) {
                if (!subscriber.closed) {
                    subscriber.next(this.value);
                    subscriber.complete();
                }
            }
            else {
                promise.then(function (value) {
                    _this.value = value;
                    _this._isScalar = true;
                    if (!subscriber.closed) {
                        subscriber.next(value);
                        subscriber.complete();
                    }
                }, function (err) {
                    if (!subscriber.closed) {
                        subscriber.error(err);
                    }
                })
                    .then(null, function (err) {
                    // escape the promise trap, throw unhandled errors
                    __WEBPACK_IMPORTED_MODULE_0__util_root__["a" /* root */].setTimeout(function () { throw err; });
                });
            }
        }
        else {
            if (this._isScalar) {
                if (!subscriber.closed) {
                    return scheduler.schedule(dispatchNext, 0, { value: this.value, subscriber: subscriber });
                }
            }
            else {
                promise.then(function (value) {
                    _this.value = value;
                    _this._isScalar = true;
                    if (!subscriber.closed) {
                        subscriber.add(scheduler.schedule(dispatchNext, 0, { value: value, subscriber: subscriber }));
                    }
                }, function (err) {
                    if (!subscriber.closed) {
                        subscriber.add(scheduler.schedule(dispatchError, 0, { err: err, subscriber: subscriber }));
                    }
                })
                    .then(null, function (err) {
                    // escape the promise trap, throw unhandled errors
                    __WEBPACK_IMPORTED_MODULE_0__util_root__["a" /* root */].setTimeout(function () { throw err; });
                });
            }
        }
    };
    return PromiseObservable;
}(__WEBPACK_IMPORTED_MODULE_1__Observable__["a" /* Observable */]));
function dispatchNext(arg) {
    var value = arg.value, subscriber = arg.subscriber;
    if (!subscriber.closed) {
        subscriber.next(value);
        subscriber.complete();
    }
}
function dispatchError(arg) {
    var err = arg.err, subscriber = arg.subscriber;
    if (!subscriber.closed) {
        subscriber.error(err);
    }
}
//# sourceMappingURL=PromiseObservable.js.map 


/***/ }),

/***/ "../../../../../../node_modules/rxjs/_esm5/observable/ScalarObservable.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ScalarObservable; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Observable__ = __webpack_require__("../../../../../../node_modules/rxjs/_esm5/Observable.js");
/** PURE_IMPORTS_START .._Observable PURE_IMPORTS_END */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b)
        if (b.hasOwnProperty(p))
            d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var ScalarObservable = /*@__PURE__*/ (/*@__PURE__*/ function (_super) {
    __extends(ScalarObservable, _super);
    function ScalarObservable(value, scheduler) {
        _super.call(this);
        this.value = value;
        this.scheduler = scheduler;
        this._isScalar = true;
        if (scheduler) {
            this._isScalar = false;
        }
    }
    ScalarObservable.create = function (value, scheduler) {
        return new ScalarObservable(value, scheduler);
    };
    ScalarObservable.dispatch = function (state) {
        var done = state.done, value = state.value, subscriber = state.subscriber;
        if (done) {
            subscriber.complete();
            return;
        }
        subscriber.next(value);
        if (subscriber.closed) {
            return;
        }
        state.done = true;
        this.schedule(state);
    };
    ScalarObservable.prototype._subscribe = function (subscriber) {
        var value = this.value;
        var scheduler = this.scheduler;
        if (scheduler) {
            return scheduler.schedule(ScalarObservable.dispatch, 0, {
                done: false, value: value, subscriber: subscriber
            });
        }
        else {
            subscriber.next(value);
            if (!subscriber.closed) {
                subscriber.complete();
            }
        }
    };
    return ScalarObservable;
}(__WEBPACK_IMPORTED_MODULE_0__Observable__["a" /* Observable */]));
//# sourceMappingURL=ScalarObservable.js.map 


/***/ }),

/***/ "../../../../../../node_modules/rxjs/_esm5/observable/forkJoin.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return forkJoin; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ForkJoinObservable__ = __webpack_require__("../../../../../../node_modules/rxjs/_esm5/observable/ForkJoinObservable.js");
/** PURE_IMPORTS_START ._ForkJoinObservable PURE_IMPORTS_END */

var forkJoin = __WEBPACK_IMPORTED_MODULE_0__ForkJoinObservable__["a" /* ForkJoinObservable */].create;
//# sourceMappingURL=forkJoin.js.map 


/***/ }),

/***/ "../../../../../../node_modules/rxjs/_esm5/observable/fromPromise.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return fromPromise; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__PromiseObservable__ = __webpack_require__("../../../../../../node_modules/rxjs/_esm5/observable/PromiseObservable.js");
/** PURE_IMPORTS_START ._PromiseObservable PURE_IMPORTS_END */

var fromPromise = __WEBPACK_IMPORTED_MODULE_0__PromiseObservable__["a" /* PromiseObservable */].create;
//# sourceMappingURL=fromPromise.js.map 


/***/ }),

/***/ "../../../../../../node_modules/rxjs/_esm5/observable/merge.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = merge;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Observable__ = __webpack_require__("../../../../../../node_modules/rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ArrayObservable__ = __webpack_require__("../../../../../../node_modules/rxjs/_esm5/observable/ArrayObservable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_isScheduler__ = __webpack_require__("../../../../../../node_modules/rxjs/_esm5/util/isScheduler.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__operators_mergeAll__ = __webpack_require__("../../../../../../node_modules/rxjs/_esm5/operators/mergeAll.js");
/** PURE_IMPORTS_START .._Observable,._ArrayObservable,.._util_isScheduler,.._operators_mergeAll PURE_IMPORTS_END */




/* tslint:enable:max-line-length */
/**
 * Creates an output Observable which concurrently emits all values from every
 * given input Observable.
 *
 * <span class="informal">Flattens multiple Observables together by blending
 * their values into one Observable.</span>
 *
 * <img src="./img/merge.png" width="100%">
 *
 * `merge` subscribes to each given input Observable (as arguments), and simply
 * forwards (without doing any transformation) all the values from all the input
 * Observables to the output Observable. The output Observable only completes
 * once all input Observables have completed. Any error delivered by an input
 * Observable will be immediately emitted on the output Observable.
 *
 * @example <caption>Merge together two Observables: 1s interval and clicks</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var timer = Rx.Observable.interval(1000);
 * var clicksOrTimer = Rx.Observable.merge(clicks, timer);
 * clicksOrTimer.subscribe(x => console.log(x));
 *
 * // Results in the following:
 * // timer will emit ascending values, one every second(1000ms) to console
 * // clicks logs MouseEvents to console everytime the "document" is clicked
 * // Since the two streams are merged you see these happening
 * // as they occur.
 *
 * @example <caption>Merge together 3 Observables, but only 2 run concurrently</caption>
 * var timer1 = Rx.Observable.interval(1000).take(10);
 * var timer2 = Rx.Observable.interval(2000).take(6);
 * var timer3 = Rx.Observable.interval(500).take(10);
 * var concurrent = 2; // the argument
 * var merged = Rx.Observable.merge(timer1, timer2, timer3, concurrent);
 * merged.subscribe(x => console.log(x));
 *
 * // Results in the following:
 * // - First timer1 and timer2 will run concurrently
 * // - timer1 will emit a value every 1000ms for 10 iterations
 * // - timer2 will emit a value every 2000ms for 6 iterations
 * // - after timer1 hits it's max iteration, timer2 will
 * //   continue, and timer3 will start to run concurrently with timer2
 * // - when timer2 hits it's max iteration it terminates, and
 * //   timer3 will continue to emit a value every 500ms until it is complete
 *
 * @see {@link mergeAll}
 * @see {@link mergeMap}
 * @see {@link mergeMapTo}
 * @see {@link mergeScan}
 *
 * @param {...ObservableInput} observables Input Observables to merge together.
 * @param {number} [concurrent=Number.POSITIVE_INFINITY] Maximum number of input
 * Observables being subscribed to concurrently.
 * @param {Scheduler} [scheduler=null] The IScheduler to use for managing
 * concurrency of input Observables.
 * @return {Observable} an Observable that emits items that are the result of
 * every input Observable.
 * @static true
 * @name merge
 * @owner Observable
 */
function merge() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i - 0] = arguments[_i];
    }
    var concurrent = Number.POSITIVE_INFINITY;
    var scheduler = null;
    var last = observables[observables.length - 1];
    if (Object(__WEBPACK_IMPORTED_MODULE_2__util_isScheduler__["a" /* isScheduler */])(last)) {
        scheduler = observables.pop();
        if (observables.length > 1 && typeof observables[observables.length - 1] === 'number') {
            concurrent = observables.pop();
        }
    }
    else if (typeof last === 'number') {
        concurrent = observables.pop();
    }
    if (scheduler === null && observables.length === 1 && observables[0] instanceof __WEBPACK_IMPORTED_MODULE_0__Observable__["a" /* Observable */]) {
        return observables[0];
    }
    return Object(__WEBPACK_IMPORTED_MODULE_3__operators_mergeAll__["a" /* mergeAll */])(concurrent)(new __WEBPACK_IMPORTED_MODULE_1__ArrayObservable__["a" /* ArrayObservable */](observables, scheduler));
}
//# sourceMappingURL=merge.js.map 


/***/ }),

/***/ "../../../../../../node_modules/rxjs/_esm5/observable/of.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return of; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ArrayObservable__ = __webpack_require__("../../../../../../node_modules/rxjs/_esm5/observable/ArrayObservable.js");
/** PURE_IMPORTS_START ._ArrayObservable PURE_IMPORTS_END */

var of = __WEBPACK_IMPORTED_MODULE_0__ArrayObservable__["a" /* ArrayObservable */].of;
//# sourceMappingURL=of.js.map 


/***/ }),

/***/ "../../../../../../node_modules/rxjs/_esm5/operator/concatMap.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = concatMap;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__operators_concatMap__ = __webpack_require__("../../../../../../node_modules/rxjs/_esm5/operators/concatMap.js");
/** PURE_IMPORTS_START .._operators_concatMap PURE_IMPORTS_END */

/* tslint:enable:max-line-length */
/**
 * Projects each source value to an Observable which is merged in the output
 * Observable, in a serialized fashion waiting for each one to complete before
 * merging the next.
 *
 * <span class="informal">Maps each value to an Observable, then flattens all of
 * these inner Observables using {@link concatAll}.</span>
 *
 * <img src="./img/concatMap.png" width="100%">
 *
 * Returns an Observable that emits items based on applying a function that you
 * supply to each item emitted by the source Observable, where that function
 * returns an (so-called "inner") Observable. Each new inner Observable is
 * concatenated with the previous inner Observable.
 *
 * __Warning:__ if source values arrive endlessly and faster than their
 * corresponding inner Observables can complete, it will result in memory issues
 * as inner Observables amass in an unbounded buffer waiting for their turn to
 * be subscribed to.
 *
 * Note: `concatMap` is equivalent to `mergeMap` with concurrency parameter set
 * to `1`.
 *
 * @example <caption>For each click event, tick every second from 0 to 3, with no concurrency</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.concatMap(ev => Rx.Observable.interval(1000).take(4));
 * result.subscribe(x => console.log(x));
 *
 * // Results in the following:
 * // (results are not concurrent)
 * // For every click on the "document" it will emit values 0 to 3 spaced
 * // on a 1000ms interval
 * // one click = 1000ms-> 0 -1000ms-> 1 -1000ms-> 2 -1000ms-> 3
 *
 * @see {@link concat}
 * @see {@link concatAll}
 * @see {@link concatMapTo}
 * @see {@link exhaustMap}
 * @see {@link mergeMap}
 * @see {@link switchMap}
 *
 * @param {function(value: T, ?index: number): ObservableInput} project A function
 * that, when applied to an item emitted by the source Observable, returns an
 * Observable.
 * @param {function(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number): any} [resultSelector]
 * A function to produce the value on the output Observable based on the values
 * and the indices of the source (outer) emission and the inner Observable
 * emission. The arguments passed to this function are:
 * - `outerValue`: the value that came from the source
 * - `innerValue`: the value that came from the projected Observable
 * - `outerIndex`: the "index" of the value that came from the source
 * - `innerIndex`: the "index" of the value from the projected Observable
 * @return {Observable} An Observable that emits the result of applying the
 * projection function (and the optional `resultSelector`) to each item emitted
 * by the source Observable and taking values from each projected inner
 * Observable sequentially.
 * @method concatMap
 * @owner Observable
 */
function concatMap(project, resultSelector) {
    return Object(__WEBPACK_IMPORTED_MODULE_0__operators_concatMap__["a" /* concatMap */])(project, resultSelector)(this);
}
//# sourceMappingURL=concatMap.js.map 


/***/ }),

/***/ "../../../../../../node_modules/rxjs/_esm5/operator/filter.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = filter;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__operators_filter__ = __webpack_require__("../../../../../../node_modules/rxjs/_esm5/operators/filter.js");
/** PURE_IMPORTS_START .._operators_filter PURE_IMPORTS_END */

/* tslint:enable:max-line-length */
/**
 * Filter items emitted by the source Observable by only emitting those that
 * satisfy a specified predicate.
 *
 * <span class="informal">Like
 * [Array.prototype.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter),
 * it only emits a value from the source if it passes a criterion function.</span>
 *
 * <img src="./img/filter.png" width="100%">
 *
 * Similar to the well-known `Array.prototype.filter` method, this operator
 * takes values from the source Observable, passes them through a `predicate`
 * function and only emits those values that yielded `true`.
 *
 * @example <caption>Emit only click events whose target was a DIV element</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var clicksOnDivs = clicks.filter(ev => ev.target.tagName === 'DIV');
 * clicksOnDivs.subscribe(x => console.log(x));
 *
 * @see {@link distinct}
 * @see {@link distinctUntilChanged}
 * @see {@link distinctUntilKeyChanged}
 * @see {@link ignoreElements}
 * @see {@link partition}
 * @see {@link skip}
 *
 * @param {function(value: T, index: number): boolean} predicate A function that
 * evaluates each value emitted by the source Observable. If it returns `true`,
 * the value is emitted, if `false` the value is not passed to the output
 * Observable. The `index` parameter is the number `i` for the i-th source
 * emission that has happened since the subscription, starting from the number
 * `0`.
 * @param {any} [thisArg] An optional argument to determine the value of `this`
 * in the `predicate` function.
 * @return {Observable} An Observable of values from the source that were
 * allowed by the `predicate` function.
 * @method filter
 * @owner Observable
 */
function filter(predicate, thisArg) {
    return Object(__WEBPACK_IMPORTED_MODULE_0__operators_filter__["a" /* filter */])(predicate, thisArg)(this);
}
//# sourceMappingURL=filter.js.map 


/***/ }),

/***/ "../../../../../../node_modules/rxjs/_esm5/operator/map.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = map;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__operators_map__ = __webpack_require__("../../../../../../node_modules/rxjs/_esm5/operators/map.js");
/** PURE_IMPORTS_START .._operators_map PURE_IMPORTS_END */

/**
 * Applies a given `project` function to each value emitted by the source
 * Observable, and emits the resulting values as an Observable.
 *
 * <span class="informal">Like [Array.prototype.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map),
 * it passes each source value through a transformation function to get
 * corresponding output values.</span>
 *
 * <img src="./img/map.png" width="100%">
 *
 * Similar to the well known `Array.prototype.map` function, this operator
 * applies a projection to each value and emits that projection in the output
 * Observable.
 *
 * @example <caption>Map every click to the clientX position of that click</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var positions = clicks.map(ev => ev.clientX);
 * positions.subscribe(x => console.log(x));
 *
 * @see {@link mapTo}
 * @see {@link pluck}
 *
 * @param {function(value: T, index: number): R} project The function to apply
 * to each `value` emitted by the source Observable. The `index` parameter is
 * the number `i` for the i-th emission that has happened since the
 * subscription, starting from the number `0`.
 * @param {any} [thisArg] An optional argument to define what `this` is in the
 * `project` function.
 * @return {Observable<R>} An Observable that emits the values from the source
 * Observable transformed by the given `project` function.
 * @method map
 * @owner Observable
 */
function map(project, thisArg) {
    return Object(__WEBPACK_IMPORTED_MODULE_0__operators_map__["a" /* map */])(project, thisArg)(this);
}
//# sourceMappingURL=map.js.map 


/***/ }),

/***/ "../../../../../../node_modules/rxjs/_esm5/operator/share.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = share;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__operators_share__ = __webpack_require__("../../../../../../node_modules/rxjs/_esm5/operators/share.js");
/** PURE_IMPORTS_START .._operators_share PURE_IMPORTS_END */

/**
 * Returns a new Observable that multicasts (shares) the original Observable. As long as there is at least one
 * Subscriber this Observable will be subscribed and emitting data. When all subscribers have unsubscribed it will
 * unsubscribe from the source Observable. Because the Observable is multicasting it makes the stream `hot`.
 *
 * This behaves similarly to .publish().refCount(), with a behavior difference when the source observable emits complete.
 * .publish().refCount() will not resubscribe to the original source, however .share() will resubscribe to the original source.
 * Observable.of("test").publish().refCount() will not re-emit "test" on new subscriptions, Observable.of("test").share() will
 * re-emit "test" to new subscriptions.
 *
 * <img src="./img/share.png" width="100%">
 *
 * @return {Observable<T>} An Observable that upon connection causes the source Observable to emit items to its Observers.
 * @method share
 * @owner Observable
 */
function share() {
    return Object(__WEBPACK_IMPORTED_MODULE_0__operators_share__["a" /* share */])()(this);
}
;
//# sourceMappingURL=share.js.map 


/***/ }),

/***/ "../../../../../../node_modules/rxjs/_esm5/operators/concatMap.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = concatMap;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mergeMap__ = __webpack_require__("../../../../../../node_modules/rxjs/_esm5/operators/mergeMap.js");
/** PURE_IMPORTS_START ._mergeMap PURE_IMPORTS_END */

/* tslint:enable:max-line-length */
/**
 * Projects each source value to an Observable which is merged in the output
 * Observable, in a serialized fashion waiting for each one to complete before
 * merging the next.
 *
 * <span class="informal">Maps each value to an Observable, then flattens all of
 * these inner Observables using {@link concatAll}.</span>
 *
 * <img src="./img/concatMap.png" width="100%">
 *
 * Returns an Observable that emits items based on applying a function that you
 * supply to each item emitted by the source Observable, where that function
 * returns an (so-called "inner") Observable. Each new inner Observable is
 * concatenated with the previous inner Observable.
 *
 * __Warning:__ if source values arrive endlessly and faster than their
 * corresponding inner Observables can complete, it will result in memory issues
 * as inner Observables amass in an unbounded buffer waiting for their turn to
 * be subscribed to.
 *
 * Note: `concatMap` is equivalent to `mergeMap` with concurrency parameter set
 * to `1`.
 *
 * @example <caption>For each click event, tick every second from 0 to 3, with no concurrency</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.concatMap(ev => Rx.Observable.interval(1000).take(4));
 * result.subscribe(x => console.log(x));
 *
 * // Results in the following:
 * // (results are not concurrent)
 * // For every click on the "document" it will emit values 0 to 3 spaced
 * // on a 1000ms interval
 * // one click = 1000ms-> 0 -1000ms-> 1 -1000ms-> 2 -1000ms-> 3
 *
 * @see {@link concat}
 * @see {@link concatAll}
 * @see {@link concatMapTo}
 * @see {@link exhaustMap}
 * @see {@link mergeMap}
 * @see {@link switchMap}
 *
 * @param {function(value: T, ?index: number): ObservableInput} project A function
 * that, when applied to an item emitted by the source Observable, returns an
 * Observable.
 * @param {function(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number): any} [resultSelector]
 * A function to produce the value on the output Observable based on the values
 * and the indices of the source (outer) emission and the inner Observable
 * emission. The arguments passed to this function are:
 * - `outerValue`: the value that came from the source
 * - `innerValue`: the value that came from the projected Observable
 * - `outerIndex`: the "index" of the value that came from the source
 * - `innerIndex`: the "index" of the value from the projected Observable
 * @return {Observable} An Observable that emits the result of applying the
 * projection function (and the optional `resultSelector`) to each item emitted
 * by the source Observable and taking values from each projected inner
 * Observable sequentially.
 * @method concatMap
 * @owner Observable
 */
function concatMap(project, resultSelector) {
    return Object(__WEBPACK_IMPORTED_MODULE_0__mergeMap__["a" /* mergeMap */])(project, resultSelector, 1);
}
//# sourceMappingURL=concatMap.js.map 


/***/ }),

/***/ "../../../../../../node_modules/rxjs/_esm5/operators/filter.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = filter;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Subscriber__ = __webpack_require__("../../../../../../node_modules/rxjs/_esm5/Subscriber.js");
/** PURE_IMPORTS_START .._Subscriber PURE_IMPORTS_END */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b)
        if (b.hasOwnProperty(p))
            d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

/* tslint:enable:max-line-length */
/**
 * Filter items emitted by the source Observable by only emitting those that
 * satisfy a specified predicate.
 *
 * <span class="informal">Like
 * [Array.prototype.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter),
 * it only emits a value from the source if it passes a criterion function.</span>
 *
 * <img src="./img/filter.png" width="100%">
 *
 * Similar to the well-known `Array.prototype.filter` method, this operator
 * takes values from the source Observable, passes them through a `predicate`
 * function and only emits those values that yielded `true`.
 *
 * @example <caption>Emit only click events whose target was a DIV element</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var clicksOnDivs = clicks.filter(ev => ev.target.tagName === 'DIV');
 * clicksOnDivs.subscribe(x => console.log(x));
 *
 * @see {@link distinct}
 * @see {@link distinctUntilChanged}
 * @see {@link distinctUntilKeyChanged}
 * @see {@link ignoreElements}
 * @see {@link partition}
 * @see {@link skip}
 *
 * @param {function(value: T, index: number): boolean} predicate A function that
 * evaluates each value emitted by the source Observable. If it returns `true`,
 * the value is emitted, if `false` the value is not passed to the output
 * Observable. The `index` parameter is the number `i` for the i-th source
 * emission that has happened since the subscription, starting from the number
 * `0`.
 * @param {any} [thisArg] An optional argument to determine the value of `this`
 * in the `predicate` function.
 * @return {Observable} An Observable of values from the source that were
 * allowed by the `predicate` function.
 * @method filter
 * @owner Observable
 */
function filter(predicate, thisArg) {
    return function filterOperatorFunction(source) {
        return source.lift(new FilterOperator(predicate, thisArg));
    };
}
var FilterOperator = /*@__PURE__*/ (/*@__PURE__*/ function () {
    function FilterOperator(predicate, thisArg) {
        this.predicate = predicate;
        this.thisArg = thisArg;
    }
    FilterOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new FilterSubscriber(subscriber, this.predicate, this.thisArg));
    };
    return FilterOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var FilterSubscriber = /*@__PURE__*/ (/*@__PURE__*/ function (_super) {
    __extends(FilterSubscriber, _super);
    function FilterSubscriber(destination, predicate, thisArg) {
        _super.call(this, destination);
        this.predicate = predicate;
        this.thisArg = thisArg;
        this.count = 0;
    }
    // the try catch block below is left specifically for
    // optimization and perf reasons. a tryCatcher is not necessary here.
    FilterSubscriber.prototype._next = function (value) {
        var result;
        try {
            result = this.predicate.call(this.thisArg, value, this.count++);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        if (result) {
            this.destination.next(value);
        }
    };
    return FilterSubscriber;
}(__WEBPACK_IMPORTED_MODULE_0__Subscriber__["a" /* Subscriber */]));
//# sourceMappingURL=filter.js.map 


/***/ }),

/***/ "../../../../../../node_modules/rxjs/_esm5/operators/map.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = map;
/* unused harmony export MapOperator */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Subscriber__ = __webpack_require__("../../../../../../node_modules/rxjs/_esm5/Subscriber.js");
/** PURE_IMPORTS_START .._Subscriber PURE_IMPORTS_END */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b)
        if (b.hasOwnProperty(p))
            d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

/**
 * Applies a given `project` function to each value emitted by the source
 * Observable, and emits the resulting values as an Observable.
 *
 * <span class="informal">Like [Array.prototype.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map),
 * it passes each source value through a transformation function to get
 * corresponding output values.</span>
 *
 * <img src="./img/map.png" width="100%">
 *
 * Similar to the well known `Array.prototype.map` function, this operator
 * applies a projection to each value and emits that projection in the output
 * Observable.
 *
 * @example <caption>Map every click to the clientX position of that click</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var positions = clicks.map(ev => ev.clientX);
 * positions.subscribe(x => console.log(x));
 *
 * @see {@link mapTo}
 * @see {@link pluck}
 *
 * @param {function(value: T, index: number): R} project The function to apply
 * to each `value` emitted by the source Observable. The `index` parameter is
 * the number `i` for the i-th emission that has happened since the
 * subscription, starting from the number `0`.
 * @param {any} [thisArg] An optional argument to define what `this` is in the
 * `project` function.
 * @return {Observable<R>} An Observable that emits the values from the source
 * Observable transformed by the given `project` function.
 * @method map
 * @owner Observable
 */
function map(project, thisArg) {
    return function mapOperation(source) {
        if (typeof project !== 'function') {
            throw new TypeError('argument is not a function. Are you looking for `mapTo()`?');
        }
        return source.lift(new MapOperator(project, thisArg));
    };
}
var MapOperator = /*@__PURE__*/ (/*@__PURE__*/ function () {
    function MapOperator(project, thisArg) {
        this.project = project;
        this.thisArg = thisArg;
    }
    MapOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new MapSubscriber(subscriber, this.project, this.thisArg));
    };
    return MapOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var MapSubscriber = /*@__PURE__*/ (/*@__PURE__*/ function (_super) {
    __extends(MapSubscriber, _super);
    function MapSubscriber(destination, project, thisArg) {
        _super.call(this, destination);
        this.project = project;
        this.count = 0;
        this.thisArg = thisArg || this;
    }
    // NOTE: This looks unoptimized, but it's actually purposefully NOT
    // using try/catch optimizations.
    MapSubscriber.prototype._next = function (value) {
        var result;
        try {
            result = this.project.call(this.thisArg, value, this.count++);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this.destination.next(result);
    };
    return MapSubscriber;
}(__WEBPACK_IMPORTED_MODULE_0__Subscriber__["a" /* Subscriber */]));
//# sourceMappingURL=map.js.map 


/***/ }),

/***/ "../../../../../../node_modules/rxjs/_esm5/operators/mergeAll.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = mergeAll;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mergeMap__ = __webpack_require__("../../../../../../node_modules/rxjs/_esm5/operators/mergeMap.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_identity__ = __webpack_require__("../../../../../../node_modules/rxjs/_esm5/util/identity.js");
/** PURE_IMPORTS_START ._mergeMap,.._util_identity PURE_IMPORTS_END */


/**
 * Converts a higher-order Observable into a first-order Observable which
 * concurrently delivers all values that are emitted on the inner Observables.
 *
 * <span class="informal">Flattens an Observable-of-Observables.</span>
 *
 * <img src="./img/mergeAll.png" width="100%">
 *
 * `mergeAll` subscribes to an Observable that emits Observables, also known as
 * a higher-order Observable. Each time it observes one of these emitted inner
 * Observables, it subscribes to that and delivers all the values from the
 * inner Observable on the output Observable. The output Observable only
 * completes once all inner Observables have completed. Any error delivered by
 * a inner Observable will be immediately emitted on the output Observable.
 *
 * @example <caption>Spawn a new interval Observable for each click event, and blend their outputs as one Observable</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var higherOrder = clicks.map((ev) => Rx.Observable.interval(1000));
 * var firstOrder = higherOrder.mergeAll();
 * firstOrder.subscribe(x => console.log(x));
 *
 * @example <caption>Count from 0 to 9 every second for each click, but only allow 2 concurrent timers</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var higherOrder = clicks.map((ev) => Rx.Observable.interval(1000).take(10));
 * var firstOrder = higherOrder.mergeAll(2);
 * firstOrder.subscribe(x => console.log(x));
 *
 * @see {@link combineAll}
 * @see {@link concatAll}
 * @see {@link exhaust}
 * @see {@link merge}
 * @see {@link mergeMap}
 * @see {@link mergeMapTo}
 * @see {@link mergeScan}
 * @see {@link switch}
 * @see {@link zipAll}
 *
 * @param {number} [concurrent=Number.POSITIVE_INFINITY] Maximum number of inner
 * Observables being subscribed to concurrently.
 * @return {Observable} An Observable that emits values coming from all the
 * inner Observables emitted by the source Observable.
 * @method mergeAll
 * @owner Observable
 */
function mergeAll(concurrent) {
    if (concurrent === void 0) {
        concurrent = Number.POSITIVE_INFINITY;
    }
    return Object(__WEBPACK_IMPORTED_MODULE_0__mergeMap__["a" /* mergeMap */])(__WEBPACK_IMPORTED_MODULE_1__util_identity__["a" /* identity */], null, concurrent);
}
//# sourceMappingURL=mergeAll.js.map 


/***/ }),

/***/ "../../../../../../node_modules/rxjs/_esm5/operators/mergeMap.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = mergeMap;
/* unused harmony export MergeMapOperator */
/* unused harmony export MergeMapSubscriber */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_subscribeToResult__ = __webpack_require__("../../../../../../node_modules/rxjs/_esm5/util/subscribeToResult.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__OuterSubscriber__ = __webpack_require__("../../../../../../node_modules/rxjs/_esm5/OuterSubscriber.js");
/** PURE_IMPORTS_START .._util_subscribeToResult,.._OuterSubscriber PURE_IMPORTS_END */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b)
        if (b.hasOwnProperty(p))
            d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};


/* tslint:enable:max-line-length */
/**
 * Projects each source value to an Observable which is merged in the output
 * Observable.
 *
 * <span class="informal">Maps each value to an Observable, then flattens all of
 * these inner Observables using {@link mergeAll}.</span>
 *
 * <img src="./img/mergeMap.png" width="100%">
 *
 * Returns an Observable that emits items based on applying a function that you
 * supply to each item emitted by the source Observable, where that function
 * returns an Observable, and then merging those resulting Observables and
 * emitting the results of this merger.
 *
 * @example <caption>Map and flatten each letter to an Observable ticking every 1 second</caption>
 * var letters = Rx.Observable.of('a', 'b', 'c');
 * var result = letters.mergeMap(x =>
 *   Rx.Observable.interval(1000).map(i => x+i)
 * );
 * result.subscribe(x => console.log(x));
 *
 * // Results in the following:
 * // a0
 * // b0
 * // c0
 * // a1
 * // b1
 * // c1
 * // continues to list a,b,c with respective ascending integers
 *
 * @see {@link concatMap}
 * @see {@link exhaustMap}
 * @see {@link merge}
 * @see {@link mergeAll}
 * @see {@link mergeMapTo}
 * @see {@link mergeScan}
 * @see {@link switchMap}
 *
 * @param {function(value: T, ?index: number): ObservableInput} project A function
 * that, when applied to an item emitted by the source Observable, returns an
 * Observable.
 * @param {function(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number): any} [resultSelector]
 * A function to produce the value on the output Observable based on the values
 * and the indices of the source (outer) emission and the inner Observable
 * emission. The arguments passed to this function are:
 * - `outerValue`: the value that came from the source
 * - `innerValue`: the value that came from the projected Observable
 * - `outerIndex`: the "index" of the value that came from the source
 * - `innerIndex`: the "index" of the value from the projected Observable
 * @param {number} [concurrent=Number.POSITIVE_INFINITY] Maximum number of input
 * Observables being subscribed to concurrently.
 * @return {Observable} An Observable that emits the result of applying the
 * projection function (and the optional `resultSelector`) to each item emitted
 * by the source Observable and merging the results of the Observables obtained
 * from this transformation.
 * @method mergeMap
 * @owner Observable
 */
function mergeMap(project, resultSelector, concurrent) {
    if (concurrent === void 0) {
        concurrent = Number.POSITIVE_INFINITY;
    }
    return function mergeMapOperatorFunction(source) {
        if (typeof resultSelector === 'number') {
            concurrent = resultSelector;
            resultSelector = null;
        }
        return source.lift(new MergeMapOperator(project, resultSelector, concurrent));
    };
}
var MergeMapOperator = /*@__PURE__*/ (/*@__PURE__*/ function () {
    function MergeMapOperator(project, resultSelector, concurrent) {
        if (concurrent === void 0) {
            concurrent = Number.POSITIVE_INFINITY;
        }
        this.project = project;
        this.resultSelector = resultSelector;
        this.concurrent = concurrent;
    }
    MergeMapOperator.prototype.call = function (observer, source) {
        return source.subscribe(new MergeMapSubscriber(observer, this.project, this.resultSelector, this.concurrent));
    };
    return MergeMapOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var MergeMapSubscriber = /*@__PURE__*/ (/*@__PURE__*/ function (_super) {
    __extends(MergeMapSubscriber, _super);
    function MergeMapSubscriber(destination, project, resultSelector, concurrent) {
        if (concurrent === void 0) {
            concurrent = Number.POSITIVE_INFINITY;
        }
        _super.call(this, destination);
        this.project = project;
        this.resultSelector = resultSelector;
        this.concurrent = concurrent;
        this.hasCompleted = false;
        this.buffer = [];
        this.active = 0;
        this.index = 0;
    }
    MergeMapSubscriber.prototype._next = function (value) {
        if (this.active < this.concurrent) {
            this._tryNext(value);
        }
        else {
            this.buffer.push(value);
        }
    };
    MergeMapSubscriber.prototype._tryNext = function (value) {
        var result;
        var index = this.index++;
        try {
            result = this.project(value, index);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this.active++;
        this._innerSub(result, value, index);
    };
    MergeMapSubscriber.prototype._innerSub = function (ish, value, index) {
        this.add(Object(__WEBPACK_IMPORTED_MODULE_0__util_subscribeToResult__["a" /* subscribeToResult */])(this, ish, value, index));
    };
    MergeMapSubscriber.prototype._complete = function () {
        this.hasCompleted = true;
        if (this.active === 0 && this.buffer.length === 0) {
            this.destination.complete();
        }
    };
    MergeMapSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        if (this.resultSelector) {
            this._notifyResultSelector(outerValue, innerValue, outerIndex, innerIndex);
        }
        else {
            this.destination.next(innerValue);
        }
    };
    MergeMapSubscriber.prototype._notifyResultSelector = function (outerValue, innerValue, outerIndex, innerIndex) {
        var result;
        try {
            result = this.resultSelector(outerValue, innerValue, outerIndex, innerIndex);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this.destination.next(result);
    };
    MergeMapSubscriber.prototype.notifyComplete = function (innerSub) {
        var buffer = this.buffer;
        this.remove(innerSub);
        this.active--;
        if (buffer.length > 0) {
            this._next(buffer.shift());
        }
        else if (this.active === 0 && this.hasCompleted) {
            this.destination.complete();
        }
    };
    return MergeMapSubscriber;
}(__WEBPACK_IMPORTED_MODULE_1__OuterSubscriber__["a" /* OuterSubscriber */]));
//# sourceMappingURL=mergeMap.js.map 


/***/ }),

/***/ "../../../../../../node_modules/rxjs/_esm5/operators/multicast.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = multicast;
/* unused harmony export MulticastOperator */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__observable_ConnectableObservable__ = __webpack_require__("../../../../../../node_modules/rxjs/_esm5/observable/ConnectableObservable.js");
/** PURE_IMPORTS_START .._observable_ConnectableObservable PURE_IMPORTS_END */

/* tslint:enable:max-line-length */
/**
 * Returns an Observable that emits the results of invoking a specified selector on items
 * emitted by a ConnectableObservable that shares a single subscription to the underlying stream.
 *
 * <img src="./img/multicast.png" width="100%">
 *
 * @param {Function|Subject} subjectOrSubjectFactory - Factory function to create an intermediate subject through
 * which the source sequence's elements will be multicast to the selector function
 * or Subject to push source elements into.
 * @param {Function} [selector] - Optional selector function that can use the multicasted source stream
 * as many times as needed, without causing multiple subscriptions to the source stream.
 * Subscribers to the given source will receive all notifications of the source from the
 * time of the subscription forward.
 * @return {Observable} An Observable that emits the results of invoking the selector
 * on the items emitted by a `ConnectableObservable` that shares a single subscription to
 * the underlying stream.
 * @method multicast
 * @owner Observable
 */
function multicast(subjectOrSubjectFactory, selector) {
    return function multicastOperatorFunction(source) {
        var subjectFactory;
        if (typeof subjectOrSubjectFactory === 'function') {
            subjectFactory = subjectOrSubjectFactory;
        }
        else {
            subjectFactory = function subjectFactory() {
                return subjectOrSubjectFactory;
            };
        }
        if (typeof selector === 'function') {
            return source.lift(new MulticastOperator(subjectFactory, selector));
        }
        var connectable = Object.create(source, __WEBPACK_IMPORTED_MODULE_0__observable_ConnectableObservable__["a" /* connectableObservableDescriptor */]);
        connectable.source = source;
        connectable.subjectFactory = subjectFactory;
        return connectable;
    };
}
var MulticastOperator = /*@__PURE__*/ (/*@__PURE__*/ function () {
    function MulticastOperator(subjectFactory, selector) {
        this.subjectFactory = subjectFactory;
        this.selector = selector;
    }
    MulticastOperator.prototype.call = function (subscriber, source) {
        var selector = this.selector;
        var subject = this.subjectFactory();
        var subscription = selector(subject).subscribe(subscriber);
        subscription.add(source.subscribe(subject));
        return subscription;
    };
    return MulticastOperator;
}());
//# sourceMappingURL=multicast.js.map 


/***/ }),

/***/ "../../../../../../node_modules/rxjs/_esm5/operators/refCount.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = refCount;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Subscriber__ = __webpack_require__("../../../../../../node_modules/rxjs/_esm5/Subscriber.js");
/** PURE_IMPORTS_START .._Subscriber PURE_IMPORTS_END */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b)
        if (b.hasOwnProperty(p))
            d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

function refCount() {
    return function refCountOperatorFunction(source) {
        return source.lift(new RefCountOperator(source));
    };
}
var RefCountOperator = /*@__PURE__*/ (/*@__PURE__*/ function () {
    function RefCountOperator(connectable) {
        this.connectable = connectable;
    }
    RefCountOperator.prototype.call = function (subscriber, source) {
        var connectable = this.connectable;
        connectable._refCount++;
        var refCounter = new RefCountSubscriber(subscriber, connectable);
        var subscription = source.subscribe(refCounter);
        if (!refCounter.closed) {
            refCounter.connection = connectable.connect();
        }
        return subscription;
    };
    return RefCountOperator;
}());
var RefCountSubscriber = /*@__PURE__*/ (/*@__PURE__*/ function (_super) {
    __extends(RefCountSubscriber, _super);
    function RefCountSubscriber(destination, connectable) {
        _super.call(this, destination);
        this.connectable = connectable;
    }
    RefCountSubscriber.prototype._unsubscribe = function () {
        var connectable = this.connectable;
        if (!connectable) {
            this.connection = null;
            return;
        }
        this.connectable = null;
        var refCount = connectable._refCount;
        if (refCount <= 0) {
            this.connection = null;
            return;
        }
        connectable._refCount = refCount - 1;
        if (refCount > 1) {
            this.connection = null;
            return;
        }
        ///
        // Compare the local RefCountSubscriber's connection Subscription to the
        // connection Subscription on the shared ConnectableObservable. In cases
        // where the ConnectableObservable source synchronously emits values, and
        // the RefCountSubscriber's downstream Observers synchronously unsubscribe,
        // execution continues to here before the RefCountOperator has a chance to
        // supply the RefCountSubscriber with the shared connection Subscription.
        // For example:
        // ```
        // Observable.range(0, 10)
        //   .publish()
        //   .refCount()
        //   .take(5)
        //   .subscribe();
        // ```
        // In order to account for this case, RefCountSubscriber should only dispose
        // the ConnectableObservable's shared connection Subscription if the
        // connection Subscription exists, *and* either:
        //   a. RefCountSubscriber doesn't have a reference to the shared connection
        //      Subscription yet, or,
        //   b. RefCountSubscriber's connection Subscription reference is identical
        //      to the shared connection Subscription
        ///
        var connection = this.connection;
        var sharedConnection = connectable._connection;
        this.connection = null;
        if (sharedConnection && (!connection || sharedConnection === connection)) {
            sharedConnection.unsubscribe();
        }
    };
    return RefCountSubscriber;
}(__WEBPACK_IMPORTED_MODULE_0__Subscriber__["a" /* Subscriber */]));
//# sourceMappingURL=refCount.js.map 


/***/ }),

/***/ "../../../../../../node_modules/rxjs/_esm5/operators/share.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = share;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__multicast__ = __webpack_require__("../../../../../../node_modules/rxjs/_esm5/operators/multicast.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__refCount__ = __webpack_require__("../../../../../../node_modules/rxjs/_esm5/operators/refCount.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Subject__ = __webpack_require__("../../../../../../node_modules/rxjs/_esm5/Subject.js");
/** PURE_IMPORTS_START ._multicast,._refCount,.._Subject PURE_IMPORTS_END */



function shareSubjectFactory() {
    return new __WEBPACK_IMPORTED_MODULE_2__Subject__["a" /* Subject */]();
}
/**
 * Returns a new Observable that multicasts (shares) the original Observable. As long as there is at least one
 * Subscriber this Observable will be subscribed and emitting data. When all subscribers have unsubscribed it will
 * unsubscribe from the source Observable. Because the Observable is multicasting it makes the stream `hot`.
 * This is an alias for .multicast(() => new Subject()).refCount().
 *
 * <img src="./img/share.png" width="100%">
 *
 * @return {Observable<T>} An Observable that upon connection causes the source Observable to emit items to its Observers.
 * @method share
 * @owner Observable
 */
function share() {
    return function (source) { return Object(__WEBPACK_IMPORTED_MODULE_1__refCount__["a" /* refCount */])()(Object(__WEBPACK_IMPORTED_MODULE_0__multicast__["a" /* multicast */])(shareSubjectFactory)(source)); };
}
;
//# sourceMappingURL=share.js.map 


/***/ }),

/***/ "../../../../../../node_modules/rxjs/_esm5/symbol/iterator.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export symbolIteratorPonyfill */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return iterator; });
/* unused harmony export $$iterator */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_root__ = __webpack_require__("../../../../../../node_modules/rxjs/_esm5/util/root.js");
/** PURE_IMPORTS_START .._util_root PURE_IMPORTS_END */

function symbolIteratorPonyfill(root) {
    var Symbol = root.Symbol;
    if (typeof Symbol === 'function') {
        if (!Symbol.iterator) {
            Symbol.iterator = Symbol('iterator polyfill');
        }
        return Symbol.iterator;
    }
    else {
        // [for Mozilla Gecko 27-35:](https://mzl.la/2ewE1zC)
        var Set_1 = root.Set;
        if (Set_1 && typeof new Set_1()['@@iterator'] === 'function') {
            return '@@iterator';
        }
        var Map_1 = root.Map;
        // required for compatability with es6-shim
        if (Map_1) {
            var keys = Object.getOwnPropertyNames(Map_1.prototype);
            for (var i = 0; i < keys.length; ++i) {
                var key = keys[i];
                // according to spec, Map.prototype[@@iterator] and Map.orototype.entries must be equal.
                if (key !== 'entries' && key !== 'size' && Map_1.prototype[key] === Map_1.prototype['entries']) {
                    return key;
                }
            }
        }
        return '@@iterator';
    }
}
var iterator = /*@__PURE__*/ symbolIteratorPonyfill(__WEBPACK_IMPORTED_MODULE_0__util_root__["a" /* root */]);
/**
 * @deprecated use iterator instead
 */
var $$iterator = iterator;
//# sourceMappingURL=iterator.js.map 


/***/ }),

/***/ "../../../../../../node_modules/rxjs/_esm5/symbol/observable.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export getSymbolObservable */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return observable; });
/* unused harmony export $$observable */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_root__ = __webpack_require__("../../../../../../node_modules/rxjs/_esm5/util/root.js");
/** PURE_IMPORTS_START .._util_root PURE_IMPORTS_END */

function getSymbolObservable(context) {
    var $$observable;
    var Symbol = context.Symbol;
    if (typeof Symbol === 'function') {
        if (Symbol.observable) {
            $$observable = Symbol.observable;
        }
        else {
            $$observable = Symbol('observable');
            Symbol.observable = $$observable;
        }
    }
    else {
        $$observable = '@@observable';
    }
    return $$observable;
}
var observable = /*@__PURE__*/ getSymbolObservable(__WEBPACK_IMPORTED_MODULE_0__util_root__["a" /* root */]);
/**
 * @deprecated use observable instead
 */
var $$observable = observable;
//# sourceMappingURL=observable.js.map 


/***/ }),

/***/ "../../../../../../node_modules/rxjs/_esm5/symbol/rxSubscriber.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return rxSubscriber; });
/* unused harmony export $$rxSubscriber */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_root__ = __webpack_require__("../../../../../../node_modules/rxjs/_esm5/util/root.js");
/** PURE_IMPORTS_START .._util_root PURE_IMPORTS_END */

var Symbol = __WEBPACK_IMPORTED_MODULE_0__util_root__["a" /* root */].Symbol;
var rxSubscriber = (typeof Symbol === 'function' && typeof Symbol.for === 'function') ?
    /*@__PURE__*/ Symbol.for('rxSubscriber') : '@@rxSubscriber';
/**
 * @deprecated use rxSubscriber instead
 */
var $$rxSubscriber = rxSubscriber;
//# sourceMappingURL=rxSubscriber.js.map 


/***/ }),

/***/ "../../../../../../node_modules/rxjs/_esm5/util/ObjectUnsubscribedError.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ObjectUnsubscribedError; });
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b)
        if (b.hasOwnProperty(p))
            d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * An error thrown when an action is invalid because the object has been
 * unsubscribed.
 *
 * @see {@link Subject}
 * @see {@link BehaviorSubject}
 *
 * @class ObjectUnsubscribedError
 */
var ObjectUnsubscribedError = /*@__PURE__*/ (/*@__PURE__*/ function (_super) {
    __extends(ObjectUnsubscribedError, _super);
    function ObjectUnsubscribedError() {
        var err = _super.call(this, 'object unsubscribed');
        this.name = err.name = 'ObjectUnsubscribedError';
        this.stack = err.stack;
        this.message = err.message;
    }
    return ObjectUnsubscribedError;
}(Error));
//# sourceMappingURL=ObjectUnsubscribedError.js.map 


/***/ }),

/***/ "../../../../../../node_modules/rxjs/_esm5/util/UnsubscriptionError.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UnsubscriptionError; });
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b)
        if (b.hasOwnProperty(p))
            d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * An error thrown when one or more errors have occurred during the
 * `unsubscribe` of a {@link Subscription}.
 */
var UnsubscriptionError = /*@__PURE__*/ (/*@__PURE__*/ function (_super) {
    __extends(UnsubscriptionError, _super);
    function UnsubscriptionError(errors) {
        _super.call(this);
        this.errors = errors;
        var err = Error.call(this, errors ?
            errors.length + " errors occurred during unsubscription:\n  " + errors.map(function (err, i) { return ((i + 1) + ") " + err.toString()); }).join('\n  ') : '');
        this.name = err.name = 'UnsubscriptionError';
        this.stack = err.stack;
        this.message = err.message;
    }
    return UnsubscriptionError;
}(Error));
//# sourceMappingURL=UnsubscriptionError.js.map 


/***/ }),

/***/ "../../../../../../node_modules/rxjs/_esm5/util/errorObject.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return errorObject; });
// typeof any so that it we don't have to cast when comparing a result to the error object
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
var errorObject = { e: {} };
//# sourceMappingURL=errorObject.js.map 


/***/ }),

/***/ "../../../../../../node_modules/rxjs/_esm5/util/identity.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = identity;
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function identity(x) {
    return x;
}
//# sourceMappingURL=identity.js.map 


/***/ }),

/***/ "../../../../../../node_modules/rxjs/_esm5/util/isArray.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return isArray; });
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
var isArray = Array.isArray || (function (x) { return x && typeof x.length === 'number'; });
//# sourceMappingURL=isArray.js.map 


/***/ }),

/***/ "../../../../../../node_modules/rxjs/_esm5/util/isArrayLike.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return isArrayLike; });
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
var isArrayLike = (function (x) { return x && typeof x.length === 'number'; });
//# sourceMappingURL=isArrayLike.js.map 


/***/ }),

/***/ "../../../../../../node_modules/rxjs/_esm5/util/isFunction.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = isFunction;
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function isFunction(x) {
    return typeof x === 'function';
}
//# sourceMappingURL=isFunction.js.map 


/***/ }),

/***/ "../../../../../../node_modules/rxjs/_esm5/util/isObject.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = isObject;
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function isObject(x) {
    return x != null && typeof x === 'object';
}
//# sourceMappingURL=isObject.js.map 


/***/ }),

/***/ "../../../../../../node_modules/rxjs/_esm5/util/isPromise.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = isPromise;
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function isPromise(value) {
    return value && typeof value.subscribe !== 'function' && typeof value.then === 'function';
}
//# sourceMappingURL=isPromise.js.map 


/***/ }),

/***/ "../../../../../../node_modules/rxjs/_esm5/util/isScheduler.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = isScheduler;
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function isScheduler(value) {
    return value && typeof value.schedule === 'function';
}
//# sourceMappingURL=isScheduler.js.map 


/***/ }),

/***/ "../../../../../../node_modules/rxjs/_esm5/util/noop.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = noop;
/* tslint:disable:no-empty */
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function noop() { }
//# sourceMappingURL=noop.js.map 


/***/ }),

/***/ "../../../../../../node_modules/rxjs/_esm5/util/pipe.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export pipe */
/* harmony export (immutable) */ __webpack_exports__["a"] = pipeFromArray;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__noop__ = __webpack_require__("../../../../../../node_modules/rxjs/_esm5/util/noop.js");
/** PURE_IMPORTS_START ._noop PURE_IMPORTS_END */

/* tslint:enable:max-line-length */
function pipe() {
    var fns = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        fns[_i - 0] = arguments[_i];
    }
    return pipeFromArray(fns);
}
/* @internal */
function pipeFromArray(fns) {
    if (!fns) {
        return __WEBPACK_IMPORTED_MODULE_0__noop__["a" /* noop */];
    }
    if (fns.length === 1) {
        return fns[0];
    }
    return function piped(input) {
        return fns.reduce(function (prev, fn) { return fn(prev); }, input);
    };
}
//# sourceMappingURL=pipe.js.map 


/***/ }),

/***/ "../../../../../../node_modules/rxjs/_esm5/util/root.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _root; });
// CommonJS / Node have global context exposed as "global" variable.
// We don't want to include the whole node.d.ts this this compilation unit so we'll just fake
// the global "global" var for now.
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
var __window = typeof window !== 'undefined' && window;
var __self = typeof self !== 'undefined' && typeof WorkerGlobalScope !== 'undefined' &&
    self instanceof WorkerGlobalScope && self;
var __global = typeof global !== 'undefined' && global;
var _root = __window || __global || __self;
// Workaround Closure Compiler restriction: The body of a goog.module cannot use throw.
// This is needed when used with angular/tsickle which inserts a goog.module statement.
// Wrap in IIFE
/*@__PURE__*/ (function () {
    if (!_root) {
        throw new Error('RxJS could not find any global context (window, self, global)');
    }
})();

//# sourceMappingURL=root.js.map 

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__("../../../../webpack/buildin/global.js")))

/***/ }),

/***/ "../../../../../../node_modules/rxjs/_esm5/util/subscribeToResult.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = subscribeToResult;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__root__ = __webpack_require__("../../../../../../node_modules/rxjs/_esm5/util/root.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__isArrayLike__ = __webpack_require__("../../../../../../node_modules/rxjs/_esm5/util/isArrayLike.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__isPromise__ = __webpack_require__("../../../../../../node_modules/rxjs/_esm5/util/isPromise.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__isObject__ = __webpack_require__("../../../../../../node_modules/rxjs/_esm5/util/isObject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Observable__ = __webpack_require__("../../../../../../node_modules/rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__symbol_iterator__ = __webpack_require__("../../../../../../node_modules/rxjs/_esm5/symbol/iterator.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__InnerSubscriber__ = __webpack_require__("../../../../../../node_modules/rxjs/_esm5/InnerSubscriber.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__symbol_observable__ = __webpack_require__("../../../../../../node_modules/rxjs/_esm5/symbol/observable.js");
/** PURE_IMPORTS_START ._root,._isArrayLike,._isPromise,._isObject,.._Observable,.._symbol_iterator,.._InnerSubscriber,.._symbol_observable PURE_IMPORTS_END */








function subscribeToResult(outerSubscriber, result, outerValue, outerIndex) {
    var destination = new __WEBPACK_IMPORTED_MODULE_6__InnerSubscriber__["a" /* InnerSubscriber */](outerSubscriber, outerValue, outerIndex);
    if (destination.closed) {
        return null;
    }
    if (result instanceof __WEBPACK_IMPORTED_MODULE_4__Observable__["a" /* Observable */]) {
        if (result._isScalar) {
            destination.next(result.value);
            destination.complete();
            return null;
        }
        else {
            destination.syncErrorThrowable = true;
            return result.subscribe(destination);
        }
    }
    else if (Object(__WEBPACK_IMPORTED_MODULE_1__isArrayLike__["a" /* isArrayLike */])(result)) {
        for (var i = 0, len = result.length; i < len && !destination.closed; i++) {
            destination.next(result[i]);
        }
        if (!destination.closed) {
            destination.complete();
        }
    }
    else if (Object(__WEBPACK_IMPORTED_MODULE_2__isPromise__["a" /* isPromise */])(result)) {
        result.then(function (value) {
            if (!destination.closed) {
                destination.next(value);
                destination.complete();
            }
        }, function (err) { return destination.error(err); })
            .then(null, function (err) {
            // Escaping the Promise trap: globally throw unhandled errors
            __WEBPACK_IMPORTED_MODULE_0__root__["a" /* root */].setTimeout(function () { throw err; });
        });
        return destination;
    }
    else if (result && typeof result[__WEBPACK_IMPORTED_MODULE_5__symbol_iterator__["a" /* iterator */]] === 'function') {
        var iterator = result[__WEBPACK_IMPORTED_MODULE_5__symbol_iterator__["a" /* iterator */]]();
        do {
            var item = iterator.next();
            if (item.done) {
                destination.complete();
                break;
            }
            destination.next(item.value);
            if (destination.closed) {
                break;
            }
        } while (true);
    }
    else if (result && typeof result[__WEBPACK_IMPORTED_MODULE_7__symbol_observable__["a" /* observable */]] === 'function') {
        var obs = result[__WEBPACK_IMPORTED_MODULE_7__symbol_observable__["a" /* observable */]]();
        if (typeof obs.subscribe !== 'function') {
            destination.error(new TypeError('Provided object does not correctly implement Symbol.observable'));
        }
        else {
            return obs.subscribe(new __WEBPACK_IMPORTED_MODULE_6__InnerSubscriber__["a" /* InnerSubscriber */](outerSubscriber, outerValue, outerIndex));
        }
    }
    else {
        var value = Object(__WEBPACK_IMPORTED_MODULE_3__isObject__["a" /* isObject */])(result) ? 'an invalid object' : "'" + result + "'";
        var msg = ("You provided " + value + " where a stream was expected.")
            + ' You can provide an Observable, Promise, Array, or Iterable.';
        destination.error(new TypeError(msg));
    }
    return null;
}
//# sourceMappingURL=subscribeToResult.js.map 


/***/ }),

/***/ "../../../../../../node_modules/rxjs/_esm5/util/toSubscriber.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = toSubscriber;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Subscriber__ = __webpack_require__("../../../../../../node_modules/rxjs/_esm5/Subscriber.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__symbol_rxSubscriber__ = __webpack_require__("../../../../../../node_modules/rxjs/_esm5/symbol/rxSubscriber.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Observer__ = __webpack_require__("../../../../../../node_modules/rxjs/_esm5/Observer.js");
/** PURE_IMPORTS_START .._Subscriber,.._symbol_rxSubscriber,.._Observer PURE_IMPORTS_END */



function toSubscriber(nextOrObserver, error, complete) {
    if (nextOrObserver) {
        if (nextOrObserver instanceof __WEBPACK_IMPORTED_MODULE_0__Subscriber__["a" /* Subscriber */]) {
            return nextOrObserver;
        }
        if (nextOrObserver[__WEBPACK_IMPORTED_MODULE_1__symbol_rxSubscriber__["a" /* rxSubscriber */]]) {
            return nextOrObserver[__WEBPACK_IMPORTED_MODULE_1__symbol_rxSubscriber__["a" /* rxSubscriber */]]();
        }
    }
    if (!nextOrObserver && !error && !complete) {
        return new __WEBPACK_IMPORTED_MODULE_0__Subscriber__["a" /* Subscriber */](__WEBPACK_IMPORTED_MODULE_2__Observer__["a" /* empty */]);
    }
    return new __WEBPACK_IMPORTED_MODULE_0__Subscriber__["a" /* Subscriber */](nextOrObserver, error, complete);
}
//# sourceMappingURL=toSubscriber.js.map 


/***/ }),

/***/ "../../../../../../node_modules/rxjs/_esm5/util/tryCatch.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = tryCatch;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__errorObject__ = __webpack_require__("../../../../../../node_modules/rxjs/_esm5/util/errorObject.js");
/** PURE_IMPORTS_START ._errorObject PURE_IMPORTS_END */

var tryCatchTarget;
function tryCatcher() {
    try {
        return tryCatchTarget.apply(this, arguments);
    }
    catch (e) {
        __WEBPACK_IMPORTED_MODULE_0__errorObject__["a" /* errorObject */].e = e;
        return __WEBPACK_IMPORTED_MODULE_0__errorObject__["a" /* errorObject */];
    }
}
function tryCatch(fn) {
    tryCatchTarget = fn;
    return tryCatcher;
}
;
//# sourceMappingURL=tryCatch.js.map 


/***/ }),

/***/ "../../../../../src/$$_gendir lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src/$$_gendir lazy recursive";

/***/ }),

/***/ "../../../../../src/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".CodeMirror {\r\n  height: 100%;\r\n  width: 100%\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid\">\n\t<h2 class=\"text-muted\">\n\t\tDashboard <small>Statistics Overview</small>\n\t</h2>\n\t<div class=\"row\">\n\t\t<div class=\"col-md-3\">\n\t\t\t<img src=\"assets\\img\\slider1.jpg\">\n\t\t</div>\n\t</div>\n\t<hr>\n \n\n\t<tabset _ngcontent-ahn-19=\"\" class=\"tabs checkout-tabs tab-container\" ng-reflect-justified=\"true\">\n\t  <tab>\n\t   <ng-template tabHeading><i class=\"fa fa-archive fa-2x\"></i>&nbsp;S3:{{gv.bucketName}}/{{gv.objectName}}</ng-template>\n       <div class=\"tab-page-content\">\n\t     <app-cruises3></app-cruises3>\n\t     </div>\n\t  </tab>\n\t  <tab >\n\t  <ng-template tabHeading><i class=\"fa fa-ship fa-2x\"></i>&nbsp;Services</ng-template>\n       <div class=\"tab-page-content\">\n\t     <app-plugins #cruies3></app-plugins>\n\t     </div>\n\t  </tab>\n\t  <tab >\n\t  <ng-template tabHeading><i class=\"fa fa-code fa-2x\"></i>&nbsp;JS Editor</ng-template>\n       <div class=\"tab-page-content\" >\n\t    <codemirror #editor [(ngModel)]=\"code\" [config]=\"config\" (focus)=\"editorFocus($event)\" (change)=\"onChange()\" (copy)=\"copyCode($event)\" (cut)=\"copyCode($event)\" (paste)=\"pasteCode($event)\"></codemirror>\n\n\t    </div>\n\t  </tab>\n\t</tabset>\n</div>\n<!--\n\n<accordion>\n\n  <accordion-group #group>\n    <div accordion-heading class=\"col-xl\">\n      <i class=\"fa fa-archive fa-3x\"></i>\n      <span class=\"badge badge-primary\">Stored Services:<b>{{gv.bucketName}}/{{gv.objectName}}</b></span>\n    </div>\n    <app-cruises3></app-cruises3>\n  </accordion-group>\n  <accordion-group >\n    <div accordion-heading class=\"col-xl\">\n      <i class=\"fa fa-ship fa-3x\"></i>\n      <span class=\"badge badge-primary\">(optional)Execute</span>\n    </div>\n    <app-plugins #cruies3></app-plugins>\n  </accordion-group>\n\n\n  <accordion-group >\n    <div accordion-heading class=\"col-xl\">\n      <i class=\"fa fa-code fa-3x\"></i>\n      <span class=\"badge badge-primary\">CruiseJS - JSScript Helper</span>\n    </div>\n    <pre><codemirror #editor [(ngModel)]=\"code\" [config]=\"config\" (focus)=\"editorFocus($event)\" (change)=\"onChange()\" (copy)=\"copyCode($event)\" (cut)=\"copyCode($event)\" (paste)=\"pasteCode($event)\"></codemirror>\n    </pre>\n      \n\n  </accordion-group>\n\n\n</accordion>\n</div>\n\n\n -->\n"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__cruiseComponents_core_globalvariables_globalvariables_component__ = __webpack_require__("../../../../../src/app/cruiseComponents/core/globalvariables/globalvariables.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


//import 'codemirror'
//import 'codemirror/mode/javascript/javascript'
var AppComponent = (function () {
    function AppComponent(gv) {
        this.gv = gv;
        this.config = {
            lineNumbers: true,
            lineWrapping: false,
            width: '100%',
            height: '100%',
            lineSeparator: '\n',
            mode: 'javascript'
        };
        this.code = '//Sample JavaScript Imports\n' +
            'var CollectionsAndFiles = new JavaImporter(\n' +
            '        java.util, java.io,\n' +
            '        com.corecruise.cruise.services.utils.ResponseObject,\n' +
            '        com.corecruise.cruise.SessionObject);\n' +
            '    );\n' +
            '//Optional \"with\" block where imports can be used.\n' +
            'with (CollectionsAndFiles) {\n' +
            '/*   Objects available:\n' +
            '       cruSession - com.corecruise.core.SessionObject\n' +
            '       cruService - com.corecruise.cruise.services.utils.Services\n' +
            '       cruCore    - com.corecruise.coreCore.CoreCruise\n' +
            '       cruResponse- com.corecruise.cruise.services.utils.GenericSessionResp */\n\n' +
            '  var ser = cruSession.getService(\"InsertService\");//Sample get service from cruSession\n' +
            '}//end with';
        console.log("Hello from app:" + gv.bucketName);
        //this.code = '// Some code...';
    }
    AppComponent.prototype.removeOddChars = function (strValue) {
        strValue = strValue.replace(/\\n/g, '\n');
        //strValue = strValue.replace(/&nbsp;/g ,' ');
        //strValue = strValue.replace(/&gt;/g, '>');
        //strValue = strValue.replace(/&lt;/g, '<');
        //strValue = strValue.replace(/&amp;/g, '&');
        //console.log("((((((((((("+strValue+"))))))))))))))");
        return strValue;
    };
    AppComponent.prototype.editorFocus = function (editorEvent) {
        var cm = editorEvent.instance;
        console.log(cm.doc.children[0]);
        setTimeout(function () {
            cm.refresh();
            cm.setSize('100%', '100%');
            var posCursor = { line: 0, ch: 0 };
            posCursor.line = cm.doc.children[0].lines.length - 1;
            posCursor.ch = cm.doc.children[0].lines[posCursor.line].text.length;
            cm.doc.setCursor(posCursor);
        }, 200);
    };
    AppComponent.prototype.copyCode = function (editorEvent) {
        //this.editor.doc.setValue(this.editor.doc.getValue()+"\ncopy")
        //this.editor.instance.doc.setValue(this.editor.instance.doc.getValue());
        //console.log(this.editor.instance.doc.getValue());
    };
    AppComponent.prototype.codeConvert = function (editorEvent) {
        //this.editor.value = this.editor.value;
        //console.log(this.editor.value);
    };
    AppComponent.prototype.onChange = function () {
        //console.log("change");
        //this.editor.instance.doc.setValue(this.editor.instance.doc.getValue());
    };
    AppComponent.prototype.pasteCode = function () {
        this.editor.instance.doc.setValue(this.removeOddChars(this.editor.instance.doc.getValue()));
        //this.editor.instance.doc.setValue( this.removeOddChars(this.editor.instance.doc.getValue()));
    };
    AppComponent.prototype.ngOnInit = function () {
    };
    AppComponent.prototype.ngViewChild = function () {
        console.log("VIKEWwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww");
    };
    return AppComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('editor'),
    __metadata("design:type", Object)
], AppComponent.prototype, "editor", void 0);
AppComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-root',
        template: __webpack_require__("../../../../../src/app/app.component.html"),
        styles: [__webpack_require__("../../../../../src/app/app.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__cruiseComponents_core_globalvariables_globalvariables_component__["a" /* GlobalvariablesComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__cruiseComponents_core_globalvariables_globalvariables_component__["a" /* GlobalvariablesComponent */]) === "function" && _a || Object])
], AppComponent);

var _a;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__("../../../common/@angular/common/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__cruiseComponents_core_plugins_plugins_component__ = __webpack_require__("../../../../../src/app/cruiseComponents/core/plugins/plugins.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__cruiseComponents_core_dataservices_plugins_service__ = __webpack_require__("../../../../../src/app/cruiseComponents/core/dataservices/plugins.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__cruiseComponents_core_globalvariables_globalvariables_component__ = __webpack_require__("../../../../../src/app/cruiseComponents/core/globalvariables/globalvariables.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_angular4_jsoneditor__ = __webpack_require__("../../../../angular4-jsoneditor/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_ngx_bootstrap_tabs__ = __webpack_require__("../../../../ngx-bootstrap/tabs/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_ngx_bootstrap_accordion__ = __webpack_require__("../../../../ngx-bootstrap/accordion/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__cruiseComponents_core_cruises3_cruises3_component__ = __webpack_require__("../../../../../src/app/cruiseComponents/core/cruises3/cruises3.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_ng2_codemirror__ = __webpack_require__("../../../../ng2-codemirror/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_ng2_codemirror___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_ng2_codemirror__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};













//import {MatButtonModule, MatCheckboxModule, MatListModule} from '@angular/material';
//import { PopupModule } from 'ng2-opd-popup';
//import { CruisepopupComponent } from './cruiseComponents/core/cruisepopup/cruisepopup.component';
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_5__cruiseComponents_core_plugins_plugins_component__["a" /* PluginsComponent */],
            __WEBPACK_IMPORTED_MODULE_11__cruiseComponents_core_cruises3_cruises3_component__["a" /* Cruises3Component */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormsModule"],
            __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["b" /* HttpClientModule */],
            __WEBPACK_IMPORTED_MODULE_8_angular4_jsoneditor__["a" /* Ng4JsonEditorModule */],
            __WEBPACK_IMPORTED_MODULE_12_ng2_codemirror__["CodemirrorModule"],
            __WEBPACK_IMPORTED_MODULE_9_ngx_bootstrap_tabs__["a" /* TabsModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_10_ngx_bootstrap_accordion__["a" /* AccordionModule */].forRoot()
        ],
        providers: [__WEBPACK_IMPORTED_MODULE_6__cruiseComponents_core_dataservices_plugins_service__["a" /* PluginsService */], __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["b" /* HttpClientModule */], __WEBPACK_IMPORTED_MODULE_11__cruiseComponents_core_cruises3_cruises3_component__["a" /* Cruises3Component */], __WEBPACK_IMPORTED_MODULE_7__cruiseComponents_core_globalvariables_globalvariables_component__["a" /* GlobalvariablesComponent */]],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/app/cruiseComponents/core/cruises3/bucketdata.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return bucketData; });
var bucketData = (function () {
    function bucketData(name, owner, displayName, creationDate) {
        this.name = name;
        this.owner = owner;
        this.displayName = displayName;
        this.creationDate = creationDate;
        //this.Actions = actions;
        //console.log();
    }
    return bucketData;
}());

//# sourceMappingURL=bucketdata.js.map

/***/ }),

/***/ "../../../../../src/app/cruiseComponents/core/cruises3/cruises3.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/cruiseComponents/core/cruises3/cruises3.component.html":
/***/ (function(module, exports) {

module.exports = "<div>\n\tAvailable Buckets&nbsp;:&nbsp;<select [(ngModel)]=\"selectedBucket\" (ngModelChange)=\"onBucketChange($event)\">\n\t    <option *ngFor=\"let sp of supportedBuckets\"\ttitle=\" By:{{sp.name}} Version:{{sp.creationDate}}\" [ngValue]=\"sp\">{{sp.name}}\n\t\t</option>\n\t</select>\n\t<button (click)=\"onRefreshList()\">Refresh List</button>\n             </div><br><div>\n\tAvailable Objects&nbsp;:&nbsp;<select [(ngModel)]=\"selectedFile\" (ngModelChange)=\"onFileChange($event)\">\n\t    <option *ngFor=\"let sp of supportedFiles\"\ttitle=\" By:{{sp.key}} Version:{{sp.lastModified}}\" [ngValue]=\"sp\">{{sp.key}}\n\t\t</option>\n\t</select>\n\t<button class=\"btn btn-primary btn-sm active\" (click)=\"doDeleteObject()\" title=\"Deletes the Object from S3\">Delete Object</button>\n</div>\t\t\t\t\n\t\t\t\t\n\n\n"

/***/ }),

/***/ "../../../../../src/app/cruiseComponents/core/cruises3/cruises3.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Cruises3Component; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__globalvariables_globalvariables_component__ = __webpack_require__("../../../../../src/app/cruiseComponents/core/globalvariables/globalvariables.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dataservices_plugins_service__ = __webpack_require__("../../../../../src/app/cruiseComponents/core/dataservices/plugins.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__bucketdata__ = __webpack_require__("../../../../../src/app/cruiseComponents/core/cruises3/bucketdata.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__filedata__ = __webpack_require__("../../../../../src/app/cruiseComponents/core/cruises3/filedata.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var Cruises3Component = (function () {
    function Cruises3Component(_httpPlugin, gv) {
        this._httpPlugin = _httpPlugin;
        this.gv = gv;
        this.supportedBuckets = [];
        this.supportedFiles = [];
        this.Application = {};
    }
    Cruises3Component.prototype.log = function () {
    };
    Cruises3Component.prototype.ngOnInit = function () {
        this.loadData();
    };
    //    constructor(public bucketName:string, public key: string, public size: string, public lastModified: string, public storageClass: string, public owner: string, public etag: string){
    Cruises3Component.prototype.onFileChange = function (selectedfile) {
        this.gv.objectName = selectedfile.key;
    };
    Cruises3Component.prototype.loadFiles = function () {
        var _this = this;
        this.gv.initFileList.services[0].parameters.bucketName = this.selectedBucket.name;
        this.data = this._httpPlugin.doPOST(this.gv.initFileList).then(function (data) {
            //this.data = data;
            //console.log(JSON.stringify(data, null, 4));
            var bucketObject = data['BucketLoadList.s3ListAllFiles'].objectSummaries;
            for (var i = 0; i < bucketObject.length; i++) {
                //console.log('XXXX:'+bucketObject[i].name);
                var el = bucketObject[i];
                //console.log(el);
                _this.supportedFiles.push(new __WEBPACK_IMPORTED_MODULE_4__filedata__["a" /* filedata */](el.bucketName, el.key, el.size, el.lastModified, el.storeageClass, el.owner, el.etag));
            }
            //this.jsonData = (JSON.stringify(this.supportedPlugin, null, 4));*/
        });
    };
    Cruises3Component.prototype.loadData = function () {
        var _this = this;
        this.data = this._httpPlugin.doPOST(this.gv.initSend).then(function (data) {
            _this.data = data;
            //console.log("*************RETURNED");
            //public name:string, public owner: string, public displayName: string, public creationDate: string
            for (var i = 0; i < _this.data['BucketLoadList.s3ListBuckets'].length; i++) {
                console.log('XXXX:' + _this.data['BucketLoadList.s3ListBuckets'][i].name);
                var el = _this.data['BucketLoadList.s3ListBuckets'][i];
                _this.supportedBuckets.push(new __WEBPACK_IMPORTED_MODULE_3__bucketdata__["a" /* bucketData */](el.name, el.owner, el.displayName, el.creationDate));
            }
            //this.jsonData = (JSON.stringify(this.supportedPlugin, null, 4));*/
        });
    };
    Cruises3Component.prototype.deleteObject = function () {
        var _this = this;
        //this.gv.objectName
        this.gv.objectDelete.services[0].parameters.bucketName = this.gv.bucketName;
        this.gv.objectDelete.services[0].parameters.objectName = this.gv.objectName;
        this.data = this._httpPlugin.doPOST(this.gv.objectDelete).then(function (data) {
            _this.data = data;
            //console.log("*************RETURNED");
            //public name:string, public owner: string, public displayName: string, public creationDate: string
            /*for(let i=0;i<this.data['BucketLoadList.s3ListBuckets'].length;i++){
                console.log('XXXX:'+this.data['BucketLoadList.s3ListBuckets'][i].name);
                let el = this.data['BucketLoadList.s3ListBuckets'][i];
                this.supportedBuckets.push(new bucketData(el.name, el.owner, el.displayName, el.creationDate));
                
            }*/
            //this.jsonData = (JSON.stringify(this.supportedPlugin, null, 4));*/
            _this.supportedFiles = [];
            _this.loadFiles();
        });
    };
    Cruises3Component.prototype.onBucketChange = function (bucket) {
        this.supportedFiles = [];
        this.loadFiles();
        this.gv.bucketName = bucket.name;
    };
    Cruises3Component.prototype.onRefreshList = function () {
        this.supportedBuckets = [];
        this.supportedFiles = [];
        this.loadData();
    };
    Cruises3Component.prototype.doDeleteObject = function () {
        this.deleteObject();
    };
    return Cruises3Component;
}());
Cruises3Component = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-cruises3',
        template: __webpack_require__("../../../../../src/app/cruiseComponents/core/cruises3/cruises3.component.html"),
        styles: [__webpack_require__("../../../../../src/app/cruiseComponents/core/cruises3/cruises3.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__dataservices_plugins_service__["a" /* PluginsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__dataservices_plugins_service__["a" /* PluginsService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__globalvariables_globalvariables_component__["a" /* GlobalvariablesComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__globalvariables_globalvariables_component__["a" /* GlobalvariablesComponent */]) === "function" && _b || Object])
], Cruises3Component);

var _a, _b;
//# sourceMappingURL=cruises3.component.js.map

/***/ }),

/***/ "../../../../../src/app/cruiseComponents/core/cruises3/filedata.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return filedata; });
/**
 *
            {
                "bucketName": "elasticbeanstalk-us-west-2-327888233030",
                "key": "2017339DYC-CuiseSite-0.0.1-SNAPSHOT.war",
                "size": 9871800,
                "lastModified": 1512434274000,
                "storageClass": "STANDARD",
                "owner": {
                    "displayName": "stevechappell2000",
                    "id": "c97123d5b8f09d4a6b49c5b95e3ab396b16504930ecbbbce3c1ad4c6568bd9ba"
                },
                "etag": "4f6cd9e5f2874ef3bac2c09dd04127d8"
            },
 
 *
 */
var filedata = (function () {
    function filedata(bucketName, key, size, lastModified, storageClass, owner, etag) {
        this.bucketName = bucketName;
        this.key = key;
        this.size = size;
        this.lastModified = lastModified;
        this.storageClass = storageClass;
        this.owner = owner;
        this.etag = etag;
        //this.Actions = actions;
        //console.log();
    }
    return filedata;
}());

//# sourceMappingURL=filedata.js.map

/***/ }),

/***/ "../../../../../src/app/cruiseComponents/core/dataservices/plugins.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PluginsService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("../../../common/@angular/common/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__globalvariables_globalvariables_component__ = __webpack_require__("../../../../../src/app/cruiseComponents/core/globalvariables/globalvariables.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var PluginsService = (function () {
    function PluginsService(_http) {
        this._http = _http;
        this.gv = new __WEBPACK_IMPORTED_MODULE_2__globalvariables_globalvariables_component__["a" /* GlobalvariablesComponent */]();
        this.LastURL = this.gv.GetEngineURL();
        console.log('Constructor PluginsService:' + this.LastURL);
    }
    PluginsService.prototype.getPlugin = function (URL, params) {
        var _this = this;
        // 'http://localhost:8079/CuiseSite/Cruiselet?TableName=testtable'
        this.LastURL = URL;
        console.log('FetchData PluginsService');
        this._http.get(URL, params).subscribe(function (data) {
            _this.PlugInData = data;
            console.log(JSON.stringify(data));
            console.log(data);
            return data;
        });
    };
    PluginsService.prototype.setCruiseEngine = function (inURL) {
        this.LastURL = inURL;
    };
    PluginsService.prototype.doGET = function () {
        var _this = this;
        /*console.log("GET:"+this.LastURL);
        let url = `${this.LastURL}`;
        return this._http.get(url).retry(3).subscribe(res => {
            console.log("Hello:"+res)
            return res;
        },
        (err: HttpErrorResponse) => {
            if (err.error instanceof Error) {
              // A client-side or network error occurred. Handle it accordingly.
              console.log('An error occurred:', err.error.message);
            } else {
              // The backend returned an unsuccessful response code.
              // The response body may contain clues as to what went wrong,
              console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
            }
        });*/
        var url = "" + this.LastURL;
        return new Promise(function (resolve) {
            _this._http.get(url).subscribe(function (data) {
                resolve(data);
            }, function (err) {
                console.log(err);
            });
        });
    };
    PluginsService.prototype.doPOST = function (Application) {
        var _this = this;
        console.log("POST:" + this.LastURL + "/" + JSON.stringify(Application));
        var url = "" + this.LastURL;
        var body = JSON.stringify({ Application: Application });
        /*let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        
        
        this._http.post(url, body).subscribe(res => {
            console.log("Hello:"+res)
            return res;
        },
        (err: HttpErrorResponse) => {
            if (err.error instanceof Error) {
              // A client-side or network error occurred. Handle it accordingly.
              console.log('An error occurred:', err.error.message);
            } else {
              // The backend returned an unsuccessful response code.
              // The response body may contain clues as to what went wrong,
              console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
            }
        });*/
        return new Promise(function (resolve) {
            _this._http.post(url, body).subscribe(function (data) {
                resolve(data);
            }, function (err) {
                console.log(err);
            });
        });
    };
    PluginsService.prototype.doPUT = function () {
        console.log("PUT");
    };
    PluginsService.prototype.doDELETE = function () {
        console.log("DELETE");
    };
    PluginsService.prototype.doGETAsPromise = function () {
        console.log("GET AS PROMISE");
    };
    PluginsService.prototype.doGETAsPromiseError = function () {
        console.log("GET AS PROMISE ERROR");
    };
    PluginsService.prototype.doGETAsObservableError = function () {
        console.log("GET AS OBSERVABLE ERROR");
    };
    PluginsService.prototype.doGETWithHeaders = function () {
        console.log("GET WITH HEADERS");
    };
    return PluginsService;
}());
PluginsService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */]) === "function" && _a || Object])
], PluginsService);

var _a;
//# sourceMappingURL=plugins.service.js.map

/***/ }),

/***/ "../../../../../src/app/cruiseComponents/core/globalvariables/globalvariables.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/cruiseComponents/core/globalvariables/globalvariables.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\n  globalvariables works!\n</p>\n"

/***/ }),

/***/ "../../../../../src/app/cruiseComponents/core/globalvariables/globalvariables.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GlobalvariablesComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var GlobalvariablesComponent = (function () {
    function GlobalvariablesComponent() {
        this.bucketName = "Unselected";
        this.objectName = "Unselected";
        this.region = 'us-west-2';
        this.applicationName = "CruiseDirector";
        this.applicationId = "Generated";
        this.initPluginSend = {
            "parameters": {
                "name": this.applicationName,
                "id": this.applicationId
            },
            "credentials": {
                "parameters": {
                    "password": "admin",
                    "username": "admin"
                }
            },
            "services": [
                { "parameters": {
                        "pluginName": "CruiseCorePlugin",
                        "service": "SomeService",
                        "action": "info"
                    }
                }
            ]
        };
        this.customSend = {
            "parameters": {
                "name": this.applicationName,
                "id": this.applicationId
            },
            "credentials": {
                "parameters": {
                    "password": "admin",
                    "username": "admin"
                }
            },
            "services": [
                { "parameters": {
                        "pluginName": "CruiseCorePlugin",
                        "service": "SomeService",
                        "action": "info"
                    }
                }
            ]
        };
        this.initSend = {
            "parameters": {
                "name": this.applicationName,
                "id": this.applicationId
            },
            "credentials": {
                "parameters": {
                    "password": "admin",
                    "username": "admin"
                }
            },
            "services": [
                { "parameters": {
                        "pluginName": "CruiseS3",
                        "service": "CruiseS3Connect",
                        "connectionName": "CruiseS3",
                        "region": this.region,
                        "action": "s3Connect"
                    }
                },
                { "parameters": {
                        "pluginName": "CruiseS3",
                        "service": "BucketLoadList",
                        "connectionName": "CruiseS3",
                        "action": "s3ListBuckets"
                    }
                }
            ]
        };
        this.initFileList = {
            "parameters": {
                "name": this.applicationName,
                "id": this.applicationId
            },
            "credentials": {
                "parameters": {
                    "password": "admin",
                    "username": "admin"
                }
            },
            "services": [
                { "parameters": {
                        "pluginName": "CruiseS3",
                        "service": "BucketLoadList",
                        "connectionName": "CruiseS3",
                        "action": "s3ListAllFiles",
                        "bucketName": "unknown"
                    }
                }
            ]
        };
        this.objectSave = {
            "parameters": {
                "name": this.applicationName,
                "id": this.applicationId
            },
            "credentials": {
                "parameters": {
                    "password": "admin",
                    "username": "admin"
                }
            },
            "services": [
                { "parameters": {
                        "pluginName": "CruiseS3",
                        "service": "SaveObject",
                        "connectionName": "CruiseS3",
                        "action": "s3PutString",
                        "bucketName": this.bucketName,
                        "object": this.object,
                        "objectName": this.objectName
                    }
                }
            ]
        };
        this.objectDelete = {
            "parameters": {
                "name": this.applicationName,
                "id": this.applicationId
            },
            "credentials": {
                "parameters": {
                    "password": "admin",
                    "username": "admin"
                }
            },
            "services": [
                { "parameters": {
                        "pluginName": "CruiseS3",
                        "service": "DeleteObject",
                        "connectionName": "CruiseS3",
                        "action": "s3DeleteObject",
                        "bucketName": this.bucketName,
                        "object": this.object,
                        "objectName": this.objectName
                    }
                }
            ]
        };
        this.objectLoad = {
            "parameters": {
                "name": this.applicationName,
                "id": this.applicationId
            },
            "credentials": {
                "parameters": {
                    "password": "admin",
                    "username": "admin"
                }
            },
            "services": [
                { "parameters": {
                        "pluginName": "CruiseS3",
                        "service": "LoadObject",
                        "connectionName": "CruiseS3",
                        "action": "s3GetString",
                        "bucketName": this.bucketName,
                        "objectName": this.objectName
                    }
                }
            ]
        };
        this.engineURL = 'http://ec2-34-214-163-138.us-west-2.compute.amazonaws.com/Cruise';
        //this.engineURL = 'http://localhost:8077/CuiseSite/Cruiselet';
        //this.engineURL = '../Cruiselet';
        //this.engineURL = 'http://steve-env.fijpm3ncun.us-west-2.elasticbeanstalk.com/Cruiselet';
    }
    GlobalvariablesComponent.prototype.ngOnInit = function () {
        //this.engineURL = 'http://localhost:8077/CuiseSite/Cruiselet';
        //this.engineURL = '../Cruiselet';
        //this.engineURL = 'http://steve-env.fijpm3ncun.us-west-2.elasticbeanstalk.com/Cruiselet';
    };
    GlobalvariablesComponent.prototype.GetEngineURL = function () {
        return this.engineURL;
    };
    GlobalvariablesComponent.prototype.SetEngineURL = function (inURL) {
        this.engineURL = inURL;
    };
    return GlobalvariablesComponent;
}());
GlobalvariablesComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-globalvariables',
        template: __webpack_require__("../../../../../src/app/cruiseComponents/core/globalvariables/globalvariables.component.html"),
        styles: [__webpack_require__("../../../../../src/app/cruiseComponents/core/globalvariables/globalvariables.component.css")]
    }),
    __metadata("design:paramtypes", [])
], GlobalvariablesComponent);

//# sourceMappingURL=globalvariables.component.js.map

/***/ }),

/***/ "../../../../../src/app/cruiseComponents/core/plugins/pluginobject.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return pluginObject; });
var pluginObject = (function () {
    function pluginObject(name, version, vendor, actions) {
        if (actions === void 0) { actions = []; }
        this.name = name;
        this.version = version;
        this.vendor = vendor;
        this.actions = actions;
        this.Actions = [];
        //this.Actions = actions;
        //console.log();
    }
    return pluginObject;
}());

//# sourceMappingURL=pluginobject.js.map

/***/ }),

/***/ "../../../../../src/app/cruiseComponents/core/plugins/plugins.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "    #jsoneditor {\r\n      width: '100%';\r\n      height: '100%';\r\n    }\r\n    #jsondisplay {\r\n      width: '100%';\r\n      height: '100%';\r\n    }\r\n    body, html {\r\n      font-family: \"DejaVu Sans\", sans-serif;\r\n    }\r\n\r\n    p, li {\r\n      width: 100%;\r\n      font-size: 10.5pt;\r\n    }\r\n\r\n    code {\r\n      background: #f5f5f5;\r\n    }", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/cruiseComponents/core/plugins/plugins.component.html":
/***/ (function(module, exports) {

module.exports = "<!-- button class=\"btn btn-outline-secondary\"  [ngbTooltip]=\"tipContent\">Show</button -->\n\n\n<input type=\"url\" width=\"90%\" class=\"form-control\" id=\"myURL\"\n\t(blur)=\"doUpdateURL($event)\" aria-describedby=\"urlHelp\"\n\tplaceholder=\"http://localhost:4200\" value=\"{{gv.engineURL}}\">\n\n<!-- button class=\"btn btn-primary btn-sm active\"  (click)=\"doConnect()\" title=\"Connect to Cruise Engine.\">Clear</button -->\n\n\n<!-- \n\n\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t<div class=\"huge\">Plugins:{{supportedPlugin.length}}&nbsp;&nbsp;\n                        Actions:{{supportedActions.length}}&nbsp;&nbsp;\n\t\t\t\t\t    Parameters{{supportedActionParams.length}}</div>\n\t\t\t\t</div>\n-->\n\t<button class=\"btn btn-primary btn-sm active\" (click)=\"doLoadObject()\" title=\"Loads the selected S3 object to the editor\">Load From\tS3</button>\n    \n    <hr>\n    \n\t<div class=\"row\">\n\t\t<div class=\"col-xl-5\">\n    \n\n        <div>\n    \n\t\t<div>\n\t\t\tPlugins : <select [(ngModel)]=\"selectedPlugin\"\n\t\t\t\t(ngModelChange)=\"onPluginChange($event)\">\n\t\t\t\t<option *ngFor=\"let sp of supportedPlugin\"\n\t\t\t\t\ttitle=\" By:{{sp.vendor}} Version:{{sp.version}}\" [ngValue]=\"sp\">{{sp.name}}\n\t\t\t\t</option>\n\t\t\t</select> <select [(ngModel)]=\"selectedAction\"\n\t\t\t\t(ngModelChange)=\"onActionChange($event)\">\n\t\t\t\t<option *ngFor=\"let sa of supportedActions\" title=\"{{sa.actionDesc}}\"\n\t\t\t\t\t[ngValue]=\"sa\">{{sa.actionName}}</option>\n\t\t\t</select> <select [(ngModel)]=\"selectedActionParams\"\n\t\t\t\t(ngModelChange)=\"onActionParamChange($event)\">\n\t\t\t\t<option *ngFor=\"let sap of supportedActionParams\"\n\t\t\t\t\ttitle=\"{{sap.paramDesc}}\" [ngValue]=\"sap\">{{sap.paramName}}</option>\n\t\t\t</select>\n\t\t\t\t<button class=\"btn btn-primary btn-sm active\" (click)=\"doStageEditor()\"\ttitle=\"Moves the selected Plugin and Action to the editor\">Stage</button>\n\t\t\t\t<button class=\"btn btn-primary btn-sm active\" (click)=\"doClearEditor()\" title=\"Clears the Editor Content\">Clear</button>\n\t\t\t\t<button class=\"btn btn-primary btn-sm active\" (click)=\"doPOSTEditor()\"\ttitle=\"Sends the editor content to the Cruise Engine\">Send</button>\n\t\t\t\t<button class=\"btn btn-primary btn-sm active\" (click)=\"doShowEditor()\"\ttitle=\"Shows the raw JSON from the editor in the Response area.\">Show</button>\n\t\t</div>    \n\n    \n    </div>\n\n\t<div id=\"jsoneditor\" style=\"height: 699px;\">\n\t\t<json-editor [options]=\"editorOptions\" [data]=\"Application\" (editable)=\"onEditable($event)\"></json-editor>\n\t</div>\n     <div>\n\t\t<button class=\"btn btn-primary btn-sm active\"\n\t\t\t(click)=\"doSaveObject($event)\" title=\"Connect to Cruise Engine.\"\n\t\t\tenabled=false>Save</button>\n\t</div>\n\t<div class=\"col-xs-6\">\n\t\t<input type=\"text\" class=\"form-control\" id=\"objectName\"\n\t\t\t(blur)=\"doUpdateObject($event)\"\n\t\t\tplaceholder=\"enter a name for this action\" value=\"{{gv.objectName}}\">\n\t</div>\n\n</div>\n<div class=\"col-xl-5\">\n\n\n\n\t<i class=\"fa fa-bell fa-fw\"></i> Response\n\t<textarea class=\"form-control\" id=\"exampleTextarea\" rows=\"30\">{{jsonData}}</textarea>\n\n</div>\n</div>\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n"

/***/ }),

/***/ "../../../../../src/app/cruiseComponents/core/plugins/plugins.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PluginsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dataservices_plugins_service__ = __webpack_require__("../../../../../src/app/cruiseComponents/core/dataservices/plugins.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular4_jsoneditor_jsoneditor_jsoneditor_component__ = __webpack_require__("../../../../angular4-jsoneditor/jsoneditor/jsoneditor.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__globalvariables_globalvariables_component__ = __webpack_require__("../../../../../src/app/cruiseComponents/core/globalvariables/globalvariables.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pluginobject__ = __webpack_require__("../../../../../src/app/cruiseComponents/core/plugins/pluginobject.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_application__ = __webpack_require__("../../../../../src/app/cruiseComponents/core/plugins/utils/application.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__utils_credentials__ = __webpack_require__("../../../../../src/app/cruiseComponents/core/plugins/utils/credentials.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__utils_services__ = __webpack_require__("../../../../../src/app/cruiseComponents/core/plugins/utils/services.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__cruises3_cruises3_component__ = __webpack_require__("../../../../../src/app/cruiseComponents/core/cruises3/cruises3.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var PluginsComponent = (function () {
    function PluginsComponent(_httpPlugin, _cruises3, gv) {
        this._httpPlugin = _httpPlugin;
        this._cruises3 = _cruises3;
        this.gv = gv;
        //private gv = new GlobalvariablesComponent();
        this.supportedPlugin = [];
        this.supportedActions = [];
        this.supportedActionParams = [];
        this.postApp = undefined;
        this.activeURL = undefined;
        this.Application = {};
        this.Application = this.gv.initPluginSend;
        this.editorOptions = new __WEBPACK_IMPORTED_MODULE_2_angular4_jsoneditor_jsoneditor_jsoneditor_component__["b" /* JsonEditorOptions */]();
        this.editorOptions.modes = ['code', 'form', 'text', 'tree', 'view']; // set all allowed modes
        this.editorOptions.onError = function (error) {
            console.log(error);
        };
        this.editorOptions.onChange = function () {
            //console.log(this.editor.get());
        };
        this.data = this.Application;
    }
    PluginsComponent.prototype.onEditable = function (x) {
        console.log(x);
    };
    PluginsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.data = this._httpPlugin.doPOST(this.Application).then(function (data) {
            _this.data = data;
            for (var i = 0; i < _this.data.Plugins.length; i++) {
                //console.log('XXXX:'+this.data.Plugins[i].plugInMetaData.name);
                var el = _this.data.Plugins[i].plugInMetaData;
                _this.supportedPlugin.push(new __WEBPACK_IMPORTED_MODULE_4__pluginobject__["a" /* pluginObject */](el.name, el.version, el.vendor, el.actions));
            }
            _this.jsonData = (JSON.stringify(_this.supportedPlugin, null, 4));
        });
    };
    PluginsComponent.prototype.onNameKeyUp = function (event) {
        console.log(event.target.value);
    };
    /**
             Called from the doStageEditor event (stage button clicked)
             
             **/
    PluginsComponent.prototype.createApp = function () {
        //var app: application;
        if (undefined === this.postApp) {
            this.postApp = new __WEBPACK_IMPORTED_MODULE_5__utils_application__["a" /* application */](this.gv.applicationName, this.gv.applicationId);
        }
        var ser = new __WEBPACK_IMPORTED_MODULE_7__utils_services__["a" /* services */](this.selectedPlugin.name); //
        ser.addParam("action", this.selectedAction.actionName);
        for (var i = 0; i < this.selectedAction.actionParams.length; i++) {
            if (this.selectedAction.actionParams[i].paramName != 'ID') {
                ser.addParam(this.selectedAction.actionParams[i].paramName, this.selectedAction.actionParams[i].paramDefault);
            }
        }
        this.postApp.addService(ser);
        var js = JSON.stringify(this.postApp, null, 4);
        this.gv.currentService = JSON.parse(js);
        this.editor.set(this.gv.currentService);
    };
    PluginsComponent.prototype.doPOSTEditor = function () {
        var _this = this;
        console.log("doPOSTEditor");
        this.gv.currentService = this.editor.get();
        this.data = this._httpPlugin.doPOST(this.gv.currentService).then(function (data) {
            _this.data = data;
            _this.jsonData = (JSON.stringify(_this.data, null, 4));
        });
        //}
    };
    PluginsComponent.prototype.doStageEditor = function () {
        console.log("doStageEditor");
        this.createApp();
    };
    PluginsComponent.prototype.doClearEditor = function () {
        console.log("doClearEditor");
        this.postApp = undefined;
        this.gv.currentService = undefined;
        this.editor.set(JSON.parse("{}"));
    };
    PluginsComponent.prototype.doShowEditor = function () {
        console.log("doShowEditor");
        this.postApp = undefined;
        this.jsonData = JSON.stringify(this.editor.get(), null, 4);
    };
    /**
        Output window button events
        
       
        
    doClearOutput(){
        console.log("doClearOutput");
        this.jsonData  = "{}";
    }
    doConvertOutput(){
        console.log("doConvertOutput:"+this.jsonData);
        //this.data = this.jsonData;
        this.editor.data = JSON.parse(JSON.stringify(this.jsonData));
        console.log("-------------------------");
    }
   **/
    /**
          Drop down box events
          
          **/
    PluginsComponent.prototype.onPluginChange = function (plugin) {
        this._cruises3.log();
        this.selectedPlugin = plugin;
        this.jsonData = (JSON.stringify(this.selectedPlugin, null, 4));
        this.supportedActions = plugin.actions;
    };
    PluginsComponent.prototype.onActionChange = function (action) {
        this.selectedAction = action;
        this.supportedActionParams = action.actionParams;
        this.jsonData = (JSON.stringify(this.selectedAction, null, 4));
    };
    PluginsComponent.prototype.onActionParamChange = function (actionParams) {
        this.selectedActionParams = actionParams;
    };
    PluginsComponent.prototype.doUpdateURL = function (event) {
        this.activeURL = event.target.value;
    };
    PluginsComponent.prototype.doConnect = function () {
        if (undefined != this.activeURL) {
            this._httpPlugin.LastURL = this.activeURL;
        }
    };
    PluginsComponent.prototype.doUpdateObject = function (event) {
        this.gv.objectName = event.target.value;
    };
    PluginsComponent.prototype.doLoadObject = function (event) {
        var _this = this;
        this.gv.objectLoad.services[0].parameters.bucketName = this.gv.bucketName;
        this.gv.objectLoad.services[0].parameters.objectName = this.gv.objectName;
        //console.log(JSON.stringify(this.gv.objectLoad, null, 4));
        this.data = this._httpPlugin.doPOST(this.gv.objectLoad).then(function (data) {
            console.log(JSON.stringify(data, null, 4));
            var rootName = _this.gv.objectLoad.services[0].parameters.service + ".s3GetString";
            var len = data[rootName].length;
            var o = JSON.parse(data[rootName].object);
            var p = o.parameters;
            var s = o.services;
            var c = o.credentials;
            //console.log(JSON.stringify(o,null,4));
            _this.postApp = new __WEBPACK_IMPORTED_MODULE_5__utils_application__["a" /* application */](p.name, p.id);
            //console.log("name:"+c.parameters.username);
            _this.postApp.credentials = new __WEBPACK_IMPORTED_MODULE_6__utils_credentials__["a" /* credentials */](c.parameters.username, c.parameters.password);
            for (var i = 0; i < o.services.length; i++) {
                _this.postApp.services.push(o.services[i]);
            }
            _this.editor.set(JSON.parse(JSON.stringify(_this.postApp)));
        });
    };
    PluginsComponent.prototype.doSaveObject = function (event) {
        var _this = this;
        this.gv.objectSave.services[0].parameters.object = JSON.stringify(this.editor.get());
        this.gv.objectSave.services[0].parameters.bucketName = this.gv.bucketName;
        this.gv.objectSave.services[0].parameters.objectName = this.gv.objectName;
        console.log(JSON.stringify(this.gv.objectSave, null, 4));
        this.data = this._httpPlugin.doPOST(this.gv.objectSave).then(function (data) {
            _this.jsonData = (JSON.stringify(data, null, 4));
        });
    };
    return PluginsComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_2_angular4_jsoneditor_jsoneditor_jsoneditor_component__["a" /* JsonEditorComponent */]),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2_angular4_jsoneditor_jsoneditor_jsoneditor_component__["a" /* JsonEditorComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_angular4_jsoneditor_jsoneditor_jsoneditor_component__["a" /* JsonEditorComponent */]) === "function" && _a || Object)
], PluginsComponent.prototype, "editor", void 0);
PluginsComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-plugins',
        template: __webpack_require__("../../../../../src/app/cruiseComponents/core/plugins/plugins.component.html"),
        styles: [__webpack_require__("../../../../../src/app/cruiseComponents/core/plugins/plugins.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__dataservices_plugins_service__["a" /* PluginsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__dataservices_plugins_service__["a" /* PluginsService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_8__cruises3_cruises3_component__["a" /* Cruises3Component */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__cruises3_cruises3_component__["a" /* Cruises3Component */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__globalvariables_globalvariables_component__["a" /* GlobalvariablesComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__globalvariables_globalvariables_component__["a" /* GlobalvariablesComponent */]) === "function" && _d || Object])
], PluginsComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=plugins.component.js.map

/***/ }),

/***/ "../../../../../src/app/cruiseComponents/core/plugins/utils/application.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return application; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__credentials__ = __webpack_require__("../../../../../src/app/cruiseComponents/core/plugins/utils/credentials.ts");

var application = (function () {
    function application(appName, id) {
        this.parameters = {};
        this.services = [];
        this.credentials = new __WEBPACK_IMPORTED_MODULE_0__credentials__["a" /* credentials */]("admin", "admin");
        this.parameters['name'] = appName;
        this.parameters['id'] = id;
    }
    application.prototype.addParam = function (name, value) {
        this.parameters[name] = value;
    };
    application.prototype.getParam = function (name) {
    };
    application.prototype.addCredential = function (cred) {
        this.credentials = cred;
    };
    application.prototype.addService = function (serv) {
        this.services.push(serv);
    };
    return application;
}());

//# sourceMappingURL=application.js.map

/***/ }),

/***/ "../../../../../src/app/cruiseComponents/core/plugins/utils/credentials.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return credentials; });
var credentials = (function () {
    function credentials(username, password) {
        this.parameters = {};
        this.parameters["username"] = username;
        this.parameters["password"] = password;
    }
    credentials.prototype.addParam = function (name, value) {
        this.parameters[name] = value;
    };
    credentials.prototype.getParam = function (name) {
    };
    return credentials;
}());

//# sourceMappingURL=credentials.js.map

/***/ }),

/***/ "../../../../../src/app/cruiseComponents/core/plugins/utils/services.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return services; });
var services = (function () {
    function services(value) {
        this.parameters = {};
        this.parameters["pluginName"] = value;
    }
    services.prototype.addParam = function (name, value) {
        this.parameters[name] = value;
    };
    services.prototype.getParam = function (name) {
    };
    return services;
}());

//# sourceMappingURL=services.js.map

/***/ }),

/***/ "../../../../../src/app/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__app_module__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_codemirror_mode_javascript_javascript_js__ = __webpack_require__("../../../../codemirror/mode/javascript/javascript.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_codemirror_mode_javascript_javascript_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_codemirror_mode_javascript_javascript_js__);



//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false,
    defaultEngine: 'http://localhost:8079/CuiseSite/Cruiselet'
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__polyfills_ts__ = __webpack_require__("../../../../../src/polyfills.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app___ = __webpack_require__("../../../../../src/app/index.ts");





if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["enableProdMode"])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_4__app___["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ "../../../../../src/polyfills.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol__ = __webpack_require__("../../../../core-js/es6/symbol.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_es6_object__ = __webpack_require__("../../../../core-js/es6/object.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_es6_object___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_core_js_es6_object__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_es6_function__ = __webpack_require__("../../../../core-js/es6/function.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_es6_function___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_core_js_es6_function__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int__ = __webpack_require__("../../../../core-js/es6/parse-int.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float__ = __webpack_require__("../../../../core-js/es6/parse-float.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_es6_number__ = __webpack_require__("../../../../core-js/es6/number.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_es6_number___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_core_js_es6_number__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_core_js_es6_math__ = __webpack_require__("../../../../core-js/es6/math.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_core_js_es6_math___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_core_js_es6_math__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_core_js_es6_string__ = __webpack_require__("../../../../core-js/es6/string.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_core_js_es6_string___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_core_js_es6_string__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_core_js_es6_date__ = __webpack_require__("../../../../core-js/es6/date.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_core_js_es6_date___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_core_js_es6_date__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_core_js_es6_array__ = __webpack_require__("../../../../core-js/es6/array.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_core_js_es6_array___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_core_js_es6_array__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp__ = __webpack_require__("../../../../core-js/es6/regexp.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_core_js_es6_map__ = __webpack_require__("../../../../core-js/es6/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_core_js_es6_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_core_js_es6_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_core_js_es6_set__ = __webpack_require__("../../../../core-js/es6/set.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_core_js_es6_set___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_core_js_es6_set__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect__ = __webpack_require__("../../../../core-js/es6/reflect.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect__ = __webpack_require__("../../../../core-js/es7/reflect.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_zone_js_dist_zone__ = __webpack_require__("../../../../zone.js/dist/zone.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_zone_js_dist_zone___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15_zone_js_dist_zone__);
// This file includes polyfills needed by Angular 2 and is loaded before
// the app. You can add your own extra polyfills to this file.
















//# sourceMappingURL=polyfills.js.map

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map