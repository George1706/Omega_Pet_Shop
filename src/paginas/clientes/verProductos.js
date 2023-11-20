import React from "react";
import { Link, useParams } from "react-router-dom";
import Footer from "../../componentes/Footer";
import Navbar from "../../componentes/Navbar";
import SidebarContainerClie from "../../componentes/SidebarContainerClientes";
import ContentHeader from "../../componentes/ContentHeader";
import APIInvoke from "../../utils/APIInvoke";
import { useEffect, useState } from "react";

const VerProductos = () => {
    const [productos, setproductos] = useState([]);
    const { idProducto } = useParams();

    let arreglo = idProducto.split('@');
            const idTienda = arreglo[0];
            var nombreTien = arreglo[1];
            const tituloPag = `Listado de productos: ${nombreTien}`
            console.log(nombreTien);

    useEffect(() => {
        if (idProducto) {
            

            const cargarProductos = async () => {
                try {
                    var response = await APIInvoke.invokeGET(`/productos?idT=${idTienda}`);
                    console.log('Respuesta de la API:', response);

                    if (Array.isArray(response) && response.length > 0) {
                        setproductos(response);
                    } else {
                        console.error('La respuesta de la API no contiene productos.');
                    }
                } catch (error) {
                    console.error('Error al cargar los productos:', error);
                }
            };

            cargarProductos();
        }
    }, [idProducto]);

    return (
        <div className="wrapper">
            <Navbar></Navbar>
            <SidebarContainerClie></SidebarContainerClie>
            <div className="content-wrapper">
                <ContentHeader
                    titulo={tituloPag}
                    breadCrumb1={"Inicio"}
                    breadCrumb2={"Productos"}
                    ruta1={"/menuClientes"}
                />
                <section className="content">
                    <div className="card">
                        <div className="card-header">
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
                                        <th style={{ width: '25%' }}>Nombre</th>
                                        <th style={{ width: '25%' }}>Precio</th>
                                        <th style={{ width: '10%' }}>Tienda</th>
                                        <th style={{ width: '10%' }}>Categoria</th>
                                        <th style={{ width: '15%' }}>Opciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {productos.map(item => (
                                        <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.nombre}</td>
                                            <td>{item.precio}</td>
                                            <td>{nombreTien}</td>
                                            <td>{item.idC}</td>
                                            <td>
                                                <Link to={`/comprarProductos/${item.id}@${item.nombre}@${idTienda}@${nombreTien}`} className="btn btn-sm btn-primary">Comprar</Link>
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

export default VerProductos;