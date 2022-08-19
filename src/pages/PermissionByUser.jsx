import React, { useEffect } from "react";
import { Transfer } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  allPermissions,
  createGroupPermissions,
  createPremisePermissions,
  createProgramPermissions,
  createSectorPermissions,
  deleteGroupPermissions,
  deletePremisePermissions,
  deleteProgramPermissions,
  deleteSectorPermissions,
} from "../features/permissionSlice";
import { useParams, Link } from "react-router-dom";

export default function PermissionByUser() {
  const params = useParams();
  const dispatch = useDispatch();
  const permission = useSelector((state) => state.permission);

  useEffect(() => {
    dispatch(allPermissions(params.userId));

    return () => {};
  }, []);

  // GROUPS TRANSFER
  const filterOption1 = (inputValue, option) => {
    return option.NOMBRE_GRUPO.indexOf(inputValue) > -1;
  };

  const handleChange1 = (newTargetKeys, direction, moveKeys) => {
    if (direction === "right") {
      //console.log(`client:create`);
      // le pasamos primero los elementos que se movieron y los elementos que se encuentran ahora en el lado derecho
      dispatch(
        createGroupPermissions({
          moveKeys,
          newTargetKeys,
          userId: params.userId,
        })
      );
    } else {
      // console.log(`client:delete`);
      // le pasamos primero los elementos que se movieron y los elementos que se encuentran ahora en el lado derecho
      dispatch(
        deleteGroupPermissions({
          moveKeys,
          newTargetKeys,
          userId: params.userId,
        })
      );
    }
    // los roles actuales es == newTargetKeys

    /*  setTargetKeys(newTargetKeys); */
  };

  const handleSearch1 = (dir, value) => {};

  // SECTOR TRANSFER
  const filterOption2 = (inputValue, option) => {
    return option.NOMBRE_SECTOR.indexOf(inputValue) > -1;
  };

  const handleChange2 = (newTargetKeys, direction, moveKeys) => {
    if (direction === "right") {
      dispatch(
        createSectorPermissions({
          moveKeys,
          newTargetKeys,
          userId: params.userId,
        })
      );
    } else {
      dispatch(
        deleteSectorPermissions({
          moveKeys,
          newTargetKeys,
          userId: params.userId,
        })
      );
    }
  };

  const handleSearch2 = (dir, value) => {};

  // PREMISE TRANSFER
  const filterOption3 = (inputValue, option) => {
    return option.NOMBRE_LOCAL.indexOf(inputValue) > -1;
  };

  const handleChange3 = (newTargetKeys, direction, moveKeys) => {
    if (direction === "right") {
      dispatch(
        createPremisePermissions({
          moveKeys,
          newTargetKeys,
          userId: params.userId,
        })
      );
    } else {
      dispatch(
        deletePremisePermissions({
          moveKeys,
          newTargetKeys,
          userId: params.userId,
        })
      );
    }
  };

  const handleSearch3 = (dir, value) => {};

  // PROGRAM TRANSFER
  const filterOption4 = (inputValue, option) => {
    return option.NOMBRE_PROGRAM.indexOf(inputValue) > -1;
  };

  const handleChange4 = (newTargetKeys, direction, moveKeys) => {
    if (direction === "right") {
      dispatch(
        createProgramPermissions({
          moveKeys,
          newTargetKeys,
          userId: params.userId,
        })
      );
    } else {
      dispatch(
        deleteProgramPermissions({
          moveKeys,
          newTargetKeys,
          userId: params.userId,
        })
      );
    }
  };

  const handleSearch4 = (dir, value) => {};

  return (
    <>
      {/* Content Header (Page header) */}
      <div class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h1 class="m-0">
                Gestionando Roles de {permission.userSelected.USUARIO}
              </h1>
            </div>
            {/* /.col */}
            <div class="col-sm-6">
              <ol class="breadcrumb float-sm-right">
                <li class="breadcrumb-item">
                  <Link to="/">Inicio</Link>
                </li>
                <li class="breadcrumb-item">
                  <Link to="/mantencion-usuarios">Mantención de Usuarios</Link>
                </li>
                <li class="breadcrumb-item active">
                  {permission.userSelected.USUARIO}
                </li>
              </ol>
            </div>
            {/* /.col */}
          </div>
          {/* /.row */}
        </div>
        {/* /.container-fluid */}
      </div>
      {/* /.content-header */}

      <div className="content">
        <div className="container-fluid">
          <div className="row gap-4">
            <div className="col-12">
              {/* GROUP TRANSFER */}
              {permission &&
                permission.allGroups &&
                permission.allGroups.length > 0 && (
                  <Transfer
                    // TODOS LOS IDS DE LOS PERMISOS YA SEA DE LOS GROUPS/PROGRAMS/SECTORS/PREMISES
                    dataSource={permission.allGroups}
                    // # BUSCADOR
                    showSearch
                    // # FILTRADOR
                    filterOption={filterOption1}
                    // # LOS ELEMENTOS A LA DERECHA
                    targetKeys={permission.groupPermissions}
                    // LA FUNCION DE CAMBIO
                    onChange={handleChange1}
                    // un handleSearch por que si xd
                    onSearch={handleSearch1}
                    // render de los items
                    render={(item) => item.nombre_grupo}
                    titles={["Grupos", `Usuario`]}
                    disabled={permission.disabled}
                    className="d-flex justify-content-center align-items-center"
                    /* style={{ width: "100%" }} */
                    listStyle={{
                      width: "100%",
                    }}
                  />
                )}
            </div>
            {/* SECTOR TRANSFER */}
            <div className="col-12">
              {permission &&
                permission.allSectors &&
                permission.allSectors.length > 0 && (
                  <Transfer
                    dataSource={permission.allSectors}
                    showSearch
                    filterOption={filterOption2}
                    targetKeys={permission.sectorPermissions}
                    onChange={handleChange2}
                    onSearch={handleSearch2}
                    render={(item) => item.NOMBRE_SECTOR}
                    titles={["Sectores", `Usuario`]}
                    disabled={permission.disabled}
                    className="d-flex justify-content-center align-items-center"
                    listStyle={{
                      width: "100%",
                    }}
                  />
                )}
            </div>
            <div className="col-12">
              {permission &&
                permission.allPremises &&
                permission.allPremises.length > 0 && (
                  <Transfer
                    dataSource={permission.allPremises}
                    showSearch
                    filterOption={filterOption3}
                    targetKeys={permission.premisePermissions}
                    onChange={handleChange3}
                    onSearch={handleSearch3}
                    render={(item) => item.NOMBRE_LOCAL}
                    titles={["Locales", `Usuario`]}
                    disabled={permission.disabled}
                    className="d-flex justify-content-center align-items-center"
                    listStyle={{
                      width: "100%",
                    }}
                  />
                )}
            </div>
            <div className="col-12">
              {permission &&
                permission.allPrograms &&
                permission.allPrograms.length > 0 && (
                  <Transfer
                    dataSource={permission.allPrograms}
                    showSearch
                    filterOption={filterOption4}
                    targetKeys={permission.programPermissions}
                    onChange={handleChange4}
                    onSearch={handleSearch4}
                    render={(item) => item.NOMBRE_PROGRAMA}
                    titles={["Programas", `Usuario`]}
                    disabled={permission.disabled}
                    className="d-flex justify-content-center align-items-center"
                    listStyle={{
                      width: "100%",
                    }}
                  />
                )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
