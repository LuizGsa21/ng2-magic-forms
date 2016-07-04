import {
    Pipe,
    OnDestroy,
    EventEmitter,
    ChangeDetectorRef,
    WrappedValue,
} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {
    isPresent,
    isBlank,
    noop,
    isPromise,
    isObservable
} from '../util';

interface SubscriptionStrategy {
    createSubscription(async: any, updateLatestValue: any): any;
    dispose(subscription: any): void;
    onDestroy(subscription: any): void;
}

class ObservableStrategy implements SubscriptionStrategy {
    createSubscription(async: Observable<any>, updateLatestValue: any, onError?: any, onComplete?:any): any {
        return async.subscribe(updateLatestValue,  onError || null, onComplete || null);
    }

    dispose(subscription: any): void { subscription.unsubscribe(); }

    onDestroy(subscription: any): void { subscription.unsubscribe(); }
}

class PromiseStrategy implements SubscriptionStrategy {
    createSubscription(async: Promise<any>, updateLatestValue: (v: any) => any): any {
        return async.then(updateLatestValue, e => { throw e; });
    }

    dispose(subscription: any): void {}

    onDestroy(subscription: any): void {}
}

class ValueStrategy implements SubscriptionStrategy {
    createSubscription(value, updateLatestValue: (v: any) => any): any {
        updateLatestValue(value);
        return value;
    }

    dispose(subscription: any): void {}

    onDestroy(subscription: any): void {}
}

var _promiseStrategy = new PromiseStrategy();
var _observableStrategy = new ObservableStrategy();
var _valueStrategy = new ValueStrategy();

// SubscriptionStrategy
@Pipe({name: 'asyncOrValue', pure: false})
export class AsyncOrValuePipe implements OnDestroy {
    /** @internal */
    _latestValue: any = null;
    /** @internal */
    _latestReturnedValue: any = null;

    /** @internal */
    _subscription: any = null;
    /** @internal */
    _obj: any = null;
    /** @internal */
    _ref: ChangeDetectorRef;
    private _strategy: SubscriptionStrategy = null;

    constructor(_ref: ChangeDetectorRef) { this._ref = _ref; }

    ngOnDestroy(): void {
        if (isPresent(this._subscription)) {
            this._dispose();
        }
    }

    transform(obj: any, defaultValue?: any): any {
        if (isBlank(this._obj)) {
            if (isPresent(obj)) {
                this._subscribe(obj);
            }
            this._latestReturnedValue = this._latestValue;
            return this._latestValue;
        }

        if (obj !== this._obj) {
            this._dispose();
            return this.transform(obj, defaultValue);
        }

        if (this._latestValue === this._latestReturnedValue) {
            return this._latestReturnedValue;
        } else {
            this._latestReturnedValue = this._latestValue;
            return WrappedValue.wrap(this._latestValue);
        }
    }

    /** @internal */
    _subscribe(obj: any): void {
        this._obj = obj;
        this._strategy = this._selectStrategy(obj);
        this._subscription = this._strategy.createSubscription(obj, (value: Object) => this._updateLatestValue(obj, value));
    }

    /** @internal */
    _selectStrategy(obj: any): any {
        if (isPromise(obj)) {
            return _promiseStrategy;
        } else if (isObservable(obj)) {
            return _observableStrategy;
        } else {
            return _valueStrategy;
        }
    }

    /** @internal */
    _dispose(): void {
        this._strategy.dispose(this._subscription);
        this._latestValue = null;
        this._latestReturnedValue = null;
        this._subscription = null;
        this._obj = null;
    }

    /** @internal */
    _updateLatestValue(async: any, value: any) {
        if (async === this._obj) {
            this._latestValue = value;
            this._ref.markForCheck();
        }
    }
}