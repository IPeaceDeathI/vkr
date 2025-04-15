<?php

declare(strict_types=1);

require_once dirname(__DIR__, 2) . '/vendor/autoload.php';

use Noks\Migration\NoksMigration;

final class StatCRMAmoCRMLead extends NoksMigration
{
    public string $name = 'stat_crm_amocrm_lead';
    public array $settingTable = [
        'id' => false,
        // 'primary_key' => ['id'],
        'collation' => 'utf8mb4_unicode_ci',
        'encoding' => 'utf8mb4',
    ];
    public array $my_indices = [
        [
            'columns' => ['id', 'integration_id'],
            'options' => [
                'unique' => true,
            ],
        ]
    ];

    public function up(): void
    {
        $this->setColumn('id', 'integer', [
            'null' => false,
            'signed' => false,
        ]);
        $this->setColumn('integration_id', 'integer', [
            'null' => false,
            'signed' => false,
        ]);
        $this->setColumn('responsible_user_id', 'integer', [
            'signed' => false,
            'comment' => 'ID пользователя, ответственного за сделку',
        ]);
        $this->setColumn('group_id', 'integer', [
            'signed' => false,
            'comment' => 'пока не используется, ID группы, в которой состоит ответственны пользователь за сделку',
        ]);
        $this->setColumn('status_id', 'integer', [
            'signed' => false,
            'comment' => 'ID статуса, в который добавляется сделка, по-умолчанию – первый этап главной воронки',
        ]);
        $this->setColumn('pipeline_id', 'integer', [
            'signed' => false,
            'comment' => 'ID воронки, в которую добавляется сделка',
        ]);
        $this->setColumn('account_id', 'integer', [
            'null' => false,
            'signed' => false,
            'comment' => 'ID аккаунта, в котором находится сделка',
        ]);
        $this->setColumn('name', 'varchar', [
            'null'   => false,
        ]);
        $this->setColumn('price', 'integer', [
            'signed' => false,
            'comment' => 'Бюджет сделки',
        ]);
        $this->setColumn('created_by', 'integer', [
            'signed' => false,
            'comment' => 'ID пользователя, создающий сделку',
        ]);
        $this->setColumn('updated_by', 'integer', [
            'null'    => false,
            'signed' => false,
            'comment' => 'ID пользователя, изменяющий сделку',
        ]);
        $this->setColumn('created_at', 'timestamp', [
            'comment' => 'Дата создания сделки',
        ]);
        $this->setColumn('updated_at', 'timestamp', [
            'comment' => 'Дата изменения сделки',
        ]);
        $this->setColumn('closed_at', 'timestamp', [
            'comment' => 'Дата закрытия сделки',
        ]);
        $this->setColumn('is_deleted', 'tinyint', [
            'null'    => false,
            'signed' => false,
            'comment' => 'Удалена ли сделка (bool)',
        ]);
        $this->setColumn('raw_content', 'text', [
            'comment' => 'response lead',
        ]);

        $this->createdAt('added_at');
        $this->updatedAt('changed_at');

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
