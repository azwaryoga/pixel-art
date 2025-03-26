<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $message = $_POST["message"];
    
    $to = "azwaryoga@gmail.com"; // Your email address
    $subject = "New Message from Contact Form";
    $body = "Name: $name\nEmail: $email\nMessage: $message";
    
    // Set API key
    $api_key = "Yxkeysib-ba5c96dce3d138d9607322a28ff5558ab6b5d233e73f66e017e18d49293b6d70-40lcOE2qUbdP5XqD";
    
    // Set endpoint
    $url = "https://api.brevo.co/email/send";
    
    // Set request headers
    $headers = array(
        "Content-Type: application/json",
        "X-Brevo-Api-Key: $api_key"
    );
    
    // Set email data
    $data = array(
        "to" => $to,
        "subject" => $subject,
        "text" => $body
    );
    
    // Send email using cURL
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $response = curl_exec($ch);
    
    // Check for cURL errors
    if ($response === false) {
        $error_message = curl_error($ch);
        echo "<script>alert('cURL Error: $error_message');</script>";
    }
    else {
        // Check if email was sent successfully
        if (json_decode($response)->status == "success") {
            echo "<script>alert('Email sent successfully.');</script>";
        } else {
            echo "<script>alert('Failed to send email.');</script>";
        }
    }
    
    curl_close($ch);
}
?>
