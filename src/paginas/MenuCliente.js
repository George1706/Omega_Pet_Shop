import React from "react";
import { Link } from "react-router-dom";
import ContentHeader from "../componentes/ContentHeader";
import Navbar from "../componentes/Navbar";

import Footer from "../componentes/Footer";
import SidebarContainerClientes from "../componentes/SidebarContainerClientes";
import "../css/menu.css"
const MenuClientes = () => {
    return (
    <div className="wrapper">
        <Navbar></Navbar>
        <SidebarContainerClientes></SidebarContainerClientes>
        <div className="content-wrapper">
        <ContentHeader
            titulo={"Panel para Clientes"}
            breadCrumb1={"Inicio"}
            breadCrumb2={"Panel para Clientes"}
            ruta1={"/menuClientes"} 
        />
        <section className="content">
            <div className="container-fluid">
            <div className="row">
                <div className="col-lg-7 col-8">
                <div className="small-box bg-rosado-oscuro">
                    <div className="inner">
                    <h3>Tiendas</h3>
                    <p>&nbsp;</p>
                    </div>
                    <div className="icon">
                    <i className="fas fa-shopping-bag animar-tienda"></i>
                    </div>
                    <Link to="/VerTiendas" className="small-box-footer">
                    Ver Tiendas <i className="fas fa-arrow-circle-right"></i>
                    </Link>
                </div>
                </div>
            </div>
            </div>
        </section>
        </div>

        <Footer></Footer>
    </div>
    );
};

export default MenuClientes;