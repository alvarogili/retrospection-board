<template>
  <div >
    <div class="btn-group">
      <AddColumnBoard/>
      <div class="location-add-table-button">
        <el-button type="primary" onclick="TogetherJS(this); return false;"><b>Start TogetherJS</b></el-button>
      </div>
    </div>
    <div class="card-board">
      <Container
        :orientation="orientation"
        drag-handle-selector=".column-drag-handle"
        @drop="onColumnDrop($event)"
        @drag-start="dragStart"
      >
        <Draggable v-for="column in board.columns" :key="column.id">
          <div class="card-container">
            <div class="card-column-header">
              <el-row type="flex" >
                <el-col :span="2"><span class="column-drag-handle">&#x2630;</span></el-col>
                <el-col >{{ column.name }}</el-col>
                <el-col :span="6" justify="end">
                  <el-button type="info" icon="el-icon-edit" circle @click="editColumn(column.id, column.name)"/>
                </el-col>
                <el-col :span="4" justify="end">
                  <el-button type="danger" icon="el-icon-delete" circle @click="deleteColumn(column.id, column.name)"/>
                </el-col>
              </el-row>
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
                <div class="card exactFit" @mouseover="isActive = !isActive">
                  <p style="white-space: pre-line">{{ card.description }}</p>
                  <div class="bottom clearfix">
                    <el-row type="flex" >
                      <div class= "buttons-no-white-space">
                        <el-col >
                          <el-button type="info" icon="el-icon-edit" circle plain @click="editCard(column.id, card.id, card.description)"/>
                          <el-button class="margin-letf-auto" type="danger" icon="el-icon-delete" circle plain @click="deleteCard(column.id, card.id)"/>
                        </el-col>
                      </div>
                      <el-col justify="center" />
                      <el-col justify="end">
                        <CardVotes :column-id="column.id" :card-id="card.id" />
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </Draggable>
              <AddCardBoard :column-id="column.id"/>
            </Container>
          </div>
        </Draggable>
      </Container>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Container, Draggable } from 'vue-smooth-dnd'
import AddColumnBoard from '@/components/AddColumnBoard'
import AddCardBoard from '@/components/AddCardBoard'
import CardVotes from '@/components/CardVotes'
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
  components: { Container, Draggable, AddColumnBoard, AddCardBoard, CardVotes },

  data() {
    return {
      watchRef: null,
      isActive: false
    }
  },

  computed: {
    ...mapState({
      board: state => state.retroBoard
    }),
    ...mapGetters([
      'sidebar',
      'name',
      'avatar',
      'device'
    ]),
    orientation() {
      if (this.device !== 'mobile') {
        return 'horizontal'
      }
      return ''
    }
  },

  mounted() {
    console.log('mounting')
    this.watchTeam()
  },

  methods: {
    ...mapActions(['applyDragBoard', 'applyDragCard', 'loadBoard', 'deleteColmun', 'editColmun', 'editCardAction', 'deleteCardAction']),

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
    },

    editColumn(columnId, columnName) {
      this.$prompt(this.$t('retroBoard.columnTitle'), this.$t('retroBoard.editColumn'), {
        confirmButtonText: this.$t('retroBoard.update'),
        cancelButtonText: this.$t('retroBoard.cancel'),
        inputValue: columnName
      }).then(({ value }) => {
        this.$message({
          type: 'success',
          message: this.$t('retroBoard.editionColumnOK', { oldName: columnName, newName: value })
        })
        this.editColmun({ id: columnId, columnNewName: value })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('retroBoard.editionColumnCanceled')
        })
      })
    },
    deleteColumn(id, columnName) {
      this.$confirm(this.$t('retroBoard.confirmColumnDelete'), 'Warning', {
        confirmButtonText: this.$t('retroBoard.confirm'),
        cancelButtonText: this.$t('retroBoard.cancel'),
        type: 'warning'
      }).then(() => {
        this.deleteColmun(id)
        this.$message({
          type: 'success',
          message: this.$t('retroBoard.deleteColumnOK', { name: columnName })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('retroBoard.deleteColumnCanceled')
        })
      })
    },

    votes(columnId, cardId) {
      console.log(columnId, cardId)
    },

    editCard(columnId, cardId, cardDescription) {
      const column = this.$store.state.retroBoard.columns.find(c => c.id === columnId)
      const columnIndex = this.$store.state.retroBoard.columns.indexOf(column)
      const card = column.cards.find(c => c.id === cardId)
      const cardIndex = column.cards.indexOf(card)

      this.$prompt(this.$t('retroBoard.cardTitle'), this.$t('retroBoard.editCard'), {
        confirmButtonText: this.$t('retroBoard.update'),
        cancelButtonText: this.$t('retroBoard.cancel'),
        inputValue: cardDescription
      }).then(({ value }) => {
        this.$message({
          type: 'success',
          message: this.$t('retroBoard.editionCardOK', { oldName: cardDescription, newName: value })
        })
        const cardObject = {
          columnIndex: columnIndex,
          cardIndex: cardIndex,
          cardNewDescription: value
        }
        this.editCardAction(cardObject)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('retroBoard.editionCardCanceled')
        })
      })
    },
    deleteCard(columnId, cardId) {
      const column = this.$store.state.retroBoard.columns.find(c => c.id === columnId)
      const columnIndex = this.$store.state.retroBoard.columns.indexOf(column)
      const card = column.cards.find(c => c.id === cardId)
      const cardIndex = column.cards.indexOf(card)

      this.$confirm(this.$t('retroBoard.confirmCardDelete'), 'Warning', {
        confirmButtonText: this.$t('retroBoard.confirm'),
        cancelButtonText: this.$t('retroBoard.cancel'),
        type: 'warning'
      }).then(() => {
        const cardObject = {
          columnIndex: columnIndex,
          cardIndex: cardIndex
        }
        this.deleteCardAction(cardObject)
        this.$message({
          type: 'success',
          message: this.$t('retroBoard.deleteCardOK')
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('retroBoard.deleteCardCanceled')
        })
      })
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

.buttons-no-white-space {
  white-space: nowrap;
}

.margin-letf-auto {
  margin-left: auto;
}

.location-add-table-button {
  margin-left: 20px;
  margin-top: 13px;
}

div.exactFit {
    word-wrap: break-word;
}
</style>
