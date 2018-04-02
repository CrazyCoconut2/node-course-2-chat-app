var expect = require('expect');

var {generateMessage} = require('./message.js');

describe('generateMessage', () => {
    it("Should generate correct message object", () => {
        let from = 'Jen';
        var text = 'Some message';
        let message = generateMessage(from, text);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from,text});
        
        // store res in variable
        // assert from match
        // assert text match
        // assert createdAt is number
        })
});