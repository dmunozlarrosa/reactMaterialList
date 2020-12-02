import React from "react";
import { hexToRgb } from "./Helpers";
import Label from "./Label.component";
import {
  TableCell,
  Typography,
  IconButton,
  Link,
  Button,
} from "@material-ui/core";

function makePercentBarByGradient(color, opacity, percent) {
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
      key={i}
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
        key = {i}
        style={{
          paddingRight: i === cols[cols.length - 1] ? 4 : 10,
          paddingLeft: i === cols[0] ? 4 : 10,
          paddingTop: 2,
          paddingBottom: 2
      }}
      align="center"
    >
      {elements.map((y, ii) => {
        let myColorRGBA = hexToRgb(y.color ? y.color : "#FFFFFF");
        myColorRGBA.push(1);
        myColorRGBA = `rgba(${myColorRGBA.join(",")})`;
        return (
          <Button
            key = {ii}
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
  return (
    <TableCell
      key={i}
      style={{
        paddingRight: i.id === cols[cols.length - 1] ? 4 : 10,
        paddingLeft: i.id === cols[0] ? 4 : 10,
        paddingTop: 2,
        paddingBottom: 2
      }}
      // align="center"
      // align="left"
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

function icons(x, i, cols, row, dense) {
  return (
    <TableCell
      key={i}
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
        : row[x.id].map((x, i) => {
            return (
              <IconButton key = {i} size={dense ? "small" : "medium"}>{x}</IconButton>
            );
          })}
    </TableCell>
  );
}

function label(x, i, cols, row) {
  let data = {text :"-noData-", color : "error" };
  if ( x.id && row[x.id] ){
      if( row[x.id].color) 
        data.color = row[x.id].color
      if( row[x.id].text )
        data.text = row[x.id].text
  }
  return (
    <TableCell
      key={i}
      style={{
        paddingRight: i.id === cols[cols.length - 1] ? 4 : 10,
        paddingLeft: i.id === cols[0] ? 4 : 10,
        paddingTop: 2,
        paddingBottom: 2
      }}
      align="center"
    >
      <Label style = {{marginBottom:0}} color={data.color}>{data.text}</Label>
    </TableCell>
  )
}
// function dropDown(x, i, cols, row) {
//   // TO DOO!!!! https://codesandbox.io/s/kbcee?file=/demo.js:1288-1334
//   // return (
//   //   <TableCell>
//   //     <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
//   //         {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
//   //     </IconButton>
//   //   </TableCell>)
// }
export { circleColor, percentBar, link, icons, label };
