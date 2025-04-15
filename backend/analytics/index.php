<?php

/**
 * @param \Noks\Controller\Analytics\Index
 */
?>
<!DOCTYPE html>
<html>

<head>
    <link rel="shortcut icon" href="<?= SITE_URL ?>images/favicon.blue.png" type="image/x-icon">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="<?= MAIN_URL . "/analytics/styles/font.css" ?>" rel="stylesheet">
    <link href="<?= MAIN_URL . "/analytics/styles/main.css" ?>" rel="stylesheet">
    <link href="<?= MAIN_URL . "/analytics/styles/data_picker.css" ?>" rel="stylesheet">
    <link href="<?= MAIN_URL . "/analytics/styles/data_view.css" ?>" rel="stylesheet">

    <link href="<?= "/style/fonts/OpenSans/stylesheet.css" ?>" rel="stylesheet">


    <title>Аналитика | <?=SITE_NAME?></title>
</head>

<body>
    <script type="text/javascript">
        const adhiqudhaidhqwdq73193 = <?= userAuthAsAdmin() ? "true" : "false" ?>;
    </script>
    <div id="app">

    </div>

    <script src="<?= MAIN_URL . "/analytics/dist/main.js" ?>"></script>

</body>

</html>