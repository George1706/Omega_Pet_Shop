import React from "react";
import { useEffect, useState } from "react";
import Footer from "../../componentes/Footer";
import Navbar from "../../componentes/Navbar";
import ContentHeader from "../../componentes/ContentHeader";
import APIInvoke from "../../utils/APIInvoke";
import SidebarContainerClientes from "../../componentes/SidebarContainerClientes";


const VerPedidos = () => {
    const [ventas, setVentas] = useState([
    ]);  
    const userId = localStorage.getItem("id");

    

    const cargarPedidos = async () => {
        try {
            var response = await APIInvoke.invokeGET(`/ventas?userId=${userId}`);
            

            console.log('Respuesta de la API:', response); 

            if (Array.isArray(response) && response.length > 0) {
                setVentas(response);
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

    return ( 
        <div className="wrapper">
        <Navbar></Navbar>
        <SidebarContainerClientes></SidebarContainerClientes>
        <div className="content-wrapper">

            <ContentHeader
                titulo={"Pedidos"}
                breadCrumb1={"Inicio"}
                breadCrumb2={"Pedidos"}
                ruta1={"/MenuClientes"}
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
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th style={{ width: '10%' }}>Id Pedido</th>
                                    <th style={{ width: '10%' }}>Nombre Tienda</th>
                                    <th style={{ width: '10%' }}>Nombre cliente</th>
                                    <th style={{ width: '10%' }}>Direccion</th>
                                    <th style={{ width: '10%' }}>Telefono</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    ventas.map(item =>
                                        <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.nombreProd}</td>
                                            <td>{item.nombre}</td>
                                            <td>{item.direccion}</td>
                                            <td>{item.telefono}</td>
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