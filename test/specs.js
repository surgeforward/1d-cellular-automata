const { assert, expect } = chai;


// More Info: http://mathworld.wolfram.com/ElementaryCellularAutomaton.html
//
// We want to implement a one dimensional cellular automata. These have different rulesets that tell you whether
// a square will be colored in or not depending on whether the three squares above it are colored in or not.
//
// Here is a rule:
//
// If the cell above is:
//            111 110 101 100 011 010 001 000
// color it:   0   1   1   0   1   0   0   1
//
// This rule is known as 01101001, or rule #105 ((105).toString(2) == '01101001')
//
// ----------
//
// Here is another rule:
//
// If the cell above is:
//            111 110 101 100 011 010 001 000
// color it:   0   0   0   1   1   1   1   0
//
// This rule is known as 00011110, or rule #30
//
// ----------
//
// Lets write a function, that given a rule number 0-255, a line size, and a starting configuration, will return
// the sequence of colored in cell

const repeat = (value, times) => {
  return new Array(times).fill(value);
};

function * generateAutomata({ rule, width, initial }) {
  yield initial;

  const binary = leftPad(rule.toString(2), 8, '0');
  let previousLine = [0].concat(initial).concat([0]);
  let nextLine = [];
  for (let i = 1; i < previousLine.length - 1; i++) {
    let window = [previousLine[i - 1], previousLine[i], previousLine[i + 1]];
    switch (window.join('')) {
      case '111':
        nextLine.push(binary[0]);
        break;
      case '110':
        nextLine.push(binary[1]);
        break;
      case '101':
        nextLine.push(binary[2]);
        break;
      case '100':
        nextLine.push(binary[3]);
        break;
      case '011':
        nextLine.push(binary[4]);
        break;
      case '010':
        nextLine.push(binary[5]);
        break;
      case '001':
        nextLine.push(binary[6]);
        break;
      case '000':
        nextLine.push(binary[7]);
        break;
    }
  }
  yield nextLine.map(x => parseInt(x));
}

function leftPad(value, length = 1, padWith = ' ') {
  if (value.length >= length) return value;

  return padWith + leftPad(value, length - 1, padWith);
}

const width = 3;
const startingValue = repeat(0, Math.floor(width / 2)).concat([1]).concat(repeat(0, Math.floor(width / 2)));

describe(`1d cellular automata`, () => {
  describe(`rule 105`, () => {
    let automata = null;
    beforeEach(() => {
      automata = generateAutomata({
        rule: 105,
        width,
        initial: startingValue,
      });

      // for (let i = 0, value = automata.next().value; i < 50; value = automata.next().value) {
      //   console.log(value); //[0, 0, 0,0, 1,0,0,1, ....]
      // }
    });

    describe(`first time it's called`, () => {
      let line = null;
      beforeEach(() => {
        line = automata.next().value;
      });

      it(`Returns Initial Value`, () => assert.equal(line, startingValue));

      describe(`second time it's called`, () => {
        beforeEach(() => {
          line = automata.next().value;
        });

        it(`returns the next value`, () => expect(line).to.deep.equal([0, 0, 0]));
      });
    });
  });
});
