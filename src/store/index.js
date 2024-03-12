import { reactive } from 'vue'
import ModalQueueController from '@/controllers/ModalQueueController'
import SideMenuController from '@/controllers/SideMenuController'

const store = reactive({})

export default store

export function initStore () {
  store.modalQueue = ModalQueueController()
  store.sideMenu = SideMenuController()
}
