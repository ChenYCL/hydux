import { CmdType } from './cmd';
export declare type ActionState<State> = Partial<State> | null | void;
export declare type ActionCmdResult<State, Actions> = [State, CmdType<Actions>];
export declare type NormalAction<D, S, A> = (...args: any[]) => ActionCmdResult<S, A>;
export declare type ActionResult<State, Actions> = ActionState<State> | Promise<any> | ActionCmdResult<State, Actions>;
export declare type ActionType<Data, State, Actions> = (data: Data, ...args: any[]) => ActionResult<State, Actions> | ((state: State, actions: Actions) => ActionResult<State, Actions>);
export declare type ActionType2<D1, D2, State, Actions> = (data1: D1, data2: D2, ...args: any[]) => ActionResult<State, Actions> | ((state: State, actions: Actions) => ActionResult<State, Actions>);
export declare type UnknownArgsActionType<State, Actions> = (...args: any[]) => ActionResult<State, Actions> | ((state: State, actions: Actions) => ActionResult<State, Actions>);
/** The interface for actions (exposed when implementing actions).
 *
 * @memberOf [App]
 */
export declare type ActionsType<State, Actions> = {
    [P in keyof Actions]: ActionType<any, State, Actions> | ActionsType<any, Actions[P]>;
};
export declare type AR<S, A> = ActionResult<S, A>;
export declare type ACR<S, A> = ActionCmdResult<S, A>;
