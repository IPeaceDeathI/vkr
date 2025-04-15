<?php

declare(strict_types=1);

require_once dirname(__DIR__, 2) . '/vendor/autoload.php';

use Noks\Migration\NoksMigration;
use Phinx\Db\Adapter\MysqlAdapter;
use Noks\Enum\StatusTariffEnum;

final class Tariff extends NoksMigration
{
    public string $name = 'tariff';
    public array $settingTable = [
        'id' => false,
        'collation' => 'utf8mb4_unicode_ci',
        'encoding' => 'utf8mb4',
    ];

    public array $my_indices = [
        [
            'columns' => ['tariff_flow_id'],
            'options' => [
                'unique' => true,
            ],
        ]
    ];

    public function up(): void
    {
        $this->setColumn('tariff_flow_id', 'integer', [
            'null' => false,
            'signed' => false,
        ]);
        $this->setColumn('tariff_id', 'integer', [
            'signed' => false,
            'comment' => 'идентификатор тарифа'
        ]);
        $this->setColumn('tariff_status', 'integer', [
            'signed' => false,
            'comment' => StatusTariffEnum::class . ' статус тарифа act/block'
        ]);
        $this->setColumn('tariff_activation', 'timestamp', [
            'comment' => 'время активации'
        ]);
        $this->setColumn('tariff_blocking', 'timestamp', [
            'comment' => 'время заморозки'
        ]);
        $this->setColumn('tariff_last_write_off', 'timestamp', [
            'comment' => 'последнее списание'
        ]);
        $this->setColumn('tariff_trial_start', 'timestamp', [
            'comment' => 'время начало пробного тарифа'
        ]);
        $this->setColumn('tariff_trial_end', 'timestamp', [
            'comment' => 'конец пробного тарифа'
        ]);
        $this->setColumn('tariff_trial_fully_used', 'integer', [
            'signed' => false,
            'null' => false,
            'limit' => MysqlAdapter::INT_TINY,
            'default' => 0,
            'comment' => 'пробный тариф использован полностью'
        ]);
        $this->setColumn('tariff_notice_end', 'timestamp', [
            'comment' => 'время проверки на уведомление об конце тарифа'
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
    }

    public function down(): void
    {
        #$this->table($this->name)->drop()->save();
    }
}
