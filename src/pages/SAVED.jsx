import React from "react";
const $ = require("jquery");
$.DataTable = require("datatables.net");

export default function UserMaintenance() {
  const loadDatatable = () => {
    console.log("xd");
    /*  const script = document.createElement("script");
    script.src = "https://cdn.datatables.net/1.10.20/js/jquery.dataTables.min.js";
    script.async = true;
    document.body.appendChild(script); */
    /* $("#customer_data").DataTable({
      processing: true,
      serverSide: true,
      serverMethod: "get",
      ajax: {
        //url: "http://localhost:4000/api/users/getUsers",
        url: "http://localhost:3001/get_data",
      },
      aaSorting: [],
      columns: [
        { data: "customer_first_name" },
        { data: "customer_last_name" },
        { data: "customer_email" },
        { data: "customer_gender" },
      ],
      paging: true,
      language: {
        url: "//cdn.datatables.net/plug-ins/1.10.20/i18n/Spanish.json",
      },
      pagingType: "full_numbers",
      order: [],
    }); */

    $("#customer_data").DataTable({
      processing: true,
      serverSide: true,
      serverMethod: "get",
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
      // activate order
      ordering: true,
    });
  };

  return (
    <div className="container">
      <h1 className="text-center text-primary mt-3 mb-3">
        jQuery DataTables with Node.js Express & MySQL
      </h1>
      <button type="button" onClick={() => loadDatatable()}>
        Cargar Table
      </button>

      <div className="card">
        <div className="card-header">Customer Data</div>
        <div className="card-body">
          <div className="table-responsive">
            <table id="customer_data" className="table table-bordered">
              <thead>
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
