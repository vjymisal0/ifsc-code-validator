import { BANK_CODES } from './bankCodes.js';

// Standard IFSC format: 4 uppercase alphabets, 5th character '0', 6 alphanumeric characters
const IFSC_REGEX = /^[A-Z]{4}0[A-Z0-9]{6}$/;

/**
 * Normalizes input by trimming and converting to uppercase.
 * @param {string} ifsc
 * @returns {string}
 */
export function normalizeIFSC(ifsc) {
  if (!ifsc || typeof ifsc !== 'string') return '';
  return ifsc.trim().toUpperCase();
}

/**
 * Validates whether the given string is a valid IFSC code.
 * Checks format and optionally validates whether the bank code prefix is recognized.
 *
 * @param {string} ifsc - The IFSC string to validate
 * @param {Object} [options]
 * @param {boolean} [options.strict=true] - If true, checks whether the 4-letter bank code exists in RBI registry
 * @returns {boolean}
 */
export function isValidIFSC(ifsc, options = {}) {
  const { strict = true } = options;
  const clean = normalizeIFSC(ifsc);

  if (!clean || clean.length !== 11) return false;
  if (!IFSC_REGEX.test(clean)) return false;

  if (strict) {
    const bankPrefix = clean.slice(0, 4);
    return Boolean(BANK_CODES[bankPrefix]);
  }

  return true;
}

/**
 * Returns bank details associated with the IFSC code.
 *
 * @param {string} ifsc
 * @returns {{
 *   valid: boolean,
 *   ifsc: string,
 *   bankCode: string | null,
 *   bankName: string | null,
 *   branchCode: string | null,
 *   isKnownBank: boolean,
 *   reason?: string
 * }}
 */
export function parseIFSC(ifsc) {
  const clean = normalizeIFSC(ifsc);

  if (!clean || clean.length !== 11 || !IFSC_REGEX.test(clean)) {
    return {
      valid: false,
      ifsc: clean,
      bankCode: null,
      bankName: null,
      branchCode: null,
      isKnownBank: false,
      reason: 'Invalid IFSC format. Must be 11 characters starting with 4 letters, followed by 0, and 6 alphanumeric characters.'
    };
  }

  const bankCode = clean.slice(0, 4);
  const branchCode = clean.slice(5);
  const bankName = BANK_CODES[bankCode] || null;

  return {
    valid: true,
    ifsc: clean,
    bankCode,
    bankName,
    branchCode,
    isKnownBank: Boolean(bankName)
  };
}

/**
 * Returns the bank name for a given IFSC code or 4-letter bank prefix.
 * @param {string} ifscOrPrefix
 * @returns {string|null}
 */
export function getBankName(ifscOrPrefix) {
  if (!ifscOrPrefix || typeof ifscOrPrefix !== 'string') return null;
  const clean = ifscOrPrefix.trim().toUpperCase();
  const prefix = clean.slice(0, 4);
  return BANK_CODES[prefix] || null;
}

export { BANK_CODES };
export default isValidIFSC;
