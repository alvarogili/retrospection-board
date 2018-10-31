<template>
  <div >
    <AddColumnBoard/>
    <div class="card-board">
      <Container
        orientation="horizontal"
        drag-handle-selector=".column-drag-handle"
        @drop="onColumnDrop($event)"
        @drag-start="dragStart"
      >
        <Draggable v-for="column in board.columns" :key="column.id">
          <div class="card-container">
            <div class="card-column-header">
              <span class="column-drag-handle">&#x2630;</span>
              {{ column.name }}
            </div>
            <Container
              :get-child-payload="getCardPayload(column.id)"
              group-name="col"
              drag-class="card-ghost"
              drop-class="card-ghost-drop"
              @drop="(e) => onCardDrop(column.id, e)"
              @drag-start="(e) => log('drag start', e)"
              @drag-end="(e) => log('drag end', e)"
            >
              <Draggable v-for="card in column.cards" :key="card.id">
                <div class="card">
                  <p>{{ card.description }}</p>
                </div>
              </Draggable>
              <AddCardBoard :column-id="column.id"/>
            </Container>
            <AddCardBoard :scene="column.id"/>
          </div>
        </Draggable>
      </Container>
    </div>
  </div>
</template>

<script>
import { Container, Draggable } from 'vue-smooth-dnd'
import AddColumnBoard from '@/components/AddColumnBoard'
import AddCardBoard from '@/components/AddCardBoard'
import { mapState, mapActions } from 'vuex'
import database from '@/api/database'
import { firebaseBoardPath } from '@/config'

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

export default {
  name: 'Cards',

  components: { Container, Draggable, AddColumnBoard },

  data() {
    return {
      watchRef: null
    }
  },

  computed: {
    ...mapState({
      board: state => state.retroBoard
    })
  },

  mounted() {
    console.log('mounting')
    this.watchTeam()
  },

  methods: {
    ...mapActions(['applyDragBoard', 'applyDragCard', 'loadBoard']),

    watchTeam() {
      this.watchRef = database.watch(firebaseBoardPath, (snapshot) => {
        const board = snapshot.val()
        console.log(board)
        this.loadBoard(board)
      })
    },

    onColumnDrop(dropResult) {
      this.applyDragBoard(dropResult)
    },

    onCardDrop(columnId, dropResult) {
      if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
        const dropCardResult = { columnId, dropResult }
        this.applyDragCard(dropCardResult)
      }
    },

    getCardPayload(columnId) {
      return index => {
        return this.$store.state.retroBoard.columns.filter(p => p.id === columnId)[0].cards[index]
      }
    },

    dragStart() {
      console.log('drag started')
    },

    log(...params) {
      console.log(...params)
    }
  }
}
</script>

<style scoped=css>

.draggable-item {
  height: 50px;
  line-height: 50px;
  text-align: center;
  width: 100%;
  display: block;
  background-color: #fff;
  outline: 0;
  border: 1px solid rgba(0, 0, 0, .125);
  margin-bottom: 2px;
  margin-top: 2px;
  cursor: default;
  user-select: none;
}

.draggable-item-horizontal {
  height: 300px;
  padding: 10px;
  line-height: 100px;
  text-align: center;
  /* width : 200px; */
  display: block;
  background-color: #fff;
  outline: 0;
  border: 1px solid rgba(0, 0, 0, .125);
  margin-right: 4px;
  cursor: default;
}

.dragging {
  background-color: yellow;
}

.card-board {
  padding: 50px;
  background-color: #fff;
  overflow: auto;
}

.card-container {
  width: 300px;
  padding: 10px;
  margin: 3px;
  margin-right: 15px;
  margin-bottom: 20px;
  background-color: rgba(209, 207, 207, 0.719);
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.12), 0 5px 5px rgba(0, 0, 0, 0.24);
  min-width: 100px;
  border-radius: 10px;
}

.card {
  margin: 5px;
  /* border: 1px solid #ccc; */
  background-color: white;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.12), 0 1px 1px rgba(0, 0, 0, 0.24);
  padding: 10px;
  min-width: 100px;
  border-radius: 10px;
}

.card-column-header {
  font-size: 18px;
}

.column-drag-handle {
  cursor: move;
  padding: 5px;
}

.card-ghost {
  transition: transform 0.18s ease;
  transform: rotateZ(5deg)
}

.card-ghost-drop {
  transition: transform 0.18s ease-in-out;
  transform: rotateZ(0deg)
}

.opacity-ghost {
  transition: all .18s ease;
  opacity: 0.8;
  /* transform: rotateZ(5deg); */
  background-color: cornflowerblue;
  box-shadow: 3px 3px 10px 3px rgba(0, 0, 0, 0.3);
}

.opacity-ghost-drop {
  opacity: 1;
  /* transform: rotateZ(0deg); */
  background-color: white;
  box-shadow: 3px 3px 10px 3px rgba(0, 0, 0, 0.0);
}

.form-demo {
  width: 650px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 50px;
  display: flex
}

.form {
  flex: 3;
  /* width: 500px; */
  /* background-color: #f3f3f3; */
  border: 1px solid rgba(0, 0, 0, .125);
  border-radius: 6px;
  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.08), 0px 3px 3px rgba(0, 0, 0, 0.08);
}

.form-fields-panel {
  flex: 1;
  margin-right: 50px;
}

.form-ghost {
  transition: 0.18s ease;
  box-shadow: 1px 1px 5px 2px rgba(0, 0, 0, 0.08);
}

.form-ghost-drop {
  box-shadow: 0 0 2px 5px rgba(0, 0, 0, 0.0);
}

.smooth-dnd-container.horizontal {
  white-space: normal;
}

</style>
