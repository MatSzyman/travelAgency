package wat.wcy.TravelAgency.DTO;

import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.Value;
import wat.wcy.TravelAgency.model.Travel;

import java.time.Instant;

@Value
@RequiredArgsConstructor
public class TravelDTO {

    Integer id;
    String name;
    Double basePrice;
    String description;
    Instant startSeason;
    Instant endSeason;
    Integer stars_count;
    String hotel_name;
    Double hotelPrice;
    String hotelDescription;
    String city_name;
    Integer fileDataId;

    public TravelDTO(Travel travel){
        this.id = travel.getId();
        this.name = travel.getName();
        this.basePrice = travel.getBasePrice();
        this.description = travel.getDescription();
        this.startSeason = travel.getStartSeason();
        this.endSeason = travel.getEndSeason();
        this.stars_count = travel.getHotel().getStarsCount();
        this.hotel_name = travel.getHotel().getName();
        this.hotelPrice = travel.getHotel().getPrice();
        this.hotelDescription = travel.getHotel().getDescription();
        this.city_name = travel.getCity().getName();
        this.fileDataId = travel.getFileDataId();
    }

}
