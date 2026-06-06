import { useAttributeSection } from "../hooks/useAttributeSection";
import { type Attribute } from "../types";

interface AttributeSectionProps {
  speciesId: number,
  attributes: Attribute[],
  onAttributeAdded: (attr: Attribute) => void,
  onAttributeDeleted: (attrId: number) => void,
  onAttributeUpdated: (attr: Attribute) => void
}

export function AttributeSection({ speciesId, attributes, onAttributeAdded, onAttributeDeleted, onAttributeUpdated }: AttributeSectionProps) {

  const {
    showAddForm, setShowAddForm,
    newAttrType, setNewAttrType,
    newAttrName, setNewAttrName,
    newAttrMin, setNewAttrMin,
    newAttrMax, setNewAttrMax,
    newAttrOptional, setNewAttrOptional,
    newAttrOptions, setNewAttrOptions,
    newOption, setNewOption,
    newAttrMutable, setNewAttrMutable,
    editingAttr, setEditingAttr,
    addAttr, saveAttr, deleteAttr, toggleAttr, resetForm } = useAttributeSection(speciesId, onAttributeAdded, onAttributeDeleted, onAttributeUpdated);

    return (
      <div>
        {!showAddForm && <button onClick={() => setShowAddForm(true)}>Add Attribute </button>}
        {showAddForm && (
          <div>
            <form>
              <strong>New Attribute</strong>

              <br></br>

              <span>Name: </span>
              <input value={newAttrName} onChange={(e) => setNewAttrName(e.target.value)} />

              <br></br>

              <span>Type: </span>
              <select value={newAttrType} onChange={(e) => setNewAttrType(e.target.value)}>
                <option value="">Select Type</option>
                <option value="number">Number</option>
                <option value="string">String</option>
                <option value="enum">Enum</option>
                <option value="boolean">Boolean</option>
              </select>

              {newAttrType === "number" && (
                <div>
                  <span>Min: </span>
                  <input value={newAttrMin} type="number" onChange={(e) => setNewAttrMin(Number(e.target.value))} />
                  
                  <br></br>

                  <span>Max: </span>
                  <input value={newAttrMax} type="number" onChange={(e) => setNewAttrMax(Number(e.target.value))} />
                </div>
              )}
              {newAttrType === "enum" && (
                <div>
                  {newAttrOptions.map((opt, index) => (
                    <div key={index}>
                      <span>{opt}</span>
                      <button type="button" onClick={() => setNewAttrOptions(newAttrOptions.filter((_, i) => i !== index))}>Remove</button>
                    </div>
                  ))}

                  <span>Option: </span>
                  <input value={newOption} onChange={(e) => setNewOption(e.target.value)} />

                  <button type="button" onClick={() => {
                    setNewAttrOptions([...newAttrOptions, newOption]);
                    setNewOption("");
                  }}>Add Option</button>
                </div>
              )}

              <br></br>
              
              <span>Optional: </span>
              <input type="checkbox" checked={newAttrOptional} onChange={(e) => setNewAttrOptional(e.target.checked)} />

              <br></br>
              
              <span>Mutable: </span>
              <input type="checkbox" checked={newAttrMutable} onChange={(e) => setNewAttrMutable(e.target.checked)} />

              <br></br>
              
              <button type="button" onClick={addAttr}> Save </button>
              <button type="button" onClick={resetForm}>Cancel</button>
  
            </form>
          </div>
        )}

      </div>
    )
}