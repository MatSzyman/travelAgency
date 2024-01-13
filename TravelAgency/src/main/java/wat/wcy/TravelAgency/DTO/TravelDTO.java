package wat.wcy.TravelAgency.DTO;

import lombok.Value;
import wat.wcy.TravelAgency.model.Travel;

import java.time.Instant;

@Value
public class TravelDTO {


    String name;
    Double basePrice;
    String description;
    Instant startSeason;
    Instant endSeason;
    Integer stars_count;
    String hotel_name;
    String city_name;
    Integer fileDataId;

    public TravelDTO(Travel travel){
        this.name = travel.getName();
        this.basePrice = travel.getBasePrice();
        this.description = travel.getDescription();
        this.startSeason = travel.getStartSeason();
        this.endSeason = travel.getEndSeason();
        this.stars_count = travel.getHotel().getStarsCount();
        this.hotel_name = travel.getHotel().getName();
        this.city_name = travel.getCity().getName();
        this.fileDataId = travel.getFileDataId();
    }

}
