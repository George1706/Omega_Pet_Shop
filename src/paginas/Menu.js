import React, { useState, useEffect } from "react";
import Navbar from "../componentes/Navbar";
import SidebarContainer from "../componentes/SidebarContainer";
import ContentHeader from "../componentes/ContentHeader";
import Footer from "../componentes/Footer";
import { Link } from "react-router-dom";
import "../css/menu.css"
import APIInvoke from "../utils/APIInvoke";
const Menu = () => {

  return (
    <div className="wrapper">
      <Navbar></Navbar>
      <SidebarContainer></SidebarContainer>
      <div className="content-wrapper">
        <ContentHeader
          titulo={"Panel de Administrador"}
          breadCrumb1={"Inicio"}
          breadCrumb2={"Panel de Administrador"}
          ruta1={"/Menu"} 
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
                  <Link to={"/ProyectosAdmin"} className="small-box-footer">
                    Crear tiendas <i className="fas fa-arrow-circle-right"></i>
                  </Link>
                </div>
              </div>

              <div className="col-lg-7 col-8">
                <div className="small-box bg-rosado-clarito">
                  <div className="inner">
                    <h3>Categoría</h3>
                    <p>&nbsp;</p>
                  </div>
                  <div className="icon">
                    <i className="fas fa-laptop animar-categoria"></i>
                  </div>
                  <Link to={"/VerCategoria"} className="small-box-footer">
                    Crear categoría <i className="fas fa-arrow-circle-right"></i>
                  </Link>
                </div>
              </div>
              <div className="col-lg-7 col-8">
                <div className="small-box bg-rosado-oscuro">
                  <div className="inner">
                    <h3>Pedidos</h3>
                    <p>&nbsp;</p>
                  </div>
                  <div className="icon icon-container">
                    <i className="fas fa-truck mover"></i> 
                  </div>
                  <Link to={"/VerPedidos"} className="small-box-footer">
                    Ver pedidos <i className="fas fa-arrow-circle-right"></i>
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

export default Menu;