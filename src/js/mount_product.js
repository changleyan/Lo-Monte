import {
  detenerCiclo,
  GetParamsMount,
  setContinuar,
  URLactual,
} from "./tools/constants.js";
import { doFetch, GenerarUrlPago, openInNewTab } from "./tools/utils.js";
let contPeticiones = 0;
// let contPeticionesFallidas = 0;

const peticiones = async () => {
  console.log("Peticiones:");
  setContinuar(false);
  const url = URLactual;
  const params = await GetParamsMount();
  for (let index = 0; index < detenerCiclo; index++) {
    const response = await doFetch(url, params).catch((e) => {
      console.log(
        "There has been a problem with your fetch operation: " + e.message
      );
    });

    if (response.status === 200 && response.redirecte) {
      console.log("Producto agotado o tienda cerrada");
      // contPeticionesFallidas++;
      // if (contPeticionesFallidas === 50) {
      //   contPeticionesFallidas = 0;
      //   if (window.confirm("Producto agotado. Cierra esto!!")) {
      //     window.close();
      //   }
      // }
    }

    const text = await response.text();
    console.log(GenerarUrlPago());
    if (text.indexOf("0.00 CUP") === -1) {
      //Detener ciclo pq se monto un combo
      if (window.confirm("Producto montado, presione Aceptar para pagar!!")) {
        openInNewTab(GenerarUrlPago());
      }
      break;
    }
    console.log(
      `EL producto no se ha montado!. "Cantidad de peticiones: ${contPeticiones}`
    );
    contPeticiones++;
  }
  console.log("Hemos terminado por hoy!");
};

export { peticiones };
