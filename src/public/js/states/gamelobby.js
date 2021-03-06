var users = new Set()
var usernames = {}
var player

var gamelobbyState = {

  create: function() {

    var lobbyID = localStorage.getItem('lobbyID')
    player = localStorage.getItem('username')

    var nameLabel = game.add.text(80,80,lobbyID,
                    {font: '50px Arial', fill: '#ffffff'})

    var startLabel = game.add.text(80, game.camera.height-240,
                    'Start Game (press "Q")',
                    {font: '25px Arial', fill: '#ffffff'})

    var selectpuzzleLabel = game.add.text(80, game.camera.height-80,
                    'Select puzzle (press "W")',
                    {font: '25px Arial', fill: '#ffffff'})

    var closelobbyLabel = game.add.text(80, game.camera.height-160,
                    'Close Lobby (press "E")',
                    {font: '25px Arial', fill: '#ffffff'})

    var connectedUsers = game.add.text(game.camera.width-320, 25,
                    'Connected users:',
                    {font: '25px Arial', fill: '#ffffff'})

    // Setup text event for clicks
    startLabel.inputEnabled = true
    startLabel.events.onInputDown.add(this.startGame, this)

    selectpuzzleLabel.inputEnabled = true
    selectpuzzleLabel.events.onInputDown.add(this.selectpuzzle, this)

    closelobbyLabel.inputEnabled = true
    closelobbyLabel.events.onInputDown.add(this.close, this)

    gameLobby.addPlayer(player)

  },

  update: function() {


    users.add(player)
    gameLobby.addPlayer(player)
    gameLobby.getUpdate()

    // Keep updating the connected users list:
    users.forEach((user) => {
      if (!usernames[user]) {
        usernames[user] = game.add.text(game.world.width-320, 30*(users.size+2),
                          user,
                          {font: '20px Arial', fill: '#ffffff'})
      }
    })
    /*
    for (let i=0; i<users.size; i++) {
      if (usernames[users[i]]) {
        continue
      }
      usernames[users[i]] = game.add.text(game.world.width-320, 30*(i+2),
                      users[i],
                      {font: '20px Arial', fill: '#ffffff'})
    }
    */
  },

  startGame: function() {
    sounds.playSound(sounds.clickSounds)
    game.state.start('play')
  },

  selectpuzzle: function() {
    sounds.playSound(sounds.clickSounds)
    game.state.start('play')
  },

  close: function() {
    sounds.playSound(sounds.clickSounds)
    game.state.start('home')
  }
}
