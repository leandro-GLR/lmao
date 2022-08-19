import React, { useEffect } from "react";
import { DatePicker } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { allGroups } from "../features/groupSlice";

export default function Home() {
  const dispatch = useDispatch();
  const group = useSelector((state) => state.group);

  useEffect(() => {
    dispatch(allGroups());

    return () => {};
  }, []);

  return (
    <>
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">Ranking Ventas</h1>
            </div>
            {/* /.col */}
            <div className="col-sm-6">
              <DatePicker picker="quarter" />
            </div>
            {/* /.col */}
          </div>
          {/* /.row */}
        </div>
        {/* /.container-fluid */}
      </div>
      {/* /.content-header */}
      <div className="content">
        {group && group.allGroups.length > 0 ? (
          <div className="row">
            {group.allGroups.map((group) => (
              <div className="col-4">
                <div>
                  <span>{group.AUX3}</span>
                  <span>{group.nombre_grupo}</span>
                </div>
                <div>
                  <span>Venta total:</span>
                  <span>{group.vta_total}</span>
                </div>
                <div>
                  {group.premiseTotalSales.map((premise) => (
                    <div>
                      <span>{premise.nombre_local}</span>
                      <span>{premise.vta_total}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        )}
      </div>
    </>
  );
}
