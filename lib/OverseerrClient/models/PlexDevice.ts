/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PlexConnection } from './PlexConnection';
export type PlexDevice = {
    name: string;
    product: string;
    productVersion: string;
    platform: string;
    platformVersion?: string;
    device: string;
    clientIdentifier: string;
    createdAt: string;
    lastSeenAt: string;
    provides: Array<string>;
    owned: boolean;
    ownerID?: string;
    home?: boolean;
    sourceTitle?: string;
    accessToken?: string;
    publicAddress?: string;
    httpsRequired?: boolean;
    synced?: boolean;
    relay?: boolean;
    dnsRebindingProtection?: boolean;
    natLoopbackSupported?: boolean;
    publicAddressMatches?: boolean;
    presence?: boolean;
    connection: Array<PlexConnection>;
};

