import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Footer from "../../componentes/Footer";
import Navbar from "../../componentes/Navbar";
import SidebarContainer from "../../componentes/SidebarContainer";
import ContentHeader from "../../componentes/ContentHeader";
import APIInvoke from "../../utils/APIInvoke";


const VerPedidos = () => {
    const productosId = localStorage.getItem("id");
    const categoriasId = localStorage.getItem("id");
    const [ventas, setVentas] = useState([]);
    const ventasId = localStorage.getItem("id");
    const cargarPedidos = async () => {
        try {
            const response = await APIInvoke.invokeGET(`/ventas?id=${ventasId}`);
            console.log('Respuesta de la API:', response); 

            if (Array.isArray(response) && response.length > 0) {
                // Actualizar los detalles de producto y categoría antes de actualizar el estado
                const ventasConDetalles = await Promise.all(
                    response.map(async (venta) => {
                        const productos = await APIInvoke.invokeGET(`/productos?productosid=${productosId}`);
                        const categoria = await APIInvoke.invokeGET(`/categorias?categoriasId${categoriasId}`);
                        
                        return {
                            ...venta,
                            nombreProducto: productos.nombre,
                            nombreCategoria: categoria.nombre
                        };
                    })
                );
                // Actualizar el estado con los detalles de producto y categoría
                setVentas(ventasConDetalles);
            } else {
                console.error('La respuesta de la API no contiene proyectos.');
            }
        } catch (error) {
            console.error('Error al cargar los proyectos:', error);
        }
    };

    useEffect(() => {
        cargarPedidos();
    }, []);


    const obtenerProductoCategoria = async (venta) => {
        try {
            // Obtener el producto
            const productos = await APIInvoke.invokeGET(`/productos?productosId=${productosId}`);
            // Obtener la categoría
            const categoria = await APIInvoke.invokeGET(`/categorias?categoriasId${categoriasId}`);

            // Almacenar en ventas con información adicional
            setVentas(prevVentas => [
                ...prevVentas,
                {
                    ...venta,
                    nombreProducto: productos.nombre,
                    nombreCategoria: categoria.nombre
                }
            ]);
        } catch (error) {
            console.error('Error al obtener producto/categoría:', error);
        }
    };
    
    useEffect(() => {
        const obtenerDetallesPedidos = async () => {
            try {
                // Para cada venta, obtener detalles de producto y categoría
                await Promise.all(ventas.map(obtenerProductoCategoria));
            } catch (error) {
                console.error('Error al obtener detalles de pedidos:', error);
            }
        };

        cargarPedidos();
        obtenerDetallesPedidos();
    }, []);

    return ( 
        <div className="wrapper">
        <Navbar></Navbar>
        <SidebarContainer></SidebarContainer>
        <div className="content-wrapper">

            <ContentHeader
                titulo={"Pedidos"}
                breadCrumb1={"Inicio"}
                breadCrumb2={"Pedidos"}
                ruta1={"/menu"}
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
                    <table className="table table-striped">
                            <thead>
                                <tr>
                                    {/* Eliminar las columnas # y # Producto */}
                                    <th style={{ width: '15%' }}>Nombre Producto</th>
                                    <th style={{ width: '15%' }}>Categoría</th>
                                    <th style={{ width: '10%' }}>Nombre cliente</th>
                                    <th style={{ width: '10%' }}>Dirección</th>
                                    <th style={{ width: '10%' }}>Teléfono</th>
                                    <th style={{ width: '10%' }}>Opciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    ventas.map(item =>
                                        <tr key={item.id}>
                                            {/* Eliminar las celdas correspondientes */}
                                            <td>{item.nombreProducto}</td>
                                            <td>{item.nombreCategoria}</td>
                                            <td>{item.nombre}</td>
                                            <td>{item.direccion}</td>
                                            <td>{item.telefono}</td>
                                            <td><Link to={`/editarPedidos/${item.id}@${item.idP}@${item.nombreProducto}@${item.nombreCategoria}@${item.nombre}@${item.direccion}@${item.telefono}`} className="btn btn-sm btn-primary ml-2">Editar</Link></td>
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

export default VerPedidos;