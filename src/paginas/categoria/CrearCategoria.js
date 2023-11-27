import React from "react";
import { useEffect, useState } from "react";
import ContentHeader from "../../componentes/ContentHeader";
import Footer from "../../componentes/Footer";
import Navbar from "../../componentes/Navbar";
import SidebarContainer from "../../componentes/SidebarContainer";
import { useNavigate } from "react-router-dom";
import APIInvoke from "../../utils/APIInvoke";
import swal from "sweetalert2";

const CrearCategoria = () => {

    const navigate=useNavigate()

    const [categorias, setCategorias] = useState({
        nombre:''
    })

    const {nombre}=categorias;

    useEffect(() => {
        document.getElementById("nombre").focus();
    }, [])

    const onChange=(e)=>{
        setCategorias({
            ...categorias,
            [e.target.name]:e.target.value
        })
    }
    const crearCategoria = async () =>{
        const data ={
            nombre: categorias.nombre
        }
        const response = await APIInvoke.invokePOST('/Categorias', data);
        const idCategoria = response.id;

        if (idCategoria===""){
            const msg = "La Categoria no fue registrada correctamente";
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
        navigate("/VerCategoria")
        const msg = "La Categoria fue creada correctamente";
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
        setCategorias({
            nombre:'',
            direccion:''
        })
    }
    }
    const onSubmit =(e)=>{
        e.preventDefault();
        crearCategoria()
    }

    return (
        <div className="wrapper">
            <Navbar></Navbar>
            <SidebarContainer></SidebarContainer>
            <div className="content-wrapper">

                <ContentHeader
                    titulo={"Creación de categorias"}
                    breadCrumb1={"Listado de categorias"}
                    breadCrumb2={"creación"}
                    ruta1={"/visualizar-categorias"}
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
                                        <input type="text" className="form-control" id="nombre" name="nombre" placeholder="Ingrese el nombre de la categoria" value={nombre} onChange={onChange} required/>
                                    </div>

                                </div>
                                
                                <div className="card-footer">
                                    <button type="submit" className="btn tbn-sm btn-light"  style={{ backgroundImage: 'linear-gradient(135deg, #FF69B4, #8A2BE2)', color: 'white' }}>Crear Categoría</button>
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
export default CrearCategoria;