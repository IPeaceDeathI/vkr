<div class="wrapper wrapper-main">
    <h1><?=$title?></h1>
    
    <?php foreach($this->getErrors() as $e): ?>
        <div class="error-box"><?=$e?></div>
    <?php endforeach; ?>
    
    <form method="POST">
        <label>Аккаунт:</label>
        <input class="w-50" value="Email" disabled><br>
        <label>Новый пароль:</label>
        <input type="password" name="password" class="w-50" placeholder="Введите новый пароль"><br>
        <label>Повторите пароль:</label>
        <input type="password" name="password_double" class="w-50" placeholder="Повторите новый пароль"><br>
        <input name="submit_respawn_password" type="submit" value="Обновить пароль">
    </form>
</div>