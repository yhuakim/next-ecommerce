import { MinusIcon, PlusIcon, BagIcon, BuyIcon, Star } from "../components/Icons";
import { useState } from "react"
import Modal from "../components/Modal";

export default function Product({ product }) {
    const { images, thumbnail, title, price, description, category, brand, stock, rating } = product[0]
    const [quantity, setQuantity] = useState(1)
    const [modal, setModal] = useState(false)
    const [amount, setAmount] = useState(0)
    const decrease = () => {
        if (quantity === 1) {
            return
        } else {
            setQuantity(quantity - 1)
        }
    }

    const buyNow = async () => {
        const amountTotal = Number(quantity * price * 100)
        setAmount(amountTotal)
        setModal(true)
        // try {
        //     const res = await fetch('/api/pay', {
        //         method: 'POST',
        //         headers: {
        //             "Content-Type": "application/json"
        //         },
        //         body: JSON.stringify({ amount })
        //     })
        // } catch (error) {
        //     console.log(error.message)
        // }
    }

    const addToCart = () => {
        console.log()
    }

    return (
        <div className="grid grid-cols-1 content-center relative">
            <section className="max-w-5xl mx-auto grid grid-cols-2 gap-x-20 justify-center items-center">
                <div className="">
                    <img src={thumbnail} alt="Product Image" className="w-full h-[20rem]" />
                    <div className="w-full">
                        {
                            images.forEach((i) => {
                                // console.log(`"${i}"`);
                                <img src={`"${i}"`} alt="Sample images" className="w-48" />
                            })
                        }
                    </div>
                </div>
                <div className="flex flex-col text-gray-800 flex-end">
                    <h2 className="text-5xl font-bold">{title}</h2>
                    <p className="text-lg">{category} - {brand}</p>
                    <p className="text-sm flex py-1"><Star />{Math.round(rating)} {''} {`300 sold`} | {stock} stocks left</p>
                    <p className="text-2xl font-semibold py-2">
                        <span className="">NGN {Number(price).toFixed(2)}</span>
                    </p>
                    <div className="flex items-center text-sm font-normal py-5">
                        Quantity:
                        <span onClick={decrease} className="bg-red-400 mx-3 text-gray-50 hover:scale-x-105 hover:cursor-pointer transition-all">
                            <MinusIcon />
                        </span>
                        {quantity}
                        <span onClick={() => setQuantity(quantity + 1)} className="bg-teal-600 ml-3 text-gray-50 hover:scale-x-105 hover:cursor-pointer transition-all">
                            <PlusIcon />
                        </span>
                    </div>
                    <div className="flex justify-between mb-3 py-2">
                        <button title='add to cart' onClick={addToCart} className="bg-red-100 flex items-center space-x-2 py-2 px-16 hover:scale-x-105 transition-all text-gray-800 z-10">
                            <BagIcon /> <span className="">Add Cart</span>
                        </button>
                        <button title='buy now' onClick={buyNow} className="bg-teal-600 flex items-center space-x-2 py-2 px-16 hover:scale-x-105 transition-all text-white z-10">
                            <BuyIcon /> <span className="">Buy Now</span>
                        </button>
                    </div>
                    <p className="text-xl font-normal">{description}</p>
                </div>
            </section>
            <div className="absolute top-44 left-[26rem] z-50">
                <Modal modal={modal} setModal={setModal} quantity={quantity} amount={amount} thumbnail={thumbnail} title={title} />
            </div>
        </div>
    )
}


export async function getStaticPaths() {
    const res = await fetch('https://dummyjson.com/products',
        {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
        }
    )
    let data = await res.json()
    const { products } = data
    const paths =
        products &&
        products.map((prod) => ({
            params: { id: `${prod.id}` }
        }));
    return {
        paths: paths,
        fallback: false
    };
}

export async function getStaticProps({ params }) {
    const res = await fetch('https://dummyjson.com/products',
        {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
        }
    )
    let data = await res.json()
    const { products } = data
    const product =
        products && products.filter((prod) => params.id === `${prod.id}`);

    return {
        props: {
            product
        }
    };
}