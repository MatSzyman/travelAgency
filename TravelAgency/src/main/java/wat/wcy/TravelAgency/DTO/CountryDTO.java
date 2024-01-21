package wat.wcy.TravelAgency.DTO;

import lombok.Value;
import wat.wcy.TravelAgency.model.Country;

import java.util.Set;
import java.util.stream.Collectors;

@Value
public class CountryDTO {

    Integer id;
    String name;
    Set<CityDTO> cities;

    public CountryDTO(Country source) {
        this.id  =source.getId();
        this.name = source.getName();
        this.cities = source.getCities().stream().map(CityDTO::new).collect(Collectors.toSet());
    }

    public Integer getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public Set<CityDTO> getCities() {
        return cities;
    }
}
