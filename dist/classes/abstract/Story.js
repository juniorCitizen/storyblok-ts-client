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
var Story = /** @class */ (function () {
    function Story(credentials, data) {
        this.credentials = credentials;
        this.apiClient = new ApiClient_1.ApiClient(this.credentials.apiToken, this.credentials.spaceId);
        this.data = data;
    }
    Object.defineProperty(Story.prototype, "content", {
        get: function () {
            return this.data.content;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Story.prototype, "fullSlug", {
        get: function () {
            if (!this.data.full_slug) {
                throw new Error('uninitialized story');
            }
            return this.data.full_slug;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Story.prototype, "id", {
        get: function () {
            if (!this.data.id) {
                throw new Error('uninitialized story');
            }
            return this.data.id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Story.prototype, "isFolder", {
        get: function () {
            if (!this.data.is_folder) {
                throw new Error('uninitialized story');
            }
            return this.data.is_folder;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Story.prototype, "name", {
        get: function () {
            return this.data.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Story.prototype, "slug", {
        get: function () {
            return this.data.slug;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Story.prototype, "uuid", {
        get: function () {
            if (!this.data.uuid) {
                throw new Error('uninitialized story');
            }
            return this.data.uuid;
        },
        enumerable: true,
        configurable: true
    });
    Story.prototype.generate = function () {
        var _this = this;
        return this.sync()
            .then(function () { return console.log("'" + _this.name + "' story generated"); })
            .catch(function (e) { return Promise.reject(e); });
    };
    Story.prototype.updateContent = function (content) {
        return __awaiter(this, void 0, void 0, function () {
            var updatedData, _a, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        updatedData = JSON.parse(JSON.stringify(this.data));
                        updatedData.content = content;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        _a = this;
                        return [4 /*yield*/, this.apiClient.stories.update(updatedData)];
                    case 2:
                        _a.data = _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _b.sent();
                        throw error_1;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Story.prototype.updatePath = function (path) {
        return __awaiter(this, void 0, void 0, function () {
            var updatedData, _a, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        updatedData = JSON.parse(JSON.stringify(this.data));
                        updatedData.path = path;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        _a = this;
                        return [4 /*yield*/, this.apiClient.stories.update(updatedData)];
                    case 2:
                        _a.data = _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _b.sent();
                        throw error_2;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Story.prototype.sync = function () {
        return __awaiter(this, void 0, void 0, function () {
            var request, _a, error_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        request = !this.data.id
                            ? this.apiClient.stories.create(this.data)
                            : this.apiClient.stories.get(this.data.id);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        _a = this;
                        return [4 /*yield*/, request];
                    case 2:
                        _a.data = _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_3 = _b.sent();
                        throw error_3;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return Story;
}());
exports.Story = Story;
//# sourceMappingURL=Story.js.map