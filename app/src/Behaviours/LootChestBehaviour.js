export const LootChestBehaviour = `
root {
    selector {

        repeat while(isPlayerTouchingMe) {
            selector {
                sequence {
                    condition [playerHasOpenedMe]
                    action [open]
                }

                sequence {
                    condition [playerHasClosedMe]
                    action [close]
                }
            }
        }

        repeat until(isPlayerTouchingMe) {
            sequence {
                wait [1000, 2500]
            }
        }
    }
}`


