<?php

declare(strict_types=1);

require_once \dirname(__DIR__, 2) . '/vendor/autoload.php';

use Noks\Migration\NoksMigration;

/**
 * @param \Noks\Model\UserTgModel
 * пользователи телеграм
 */
final class UsersTg extends NoksMigration
{
    public string $name = 'users_tg';
    public array $settingTable = [
        'id'          => false,
        'primary_key' => ['id'],
        'collation'   => 'utf8mb4_unicode_ci',
        'encoding'    => 'utf8mb4',
    ];

    public array $my_indices = [
        // [
        //     'columns' => [''],
        //     'options' => [
        //         'unique' => true,
        //     ],
        // ]
    ];

    public function up(): void
    {
        $this->setColumn('id', 'bigint', [
            'null'    => false,
            'signed'  => false,
        ]);
        $this->setColumn('show_name', 'varchar', [
            'null'    => false,
        ]);
        $this->setColumn('hash_username', 'bigint', [
            'null'    => false,
            'signed'  => false,
        ]);
        $this->setColumn('username', 'varchar', [
            'null'    => false,
        ]);
        $this->setColumn('first_name', 'varchar', []);
        $this->setColumn('last_name', 'varchar', []);
        $this->setColumn('url_avatar', 'varchar', []);
        $this->setColumn('payload', 'text', []);

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
