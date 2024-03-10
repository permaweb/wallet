#!/usr/bin/env node

const fs = require('fs');
const Arweave = require('arweave');

async function generateWallet(walletName) {
    const arweave = Arweave.init({});
    const wallet = await arweave.wallets.generate();
    const walletJSON = JSON.stringify(wallet);

    fs.writeFileSync(walletName, walletJSON);
    console.log(`Wallet generated and saved as \x1b[34m${walletName}\x1b[0m`); // Highlighting walletName in blue
}

async function main() {
    if (process.argv.length >= 3) {
        const walletName = process.argv[2];
        if (walletName.endsWith('.json')) {
            await generateWallet(walletName);
        } else {
            console.log('Invalid wallet name. Wallet name must end with ".json"');
        }
    } else {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });

        readline.question('Enter the wallet name (ending with ".json"): ', async (walletName) => {
            readline.close();
            if (walletName.endsWith('.json')) {
                await generateWallet(walletName);
            } else {
                console.log('Invalid wallet name. Wallet name must end with ".json"');
            }
        });
    }
}

main();
