import { ActionResult, ActionState, ActionCmdResult, ActionType, ActionsType } from './types';
import Cmd, { CmdType, Sub } from './cmd';
import { noop } from './utils';
export { CmdType, Sub, ActionResult, ActionState, ActionCmdResult, ActionType, ActionsType };
export declare type Init<S, A> = () => S | [S, CmdType<A>];
export declare type View<S, A> = (state: S, actions: A) => any;
export declare type Subscribe<S, A> = (state: S) => CmdType<A>;
export declare type OnUpdate<S, A> = <M>(data: {
    prevAppState: S;
    nextAppState: S;
    msgData: M;
    action: string;
}) => void;
export { Cmd, noop };
export interface AppProps<State, Actions> {
    init: Init<State, Actions>;
    view: View<State, Actions>;
    actions: ActionsType<State, Actions>;
    subscribe?: Subscribe<State, Actions>;
    onRender?: (view: any) => void;
    onError?: (err: Error) => void;
    onUpdate?: OnUpdate<State, Actions>;
}
/**
 * run action and return a normalized result ([State, CmdType<>]),
 * this is useful to write High-Order-Action, which take an action and return a wrapped action.
 * @param action
 * @param msg
 * @param state
 * @param actions
 */
export declare function runAction<A, State, Actions>(action: (msg: A) => any, msg: A, state: State, actions: Actions): ActionCmdResult<State, Actions>;
export declare type App<State, Actions> = (props: AppProps<State, Actions>) => any;
export default function app<State, Actions>(props: AppProps<State, Actions>): {
    actions: Actions;
    getState(): State;
    render: (state?: State) => void;
    init: Init<State, Actions>;
    view: View<State, Actions>;
    subscribe?: Subscribe<State, Actions> | undefined;
    onRender?: ((view: any) => void) | undefined;
    onError?: ((err: Error) => void) | undefined;
    onUpdate?: OnUpdate<State, Actions> | undefined;
};
