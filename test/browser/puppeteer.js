const puppeteer = require("puppeteer");

(async () => {
  const testPath = `file://${__dirname}/index.html?a=1`;
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(testPath);

  // 截屏并保存
  const pngPath = `${__dirname}/browser.png`;
  await page.screenshot({ path: pngPath, fullPage: true });

  await page.waitForSelector(".suite");
  // 通过
  const passNode = await page.$$(".pass");
  // 失败
  const failNode = await page.$$(".fail");
  if (passNode && passNode.length > 0) {
    console.log(`通过 ${passNode.length} 项`);
  }
  if (failNode && failNode.length > 0) {
    console.log(`失败 ${failNode.length} 项`);
    await browser.close();
    process.exit(1);
  }

  await browser.close();
})();
