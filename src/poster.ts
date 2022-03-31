import { TestPostData } from "./testPosterData";

export class Poster extends Entity{

    public textEntity: Entity = new Entity()
    public textShape: TextShape = new TextShape()
    constructor(
        public title:string,
        public imageURL:string,
        public articleURL:string,
        position: Vector3,
    ){
        super()

        const planeshape = new PlaneShape()

        this.addComponent(planeshape)
/*
        this.addComponent(new Transform({
            position: new Vector3(5,1,5)
        }))
*/
        this.addComponent(new Transform({
            position: position
        }))

        engine.addEntity(this)

        this.textEntity.addComponent(this.textShape)

        this.textEntity.addComponent(new Transform({
            position: new Vector3(0,1,0),
            rotation: new Quaternion().setEuler(0,0,180)
        }))
        this.textEntity.setParent(this)
        this.textShape.value = title
        this.textShape.fontSize = 2
        this.textShape.billboard = true
        this.textShape.color = Color3.Random()


        log(articleURL)

        const material = new Material()
        material.albedoTexture = new Texture(imageURL) //this can be made dynamic
        this.addComponent(material)
        planeshape.withCollisions = false
        
        let uvs = [
            1,0,
            0,0,
            0,1,
            1,1
        ]

        planeshape.uvs = [...uvs, ...uvs]

        this.addComponent(new OnPointerDown(() => {
            this.onClick()
        }))

    }

    onClick(){
        log(this.title)
        openExternalURL(this.articleURL)
    }
}