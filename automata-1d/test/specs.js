const { assert } = chai

/*
  More Info: http://mathworld.wolfram.com/ElementaryCellularAutomaton.html

  We want to implement a one dimensional cellular automata. These have different rulesets that tell you whether
  a square will be colored in or not depending on whether the three squares above it are colored in or not.

  Here is a rule:

  If the cell above is:
             111 110 101 100 011 010 001 000
  color it:   0   1   1   0   1   0   0   1

  This rule is known as 01101001, or rule #105 ((105).toString(2) == '01101001')

  ----------

  Here is another rule:

  If the cell above is:
             111 110 101 100 011 010 001 000
  color it:   0   0   0   1   1   1   1   0

  This rule is known as 00011110, or rule #30

  ----------

  Lets write a function, that given a rule number 0-255, a line size, and a starting configuration, will return
  the sequence of colored in cells on the following line
*/
describe(`1d cellular automata`, () => {
    it(`fails`, () => assert.equal(false, true))
})
