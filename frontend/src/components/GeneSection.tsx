import { useGeneSection } from "../hooks/useGeneSection";
import { type Gene } from "../types";

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
    deleteGene, deleteLocus, deleteRule, deleteAllele } = useGeneSection(speciesId, genes, onGeneAdded, onGeneDeleted, onGeneUpdated);

  return (
    <div>
      {!showAddForm && <button onClick={() => setShowAddForm(true)}>Add Gene</button>}
      {showAddForm && (
        <div>
          <form>
            <strong>New Gene</strong> 
            
            <br></br>
            
            <input placeholder="Gene Name" value={newGeneName} onChange={(e) => setNewGeneName(e.target.value)} />
            <input placeholder="Category" value={newGeneCategory} onChange={(e) => setNewGeneCategory(e.target.value)} />
            {newGeneLoci.map((locus, index) => (

              <div key={index}>

                <strong>New Locus </strong>

                <br></br>

                <input placeholder="Locus Name" value={locus.name} onChange={(e) => {
                  const updated = [...newGeneLoci];
                  updated[index].name = e.target.value;
                  setNewGeneLoci(updated);
                }} />

                <br></br>

                {locus.alleles.map((allele, alleleIndex) => (
                  <div key={alleleIndex}>
                    <strong>New Allele</strong>

                    <br></br>

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

            {newGeneExpressionRules.map((rule, index) => (

              <div key={index}>
                <strong>New Expression</strong>

                <br></br>

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

            <button type="button" onClick={addGene}> Save </button>
            <button type="button" onClick={resetForm}>Cancel</button>
            
          </form>
        </div>
      )}

      {Object.entries(
        genes.reduce((acc, g) => {
          const cat = g.category || "Uncategorized";
          if (!acc[cat]) acc[cat] = [];
          acc[cat].push(g);
          return acc;
        }, {} as Record<string, typeof genes>)
      ).map(([category, categoryGenes]) => (
        <div key={category}>
          <h4>{category}</h4>
          {categoryGenes.map(g => (
        <div key={g.id}>

          <h3 onClick={() => toggleGene(g.id)}>
            {g.name} 
            {expandedGenes.has(g.id) ? " Hide " : " View "}
            </h3>

          {expandedGenes.has(g.id) && (

            <div>
              <button type="button" onClick={(e) => { e.stopPropagation(); deleteGene(g.id); }}>DELETE</button>
              <button type="button" onClick={(e) => { e.stopPropagation(); setEditingGene(g); }}>EDIT</button>
              <button type="button" onClick={(e) => { e.stopPropagation(); setAddingRuleToGene(g.id); }}>ADD RULE</button>
              
              <div></div>

              <strong>Loci</strong>
 
              {g.loci.map(locus => (
                <div key={locus.id}>

                  {editingLocus?.id !== locus.id && (
                    <div>
                      <strong>Locus: </strong>
                      <span>{locus.name} | </span>

                      <button type="button" onClick={(e) => { e.stopPropagation(); setAddingAlleleToLocus(locus.id); }}>ADD ALLELE</button>
                      <button type="button" onClick={(e) => { e.stopPropagation(); deleteLocus(locus.id, locus.geneId); }}> DELETE </button>
                      <button type="button" onClick={(e) => { e.stopPropagation(); setEditingLocus(locus);}}> EDIT</button>
                      
                      <br></br>
                      <strong>Alleles</strong>

                      {locus.alleles.map(allele =>
                        <div key={allele.id}>
                          <span>Name: {allele.name} |</span>
                          <span> Symbol: [{allele.symbol}] |</span>
                          <span> Dominance: {allele.dominance} |</span>
                          <span> Probability: {allele.probability}</span>
                          <button type="button" onClick={(e) => { e.stopPropagation(); deleteAllele(allele.id, locus.id, g.id); }}>DELETE</button>

                        </div>
                      )}
                    </div>
                  )}

                  {editingLocus?.id === locus.id && (
                    <div>
                      <span>Locus Name:</span>
                      <input placeholder="Locus name" value={editingLocus.name} onChange={(e) => setEditingLocus({ ...editingLocus, name: e.target.value })} />

                      {editingLocus.alleles.map((allele, index) => (

                        <div key={allele.id}>

                          <span>Allele Name:</span>
                          <input value={allele.name} onChange={(e) => {
                            const updated = [...editingLocus.alleles];
                            updated[index] = { ...updated[index], name: e.target.value };
                            setEditingLocus({ ... editingLocus, alleles: updated });
                          }} />

                          <div></div>

                          <span>Symbol: </span>
                          <input value={allele.symbol} onChange={(e) => {
                            const updated = [...editingLocus.alleles];
                            updated[index] = { ...updated[index], symbol: e.target.value };
                            setEditingLocus({ ...editingLocus, alleles: updated });
                          }} />

                          <div></div>

                          <span>Dominance:</span>
                          <input value={allele.dominance} onChange={(e) => {
                            const updated = [...editingLocus.alleles];
                            updated[index] = { ...updated[index], dominance: e.target.value };
                            setEditingLocus({ ...editingLocus, alleles: updated });
                          }} />

                          <div></div>

                          <span>Probability: </span>
                          <input value={allele.probability} type="number" min="0" max="1" step="0.01" onChange={(e) => {
                            const updated = [...editingLocus.alleles];
                            updated[index] = { ...updated[index], probability: Number(e.target.value) };
                            setEditingLocus({ ...editingLocus, alleles: updated });
                          }} />

                        </div>

                      ))}

                      <button onClick={() => saveLocus()}> Save </button>
                      <button type="button" onClick={() => setEditingLocus(null)}> Cancel </button>
                    
                    </div>
                  )}
                  {addingAlleleToLocus === locus.id && (
                    <div>

                      <span> Name: </span>
                      <input value={newAllele.name} onChange={(e) => setNewAllele({ ...newAllele, name: e.target.value })} />
                      
                      <div></div>
                      
                      <span>Symbol: </span>
                      <input value={newAllele.symbol} onChange={(e) => setNewAllele({ ...newAllele, symbol: e.target.value })} />
                      
                      <div></div>

                      <span>Dominance: </span>
                      <input value={newAllele.dominance} onChange={(e) => setNewAllele({ ...newAllele, dominance: e.target.value })} />
                      
                      <div></div>

                      <span>Probability: </span>
                      <input value={newAllele.probability} type="number" min="0" max="1" step="0.01" onChange={(e) => setNewAllele({ ...newAllele, probability: e.target.value })} />
                      
                      <div></div>

                      <button onClick={() => addAllele(locus.id, g.id)}> Save </button>
                      <button type="button" onClick={() => setAddingAlleleToLocus(null)}> Cancel </button>

                    </div>
                  )}
                </div>
              ))}

              <strong>Expression Rules:</strong>

              {g.expressionRules.map(rule => (
                <div key={rule.id}>
                  {editingRule?.id !== rule.id && (
                    <div>
                      <span>Minimum number of dominant alleles: {rule.minDominantAlleles} | </span>
                      <span>Expression: {rule.expression}</span>
                      <button type="button" onClick={(e) => { e.stopPropagation(); deleteRule(rule.id, rule.geneId ); }}>DELETE</button>
                      <button type="button" onClick={(e) => { e.stopPropagation(); setEditingRule(rule); }}>EDIT</button>
                    </div>
                  )}

                  {editingRule?.id === rule.id && (
                    <div>

                      <span>Min Dominant Alleles: </span>
                      <input value={editingRule.minDominantAlleles} onChange={(e) => setEditingRule({ ...editingRule, minDominantAlleles: Number(e.target.value) })} />
                      
                      <div></div>

                      <span>Expression:</span>
                      <input value={editingRule.expression} onChange={(e) => setEditingRule({ ...editingRule, expression: e.target.value })} />

                      <div></div>

                      <button onClick={() => saveRule()}> Save </button>
                      <button type="button" onClick={() => setEditingRule(null)}> Cancel </button>

                    </div>
                  )}
                </div>
              ))}

              {addingRuleToGene === g.id && (
                <div>
                  
                  <span>Min Dominant Alleles:</span>
                  <input value={newExpressionRule.minDominantAlleles} onChange={(e) => setNewExpressionRule({ ...newExpressionRule, minDominantAlleles: e.target.value })} />

                  <div></div>

                  <span>Expression: </span>
                  <input value={newExpressionRule.expression} onChange={(e) => setNewExpressionRule({ ...newExpressionRule, expression: e.target.value })} />

                  <div></div>
                  <button onClick={() => addRule(g.id)}>Save </button>
                  <button type="button" onClick={() => setAddingRuleToGene(null)}>Cancel</button>
                  
                </div>
              )}

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
              <button onClick={() => saveGene()}> Save </button>
              <button type="button" onClick={() => setEditingGene(null)}> Cancel </button>
            </div>
          )}

        </div>
          ))}
        </div>
      ))}
    </div>
  )

}
