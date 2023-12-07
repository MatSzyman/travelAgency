package wat.wcy.TravelAgency.DTO;

import wat.wcy.TravelAgency.model.Country;

import java.util.Set;
import java.util.stream.Collectors;

//@Value
public class CountryDTO {

    String name;
    Set<CityDTO> cities;

    public CountryDTO(Country source) {
        this.name = source.getName();
        this.cities = source.getCities().stream().map(CityDTO::new).collect(Collectors.toSet());
    }

}
