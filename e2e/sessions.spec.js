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
    },

    'should display message when session invalidated successfully': function (browser) {
        browser.click('#account-menu')
            .waitForElementVisible('a[href="/sessions"]', 10000)
            .click('a[href="/sessions"]')
            .waitForElementVisible('table:nth-child(1) button', 10000)
            .click('table:nth-child(1) button')
            .waitForElementVisible('div[class*="alert-success"]', 10000)
            .assert.containsText('div[class*="alert-success"]', 'Session invalidated!')
        browser.end()
    },

    'should display error message when session cannot be invalidated': function (browser) {
        browser.click('#account-menu')
            .waitForElementVisible('a[href="/sessions"]', 10000)
            .click('a[href="/sessions"]')
            .waitForElementVisible('table:nth-child(1) button', 10000)
            .click('table:nth-child(1) button')
            .waitForElementVisible('div[class*="alert-danger"]', 10000)
            .assert.containsText('div[class*="alert-danger"]', 'The session could not be invalidated.')
        browser.end()
    }
}