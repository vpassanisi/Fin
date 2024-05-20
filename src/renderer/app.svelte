<script lang="ts">
    import "./index.css";
    import { categories, categoryMap, monthFilter, transactionsMap } from './store'
    import History from './History.svelte'
    import Categories from './Categories.svelte'
    import { onMount } from "svelte";
    import { monthMap, saveTransactions } from "./utils";
    import Breakdown from "./Breakdown.svelte";
    import { transaction } from "./types";

    async function handleDrop(e: DragEvent) {
        e.preventDefault()

        const file = e.dataTransfer?.items[0]

        if (file === undefined || file.kind !== 'file') return console.log('no file')
        const data = (await file.getAsFile()?.text())?.replaceAll('"', '')

        if (data === undefined) return console.log('failed to read file')
        const dataArr = data.split('\n').filter(val => !!val)

        const transMap = dataArr.reduce<Record<string, transaction[]>>((prev, cur) => {
            const [date, amount, x, y, description] = cur.split(',')
            if (!date || !amount || !description) {
                console.error('failed to parse transaction')
                return prev
            }

            const [month, day, year] = date.split("/");
            if (!month || !year) {
                console.error('failed to parse date')
                return prev
            }

            const monthCode = `${monthMap[month]} ${year}`
            const exists = prev[monthCode]
            const transObj = {
                date,
                amount,
                description,
                category: null
            }

            if (!exists) prev[monthCode] = [transObj]
            else exists.push(transObj)

            return prev
        } , {})

        transactionsMap.set(transMap)
        saveTransactions(transMap)
    }

    window.electron.onWriteResponse((res) => {
        if (res.success) {
            console.log('File written successfully!')
        } else {
            console.log(`Error: ${res.message}`)
        }
    })

    window.electron.onReadFromFile(res => {
        if (res.success) {
            transactionsMap.set(res.data)
            categories.update((categories) => {
                for (const [key, value] of Object.entries($transactionsMap)) {
                    value.forEach(val => {
                        if (val.category) categories.add(val.category)
                    })
                }
                return categories
            })
            monthFilter.set(Object.keys($transactionsMap)[0]!)
        }
        else console.log(res.message)
    })

    onMount(() => {
        window.electron.readFromDisk('./data.json')
    })
  
  </script>
  
  <div class="p-8 h-full w-full bg-slate-900 text-white">
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div
        class="bg-green-500 h-32 w-32 rounded my-4"
        on:drop={handleDrop}
        on:dragover={(ev) => { ev.preventDefault() }}
        on:click={() => console.log($categoryMap)} />
    <Breakdown />
    <Categories />
    <History />
  </div>