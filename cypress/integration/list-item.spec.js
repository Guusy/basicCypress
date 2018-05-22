describe('List Item behavior',()=>{

    it('Deletes an item',()=>{
        cy.server()
        cy.route({
            method:'DELETE',
            url:'/api/todos/*',
            response:{}
        }).as('delete')

        cy.seedAndVisit('fixture:todos')
        cy.get('.todo-list li').as('list')


        cy.get('@list')
        .first()
        .find('.destroy')
        .invoke('show')
        .click()
        //.click({force:true}) to force click when not visible

        cy.wait('@delete')
        cy.get('@list')
        .should('have.length',3)
    })
})