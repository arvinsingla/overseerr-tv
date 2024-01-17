/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type NotificationEmailSettings = {
    enabled?: boolean;
    types?: number;
    options?: {
        emailFrom?: string;
        senderName?: string;
        smtpHost?: string;
        smtpPort?: number;
        secure?: boolean;
        ignoreTls?: boolean;
        requireTls?: boolean;
        authUser?: string | null;
        authPass?: string | null;
        allowSelfSigned?: boolean;
    };
};

