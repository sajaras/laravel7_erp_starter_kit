<div id="{{$modalid}}"  data-bs-backdrop='static' data-bs-keyboard="false"  class="modal fade {{$modalclass}}" tabindex="-1" role="dialog" aria-labelledby="{{$modalid}}Area" aria-hidden="true">
    <div class="modal-dialog modal-xl {{$modaldialogclass}}" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title w-100 text-center" id="{{$modalid}}Title">{{$modaltitle}}</h5>
                <button type="button" class="" data-bs-dismiss="modal" aria-label="Close">
                    <!-- <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg> -->

                    @component('svg_icons.close2') @slot('width') 24 @endslot @slot('height') 24 @endslot  @endcomponent 
                </button>
            </div>
            <div class="modal-body">
                {{$modalbody}}
            </div>
            <div class="modal-footer">

                @if(isset($modalfooterleft))
                {{$modalfooterleft}}
                @endif

                {{$modalfooter}}
                
            </div>
        </div>
    </div>
</div>