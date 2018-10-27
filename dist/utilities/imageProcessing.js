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
var sharp = require("sharp");
var jpegOptions = { quality: 70 };
var pngOptions = { compressionLevel: 7 };
/**
 * Apply compression to a sharp object.
 *
 * @param {Sharp} image - Sharp object.
 * @returns {Promise}
 * @fulfil {Sharp} Compressed sharp object.
 * @reject {Error} Error value.
 */
function compressImage(image) {
    return __awaiter(this, void 0, void 0, function () {
        var metadata, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, image.metadata()];
                case 1:
                    metadata = _a.sent();
                    if (metadata.format === 'png') {
                        return [2 /*return*/, image.png(pngOptions)];
                    }
                    else if (metadata.format === 'jpeg') {
                        return [2 /*return*/, image.jpeg(jpegOptions)];
                    }
                    else {
                        return [2 /*return*/, image];
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    throw error_1;
                case 3: return [2 /*return*/];
            }
        });
    });
}
/**
 * Generate buffered image (image compression and resize is applied accordingly).
 *
 * @param {string} filePath - Absolute path to image file.
 * @param {boolean} compress - Flag to compress image.
 * @param {number} sizeLimit - Resizing dimension limit value.
 * @returns {Promise}
 * @fulfil {Buffer} Buffered image data.
 * @reject {Error} Error value.
 */
function imageToBuffer(filePath, compress, sizeLimit) {
    if (compress === void 0) { compress = false; }
    if (sizeLimit === void 0) { sizeLimit = 640; }
    return __awaiter(this, void 0, void 0, function () {
        var image, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    image = sharp(filePath).rotate();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 7, , 8]);
                    if (!compress) return [3 /*break*/, 3];
                    return [4 /*yield*/, compressImage(image)];
                case 2:
                    image = _a.sent();
                    _a.label = 3;
                case 3:
                    if (!sizeLimit) return [3 /*break*/, 5];
                    return [4 /*yield*/, resizeImage(image, sizeLimit)];
                case 4:
                    image = _a.sent();
                    _a.label = 5;
                case 5: return [4 /*yield*/, image.toBuffer()];
                case 6: return [2 /*return*/, _a.sent()];
                case 7:
                    error_2 = _a.sent();
                    throw error_2;
                case 8: return [2 /*return*/];
            }
        });
    });
}
exports.imageToBuffer = imageToBuffer;
/**
 * Resize a sharp object
 *
 * @param {Sharp} image - sharp object.
 * @param {number} sizeLimit - Size (in pixels) to limit image dimension.
 * @returns {Promise}
 * @fulfil {Sharp} Resized sharp object.
 * @reject {Error} Error value.
 */
function resizeImage(image, sizeLimit) {
    if (sizeLimit === void 0) { sizeLimit = 640; }
    return __awaiter(this, void 0, void 0, function () {
        var metadata, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, image.metadata()];
                case 1:
                    metadata = _a.sent();
                    if (!metadata.height || !metadata.width) {
                        throw new Error('image dimension cannot be determined');
                    }
                    return [2 /*return*/, metadata.height === metadata.width
                            ? image.resize(sizeLimit, sizeLimit) // square image
                            : metadata.height < metadata.width
                                ? image.resize(sizeLimit, undefined) // wider image
                                : image.resize(undefined, sizeLimit)]; // taller image
                case 2:
                    error_3 = _a.sent();
                    throw error_3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
//# sourceMappingURL=imageProcessing.js.map