"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListDictionary = void 0;
class ListDictionary {
    constructor() {
        this._keys = [];
        this._values = [];
    }
    add(key, value) {
        if (!this.containKey(key)) {
            this._keys.push(key);
            this._values.push(value);
        }
        else {
            throw new Error("this key is already in a dictionary");
        }
    }
    containKey(key) {
        return this._keys.includes(key);
    }
    containValue(value) {
        return this._values.includes(value);
    }
    getValueFromKey(key) {
        if (this.containKey(key)) {
            const index = this._keys.indexOf(key);
            return this._values[index];
        }
        throw new Error("key doesnt exist");
    }
    getKeysCollectionFromValue(value) {
        let keys = [];
        this._values.forEach((item, index) => {
            if (value === item) {
                keys.push(this._keys[index]);
            }
        });
        return keys;
    }
    setValueFromKey(key, value) {
        if (this.containKey(key)) {
            const index = this._keys.indexOf(key);
            this._values[index] = value;
        }
        else {
            throw new Error("Key doesn't exist");
        }
    }
    deleteKey(key) {
        if (this.containKey(key)) {
            const index = this._keys.indexOf(key);
            this._keys.splice(index, 1);
            this._values.splice(index, 1);
        }
        else {
            throw new Error("Key doesn't exist");
        }
    }
    get keys() {
        return this._keys;
    }
    get values() {
        return this._values;
    }
}
exports.ListDictionary = ListDictionary;
