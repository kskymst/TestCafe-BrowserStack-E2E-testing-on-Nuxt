import { Selector } from 'testcafe'

fixture('タスクの作成').page('http://localhost:3000/login')

test('正しいログイン情報を入力後、mypageにuserNameが表示されること', async (t) => {
  const nameInput = await Selector('.name')
  const passwordInput = await Selector('.password')
  const loginButton = await Selector('button')

  await t
    .setNativeDialogHandler(() => true)
    .typeText(nameInput, 'testuser')
    .typeText(passwordInput, 'password')
    .click(loginButton)

  const loginUserName = await Selector('.user-name').textContent

  await t.expect(loginUserName).eql('testuser')
})

test('誤ったログイン情報を入力後、エラーメッセージが表示されること', async (t) => {
  const nameInput = await Selector('.name')
  const passwordInput = await Selector('.password')
  const loginButton = await Selector('button')

  await t
    .setNativeDialogHandler(() => true)
    .typeText(nameInput, 'sample')
    .typeText(passwordInput, 'xxxx')
    .click(loginButton)

  const errorMessage = await Selector('.error-message').textContent

  await t.expect(errorMessage).ok()
})
