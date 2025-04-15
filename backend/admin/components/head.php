<?php

use Noks\Component\PanelComponent;
?>

<html>

<head>
  <title><?= $title ?></title>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta name="viewport" content="width=1200">
  <link href="/<?= VERSION ?>/admin/resources/land_bootstrap.css?1c7acb5f" media="all" rel="stylesheet" type="text/css">
  <link href="/<?= VERSION ?>/admin/resources/land_admin.css?1c7acb5f" media="all" rel="stylesheet" type="text/css">
  <link href="/<?= VERSION ?>/admin/resources/land_lib_admin.css?1c7acb5f" media="all" rel="stylesheet" type="text/css">
  <link href="/<?= VERSION ?>/admin/resources/addons.css?1c7acb5f" media="all" rel="stylesheet" type="text/css">
  <!-- <script src="/_s/lib/sentry/sentry.js" type="text/javascript"></script>
  <script type="text/javascript">
    Sentry.init({
      dsn: "https://e8459d722a298d2665e90afe5f6949cd@sentry.flexbe.net/17",
      release: "1c7acb5f",
      environment: "production"
    });
  </script> -->
  <!-- <script src="/_s/lib/jquery/noconflict-3.6.4+debounce.min.js" type="text/javascript" charset="utf-8"></script> -->
  <link rel="icon" href="/images/favicon.blue.png" type="image/png">
  <!-- <link rel="apple-touch-icon" href="/_s/images/apple-touch-icon.png"> -->
</head>

<body class="admin admin-ui">

  <?= (new PanelComponent)->__invoke() ?>