module.exports = {
    beforeEach: function (browser) {
        browser
            .url('http://localhost:3000')
            .waitForElementVisible('body', 1000)
            .click('#account-menu')
            .waitForElementVisible('a[href="/login"]', 1000)
            .click('a[href="/login"]')
    },


    'should login fail if submit with empty username and password': function (browser) {
        browser
            .waitForElementVisible('#sign-in', 1000)
            .click('#sign-in')
            .waitForElementVisible('#login-failed', 1000)
            .assert.containsText('#login-failed', 'Failed to sign in! Please check your credentials and try again.')
            .assert.urlEquals('http://localhost:3000/login')
            .end();
    },

    'should login fail if incorrect username and password submitted': function (browser) {
        browser
            .setValue('input[name="username"]', 'non_existing_user_name')
            .setValue('input[name="password"]', 'secret')
            .click('#sign-in')
            .waitForElementVisible('#login-failed', 1000)
            .assert.containsText('#login-failed', 'Failed to sign in! Please check your credentials and try again.')
            .assert.urlEquals('http://localhost:3000/login')
            .end();
    },

    'should login success if correct login and password submitted': function (browser) {
        browser
            .setValue('input[name="username"]', 'admin')
            .setValue('input[name="password"]', 'admin')
            .click('#sign-in')
            .waitForElementVisible('a[href="/timesheet"]', 1000)
            .assert.urlEquals('http://localhost:3000/')
            .end();
    }
};