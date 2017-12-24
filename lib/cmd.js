"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    none: [],
    ofPromise: function (task, args, succeedAction, failedAction) {
        return [
            function (_) {
                task(args)
                    .then(succeedAction)
                    .catch(failedAction);
            }
        ];
    },
    ofFn: function (task, args, succeedAction, failedAction) {
        return [
            function (_) {
                try {
                    var result = task(args);
                    if (result && succeedAction) {
                        succeedAction(result);
                    }
                }
                catch (e) {
                    failedAction && failedAction(e);
                }
            }
        ];
    },
    ofSub: function (sub) {
        return [sub];
    },
    batch: function () {
        var cmds = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            cmds[_i] = arguments[_i];
        }
        var _concat = Array.prototype.concat;
        return _concat.apply([], _concat.apply([], cmds));
    },
    map: function (map, cmd) {
        return cmd.map(function (sub) { return function (actions) { return sub(map(actions)); }; });
    }
};
//# sourceMappingURL=cmd.js.map