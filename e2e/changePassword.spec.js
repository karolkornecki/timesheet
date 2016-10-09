const webdriver = require('selenium-webdriver');
const chai = require('chai');
const expect = chai.expect;

const driver = new webdriver.Builder()
    .forBrowser('firefox')
    .build();

const By = webdriver.By;
const until = webdriver.until;

describe('Change password page - test suite', ()=> {

    beforeEach(done => {
        driver.navigate().to('http://localhost:3000')
        driver.findElement(By.id('account-menu')).click()
        driver.findElement(By.css('a[href="/login"]')).click()
        driver.findElement(By.css('input[name="username"]')).sendKeys('admin')
        driver.findElement(By.css('input[name="password"]')).sendKeys('admin')
        driver.findElement(By.id('sign-in')).click()
            .then(()=> done())
    })

    it('should redirect to change password page when Account->Password chosen', (done)=> {
        driver.findElement(By.id('account-menu')).click()
        driver.findElement(By.css('a[href="/password"]')).click()
        driver.getCurrentUrl()
            .then((url)=> expect(url).to.equal('http://localhost:3000/password'))
        driver.findElement(By.id('change-password')).isEnabled()
            .then(value => expect(value).to.equal(false))
            .then(()=>done())
    })

    it('should display error if password and its confirmation does not match', (done)=> {
        driver.findElement(By.id('account-menu')).click()
        driver.findElement(By.css('a[href="/password"]')).click()
        driver.findElement(By.css('input[name="password"]')).sendKeys('secret')
        driver.findElement(By.css('input[name="confirmation"]')).sendKeys('secret2')
        driver.findElement(By.id('change-password')).click()
        driver.wait(until.elementLocated(By.id('password-does-not-match')))
        driver.findElement(By.id('password-does-not-match')).getText()
            .then(text => expect(text).to.equal('The password and its confirmation do not match!'))
        driver.findElement(By.id('change-password')).isEnabled()
            .then(value => expect(value).to.equal(false))
            .then(() => done())
    })

    it('should display error if http 400 response code returned during REST invocation', (done)=> {
        driver.findElement(By.id('account-menu')).click()
        driver.findElement(By.css('a[href="/password"]')).click()
        driver.findElement(By.css('input[name="password"]')).sendKeys('system') // mock return error code 400 for password=system
        driver.findElement(By.css('input[name="confirmation"]')).sendKeys('system')
        driver.findElement(By.id('change-password')).click()
        driver.wait(until.elementLocated(By.id('password-change-failed')))
        driver.findElement(By.id('password-change-failed')).getText()
            .then(text => expect(text).to.equal('An error has occurred! The password could not be changed.'))
        driver.findElement(By.id('change-password')).isEnabled()
            .then(value => expect(value).to.equal(false))
            .then(() => done())
    })

    it('should display error if http 500 response code returned during REST invocation', (done)=> {
        driver.findElement(By.id('account-menu')).click()
        driver.findElement(By.css('a[href="/password"]')).click()
        driver.findElement(By.css('input[name="password"]')).sendKeys('some_secret') // mock return error code 500 for password not in (admin, system)
        driver.findElement(By.css('input[name="confirmation"]')).sendKeys('some_secret')
        driver.findElement(By.id('change-password')).click()
        driver.wait(until.elementLocated(By.id('password-change-failed')))
        driver.findElement(By.id('password-change-failed')).getText()
            .then(text => expect(text).to.equal('An error has occurred! The password could not be changed.'))
        driver.findElement(By.id('change-password')).isEnabled()
            .then(value => expect(value).to.equal(false))
            .then(() => done())
    })

    it('should change password and clear form', (done)=> {
        driver.findElement(By.id('account-menu')).click()
        driver.findElement(By.css('a[href="/password"]')).click()
        driver.findElement(By.css('input[name="password"]')).sendKeys('admin')
        driver.findElement(By.css('input[name="confirmation"]')).sendKeys('admin')
        driver.findElement(By.id('change-password')).click()
        driver.wait(until.elementLocated(By.id('password-change-success')))
        driver.findElement(By.id('password-change-success')).getText()
            .then(text => expect(text).to.equal('Password changed!'))
        driver.findElement(By.css('input[name="password"]')).getAttribute('value')
            .then(value => expect(value).to.equal(''))
        driver.findElement(By.css('input[name="confirmation"]')).getAttribute('value')
            .then(value => expect(value).to.equal(''))
        driver.findElement(By.id('change-password')).isEnabled()
            .then(value => expect(value).to.equal(false))
            .then(() => done())
    })

    after(() => driver.quit());
})