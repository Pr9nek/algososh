import { testUrl } from "../../src/constants/constants";

describe("fibonacci page works correctly", function () {
  before(function () {
    cy.visit(`${testUrl}/fibonacci`);
  });

  it('Example test', () => {
    expect(true).to.eq(true)
})
});