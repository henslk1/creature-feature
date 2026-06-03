import { useState } from "react";
import { API_URL, JSON_HEADERS } from "../config";
import { type Gene, type Locus, type ExpressionRule } from "../types";

export function useGeneSection(
  speciesId: number,
  genes: Gene[],
  onGeneAdded: (gene: Gene) => void,
  onGeneDeleted: (geneId: number) => void,
  onGeneUpdated: (gene: Gene) => void
) {
  // Dynamic display
  const [expandedGenes, setExpandedGenes] = useState<Set<number>>(new Set());
  const [editingGene, setEditingGene] = useState<Gene | null>(null);
  const [editingLocus, setEditingLocus] = useState<Locus | null>(null);
  const [editingRule, setEditingRule] = useState<ExpressionRule | null>(null);

  const [addingLocusToGene, setAddingLocusToGene] = useState<number | null>(null);
  const [addingAlleleToLocus, setAddingAlleleToLocus] = useState<number | null>(null);
  const [addingRuleToGene, setAddingRuleToGene] = useState<number | null>(null);

  // Defaults
  const DEFAULT_ALLELE = { name: "", symbol: "", dominance: "", probability: "" };
  const DEFAULT_LOCUS = { name: "", alleles: [DEFAULT_ALLELE] };
  const DEFAULT_RULE = { minDominantAlleles: "", expression: ""};
  const GENE_URL = `${API_URL}/species/${speciesId}/genes`;

  // Setters
  const [newGeneName, setNewGeneName] = useState("");
  const [newGeneCategory, setNewGeneCategory] = useState("");
  const [newGeneLoci, setNewGeneLoci] = useState([DEFAULT_LOCUS]);
  const [newGeneExpressionRules, setNewGeneExpressionRules] = useState([DEFAULT_RULE]);

  const [newLocus, setNewLocus] = useState(DEFAULT_LOCUS);
  const [newAllele, setNewAllele] = useState(DEFAULT_ALLELE);
  const [newExpressionRule, setNewExpressionRule] = useState(DEFAULT_RULE)

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
    fetch(`${GENE_URL}`, {
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

  // ADD
  function addLocus(geneId: number) {

  }

  function addAllele(locusId: number, geneId: number) {

  }

  function addRule(geneId: number) {
    
  }

  // PATCH
  function saveGene() {
    fetch(`${GENE_URL}/${editingGene?.id}`, {
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
    .then(updatedGene => {
      if(!updatedGene) return;
      onGeneUpdated(updatedGene);
      setEditingGene(null);
    })
  }

  function saveLocus() {
    const gene = genes.find(g => g.loci.some(l => l.id === editingLocus!.id))!;
    const updatedLoci = gene.loci.map(l => l.id === editingLocus!.id ? editingLocus! : l);
    fetch(`${GENE_URL}/${editingLocus?.geneId}`, {
      method: "PATCH",
      headers: JSON_HEADERS,
      body: JSON.stringify({
        loci: updatedLoci
      })
    })
    .then(res => {
      if(!res.ok) return;
      return res.json();
    })
    .then(updatedGene => {
      if(!updatedGene) return;
      onGeneUpdated(updatedGene);
      setEditingLocus(null);
    })
  }

  function saveRule() {
    const gene = genes.find(g => g.expressionRules.some(r => r.id === editingRule!.id))!;
    const updatedRule = gene.expressionRules.map(r => r.id === editingRule!.id ? editingRule! : r);
    fetch(`${GENE_URL}/${editingRule?.geneId}`, {
      method: "PATCH",
      headers: JSON_HEADERS,
      body: JSON.stringify({
        expressionRules: updatedRule
      })
    })
    .then(res => {
      if(!res.ok) return;
      return res.json();
    })
    .then(updatedGene => {
      if(!updatedGene) return;
      onGeneUpdated(updatedGene);
      setEditingRule(null);
    })
  }

  // DELETE
  function deleteGene(id: number) {
    fetch(`${GENE_URL}/${id}`, {
      method: "DELETE"
    })
    .then(res => {
      if(!res.ok) return;
      onGeneDeleted(id);
    })
  }

  function deleteLocus(locusId: number, geneId: number) {
    const updatedLoci = genes.find(g => g.id === geneId)!.loci.filter(l => l.id !== locusId);
    fetch(`${GENE_URL}/${geneId}`, {
      method: "PATCH",
      headers: JSON_HEADERS,
      body: JSON.stringify({ loci: updatedLoci })
    })
    .then(res => {
      if(!res.ok) return;
      return res.json();
    })
    .then(updatedGene => {
      if(!updatedGene) return;
      onGeneUpdated(updatedGene);
    })
  }

  function deleteRule(ruleId: number, geneId:number) {
    const updatedRule = genes.find(g => g.id === geneId)!.expressionRules.filter(r => r.id !== ruleId);
    fetch(`${GENE_URL}/${geneId}`, {
      method: "PATCH",
      headers: JSON_HEADERS,
      body: JSON.stringify({ expressionRules: updatedRule })
    })
    .then(res => {
      if(!res.ok) return;
      return res.json();
    })
    .then(updatedGene => {
      if(!updatedGene) return;
      onGeneUpdated(updatedGene);
    })
  }

  return {
    expandedGenes,
    editingGene, setEditingGene,
    editingLocus, setEditingLocus,
    editingRule, setEditingRule,
    newGeneName, setNewGeneName,
    newGeneCategory, setNewGeneCategory,
    newGeneLoci, setNewGeneLoci,
    newGeneExpressionRules, setNewGeneExpressionRules,
    showAddForm, setShowAddForm,
    DEFAULT_ALLELE, DEFAULT_LOCUS, DEFAULT_RULE,
    toggleGene, resetForm,
    addGene, saveGene, saveLocus, saveRule,
    deleteGene, deleteLocus, deleteRule
  };

};