<?php

declare(strict_types=1);

require_once \dirname(__DIR__, 2) . '/vendor/autoload.php';

use Noks\Migration\NoksMigration;

/**
 * @param \Noks\Model\View\ViewCodeActionTelegramModel
 */
final class ViewCodeActionTelegram extends NoksMigration
{
    public string $name = 'v_code_action_telegram';

    public function up(): void
    {
        $sql = 'SELECT
                *,
                -- если коду больше 30 минут значит он уже не актуален
                IF(TIMESTAMPDIFF(MINUTE, `created_at`, CURRENT_TIMESTAMP()) >= 30, 0, 1) as actual
            FROM `code_action_telegram`
        ';

        $this->createView($sql);
    }

    public function down(): void
    {
        #$this->table($this->name)->drop()->save();
    }
}
