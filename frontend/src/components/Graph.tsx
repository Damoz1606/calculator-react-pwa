import React, { useEffect, useState } from 'react'
import functionPlot from 'function-plot';

interface Props {
    fn: string,
    xAxis: number[],
    yAxis: number[],
    width: number,
    height: number,
    disableTitle?:boolean
}

function Graph(props: Props) {

    const [ratio, setratio] = useState<number>(0)

    const plotFunction = (fn: string) => {
        functionPlot({
            target: "#plot",
            width: props.width,
            height: props.height,
            yAxis: { domain: props.yAxis },
            xAxis: { domain: props.xAxis },
            grid: true,
            data: [{ fn }],
        })
    }

    useEffect(() => {
        // setwidth(document.querySelector("#plot")?.clientWidth as number);
        // setheight(document.querySelector("#plot")?.clientHeight as number);
        if (props.fn !== "") {
            plotFunction(props.fn);
        }
    }, [props.fn])

    return (
        <div className="w-full h-full mx-auto">
            {
                !props.disableTitle && <div className="my-4"><h6 className="text-center">Graph</h6></div>
            }
            <div className="d-flex align-middle ">
                <div id="plot" className="" >
                </div>
            </div>
        </div>
    )
}

export default Graph
