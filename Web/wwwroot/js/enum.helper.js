function enumHelper(obj) {
    var self = this;

    self.enum = obj;
    self.array = function () {
        var list = [];
        Object.getOwnPropertyNames(self.enum).forEach(function (name) {
            list.push({ name: name, value: self.enum[name] });
        });

        return list;
    }
}
