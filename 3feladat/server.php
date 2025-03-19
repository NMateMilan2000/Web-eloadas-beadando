<?php
// Set headers for SSE
header("Access-Control-Allow-Origin: http://127.0.0.1:5500"); // Change to your frontend URL
header("Access-Control-Allow-Credentials: true");
header("Content-Type: text/event-stream");
header("Cache-Control: no-cache");
header("Connection: keep-alive");

// Function to send a message
function sendMessage($data) {
    echo "data: " . json_encode($data) . "\n\n";
    ob_flush();
    flush();
}

// Send data every 1 second
while (true) {
    $time = date('H:i:s');
    sendMessage(["time" => $time]);

    sleep(1);
}
?>