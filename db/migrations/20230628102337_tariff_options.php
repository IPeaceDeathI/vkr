<?php
declare(strict_types=1);

require_once dirname(__DIR__, 2) . '/vendor/autoload.php';
use Noks\Migration\NoksMigration;

final class TariffOptions extends NoksMigration
{
    public string $name = 'tariff_options';
    public array $settingTable = [
        'id' => false,
        'primary_key' => ['option_rowid'],
        'collation' => 'utf8mb4_unicode_ci',
        'encoding' => 'utf8mb4',
    ];

    public array $my_indices = [
        [
            'columns' => ['option_flow_id', 'option_product_id'],
            'options' => [
                'unique' => true,
            ],
        ]
    ];

    public function up (): void
    {
        $this->setColumn('option_rowid', 'int', [
            'null' => false,
            'identity' => true,
            'signed' => false,
        ]);
        $this->setColumn('option_flow_id', 'int', [
            'null' => false,
            'signed' => false,
        ]);
        $this->setColumn('option_product_id', 'int', [
            'null' => false,
            'signed' => false,
            'comment' => 'идентификатор продукта Noks\Model\FakeProduct',
        ]);
        $this->setColumn('option_value', 'int', [
            'null' => false,
            'signed' => false,
            'comment' => 'значение опции/продукта',
        ]);
        $this->setColumn('option_date', 'timestamp', [
            'null' => false,
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