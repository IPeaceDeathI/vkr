<?php

declare(strict_types=1);

require_once dirname(__DIR__, 2) . '/vendor/autoload.php';

use Noks\Migration\NoksMigration;
use Noks\Enum\Stat\Integration\CRM\CRMEnum;

/**
 * @param \Noks\Model\View\Stat\Integration\CRM\AmoCRM\ViewStatIntegrationCRMAmoCRMLinkSourceLeadModel
 * INFO для аналитики |
 * вьюха для обьединения лидов amo и source
 */
final class ViewStatCRMAmoCRMLinkSourceLead extends NoksMigration
{
    public string $name = 'v_stat_crm_amocrm_link_source_lead';

    public function up(): void
    {
        $crm_amo = CRMEnum::AMO_CRM->v();

        // stat_crm_amocrm_lead лида amo_crm

        // stat_crm_source_link_lead - связи между лидами crm  и лидами source

        // v_stat_integration_source_lead - все source лиды

        // visit +

        // log_view +

        $sql = "SELECT

        `amo_lead`.id as amo_lead_id,
        `amo_lead`.integration_id as amo_integration_id,
        `amo_lead`.responsible_user_id,
        `amo_lead`.status_id,
        `amo_lead`.pipeline_id,
        `amo_lead`.`name`,
        `amo_lead`.price,
        `amo_lead`.is_deleted,
        `amo_lead`.created_at,

        link.crm_type,
        link.source_type,

        source_lead.id as source_lead_id,
        source_lead.integration_id as source_integration_id,
        source_lead.payload as source_payload,
        source_lead.created_at as source_created_at,

        lv.source as source_view_visit,
        lv.source_domain_id,
        lv.source_path_id,
        -- INFO рекламный канал
        lv.stat_criteria_id as adv_channel_criteria_id,
        lv.stat_ad_id as adv_channel_ad_id,
        lv.stat_group_id as adv_channel_group_id,
        lv.stat_ad_network_type as adv_channel_ad_network_type,
        lv.stat_campaign_id as adv_channel_campaign_id,
        lv.stat_integration_id as adv_channel_integration_id


        FROM `stat_crm_amocrm_lead` as `amo_lead`


        -- INFO Связь CRM <=> Source
        JOIN stat_crm_source_link_lead as link
        -- INFO сравнивать типы скорее всего лишнее
        ON link.crm_type                = {$crm_amo}
            AND link.crm_integration_id = `amo_lead`.integration_id
            AND link.crm_lead_id        = `amo_lead`.id

        -- INFO Все лиды source
        JOIN v_stat_integration_source_lead as source_lead
        -- INFO сравнивать типы скорее всего лишнее
        ON link.source_type                = source_lead.type
            AND link.source_integration_id = source_lead.integration_id
            AND link.source_lead_id        = source_lead.id

        -- TODO пока не знаю нужен ли он, скорее всего он потребуется когда будет атрибуция
        -- LEFT JOIN visit as v
        -- ON source_lead.general_visit_id = v.visit_id

        LEFT JOIN log_view as lv
        ON source_lead.view_visit_id = lv.id
        ";

        $this->createView($sql);
    }

    public function down(): void
    {
        #$this->table($this->name)->drop()->save();
    }
}
