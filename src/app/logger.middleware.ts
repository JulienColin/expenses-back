import express from 'express';

export function logger(
    request: express.Request,
    response: express.Response,
    next: () => void
): void {
    logRequest(request);
    logResponse(response);
    next();
}

function logRequest(
    request: express.Request
): void {
    console.log(
        `${request.method} - ${request.path} - ${JSON.stringify(request.query)} - ${JSON.stringify(request.body)}`);
}

function logResponse(
    response: express.Response
): void {
    console.log(`${response.statusCode} ${response.statusMessage ? '-' + response.statusMessage : ''}`);
}
