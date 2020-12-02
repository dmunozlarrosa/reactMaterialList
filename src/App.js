// https://codesandbox.io/s/trusting-minsky-9zu6c
import React from "react";
import "./styles.css";
import DataList from "./DataList/DataList.component";
import { Divider } from "@material-ui/core";
import { getCropsData, getFarmsData, getUserData } from "./data.js";

function getDataList(i){
  const data      = i.data,
        selecteds = i.selecteds, 
        dense  = i.dense ? i.dense : false
  return ( 
    <DataList 
      columns   = {data.columns} 
      rows      = {data.rows} 
      dense  = {dense} 
      selecteds = {selecteds?selecteds: undefined} 
    />);
}

export default function App() {
  return (
    <div className="App" style={{}}>
      {
        getDataList({data : getUserData()})                                      
      }
      {
          <Divider style={{ margin: 20 }} />
      }
      {
        getDataList({data : getCropsData("es"), dense : true, selecteds: ["corn", "potato"] }) 
      }
      {
        <Divider style={{ margin: 20 }} />
      }
      {
        getDataList({data : getFarmsData(), selecteds : ["margarita"]})                     
        // getDataList({data : getFarmsData(), selecteds : []})
      }
      {
        <Divider style={{ margin: 20 }} />
      }
      {
        getDataList({data : getFarmsData(), dense : true}) 
      }
    </div>
  );
}
