"use client";

import type { MutableRefObject } from "react";
import ForceGraph2D, {
  type ForceGraphMethods,
  type ForceGraphProps,
  type LinkObject,
  type NodeObject,
} from "react-force-graph-2d";

import type { KnowledgeGraphLink, KnowledgeGraphNode } from "@/data/knowledgeGraph";

export type KnowledgeGraphNodeObject = NodeObject<KnowledgeGraphNode>;
export type KnowledgeGraphLinkObject = LinkObject<KnowledgeGraphNode, KnowledgeGraphLink>;

export type KnowledgeGraphCanvasProps = ForceGraphProps<
  KnowledgeGraphNodeObject,
  KnowledgeGraphLinkObject
>;

export type KnowledgeGraphCanvasRef = ForceGraphMethods<
  KnowledgeGraphNodeObject,
  KnowledgeGraphLinkObject
>;

type KnowledgeGraphNetworkCanvasProps = KnowledgeGraphCanvasProps & {
  graphRef: MutableRefObject<KnowledgeGraphCanvasRef | undefined>;
};

export default function KnowledgeGraphNetworkCanvas({ graphRef, ...props }: KnowledgeGraphNetworkCanvasProps) {
  return <ForceGraph2D {...props} ref={graphRef} />;
}
