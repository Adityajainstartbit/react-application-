
// import { NavLink } from 'react-router-dom';
//  import classes from './Navigation.module.css'
import React, { useState } from 'react';
import { Form, Link,useRouteLoaderData } from "react-router-dom";

       

function MainNavigation() {
   
  const token = useRouteLoaderData('root');

  
  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: "hsl(0, 0%, 18.82%)" }}>

  
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        
      <li className="nav-item active">
          <Link className="nav-link" to="/">Home </Link>
        </li>
      {token && (
        <li className="nav-item active">
          <Link className="nav-link" to="/Products">Products </Link>
        </li>
      )}
       { !token && (<li className="nav-item active">
          <Link className="nav-link" to="/auth?mode=login">Authorization </Link>
        </li>)}

        { token && (
          <li className="nav-item active">
          <Form action='/logout' method="post">
            <button className="nav-link" >
            Logout
            </button>
          </Form>
          </li>
        )}
       
       
      </ul>
    </div>
  </nav>
  
  
  );
}

export default MainNavigation;
