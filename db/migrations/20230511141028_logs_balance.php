<?php

declare(strict_types=1);

require_once dirname(__DIR__, 2) . '/vendor/autoload.php';

use Noks\Enum\LogBalanceEnum;
use Noks\Migration\NoksMigration;

/**
 * @param \Noks\Model\LogBalanceModel
 */
final class LogsBalance extends NoksMigration
{
    public string $name = 'logs_balance';
    public array $settingTable = [
        'id' => false,
        'primary_key' => ['log_id'],
        'collation' => 'utf8mb4_unicode_ci',
        'encoding' => 'utf8mb4',
    ];

    public function up(): void
    {
        $this->setColumn('log_id', 'integer', [
            'identity' => true,
            'signed'   => false,
            'null'     => false,
        ]);
        $this->setColumn('log_id_flow', 'integer', [
            'null'   => false,
            'signed' => false,
        ]);
        $this->setColumn('log_action', 'tinyint', [
            'null'    => false,
            'signed'  => false,
            'comment' => LogBalanceEnum::class,
        ]);
        $this->setColumn('log_value', 'float', [
            'null'      => false,
            'signed'    => false,
            'precision' => 8,
            'scale'     => 2,
        ]);

        $this->createdAt('log_create');

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
