import { connectViaExtension, extractState } from 'remotedev'
import Cmd from '../cmd'
import { merge, setDeep } from '../utils'
import { AppProps, App } from './../index'

export default function withDevtools<State, Actions>(options): (app: App<State, Actions>) => App<State, Actions> {
  options = {
    remote: false,
    hostname: 'remotedev.io',
    port: 443,
    secure: true,
    getActionType: f => f,
    debounce: 10,
    ...options
  }
  const connection = connectViaExtension(options)
  let timer
  return (app: App<State, Actions>) => (props: AppProps<State, Actions>) => {
    const ctx = app({
      ...props,
      init: () => {
        const result = props.init()
        const state = (result instanceof Array) ? result[0] : result
        connection.init(state)
        return result
      },
      onUpdate: (prevAppState, nextAppState, msg, actionName, path) => {
        props.onUpdate && props.onUpdate(prevAppState, nextAppState, msg, actionName, path)
        const send = () => connection.send({
          type: 'update',
          msg: { data: msg, type: path.concat(actionName).join('.') },
        }, nextAppState)
        timer && clearTimeout(timer)
        timer = setTimeout(send, options.debounce)
      },
      subscribe: (model) => {
        function sub(actions) {
          connection.subscribe(function(msg) {
            console.log('msg', msg)
            if (msg.type === 'DISPATCH') {
              switch (msg.payload.type) {
                case 'JUMP_TO_ACTION':
                case 'JUMP_TO_STATE':
                  ctx.render(extractState(msg))
                  break
                case 'IMPORT_STATE':
                  const states = msg.payload.nextLiftedState.computedStates
                  const state = states[states.length - 1]
                  console.log('state', state, msg)
                  ctx.render(state.state)
                  connection.send(null, msg.payload.nextLiftedState)
              }
            }
          })
        }
        return props.subscribe
          ? Cmd.batch([sub], props.subscribe(model))
          : [sub]
      },
      onError: err => {
        props.onError && props.onError(err)
        connection.error(err.message)
      }
    })
    return ctx
  }
}
