<?php

declare(strict_types=1);

require_once \dirname(__DIR__, 2) . '/vendor/autoload.php';

use Noks\Migration\NoksMigration;

/**
 * 
 */
final class ViewConstructor2BlockAndCategory extends NoksMigration
{
    public string $name = 'v_constructor_2_block_and_category';

    public function up(): void
    {
        $sql = 'SELECT
                    blocks.*,

                    `categories`.`category_id`,
                    `categories`.`category_name`,
                    `categories`.`category_position`,

                    IF(`favourites`.`block_id` is null, 0, 1) as `favourite`

                FROM `constructor2_blocks` AS `blocks`

                LEFT JOIN `constructor_block_category_links` AS `links`
                ON `links`.`block_id` = `blocks`.`id`

                LEFT JOIN `constructor_block_categories` AS `categories`
                ON `categories`.`category_id` = `links`.`category_id`

                LEFT JOIN `constructor_favourites_blocks` AS `favourites`
                ON `blocks`.`user_id` = `favourites`.`user_id` AND `blocks`.`id` = `favourites`.`block_id`
        ';

        $this->createView($sql);
    }

    public function down(): void
    {
        #$this->table($this->name)->drop()->save();
    }
}
