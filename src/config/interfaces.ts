interface Base {
  _id: string,
  title: string,
  createdAt: Date,
  updatedAt: Date | null,
  _destroy: boolean
}

export interface Card extends Base {
  boardId: string,
  columnId: string,
  cover: string | null
}

export interface Column extends Base {
  boardId: string,
  cardOrder: string[]
  cards?: Card[]
}

export interface Board extends Base {
  columnOrder: string[],
  columns: Column[],
  cards?: Card[]
}
