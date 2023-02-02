import { useRouter } from "next/router"
import { useState } from "react"


export default function Modal({ modal, title, quantity, amount, setModal }) {
    const [input, setInput] = useState('')
    const [emailValid, setEmailValid] = useState(false)
    const [close, setClose] = useState(false)
    const router = useRouter()

    const handleChange = (e) => {
        const value = e.target.value
        setInput(value)
    }

    const buyNow = async () => {
        let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (input.match(mailformat)) {
            setEmailValid(true)
            console.log('yay! that is valid mail');
            try {
                const res = await fetch('/api/pay', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ amount, email: input })
                })
                const url = await res.json()
                console.log(url)
                router.replace(url.data.authorization_url)
            } catch (error) {
                console.log(error.message)
            }
        } else {
            setEmailValid(false)
            console.log('invalid Email');
        }
    }

    return (
        <>
            <div id="popup-modal" className={`${modal ? "left-96 top-56  z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full translate-x-25 transition ease-in-out duration-1000" : "translate-x-[-1000rem] transition ease-in-out duration-1000"}`}>
                <div className="relative w-full h-full max-w-md md:h-auto">
                    <div className="relative bg-slate-800 rounded-lg shadow">
                        <button type="button" onClick={() => setModal(false)} className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                        <div className="p-6 text-center">
                            <svg class="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            <div className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                <p>You are about to buy</p>
                                <div className="">
                                    <p>{title} x {quantity}</p>
                                    <p className="">NGN{Number(amount / 100).toFixed(2)}</p>
                                </div>
                                <p className="">Please Enter your Email below to continue</p>
                                <div className="mt-4">
                                    <input type="email" onChange={handleChange} value={input} />
                                </div>
                            </div>
                            <button type="button" onClick={buyNow} disabled={input === ''} className={`${input !== '' ? "text-white bg-teal-600 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2" : "text-white bg-slate-800 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2 d"}`}>
                                Yes, Proceed
                            </button>
                            <button type="button" onClick={() => setModal(false)} className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">No, cancel</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`${modal ? "fixed bg-white opacity-75 left-0 top-0 h-screen w-screen z-[-10] translate-y-25 duration-1000 transition ease-in-out" : 'translate-y-[-1000rem] transition ease-in-out duration-1000'}`}></div>
        </>
    )
}