<?php

declare(strict_types=1);

require_once dirname(__DIR__, 2) . '/vendor/autoload.php';

use Noks\Migration\NoksMigration;

final class ViewStatYaDirect extends NoksMigration
{
    public string $name = 'v_stat_ya_direct';

    public function up(): void
    {
        $sql = "SELECT
            report.id,
            report.integration_id,
            report.type_report,

            integration.stat_id,

            ad_group.group_id,
            ad_group.name as group_name,
            
            campaign.campaign_id,
            campaign.name as campaign_name,
            campaign.status as campaign_status,
            campaign.is_master_campaign,

            channel.name as channel_name,
            channel.last_query_api as channel_last_query_api,

            ads.datetime_check_data_from_api as ad_datetime_check_data_from_api,
            ads.datetime_marking as ad_datetime_marking,
            ads.payload as ad_payload,

            report.ad_id,
            report.ad_network_type,
            report.avg_cpc,
            report.avg_page_views,
            report.clicks,
            report.conversions,
            report.criteria,
            report.criteria_id,
            report.is_autotargeting,
            report.ctr,
            report.date,
            report.impressions,
            report.total_consumption,
            report.percent_conversion,
            -- report.avg_cost_per_thousand_impressions,
            -- report.price_goal,
            report.created_at,
            report.updated_at

        FROM stat_ya_direct_report AS report

        JOIN stat_ya_direct_ads as ads
        ON report.ad_id = ads.ad_id

        JOIN stat_integration AS integration
        ON report.integration_id = integration.id
        
        JOIN stat_integration_channel_yandex_direct AS channel
        ON integration.id = channel.integration_id
        
        JOIN stat_ya_direct_ad_group_ad_links AS group_link
        ON report.ad_id = group_link.ad_id AND channel.integration_id = group_link.integration_id
        
        JOIN stat_ya_direct_ad_groups AS ad_group
        ON group_link.group_id = ad_group.group_id AND group_link.integration_id = ad_group.integration_id

        JOIN stat_ya_direct_campaign_ad_group_links AS campaign_link
        ON group_link.group_id = campaign_link.group_id AND group_link.integration_id = campaign_link.integration_id

        JOIN stat_ya_direct_campaigns AS campaign
        ON campaign_link.campaign_id = campaign.campaign_id AND campaign_link.integration_id = campaign.integration_id
        ";

        $this->createView($sql);
    }

    public function down(): void
    {
        #$this->table($this->name)->drop()->save();
    }
}
