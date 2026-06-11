import { useGeneSection } from "../hooks/useGeneSection";
import { type Gene } from "../types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

interface GeneSectionProps {
  speciesId: number,
  genes: Gene[],
  onGeneAdded: (gene: Gene) => void,
  onGeneDeleted: (geneId: number) => void,
  onGeneUpdated: (gene: Gene) => void
}

export function GeneSection({ speciesId, genes, onGeneAdded, onGeneDeleted, onGeneUpdated }: GeneSectionProps) {

  const {
    expandedGenes,
    editingGene, setEditingGene,
    editingLocus, setEditingLocus,
    editingRule, setEditingRule,
    newGeneName, setNewGeneName,
    newGeneCategory, setNewGeneCategory,
    newGeneLoci, setNewGeneLoci,
    newGeneExpressionRules, setNewGeneExpressionRules,
    newAllele, setNewAllele,
    newExpressionRule, setNewExpressionRule,
    addingAlleleToLocus, setAddingAlleleToLocus,
    addingRuleToGene, setAddingRuleToGene,
    showAddForm, setShowAddForm,
    DEFAULT_ALLELE, DEFAULT_RULE,
    toggleGene, resetForm,
    addGene, saveGene, saveLocus, saveRule,
    addAllele, addRule,
    deleteGene, deleteLocus, deleteRule, deleteAllele
  } = useGeneSection(speciesId, genes, onGeneAdded, onGeneDeleted, onGeneUpdated);

  return (
    <div>
      {!showAddForm && (
        <div className="mb-3">
          <Button size="sm" onClick={() => setShowAddForm(true)}>Add Gene</Button>
        </div>
      )}

      {showAddForm && (
        <Card className="mb-4 max-w-2xl">
          <CardHeader><CardTitle className="text-base">New Gene</CardTitle></CardHeader>
          <CardContent className="flex flex-col gap-4">

            <div className="flex gap-4">
              <div className="flex flex-col gap-1 flex-1">
                <Label>Name</Label>
                <Input placeholder="Gene name" value={newGeneName} onChange={(e) => setNewGeneName(e.target.value)} />
              </div>
              <div className="flex flex-col gap-1 flex-1">
                <Label>Category</Label>
                <Input placeholder="Category" value={newGeneCategory} onChange={(e) => setNewGeneCategory(e.target.value)} />
              </div>
            </div>

            {newGeneLoci.map((locus, index) => (
              <div key={index} className="rounded-md border p-3 flex flex-col gap-3">
                <p className="text-sm font-medium">Locus {index + 1}</p>
                <div className="flex flex-col gap-1">
                  <Label className="text-xs">Locus Name</Label>
                  <Input className="h-8" placeholder="Locus name" value={locus.name} onChange={(e) => {
                    const updated = [...newGeneLoci];
                    updated[index].name = e.target.value;
                    setNewGeneLoci(updated);
                  }} />
                </div>

                {locus.alleles.map((allele, alleleIndex) => (
                  <div key={alleleIndex} className="ml-3 rounded-md border p-2 flex flex-col gap-2">
                    <p className="text-xs font-medium text-muted-foreground">Allele {alleleIndex + 1}</p>
                    <div className="flex gap-2 flex-wrap">
                      <div className="flex flex-col gap-1">
                        <Label className="text-xs">Name</Label>
                        <Input className="h-7 w-28 text-sm" placeholder="Name" value={allele.name} onChange={(e) => {
                          const updated = [...newGeneLoci];
                          updated[index].alleles[alleleIndex].name = e.target.value;
                          setNewGeneLoci(updated);
                        }} />
                      </div>
                      <div className="flex flex-col gap-1">
                        <Label className="text-xs">Symbol</Label>
                        <Input className="h-7 w-20 text-sm" placeholder="Symbol" value={allele.symbol} onChange={(e) => {
                          const updated = [...newGeneLoci];
                          updated[index].alleles[alleleIndex].symbol = e.target.value;
                          setNewGeneLoci(updated);
                        }} />
                      </div>
                      <div className="flex flex-col gap-1">
                        <Label className="text-xs">Dominance</Label>
                        <Input className="h-7 w-28 text-sm" placeholder="Dominance" value={allele.dominance} onChange={(e) => {
                          const updated = [...newGeneLoci];
                          updated[index].alleles[alleleIndex].dominance = e.target.value;
                          setNewGeneLoci(updated);
                        }} />
                      </div>
                      <div className="flex flex-col gap-1">
                        <Label className="text-xs">Probability</Label>
                        <Input className="h-7 w-24 text-sm" placeholder="0.5" value={allele.probability} type="number" min="0" max="1" step="0.01" onChange={(e) => {
                          const updated = [...newGeneLoci];
                          updated[index].alleles[alleleIndex].probability = e.target.value;
                          setNewGeneLoci(updated);
                        }} />
                      </div>
                    </div>
                  </div>
                ))}

                <Button type="button" size="sm" variant="outline" onClick={() => {
                  const updated = [...newGeneLoci];
                  updated[index].alleles.push(DEFAULT_ALLELE);
                  setNewGeneLoci(updated);
                }}>
                  Add Allele
                </Button>
              </div>
            ))}

            {newGeneExpressionRules.map((rule, index) => (
              <div key={index} className="rounded-md border p-3 flex flex-col gap-2">
                <p className="text-sm font-medium">Expression Rule {index + 1}</p>
                <div className="flex gap-4">
                  <div className="flex flex-col gap-1">
                    <Label className="text-xs">Min Dominant Alleles</Label>
                    <Input className="h-8 w-24" placeholder="0" value={rule.minDominantAlleles} type="number" min="0" onChange={(e) => {
                      const updated = [...newGeneExpressionRules];
                      updated[index].minDominantAlleles = e.target.value;
                      setNewGeneExpressionRules(updated);
                    }} />
                  </div>
                  <div className="flex flex-col gap-1 flex-1">
                    <Label className="text-xs">Expression</Label>
                    <Input className="h-8" placeholder="Expression" value={rule.expression} onChange={(e) => {
                      const updated = [...newGeneExpressionRules];
                      updated[index].expression = e.target.value;
                      setNewGeneExpressionRules(updated);
                    }} />
                  </div>
                </div>
              </div>
            ))}

            <div className="flex gap-2">
              <Button type="button" size="sm" variant="outline" onClick={() => {
                setNewGeneExpressionRules([...newGeneExpressionRules, DEFAULT_RULE]);
              }}>
                Add Expression Rule
              </Button>
            </div>

            <div className="flex gap-2">
              <Button type="button" size="sm" onClick={addGene}>Save</Button>
              <Button type="button" size="sm" variant="outline" onClick={resetForm}>Cancel</Button>
            </div>

          </CardContent>
        </Card>
      )}

      {Object.entries(
        genes.reduce((acc, g) => {
          const cat = g.category || "Uncategorized";
          if (!acc[cat]) acc[cat] = [];
          acc[cat].push(g);
          return acc;
        }, {} as Record<string, typeof genes>)
      ).map(([category, categoryGenes]) => (
        <div key={category} className="mb-4">
          <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-2">{category}</h4>
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
                  <div className="p-4 bg-muted/20 border-t space-y-4 max-w-2x1">

                    <div className="flex gap-2">
                      <Button type="button" size="sm" variant="destructive" onClick={(e) => { e.stopPropagation(); deleteGene(g.id); }}>Delete Gene</Button>
                      <Button type="button" size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); setEditingGene(g); }}>Edit Gene</Button>
                      <Button type="button" size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); setAddingRuleToGene(g.id); }}>Add Rule</Button>
                    </div>

                    <div className="space-y-3">
                      <p className="text-sm font-semibold">Loci</p>
                      {g.loci.map(locus => (
                        <div key={locus.id} className="rounded-md border p-3 space-y-2">

                          {editingLocus?.id !== locus.id && (
                            <div>
                              <div className="flex items-center gap-3 mb-2">
                                <span className="font-medium text-sm">{locus.name}</span>
                                <div className="flex gap-2">
                                  <Button type="button" size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); setAddingAlleleToLocus(locus.id); }}>Add Allele</Button>
                                  <Button type="button" size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); setEditingLocus(locus); }}>Edit</Button>
                                  <Button type="button" size="sm" variant="destructive" onClick={(e) => { e.stopPropagation(); deleteLocus(locus.id, locus.geneId); }}>Delete</Button>
                                </div>
                              </div>
                              <div className="space-y-1">
                                {locus.alleles.map(allele => (
                                  <div key={allele.id} className="flex items-center gap-3 text-sm">
                                    <span>{allele.name} [{allele.symbol}]</span>
                                    <Badge variant="outline" className="text-xs">{allele.dominance}</Badge>
                                    <span className="text-muted-foreground">p={allele.probability}</span>
                                    <Button type="button" size="sm" variant="ghost" className="h-6 text-destructive hover:text-destructive" onClick={(e) => { e.stopPropagation(); deleteAllele(allele.id, locus.id, g.id); }}>Delete</Button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {editingLocus?.id === locus.id && (
                            <div className="flex flex-col gap-3">
                              <div className="flex flex-col gap-1">
                                <Label className="text-xs">Locus Name</Label>
                                <Input className="h-8 max-w-xs" value={editingLocus.name} onChange={(e) => setEditingLocus({ ...editingLocus, name: e.target.value })} />
                              </div>
                              {editingLocus.alleles.map((allele, index) => (
                                <div key={allele.id} className="ml-3 rounded-md border p-2 flex flex-col gap-2">
                                  <p className="text-xs font-medium text-muted-foreground">{allele.name}</p>
                                  <div className="flex gap-2 flex-wrap">
                                    <div className="flex flex-col gap-1">
                                      <Label className="text-xs">Name</Label>
                                      <Input className="h-7 w-28 text-sm" value={allele.name} onChange={(e) => {
                                        const updated = [...editingLocus.alleles];
                                        updated[index] = { ...updated[index], name: e.target.value };
                                        setEditingLocus({ ...editingLocus, alleles: updated });
                                      }} />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                      <Label className="text-xs">Symbol</Label>
                                      <Input className="h-7 w-20 text-sm" value={allele.symbol} onChange={(e) => {
                                        const updated = [...editingLocus.alleles];
                                        updated[index] = { ...updated[index], symbol: e.target.value };
                                        setEditingLocus({ ...editingLocus, alleles: updated });
                                      }} />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                      <Label className="text-xs">Dominance</Label>
                                      <Input className="h-7 w-28 text-sm" value={allele.dominance} onChange={(e) => {
                                        const updated = [...editingLocus.alleles];
                                        updated[index] = { ...updated[index], dominance: e.target.value };
                                        setEditingLocus({ ...editingLocus, alleles: updated });
                                      }} />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                      <Label className="text-xs">Probability</Label>
                                      <Input className="h-7 w-24 text-sm" value={allele.probability} type="number" min="0" max="1" step="0.01" onChange={(e) => {
                                        const updated = [...editingLocus.alleles];
                                        updated[index] = { ...updated[index], probability: Number(e.target.value) };
                                        setEditingLocus({ ...editingLocus, alleles: updated });
                                      }} />
                                    </div>
                                  </div>
                                </div>
                              ))}
                              <div className="flex gap-2">
                                <Button size="sm" onClick={() => saveLocus()}>Save</Button>
                                <Button size="sm" variant="outline" onClick={() => setEditingLocus(null)}>Cancel</Button>
                              </div>
                            </div>
                          )}

                          {addingAlleleToLocus === locus.id && (
                            <div className="mt-2 pt-2 border-t flex flex-col gap-2">
                              <p className="text-xs font-medium text-muted-foreground">New Allele</p>
                              <div className="flex gap-2 flex-wrap">
                                <div className="flex flex-col gap-1">
                                  <Label className="text-xs">Name</Label>
                                  <Input className="h-7 w-28 text-sm" value={newAllele.name} onChange={(e) => setNewAllele({ ...newAllele, name: e.target.value })} />
                                </div>
                                <div className="flex flex-col gap-1">
                                  <Label className="text-xs">Symbol</Label>
                                  <Input className="h-7 w-20 text-sm" value={newAllele.symbol} onChange={(e) => setNewAllele({ ...newAllele, symbol: e.target.value })} />
                                </div>
                                <div className="flex flex-col gap-1">
                                  <Label className="text-xs">Dominance</Label>
                                  <Input className="h-7 w-28 text-sm" value={newAllele.dominance} onChange={(e) => setNewAllele({ ...newAllele, dominance: e.target.value })} />
                                </div>
                                <div className="flex flex-col gap-1">
                                  <Label className="text-xs">Probability</Label>
                                  <Input className="h-7 w-24 text-sm" value={newAllele.probability} type="number" min="0" max="1" step="0.01" onChange={(e) => setNewAllele({ ...newAllele, probability: e.target.value })} />
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Button size="sm" onClick={() => addAllele(locus.id, g.id)}>Save</Button>
                                <Button size="sm" variant="outline" onClick={() => setAddingAlleleToLocus(null)}>Cancel</Button>
                              </div>
                            </div>
                          )}

                        </div>
                      ))}
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-semibold">Expression Rules</p>
                      {g.expressionRules.map(rule => (
                        <div key={rule.id}>
                          {editingRule?.id !== rule.id && (
                            <div className="flex items-center gap-3 text-sm">
                              <span className="text-muted-foreground">{rule.minDominantAlleles} dominant → {rule.expression}</span>
                              <Button type="button" size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); setEditingRule(rule); }}>Edit</Button>
                              <Button type="button" size="sm" variant="destructive" onClick={(e) => { e.stopPropagation(); deleteRule(rule.id, rule.geneId); }}>Delete</Button>
                            </div>
                          )}
                          {editingRule?.id === rule.id && (
                            <div className="flex items-center gap-3 flex-wrap max-w-2xl">
                              <div className="flex flex-col gap-1">
                                <Label className="text-xs">Min Dominant</Label>
                                <Input className="h-8 w-24" value={editingRule.minDominantAlleles} onChange={(e) => setEditingRule({ ...editingRule, minDominantAlleles: Number(e.target.value) })} />
                              </div>
                              <div className="flex flex-col gap-1 flex-1">
                                <Label className="text-xs">Expression</Label>
                                <Input className="h-8" value={editingRule.expression} onChange={(e) => setEditingRule({ ...editingRule, expression: e.target.value })} />
                              </div>
                              <div className="flex gap-2 self-end">
                                <Button size="sm" onClick={() => saveRule()}>Save</Button>
                                <Button size="sm" variant="outline" onClick={() => setEditingRule(null)}>Cancel</Button>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}

                      {addingRuleToGene === g.id && (
                        <div className="flex items-center gap-3 flex-wrap pt-2 max-w-2xl">
                          <div className="flex flex-col gap-1">
                            <Label className="text-xs">Min Dominant</Label>
                            <Input className="h-8 w-24" value={newExpressionRule.minDominantAlleles} onChange={(e) => setNewExpressionRule({ ...newExpressionRule, minDominantAlleles: e.target.value })} />
                          </div>
                          <div className="flex flex-col gap-1 flex-1">
                            <Label className="text-xs">Expression</Label>
                            <Input className="h-8" value={newExpressionRule.expression} onChange={(e) => setNewExpressionRule({ ...newExpressionRule, expression: e.target.value })} />
                          </div>
                          <div className="flex gap-2 self-end">
                            <Button size="sm" onClick={() => addRule(g.id)}>Save</Button>
                            <Button size="sm" variant="outline" onClick={() => setAddingRuleToGene(null)}>Cancel</Button>
                          </div>
                        </div>
                      )}
                    </div>

                  </div>
                )}

                {editingGene?.id === g.id && (
                  <div className="p-3 border-t flex items-center gap-3 flex-wrap">
                    <div className="flex flex-col gap-1">
                      <Label className="text-xs">Name</Label>
                      <Input className="h-8 w-36" value={editingGene.name} onChange={(e) => setEditingGene({ ...editingGene, name: e.target.value })} />
                    </div>
                    <div className="flex flex-col gap-1">
                      <Label className="text-xs">Category</Label>
                      <Input className="h-8 w-36" value={editingGene.category} onChange={(e) => setEditingGene({ ...editingGene, category: e.target.value })} />
                    </div>
                    <div className="flex items-center gap-2 self-end pb-1">
                      <Checkbox
                        id={`gene-active-${g.id}`}
                        checked={editingGene.active}
                        onCheckedChange={(c) => setEditingGene({ ...editingGene, active: Boolean(c) })}
                      />
                      <Label htmlFor={`gene-active-${g.id}`} className="text-sm">Active</Label>
                    </div>
                    <div className="flex gap-2 self-end">
                      <Button size="sm" onClick={() => saveGene()}>Save</Button>
                      <Button size="sm" variant="outline" onClick={() => setEditingGene(null)}>Cancel</Button>
                    </div>
                  </div>
                )}

              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
