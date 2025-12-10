describe('Home Page & Discovery Flow', () => {
    beforeEach(() => {
        // Interceptamos la llamada REAL a la API externa
        // Usamos glob pattern ** para que coincida con https://fakestoreapi.com/products
        cy.intercept('GET', '**/products').as('getProducts');
        cy.visit('/');
    });

    it('should display the homepage correctly', () => {
        cy.wait('@getProducts');
        cy.contains('E-SHOP').should('be.visible');
        cy.get('input[placeholder="Buscar productos..."]').should('be.visible');
    });

    it('should display the products requested from API', () => {
        cy.wait('@getProducts');
        // Verificamos que se hayan renderizado productos (el grid de productos)
        // Buscamos elementos que tengan el estilo de las cards
        cy.get('.grid').find('button').contains('Añadir al carrito').should('have.length.at.least', 1);
    });

    it('filters products by real time search', () => {
        cy.wait('@getProducts');
        // Escribimos "SanDisk" que sabemos que existe en la API fake
        cy.get('input[placeholder="Buscar productos..."]').type('SanDisk');

        // Verificamos que solo aparezcan productos que contengan ese texto
        cy.contains('SanDisk').should('be.visible');
        // El número de botones "Añadir..." debería ser menor que el total inicial (ej. 2)
        cy.get('button:contains("Añadir al carrito")').should('have.length.lt', 10);
    });

    it('should show empty state when product not found', () => {
        cy.wait('@getProducts');
        cy.get('input[placeholder="Buscar productos..."]').type('unicornio mágico');
        cy.contains('No se encontraron productos.').should('be.visible');
    });

    it('should sort products by price ascending (Low to High)', () => {
        cy.wait('@getProducts');

        // Seleccionar opción de menor a mayor
        cy.get('select').select('price_asc');

        // Esperamos un momento para que React re-ordene el DOM
        cy.wait(500);

        // Usamos .should en lugar de .then para que Cypress REINTENTE la verificación
        // hasta que el DOM se actualice y la lista esté ordenada.
        cy.get('.grid').find('p.text-gray-600').should(($prices) => {
            // Extraemos el texto, quitamos el '$' y convertimos a número
            const prices = [...$prices].map(el => parseFloat(el.innerText.replace('$', '')));

            // Creamos una copia y la ordenamos con JS para comparar
            const sortedPrices = [...prices].sort((a, b) => a - b);

            // Aserción: El array original extraído del DOM debe ser igual al ordenado
            expect(prices).to.deep.equal(sortedPrices);
        });
    });

    it('should sort products by price descending (High to Low)', () => {
        cy.wait('@getProducts');

        cy.get('select').select('price_desc');
        // Quitamos el cy.wait(500) explícito porque .should ya se encarga de esperar


        cy.get('.grid').find('p.text-gray-600').should(($prices) => {
            const prices = [...$prices].map(el => parseFloat(el.innerText.replace('$', '')));
            const sortedPrices = [...prices].sort((a, b) => b - a);
            expect(prices).to.deep.equal(sortedPrices);
        });
    });

});
