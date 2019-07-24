import { allCombinations } from '../../../modules/simulation/helpers/allCombinations'
import { rotateAroundVector } from '../../../modules/vector2/helpers/rotate'

export class Transform {
    public constructor(
        public position: vector2 = [0, 0],
        public scale: vector2 = [1, 1],
        public rotation = 0
    ) {}

    public getBoundingBox() {
        const result = [...this.position, ...this.scale] as vector4

        return result
    }

    public getPoints() {
        const combinations = Array.from(allCombinations([0, 1], [0, 1]))

        // those are not in the right order
        const points = combinations.map(combination => [
            this.x + this.height * combination[0],
            this.y + this.width * combination[1]
        ])

        return points as vector2[]
    }

    public getEdges() {
        const points = this.getPoints()
        const edges = []

        for (let index = 0; index < points.length; index++) {
            edges.push([points[index], points[(index + 1) % points.length]])
        }

        return edges as [vector2, vector2][]
    }

    /** Short forms for random stuff */

    get x() {
        return this.position[0]
    }

    get y() {
        return this.position[1]
    }

    get width() {
        return this.scale[0]
    }

    get height() {
        return this.scale[1]
    }

    get minX() {
        return Math.min(this.x, this.x + this.width)
    }

    get maxX() {
        return Math.max(this.x, this.x + this.width)
    }

    get minY() {
        return Math.min(this.y, this.y + this.height)
    }

    get maxY() {
        return Math.max(this.y, this.y + this.height)
    }

    get center() {
        return [this.x + this.width / 2, this.y + this.height / 2] as vector2
    }

    set x(value: number) {
        this.position = [value, this.y]
    }

    set y(value: number) {
        this.position = [this.x, value]
    }

    set width(value: number) {
        this.scale = [value, this.height]
    }

    set height(value: number) {
        this.scale = [this.width, value]
    }
}

export type vector2 = [number, number]
export type vector3 = [number, number, number]
export type vector4 = [number, number, number, number]
export type vector8 = [
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number
]
