export class ListDictionary<K, V> {

    private _keys: K[] = [];
    private _values: V[] = [];
    public constructor() {}
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
        return this._keys.includes(key);

    }
    public containValue(value: V): boolean {
        return this._values.includes(value);
    }
    public getValueFromKey(key: K): V {
        if(this.containKey(key)) {
            const index = this._keys.indexOf(key);
            return this._values[index];
        }
        throw new Error("key doesnt exist")
    }

    public getKeysCollectionFromValue(value: V): K[] {
        let keys: K[] = [];
        this._values.forEach((item, index) => {
            if (value === item) {
                keys.push(this._keys[index]);
            }
        });
        return keys;

    }
    public setValueFromKey(key: K, value: V): void {
        if (this.containKey(key)) {
            const index = this._keys.indexOf(key);
            this._values[index] = value;
        } else {
            throw new Error("Key doesn't exist");
        }

    }
    public deleteKey(key: K): void {
        if (this.containKey(key)) {
            const index = this._keys.indexOf(key);
            this._keys.splice(index, 1);
            this._values.splice(index, 1);
        } else {
            throw new Error("Key doesn't exist");
        }
    }

    public get keys(): K[] {
        return this._keys;
    }

    public get values(): V[] {
        return this._values;
    }
}