describe('Checkout Flow', () => {

    it('should show empty state if accessed with empty cart', () => {
        cy.visit('/checkout');
        cy.contains('No hay items en el carrito para comprar.').should('be.visible');
        cy.contains('Volver al carrito').should('be.visible');
    });

    describe('With items in cart', () => {
        beforeEach(() => {
            // Setup: Añadir producto y navegar al checkout
            cy.intercept('GET', '**/products').as('getProducts');
            cy.visit('/');
            cy.wait('@getProducts');

            // Añadir el primer producto
            cy.contains('button', 'Añadir al carrito').first().click();

            // Ir al carrito
            cy.contains('button', '🛒 Carrito').click();

            // Ir al checkout
            cy.contains('a', 'Pagar').click();
        });

        it('should display order summary correctly', () => {
            cy.url().should('include', '/checkout');
            cy.contains('h1', 'Checkout').should('be.visible');

            // Verificar que aparece el resumen
            cy.contains('Resumen del Pedido').should('be.visible');
            // Verificar que hay al menos un item en la lista y un precio
            cy.get('ul li').should('have.length.at.least', 1);
            cy.contains('Total:').should('be.visible');
        });

        it('should complete the purchase flow successfully', () => {
            // Pulsar botón de pagar
            cy.contains('button', 'Confirmar y Pagar').click();

            // Verificar pantalla de éxito
            cy.contains('¡Compra Exitosa!').should('be.visible');
            cy.contains('ID de Orden:').should('be.visible');
            cy.contains('Total Pagado').should('be.visible');

            // Verificar que hay un botón para volver
            cy.contains('a', 'Volver a la tienda').should('be.visible');
        });

        it('should clear the cart after purchase', () => {
            // Completar compra
            cy.contains('button', 'Confirmar y Pagar').click();
            cy.contains('¡Compra Exitosa!').should('be.visible');

            // Volver a la tienda
            cy.contains('a', 'Volver a la tienda').click();

            // Verificar URL y que el carrito esté vacío (sin badge rojo)
            cy.url().should('eq', Cypress.config().baseUrl + '/');
            cy.contains('button', '🛒 Carrito').find('span').should('not.exist');
        });
    });
});
