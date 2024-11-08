export type ErrorResponse = {
  error: string,
  description?: string,
  extra_info?: {
    [x: string]: unknown
  },
};

export type AuthResponse = {
  token_type: 'Bearer',
  scope: string,
  expires_in: number,
  access_token: string,
};

export type XPKitSummaryResponse = {
  [index: string]: number,
};

export type XPKitResource = {
  resource: {
    [x: string]: unknown
  },
  resource_id: string,
  resource_url: string,
};

export type XPKitResources = {
  count: number,
  next: number,
  next_token: string,
  previous: number,
  previous_token: string,
  results: XPKitResource[],
};

export type XPKitAcknowledgement = {
  job_id: string,
  info: string,
  status: string,
};

export type XPKitAcknowledgements = XPKitAcknowledgement[];

export type XPKitResponse = XPKitResource | XPKitResources | XPKitAcknowledgement | XPKitAcknowledgements | AuthResponse | XPKitSummaryResponse | ErrorResponse;
