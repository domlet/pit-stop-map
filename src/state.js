const props = {
    userLocation: null,
    focusPitstopIndex: 0
};

export class AppState{
    constructor(cb) {
        this.cb = cb;
        this._props = {};
        this._changes = {};
        for(const prop in props){
            this.set(prop, props[prop]);
        }

        setInterval(() => {
            if(this.hasChanges()){
                cb();
                this._changes = {};
            }
        }, 100)
    }

    hasChanges() {
        return Object.keys(this._changes).length > 0;
    }

    get(prop) {
        return this._props[prop];
    }

    set(prop, value) {
        const prev = this._props[prop];
        const curr = value;
        this._props[prop] = value;
        this._changes[prop] = {prev, curr};
    }

    change(prop) {
        return this._changes[prop];
    }
}