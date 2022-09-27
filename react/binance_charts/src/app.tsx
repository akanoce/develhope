import { useEffect, useState } from "react"
import AreaChart, { PriceChartProps } from "./compoents/AreaChart"
import { useFetch } from "./hooks/useFetch"
import dayjs from 'dayjs'
import { intervals } from './constants'
import { useLazyFetch } from "./hooks/useLazyFetch"
import { triggerAsyncId } from "async_hooks"


type BinanceKline = [number, string, string, string, string, string, number, string, number, string, string, string]

type ParsedBinanceKline = {
    open: number,
    close: number,
    high: number,
    low: number,
    volume: number,
    openTime: number,
    closeTime: number
}
export default function App() {



    const [parsedData, setParsedData] = useState<ParsedBinanceKline[]>([])
    const [chartData, setChartData] = useState<PriceChartProps>([])
    const [selectedInterval, setSelectedInterval] = useState<string>(intervals[intervals.length - 1])
    const [selectedSymbol, setSelectedSymbol] = useState<string>('BTCBUSD')

    const { data, loading, error, trigger: fetchNewData } = useLazyFetch<BinanceKline[]>('/api/v3/klines?')

    useEffect(() => {
        if (data) {
            const parsedData: ParsedBinanceKline[] = data.map(item => {
                return {
                    open: parseFloat(item[1]),
                    high: parseFloat(item[2]),
                    low: parseFloat(item[3]),
                    close: parseFloat(item[4]),
                    volume: parseFloat(item[5]),
                    openTime: item[0],
                    closeTime: item[6]
                }
            })
            setParsedData(parsedData)
        }

    }, [data])

    useEffect(() => {

        const reqParams = new URLSearchParams({
            symbol: selectedSymbol,
            interval: selectedInterval
        })

        fetchNewData({}, reqParams)

    }, [selectedInterval])


    useEffect(() => {
        setChartData(parsedData.map(item => ({ close: item.close, open: item.open, date: dayjs(item.closeTime).format('DD/MM/YYYY') })))
    }, [parsedData])


    const lines = [
        { value: 'close', color: 'purple' },
        // { value: 'open', color: 'green' },
    ]


    return (
        <div className="w-full h-[50vh] py-2 px-4">
            <div className="flex justify-between items-center w-full my-4">
                <div className="flex flex-col justify-start">
                    <div className="flex gap-2 items-center">
                        <h3 className="font-bold text-xl ">{selectedSymbol} ({selectedInterval}) </h3>
                        {parsedData.length > 2 && (() => {
                            const percDifference = ((parsedData[parsedData.length - 1].close - parsedData[0].close) / parsedData[0].close) * 100
                            return <span className={`px-1 py-2 border border-black rounded ${percDifference > 0 ? 'bg-green-300' : 'bg-red-300'}`}> {percDifference.toFixed(2)}% </span>
                        })()
                        }
                    </div>
                    {parsedData.length > 2 && <h5 className="font-medium text-lg "> Dati dal {dayjs(parsedData[0].closeTime).format('DD/MM/YYYY')} al {dayjs(parsedData[parsedData.length - 1].closeTime).format('DD/MM/YYYY')} </h5>}
                </div>
                <select value={selectedInterval} onChange={(e) => setSelectedInterval(e.target.value)}>
                    {intervals.map((interval, idx) => {
                        return <option key={idx} value={interval}>{interval}</option>
                    })}
                </select>
            </div>
            <AreaChart lines={lines} data={chartData} />
        </div >
    )
}