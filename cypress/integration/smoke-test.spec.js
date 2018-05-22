describe('Smoke Tests',()=>{

    beforeEach(()=>{
        cy.request('DELETE','/api/todos/all')
    })
    context('No todos',()=>{
        it('Add new todo',()=>{
            cy.server()
            cy.route('POST','/api/todos').as('save')

            cy.visit('/')

            cy.get('.new-todo').type('New Todo{enter}')

            cy.wait('@save')


            cy.get('.todo-list li')
            .should('have.length',1)

        })
    })
    context('With todos',()=>{
        beforeEach(()=>{
            cy.fixture('todos')
            .then(todos=>{
                cy.request('POST','/api/todos/bulkload',{todos})
            })

            cy.server()
            cy.route('GET','/api/todos').as('load')

            cy.visit('/')

            cy.wait('@load')
        })

        it('Delete todos',()=>{
            cy.route('DELETE','/api/todos/*').as('delete')
            cy.get('.todo-list li').each(element =>{
                cy.wrap(element)
                .find('.destroy')
                .invoke('show')
                .click()


                cy.wait('@delete')
            }).should('not.exist')
        })

    })
})