import {MovieSearch} from "./movieSearch"
import {FloorButtons } from "./floorbuttons"
import { Poster } from "./poster"
import { TestPostData } from "./testPosterData"

const movieReview = new MovieSearch()

class Base extends Entity{
  constructor(){
    super()
    this.addComponent(new GLTFShape('models/base.glb'))
    this.addComponent(new Transform({
      position: new Vector3(16, 0, 16),
      rotation: new Quaternion().setEuler(0,0,0)
    }))
    engine.addEntity(this)
  }
}

const base = new Base()
const floorButton1 = new FloorButtons(
  new Vector3(2.5,1,3)
  )
const floorButton2 = new FloorButtons(
  new Vector3(3,5.5,3)
  )
const floorButton3 = new FloorButtons(
  new Vector3(3,9.1,3)
  )