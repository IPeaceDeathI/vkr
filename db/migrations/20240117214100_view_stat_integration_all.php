<?php

declare(strict_types=1);

require_once dirname(__DIR__, 2) . '/vendor/autoload.php';

use Noks\Migration\NoksMigration;

final class ViewStatIntegrationAll extends NoksMigration
{
    public string $name = 'v_stat_integration_all';

    public function up(): void
    {
        $sql = "SELECT
            stat.flow_id,
            stat.hash_stat_id,
            stat.num_hash_stat_id,
        
            integration.stat_id,
            integration.id as integration_id,
            integration.type as integration_type,
            integration.created_at as integration_created_at,
            integration.created_at as integration_updated_at,

            COALESCE(channel.type, crm.type, source.type) as `type`,
            COALESCE(channel.created_at, crm.created_at, source.created_at) as created_at,
            COALESCE(channel.updated_at, crm.updated_at, source.updated_at) as updated_at

        FROM stat_integration AS integration

        JOIN stat
        ON integration.stat_id = stat.stat_id
        
        LEFT JOIN stat_integration_channel AS channel
        ON integration.id = channel.integration_id

        LEFT JOIN stat_integration_crm AS crm
        ON integration.id = crm.integration_id

        LEFT JOIN stat_integration_source AS source
        ON integration.id = source.integration_id
        ";

        $this->createView($sql);
    }

    public function down(): void
    {
        #$this->table($this->name)->drop()->save();
    }
}
