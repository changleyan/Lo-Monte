import {
  detenerCiclo,
  GetParamsMount,
  setContinuar,
  URLactual,
} from "./tools/constants.js";
import {
  doFetch,
  GenerarUrlPago,
  openInNewTab,
  multiplesPeticiones,
} from "./tools/utils.js";
let contPeticiones = 0;
// let contPeticionesFallidas = 0;

const peticiones = async () => {
  console.log("Peticiones:");
  setContinuar(false);
  const url = URLactual;
  const params = await GetParamsMount();
  let comprobar = 0;
  for (let index = 0; index < detenerCiclo; index++) {
    await multiplesPeticiones(1, url, params);
    if (comprobar >= 500) {
      const response = await doFetch(url, params).catch((e) => {
        console.log(
          "There has been a problem with your fetch operation: " + e.message
        );
      });
      console.log("respone: ", response);
      if (response !== undefined) {
        if (
          response.url
            .toLocaleLowerCase()
            .includes("mtto_sys_producto_agotado".toLocaleLowerCase())
        ) {
          console.log("Producto agotado");
          break;
        } else {
          const text = await response.text();
          console.log("text:", { text });
          if (response.status === 200 && !response.redirected) {
            console.log("Peticion correcta");
            if (
              text.indexOf("0.00 CUP") === -1 &&
              text.indexOf(
                "document.f1.s1.options[document.f1.s1.selectedIndex].value.concat('/MyContacts')"
              ) === -1
            ) {
              //Detener ciclo pq se monto un combo
              let pagar = window.confirm(
                "Producto montado, presione Aceptar para pagar!!"
              );
              if (pagar) {
                openInNewTab(GenerarUrlPago());
              }
              break;
            }
          }
        }
        comprobar = 0;
      }
    } else {
      comprobar++;
    }

    console.log(
      `EL producto no se ha montado!. "Cantidad de peticiones: ${contPeticiones}`
    );
    contPeticiones++;
  }
  console.log("Hemos terminado por hoy!");
};

export { peticiones };
