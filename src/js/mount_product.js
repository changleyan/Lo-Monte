import { detenerCiclo, FetchReq, setContinuar } from "./tools/constants.js";
import { doFetch } from "./tools/utils.js";
let contPeticiones = 0;

const peticiones = async () => {
  console.log("Peticiones:");
  setContinuar(false);
  for (let index = 0; index < detenerCiclo; index++) {
    try {
      let req = FetchReq();
      await doFetch(req);
      contPeticiones++;
      console.log("Cantidad de peticiones: " + contPeticiones);
    } catch (error) {
      alert("Ocurrio esto: " + error);
      console.log({ error });
    }
  }
  console.log("Hemos terminado por hoy!");
};

export { peticiones };
