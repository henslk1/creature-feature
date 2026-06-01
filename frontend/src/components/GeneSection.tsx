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
                                            name: "", symbol: "", dominance: "", probability: 0 }] }]);
  const [newGeneExpressionRules, setNewGeneExpressionRules] = useState([{
                                                              minDominantAlleles: 0,
                                                              expression: ""
                                                            }]);

  // Add form handler                                            
  const [showAddForm, setShowAddForm] = useState(false);

  // POST
  function addGene() {
    fetch(`${API_URL}/species/${speciesId}/genes`, {
      method: "POST",
      headers: JSON_HEADERS,
      body: JSON.stringify({
        name: newGeneName,
        category: newGeneCategory,
        loci: newGeneLoci,
        expressionRules: newGeneExpressionRules
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
      setNewGeneLoci([{ name: "", alleles: [{ name: "", symbol: "", dominance: "", probability: 0 }] }]);
      setNewGeneExpressionRules([{ minDominantAlleles: 0, expression: "" }]);
    })
  }

  return (
    <div>
      {!showAddForm && <button onClick={() => setShowAddForm(true)}>Add Gene</button>}
      {showAddForm && (
        <div>
          <form>
            <input value={newGeneName} onChange={(e) => setNewGeneName(e.target.value)} />
            <input value={newGeneCategory} onChange={(e) => setNewGeneCategory(e.target.value)} />
            {newGeneLoci.map((locus, index) => (

              <div key={index}>

                <input value={locus.name} onChange={(e) => {
                  const updated = [...newGeneLoci];
                  updated[index].name = e.target.value;
                  setNewGeneLoci(updated);
                }} />

                {locus.alleles.map((allele, alleleIndex) => (
                  <div key={alleleIndex}>

                    <input value={allele.name} onChange={(e) => {
                      const updated = [...newGeneLoci];
                      updated[index].alleles[alleleIndex].name = e.target.value;
                      setNewGeneLoci(updated);
                    }} />
                    <input value={allele.symbol} onChange={(e) => {
                      const updated = [...newGeneLoci];
                      updated[index].alleles[alleleIndex].symbol = e.target.value;
                      setNewGeneLoci(updated);
                    }} />
                    <input value={allele.dominance} onChange={(e) => {
                      const updated = [...newGeneLoci];
                      updated[index].alleles[alleleIndex].dominance = e.target.value;
                      setNewGeneLoci(updated);
                    }} />
                    <input value={allele.probability} onChange={(e) => {
                      const updated = [...newGeneLoci];
                      updated[index].alleles[alleleIndex].probability = Number(e.target.value);
                      setNewGeneLoci(updated);
                    }} />

                  </div>
                ))}

                  <button onClick={() => {
                      const updated = [...newGeneLoci];
                      updated[index].alleles.push({ name: "", symbol: "", dominance: "", probability: 0 });
                      setNewGeneLoci(updated);
                    }}>
                      Add Allele
                    </button>
              
              </div>
            
            ))}

            <button onClick={() => {
              const updated = [...newGeneLoci];
              updated.push({ name: "", alleles: [{ name: "", symbol: "", dominance: "", probability: 0 }] });
              setNewGeneLoci(updated);
            }}>
              Add Locus
            </button>

            {newGeneExpressionRules.map((rule, index) => (

              <div key={index}>

                <input value={rule.minDominantAlleles} onChange={(e) => {
                  const updated = [...newGeneExpressionRules];
                  updated[index].minDominantAlleles = Number(e.target.value);
                  setNewGeneExpressionRules(updated);
                }} />
                <input value={rule.expression} onChange={(e) => {
                  const updated = [...newGeneExpressionRules];
                  updated[index].expression = e.target.value;
                  setNewGeneExpressionRules(updated);
                }} />

              </div>

            ))}

            <button onClick={() => {
              const updated = [...newGeneExpressionRules];
              updated.push({ minDominantAlleles: 0, expression: "" });
              setNewGeneExpressionRules(updated)
            }}>
              Add Expression Rule
            </button>

            <button onClick={addGene}> Save </button>
            <button onClick={() => setShowAddForm(false)}>Cancel</button>
            
          </form>
        </div>
      )}
    </div>
  )

}