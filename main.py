def corner(direction: str, speed: number):
    global delta2, turning_time2
    delta2 = speed / 3
    turning_time2 = 200
    if direction == "left":
        maqueen.motor_run(maqueen.Motors.M1, maqueen.Dir.CW, speed - delta2)
        maqueen.motor_run(maqueen.Motors.M2, maqueen.Dir.CW, speed + delta2)
    elif direction == "right":
        maqueen.motor_run(maqueen.Motors.M1, maqueen.Dir.CW, speed + delta2)
        maqueen.motor_run(maqueen.Motors.M2, maqueen.Dir.CW, speed - delta2)
    signal(direction)
    basic.pause(turning_time2)
    # remain forwarding after 200ms
    maqueen.motor_run(maqueen.Motors.ALL, maqueen.Dir.CW, speed)
    signal("front")

def signal(dir: str):
    if dir == "left":
        basic.show_leds("""
            . . # . .
            . . . # .
            # # # # #
            . . . # .
            . . # . .
            """)
    elif dir == "right":
        basic.show_leds("""
            . . # . .
            . # . . .
            # # # # #
            . # . . .
            . . # . .
            """)
    elif dir == "front":
        basic.show_leds("""
            . . # . .
            . # # # .
            # . # . #
            . . # . .
            . . # . .
            """)
    elif dir == "back":
        basic.show_leds("""
            . . # . .
            . . # . .
            # . # . #
            . # # # .
            . . # . .
            """)
    elif dir == "stop":
        basic.show_leds("""
            . . # . .
            . # . # .
            # . . . #
            . # . # .
            . . # . .
            """)

def turn(direction: str, speed: number):
    global delta1
    delta1 = speed / 6
    if direction == "left":
        maqueen.motor_run(maqueen.Motors.M1, maqueen.Dir.CW, speed - delta1)
        maqueen.motor_run(maqueen.Motors.M2, maqueen.Dir.CW, speed + delta1)
    elif direction == "right":
        maqueen.motor_run(maqueen.Motors.M1, maqueen.Dir.CW, speed + delta1)
        maqueen.motor_run(maqueen.Motors.M2, maqueen.Dir.CW, speed - delta1)
    signal(direction)

def on_ir_callbackuser(message):
    speed = 120
    if message == 17:
        maqueen.motor_run(maqueen.Motors.ALL, maqueen.Dir.CW, speed)
        signal("front")
    elif message == 21:
        maqueen.motor_run(maqueen.Motors.ALL, maqueen.Dir.CW, 0)
        signal("stop")
    elif message == 19:
        turn("left", speed)
    elif message == 20:
        turn("right", speed)
    elif message == 18:
        maqueen.motor_run(maqueen.Motors.ALL, maqueen.Dir.CCW, speed)
    elif message == 64:
        # left corner
        corner("left", speed)
    elif message == 13:
        # right corner
        corner("right", speed)
maqueen.IR_callbackUser(on_ir_callbackuser)

delta1 = 0
turning_time2 = 0
delta2 = 0
delta = 0
turning_time = 0
delta2 = 0