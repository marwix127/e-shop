describe('Cart Page', () => {

    it('should display the cart icon', () => {
        cy.visit('/');
        cy.get('button').contains('🛒 Carrito').should('be.visible');
    })

    it('product should be added to the cart', () => {
        cy.visit('/');
        cy.get('button').contains('Añadir al carrito').click();
        cy.contains('button', '🛒 Carrito').find('span').should('contain', '1');
    })

    it('same product should be added to the cart twice', () => {
        cy.visit('/');
        cy.get('button').contains('Añadir al carrito').click();
        cy.get('button').contains('Añadir al carrito').click();
        cy.contains('button', '🛒 Carrito').find('span').should('contain', '1');
    })

    it('Different products should be added to the cart', () => {
        cy.intercept('GET', '**/products').as('getProducts');
        cy.visit('/');
        cy.wait('@getProducts');

        // Obtenemos TODOS los botones de añadir y hacemos clic en el PRIMERO (índice 0)
        cy.contains('button', 'Añadir al carrito').parent().parent().eq(0).contains('Añadir al carrito').click();

        // Hacemos clic en el SEGUNDO (índice 1)
        // Usamos cy.get para encontrar todos los botones con ese texto
        cy.get('button:contains("Añadir al carrito")').eq(1).click();

        // Verificamos que el contador muestre 2 items distintos
        cy.contains('button', '🛒 Carrito').find('span').should('contain', '2');
    })

    it('product should be removed from the cart', () => {
        cy.visit('/');
        cy.get('button').contains('Añadir al carrito').click();
        cy.get('button').contains('🛒 Carrito').click();
        cy.contains('button', 'Eliminar').click();
        cy.contains('Tu carrito está vacío').should('be.visible');
    })

    it('should correctly calculate the total price based on product quantity and price', () => {
        cy.intercept('GET', '**/products').as('getProducts');
        cy.visit('/');
        cy.wait('@getProducts');

        // Add first product twice
        cy.get('button:contains("Añadir al carrito")').eq(0).click();
        cy.get('button:contains("Añadir al carrito")').eq(0).click();

        // Add second product once
        // Ensure we have enough products loaded, eq(1) requires at least 2 products.
        cy.get('body').then($body => {
            if ($body.find('button:contains("Añadir al carrito")').length > 1) {
                cy.get('button:contains("Añadir al carrito")').eq(1).click();
            }
        });

        cy.get('button').contains('🛒 Carrito').click();

        let calculatedTotal = 0;

        cy.get('[data-testid="cart-item"]').each(($el) => {
            const price = parseFloat($el.find('[data-testid="cart-item-price"]').text().replace('$', ''));
            const quantity = parseInt($el.find('[data-testid="cart-item-quantity"]').text());
            calculatedTotal += price * quantity;
        }).then(() => {
            cy.get('[data-testid="cart-total"]').invoke('text').then((text) => {
                const displayedTotal = parseFloat(text.replace('Total: $', ''));
                expect(displayedTotal).to.equal(parseFloat(calculatedTotal.toFixed(2)));
            });
        });
    })

});
