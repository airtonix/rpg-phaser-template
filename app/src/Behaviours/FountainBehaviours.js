export const FountainBehaviour = `root {
    selector {

        repeat until(isPlayerTouchingMe) {
            sequence {
               wait [1000, 2500]
            }
        }

        lotto [10,5,3,1] {
            action [showHelpfulEmote]
            action [showExclamationEmote]
            action [showClosedEmote]
            action [showStarEmote]
        }

    }
}`
