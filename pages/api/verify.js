// import { BaseClient } from '@xata.io/client';
const Paystack = require('paystack')(process.env.SECRET_KEY)

export default async function handler(req, res) {
    const { trxref } = req.body
    // console.log(amount)
    // res.status(200).json({ data: req.body })
    try {
        const transactionStatus = await Paystack.transaction.verify(`${trxref}`)
        console.log(transactionStatus, Date.now());

        res.status(200).json(transactionStatus.data)
    } catch (err) {
        console.log(err, Date.now());
        res.status(500).json({ message: `${err}` })
    }
}