import React from "react";
import Home from "./Home";
import { Link } from "react-router-dom";
import Logo from '../../node_modules/admin-lte/dist/img/AdminLTELogo.png';
import '../css/menu.css'

const SidebarContainer = () => {
    return (
        <aside className="main-sidebar sidebar-dark-custom elevation-4">
            <a href="../../index3.html" className="brand-link">
                <img src={Logo}
                alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} />
                <span className="brand-text font-weight-light">TIENDA</span>
            </a>
            <div className="sidebar">
                <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div className="info">
                        &nbsp;
                    </div>
                    <div className="info">
                        &nbsp;
                    </div>
                    <div className="info">
                        <Link to={"/Menu"} className="d-block">Menú principal</Link>
                    </div>
                </div>
                <div className="form-inline">
                    <div className="input-group" data-widget="sidebar-search">
                        <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
                        <div className="input-group-append">
                            <button className="btn btn-sidebar">
                                <i className="fas fa-search fa-fw" />
                            </button>
                        </div>
                    </div>
                </div>
                <Home></Home>
            </div>
        </aside>
    );
}

export default SidebarContainer;