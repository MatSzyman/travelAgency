package wat.wcy.TravelAgency.DTO;

import lombok.Value;
import wat.wcy.TravelAgency.model.City;

@Value
public class CityDTO {

    String name;

    public CityDTO(City source) {
        this.name = source.getName();
    }

}