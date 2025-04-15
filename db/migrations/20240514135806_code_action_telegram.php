<?php

declare(strict_types=1);

require_once \dirname(__DIR__, 2) . '/vendor/autoload.php';

use Noks\Migration\NoksMigration;
use Noks\Enum\Telegram\ActionTelegramEnum;

/**
 * @param \Noks\Model\CodeActionTelegramModel
 * коды которые генерируются для действий в телеграмме, например подписка пользователя на уведомления об заявках
 */
final class CodeActionTelegram extends NoksMigration
{
    public string $name = 'code_action_telegram';
    public array $settingTable = [
        'id'          => false,
        // 'primary_key' => ['code'],
        'collation'   => 'utf8mb4_unicode_ci',
        'encoding'    => 'utf8mb4',
    ];

    public array $my_indices = [
        [
            'columns' => ['code'],
            'options' => [
                'unique' => true,
            ],
        ]
    ];

    public function up(): void
    {
        $this->setColumn('code', 'int', [
            'null'    => false,
            'signed'  => false,
        ]);
        $this->setColumn('action', 'int', [
            'null'    => false,
            'signed'  => false,
            'comment' => ActionTelegramEnum::class,
        ]);
        $this->setColumn('params', 'varchar', [
            'null'    => false,
            'comment' => 'id сущности или другое'
        ]);
        $this->setColumn('hash_params', 'int', [
            'null'    => false,
            'signed'  => false,
        ]);

        $this->createdAt();
        $this->updatedAt();

        if ($this->hasTable($this->name)) {
            $this->updateTable();
            $this->removeUnnecessaryColumns();
            $this->addIndicesTable();
            return;
        }

        $this->createTable();
        $this->updateTable();
        $this->addIndicesTable();
    }

    public function down(): void
    {
        #$this->table($this->name)->drop()->save();
    }
}
