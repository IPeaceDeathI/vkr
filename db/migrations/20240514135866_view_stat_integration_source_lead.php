<?php

declare(strict_types=1);

require_once \dirname(__DIR__, 2) . '/vendor/autoload.php';

use Noks\Migration\NoksMigration;
use Noks\Enum\Stat\Integration\Source\SourceEnum;

/**
 * @param \Noks\Model\View\Stat\Integration\Source\ViewStatIntegrationSourceLeadModel
 * 
 * обьединяем все лиды всех интеграция source
 */
final class ViewStatIntegrationSourceLead extends NoksMigration
{
    public string $name = 'v_stat_integration_source_lead';
    public array $settingTable = [
        'id'          => false,
        // 'primary_key' => ['id'],
        'collation'   => 'utf8mb4_unicode_ci',
        'encoding'    => 'utf8mb4',
    ];

    public array $my_indices = [];

    public function up(): void
    {
        $noks    = SourceEnum::NOKS_SITE->v();
        $webhook = SourceEnum::WEBHOOK->v();
        $webhook_flexbe = SourceEnum::WEBHOOK_FLEXBE->v();
        $webhook_tilda = SourceEnum::WEBHOOK_TILDA->v();

        $sql = "SELECT
            id,
            integration_id,
            general_visit_id,
            view_visit_id,
            {$noks} as `type`,
            tel,
            email,
            payload,
            created_at,
            updated_at
        FROM `stat_source_noks_lead` as `noks`

        UNION

        SELECT
            id,
            integration_id,
            general_visit_id,
            view_visit_id,
            {$webhook} as `type`,
            tel,
            email,
            payload,
            created_at,
            updated_at
        FROM `stat_source_webhook_lead` as `webhook`

        UNION

        SELECT
            id,
            integration_id,
            general_visit_id,
            view_visit_id,
            {$webhook_flexbe} as `type`,
            tel,
            email,
            payload,
            created_at,
            updated_at
        FROM `stat_source_webhook_flexbe_lead` as `webhook_flexbe`

        UNION

        SELECT
            id,
            integration_id,
            general_visit_id,
            view_visit_id,
            {$webhook_tilda} as `type`,
            tel,
            email,
            payload,
            created_at,
            updated_at
        FROM `stat_source_webhook_tilda_lead` as `webhook_tilda`
        ";

        $this->createView($sql);
    }

    public function down(): void
    {
        #$this->table($this->name)->drop()->save();
    }
}
