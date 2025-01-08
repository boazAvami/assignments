package com.example.tictactoe

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.*
import androidx.compose.material3.Button
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.example.tictactoe.ui.theme.TictactoeTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            TictactoeTheme {
                TicTacToeGame()
            }
        }
    }
}

@Composable
fun TicTacToeGame() {
    var board by remember { mutableStateOf(Array(3) { Array(3) { "" } }) }
    var currentPlayer by remember { mutableStateOf("X") }
    var gameState by remember { mutableStateOf("Current Player: X") }

    Column(
        modifier = Modifier.fillMaxSize(),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Text(text = gameState)
        Spacer(modifier = Modifier.height(16.dp))

        // Game Board
        for (i in 0..2) {
            Row {
                for (j in 0..2) {
                    Button(
                        onClick = {
                            if (board[i][j].isEmpty() && !gameOver(board)) {
                                board[i][j] = currentPlayer
                                if (checkWinner(board, currentPlayer)) {
                                    gameState = "Winner: $currentPlayer"
                                } else if (isBoardFull(board)) {
                                    gameState = "It's a Tie!"
                                } else {
                                    currentPlayer = if (currentPlayer == "X") "O" else "X"
                                    gameState = "Current Player: $currentPlayer"
                                }
                            }
                        },
                        modifier = Modifier
                            .size(80.dp)
                            .padding(4.dp)
                    ) {
                        Text(text = board[i][j])
                    }
                }
            }
        }
        Spacer(modifier = Modifier.height(16.dp))

        Button(
            onClick = {
                board = Array(3) { Array(3) { "" } }
                currentPlayer = "X"
                gameState = "Current Player: X"
            },
            enabled = gameOver(board)
        ) {
            Text(text = "Play Again")
        }
    }
}

fun checkWinner(board: Array<Array<String>>, player: String): Boolean {
    for (i in 0..2) {
        if (board[i][0] == player && board[i][1] == player && board[i][2] == player) return true
        if (board[0][i] == player && board[1][i] == player && board[2][i] == player) return true
    }

    if (board[0][0] == player && board[1][1] == player && board[2][2] == player) return true
    if (board[0][2] == player && board[1][1] == player && board[2][0] == player) return true

    return false
}

fun isBoardFull(board: Array<Array<String>>): Boolean {
    return board.all { row -> row.all { it.isNotEmpty() } }
}

fun gameOver(board: Array<Array<String>>): Boolean {
    return isBoardFull(board) || checkWinner(board, "X") || checkWinner(board, "O")
}
