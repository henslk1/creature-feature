import { API_URL, JSON_HEADERS } from "../config";
import { type Locus, type Gene } from "../types";
import { useState } from "react";

interface GeneSectionProps {
  speciesId: number,
  genes: Gene[],
  onGeneAdded: (gene: Gene) => void,
  onGeneDeleted: (geneId: number) => void,
  onGeneUpdated: (gene: Gene) => void
}

export function GeneSection({ speciesId, genes, onGeneAdded, onGeneDeleted, onGeneUpdated }: GeneSectionProps) {

  // Dynamic display
  const [expandedGenes, setExpandedGenes] = useState<Set<number>>(new Set());
  const [editingGene, setEditingGene] = useState<Gene | null>(null);
  const [editingLocus, setEditingLocus] = useState<Locus | null>(null);

  // Defaults
  const DEFAULT_ALLELE = { name: "", symbol: "", dominance: "", probability: "" };
  const DEFAULT_LOCUS = { name: "", alleles: [DEFAULT_ALLELE] };
  const DEFAULT_RULE = { minDominantAlleles: "", expression: ""};
  // Setters
  const [newGeneName, setNewGeneName] = useState("");
  const [newGeneCategory, setNewGeneCategory] = useState("");
  const [newGeneLoci, setNewGeneLoci] = useState([DEFAULT_LOCUS])
  const [newGeneExpressionRules, setNewGeneExpressionRules] = useState([DEFAULT_RULE])

  // Add form handler                                            
  const [showAddForm, setShowAddForm] = useState(false);

  // Toggle to display a genes contents
  function toggleGene(id: number) {
    const updated = new Set(expandedGenes);
    if(updated.has(id)) {
      updated.delete(id);
    } else {
      updated.add(id);
    }
    setExpandedGenes(updated);
  }

  function resetForm() {
    setShowAddForm(false);
    setNewGeneName("");
    setNewGeneCategory("");
    setNewGeneLoci([DEFAULT_LOCUS]);
    setNewGeneExpressionRules([DEFAULT_RULE])
  }

  // POST
  function addGene() {
    fetch(`${API_URL}/species/${speciesId}/genes`, {
      method: "POST",
      headers: JSON_HEADERS,
      body: JSON.stringify({
        name: newGeneName,
        category: newGeneCategory,
        loci: newGeneLoci.map(locus => ({
          ...locus,
          alleles: locus.alleles.map(allele => ({
            ...allele,
            probability: Number(allele.probability)
          }))
        })),
        expressionRules: newGeneExpressionRules.map(rule => ({
          ...rule,
          minDominantAlleles: Number(rule.minDominantAlleles)
}))

      })
    })
    .then(res => {
      if(!res.ok) return;
      return res.json();
    })
    .then(newGene => {
      if(!newGene) return;
      onGeneAdded(newGene);
      resetForm();
    })
  }

  // PATCH
  function saveGene(gene: Gene) {
    fetch(`${API_URL}/species/${speciesId}/genes/${gene.id}`, {
      method: "PATCH",
      headers: JSON_HEADERS,
      body: JSON.stringify({
        name: editingGene!.name,
        category: editingGene!.category,
        active: editingGene!.active
      })
    })
    .then(res => {
      if(!res.ok) return;
      return res.json();
    })
    .then(newGene => {
      if(!newGene) return;
      onGeneUpdated(newGene);
      setEditingGene(null);
    })
  }

  // DELETE
  function deleteGene(id: number) {
    fetch(`${API_URL}/species/${speciesId}/genes/${id}`, {
      method: "DELETE"
    })
    .then(res => {
      if(!res.ok) return;
      onGeneDeleted(id);
    })
  }

  return (
    <div>
      {!showAddForm && <button onClick={() => setShowAddForm(true)}>Add Gene</button>}
      {showAddForm && (
        <div>
          <form>
            <input placeholder="Gene Name" value={newGeneName} onChange={(e) => setNewGeneName(e.target.value)} />
            <input placeholder="Category" value={newGeneCategory} onChange={(e) => setNewGeneCategory(e.target.value)} />
            {newGeneLoci.map((locus, index) => (

              <div key={index}>

                <input placeholder="Locus Name" value={locus.name} onChange={(e) => {
                  const updated = [...newGeneLoci];
                  updated[index].name = e.target.value;
                  setNewGeneLoci(updated);
                }} />

                {locus.alleles.map((allele, alleleIndex) => (
                  <div key={alleleIndex}>

                    <input placeholder="Allele Name" value={allele.name} onChange={(e) => {
                      const updated = [...newGeneLoci];
                      updated[index].alleles[alleleIndex].name = e.target.value;
                      setNewGeneLoci(updated);
                    }} />
                    <input placeholder="Allele Symbol" value={allele.symbol} onChange={(e) => {
                      const updated = [...newGeneLoci];
                      updated[index].alleles[alleleIndex].symbol = e.target.value;
                      setNewGeneLoci(updated);
                    }} />
                    <input placeholder="Allele Dominance" value={allele.dominance} onChange={(e) => {
                      const updated = [...newGeneLoci];
                      updated[index].alleles[alleleIndex].dominance = e.target.value;
                      setNewGeneLoci(updated);
                    }} />
                    <input placeholder="Allele Probability" value={allele.probability} type="number" min="0" max="1" step="0.01" onChange={(e) => {
                      const updated = [...newGeneLoci];
                      updated[index].alleles[alleleIndex].probability = e.target.value;
                      setNewGeneLoci(updated);
                    }} />

                  </div>
                ))}

                  <button type="button" onClick={() => {
                      const updated = [...newGeneLoci];
                      updated[index].alleles.push(DEFAULT_ALLELE);
                      setNewGeneLoci(updated);
                    }}>
                      Add Allele
                    </button>
              
              </div>
            
            ))}

            <button type="button" onClick={() => {
              const updated = [...newGeneLoci];
              updated.push(DEFAULT_LOCUS);
              setNewGeneLoci(updated);
            }}>
              Add Locus
            </button>

            {newGeneExpressionRules.map((rule, index) => (

              <div key={index}>

                <input placeholder="Dominant alleles" value={rule.minDominantAlleles} type="number" min="0" onChange={(e) => {
                  const updated = [...newGeneExpressionRules];
                  updated[index].minDominantAlleles = e.target.value;
                  setNewGeneExpressionRules(updated);
                }} />
                <input placeholder="Expression" value={rule.expression} onChange={(e) => {
                  const updated = [...newGeneExpressionRules];
                  updated[index].expression = e.target.value;
                  setNewGeneExpressionRules(updated);
                }} />

              </div>

            ))}

            <button type="button" onClick={() => {
              const updated = [...newGeneExpressionRules];
              updated.push(DEFAULT_RULE);
              setNewGeneExpressionRules(updated)
            }}>
              Add Expression Rule
            </button>

            <button onClick={addGene}> Save </button>
            <button type="button" onClick={resetForm}>Cancel</button>
            
          </form>
        </div>
      )}

      {genes.map(g => (
        <div key={g.id}>

          <h3 onClick={() => toggleGene(g.id)}>
            {g.name} 
            {expandedGenes.has(g.id) ? " Hide " : " View "}
            <button type="button" onClick={(e) => { e.stopPropagation(); deleteGene(g.id); }}>DELETE</button>
            <button type="button" onClick={(e) => { e.stopPropagation(); setEditingGene(g); }}>EDIT</button>
          </h3>

          {expandedGenes.has(g.id) && (

            <div>

              <strong>Loci:</strong>

              {g.loci.map(locus => (
                <div key={locus.id}>
                  {editingLocus?.id !== locus.id && (
                    <div>
                      <span>{locus.name} | </span>
                      <button type="button" onClick={(e) => { e.stopPropagation(); deleteLocus(locus.id); }}> DELETE </button>
                      <button type="button" onClick={(e) => { e.stopPropagation(); setEditingLocus(locus);}}> EDIT</button>
                      {locus.alleles.map(allele =>
                        <div key={allele.id}>
                          <span>Name: {allele.name} |</span>
                          <span> Symbol: [{allele.symbol}] |</span>
                          <span> Dominance: {allele.dominance} |</span>
                          <span> Probability: {allele.probability}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {editingLocus?.id === locus.id && (
                    <div>
                      <input placeholder="Locus name" value={editingLocus.name} onChange={(e) => setEditingLocus({ ...editingLocus, name: e.target.value })} />

                      {editingLocus.alleles.map((allele, index) => (

                        <div key={allele.id}>

                          <span>Name:</span>
                          <input value={allele.name} onChange={(e) => {
                            const updated = [...editingLocus.alleles];
                            updated[index] = { ...updated[index], name: e.target.value };
                            setEditingLocus({ ... editingLocus, alleles: updated });
                          }} />

                          <span>Symbol: </span>
                          <input value={allele.symbol} onChange={(e) => {
                            const updated = [...editingLocus.alleles];
                            updated[index] = { ...updated[index], symbol: e.target.value };
                            setEditingLocus({ ...editingLocus, alleles: updated });
                          }} />

                          <span>Dominance:</span>
                          <input value={allele.dominance} onChange={(e) => {
                            const updated = [...editingLocus.alleles];
                            updated[index] = { ...updated[index], symbol: e.target.value };
                            setEditingLocus({ ...editingLocus, alleles: updated });
                          }} />

                          <span>Probability: </span>
                          <input value={allele.probability} type="number" min="0" max="1" step="0.01" onChange={(e) => {
                            const updated = [...editingLocus.alleles];
                            updated[index] = { ...updated[index], probability: Number(e.target.value) };
                            setEditingLocus({ ...editingLocus, alleles: updated });
                          }} />

                        </div>

                      ))}

                    </div>
                  )}
                </div>
              ))}

              <strong>Expression Rules:</strong>

              {g.expressionRules.map(rule => (
                <div key={rule.id}>
                  <span>Minimum number of dominant alleles: {rule.minDominantAlleles} | </span>
                  <span>Expression: {rule.expression}</span>
                </div>
              ))}

            </div>

          )}

          {editingGene?.id === g.id && (
            <div>
              <input placeholder="Gene Name" value={editingGene.name} onChange={(e) => setEditingGene({ ...editingGene, name: e.target.value })} />
              <input placeholder="Gene Category" value={editingGene.category} onChange={(e) => setEditingGene({ ...editingGene, category: e.target.value })} />
              <label>
                <input type="checkbox" checked={editingGene.active} onChange={(e) => setEditingGene({ ...editingGene, active: e.target.checked })} />
                Active
              </label>
              <button onClick={() => saveGene(editingGene!)}> Save </button>
              <button type="button" onClick={() => setEditingGene(null)}> Cancel </button>
            </div>
          )}

        </div>
      ))}
    </div>
  )

}
