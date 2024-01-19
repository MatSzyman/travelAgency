package wat.wcy.TravelAgency.DTO;

import lombok.Value;
import wat.wcy.TravelAgency.model.City;

import java.util.Set;
import java.util.stream.Collectors;

@Value
public class CityDTO {
    Integer id;
    String name;
    Set<HotelDTO> hotels;

    public CityDTO(City source) {
        this.id = source.getId();
        this.name = source.getName();
        this.hotels = source.getHotels().stream().map(HotelDTO::new).collect(Collectors.toSet());
    }

    public Integer getId() {
        return id;
    }

    public String getName() {
        return name;
    }
}
