package wat.wcy.TravelAgency.DTO;

import lombok.Value;
import wat.wcy.TravelAgency.model.Travel;

import java.time.Instant;

@Value
public class TravelDTO {

    Integer id;
    String name;
    Double basePrice;
    String description;
    Instant startSeason;
    Instant endSeason;
    Integer fileDataId;

    public TravelDTO(Travel travel){
        this.id = travel.getId();
        this.name = travel.getName();
        this.basePrice = travel.getBasePrice();
        this.description = travel.getDescription();
        this.startSeason = travel.getStartSeason();
        this.endSeason = travel.getEndSeason();
        this.fileDataId = travel.getFileDataId();

    }

}
