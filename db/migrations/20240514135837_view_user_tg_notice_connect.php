<?php

declare(strict_types=1);

require_once \dirname(__DIR__, 2) . '/vendor/autoload.php';

use Noks\Migration\NoksMigration;
use Noks\Enum\EntityTypeEnum;

/**
 * @param \Noks\Model\View\UserTgNoticeConnectModel
 * 
 */
final class ViewUserTgNoticeConnect extends NoksMigration
{
    public string $name = 'v_user_tg_notice_connect';
    public array $settingTable = [
        'id'          => false,
        // 'primary_key' => ['id'],
        'collation'   => 'utf8mb4_unicode_ci',
        'encoding'    => 'utf8mb4',
    ];

    public array $my_indices = [];

    public function up(): void
    {
        $site = EntityTypeEnum::SITE->v();
        $flow = EntityTypeEnum::FLOW->v();

        $sql = "SELECT
                n_lead.id,
                n_lead.site_id AS entity_id,
                \"{$site}\" AS entity_type,
                n_lead.chat_id,
                n_lead.tg_user_id,
                n_lead.created_at,
                n_lead.updated_at,

                u.show_name,
                u.hash_username,
                u.username,
                u.first_name,
                u.last_name,
                u.url_avatar,
                u.payload

            FROM user_telegram_notice_lead as n_lead
            JOIN `users_tg` as u
            ON n_lead.tg_user_id = u.id

            UNION

            SELECT
                n_flow.id,
                n_flow.flow_id AS entity_id,
                \"{$flow}\" AS entity_type,
                n_flow.chat_id,
                n_flow.tg_user_id,
                n_flow.created_at,
                n_flow.updated_at,

                u.show_name,
                u.hash_username,
                u.username,
                u.first_name,
                u.last_name,
                u.url_avatar,
                u.payload

            FROM user_telegram_notice_flow as n_flow
            JOIN `users_tg` as u
            ON n_flow.tg_user_id = u.id
        ";

        $this->createView($sql);
    }

    public function down(): void
    {
        #$this->table($this->name)->drop()->save();
    }
}
