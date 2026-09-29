(function() {
    document.addEventListener("DOMContentLoaded", () => {
        frislet();
    });
    function frislet() {
        App.Events.subscribeAllDomains();
        App.Events.chainEvents();
        App.freezeAllDomainConstants();
        return App.Logs.internalMessage(
            `Initialized Frislet, version ${App.version}`
        );
    };
})();