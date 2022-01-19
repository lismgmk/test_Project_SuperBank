import './App.css';
import api from "./api/api";
import {useEffect, useRef, useState} from "react";
import Header from "./components/header";
import Product from "./components/product";
import {EditProduct} from "./components/editProduct";
import {nanoid} from "nanoid";
import {TEMPLATE_INPUT_NAMES} from "./constants";

function App() {

    useEffect(() => {
        api().then((data) => {
            setStatusCode(data.status)
            setResponseState('Создайте или выберите продукт')
            return data.json()
        })
            .then(data => setState(data))
        return clearInterval(interval.current)
    }, [])


    const [active, setActive] = useState()
    const [state, setState] = useState([])
    const [responseState, setResponseState] = useState('Загрузка продуктов...')
    const [statusCode, setStatusCode] = useState();
    const errors = useRef()
    const interval = useRef(null)

    useEffect(()=>{
        if(errors.current !== undefined){
            interval.current = setTimeout(()=>{
                setResponseState('Создайте или выберите продукт')
                setStatusCode(null)
            }, 1500)
        }

    }, [errors.current])

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
        state.filter(i => {
            if (i.id === active) {
                return localHelperObj = i
            }
            return i
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
        console.log(state, 'add')
        state.length > 0 ?
            setState([...state, newProductEmpty])
            :
            setState([newProductEmpty])
        setActive(localId)
    }

    const fieldProduct = () => {
        const localHelperArr = []

        const localHelperFunc = (name, arr, key, value) => {
            const nameLabel = [name]
            return arr.push([...nameLabel, key, value])
        }

        state.map((i) => {
            if (i.id === active) {
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
                            {state.length > 0 && productList().map(data => {
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
                                        {state.length > 0 &&
                                        productList().map(([name, , id]) => {
                                            if (id === active) {
                                                return <EditProduct
                                                    nameEdit={name}
                                                    key={nanoid()}
                                                    changProduct={changProduct}
                                                    product={fieldProduct()}
                                                />
                                            }
                                            return []
                                        })
                                        }
                                        <button
                                            onClick={saveProduct}
                                            className="main-button"
                                        >Сохранить
                                        </button>
                                    </>
                                    :
                                    <h2> {responseState} </h2>
                            }
                            {statusCode === 404 && <h5 className={'error-entries'} ref={errors}>Ошибка при загрузке (((</h5>}

                        </section>
                    </section>
                </div>

            </main>
        </div>
    );
}

export default App
