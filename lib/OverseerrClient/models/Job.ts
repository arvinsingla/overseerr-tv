/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type Job = {
    id?: string;
    type?: Job.type;
    interval?: Job.interval;
    name?: string;
    nextExecutionTime?: string;
    running?: boolean;
};
export namespace Job {
    export enum type {
        PROCESS = 'process',
        COMMAND = 'command',
    }
    export enum interval {
        SHORT = 'short',
        LONG = 'long',
        FIXED = 'fixed',
    }
}

