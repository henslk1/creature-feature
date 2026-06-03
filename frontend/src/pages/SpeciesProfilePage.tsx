import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../config";
import type { Species, Gene } from "../types";
import { GeneSection } from "../components/GeneSection";

export function SpeciesProfilePage() {

  const { speciesId } = useParams();

  // GET
  const [species, setSpecies] = useState<Species | null>(null);

  // Landing page
  useEffect(() => {
    fetch(`${API_URL}/species/${speciesId}`)
      .then(res => {
        if(!res.ok) return;
        return res.json();
      })
      .then(data => setSpecies(data))
  }, []);

  // Gene handlers
  function onGeneAdded(gene: Gene) {
    setSpecies({ ...species!, genes: [...species!.genes, gene ]});
  };
  function onGeneUpdated(gene: Gene) {
    setSpecies({ ...species!, genes: species!.genes.map(g => g.id === gene.id ? gene : g) });
  };
  function onGeneDeleted(geneId: number) {
    setSpecies({ ...species!, genes: species!.genes.filter(g => g.id !== geneId) });
  };

  if(!species) return <div>Loading...</div>

  return (
    <div>
      <h1>{species.name}</h1>
      <p>{species.description}</p>

      <h2>Attributes</h2>

      <h2>Genes</h2>
        <GeneSection
        speciesId={species.id}
        genes={species.genes}
        onGeneAdded={onGeneAdded}
        onGeneDeleted={onGeneDeleted}
        onGeneUpdated={onGeneUpdated}
        />
      <h2>Stats</h2>

      <h2>Breeds</h2>

    </div>
  )
}
