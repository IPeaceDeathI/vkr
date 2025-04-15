<div style="margin: 2em; font-size: 1.5em;">

    <?php foreach (\session()->pull('errors', []) as $err) : ?>

        <p><?= $err ?></p>

    <?php endforeach; ?>
</div>