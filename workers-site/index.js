import { getAssetFromKV } from '@cloudflare/kv-asset-handler';

addEventListener('fetch', (event) => {
  event.respondWith(handleEvent(event));
});

async function handleEvent(event) {
  const url = new URL(event.request.url);

  if (url.hostname === 'www.ubi.nz') {
    return Response.redirect('https://ubi.nz', 301);
  }

  try {
    return await getAssetFromKV(event);
  } catch (e) {
    return new Response(`"${url.pathname}" not found`, {
      status: 404,
      statusText: 'Not found'
    });
  }
}
