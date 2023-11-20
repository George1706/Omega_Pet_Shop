import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import APIInvoke from "../../utils/APIInvoke";
import swal from "sweetalert";
import Navbar from "../../componentes/Navbar";
import SidebarContainer from "../../componentes/SidebarContainer";
import ContentHeader from "../../componentes/ContentHeader";
import Footer from "../../componentes/Footer";

const PEditar = () => {

    const navigate=useNavigate();

    const { idTienda } = useParams();

    let arreglo = idTienda.split('@');

    const nombreTienda = arreglo[1];
    const direccionTienda = arreglo[2];

    const [tienda, setTienda] = useState({
        nombre: nombreTienda,
        direccion: direccionTienda
    });

    const {nombre, direccion}=tienda;


    const onChange=(e)=>{
        setTienda({
            ...tienda,
            [e.target.name]:e.target.value
        });
    };

    const editarTiendas = async() => {
        let arreglo = idTienda.split('@');
        const idT = arreglo[0];

        const data = {
            nombre: tienda.nombre,
            direccion:tienda.direccion
        }

        const response = await APIInvoke.invokePUT(`/Tiendas/${idT}`, data);
        const idTiendaEditada = response.id;

        if(idTiendaEditada!==idT){

            navigate("/ProyectosAdmin")
            const msg = "La tienda fue editada correctamente";
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
        }else{
            const msg = "La tienda no fue editada correctamente";
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

    useEffect(() => {
        document.getElementById("nombre").focus();
    }, []);

    const onSubmit =(e)=>{
        e.preventDefault();
        editarTiendas();
    };

    return (         
    <div className="wrapper">
    <Navbar></Navbar>
    <SidebarContainer></SidebarContainer>
    <div className="content-wrapper">

        <ContentHeader
            titulo={"Actualización de tiendas"}
            breadCrumb1={"Listado de tiendas"}
            breadCrumb2={"Actualizar"}
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
                            <button type="submit" className="btn btn-primary">Actualizar</button>
                        </div>
                    </form>

                </div>
            </div>

        </section>
    </div>
    <Footer></Footer>
</div> );
}

export default PEditar;