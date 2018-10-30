
import { ADD_COLUMN, DELETE_COLUMN, EDIT_COLUMN, ADD_CARD, EDIT_CARD, DELETE_CARD } from '@/store/mutation-types'

export default function createFirebasePlugin(database) {
  return store => {
    store.subscribe(mutation => {
      switch (mutation.type) {
        case ADD_COLUMN:
          console.log('plugin: ADD_COLUMN')
          break
        case DELETE_COLUMN:
          console.log('plugin: DELETE_COLUMN')
          break
        case EDIT_COLUMN:
          console.log('plugin: EDIT_COLUMN')
          break
        case ADD_CARD:
          console.log('plugin: ADD_CARD')
          break
        case EDIT_CARD:
          console.log('plugin: EDIT_CARD')
          break
        case DELETE_CARD:
          console.log('plugin: DELETE_CARD')
          break

        default:
          console.log('plugin: default')
          break
      }
    })
  }
}
