"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var assert = require("assert");
var getPort = require("get-port");
var Utils = require("./utils");
describe('router test', function () {
    var _this = this;
    this.timeout(10000);
    var browser = null;
    var page = null;
    var port = 0;
    var hs = null;
    before(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Utils.launchBrowser()];
                case 1:
                    browser = _a.sent();
                    return [4 /*yield*/, getPort()];
                case 2:
                    port = _a.sent();
                    return [4 /*yield*/, Utils.runServer('router', port)];
                case 3:
                    hs = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    after(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('ssr start close browser');
                    return [4 /*yield*/, browser.close()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, hs.kill()];
                case 2:
                    _a.sent();
                    console.log('ssr end close browser');
                    return [2 /*return*/];
            }
        });
    }); });
    beforeEach(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, browser.newPage()];
                case 1:
                    page = _a.sent();
                    return [4 /*yield*/, page.goto("http://127.0.0.1:" + port)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    afterEach(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, page.close()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('simple', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var _this = this;
        var routeTo, $main, _a, _b, _c, _d, _e, _f;
        return tslib_1.__generator(this, function (_g) {
            switch (_g.label) {
                case 0: return [4 /*yield*/, page.waitFor('.main')];
                case 1:
                    _g.sent();
                    routeTo = function (sel) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                        return tslib_1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, page.$(sel)];
                                case 1: return [4 /*yield*/, (_a.sent()).click()];
                                case 2:
                                    _a.sent();
                                    return [4 /*yield*/, Utils.sleep(50)];
                                case 3:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); };
                    return [4 /*yield*/, page.$('.main')];
                case 2:
                    $main = (_g.sent());
                    _b = (_a = assert).equal;
                    return [4 /*yield*/, Utils.text($main)];
                case 3:
                    _b.apply(_a, [_g.sent(), 'Home', "route home"]);
                    return [4 /*yield*/, routeTo('a.users')];
                case 4:
                    _g.sent();
                    _d = (_c = assert).equal;
                    return [4 /*yield*/, Utils.text($main)];
                case 5:
                    _d.apply(_c, [_g.sent(), 'User: 1', "route users"]);
                    return [4 /*yield*/, routeTo('a.counter')];
                case 6:
                    _g.sent();
                    return [4 /*yield*/, Utils.counterSuit(page, 0)];
                case 7:
                    _g.sent();
                    return [4 /*yield*/, routeTo('a.e404')];
                case 8:
                    _g.sent();
                    _f = (_e = assert).equal;
                    return [4 /*yield*/, Utils.text($main)];
                case 9:
                    _f.apply(_e, [_g.sent(), '404', 'route 404']);
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=router.test.js.map