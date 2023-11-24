import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import ContentHeader from "../../componentes/ContentHeader";
import Footer from "../../componentes/Footer";
import Navbar from "../../componentes/Navbar";
import SidebarContainerClie from "../../componentes/SidebarContainerClientes";
import { useEffect, useState } from "react";
import APIInvoke from "../../utils/APIInvoke";
import swal from "sweetalert2";




const ComprarProductos = () => {

const navigate = useNavigate();

const { idVenta } = useParams();
let arreglo = idVenta.split('@')
const idProducto= arreglo[0]
const nombreProducto = arreglo[1]
const idTienda = arreglo[2]
const nombreTienda = arreglo[3]
const categoriaTienda = arreglo[4]

const tituloPag = `Compra tus productos`


const [venta, setVentas] = useState({
    idP: idProducto,
    nombreProd:nombreProducto,
    nombre:'',
    direccion:'',
    telefono:'',
    categori:''
})

const { nombre, direccion, telefono,categoria} = venta;

const [categoriasTienda, setCategoriasTienda] = useState([]);

useEffect(() => {
    // Llamar a la API para obtener las categorías de la tienda
    const fetchCategorias = async () => {
        try {
            const response = await APIInvoke.invokeGET(`/Tiendas/${idTienda}/categorias`);
            // Actualizar el estado con las categorías obtenidas
            if (response && response.length > 0) {
                setCategoriasTienda(response);
            }
        } catch (error) {
            console.error('Error al obtener las categorías', error);
        }
    };

    fetchCategorias();
}, [idTienda]);

useEffect(() => {
    document.getElementById("nombre").focus();
}, [])

const onChange = (e) => {
    setVentas({
        ...venta,
        [e.target.name]: e.target.value
    })

}
const realizarVenta = async () => {
    let arreglo = idVenta.split('@')
    const idProducto= arreglo[0]

    const data = {
        idP: idProducto,
        nombreProd:nombreProducto,
        nombre:venta.nombre,
        direccion:venta.direccion,
        telefono:venta.telefono,
        categoria:venta.categoria
    }

    console.log(data)
    const response = await APIInvoke.invokePOST(`/Ventas`, data);
    const idV = response.id;

    if (idV===""){
        const msg = "No se pudo realizar la venta";
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
    navigate("/MenuClientes")
    const msg = "La compra se ha realizado satisfactoriamente, su pedido llegara a su dirección";
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

    setVentas({
        idP: idProducto,
        nombreProd:nombreProducto,
        nombre:'',
        direccion:'',
        telefono:''
    })
    }
}

const onSubmit = (e) => {
    e.preventDefault();
    realizarVenta()
}
 const [productosTienda, setProductosTienda] = useState([]);

    useEffect(() => {
        // Llamar a la API para obtener los productos de la tienda
        const fetchProductos = async () => {
            try {
                const response = await APIInvoke.invokeGET(`/tiendas/${idTienda}/productos`);
                if (Array.isArray(response) && response.length > 0) {
                    setProductosTienda(response);
                }
            } catch (error) {
                console.error('Error al obtener los productos', error);
            }
        };

        fetchProductos();
    }, [idTienda]);

    return ( 
        <div className="wrapper">
            <Navbar></Navbar>
            <SidebarContainerClie></SidebarContainerClie>
            <div className="content-wrapper">

                <ContentHeader
                    titulo={tituloPag}
                    breadCrumb1={"Formulario compras"}
                    breadCrumb2={"Comprar"}
                    ruta1={`/MenuClientes`}
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
                                        <label htmlFor="nombre">Nombre Cliente:</label>
                                        <input type="text" className="form-control" id="nombre" name="nombre" placeholder="Ingrese su nombre" value={nombre} onChange={onChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="tienda">Dirección:</label>
                                        <input type="text" className="form-control" id="direccion" name="direccion" placeholder="Ingrese la dirección" value={direccion} onChange={onChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="categoria">Teléfono:</label>
                                        <input type="text" className="form-control" id="telefono" name="telefono" placeholder="Ingrese su número de telefónico" value={telefono} onChange={onChange} required />
                                    </div>
                                      <div className="form-group">
                                    <label htmlFor="producto">Producto:</label>
                                    <select
                                        className="form-control"
                                        id="producto"
                                        name="idP"
                                        value={idProducto}
                                        onChange={onChange}
                                        required
                                    >
                                        <option value="">Seleccione un producto</option>
                                        {/* Mapear los productos disponibles */}
                                        {productosTienda.map((producto) => (
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
                                    name="categoria"
                                    value={categoria}
                                    onChange={onChange}
                                    required
                                >
                                    <option value="">Seleccione una categoría</option>
                                    {/* Mapear las categorías disponibles */}
                                    {categoriasTienda.map((cat) => (
                                        <option key={cat.id} value={cat.id}>
                                            {cat.nombre}
                                        </option>
                                    ))}
                                </select>
                            </div>
                                </div>

                                <div className="card-footer">
                                    <button type="submit" className="btn btn-primary">comprar</button>
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

export default ComprarProductos;