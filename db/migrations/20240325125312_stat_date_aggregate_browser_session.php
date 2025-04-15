<?php

declare(strict_types=1);

require_once \dirname(__DIR__, 2) . '/vendor/autoload.php';

use Noks\Migration\NoksMigration;
use Noks\Enum\Stat\SourceVisitEnum;

/**
 * подсчитанные сеансы по дням
 * @param \Noks\Model\Stat\StatDateAggregateBrowserSessionModel
 */
final class StatDateAggregateBrowserSession extends NoksMigration
{
    public string $name = 'stat_date_aggregate_browser_session';
    public array $settingTable = [
        'id'          => false,
        'primary_key' => ['hash'],
        'collation'   => 'utf8mb4_unicode_ci',
        'encoding'    => 'utf8mb4',
    ];

    public array $my_indices = [
        // [
        // 'columns' => ['hash'],
        // 'options' => [
        // 'unique' => true,
        //     ],
        // ]
    ];

    public function up(): void
    {
        $this->setColumn('hash', 'varchar', [
            'null'    => false,
            'limit'   => 40,
            // 'identity'   => true,
            'comment' => 'составной хеш',
        ]);
        $this->setColumn('count_session', 'int', [
            'null'    => false,
            'signed'  => false,
            'comment' => 'Сеансы/Визиты',
        ]);
        $this->setColumn('count_visit', 'int', [
            'null'    => false,
            'signed'  => false,
            'comment' => 'Сеансы/Визиты',
        ]);
        $this->setColumn('count_view', 'int', [
            'null'    => false,
            'signed'  => false,
            'comment' => 'Сеансы/Визиты',
        ]);
        $this->setColumn('stat_id', 'int', [
            'signed'  => false,
            'null'    => false,
        ]);
        $this->setColumn('per_day', 'date', [
            'null'    => false,
        ]);
        // ------------------------------------------------------------------
        // source
        // ------------------------------------------------------------------
        $this->setColumn('source', 'int', [
            'signed'  => false,
            'null'    => false,
            'comment' => SourceVisitEnum::class,
        ]);
        $this->setColumn('source_domain_id', 'int', [
            'signed'  => false,
        ]);
        $this->setColumn('source_path_id', 'int', [
            'signed'  => false,
        ]);
        // ------------------------------------------------------------------
        // stat
        // ------------------------------------------------------------------
        $this->setColumn('stat_criteria_id', 'bigint', [
            'signed'   => false,
        ]);
        $this->setColumn('stat_ad_id', 'bigint', [
            'signed'   => false,
        ]);
        $this->setColumn('stat_group_id', 'bigint', [
            'signed'   => false,
        ]);
        $this->setColumn('stat_ad_network_type', 'tinyint', [
            'signed'   => false,
        ]);
        $this->setColumn('stat_campaign_id', 'bigint', [
            'signed'   => false,
        ]);
        $this->setColumn('stat_integration_id', 'int', [
            'signed'   => false,
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
