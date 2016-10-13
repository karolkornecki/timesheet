module.exports = {
    beforeEach: function (browser) {
        browser
            .url('http://localhost:3000')
            .waitForElementVisible('body', 10000)
            .click('#account-menu')
            .waitForElementVisible('a[href="/register"]', 10000)
            .click('a[href="/register"]')
    },

    'should register button be disabled if form is not filled': function (browser) {
        browser
            .expect.element('#register').to.not.be.enabled
        browser.end()
    },

    'should display validation errors': function (browser) {
        browser
            .setValue('input[name="username"]', 'usernameWithUpperCaseAndDigits5')
            .setValue('input[name="email"]', 'mailDoesNotMatchPattern')
            .setValue('input[name="password"]', 'aaa')
            .setValue('input[name="confirmation"]', 'aaa')
            .waitForElementVisible('span[class="validation-error"]', 1000)
            .end()
    }
}