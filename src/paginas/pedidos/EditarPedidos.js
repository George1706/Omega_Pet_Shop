import React from "react";
import { useEffect, useState } from "react";
import ContentHeader from "../../componentes/ContentHeader";
import Footer from "../../componentes/Footer";
import Navbar from "../../componentes/Navbar";
import SidebarContainer from "../../componentes/SidebarContainer";
import { useNavigate, useParams } from "react-router-dom";
import APIInvoke from "../../utils/APIInvoke";
import swal from "sweetalert2";

const EditarPedidos = () => {

    const navigate = useNavigate();
    const [productos, setProductos] = useState([]);
    const [categorias, setCategorias] = useState([]);

    // Función para obtener productos desde la API
    const obtenerProductos = async () => {
        try {
            const response = await APIInvoke.invokeGET('/productos');
            setProductos(response); // Actualizar el estado con los productos obtenidos
        } catch (error) {
            console.error('Error al obtener productos:', error);
        }
    };

    // Función para obtener categorías desde la API
    const obtenerCategorias = async () => {
        try {
            const response = await APIInvoke.invokeGET('/categorias');
            setCategorias(response); // Actualizar el estado con las categorías obtenidas
        } catch (error) {
            console.error('Error al obtener categorías:', error);
        }
    };

    useEffect(() => {
        obtenerProductos();
        obtenerCategorias();
    }, []);

    const { idPedido } = useParams();
    let arreglo = idPedido.split('@')
    const idPe= arreglo[0]
    const idProducto = arreglo[1]
    const nombreProducto = arreglo[2]
    const categoria= arreglo[3]
    const nombreCliente = arreglo[4]
    const direccionP= arreglo[5]
    const telefonoP= arreglo[6]


    const tituloPag = `Edición de pedidos No: ${idPe}`


    const [pedidos, setPedidos] = useState({
        idP: idProducto,
        nombreProd: nombreProducto,
        categoriap: categoria,
        nombre: nombreCliente,
        direccion: direccionP,
        telefono: telefonoP,
    });

    const { nombreProd, categoriap, nombre, direccion, telefono } = pedidos;

    useEffect(() => {
        document.getElementById("nombre").focus();
    }, []);
    const onChange = (e) => {
        const { name, value } = e.target;
        setPedidos({
            ...pedidos,
            [name]: value,
        });
    };


    const editarPedido = async () => {
        try {
            const data = {
                idP: idProducto,
                nombreProd: nombreProducto,
                categoriap: categoria,
                nombre: pedidos.nombre,
                direccion: pedidos.direccion,
                telefono: pedidos.telefono,
            };

            console.log(data);
            const response = await APIInvoke.invokePUT(`/Ventas/${idPe}`, data);
            const idPedidoEditado = response.id;

            if (idPedidoEditado !== idPe) {
                navigate(`/VerPedidos`);
                const msg = "El pedido fue editado correctamente";
                new swal({
                    title: 'Información',
                    text: msg,
                    icon: 'success',
                    buttons: {
                        confirm: {
                            text: 'Ok',
                            value: true,
                            visible: true,
                            className: 'btn btn-primary',
                            closeModal: true,
                        },
                    },
                });
            } else {
                const msg = "El pedido no fue editado correctamente";
                new swal({
                    title: 'Error',
                    text: msg,
                    icon: 'error',
                    buttons: {
                        confirm: {
                            text: 'Ok',
                            value: true,
                            visible: true,
                            className: 'btn btn-danger',
                            closeModal: true,
                        },
                    },
                });
            }
        } catch (error) {
            console.error('Error al editar el pedido:', error);
            // Puedes manejar el error mostrando un mensaje al usuario o realizando alguna otra acción
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();
        editarPedido();
    };
    return ( 
        <div className="wrapper">
            <Navbar></Navbar>
            <SidebarContainer></SidebarContainer>
            <div className="content-wrapper">

                <ContentHeader
                    titulo={tituloPag}
                    breadCrumb1={"Listado de pedidos"}
                    breadCrumb2={"Edición"}
                    ruta1={`/VerPedidos`}
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
                            <form onSubmit={onSubmit} noValidate>
                                <div className="card-body">
                                <div className="form-group">
                            <label htmlFor="producto">Producto:</label>
                            <select
                                className="form-control"
                                id="producto"
                                name="nombreProd"
                                value={nombreProd}
                                onChange={onChange}
                                required
                            >
                                <option value="">Seleccione un producto</option>
                                {productos.map((producto) => (
                                    <option key={producto.id} value={producto.id}>
                                        {producto.nombre}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="categoria">Categoría:</label>
                            <select
                                className="form-control"
                                id="categoria"
                                name="categoriap"
                                value={categoriap}
                                onChange={onChange}
                                required
                            >
                                <option value="">Seleccione una categoría</option>
                                {categorias.map((categoria) => (
                                    <option key={categoria.id} value={categoria.id}>
                                        {categoria.nombre}
                                    </option>
                                ))}
                            </select>
                        </div>
                                    <div className="form-group">
                                        <label htmlFor="categoria">Nombre cliente:</label>
                                        <input type="text" 
                                        className="form-control" 
                                        id="nombre" 
                                        name="nombre" 
                                        placeholder="Ingrese el nombre del cliente" 
                                        value={nombre} 
                                        onChange={onChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="direccion">Dirección:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="direccion"
                                            name="direccion"
                                            placeholder="Ingrese la dirección"
                                            value={direccion}
                                            onChange={onChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="categoria">Telefono:</label>
                                        <input type="text" 
                                        className="form-control" 
                                        id="telefono" 
                                        name="telefono" 
                                        placeholder="Ingrese el telefono" 
                                        value={telefono} 
                                        onChange={onChange} required />
                                    </div>

                                </div>

                                <div className="card-footer">
                                    <button type="submit" className="btn btn-primary">Editar</button>
                                </div>
                            </form>

                        </div>
                    </div>

                </section>
            </div>
            <Footer></Footer>
        </div>
    );
}

export default EditarPedidos;