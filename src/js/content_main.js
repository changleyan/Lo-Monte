import { adicionarCarrito } from "./find_product.js";
import { reloadPage } from "./tools/utils.js";
import { timerReload } from "./tools/constants.js";

export function main() {
  document.ready = adicionarCarrito();
  setInterval(reloadPage, timerReload);
}
