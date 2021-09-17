import { Box, Drawer, Modal, Paper, TextField } from '@material-ui/core'
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import Appbar from '../components/Appbar'
import Graph from '../components/Graph'
import History from '../components/History'
import { Calculator } from '../lib/utils'
import * as tokeninterceptor from '../services/tokeninterceptor';
import * as calculatorService from '../services/calculator.service';
import Log from '../components/Log'

function CalculatorDesktop() {

    const [width, setwidth] = useState<number>(window.innerWidth * 0.95)
    const [height, setheight] = useState<number>(window.innerHeight * 0.85)
    const [realoadGraph, setrealoadGraph] = useState<boolean>(false)
    const [historyDrawerState, sethistoryDrawerState] = useState<boolean>(false);
    const [userModalState, setuserModalState] = useState<boolean>(false);
    const [field, setfield] = useState<string>("");
    const [solution, setsolution] = useState<string>("0");
    const [functionGraph, setfunctionGraph] = useState("0");
    const [history, sethistory] = useState<any[]>([]);

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
    }, [isLogged]);

    const getHistory = async () => {
        const res = (await calculatorService.getUser()).data;
        console.log(res.history);
        sethistory(res.history);
    }

    const appendEntry = async () => {
        const res = (await calculatorService.postHistoryEntry(`${field}=${solution}`)).data;
        sethistory(res.history);
    }

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setfield(event.target.value);
    }

    const onSignOut = () => {
        setisLogged(false);
        tokeninterceptor.deleteToken();
    }

    const onSolveClicked = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
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
            setfield("");
        } else {
            setsolution("Invalid expression");
        }
    }


    const handleResize = () => {
        setrealoadGraph(true);
        setwidth(window.innerWidth * 0.95)
        setheight(window.innerHeight * 0.85);
        setrealoadGraph(false);
    }

    return (
        <>
            <Paper square className="w-screen h-screen d-flex flex-column">
                <Appbar eventSignout={onSignOut} islogged={isLogged} displayButton={{ history: isLogged, plot: false, user: true }} eventGraph={() => {}} eventHistory={sethistoryDrawerState} eventUser={setuserModalState} />
                <Drawer anchor={'left'} open={historyDrawerState} onClose={() => sethistoryDrawerState(false)}>
                    <History history={history} />
                </Drawer>
                <div className="px-4 d-flex overflow-hidden">
                    {
                        !realoadGraph && <Graph fn={functionGraph} xAxis={[-5, 5]} yAxis={[-5, 5]} width={width} height={height} disableTitle={true} />
                    }
                </div>
                <form onSubmit={onSolveClicked} method="POST" className="position-absolute bottom w-100">
                    <hr />
                    <TextField value={field} onChange={onChange} className="calculator-input" placeholder="Input" InputProps={{ disableUnderline: true }} />
                </form>
                {
                    solution !== "" && <div className="position-fixed solution-card position-middle"><Paper square><div className="solution-text-field p-2">Solution: {solution}</div></Paper></div>
                }
            </Paper>
            <Modal open={userModalState} onClose={() => setuserModalState(false)} >
                <Paper square className="container mx-auto d-flex justify-content-center vertical-middle p-4 m-4">
                    <Log eventAfterLog={() => setuserModalState(false)} setLogState={setisLogged} />
                </Paper>
            </Modal>
        </>
    )
}

export default CalculatorDesktop
