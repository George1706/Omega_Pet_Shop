import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    const listItemStyle = {
        fontSize: "20px", // Tamaño de fuente más grande
        marginBottom: "10px", // Espacio entre elementos más grande
    };
    
    return (
        <nav className="mt-2">
            <ul
                className="nav nav-pills nav-sidebar flex-column"
                data-widget="treeview"
                role="menu"
                data-accordion="false"
            >
                <li className="nav-item" style={listItemStyle}>
                    <Link to={"/Menu"} className="nav-link">
                        <i className="nav-icon fas fa-home" />
                        <p>Inicio</p>
                    </Link>
                </li>

                <li className="nav-item" style={listItemStyle}>
                    <Link to={"/ProyectosAdmin"} className="nav-link">
                        <i className="nav-icon fas fa-shopping-bag" />
                        <p>Tiendas</p>
                    </Link>
                </li>

                <li className="nav-item" style={listItemStyle}>
                    <Link to={"/VerCategoria"} className="nav-link">
                        <i className="nav-icon fas fa-laptop" />
                        <p>Categorias</p>
                    </Link>
                </li>
                <li className="nav-item" style={listItemStyle}>
                    <Link to={"/VerPedidos1"} className="nav-link">
                        <i className="nav-icon fas fa-truck" />
                        <p>Ver Pedidos</p>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default Home;