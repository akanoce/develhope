import React, { PureComponent } from 'react';
import { AreaChart, LineChart, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export type PriceChartProps = { [key: string]: (number | string) }[]

type Props = {
    lines?: EnabledChartLines,
    data: PriceChartProps
}

type EnabledChartLines = {
    value: string,
    color: string
}[]


export default function ({ lines, data }: Props) {

    return (
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart
                // width={500}
                // height={400}
                data={data}
                margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                {lines && lines.map(line => {
                    return <Area type="monotone" dataKey={line.value} stroke={line.color} fill={line.color} />
                })}
                <Legend />

            </AreaChart>
        </ResponsiveContainer>
    );
}
