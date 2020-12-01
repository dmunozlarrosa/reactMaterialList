import React from "react";
import { hexToRgb } from "./Helpers";
import Label from "./Label.component";
// import ButtonToggle from "../Button/Toggle/ButtonToggle.component";
import TableTitles from "./DataListTitles.component";
// import EnhancedTableToolbar from './DataListToolbar.component'
import { makeStyles } from "@material-ui/core/styles";
import { Check as CheckIcon } from "@material-ui/icons";
import {
  Table,
  TableBody,
  TableCell,
  Typography,
  IconButton,
  Link,
  TableContainer,
  //  TablePagination,
  TableRow,
  Button,
  Paper
} from "@material-ui/core";

function makePercentBarByGradient(color, opacity, percent) {
  // console.log("color")
  // console.log(color)
  // console.log("color? color : #FFFFFF")
  // console.log(color? color : "#FFFFFF")
  let myColorRGBA = hexToRgb(color ? color : "#FFFFFF");
  myColorRGBA.push(percent);
  myColorRGBA = `rgba(${myColorRGBA.join(",")})`;
  let result = `linear-gradient(0.25turn, 
                  ${myColorRGBA}      ${percent - 3}%,
                  rgba(250,250,250,${opacity}) ${percent + 3}%,
                  rgba(250,250,250,${opacity}) 100%)`;
  return result;
}

function percentBar(x, i, cols, row) {
  return (
    <TableCell
      id={i}
      style={{
        paddingRight: i.id === cols[cols.length - 1] ? 4 : 10,
        paddingLeft: i.id === cols[0] ? 4 : 10,
        paddingTop: 2,
        paddingBottom: 2
      }}
      align="center"
    >
      <Button
        style={{
          outline: 0,
          width: "100%",
          border: "none",
          margin: "2px",
          height: "15px",
          borderRadius: "50px",
          background: makePercentBarByGradient(
            row[x.id].color,
            0.8,
            row[x.id].value
          )
        }}
      >
        {row[x.id].value}
      </Button>
    </TableCell>
  );
}
function circleColor(x, i, cols, row) {
  const elements = !Array.isArray(row[x.id]) ? [row[x.id]] : row[x.id];
  return (
    <TableCell
      /* id = {i} */ style={{
        paddingRight: i === cols[cols.length - 1] ? 4 : 10,
        paddingLeft: i === cols[0] ? 4 : 10,
        paddingTop: 2,
        paddingBottom: 2
      }}
      align="center"
    >
      {elements.map((y) => {
        let myColorRGBA = hexToRgb(y.color ? y.color : "#FFFFFF");
        myColorRGBA.push(1);
        myColorRGBA = `rgba(${myColorRGBA.join(",")})`;
        return (
          <Button
            style={{
              outline: 0,
              // width : '30px',
              padding: "3px",
              border: 0,
              margin: "2px",
              // opacity : 0.8,
              height: "20px",
              borderRadius: "50px",
              minWidth: "20px",
              background: myColorRGBA
            }}
          >
            {y.value ? y.value.toString() : ""}
          </Button>
        );
      })}
    </TableCell>
  );
}
function link(x, i, cols, row) {
  // const preventDefault = (event) => event.preventDefault();
  // console.log(`icons: x ${x} i ${i}`);
  return (
    <TableCell
      id={i}
      style={{
        paddingRight: i.id === cols[cols.length - 1] ? 4 : 10,
        paddingLeft: i.id === cols[0] ? 4 : 10,
        paddingTop: 2,
        paddingBottom: 2
      }}
      // align="center"
      align="center"
    >
      <Typography variant="subtitle1">
        <Link
          href={row[x.id].value}
          style={{ fontWeight: "bold" }}
          // onClick={preventDefault}
        >
          {row[x.id].label}
        </Link>
      </Typography>
    </TableCell>
  );
}
function icons(x, i, cols, row) {
  // console.log(`icons: x ${x} i ${i}`);
  return (
    <TableCell
      id={i}
      style={{
        paddingRight: i.id === cols[cols.length - 1] ? 4 : 10,
        paddingLeft: i.id === cols[0] ? 4 : 10,
        paddingTop: 2,
        paddingBottom: 2
      }}
      align="center"
    >
      {!Array.isArray(row[x.id])
        ? ""
        : row[x.id].map((x) => {
            return <IconButton>{x}</IconButton>;
          })}
    </TableCell>
  );
}
function label(x, i, cols, row) {
  const state_map = {
    completed: {
      text: {
        en: "COMPLETED",
        es: "COMPLETADO",
        pt: "COMPLETADO"
      },
      color: "success"
    },
    inProcess: {
      text: {
        en: "IN PROCESS",
        es: "EN PROCESO",
        pt: "EM PROCESSO"
      },
      color: "warning"
    },
    error: {
      text: {
        en: "ERROR",
        es: "ERROR",
        pt: "ERROR"
      },
      color: "error"
    }
  };
  // row[x.id].
  const getStateLabel = (stateType, lang = "en") => {
    if (!state_map[stateType]) return "";
    lang = lang.toString().trim().toLowerCase();
    if (lang.length !== 2) lang = "en";
    const text = state_map[stateType].text[lang];
    const color = state_map[stateType].color;
    // return {text, color}
    return <Label color={color}>{text}</Label>;
  };
}
function dropDown(x, i, cols, row) {
  // TO DOO!!!! https://codesandbox.io/s/kbcee?file=/demo.js:1288-1334
  // return (
  //   <TableCell>
  //     <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
  //         {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
  //     </IconButton>
  //   </TableCell>)
}
export { circleColor, percentBar, dropDown, link, icons, label };
// {
//   type: "BENCH",
//   title: {
//     value:
//       "https://docs.google.com/document/d/1sG77EQR2BhGa1Ziz2AF-n0W5F_JVFoir4YiosPJJh8g/edit#",
//     label: "Bench - Trigo Inv"
//   },
//   link_dash: [<OpenInNew />],
//   user: "dmunoz@geoagro.com",
//   date: "30/11/2020",
//   state: {
//     text: "COMPLETADO",
//     color: "success"
//   },
//   actions: [<GetApp />]
// },
