package wat.wcy.TravelAgency.DTO;

import lombok.Value;
import wat.wcy.TravelAgency.model.Hotel;

@Value
public class HotelDTO {
     String name;
     Integer id;
     Integer starsCount;
     Double price;
     String description;

    public HotelDTO(Hotel source) {
        this.name = source.getName();
        this.id = source.getId();
        this.starsCount = source.getStarsCount();
        this.price = source.getPrice();
        this.description = source.getDescription();
    }
}
