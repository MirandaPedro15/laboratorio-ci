function calcularTotalPedido(productos, descuento) {
 if (!Array.isArray(productos) || productos.length === 0)
 return "Error: no hay productos en el pedido";
 const subtotal = productos.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
 if (subtotal <= 0) return "Error: monto inválido";
 const total = subtotal - subtotal * (descuento / 100);
 return total;
}
module.exports = { calcularTotalPedido };
