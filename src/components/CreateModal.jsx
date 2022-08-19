import React, { useState } from "react";
export default function CreateModal({ createNewUser }) {
  const initialState = {
    user: "",
    password: "",
    description: "",
    email: "",
    nivel1: "0",
    nivel2: "0",
  };

  const [userData, setUserData] = useState(initialState);
  const create = () => {
    createNewUser(userData);
    setUserData(initialState);
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <button
        type="button"
        data-bs-toggle="modal"
        data-bs-target="#createModalUser"
        className="btn btn-success mt-4 mb-4"
      >
        Registrar Usuario
      </button>
      <div
        className="modal fade"
        id="createModalUser"
        tabIndex={-1}
        aria-labelledby="createModalUserLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-fullscreen-lg-down modal-dialog-centered modal-lg modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="createModalUserLabel">
                Formulario para registrar usuario
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <div className="table-responsive">
                {/* Form Desktop */}
                <table className="table">
                  <thead className="excelThead">
                    <tr>
                      <th scope="col">USUARIO</th>
                      <th scope="col">PASSWORD</th>
                      <th scope="col">DESCRIPCION</th>
                      <th scope="col">EMAIL</th>
                      <th scope="col">ACTION</th>
                    </tr>
                  </thead>
                  <tbody className="table-group-divider">
                    <tr>
                      <td>
                        <input
                          type="text"
                          className="form-control"
                          id="user"
                          name="user"
                          placeholder="Leandro Marcelo"
                          pattern="^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$"
                          title="El Nombre Completo sólo acepta letras y espacios en blanco."
                          required
                          value={userData.user}
                          onChange={handleChange}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          className="form-control"
                          id="password"
                          name="password"
                          placeholder="Contraseña"
                          title="La contraseña es requerido."
                          required
                          value={userData.password}
                          onChange={handleChange}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          className="form-control"
                          id="description"
                          name="description"
                          placeholder="IT"
                          pattern="^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$"
                          title="La Descripción sólo acepta letras y espacios en blanco"
                          required
                          value={userData.description}
                          onChange={handleChange}
                        />
                      </td>
                      <td>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          name="email"
                          pattern="^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$"
                          placeholder="lmarcelo@grupolosrobles.com"
                          required
                          value={userData.email}
                          onChange={handleChange}
                        />
                      </td>
                      <td>
                        <button
                          type="button"
                          onClick={create}
                          className="btn btn-primary"
                          data-bs-dismiss="modal"
                        >
                          Registrar
                        </button>
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Cancelar
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
