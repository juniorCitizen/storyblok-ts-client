"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Folder_1 = require("./Folder");
var RootFolder = /** @class */ (function (_super) {
    __extends(RootFolder, _super);
    function RootFolder(credentials, data) {
        var _this = _super.call(this, credentials, data) || this;
        _this.data.is_folder = true;
        _this.data.parent_id = 0;
        return _this;
    }
    return RootFolder;
}(Folder_1.Folder));
exports.RootFolder = RootFolder;
//# sourceMappingURL=RootFolder.js.map