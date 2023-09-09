function App() {

        return (
        <ReactRouterDOM.BrowserRouter>
            <div className="container-fluid">
            <ReactRouterDOM.Route exact path="/">
                <LoginPage />
            </ReactRouterDOM.Route>
            <ReactRouterDOM.Route exact path="/home">
                <HomePage />
            </ReactRouterDOM.Route>    
            </div>      
        </ReactRouterDOM.BrowserRouter>
        );
    }


ReactDOM.render(<App />, document.querySelector('#root'));
