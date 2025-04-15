<?php

declare(strict_types=1);

require_once dirname(__DIR__, 2) . '/vendor/autoload.php';

use Noks\Migration\NoksMigration;
use Noks\Enum\Stat\Integration\Channel\YandexDirect\AdNetworkTypeEnum;
use Noks\Enum\Stat\Integration\Channel\YandexDirect\AutoTargetingEnum;
use Noks\Enum\Stat\Integration\Channel\YandexDirect\APITypeReportEnum;

final class StatYaDirectReport extends NoksMigration
{
    public string $name = 'stat_ya_direct_report';
    public array $settingTable = [
        'id' => false,
        'primary_key' => ['id'],
        'collation' => 'utf8mb4_unicode_ci',
        'encoding' => 'utf8mb4',
    ];

    public array $my_indices = [
        [
            'columns' => [
                'integration_id',
                'date',
                'criteria_id',
                'ad_id',
                'ad_network_type',
            ],
            'options' => [
                'unique' => true,
            ],
        ],
    ];

    public function up(): void
    {
        $this->setColumn('id', 'bigint', [
            'null' => false,
            'identity' => true,
            'signed' => false,
        ]);
        $this->setColumn('integration_id', 'int', [
            'null'   => false,
            'signed' => false,
        ]);
        $this->setColumn('type_report', 'tinyint', [
            'signed' => false,
            'null' => false,
            'comment' => APITypeReportEnum::class,
        ]);
        $this->setColumn('ad_format', 'varchar', [
            'comment' => 'AdFormat',
        ]);
        $this->setColumn('ad_group_id', 'bigint', [
            'signed' => false,
            'comment' => 'AdGroupId',
        ]);
        $this->setColumn('ad_group_name', 'varchar', [
            'comment' => 'AdGroupName',
        ]);
        $this->setColumn('ad_id', 'bigint', [
            'signed' => false,
            'comment' => 'AdId',
        ]);
        $this->setColumn('ad_network_type', 'tinyint', [
            'signed' => false,
            'comment' => 'AdNetworkType - Тип площадки - ' . AdNetworkTypeEnum::class,
        ]);
        $this->setColumn('age', 'varchar', [
            'comment' => 'Age Возрастная группа пользователя: одно из значений AGE_0_17, AGE_18_24, AGE_25_34, AGE_35_44, AGE_45, AGE_45_54, AGE_55 или UNKNOWN. В статистике за период до 21.08.2018 выводится значение AGE_45, за период после 21.08.2018 — значения AGE_45_54 и AGE_55. В статистике за период, включающий 21.08.2018, часть строк может содержать значение AGE_45, часть — значение AGE_45_54 или AGE_55.',
        ]);
        $this->setColumn('avg_click_position', 'varchar', [
            'comment' => 'AvgClickPosition Средняя позиция, на которой произошел клик по объявлению. При расчете учитываются только клики на первой странице результатов поиска Яндекса. Наивысшая позиция имеет номер 1.',
        ]);
        $this->setColumn('avg_cpc', 'varchar', [
            'comment' => 'AvgCpc price Средняя стоимость клика',
        ]);
        $this->setColumn('avg_impression_position', 'varchar', [
            'comment' => 'AvgImpressionPosition Средняя позиция показа объявления. При расчете учитываются только показы на первой странице результатов поиска Яндекса. Наивысшая позиция имеет номер 1.',
        ]);
        $this->setColumn('avg_page_views', 'varchar', [
            'comment' => 'AvgPageviews Средняя глубина просмотра сайта, то есть количество просмотренных страниц (по данным Яндекс Метрики).',
        ]);
        $this->setColumn('avg_traffic_volume', 'varchar', [
            'comment' => 'AvgTrafficVolume Средний объем трафика с позиций, на которых были показы объявления.',
        ]);
        $this->setColumn('bounce_rate', 'varchar', [
            'comment' => 'BounceRate percent Доля отказов в общем количестве визитов, в процентах',
        ]);
        $this->setColumn('bounces', 'bigint', [
            'signed' => false,
            'comment' => 'Bounces int Количество отказов',
        ]);
        $this->setColumn('campaign_id', 'bigint', [
            'signed' => false,
            'comment' => 'CampaignId',
        ]);
        $this->setColumn('campaign_name', 'varchar', [
            'comment' => 'CampaignName',
        ]);
        $this->setColumn('campaign_type', 'varchar', [
            'comment' => 'CampaignType',
        ]);
        $this->setColumn('carrier_type', 'varchar', [
            'comment' => 'CarrierType Тип связи: CELLULAR — мобильная связь; STATIONARY — wi-fi или проводной интернет; UNKNOWN — определить не удалось.',
        ]);
        $this->setColumn('clicks', 'bigint', [
            'signed' => false,
            'comment' => 'Clicks int Количество кликов',
        ]);
        $this->setColumn('click_type', 'varchar', [
            'comment' => 'ClickType',
        ]);
        $this->setColumn('conversions', 'bigint', [
            'signed' => false,
            'comment' => 'Conversions int Количество целевых визитов',
        ]);
        $this->setColumn('conversion_rate', 'varchar', [
            'comment' => 'ConversionRate percent Отношение количества целевых визитов к количеству кликов, в процентах',
        ]);
        $this->setColumn('cost', 'varchar', [
            'comment' => 'Cost price Стоимость кликов',
        ]);
        $this->setColumn('cost_per_conversion', 'varchar', [
            'comment' => 'CostPerConversion price Средняя стоимость целевого визита (по данным Яндекс Метрики): отношение стоимости кликов к количеству целевых визитов',
        ]);
        $this->setColumn('criteria', 'varchar', [
            'comment' => 'Criteria',
        ]);
        $this->setColumn('is_autotargeting', 'tinyint', [
            'null' => false,
            'signed' => false,
            'comment' => AutoTargetingEnum::class,
        ]);
        $this->setColumn('criteria_id', 'bigint', [
            'signed' => false,
            'comment' => 'CriteriaId',
        ]);
        $this->setColumn('criteria_type', 'varchar', [
            'comment' => 'CriteriaType',
        ]);
        $this->setColumn('criterion', 'varchar', [
            'comment' => 'Criterion',
        ]);
        $this->setColumn('criterion_id', 'varchar', [
            'comment' => 'CriterionId',
        ]);
        $this->setColumn('criterion_type', 'varchar', [
            'comment' => 'CriterionType',
        ]);
        $this->setColumn('ctr', 'varchar', [
            'comment' => 'Ctr percent',
        ]);
        $this->setColumn('date', 'date', [
            'comment' => 'Date',
        ]);
        $this->setColumn('device', 'varchar', [
            'comment' => 'Device',
        ]);
        $this->setColumn('external_network_name', 'varchar', [
            'comment' => 'ExternalNetworkName',
        ]);
        $this->setColumn('gender', 'varchar', [
            'comment' => 'Gender',
        ]);
        $this->setColumn('goals_roi', 'varchar', [
            'comment' => 'GoalsRoi',
        ]);
        $this->setColumn('impressions', 'bigint', [
            'signed' => false,
            'comment' => 'Impressions int - Количество показов',
        ]);
        $this->setColumn('impression_share', 'varchar', [
            'comment' => 'ImpressionShare',
        ]);
        $this->setColumn('location_of_presence_id', 'bigint', [
            'signed' => false,
            'comment' => 'LocationOfPresenceId Идентификатор региона местонахождения пользователя',
        ]);
        $this->setColumn('location_of_presence_name', 'varchar', [
            'comment' => 'LocationOfPresenceName Название региона местонахождения пользователя',
        ]);
        $this->setColumn('match_type', 'varchar', [
            'comment' => 'MatchType',
        ]);
        $this->setColumn('mobile_platform', 'varchar', [
            'comment' => 'MobilePlatform',
        ]);
        $this->setColumn('month', 'varchar', [
            'comment' => 'Month',
        ]);
        $this->setColumn('placement', 'varchar', [
            'comment' => 'Placement Название площадки показов',
        ]);
        $this->setColumn('quarter', 'varchar', [
            'comment' => 'Quarter',
        ]);
        $this->setColumn('query', 'text', [
            'comment' => 'Query',
        ]);
        $this->setColumn('query_hash', 'varchar', [
            'comment' => 'Hash Query',
            'limit' => 40,
        ]);
        $this->setColumn('revenue', 'varchar', [
            'comment' => 'Revenue',
        ]);
        $this->setColumn('rl_adjustment_id', 'varchar', [
            'comment' => 'RlAdjustmentId',
        ]);
        $this->setColumn('sessions', 'bigint', [
            'signed' => false,
            'comment' => 'Sessions int Количество визитов',
        ]);
        $this->setColumn('slot', 'varchar', [
            'comment' => 'Slot',
        ]);
        $this->setColumn('targeting_location_id', 'bigint', [
            'signed' => false,
            'comment' => 'TargetingLocationId',
        ]);
        $this->setColumn('targeting_location_name', 'varchar', [
            'comment' => 'TargetingLocationName',
        ]);
        $this->setColumn('week', 'varchar', [
            'comment' => 'Week',
        ]);
        $this->setColumn('year', 'varchar', [
            'comment' => 'Year',
        ]);
        $this->setColumn('weighted_impressions', 'varchar', [
            'comment' => 'WeightedImpressions',
        ]);
        $this->setColumn('weighted_ctr', 'varchar', [
            'comment' => 'WeightedCtr',
        ]);
        $this->setColumn('profit', 'varchar', [
            'comment' => 'Profit',
        ]);
        $this->setColumn('avg_effective_bid', 'varchar', [
            'comment' => 'AvgEffectiveBid',
        ]);
        $this->setColumn('matched_keyword', 'varchar', [
            'comment' => 'MatchedKeyword',
        ]);
        $this->setColumn('total_consumption', 'varchar', [
            'comment' => 'computed price',
        ]);
        $this->setColumn('percent_conversion', 'varchar', [
            'comment' => 'computed percent',
        ]);
        $this->setColumn('avg_cost_per_thousand_impressions', 'varchar', [
            'comment' => 'возможно на удаление | computed price',
        ]);
        $this->setColumn('price_goal', 'varchar', [
            'comment' => 'возможно на удаление | computed price',
        ]);
        $this->createdAt();
        $this->updatedAt();

        if ($this->hasTable($this->name)) {
            $this->updateTable();
            $this->removeUnnecessaryColumns();
            $this->addIndicesTable();
            return;
        }

        $this->createTable();
        $this->updateTable();
        $this->addIndicesTable();
    }

    public function down(): void
    {
        #$this->table($this->name)->drop()->save();
    }
}
