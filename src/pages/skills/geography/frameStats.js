/**
 * Rolling frame-time statistics for the Solar System's `?debug` readout.
 * `interval` is the time between animation frames (what a child feels);
 * `work` is the time our own update and render code took inside one frame.
 */
const MAX_INTERVAL_MS = 1000; // longer gaps are a hidden tab or a breakpoint, not a slow frame

export function percentile(sorted, p) {
    if (sorted.length === 0) return 0;
    return sorted[Math.max(0, Math.ceil(p * sorted.length) - 1)];
}

export function createFrameStats(capacity = 240) {
    const intervals = new Float64Array(capacity);
    const work = new Float64Array(capacity);
    let next = 0;
    let count = 0;

    return {
        record(intervalMs, workMs) {
            if (!(intervalMs > 0 && intervalMs <= MAX_INTERVAL_MS) || !(workMs >= 0)) return;
            intervals[next] = intervalMs;
            work[next] = workMs;
            next = (next + 1) % capacity;
            count = Math.min(count + 1, capacity);
        },
        reset() {
            next = 0;
            count = 0;
        },
        summary() {
            const sortedIntervals = Array.from(intervals.subarray(0, count)).sort((a, b) => a - b);
            const sortedWork = Array.from(work.subarray(0, count)).sort((a, b) => a - b);
            const intervalMedian = percentile(sortedIntervals, 0.5);
            return {
                frames: count,
                fps: intervalMedian > 0 ? 1000 / intervalMedian : 0,
                intervalMedian,
                intervalP95: percentile(sortedIntervals, 0.95),
                workMedian: percentile(sortedWork, 0.5),
                workP95: percentile(sortedWork, 0.95),
            };
        },
    };
}
