import React from "react";
import { Link, useParams } from "react-router-dom";
import Footer from "../../componentes/Footer";
import swal from "sweetalert2";
import Navbar from "../../componentes/Navbar";
import SidebarContainer from "../../componentes/SidebarContainer";
import ContentHeader from "../../componentes/ContentHeader";
import APIInvoke from "../../utils/APIInvoke";
import { useEffect, useState } from "react";

const VerCategorias = () => {
    const [ventas, setVentas] = useState([]);



    const cargarCategorias = async () => {
        try {
            var response = await APIInvoke.invokeGET(`/categorias`);
            console.log('Respuesta de la API:', response); // Verifica la respuesta de la API

            if (Array.isArray(response) && response.length > 0) {
                setVentas(response);
            } else {
                console.error('La respuesta de la API no contiene categorias.');
            }
        } catch (error) {
            console.error('Error al cargar los categorias:', error);
        }
    };

    useEffect(() => {
        cargarCategorias();
    }, []);

    const eliminarCategoria = async (e, id) => {
        e.preventDefault();
        const verificarExistenciaCategoria = async (id) => {
            try {
                const response = await APIInvoke.invokeGET(
                    `/categorias?id=${id}`
                );
                if (response && response.length > 0) {
                    return true; // El usuario ya existe
                }
                return false; // El usuario no existe
            } catch (error) {
                console.error(error);
                return false; // Maneja el error si la solicitud falla
            }
        };

        const categoriaExistente = await verificarExistenciaCategoria(id);

        if (categoriaExistente) {
            const response = await APIInvoke.invokeDELETE(`/categorias/${id}`);
            const msg = "categoria Eliminada Correctamente";
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
            cargarCategorias();
        } else {
            const msg = "La categoria No Pudo Ser Eliminado";
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
                titulo={"Listado de categorías"}
                breadCrumb1={"Inicio"}
                breadCrumb2={"Categorías"}
                ruta1={"/menu"}
            />
            <section className="content">
                <div className="card">
                    <div className="card-header">
                    <h3 className="card-title"><Link to={"/crearCategorias"} className="btn btn-block btn-primary btn-sm">Registrar categoría</Link></h3>
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
                                    <th style={{ width: '10%' }}>Nombre</th>
                                    <th style={{ width: '10%' }}>Opciones</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                    ventas.map(item =>
                                        <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.nombre}</td>
                                            <Link to={`/EditarCategorias/${item.id}@${item.nombre}`} className="btn btn-sm btn-primary">Editar</Link> &nbsp;&nbsp;
                                            <button onClick={(e) => eliminarCategoria(e, item.id)} className="btn btn-sm btn-danger">Borrar</button>
                                            </tr>
                                    )}
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

export default VerCategorias;