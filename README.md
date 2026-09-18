# ifsc-code-validator

> Fast, zero-dependency validator, parser, and bank lookup for Indian IFSC (Indian Financial System Code) numbers in Node.js, browsers, and edge workers.

[![npm version](https://img.shields.io/npm/v/ifsc-code-validator.svg)](https://www.npmjs.com/package/ifsc-code-validator)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## Features

- ⚡ **Zero dependencies**: Weighs under 5 KB gzipped.
- 🏛️ **Bank Code Lookup**: Includes registered RBI bank code dictionary (SBI, HDFC, ICICI, Axis, Kotak, Punjab National, etc.).
- 🔍 **Strict & Lenient Modes**: Validate format alone or verify against registered banks.
- 📦 **Isomorphic**: Works seamlessly in Node.js, Bun, Cloudflare Workers, Next.js, and browser environments.
- 📝 **Full TypeScript Support**: Shipped with complete type declarations.

## Installation

```bash
npm install ifsc-code-validator
# or
yarn add ifsc-code-validator
# or
pnpm add ifsc-code-validator
```

## Quick Start

### 1. Validate IFSC Code

```javascript
import { isValidIFSC } from 'ifsc-code-validator';

// Strict validation (Format + checks if bank prefix exists in RBI registry)
isValidIFSC('SBIN0000001'); // true
isValidIFSC('HDFC0000001'); // true
isValidIFSC('INVALID123');  // false
isValidIFSC('ZZZZ0000001'); // false (Format valid, but unknown bank code)

// Lenient validation (checks 11-char IFSC format only: ^[A-Z]{4}0[A-Z0-9]{6}$)
isValidIFSC('ZZZZ0000001', { strict: false }); // true
```

### 2. Parse Details

```javascript
import { parseIFSC } from 'ifsc-code-validator';

const info = parseIFSC('HDFC0000001');
console.log(info);
/* Output:
{
  valid: true,
  ifsc: 'HDFC0000001',
  bankCode: 'HDFC',
  bankName: 'HDFC Bank',
  branchCode: '000001',
  isKnownBank: true
}
*/
```

### 3. Get Bank Name from Prefix or IFSC

```javascript
import { getBankName } from 'ifsc-code-validator';

getBankName('SBIN');        // 'State Bank of India'
getBankName('ICIC0000104'); // 'ICICI Bank'
getBankName('UNKNOWN');     // null
```

## IFSC Format Specification

According to the Reserve Bank of India (RBI):
1. **Length**: Exactly 11 alphanumeric characters.
2. **First 4 characters**: Alphabetic bank identifier (e.g. `SBIN`, `HDFC`).
3. **5th character**: Always `0` (reserved for future use).
4. **Last 6 characters**: Alphanumeric branch code.

## License

MIT © [vjymisal0](https://github.com/vjymisal0)
