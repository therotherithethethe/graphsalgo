/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 870:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GraphNode = void 0;
var ListDictionary_1 = __webpack_require__(248);
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


/***/ }),

/***/ 248:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
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


/***/ }),

/***/ 644:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Terminal = void 0;
var Terminal = /** @class */ (function () {
    function Terminal(textareaId) {
        var element = document.getElementById(textareaId);
        if (element instanceof HTMLTextAreaElement) {
            this.textarea = element;
        }
        else {
            throw new Error('Provided ID does not correspond to a textarea element.');
        }
    }
    Terminal.prototype.appendText = function (text) {
        this.textarea.value += text + '\n'; // Append text with a new line
        this.scrollToBottom();
    };
    Terminal.prototype.scrollToBottom = function () {
        this.textarea.scrollTop = this.textarea.scrollHeight;
    };
    Terminal.prototype.clear = function () {
        this.textarea.value = "";
    };
    return Terminal;
}());
exports.Terminal = Terminal;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
var Terminal_js_1 = __webpack_require__(644);
var GraphNode_1 = __webpack_require__(870);
var ListDictionary_1 = __webpack_require__(248);
var terminal = new Terminal_js_1.Terminal("terminal");
var graphList = [];
var secNodeSelect = document.getElementById("secondNodeSel");
var firstNodeSelect = document.getElementById("firstNodeSel");
var nodeToDeleteSel = document.getElementById("nodeToDelSel");
// @ts-ignore
window['addGraph'] = function () {
    graphList.push(new GraphNode_1.GraphNode());
    addNodesToSelElement();
    graphToTerminal();
};
// @ts-ignore
window['joinNodes'] = function () {
    var indexFrom = firstNodeSelect.selectedIndex;
    var indexTo = secNodeSelect.selectedIndex;
    var weight = document.getElementById("weightTxt").value;
    var isWeightNull = weight === null;
    var isIndexToBiggerThanIndexFrom = indexTo > indexFrom;
    var graphsIsDefinedInList = graphList[indexTo] !== undefined && graphList[indexFrom] !== undefined;
    if (!isWeightNull && isIndexToBiggerThanIndexFrom && graphsIsDefinedInList) {
        //let isNodeConnected = graphList[indexTo].isNodeConnected(graphList[indexFrom]);
        //if(!isNodeConnected) {
        try {
            graphList[indexFrom].addNextNode(graphList[indexTo], parseInt(weight));
            alert("success");
        }
        catch (error) {
            alert("graph not created or index of graph vertex from is smaller than to or vertex already connected or weight is incorrect.");
        }
    }
    //}
    else {
        alert("graph not created or index of graph vertex from is smaller than to or vertex already connected or weight is incorrect.");
    }
    graphToTerminal();
};
var deleteItems = function () {
    if (secNodeSelect !== null && firstNodeSelect !== null) {
        firstNodeSelect.innerHTML = "";
        secNodeSelect.innerHTML = "";
        nodeToDeleteSel.innerHTML = "";
    }
};
var addNodesToSelElement = function () {
    deleteItems();
    graphList.forEach(function (val, index) {
        var optionFirst = document.createElement("option");
        var optionSecond = document.createElement("option");
        var optionNodeToDel = document.createElement("option");
        optionFirst.text = String(index);
        optionSecond.text = String(index);
        optionNodeToDel.text = String(index);
        firstNodeSelect.add(optionFirst);
        secNodeSelect.add(optionSecond);
        nodeToDeleteSel.add(optionNodeToDel);
    });
};
//@ts-ignore
window['deleteNode'] = function () {
    var indexToDel = parseInt(nodeToDeleteSel.value);
    var nodeToDelete = graphList[indexToDel];
    graphList.forEach(function (item) {
        if (item.nextNodes.containKey(nodeToDelete)) {
            item.nextNodes.deleteKey(nodeToDelete);
        }
    });
    graphList.splice(indexToDel, 1);
    addNodesToSelElement();
    graphToTerminal();
};
var graphToTerminal = function () {
    terminal.clear();
    graphList.forEach(function (node, index) {
        var graphText = String(index) + " -> ";
        var keys = node.nextNodes.keys;
        var values = node.nextNodes.values;
        var nextNodesText = "";
        keys.forEach(function (nextNode, nextNodeIndex) {
            graphList.forEach(function (node1, index1) {
                if (nextNode === node1) {
                    var value = values[nextNodeIndex];
                    nextNodesText += (String(index1) + " (weight: ".concat(value, "), "));
                }
            });
        });
        nextNodesText = nextNodesText.slice(0, -2);
        graphText += nextNodesText;
        terminal.appendText(graphText);
    });
};
// @ts-ignore
window['dijkstraAlgorithm'] = function () {
    var currentNodeIndex = 0;
    var currentNode = graphList[currentNodeIndex];
    var minDistances = new ListDictionary_1.ListDictionary();
    var minDistance = 0;
    for (var i = currentNodeIndex; i < graphList.length; i++) {
        minDistances.add(graphList[i], Infinity);
    }
    minDistances.setValueFromKey(graphList[currentNodeIndex], minDistance);
    while (currentNode.nextNodes.keys.length != 0) {
        graphList.forEach(function (node, index) {
            currentNode.nextNodes.keys.forEach(function (nextNode) {
                if (node === nextNode) {
                    var value = minDistance + currentNode.nextNodes.getValueFromKey(node);
                    if (value < minDistances.values[index]) {
                        minDistances.setValueFromKey(nextNode, value);
                    }
                }
            });
        });
        currentNodeIndex++;
        currentNode = graphList[currentNodeIndex];
        minDistance = minDistances.values[currentNodeIndex];
    }
    searchMinWay(minDistances);
};
/*const searchMinWay = (minDistances: ListDictionary<GraphNode, number>) => {
    let currentIndex = graphList.length - 1;
    let bestWay: number[] = [];

    while(currentIndex != 0) {
        bestWay.unshift(currentIndex);

        let previousNodesIndexes: number[] = [];
        graphList.forEach((node, index) => { //searching nodes indexes that contains current node
            node.nextNodes.keys.forEach(nextNode => {
                if(graphList[currentIndex] === nextNode) {
                    previousNodesIndexes.push(index);
                }
            })
        })

        previousNodesIndexes.forEach(indexNum => {
            let isDistancesIsEqual = minDistances.getValueFromKey(graphList[currentIndex]) - graphList[indexNum].nextNodes.getValueFromKey(graphList[currentIndex]) === minDistances.getValueFromKey(graphList[indexNum]);
            if(isDistancesIsEqual) {
                bestWay.unshift(indexNum);
                currentIndex = indexNum;
            }
        })
        previousNodesIndexes = [];
    }
    let bestWayString: string = "";
    bestWay.forEach(nodeIndex => {
        bestWayString += `${nodeIndex} (weight:${minDistances.getValueFromKey(graphList[nodeIndex])}) -> `;
    })
    bestWayString = bestWayString.slice(0, -4);

    alert(String(minDistances.getValueFromKey(graphList[graphList.length - 1])) + `
${bestWayString}`);
}*/
var searchMinWay = function (minDistances) {
    var currentIndex = graphList.length - 1;
    var bestWay = [currentIndex];
    var _loop_1 = function () {
        var previousIndex = -1;
        var previousDistance = Infinity;
        graphList.forEach(function (node, index) {
            node.nextNodes.keys.forEach(function (nextNode) {
                if (graphList[currentIndex] === nextNode) {
                    var distanceToCurrent = minDistances.getValueFromKey(node) + node.nextNodes.getValueFromKey(nextNode);
                    if (distanceToCurrent < previousDistance) {
                        previousDistance = distanceToCurrent;
                        previousIndex = index;
                    }
                }
            });
        });
        if (previousIndex !== -1) {
            bestWay.unshift(previousIndex);
            currentIndex = previousIndex;
        }
        else {
            console.error("Error No valid path found.");
            return { value: void 0 };
        }
    };
    while (currentIndex !== 0) {
        var state_1 = _loop_1();
        if (typeof state_1 === "object")
            return state_1.value;
    }
    // Constructing the path string representation
    var bestWayString = bestWay.map(function (nodeIndex) { return "".concat(nodeIndex, " (weight:").concat(minDistances.getValueFromKey(graphList[nodeIndex]), ")"); }).join(" -> ");
    alert("Total Weight: ".concat(minDistances.getValueFromKey(graphList[graphList.length - 1]), "\nPath: ").concat(bestWayString));
};

})();

/******/ })()
;