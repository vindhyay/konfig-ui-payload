/// <reference types="@types/google.maps" />
import { Directive, ElementRef, EventEmitter, Output } from "@angular/core";
import PlaceResult = google.maps.places.PlaceResult;
import { AddressDetails } from "src/app/utils";
@Directive({
  selector: "[addressAutocomplete]",
})
export class AddressAutocompleteDirective {
  constructor(public elemRef: ElementRef) {}

  @Output()
  onAutocompleteSelected: EventEmitter<AddressDetails> = new EventEmitter<AddressDetails>();

  autoComplete: google.maps.places.Autocomplete;
  ngAfterViewInit() {
    this.initGoogleMapsAutocomplete();
  }

  public initGoogleMapsAutocomplete() {
    this.autoComplete = new google.maps.places.Autocomplete(
      this.elemRef.nativeElement.querySelector("input") as HTMLInputElement,
      {
        types: ["geocode"],
      }
    );

    this.autoComplete.setComponentRestrictions({
      country: ["us"],
    });

    this.autoComplete.setFields(["address_components"]);
    google.maps.event.addListener(this.autoComplete, "place_changed", () => {
      const place: PlaceResult = this.autoComplete.getPlace();
      const germanAddress: AddressDetails = {
        icon: place.icon,
        url: place.url,
        placeID: place.place_id,
        displayAddress: place.formatted_address,
        name: place.name,
        vicinity: place.vicinity,
        locality: {},
        state: {},
        country: {},
      };

      place.address_components.forEach((value) => {
        if (value.types.indexOf("street_number") > -1) {
          germanAddress.streetNumber = Number(value.short_name);
        }
        if (value.types.indexOf("route") > -1) {
          germanAddress.streetName = value.long_name;
        }
        if (value.types.indexOf("postal_code") > -1) {
          germanAddress.postalCode = Number(value.short_name);
        }
        if (value.types.indexOf("postal_code_suffix") > -1) {
          germanAddress.postalCodeSuffix = Number(value.short_name);
        }
        if (value.types.indexOf("sublocality") > -1) {
          germanAddress.sublocality = value.long_name;
        }
        if (value.types.indexOf("locality") > -1) {
          germanAddress.locality.value = value.long_name;
          germanAddress.locality.name = value.short_name;
        }
        if (value.types.indexOf("administrative_area_level_1") > -1) {
          germanAddress.state.value = value.long_name;
          germanAddress.state.name = value.short_name;
        }
        if (value.types.indexOf("country") > -1) {
          germanAddress.country.value = value.long_name;
          germanAddress.country.name = value.short_name;
        }
        if (value.types.indexOf("administrative_area_level_3") > -1) {
          germanAddress.locality.name = value.short_name;
        }
      });

      this.onAutocompleteSelected.emit(germanAddress);
    });
  }
}
