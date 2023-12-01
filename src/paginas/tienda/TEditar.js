import React from "react";
import { useEffect, useState } from "react";
import ContentHeader from "../../componentes/ContentHeader";
import Footer from "../../componentes/Footer";
import Navbar from "../../componentes/Navbar";
import SidebarContainer from "../../componentes/SidebarContainer";
import { useNavigate, useParams } from "react-router-dom";
import APIInvoke from "../../utils/APIInvoke";
import swal from "sweetalert2"; 


const TEditar = () => {


    const navigate = useNavigate();

    const { idProyecto } = useParams();
    let arreglo = idProyecto.split('@')
    const idProducto= arreglo[0]
    const nombreProducto = arreglo[1]
    const precioProducto = arreglo[2]
    const idTienda = arreglo[3]
    const idCategoria= arreglo[4]
    const descripProd= arreglo[5]
    const nombreTienda= arreglo[6]
    const tituloPag = `Actualización de productos: ${nombreTienda}`

    const productosId = localStorage.getItem("id");
    const [productos, setproductos] = useState({
        id:idProducto,
        nombre: nombreProducto,
        precio:precioProducto,
        idT:idTienda,
        idC:idCategoria,
        descripcion:descripProd,
        productosId:productosId
    })

    const { nombre, precio, idC, descripcion} = productos;

    useEffect(() => {
        document.getElementById("nombre").focus();
    }, [])

    const onChange = (e) => {
        setproductos({
            ...productos,
            [e.target.name]: e.target.value
        })

    }
    const editarTarea = async () => {
        let arreglo = idProyecto.split('@')
        const idProducto= arreglo[0]



        const data = {
            id:idProducto,
            idT: idTienda,
            nombre: productos.nombre,
            precio:productos.precio,
            idC:productos.idC,
            descripcion:productos.descripcion,
            productosId:productosId
        }

        console.log(data)
        const response = await APIInvoke.invokePUT(`/productos?id=${productosId}`, data);
        const idTareaEditado = response.id;

        if (idTareaEditado !== idProducto) {
            navigate(`/TAdmin/${idTienda}@${nombreTienda}`)
            const msg = "La tarea fue editada correctamente";
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
                        closeModal: true
                    }
                }
            });

        } else {

            const msg = "La tarea no fue editada correctamente";
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
                        closeModal: true
                    }
                }
            });

        }
    }
    const [categorias, setCategorias] = useState([]); // Agregar estado para almacenar las categorías
    const onSubmit = (e) => {
        e.preventDefault();
        editarTarea()
    }
    useEffect(() => {
        // Lógica para obtener las categorías de tu API o de donde las tengas almacenadas
        const obtenerCategorias = async () => {
            try {
                const categoriasId = localStorage.getItem("id");
                const response = await APIInvoke.invokeGET(`/categorias?id=${categoriasId}`); // Reemplaza '/categorias' por tu endpoint correcto
                setCategorias(response); // Actualizar el estado con las categorías obtenidas
            } catch (error) {
                console.error('Error al obtener las categorías:', error);
            }
        };
    
        obtenerCategorias(); // Llamar a la función para obtener las categorías al cargar el componente
    }, []);
    return ( 
        <div className="wrapper">
            <Navbar></Navbar>
            <SidebarContainer></SidebarContainer>
            <div className="content-wrapper">

                <ContentHeader
                    titulo={tituloPag}
                    breadCrumb1={"Listado de tareas"}
                    breadCrumb2={"Actualizar"}
                    ruta1={`/TAdmin/${idTienda}@${nombreTienda}`}
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
                                    <div className="form-group row">
                                        <label htmlFor="nombre" className="col-sm-2 col-form-label">Nombre:</label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control" id="nombre" name="nombre" placeholder="Ingrese el nombre del producto" value={nombre} onChange={onChange} required />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="precio" className="col-sm-2 col-form-label">Precio:</label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control" id="precio" name="precio" placeholder="Ingrese el precio del producto" value={precio} onChange={onChange} required />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="idC" className="col-sm-2 col-form-label">Categoría:</label>
                                        <div className="col-sm-10">
                                            <select className="form-control" id="idC" name="idC" value={idC} onChange={onChange} required>
                                                <option value="">Seleccione una categoría</option>
                                                {categorias.map((categoria) => (
                                                    <option key={categoria.id} value={categoria.id}>
                                                        {categoria.nombre}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="descripcion" className="col-sm-2 col-form-label">Descripción:</label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control" id="descripcion" name="descripcion" placeholder="Ingrese la descripción del producto" value={descripcion} onChange={onChange} required />
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <button type="submit" className="btn btn-light" style={{ backgroundImage: 'linear-gradient(135deg, #FF69B4, #8A2BE2)', color: 'white' }}>Editar Producto</button>
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

export default TEditar;
