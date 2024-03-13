import {ListDictionary} from "./ListDictionary";

export class GraphNode {
    public nextNodes: ListDictionary<GraphNode, number> = new ListDictionary<GraphNode, number>();
    constructor() {
    }
    public addNextNode(graphNode: GraphNode, weight: number): void {
        this.nextNodes.add(graphNode, weight)
    }
    public isNodeConnected(graphNode: GraphNode): boolean {
        return this.nextNodes.containKey(graphNode);
    }
}