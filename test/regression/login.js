import path from 'path'
import { Selector } from 'testcafe'
import resemble from 'resemblejs'
import fs from 'fs-extra'

const root = path.join(__dirname, '../../')

// eslint-disable-next-line
fixture('login')
  .page('http://localhost:3000/login') 

test('スクリーンショットを撮影', async (t) => {
  const nameInput = await Selector('.name')
  const passwordInput = await Selector('.password')
  await t
    .typeText(nameInput, 'test')
    .typeText(passwordInput, '1234')
    .takeScreenshot({
      path: '/login/actual.png',
      fullPage: true
    })
  await compareScreenshot()
})

const saveDiff = (imagePath, data) => {
  fs.writeFileSync(
    path.join(path.dirname(imagePath), 'diff.png'),
    data.getBuffer()
  )
}

const compareScreenshot = async () => {
  const actualImagePath = `${root}/screenshots/login/actual.png`
  const expectedImagePath = `${root}/screenshots/login/expected.png`

  await resemble(actualImagePath)
    .compareTo(expectedImagePath)
    .onComplete((data) => {
      saveDiff(actualImagePath, data)
      if (data.rawMisMatchPercentage === 0) {
        fs.writeFileSync(expectedImagePath, data.getBuffer())
        console.log('🎉 There is no visual difference! 🎉') // eslint-disable-line
      } else {
        throw new Error('😿 Detected visual differences 😿')
      }
    })
}
