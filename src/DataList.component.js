import React from "react";
import { hexToRgb } from "./Helpers";
// import ButtonToggle from "../Button/Toggle/ButtonToggle.component";
import TableTitles from "./DataListTitles.component";
import {
  circleColor,
  percentBar,
  dropDown,
  link,
  icons,
  label
} from "./myDataType";
// import EnhancedTableToolbar from './DataListToolbar.component'
import { makeStyles } from "@material-ui/core/styles";
import { Check as CheckIcon } from "@material-ui/icons";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  //  TablePagination,
  TableRow,
  Button,
  Paper
} from "@material-ui/core";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      whiteSpace: "initial"
    },
    paper: {
      // marginBottom: theme.spacing(2),
      background: "rgba(255,255,255,0.6)",
      borderRadius: "2px 2px 5px 5px",
      borderTop: `5px solid rgba(${hexToRgb(
        theme.palette.primary.main.toString()
      ).join(",")},0.5)`
    },
    table: {},
    visuallyHidden: {
      border: 0,
      clip: "rect(0 0 0 0)",
      height: 1,
      margin: -1,
      overflow: "hidden",
      padding: 0,
      position: "absolute",
      top: 20,
      width: 1
    }
  };
});

function descendingComparator(a, b, orderBy, columns) {
  let AAA = columns.filter((x) => x.myType && x.myType === "_percentBar");
  if (AAA.map((x) => x.id).indexOf(orderBy) > -1) {
    if (b[orderBy].value < a[orderBy].value) {
      return -1;
    }
    if (b[orderBy].value > a[orderBy].value) {
      return 1;
    }
    return 0;
  }

  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy, columns) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy, columns)
    : (a, b) => -descendingComparator(a, b, orderBy, columns);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export default function DataList(props) {
  const classes = useStyles();
  const selected = props.selecteds;
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("percent");
  const [page /* , setPage */] = React.useState(0);
  const [rowsPerPage /* , setRowsPerPage */] = React.useState(2000);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (numSelected, rowCount) => {
    // console.log("numSelected")
    // console.log(numSelected)
    console.log("props.rows");
    console.log(props.rows);

    if (numSelected !== rowCount) {
      // if (event.target.checked) {
      let newSelecteds = props.rows.map((n) => n.selectedValues);
      // console.log("newSelecteds")
      // console.log(newSelecteds)
      // setSelected(newSelecteds);
      props.selectHandle(newSelecteds);
      return;
    }
    props.selectHandle([]);
    // setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    // setSelected(newSelected);
    props.selectHandle(newSelected);
  };

  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setPage(0);
  // };

  const isSelected = (name) =>
    selected !== undefined ? selected.indexOf(name) !== -1 : false;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, props.rows.length - page * rowsPerPage);

  function getCells(row, labelId) {
    return props.columns.map((x, i) => {
      // console.log("x.myType")
      console.log(x.myType);
      switch (x.myType) {
        case "_percentBar":
          return percentBar(x, i, props.columns, row);
        case "_circleColor":
          return circleColor(x, i, props.columns, row);
        case "_link":
          return link(x, i, props.columns, row);
        case "_icons":
          return icons(x, i, props.columns, row);
        // case "_dropDown":
        //   return getDropDown(x, i, props.columns, row); // TO DOO!!!! https://codesandbox.io/s/kbcee?file=/demo.js:1288-1334
        default:
          return (
            <TableCell
              style={{
                paddingRight:
                  i.id === props.columns[props.columns.length - 1] ? 4 : 10,
                paddingLeft: i.id === props.columns[0] ? 4 : 10,
                paddingTop: props.streched ? 2 : 12,
                paddingBottom: props.streched ? 2 : 12
              }}
              align={x.numeric ? "right" : "left"}
              id={labelId}
            >
              {row[x.id] ? row[x.id] : " - "}
            </TableCell>
          );
      }
    });
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableContainer style={{ maxHeight: 550, paddingTop: 5 }}>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={"big"}
            aria-label="enhanced table"
          >
            <TableTitles
              classes={classes}
              selecteds={props.selecteds}
              numSelected={selected} // !== undefined ? selected.length : 0}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={() =>
                handleSelectAllClick(selected.length, props.rows.length)
              }
              onRequestSort={handleRequestSort}
              rowCount={props.rows.length}
              parentProps={props}
            />
            <TableBody>
              {stableSort(
                props.rows,
                getComparator(order, orderBy, props.columns)
              )
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.selectedValues);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  const myRow = (
                    <TableRow
                      style={{ padding: 2 }}
                      onClick={(event) =>
                        selected ? handleClick(event, row.selectedValues) : ""
                      }
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.selectedValues}
                      selected={isItemSelected}
                    >
                      {!selected ? (
                        ""
                      ) : (
                        <TableCell style={{ padding: 0, paddingLeft: 5 }}>
                          {
                            isItemSelected ? (
                              <CheckIcon
                                size={"small"}
                                style={{ padding: 0, border: 0 }}
                                color="primary"
                              />
                            ) : (
                              <span
                                style={{
                                  border: "0",
                                  disabled: true,
                                  backgroundColor: "rgba(0,0,0,0.0)",
                                  height: "21px",
                                  width: "21px"
                                }}
                              />
                            )
                            // <RemoveIcon size = {'medium'}  style={{padding: 2, border : 0}}/>
                          }
                        </TableCell>
                      )}
                      {getCells(row, labelId)}
                    </TableRow>
                  );
                  return myRow;
                })}
              {emptyRows > 0 && <TableRow style={{ height: 20 }}></TableRow>}
            </TableBody>
          </Table>
        </TableContainer>
        {
          // <EnhancedTableToolbar style = {{'minHeight' : '0px'}}
          //                       numSelected={selected.length} />
          // <TablePagination rowsPerPageOptions={[5, 10, 25]}
          //                  component="div"
          //                  count={props.rows.length}
          //                  rowsPerPage={rowsPerPage}
          //                  page={page}
          //                  style = {{'minHeight' : '0px'}}
          //                  onChangePage={handleChangePage}
          //                  onChangeRowsPerPage={handleChangeRowsPerPage}/>
        }
      </Paper>
    </div>
  );
}

