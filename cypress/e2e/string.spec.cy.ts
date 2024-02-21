import { circleSelector } from '../../src/constants/constants';
import {DELAY_IN_MS} from '../../src/constants/delays';

describe('string-page works correctly', function () {
  beforeEach(function () {
    cy.visit('/recursion');
  });

  it('if the input is empty,the button is not available', () => {
    cy.get('input').clear();
    cy.get('button[type="submit"]').should('be.disabled');
    cy.get('input').type('Hello_World');
    cy.get('button[type="submit"]').should('be.enabled');
  });

  it('should reverse the string c0rrectly', () => {
    const actualString = "enter";
    const firstActColors = [
      'rgb(210, 82, 225)',
      'rgb(0, 50, 255)',
      'rgb(0, 50, 255)',
      'rgb(0, 50, 255)',
      'rgb(210, 82, 225)',
    ];
    const performingString = "rntee"
    const secondActColors = [
      'rgb(127, 224, 81)',
      'rgb(210, 82, 225)',
      'rgb(0, 50, 255)',
      'rgb(210, 82, 225)',
      'rgb(127, 224, 81)',
    ]

    const expectedString = "retne"
    const expectedActColors = [
      'rgb(127, 224, 81)',
      'rgb(127, 224, 81)',
      'rgb(127, 224, 81)',
      'rgb(127, 224, 81)',
      'rgb(127, 224, 81)',
    ]

    cy.get('input').type(actualString);
    cy.get('button').should('not.be.disabled');
    cy.get('button[type="submit"]').click();


    cy.get(circleSelector).each(($el, index, $list) => {
      cy.get($list).should('have.length', '5');
      cy.get($el).contains(actualString[index]);
      cy.get($el).should('have.css', 'border-color', firstActColors[index]);
    });

    cy.wait(DELAY_IN_MS);

    cy.get(circleSelector).each(($el, index, $list) => {
      cy.get($list).should('have.length', '5');
      cy.get($el).contains(performingString[index]);
      cy.get($el).should('have.css', 'border-color', secondActColors[index]);
    });

    cy.wait(DELAY_IN_MS);

    cy.get(circleSelector).each(($el, index, $list) => {
      cy.get($list).should('have.length', '5');
      cy.get($el).contains(expectedString[index]);
      cy.get($el).should('have.css', 'border-color', expectedActColors[index]);
    });
  });
});