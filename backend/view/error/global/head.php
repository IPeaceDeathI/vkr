<?php

use Noks\Error\Errors;
?>
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <link rel="shortcut icon" href="<?= SITE_URL ?>images/favicon.blue.png" type="image/x-icon">
    <title><?= $title ?></title>
    <link rel="stylesheet" href="<?= Errors::CSS_PATH . $public['css'] ?>">
</head>

<body style="background-image: url(/images/<?= $code ?>.jpg);">