import React, { useState }  from 'react';
import auth0Client from "../auth/auth";
import {Link, withRouter} from 'react-router-dom';
import { Button, Dropdown, Menu } from 'semantic-ui-react'
import config from "../../config/authConfig.json";


const Navbar = (props) => {
    let profile = {};
    const [activeItem, setActiveItem] = useState('/');
    const signOut = () => {
        auth0Client.signOut();
        props.history.replace('/');
    };    
    const handleItemClick = (e, { name }) => setActiveItem(name);

    setTimeout(() => {
            const pathname = window.location.pathname;
            const path = pathname === '/' ? 'home' : pathname.substr(1)
            setActiveItem(path);
    },1000)
    if (auth0Client.isAuthenticated()){
        profile = auth0Client.getProfile();
    }

    return (
        <div>
            <nav className="navbar mg-t-10" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <Link className="navbar-item" to="/notes">
                        <img src={process.env.PUBLIC_URL + '/logo192.png'} width="60" height="28" />
                    </Link>
                    <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>
                <div id="navbarBasicExample" className="navbar-menu">
                    {
                        auth0Client.isAuthenticated() && (
                            <div className="navbar-start">
                                <div className="navbar-item has-dropdown is-hoverable">
                                    <a className="navbar-link">
                                        Notes
                                    </a>
                                    <div className="navbar-dropdown">
                                        <Link className="navbar-item" to="/notes">
                                            All Notes
                                        </Link>
                                        <Link className="navbar-item" to={'/notes/archieved'}>
                                            Archieved
                                        </Link>
                                        <Link to="/notes/create" className="navbar-item">
                                            Create
                                        </Link>
                                    </div>
                                </div>
                                <div className="navbar-item has-dropdown is-hoverable">
                                    <a className="navbar-link">
                                        <div>
                                            Todos
                                        </div>
                                    </a>
                                    <div className="navbar-dropdown">
                                        <Link className="navbar-item" to="/todos">
                                            View
                                        </Link>
                                    </div>
                                </div>
                                <div className="navbar-item has-dropdown is-hoverable">
                                    <a className="navbar-link">
                                        <div>
                                            Memos
                                        </div>
                                    </a>
                                    <div className="navbar-dropdown">
                                        <Link className="navbar-item" to="/memos/create">
                                            Create
                                        </Link>
                                        <Link className="navbar-item" to="/memos">
                                            View
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    <div className="navbar-end">
                        <div className="navbar-item">
                            {
                                !auth0Client.isAuthenticated() && (
                                    <div className="buttons mg-10">
                                        <a className="button is-primary" onClick={() => auth0Client.signIn()}>
                                            <strong>Sign in / Sign up</strong>
                                        </a>
                                    </div>

                                )
                            }
                        </div>
                            {
                                auth0Client.isAuthenticated() && (
                                    <div className="navbar-item has-dropdown is-hoverable">

                                        <a className="navbar-link">
                                            <figure className="image profile_image">
                                                <img className="is-rounded" src={profile.picture}/>
                                            </figure>
                                            {profile.nickname}
                                        </a>

                                        <div className="navbar-dropdown">
                                            <a className="navbar-item" onClick={() => {signOut()}}>
                                                Logout
                                            </a>
                                        </div>
                                    </div>
                                )
                            }
                    </div>
                </div>
            </nav>
        </div>
    )

}

export default withRouter(Navbar);