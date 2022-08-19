import React from "react";
import styled from "../styles/UserMaintenance.module.css";
const $ = require("jquery");
$.DataTable = require("datatables.net");

export default function UserMaintenance() {
  /* const loadDatatable = () => {
    $("#customer_data").DataTable({
      processing: true,
      serverSide: true,
      serverMethod: "get",
      dom: '"Blfrtip"',
      buttons: {
        dom: {
          button: {
            className: "btn",
          },
        },
        buttons: [
          {
            //definimos estilos del boton de excel
            extend: "excel",
            text: "Exportar a Excel",
            className: "btn btn-outline-success",
            insertCells: [
              {
                cells: "sL", // Celda B3
                content: "", // Simplemente sobreescribimos su contenido
              },
              {
                cells: "sLh", // Celda B4
                content: "", // Simplemente sobreescribimos su contenido
              },
            ],
            excelStyles: {
              template: "cyan_medium", // Add a template to the result
            },
          },
        ],
      },
      ajax: {
        url: "http://localhost:4000/api/users/getUsers",
      },
      aaSorting: [],
      columns: [
        { data: "USUARIO" },
        { data: "DESCRIPCION" },
        { data: "EMAIL" },
        { data: "NIVEL1" },
        { data: "NIVEL2" },
      ],
      paging: true,
      language: {
        url: "//cdn.datatables.net/plug-ins/1.10.20/i18n/Spanish.json",
      },
      pagingType: "full_numbers",
      ordering: true,
    });
  }; */

  // jquery ready
  $(document).ready(function () {
    $("#customer_data").DataTable({
      processing: true,
      serverSide: true,
      serverMethod: "get",
      dom: '"Blfrtip"',
      buttons: {
        dom: {
          button: {
            className: "btn",
          },
        },
        buttons: [
          {
            //definimos estilos del boton de excel
            extend: "excel",
            text: "Exportar a Excel",
            className: "btn btn-outline-success",
            insertCells: [
              {
                cells: "sL", // Celda B3
                content: "", // Simplemente sobreescribimos su contenido
              },
              {
                cells: "sLh", // Celda B4
                content: "", // Simplemente sobreescribimos su contenido
              },
            ],
            excelStyles: {
              template: "cyan_medium", // Add a template to the result
            },
          },
        ],
      },
      ajax: {
        url: "http://localhost:4000/api/users/getUsers",
      },
      aaSorting: [],
      columns: [
        { data: "USUARIO" },
        { data: "DESCRIPCION" },
        { data: "EMAIL" },
        { data: "NIVEL1" },
        { data: "NIVEL2" },
      ],
      paging: true,
      language: {
        url: "//cdn.datatables.net/plug-ins/1.10.20/i18n/Spanish.json",
      },
      pagingType: "full_numbers",
      ordering: true,
    });
  });

  return (
    <div className="container-fluid">
      <h1 className="text-center text-primary mt-3 mb-3">
        jQuery DataTables with Node.js Express & MySQL
      </h1>
      {/* <button
        type="button"
        className="btn btn-success"
        onClick={() => loadDatatable()}
      >
        Cargar Table
      </button> */}

      <div className="card">
        <div className="card-header">Customer Data</div>
        <div className="card-body">
          <div className="table-responsive">
            <table
              id="customer_data"
              className={`table table-bordered table-hover w-100`}
            >
              <thead className={styled.thead}>
                <tr>
                  {/* <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Gender</th> */}
                  <th>USUARIO</th>
                  <th>DESCRIPCION</th>
                  <th>EMAIL</th>
                  <th>NIVEL1</th>
                  <th>NIVEL2</th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
