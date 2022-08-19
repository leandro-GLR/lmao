import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Button, Popconfirm, Table, Space, Form, Input } from "antd";
import { isEmpty } from "lodash";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { useDispatch, useSelector } from "react-redux";
import CreateModal from "../components/CreateModal";
import {
  createUser,
  deleteUser,
  getUsers,
  setUsers,
  updateUser,
} from "../features/userSlice";

// Toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Datatable() {
  // DATA
  const [gridData, setGridData] = useState([]);
  // KNOW WHO ROW IS EDITING
  const [editRowKey, setEditRowKey] = useState("");
  // FORM
  const [form] = Form.useForm();
  // FOR KNOW SORTED INFO AND FUNCTIONALITY RESET AND SORT
  const [sortedInfo, setSortedInfo] = useState({});
  // FUNCTIONALITY SEARCH
  const [searchText, setSearchText] = useState("");
  let [filteredData] = useState();
  // FUNCTIONALITY SEARCH IN ONE COLUMN
  // KNOW VALUE SEARCH IN ONE COLUMN
  const [searchColText, setSearchColText] = useState("");
  // KNOW COLUMN SEARCH IN ONE COLUMN
  const [searchedCol, setSearchedCol] = useState("");
  // FILTERED INFO FOR AGE COLUMN
  const [filteredInfo, setFilteredInfo] = useState({});
  // PARA HACER UN AUTO FOCUS CON USE REF AL INPUT DE BUSQUEDA POR COLUMN
  const searchInput = useRef(null);

  function createNewUser(userData) {
    console.log(userData);
    dispatch(createUser(userData));
  }

  const toastOptions = {
    position: "top-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUsers());

    return () => {};
  }, []);

  useEffect(() => {
    if (user.status === "updateUser rejected") {
      console.log("su toast");
      toast.error(user.message, toastOptions);
    }

    return () => {};
  }, [user.message]);

  const loadData = async () => {
    dispatch(getUsers());
  };

  const handleDelete = async (user) => {
    dispatch(deleteUser(user.key));
    /*  const dataSource = [...modifiedData];
    const filteredData = dataSource.filter((item) => item.id !== user.id);
    setGridData(filteredData); */
  };

  const isEditing = (record) => {
    return record.ID === editRowKey;
  };

  const cancel = () => {
    setEditRowKey("");
  };
  const save = async (userId) => {
    const userData = await form.validateFields();
    dispatch(updateUser({ userData, userId }));
    // # CUIDADO CON ESTO
    setEditRowKey("");
  };

  const edit = (record) => {
    form.setFieldsValue({
      USUARIO: "",
      EMAIL: "",
      ...record,
    });
    setEditRowKey(record.ID);
  };

  const handleChange = (_, filter, sorter) => {
    // console.log(_) :     {current:1, pageSize:10}
    // console.log(filter) :     {name: null, email:null, age:null, message:null}
    //
    /* console.log(sorter) :     
        {column: {
            align:"center", 
            dataIndex: "name", 
            editTable: true, 
            sorter:(a,b) => a.name.length - b.name.length, 
            title:"Name"
            .........
        }, 
        columnKey: undefined, 
        field:"name", 
        order:"descend"
    } */

    const { order, field } = sorter;
    setFilteredInfo(filter);
    setSortedInfo({
      columnKey: field,
      order,
    });
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Buscar por ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            // FUNCTION PARA BUSCAR, LE PASO EL VALOR DE LA CELDA QUE SE BUSCA, EL CONFIRM ES MAS QUE TODO POR UN TEMA DE DROP DOWN, EL NOMBRE DE LA COLUMNA
            handleSearchCol(selectedKeys, confirm, dataIndex)
          }
          /* podriamos darle marginBottom 8 y evitarnos darle marginTop de 4 al space de abajo */
          style={{
            width: 188,
            marginBottom: 0,
            display: "block",
          }}
        />
        <Space style={{ marginTop: 4 }}>
          <Button
            type="primary"
            onClick={() => handleSearchCol(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleResetCol(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        /*  style={{ color: filtered ? "#0CC674" : "#0CC674" }} */
        style={{ color: filtered ? "#1890ff" : undefined }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedCol === dataIndex ? (
        <Highlighter
          // Estilo en linea
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          // Le pasamos las palabras que queremos resaltar
          searchWords={[searchColText]}
          autoEscape
          // le pasamos el texto donde se va a buscar las palabras a resaltar
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const handleSearchCol = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchColText(selectedKeys[0]);
    setSearchedCol(dataIndex);
  };

  const handleResetCol = (clearFilters) => {
    // LIMPIA LOS FILTROS
    clearFilters();
    // ESTABLECE EL TEXT DEL BUSCADOR INTRODUCIDO POR EL USUARIO A VACIO
    setSearchColText("");
    /* setSearchedCol(""); */
  };

  const columns = [
    {
      title: "USUARIO",
      dataIndex: "USUARIO",
      align: "center",
      editTable: true,
      sorter: (a, b) => a.USUARIO.length - b.USUARIO.length,
      sortOrder: sortedInfo.columnKey === "USUARIO" && sortedInfo.order,
      ...getColumnSearchProps("USUARIO"),
    },
    {
      title: "DESCRIPCION",
      dataIndex: "DESCRIPCION",
      align: "center",
      editTable: false,
      sorter: (a, b) => a.DESCRIPCION.length - b.DESCRIPCION.length,
      sortOrder: sortedInfo.columnKey === "DESCRIPCION" && sortedInfo.order,
      filters: [
        { text: "TI", value: "TI" },
        {
          text: "Gertente Administracion & Finanzas",
          value: "Gertente Administracion & Finanzas",
        },
        { text: "Gerente Restaurantes", value: "Gerente Restaurantes" },
        { text: "Admin", value: "Admin" },
        // Este puede que no funcione porque en la base de datos tiene un espacio de mas
        { text: "Jefe Tesoreria", value: "Jefe Tesoreria" },
        { text: "Gerente Brival", value: "Gerente Brival" },
        { text: "Compras", value: "Compras" },
        { text: "Encargada de Cajas", value: "Encargada de Cajas" },
        { text: "Proyecto Costos", value: "Proyecto Costos" },
        { text: "RRHH", value: "RRHH" },
      ],
      /* filterMultiple: false, */
      // Si hay valor se dispara la propiedad onFilter
      filteredValue: filteredInfo.DESCRIPCION || null,
      // Va a filtrar los records donde el valor de la columna sea igual al valor de la propiedad filteredValue, entonces digamos que el onFilter es un map y yo le paso value que sería el valor a filtrar y el record
      onFilter: (value, record) => String(record.DESCRIPCION).includes(value),
    },
    {
      title: "EMAIL",
      dataIndex: "EMAIL",
      align: "center",
      editTable: true,
      sorter: (a, b) => a.EMAIL.length - b.EMAIL.length,
      sortOrder: sortedInfo.columnKey === "EMAIL" && sortedInfo.order,
      ...getColumnSearchProps("EMAIL"),
    },

    {
      title: "ACTION",
      dataIndex: "action",
      align: "center",
      render: (text, record) => {
        const editable = isEditing(record);
        return user.users.length >= 1 ? (
          <Space>
            <Popconfirm
              title="Estas seguro que quieres eliminar?"
              onConfirm={() => handleDelete(record)}
            >
              <Button type="primary" danger disabled={editable}>
                Delete
              </Button>
            </Popconfirm>
            {editable ? (
              <span>
                <Space size={`middle`}>
                  <Button
                    onClick={() => save(record.key)}
                    type="primary"
                    // 8 y 8px es lo mismo
                    style={{ marginRight: 8 }}
                  >
                    Guardar
                  </Button>
                  <Popconfirm
                    title="Estas seguro que quieres cancelar?"
                    onConfirm={cancel}
                  >
                    <Button>Cancelar</Button>
                  </Popconfirm>
                </Space>
              </span>
            ) : (
              <Button type="primary" onClick={() => edit(record)}>
                Edit
              </Button>
            )}
          </Space>
        ) : null;
      },
    },
  ];

  // Esto se ejecuta antes de renderizar todo el DataTable
  const mergedColumns = columns.map((col) => {
    if (!col.editTable) {
      return col;
    }

    // A los campos que tienen el editing: true, agregarle el onCell, es decir, el evento que se ejecuta cuando el usuario clickea el button de editar y el cual esta encargado de pasarle los datos al a function EditableCell
    return {
      ...col,
      onCell: (record) => ({
        // ? todos los datos que se van a editar
        record,
        // ? name
        dataIndex: col.dataIndex,
        // ? Name
        title: col.title,
        // ? true
        editing: isEditing(record),
        /* inputType: col.dataIndex === "age" ? "number" : "text", */
      }),
    };
  });

  // Esto se va a activar cuando se clickee la celda de la fila a editar
  // Donde todos estos parametros fueron definidos arriba
  const EditableCell = ({
    editing,
    dataIndex,
    title,
    record,
    children,
    ...restProps
  }) => {
    const input = <Input />;

    return (
      <td {...restProps}>
        {/* Si editing es true, entonces a ese Item del formulario, reemplazalo por un input y agregale como propiedad name={dataIndex} en este caso name xd, y luego pon al input required con un message que sería la propiedad title de Porfavor .... , en caso contrario deja el item tal cual esta, en este caso se le dice children */}
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{ margin: 0 }}
            rules={[
              {
                required: true,
                message: `Por favor ingresa un valor en el campo ${title}`,
              },
            ]}
          >
            {input}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  // EL RESET FUNCIONA, PERO CUANDO HAY SEARCH POR COLUMNS, NO SE RESETEA YA QUE SI BIEN TRAE LOS DATOS SE SIGUEN SEARCHEANDO XD, PORLO TANTO TAMBIEN HAY QUE LIMPIAR ESOS CAMPOS AL DAR RESET
  const reset = () => {
    setSortedInfo({});
    setFilteredInfo({});
    setSearchText("");

    // PARA RESETEAR EL INPUT SEARCH COLUMN
    /* setSearchColText("");
    setSearchedCol(""); */

    loadData();
  };

  const handleInputSearch = (e) => {
    setSearchText(e.target.value);
    if (e.target.value === "") {
      /* reset(); */
      loadData();
    }
  };

  // # SACAR ESTO DE ACA
  const globalSearch = () => {
    // NO esta haciendo una copia del estado
    const filteredData = user.users.filter((value) => {
      return (
        value.USUARIO.toLowerCase().includes(searchText.toLowerCase()) ||
        value.EMAIL.toLowerCase().includes(searchText.toLowerCase()) ||
        value.DESCRIPCION.toLowerCase().includes(searchText.toLowerCase())
      );
    });

    dispatch(setUsers(filteredData));
    /*  setGridData(filteredData); */
  };

  return (
    <>
      <div className="container">
        {user && (
          <>
            {console.log(user.users)}
            <div className="table-responsive">
              <Space
                style={{ marginBottom: 16 }}
                className="d-flex justify-content-center pt-4"
              >
                <CreateModal createNewUser={createNewUser} />
                {/* VAMOS A TENER DOBLE FUNCIONALIDAD DE SEARCH, UNO QUE VA A BUSCAR POR TODOS LOS CAMPOS Y OTRO MAS ESPECÍFICO QUE VA A BUSCAR POR UN SOLO CAMPO */}
                <Input
                  placeholder="Buscar registro"
                  onChange={handleInputSearch}
                  type={"text"}
                  allowClear={true}
                  value={searchText}
                ></Input>
                <Button type="primary" onClick={globalSearch}>
                  Buscar
                </Button>
                <Button onClick={reset}>Resetear</Button>
              </Space>
              <Form form={form} component={false}>
                <Table
                  components={{
                    body: {
                      cell: EditableCell,
                    },
                  }}
                  columns={mergedColumns}
                  // El arreglo con los objectos <=> dataSource
                  dataSource={user.users}
                  loading={user.loading}
                  // Si bien el sort ya funcionaba, como luego vamos a tener una funcionalidad de resetear el sort, entonces lo vamos a resetear con una funcion que se ejecuta al clickear el boton de resetear pero para eso necesitamos almacenar la información del sort que este actualmente activo, para eso vamos a usar el state sortInfo
                  onChange={handleChange}
                  pagination={{
                    defaultPageSize: 10,
                    showSizeChanger: true,
                    showQuickJumper: true,
                    pageSizeOptions: ["10", "20", "30", "40"],
                  }}
                />
              </Form>
            </div>
            <div className="mt-8">
              <h1>Another Section</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptatibus, culpa quis minima necessitatibus aspernatur labore
                unde similique corporis dolores perferendis incidunt eveniet
                nihil. Dignissimos, ea! Temporibus vero beatae voluptatem
                voluptate.
              </p>
              <main>1</main>
            </div>
          </>
        )}
      </div>
      <ToastContainer />
    </>
  );
}
