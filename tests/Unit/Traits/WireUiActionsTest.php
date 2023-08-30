<?php

use Mockery\Mock;
use Tests\Unit\{LivewireComponent, TestCase};
use WireUi\Actions\Dialog;

it('should emit a dialog event when the method dialog is called with a non empty array', function () {
    $event  = 'wireui:dialog';
    $params = [
        'options'     => ['title' => 'WireUI is awesome!'],
        'componentId' => 'fake-id',
    ];

    /** @var TestCase $this */
    $mock = $this->getMockBuilder(LivewireComponent::class)
        ->onlyMethods(['dispatch'])
        ->getMock();

    /** @var Mock|LivewireComponent $mock */
    $mock
        ->expects($this->once())
        ->method('dispatch')
        ->with($event, [
            'options' => [
                'title' => 'WireUI is awesome!',
                'icon'  => Dialog::INFO,
            ],
            'componentId' => 'fake-id',
        ]);

    $mock->dialog($params['options']);
});

it('should emit a notification event when the method notification is called with a non empty array', function () {
    $event  = 'wireui:notification';
    $params = [
        'options'     => ['title' => 'WireUI is awesome!'],
        'componentId' => 'fake-id',
    ];

    /** @var TestCase $this */
    $mock = $this->getMockBuilder(LivewireComponent::class)
        ->onlyMethods(['dispatch'])
        ->getMock();

    /** @var Mock|LivewireComponent $mock */
    $mock
        ->expects($this->once())
        ->method('dispatch')
        ->with($event, [
            'options'     => ['title' => 'WireUI is awesome!'],
            'componentId' => 'fake-id',
        ]);

    $mock->notification($params['options']);
});
