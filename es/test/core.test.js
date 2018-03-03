import * as tslib_1 from "tslib";
import { noop } from './../utils';
import * as assert from 'assert';
import app, { Cmd, withParents } from '../index';
import logger from '../enhancers/logger';
function sleep(ns) {
    return new Promise(resolve => setTimeout(resolve, ns));
}
const Counter = {
    init: () => ({ count: 1 }),
    actions: {
        up: () => state => ({ count: state.count + 1 }),
        upN: (n) => (state, actions) => ({ count: state.count + n }),
        down: () => state => ({ count: state.count - 1 }),
        reset: () => ({ count: 1 }),
        up12: () => (state, actions) => actions.upN(12),
        upLaterByPromise: n => state => actions => new Promise(resolve => setTimeout(() => resolve(actions.upN(n)), 10)),
        upLater: () => state => actions => [state, Cmd.ofPromise(() => new Promise(resolve => setTimeout(() => resolve(), 10)), void 0, actions.up)],
        upLaterObj: () => state => actions => ({
            state,
            cmd: Cmd.ofPromise(() => new Promise(resolve => setTimeout(() => resolve(), 10)), void 0, actions.up)
        }),
        upLaterWithBatchedCmd: () => state => actions => [state, Cmd.batch([
                Cmd.ofPromise(() => new Promise(resolve => setTimeout(() => resolve(), 10)), void 0, actions.up)
            ])]
    }
};
let _dummyState = Counter.init();
describe('core api', () => {
    it('init', () => {
        let ctx;
        let state;
        let renderResult;
        ctx = app({
            init: () => ({ count: 1 }),
            actions: {},
            view: state => actions => state,
            onRender: view => renderResult = view
        });
        assert(ctx.getState().count === 1, 'simple state should work');
        assert.equal(renderResult.count, 1, 'simple state in view should work');
        state = { aa: 1, bb: { cc: 'aa' } };
        ctx = logger()(app)({
            init: () => state,
            actions: {},
            view: (state, actions) => ({ type: 'view', state }),
            onRender: view => renderResult = view
        });
        assert.deepStrictEqual(ctx.getState(), state, 'nested state should work');
        assert.deepStrictEqual(renderResult, { type: 'view', state }, 'nested state in view should work');
    });
    function testCounter(ctx, renderResult, path = []) {
        function getState() {
            let state = ctx.getState();
            for (const i in path) {
                state = state[path[i]];
            }
            return state;
        }
        let actions = ctx.actions;
        for (const i in path) {
            actions = actions[path[i]];
        }
        assert(getState().count === 1, 'init should work');
        assert.deepStrictEqual(ctx.actions, renderResult, 'actions in ctx should work');
        actions.up();
        actions.up();
        actions.up();
        assert.equal(getState().count, 4, 'up should work');
        actions.down();
        actions.down();
        assert(getState().count === 2, 'down should work');
        actions.reset();
        assert(getState().count === 1, 'reset should work');
    }
    it('actions', () => {
        let ctx;
        let state;
        let renderResult;
        ctx = app({
            init: () => ({ count: 1 }),
            actions: {
                up: _ => state => ({ count: state.count + 1 }),
                down: _ => state => ({ count: state.count - 1 }),
                reset: _ => ({ count: 1 }),
            },
            view: state => actions => actions,
            onRender: view => renderResult = view
        });
        testCounter(ctx, renderResult);
    });
    it('complex actions', () => {
        let state;
        let renderResult;
        class ClassActions {
            constructor(inc) {
                this.up = () => (state) => {
                    console.log('up in class', state, this._inc);
                    return ({ count: state.count + this._inc });
                };
                this._inc = inc;
            }
        }
        let ctx = app({
            init: () => ({ count: 1, classActions: { count: 1 } }),
            actions: {
                classActions: new ClassActions(10),
                xx: 'aaa',
                _actions: new Date(),
                up: _ => state => ({ count: state.count + 1 }),
                down: _ => state => ({ count: state.count - 1 }),
                reset: _ => ({ count: 1 }),
            },
            view: state => actions => actions,
            onRender: view => renderResult = view
        });
        testCounter(ctx, renderResult);
        assert.deepEqual(ctx.getState().classActions.count, 1, 'classActions state work');
        ctx.actions.classActions.up();
        assert.deepEqual(ctx.getState().classActions.count, 11, 'classActions should work');
    });
    it('nested async actions', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
        let state;
        let renderResult;
        const _state = {
            counter1: Counter.init(),
            counter2: Counter.init(),
        };
        const actions = {
            counter1: Counter.actions,
            counter2: Counter.actions,
        };
        let ctx = app({
            init: () => _state,
            actions,
            view: state => actions => actions,
            onRender: view => renderResult = view
        });
        assert(ctx.getState().counter1.count === 1, 'counter1 init should work');
        ctx.actions.counter1.upLater();
        assert(ctx.getState().counter1.count === 1, 'counter1 should work 1');
        yield sleep(10);
        assert.equal(ctx.getState().counter1.count, 2, 'counter1 should work 2');
        ctx.actions.counter1.upLater();
        yield sleep(10);
        assert(ctx.getState().counter1.count === 3, 'counter1 should work 3');
        ctx.actions.counter1.upLaterByPromise(3);
        assert(ctx.getState().counter1.count === 3, 'upLaterByPromise should work 3');
        yield sleep(10);
        assert(ctx.getState().counter1.count === 6, 'upLaterByPromise should work 6');
        ctx.actions.counter1.upLaterWithBatchedCmd();
        assert(ctx.getState().counter1.count === 6, 'upLaterWithBatchedCmd should work 6');
        yield sleep(10);
        assert(ctx.getState().counter1.count === 7, 'upLaterWithBatchedCmd should work 7');
        ctx.actions.counter1.up12();
        assert(ctx.getState().counter1.count === 19, 'up12 should work 19');
    }));
    it('parent actions', () => {
        const initState = {
            counter1: Counter.init(),
            counter2: Counter.init(),
        };
        const counter1Actions = Object.assign({}, Counter.actions, { upN: (n) => withParents(Counter.actions.upN, (action, parentState, parentActions, _, __) => {
                const [state, cmd] = action(n + 1);
                assert.equal(state.count, parentState.counter1.count + n + 1, 'call child action work');
                return [state, Cmd.batch(cmd, Cmd.ofFn(() => parentActions.counter2.up()))];
            }) });
        const actions = {
            counter2: Counter.actions,
            counter1: counter1Actions,
        };
        let ctx = app({
            init: () => initState,
            actions,
            view: state => actions => actions,
            onRender: noop
        });
        ctx.actions.counter1.upN(1);
        assert.equal(ctx.getState().counter1.count, 3, 'counter1 upN work');
        assert.equal(ctx.getState().counter2.count, 2, 'counter2 upN work');
    });
});
//# sourceMappingURL=core.test.js.map