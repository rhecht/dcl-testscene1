import { movePlayerTo } from '@decentraland/RestrictedActions'


const floorTeleportLocations = [
  [
    { x: 13.07, y: 1.11, z: 13.58 }, 
    { x: 9.02, y: 1.11, z: 6.76 }
  ], //First floor - 0
  [
    { x: 13.57, y: 5.5, z: 2.39 }, 
    { x: 9.02, y: 1.11, z: 6.76 }
  ], //Second floor - 1
  [
    { x: 13.57, y: 10.8, z: 2.39 }, 
    { x: 9.02, y: 1.11, z: 6.76 }
  ], //Third floor - 2
  [
    { x: 13.57, y: 15.8, z: 2.39 }, 
    { x: 9.02, y: 1.11, z: 6.76 }
  ], //Fourth floor - 3
  [
    { x: 13.57, y: 19.8, z: 2.39 }, 
    { x: 9.02, y: 1.11, z: 6.76 }
  ], //Fifth floor - 4

]

//floorEntities = []

let currentFloor = 0

export class FloorButtons extends Entity{

  public button1: Entity = new Entity()
  public button2: Entity = new Entity()
  public button3: Entity = new Entity()
  public button4: Entity = new Entity()
  public button5: Entity = new Entity()

  constructor(
    position: Vector3

  ){
    super()
//    this.addComponent(new BoxShape())
    this.addComponent(new Transform({
      position,
      scale: new Vector3(.1,2,1)
    }))
    engine.addEntity(this)

this.buttonFunc(this.button1, [-.25,-.325,0], [.2,.1,.2], "Floor 1", 1 )
this.buttonFunc(this.button2, [-.25,-.175,0], [.2,.1,.2], "Floor 2", 2 )
this.buttonFunc(this.button3, [-.25,-.025,0], [.2,.1,.2], "Floor 3", 3 )
this.buttonFunc(this.button4, [-.25,.125,0], [.2,.1,.2], "Floor 4", 4 )
this.buttonFunc(this.button5, [-.25,.275,0], [.2,.1,.2], "Floor 5", 5 )

  }

  buttonFunc(buttonName: Entity, posDimensions: float[], scaleDimensions: float[], hoverTextString:string, floorNumber:number){
    var buttonMaterial = new Material()

    switch (floorNumber){
      case 1:{
        buttonMaterial.albedoColor = Color3.Red()
        break;
      }
      case 2:{
        buttonMaterial.albedoColor = Color3.White()
        break;
      }
      case 3:{
        buttonMaterial.albedoColor = Color3.Blue()
        break;
      }
      case 4:{
        buttonMaterial.albedoColor = Color3.Green()
        break;
      }
      case 5:{
        buttonMaterial.albedoColor = Color3.Magenta()
        break;
      }
      default:{
        buttonMaterial.albedoColor = Color3.White()
        break;
      }
    }


    buttonName.addComponent(new BoxShape())
    buttonName.addComponent(new Transform({
      position:new Vector3(posDimensions[0],posDimensions[1],posDimensions[2]),
      scale:new Vector3(scaleDimensions[0],scaleDimensions[1],scaleDimensions[2])
    }))
    buttonName.addComponent(buttonMaterial)
    buttonName.setParent(this)


    buttonName.addComponent(
      new OnPointerDown((e) => {
        this.goToFloor(floorNumber)
      },{
        hoverText: hoverTextString
      })
    )
  }


  goToFloor(floorNumber: number){
    const [location, lookAt] = floorTeleportLocations[floorNumber-1]
    movePlayerTo(location, lookAt)
    log(currentFloor)

  }

}
