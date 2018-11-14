"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
var ApiClient_1 = require("../ApiClient");
var Space = /** @class */ (function () {
    function Space(credentials) {
        this.credentials = credentials;
        this.apiClient = new ApiClient_1.ApiClient(this.credentials.apiToken, this.credentials.spaceId);
        this.data = undefined;
    }
    Object.defineProperty(Space.prototype, "id", {
        get: function () {
            if (!this.data) {
                throw new Error('uninitialized space');
            }
            return this.data.id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Space.prototype, "name", {
        get: function () {
            if (!this.data) {
                throw new Error('uninitialized space');
            }
            return this.data.name;
        },
        enumerable: true,
        configurable: true
    });
    Space.prototype.teardown = function () {
        return __awaiter(this, void 0, void 0, function () {
            var stories, assets, assetFolders, components, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, this.apiClient.stories.deleteExisting()];
                    case 1:
                        stories = _a.sent();
                        console.log("deleted " + stories.length + " stories");
                        return [4 /*yield*/, this.apiClient.assets.deleteExisting()];
                    case 2:
                        assets = _a.sent();
                        console.log("deleted " + assets.length + " assets");
                        return [4 /*yield*/, this.apiClient.assetFolders.deleteExisting()];
                    case 3:
                        assetFolders = _a.sent();
                        console.log("deleted " + assetFolders.length + " asset folders");
                        return [4 /*yield*/, this.apiClient.components.deleteExisting()];
                    case 4:
                        components = _a.sent();
                        console.log("deleted " + components.length + " components");
                        console.log('space teardown completed');
                        return [3 /*break*/, 6];
                    case 5:
                        error_1 = _a.sent();
                        throw error_1;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    Space.prototype.publishAll = function () {
        return this.apiClient.stories
            .publishPendings()
            .then(function (stories) { return console.log("published " + stories.length + " stories"); })
            .catch(function (e) { return Promise.reject(e); });
    };
    Space.prototype.sync = function () {
        var _this = this;
        return this.apiClient.spaces
            .get()
            .then(function (space) {
            _this.data = space;
            var message = _this.name + "(id: " + _this.id + ") verified";
            return console.log(message);
        })
            .catch(function (e) { return Promise.reject(e); });
    };
    return Space;
}());
exports.Space = Space;
//# sourceMappingURL=Space.js.map