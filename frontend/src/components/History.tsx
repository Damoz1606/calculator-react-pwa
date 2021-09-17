import { Box, Paper } from '@material-ui/core'
import React from 'react'

interface Props {
    history: any[],
    disableTitle?:boolean
}

function History(props: Props) {

    return (
        <Box bgcolor="paper" className="overflow-auto mx-5">
            {
                !props.disableTitle && <div className="my-4"><h6 className="text-center">History</h6></div>
            }
            {
                props.history.map((element: any, key: any) => {
                    return <Paper square className="w-100 d-flex justify-content-center" key={key}>
                        <p className="text-center text-history">{element.entry}</p>
                    </Paper>
                })
            }
        </Box>
    )
}

export default History
