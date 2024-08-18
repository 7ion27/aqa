const { test } = require('../auth_const/default')
const { AuthPage } = require('../page/auth.page')
import { _baseURL, users, testValue } from '../auth_const/const'

test.beforeEach(async ({ page }) => {
   await page.goto(_baseURL)
})

test.describe(`Вход с корректными данными`, () => {

   test(`1.Вход в систему с корректным логином и корректным паролем (Пользователь aqa)`, async ({ page }) => {
      const authPage = new AuthPage(page)
      await authPage.enterLogin(users.usernameAQA)
      await authPage.enterPassword(users.passwordAQA)
      await authPage.clickLoginButton()
      await authPage.successfulAuthh()
   })

   test(`2.Вход в систему с корректным логином и корректным паролем (Пользователь test)`, async ({ page }) => {
      const authPage = new AuthPage(page)
      await authPage.enterLogin(users.usernameTest)
      await authPage.enterPassword(users.passwordTest)
      await authPage.clickLoginButton()
      await authPage.successfulAuthh()
   })

   test(`3.Вход в систему с корректным логином и корректным паролем (Пользователь admin)`, async ({ page }) => {
      const authPage = new AuthPage(page)
      await authPage.enterLogin(users.usernameAdmin)
      await authPage.enterPassword(users.passwordAdmin)
      await authPage.clickLoginButton()
      await authPage.successfulAuthh()
   })

})

test.describe(`Вход с некорректными данными`, () => {

   test(`1.Вход в систему без заполнения логина и пароля`, async ({ page }) => {
      const authPage = new AuthPage(page)
      // page.on('request', (request) => {
      //    console.log(`Запрос: ${request.method()} ${request.url()}`)
      //    const headers = request.headers()
      //    const postData = request.postData()
      //    const curlCommand = `curl -X ${request.method()} '${request.url()}' -H '${Object.keys(headers).map(key => `${key}: ${headers[key]}`).join("' -H '")}' -d '${postData}'`
      //    console.log(curlCommand)
      //  })
      // Единоразово отловил запрос, чтобы приложить его к репорту
      await authPage.clickLoginButton()
      await authPage.successfulAuthh()
   })// Необходимо оформить bug-report №1

   test(`2.Вход в систему без заполнения пароля`, async ({ page }) => {
      const authPage = new AuthPage(page)
      await authPage.enterLogin(users.usernameAdmin)
      await authPage.clickLoginButton()
      await authPage.checkIncorrectPasswordMsg()
   })

   test(`3.Вход в систему без заполнения логина`, async ({ page }) => {
      const authPage = new AuthPage(page)
      await authPage.enterPassword(users.passwordAdmin)
      await authPage.clickLoginButton()
      await authPage.checkUserNotFoundMsg()
   })


   test(`4.Вход в систему с корректным логином и некорректным паролем`, async ({ page }) => {
      const authPage = new AuthPage(page)
      await authPage.enterLogin(users.usernameAdmin)
      await authPage.enterPassword(testValue.passwordWrong)
      await authPage.clickLoginButton()
      await authPage.checkIncorrectPasswordMsg()
   })

   
   test(`5.Вход в систему с некорректным логином и корректным паролем`, async ({ page }) => {
      const authPage = new AuthPage(page)
      await authPage.enterLogin(testValue.loginWrong)
      await authPage.enterPassword(users.passwordAdmin)
      await authPage.clickLoginButton()
      await authPage.checkUserNotFoundMsg()
   })

   test(`6.Вход в систему с некорректным логином и некорректным паролем`, async ({ page }) => {
      const authPage = new AuthPage(page)
      await authPage.enterLogin(testValue.loginWrong)
      await authPage.enterPassword(testValue.passwordWrong)
      await authPage.clickLoginButton()
      await authPage.checkUserNotFoundMsg()
   })

   test(`7.Вход в систему с корретными данными разных пользователей`, async ({ page }) => {
      const authPage = new AuthPage(page)
      await authPage.enterLogin(users.usernameAQA)
      await authPage.enterPassword(users.passwordAdmin)
      await authPage.clickLoginButton()
      await authPage.checkIncorrectPasswordMsg()
   })

   test(`8.Вход в систему с корретными данными, логин в верхнем регистре`, async ({ page }) => {
      const authPage = new AuthPage(page)
      await authPage.enterLogin(users.usernameAQA.toUpperCase())
      await authPage.enterPassword(users.passwordAQA)
      await authPage.clickLoginButton()
      await authPage.checkUserNotFoundMsg()
   })

   test(`9.Заполнение полей логин и пароль пробелами`, async ({ page }) => {
      const authPage = new AuthPage(page)
      await authPage.enterLogin(testValue.spaces)
      await authPage.enterPassword(testValue.spaces)
      await authPage.clickLoginButton()
      await authPage.checkUserNotFoundMsg()
   })

})

test.describe(`Проверка кнопки "Logout"`, () => {

   test(`1.Вход в систему с корректным логином и корректным паролем (Пользователь aqa)`, async ({ page }) => {
      const authPage = new AuthPage(page)
      await authPage.enterLogin(users.usernameAQA)
      await authPage.enterPassword(users.passwordAQA)
      await authPage.clickLoginButton()
      await authPage.successfulAuthh()
      await authPage.clickLogoutButton()
      await authPage.checkTitleLogin()
   })

})

test.describe(`Визуальное скрытие пароля при вводе`, () => {

   test(`1.Визуальное скрытие пароля при вводе`, async ({ page }) => {
      const authPage = new AuthPage(page)
      await authPage.enterLogin(users.usernameAQA)
      await authPage.enterPassword(users.passwordAQA)
      await authPage.checkPasswordHidden(users.passwordAQA)
      await authPage.clickLoginButton()
      await authPage.successfulAuthh()
   })

})

test.describe(`Отображение плейсхолдеров`, () => {

   test(`1.Отображение плейсхолдеров`, async ({ page }) => {
      const authPage = new AuthPage(page)
      await authPage.checkPlaceholder()
      await authPage.enterLogin('1')
      await page.keyboard.press('Backspace')
      await authPage.enterPassword('1')
      await page.keyboard.press('Backspace')
      await authPage.checkPlaceholder()
   })

})

