<?php

declare(strict_types=1);

use Noks\Migration\NoksMigration;
use Noks\Enum\VersionConstructorEnum;

final class SitesPages extends NoksMigration
{
    public string $name = 'sites_pages';
    public array $settingTable = [
        'id' => false,
        'primary_key' => ['id'],
        'collation' => 'utf8mb4_unicode_ci',
        'encoding' => 'utf8mb4',
    ];
    public array $my_indices = [
        [
            'columns' => ['hash_uri', 'id_site'],
            'options' => [
                'unique' => true,
            ],
        ],
    ];

    public function up(): void
    {
        $this->setColumn('id', 'integer', [
            'null'     => false,
            'signed'   => false,
            'identity' => true,
        ]);
        $this->setColumn('id_user_create', 'integer', [
            'null'    => false,
            'signed'  => false,
        ]);
        $this->setColumn('uri', 'text', [
            'null'    => false,
        ]);
        $this->setColumn('hash_uri', 'varchar', [
            'limit'   => 100,
            'null'    => false,
            'comment' => 'sha1',
        ]);
        $this->setColumn('title', 'text', []);
        $this->setColumn('description', 'text', []);
        $this->setColumn('id_site', 'integer', [
            'null'    => false,
        ]);
        $this->setColumn('views', 'integer', [
            'signed'  => false,
            'null'    => false,
            'default' => 0,
        ]);
        $this->setColumn('add_date_time', 'timestamp', [
            'null'    => false,
            'default' => 'CURRENT_TIMESTAMP',
        ]);
        $this->setColumn('update_date_time', 'timestamp', [
            'null'    => false,
            'update'  => 'CURRENT_TIMESTAMP',
            'default' => 'CURRENT_TIMESTAMP',
        ]);
        $this->setColumn('preview_src', 'varchar', [
            'default' => null,
            'limit'   => 255,
        ]);
        $this->setColumn('social_preview_src', 'varchar', [
            'default' => null,
            'limit'   => 255,
        ]);
        $this->setColumn('status', 'tinyint', [
            'null'    => false,
            'default' => '1', //COMMENT "1 - active, 5 - trash", 
        ]);
        $this->setColumn('version_editor', 'tinyint', [
            'null'    => false,
            'default' => VersionConstructorEnum::VERSION_2->v(),
            'comment' => VersionConstructorEnum::class,
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

        $table = $this->table($this->name);
        $rows = [
            // для лендингов
            [
                'id_user_create' => 1,
                'id_site' => 1,
                'uri' => '',
                'hash_uri' => sha1(''),
                'title' => 'Главная',
                'version_editor' => VersionConstructorEnum::VERSION_1->v(),
            ],
            // для шаблонов
            [
                'id_user_create' => 1,
                'id_site' => 2,
                'uri' => '',
                'hash_uri' => sha1(''),
                'title' => 'Главная',
                'version_editor' => VersionConstructorEnum::VERSION_1->v(),
            ]
        ];
        $table->insert($rows)->saveData();
    }

    public function down(): void
    {
        //$this->table($this->name)->drop()->save();
    }
}
