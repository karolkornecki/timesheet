module.exports = {
    beforeEach: function (browser) {
        browser
            .url('http://localhost:3000')
            .waitForElementVisible('body', 2000)
            .click('#account-menu')
            .waitForElementVisible('a[href="/register"]', 2000)
            .click('a[href="/register"]')
    },

    'should register button be disabled if form is not filled': function (browser) {
        browser
            .expect.element('#register').to.not.be.enabled
        browser.end()
    },

    'should display validation errors because of invalid data': function (browser) {
        browser
            .setValue('input[name="username"]', 'usernameWithUpperCaseAndDigits5')
            .setValue('input[name="email"]', 'mailDoesNotMatchPattern')
            .setValue('input[name="password"]', 'aaa')
            .setValue('input[name="confirmation"]', 'aaa')
            .waitForElementVisible('span[class="validation-error"]', 1000)
            .end()
    },

    'should successfully register user': function (browser) {
        browser
            .setValue('input[name="username"]', 'admin')
            .setValue('input[name="email"]', 'admin@gmail.pl')
            .setValue('input[name="password"]', 'secret')
            .setValue('input[name="confirmation"]', 'secret')
            .waitForElementVisible('#register', 1000)
            .click('#register')
            .waitForElementVisible('#success', 1000)
            .assert.containsText('#success', 'Registration saved! Please check your email for confirmation.')
            .end()
    },

    'should display error that login is already registered': function (browser) {
        browser
            .setValue('input[name="username"]', 'system')
            .setValue('input[name="email"]', 'system@gmail.pl')
            .setValue('input[name="password"]', 'secret')
            .setValue('input[name="confirmation"]', 'secret')
            .waitForElementVisible('#register', 1000)
            .click('#register')
            .waitForElementVisible('#login-registered', 1000)
            .assert.containsText('#login-registered', 'Login name already registered! Please choose another one.')
            .end()
    },


    'should display error that email is already in use': function (browser) {
        browser
            .setValue('input[name="username"]', 'karol')
            .setValue('input[name="email"]', 'system@system.pl')
            .setValue('input[name="password"]', 'secret')
            .setValue('input[name="confirmation"]', 'secret')
            .waitForElementVisible('#register', 1000)
            .click('#register')
            .waitForElementVisible('#email-in-use', 1000)
            .assert.containsText('#email-in-use', 'E-mail is already in use! Please choose another one.')
            .end()
    },

    'should display error that password and confirmation does not match': function (browser) {
        browser
            .setValue('input[name="username"]', 'karol')
            .setValue('input[name="email"]', 'email@email.pl')
            .setValue('input[name="password"]', 'secret')
            .setValue('input[name="confirmation"]', 'secret1')
            .waitForElementVisible('#register', 1000)
            .click('#register')
            .waitForElementVisible('#password-failed', 1000)
            .assert.containsText('#password-failed', 'The password and its confirmation do not match!')
            .end()
    },

    'should display error because of internal server error': function (browser) {
        browser
            .setValue('input[name="username"]', 'username')
            .setValue('input[name="email"]', 'email@email.pl')
            .setValue('input[name="password"]', 'secret')
            .setValue('input[name="confirmation"]', 'secret')
            .waitForElementVisible('#register', 1000)
            .click('#register')
            .waitForElementVisible('#failed', 1000)
            .assert.containsText('#failed', 'Registration failed! Please try again later.')
            .end()
    }
}