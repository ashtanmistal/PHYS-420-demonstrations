<?php

if(isset($_POST['submit'])) {
  $name = $_POST['name'];
  $email = $_POST['email'];
  $subject = $_POST['subject'];
  $message = $_POST['message'];

  $to = 'ashtanmistal@gmail.com';
  $headers = "From: ".$email."\r\n";
  $headers .= "Reply-To: ".$email."\r\n";
  $headers .= "Content-type: text/plain; charset=UTF-8"."\r\n";

  if (mail($to, $subject, $message, $headers)) {
    echo '<p>Your message has been sent!</p>';
  } else {
    echo '<p>Something went wrong, go back and try again!</p>';
  }
}

?>
