// https://codesandbox.io/s/distracted-wozniak-mw8vt?file=/src/App.js
// https://codesandbox.io/s/distracted-wozniak-mw8vt?file=/src/App.js
// https://codesandbox.io/s/distracted-wozniak-mw8vt?file=/src/App.js

import React from "react";
import "./styles.css";
import DataList from "./DataList/DataList.component";
import { Divider } from "@material-ui/core";
import { getCropsData, getFarmsData, getUserData } from "./data.js";

function getDataList(i){
  return ( 
    <DataList 
      columns = {i.data.columns} 
      rows = {i.data.rows} 
      dense = {i.dense ? i.dense : false} 
      backgroundColor = {i.backgroundColor}
      selecteds = {i.selecteds?i.selecteds: undefined} 
    />);
}

export default function App() {
  return (
    <div className="App" style={{backgroundColor: "#F6F6F7", padding : "20px"}}>
      {
        getDataList({data : getUserData(),
                     backgroundColor: "F6F6F6"})                                      
      }
      {
          <Divider style={{ margin: 20 }} />
      }
      {
        getDataList({data : getCropsData("es"), 
                    dense : true,
                    selecteds: ["corn", "potato"] ,
                    backgroundColor: "#ECF8FF"}
                    )
      }
      {
        <Divider style={{ margin: 20 }} />
      }
      {
        getDataList({data : getFarmsData(), selecteds : ["margarita"]})                     
        // getDataList({data : getFarmsData(),selecteds : []})
      }
      {
        <Divider style={{ margin: 20 }} />
      }
      {
        getDataList({data : getFarmsData(), 
                     dense : true}) 
      }
    </div>
  );
}
