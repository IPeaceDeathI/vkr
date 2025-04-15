<?php

namespace Noks\Quiz\Controller;

use Noks\Model\Quiz as MQuiz;
use Noks\Trait\APIMethods;
use Noks\Validation\Decorator;
use Throwable;

class SaveQuiz
{
    use APIMethods;

    function main()
    {
        try {
            $this->setRequest();
            $this->request['flow_id'] = getCurrentFlow();
            $this->request['user_id'] = getCurrentUser();
            $this->responseSuccess($this->process());
        } catch (Throwable $e) {
            $code = _writeLog(($e));
            $this->responseError([\get_class($e), $code]);
        }
    }

    private function check()
    {
        if (!_json()->isJSONAsArray($this->request['data'])) $this->responseError('Данные "data:json" не получены');
        $this->request = $this->request + json_decode($this->request['data'], true);
        unset($this->request['data']);

        $validator = new Decorator($this->request, [
            'ques' => 'required|array',

            'ques.*.id_type' => 'required|numeric',

            'ques.*.data_ques'              => 'required|array',
            'ques.*.data_ques.*.answer'     => 'nullable|max:255',
            'ques.*.data_ques.*.other_text' => 'nullable|max:255',
            'ques.*.data_ques.*.url'        => 'nullable|max:255',

            'ques.*.data_stg'                    => 'required|array',
            'ques.*.data_stg.not_necessary'      => 'required|boolean',
            'ques.*.data_stg.internal_name'      => 'required|boolean',
            'ques.*.data_stg.long'               => 'nullable|boolean',
            'ques.*.data_stg.many'               => 'required|boolean',
            'ques.*.data_stg.your_answer'        => 'required|boolean',
            'ques.*.data_stg.internal_name_text' => 'nullable|max:255',
            'ques.*.data_stg.your_answer_text'   => 'nullable|max:255',
            'ques.*.data_stg.ques_id_target'     => 'nullable|max:100',

            'ques.*.data_choice'          => 'required|array',
            'ques.*.data_choice.position' => 'required|integer',
            'ques.*.data_choice.title'    => 'required|max:255',
            'ques.*.data_choice.hidden'   => 'required|boolean',

            'setting'                => 'required|array',
            'setting.title'          => 'nullable|max:255',
            'setting.desc'           => 'nullable|max:1000',
            'setting.title_btn'      => 'nullable|max:50',
            'setting.form_id_target' => 'required|max:100',

            'title'   => 'nullable|max:100',
            'id_quiz' => 'nullable|integer|min:1',
            'flow_id' => [
                function ($id) {
                    if ($id == -1) return 'Не найден проект';
                    return true;
                }
            ],
            'user_id' => [
                function ($id) {
                    if ($id == -1) return 'Не найден пользователь';
                    return true;
                }
            ],
        ]);

        $res = $validator->get_result();
        $err = [];
        \array_walk_recursive($res, function ($e) use (&$err) {
            if (\is_string($e)) $err[] = $e;
        });
        unset($res);
        if ($err) $this->responseError($err);
    }

    private function process()
    {
        $this->check();
        // ------------------------------------------------
        // обработка данных квиза
        $handle_data = $this->prepareData($this->request);
        // ------------------------------------------------
        $this->request['id_quiz'] = $handle_data['id_quiz'] ?? null;
        // ------------------------------------------------
        // Создать квиз
        if (!isInt($this->request['id_quiz'])) $this->create($handle_data);
        // изменение квиза
        else {
            $quiz_data = MQuiz::getById($this->request['id_quiz']);
            if (!$quiz_data) $this->responseError(['Квиз с ID: ' . $this->request['id_quiz'] . ' не был найден.']);
            $this->update($handle_data);
        }
        // ------------------------------------------------
        return ['id_quiz' => $this->request['id_quiz']];
    }

    private function update($handle_data)
    {
        MQuiz::update(
            $this->request['id_quiz'],
            $this->request['flow_id'],
            $handle_data['ques'],
            $handle_data['title'],
            $handle_data['count_ques'],
            $handle_data['setting']
        );
        if (MQuiz::hasErrors()) {
            $err = MQuiz::getErrors();
            $err[] = _writeLog($err);
            $this->responseError($err);
        }
    }

    private function create($handle_data)
    {
        $this->request['id_quiz'] = MQuiz::create(
            $this->request['user_id'],
            $this->request['flow_id'],
            $handle_data['ques'],
            $handle_data['title'],
            $handle_data['count_ques'],
            $handle_data['setting']
        );
        if (MQuiz::hasErrors()) {
            $err = MQuiz::getErrors();
            $err[] = _writeLog($err);
            $this->responseError($err);
        }
        //------------------------------------------------
        if ($this->request['id_quiz'] == -1) {
            $err = ['id_quiz unknown'];
            $err[] = _writeLog($err);
            $this->responseError($err);
        }
    }

    /**
     * обработка данных квиза
     */
    private function prepareData(array $data): array
    {
        return [
            'ques' => json_encode($data['ques']),
            'setting' => json_encode($data['setting']),
            'title' => trim($data['title']),
            'count_ques' => sizeof($data['ques']),
            'id_quiz' => $data['id_quiz'] ?? null
        ];
    }
}
