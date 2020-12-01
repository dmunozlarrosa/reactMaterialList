import React from "react";
import PropTypes from "prop-types";
// import ButtonToggle from "../Button/Toggle/ButtonToggle.component";
// import { GlobalContext } from "../../storage/global.storage";
import {
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography
} from "@material-ui/core";
import { Check as CheckIcon } from "@material-ui/icons";

export default function TableTitles(props) {
  // const { globalState } = useContext(GlobalContext);
  const lang = props.lang ? props.lang : "en";
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

  // console.log(parentProps.columns.forEach(x => {
  //   console.log("x.width")
  //   console.log(x.width)
  // }));
  return (
    <TableHead>
      <TableRow>
        {!props.selecteds ? (
          ""
        ) : (
          <TableCell style={{ padding: 0, paddingLeft: 5, width: "30px" }}>
            {numSelected === rowCount ? (
              <CheckIcon
                size={"big"}
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
            )}
          </TableCell>
        )}
        {parentProps.columns.map((titleCell, i) => {
          return (
            <TableCell
              style={{ padding: "5px", whiteSpace: "initial" }}
              width={
                titleCell.width && titleCell.width !== ""
                  ? titleCell.width
                  : "inherith"
              }
              key={titleCell.id}
              align={titleCell.numeric ? "right" : "left"}
              sortDirection={orderBy === titleCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === titleCell.id}
                direction={orderBy === titleCell.id ? order : "asc"}
                // onClick   = { createSortHandler(titleCell.id !== '_percentBar' ? "value" : titleCell.id)}>
                onClick={createSortHandler(titleCell.id)}
              >
                <Typography variant="caption">
                  {titleCell.label[lang]}
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
        })}
      </TableRow>
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
