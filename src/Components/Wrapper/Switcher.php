<?php

namespace WireUi\Components\Wrapper;

use Illuminate\Contracts\View\View;
use WireUi\Traits\Components\HasSetupForm;
use WireUi\Traits\Components\InteractsWithErrors;
use WireUi\View\WireUiComponent;

class Switcher extends WireUiComponent
{
    use HasSetupForm;
    use InteractsWithErrors;

    protected array $props = [
        'error' => null,
        'label' => null,
        'errorless' => false,
        'left-label' => null,
        'shadowless' => false,
        'description' => null,
        'invalidated' => null,
        'with-validation-colors' => true,
    ];

    public function __construct(string $config)
    {
        $this->config = $config;
    }

    protected function processed(): void
    {
        if (filled($this->name) && is_null($this->invalidated)) {
            $this->invalidated = $this->errors()->has($this->name);
        }
    }

    protected function blade(): View
    {
        return view('wireui-wrapper::switcher');
    }
}
