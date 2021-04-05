function EventEmitterWrapped() {
    var self = this;

    this.localName = null;
    this.localListeners = [];

    var addLocalListener = function (name) {
        if (!self.localName)
            return;

        if (!self.localListeners[self.localName])
            self.localListeners[self.localName] = [];

        if (!self.localListeners[self.localName].find(l => l === name))
            self.localListeners[self.localName].push(name);
    };

    this.removeLocalListeners = function () {
        if (!self.localName || !self.localListeners[self.localName])
            return;

        self.localListeners[self.localName].forEach(function (name) {
            window.emitter.removeAllListeners(name);
        });

        self.localListeners[self.localName] = [];
    };

    this.on = function (name, callback) {
        //console.log("EventEmitterWrapped", name);
        window.emitter.removeAllListeners([name]);
        window.emitter.on(name, callback);
        addLocalListener(name);
    };

    this.once = function (name, callback) {
        //console.log("EventEmitterWrapped.once", name);
        window.emitter.removeAllListeners([name]);
        window.emitter.once(name, callback);
        addLocalListener(name);
    };

    this.emit = function(name,...args) {
        return window.emitter.emit(name, ...args);
    };

    this.original = window.emitter;
}