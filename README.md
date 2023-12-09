# LetPay

LetPay is a payment system powered by the XRP Ledger's payment channel, multi-signature and hooks enables the creation of on-chain wallets to receive payments from different jurisdictions and tax tiers, live on XRP Xahau Testnet.

- [YouTube](https://youtu.be/ko4AO8tB6Zc)
- [Akindo](https://app.akindo.io/communities/rgdWdPMdkS7EPKDkA/products/RDWjW8KnZTgXjlkN)

## Background

As of now, many countries allow the registration of the DAO, from Singapore, the Marshall Islands to U.S. states like Wyoming (and soon in Japan). Implementing the legal wrapper allows the DAO to receive payments at physical branches, like coffee shops within its jurisdiction and fulfill tax responsibilities. The benefits of doing it right help DAO token holders avoid further legal issues.

## Problem

Managing payments for real-world DAO is complex. We may need to figure out how to minimize transaction fees for users, maximize security for the treasury, and handle tax filings.

## Solution

Introducing LetPay, a payment system powered by the XRP Ledger that allows the creation of on-chain multi-signature wallets for each jurisdiction to collect crypto payments and handle tax duties automatically.

The core system utilizes 3 functions from the XRP Ledger to facilitate payments- the multi-signature wallet, the payment channel and the hooks.

For example, for the DAO incorporated in Singapore, it can have two multi-sig wallets: one to receive payments within Singapore with a GST of 8%, and another wallet to receive payments from abroad without tax.

The user may need to open a payment channel to the wallet and all transactions occur off-chain without paying any fees until they close the channel and pay a fee for only single time.

The hook has been installed on the on-chain multi-signature wallet and is triggered when 2/3 parties sign off to withdraw funds. A portion of 10% can be deducted and transferred for tax collection automatically.

![LETPAY](https://github.com/tamago-labs/legato-pay/assets/18402217/c4c7b3af-2563-47c3-b261-327cb416f10b)

## Getting started

Before getting started, ensure you have all the dependencies required to run the command:

```
npm run bootstrap
```

We can then run all tests by:

```
npm run test
```

And to start the frontend application:

```
npm run package:client
```
