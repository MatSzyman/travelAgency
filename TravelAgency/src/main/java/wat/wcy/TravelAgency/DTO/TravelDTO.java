package wat.wcy.TravelAgency.DTO;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
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

    public TravelDTO(Travel travel){
        this.name = travel.getName();
        this.basePrice = travel.getBasePrice();
        this.description = travel.getDescription();
        this.startSeason = travel.getStartSeason();
        this.endSeason = travel.getEndSeason();
    }

}
