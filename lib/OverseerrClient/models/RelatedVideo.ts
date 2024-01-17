/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type RelatedVideo = {
    url?: string;
    key?: string;
    name?: string;
    size?: number;
    type?: RelatedVideo.type;
    site?: RelatedVideo.site;
};
export namespace RelatedVideo {
    export enum type {
        CLIP = 'Clip',
        TEASER = 'Teaser',
        TRAILER = 'Trailer',
        FEATURETTE = 'Featurette',
        OPENING_CREDITS = 'Opening Credits',
        BEHIND_THE_SCENES = 'Behind the Scenes',
        BLOOPERS = 'Bloopers',
    }
    export enum site {
        YOU_TUBE = 'YouTube',
    }
}

