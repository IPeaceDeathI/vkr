<?php

namespace Noks\Pay\Controller;

use Noks\Robokassa;
use Noks\Model\FakeProduct as MFakeProduct;
use Noks\Model\FinanceModel;
use Noks\BasicController;
use Noks\Validation\Pay as VPay;
use Noks\Env;
use Noks\Model\Flows as MFlows;
use Throwable;
use Noks\Error\Errors;


/**
 * купить тариф
 */
class Tariff extends BasicController
{
    private int $sum;
    private int $id_tariff;
    private $id_flow;

    function main($id_tariff)
    {
        try {
            $this->id_tariff = $id_tariff;
            $this->id_flow = \getCurFlow();
            $this->procces_main();
        } catch (Throwable $e) {
            \_writeLog($e);
            Errors::_500();
        }
    }

    function procces_main()
    {
        $this->check();
        // --------------------------------------------------------------------------
        $product_data = MFakeProduct::self()->getById($this->id_tariff);
        $product_data['DailyPayment'] = MFakeProduct::self()->getDailyPaymentTariff($this->id_tariff);
        // --------------------------------------------------------------------------
        // если есть баланс тогда переводим на ChangeTariff
        $data_flow = MFlows::self()->getById($this->id_flow);
        if ($data_flow['flow_balance'] > $product_data['DailyPayment']) {
            \redirect('/pay/change/' . $this->id_tariff);
        }
        // --------------------------------------------------------------------------
        $this->sum = $product_data['sum'];
        // --------------------------------------------------------------------------
        // Формируем заказ
        $order_id = FinanceModel::self()->create(\getCurUser(), $this->id_flow, $this->sum, $this->id_tariff);
        if ($order_id === false) {
            $code = $this->log('Не получилось сформировать заказ');
            \session()->put('errors', ['Не получилось сформировать заказ', $code]);
            \redirect('/pay/error');
        }
        // --------------------------------------------------------------------------
        $sign_send = Robokassa::createSignatureSend($this->sum, $order_id, $this->id_tariff);
        $url = Robokassa::createUrl(
            \number_format($this->sum, 6, '.', ''),
            $order_id,
            $this->id_tariff,
            $product_data['desc'] ?? '',
            $sign_send,
            Env::$rb_is_test ?? true
        );
        // --------------------------------------------------------------------------
        \redirect($url);
    }

    private function check()
    {
        $err = VPay::tariff([
            'id_tariff' => $this->id_tariff,
            'id_flow'   => $this->id_flow
        ]);
        if ($err) {
            $err[] = $this->log($err);
            \session()->put('errors', $err);
            \redirect('/pay/error');
        }
    }
}
