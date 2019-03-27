/// <reference types="@types/googlemaps" />
import { Directive, ElementRef, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[google-place]'
})
export class GooglePlacesDirective implements OnInit {
  private element: HTMLInputElement;
  @Output() onSelect: EventEmitter<any> = new EventEmitter();
  constructor(private elRef: ElementRef) {
    //elRef will get a reference to the element where
    //the directive is placed
    this.element = elRef.nativeElement;
  }

  ngOnInit() {
    var latlng = {lat: 32.7097, lng:-97.3681};
    var radius = 160934
    var bounds = new google.maps.Circle({center: latlng, radius: radius}).getBounds();
    const options = {
      types: ['address'],
      fields: ['formatted_address','address_components', 'geometry', 'name'],
      bounds: bounds,
      strictBounds: true
    }
    const autocomplete = new google.maps.places.Autocomplete(this.element, options);
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      this.onSelect.emit(autocomplete.getPlace());
    });
  }

}