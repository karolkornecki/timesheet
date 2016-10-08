const webdriver = require('selenium-webdriver');
const chai = require('chai');
const expect = chai.expect;

const driver = new webdriver.Builder()
    .forBrowser('firefox')
    .build();

const By = webdriver.By;
const until = webdriver.until;


describe('Login page - test suite', ()=> {

    beforeEach(done => {
        driver.navigate().to('http://localhost:3000')
        driver.findElement(By.id('account-menu')).click()
        driver.findElement(By.css('a[href="/login"]')).click()
            .then(()=> done()) // without done, tests run 10x slower
    })

    it('should login fail if submit with empty username and password', (done)=> {

        driver.findElement(By.id('sign-in')).click()
        driver.wait(until.elementLocated(By.id('login-failed')))
        driver.findElement(By.id('login-failed')).getText()
            .then(text => expect(text).to.equal('Failed to sign in! Please check your credentials and try again.'))
        driver.getCurrentUrl()
            .then((url) => expect(url).to.equal('http://localhost:3000/login'))
            .then(() => done())

    })

    it('should login fail if incorrect username and password submitted', (done)=> {

        driver.findElement(By.css('input[name="username"]')).sendKeys('non_existing_user_name')
        driver.findElement(By.css('input[name="password"]')).sendKeys('secret')
        driver.findElement(By.id('sign-in')).click()
        driver.wait(until.elementLocated(By.id('login-failed')))
        driver.findElement(By.id('login-failed')).getText()
            .then(text => expect(text).to.equal('Failed to sign in! Please check your credentials and try again.'))
        driver.getCurrentUrl()
            .then((url)=> expect(url).to.equal('http://localhost:3000/login'))
            .then(()=>done())

    })

    it('should login success if correct login and password submitted', (done)=> {

        driver.findElement(By.css('input[name="username"]')).sendKeys('admin')
        driver.findElement(By.css('input[name="password"]')).sendKeys('admin')
        driver.findElement(By.id('sign-in')).click()
        driver.wait(until.elementLocated(By.css('a[href="/timesheet"]')))
        driver.getCurrentUrl()
            .then((url)=> expect(url).to.equal('http://localhost:3000/'))
            .then(()=>done())

    })

    after(() => driver.quit());


})
