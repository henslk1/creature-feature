import { API_URL, JSON_HEADERS } from "../config";
import type { Gene } from "../types";
import { useState } from "react";

interface GeneSectionProps {
  speciesId: number,
  genes: Gene[],
  onGeneAdded: (gene: Gene) => void
}

export function GeneSection({ speciesId, genes, onGeneAdded }: GeneSectionProps) {

  // Dynamic display
  const [expandedGenes, setExpandedGenes] = useState<Set<number>>(new Set());

  // Setters
  const [newGeneName, setNewGeneName] = useState("");
  const [newGeneCategory, setNewGeneCategory] = useState("");
  const [newGeneLoci, setNewGeneLoci] = useState([{ 
                                          name: "", alleles: [{ 
                                            name: "", symbol: "", dominance: "", probability: "" }] }]);
  const [newGeneExpressionRules, setNewGeneExpressionRules] = useState([{
                                                              minDominantAlleles: "",
                                                              expression: ""
                                                            }]);

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
      setShowAddForm(false);
      setNewGeneName("");
      setNewGeneCategory("");
      setNewGeneLoci([{ name: "", alleles: [{ name: "", symbol: "", dominance: "", probability: "" }] }]);
      setNewGeneExpressionRules([{ minDominantAlleles: "", expression: "" }]);
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
                      updated[index].alleles.push({ name: "", symbol: "", dominance: "", probability: "" });
                      setNewGeneLoci(updated);
                    }}>
                      Add Allele
                    </button>
              
              </div>
            
            ))}

            <button type="button" onClick={() => {
              const updated = [...newGeneLoci];
              updated.push({ name: "", alleles: [{ name: "", symbol: "", dominance: "", probability: "" }] });
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
              updated.push({ minDominantAlleles: "", expression: "" });
              setNewGeneExpressionRules(updated)
            }}>
              Add Expression Rule
            </button>

            <button onClick={addGene}> Save </button>
            <button type="button" onClick={() =>{ 
              setShowAddForm(false);
              setNewGeneName("");
              setNewGeneCategory("");
              setNewGeneLoci([{ name: "", alleles: [{ name: "", symbol: "", dominance: "", probability: "" }] }]);
              setNewGeneExpressionRules([{ minDominantAlleles: "", expression: "" }]);
              }}>Cancel</button>
            
          </form>
        </div>
      )}

      {genes.map(g => (
        <div key={g.id}>

          <h3 onClick={() => toggleGene(g.id)}>
            {g.name} {expandedGenes.has(g.id) ? "Hide" : "View"}</h3>

          {expandedGenes.has(g.id) && (

            <div>

              {g.loci.map(locus => (
                <div key={locus.id}>
                  <span>{locus.name}</span>
                  {locus.alleles.map(allele =>
                    <div key={allele.id}>
                      <span>Name: {allele.name} |</span>
                      <span> Symbol: [{allele.symbol}] |</span>
                      <span> Dominance: {allele.dominance} |</span>
                      <span> Probability: {allele.probability}</span>
                    </div>
                  )}
                </div>
              ))}

              {g.expressionRules.map(rule => (
                <div key={rule.id}>
                  <span>Minimum number of dominant alleles: {rule.minDominantAlleles} | </span>
                  <span>Expression: {rule.expression}</span>
                </div>
              ))}

            </div>

          )}

        </div>
      ))}
    </div>
  )

}
