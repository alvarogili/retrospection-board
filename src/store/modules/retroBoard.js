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

import { ADD_COLUMN, DELETE_COLUMN, EDIT_COLUMN, ADD_CARD, EDIT_CARD, DELETE_CARD, APPLY_DRAG_BOARD, APPLY_DRAG_CARD, LOAD_BOARD, CARD_ADD_VOTE, CARD_DELETE_VOTE } from '@/store/mutation-types'
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
    [CARD_ADD_VOTE]: (state, cardVote) => {
      if (state.columns[cardVote.columnIndex].cards[cardVote.cardIndex].votes) {
        state.columns[cardVote.columnIndex].cards[cardVote.cardIndex].votes.push(cardVote.user)
      } else {
        state.columns[cardVote.columnIndex].cards[cardVote.cardIndex].votes = [cardVote.user]
      }
    },
    [CARD_DELETE_VOTE]: (state, cardVote) => {
      for (var i = 0; i < state.columns[cardVote.columnIndex].cards[cardVote.cardIndex].votes.length; i++) {
        if (state.columns[cardVote.columnIndex].cards[cardVote.cardIndex].votes[i] === cardVote.user) {
          state.columns[cardVote.columnIndex].cards[cardVote.cardIndex].votes.splice(i, 1)
          return
        }
      }
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
      state.columns[cardObject.columnIndex].cards[cardObject.cardIndex].description = cardObject.cardNewDescription
    },

    [DELETE_CARD]: (state, cardObject) => {
      state.columns[cardObject.columnIndex].cards.splice(cardObject.cardIndex, 1)
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
    editCardAction({ commit }, cardObject) {
      commit(EDIT_CARD, cardObject)
    },
    deleteCardAction({ commit }, cardObject) {
      commit(DELETE_CARD, cardObject)
    },
    voteCard({ commit }, cardVoteObject) {
      commit(CARD_ADD_VOTE, cardVoteObject)
    },
    unvoteCard({ commit }, cardVoteObject) {
      commit(CARD_DELETE_VOTE, cardVoteObject)
    }
  }
}

export default retroBoard
