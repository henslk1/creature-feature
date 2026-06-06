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
    expandedAttr, setExpandedAttr,
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
                <option value="Number">Number</option>
                <option value="String">String</option>
                <option value="Enum">Enum</option>
                <option value="Boolean">Boolean</option>
              </select>

              {newAttrType === "Number" && (
                <div>
                  <span>Min: </span>
                  <input value={newAttrMin} type="number" onChange={(e) => setNewAttrMin(Number(e.target.value))} />
                  
                  <br></br>

                  <span>Max: </span>
                  <input value={newAttrMax} type="number" onChange={(e) => setNewAttrMax(Number(e.target.value))} />
                </div>
              )}
              {newAttrType === "Enum" && (
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

        {attributes.map(attr => (
          <div key={attr.id}>
            
            {editingAttr?.id !== attr.id && (
              <div>

                <h3>
                  <span onClick={() => attr.type !== "String" && attr.type !== "Boolean" && toggleAttr(attr.id)}>
                  <span> {attr.name} | {attr.type} </span>
                  {attr.type !== "String" && attr.type !== "Boolean" && (expandedAttr.has(attr.id) ? " Hide " : " View")}
                  </span>
                
                  <button type="button" onClick={(e) => { e.stopPropagation(); deleteAttr(attr.id); }}>DELETE</button>
                  <button type="button" onClick={(e) => { e.stopPropagation(); setEditingAttr(attr); }}>EDIT</button>
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
            )}
          </div>
        ))}
      </div>
    )
}