var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message.js');

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

describe('generateLocationMessage', () => {
    it('Should create correct location object', () => {
        let from = 'Deb';
        let latitude = 15;
        let longitude = 20;
        var url = 'https://www.google.com/maps?q=15,20';

        let message = generateLocationMessage(from, latitude, longitude);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from, url});
    })
});