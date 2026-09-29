App.Intervals.intervalMap = new Map();

App.Intervals.intervalExists = function(name) {
    return App.Intervals.intervalMap.has(name);
}

App.Intervals.startInterval = function({
        name, 
        fn, 
        fnParams = [], 
        delay
    }) {
    if (App.Intervals.intervalExists(name)) {
        return App.Logs.internalError(`Interval ${name} is already running`);
    } else {
        if (!Array.isArray(fnParams)) { fnParams = [fnParams]; }
        const id = setInterval(fn, delay, ...fnParams);
        App.Intervals.intervalMap.set(name, {
            id,
            fn,
            fnParams,
            delay,
            startedAt: Date.now()
        });
    }
}

App.Intervals.stopInterval = function(name) {
    if (!App.Intervals.intervalExists(name)) { 
        return App.Logs.internalError(`Interval "${name}" to stop not found`);
    } else {
        const interval = App.Intervals.intervalMap.get(name);
        clearInterval(interval.id);
        App.Intervals.intervalMap.delete(name);
    }
}

App.Intervals.restartInterval = function(name) {
    if (!App.Intervals.intervalExists(name)) { 
        return App.Logs.internalError(`Interval "${name}" to restart not found`);
    } else {
        const interval = App.Intervals.intervalMap.get(name);
        clearInterval(interval.id);
        interval.id = setInterval(interval.fn, interval.delay, ...interval.fnParams);
    }
}

App.Intervals.stopAllIntervals = function() {
    for (const interval of App.Intervals.intervalMap.values()) {
        clearInterval(interval.id);
    }
    App.Intervals.intervalMap.clear();
}