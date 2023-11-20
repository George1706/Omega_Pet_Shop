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
    const nombreTienda= arreglo[5]
    const tituloPag = `Actualización de productos: ${nombreTienda}`


    const [productos, setproductos] = useState({
        nombre: nombreProducto,
        precio:precioProducto,
        idT:idTienda,
        idC:idCategoria
    })

    const { nombre, precio, idC } = productos;

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
            idT: idTienda,
            idC:productos.idC,
            nombre: productos.nombre,
            precio:productos.precio,
            estado: false
        }

        console.log(data)
        const response = await APIInvoke.invokePUT(`/productos/${idProducto}`, data);
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

    const onSubmit = (e) => {
        e.preventDefault();
        editarTarea()
    }

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
                                <div className="form-group">
                                        <label htmlFor="nombre">Nombre:</label>
                                        <input type="text" className="form-control" id="nombre" name="nombre" placeholder="Ingrese el nombre del producto" value={nombre} onChange={onChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="tienda">Precio:</label>
                                        <input type="text" className="form-control" id="precio" name="precio" placeholder="Ingrese el precio del producto" value={precio} onChange={onChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="categoria">Categoria:</label>
                                        <input type="text" className="form-control" id="categoria" name="idC" placeholder="Ingrese el nombre de la categoría" value={idC} onChange={onChange} required />
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

export default TEditar;