package wat.wcy.TravelAgency.DTO;

import lombok.Value;
import wat.wcy.TravelAgency.model.City;

@Value
public class CityDTO {
    Integer id;
    String name;

    public CityDTO(City source) {
        this.id = source.getId();
        this.name = source.getName();
    }

}
