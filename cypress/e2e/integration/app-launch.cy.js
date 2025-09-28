/// <reference types="cypress" />

const categoryQueryId = '[class^="ingredient-preview_previews__"]'
const checkoutQueryId = '[class^="burger-constructor_wrap__"]'
const cardQueryId = '[class^="ingredient-card_wrap__"]'
const selectedQueryId = '[class="constructor-element"]'
const totalQueryId = '[class^="burger-constructor_priceTotal__"]'
const submitQueryId = '[type="submit"]'

const testIndex = 5

describe('app should launch successfuilly', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000')
    })
    
    async function getItemText(query, index) {
        const item = await cy.get(query).eq(index).then(elt => elt)
        return item?.[0]?.innerText || ''
    }

    async function moveItem(sourceSelector, targetSelector, index = 0) {
        cy
            .get(sourceSelector)
            .eq(index)
            .drag(targetSelector)
    }

    it('should load and render 3 kind of ingredients', () => {
        cy.get(categoryQueryId)
            .then(elts => elts.length)
            .should('eql', 3)
    })

    it('drag on ingredient card should move it to checkout items', async () => {
        moveItem(cardQueryId, checkoutQueryId, testIndex)
        
        const texts = await Promise.all([
            getItemText(cardQueryId, testIndex),
            getItemText(selectedQueryId, 0),
            getItemText(totalQueryId, 0)
        ])

        const [price, name, count] = texts[0].split('\n')

        it('name and price of dragged item should be equal to preview in checkout bar', () => {
            const [selectedName, selectedPrice] = texts[1].split('\n')
            cy.expect(name.toLowerCase()).to.eq(selectedName.toLowerCase())
            cy.expect(parseInt(price)).to.eq(parseInt(selectedPrice))
        })

        it('total price should be equal to sum of separate component prices', () => {
            const [total] = texts[2].split('\n').filter(Boolean)
            const totalPriceCount = +price * +count
            cy.expect(parseInt(total)).to.eq(totalPriceCount)
        })      
    })

    it('Unauthorized user goes to login page after checkout', async () => {
        cy.get(submitQueryId).click()
        cy.url().should('include', '/login')
    })
})
