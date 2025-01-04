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
    var winner by remember { mutableStateOf<String?>(null) }

    Column(
        modifier = Modifier.fillMaxSize(),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Text(
            text = when {
                winner != null -> "Winner: $winner"
                else -> "Current Player: $currentPlayer"
            }
        )
        Spacer(modifier = Modifier.height(16.dp))

        // Game Board
        for (i in 0..2) {
            Row {
                for (j in 0..2) {
                    Button(
                        onClick = {
                            if (board[i][j].isEmpty() && winner == null) {
                                board[i][j] = currentPlayer
                                if (checkWinner(board, currentPlayer)) {
                                    winner = currentPlayer
                                } else {
                                    currentPlayer = if (currentPlayer == "X") "O" else "X"
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
                winner = null
            },
            enabled = winner != null
        ) {
            Text(text = "play again")
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
