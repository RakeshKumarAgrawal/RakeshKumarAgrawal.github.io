"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useMemo, useRef, useState } from "react";
import { Minus, Plus, ScanSearch, ZoomIn, ZoomOut } from "lucide-react";

import Card from "@/components/ui/Card";
import {
  knowledgeGraphCategories,
  knowledgeGraphData,
  knowledgeGraphNodesById,
  type KnowledgeGraphCategory,
  type KnowledgeGraphNode,
} from "@/data/knowledgeGraph";
import { cn } from "@/lib/cn";
import type {
  KnowledgeGraphCanvasRef,
  KnowledgeGraphNodeObject,
} from "./KnowledgeGraphNetworkCanvas";

const KnowledgeGraphNetworkCanvas = dynamic(() => import("./KnowledgeGraphNetworkCanvas"), {
  ssr: false,
}) as typeof import("./KnowledgeGraphNetworkCanvas").default;

const categoryColorMap: Record<KnowledgeGraphCategory, string> = {
  "Ecosystem Hub": "#38bdf8",
  "Research Domains": "#60a5fa",
  Frameworks: "#818cf8",
  Projects: "#34d399",
  Publications: "#f59e0b",
  Datasets: "#22d3ee",
  "GitHub Repositories": "#10b981",
  "Enterprise Intelligence Lab": "#f97316",
  "Open Science Profiles": "#a78bfa",
  "Professional Service": "#fb7185",
};

const isInternalHref = (href: string) => href.startsWith("/");

const isKnowledgeNode = (node: unknown): node is KnowledgeGraphNode => {
  if (!node || typeof node !== "object") {
    return false;
  }

  return "id" in node && "label" in node;
};

const uniqueByLabel = (nodes: KnowledgeGraphNode[]) => {
  const seen = new Set<string>();
  return nodes.filter((node) => {
    if (seen.has(node.label)) {
      return false;
    }

    seen.add(node.label);
    return true;
  });
};

