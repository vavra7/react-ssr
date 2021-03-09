import { useCallback, useReducer } from 'react';

type State = Record<string, boolean>;
type Action = {
  type: 'startLoading' | 'finishLoading';
  routeName: string;
};
type StartLoading = (name: string) => void;
type FinishLoading = (name: string) => void;
type IsLoading = (name: string) => boolean;
type ComponentIsLoadingHook = () => {
  startLoading: StartLoading;
  finishLoading: FinishLoading;
  isLoading: IsLoading;
};

function loadingReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'startLoading': {
      return { ...state, [action.routeName]: true };
    }
    case 'finishLoading': {
      return { ...state, [action.routeName]: false };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

export const useIsComponentLoading: ComponentIsLoadingHook = () => {
  const [state, dispatch] = useReducer(loadingReducer, {});

  const startLoading = useCallback<StartLoading>(name => {
    dispatch({
      type: 'startLoading',
      routeName: name
    });
  }, []);

  const finishLoading = useCallback<FinishLoading>(name => {
    dispatch({
      type: 'finishLoading',
      routeName: name
    });
  }, []);

  const isLoading = useCallback<IsLoading>(name => !!state[name], [state]);

  return {
    startLoading,
    finishLoading,
    isLoading
  };
};
