#!/usr/bin/env node

require('arweave').init({}).wallets.generate().then(JSON.stringify).then(console.log.bind(console))