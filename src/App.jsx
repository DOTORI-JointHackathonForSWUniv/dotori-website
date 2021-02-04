import { Route, Switch, BrowserRouter } from "react-router-dom";
import React, { lazy, Suspense } from "react";
import Loading from "./loading";

const Login = lazy(() => import("./components/login"));
// const Loading = lazy(() => import("./components/loading"));

function App() {
    return (
        <BrowserRouter>
            <Suspense fallback={<Loading />}>
                <Switch>
                    <Route path="/login" component={Login} exact></Route>
                    {/* <Route path={['/login', 'sign']} component={Login}></Route> */}
                    <Route render={({ location }) => <div>이 페이지는 존재하지 않습니다:{location.pathname}</div>}></Route>
                </Switch>
            </Suspense>
        </BrowserRouter>
    );
}

export default App;
