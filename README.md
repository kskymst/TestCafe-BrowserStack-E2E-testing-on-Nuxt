# TestCafe-BrowserStack-E2E-testing-on-Nuxt

Qiitaに投稿した[TestCafe × BrowserStackで行うマルチブラウザ対応のE2Eテスト](https://qiita.com/kosuke0820/items/8eaaa528b860f8c97bb4)のサンプルコードです。

BrowserStackの `BROWSERSTACK_USERNAME` と `BROWSERSTACK_ACCESS_KEY`を環境変数に設定する必要があります。
ref: https://github.com/DevExpress/testcafe-browser-provider-browserstack#usage

## Build Setup

``` bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# E2E testing with testcafe-browser-provider-browserstack
$ yarn test:e2e
```