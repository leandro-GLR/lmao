import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Button, Popconfirm, Table, Space, Form, Input } from "antd";
import { isEmpty } from "lodash";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";

export default function Datatable() {
  // DATA
  const [gridData, setGridData] = useState([]);
  // LOADING
  const [loading, setLoading] = useState(false);
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

  useEffect(() => {
    loadData();

    return () => {};
  }, []);

  const loadData = async () => {
    setLoading(true);
    // OJITO QUE DEVUELVE UN ARREGLO CON 500 OBJECTOS Y NO UN ARREGLO QUE TIENE 5 ARREGLOS EN LOS CUALES EN CADA UNO HAY 100 OBJECTOS
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/comments"
    );

    setGridData(response.data);
    setLoading(false);
  };

  const handleDelete = async (user) => {
    const dataSource = [...modifiedData];
    const filteredData = dataSource.filter((item) => item.id !== user.id);
    setGridData(filteredData);
  };

  // CON ESTO CADA OBJETO TIENE AHORA UNA PROPIEDAD EXTRA LLAMADA AGE CON UNA EDAD RANDOM
  const dataWithAge = gridData.map((item) => {
    return {
      ...item,
      /* age: Math.floor(Math.random() * 100), */
      age: Math.floor(Math.random() * 6) + 20,
    };
  });

  // ACA ESTA MODIFICANDO LAS PROPIEDADES DE UN ELEMENTO DEL ARRAY EL CUAL ES UN OBJECTO, EL CUAL TIENE COMO OBJETIVO REEMPLAZARLE LA PROPIEDAD BODY POR UNA LLAMDA MESSAGE PERO CON EL CONTENIDO DEL BODY, ENTONCES HACE UN SPREAD OPERATOR PARA AISLAR LA DATA QUE SI QUIERO CONSERVAR Y SACAR EL QUE NO QUIERO EN ESTE CASO BODY, PARA LUEGO REINTEGRARSELO PERO EN UNA PROPIEDAD LLAMADA MESSAGE Y DE PASO AGREGO UNA PROPIEDAD KEY CON EL MISMO VALOR QUE EL ID DEL OBJECTO
  const modifiedData = dataWithAge.map(({ body, ...item }) => ({
    ...item,
    key: item.id,
    // ESTO SE AGREGA PORQUE LA PRIMERA VEZ EXISTE BODY, PERO CUANDO ELIMINAMOS UN OBJETO O UN USUARIO, ESTO SE VUELVE A EJECUTAR PERO LA PROPIEDAD BODY YA NO EXISTE ENTONCES DEBEMOS UTILIZAR MESSAGE EN CASO DE QUE NO EXISTA BODY Y BODY SI ES QUE EXISTE POR LA PRIMERA VEZ
    message: isEmpty(body) ? item.message : body,
  }));

  const isEditing = (record) => {
    return record.id === editRowKey;
  };

  const cancel = () => {
    setEditRowKey("");
  };
  const save = async (key) => {
    try {
      // la variable key tiene el valor de la propiedad key de los objectos que estan en el arreglo modifiedData
      // Es un objecto con los valores del formulario que se esta editando
      const row = await form.validateFields();
      const newData = [...modifiedData];
      // El findIndex devuelve el indice del objeto que se encuentra en el arreglo
      // Aca esta buscando el objecto para luego reemplazarlo con el nuevo objeto que se edito
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setGridData(newData);
        setEditRowKey("");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const edit = (record) => {
    form.setFieldsValue({
      name: "",
      email: "",
      message: "",
      ...record,
    });
    setEditRowKey(record.key);
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
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      align: "center",
      editTable: true,
      sorter: (a, b) => a.name.length - b.name.length,
      sortOrder: sortedInfo.columnKey === "name" && sortedInfo.order,
      ...getColumnSearchProps("name"),
    },
    {
      title: "Email",
      dataIndex: "email",
      align: "center",
      editTable: true,
      sorter: (a, b) => a.email.length - b.email.length,
      sortOrder: sortedInfo.columnKey === "email" && sortedInfo.order,
      ...getColumnSearchProps("email"),
    },
    {
      title: "Age",
      dataIndex: "age",
      align: "center",
      editTable: false,
      sorter: (a, b) => a.age - b.age,
      sortOrder: sortedInfo.columnKey === "age" && sortedInfo.order,
      filters: [
        { text: "20", value: "20" },
        { text: "21", value: "21" },
        { text: "22", value: "22" },
        { text: "23", value: "23" },
        { text: "24", value: "24" },
      ],
      /* filterMultiple: false, */
      // Si hay valor se dispara la propiedad onFilter
      filteredValue: filteredInfo.age || null,
      // Va a filtrar los records donde el valor de la columna sea igual al valor de la propiedad filteredValue, entonces digamos que el onFilter es un map y yo le paso value que sería el valor a filtrar y el record
      onFilter: (value, record) => String(record.age).includes(value),
    },
    /* {
      title: "Message",
      dataIndex: "message",
      align: "center",
      editTable: true,
      sorter: (a, b) => a.message.length - b.message.length,
      sortOrder: sortedInfo.columnKey === "message" && sortedInfo.order,
      ...getColumnSearchProps("message"),
    }, */
    {
      title: "Action",
      dataIndex: "action",
      align: "center",
      render: (text, record) => {
        const editable = isEditing(record);
        return modifiedData.length >= 1 ? (
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

  const globalSearch = () => {
    // NO esta haciendo una copia del estado
    filteredData = modifiedData.filter((value) => {
      return (
        value.name.toLowerCase().includes(searchText.toLowerCase()) ||
        value.email.toLowerCase().includes(searchText.toLowerCase()) ||
        value.message.toLowerCase().includes(searchText.toLowerCase())
      );
    });
    setGridData(filteredData);
  };

  return (
    <div className="container">
      <div className="table-responsive">
        <Space
          style={{ marginBottom: 16 }}
          className="d-flex justify-content-center pt-4"
        >
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
            dataSource={
              filteredData && filteredData.length > 0
                ? filteredData
                : modifiedData
            }
            loading={loading}
            // Si bien el sort ya funcionaba, como luego vamos a tener una funcionalidad de resetear el sort, entonces lo vamos a resetear con una funcion que se ejecuta al clickear el boton de resetear pero para eso necesitamos almacenar la información del sort que este actualmente activo, para eso vamos a usar el state sortInfo
            onChange={handleChange}
          />
        </Form>
      </div>
      <div className="mt-8">
        <h1>Another Section</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Voluptatibus, culpa quis minima necessitatibus aspernatur labore unde
          similique corporis dolores perferendis incidunt eveniet nihil.
          Dignissimos, ea! Temporibus vero beatae voluptatem voluptate.
        </p>
        <main>1</main>
      </div>
    </div>
  );
}
