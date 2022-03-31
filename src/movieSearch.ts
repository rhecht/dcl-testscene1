import {API_KEY} from "./apiKey"
import * as ui from '@dcl/ui-scene-utils' // thanks https://github.com/decentraland/decentraland-ui-utils
import { Poster } from "./poster"


const API_URL = "https://api.nytimes.com/svc/movies/v2/reviews/search.json"

const getURL = (movieName: string) => {
  log(`${API_URL}?query=${movieName}&api-key=${API_KEY}`)
  return `${API_URL}?query=${movieName}&api-key=${API_KEY}`
}

const getData = async(inputValue: string) => {
  try{
    let url = getURL(inputValue)
    log(url)
    let response = await fetch(url)
    let json = await response.json()
    return json.results
  } catch{
    log("failed to reach the URL")
  }
}

export class MovieSearch extends Entity {
  constructor(){
    super()
    log('I created a movieSearch cube')

    this.addComponent(new BoxShape())
    this.addComponent(new Transform({
      position: new Vector3(4,1,8)
    }))
    engine.addEntity(this)

    this.addComponent(new OnPointerDown(() => {
      this.showPrompt()
    }))
  }
  showPrompt(){
    let prompt = new ui.FillInPrompt(
      'What movie?',
      (inputValue: string) => {
        log('User has chosen:', inputValue)
        executeTask(async() =>{
          let data = await getData(inputValue)

          
          log(data)
          data.forEach( (item:any, index: number) => {
            const{display_title, link, multimedia = ''} = item
            let poster = new Poster(
              display_title, 
              multimedia.src, 
              link.url,
              new Vector3(8 + (index * 1.5), 1,8)
              )
          })
        })   
      },
      'Search',
      '',
      true
    )      
  }
  onSubmit(inputValue: string){
    log('User has chosen:', inputValue)
  }
}

