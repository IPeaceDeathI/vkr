<?php

declare(strict_types=1);

require_once dirname(__DIR__, 2) . '/vendor/autoload.php';

use Noks\Migration\NoksMigration;

/**
 * @param \Noks\Model\View\UserFlowViewModel
 */
final class ViewUserFlow extends NoksMigration
{
    public string $name = 'v_user_flow';

    public function up(): void
    {
        $sql = 'SELECT
                u.user_id,
                u.user_tlgrm as user_tg_login,
                u.user_tlgrm_id as user_tg_chat_id,
                u.user_phone,
                u.user_email,
                u.user_fio as user_name,
                u.user_password,
                u.user_date_register as user_created_at,
                u.user_updated_at,

                f.flow_id,
                f.flow_balance,
                f.flow_name,
                f.flow_date as flow_created_at,
                f.flow_date_edit as flow_updated_at
            FROM `users` AS u
            JOIN flow_to_user AS fu
            ON u.user_id = fu.id_user
            
            JOIN flows AS f
            ON fu.id_flow = flow_id';

        $this->createView($sql);
    }

    public function down(): void
    {
        #$this->table($this->name)->drop()->save();
    }
}
