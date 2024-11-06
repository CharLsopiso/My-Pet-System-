<?php

require_once "header.php"; // Ensure header is included correctly

class User {

    function login($json) {
        include "connection.php"; // Ensure connection.php correctly initializes $conn

        // Decode JSON input and validate it
        $decoded_json = json_decode($json, true);
        $username = $decoded_json["username"] ?? null;
        $password = $decoded_json["password"] ?? null;

        // Validate if username and password exist
        if (!$username || !$password) {
            return json_encode(array("status" => "failed", "message" => "Username or password is missing."));
        }

        try {
            // Prepare and execute the SQL statement
            $sql = "SELECT * FROM users WHERE username = :username";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(":username", $username);
            $stmt->execute();

            // Check if a user was found
            if ($stmt->rowCount() > 0) {
                $row = $stmt->fetch(PDO::FETCH_ASSOC);
                $hashedPasswordFromDB = $row['password_hash'];

                // Verify the password
                if (password_verify($password, $hashedPasswordFromDB)) {
                    unset($row['password_hash']); // Remove sensitive data
                    return json_encode(array("user" => $row, "status" => "success"));
                } else {
                    return json_encode(array("status" => "failed", "message" => "Incorrect password."));
                }
            } else {
                return json_encode(array("status" => "failed", "message" => "Incorrect username."));
            }
        } catch (PDOException $e) {
            // Avoid exposing sensitive error information in production
            return json_encode(array("status" => "failed", "message" => "An unexpected error occurred. Please try again."));
        }
    }
}

// Handle the incoming request
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $operation = $_GET['operation'] ?? ""; // Use null coalescing operator for safety
    $json = $_GET['json'] ?? ""; // Get JSON data from GET request
} else if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $operation = $_POST['operation'] ?? ""; // Get operation from POST request
    $json = $_POST['json'] ?? ""; // Get JSON data from POST request
}

$user = new User(); // Create a new User object

// Route the operation
switch ($operation) {
    case "login":
        echo $user->login($json);
        break;
    default:
        echo json_encode(array("status" => "failed", "message" => "Invalid operation."));
        break;
}

?>
