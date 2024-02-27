import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";
import { circleSelector, submitButtonSelector } from '../../src/constants/constants';

describe('fibonacci page works correctly', function () {
  beforeEach(function () {
    cy.visit('/fibonacci');
  });

  it('if the input is empty,the button is not available', () => {
    cy.get('input').clear();
    cy.get(submitButtonSelector).should('be.disabled');
    cy.get('input').type('5');
    cy.get(submitButtonSelector).should('be.enabled');
  });

  it('Should generate Fibonacci numbers correctly', () => {

    const inputNumber = 5; // Задаем число для генерации ряда Фибоначчи

    cy.get('input[type="number"]').type(inputNumber); // Вводим число в инпут
    cy.get(submitButtonSelector).click(); // Нажимаем на кнопку

    const fibonacciArray = [1, 1, 2, 3, 5, 8]; // Ожидаемый массив чисел Фибоначчи для введенного числа

    cy.get(circleSelector).each(($el, index, $list) => { // Проверяем каждый круг
      cy.get($el).contains(fibonacciArray[index]); // Проверяем соответствие значения круга ожидаемому значению из массива Фибоначчи
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(circleSelector).each(($el, index, $list) => { // Проверяем каждый круг
      cy.get($el).contains(fibonacciArray[index]); // Проверяем соответствие значения круга ожидаемому значению из массива Фибоначчи
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(circleSelector).each(($el, index, $list) => { // Проверяем каждый круг
      cy.get($el).contains(fibonacciArray[index]); // Проверяем соответствие значения круга ожидаемому значению из массива Фибоначчи
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(circleSelector).each(($el, index, $list) => { // Проверяем каждый круг
      cy.get($el).contains(fibonacciArray[index]); // Проверяем соответствие значения круга ожидаемому значению из массива Фибоначчи
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(circleSelector).each(($el, index, $list) => { // Проверяем каждый круг
      cy.get($el).contains(fibonacciArray[index]); // Проверяем соответствие значения круга ожидаемому значению из массива Фибоначчи
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(circleSelector).each(($el, index, $list) => { // Проверяем каждый круг
      cy.get($el).contains(fibonacciArray[index]); // Проверяем соответствие значения круга ожидаемому значению из массива Фибоначчи
    });

    cy.wait(SHORT_DELAY_IN_MS);

  });
});