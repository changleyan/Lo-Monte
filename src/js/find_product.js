import { d, URLactual, setContinuar } from "./tools/constants.js";
import { peticiones } from "./mount_product.js";

const adicionarCarrito = async () => {
  if (URLactual.toLocaleLowerCase().includes("Products".toLocaleLowerCase())) {
    setContinuar(true);
  } else {
    setContinuar(false);
  }
  try {
    const existBtnAdd = await d.getElementsByClassName("input-append");
    console.log(existBtnAdd, "btn");
    if (existBtnAdd !== null && existBtnAdd.length > 0) {
      peticiones();
    }
  } catch (error) {
    console.log(error);
  }
};

export { adicionarCarrito };
