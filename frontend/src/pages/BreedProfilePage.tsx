import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API_URL, JSON_HEADERS } from "../config";
import { type Allele, type Stat, type Breed } from "../types";

export function BreedProfilePage() {

  const { breedId } = useParams();

  const [breed, setBreed] = useState<Breed | null>(null);
  const BREED_URL = `${API_URL}/breeds/${breedId}`;

  // Edit
  const [editingAllele, setEditingAllele] = useState<Allele | null>(null);
  const [editingStat, setEditingStat] = useState<Stat | null>(null);

  // Display
  const [expandedAttr, setExpandedAttr] = useState<Set<number>>(new Set());
  const [expandedGenes, setExpandedGenes] = useState<Set<number>>(new Set());

  function toggleAttr(id: number) {
    const updated = new Set(expandedAttr);
    if(updated.has(id)) {
      updated.delete(id);
    } else {
      updated.add(id);
    }
    setExpandedAttr(updated);
  }

  function toggleGene(id: number) {
    const updated = new Set(expandedGenes);
    if(updated.has(id)) {
      updated.delete(id);
    } else {
      updated.add(id);
    }
    setExpandedGenes(updated);
  }

  // Update
  function addAlleleOverride(alleleId: number, probability: number) {
    setBreed({
      ...breed!,
      genes: breed!.genes.map(gene => ({
        ...gene,
        loci: gene.loci.map( locus => ({
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
      body: JSON.stringify({
        alleleId: editingAllele?.id,
        probability: editingAllele!.probability
      })
    })
    .then(res => {
      if(!res.ok) return;
      return res.json();
    })
    .then(() => {
      addAlleleOverride(editingAllele!.id, editingAllele!.probability);
      setEditingAllele(null);
    })
  }

  function saveStat() {
    fetch(`${BREED_URL}/statRanges`, {
      method: "PUT",
      headers: JSON_HEADERS,
      body: JSON.stringify({
        stat: editingStat?.name,
        breedId: breed?.id,
        min: editingStat?.min,
        max: editingStat?.max
      })
    })
    .then(res => {
      if(!res.ok) return;
      return res.json();
    })
    .then(() => {
      addStatRange();
      setEditingStat(null);
    })
  }

  // Landing page
  useEffect(() => {
    fetch(`${API_URL}/breeds/${breedId}`)
      .then(res => {
        if(!res.ok) return;
        return res.json();
      })
      .then(data => setBreed(data))
  }, []);

  if(!breed) return <div>Loading...</div>

  return (
    <div>
      
      <h1>{breed.name}</h1>
      <span>{breed.active ? "Active" : "Not Active"}</span>

      <h2>Attributes</h2>

      {breed.attributes.map(attr => (
          <div key={attr.id}>
            
                <h3>
                  <span onClick={() => attr.type !== "String" && attr.type !== "Boolean" && toggleAttr(attr.id)}>
                  <span> {attr.name} | {attr.type} </span>
                  {attr.type !== "String" && attr.type !== "Boolean" && (expandedAttr.has(attr.id) ? " Hide " : " View")}
                  </span>
                
                </h3>

                {attr.type !== "String" && attr.type !== "Boolean" && expandedAttr.has(attr.id) && (
                  <div>

                    {attr.type === "Number" && (
                      <div>
                        <span>Min: {attr.min}</span>
                        <br></br>
                        <span>Max: {attr.max}</span>
                      </div>
                    )}

                    {attr.type === "Enum" && (
                      <ol>
                        {attr.options.map((opt, index) => (
                          <li key={index}>{opt}</li>))}
                      </ol>
                    )}

                  </div>
                )}

                <span>{attr.mutable ? "Mutable" : "Non-Mutable"} </span>

                <br></br>

                <span>{attr.optional ? "Optional" : "Non-Optional"}</span>

          </div>
        ))}

      <h2>Genes</h2>

      {Object.entries(
        breed.genes.reduce((acc, g) => {
          const cat = g.category || "Uncategorized";
          if (!acc[cat]) acc[cat] = [];
          acc[cat].push(g);
          return acc;
        }, {} as Record<string, typeof breed.genes>)
      ).map(([category, categoryGenes]) => (
        <div key={category}>
          <h3>{category}</h3>
          {categoryGenes.map(g => (
        <div key={g.id}>

          <h3 onClick={() => toggleGene(g.id)}>
            {g.name} 
            {expandedGenes.has(g.id) ? " Hide " : " View "}
            </h3>

          {expandedGenes.has(g.id) && (
            <div>
              
              <strong>Loci</strong>
 
              {g.loci.map(locus => (
                <div key={locus.id}>
                  
                  <strong>Locus: </strong>
                  <span>{locus.name}</span>

                  <br></br>

                  <strong>Alleles</strong>

                    {locus.alleles.map(allele =>
                      <div key={allele.id}>

                        <span>Name: {allele.name} |</span>
                        <span> Symbol: [{allele.symbol}] |</span>
                        <span> Dominance: {allele.dominance} |</span>

                        {editingAllele?.id !== allele.id && (  
                          <div>
                            <span> Probability: {allele.probability} | </span>

                            <button type="button" onClick={(e) => { e.stopPropagation(); setEditingAllele(allele); }}>Edit Probability</button>
                          </div>
                        )}

                        {editingAllele?.id === allele.id && (
                          <div>

                            <span> Edit Probability: </span>
                            <input 
                            value={editingAllele.probability} 
                            type="number" min="0" max ="1" step="0.01" 
                            onChange={(e) => setEditingAllele({ ...editingAllele, probability: Number(e.target.value) }) }
                            />

                            <button onClick={() => saveAllele()}> Save </button>
                            <button type="button" onClick={() => setEditingAllele(null)}>Cancel</button>

                            </div>
                        )}

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

        </div>
          ))}
        </div>
      ))}

      <h2>Stats</h2>

      {breed.stats.map(stat => (
        <div key={stat.id}>
          
          {editingStat?.id !== stat.id && (
            <div>

              <h3>{stat.name}</h3>

              <span>Min: {stat.min} | </span>
              <span>Max: {stat.max} </span>
              <button type="button" onClick={(e) => { e.stopPropagation(); setEditingStat(stat); }}>EDIT</button>

            </div>
          )}

          {editingStat?.id === stat.id && (
            <div>
              <strong>Edit Stat Range</strong>
              
              <br></br>

              <span>Min: </span>
              <input value={editingStat?.min} type="number"  onChange={(e) => setEditingStat({ ...editingStat!, min: Number(e.target.value) })} />

              <div></div>

              <span>Max: </span>
              <input value={editingStat?.max} type="number" min="0" onChange={(e) => setEditingStat({ ...editingStat!, max: Number(e.target.value) })} />

              <div></div>

              <button onClick={() => saveStat()}>Save</button>
              <button type="button" onClick={() => setEditingStat(null)}>Cancel</button> 
            
            </div>
          )}

        </div>
      ))}

    </div>
  )
}
