import React from "react";
import AuthForm from "../../components/auth-form/AuthForm";
import {useSelector} from "react-redux";
import {AppState} from "../../store/ducks";
import {isError, isLoggedIn} from "../../store/ducks/Auth";
import history from "../../routes/history";
import Alert from "../../components/alert/Alert";
import Card from "../../components/card/Card";

const LoginPage = () => {
    const isAuthenticated = useSelector((state: AppState) => isLoggedIn(state));

    return (
        <>
        {isAuthenticated ?
                history.push("/") :
                (
                    <>
                        <div className="o1">
                            <h1 className="text-align-center">
                                Лесников А.А. <br/> P3231
                            </h1>
                        </div>

                        <div className="flex-container">
                            <Card title="WELCOME!">
                                <AuthForm />
                            </Card>
                        </div>
                    </>
                )
        }
        </>
    );
};

export default LoginPage;

