import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { Fragment } from 'react';
import Login from './paginas/Auth/Login';
import Menu from './paginas/Menu'
import CrearCuenta from './paginas/Auth/CrearCuenta';
import ProyectosAdmin from './paginas/tienda/ProyectosAdmin';
import PCrear from './paginas/tienda/PCrear';
import PEditar from './paginas/tienda/PEditar';
import MenuClientes from './paginas/MenuCliente';
import VerTiendasClientes from './paginas/tienda/VerTiendas';
import VerCategoria from './paginas/categoria/VerCategoria';
import CrearCategoria from './paginas/categoria/CrearCategoria';
import EditarCategoria from './paginas/categoria/EditarCategoria';
import VerPedidos from './paginas/pedidos/VerPedidos';
import TAdmin from './paginas/tienda/TAdmin';
import TCrear from './paginas/tienda/TCrear';
import TEditar from './paginas/tienda/TEditar';
import EditarPedidos from './paginas/pedidos/EditarPedidos';
import ComprarProducto from './paginas/clientes/ComprarProducto';
import VerProductos from './paginas/clientes/verProductos';
import VerProductosPropios from './paginas/clientes/VerProductosPropios';

function App() {
  return (
    <Fragment>
      <Router>
        <Routes>
          <Route path='/' exact element = {<Login/>}/>
          <Route path='/Menu' exact element = {<Menu/>}/>
          <Route path='/MenuClientes' exact element = {<MenuClientes/>}/>
          <Route path='/CrearCuenta' exact element = {<CrearCuenta/>}/>
          <Route path='/ProyectosAdmin' exact element = {<ProyectosAdmin/>}/>
          <Route path='/PCrear' exact element = {<PCrear/>}/>
          <Route path='/VerTiendas' exact element = {<VerTiendasClientes/>}/>
          <Route path='/PEditar/:idTienda' exact element = {<PEditar/>}/>
          <Route path='/VerCategoria' exact element = {<VerCategoria/>}/>
          <Route path='/CrearCategorias' exact element = {<CrearCategoria/>}/>
          <Route path="/EditarCategorias/:idCategoria" exact element={<EditarCategoria/>}/>
          <Route path="/VerPedidos" exact element={<VerPedidos/>}/>
          <Route path="/EditarPedidos/:idPedido" exact element={<EditarPedidos/>}/>
          <Route path="/TAdmin/:idProyecto" exact element={<TAdmin/>}/>
          <Route path="/TCrear/:idProyecto" exact element={<TCrear/>}/>
          <Route path="/TEditar/:idProyecto" exact element={<TEditar/>}/>
          <Route path="/ComprarProducto/:idVenta" exact element={<ComprarProducto/>}/>
          <Route path="/VerProductos" exact element={<VerProductos/>}/>
          <Route path="/VerProductosPropios/:idProyecto" exact element={<VerProductosPropios/>}/>
        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;