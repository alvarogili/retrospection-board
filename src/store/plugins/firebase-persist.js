import database from '@/api/database'
import { firebaseBoardPath } from '@/config'

import { ADD_COLUMN, DELETE_COLUMN, EDIT_COLUMN, ADD_CARD, EDIT_CARD, DELETE_CARD, APPLY_DRAG_BOARD, APPLY_DRAG_CARD } from '@/store/mutation-types'
const syncMutationsTypes = [ADD_COLUMN, DELETE_COLUMN, EDIT_COLUMN, ADD_CARD, EDIT_CARD, DELETE_CARD, APPLY_DRAG_BOARD, APPLY_DRAG_CARD]

export default function createFirebasePlugin() {
  return store => {
    store.subscribe((mutation, state) => {
      if (syncMutationsTypes.indexOf(mutation.type) > -1) {
        console.log('storing db...')
        database.save(firebaseBoardPath, state.retroBoard)
      }
    })
  }
}
