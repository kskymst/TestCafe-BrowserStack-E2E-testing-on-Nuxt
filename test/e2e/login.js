import { Selector, RequestMock } from 'testcafe'

const resData = [
  {
    name: 'test',
    password: '1234'
  }
]

const mock = RequestMock()
  .onRequestTo('http://localhost:8000/user')
  .respond(resData, 200, { 'Access-Control-Allow-Origin': '*' })

fixture('ログイン')
  .page('http://localhost:3000/login')
  .requestHooks(mock)

test('正しいログイン情報を入力後、mypageにuserNameが表示されること', async (t) => {
  const nameInput = await Selector('.name')
  const passwordInput = await Selector('.password')
  const loginButton = await Selector('button')

  await t
    .typeText(nameInput, 'test')
    .typeText(passwordInput, '1234')
    .click(loginButton)

  const loginUserName = await Selector('.user-name').textContent

  await t.expect(loginUserName).eql('test')
})

test('誤ったログイン情報を入力後、エラーメッセージが表示されること', async (t) => {
  const nameInput = await Selector('.name')
  const passwordInput = await Selector('.password')
  const loginButton = await Selector('button')

  await t
    .typeText(nameInput, 'sample')
    .typeText(passwordInput, 'xxxx')
    .click(loginButton)

  const errorMessage = await Selector('.error-message').textContent

  await t.expect(errorMessage).ok()
})
