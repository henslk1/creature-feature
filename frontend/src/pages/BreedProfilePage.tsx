import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API_URL, JSON_HEADERS } from "../config";
import { type Allele, type Attribute, type Stat, type Breed } from "../types";

export function BreedProfilePage() {

  const { breedId } = useParams();

  const [breed, setBreed] = useState<Breed | null>(null);

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

      {breed.genes.map(g => (
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
                      <span> Probability: {allele.probability}</span>
                    
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

      <h2>Stats</h2>

    </div>
  )
}
