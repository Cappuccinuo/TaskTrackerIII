import React from 'react';

export default function Login(props) {
  return <div className="container-fluid">
    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul className="nav navbar-nav navbar-right">
        <li className="dropdown">
          <a href="#" className="dropdown-toggle" data-toggle="dropdown"><b>Login</b> <span className="caret"></span></a>
            <ul id="login-dp" className="dropdown-menu">
            <li>
               <div className="row">
                  <div className="col-md-12">
                    Login
                     <form className="form" role="form" method="post" action="login" id="login-nav">
                        <div className="form-group">
                           <label for="email" className="sr-only">Email address</label>
                           <input type="email" className="form-control" id="exampleInputEmail2" placeholder="Email address" required/>
                        </div>
                        <div className="form-group">
                           <button type="submit" className="btn btn-primary btn-block">Sign in</button>
                        </div>
                     </form>
                  </div>
                  <div className="bottom text-center">
                    New here ? <a href="#"><b>Sign Up</b></a>
                  </div>
               </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>;
}
