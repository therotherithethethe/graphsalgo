class ListDictionary<K, V> {

    private _keys: K[];
    private _values: V[];
    public constructor() {
    }
    public add(key:K, value:V): void {
        if(!this.containKey(key)) {
            this._keys.push(key);
            this._values.push(value);
        }
        else {
            throw new Error("this key is already in a dictionary");
        }

    }

    public containKey(key: K): boolean {
        return this._keys.find(key);
    }
    public containValue(value: V): boolean {
        return this._values.find(value);
    }
    public getValueFromKey(key: K): V {
        if(this.containKey(key)) {
            return this._values[this._keys.findIndex(key)];
        }
        throw new Error("key doesnt exist")
    }

    public getKeysCollectionFromValue<K>(value: V): K[] {
        let keys: K[];
        this._values.forEach(val => {
            if(value == val) {
                keys.push(this._keys[this._values.findIndex(val)])
            }
        })
        return keys;

    }
    public setValueFromKey(key: K, value: V): void {
        if(this.containKey(key)) {
            this._values[this._keys.findIndex(key)] = value;
        }
        else {
            throw new Error("key doesnt exist");
        }

    }
    public deleteKey(key: K): void {
        if(this.containKey(key)) {
            this._values = this._values.slice(this._keys.findIndex(key), 1);
            this._keys = this._keys.filter(item => item != key);
        }
        else {
            throw new Error("key doesnt exist");
        }
    }

    public get keys(): K[] {
        return this._keys;
    }

    public get values(): V[] {
        return this._values;
    }
}