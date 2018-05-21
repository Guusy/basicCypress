describe('form submit', () => {

    it('Adds a new todo item', () => {
        const newTodo = 'Buy Milk'
        cy.server()
        cy.route({
            method: 'POST',
            url: '/api/todos',
            response: {
                id: 123,
                name: newTodo,
                isComplete: false
            }
        }).as('save')


        cy.seedAndVisit('fixture:todos')

        cy.get('.new-todo')
            .type(newTodo)
            .type('{enter}')

        cy.wait('@save')

        cy.get('.todo-list li').should('have.length', 5)
    })
    it('show an error mesage for failed form submit', () => {
        const newTodo = 'Test'
        cy.server()
        cy.route({
            method: 'POST',
            url: '/api/todos',
            status: 500,
            response: {}
        }).as('save')
        cy.seedAndVisit('fixture:todos')
        cy.get('.new-todo')
            .type(newTodo)
            .type('{enter}')

        cy.wait('@save')

        cy.get('.todo-list li').should('have.length', 4)
        
        cy.get('.error').should('be.visible')
    })
})