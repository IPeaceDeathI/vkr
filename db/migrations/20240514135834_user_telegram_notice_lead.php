<?php

declare(strict_types=1);

require_once \dirname(__DIR__, 2) . '/vendor/autoload.php';

use Noks\Migration\NoksMigration;

/**
 * @param \Noks\Model\UserTelegramNoticeLeadModel
 * пользователи телеграм которые подключены к системе уведомлений заявок
 */
final class UserTelegramNoticeLead extends NoksMigration
{
    public string $name = 'user_telegram_notice_lead';
    public array $settingTable = [
        'id'          => false,
        'primary_key' => ['id'],
        'collation'   => 'utf8mb4_unicode_ci',
        'encoding'    => 'utf8mb4',
    ];

    public array $my_indices = [
        [
            'columns' => ['tg_user_id', 'site_id'],
            'options' => [
                'unique' => true,
            ],
        ]
    ];

    public function up(): void
    {
        $this->setColumn('id', 'int', [
            'null'    => false,
            'signed'  => false,
            'identity' => true,
        ]);
        $this->setColumn('site_id', 'int', [
            'null'    => false,
            'signed'  => false,
        ]);
        $this->setColumn('chat_id', 'bigint', [
            'null'    => false,
            'signed'  => false,
        ]);
        $this->setColumn('tg_user_id', 'bigint', [
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
