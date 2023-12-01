import React from "react";
import { useEffect, useState } from "react";
import ContentHeader from "../../componentes/ContentHeader";
import Footer from "../../componentes/Footer";
import Navbar from "../../componentes/Navbar";
import SidebarContainer from "../../componentes/SidebarContainer";
import { useNavigate, useParams } from "react-router-dom";
import APIInvoke from "../../utils/APIInvoke";
import swal from "sweetalert2";



const TCrear = () => {

    const navigate = useNavigate();

    const [productos, setProductos] = useState({
        nombre: '',
        precio: '',
        idT: '',
        idC: '',
        descripcion: ''
    });

    const { nombre, precio, idC, descripcion } = productos;

    const { idProyecto } = useParams();
    let arreglo = idProyecto.split('@')
    const idTienda = arreglo[0]
    const nombreTienda = arreglo[1]
    const tituloPag = `Crear productos en: ${nombreTienda}`

    useEffect(() => {
        document.getElementById("nombre")?.focus(); // Validar la existencia del elemento antes de acceder a él
    }, []);

    const onChange = (e) => {
        setProductos({
            ...productos,
            [e.target.name]: e.target.value
        });
    };

    const crearTarea = async () => {
        const productosId = localStorage.getItem("id");
        const categoriasId = localStorage.getItem("id");
        const data = {
            idT: idTienda,
            nombre: nombre,
            precio: precio,
            idC: idC,
            descripcion: descripcion,
            productosId: productosId,
            categoriasId: categoriasId
        };

        try {
            const response = await APIInvoke.invokePOST(`/productos?id=${productosId}`, data);
            const idTarea = response?.id || ''; // Validar si response tiene un id

            if (!idTarea) {
                const msg = "El producto no fue creado correctamente";
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
            } else {
                navigate(`/TAdmin/${idTienda}@${nombreTienda}`)
                const msg = "El producto fue creado correctamente";
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
            }
        } catch (error) {
            console.error('Error al crear el producto:', error);
        }
    };

    const [categorias, setCategorias] = useState([]); // Agregar estado para almacenar las categorías
    const onSubmit = (e) => {
        e.preventDefault();
        crearTarea();
    };

    useEffect(() => {
        const obtenerCategorias = async () => {
            try {
                const categoriasId = localStorage.getItem("id");
                const response = await APIInvoke.invokeGET(`/categorias?categoriasId=${categoriasId}`);
                
                // Verificar la respuesta de la API en la consola
                console.log("Respuesta de la API de categorías:", response);
    
                if (response && Array.isArray(response)) {
                    // Verificar si la respuesta contiene datos y es un array
                    if (response.length > 0) {
                        // Verificar la estructura de las categorías
                        console.log("Estructura de categorías:", response[0]);
                    } else {
                        console.log("La respuesta de categorías está vacía.");
                    }
                    
                    // Actualizar el estado con las categorías obtenidas o un array vacío si la respuesta es nula
                    setCategorias(response);
                } else {
                    console.log("La respuesta de categorías no es un array o está vacía.");
                    setCategorias([]); // Asignar un array vacío para evitar problemas de renderizado
                }
            } catch (error) {
                console.error('Error al obtener las categorías:', error);
            }
        };
    
        obtenerCategorias();
    }, []);
    return (
        <div className="wrapper">
            <Navbar></Navbar>
            <SidebarContainer></SidebarContainer>
            <div className="content-wrapper">

                <ContentHeader
                    titulo={tituloPag}
                    breadCrumb1={"Listado de tareas"}
                    breadCrumb2={"Creación"}
                    ruta1={`/TAdmin/${idProyecto}`}
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
                                        <label htmlFor="nombre">Precio:</label>
                                        <input type="text" className="form-control" id="precio" name="precio" placeholder="Ingrese el precio del producto" value={precio} onChange={onChange} required />
                                    </div>
                                    <div className="form-group">
                                    <label htmlFor="idC">Categoría:</label>
                                    <select className="form-control" id="idC" name="idC" value={idC} onChange={onChange} required>
                                        <option value="">Seleccione una categoría</option>
                                        {categorias.map((categoria) => (
                                            <option key={categoria.id} value={categoria.id}>
                                                {categoria.nombre}
                                            </option>
                                        ))}
                                    </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="descripcion">Descripción:</label>
                                        <input type="text" className="form-control" id="descripcion" name="descripcion" placeholder="Ingrese la descripción del producto" value={descripcion} onChange={onChange} required />
                                    </div>
                            </div>
                                <div className="card-footer">
                                    <button type="submit" className="btn tbn-sm btn-light"  style={{ backgroundImage: 'linear-gradient(135deg, #FF69B4, #8A2BE2)', color: 'white' }}>Crear Producto</button>
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

export default TCrear;