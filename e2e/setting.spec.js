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

    'should redirect to setting page page when Account -> Settings chosen': function (browser) {
        browser.click('#account-menu')
            .waitForElementVisible('a[href="/settings"]', 10000)
            .click('a[href="/settings"]')
            .assert.urlEquals('http://localhost:3000/settings')
        browser.end()
    },

    'should successfully saved account changes': function (browser) {
        browser.click('#account-menu')
            .waitForElementVisible('a[href="/settings"]', 10000)
            .click('a[href="/settings"]')
            .setValue('input[name="firstName"]', 'Tom')
            .click('button[type="submit"]')
            .waitForElementVisible('div[class*="alert-success"]', 10000)
            .assert.containsText('div[class*="alert-success"]', 'Settings saved!')
        browser.end()
    },

    'should display errors that email already exist': function (browser) {
        browser.click('#account-menu')
            .waitForElementVisible('a[href="/settings"]', 10000)
            .click('a[href="/settings"]')
            .clearValue('input[name="email"]')
            .setValue('input[name="email"]', 'admin@admin.pl')
            .click('button[type="submit"]')
            .waitForElementVisible('div[class*="alert-danger"]', 10000)
            .assert.containsText('div[class*="alert-danger"]', 'Email already in use!')
        browser.end()
    },

    'should display errors when internal server error code returned': function (browser) {
        browser.click('#account-menu')
            .waitForElementVisible('a[href="/settings"]', 10000)
            .click('a[href="/settings"]')
            .clearValue('input[name="email"]')
            .setValue('input[name="email"]', 'system@system.pl') // response code 500
            .click('button[type="submit"]')
            .waitForElementVisible('div[class*="alert-danger"]', 10000)
            .assert.containsText('div[class*="alert-danger"]', 'An error has occurred! Please contact to your administrator.')
        browser.end()
    },

    'should display errors when 404 error code returned': function (browser) {
        browser.click('#account-menu')
            .waitForElementVisible('a[href="/settings"]', 10000)
            .click('a[href="/settings"]')
            .clearValue('input[name="email"]')
            .setValue('input[name="email"]', '404@404.pl') // response code 404
            .click('button[type="submit"]')
            .waitForElementVisible('div[class*="alert-danger"]', 10000)
            .assert.containsText('div[class*="alert-danger"]', 'An error has occurred! Please contact to your administrator.')
        browser.end()
    },

    'should submit button be disabled when validation errors occur': function (browser) {
        browser.click('#account-menu')
            .waitForElementVisible('a[href="/settings"]', 10000)
            .click('a[href="/settings"]')
            .clearValue('input[name="email"]')
            .setValue('input[name="email"]', 'rwrwrwerw') // does not match email pattern
            .expect.element('button[type="submit"]').to.not.be.enabled
        browser.end()
    }
}