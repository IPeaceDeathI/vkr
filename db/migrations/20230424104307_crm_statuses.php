<?php

declare(strict_types=1);

require_once dirname(__DIR__, 2) . '/vendor/autoload.php';

use Noks\Migration\NoksMigration;

final class CrmStatuses extends NoksMigration
{
    public string $name = 'crm_statuses';
    public array $settingTable = [
        'id' => false,
        'primary_key' => ['status_id'],
        'collation' => 'utf8mb4_unicode_ci',
        'encoding' => 'utf8mb4',
    ];

    public function up(): void
    {
        $this->setColumn('status_id', 'integer', [
            'identity' => true,
            'signed' => false,
        ]);
        $this->setColumn('status_id_site', 'integer', [
            'null' => true,
            'signed' => false,
        ]);
        $this->setColumn('status_uid', 'integer', [
            'null' => false,
        ]);
        $this->setColumn('status_num', 'integer', [
            'null' => false,
            'default' => 10
        ]);
        $this->setColumn('status_name', 'string', [
            'null' => false,
            'limit' => 32
        ]);
        $this->setColumn('status_color', 'string', [
            'null' => false,
            'limit' => 16
        ]);
        $this->setColumn('status_date', 'timestamp', [
            'null' => false,
            'default' => 'CURRENT_TIMESTAMP',
        ]);
        $this->setColumn('status_date_edit', 'timestamp', [
            'null' => false,
            'update' => 'CURRENT_TIMESTAMP',
            'default' => 'CURRENT_TIMESTAMP',
        ]);

        if ($this->hasTable($this->name)) {
            $this->updateTable();
            $this->removeUnnecessaryColumns();
            $this->addIndicesTable();
            return;
        }

        $this->createTable();
        $this->updateTable();
        $this->addIndicesTable();

        // дефолтные статусы
        $this->execute('INSERT INTO crm_statuses SET status_id=1, status_uid=-1, status_name="Неразобранное", status_color="575e5a"');
        $this->execute('UPDATE crm_statuses SET status_id=0 WHERE status_id=1');
        $rows = [
            [
                'status_id' => 1,
                'status_uid' => -1,
                'status_name'  => 'Новая заявка',
                'status_color'  => 'FFCCCC',
            ],
            [
                'status_id' => 2,
                'status_uid' => -1,
                'status_name'  => 'Успешно завершено',
                'status_color'  => 'CCFF66',
            ],
            [
                'status_id' => 3,
                'status_uid' => -1,
                'status_name'  => 'Закрыто и нереализовано',
                'status_color'  => 'D5D8DB',
            ],
        ];
        $table = $this->table($this->name);
        $table->insert($rows)->saveData();
    }

    public function down(): void
    {
        #$this->table($this->name)->drop()->save();
    }
}
