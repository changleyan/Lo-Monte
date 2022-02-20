const d = document;
const w = window;
const URLactual = w.location.href;
const timerReload = 6000;
const detenerCiclo = 150000;

let continuar = false;

const setContinuar = (param) => {
  continuar = param;
  console.log(continuar);
};

const cookie =
  document.cookie +
  "; ASP.NET_SessionId=f5db2vpelf5krn0hxtjazw4m; ShopMSAuth=0102D3175EF27DF1D908FED37F225486F1D908000A4C006500790061006E004300680061006E00670000012F00FF";

const baseHeaders = {
  accept: "*/*",
  "accept-language": "es-US,es-419;q=0.9,es;q=0.8,en;q=0.7",
  "cache-control": "no-cache",
  "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
  "sec-ch-ua":
    '" Not A;Brand";v="99", "Chromium";v="98", "Google Chrome";v="98"',
  "sec-ch-ua-mobile": "?0",
  "sec-ch-ua-platform": '"Windows"',
  "sec-fetch-dest": "empty",
  "sec-fetch-mode": "cors",
  "sec-fetch-site": "same-origin",
  "x-microsoftajax": "Delta=true",
  "x-requested-with": "XMLHttpRequest",
  cookie,
  Referer: URLactual,
  "Referrer-Policy": "strict-origin-when-cross-origin",
};

const parte1 =
  "ctl00%24ScriptManager1=ctl00%24ScriptManager1%7Cctl00%24cphPage%24productsControl%24rptListProducts%24ctl00%24listTemplate%24btnCart&__EVENTTARGET=ctl00%24cphPage%24productsControl%24rptListProducts%24ctl00%24listTemplate%24btnCart&__EVENTARGUMENT=&__LASTFOCUS=&cphPage_productsControl_rptListProducts_listTemplate_0_DetailTabs_0_ClientState=%7B%22ActiveTabIndex%22%3A-1%2C%22TabState%22%3A%5B%5D%7D&PageLoadedHiddenTxtBox=Set&__VIEWSTATE=";

const parte5 =
  "&Language=es-MX&CurrentLanguage=es-MX&Currency=&ctl00%24cphPage%24productsControl%24TopTools%24cbxSortType=&ctl00%24cphPage%24productsControl%24TopTools%24cbxPageSize=-1&ctl00%24cphPage%24productsControl%24rptListProducts%24ctl00%24listTemplate%24txtCount=1&ctl00%24taxes%24listCountries=54&__ASYNCPOST=true&";

const parte3 = "&__VIEWSTATEGENERATOR=";
let auxData1 = d.getElementById("__VIEWSTATE").value;
let auxData2 = auxData1.replace(/\//g, "%2F");
let auxData3 = auxData2.replace(/\+/g, "%2B");

const parte2 = auxData3.replace("=", "%3D");
const parte4 = d.getElementById("__VIEWSTATEGENERATOR").value;

const dataBody = `${parte1}${parte2}${parte3}${parte4}${parte5}`.replace(
  /(\r\n|\n|\r)/gm,
  ""
);

const params = {
  headers: baseHeaders,
  body: dataBody,
  method: "POST",
};

const FetchReq = fetch(URLactual, params);

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

const doFetch = async () => {
  const response = await FetchReq.catch((error) => {
    console.error(error);
  });
  const json = await response;
  console.log(response);
  if (response.status === 200) {
    if (response.redirected) {
      console.log("Producto agotado");
    } else {
      console.log("Peticion correcta");
    }
  }
  return json;
};

let contPeticiones = 0;

const peticiones = async () => {
  console.log("Peticiones");
  setContinuar(false);
  for (let index = 0; index < detenerCiclo; index++) {
    try {
      await doFetch();
      contPeticiones++;
      console.log("Cantidad de peticiones: " + contPeticiones);
    } catch (error) {
      alert("Ocurrio esto: " + error);
      let btn = await d.getElementsByClassName("input-append")[0]
        .lastElementChild;
      console.log({ btn }, "error");
    }
  }
  console.log("Hemos terminado por hoy!");
};

const adicionarCarrito = async () => {
  if (
    URLactual.toLocaleLowerCase().includes("Order".toLocaleLowerCase()) ||
    URLactual.toLocaleLowerCase().includes("SignIn".toLocaleLowerCase()) ||
    URLactual.toLocaleLowerCase().includes("Account".toLocaleLowerCase()) ||
    URLactual.toLocaleLowerCase().includes("StoreClosed".toLocaleLowerCase()) ||
    URLactual.toLocaleLowerCase().includes(
      "mtto_sys_producto_agotado".toLocaleLowerCase()
    ) ||
    URLactual.toLocaleLowerCase().includes("CheckOut".toLocaleLowerCase())
  ) {
    setContinuar(false);
  } else {
    setContinuar(true);
  }
  try {
    const existBtnAdd = await d.getElementsByClassName("input-append");
    console.log(existBtnAdd);
    if (existBtnAdd !== null && existBtnAdd.length > 0) {
      peticiones();
    }
  } catch (error) {
    console.log(error);
  }
};

document.addEventListener("readystatechange", (event) => {
  adicionarCarrito();
});

setInterval(reloadPage, timerReload);
