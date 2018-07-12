import * as puppeteer from 'puppeteer'
import * as assert from 'assert'
import * as getPort from 'get-port'
import * as child from 'child_process'
import * as Utils from './utils'

describe('ssr + code-splitting test', function () {
  this.timeout(Utils.timeout)
  let browser: puppeteer.Browser = null!
  let page: puppeteer.Page = null!
  let port = 3456
  let hs: child.ChildProcess = null!
  let server: child.ChildProcess = null!
  before(async () => {
    browser = await Utils.launchBrowser()
    const startBe = (): Promise<child.ChildProcess> => {
      return new Promise((res, rej) => {
        let s = child.exec(`node -r ./tools/register ./src/server/main.ts`, {
          cwd: `${process.cwd()}/examples/router-ssr`,
        })
        s.stdout.on('data', () => {
          res(s)
        })
        s.on('error', err => {
          console.error(err)
          rej(err)
        })
      })
    }
    [hs, server] = await Promise.all([
      Utils.runServer('router-ssr', 8081),
      startBe(),
    ])
    await Utils.sleep(2000)
  })
  after(async () => {
    console.log('start close browser')
    await browser.close()
    await hs.kill()
    server && server.kill()
    console.log('end close browser')
  })
  beforeEach(async () => {
    page = await browser.newPage()
    await page.goto(`http://127.0.0.1:${port}`)
  })
  afterEach(async () => {
    await page.close()
  })
  it('simple', async () => {
    await page.waitFor('.main')
    const _text = async (e: puppeteer.ElementHandle | string, trim = true) => {
      await Utils.sleep(100)
      if (typeof e === 'string') {
        e = (await page.$$(e))[0]
      }
      return Utils.text(e, trim)
    }
    const routeTo = async (sel: string) => {
      await (await page.$(sel))!.click()
      await Utils.sleep(50)
    }
    let $main = (await page.$('.main'))!
    assert.equal(await _text('.main'), 'Home', `route home`)
    await routeTo('a.users')
    assert.equal(await _text('.main'), 'User: 1', `route users`)
    await routeTo('a.counter')
    await Utils.counterSuit(page, 0, 100)
    await routeTo('a.counter2')
    await Utils.counterSuit(page, 0, 100)
    await routeTo('a.counter3')
    await Utils.counterSuit(page, 0, 100)
    await routeTo('a.e404')
    assert.equal(await _text('.main'), '404', 'route 404')
    await page.goto(`http://127.0.0.1:${port}`)
    let loading = await page.evaluateHandle(
      () => {
        const a = document.querySelector('a.counter')! as HTMLLinkElement
        a.click()
        return new Promise(res => {
          let t = setInterval(() => {
            if (location.href.includes('counter')) {
              const text = (document.querySelector('.count')! as HTMLElement).innerText
              clearInterval(t)
              res(text)
            }
          }, 1)
        })
      }
    )
    loading = await loading.jsonValue()
    assert.equal(loading, '100', 'ssr')
  })
})
