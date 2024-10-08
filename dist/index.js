"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientSSH = void 0;
var node_ssh_1 = require("node-ssh");
var events_1 = require("events");
var ClientSSH = /** @class */ (function (_super) {
    __extends(ClientSSH, _super);
    function ClientSSH() {
        var _this = _super.call(this) || this;
        _this.timeout = 1000 * 60 * 2;
        _this.client = null;
        _this.connection = new node_ssh_1.NodeSSH();
        return _this;
    }
    ClientSSH.prototype.onDispatcher = function (timeout) {
        var _this = this;
        if (this.dispatcher)
            clearTimeout(this.dispatcher);
        this.dispatcher = setTimeout(function () {
            _this.dispose();
            _this.emit('timeout');
        }, timeout);
    };
    ClientSSH.prototype.connect = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.connection.connect(options)];
                    case 1:
                        _c.sent();
                        this.client = (_a = this.connection) === null || _a === void 0 ? void 0 : _a.connection;
                        this.onDispatcher((_b = options.timeout) !== null && _b !== void 0 ? _b : this.timeout);
                        this.emit('connect');
                        return [2 /*return*/, this];
                }
            });
        });
    };
    ClientSSH.prototype.isConnected = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.connection.isConnected() || false];
            });
        });
    };
    ClientSSH.prototype.getConfig = function () {
        return __awaiter(this, void 0, void 0, function () {
            var config;
            return __generator(this, function (_a) {
                config = this.connection.connection.config;
                return [2 /*return*/, config];
            });
        });
    };
    ClientSSH.prototype.execCommand = function (command, options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (Array.isArray(command))
                    command = command.join(' \n ');
                if (options === null || options === void 0 ? void 0 : options.timeout)
                    this.onDispatcher(options.timeout);
                return [2 /*return*/, this.connection.execCommand(command, options)];
            });
        });
    };
    ClientSSH.prototype.execCommandRoot = function (command, options) {
        return __awaiter(this, void 0, void 0, function () {
            var config, password, _a, code, signal, stderr, stdout;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.getConfig()];
                    case 1:
                        config = _b.sent();
                        password = "".concat(config === null || config === void 0 ? void 0 : config.password);
                        if (Array.isArray(command))
                            command = command.join(' \n ');
                        if (options === null || options === void 0 ? void 0 : options.timeout)
                            this.onDispatcher(options.timeout);
                        return [4 /*yield*/, this.connection.execCommand(command, {
                                execOptions: { pty: true },
                                stdin: "".concat(password, "\n"),
                                cwd: options === null || options === void 0 ? void 0 : options.cwd,
                                encoding: options === null || options === void 0 ? void 0 : options.encoding,
                                onStdout: function (chunk) { var _a; return (_a = options === null || options === void 0 ? void 0 : options.onStdout) === null || _a === void 0 ? void 0 : _a.call(options, Buffer.from(chunk.toString('utf-8').replace(password, ''))); },
                                onStderr: function (chunk) { var _a; return (_a = options === null || options === void 0 ? void 0 : options.onStderr) === null || _a === void 0 ? void 0 : _a.call(options, Buffer.from(chunk.toString('utf-8').replace(password, ''))); },
                            })];
                    case 2:
                        _a = _b.sent(), code = _a.code, signal = _a.signal, stderr = _a.stderr, stdout = _a.stdout;
                        return [2 /*return*/, { code: code, signal: signal, stdout: stdout.replace(password, ''), stderr: stderr.replace(password, '') }];
                }
            });
        });
    };
    ClientSSH.prototype.exec = function (command, parameters, options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (Array.isArray(command))
                    command = command.join(' \n ');
                return [2 /*return*/, this.connection.exec(command, parameters !== null && parameters !== void 0 ? parameters : [], options)];
            });
        });
    };
    ClientSSH.prototype.execRoot = function (command, parameters, options) {
        return __awaiter(this, void 0, void 0, function () {
            var config, password;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.getConfig()];
                    case 1:
                        config = _b.sent();
                        password = "".concat(config === null || config === void 0 ? void 0 : config.password);
                        if (Array.isArray(command))
                            command = command.join(' \n ');
                        if (options === null || options === void 0 ? void 0 : options.timeout)
                            this.onDispatcher(options.timeout);
                        return [4 /*yield*/, this.connection.exec(command, parameters !== null && parameters !== void 0 ? parameters : [], __assign(__assign({}, options), { execOptions: (_a = options === null || options === void 0 ? void 0 : options.execOptions) !== null && _a !== void 0 ? _a : { pty: true }, stdin: "".concat(password, "\n"), onStdout: function (chunk) { var _a; return (_a = options === null || options === void 0 ? void 0 : options.onStdout) === null || _a === void 0 ? void 0 : _a.call(options, Buffer.from(chunk.toString('utf-8').replace(password, ''))); }, onStderr: function (chunk) { var _a; return (_a = options === null || options === void 0 ? void 0 : options.onStderr) === null || _a === void 0 ? void 0 : _a.call(options, Buffer.from(chunk.toString('utf-8').replace(password, ''))); } }))];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ClientSSH.prototype.dispose = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.emit('dispose');
                return [2 /*return*/, this.connection.dispose()];
            });
        });
    };
    ClientSSH.prototype.on = function (eventName, listener) {
        return _super.prototype.on.call(this, eventName, listener);
    };
    return ClientSSH;
}(events_1.EventEmitter));
exports.ClientSSH = ClientSSH;
