import './App.css';
import api from "./api/api";
import {useEffect, useState} from "react";
import Header from "./components/header";
import Product from "./components/product";
import {EditProduct} from "./components/editProduct";
import {nanoid} from "nanoid";
import {TEMPLATE_INPUT_NAMES} from "./constants";

function App() {

    useEffect(() => {
        api().then(d => setState(d))
    }, [])


    const [active, setActive] = useState()
    const [state, setState] = useState([])


    const selectProduct = (value) => {
        setActive(value)
    }

    const productList = () => {
        const localHelperArr = []
        state.map((value) => {
            return localHelperArr.push([value.productName, value.date, value.id])
        })
        return localHelperArr
    }


    const dataAllInputs = {}


    const changProduct = (labelName, labelData) => {
        dataAllInputs[`${labelName}`] = labelData
    }

    const saveProduct = () => {
        let localHelperObj
        state.filter(i => { if (i.id === active) {
            return localHelperObj = i
        } return i
        })
        for (let elem in localHelperObj) {
            if (dataAllInputs[elem]) {
                localHelperObj[elem] = dataAllInputs[elem]
            }
        }

        const newSate = state.map((i) => {
            if (i.id === active) {
                i = localHelperObj
            }
            return i
        })
        setState(newSate)
        setActive(null)
    }

    const createProduct = () => {
        const localId = nanoid()
        const newProductEmpty = {
            "id": localId,
            "productName": "Enter name",
            "amountMax": 0,
            "amountMin": 0,
            "termMax": 0,
            "termMin": 0,
            "rate": "0%",
            "date": "12.12.2022"
        }
        setState([...state, newProductEmpty])
        setActive(localId)
    }

    const fieldProduct = () => {
        const localHelperArr = []

        const localHelperFunc = (name, arr, key, value) => {
            const nameLabel = [name]
            return arr.push([...nameLabel, key, value])
        }

        state.map((i) => { if (i.id === active) {
            for (let key in i) {
                if (key === 'productName') {
                    localHelperFunc(TEMPLATE_INPUT_NAMES.productName, localHelperArr, key, i[key])
                }
                if (key === 'amountMax') {
                    localHelperFunc(TEMPLATE_INPUT_NAMES.amountMax, localHelperArr, key, i[key])
                }
                if (key === 'amountMin') {
                    localHelperFunc(TEMPLATE_INPUT_NAMES.amountMin, localHelperArr, key, i[key])
                }
                if (key === 'termMin') {
                    localHelperFunc(TEMPLATE_INPUT_NAMES.termMin, localHelperArr, key, i[key])
                }
                if (key === 'termMax') {
                    localHelperFunc(TEMPLATE_INPUT_NAMES.termMax, localHelperArr, key, i[key])
                }
                if (key === 'rate') {
                    localHelperFunc(TEMPLATE_INPUT_NAMES.rate, localHelperArr, key, i[key])
                }
            }
            return i
        }
            return i
        })
        return localHelperArr
    }

    return (
        <div>
            <Header/>
            <main>
                <div className="container">
                    <section className="bar-main_area">
                        <section className="bar">
                            <div className="bar-button">
                                <button
                                    onClick={createProduct}
                                >Создать продукт
                                </button>
                            </div>
                            {productList().map(data => {
                                return <Product
                                    active={active}
                                    selectProduct={selectProduct}
                                    key={nanoid()}
                                    data={data}
                                />
                            })}
                        </section>
                        <section className="main">
                            {
                                active ?
                                    <>
                                        {
                                            productList().map(([name, , id]) => { if (id === active) {
                                                return <EditProduct
                                                    nameEdit={name}
                                                    key={nanoid()}
                                                    changProduct={changProduct}
                                                    product={fieldProduct()}
                                                />
                                            } return []
                                            })
                                        }
                                        <button
                                            onClick={saveProduct}
                                            className="main-button"
                                        >Сохранить
                                        </button>
                                    </>
                                    :
                                    <h2> Выберите продукт </h2>
                            }
                        </section>
                    </section>
                </div>

            </main>
        </div>
    );
}

export default App;
