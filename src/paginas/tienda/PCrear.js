import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import APIInvoke from "../../utils/APIInvoke";
import swal from "sweetalert";
import Navbar from "../../componentes/Navbar";
import SidebarContainer from "../../componentes/SidebarContainer";
import ContentHeader from "../../componentes/ContentHeader";
import Footer from "../../componentes/Footer";

const PCrear = () => {
    const navigate=useNavigate()

    const [tiendas, setTiendas] = useState({
        nombre:'',
        direccion:''
    })

    const {nombre, direccion}=tiendas;


    const onChange=(e)=>{
        setTiendas({
            ...tiendas,
            [e.target.name]:e.target.value
        });
    };

    useEffect(() => {
        document.getElementById("nombre").focus();
    }, [])

    const crearProyecto = async () =>{
        const data ={
            nombre: tiendas.nombre,
            direccion:tiendas.direccion
        }
        const response = await APIInvoke.invokePOST('/Tiendas', data);
        const idProyecto = response.id;

        if (idProyecto==="nombre"){
            const msg = "La tienda no fue registrada correctamente";
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
    }else{
        navigate("/ProyectosAdmin")
        const msg = "La tienda fue creada correctamente";
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

        setTiendas({
            nombre:'',
            direccion:''
        })
    }
    }
    const onSubmit =(e)=>{
        e.preventDefault();
        crearProyecto()
    }


    return (
        <div className="wrapper">
            <Navbar></Navbar>
            <SidebarContainer></SidebarContainer>
            <div className="content-wrapper">

                <ContentHeader
                    titulo={"Creación de tiendas"}
                    breadCrumb1={"Listado de tiendas"}
                    breadCrumb2={"Creación"}
                    ruta1={"/ProyectosAdmin"}
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
                                        <input type="text" className="form-control" id="nombre" name="nombre" placeholder="Ingrese el nombre de la tienda" value={nombre} onChange={onChange} required/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="nombre">Dirección:</label>
                                        <input type="text" className="form-control" id="direccion" name="direccion" placeholder="Ingrese la direcciòn de la tienda" value={direccion} onChange={onChange} required/>
                                    </div>

                                </div>
                                
                                <div className="card-footer">
                                    <button type="submit" className="btn btn-primary">Crear</button>
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

export default PCrear;  