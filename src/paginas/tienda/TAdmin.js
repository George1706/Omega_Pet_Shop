import React, { useState, useEffect } from "react";
import Navbar from "../../componentes/Navbar";
import SidebarContainer from "../../componentes/SidebarContainer";
import ContentHeader from "../../componentes/ContentHeader";
import Footer from "../../componentes/Footer";
import APIInvoke from "../../utils/APIInvoke";
import swal from "sweetalert2";
import { Link, useParams } from "react-router-dom";

const TAdmin = () => {


    const [productos, setProductos] = useState([]);
    const [categorias, setCategorias] = useState({});

    const { idProyecto } = useParams();
    let arreglo = idProyecto.split('@')
    const idTienda = arreglo[0]
    const nombreTienda = arreglo[1]
    const tituloPag = `Listado de productos: ${nombreTienda}`

    const cargarProductos = async () => {
        try {
            const responseProductos = await APIInvoke.invokeGET(`/productos?idT=${idTienda}`);
            console.log('Respuesta de la API (Productos):', responseProductos);

            const responseCategorias = await APIInvoke.invokeGET('/categorias');
            console.log('Respuesta de la API (Categorías):', responseCategorias);

            if (Array.isArray(responseProductos) && responseProductos.length > 0) {
                setProductos(responseProductos);
                setCategorias(
                    responseCategorias.reduce((acc, categoria) => {
                        acc[categoria.id] = categoria.nombre;
                        return acc;
                    }, {})
                );
            } else {
                console.error('La respuesta de la API no contiene productos.');
            }
        } catch (error) {
            console.error('Error al cargar los productos:', error);
        }
    };

    useEffect(() => {
        cargarProductos();
    }, []);

    const eliminarProducto = async (e, idProducto, idTienda) => { 
        e.preventDefault();
        const verificarExistenciaTarea = async (idProducto) => {
            try {
                const response = await APIInvoke.invokeGET(
                    `/productos?id=${idProducto}`
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

        const productoExistente = await verificarExistenciaTarea(idProducto);

        if (productoExistente) {
            const response = await APIInvoke.invokeDELETE(`/productos/${idProducto}?idT=${idTienda}`);
            const msg = "Producto Eliminado Correctamente";
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
            cargarProductos();
        } else {
            const msg = "El producto No Pudo Ser Eliminado";
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
                    titulo={tituloPag}
                    breadCrumb1={" Listado de proyectos"}
                    breadCrumb2={"Tareas"}
                    ruta1={"/ProyectosAdmin"}
                />
                <section className="content">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">
                                <Link to={`/TCrear/${idTienda}@${nombreTienda}`} className="btn tbn-sm btn-light" style={{ backgroundImage: 'linear-gradient(135deg, #FF69B4, #8A2BE2)', color: 'white' }}>Crear Producto</Link>
                            </h3>
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
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th style={{ width: '15%' }}>#Id Producto</th>
                                        <th style={{ width: '10%' }}>Nombre</th>
                                        <th style={{ width: '10%' }}>Precio</th>
                                        <th style={{ width: '10%' }}>Tienda</th>
                                        <th style={{ width: '10%' }}>Categoría</th>
                                        <th style={{ width: '10%' }}>Descripción</th>
                                        <th style={{ width: '15%' }}>Opciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        productos.map(item =>
                                            <tr key={item.id}>
                                                <td>{item.id}</td>
                                                <td>{item.nombre}</td>
                                                <td>{item.precio}</td>
                                                <td>{nombreTienda}</td>
                                                <td>{categorias[item.idC]}</td> {/* Muestra el nombre de la categoría */}
                                                <td>{item.descripcion}</td>
                                                <td>
                                                    {item.imagenURL && <img src={item.imagenURL} alt={item.nombre} style={{ maxWidth: '100px', maxHeight: '100px' }} />}
                                                    <Link to={`/TEditar/${item.id}@${item.nombre}@${item.precio}@${item.idT}@${item.idC}@${item.descripcion}@${nombreTienda}`} className="btn btn-sm btn-primary ml-2">Editar</Link> &nbsp;&nbsp;
                                                    <button onClick={(e) => eliminarProducto(e, item.id, item.idT)} className="btn btn-sm btn-danger ml-2">Borrar</button>
                                                </td>
                                            </tr>
                                        )
                                    }
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

export default TAdmin;