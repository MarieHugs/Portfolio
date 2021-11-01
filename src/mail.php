<?php 
    echo 'this message is sent from PHP file'

    $name = $POST["name"];
    $email = $POST["email"];
    $message = $POST["message"];


    if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $receiver = "melamontagne.dev@gmail.com";
        $subject = "De: $name <$email>";
        $body = "Nom: $name\nEmail: $email\nMessage: $message";
        $sender = "De: $email"
        if(mail($receiver, $subject, $body, $sender)){
            echo "Votre message à été envoyer!";
        }
    }

?>

