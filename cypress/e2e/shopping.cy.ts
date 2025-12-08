
describe('Shopping Flow', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('displays the homepage correctly', () => {
        cy.contains('E-SHOP').should('be.visible');
        cy.get('input[placeholder="Buscar productos..."]').should('be.visible');
    });

    it('adds a product to the cart', () => {
        // Verificar que el contador del carrito no existe inicialmente o es 0 (no visible según Navbar.tsx lógica)
        cy.contains('button', '🛒 Carrito').find('span').should('not.exist');

        // Encontrar el primer botón de "Añadir al carrito" y hacer clic
        cy.contains('button', 'Añadir al carrito').first().click();

        // Verificar que aparece el contador con "1"
        cy.contains('button', '🛒 Carrito').find('span').should('contain', '1');
    });

    it('navigates to the cart page', () => {
        cy.contains('button', 'Añadir al carrito').first().click();
        cy.contains('a', '🛒 Carrito').click();

        cy.url().should('include', '/cart');
        cy.contains('h1', '🛒 Carrito de Compras').should('be.visible');
        cy.contains('Total:').should('be.visible');
    });
});
