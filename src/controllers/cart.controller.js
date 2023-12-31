import { cartManager } from "../dao/db/cart.js";

async function newCart(req, res) {
  try {
    const newCart = await cartManager.createCart(req.body);
    res.status(200).json({ message: "Carrito creado con exito ", newCart });
    return newCart;
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function findCart(req, res) {
  try {
    const { cid } = req.params;
    const cart = await cartManager.findCartById(cid);
    if (!cart) {
      res.status(400).json({ message: "Cart not found with the id" });
      return;
    }
    res.status(200).json({ message: "Cart found", cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function deleteCart(req, res) {
  try {
    const { cid } = req.params;
    const cart = await cartManager.deleteOne(cid);
    if (!cart) {
      res.status(400).json({ message: "Cart not found with the id" });
      return;
    }
    res.status(200).json({ message: "Cart deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function deleteProductByIdFromCart(req, res) {
  try {
    const { cid, pid } = req.params;

    const cart = await cartManager.deleteProductToCart(cid, pid);

    res.status(200).json({ message: "Product deleted from Cart", cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function updateCart(req, res) {
  try {
    const { cid } = req.params;
    const updatedCart = await cartManager.updateOne(cid, req.body);
    if (updatedCart) {
      res.status(200).json({ message: "Cart edited" });
    } else {
      res.status(400).json({ message: "Cart not found with the id" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function updateProductByIdFromCartById(req, res) {
  try {
    const { cid, pid } = req.params;

    const cart = await cartManager.updateProductFromCart(cid, pid);

    res.status(200).json({ message: "Product edited", cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
export {
  newCart,
  findCart,
  deleteCart,
  deleteProductByIdFromCart,
  updateCart,
  updateProductByIdFromCartById,
};
