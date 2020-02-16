import path from 'path'
import { Selector } from 'testcafe'
import resemble from 'resemblejs'
import fs from 'fs-extra'

const root = path.join(__dirname, '../../')

// eslint-disable-next-line
fixture('login')
  .page('http://localhost:3000/login') 

test('スクリーンショットを撮影', async (t) => {
  const browser = t.browser.name.split(' ')[0].toLowerCase()

  const nameInput = await Selector('.name')
  const passwordInput = await Selector('.password')
  await t
    .typeText(nameInput, 'test')
    .typeText(passwordInput, '1234')
    .takeScreenshot({
      path: `/login/${browser}/actual.png`,
      fullPage: browser !== 'safari' // safari is not supported fullPage property
    })
  await compareScreenshot(browser)
})

const saveDiff = (imagePath, data) => {
  fs.writeFileSync(
    path.join(path.dirname(imagePath), 'diff.png'),
    data.getBuffer()
  )
}

const compareScreenshot = async (browser) => {
  const actualImagePath = `${root}/screenshots/login/${browser}/actual.png`
  const expectedImagePath = `${root}/screenshots/login/${browser}/expected.png`

  // 初回はdiffを作らず、expectedを生成して終了
  if (!fs.existsSync(expectedImagePath)) {
    fs.copyFileSync(actualImagePath, expectedImagePath)
    console.log(`👨‍💻 First ${browser} testing 👨‍💻`) // eslint-disable-line
    return
  }

  await resemble(actualImagePath)
    .compareTo(expectedImagePath)
    .scaleToSameSize()
    .onComplete((data) => {
      saveDiff(actualImagePath, data)
      if (data.rawMisMatchPercentage === 0) {
        fs.writeFileSync(expectedImagePath, data.getBuffer())
        console.log(`🎉 ${browser} is no visual difference! 🎉`) // eslint-disable-line
      } else {
        console.log(`😿 ${browser} Detected visual differences 😿`) // eslint-disable-line
      }
    })
}
