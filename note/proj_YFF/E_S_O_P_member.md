1. 项目中使用了mobx作为react的数据管理，虽然mobx管理的数据的变化可以使组件更新，但是，当useEffect、useCallback等hooks使用mobx管理的数据的时候，是不会使页面更新的。解决方法，可以使用context将mobx管理的数据封装一遍。
```js
import React from 'react'

export function createStore<T>(
  ClassFactory: new () => T,
): [() => T, T, React.Context<T>] {
  const store = new ClassFactory()
  const context = React.createContext(store)
  const useStore = () => React.useContext(context)
  return [useStore, store, context]
}

```
