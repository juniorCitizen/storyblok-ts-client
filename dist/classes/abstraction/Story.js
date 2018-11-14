"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Story = /** @class */ (function () {
    function Story(apiClient, data) {
        this.apiClient = apiClient;
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
        var _this = this;
        var updatedData = JSON.parse(JSON.stringify(this.data));
        updatedData.content = content;
        return this.apiClient.stories
            .update(updatedData)
            .then(function (updatedStory) {
            _this.data = updatedStory;
            return Promise.resolve();
        })
            .catch(function (e) { return Promise.reject(e); });
    };
    Story.prototype.sync = function () {
        var _this = this;
        var request = !this.data.id
            ? this.apiClient.stories.create(this.data)
            : this.apiClient.stories.get(this.data.id);
        return request
            .then(function (story) {
            _this.data = story;
            return Promise.resolve();
        })
            .catch(function (e) { return Promise.reject(e); });
    };
    return Story;
}());
exports.Story = Story;
//# sourceMappingURL=Story.js.map