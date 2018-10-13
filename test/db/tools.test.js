const mocha = require('mocha');
const expect = require('chai').expect;
const tools = require('../../db/tools');
const testItem = require('../../data/basicObjectRef.json')

describe('tools handles all the db functions', function(){
    it('should have a check item function', function(){
        expect(typeof tools.checkItem).to.equal('function');
    });

    it('should add all the right values', function(){
        const missing = {};
        const actualMissing = tools.checkItem(missing);

        expect(Object.keys(actualMissing).toString()).to.equal(Object.keys(testItem).toString());
    })
});