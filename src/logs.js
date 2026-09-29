App.Logs.runtime = {
    verbosity: 2
}

App.Logs.internalError = function(message, specialType = null) {
    switch (App.Logs.runtime.verbosity) {
        case 0: {
            return;
            break;
        }
        case 1: {
            break;
        }
        case 2: {
            break;
        }
    }
    if (specialType != null && App.Logs.runtime.verbosity >= 1) {
        switch (specialType) {
            case "TypeError": {
                throw new TypeError(message);
                break;
            }
            case "RangeError": {
                throw new RangeError(message);
                break;
            }
            default: {
                return App.Logs.internalError(`Special error type "${specialType}" is invalid`);
            }
        }
    }
    throw new Error(`An error occurred: "${message}"`);
    App.Events.Signals.emit(App.Events.events.generic.internalError);
}

App.Logs.internalWarning = function(message) {
    switch (App.Logs.runtime.verbosity) {
        case 0:
            return;
            break;
        case 1:
            break;
        case 2:
            break;
    }
    console.warn(`Warning: "${message}"`);
    App.Events.Signals.emit(App.Events.events.generic.internalWarning);
}

App.Logs.internalMessage = function(message) {
    switch (App.Logs.runtime.verbosity) {
        case 0:
            return;
            break;
        case 1:
            return;
            break;
        case 2:
            break;
    }
    console.log(message);
    App.Events.Signals.emit(App.Events.events.generic.internalMessage);
}