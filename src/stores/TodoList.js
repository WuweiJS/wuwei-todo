import Wuwei from 'wuwei'

var { StoreSet } = Wuwei('todoApp');

export default class TodoList extends StoreSet {
  constructor() {
    super(...arguments);

    // Total size
    this.setReduceMethod(() => {
      this.setValue({itemSize: this.size()});
    });

    // Active & Completed size
    this.setReduceMethod(() => {
      let completedSize = 0, activeSize = 0;

      this.toArray().forEach((item) => {
        if (item.getValue().completed) {
          completedSize++;
        } else {
          activeSize++;
        }
      })

      this.setValue({
        completedSize: completedSize,
        activeSize: activeSize
      });
    });
  }

  clearCompleted() {
    this.toArray().forEach((item) => {
      if (item.getValue().completed) {
        this.delete(item);
      }
    })
  }
}
