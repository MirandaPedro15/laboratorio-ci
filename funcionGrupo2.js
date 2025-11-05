const { calcularTotalPedido } = require('./pedido');

function validarDescuento(productos, descuento) {
    if (typeof descuento !== 'number') {
        return 'Error: el descuento debe ser un número';
    }
    
    if (descuento < 0 || descuento > 50) {
        return 'Error: el descuento debe estar entre 0 y 50%';
    }
    
    return calcularTotalPedido(productos, descuento);
}

module.exports = { validarDescuento };
