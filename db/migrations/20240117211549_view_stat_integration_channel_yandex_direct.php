<?php

declare(strict_types=1);

require_once dirname(__DIR__, 2) . '/vendor/autoload.php';

use Noks\Migration\NoksMigration;
use Noks\Enum\Stat\Integration\Channel\AdvChannelEnum;
use Noks\Enum\Stat\Integration\TypeIntegrationEnum;

final class ViewStatIntegrationChannelYandexDirect extends NoksMigration
{
    public string $name = 'v_stat_integration_channel_yandex_direct';

    public function up(): void
    {
        $type         = TypeIntegrationEnum::ADV_CHANNEL->v();
        $type_channel = AdvChannelEnum::YANDEX_DIRECT->v();

        $sql = "SELECT
        
            integration.id as integration_id,
            integration.stat_id,
            integration.type as integration_type,
            integration.created_at as integration_created_at,
            integration.created_at as integration_updated_at,

            channel.type as channel_type,
            channel.created_at as channel_created_at,
            channel.updated_at as channel_updated_at,

            ya.status,
            ya.name,
            ya.last_query_api,
            ya.created_at,
            ya.updated_at

        FROM stat_integration AS integration
        
        JOIN stat_integration_channel AS channel
        ON channel.type = {$type_channel} AND integration.id = channel.integration_id
        
        JOIN stat_integration_channel_yandex_direct as ya
        ON integration.id = ya.integration_id

        WHERE integration.type = {$type}
        ";

        $this->createView($sql);
    }

    public function down(): void
    {
        #$this->table($this->name)->drop()->save();
    }
}
