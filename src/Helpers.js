// import React from 'react'

function getDateAsString(d) {
  return d ? (isValidDate(d) ? d.toISOString().split("T")[0] : "-") : "-";
}

function isValidDate(d) {
  return !d ? false : d instanceof Date && !isNaN(d);
}

function alphanumericToCodeNumber(word) {
  let alphanumericAmount = 2;
  word = word.replace(/[^0-9A-Z]+/gi, "");
  word = word.toLowerCase();
  word =
    word.length > alphanumericAmount
      ? word.substring(0, alphanumericAmount)
      : word;
  let newVal = Array.from(word)
    .map((x) => {
      let val = x.charCodeAt(0);
      return val <= 58 ? `0${val - 48}` : `${val - 87}`;
    })
    .join("");
  return newVal;
}

function hexToRgb(hex) {
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (result) {
    result[1] = parseInt(result[1], 16);
    result[2] = parseInt(result[2], 16);
    result[3] = parseInt(result[3], 16);
    result.splice(0, 1);
  } else result = null;
  // console.log("result")
  // console.log(result)
  return result;
}

function getAlphabeticString(myString) {
  return myString
    .replace(/[\W_]+/g, "")
    .replaceAll(/0/g, "Z")
    .replaceAll(/1/g, "Y")
    .replaceAll(/2/g, "X")
    .replaceAll(/3/g, "W")
    .replaceAll(/4/g, "V")
    .replaceAll(/5/g, "U")
    .replaceAll(/6/g, "T")
    .replaceAll(/7/g, "S")
    .replaceAll(/8/g, "R")
    .replaceAll(/9/g, "Q");
}
function chunkifyArray(a, n) {
  if (n < 2) return [a];
  var len = a.length,
    out = [],
    i = 0,
    size;
  if (len % n === 0) {
    size = Math.floor(len / n);
    while (i < len) out.push(a.slice(i, (i += size)));
  } else {
    while (i < len) {
      size = Math.ceil((len - i) / n--);
      out.push(a.slice(i, (i += size)));
    }
  }
  return out;
}

function chunkifyObject(object, n) {
  if (n < 2) return [object];
  let values = Object.values(object),
    keys = Object.keys(object),
    out = [];
  let matrixKeys = chunkifyArray(keys, n);
  let matrixValues = chunkifyArray(values, n);
  matrixKeys.forEach((v, i) => {
    out[i] = {};
    v.forEach((vv, ii) => {
      out[i][vv] = matrixValues[i][ii];
    });
  });
  return out;
}

//============================fetch some image example

// const useFetch = (url, options) => {
//   const [response, setResponse] = React.useState(null);
//   const [error, setError] = React.useState(null);
//   React.useEffect(() => {
//     const FetchData = async () => {
//       try {
//         fetch(url/* , options */)
//             .then(response => response.json())
//             .then( data => setResponse(data));
//       } catch (error) {
//         setError(error);
//       }
//     };
//     FetchData();
//   }, []);
//   return { response, error };
// };

// function FetchSomeImage() {
//   const res = useFetch(`https://dog.ceo/api/breeds/image/random`, {})
//   if (res.error !== null) alert(res.error)
//   console.log("response fetch")
//   console.log(res.response)
//   if (!res.response) {
//     return <div>Loading...</div>;
//   }
//   const dogName = res.response.status;
//   const imageUrl = res.response.message;
//   return (
//       <div>
//         <h3>{dogName}</h3>
//         <div>
//           <img src={imageUrl} alt="avatar" />
//         </div>
//       </div>
//   );
// }
// // implement:
// <FetchSomeImage style = {{position: 'absolute'}}/>

export {
  hexToRgb,
  getAlphabeticString,
  chunkifyArray,
  chunkifyObject,
  alphanumericToCodeNumber,
  isValidDate,
  getDateAsString
};
