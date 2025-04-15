<?php

namespace Noks\Pay\Controller;

use Noks\Trait\TempAddCSSAddJSForHeadFooter;
use Noks\BasicController;
use Noks\Error\Errors;
use Noks\Helper\DateTime;
use Throwable;
// ------------------------------------------------------------------
// Service
// ------------------------------------------------------------------
use Noks\Service\Rights\TariffAdditionService;
// ------------------------------------------------------------------
// Model
// ------------------------------------------------------------------
use Noks\Model\LogBalanceModel;
use Noks\Model\FakeProduct;
use Noks\Model\Tariff as MTariff;
use Noks\Model\TariffOptions as MTariffOptions;
// ------------------------------------------------------------------
// Enum
// ------------------------------------------------------------------
use Noks\Enum\Rights\Option\TariffAddition\TariffAdditionSiteCountOptionEnum;
use Noks\Enum\Rights\Option\TariffAddition\TariffAdditionUserCountOptionEnum;
use Noks\Enum\LogBalanceEnum;


class Index extends BasicController
{
    use TempAddCSSAddJSForHeadFooter;

    private $flow_id;

    function main()
    {
        try {
            $this->flow_id = getCurrentFlow();
            $this->procces_main();
        } catch (Throwable $e) {
            writeLog(self::class, CollectDataException($e));
            Errors::_500();
        }
    }

    private function procces_main()
    {
        $data_tariff = MTariff::getByIdFlow($this->flow_id);
        if (sizeof($data_tariff) === 0) {
            MTariff::create([
                'tariff_flow_id' => $this->flow_id
            ]);
            $data_tariff = MTariff::getByIdFlow($this->flow_id);
        }
        $logs = $this->handleLog(LogBalanceModel::self()->getAllByFlowID($this->flow_id));
        $useTestTariff = MTariff::checkActiveTrial($this->flow_id) || MTariff::checkFullyUsedTrial($this->flow_id);
        $allTariff = FakeProduct::self()->getAllTariff();
        // ---------------------------
        // получаем текущие тарифные опции
        $data_tariff_options = $this->getCurrentTariffOptions();
        // платные опции
        $tariff_options = $this->getTariffOptions();

        // de($tariff_options);
        $this->view(
            $logs,
            $useTestTariff,
            $allTariff,
            $data_tariff,
            $tariff_options,
            $data_tariff_options
        );
        exit();
    }

    private function getTariffOptions(): array
    {
        $tariff_options = FakeProduct::self()->getAllTariffOption();
        $tariff_options = \array_filter($tariff_options, fn ($a) => ($a['show'] ?? true));
        if (isset($tariff_options[FakeProduct::OPTION_COUNT_USER])) {
            $tariff_options[FakeProduct::OPTION_COUNT_USER] = $this->handleTariffOptionCountUser($tariff_options[FakeProduct::OPTION_COUNT_USER]);
        }
        if (isset($tariff_options[FakeProduct::OPTION_COUNT_SITE])) {
            $tariff_options[FakeProduct::OPTION_COUNT_SITE] = $this->handleTariffOptionCountSite($tariff_options[FakeProduct::OPTION_COUNT_SITE]);
        }

        return $tariff_options;
    }

    private function getCurrentTariffOptions(): array
    {
        $data_tariff_options = MTariffOptions::getByIdFlow($this->flow_id);
        $data_tariff_options = array_combine(
            array_column($data_tariff_options, 'option_product_id'),
            $data_tariff_options
        );
        $s = new TariffAdditionService;
        // если есть тарифные опции для текущего тарифа, то определяем цену
        foreach ($data_tariff_options as $k => $data) {
            $value = $s->getValueByOptionID($data['option_value']);
            $data_product = FakeProduct::self()->getById($data['option_product_id']);
            $data_tariff_options[$k]['price'] = FakeProduct::self()->calculateTotalPrice($value, $data_product['sum']);
        }

        return $data_tariff_options;
    }

    private function handleTariffOptionCountUser($data_option)
    {
        $option_value = TariffAdditionUserCountOptionEnum::getAllRightsAndValue();
        $data_option['option_select'] = [];
        // по аналогии с handleTariffOptionCountSite
    }

    private function handleTariffOptionCountSite($data_option): array
    {
        $option_value = TariffAdditionSiteCountOptionEnum::getAllRightsAndValue();
        $data_option['option_select'] = [];
        foreach ($option_value as $rights_option => $value) {
            $data_product = FakeProduct::self()->getById(FakeProduct::OPTION_COUNT_SITE);
            $data_option['option_select'][] = [
                'rights_option' => $rights_option,
                'value' => $value,
                'price' => FakeProduct::self()->calculateTotalPrice($value, $data_product['sum']),
            ];
        }
        return $data_option;
    }

    private function handleLog($logs)
    {
        foreach ($logs as $key => $log) {
            $logs[$key]['log_msg'] = LogBalanceEnum::from($log['log_action'])->getMsg();
            $logs[$key]['log_create_unix'] = DateTime::getUnix('Y-m-d H:i:s', $log['log_create']);
            $logs[$key]['log_create_date'] = date('d.m.Y', $logs[$key]['log_create_unix']);
            $logs[$key]['log_create_time'] = date('H:i', $logs[$key]['log_create_unix']);
        }
        return $logs;
    }

    private function view(
        $logs,
        $useTestTariff,
        $allTariff,
        $data_tariff,
        $tariff_options,
        $data_tariff_options
    ) {
        self::setResource();
        // addCSS(SITE_URL . 'resource/css/jquery-confirm.min.css');
        // addCSS(MAIN_URL . '/pay/resource/css/index.css');
        // 
        // addJS(SITE_URL . 'resource/js/jquery-confirm.min.js');
        // addJS(MAIN_URL . '/pay/resource/js/pay.js');
        $title = 'Оплата';
        $description = '';
        include VERSION . '/admin/components/head.php';
        include VERSION . '/admin/view/user/pay_invoices.php';
        include VERSION . '/admin/components/footer.php';
    }
}


$site = new Index;
$site->main();
