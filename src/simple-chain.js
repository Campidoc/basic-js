const { decorateObject } = require("../lib");
const { NotImplementedError } = require("../lib");

/**
 * Implement chainMaker object according to task description
 *
 */
const chainMaker = {
  chain: [],

  getLength() {
    return this.chain.length;
  },

  addLink(value) {
    if (value === undefined) {
      this.chain.push('');
    } else {
      this.chain.push(String(value));
    }
    return this;
  },

  removeLink(position) {
    if (typeof position !== 'number' || 
        !Number.isInteger(position) || 
        position < 1 || 
        position > this.chain.length) {
      this.chain = [];
      throw new Error("You can't remove incorrect link!");
    }

    this.chain.splice(position - 1, 1);
    return this;
  },

  reverseChain() {
    this.chain.reverse();
    return this;
  },

  finishChain() {
    const result = this.chain.map(value => `( ${value} )`).join('~~');
    this.chain = [];
    return result;
  }
};


function createChainMaker() {
  return Object.create(chainMaker);
}

module.exports = {
  chainMaker: createChainMaker()
};
