App.Events.runtime = {
    domainsSubscribedToEvents: false
}

App.Events.Signals = {
    listeners: {},

    validatePayload(event, payload = {}) {
        const definition = event;
        const allowed = new Set(definition.payload ?? []);
        for (const key of Object.keys(payload)) {
            if (!allowed.has(key)) {
                return false;
            }
        }
        return true;
    },

    on(event, fn) {
        if (!event || !event.id) {
            return console.error(`Event "${event}" to react to does not exist`);
        } else if (!App.Events.Signals.listeners[event.id]) {
            App.Events.Signals.listeners[event.id] = [];
        }
        App.Events.Signals.listeners[event.id].push(fn);
    },

    emit(event, payload = {}) {
        const listeners = App.Events.Signals.listeners[event.id];
        if (!event) {
            return console.error(`Event "${event} to emit does not exist`);
        } else if (!listeners) {
            return;
        } else if (!App.Events.Signals.validatePayload(event, payload)) {
            return console.error(`Payload "${Object.entries(payload)}" is invalid for emitting event ${event.id}`);
        } else {
            for (const fn of listeners) {
                fn(payload);
            }
        }
    }
};

App.Events.events = {
    generic: {
        internalError: {
            id: "generic:internal_error"
        },
        internalWarning: {
            id: "generic:internal_warning"
        },
        internalMessage: {
            id: "generic:internal_message"
        },
        userMessage: {
            id: "generic:user_message"
        },
        firstUserInteraction: {
            id: "generic:first_user_interaction"
        }
  },
  appModel: {
  }
}

App.Events.chainEvents = function () {
    App.Logs.internalMessage("Chained together all possible events (none)");
}

App.Events.subscribeAllDomains = function() {
    if (App.Events.runtime.domainsSubscribedToEvents) {
        return App.Logs.internalError("All domains have already been subscribed to Events");
    } else {
        for (const domain of Object.values(App)) {
            if (typeof domain.subscribeToEvents === "function") {
                domain.subscribeToEvents();
            }
        }
        App.Events.runtime.domainsSubscribedToEvents = true;
    }
    App.Logs.internalMessage("Subscribed all possible domains to Events");
}
