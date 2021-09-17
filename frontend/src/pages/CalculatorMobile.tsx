import { Drawer, TextField } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import Appbar from '../components/Appbar'
import Graph from '../components/Graph'
import History from '../components/History'
import Keyboard from '../components/Keyboard'
import Log from '../components/Log'
import { Calculator } from '../lib/utils'
import * as tokeninterceptor from '../services/tokeninterceptor';
import * as calculatorService from '../services/calculator.service';

function CalculatorMobile() {

    const [historyDrawerState, sethistoryDrawerState] = useState<boolean>(false);
    const [graphDrawerState, setgraphDrawerState] = useState<boolean>(false);
    const [userDrawerState, setuserDrawerState] = useState<boolean>(false);
    const [field, setfield] = useState<string>("");
    const [solution, setsolution] = useState<string>("0");
    const [functionGraph, setfunctionGraph] = useState("");
    const [history, sethistory] = useState<any[]>([]);
    const [width, setwidth] = useState<number>(window.innerWidth * 0.87)
    const [height, setheight] = useState<number>(600)

    const [isLogged, setisLogged] = useState<boolean>(false);

    useEffect(() => {
        setisLogged(tokeninterceptor.loggedIn());
        window.addEventListener('resize', handleResize);
        handleResize();
        if (isLogged) {
            getHistory();
        }

        return () => {
            window.addEventListener('resize', () => { });
        }
    }, [isLogged])

    const getHistory = async () => {
        const res = (await calculatorService.getUser()).data;
        console.log(res.history);
        sethistory(res.history);
    }

    const appendEntry = async () => {
        const res = (await calculatorService.postHistoryEntry(`${field}=${solution}`)).data;
        sethistory(res.history);
    }

    const onKeyboardClicked = (data: string) => {
        setfield(`${field}${data}`);
    }

    const onErased = () => {
        if (field.length > 0) {
            setfield(field.slice(0, -1));
        }
    }

    const onClearField = () => {
        setfield("");
        setsolution("0");
    }

    const onSignOut = () => {
        setisLogged(false);
        tokeninterceptor.deleteToken();
    }

    const onSolveClicked = () => {
        const calculator = new Calculator();
        if (field === "") {
            setsolution("There is not an entry");
        } else if (calculator.check_expression(field)) {
            const variable = calculator.get_variable(field);
            const postfix = calculator.postfix(field);
            if (variable) {
                setfunctionGraph(field);
                setsolution("The graph is already done");
            } else {
                setsolution(calculator.solve_postfix(postfix).toString());
                setfunctionGraph(field);
            }
            appendEntry();
        } else {
            setsolution("Invalid expression");
        }
    }

    const handleResize = () => {
        setwidth(window.innerWidth * 0.87)
    }

    return (
        <>
            <Appbar eventSignout={onSignOut} islogged={isLogged} displayButton={{ history: isLogged, plot: true, user: true }} eventGraph={setgraphDrawerState} eventHistory={sethistoryDrawerState} eventUser={setuserDrawerState} />
            <TextField className="calculator-input" value={field} InputProps={{ readOnly: true, disableUnderline: true }} />
            <div className="solution-text-field p-2">{solution}</div>
            <div className="container p-0 m-0">
                <div className="keyboard-mobile">
                    <Keyboard eventSolve={onSolveClicked} eventClear={onClearField} eventDelete={onErased} eventKeyClicked={onKeyboardClicked} />
                </div>
            </div>
            <Drawer anchor={'left'} open={historyDrawerState} onClose={() => sethistoryDrawerState(false)}>
                <div className="mx-2">
                    <History history={history} />
                </div>
            </Drawer>
            <Drawer anchor={'right'} open={graphDrawerState} onClose={() => setgraphDrawerState(false)}>
                <div className="mx-2">
                    <Graph fn={functionGraph} xAxis={[-5, 5]} yAxis={[-5, 5]} width={width} height={height} />
                </div>
            </Drawer>
            <Drawer anchor={'right'} open={userDrawerState} onClose={() => setuserDrawerState(false)}>
                <div className="container mx-auto d-flex justify-content-center vertical-middle">
                    <Log eventAfterLog={() => setuserDrawerState(false)} setLogState={setisLogged} />
                </div>
            </Drawer>

        </>
    )
}

export default CalculatorMobile
