<?php
    $name              = $_POST['name'];
    $phone             = $_POST['phone'];
    $street            = $_POST['street'];
    $house_number     = $_POST['house__number'];
    $housing_number   = $_POST['housing__number'];
    $apartment_number = $_POST['apartment__number'];
    $floor_number     = $_POST['floor__number'];
    $comment           = $_POST['form__comment'];
    $change            = $_POST['change'];

    $disturb           = $_POST['dont-disturb']; //1 или Null
    $disturb = isset($disturb) ? 'не перезванивать' : 'перезвонить';

    echo($name . ', заказ отправлен');
    // $data = [];
    // $submit = $_POST['submit'];
    // if (isset($submit)) {
    //     $data['status'] = "ok";
    //     $data['mes'] = "Заказ отправлен";
    // }
    // else {
    //     $data['status'] = "no";
    //     $data['mes'] = "на сервере произошла ошибка";
    // }
    // echo json_encode($data);


?>