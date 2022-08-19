// React
import React, { useState, useEffect } from "react";

// Css Module
import loginStyle from "../styles/Login.module.css";

// Config .
import { APIREST } from "../configs";

/* // Icons
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc"; */

// Img
/* import kanbanImg from "../assets/img/kanban.jpg"; */

// React Router Dom
import { useNavigate, Link } from "react-router-dom";

// Redux Toolkit
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/authSlice";

// Toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const toastOptions = {
    position: "top-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    if (auth.logged) {
      console.log("Estas logeado");
      navigate("/");
    }
  }, [auth]);

  useEffect(() => {
    if (auth.status === "login rejected") {
      toast.error(auth.message, toastOptions);
    }
  }, [auth]);

  const validateForm = () => {
    const { email, password } = credentials;
    if (email === "") {
      toast.error("El correo y contraseña es requerido.", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("El correo y contraseña es requerido.", toastOptions);
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      const { email, password } = credentials;
      dispatch(login({ email, password }));
    }
  };

  return (
    <>
      <div className={`hold-transition login-page lean ${loginStyle.lean}`}>
        <div className="login-box">
          <div className="card card-outline card-success">
            <div className="card-header text-center">
              <h1>
                <b>Grupo los Robles</b>
              </h1>
            </div>
            <div className="card-body">
              <p className="login-box-msg">Inicia sesión con tu cuenta</p>
              <form>
                <div className="input-group mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Correo"
                    name="email"
                    onChange={(e) => handleChange(e)}
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
                    onChange={(e) => handleChange(e)}
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-lock" />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <button
                      className="btn btn-success btn-block"
                      onClick={handleSubmit}
                      type="button"
                    >
                      Iniciar Sesión
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
