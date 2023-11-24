import React from "react";
import ContentHeader from "../../componentes/ContentHeader";
import Footer from "../../componentes/Footer";
import { Link } from "react-router-dom";

const LoginPage = () => {
    return (
        <div className="wrapper" >
            <div >
                <div className="content-wrapper" style={{ maxWidth: "900px", width: "100%" }}>
                    <ContentHeader
                        titulo={"Bienvenido"}
                        titulo1={"¿Como vas a iniciar sesión?"}
                        breadCrumb1={"Login"}
                        breadCrumb2={"Crear Cuenta"}
                        ruta1={"/"}
                    />
                    <section className="content">
                        <div className="container-fluid">
                            <div className="row justify-content-center">
                                <div className="col-lg-7 col-8">
                                    <div className="small-box bg-red rounded-circle d-flex flex-column align-items-center justify-content-center text-center overflow-hidden" style={{ width: "600px", height: "200px" }}>
                                        <div className="inner">
                                            <h3 style={{ fontSize: "1.5rem" }}>Administrador</h3>
                                            {/* Ajustamos el tamaño del texto */}
                                            <p>&nbsp;</p>
                                        </div>
                                        <div className="icon bg-red rounded-circle d-flex align-items-center justify-content-center overflow-hidden" style={{ margin: "10px", fontSize: "3rem" }}>
                                            {/* Ajustamos el tamaño del ícono */}
                                            <i className="fas fa-briefcase" style={{margin:"25px"}}></i>
                                        </div>
                                        <Link to={"/crearCuentaAdministrador"} className="small-box-footer">
                                            Crear Cuenta <i className="fas fa-arrow-circle-right"></i>
                                        </Link>
                                    </div>
                                </div>

                                <div className="col-lg-7 col-8">
                                    <div className="small-box bg-orange rounded-circle d-flex flex-column align-items-center justify-content-center text-center" style={{ width: "600px", height: "200px" }}>
                                        <div className="inner">
                                            <h3 style={{ fontSize: "1.5rem" }}>Cliente</h3>
                                            {/* Ajustamos el tamaño del texto */}
                                            <p>&nbsp;</p>
                                        </div>
                                        <div className="icon bg-orange rounded-circle d-flex align-items-center justify-content-center overflow-hidden" style={{ margin: "10px", fontSize: "3rem" }}>
                                            {/* Ajustamos el tamaño del ícono */}
                                            <i className="fas fa-user" style={{margin:"25px"}}></i>
                                        </div>
                                        <Link to={"/crearCuenta"} className="small-box-footer">
                                            Crear Cuenta <i className="fas fa-arrow-circle-right"></i>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default LoginPage;