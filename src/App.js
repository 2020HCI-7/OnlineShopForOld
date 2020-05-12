import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import LoginController from "./pages/login/LoginController";
import RegisterController from "./pages/register/RegisterController";
import AdminController from "./pages/admin/AdminController";
import DealerController from "./pages/dealer/DealerController";

import "antd/dist/antd.css";

function App() {
  return (
    <div className="App">
        <Router>
            <Switch>
              <Route exact path="/" component={LoginController} />
              <Route path="/register" component={RegisterController} />
              <Route path="/admin" component={AdminController} />
              <Route path="/dealer" component={DealerController}/>
                {/* <Route path="/super_admin" component={SuperAdminController}/>
                <Route path="/consumer_admin" component={ConsumerAdminController}/>
                <Route path="/dealer_admin" component={DealerAdminController}/>
                <Route path="/customer_service" component={CustomerServiceController}/>
                <Route path="/dealer" component={DealerController}/> */}
            </Switch>
        </Router>
    </div>
  );
}

export default App;
