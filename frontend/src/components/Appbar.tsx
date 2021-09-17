import React from 'react'
import { AppBar, Button, Toolbar } from '@material-ui/core';
import { Person, Functions, ExitToApp } from '@material-ui/icons'

interface Props {
    eventHistory: (args: any) => void,
    eventGraph: (args: any) => void,
    eventUser: (args: any) => void,
    displayButton: {
        history: boolean,
        plot: boolean,
        user: boolean
    },
    islogged: boolean,
    eventSignout: () => void
}

function Appbar(props: Props) {

    const onHistoryClicked = () => {
        props.eventHistory(true);
    }

    const onGraphClicked = () => {
        props.eventGraph(true);
    }

    const onUserClicked = () => {
        props.eventUser(true);
    }

    const onSingout = () => {
        props.eventSignout();
    }

    return (
        <AppBar position="static" className="appbar appbar-light">
            <Toolbar>
                <div className="container d-flex flex-row">
                    <div className="ml-0">
                        {
                            props.displayButton.history && <Button onClick={onHistoryClicked} color="inherit" disableRipple={true} className="btn-appbar">History</Button>
                        }
                    </div>
                    <div className="mr-0">
                        <div className="row">
                            <div className="col-auto">
                                {
                                    props.displayButton.plot && <Button onClick={onGraphClicked} color="inherit" disableRipple={true} className="btn-appbar"><Functions /></Button>
                                }
                                {
                                    props.islogged 
                                    ? <Button onClick={onSingout} color="inherit" disableRipple={true} className="btn-appbar"><ExitToApp /></Button>
                                    : <Button onClick={onUserClicked} color="inherit" disableRipple={true} className="btn-appbar"><Person /></Button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </Toolbar>
        </AppBar>
    )
}

export default Appbar
