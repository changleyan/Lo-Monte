const d = document;
const w = window;
const URLactual = w.location.href;
const PathNameUrl = w.location.pathname;
const timerReload = 2000;
const detenerCiclo = 50000;
const shopMSAuth =
  "010235A87EE6F0F4D908FE35104348F9F4D908000B44006100790072006F006E004300680061006E00670000012F00FF";
const asp = "5axplstguehr1texyhzaqiij";

let continuar = false;

const setContinuar = (param) => {
  continuar = param;
  console.log({ continuar });
};

const cookie = `${document.cookie}"; ASP.NET_SessionId=${asp}; ShopMSAuth=${shopMSAuth}`;

const GetParamsMount = () => {
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
  // console.log(params);

  return params;
  // return `fetch(${URLactual},${params})`;
};

export {
  d,
  w,
  URLactual,
  timerReload,
  detenerCiclo,
  continuar,
  PathNameUrl,
  setContinuar,
  GetParamsMount,
};
