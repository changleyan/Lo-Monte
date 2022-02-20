import { continuar, d, setContinuar } from "./constants.js";

const reloadPage = () => {
  if (continuar) {
    setContinuar(false);
    console.log("Recargar");
    try {
      const btnModulo = d.getElementById(
        "cphPage_PathNavigationControl1_repCategories_lnkDepartments_2"
      );
      const btnContinuar = d.getElementById("continueShoppingLnk");

      if (btnContinuar !== undefined || btnContinuar !== null) {
        btnContinuar.style.backgroundColor = "blue";
        btnContinuar.click();
      } else if (btnModulo !== undefined || btnModulo !== null) {
        btnModulo.style.backgroundColor = "blue";
        btnModulo.click();
      } else {
        location.reload();
      }
    } catch (error) {
      console.log(error);
      location.reload();
    }
  }
};

const doFetch = async (req) => {
  const response = await req.catch((error) => {
    console.error(error);
  });
  const json = await response;
  if (response.status === 200) {
    if (response.redirected) {
      console.log("Producto agotado");
    } else {
      console.log("Peticion correcta");
    }
  }
  return json;
};

export { reloadPage, doFetch };
