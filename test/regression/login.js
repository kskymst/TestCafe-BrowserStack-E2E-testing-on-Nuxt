import { Selector } from 'testcafe'

// eslint-disable-next-line
fixture('ログイン')
  .page('http://localhost:3000/login') 

test('スクリーンショットを撮影', async (t) => {
  const nameInput = await Selector('.name')
  const passwordInput = await Selector('.password')
  await t
    .typeText(nameInput, 'test')
    .typeText(passwordInput, '1234')
    .takeScreenshot({
      path: 'test.png',
      fullPage: true
    })
})
