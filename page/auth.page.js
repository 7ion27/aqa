const { expect } = require('@playwright/test')

exports.AuthPage = class AuthPage {
   constructor(page) {
      this.page = page
      this.titleLogig = page.locator('//h2 [text()="Login"]')
      this.loginField = page.locator('//input[@type="text"]')
      this.passwordField = page.locator('//input[@type="password"]')
      this.loginButton = page.locator('//button[@type="submit"][contains(text(), "Login")]')//Пишу уточнения в виде [contains(text(), "Login")], в случае если добавится ещё одна кнопка(у меня на проекте такое было, в целом локатор можно сократить до //button[@type="submit"])
      this.logoutButton = page.locator('//button[@id="logoutButton"][contains(text(), "Logout")]')
      this.welcomeMessage = page.locator('//div[@class="welcome-message"][contains(text(), "Вы авторизовались")]')//можно также использовать локатор getByText, но в работе я понял, что Xpath надёжнее 
      this.userNotFoundMsg = page.locator('//div[@id="message"][contains(text(), "User not found")]') 
      this.incorrectPasswordMsg = page.locator('//div[@id="message"][contains(text(), "Incorrect password")]') 
   }

   // Действия

   async enterLogin(login) {
      await this.loginField.fill(login)
   }

   async enterPassword(password) {
      await this.passwordField.fill(password)
   }

   async clickLoginButton() {
      await this.loginButton.click()
   }

   async clickLogoutButton() {
      await this.logoutButton.click()
   }

   // Проверки

   async checkTitleLogin() {
      await expect(this.titleLogig).toBeVisible()
   }

   async successfulAuthh() {
      await expect(this.welcomeMessage).toBeVisible()
   }

   
   async checkUserNotFoundMsg() {
      await expect(this.userNotFoundMsg).toBeVisible()
   }

   
   async checkIncorrectPasswordMsg() {
      await expect(this.incorrectPasswordMsg).toBeVisible()
   }

   async checkPasswordHidden(password) {
      const passwordValue = await this.passwordField.getAttribute('value')
      console.log(`Ожидаемый результат: ${password}`)
      console.log(`Полученный результат: ${passwordValue}`)
      await expect(passwordValue).not.toBe(password)
   }

   async checkPlaceholder() {
      const loginPlaceholder = await this.loginField.getAttribute('placeholder');
      await expect(loginPlaceholder).toBe('Username');
    
      const passwordPlaceholder = await this.passwordField.getAttribute('placeholder');
      await expect(passwordPlaceholder).toBe('Password');
   }

}
