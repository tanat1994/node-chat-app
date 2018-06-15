const expect = require('expect');
const { generateMessage, generateLocationMessage } = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    const from = 'Jen';
    const text = 'Some message';
    const message = generateMessage(from, text);

    expect(typeof message.createdAt).toBe('number');
    // expect(message).toInclude({ from, text });

    // store res in variable
    // assert from match
    // assert text match
    // assert createdAt is number
  });
});

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    const from = 'Admin';
    const latitude = '13.00';
    const longitude = '14.00';
    const url = 'https://www.google.com/maps?q=13.00,14.00';
    const location = generateLocationMessage(from, latitude, longitude);

    expect(typeof location.createdAt).toBe('number');
    expect(location.url).toBe(url);
    expect(location.from).toBe(from);
    // expect(location).toInclude({ from, url });
  });
});
