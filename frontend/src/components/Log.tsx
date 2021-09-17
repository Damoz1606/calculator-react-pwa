import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { User } from '../interfaces/user';
import * as calculatorService from '../services/calculator.service'
import * as tokeninterceptor from '../services/tokeninterceptor'

interface Props {
    eventAfterLog: (args: any) => void,
    setLogState: (args: any) => void
}

function Log(props: Props) {

    const [hasAccount, sethasAccount] = useState<boolean>(true);
    const [user, setuser] = useState<User>({ username: "", password: "" });

    const clearUser = () => {
        setuser({ username: "", password: "" });
    }
    
    const onAccountClicked = () => {
        sethasAccount(!hasAccount);
        clearUser();
    }

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setuser({...user, [event.target.name]: event.target.value});
    }

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(user.username === "" || user.password === "") return;
        let res: any;
        if(hasAccount) {
            res = (await calculatorService.signin(user)).data;
        } else {
            res = (await calculatorService.signup(user)).data;
        }
        if(res.token) {
            tokeninterceptor.saveToken(res.token);
            props.eventAfterLog(null);
            props.setLogState(true);
        }
        clearUser();
    }

    useEffect(() => {
        clearUser();
    }, [])

    return (
        <>
            {
                (hasAccount) ?
                    <div className="container position-relative">
                        <h6 className="text-center mb-3">Sign in</h6>
                        <form action="" onSubmit={onSubmit}>
                            <div className="form-group mb-2">
                                <input type="text" name="username" onChange={onChange} value={user.username} className="form-control" placeholder="Username" />
                            </div>
                            <div className="form-group mb-2">
                                <input type="password" name="password" onChange={onChange} value={user.password} className="form-control" placeholder="Password" />
                            </div>
                            <button className="btn btn-primary btn-primary-hover block">Sign in</button>
                        </form>
                        <a className="link link-primary" onClick={onAccountClicked}>You don't have an account?</a>
                    </div>
                    :
                    <div className="container position-relative">
                        <h6 className="text-center mb-3">Sign up</h6>
                        <form action="" onSubmit={onSubmit}>
                            <div className="form-group mb-2">
                                <input type="text" name="username" onChange={onChange} value={user.username} className="form-control" placeholder="Username" />
                            </div>
                            <div className="form-group mb-2">
                                <input type="password" name="password" onChange={onChange} value={user.password} className="form-control" placeholder="Password" />
                            </div>
                            <button className="btn btn-primary btn-primary-hover block">Sign up</button>
                        </form>
                        <a className="link link-primary" onClick={onAccountClicked}>You already have an account?</a>
                    </div>
            }
        </>
    )
}

export default Log
