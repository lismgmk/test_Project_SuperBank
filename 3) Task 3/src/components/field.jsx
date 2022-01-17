import React, {useState} from "react";

export const Field = React.memo(({changProduct, label, valueInput, nameLabel}) => {

    const [state, setState] = useState(valueInput)

    const sendInput = (e) => {
        setState(e.currentTarget.value)
        changProduct(nameLabel, e.currentTarget.value)
    }
    return (
        <div
            className="main-area_field">
            <label> {label} </label>
            <input type="text" placeholder="Placeholder"
                   onChange={sendInput}
                   value={state}
            />
        </div>
    )
})
