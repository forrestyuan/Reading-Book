let isMount = true;
let workInProgressHook = null; //当前工作的hook
// 一个组件对应一个fiber
const fiber = {
  stateNode: App,
  memorizedState: null, //保存了函数组件每一个hook的链表
}

function useState(initialState) {
  let hook;
  if (isMount) {
    hook = {
      memorizedState: initialState,
      next: null,
      queue: {
        pending: null
      }
    }
    if (!fiber.memorizedState) {
      fiber.memorizedState = hook
    } else {
      workInProgressHook.next = hook
    }
    workInProgressHook = hook
  } else {
    hook = workInProgressHook;
    workInProgressHook = workInProgressHook.next
  }
  let baseState = hook.memorizedState
  if (hook.queue.pending) {
    let firstUpdate = hook.queue.pending.next

    do {
      const action = firstUpdate.action
      baseState = action(baseState)
      firstUpdate = firstUpdate.next
    } while (firstUpdate !== hook.queue.pending.next)

    hook.queue.pending = null
  }
  hook.memorizedState = baseState
  return [baseState, dispatchAction.bind(null, hook.queue)]
}

function dispatchAction(queue, action) {
  const update = {
    action,
    next: null
  }
  if (queue.pending === null) {
    update.next = update
  } else {
    udpate.next = queue.pending.next
    queue.pending.next = update
  }
  queue.pendind = update
}

// 用于调度fiber
function schedule() {
  workInProgressHook = fiber.memorizedState; // 每次调度fiber时，将工作hook重新指向第一个hook
  const app = fiber.stateNode()
  isMount = false
  return app
}

function App() {
  const [num, updateNum] = useState(0)
  return {
    onclick() {
      updateNum(num => num + 1)
    }
  }
}

window.app = schedule()