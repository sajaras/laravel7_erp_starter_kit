<div class="simple-pill">

<ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">

    
    <li class="nav-item" role="presentation">
        <button class="nav-link active text-black" id="{{$represents}}pills-1-icon-tab" data-bs-toggle="pill" data-bs-target="#{{$represents}}pills-1-icon" type="button" role="tab" aria-controls="{{$represents}}pills-1-icon" aria-selected="true">
        
                {{$tab1}}
        </button>
    </li>

    @if(isset($tab2))
    <li class="nav-item" role="presentation">
        <button class="nav-link text-black" id="{{$represents}}pills-2-icon-tab" data-bs-toggle="pill" data-bs-target="#{{$represents}}pills-2-icon" type="button" role="tab" aria-controls="{{$represents}}pills-2-icon" aria-selected="false">
        {{$tab2}}
        </button>
    </li>
    @endif

    @if(isset($tab3))
    <li class="nav-item" role="presentation">
        <button class="nav-link text-black" id="{{$represents}}pills-3-icon-tab" data-bs-toggle="pill" data-bs-target="#{{$represents}}pills-3-icon" type="button" role="tab" aria-controls="{{$represents}}pills-2-icon" aria-selected="false">
        {{$tab3}}
        </button>
    </li>
    @endif

    @if(isset($tab4))
    <li class="nav-item" role="presentation">
        <button class="nav-link text-black" id="{{$represents}}pills-4-icon-tab" data-bs-toggle="pill" data-bs-target="#{{$represents}}pills-4-icon" type="button" role="tab" aria-controls="{{$represents}}pills-2-icon" aria-selected="false">
        {{$tab4}}
        </button>
    </li>
    @endif

</ul>
<div class="tab-content" id="pills-tabContent">

    <div class="tab-pane fade show active" id="{{$represents}}pills-1-icon" role="tabpanel" aria-labelledby="{{$represents}}pills-1-icon-tab" tabindex="0">

                          {{$tab1content}}

    </div>

    @if(isset($tab2))
    <div class="tab-pane fade" id="{{$represents}}pills-2-icon" role="tabpanel" aria-labelledby="{{$represents}}pills-2-icon-tab" tabindex="0">
     {{$tab2content}}
    </div>
    @endif

    @if(isset($tab3))
    <div class="tab-pane fade" id="{{$represents}}pills-3-icon" role="tabpanel" aria-labelledby="{{$represents}}pills-3-icon-tab" tabindex="0">
     {{$tab3content}}
    </div>
    @endif

    @if(isset($tab4))
    <div class="tab-pane fade" id="{{$represents}}pills-4-icon" role="tabpanel" aria-labelledby="{{$represents}}pills-4-icon-tab" tabindex="0">
     {{$tab4content}}
    </div>
    @endif

</div>

</div>