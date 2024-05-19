import  { writable, derived} from 'svelte/store'
import { monthMap } from './utils'
import type { transaction, month, category } from './types'

export const transactions = writable<transaction[]>([])

export const months = derived(
    transactions,
    (val) => val.reduce<month[]>(
        (prev, cur, i) => {
            const [month, day, year] = cur.date.split('/')
            const monthObj: month = {
                name: `${monthMap[month]} ${year}`,
                value: month
            }
            if (!prev.find(x => x.value === month)) prev.push(monthObj)
            return prev
        },
        []
    )
)

export const monthFilter = writable<month | null>(null)

export const filteredTransactions = derived(
    [transactions, months, monthFilter],
    (val) => {
        const [transactions, months, monthFilter] = val
        return transactions.filter(val => {
            const [month, day, year] = val.date.split('/')
            if (!monthFilter || month === monthFilter.value) return val
        })
    },
    []
)

export const categories = writable<category[]>([])

// export const categories = derived(
//     filteredTransactions,
//     (val) => {
//         return val.reduce<category[]>((prev, cur) => {
//             const { category } = cur
//             if (!category) return prev

//             const exists = prev.find(val => val.name === category)
//             if (exists) exists.transactions.push(cur)
//             else {
//                 prev.push({
//                     name: category,
//                     transactions: []
//                 })
//             }
//             return prev
//         },
//         [])
//     },
//     []
// )
