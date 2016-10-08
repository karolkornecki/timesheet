const webdriver = require('selenium-webdriver');
const chai = require('chai');
const expect = chai.expect;

const driver = new webdriver.Builder()
    .forBrowser('firefox')
    .build();

const By = webdriver.By;
const until = webdriver.until;


describe('login form', ()=> {

    beforeEach(done => {
        driver.navigate().to('http://localhost:3000')
            .then(()=> driver.findElement(By.id('account-menu')))
            .then((account) => account.click())
            .then(() => driver.findElement(By.css('a[href="/login"]')))
            .then((signIn) => signIn.click())
            .then(()=> done())
    })

    it('should login fail if submit with empty username and password', (done)=> {

        driver.findElement(By.id('sign-in'))
            .then(button => button.click())
            .then(()=> driver.wait(until.elementLocated(By.id('login-failed')), 3000))
            .then(() => driver.findElement(By.id('login-failed')))
            .then((div)=> div.getText())
            .then(text => expect(text).to.be.equal('Failed to sign in! Please check your credentials and try again.'))
            .then(()=> driver.getCurrentUrl())
            .then((url)=> expect(url).to.be.equal('http://localhost:3000/login'))
            .then(()=>done())

    })

    it('should login fail if incorrect username and password submitted', (done)=> {

        driver.findElement(By.css('input[name="username"]')).sendKeys('non_existing_user_name')
            .then(()=> driver.findElement(By.css('input[name="password"]')).sendKeys('secret'))
            .then(()=>driver.findElement(By.id('sign-in')))
            .then(button => button.click())
            .then(()=> driver.wait(until.elementLocated(By.id('login-failed'))))
            .then(() => driver.findElement(By.id('login-failed')))
            .then((div)=> div.getText())
            .then(text => expect(text).to.be.equal('Failed to sign in! Please check your credentials and try again.'))
            .then(()=> driver.getCurrentUrl())
            .then((url)=> expect(url).to.be.equal('http://localhost:3000/login'))
            .then(()=>done())

    })

    it('should login success if correct login and password submitted', (done)=> {

        driver.findElement(By.css('input[name="username"]')).sendKeys('admin')
            .then(()=> driver.findElement(By.css('input[name="password"]')).sendKeys('admin'))
            .then(()=> driver.findElement(By.id('sign-in')))
            .then(button => button.click())
            .then(()=> driver.wait(until.elementLocated(By.css('a[href="/timesheet"]'))))
            .then(()=> driver.getCurrentUrl())
            .then((url)=> expect(url).to.be.equal('http://localhost:3000/'))
            .then(()=>done())

    })

    after(() => driver.quit());


})
