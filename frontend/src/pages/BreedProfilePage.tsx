import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API_URL, JSON_HEADERS } from "../config";
import { type Allele, type Stat, type Breed } from "../types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

export function BreedProfilePage() {

  const { breedId } = useParams();

  const [breed, setBreed] = useState<Breed | null>(null);
  const BREED_URL = `${API_URL}/breeds/${breedId}`;

  const [editingAllele, setEditingAllele] = useState<Allele | null>(null);
  const [editingStat, setEditingStat] = useState<Stat | null>(null);

  const [expandedAttr, setExpandedAttr] = useState<Set<number>>(new Set());
  const [expandedGenes, setExpandedGenes] = useState<Set<number>>(new Set());

  function toggleAttr(id: number) {
    const updated = new Set(expandedAttr);
    if(updated.has(id)) { updated.delete(id); } else { updated.add(id); }
    setExpandedAttr(updated);
  }

  function toggleGene(id: number) {
    const updated = new Set(expandedGenes);
    if(updated.has(id)) { updated.delete(id); } else { updated.add(id); }
    setExpandedGenes(updated);
  }

  function addAlleleOverride(alleleId: number, probability: number) {
    setBreed({
      ...breed!,
      genes: breed!.genes.map(gene => ({
        ...gene,
        loci: gene.loci.map(locus => ({
          ...locus,
          alleles: locus.alleles.map(allele =>
            allele.id === alleleId ? { ...allele, probability } : allele
          )
        }))
      }))
    })
  }

  function addStatRange() {
    setBreed({
      ...breed!,
      stats: breed!.stats.map(s =>
        s.id === editingStat!.id ? editingStat! : s
      )
    })
  }

  function saveAllele() {
    fetch(`${BREED_URL}/overrides`, {
      method: "PUT",
      headers: JSON_HEADERS,
      body: JSON.stringify({ alleleId: editingAllele?.id, probability: editingAllele!.probability })
    })
    .then(res => { if(!res.ok) return; return res.json(); })
    .then(() => { addAlleleOverride(editingAllele!.id, editingAllele!.probability); setEditingAllele(null); })
  }

  function saveStat() {
    fetch(`${BREED_URL}/statRanges`, {
      method: "PUT",
      headers: JSON_HEADERS,
      body: JSON.stringify({ stat: editingStat?.name, breedId: breed?.id, min: editingStat?.min, max: editingStat?.max })
    })
    .then(res => { if(!res.ok) return; return res.json(); })
    .then(() => { addStatRange(); setEditingStat(null); })
  }

  useEffect(() => {
    fetch(`${API_URL}/breeds/${breedId}`)
      .then(res => { if(!res.ok) return; return res.json(); })
      .then(data => setBreed(data))
  }, []);

  if(!breed) return <div className="container mx-auto p-6">Loading...</div>

  return (
    <div className="container mx-auto p-6">

      <div className="flex items-center gap-3 mb-6">
        <h1 className="text-2xl font-bold">{breed.name}</h1>
        <Badge variant={breed.active ? "default" : "secondary"}>
          {breed.active ? "Active" : "Not Active"}
        </Badge>
      </div>

      {/* Attributes */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Attributes</h2>
        <div className="rounded-md border divide-y">
          {breed.attributes.map(attr => (
            <div key={attr.id} className="p-3">
              <div className="flex items-center gap-3">
                <span
                  className={`font-medium w-40 ${attr.type !== "String" && attr.type !== "Boolean" ? "cursor-pointer hover:underline" : ""}`}
                  onClick={() => attr.type !== "String" && attr.type !== "Boolean" && toggleAttr(attr.id)}
                >
                  {attr.name}
                  {attr.type !== "String" && attr.type !== "Boolean" && (
                    <span className="ml-1 text-xs text-muted-foreground">{expandedAttr.has(attr.id) ? "▲" : "▼"}</span>
                  )}
                </span>

                <Badge variant="outline">{attr.type}</Badge>
                <Badge variant={attr.mutable ? "default" : "secondary"}>
                  {attr.mutable ? "Mutable" : "Non-Mutable"}
                </Badge>
                <Badge variant={attr.optional ? "default" : "secondary"}>
                  {attr.optional ? "Optional" : "Required"}
                </Badge>
              </div>
              {attr.type !== "String" && attr.type !== "Boolean" && expandedAttr.has(attr.id) && (
                <div className="mt-2 ml-4 text-sm text-muted-foreground">
                  {attr.type === "Number" && (
                    <span>Range: {attr.min} – {attr.max}</span>
                  )}
                  {attr.type === "Enum" && (
                    <ol className="list-decimal list-inside">
                      {attr.options.map((opt, index) => (
                        <li key={index}>{opt}</li>
                      ))}
                    </ol>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Genes */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Genes</h2>
        {Object.entries(
          breed.genes.reduce((acc, g) => {
            const cat = g.category || "Uncategorized";
            if (!acc[cat]) acc[cat] = [];
            acc[cat].push(g);
            return acc;
          }, {} as Record<string, typeof breed.genes>)
        ).map(([category, categoryGenes]) => (
          <div key={category} className="mb-4">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-2">{category}</h3>
            <div className="rounded-md border divide-y">
              {categoryGenes.map(g => (
                <div key={g.id}>
                  <div
                    className="flex items-center justify-between p-3 cursor-pointer hover:bg-muted/50"
                    onClick={() => toggleGene(g.id)}
                  >
                    <span className="font-medium">{g.name}</span>
                    <span className="text-sm text-muted-foreground">{expandedGenes.has(g.id) ? "Hide" : "View"}</span>
                  </div>

                  {expandedGenes.has(g.id) && (
                    <div className="p-4 bg-muted/20 border-t space-y-4">
                      {g.loci.map(locus => (
                        <div key={locus.id}>
                          <p className="font-medium text-sm mb-2">Locus: {locus.name}</p>
                          <div className="space-y-2 ml-3">
                            {locus.alleles.map(allele => (
                              <div key={allele.id} className="text-sm">
                                {editingAllele?.id !== allele.id && (
                                  <div className="flex items-center gap-3">
                                    <span>{allele.name} [{allele.symbol}]</span>
                                    <Badge variant="outline" className="text-xs">{allele.dominance}</Badge>
                                    <span className="text-muted-foreground">p={allele.probability}</span>
                                    <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); setEditingAllele(allele); }}>
                                      Edit
                                    </Button>
                                  </div>
                                )}
                                {editingAllele?.id === allele.id && (
                                  <div className="flex items-center gap-2">
                                    <span>{allele.name} [{allele.symbol}]</span>
                                    <Badge variant="outline" className="text-xs">{allele.dominance}</Badge>
                                    <Label className="text-xs">Probability</Label>
                                    <Input
                                      className="w-24 h-7 text-sm"
                                      value={editingAllele.probability}
                                      type="number" min="0" max="1" step="0.01"
                                      onChange={(e) => setEditingAllele({ ...editingAllele, probability: Number(e.target.value) })}
                                    />
                                    <Button size="sm" onClick={() => saveAllele()}>Save</Button>
                                    <Button size="sm" variant="outline" onClick={() => setEditingAllele(null)}>Cancel</Button>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}

                      {g.expressionRules.length > 0 && (
                        <div>
                          <p className="font-medium text-sm mb-2">Expression Rules</p>
                          <div className="space-y-1 ml-3">
                            {g.expressionRules.map(rule => (
                              <div key={rule.id} className="text-sm text-muted-foreground">
                                {rule.minDominantAlleles} dominant → {rule.expression}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Stats */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Stats</h2>
        <div className="rounded-md border divide-y">
          {breed.stats.map(stat => (
            <div key={stat.id} className="p-3">
              {editingStat?.id !== stat.id && (
                <div className="flex items-center gap-4">
                  <span className="font-medium w-40">{stat.name}</span>
                  <span className="text-sm text-muted-foreground">Min: {stat.min}</span>
                  <span className="text-sm text-muted-foreground">Max: {stat.max}</span>
                  <Button variant="outline" size="sm" onClick={(e) => { e.stopPropagation(); setEditingStat(stat); }}>Edit</Button>
                </div>
              )}
              {editingStat?.id === stat.id && (
                <div className="flex items-center gap-3">
                  <span className="font-medium w-40">{stat.name}</span>
                  <Label className="text-sm">Min</Label>
                  <Input className="w-24 h-8" value={editingStat.min} type="number" onChange={(e) => setEditingStat({ ...editingStat!, min: Number(e.target.value) })} />
                  <Label className="text-sm">Max</Label>
                  <Input className="w-24 h-8" value={editingStat.max} type="number" min="0" onChange={(e) => setEditingStat({ ...editingStat!, max: Number(e.target.value) })} />
                  <Button size="sm" onClick={() => saveStat()}>Save</Button>
                  <Button size="sm" variant="outline" onClick={() => setEditingStat(null)}>Cancel</Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}
