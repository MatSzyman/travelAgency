package wat.wcy.TravelAgency.DTO;

import lombok.Value;
import wat.wcy.TravelAgency.model.Travel;
import wat.wcy.TravelAgency.model.TravelOption;

import java.time.Instant;

@Value
public class CreateTravelOptionDTO {

    Travel travel;
    Instant arrivalTime;
    Instant departureTime;

    public TravelOption toTravelOption() {
        return new TravelOption(travel, arrivalTime,departureTime);
    }
}
