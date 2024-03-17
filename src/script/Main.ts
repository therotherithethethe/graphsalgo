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
    searchMinWay(minDistances);
}
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

const searchMinWay = (minDistances: ListDictionary<GraphNode, number>) => {
    let currentIndex = graphList.length - 1;
    let bestWay = [currentIndex];


    while (currentIndex !== 0) {
        let previousIndex = -1;
        let previousDistance = Infinity;


        graphList.forEach((node, index) => {
            node.nextNodes.keys.forEach(nextNode => {
                if (graphList[currentIndex] === nextNode) {
                    let distanceToCurrent = minDistances.getValueFromKey(node) + node.nextNodes.getValueFromKey(nextNode);
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
        } else {
            console.error("Error No valid path found.");
            return;
        }
    }

    // Constructing the path string representation
    let bestWayString = bestWay.map(nodeIndex => `${nodeIndex} (weight:${minDistances.getValueFromKey(graphList[nodeIndex])})`).join(" -> ");

    alert(`Total Weight: ${minDistances.getValueFromKey(graphList[graphList.length - 1])}
Path: ${bestWayString}`);
}