export default function KnowledgeGraphExplorer() {
  const graphRef = useRef<KnowledgeGraphCanvasRef | undefined>(undefined);
  const [selectedNodeId, setSelectedNodeId] = useState<string>("ecosystem-root");
  const [focusMode, setFocusMode] = useState(false);
  const [enabledCategories, setEnabledCategories] = useState<Set<KnowledgeGraphCategory>>(
    new Set(knowledgeGraphCategories),
  );
  const [expandedNodeIds, setExpandedNodeIds] = useState<Set<string>>(new Set(["ecosystem-root"]));

  const linksByNodeId = useMemo(() => {
    const map = new Map<string, Set<string>>();

    knowledgeGraphData.links.forEach((link) => {
      if (!map.has(link.source)) {
        map.set(link.source, new Set());
      }

      if (!map.has(link.target)) {
        map.set(link.target, new Set());
      }

      map.get(link.source)?.add(link.target);
      map.get(link.target)?.add(link.source);
    });

    return map;
  }, []);

  const visibleNodeIds = useMemo(() => {
    const categoryFiltered = new Set<string>();

    knowledgeGraphData.nodes.forEach((node) => {
      if (node.category === "Ecosystem Hub" || enabledCategories.has(node.category)) {
        categoryFiltered.add(node.id);
      }
    });

    if (!focusMode) {
      return categoryFiltered;
    }

    const focusSet = new Set<string>(["ecosystem-root"]);

    if (selectedNodeId) {
      focusSet.add(selectedNodeId);
    }

    expandedNodeIds.forEach((id) => {
      focusSet.add(id);
      linksByNodeId.get(id)?.forEach((neighborId) => {
        focusSet.add(neighborId);
      });
    });

    return new Set([...focusSet].filter((id) => categoryFiltered.has(id)));
  }, [enabledCategories, expandedNodeIds, focusMode, linksByNodeId, selectedNodeId]);

  const visibleGraph = useMemo(() => {
    const nodes = knowledgeGraphData.nodes.filter((node) => visibleNodeIds.has(node.id));
    const links = knowledgeGraphData.links.filter(
      (link) => visibleNodeIds.has(link.source) && visibleNodeIds.has(link.target),
    );

    return {
      nodes,
      links,
    };
  }, [visibleNodeIds]);

  const selectedNode = selectedNodeId ? knowledgeGraphNodesById.get(selectedNodeId) : undefined;

  const getRelatedNodes = (category: KnowledgeGraphCategory) => {
    if (!selectedNode) {
      return [] as KnowledgeGraphNode[];
    }

    const neighbors = linksByNodeId.get(selectedNode.id);

    if (!neighbors) {
      return [] as KnowledgeGraphNode[];
    }

    const related = [...neighbors]
      .map((nodeId) => knowledgeGraphNodesById.get(nodeId))
      .filter((node): node is KnowledgeGraphNode => node !== undefined && node.category === category);

    return uniqueByLabel(related).sort((a, b) => a.label.localeCompare(b.label));
  };

  const selectedRelated = {
    publications: getRelatedNodes("Publications"),
    projects: getRelatedNodes("Projects"),
    repositories: getRelatedNodes("GitHub Repositories"),
    datasets: getRelatedNodes("Datasets"),
    frameworks: getRelatedNodes("Frameworks"),
  };

  const toggleCategory = (category: KnowledgeGraphCategory) => {
    setEnabledCategories((current) => {
      const next = new Set(current);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  };

  const expandSelection = () => {
    if (!selectedNodeId) {
      return;
    }

    const neighborhood = linksByNodeId.get(selectedNodeId);

    setExpandedNodeIds((current) => {
      const next = new Set(current);
      next.add(selectedNodeId);
      neighborhood?.forEach((id) => next.add(id));
      return next;
    });

    setFocusMode(true);
  };

  const collapseSelection = () => {
    if (!selectedNodeId || selectedNodeId === "ecosystem-root") {
      return;
    }

    setExpandedNodeIds((current) => {
      const next = new Set(current);
      next.delete(selectedNodeId);
      return next;
    });
  };

  const focusSelectionOnly = () => {
    if (!selectedNodeId) {
      return;
    }

    setExpandedNodeIds(new Set(["ecosystem-root", selectedNodeId]));
    setFocusMode(true);
  };

  const showAll = () => {
    setFocusMode(false);
  };

  const zoomIn = () => {
    const graph = graphRef.current;
    if (!graph) {
      return;
    }

    graph.zoom(graph.zoom() * 1.25, 280);
  };

  const zoomOut = () => {
    const graph = graphRef.current;
    if (!graph) {
      return;
    }

    graph.zoom(graph.zoom() / 1.25, 280);
  };

  return (
    <div className="grid gap-5 xl:grid-cols-[minmax(0,1.4fr)_minmax(320px,0.9fr)]">
      <Card className="space-y-5 p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="font-display text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
              Ecosystem Network Canvas
            </h3>
            <p className="mt-1 text-xs leading-6 text-muted sm:text-sm">
              Drag to pan. Scroll to zoom. Click a node to inspect, then expand or collapse context.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={zoomOut}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/80 bg-white/5 text-muted transition hover:border-primary/40 hover:bg-white/10 hover:text-foreground"
              aria-label="Zoom out"
            >
              <ZoomOut className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={zoomIn}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/80 bg-white/5 text-muted transition hover:border-primary/40 hover:bg-white/10 hover:text-foreground"
              aria-label="Zoom in"
            >
              <ZoomIn className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={focusSelectionOnly}
              disabled={!selectedNode}
              className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-white/5 px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-foreground transition hover:border-primary/40 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-45"
            >
              <ScanSearch className="h-3.5 w-3.5" aria-hidden="true" />
              Focus
            </button>
            <button
              type="button"
              onClick={expandSelection}
              disabled={!selectedNode}
              className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-white/5 px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-foreground transition hover:border-primary/40 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-45"
            >
              <Plus className="h-3.5 w-3.5" aria-hidden="true" />
              Expand
            </button>
            <button
              type="button"
              onClick={collapseSelection}
              disabled={!selectedNode || selectedNode.id === "ecosystem-root"}
              className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-white/5 px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-foreground transition hover:border-primary/40 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-45"
            >
              <Minus className="h-3.5 w-3.5" aria-hidden="true" />
              Collapse
            </button>
            <button
              type="button"
              onClick={showAll}
              className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-white/5 px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-foreground transition hover:border-primary/40 hover:bg-white/10"
            >
              Show Full Graph
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {knowledgeGraphCategories.map((category) => {
            const enabled = enabledCategories.has(category);

            return (
              <button
                key={category}
                type="button"
                onClick={() => toggleCategory(category)}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.14em] transition",
                  enabled
                    ? "border-primary/45 bg-primary/15 text-foreground"
                    : "border-border/80 bg-white/5 text-muted hover:border-primary/30 hover:text-foreground",
                )}
                aria-pressed={enabled}
              >
                {category}
              </button>
            );
          })}
        </div>

        <div className="h-[62vh] min-h-[460px] overflow-hidden rounded-2xl border border-border/70 bg-surface/55">
          <KnowledgeGraphNetworkCanvas
            graphRef={graphRef}
            graphData={visibleGraph}
            width={1200}
            height={760}
            linkColor={() => "rgba(148, 163, 184, 0.34)"}
            linkWidth={1.2}
            cooldownTicks={120}
            nodeRelSize={7}
            nodeLabel={(node: KnowledgeGraphNodeObject) => {
              if (!isKnowledgeNode(node)) {
                return "";
              }

              return `${node.label} (${node.category})`;
            }}
            nodeCanvasObject={(node: KnowledgeGraphNodeObject, ctx, globalScale) => {
              if (!isKnowledgeNode(node)) {
                return;
              }

              const label = node.label;
              const fontSize = Math.max(9, 12 / globalScale);
              ctx.font = `${fontSize}px Inter`;
              const textWidth = ctx.measureText(label).width;
              const badgePadding = fontSize * 0.45;
              const badgeHeight = fontSize + badgePadding;

              const color = categoryColorMap[node.category] ?? "#38bdf8";
              const selected = node.id === selectedNodeId;

              ctx.beginPath();
              ctx.arc(node.x ?? 0, node.y ?? 0, selected ? 7 : 5.5, 0, 2 * Math.PI, false);
              ctx.fillStyle = color;
              ctx.fill();

              if (selected) {
                ctx.beginPath();
                ctx.arc(node.x ?? 0, node.y ?? 0, 10, 0, 2 * Math.PI, false);
                ctx.strokeStyle = "rgba(248, 250, 252, 0.9)";
                ctx.lineWidth = 1.5;
                ctx.stroke();
              }

              ctx.fillStyle = "rgba(2, 6, 23, 0.74)";
              ctx.fillRect(
                (node.x ?? 0) + 8,
                (node.y ?? 0) - badgeHeight / 2,
                textWidth + badgePadding,
                badgeHeight,
              );

              ctx.fillStyle = "#f8fafc";
              ctx.textAlign = "left";
              ctx.textBaseline = "middle";
              ctx.fillText(label, (node.x ?? 0) + 8 + badgePadding / 2, node.y ?? 0);
            }}
            onNodeClick={(node: KnowledgeGraphNodeObject) => {
              if (!isKnowledgeNode(node)) {
                return;
              }

              if (typeof node.id === "string") {
                setSelectedNodeId(node.id);
              }

              if (graphRef.current) {
                graphRef.current.centerAt(node.x ?? 0, node.y ?? 0, 550);
                graphRef.current.zoom(1.7, 550);
              }
            }}
          />
        </div>

        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-border/70 bg-surface/50 px-3 py-2">
            <p className="text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-muted">Visible Nodes</p>
            <p className="mt-1 text-lg font-semibold text-foreground">{visibleGraph.nodes.length}</p>
          </div>
          <div className="rounded-2xl border border-border/70 bg-surface/50 px-3 py-2">
            <p className="text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-muted">Visible Links</p>
            <p className="mt-1 text-lg font-semibold text-foreground">{visibleGraph.links.length}</p>
          </div>
          <div className="rounded-2xl border border-border/70 bg-surface/50 px-3 py-2">
            <p className="text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-muted">Focus Mode</p>
            <p className="mt-1 text-lg font-semibold text-foreground">{focusMode ? "On" : "Off"}</p>
          </div>
          <div className="rounded-2xl border border-border/70 bg-surface/50 px-3 py-2">
            <p className="text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-muted">Expanded Nodes</p>
            <p className="mt-1 text-lg font-semibold text-foreground">{expandedNodeIds.size}</p>
          </div>
        </div>
      </Card>

      <Card className="space-y-5 p-5 sm:p-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">Node Intelligence</p>
          <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-foreground">
            {selectedNode?.label ?? "Select a node"}
          </h3>
          <p className="mt-2 text-sm leading-7 text-muted">{selectedNode?.description ?? "Click any node on the graph to inspect relationships and future direction."}</p>
          {selectedNode?.href ? (
            isInternalHref(selectedNode.href) ? (
              <Link
                href={selectedNode.href}
                className="mt-3 inline-flex rounded-full border border-border/80 bg-white/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-foreground transition hover:border-primary/40 hover:bg-white/10"
              >
                Open Source Node
              </Link>
            ) : (
              <a
                href={selectedNode.href}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex rounded-full border border-border/80 bg-white/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-foreground transition hover:border-primary/40 hover:bg-white/10"
              >
                Open Source Node
              </a>
            )
          ) : null}
        </div>

        <div className="space-y-4">
          <RelationshipSection title="Related Publications" items={selectedRelated.publications} />
          <RelationshipSection title="Related Projects" items={selectedRelated.projects} />
          <RelationshipSection title="Repositories" items={selectedRelated.repositories} />
          <RelationshipSection title="Datasets" items={selectedRelated.datasets} />
          <RelationshipSection title="Frameworks" items={selectedRelated.frameworks} />
          <FutureWorkSection items={selectedNode?.futureWork ?? []} />
        </div>
      </Card>
    </div>
  );
}

