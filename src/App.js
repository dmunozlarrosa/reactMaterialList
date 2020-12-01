import React from "react";
import "./styles.css";
import DataList from "./DataList.component";
import { Divider } from "@material-ui/core";
import { cropsData, farmsData, userData } from "./data.js";

export default function App() {
  const fd = farmsData;
  const cd = cropsData;
  const ud = userData;
  return (
    <div className="App" style={{}}>
      {/* <DataList columns={fd.columns} rows={fd.rows} lang="en" selecteds={["margarita"]} />
      <Divider style={{ margin: 20 }} /> */}
      {/* <DataList
        lang="en"
        columns={fd.columns}
        rows={fd.rows}
        streched={false}
      />
      <Divider style={{ margin: 20 }} />
      <DataList
        lang="en"
        columns={cd.columns}
        rows={cd.rows}
        streched={true}
        selecteds={["corn", "potato"]}
      /> */}
      <Divider style={{ margin: 20 }} />
      <DataList
        lang="en"
        columns={ud.columns}
        rows={ud.rows}
        streched={true}
        // selecteds={["corn", "potato"]}
      />
    </div>
  );
}
