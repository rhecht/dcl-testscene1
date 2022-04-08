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
  ] //Third floor - 2

]

//floorEntities = []

let currentFloor = 0

export class FloorButtons extends Entity{

  public upButton: Entity = new Entity()
  public downButton: Entity = new Entity()

  public upButton2: Entity = new Entity()
  public downButton2: Entity = new Entity()


  constructor(
    position: Vector3

  ){
    super()
    this.addComponent(new BoxShape())
    this.addComponent(new Transform({
      position,
      scale: new Vector3(.1,2,1)
    }))
    engine.addEntity(this)

    this.upButtonFunc(this.upButton, [.8,.2,0], [.2,.1,.2], "Going up?" )
    this.downButtonFunc(this.downButton, [.8,0,0], [.2,.1,.2], "Down down down!" )

    /*
//    const upButtonMaterial = new Material()
//    upButtonMaterial.albedoColor = Color3.Magenta()

    this.upButton.addComponent(new BoxShape())
    this.upButton.addComponent(new Transform({
      position:new Vector3(.5,.2,0),
      scale:new Vector3(.2,.1,.2)
    }))
    this.upButton.addComponent(upButtonMaterial)
    this.upButton.setParent(this)
    this.upButton.addComponent(
      new OnPointerDown((e) => {
        this.goUp()
      },{
        hoverText: "Going up?!"
      })
    )
*/

/*

//const downButtonMaterial = new Material()
//downButtonMaterial.albedoColor = Color3.Teal()

    this.downButton.addComponent(new BoxShape())
    this.downButton.addComponent(new Transform({
      position:new Vector3(.5,0,0),
      scale:new Vector3(.2,.1,.2)
    }))
    this.downButton.addComponent(downButtonMaterial)
    this.downButton.setParent(this)
    this.downButton.addComponent(
      new OnPointerDown((e) => {
        this.goDown()
      },{
        hoverText: "Down down down!"
      })
    )
*/

  }

  upButtonFunc(buttonName: Entity, posDimensions: float[], scaleDimensions: float[], hoverTextString:string){
    var buttonMaterial = new Material()
    buttonMaterial.albedoColor = Color3.Magenta()

    buttonName.addComponent(new BoxShape())
    buttonName.addComponent(new Transform({
      position:new Vector3(posDimensions[0],posDimensions[1],posDimensions[2]),
      scale:new Vector3(scaleDimensions[0],scaleDimensions[1],scaleDimensions[2])
    }))
    buttonName.addComponent(buttonMaterial)
    buttonName.setParent(this)


    this.upButton.addComponent(
      new OnPointerDown((e) => {
        this.goUp()
      },{
        hoverText: hoverTextString
      })
    )
  }

  downButtonFunc(buttonNameD: Entity, posDimensionsD: float[], scaleDimensionsD: float[], hoverTextStringD:string){
    var buttonMaterialD = new Material()
    buttonMaterialD.albedoColor = Color3.Teal()

    buttonNameD.addComponent(new BoxShape())
    buttonNameD.addComponent(new Transform({
      position:new Vector3(posDimensionsD[0],posDimensionsD[1],posDimensionsD[2]),
      scale:new Vector3(scaleDimensionsD[0],scaleDimensionsD[1],scaleDimensionsD[2])
    }))
    buttonNameD.addComponent(buttonMaterialD)
    buttonNameD.setParent(this)


    buttonNameD.addComponent(
        new OnPointerDown((e) => {
          this.goDown()
        },{
          hoverText: hoverTextStringD
        })
      )
  }


  goUp(){
    currentFloor++
    if(currentFloor >= floorTeleportLocations.length){
      currentFloor=0
    }
    const [location, lookAt] = floorTeleportLocations[currentFloor]
    movePlayerTo(location, lookAt)

    log(currentFloor)
  }

  goDown(){
    currentFloor--
    if(currentFloor < 0){
      currentFloor=floorTeleportLocations.length-1
    }
    const [location, lookAt] = floorTeleportLocations[currentFloor]
    movePlayerTo(location, lookAt)
  log(currentFloor)
  }
}
