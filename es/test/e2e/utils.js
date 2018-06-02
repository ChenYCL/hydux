var _this = this;
import * as tslib_1 from "tslib";
import * as puppeteer from 'puppeteer';
import * as child from 'child_process';
import * as assert from 'assert';
export var IsCI = !!process.env.CI;
export var Examples = process.cwd() + "/examples";
export var timeout = 60000;
export var runServer = function (app, port) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var p;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                p = child.exec(process.cwd() + "/node_modules/.bin/serve -n -c 0 -s -p " + port, {
                    cwd: Examples + "/" + app,
                });
                p.stderr.on('data', console.error);
                return [4 /*yield*/, new Promise(function (res) { return p.stdout.on('data', function (d) { return (console.log(d), res()); }); })];
            case 1:
                _a.sent();
                return [4 /*yield*/, sleep(1000)];
            case 2:
                _a.sent();
                return [2 /*return*/, p];
        }
    });
}); };
export function downloadChrome() {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var revision, p, fetcher, revisionInfo;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!IsCI && require('get-chrome')()) {
                        console.log('Chrome is installed');
                        return [2 /*return*/];
                    }
                    revision = require(process.cwd() + "/node_modules/puppeteer/package.json")
                        .puppeteer
                        .chromium_revision;
                    console.log('Start downloading chrome:', revision);
                    p = puppeteer;
                    fetcher = p.createBrowserFetcher();
                    return [4 /*yield*/, fetcher.download(revision)];
                case 1:
                    revisionInfo = _a.sent();
                    console.log('Chrome downloaded info:', revisionInfo);
                    return [2 /*return*/];
            }
        });
    });
}
export var sleep = function (ms) {
    return new Promise(function (res) { return setTimeout(res, ms); });
};
export var launchBrowser = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    return tslib_1.__generator(this, function (_a) {
        return [2 /*return*/, puppeteer.launch({
                args: ['--no-sandbox', '--disable-setuid-sandbox'],
                executablePath: IsCI
                    ? puppeteer.executablePath()
                    : require('get-chrome')()
            })];
    });
}); };
export var text = function (e, trim) {
    if (trim === void 0) { trim = true; }
    return tslib_1.__awaiter(_this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sleep(20)];
                case 1:
                    _a.sent();
                    return [2 /*return*/, e.getProperty('innerText')
                            .then(function (e) { return e.jsonValue(); })
                            .then(function (e) { return trim ? e.trim() : e; })];
            }
        });
    });
};
export var counterSuit = function (page, n, init) {
    if (n === void 0) { n = 0; }
    if (init === void 0) { init = 0; }
    return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var c1, c1Up, c1Down, c1UpLater, _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        return tslib_1.__generator(this, function (_o) {
            switch (_o.label) {
                case 0: return [4 /*yield*/, page.waitFor('.count')];
                case 1:
                    _o.sent();
                    return [4 /*yield*/, page.$$('.count')];
                case 2:
                    c1 = (_o.sent())[n];
                    return [4 /*yield*/, page.$$('.up')];
                case 3:
                    c1Up = (_o.sent())[n];
                    return [4 /*yield*/, page.$$('.down')];
                case 4:
                    c1Down = (_o.sent())[n];
                    return [4 /*yield*/, page.$$('.upLater')];
                case 5:
                    c1UpLater = (_o.sent())[n];
                    _b = (_a = assert).equal;
                    return [4 /*yield*/, text(c1)];
                case 6:
                    _b.apply(_a, [_o.sent(), "" + init, "count" + n]);
                    return [4 /*yield*/, c1Up.click()];
                case 7:
                    _o.sent();
                    _d = (_c = assert).equal;
                    return [4 /*yield*/, text(c1)];
                case 8:
                    _d.apply(_c, [_o.sent(), "" + (init + 1), "count" + n + " up"]);
                    return [4 /*yield*/, c1Down.click()];
                case 9:
                    _o.sent();
                    _f = (_e = assert).equal;
                    return [4 /*yield*/, text(c1)];
                case 10:
                    _f.apply(_e, [_o.sent(), "" + init, "count" + n + " down"]);
                    return [4 /*yield*/, c1UpLater.click()];
                case 11:
                    _o.sent();
                    _h = (_g = assert).equal;
                    return [4 /*yield*/, text(c1)];
                case 12:
                    _h.apply(_g, [_o.sent(), "" + init, "count" + n + " upLater before"]);
                    return [4 /*yield*/, sleep(1100)];
                case 13:
                    _o.sent();
                    _k = (_j = assert).equal;
                    return [4 /*yield*/, text(c1)];
                case 14:
                    _k.apply(_j, [_o.sent(), "" + (init + 10), "count" + n + " upLater"]);
                    return [4 /*yield*/, c1Up.click()];
                case 15:
                    _o.sent();
                    return [4 /*yield*/, c1Up.click()];
                case 16:
                    _o.sent();
                    return [4 /*yield*/, c1Up.click()];
                case 17:
                    _o.sent();
                    _m = (_l = assert).equal;
                    return [4 /*yield*/, text(c1)];
                case 18:
                    _m.apply(_l, [_o.sent(), "" + (init + 13), "count" + n + " upLater"]);
                    return [2 /*return*/];
            }
        });
    });
};
//# sourceMappingURL=utils.js.map