"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListDictionary = void 0;
var ListDictionary = /** @class */ (function () {
    function ListDictionary() {
        this._keys = [];
        this._values = [];
    }
    ListDictionary.prototype.add = function (key, value) {
        if (!this.containKey(key)) {
            this._keys.push(key);
            this._values.push(value);
        }
        else {
            throw new Error("this key is already in a dictionary");
        }
    };
    ListDictionary.prototype.containKey = function (key) {
        return this._keys.includes(key);
    };
    ListDictionary.prototype.containValue = function (value) {
        return this._values.includes(value);
    };
    ListDictionary.prototype.getValueFromKey = function (key) {
        if (this.containKey(key)) {
            var index = this._keys.indexOf(key);
            return this._values[index];
        }
        throw new Error("key doesnt exist");
    };
    ListDictionary.prototype.getKeysCollectionFromValue = function (value) {
        var _this = this;
        var keys = [];
        this._values.forEach(function (item, index) {
            if (value === item) {
                keys.push(_this._keys[index]);
            }
        });
        return keys;
    };
    ListDictionary.prototype.setValueFromKey = function (key, value) {
        if (this.containKey(key)) {
            var index = this._keys.indexOf(key);
            this._values[index] = value;
        }
        else {
            throw new Error("Key doesn't exist");
        }
    };
    ListDictionary.prototype.deleteKey = function (key) {
        if (this.containKey(key)) {
            var index = this._keys.indexOf(key);
            this._keys.splice(index, 1);
            this._values.splice(index, 1);
        }
        else {
            throw new Error("Key doesn't exist");
        }
    };
    Object.defineProperty(ListDictionary.prototype, "keys", {
        get: function () {
            return this._keys;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ListDictionary.prototype, "values", {
        get: function () {
            return this._values;
        },
        enumerable: false,
        configurable: true
    });
    return ListDictionary;
}());
exports.ListDictionary = ListDictionary;
