/// <reference types="cypress" />
/**
 * @url - https://github.com/cypress-io/cypress-example-recipes/blob/master/examples/testing-dom__drag-drop/cypress/e2e/drag_n_drop_spec.cy.js
 * @description - попытка имитировать drag-n-drop через комбинацию trigger и mousedown, mouseup, mousemove 
 */
describe('app should launch successfuilly', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000')
    })
    
    async function moveItem(sourceSelector, targetSelector) {
        const target = await cy.get(targetSelector).then(elt => elt)
        const { x: targX, y: targY } = target[0].getBoundingClientRect()
        cy
            .get(sourceSelector)
            .first()
            .trigger('mousedown', { which: 1 })
            .trigger('mousemove', { clientX: targX + 60, clientY: targY + 100})
            // .then(() => {
            //     console.log(target[0])
            //     const evt = new Event('mouseup')
            //     target[0].dispatchEvent(evt)
            // })
            .trigger('mouseup', { force: true, clientX: targX + 60, clientY: targY + 100 })
    }

    it('should load and render 3 kind of ingredients', async () => {
        cy.get('[class^="ingredient-preview_previews__"]')
            .then(elts => elts.length)
            .should('eql', 3)
    })

    it('drag on ingredient card should move it to checkout items', () => {
        moveItem('[class^="ingredient-card_wrap__"]', '[class^="burger-constructor_wrap__"]')
    })
})
