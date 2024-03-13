import {Terminal} from "./Terminal.js";
import {GraphNode} from "./GraphNode";
import {ListDictionary} from "./ListDictionary";

let terminal: Terminal = new Terminal("terminal")
let graphList: GraphNode[] = [];
let secNodeSelect = document.getElementById("secondNodeSel") as HTMLSelectElement;
let firstNodeSelect = document.getElementById("firstNodeSel") as HTMLSelectElement;
let nodeToDeleteSel = document.getElementById("nodeToDelSel") as HTMLSelectElement;

// @ts-ignore
window['addGraph'] = () => {
    graphList.push(new GraphNode());
    addNodesToSelElement();
    graphToTerminal();
}

// @ts-ignore
window['joinNodes'] = () => { //needs to rework
    let indexFrom = firstNodeSelect.selectedIndex;
    let indexTo = secNodeSelect.selectedIndex;
    let weight = (document.getElementById("weightTxt") as HTMLInputElement).value;

    let isWeightNull = weight === null;
    let isIndexToBiggerThanIndexFrom = indexTo > indexFrom;
    let graphsIsDefinedInList = graphList[indexTo] !== undefined && graphList[indexFrom] !== undefined;

    if(!isWeightNull && isIndexToBiggerThanIndexFrom && graphsIsDefinedInList) {
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
}
const deleteItems = () => {
    if(secNodeSelect !== null && firstNodeSelect !== null) {
        firstNodeSelect.innerHTML = "";
        secNodeSelect.innerHTML = "";
        nodeToDeleteSel.innerHTML = "";
    }
}
const addNodesToSelElement = () => {
    deleteItems();
    graphList.forEach((val, index) => {
        let optionFirst = document.createElement("option");
        let optionSecond = document.createElement("option");
        let optionNodeToDel = document.createElement("option");

        optionFirst.text = String(index);
        optionSecond.text = String(index);
        optionNodeToDel.text = String(index);

        firstNodeSelect.add(optionFirst);
        secNodeSelect.add(optionSecond);
        nodeToDeleteSel.add(optionNodeToDel);
    })
}
//@ts-ignore
window['deleteNode'] = () => {
    let indexToDel = parseInt(nodeToDeleteSel.value);
    let nodeToDelete = graphList[indexToDel];

    graphList.forEach((item) => {
        if(item.nextNodes.containKey(nodeToDelete)) {
            item.nextNodes.deleteKey(nodeToDelete);
        }
    });
    graphList.splice(indexToDel, 1);
    addNodesToSelElement();
    graphToTerminal();
}

const graphToTerminal = () => {
    terminal.clear();
    graphList.forEach((node, index) => {
        let graphText = String(index) + " -> ";
        let keys = node.nextNodes.keys;
        let values = node.nextNodes.values;

        let nextNodesText = "";
        keys.forEach((nextNode, nextNodeIndex) => {
            graphList.forEach((node1, index1) => {
                if(nextNode === node1) {
                    let value = values[nextNodeIndex];
                    nextNodesText += (String(index1) + ` (weight: ${value}), `);
                }
            })
        })
        nextNodesText = nextNodesText.slice(0, -2);
        graphText+=nextNodesText;
        terminal.appendText(graphText);
    })
}
// @ts-ignore
window['dijkstraAlgorithm'] = () => {

    let currentNodeIndex = 0;
    let currentNode = graphList[currentNodeIndex];
    let minDistances = new ListDictionary<GraphNode, number>();
    let minDistance = 0;

    for (let i = currentNodeIndex; i < graphList.length; i++) {
        minDistances.add(graphList[i], Infinity);
    }
    minDistances.setValueFromKey(graphList[currentNodeIndex], minDistance);

    while(currentNode.nextNodes.keys.length != 0) {

        graphList.forEach((node, index) => {
            currentNode.nextNodes.keys.forEach((nextNode) => {
                if(node === nextNode) {
                    let value = minDistance + currentNode.nextNodes.getValueFromKey(node);
                    if(value < minDistances.values[index]) {
                        minDistances.setValueFromKey(nextNode, value)
                    }
                }
            })
        })

        currentNodeIndex++;
        currentNode = graphList[currentNodeIndex];
        minDistance = minDistances.values[currentNodeIndex];
    }
    alert(String(minDistances.getValueFromKey(graphList[graphList.length - 1])));
}



