import { circleSelector, elementStates, HeadSelector, IndexSelector, TailSelector, LetterSelector, indexInput, valueInput, circleSmallSelector } from '../../src/constants/constants';
import { SHORT_DELAY_IN_MS, DELAY_IN_MS } from "../../src/constants/delays";

describe('queue page works correctly', function () {
    beforeEach(function () {
        cy.visit('/list');
    });

    const addToHead = "Добавить в head";
    const addToTail = "Добавить в tail";
    const addByIndex = "Добавить по индексу";
    const delByIndex = "Удалить по индексу";
    const removeFromHead = "Удалить из head";
    const removeFromTail = "Удалить из tail";


    it('if the input is empty,the button is not available', () => {
        cy.get("input").should('be.empty');

        cy.contains(addToHead).should('be.disabled');
        cy.contains(addToTail).should('be.disabled');
        cy.contains(addByIndex).should('be.disabled');
        cy.contains(delByIndex).should('be.disabled');

        cy.get(valueInput).type('5');
        cy.contains(addToHead).should('be.enabled');
        cy.contains(addToTail).should('be.enabled');

        cy.get(indexInput).type('2');
        cy.contains(addByIndex).should('be.enabled');
        cy.contains(delByIndex).should('be.enabled');
    });

    it('should render default list correctly', () => {
        cy.get(circleSelector).should('have.length', '4');
        cy.get(circleSelector).each(($el, index, $list) => {
            cy.get($el).should('have.css', 'border-color', elementStates.default);
        });
        cy.get('[data-cy="circle"]').as('circle').each(($el, index, $list) => {
            if (index === 0) {
                cy.wrap($el).children(HeadSelector).contains('head');
            }
            if (index === $list.length - 1) {
                cy.wrap($el).children(TailSelector).contains('tail');
            }
        });

        cy.get(IndexSelector).each(($el, index) => {
            expect($el).to.contain(index);
        });
    });

    it('should add the element to head correctly', () => {
        cy.get(valueInput).type('100');
        cy.contains(addToHead).click();

        cy.get(circleSmallSelector).eq(0).should("have.css", "border-color", elementStates.changing)
            .contains('100');

        cy.get(circleSelector).should('have.length', '5');

        cy.get(circleSelector).eq(0).within(($el) => {
            cy.get($el).children(HeadSelector).should('not.exist');
            cy.get($el).should("have.css", "border-color", elementStates.modified);
            cy.get($el).children(LetterSelector).contains('100');
            cy.get($el).should("have.css", "border-color", elementStates.default);
        })

    });

    it('should remove the element from head correctly', () => {
        cy.get(circleSelector).eq(0).within(($el) => {
            cy.get($el).invoke('text').then((text) => {
                const letter = text;
            });

        })

        cy.contains(removeFromHead).click();

        cy.get(circleSelector).eq(0).within(($el) => {
            // cy.get($el).children(LetterSelector).should('not.contain.text', '');
            cy.get($el).should("have.css", "border-color", elementStates.default);
            
        });

        cy.get(circleSmallSelector).eq(0).should("have.css", "border-color", elementStates.default)
        cy.get(circleSmallSelector).eq(0).contains('letter');

        cy.get(circleSelector).should('have.length', '3');

    });

    it('should add the element to tail correctly', () => {
        cy.get(valueInput).type('100');
        cy.contains(addToTail).click();

        cy.get(circleSmallSelector).eq(0).should("have.css", "border-color", elementStates.changing)
            .contains('100');

        cy.get(circleSelector).should('have.length', '5');

        cy.get(circleSelector).eq(4).within(($el) => {
            cy.get($el).should("have.css", "border-color", elementStates.modified);
            cy.get($el).children(LetterSelector).contains('100');
            cy.get($el).should("have.css", "border-color", elementStates.default);
        })
    })

    it('should add the element by index correctly', () => {
        cy.get(valueInput).type('100');
        cy.get(indexInput).type('2');
        cy.contains(addByIndex).click();

        cy.get(circleSmallSelector).eq(0).should("have.css", "border-color", elementStates.changing)
            .contains('100');

        cy.get(circleSelector).eq(0).within(($el) => {
            cy.get($el).children(HeadSelector).should('not.exist');
            cy.get($el).should("have.css", "border-color", elementStates.changing);
        })

        cy.get(circleSmallSelector).eq(0).should("have.css", "border-color", elementStates.changing)
            .contains('100');

        cy.get('[data-cy="circle"]').as('circle').each(($el, index, $list) => {
            if (index === 0) {
                cy.wrap($el).children(HeadSelector).contains('head');
            }
        });

        cy.get(circleSelector).eq(1).within(($el) => {
            cy.get($el).should("have.css", "border-color", elementStates.changing);
        })

        cy.get(circleSmallSelector).eq(0).should("have.css", "border-color", elementStates.changing)
            .contains('100');

        cy.get(circleSelector).eq(2).within(($el) => {
            cy.get($el).should("have.css", "border-color", elementStates.changing);
        })

        cy.get(circleSmallSelector).should('not.exist');

        cy.get(circleSelector).eq(2).within(($el) => {
            cy.get($el).should("have.css", "border-color", elementStates.modified);
            cy.get($el).children(LetterSelector).contains('100');
        })

        cy.get(circleSelector).should('have.length', '5');

        cy.get(circleSelector).each(($el, index, $list) => {
            cy.get($el).should('have.css', 'border-color', elementStates.default);
        });
    });
});