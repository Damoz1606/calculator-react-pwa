import React from 'react'
import { Button } from '@material-ui/core'
import { BackspaceOutlined } from '@material-ui/icons'

interface Props {
    eventClear: () => void,
    eventDelete: () => void,
    eventKeyClicked: (arg: any) => void,
    eventSolve: () => void
}

function Keyboard(props: Props) {

    const onButtonClicked = (event: any) => {
        props.eventKeyClicked(event.currentTarget.value);
    }

    return (
        <div className="container d-flex justify-content-center flex-column">
            <div className="d-flex flex-row mx-auto w-100">
                <Button className="btn square btn-primary btn-bold btn-rounded" onClick={props.eventClear}>AC</Button>
                <Button className="btn square btn-primary btn-bold btn-rounded" onClick={props.eventDelete}><BackspaceOutlined /></Button>
                <Button className="btn square btn-primary btn-bold btn-rounded" value="^2" onClick={onButtonClicked}>^</Button>
                <Button className="btn square btn-primary btn-bold btn-rounded" value="/" onClick={onButtonClicked}>/</Button>
            </div>
            <div className="d-flex flex-row mx-auto w-100">
                <Button className="btn square btn-calculator btn-rounded" value="7" onClick={onButtonClicked}>7</Button>
                <Button className="btn square btn-calculator btn-rounded" value="8" onClick={onButtonClicked}>8</Button>
                <Button className="btn square btn-calculator btn-rounded" value="9" onClick={onButtonClicked}>9</Button>
                <Button className="btn square btn-primary btn-bold btn-rounded" value="*" onClick={onButtonClicked}>*</Button>
            </div>
            <div className="d-flex flex-row mx-auto w-100">
                <Button className="btn square btn-calculator btn-rounded" value="4" onClick={onButtonClicked}>4</Button>
                <Button className="btn square btn-calculator btn-rounded" value="5" onClick={onButtonClicked}>5</Button>
                <Button className="btn square btn-calculator btn-rounded" value="6" onClick={onButtonClicked}>6</Button>
                <Button className="btn square btn-primary btn-bold btn-rounded" value="-" onClick={onButtonClicked}>-</Button>
            </div>
            <div className="d-flex flex-row mx-auto w-100">
                <Button className="btn square btn-calculator btn-rounded" value="1" onClick={onButtonClicked}>1</Button>
                <Button className="btn square btn-calculator btn-rounded" value="2" onClick={onButtonClicked}>2</Button>
                <Button className="btn square btn-calculator btn-rounded" value="3" onClick={onButtonClicked}>3</Button>
                <Button className="btn square btn-primary btn-bold btn-rounded" value="+" onClick={onButtonClicked}>+</Button>
            </div>
            <div className="d-flex flex-row mx-auto w-100">
                <Button className="btn square btn-primary btn-bold btn-rounded" value="x" onClick={onButtonClicked} >x</Button>
                <Button className="btn square btn-calculator btn-rounded" value="0" onClick={onButtonClicked}>0</Button>
                <Button className="btn square btn-calculator btn-rounded" value="." onClick={onButtonClicked}>.</Button>
                <Button className="btn square btn-primary btn-bold btn-rounded" onClick={props.eventSolve}>=</Button>
            </div>
        </div>
    )
}

export default Keyboard
