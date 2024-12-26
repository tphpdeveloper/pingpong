import {ref} from "vue";

export default function circleState(){
    const top = ref(0),
        left = ref(0),
        moveX = ref(true),
        moveY = ref(false),
        countPlus = ref(1),
        size = ref(100),
        radius = ref(size.value / 2),
        colorRgb = ref({r: 0, g: 0, b: 0}),
        style = ref({
            height: `${size.value}px`,
            width: `${size.value}px`,
            top: `${top.value}px`,
            left: `${left.value}px`,
            'background-color': `rgb(${colorRgb.value.r}, ${colorRgb.value.g}, ${colorRgb.value.b})`,
            radius: radius.value,
        }),
        lastExecutionTime = ref(0);

    /**
     * Виконує спринт, перевіряючи певні умови та запускаючи наступні дії.
     * Метод спочатку перевіряє, чи підрахунок позитивний.
     * Якщо істина, тоді генерується колір і виконується коло.
     *
     * @return {void} Ця функція не повертає значення.
     */
    function runSprint() {
        if (getCountPlus() > 0) {
            generateColor()
            runCircle()
        }
    }

    function runCircle() {
        setX()
        setY()
        style.value.top = `${top.value}px`
        style.value.left = `${left.value}px`
        style.value['background-color'] = `rgb(${colorRgb.value.r}, ${colorRgb.value.g}, ${colorRgb.value.b})`
    }

    function windowSize() {
        return {
            width: document.body.clientWidth,
            height: document.body.clientHeight,
        }
    }

    function setX() {
        if (isRight()) {
            left.value += getCountPlus()
            if (left.value > getWidth()) {
                left.value = getWidth()
                asLeft()
            }
        }

        if (isLeft()) {
            left.value -= getCountPlus()
            if (left.value <= 0) {
                left.value = 0;
                asRight()
            }
        }
    }

    function setY() {
        if (isDown()) {
            top.value += getCountPlus()
            if (top.value > getHeight()) {
                top.value = getHeight();
                asUp()
            }
        }

        if (isUp()) {
            top.value -= getCountPlus()
            if (top.value <= 0) {
                top.value = 0;
                asDown()
            }
        }
    }

    function getHeight() {
        return windowSize().height - size.value
    }

    function getWidth() {
        return windowSize().width - size.value
    }

    function isRight() {
        return moveX.value
    }

    function isLeft() {
        return !moveX.value
    }

    function asRight() {
        moveX.value = !moveX.value
    }

    function asLeft() {
        asRight();
    }

    function isUp() {
        return moveY.value
    }

    function isDown() {
        return !moveY.value
    }

    function asUp() {
        moveY.value = !moveY.value
    }

    function asDown() {
        asUp()
    }

    function getCountPlus() {
        return countPlus.value
    }

    function onDocumentScroll(e) {
        if (e.deltaY < 0) {
            countPlus.value++
        } else if (e.deltaY > 0) {
            if (countPlus.value > 1) {
                countPlus.value--
            }
        }
    }

    function generateColor() {
        const now = Date.now();
        const interval = 2000; // 2 секунди в мілісекундах
        // colorRgb.value.g = getSlowlyAddValue(() => colorRgb.value.g, 255, endGreen);

        if (now - lastExecutionTime.value >= interval) {
            colorRgb.value.r = getRandomInt(0, 255);
            colorRgb.value.g = getRandomInt(0, 255);
            colorRgb.value.b = getRandomInt(0, 255);
            lastExecutionTime.value = now;
        }
    }

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);

        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function setTop(value) {
        top.value = value;
        style.value.top = `${value}px`
    }

    function setLeft(value) {
        left.value = value;
        style.value.left = `${value}px`
    }

    function getCenter() {
        return {x: Math.round(left.value) + radius.value, y: Math.round(top.value) + radius.value}
    }

    function changeAxisCircle(circle2) {
        if (isDown() && isRight() && circle2.isDown() && circle2.isRight()) {
            asLeft();
        } else if (isUp() && isLeft() && circle2.isUp() && circle2.isLeft()) {
            asLeft();
        } else if (isDown() && isLeft() && circle2.isDown() && circle2.isLeft()) {
            circle2.asRight();
        } else if (isUp() && circle2.isDown()) {
            asDown();
            circle2.asRight();
        } else if (isDown() && circle2.isUp()) {
            asUp();
            circle2.asDown();
        } else if (isLeft() && circle2.isRight()) {
            asRight();
            circle2.asLeft();
        } else if (isRight() && circle2.isLeft()) {
            asLeft();
            circle2.asRight();
        } else {
            console.log('circle1',
                'center', getCenter(),
                'isUp', isUp(),
                'isDown', isDown(),
                'isLeft', isLeft(),
                'isRight', isRight(),
            )
            console.log('circle2',
                'center', circle2.getCenter(),
                'isUp', circle2.isUp(),
                'isDown', circle2.isDown(),
                'isLeft', circle2.isLeft(),
                'isRight', circle2.isRight(),
            )
        }
    }

    return {
        style,
        countPlus,
        radius,
        top,
        left,
        runSprint,
        onDocumentScroll,
        getRandomInt,
        setTop,
        setLeft,
        getCenter,
        getHeight,
        getWidth,
        changeAxisCircle,
        isDown,
        isUp,
        isRight,
        isLeft,
        asDown,
        asUp,
        asLeft,
        asRight
    }
}
