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
    const telefonoTienda = arreglo[3];
    const correoTienda = arreglo[4];

    const [tienda, setTienda] = useState({
        nombre: nombreTienda,
        direccion: direccionTienda,
        telefono: telefonoTienda,
        correo: correoTienda
        
    });

    
    const {nombre, direccion, telefono, correo}=tienda;

    useEffect(() => {
        document.getElementById("nombre").focus();
    }, [])

    const onChange=(e)=>{
        setTienda({
            ...tienda,
            [e.target.name]:e.target.value
        });
    };

    const editarTiendas = async() => {
        let arreglo = idTienda.split('@');
        const idT = arreglo[0];
        const tiendasId = localStorage.getItem("id");
        const data = {
            id: idT,
            nombre: tienda.nombre,
            direccion:tienda.direccion,
            telefono:tienda.telefono,
            correo:tienda.correo,
            tiendasId: tiendasId
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
                    <div className="form-group row">
                        <label htmlFor="nombre" className="col-sm-2 col-form-label">Nombre:</label>
                        <div className="col-sm-10">
                        <input type="text" className="form-control" id="nombre" name="nombre" placeholder="Ingrese el nombre de la tienda" value={nombre} onChange={onChange} required />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="direccion" className="col-sm-2 col-form-label">Dirección:</label>
                        <div className="col-sm-10">
                        <input type="text" className="form-control" id="direccion" name="direccion" placeholder="Ingrese la dirección de la tienda" value={direccion} onChange={onChange} required />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="telefono" className="col-sm-2 col-form-label">Teléfono:</label>
                        <div className="col-sm-10">
                        <input type="number" className="form-control" id="telefono" name="telefono" placeholder="Ingrese el teléfono de la tienda" value={telefono} onChange={onChange} required />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="correo" className="col-sm-2 col-form-label">Correo:</label>
                        <div className="col-sm-10">
                        <input type="email" className="form-control" id="correo" name="correo" placeholder="Ingrese el correo de la tienda" value={correo} onChange={onChange} required />
                        </div>
                    </div>
            </div>
            <div className="card-footer">
                <button type="submit" className="btn btn-light" style={{ backgroundImage: 'linear-gradient(135deg, #FF69B4, #8A2BE2)', color: 'white' }}>Actualizar Tienda</button>
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