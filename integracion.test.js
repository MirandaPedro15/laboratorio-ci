const { calcularTotalPedido } = require('./pedido');
const { validarDescuento } = require('./funcionGrupo2');

describe('Prueba de Integración - Grupo 2', () => {
    describe('Flujo completo: calcularTotalPedido + validarDescuento', () => {
        const productos = [
            { precio: 100, cantidad: 2 },
            { precio: 50, cantidad: 3 }
        ];

        test('Flujo exitoso: productos válidos con descuento permitido', () => {
            // Paso 1: Calcular total base
            const totalBase = calcularTotalPedido(productos, 0);
            expect(totalBase).toBe(350); // (100*2) + (50*3) = 350
            
            // Paso 2: Aplicar validación del grupo y descuento
            const totalConDescuento = validarDescuento(productos, 25);
            expect(totalConDescuento).toBe(262.5); // 350 - 25% = 262.5
            
            // Paso 3: Verificar que el resultado final es correcto
            expect(typeof totalConDescuento).toBe('number');
            expect(totalConDescuento).toBeGreaterThan(0);
        });

        test('Flujo de error: descuento fuera del rango permitido', () => {
            // Paso 1: Verificar que función base funciona
            const totalBase = calcularTotalPedido(productos, 0);
            expect(totalBase).toBe(350);
            
            // Paso 2: Aplicar validación del grupo (debe fallar)
            const resultado = validarDescuento(productos, 75);
            expect(resultado).toBe('Error: el descuento debe estar entre 0 y 50%');
            
            // Paso 3: Verificar que no se procesó el cálculo
            expect(typeof resultado).toBe('string');
            expect(resultado).toContain('Error');
        });

        test('Flujo de error: productos inválidos detectados por ambas funciones', () => {
            const productosInvalidos = [];
            
            // Paso 1: Función base detecta error
            const errorBase = calcularTotalPedido(productosInvalidos, 20);
            expect(errorBase).toBe('Error: no hay productos en el pedido');
            
            // Paso 2: Función del grupo también detecta el error
            const errorGrupo = validarDescuento(productosInvalidos, 20);
            expect(errorGrupo).toBe('Error: no hay productos en el pedido');
            
            // Paso 3: Verificar consistencia entre ambas funciones
            expect(errorBase).toBe(errorGrupo);
        });

        test('Comparación directa: función base vs función del grupo', () => {
            // Caso con descuento válido - ambas deben dar el mismo resultado
            const descuentoValido = 30;
            
            const resultadoBase = calcularTotalPedido(productos, descuentoValido);
            const resultadoGrupo = validarDescuento(productos, descuentoValido);
            
            expect(resultadoBase).toBe(resultadoGrupo);
            expect(resultadoBase).toBe(245); // 350 - 30% = 245
        });
    });
});
