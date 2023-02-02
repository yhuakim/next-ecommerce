import { useRouter } from "next/router"
import { useEffect, useState } from "react"


export default function Verify() {
    const [status, setStatus] = useState({
        success: '',
        message: ''
    })

    const router = useRouter()
    const { reference } = router.query

    useEffect(() => {
        async function fetchData() {
            const res = await fetch('/api/verify', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ reference })
            })

            const data = await res.json()
            setStatus({
                success: data.status,
                message: data.gateway_response
            })

        }
        fetchData()
    }, [])
    return (
        <>
            <div className="flex flex-col items-center justify-center w-full h-screen mx-auto">
                {
                    status.success === 'success' ? <div>
                        <div className={"overflow-x-hidden overflow-y-auto md:inset-0 md:h-full"}>
                            <div className="relative w-full h-full max-w-lg md:h-auto">
                                <div className="relative rounded-lg shadow">
                                    <button type="button" onClick={() => router.replace("/")} className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                        <span className="sr-only">Close modal</span>
                                    </button>
                                    <div className="p-6 text-center ">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#A1D704" className="w-20 h-20 mx-auto">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <div className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                            <p>{status.message}</p>
                                            <p>Your Payment has been recieved!</p>
                                            <p>Than you 🎉🎉🎉</p>
                                        </div>
                                        <button type="button" onClick={() => router.replace("/")} className={"text-white bg-teal-600 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"}>
                                            Continue Shopping
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> : ''
                }
            </div>
        </>
    )
}