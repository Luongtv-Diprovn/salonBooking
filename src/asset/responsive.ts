import { Dimensions } from "react-native"

const { width: DEVICE_SCREEN_WIDTH, height: DEVICE_SCREEN_HEIGHT } = Dimensions.get("screen")

const DESIGN_SCREEN_WIDTH = 375
const DESIGN_SCREEN_HEIGHT = 812

const widthPercent = DEVICE_SCREEN_WIDTH / DESIGN_SCREEN_WIDTH
const heightPercent = DEVICE_SCREEN_HEIGHT / DESIGN_SCREEN_HEIGHT

function width(designWidth: number) {
    const result = designWidth * widthPercent
    return Number(result.toFixed(1))
}

function height(designHeight: number) {
    const result = designHeight * heightPercent
    return Number(result.toFixed(1))
}

export const responsive = {
    width,
    height,
    WIDTH: DEVICE_SCREEN_WIDTH,
    HEIGHT: DEVICE_SCREEN_HEIGHT,
}