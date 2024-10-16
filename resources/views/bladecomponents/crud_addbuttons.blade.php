<button id="saveAndNextButton" class="erpButton btn bg-green text-white">
    @component('svg_icons.create2') @slot('width') 24 @endslot @slot('height') 24 @endslot @slot('fill') #fff @endslot @endcomponent
    Save &amp; Next</button>
<button id="saveAndExitButton" type="button" class="erpButton btn bg-orange text-white">
    @component('svg_icons.create1') @slot('width') 24 @endslot @slot('height') 24 @endslot @slot('fill') #fff @endslot @endcomponent
    Save &amp; Exit</button>
<button id="clearButton" type="button" class="erpButton btn bg-black text-white">
    @component('svg_icons.clean') @slot('width') 24 @endslot @slot('height') 24 @endslot @slot('fill') #fff @endslot @endcomponent
    Clear</button>
<button id="closeButton" class="btn bg-red text-white" data-bs-dismiss="modal">
    @component('svg_icons.close') @slot('width') 24 @endslot @slot('height') 24 @endslot @slot('fill') #fff @endslot @endcomponent
    Close</button>
@endslot