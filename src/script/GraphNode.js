"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphNode = void 0;
var ListDictionary_1 = require("./ListDictionary");
var GraphNode = /** @class */ (function () {
    function GraphNode() {
        this.nextNodes = new ListDictionary_1.ListDictionary();
    }
    GraphNode.prototype.addNextNode = function (graphNode, weight) {
        this.nextNodes.add(graphNode, weight);
    };
    GraphNode.prototype.isNodeConnected = function (graphNode) {
        return this.nextNodes.containKey(graphNode);
    };
    return GraphNode;
}());
exports.GraphNode = GraphNode;
