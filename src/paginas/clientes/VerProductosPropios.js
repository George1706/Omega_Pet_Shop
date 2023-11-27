import React, { useState, useEffect } from "react";
import Navbar from "../../componentes/Navbar";
import ContentHeader from "../../componentes/ContentHeader";
import Footer from "../../componentes/Footer";
import APIInvoke from "../../utils/APIInvoke";
import swal from "sweetalert2";
import { Link, useParams } from "react-router-dom";
import SidebarContainerClientes from "../../componentes/SidebarContainerClientes";

const VerProductosPropios = () => {


    const [productos, setProductos] = useState([]);
    const [categorias, setCategorias] = useState({});
    const [filtroNombre, setFiltroNombre] = useState("");
    const [filtroCategoria, setFiltroCategoria] = useState("");
    const [productosFiltrados, setProductosFiltrados] = useState([]);
    const [filtroAplicado, setFiltroAplicado] = useState(false);
    const [productosTienda, setProductosTienda] = useState([]);
    const productosId = localStorage.getItem("id");
    const categoriasId = localStorage.getItem("id");
    const cargarNombresProductos = async () => {
        try {
            const response = await APIInvoke.invokeGET(`/productos?idT=${productosId}`);
            if (Array.isArray(response) && response.length > 0) {
                const nombres = response.map((producto) => producto.nombre);
                setProductosTienda(nombres);
            }
        } catch (error) {
            console.error('Error al cargar los nombres de los productos:', error);
        }
    };
    
    const cargarCategorias = async () => {
        try {
            const response = await APIInvoke.invokeGET(`/categorias?categoriasId=${categoriasId}`);
            if (Array.isArray(response) && response.length > 0) {
                // Mapear categorías para tener un objeto con el formato ID -> Nombre
                const categoriasMap = response.reduce((acc, cat) => {
                    acc[cat.id] = cat.nombre;
                    return acc;
                }, {});
                setCategorias(categoriasMap);
            }
        } catch (error) {
            console.error('Error al cargar las categorías:', error);
        }
    };
    useEffect(() => {
        cargarProductos();
        cargarCategorias();
        cargarNombresProductos();
    }, []);

    const { idProyecto } = useParams();
    let arreglo = idProyecto.split('@')
    const idTienda = arreglo[0]
    const nombreTienda = arreglo[1]
    const tituloPag = `Listado de productos: ${nombreTienda}`

    const filtrarProductos = () => {
        let productosFiltradosTemp = [...productos];

        if (filtroNombre) {
            productosFiltradosTemp = productosFiltradosTemp.filter((producto) =>
                producto.nombre.toLowerCase().includes(filtroNombre.toLowerCase())
            );
        }

        if (filtroCategoria) {
            productosFiltradosTemp = productosFiltradosTemp.filter((producto) =>
                categorias[producto.idC]?.toLowerCase() === filtroCategoria.toLowerCase()
            );
        }

        setProductosFiltrados(productosFiltradosTemp);
        setFiltroAplicado(true);
    };

    const limpiarFiltro = () => {
        setFiltroNombre("");
        setFiltroCategoria("");
        setProductosFiltrados([]);
        setFiltroAplicado(false);
    };
    const cargarProductos = async () => {
        try {
            var response = await APIInvoke.invokeGET(`/productos?idT=${productosId}`);
            console.log('Respuesta de la API:', response); 

            if (Array.isArray(response) && response.length > 0) {
                setProductos(response);
            } else {
                console.error('La respuesta de la API no contiene proyectos.');
            }
        } catch (error) {
            console.error('Error al cargar los proyectos:', error);
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
            <SidebarContainerClientes></SidebarContainerClientes>
            <div className="content-wrapper">

                <ContentHeader
                    titulo={tituloPag}
                    breadCrumb1={" Listado de proyectos"}
                    breadCrumb2={"Productos"}
                    ruta1={"/VerTiendas"}
                />
                <section className="content">
                <div className="mb-3">
                <select
    value={filtroNombre}
    onChange={(e) => setFiltroNombre(e.target.value)}
>
    <option value="">Selecciona un nombre de producto</option>
    {productos.map((producto) => (
        <option key={producto.id} value={producto.nombre}>
            {producto.nombre}
        </option>
    ))}
</select>

<select
    value={filtroCategoria}
    onChange={(e) => setFiltroCategoria(e.target.value)}
>
    <option value="">Selecciona una categoría</option>
    {Object.values(categorias).map((categoria, index) => (
        <option key={index} value={categoria}>
            {categoria}
        </option>
    ))}
</select>
                        <button onClick={filtrarProductos} className="btn btn-sm btn-primary ml-2">Buscar</button>
                        <button onClick={limpiarFiltro} className="btn btn-sm btn-danger ml-2">Limpiar</button>
                    </div>
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
                                    <th style={{ width: '15%' }}>#</th>
                                    <th style={{ width: '10%' }}>Nombre</th>
                                    <th style={{ width: '10%' }}>Precio</th>
                                    <th style={{ width: '10%' }}>Tienda</th>
                                    <th style={{ width: '10%' }}>Categoría</th>
                                    <th style={{ width: '10%' }}>Comprar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(filtroAplicado && productosFiltrados.length > 0) ? (
                                    productosFiltrados.map((item) => (
                                        <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.nombre}</td>
                                            <td>{item.precio}</td>
                                            <td>{nombreTienda}</td>
                                            <td>{categorias[item.idC]}</td>
                                            <td>
                                                <Link
                                                    to={`/ComprarProducto/${idTienda}@${nombreTienda}@${item.id}`}
                                                    className="btn tbn-sm btn-light"
                                                    style={{ backgroundImage: 'linear-gradient(135deg, #FF69B4, #8A2BE2)', color: 'white' }}
                                                >
                                                    Comprar
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    productos.map((item) => (
                                        <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.nombre}</td>
                                            <td>{item.precio}</td>
                                            <td>{nombreTienda}</td>
                                            <td>{categorias[item.idC]}</td>
                                            <td>
                                                <Link
                                                    to={`/ComprarProducto/${idTienda}@${nombreTienda}@${item.id}`}
                                                    className="btn tbn-sm btn-light"
                                                    style={{ backgroundImage: 'linear-gradient(135deg, #FF69B4, #8A2BE2)', color: 'white' }}
                                                >
                                                    Comprar
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
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

export default VerProductosPropios;