type RelationshipSectionProps = {
  title: string;
  items: KnowledgeGraphNode[];
};

function RelationshipSection({ title, items }: RelationshipSectionProps) {
  return (
    <div className="rounded-2xl border border-border/70 bg-surface/45 px-4 py-3">
      <h4 className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-muted">{title}</h4>
      {items.length ? (
        <ul className="mt-2 space-y-1.5">
          {items.slice(0, 7).map((item) => (
            <li key={item.id} className="text-sm leading-6 text-foreground">
              {item.href ? (
                isInternalHref(item.href) ? (
                  <Link href={item.href} className="underline decoration-border/70 underline-offset-4 hover:decoration-primary">
                    {item.label}
                  </Link>
                ) : (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="underline decoration-border/70 underline-offset-4 hover:decoration-primary"
                  >
                    {item.label}
                  </a>
                )
              ) : (
                item.label
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-2 text-sm text-muted">No linked items currently in this view.</p>
      )}
    </div>
  );
}

type FutureWorkSectionProps = {
  items: string[];
};

function FutureWorkSection({ items }: FutureWorkSectionProps) {
  return (
    <div className="rounded-2xl border border-border/70 bg-surface/45 px-4 py-3">
      <h4 className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-muted">Future Work</h4>
      {items.length ? (
        <ul className="mt-2 space-y-1.5">
          {items.slice(0, 6).map((item) => (
            <li key={item} className="text-sm leading-6 text-foreground">
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-2 text-sm text-muted">No future work defined for this node yet.</p>
      )}
    </div>
  );
}
