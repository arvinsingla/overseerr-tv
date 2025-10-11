/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { IssueComment } from './IssueComment';
import type { MediaInfo } from './MediaInfo';
import type { User } from './User';
export type Issue = {
    id?: number;
    issueType?: number;
    media?: MediaInfo;
    createdBy?: User;
    modifiedBy?: User;
    comments?: Array<IssueComment>;
};

