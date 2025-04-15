<?php

declare(strict_types=1);

require_once dirname(__DIR__, 2) . '/vendor/autoload.php';

use Noks\Migration\NoksMigration;
use Noks\Enum\Stat\Integration\CRM\CRMEnum;
use Noks\Enum\Stat\Integration\TypeIntegrationEnum;

final class ViewStatIntegrationCRMAmoCRM extends NoksMigration
{
    public string $name = 'v_stat_integration_crm_amocrm';

    public function up(): void
    {
        $type     = TypeIntegrationEnum::CRM->v();
        $type_crm = CRMEnum::AMO_CRM->v();

        $sql = "SELECT
        
            integration.id as integration_id,
            integration.stat_id,
            integration.type as integration_type,
            integration.created_at as integration_created_at,
            integration.created_at as integration_updated_at,

            crm.type as crm_type,
            crm.created_at as crm_created_at,
            crm.updated_at as crm_updated_at,

            amocrm.status,
            amocrm.last_refresh,
            amocrm.last_refresh_pipeline,
            amocrm.last_refresh_user,
            amocrm.last_refresh_field,
            amocrm.last_refresh_status,
            amocrm.last_refresh_lead,
            amocrm.created_at,
            amocrm.updated_at

        FROM stat_integration AS integration
        
        JOIN stat_integration_crm AS crm
        ON crm.type = {$type_crm} AND integration.id = crm.integration_id
        
        JOIN stat_integration_crm_amocrm as amocrm
        ON integration.id = amocrm.integration_id

        WHERE integration.type = {$type}
        ";

        $this->createView($sql);
    }

    public function down(): void
    {
        #$this->table($this->name)->drop()->save();
    }
}
