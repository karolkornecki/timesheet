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

    'should redirect to change password page when Account -> Password chosen': function (browser) {
        browser.click('#account-menu')
            .waitForElementVisible('a[href="/password"]', 10000)
            .click('a[href="/password"]')
            .assert.urlEquals('http://localhost:3000/password')
            .expect.element('#change-password').to.not.be.enabled
        browser.end()
    },

    'should display error if password and its confirmation does not match': function (browser) {
        browser.click('#account-menu')
            .waitForElementVisible('a[href="/password"]', 10000)
            .click('a[href="/password"]')
            .setValue('input[name="password"]', 'secret')
            .setValue('input[name="confirmation"]', 'secret2')
            .waitForElementVisible('#change-password', 10000)
            .click('#change-password')
            .waitForElementVisible('#password-does-not-match', 10000)
            .assert.containsText('#password-does-not-match', 'The password and its confirmation do not match!')
            .expect.element('#change-password').to.not.be.enabled
        browser.end()
    },

    'should display error if http 400 response code returned during REST invocation': function (browser) {
        browser.click('#account-menu')
            .waitForElementVisible('a[href="/password"]', 10000)
            .click('a[href="/password"]')
            .setValue('input[name="password"]', 'system')// mock return error code 400 for password=system
            .setValue('input[name="confirmation"]', 'system')
            .waitForElementVisible('#change-password', 10000)
            .click('#change-password')
            .waitForElementVisible('#password-change-failed', 10000)
            .assert.containsText('#password-change-failed', 'An error has occurred! The password could not be changed.')
            .expect.element('#change-password').to.not.be.enabled
        browser.end()
    },

    'should display error if http 500 response code returned during REST invocation': function (browser) {
        browser.click('#account-menu')
            .waitForElementVisible('a[href="/password"]', 10000)
            .click('a[href="/password"]')
            .setValue('input[name="password"]', 'some_secret')// mock return error code 500 for password not in (admin, system)
            .setValue('input[name="confirmation"]', 'some_secret')
            .waitForElementVisible('#change-password', 10000)
            .click('#change-password')
            .waitForElementVisible('#password-change-failed', 10000)
            .assert.containsText('#password-change-failed', 'An error has occurred! The password could not be changed.')
            .expect.element('#change-password').to.not.be.enabled
        browser.end()
    },

    'should change password and clear form': function (browser) {
        browser.click('#account-menu')
            .waitForElementVisible('a[href="/password"]', 10000)
            .click('a[href="/password"]')
            .setValue('input[name="password"]', 'admin')
            .setValue('input[name="confirmation"]', 'admin')
            .waitForElementVisible('#change-password', 10000)
            .click('#change-password')
            .waitForElementVisible('#password-change-success', 10000)
            .assert.containsText('#password-change-success', 'Password changed!')
        browser.expect.element('input[name="password"]').to.have.value.that.equals('')
        browser.expect.element('input[name="confirmation"]').to.have.value.that.equals('')
        browser.end()
    }
}