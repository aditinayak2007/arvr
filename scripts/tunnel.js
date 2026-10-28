import localtunnel from 'localtunnel';

// Keep the Node event loop alive indefinitely
setInterval(() => {}, 60000);

let currentTunnel = null;
let isReconnecting = false;

async function getTunnelPassword() {
  try {
    const res = await fetch('https://loca.lt/mytunnelpassword');
    return (await res.text()).trim();
  } catch (e) {
    return '152.57.59.61';
  }
}

async function startTunnel() {
  if (isReconnecting) return;
  isReconnecting = true;

  console.log('Establishing WebAR Cloud tunnel for port 5173...');
  try {
    if (currentTunnel) {
      try { currentTunnel.close(); } catch (e) {}
      currentTunnel = null;
    }

    const password = await getTunnelPassword();

    currentTunnel = await localtunnel({ 
      port: 5173,
      subdomain: 'ar-drive-showroom'
    });

    console.log('\n==================================================');
    console.log('🚀 PUBLIC AR DRIVE TUNNEL ACTIVE:');
    console.log('Mobile URL:      ' + currentTunnel.url);
    console.log('Tunnel Password: ' + password);
    console.log('==================================================\n');

    isReconnecting = false;

    currentTunnel.on('close', () => {
      console.warn('Tunnel closed by remote server. Reconnecting in 5s...');
      isReconnecting = false;
      setTimeout(startTunnel, 5000);
    });

    currentTunnel.on('error', (err) => {
      console.error('Tunnel error:', err.message);
      isReconnecting = false;
      setTimeout(startTunnel, 5000);
    });

  } catch (err) {
    console.error('Failed to create tunnel, retrying in 5s...', err.message);
    isReconnecting = false;
    setTimeout(startTunnel, 5000);
  }
}

startTunnel();
