"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AppConfig = (function () {
    function AppConfig() {
        this.apiUrl = 'http://' + window.location.hostname + ':4000';
        this.snipUrl = 'http://' + window.location.hostname + ':8000';
    }
    return AppConfig;
}());
exports.AppConfig = AppConfig;
;
//# sourceMappingURL=app.config.js.map