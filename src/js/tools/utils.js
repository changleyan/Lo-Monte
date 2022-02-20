import { continuar, d, setContinuar, PathNameUrl } from "./constants.js";

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

const doFetch = async (url, params) => {
  const response = await fetch(url, params);
  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }
  return response;
};

const GenerarUrlPago = () => {
  let end = PathNameUrl.lastIndexOf("/");
  let start = 1;
  let province = PathNameUrl.slice(start, end);
  return `https://www.tuenvio.cu/${province}/CheckOut.aspx`;
};

const openInNewTab = (url) => {
  window.open(url, "_blank").focus();
};

export { reloadPage, doFetch, GenerarUrlPago, openInNewTab };
