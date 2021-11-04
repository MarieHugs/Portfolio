<?php 

    $name = $_POST["name"];
    $email = $_POST["email"];
    $message = $_POST["message"];


    if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $receiver = "developper@melamontagne.com";
        $subject = "De: $name <$email>";
        $body = "Nom: $name\nEmail: $email\nMessage: $message";
        $sender = "De: $email";
        if(mail($receiver, $subject, $body, $sender)){
            echo "Votre message à été envoyer!";
        }
    }

?>

