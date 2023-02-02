// import { BaseClient } from '@xata.io/client';
const Paystack = require('paystack')('sk_test_4259255d9a69bb794182c42c9f7b0702aac16716')

export default async function handler(req, res) {
    const { amount, email } = req.body
    console.log(amount)
    // res.status(200).json({ data: req.body })
    try {
        const payUrl = await Paystack.transaction.initialize({
            amount,
            reference: `${Date.now()}`,
            email
        })
        console.log(payUrl, Date.now());

        res.status(200).json({ data: payUrl.data })
    } catch (err) {
        console.log(err.message, Date.now());
        res.status(500).json({ message: `${err.message}` })
    }
}