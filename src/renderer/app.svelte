<script lang="ts">
    import "./index.css";
    import { categories, transactions } from './store'
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

        const dataObjects = dataArr.map(str => {
            const [date, amount, x, y, description] = str.split(',')
            return {
                date,
                amount,
                description,
                category: null
            }
        })

        transactions.set(dataObjects)
        window.electron.writeToDisk('./data.json', JSON.stringify(dataObjects));
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
            transactions.set(res.data)
            categories.update((categories) => {
                $transactions.forEach((val) => {
                    if (val.category) categories.add(val.category)
                })
                return categories
            })
        }
        else console.log(res.message)
    })

    onMount(() => {
        window.electron.readFromDisk('./data.json')
    })
  
  </script>
  
  <div class="p-8 h-full w-full bg-slate-900 text-white">
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div
        class="bg-green-500 h-32 w-32 rounded my-4"
        on:drop={handleDrop}
        on:dragover={(ev) => { ev.preventDefault() }} />
    <Breakdown />
    <Categories />
    <History />
  </div>