"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Terminal_js_1 = require("./Terminal.js");
var GraphNode_1 = require("./GraphNode");
var ListDictionary_1 = require("./ListDictionary");
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
    alert(String(minDistances.getValueFromKey(graphList[graphList.length - 1])));
};
