const password = require('../utils/password');

test('testing password validation', () => {
    const original = "myPassword";
    const fake = "notMyPassoword";
    const encrypted = password.encrypt(original);
    expect(password.validate(original, encrypted))
    .toBe(true);
    expect(password.validate(fake, encrypted))
    .toBe(false);
})
