import { RelatedVideo } from "./OverseerrClient";
import { ERROR_URL } from "./constants";

export function trunc(str: string, length: number, elipses: boolean = false): string {
    if (str.length > length) {
        if (elipses) {
            return str.slice(0, length - 3) + '...'
        }
        return str.slice(0, length)
    }
    return str
}

export function formatDollars(dollars: number) {
    var dollarsStr = dollars.toString();
    var result = '';
    var length = dollarsStr.length;
    var count = 0;

    for (var i = length - 1; i >= 0; i--) {
        result = dollarsStr[i] + result;
        count++;
        if (count % 3 === 0 && i !== 0) {
            result = ',' + result;
        }
    }

    return '$' + result;
}

export function getTrailerURLFromRelatedVideos(relatedVideos: RelatedVideo[]) {
	if (!relatedVideos.length) {
		return ''
	}
	const key = relatedVideos.find((video) => video.type === "Trailer" && video.site === "YouTube" ? true : false)?.key ?? ''
	if (key) {
		return `youtube://watch/${key}`
	}
	return ''
}

export const logError = (type: string, error: any) => {
	const text = error.message ? error.message : error.toString();
	const body = JSON.stringify({
		type,
		error: {
			text,
		}
	})
	return fetch(ERROR_URL, {
		method: "POST",
		body,
		headers: {
			"Content-Type": "application/json",
		},
	});
}
