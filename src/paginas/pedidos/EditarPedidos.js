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

    const { idPedido } = useParams();
    let arreglo = idPedido.split('@')
    const idPe= arreglo[0]
    const idProducto = arreglo[1]
    const nombreProducto = arreglo[2]
    const nombreCliente = arreglo[3]
    const direccionP= arreglo[4]
    const telefonoP= arreglo[5]

    const tituloPag = `Edición de pedidos No: ${idPe}`


    const [pedidos, setPedidos] = useState({
        idP: idProducto,
        nombreProd:nombreProducto,
        nombre:nombreCliente,
        direccion:direccionP,
        telefono:telefonoP
    })

    const { nombre, direccion, telefono } = pedidos;

    useEffect(() => {
        document.getElementById("nombre").focus();
    }, [])

    const onChange = (e) => {
        setPedidos({
            ...pedidos,
            [e.target.name]: e.target.value
        })

    }
    const editarPedido = async () => {
        let arreglo = idPedido.split('@')
        const idPe= arreglo[0]



        const data = {
            idP: idProducto,
            nombreProd:nombreProducto,
            nombre:pedidos.nombre,
            direccion:pedidos.direccion,
            telefono:pedidos.telefono
        }

        console.log(data)
        const response = await APIInvoke.invokePUT(`/Ventas/${idPe}`, data);
        const idPedidoEditado = response.id;

        if (idPedidoEditado !== idPe) {
            navigate(`/proyectos-admin`)
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
                        closeModal: true
                    }
                }
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
                        closeModal: true
                    }
                }
            });

        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
        editarPedido()
    }

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
                                        <label htmlFor="categoria">Nombre cliente:</label>
                                        <input type="text" className="form-control" id="nombre" name="nombre" placeholder="Ingrese el nombre del cliente" value={nombre} onChange={onChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="categoria">Direccion:</label>
                                        <input type="text" className="form-control" id="direccion" name="direccion" placeholder="Ingrese la direccion" value={direccion} onChange={onChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="categoria">Telefono:</label>
                                        <input type="text" className="form-control" id="telefono" name="telefono" placeholder="Ingrese el telefono" value={telefono} onChange={onChange} required />
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