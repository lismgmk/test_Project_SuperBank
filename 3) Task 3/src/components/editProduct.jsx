import {Field} from "./field";
import {nanoid} from "nanoid";

export const EditProduct = ({nameEdit, changProduct, product}) => {
    return (
        <>
            <div className="main-title">Редактирование: {nameEdit}</div>
            <div
                className="main-area">
                {product.map(([label, nameLabel, valueInput]) => {
                    return <Field
                        changProduct={changProduct}
                        key={nanoid()}
                        label={label}
                        valueInput={valueInput}
                        nameLabel={nameLabel}
                    />
                })}
            </div>
        </>

    )
}

