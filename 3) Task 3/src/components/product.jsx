export default function Product({selectProduct, active, data}) {
    const [name, date, id] = data
    return (
        <div
            onClick={() => {
                selectProduct(id)
            }}
            className={`bar-product ${active === id && 'active'}`}
        >
            <div className="bar-product_title">
                {name}
            </div>
            <div className="bar-product_subTitle">
                {date}
            </div>
        </div>
    )
}
