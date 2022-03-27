import { NextFunction, Request, Response } from 'express';

const getDurationInMilliseconds = (start?: [number, number]) => {
    const NS_PER_SEC = 1e9
    const NS_TO_MS = 1e6
    const diff = process.hrtime(start)

    return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS
}

export const tracker = (req: Request, res: Response, next: NextFunction) => {
    console.log(`[STARTED]`)
    const start = process.hrtime()

    res.on('finish', () => {
        const durationInMilliseconds = getDurationInMilliseconds (start)
        console.log(`[FINISHED] ${durationInMilliseconds.toLocaleString()} ms`)
    })

    res.on('close', () => {
        const durationInMilliseconds = getDurationInMilliseconds (start)
        console.log(`[CLOSED] ${durationInMilliseconds.toLocaleString()} ms`)
    })

    next();
};
