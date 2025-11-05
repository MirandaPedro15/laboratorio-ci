const { validarDescuento } = require('./funcionGrupo2');

describe('validarDescuento', () => {
    const productosValidos = [
        { precio: 100, cantidad: 2 },
        { precio: 50, cantidad: 1 }
    ];

    test('debe calcular correctamente con descuento válido del 20%', () => {
        const resultado = validarDescuento(productosValidos, 20);
        expect(resultado).toBe(200);
    });

    test('debe rechazar descuento mayor a 50%', () => {
        const resultado = validarDescuento(productosValidos, 60);
        expect(resultado).toBe('Error: el descuento debe estar entre 0 y 50%');
    });
});
