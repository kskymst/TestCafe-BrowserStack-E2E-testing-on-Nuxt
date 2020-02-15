import path from 'path'
import { Selector } from 'testcafe'
import resemble from 'resemblejs'
import fs from 'fs-extra'

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
      path: 'test.png',
      fullPage: true
    })
  await compareScreenshot()
})

const compareScreenshot = async () => {
  const baseDir = path.join(__dirname, '../../', '/screenshots/anzai_1.jpeg')
  const compareDir = path.join(__dirname, '../../', '/screenshots/anzai_2.jpeg')

  await resemble(baseDir)
    .compareTo(compareDir)
    .onComplete((data) => {
      if (data.rawMisMatchPercentage > 0) {
        fs.writeFileSync(
          path.join(
            path.dirname(baseDir),
            `${path.basename(baseDir, path.extname(baseDir))}-diff.png`
          ),
          data.getBuffer()
        )
        console.log('😿 Detected visual differences 😿') // eslint-disable-line
      } else {
        console.log('🎉 There is no visual difference! 🎉') // eslint-disable-line
      }
    })
}
