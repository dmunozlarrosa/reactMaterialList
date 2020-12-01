import React from "react";
import { OpenInNew, GetApp, Cached, Delete } from "@material-ui/icons";

const cropsData = {
  columns: [
    {
      id: "name",
      numeric: false,
      label: {
        en: "Crop",
        es: "Cultivo",
        pt: "Cultivo"
      }
    },
    {
      id: "percent",
      numeric: true,
      label: {
        en: "%",
        es: "%",
        pt: "%"
      },
      width: "25%",
      myType: "_percentBar"
    },
    {
      id: "has",
      numeric: true,
      label: {
        en: "Total Has",
        es: "Hectareas Totales",
        pt: "Hectareas Totales"
      },
      width: "100px"
    },
    {
      id: "fields",
      numeric: true,
      label: {
        en: "Fields",
        es: "Lotes",
        pt: "Lotes"
      },
      width: "70px"
    }
  ],
  rows: [
    {
      selectedValues: "corn",
      name: "Corn",
      percent: { value: 5, color: "#FFFFFF" },
      has: 3.7,
      fields: 2
    },
    {
      selectedValues: "soybean",
      name: "Soybean",
      percent: { value: 52, color: "#AAFFFF" },
      has: 25.0,
      fields: 12
    },
    {
      selectedValues: "rise",
      name: "Rise",
      percent: { value: 62, color: "#11FFFF" },
      has: 16.0,
      fields: 8
    },
    {
      selectedValues: "soybean2do",
      name: "Soybean 2do",
      percent: { value: 59, color: "#FF11FF" },
      has: 6.0,
      fields: 16
    },
    {
      selectedValues: "potato",
      name: "Potato",
      percent: { value: 56, color: "#FFFF11" },
      has: 16.0,
      fields: 5
    }
  ]
};

const farmsData = {
  columns: [
    {
      id: "name",
      numeric: false,
      label: {
        en: "Farm",
        es: "Establecimiento",
        pt: "Estabelecimento"
      },
      width: "40px"
    },
    {
      id: "crops",
      numeric: true,
      label: {
        en: "Crops",
        es: "Cultivo",
        pt: "Cultivo"
      },
      width: "50%",
      myType: "_circleColor"
    },
    {
      id: "has",
      numeric: true,
      label: {
        en: "Has",
        es: "Has",
        pt: "Has"
      },
      width: "40px"
    },
    {
      id: "percent",
      numeric: true,
      label: {
        en: "%",
        es: "%",
        pt: "%"
      },
      width: "40px"
    },
    {
      id: "fieldsAmount",
      numeric: true,
      label: {
        en: "Fields",
        es: "Lotes",
        pt: "Lotes"
      },
      width: "40px"
    }
  ],
  rows: [
    {
      selectedValues: "Margarita",
      name: "Margarita",
      percent: 23,
      has: 87.1,
      // fields         : },
      fieldsAmount: 8,
      crops: [
        {
          value: "C",
          name: "Corn",
          has: 889,
          color: "#2FF241"
        },
        {
          value: "P",
          name: "Pea",
          has: 889,
          color: "#6d6dd6"
        },
        {
          value: "-",
          name: "-Not Defined-",
          has: 889,
          color: "#d6d6d6"
        }
      ]
    },
    {
      selectedValues: "saranga",
      name: "Saranga",
      percent: 63,
      has: 291.1,
      // fields         : },
      fieldsAmount: 18,
      crops: [
        {
          value: "S",
          name: "Soybean",
          has: 889,
          color: "#2412FF"
        }
      ]
    },
    {
      selectedValues: "papaFrita",
      name: "Papa frita",
      percent: 8.3,
      has: 9.6,
      // fields         : },
      fieldsAmount: 2,
      crops: [
        {
          value: "P",
          name: "Potato",
          has: 889,
          color: "#F242F1"
        },
        {
          value: "P",
          name: "Pea",
          has: 889,
          color: "#6d6dd6"
        }
      ]
    }
  ]
};

const userData = {
  columns: [
    {
      id: "type",
      numeric: false,
      label: {
        en: "Type",
        es: "Tipo",
        pt: "Tipo"
      }
    },
    {
      id: "title",
      numeric: false,
      label: {
        en: "Title",
        es: "Titulo",
        pt: "Titulo"
      },
      myType: "_link"
    },
    {
      id: "link_dash",
      numeric: false,
      label: {
        en: "Dashboard",
        es: "Tablero Datos",
        pt: "Tablero Datos"
      },
      myType: "_icons"
    },
    {
      id: "user",
      numeric: false,
      label: {
        en: "User",
        es: "Usuario",
        pt: "Usuario"
      }
    },
    {
      id: "date",
      numeric: false,
      label: {
        en: "Date",
        es: "Fecha",
        pt: "Fecha"
      }
    },
    // {
    //   id: "state",
    //   numeric: false,
    //   label: {
    //     en: "State",
    //     es: "Estado",
    //     pt: "Estado"
    //   },
    //   myType: "_label"
    // },
    {
      id: "actions",
      numeric: false,
      label: {
        en: "Actions",
        es: "Acciones",
        pt: "Acciones"
      },
      myType: "_icons"
    }
  ],
  rows: [
    {
      type: "BENCH",
      title: {
        value:
          "https://docs.google.com/document/d/1sG77EQR2BhGa1Ziz2AF-n0W5F_JVFoir4YiosPJJh8g/edit#",
        label: "Bench - Trigo Inv"
      },
      link_dash: [<OpenInNew />],
      user: "dmunoz@geoagro.com",
      date: "30/11/2020",
      // state: {
      //   text: "COMPLETADO",
      //   color: "success"
      // },
      actions: [<GetApp />]
    },
    {
      type: "BENCH",
      title: {
        value:
          "https://docs.google.com/document/d/1sG77EQR2BhGa1Ziz2AF-n0W5F_JVFoir4YiosPJJh8g/edit#",
        label: "Bench - Trigo Inv"
      },
      link_dash: [<OpenInNew />],
      user: "meid@geoagro.com",
      date: "03/10/2020",
      // state: {
      //   text: "ERROR",
      //   color: "error"
      // },
      actions: [<Cached />, <Delete />]
    }
  ]
};

export { cropsData, farmsData, userData };
