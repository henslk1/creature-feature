import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../config";
import type { Species, Gene, Stat, Attribute, Breed } from "../types";
import { GeneSection } from "../components/GeneSection";
import { StatSection } from "../components/StatSection";
import { AttributeSection } from "../components/AttrubuteSection";
import { BreedSection } from "../components/BreedSection";

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

  // Stat handlers
  function onStatAdded(stat: Stat) {
    setSpecies({ ...species!, stats: [...species!.stats, stat] });
  };
  function onStatUpdated(stat: Stat) {
    setSpecies({ ...species!, stats: species!.stats.map(s => s.id === stat.id ? stat : s) });
  };
  function onStatDeleted(statId: number) {
    setSpecies({ ...species!, stats: species!.stats.filter(s => s.id !== statId) });
  };

  // Attribute handler
  function onAttributeAdded(attribute: Attribute) {
  setSpecies({ ...species!, attributes: [...species!.attributes, attribute] });
  };
  function onAttributeUpdated(attribute: Attribute) {
    setSpecies({ ...species!, attributes: species!.attributes.map(a => a.id === attribute.id ? attribute : a) });
  };
  function onAttributeDeleted(attributeId: number) {
    setSpecies({ ...species!, attributes: species!.attributes.filter(a => a.id !== attributeId) });
  };

  // Breeds handler
  function onBreedAdded(breed: Breed) {
    setSpecies({ ...species!, breeds: [...species!.breeds, { ...breed, _count: { animals: 0 } }] });
  };
  function onBreedUpdated(breed: Breed) {
    setSpecies({ ...species!, breeds: species!.breeds.map(b => b.id === breed.id ? breed : b) });
  };
  function onBreedDeleted(breedId: number) {
    setSpecies({ ...species!, breeds: species!.breeds.filter(b => b.id !== breedId) });
  };

  if(!species) return <div className="container mx-auto p-6">Loading...</div>

return (
  <div className="container mx-auto p-6">
    <div className="mb-6">
      <h1 className="text-2xl font-bold">{species.name}</h1>
      {species.description && <p className="text-muted-foreground mt-1">{species.description}</p>}
    </div>

    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-3">Attributes</h2>
      <AttributeSection
        speciesId={species.id}
        attributes={species.attributes}
        onAttributeAdded={onAttributeAdded}
        onAttributeUpdated={onAttributeUpdated}
        onAttributeDeleted={onAttributeDeleted}
      />
    </section>

    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-3">Genes</h2>
      <GeneSection
        speciesId={species.id}
        genes={species.genes}
        onGeneAdded={onGeneAdded}
        onGeneDeleted={onGeneDeleted}
        onGeneUpdated={onGeneUpdated}
      />
    </section>

    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-3">Stats</h2>
      <StatSection
        speciesId={species.id}
        stats={species.stats}
        onStatAdded={onStatAdded}
        onStatDeleted={onStatDeleted}
        onStatUpdated={onStatUpdated}
      />
    </section>

    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-3">Breeds</h2>
      <BreedSection
        speciesId={species.id}
        breeds={species.breeds}
        onBreedAdded={onBreedAdded}
        onBreedDeleted={onBreedDeleted}
        onBreedUpdated={onBreedUpdated}
      />
    </section>
  </div>
  )
}
