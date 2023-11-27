import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import APIInvoke from "../../utils/APIInvoke.js";
import swal from "sweetalert";
import '../../css/login.css'

const Login = () => {

    //Este método es para redireccionar un componente a otro
    const navigate = useNavigate();

    //Definir el estado inicial de las variables
    const [usuario, setUsuario] = useState({
        email: '',
        password: ''
    });

    const { email, password } = usuario;

    const onChange = (e) => {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        });
    }


    useEffect(() => {
        document.getElementById("email").focus();
    }, [])


    const iniciarSesion = async () => {
        const verificarExistenciaUsuario = async (email, password) => {
            try {
                const response = await APIInvoke.invokeGET(
                    `/Usuarios?email=${email}&password=${password}`
                );
                if (response && response.length > 0) {
                    return response[0]; // Devuelve el primer usuario que coincide
                }
                return null; // El usuario no existe
            } catch (error) {
                console.error(error);
                return null; // Maneja el error si la solicitud falla
            }
        };



        if(password.length < 6){
            const msg = "Contraseña demasiado corta (debe ser mayor a 6 caracteres)";
            swal({
            title: "Error",
            text: msg,
            icon: "error",
            buttons: {
                confirm: {
                text: "Ok",
                value: true,
                visible: true,
                className: "btn btn-danger",
                closeModal: true,
                },
            },
            });
        }else{
            const usuarioExistente = await verificarExistenciaUsuario(email, password);
            const jwt= usuarioExistente.id;

            localStorage.setItem('id', jwt);
            const response = await APIInvoke.invokeGET(
                `/Usuarios?email=${email}&password=${password}`
            );

            if (!usuarioExistente) {
                const msg = "No fue posible iniciar sesión, verifique los datos ingresados.";
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
            }else {
                if (usuarioExistente.rol === 'cliente') {
                    navigate("/menuClientes");
                } else {
                    navigate("/menu");
                }
            }
        }
    }
   



    const onSubmit = (e) => {
        e.preventDefault();
        iniciarSesion();
    }

    return(
        <center>
        <div className="login-background d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <div className="login-box" style={{ marginRight: "45px" }}>
        <div className="card">
        <div className="login-logo">
        <b style={{
            background: 'linear-gradient(45deg, #FF69B4, #9370DB)',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            backgroundSize: '200% 100%',
            backgroundPosition: '0 0',
            transition: 'background-position 0.5s',
            textTransform: 'none',
          }}>Iniciar</b> Sesión
        </div>
        
            <div className="card-body login-card-body">
            <p className="login-box-msg">Bienvenido, ingrese sus credenciales</p>
            <form onSubmit={onSubmit}>
                <div className="input-group mb-3">
                <input
                    type="email"
                    className="form-control"
                    placeholder="Correo Electronico"
                    name="email"
                    id='email'
                    value={email}
                    onChange={onChange} 
                    required
                />
                <div className="input-group-append">
                    <div className="input-group-text">
                    <span className="fas fa-envelope" />
                    </div>
                </div>
                </div>
                <div className="input-group mb-3">
                <input
                    type="password"
                    className="form-control"
                    placeholder="Contraseña"
                    name="password"
                    id='name'
                    value={password}
                    onChange={onChange}
                    required
                />
                <div className="input-group-append">
                    <div className="input-group-text">
                    <span className="fas fa-lock" />
                    </div>
                </div>
                </div>
                <div className="social-auth-links text-center mb-3">
                <button type='submit' className="btn btn-block btn btn-light" style={{ backgroundImage: 'linear-gradient(135deg, #FF69B4, #8A2BE2)', color: 'rgb(255, 222, 184)' }}>
          <i className="fas fa-key" /> Ingresar
        </button>
        <br></br>
        <p className="login-box-msg">¿No tiene una cuenta? <Link to={'/crearCuenta'}><i />  Crea una</Link></p>
        <p className="login-box-msg">Crea una cuenta para tu organización<Link to={'/CrearCuentaAdministrador'}><i /> Aquí</Link></p>
                </div>
            </form> 
            </div>
        </div>
        </div>
</div>

       {/* <div className=" d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <div className="login-box">
        <div className="card">
        <div className="login-logo">
        <b style={{
            background: 'linear-gradient(45deg, #FF69B4, #9370DB)',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            backgroundSize: '200% 100%',
            backgroundPosition: '0 0',
            transition: 'background-position 0.5s',
            textTransform: 'none',
          }}>Iniciar Sesión</b> Administrador
        </div>
        
            <div className="card-body login-card-body">
            <p className="login-box-msg">Bienvenido, ingrese sus credenciales como Administrador</p>
            <form onSubmit={onSubmit}>
                <div className="input-group mb-3">
                <input
                    type="email"
                    className="form-control"
                    placeholder="Correo Electronico"
                    name="email"
                    id='email'
                    value={email}
                    onChange={onChange} 
                    required
                />
                <div className="input-group-append">
                    <div className="input-group-text">
                    <span className="fas fa-envelope" />
                    </div>
                </div>
                </div>
                <div className="input-group mb-3">
                <input
                    type="password"
                    className="form-control"
                    placeholder="Contraseña"
                    name="password"
                    id='name'
                    value={password}
                    onChange={onChange}
                    required
                />
                <div className="input-group-append">
                    <div className="input-group-text">
                    <span className="fas fa-lock" />
                    </div>
                </div>
                </div>
                <div className="social-auth-links text-center mb-3">
                <button type='submit' className="btn btn-block btn btn-light" style={{ backgroundImage: 'linear-gradient(135deg, #FF69B4, #8A2BE2)', color: 'rgb(255, 222, 184)' }}>
          <i className="fas fa-key" /> Ingresar
        </button>
        <br></br>
        <p className="login-box-msg">¿No tiene una cuenta? <Link to={'/CrearCuentaAdministrador'}><i />  Crea una</Link></p>

                </div>
            </form> 
            </div>
        </div>
        </div>
        </div>
        </div>*/}
        
 


        
        </center>
    );
}

export default Login;