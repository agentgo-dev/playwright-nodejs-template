import { chromium } from 'playwright-core';
import 'dotenv/config';

(async () => {
  // Configure connection options
  const options = {
    args: [`--datascaler-apikey=${process.env.AGENTGO_API_KEY}`],
  };

  // Encode options for the connection URL
  const urlOptionValue = encodeURIComponent(JSON.stringify(options));

  // Connect to AgentGo's distributed browser network
  const serverUrl = `ws://any.browsers.live:3000?launch-options=${urlOptionValue}`;
  const browser = await chromium.connect(serverUrl);

  // Create a new page
  const page = await browser.newPage();

  // Navigate to a website
  await page.goto('https://news.ycombinator.com/', { waitUntil: 'load' });

  // Perform some actions (example: get the title)
  const title = await page.title();
  console.log(`Page title: ${title}`);

  // Close the browser
  await page.close();
  await browser.close();
  console.log('Browser session completed successfully!');
})().catch((error) => console.error(error.message));
