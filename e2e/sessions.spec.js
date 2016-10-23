module.exports = {
    beforeEach: function (browser) {
        browser
            .url('http://localhost:3000')
            .waitForElementVisible('body', 10000)
            .click('#account-menu')
            .waitForElementVisible('a[href="/login"]', 10000)
            .click('a[href="/login"]')
            .setValue('input[name="username"]', 'admin')
            .setValue('input[name="password"]', 'admin')
            .waitForElementVisible('#sign-in', 10000)
            .click('#sign-in')
    },

    'should redirect to session page when Account -> Sessions chosen': function (browser) {
        browser.click('#account-menu')
            .waitForElementVisible('a[href="/sessions"]', 10000)
            .click('a[href="/sessions"]')
            .assert.urlEquals('http://localhost:3000/sessions')
        browser.end()
    }
}