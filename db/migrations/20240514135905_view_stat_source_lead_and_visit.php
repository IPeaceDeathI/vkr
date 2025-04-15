<?php

declare(strict_types=1);

require_once dirname(__DIR__, 2) . '/vendor/autoload.php';

use Noks\Migration\NoksMigration;

/**
 * @param \Noks\Model\View\Stat\Integration\Source\ViewStatSourceLeadAndVisitModel
 */
final class ViewStatSourceLeadAndVisit extends NoksMigration
{
    public string $name = 'v_stat_source_lead_and_visit';

    public function up(): void
    {
        // v_stat_integration_source_lead - все source лиды

        // visit +

        // log_view +

        $sql = "SELECT

        source_lead.id as lead_id,
        source_lead.integration_id,
        source_lead.type as source_type,
        source_lead.payload,
        source_lead.tel,
        source_lead.email,
        source_lead.created_at,
        source_lead.updated_at,

        lv.id as view_visit_id,
        lv.previous_id as previous_view_visit_id,
        lv.session_visit_id,
        lv.general_visit_id,
        lv.stat_id,
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


        FROM `v_stat_integration_source_lead` as `source_lead`

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
