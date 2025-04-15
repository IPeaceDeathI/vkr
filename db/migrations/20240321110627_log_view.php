<?php

declare(strict_types=1);

require_once \dirname(__DIR__, 2) . '/vendor/autoload.php';

use Noks\Migration\NoksMigration;
use Noks\Enum\Stat\SourceVisitEnum;

/**
 * @param \Noks\Model\LogViewModel
 */
final class LogView extends NoksMigration
{
    public string $name = 'log_view';
    public array $settingTable = [
        'id'          => false,
        'primary_key' => ['id'],
        'collation'   => 'utf8mb4_unicode_ci',
        'encoding'    => 'utf8mb4',
    ];

    public array $my_indices = [
        // [
        // 'columns' => ['id'],
        // 'options' => [
        // 'unique' => true,
        // ],
        // ]
    ];

    public function up(): void
    {
        $this->setColumn('id', 'varchar', [
            'null'    => false,
            'limit'   => 36,
        ]);
        $this->setColumn('previous_id', 'varchar', [
            'limit'   => 36,
        ]);
        $this->setColumn('session_visit_id', 'varchar', [
            'limit'   => 36,
        ]);
        $this->setColumn('general_visit_id', 'varchar', [
            'limit'   => 36,
        ]);
        // ------------------------------------------------------------------
        // 
        // ------------------------------------------------------------------
        $this->setColumn('hash_stat_id', 'varchar', [
            // 'null' => false,
            'limit' => 40,
        ]);
        $this->setColumn('stat_id', 'int', [
            'signed'  => false,
            'comment' => 'определяется позже',
        ]);
        // ------------------------------------------------------------------
        // 
        // ------------------------------------------------------------------
        $this->setColumn('referer', 'text', []);
        $this->setColumn('hash_referer', 'int', [
            'signed'   => false,
            'null'     => false,
            'limit'     => 10,
        ]);
        $this->setColumn('url', 'text', []);
        $this->setColumn('hash_url', 'int', [
            'signed'   => false,
            'null'     => false,
            'limit'     => 10,
        ]);
        $this->setColumn('user_agent', 'varchar', []);
        // INFO time_zone,screen_size,ip перенесли в other
        // $this->setColumn('time_zone', 'varchar', []);
        // $this->setColumn('screen_size', 'varchar', []);
        // $this->setColumn('ip', 'varchar', []);
        $this->setColumn('is_bot', 'tinyint', [
            'signed'   => false,
        ]);
        $this->setColumn('other', 'text', []);
        // ------------------------------------------------------------------
        // 
        // ------------------------------------------------------------------
        $this->setColumn('source', 'int', [
            'signed'   => false,
            'comment' => SourceVisitEnum::class,
        ]);
        // ------------------------------------------------------------------
        // 
        // ------------------------------------------------------------------
        $this->setColumn('source_domain_id', 'int', [
            'signed'   => false,
        ]);
        $this->setColumn('source_path_id', 'int', [
            'signed'   => false,
        ]);
        // ------------------------------------------------------------------
        // Если source AD
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
        // $this->table($this->name)->drop()->save();
    }
}
