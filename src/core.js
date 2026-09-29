window.App = {};
App.version = "0.1.0-beta.1";

App.initializeDomain = function(domainName) {
    if (App[domainName]) {
        return console.error(`Domain "${domainName}" already exists`);
    } else {
        App[domainName] = {
            constants: {},
            runtime: {}
        }
    }
    return console.log(`Initialized domain "${domainName}"`);
}

// infrastructure
App.initializeDomain("Events");
App.initializeDomain("Logs"); 
App.initializeDomain("Intervals");
App.initializeDomain("HTML");

// business >:)
App.initializeDomain("AppModel");
App.initializeDomain("Handlers");

// application services
App.initializeDomain("RenderRegistry"); // used only by Render
App.initializeDomain("Render");

// initialization
App.initializeDomain("Bootstrap");

App.recursiveObjectFreeze = function(object, seen = new WeakSet()) {
    if (object === null || typeof object !== "object" || seen.has(object)) {
        return object;
    }
    seen.add(object);
    for (const value of Object.values(object)) {
        App.recursiveObjectFreeze(value, seen);
    }
    return Object.freeze(object);
}
App.freezeDomainConstants = function(domainName) {
    const domain = window.App[domainName];
    if (!domain || typeof domain !== "object" || !domain.constants) {
        return console.error(`
            Domain "${domainName}" to freeze is invalid, nonexistent, or does not have a constants object
        `);
    } else {
        App.recursiveObjectFreeze(domain.constants);
        return console.log(`Froze constants of domain "${domainName}"`);
    }
}
App.freezeAllDomainConstants = function() {
    for (const [name, value] of Object.entries(App)) {
        if (value && typeof value === "object" && value.constants) {
            App.freezeDomainConstants(name);
        }
    }
}