import React, { useState, useEffect } from "react";
import Navbar from "../../componentes/Navbar";
import SidebarContainer from "../../componentes/SidebarContainer";
import ContentHeader from "../../componentes/ContentHeader";
import Footer from "../../componentes/Footer";
import APIInvoke from "../../utils/APIInvoke";
import swal from "sweetalert2";
import { Link } from "react-router-dom";

const ProyectosAdmin = () => {

    const [tiendas, setProyectos] = useState([]);

    const cargarTiendas = async () => {
        try {
            var response = await APIInvoke.invokeGET('/tiendas');
            console.log('Respuesta de la API:', response); 

            if (Array.isArray(response) && response.length > 0) {
                setProyectos(response);
            } else {
                console.error('La respuesta de la API no contiene tiendas.');
            }
        } catch (error) {
            console.error('Error al cargar los proyectos:', error);
        }
    };

    useEffect(() => {
        cargarTiendas();
    }, []);

    const eliminarTienda = async (e, id) => {
        e.preventDefault();
        const verificarExistenciaTiendas = async (id) => {
            try {
                const response = await APIInvoke.invokeGET(
                    `/Tiendas?id=${id}`
                );
                if (response && response.length > 0) {
                    return true; 
                }
                return false; 
            } catch (error) {
                console.error(error);
                return false; 
            }
        };

        const tiendaExistente = await verificarExistenciaTiendas(id);

        if (tiendaExistente) {
            const response = await APIInvoke.invokeDELETE(`/Tiendas/${id}`);
            const msg = "Tienda Eliminada Correctamente";
            new swal({
                title: "Informacion",
                text: msg,
                icon: "success",
                buttons: {
                    confirmar: {
                        text: "Ok",
                        value: true,
                        visible: true,
                        className: "btn btn-prymari",
                        closeModal: true,
                    },
                },
            });
            cargarTiendas();
        } else {
            const msg = "La Tienda No Se Pudo Eliminar";
            new swal({
                title: "Error",
                text: msg,
                icon: "error",
                buttons: {
                    confirmar: {
                        text: "Ok",
                        value: true,
                        visible: true,
                        className: "btn btn-danger",
                        closeModal: true,
                    },
                },
            });
        }
    }

    return (
        <div className="wrapper">
            <Navbar></Navbar>
            <SidebarContainer></SidebarContainer>
            <div className="content-wrapper">

                <ContentHeader
                    titulo={"Listado de tiendas"}
                    breadCrumb1={"Inicio"}
                    breadCrumb2={"Tiendas"}
                    ruta1={"/Menu"}
                />
                <section className="content">
                    <div className="card">
                        <div className="card-header">
                        <h3 className="card-title"><Link to={"/PCrear"} className="btn btn-block btn-primary btn-sm">Registrar Tienda</Link></h3>
                            <div className="card-tools">
                        

                                <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
                                <i className="fas fa-minus" />
                                </button>
                                <button type="button" className="btn btn-tool" data-card-widget="remove" title="Remove">
                                    <i className="fas fa-times" />
                                </button>
                            </div>
                        </div>
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th style={{ width: '10%' }}>#</th>
                                        <th style={{ width: '40%' }}>Nombre</th>
                                        <th style={{ width: '35%' }}>Dirección</th>
                                        <th style={{ width: '35%' }}>Telefono</th>
                                        <th style={{ width: '35%' }}>Correo</th>
                                        <th style={{ width: '15%' }}>Opciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        tiendas.map((item) => (
                                            <tr key={item.id}>
                                                <td>{item.id}</td>
                                                <td>{item.nombre}</td>
                                                <td>{item.direccion}</td>
                                                <td>{item.telefono}</td>
                                                <td>{item.correo}</td>            
                                                <td>
                                                    <Link to={`/TAdmin/${item.id}@${item.nombre}@${item.direccion}@${item.telefono}@${item.correo}`} className="btn btn-sm btn-info">Productos</Link> &nbsp;&nbsp;
                                                    <Link to={`/PEditar/${item.id}@${item.nombre}@${item.direccion}@${item.telefono}@${item.correo}`} className="btn btn-sm btn-primary">Editar</Link> &nbsp;&nbsp;
                                                    <button onClick={(e) => eliminarTienda(e, item.id)} className="btn btn-sm btn-danger">Borrar</button>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>


                            </table>
                        </div>
                    </div>

                </section>
            </div>
            <Footer></Footer>
        </div>
    );
}

export default ProyectosAdmin;