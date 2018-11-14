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
var Subfolder = /** @class */ (function (_super) {
    __extends(Subfolder, _super);
    function Subfolder(credentials, data, parent) {
        var _this = _super.call(this, credentials, data) || this;
        _this.data.is_folder = true;
        _this.parent = parent;
        return _this;
    }
    Subfolder.prototype.sync = function () {
        if (this.parent.isFolder) {
            this.data.parent_id = this.parent.id;
        }
        else {
            throw new Error('parent must be a folder');
        }
        return _super.prototype.sync.call(this);
    };
    return Subfolder;
}(Folder_1.Folder));
exports.Subfolder = Subfolder;
//# sourceMappingURL=Subfolder.js.map