import { go, map, reduce } from './utils';

export const useReducer = (reducer, initState) => {
  const store = {
    state: {
      ...initState,
    },
    subscriber: {
      ...reduce(
        (subscriber, key) => {
          return { ...subscriber, [key]: [] };
        },
        {},
        Object.keys(initState),
      ),
    },
  };

  const dispatch = (action) => {
    const { state } = store;
    const changedStateList = action.notify;

    store.state = { ...state, ...reducer(state, action) };
    if (!changedStateList) return;
    notify(changedStateList);
  };

  const setObserver = (stateName: string, ...callback) => {
    const { subscriber } = store;
    store.subscriber[stateName] = [...subscriber[stateName], ...callback];
  };

  const notifyStateChange = (stateName) => {
    const { state, subscriber } = store;
    map((callback) => callback(state[stateName]), subscriber[stateName]);
  };

  const notify = (stateList) => {
    go(
      stateList,
      map((stateName) => notifyStateChange(stateName)),
    );
  };

  // dispatch : 상태 변화를 일으키는 함수
  // notify : 상태 변화가 완료됬음을 구독자 (observer)에 알리는 함수
  return { store, dispatch, setObserver };
};
