<?php

declare(strict_types=1);

require_once dirname(__DIR__, 2) . '/vendor/autoload.php';

use Noks\Migration\NoksMigration;

/**
 * @param \Noks\Model\Stat\Integration\Source\Noks\StatSourceNoksLeadModel
 */
final class StatSourceNoksLead extends NoksMigration
{
    public string $name = 'stat_source_noks_lead';
    public array $settingTable = [
        'id' => false,
        'primary_key' => ['id'],
        'collation' => 'utf8mb4_unicode_ci',
        'encoding' => 'utf8mb4',
    ];
    public array $my_indices = [];

    public function up(): void
    {
        $this->setColumn('id', 'int', [
            'null'    => false,
            'signed'  => false,
            'identity' => true,
        ]);
        $this->setColumn('noks_lead_id', 'int', [
            'null'    => false,
            'signed'  => false,
            'comment' => 'id из "crm_leads"'
        ]);
        $this->setColumn('integration_id', 'integer', [
            'null' => false,
            'signed' => false,
        ]);
        $this->setColumn('general_visit_id', 'varchar', [
            'limit'   => 36,
            'comment' => 'uuid7',
        ]);
        $this->setColumn('view_visit_id', 'varchar', [
            'limit'   => 36,
            'comment' => 'uuid7',
        ]);
        $this->setColumn('tel', 'varchar', []);
        $this->setColumn('email', 'varchar', []);
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
        // $this->table($this->name)->drop()->save();
    }
}
