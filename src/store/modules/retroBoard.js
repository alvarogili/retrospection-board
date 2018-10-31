/* Data structure
  columns :[
    {
      id: `column${i}`,
      name: 'NAME',
      cards: [
        {
          id: `card${i}-${j}`,
          description: 'DESCRIPTION',
          votes: int
        }
      ]
    }
  ]
 */

import { ADD_COLUMN, DELETE_COLUMN, EDIT_COLUMN, ADD_CARD, EDIT_CARD, DELETE_CARD, APPLY_DRAG_BOARD, APPLY_DRAG_CARD, LOAD_BOARD } from '@/store/mutation-types'
import { applyDrag } from '@/utils/helpers'

const retroBoard = {
  state: {
    columns: []
  },

  mutations: {
    [LOAD_BOARD]: (state, newBoard) => {
      state.columns = newBoard.columns
    },
    [APPLY_DRAG_BOARD]: (state, dropResult) => {
      state.columns = applyDrag(state.columns, dropResult)
    },
    [APPLY_DRAG_CARD]: (state, dropCardResult) => {
      const columnId = dropCardResult.columnId
      const dropResult = dropCardResult.dropResult
      const column = state.columns.filter(p => p.id === columnId)[0]
      const columnIndex = state.columns.indexOf(column)
      var cards = []
      if (column.cards) {
        cards = column.cards
      }
      column.cards = applyDrag(cards, dropResult)
      state.columns.splice(columnIndex, 1, column)
    },
    [ADD_COLUMN]: (state, column) => {
      state.columns.push(column)
    },
    [DELETE_COLUMN]: (state, columnId) => {
      for (var i = 0; i < state.columns.length; i++) {
        if (state.columns[i].id === columnId) {
          state.columns.splice(i, 1)
          return
        }
      }
    },
    [EDIT_COLUMN]: (state, columnEdition) => {
      for (var i = 0; i < state.columns.length; i++) {
        if (state.columns[i].id === columnEdition.id) {
          state.columns[i].name = columnEdition.columnNewName
          return
        }
      }
    },
    [ADD_CARD]: (state, cardObject) => {
      /*
      cardObject = { columnId: 'ID' , card: Object}
      */
      for (var i = 0; i < state.columns.length; i++) {
        if (state.columns[i].id === cardObject.columnId) {
          if (state.columns[i].cards) {
            state.columns[i].cards.push(cardObject.card)
          } else {
            state.columns[i].cards = [cardObject.card]
          }
          return
        }
      }
    },
    [EDIT_CARD]: (state, cardObject) => {
      for (var i = 0; i < state.columns.length; i++) {
        if (state.columns[i].id === cardObject.columnId) {
          for (var j = 0; j < state.columns[i].cards.length; j++) {
            if (state.columns[i].cards[j].id === cardObject.id) {
              state.columns[i].cards[j] = cardObject.card
            }
            return
          }
        }
      }
    },
    [DELETE_CARD]: (state, cardObject) => {
      for (var i = 0; i < state.columns.length; i++) {
        if (state.columns[i].id === cardObject.columnId) {
          for (var j = 0; j < state.columns[i].cards.length; j++) {
            if (state.columns[i].cards[j].id === cardObject.id) {
              state.columns[i].cards.splice(j, 1)
            }
            return
          }
        }
      }
    }
  },

  actions: {
    loadBoard({ commit }, newBoard) {
      commit(LOAD_BOARD, newBoard)
    },
    applyDragBoard({ commit }, dropResult) {
      commit(APPLY_DRAG_BOARD, dropResult)
    },
    applyDragCard({ commit }, dropCardResult) {
      commit(APPLY_DRAG_CARD, dropCardResult)
    },
    addColmun({ commit }, column) {
      commit(ADD_COLUMN, column)
    },
    deleteColmun({ commit }, columnId) {
      commit(DELETE_COLUMN, columnId)
    },
    editColmun({ commit }, columnEdition) {
      commit(EDIT_COLUMN, columnEdition)
    },
    addCard({ commit }, cardObject) {
      commit(ADD_CARD, cardObject)
    },
    editCard({ commit }, cardObject) {
      commit(EDIT_CARD, cardObject)
    },
    deleteCard({ commit }, cardObject) {
      commit(DELETE_CARD, cardObject)
    }
  }
}

export default retroBoard
