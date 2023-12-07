package wat.wcy.TravelAgency.Controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import wat.wcy.TravelAgency.DTO.CityDTO;
import wat.wcy.TravelAgency.DTO.CountryDTO;
import wat.wcy.TravelAgency.Logic.CityService;
import wat.wcy.TravelAgency.Logic.CountryService;

import java.util.List;

@RequestMapping(value = "/Country")
@RestController
public class CountryController {

    private static final Logger logger = LoggerFactory.getLogger(CountryController.class);

    private  CountryService countryService;
    private  CityService cityService;

    public CountryController( CountryService countryService, CityService cityService) {
        this.countryService = countryService;
        this.cityService = cityService;
    }


    @GetMapping
    ResponseEntity<List<CountryDTO>> getCountries(){
        return ResponseEntity.ok(countryService.getCountries());
    }

    @GetMapping(path = "/Cities/{name}")
    ResponseEntity<List<CityDTO>> getCitiesInCountry(@PathVariable String name) {
        if(!countryService.isCountry(name)){
            ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(cityService.getCities(name));
    }


}
