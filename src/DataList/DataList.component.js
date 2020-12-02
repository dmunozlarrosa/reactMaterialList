import React from "react";
import { hexToRgb } from "./Helpers";
// import ButtonToggle from "../Button/Toggle/ButtonToggle.component";
import TableTitles from "./DataListTitles.component";
import {
  circleColor,
  percentBar,
  link,
  icons,
  label
} from "./DataTypes.components";
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
  Paper,
  IconButton
} from "@material-ui/core";

const useStyles = makeStyles((theme) => {
  return {
    title : {
      borderBottom: `5px solid rgba(${hexToRgb(
        theme.palette.primary.main.toString()
      ).join(",")},0.3)`
    },
    root: {
      // whiteSpace: "initial"
    },
    paper: {
      // marginBottom: theme.spacing(2),
      background: "rgba(255,255,255,0.6)",
      borderRadius: "2px 2px 5px 5px",
      borderTop: `5px solid rgba(${hexToRgb(
        theme.palette.primary.main.toString()
      ).join(",")},0.02)`
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
  let AAA = columns.filter((x) => x.myType && x.myType === "percentBar");
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
    if (numSelected !== rowCount) {
      let newSelecteds = props.rows.map((n) => n.selectedValues);
      props.selectHandle(newSelecteds);
      return;
    }
    props.selectHandle([]);
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
    if(props.selectHandle) props.selectHandle(newSelected);
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

  function getCells(row, labelId, columns) {
    return columns.map((x, i) => {
      switch (x.myType) {
        case "selectIcon":  return x.component;
        case "percentBar":  return percentBar(x, i, columns, row);
        case "circleColor": return circleColor(x, i, columns, row);
        case "link":        return link(x, i, columns, row);
        case "icons":       return icons(x, i, columns, row, props.dense);
        case "label":       return label(x, i, columns, row);
        // case "dropDown"://   return getDropDown(x, i, columns, row); // TO DOO!!!! https://codesandbox.io/s/kbcee?file=/demo.js:1288-1334
        default:
          return (
            <TableCell
              key = {i}
              style={{
                paddingRight:
                  i.id === columns[columns.length - 1] ? 4 : 10,
                paddingLeft: i.id === columns[0] ? 4 : 10,
                paddingTop: props.dense ? 2 : 16,
                paddingBottom: props.dense ? 2 : 16
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
            size={"medium"}
            aria-label="enhanced table"
          >
            <TableTitles
              classes={classes}
              selecteds={props.selecteds}
              numSelected={selected !== undefined ? selected.length : 0 }
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
                  function getRowWraper(elementRow){
                    return( 
                      <TableRow style={{ padding: 2 }}
                                onClick={(event) =>
                                  selected ? handleClick(event, row.selectedValues) : ""
                                }
                                role="checkbox"
                                aria-checked={isItemSelected}
                                tabIndex={-1}
                                key={index}
                                selected={isItemSelected}>
                        {elementRow}
                      </TableRow>)
                  }
                  function getCellSelected(){
                    const notSelected = !selected 
                                      || selected.length === 0 
                                      || selected.length === props.rows.length 
                    return (
                      <TableCell key = {0} 
                                 style = {{ padding: 3, paddingLeft: 5}}
                                 width = { props.dense ? "30px" : "1%"} >
                        {
                          isItemSelected ? (
                              <IconButton 
                                  key = {index}
                                  id = {index}
                                  size={props.dense ? "small" : "medium"}>
                                <CheckIcon
                                  style={{ padding: 0, border: 0 }}
                                  color="primary"
                                />
                              </IconButton>
                            ) : (
                                <IconButton key = {index}
                                            size = {props.dense ? "small" : "medium"} 
                                            style = {{backgroundColor: notSelected?"rgba(0,0,0,0.00)":"rgba(0,0,0,0.02)", margin : 0}}>
                                    <span style = {{
                                            border: "0",
                                            borderRadius : "50px",
                                            margin : 0,
                                            disabled: true,
                                            backgroundColor: "rgba(0,0,0,0.00)",
                                            height: props.dense ? "25px" : "25px",
                                            width:  props.dense ? "25px" : "25px",
                                          }}
                                    />
                                </IconButton> 
                            )
                        }
                      </TableCell>);
                  }
                  let columns = selected ? 
                        [{ 
                            myType : "selectIcon",
                            component : getCellSelected()
                        }] : [] 
                  columns = columns.concat(props.columns)
                  return getRowWraper(getCells(row, labelId, columns))
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
