export default class AppConstant {
  static initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];

  static totalSquares = 9;

  static player1DefaultSymbol = "X";
  static player2DefaultSymbol = "O";

  static defaultPlayers = {
    [this.player1DefaultSymbol]: "Player 1",
    [this.player2DefaultSymbol]: "Player 2",
  };
}
