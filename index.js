#!/usr/bin/env node

const fs = require('fs');
const { init } = require('arweave');

const arweave = init({});
const args = process.argv.slice(2);

if (args.length > 0) {
  if (args[0] === 'pubkey') {
    if (args[1] !== '-f' || !args[2]) {
      console.error('Error: Please specify a wallet file with "-f <path-to-wallet.json>".');
      process.exit(1);
    }
    
    // Read and parse the JWK file, then get its address
    fs.promises.readFile(args[2], 'utf8')
      .then(JSON.parse)
      .then(jwk => arweave.wallets.jwkToAddress(jwk))
      .then(console.log)
      .catch(error => {
        console.error('Error:', error.message);
        process.exit(1);
      });
  } else {
    console.error('Error: Unknown command. Use "pubkey -f <path-to-wallet.json>" or run without arguments to generate a new wallet.');
    process.exit(1);
  }
} else {
  // Default behavior: Generate a new wallet
  arweave.wallets.generate()
    .then(JSON.stringify)
    .then(console.log)
    .catch(error => {
      console.error('Error:', error.message);
      process.exit(1);
    });
}