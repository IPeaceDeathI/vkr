<div class="message-box">
    <div class="error-code">
        <?= $code ?>
    </div>
    <p class="error-message">
        <?= $message ?>
    </p>
    <?php if ($show_btn) : ?>
        <?php if (($url = previousLinkNoks()) !== '') : ?>
            <a class="on-main-btn" href="<?= $url ?>">
                Вернуться назад
            </a>
        <?php endif; ?>
        <a class="on-main-btn" href="<?= SITE_URL ?>">
            Вернуться на главную
        </a>
    <?php endif; ?>
</div>