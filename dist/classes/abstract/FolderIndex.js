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
var Story_1 = require("./Story");
var FolderIndex = /** @class */ (function (_super) {
    __extends(FolderIndex, _super);
    function FolderIndex(credentials, data, parent) {
        var _this = _super.call(this, credentials, data) || this;
        _this.data.is_folder = false;
        _this.parent = parent;
        _this.data.is_startpage = true;
        return _this;
    }
    FolderIndex.prototype.sync = function () {
        if (this.parent.isFolder) {
            this.data.parent_id = this.parent.id;
        }
        else {
            throw new Error('parent must be a folder');
        }
        return _super.prototype.sync.call(this);
    };
    return FolderIndex;
}(Story_1.Story));
exports.FolderIndex = FolderIndex;
//# sourceMappingURL=FolderIndex.js.map