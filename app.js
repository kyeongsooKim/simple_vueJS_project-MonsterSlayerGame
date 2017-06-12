new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns: [] // array for turns which will be logged each time player make a decision.

    },
    methods: {
        /* start the game and initialize the health bar */
        startGame: function(){ 
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = []
        },  
        attack: function (){

            /*player has disadvantage when it comes to damage
            so that player should use "heal" or "special attack" to win the monster.*/
            var damage = this.calculateDamage(3,10);
            this.monsterHealth -= damage
            this.turns.unshift({ //unshift() is opposite function of push()
                isPlayer: true,
                text: 'Player hits Monster for ' + damage
            });
            if (this.checkWin())
                return;

            this.monsterAttack();
        },
        specialAttack: function(){
            var bigDamage = this.calculateDamage(10,20); //stronger attack to monster
            this.monsterHealth -= bigDamage
            this.turns.unshift({ //unshift() is opposite function of push()
                isPlayer: true,
                text: 'Player hits Monster hard for ' + bigDamage
            });
             if (this.checkWin())
                return;
            this.monsterAttack();
        },
        heal: function() {
            if (this.playerHealth <= 90){
                this.playerHealth += 10;
            }else {
                this.playerHealth = 100
            }
            this.turns.unshift({ //unshift() is opposite function of push()
                isPlayer: true,
                text: 'Player heals for 10'
            });
            this.monsterAttack();
        },
        giveUp: function(){
            this.gameIsRunning = false;
        },
        calculateDamage: function(min,max){
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        monsterAttack: function(){
            var damage =  this.calculateDamage(5,12);
            this.playerHealth -= damage;
            this.turns.unshift({
                isPlayer: false,
                text: 'Monster hits Monster for ' + damage
            });
            this.checkWin();
        },
        checkWin: function(){
              if (this.monsterHealth <= 0) {
                  if (confirm('You won! New Game?')){
                    this.startGame();
                  }    
                  else{
                      this.gameIsRunning = false;
                  }
                  return true;
              } else if (this.playerHealth <= 0) {
                  if (confirm('You lost! New Game?')){
                    this.startGame();
                  }
                  else{
                        this.gameIsRunning = false;
                  }
                  return true;   
             }
             return false;
        }

    }
})