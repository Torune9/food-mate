import { library } from "@fortawesome/fontawesome-svg-core";
import {solid} from '../assets/icons/solid'
import { regular } from '../assets/icons/regular'

export default {
    install(){
        library.add(
            solid.faMagnifyingGlass,
            solid.faStar,
            solid.faSpinner,
            regular.faStar
        )
    }
}