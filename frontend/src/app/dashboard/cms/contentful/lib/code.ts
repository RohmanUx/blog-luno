import { createClient } from 'contentful';

const spaceId = 'ynf5s7448k9w'
const accessToken = 'VbrwqRIjaTozjYovVeAZAUzaa863gnkkF3U2W15zdyc'

// Log to check if the environment variables are being picked up
console.log("Space ID: ", spaceId);
console.log("Access Token: ", accessToken);

if (!spaceId || !accessToken) {
  throw new Error("Missing environment variables: CONTENTFUL_SPACE_ID or CONTENTFUL_ACCESS_TOKEN");
}

const client = createClient({
  space: spaceId as string,
  accessToken: accessToken as string,
});

export default client;
