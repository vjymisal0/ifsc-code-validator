export interface IFSCParseResult {
  valid: boolean;
  ifsc: string;
  bankCode: string | null;
  bankName: string | null;
  branchCode: string | null;
  isKnownBank: boolean;
  reason?: string;
}

export interface IFSCDownloadOptions {
  strict?: boolean;
}

export declare const BANK_CODES: Record<string, string>;

export declare function normalizeIFSC(ifsc: string): string;

export declare function isValidIFSC(ifsc: string, options?: IFSCDownloadOptions): boolean;

export declare function parseIFSC(ifsc: string): IFSCParseResult;

export declare function getBankName(ifscOrPrefix: string): string | null;

export default isValidIFSC;
