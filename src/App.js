// React
import React, { useEffect } from "react";

// React Router Dom
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Redux Toolkit
import { useDispatch } from "react-redux";
import { validate } from "./features/authSlice";

// Layout
import Layout from "./layouts/Layout";

// Pages
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Home from "./pages/Home";

import UserMaintenance from "./pages/UserMaintenance";
import UserMaintenanceAnt from "./pages/UserMaintenanceAnt";
import Test from "./pages/Test";
import FormularioEmpleados from "./pages/FormularioEmpleados";
import GroupPermissions from "./pages/GroupPermissions";
import PermissionByUser from "./pages/PermissionByUser";

export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(validate());
  }, []);

  const production = "/";
  const dev = "/";

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/workflow-front" element={<Login />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/teams/:idTeam" element={<Team />} />
        <Route path="/signup" element={<SignUp />} /> */}

        {/* <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} /> */}
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route
            path="/formulario-empleados"
            element={<FormularioEmpleados />}
          />
          <Route path="/mantencion-usuarios" element={<UserMaintenanceAnt />} />
          <Route
            path="/mantencion-usuarios/:userId"
            element={<PermissionByUser />}
          />
          {/* <Route path="/mantencion-usuarios" element={<UserMaintenance />} /> */}

          {/* <Route index element={<Home />} />
          <Route element={<ProtectedRoute />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="project/:id" element={<Project />} />
            <Route path="team/:id" element={<Team />} />
          </Route> */}
        </Route>

        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/formulario-empleados" element={<FormularioEmpleados />} />

        <Route path="/signUp" element={<SignUp />} />
        <Route path="/test" element={<Test />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="*" element={<Navigate replace to="/" />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
