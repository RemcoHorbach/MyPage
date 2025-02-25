<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $to = "horbachremco@gmail.com";
    $subject = "New Contact Form Submission from Portfolio";

    $name = htmlspecialchars($_POST['name']);
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $message = htmlspecialchars($_POST['message']);
    $headers = "From: $email" . "\r\n" .
               "Reply-To: $email" . "\r\n" .
               "X-Mailer: PHP/" . phpversion();

    $fullMessage = "You have received a new message from your portfolio:\n\n";
    $fullMessage .= "Name: $name\n";
    $fullMessage .= "Email: $email\n";
    $fullMessage .= "Message:\n$message";

    if (mail($to, $subject, $fullMessage, $headers)) {
        echo "<script>alert('Thank you for your message! I will get back to you soon.'); window.location.href='index.html';</script>";
    } else {
        echo "<script>alert('Failed to send the message. Please try again later.'); window.history.back();</script>";
    }
} else {
    header("Location: index.html");
    exit();
}
?>
