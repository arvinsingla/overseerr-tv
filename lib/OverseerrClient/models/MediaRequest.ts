/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MediaInfo } from './MediaInfo';
import type { User } from './User';
export type MediaRequest = {
    readonly id: number;
    /**
     * Status of the request. 1 = PENDING APPROVAL, 2 = APPROVED, 3 = DECLINED
     */
    readonly status: number;
    media?: MediaInfo;
    readonly createdAt?: string;
    readonly updatedAt?: string;
    requestedBy?: User;
    modifiedBy?: (User | string | null);
    is4k?: boolean;
    serverId?: number;
    profileId?: number;
    rootFolder?: string;
};

