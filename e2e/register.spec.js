const webdriver = require('selenium-webdriver');
const chai = require('chai');
const expect = chai.expect;

const driver = new webdriver.Builder()
    .forBrowser('firefox')
    .build();

const By = webdriver.By;
const until = webdriver.until;
driver.manage().window().maximize();

describe('Register page - test suite', ()=> {

    beforeEach(done => {
        driver.navigate().to('http://localhost:3000')
        driver.findElement(By.id('account-menu')).click()
        driver.findElement(By.css('a[href="/register"]')).click()
            .then(()=> done()) // without done, tests run 10x slower
    })

    it('should register button be disabled if form is not filled', (done)=> {
        driver.findElement(By.id('register')).isEnabled()
            .then(value => expect(value).to.equal(false))
            .then(() => done())

    })

    it('should display validation errors', (done)=> { // WORKS ONLY IF THE BROWSER IS IN FOREGROUND - onblur event don't fire when firefox minimized
        driver.findElement(By.css('input[name="username"]')).sendKeys('usernameWithUpperCaseAndDigits5')
        driver.findElement(By.css('input[name="email"]')).sendKeys('mailDoesNotMatchPattern')
        driver.findElement(By.css('input[name="password"]')).sendKeys('aaa') // too short
        driver.findElement(By.css('input[name="confirmation"]')).sendKeys('aaa')
        driver.wait(until.elementLocated(By.className('validation-error')))

        //TODO add expectation of number of elements with errors -> force fire event is a must here!!!

        driver.findElement(By.id('register')).isEnabled()
            .then(value => expect(value).to.equal(false))
            .then(() => done())

    })


    after(() => driver.quit());
})