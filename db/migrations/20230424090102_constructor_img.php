<?php
declare(strict_types=1);

require_once dirname(__DIR__, 2) . '/vendor/autoload.php';
use Noks\Migration\NoksMigration;

final class ConstructorImg extends NoksMigration
{
    public string $name = 'constructor_img';
    public array $settingTable = [
        'id' => false,
        'primary_key' => ['img_id'],
        'collation' => 'utf8mb4_unicode_ci',
        'encoding' => 'utf8mb4',
    ];

    public function up (): void
    {
        $this->setColumn('img_id', 'integer', [
            'identity' => true,
            'signed' => false,
        ]);
        $this->setColumn('img_page_id', 'integer', [
            'default'=>null,
            'null' => true,
            'signed' => false,
        ]);
        $this->setColumn('img_tpl_id', 'integer', [
            'default'=>null,
            'null' => true,
            'signed' => false,
        ]);
        $this->setColumn('img_ext', 'string', [
            'null' => true,
            'limit' => 10,
        ]);
        $this->setColumn('img_mime', 'string', [
            'null' => true,
            'limit' => 25,
        ]);
        $this->setColumn('img_size', 'integer', [
            'null' => true,
            'signed' => false,
        ]);
        $this->setColumn('img_name', 'string', [
            'null' => true,
            'limit' => 255,
        ]);
        $this->setColumn('img_user_id_add', 'integer', [
            'null' => true,
            'signed' => false,
        ]);
        $this->setColumn('img_path_img', 'string', [
            'null' => true,
            'limit' => 255,
        ]);
        $this->setColumn('img_date_create', 'timestamp', [
            'null' => false,
            'default' => 'CURRENT_TIMESTAMP',
        ]);
        $this->setColumn('img_date_update', 'timestamp', [
            'null' => false,
            'update' => 'CURRENT_TIMESTAMP',
            'default' => 'CURRENT_TIMESTAMP',
        ]);

        if($this->hasTable($this->name))
        {
            $this->updateTable();
            $this->removeUnnecessaryColumns();
            $this->addIndicesTable();
            return;
        }

        $this->createTable();
        $this->updateTable();
        $this->addIndicesTable();
    }

    public function down (): void
    {
        #$this->table($this->name)->drop()->save();
    }
}
