/* eslint-env mocha */

// const babelCore = require('@babel/core')


import { expect } from 'chai';
import MarketWorker from '../../worker/marketWorker';

const className = 'MarketWorker';
// new Error('this function was expect an object but got')

describe(`${className}#addIfDoesNotExistPrice`, () => {
  it('should throw an error if function params are wrong', () => {
    const worker = MarketWorker();
    const price = worker.addIfDoesNotExistPrice();
    assert.throws(price, Error, 'this function was expect an object but got');
  });
});
