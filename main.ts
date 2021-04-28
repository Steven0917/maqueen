function corner(direction: string, speed: number) {
    
    delta2 = speed / 3
    turning_time2 = 200
    if (direction == "left") {
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, speed - delta2)
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, speed + delta2)
    } else if (direction == "right") {
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, speed + delta2)
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, speed - delta2)
    }
    
    signal(direction)
    basic.pause(turning_time2)
    //  remain forwarding after 200ms
    maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, speed)
    signal("front")
}

function signal(dir: string) {
    if (dir == "left") {
        basic.showLeds(`
            . . # . .
            . . . # .
            # # # # #
            . . . # .
            . . # . .
            `)
    } else if (dir == "right") {
        basic.showLeds(`
            . . # . .
            . # . . .
            # # # # #
            . # . . .
            . . # . .
            `)
    } else if (dir == "front") {
        basic.showLeds(`
            . . # . .
            . # # # .
            # . # . #
            . . # . .
            . . # . .
            `)
    } else if (dir == "back") {
        basic.showLeds(`
            . . # . .
            . . # . .
            # . # . #
            . # # # .
            . . # . .
            `)
    } else if (dir == "stop") {
        basic.showLeds(`
            . . # . .
            . # . # .
            # . . . #
            . # . # .
            . . # . .
            `)
    }
    
}

function turn(direction: string, speed: number) {
    
    delta1 = speed / 6
    if (direction == "left") {
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, speed - delta1)
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, speed + delta1)
    } else if (direction == "right") {
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, speed + delta1)
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, speed - delta1)
    }
    
    signal(direction)
}

maqueen.IR_callbackUser(function on_ir_callbackuser(message: number) {
    let speed = 120
    if (message == 17) {
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, speed)
        signal("front")
    } else if (message == 21) {
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 0)
        signal("stop")
    } else if (message == 19) {
        turn("left", speed)
    } else if (message == 20) {
        turn("right", speed)
    } else if (message == 18) {
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CCW, speed)
    } else if (message == 64) {
        //  left corner
        corner("left", speed)
    } else if (message == 13) {
        //  right corner
        corner("right", speed)
    }
    
})
let delta1 = 0
let turning_time2 = 0
let delta2 = 0
let delta = 0
let turning_time = 0
delta2 = 0
