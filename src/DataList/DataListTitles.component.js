import React from "react";
import PropTypes from "prop-types";
import {
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography
} from "@material-ui/core";
import { Check as CheckIcon } from "@material-ui/icons";

export default function TableTitles(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    parentProps
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  const checkBoxCell = (
    <TableCell style={{ padding: 0, paddingLeft: 5 }}
               width = { parentProps.dense ? "5px" : "5px"}
              //  width =  "1px"
               
               >
    {
    numSelected === rowCount ?                    //DESCOMENTARRR!!! solo debug de size checkicon
    (                                             
      <CheckIcon                                  
        size={"medium"}                           
        style={{ padding: 2, border: 0 }}         
        color="primary"                           
        onClick={onSelectAllClick}                
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
        onClick={onSelectAllClick}
      />
    )
    }
  </TableCell>
  )
  
  const tableCells = parentProps.columns.map((titleCell, i) => {
      let align = titleCell.myType &&
                  ( titleCell.myType.indexOf("label")       !== -1 ||
                    titleCell.myType.indexOf("percentBar")  !== -1 ||
                    titleCell.myType.indexOf("circleColor") !== -1 ||
                    titleCell.myType.indexOf("icons")       !== -1 ) ?
                        "center" :
                        titleCell.numeric ? 
                            "right" : 
                            "left" 
      return (
        <TableCell
          style={{ padding: "5px", whiteSpace: "initial" }}
          width={
            titleCell.width && titleCell.width !== ""
              ? titleCell.width
              : "inherith"
          }
          key={titleCell.id}
          align={align}
          sortDirection={orderBy === titleCell.id ? order : false}
        >
          <TableSortLabel
            active={orderBy === titleCell.id}
            direction={orderBy === titleCell.id ? order : "asc"}
            // onClick   = { createSortHandler(titleCell.id !== '_percentBar' ? "value" : titleCell.id)}>
            onClick={createSortHandler(titleCell.id)}
          >
            <Typography variant="caption">
              {titleCell.label}
            </Typography>
            {orderBy === titleCell.id ? (
              <span className={classes.visuallyHidden}>
                {order === "desc"
                  ? "sorted descending"
                  : "sorted ascending"}
              </span>
            ) : null}
          </TableSortLabel>
        </TableCell>
      );
  })
  return (
    <TableHead>
      {
        !props.selecteds ?
          <TableRow className = {classes.title}>{tableCells}</TableRow> :
          <TableRow className = {classes.title}>{checkBoxCell}{tableCells}</TableRow>
      }
    </TableHead>
  );
}

TableTitles.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};
