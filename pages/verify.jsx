import { useRouter } from "next/router"
import { useEffect } from "react"


export default function Verify() {
    const router = useRouter()

    let { reference } = router.query

    console.log(reference)
    console.log(router.route, router.query);

    // useEffect(() => {
    //     async function fetchData() {
    //         const res = await fetch('/api/verify', {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify({ reference })
    //         })
    //     }
    //     fetchData()
    // }, [])
    return (
        <>

        </>
    )
}