// const columns2 = [
//   { id: 'name',    numeric: false,  label: 'Crop'                               },
//   { id: 'percent', numeric: true,   label: '%'         , width : '25%'  , myType : "_percentBar"},
//   { id: 'has',     numeric: true,   label: 'Total Has' , width : '100px'                        },
// ];

// const rows2 = [
//   {name : 'Corn'       , percent : { value :  5, color : "#FFFFFF"}, has :  3.7 },
//   {name : 'Soybean'    , percent : { value : 52, color : "#AAFFFF"}, has : 25.0 },
//   {name : 'Rise'       , percent : { value : 62, color : "#11FFFF"}, has : 16.0 },
//   {name : 'Soybean 2do', percent : { value : 59, color : "#FF11FF"}, has : 6.0  },
//   {name : 'Potato'     , percent : { value : 56, color : "#FFFF11"}, has : 16.0 },
// ];

// const columns = props.columns
// const columns = [
//   { id: 'name',    numeric: false,  label: 'Crop'                               },
//   { id: 'percent', numeric: true,   label: '%'         , width : '25%'  , myType : "_percentBar"},
//   { id: 'has',     numeric: true,   label: 'Total Has' , width : '100px'                        },
//   { id: 'fields',  numeric: true,   label: 'Fields   ' , width : '70px'                        },
// ];

// const rows = [
//   {name : 'Corn'       , percent : { value :  5, color : "#FFFFFF"}, has :  3.7, fields :  2  },
//   {name : 'Soybean'    , percent : { value : 52, color : "#AAFFFF"}, has : 25.0, fields : 12  },
//   {name : 'Rise'       , percent : { value : 62, color : "#11FFFF"}, has : 16.0, fields :  8  },
//   {name : 'Soybean 2do', percent : { value : 59, color : "#FF11FF"}, has :  6.0, fields : 16  },
//   {name : 'Potato'     , percent : { value : 56, color : "#FFFF11"}, has : 16.0, fields : 5   },
// ];

////------------------------------------------------------------------------------------------------------
////------------------------------------------------------------------------------------------------------
// const columns = props.columns
// const columns = [
//   { id: 'type',     numeric: false, label: 'Tipo',          },
//   { id: 'title',    numeric: false, label: 'Titulo',        myType : "_link" },
//   { id: 'link_dash',numeric: false, label: 'Tablero Datos', myType : "_icons"},
//   { id: 'user',     numeric: false, label: 'Usuario',       },
//   { id: 'date',     numeric: false, label: 'Fecha' ,        },
//   { id: 'state',    numeric: false, label: 'Estado',        myType : "_label"},
//   { id: 'actions',  numeric: false, label: 'Acciones',      myType : "_icons"},
// ];
// const rows = [
//   {
//       type : 'BENCH',
//       title : {
//         value : "https://docs.google.com/document/d/1sG77EQR2BhGa1Ziz2AF-n0W5F_JVFoir4YiosPJJh8g/edit#",
//         label : "Bench - Trigo Inv"
//       },
//       link_dash :  [
//          <OpenInNew/>
//       ],
//       user :  "dmunoz@geoagro.com",
//       date :  "30/11/2020",
//       state : {
//         text : 'COMPLETADO',
//         color : "success"
//       },
//       actions : [
//         <GetApp/>
//        ]
//   },
//   {
//       type : 'BENCH',
//       title : {
//         value : "https://docs.google.com/document/d/1sG77EQR2BhGa1Ziz2AF-n0W5F_JVFoir4YiosPJJh8g/edit#",
//         label : "Bench - Trigo Inv"
//       },
//       link_dash :  [
//          <OpenInNew/>
//       ],
//       user :  "meid@geoagro.com",
//       date :  "03/10/2020",
//       state : {
//         text : 'ERROR',
//         color : "error"
//       },
//       actions : [
//         <Cached/>,
//         <Delete/>
//       ]
//   },
// ];

// const state_map = {
//   completed: {
//     text: {
//       "en" : 'COMPLETED',
//       "es" : 'COMPLETADO',
//       "pt" : 'COMPLETADO'
//     },
//     color: 'success'
//   },
//   inProcess: {
//     text:{
//       "en" : 'IN PROCESS',
//       "es" : 'EN PROCESO',
//       "pt" : 'EM PROCESSO'
//     },
//     color: 'warning'
//   },
//   error: {
//     text: {
//       "en" : 'ERROR',
//       "es" : 'ERROR',
//       "pt" : 'ERROR'
//     },
//     color: 'error'
//   }
// };
// // import Label!!!!!!!!!!!!
// const getStateLabel = (stateType, lang = 'en') => {
//   if(!state_map[stateType]) return "";
//   lang = lang.toString().trim().toLowerCase();
//   if(lang.length !== 2) lang = 'en';
//   const text = state_map[stateType].text[lang];
//   const color = state_map[stateType].color;
//   return {text, color}
//   // (
//     // <Label color={color}>
//     //   {text}
//     // </Label>
//   // );
// };
