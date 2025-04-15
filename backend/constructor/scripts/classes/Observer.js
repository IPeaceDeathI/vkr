export class Observer {
    count = 0;
    constructor() {}
    subscribe(observable) {
        if (!observable instanceof Observable) {
            throw "Передан объект неверного типа (должен быть Observable)";
            //return;
        }
        this.observable = observable;
        this.observable.subscribe(this);
    }
    unsubscribe() {
        if (this.observable == null) return;
        this.observable.unsubscribe(this);
    }
    delete() {
        if (this.observable != null) this.observable.unsubscribe(this);
        this._hook_after_delete();
    }
    set(data) {
        this._set_template(data);
        this._hook_after_set();
    }

    _hook_after_set() {
        return;
    }
    _set_template(data) {
        throw "must be red";
    }
    _hook_after_delete() {}
}
export class Observable {
    constructor() {
        this.observers = [];
    }
    subscribe(observer) {
        if (this.observers.find((_observer) => _observer === observer)) {
            console.log(`${observer} уже подписан на ${this}`);
        }
        this.observers.push(observer);
    }
    unsubscribe(observer) {
        this.observers = this.observers.filter(
            (subscriber) => subscriber !== observer
        );
    }
    notify(data) {
        this.filter_unsubscribe();
        this.observers.forEach(function (observer) {
            observer.set(data);
        });
        this._hook_after_notify();
    }
    filter_unsubscribe() {
        this.observers = this.observers.filter(
            (subscriber) => subscriber != undefined
        );
        // console.log( this.observers)
    }
    _hook_after_notify() {
        return;
    }
}
